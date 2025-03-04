---
title: Introduction
sidebar_position: 1
slug: /building-on-lisk/add-token-to-lisk
description: 'Guide to adding external ERC-20 contracts deployed on Ethereum to Lisk network.'
keywords:
  [
    'ERC-20 contract',
    'Lisk Testnet',
    'Sepolia',
    'Ethereum',
    'Lisk Mainnet',
    'Lisk',
    'Optimism Superchain token list',
  ]
---

# Bridging an L1 token to Lisk
This page is intended for token issuers who already have an ERC-20 contract deployed on Ethereum and would like to submit their token for bridging between Ethereum and Lisk. 
Lisk uses the Superchain Token List as a reference for tokens that have been deployed on Lisk.
In case you want to create a new token on Lisk, please refer to the page [Token development](../token-development/overview.md).

## Superchain Token List
The [Superchain Token List](https://github.com/ethereum-optimism/ethereum-optimism.github.io) exists to help users discover the correct bridged token addresses for any given native token.

Consider checking this list to make sure that you're not using the wrong bridged representation of a token when bridging a native token.
<!-- TODO: Add reference to Bridges tokens addresses page, once created for Lisk: https://docs.optimism.io/builders/app-developers/bridging/standard-bridge#searching-the-token-list -->

:::warning
Lisk does not endorse any of the tokens that are listed in the [**ethereum-optimism.github.io**](https://github.com/ethereum-optimism/ethereum-optimism.github.io) repository and relies on the preliminary checks put in place, listed on the repository.
:::

Developers who are creating their own bridged tokens should consider [adding their token to the list](#adding-your-token-to-the-superchain-token-list).

Tokens on the Superchain Token List will automatically appear on certain tools like the [Superchain Bridges UI](https://app.optimism.io/bridge).
However, tokens are not necessarily listed on the [Lisk Bridge UI](https://bridge.lisk.com/bridge/lisk); their listing is neither guaranteed nor automatic.
Lisk Bridge reviews are conducted manually by the Lisk team.

## The Standard Bridge
Before a token native to one chain can be bridged to the other chain, a bridged representation of that token must be created on the receiving side.
The [Standard Bridge](https://docs.optimism.io/builders/app-developers/bridging/standard-bridge) allows users to convert tokens that are native to one chain (like Ethereum) into a representation of those tokens on the other chain (like Lisk).
Users can then convert these bridged representations back into their original native tokens at any time.

:::tip
This bridging mechanism functions identically in both directions — tokens native to Lisk can be bridged to Ethereum, just like tokens native to Ethereum can be bridged to Lisk.
:::

A bridged representation of a token is an ERC-20 token that implements the `IOptimismMintableERC20`[^1] interface. 
A native token may have more than one bridged representation at the same time.
Users must always specify which bridged token they wish to use when using the bridge; see [Superchain Token List](#superchain-token-list).
Different bridged representations of the same native token are considered entirely independent tokens.

The Standard Bridge is a simple smart contract, with the functionality to move ERC-20 tokens between Lisk and Ethereum.

The protocol consists of two pertinent contracts:

- A bridge contract deployed to **Ethereum**, called [L1StandardBridge](https://etherscan.io/address/0x2658723Bf70c7667De6B25F99fcce13A16D25d08). 
- A bridge contract deployed to **Lisk**, called [L2StandardBridge](https://blockscout.lisk.com/address/0x4200000000000000000000000000000000000010).

These two contracts interact with one another via the `CrossDomainMessenger` system for sending messages between Ethereum and Lisk.

[^1]: The `IOptimismMintableERC20` interface is a superset of the [standard ERC-20 interface](https://eips.ethereum.org/EIPS/eip-20) and includes functions that allow the bridge to properly verify deposits/withdrawals and mint/burn tokens as needed.
All bridged versions of tokens must implement this interface in order to be bridged with the [Standard Bridge](#the-standard-bridge) system.
Native tokens do not need to implement this interface.


## Adding your token to the Superchain Token List

Lisk uses the [Superchain Token List](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/optimism.tokenlist.json) as a reference for tokens that have been deployed on Lisk.

To add your token to the list, perform the following steps.

### Step 1: Deploy your token on Lisk
Select your preferred bridging framework and use it to deploy an ERC-20 for your token on Lisk.
We recommend you use the framework provided by Lisk's [standard bridge](#the-standard-bridge) contracts and, furthermore, deploy your token using the [OptimismMintableERC20Factory](/about-lisk/contracts.mdx#lisk-network-l2). 
Deploying your token on Lisk in this manner provides us with guarantees that will smooth the approval process.
If you choose a different bridging framework, its interface must be compatible with that of the standard bridge.
Otherwise, it may be difficult for us to support them.

For step-by-step instructions on how to deploy ERC-20 tokens on Lisk, check the following guides:

- [Deploying a Standard ERC-20 token](./standard-token.md)
- [Deploying a Custom ERC-20 token](./custom-token.mdx)

### Step 2: Submit details of your token
Follow the instructions in the [GitHub repository](https://github.com/ethereum-optimism/ethereum-optimism.github.io) and submit a PR containing the required details for your token.
Especially, follow the Lisk-specific instructions detailed in the section [Specifying chains](https://github.com/ethereum-optimism/ethereum-optimism.github.io?tab=readme-ov-file#specifying-chains).

**Important:** You must specify in your token's `data.json` file a section for `lisk-sepolia` and/or `lisk`.

[This PR](https://github.com/ethereum-optimism/ethereum-optimism.github.io/pull/899) shows the changes necessary to add the LSK token to the Superchain Token Registry.
The change you need to submit is particularly simple if your token has already been added to the Superchain Token Registry.
For example, [this PR](https://github.com/ethereum-optimism/ethereum-optimism.github.io/commit/27ab9b2d3388f7feba3a152e0a0748c73d732a68) shows the change required for cbETH, which was already on Superchain Token Registry and relies on the Base standard bridge.

### Step 3: Await final approval
Reviews are regularly conducted by the Lisk team and you should receive a reply within 24-72 hours (depending on if the PR is opened on a weekday, weekend or holiday).

## Step 4 : Add token to Gelato Bridge
To add your token to the [Gelato Bridge](https://bridge.lisk.com/), reach out to the Lisk team on [Lisk Discord](https://lisk.chat) with the details of the token:

- Go to the `#lisk-dev` channel.
- Tag a moderator, ask them to add your token to the Gelato Bridge, and share the link to your PR from [step 2: token details](#step-2-submit-details-of-your-token).
- The Lisk team will then coordinate with Gelato to get the token added to the Gelato Bridge.