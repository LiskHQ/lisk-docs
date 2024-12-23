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

[RedStone](https://redstone.finance/) offers flexible Data Feeds for Lending Markets, Perpetuals, Options, Stablecoins, Yield Aggregators, and other types of novel DeFi protocols. 

Builders can choose how they want to consume the data from the following three dedicated models:

*   [RedStone Pull](https://docs.redstone.finance/docs/get-started/models/redstone-pull) (pull oracle) - less than 10s update time, broad spectrum of feeds, best for most use cases. All [Price Feeds](https://app.redstone.finance/#/app/tokens) are available for Lisk.
*   [RedStone Push](https://docs.redstone.finance/docs/get-started/models/redstone-push) (push oracle) - for protocols designed for the traditional oracle interface, customizable heartbeat, and deviation threshold.
*   [RedStone X](https://docs.redstone.finance/docs/get-started/models/redstone-x) - specifically for Perps and Options, highest update frequency, and front-running protection.
* [ERC7412](https://docs.redstone.finance/docs/get-started/models/redstone-erc7412) - Classic and Core models combined

Interested in integration? [Get in contact](https://discord.com/invite/PVxBZKFr46) with the RedStone team!

#### Supported Networks

- Lisk
- Lisk Sepolia