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

## Tellor

Tellor is an immutable decentralized oracle protocol where parties can request the value of an offchain data point (e.g. ETH/USD) and reporters compete to add this value to an onchain databank.
The inputs to this databank are secured by a network of staked reporters.

Tellor utilizes crypto-economic incentive mechanisms, rewarding honest data submissions by reporters and punishing bad actors through the issuance of Tellor’s token, Tributes (TRB) and a dispute mechanism.

This incentivizes an open, permissionless network of data reporting and data validation, ensuring that data can be provided by anyone and checked by everyone.

#### Supported Networks

- Lisk
- Lisk Sepolia

### Guides
- [Accessing oracle data with Tellor](/guides/using-oracle-data/tellor.md)