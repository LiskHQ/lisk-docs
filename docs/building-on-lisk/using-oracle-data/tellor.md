---
title: ...with Tellor
slug: /building-on-lisk/using-oracle-data/tellor
description: A guide on using Redstone Data Feeds to access real-world data such as asset prices, directly from your smart contracts on the Lisk testnet.
keywords: [
    Oracle
    Oracles,
    Redstone,
    price feeds,
    data feeds,
    smart contract,
    Lisk blockchain,
    Lisk network,
    Lisk testnet,
    Lisk test network,
    app development,
    dapp development,
    build a dapp on Lisk,
    build on Lisk,
  ]
---

# Using oracle data with Tellor
[Tellor](https://tellor.io/) is an immutable decentralized oracle protocol where parties can request the value of an offchain data point (e.g. ETH/USD, LSK/USD) and reporters compete to add this value to an onchain databank.
The inputs to this data-bank are secured by a network of staked reporters.

Tellor utilizes crypto-economic incentive mechanisms, rewarding honest data submissions by reporters and punishing bad actors through the issuance of Tellor’s token, Tributes (TRB) and a dispute mechanism.

This incentivizes an open, permissionless network of data reporting and data validation, ensuring that data can be provided by anyone and checked by everyone.

## Installation
The first thing you'll want to do is install the basic tools necessary for using Tellor as your oracle.

To install [usingtellor](https://github.com/tellor-io/usingtellor), run one the following commands:

- Hardhat: `npm install usingtellor`
- Foundry: `forge install tellor-io/usingtellor`

Once installed, this will allow your contracts to inherit the functions from the 'UsingTellor' contract.

Great! Now that you've got the tools ready, let's go through a simple exercise where we retrieve the `eth/usd` and `lsk/usd` prices from Tellor.

## Import

```solidity
pragma solidity >=0.8.0;

import "usingtellor/contracts/UsingTellor.sol";
/**
     * Network: Lisk Mainnet
     * Address: 0x896419Ed2E0dC848a1f7d2814F4e5Df4b9B9bFcc
*/
contract MyContract is UsingTellor {

  constructor(address payable _tellorOracle) UsingTellor(_tellorOracle) {

  }

  // ...

}
```

To import the UsingTellor contract into your Solidity file, pass the desired Tellor Oracle address as a parameter. 
For the Lisk Mainnet, the Tellor Oracle address is: [0x896419Ed2E0dC848a1f7d2814F4e5Df4b9B9bFcc](https://blockscout.lisk.com/address/0x896419Ed2E0dC848a1f7d2814F4e5Df4b9B9bFcc)

## Reading data

In the example below, we add two functions:

- `getETHSpotPrice()` that reads the ETH/USD price feed and another function 
- `getLSKSpotPrice()` that reads the LSK/USD price feed from the Oracle

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { UsingTellor } from "usingtellor/contracts/UsingTellor.sol";

contract MyContract is UsingTellor {

    uint256 public ethLastStoredTimestamp;
    uint256 public ethLastStoredPrice;
    uint256 public lskLastStoredTimestamp;
    uint256 public lskLastStoredPrice;
    bytes32 public immutable ethQueryId;
    bytes32 public immutable lskQueryId;
    uint256 public constant DISPUTE_BUFFER = 20 minutes;
    uint256 public constant STALENESS_AGE = 12 hours;

    error StalePrice(uint256 price, uint256 timestamp);
    error NoValueRetrieved(uint256 timestamp);

    /** 
     * @dev the constructor sets the Tellor address and the ETH and LSK queryIds
     * @param _tellorOracle is the address of the Tellor oracle
     */
    constructor (address payable _tellorOracle) UsingTellor(_tellorOracle) {
        // set the ETH queryId
        bytes memory _ethQueryData = abi.encode("SpotPrice", abi.encode("eth", "usd"));
        ethQueryId = keccak256(_ethQueryData);
        // set the LSK queryId
        bytes memory _lskQueryData = abi.encode("SpotPrice", abi.encode("lsk", "usd"));
        lskQueryId = keccak256(_lskQueryData);
    }

    /** 
     * @dev Allows a user contract to read the ETH price from Tellor and perform some 
     * best practice checks on the retrieved data
     * @return _value the ETH spot price from Tellor, with 18 decimal places
     * @return timestamp the value's timestamp
     */
    function getETHSpotPrice()
        public
        returns (
            uint256 _value,
            uint256 timestamp
        )
    {
        // retrieve the most recent 20+ minute old ETH price. 
        // the buffer allows time for a bad value to be disputed
        (bytes memory _data, uint256 _timestamp) = getDataBefore(ethQueryId, block.timestamp - DISPUTE_BUFFER);

        // check whether any value was retrieved
        if (_timestamp == 0 || _data.length == 0) revert NoValueRetrieved(_timestamp);

        // decode the value from bytes to uint256
        _value = abi.decode(_data, (uint256));

        // prevent a back-in-time dispute attack by caching the most recent value and timestamp.
        // this stops an attacker from disputing tellor values to manupulate which price is used 
        // by your protocol
        if (_timestamp > ethLastStoredTimestamp) {
            // if the new value is newer than the last stored value, update the cache
            ethLastStoredTimestamp = _timestamp;
            ethLastStoredPrice = _value;
        } else {
            // if the new value is older than the last stored value, use the cached value
            _value = ethLastStoredPrice;
            _timestamp = ethLastStoredTimestamp;
        }

        // check whether value is too old
        if (block.timestamp - _timestamp > STALENESS_AGE) revert StalePrice(_value, _timestamp);

        // return the value and timestamp
        return (_value, _timestamp);
    }

    /** 
     * @dev Allows a user contract to read the LSK price from Tellor and perform some 
     * best practice checks on the retrieved data
     * @return _value the LSK spot price from Tellor, with 18 decimal places
     * @return timestamp the value's timestamp
     */
    function getLSKSpotPrice()
        public
        returns (
            uint256 _value,
            uint256 timestamp
        )
    {
        (bytes memory _data, uint256 _timestamp) = getDataBefore(lskQueryId, block.timestamp - DISPUTE_BUFFER);

        if (_timestamp == 0 || _data.length == 0) revert NoValueRetrieved(_timestamp);

        _value = abi.decode(_data, (uint256));

        if (_timestamp > lskLastStoredTimestamp) {
            lskLastStoredTimestamp = _timestamp;
            lskLastStoredPrice = _value;
        } else {
            _value = lskLastStoredPrice;
            _timestamp = lskLastStoredTimestamp;
        }

        if (block.timestamp - _timestamp > STALENESS_AGE) revert StalePrice(_value, _timestamp);

        return (_value, _timestamp);
    }
}
```

You can adapt this contract to your needs.
The example utilizes some best practices[^1] for using Tellor by implementing a dispute time buffer and a data staleness check.
In addition, it also seeks to mitigate back-in-time dispute attacks by caching the most recent value and timestamp.

[^1]: Based on examples in [Tellor's best practices repository](https://github.com/tellor-io/best-practices-user/tree/main)

:::tip
For a general overview of best practices using Tellor, go to the [User checklists](https://docs.tellor.io/tellor/getting-data/user-checklists) in the Tellor docs.
:::

## Deploying on Lisk

To deploy the smart contract on Lisk Sepolia or Lisk Mainnet, follow the guides 

- [Deploying a smart contract with Hardhat](../deploying-smart-contract/with-Hardhat), or
- [Deploying a smart contract with Foundry](../deploying-smart-contract/with-Foundry)

## Further resources

- For a more robust implementation of the Tellor oracle, check out the full list of available functions [here](https://github.com/tellor-io/usingtellor/blob/master/README.md).
- Have a specific Data Feed Request? [Fill out this form](https://github.com/tellor-io/dataSpecs/issues/new?assignees=&labels=&template=new_query_type.yaml&title=%5BNew+Data+Request+Form%5D%3A+).
- Still have question? Reach out to the Tellor team on Discord [here](https://discord.gg/tellor).