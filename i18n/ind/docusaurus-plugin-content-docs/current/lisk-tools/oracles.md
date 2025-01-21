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

*   [RedStone Pull](https://docs.redstone.finance/docs/get-started/models/redstone-pull) (pull oracle) - less than 10s update time, broad spectrum of feeds, best for most use cases. All [Price Feeds](https://app.redstone.finance/#/app/tokens) are available for Lisk.
*   [RedStone Push](https://docs.redstone.finance/docs/get-started/models/redstone-push) (push oracle) - for protocols designed for the traditional oracle interface, customizable heartbeat, and deviation threshold.
*   [RedStone X](https://docs.redstone.finance/docs/get-started/models/redstone-x) - specifically for Perps and Options, highest update frequency, and front-running protection.
* [ERC7412](https://docs.redstone.finance/docs/get-started/models/redstone-erc7412) - Classic and Core models combined

Interested in integration? [Get in contact](https://discord.com/invite/PVxBZKFr46) with the RedStone team!

#### Supported Networks

- Lisk

### Guides

- [Accessing oracle data with Redstone (Pull)](../building-on-lisk/using-oracle-data/redstone-pull.md)
- [Accessing oracle data with Redstone (Push)](../building-on-lisk/using-oracle-data/redstone-push.md)

## Tellor

Tellor is an immutable decentralized oracle protocol where parties can request the value of an offchain data point (e.g. ETH/USD) and reporters compete to add this value to an onchain databank.
The inputs to this databank are secured by a network of staked reporters.

Tellor utilizes crypto-economic incentive mechanisms, rewarding honest data submissions by reporters and punishing bad actors through the issuance of Tellor’s token, Tributes (TRB) and a dispute mechanism.

This incentivizes an open, permissionless network of data reporting and data validation, ensuring that data can be provided by anyone and checked by everyone.

[A list of all the Tellor contracts deployed on Lisk is available on their documentation](https://docs.tellor.io/tellor/the-basics/contracts-reference#lisk)

#### Supported Networks

- Lisk
- Lisk Sepolia

### Guides
- [Accessing oracle data with Tellor](../building-on-lisk/using-oracle-data/tellor.md)