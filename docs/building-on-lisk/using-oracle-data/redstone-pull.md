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

This page will explain how you can access oracle data using Redstone.

RedStone is a data ecosystem that delivers frequently updated, reliable, and diverse data for your dApp and smart contracts deployed on Lisk.

## How to pull oracle data from Redstone

To create a smart contract that directly fetches the latest data from the Redstone oracle, follow this guide.

This guide uses the [Redstone Pull model](https://docs.redstone.finance/docs/get-started/models/redstone-pull) to fetch the data.

For an overview of the different modules that Redstone offers to receive oracle data, go to [Oracles > Redstone](../lisk-tools/oracles#redstone).

[Hardhat](https://hardhat.org/) is used in this guide to create the smart contract.
In case you want to use Foundry, check out the [Redstone docs](https://docs.redstone.finance/docs/get-started/models/redstone-pull#foundry) for instructions.

### Dependencies

- ethers ^5.7.2
- hardhat ^2.14.0

### Install the evm connector
Install the [@redstone-finance/evm-connector](https://www.npmjs.com/package/@redstone-finance/evm-connector) package.

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

Get the oracle data using the functions provided by the EVM connector.

#### Get a single value

To get a single price feed, use the function `getOracleNumericValueFromTxMsg()` and provide the data feed ID as a parameter.

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

#### Get multiple values

To get data from multiple price feeds, use the function `getOracleNumericValuesFromTxMsg()` and provide the data feed ID array as a parameter.

```solidity
/**
* Returns the latest prices of ETH and BTC
*/
function getLatestEthBtcPrices() public view returns (uint256[] memory) {
    bytes32[] memory dataFeedIds = new bytes32[](2);
    dataFeedIds[0] = bytes32("ETH");
    dataFeedIds[1] = bytes32("BTC");
    uint256[] memory values = getOracleNumericValuesFromTxMsg(dataFeedIds);
    return values;
}
```

### Testing 

In order to test the EVM connector related functions in your contract, it is necessary to wrap the contract using the `WrapperBuilder` provided by the `@redstone-finance/evm-connector` package.

```typescript title="test/YourContract.ts"
import { expect } from "chai";
import { ethers } from "hardhat";
import { WrapperBuilder } from "@redstone-finance/evm-connector";

describe("YourContract", function () {
    describe("Redstone", function () {
        it("Get ETH price securely", async function () {
        const YourContract = await ethers.getContractFactory("YourContract");
        const contract = await YourContract.deploy();
        const wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
            dataFeeds: ["ETH"],
        });

        // Interact with the contract (getting oracle value securely)
        const ethPriceFromContract = await wrappedContract.getLatestEthPrice();
        console.log("Latest ETH price:");
        console.log({ ethPriceFromContract });
        });
    });
});
```

Now run the test:

```bash
npx hardhat test
```

This should output the latest ETH price in the console:

``` title="Output"
Latest ETH price:
{ ethPriceFromContract: BigNumber { value: "250255087192" } }
```

## Deploying on Lisk

To deploy the smart contract on Lisk Sepolia or Lisk Mainnet, follow the guides 

- [Deploying a smart contract with Hardhat](deploying-smart-contract/with-Hardhat.md), or
- [Deploying a smart contract with Foundry](deploying-smart-contract/with-Foundry.md)