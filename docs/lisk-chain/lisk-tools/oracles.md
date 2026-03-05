---
title: Oracles
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
    Tellor,
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

*   [RedStone Pull](https://docs.redstone.finance/docs/dapps/redstone-pull/) (pull oracle) - less than 10s update time, broad spectrum of feeds, best for most use cases. All [price feeds](https://app.redstone.finance/#/app/tokens) are available for Lisk.
*   [RedStone Push](https://docs.redstone.finance/docs/dapps/redstone-push/) (push oracle) - for protocols designed for the traditional oracle interface, customizable heartbeat, and deviation threshold.
* [ERC7412](https://docs.redstone.finance/docs/dapps/redstone-erc7412/) - Push and Pull models combined.

#### Supported Networks

- Lisk

### Guides

- [Accessing oracle data with Redstone (Pull)](/guides/using-oracle-data/redstone-pull.md)
- [Accessing oracle data with Redstone (Push)](/guides/using-oracle-data/redstone-push.md)
