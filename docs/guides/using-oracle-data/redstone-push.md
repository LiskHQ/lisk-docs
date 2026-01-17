---
title: ...with RedStone (Push)
description: A guide on using RedStone Push to access real-world data such as asset prices, directly from your smart contracts on the Lisk blockchain.
keywords: [
    Oracle
    Oracles,
    RedStone,
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
    RedStone Push,
  ]
---

# Accessing real-world data using the RedStone Oracle (Push)

This page will explain how you can access oracle data using [RedStone Push](https://docs.redstone.finance/docs/get-started/models/redstone-push).

RedStone is a data ecosystem that delivers frequently updated, reliable, and diverse data for your dApp and smart contracts deployed on Lisk.

RedStone data feeds are compatible with Chainlink's [AggregatorV3Interface](https://docs.chain.link/data-feeds/using-data-feeds#solidity) and include the following components:

- **Aggregator contract**: An aggregator is a contract that receives periodic data updates from the oracle network.
Aggregators store aggregated data onchain so that consumers can retrieve it and act upon it within the same transaction.
These contracts have already been deployed on the Lisk network and can be directly used by consumers.
- **Consumer**: A consumer is an onchain or offchain application that uses Data Feeds.
Consumer contracts use the `AggregatorV3Interface` to call functions on the proxy contract[^1] of the Aggregator to retrieve oracle data.

[^1]: Proxy contracts are onchain proxies that point to the aggregator for a particular data feed.
Using proxies enables the underlying aggregator to be upgraded without any service interruption to consuming contracts.

## Data feeds on Lisk
The following Aggregators are available on Lisk Mainnet for RedStone Push:

### L2PriceFeedWithoutRounds

- [ETH/USD token pair](https://blockscout.lisk.com/address/0x6b7AB4213c77A671Fc7AEe8eB23C9961fDdaB3b2)
  - address: `0x6b7AB4213c77A671Fc7AEe8eB23C9961fDdaB3b2`
- [LSK/USD token pair](https://blockscout.lisk.com/address/0xa1EbA9E63ed7BA328fE0778cFD67699F05378a96)
  - address: `0xa1EbA9E63ed7BA328fE0778cFD67699F05378a96`
- [USDT/USD token pair](https://blockscout.lisk.com/address/0xd2176Dd57D1e200c0A8ec9e575A129b511DBD3AD)
  - address: `0xd2176Dd57D1e200c0A8ec9e575A129b511DBD3AD`
- [USDC/USD token pair](https://blockscout.lisk.com/address/0xb4e6A7861067674AC398a26DD73A3c524C602184)
  - address: `0xb4e6A7861067674AC398a26DD73A3c524C602184`
- [WBTC/USD token pair](https://blockscout.lisk.com/address/0x13da43eA89fB692bdB6666F053FeE70aC61A53cd)
  - address: `0x13da43eA89fB692bdB6666F053FeE70aC61A53cd`
- [BTC/USD token pair](https://blockscout.lisk.com/address/0xd50f47a9173d67c3CfCb6a28CA8d60230bE0f5f0)
  - address: `0xd50f47a9173d67c3CfCb6a28CA8d60230bE0f5f0`
- [mBTC/BTC proof-of-reserve](https://blockscout.lisk.com/address/0x239Cb6b32a87f2679d5b9F1aa4a9b000c766aD79)
  - address `0x239Cb6b32a87f2679d5b9F1aa4a9b000c766aD79`
- [wstETH/ETH token pair](https://blockscout.lisk.com/address/0x731f330542734B4059334ca8e1Da30AF358b41b2)
  - address `0x731f330542734B4059334ca8e1Da30AF358b41b2`

In this guide, we will develop a Consumer contract that requests the latest spot prices from the ETH, LSK, and USDT data feeds.

:::note
RedStone Push is only fully available on Lisk Mainnet, so please make sure to deploy your Consumer contract on Lisk Mainnet as well.

In case you wish to deploy on Lisk Sepolia Testnet, check the [Tellor](./tellor.md) guide, which is available for both networks.
:::

## Import

To use the RedStone data inside your contract, import the [AggregatorV3Interface](https://docs.chain.link/data-feeds/using-data-feeds#solidity) from Chainlink, as shown in the example contract below.

Create a new constant with the type `AggregatorV3Interface` for every data feed you want to store.

In the constructor, set the above-defined constants to point to the respective data feeds.
Use the `AggregatorV3Interface()` function and pass the address of the respective data feed contract as a parameter.

```solidity title="Importing the AggregatorV3Interface"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract RedStoneDataConsumer {
    AggregatorV3Interface internal dataFeedETH;
    AggregatorV3Interface internal dataFeedLSK;
    AggregatorV3Interface internal dataFeedUSDT;

    /**
     * Network: Lisk
     * Aggregator: ETH/USD
     * Address: 0x6b7AB4213c77A671Fc7AEe8eB23C9961fDdaB3b2
     */
     /**
     * Network: Lisk
     * Aggregator: LSK/USD
     * Address: 0xa1EbA9E63ed7BA328fE0778cFD67699F05378a96
     */
      /**
     * Network: Lisk
     * Aggregator: USDT/USD
     * Address: 0xd2176Dd57D1e200c0A8ec9e575A129b511DBD3AD
     */
    constructor() {
        dataFeedETH = AggregatorV3Interface(
            0x6b7AB4213c77A671Fc7AEe8eB23C9961fDdaB3b2
        );
        dataFeedLSK = AggregatorV3Interface(
            0xa1EbA9E63ed7BA328fE0778cFD67699F05378a96
        );
        dataFeedUSDT = AggregatorV3Interface(
            0xd2176Dd57D1e200c0A8ec9e575A129b511DBD3AD
        );
    }
}
```

## Reading data
To read the data of the price feeds, we define the following functions in the contract:

- `getRedStoneETHDataFeedLatestAnswer()`
- `getRedStoneLSKDataFeedLatestAnswer()`
- `getRedStoneUSDTDataFeedLatestAnswer()`

Inside the functions, call the [latestRoundData](https://docs.chain.link/data-feeds/api-reference#latestrounddata) on the respective data feeds to receive the latest spot prices for the respective token.

The `latestRoundData()` function returns the following values:

- `roundId`(uint80): The round ID.
For all [data feeds](#data-feeds-on-lisk), the round is always `1`, because the contracts are without rounds, as the name suggests.
- `answer`(int256): The data that this specific feed provides.
Depending on the feed you selected, this answer provides asset prices, reserves, and other types of data.
- `startedAt`(uint256): Timestamp of when the round started.
- `updatedAt`(uint256): Timestamp of when the round was updated.
- `answeredInRound`(uint80):  Deprecated - Previously used when answers could take multiple rounds to be computed.

In this example, we will only use `answer` and `updatedAt`.
The `updatedAt` value should be used to make sure that the `answer` is recent enough for your application to use it.
You can compare `updatedAt` to the latest block time (`uint256 currentTime = block.timestamp;`) to ensure you are only using the latest oracle data in your application.

:::caution
This is an example contract that uses un-audited code.
Do not use this code in production.
:::

```solidity title="Reading data feeds"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract RedStoneDataConsumer {
  AggregatorV3Interface internal priceFeedETH;
  AggregatorV3Interface internal priceFeedLSK;
  AggregatorV3Interface internal priceFeedUSDT;

  constructor() {
      priceFeedETH = AggregatorV3Interface(
          0x6b7AB4213c77A671Fc7AEe8eB23C9961fDdaB3b2
      );
      priceFeedLSK = AggregatorV3Interface(
          0xa1EbA9E63ed7BA328fE0778cFD67699F05378a96
      );
      priceFeedUSDT = AggregatorV3Interface(
          0xd2176Dd57D1e200c0A8ec9e575A129b511DBD3AD
      );
  }

  /**
    * Returns the latest ETH price, and when it was updated.
    */
  function getRedStoneETHDataFeedLatestAnswer() public view returns (int, uint) {
      (
        /* uint80 roundID */,
        int answer,
        uint updatedAt,
        /*uint startedAt*/,
        /*uint80 answeredInRound*/
      ) = priceFeedETH.latestRoundData();
      return (answer, updatedAt);
  }
  /**
    * Returns the latest LSK price, and when it was updated.
    */
  function getRedStoneLSKDataFeedLatestAnswer() public view returns (int, uint) {
      (
        /* uint80 roundID */,
        int answer,
        uint updatedAt,
        /*uint startedAt*/,
        /*uint80 answeredInRound*/
      ) = priceFeedLSK.latestRoundData();
      return (answer, updatedAt);
  }
  /**
    * Returns the latest USDT price, and when it was updated.
    */
  function getRedStoneUSDTDataFeedLatestAnswer() public view returns (int, uint) {
      (
        /* uint80 roundID */,
        int answer,
        uint updatedAt,
        /*uint startedAt*/,
        /*uint80 answeredInRound*/
      ) = priceFeedUSDT.latestRoundData();
      return (answer, updatedAt);
  }
}
```

## Deploying on Lisk

To deploy the smart contract on Lisk, follow the guides 

- [Deploying a smart contract with Hardhat](../deploying-smart-contract/with-Hardhat), or
- [Deploying a smart contract with Foundry](../deploying-smart-contract/with-Foundry)

:::note
RedStone Push is only available on Lisk Mainnet, so please make sure to deploy your Consumer contract on Lisk Mainnet as well.

In case you wish to deploy on Lisk Sepolia Testnet, check the [Tellor](./tellor.md) guide, which is available for both networks.
:::