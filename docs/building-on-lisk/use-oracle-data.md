---
title: Accessing real-world data with Oracles
slug: /building-on-lisk/use-oracle-data
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

# Accessing real-world data using the Redstone Oracle

This page will explain how you can access real world / off-chain data using Oracles such as Redstone.

RedStone is a data ecosystem that delivers frequently updated, reliable and diverse data for your dApp and smart contracts.

:::info
This guides uses the [Redstone Core model](https://docs.redstone.finance/docs/get-started/models/redstone-core).

For an overview about the different modules Redstone offers to receive oracle data, go [Oracles > Redstone](lisk-tools/oracles#redstone).
:::


## How to pull oracle data from Redstone

### Dependencies

- ethers 5.7.2
- hardhat 2.14.0

### Install the evm connector

```sh
npm install @redstone-finance/evm-connector
```

### Import the evm connector

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
* Imports the EVM connector
*/
import "@redstone-finance/evm-connector/contracts/data-services/RapidDemoConsumerBase.sol";

contract YourContract is RapidDemoConsumerBase {

    // ...

}
```
### Get oracle data

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
* Imports the EVM connector
*/
import "@redstone-finance/evm-connector/contracts/data-services/RapidDemoConsumerBase.sol";

contract YourContract is RapidDemoConsumerBase {

    // ...

    /**
    * Returns the latest price of ETH
    */
    function getLatestEthPrice() public view returns (uint256) {
        bytes32 dataFeedId = bytes32("ETH");
        return getOracleNumericValueFromTxMsg(dataFeedId);
    }
}
```