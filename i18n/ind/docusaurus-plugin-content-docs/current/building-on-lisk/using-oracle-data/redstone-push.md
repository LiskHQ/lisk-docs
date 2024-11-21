---
title: ...with Redstone (Push)
slug: /building-on-lisk/using-oracle-data/redstone-push
description: A guide on using Redstone Push to access real-world data such as asset prices, directly from your smart contracts on the Lisk blockchain.
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
    Redstone Push,
  ]
---

# Accessing real-world data using the Redstone Oracle (Push)

This page will explain how you can access oracle data using [Redstone Push](https://docs.redstone.finance/docs/get-started/models/redstone-push).

RedStone is a data ecosystem that delivers frequently updated, reliable, and diverse data for your dApp and smart contracts deployed on Lisk.


## Import

To use the RedStone data in your contract, import the [AggregatorV3Interface](https://docs.chain.link/data-feeds/using-data-feeds#solidity) from Chainlink.

For every data feed you like to store, create a new constant with type `AggregatorV3Interface`.

In the constructor, set the above defined constants to point to the respective data feeds:
Use the `AggregatorV3Interface()` function and pass the adress of the respective data feed contract as parameter.

```solidity
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

Inside of the functions, call the [latestRoundData](https://docs.chain.link/data-feeds/api-reference#latestrounddata) on the respective price feeds to receive the latest price feeds for the respective token.

The `latestRoundData()` function returns the following values:

- `roundId`(uint80): The round ID.
The "round" the answer was created in.
Every time a price feed is updated, it adds +1 to the round ID.
- `answer`(int256): The data that this specific feed provides.
Depending on the feed you selected, this answer provides asset prices, reserves, and other types of data.
- `startedAt`(uint256): Timestamp of when the round started.
- `updatedAt`(uint256): Timestamp of when the round was updated.
- `answeredInRound`(uint80):  Deprecated - Previously used when answers could take multiple rounds to be computed.

In this example, we will only use `answer` and `updatedAt`.
The `updatedAt` value should be used to make sure that the `answer` is recent enough for your application to use it.
You can compare `updatedAt` to the latest block time (`uint256 currentTime = block.timestamp;`) to ensure you are only using the latest oracle data in your application.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED
 * VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract DataConsumerV3 {
  AggregatorV3Interface internal priceFeedETH;
  AggregatorV3Interface internal priceFeedLSK;
  AggregatorV3Interface internal priceFeedUSDT;

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