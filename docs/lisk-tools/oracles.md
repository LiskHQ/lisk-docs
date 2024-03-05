---
title: Oracles
slug: /lisk-tools/oracles
description: Documentation for various blockchain oracles for Lisk.
keywords:
  [
    Oracles,
    Oracle,
    Lisk,
    Lisk Mainnet,
    Lisk Testnet,
    Lisk network,
    Redstone,
    price feeds,
    data feeds,
  ]
---

# Oracles

[Oracles](https://ethereum.org/en/developers/docs/oracles/) provide offchain data onchain.
This allows code running on a blockchain to access a wide variety of information.

The following Oracles support the Lisk network already:

## RedStone

[RedStone](https://redstone.finance/) offers flexible Data Feeds for Lending Markets, Perpetuals, Options, Stablecoins, Yield Aggregators and other types of novel DeFi protocols. 

Builders can choose how they want to consume the data among 3 dedicated models:

*   [RedStone Core](https://docs.redstone.finance/docs/smart-contract-devs/get-started/redstone-core) (pull oracle) - less than 10s update time, broad spectrum of feeds, best for most use cases. All [Core Price Feeds](https://app.redstone.finance/#/app/tokens) are available for Lisk.
*   [RedStone Classic](https://docs.redstone.finance/docs/smart-contract-devs/get-started/redstone-classic) (push oracle) - for protocols designed for the traditional oracle interface, customizable heartbeat and deviation threshold.
*   [RedStone X](https://docs.redstone.finance/docs/smart-contract-devs/get-started/redstone-x) - specifically for Perps and Options, highest update frequency and front-running protection.

Interested in integration? [Get in contact](https://discord.com/invite/PVxBZKFr46) with the RedStone team!

#### Supported Networks

- Lisk Sepolia