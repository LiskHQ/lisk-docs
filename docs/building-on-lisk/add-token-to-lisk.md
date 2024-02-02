---
title: Adding ERC-20 Token to Lisk
sidebar_position: 1
slug: /add-token-to-lisk
description: 'Guide to adding external ERC-20 contracts deployed on Ethereum to Lisk network.'
keywords:
  [
    'network information',
    'Lisk Testnet',
    'Sepolia',
    'faucet',
    'block explorer',
  ]
toc_max_heading_level: 4
---


# The Lisk Token List

This page is intended for token issuers who already have an ERC-20 contract deployed on Ethereum and would like to submit their token for bridging between Ethereum and Lisk and Lisk Mainnet to Lisk Bridge and other bridges. Lisk uses the [Optimism Superchain token list](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/optimism.tokenlist.json) as a reference for tokens that have been deployed on Lisk.

:::warning

Tokens approved in the Github repository are not necessarily listed on the Lisk Bridge.

**Disclaimer:** Lisk does not endorse any of the tokens that are listed in the Github repository and has conducted only preliminary checks, which includes automated checks listed on the [**ethereum-optimism.github.io**](https://github.com/ethereum-optimism/ethereum-optimism.github.io) repository.
:::
---

## Adding your token to the list

The steps below explain how to get your token on the Lisk Token List.

### Step 1: Deploy your token on Lisk

Select your preferred bridging framework and use it to deploy an ERC-20 for your token on Lisk. We recommend you use the framework provided by Lisk's [Standard bridge](network-info#lisk-sepolia-testnet) contracts, and furthermore deploy your token using the [OptimismMintableERC20Factory](contracts). Deploying your token on Lisk in this manner provides us with guarantees that will smooth the approval process. If you choose a different bridging framework, its interface must be compatible with that of the standard bridge, otherwise it may be difficult for us to support.

### Step 2: Submit details for your token

Follow the instructions in the [GitHub repository](https://github.com/ethereum-optimism/ethereum-optimism.github.io) and submit a PR containing the required details for your token. You must specify in your token's `data.json` file a section for `lisk-sepolia` and/or `lisk` . The change you need to submit is particularly simple if your token has already been added to the Optimism token list. For example, [this PR](https://github.com/ethereum-optimism/ethereum-optimism.github.io/commit/27ab9b2d3388f7feba3a152e0a0748c73d732a68) shows the change required for cbETH, which was already on Optimism's token list and relies on the Lisk standard bridge.

### Step 3: Await final approval

Tokens approved in the Github repository are not necessarily listed on the Lisk Bridge and are not guaranteed or automatic. Lisk Bridge reviews are conducted manually by the Lisk team. For more information, please visit our [Discord](https://lisk.chat/).



:::tip
To learn more about bridging various types of ERC-20 tokens to the Lisk Network, see the following guides:

- [Bridging ERC-20 Tokens to OP Mainnet With the Optimism SDK](https://docs.optimism.io/builders/dapp-developers/tutorials/cross-dom-bridge-erc20)
- [Bridging Your Custom ERC-20 Token to OP Mainnet Using the Standard Bridge](https://docs.optimism.io/builders/dapp-developers/tutorials/standard-bridge-custom-token)
- [Bridging Your Standard ERC-20 Token to OP Mainnet Using the Standard Bridge](https://docs.optimism.io/builders/dapp-developers/tutorials/standard-bridge-standard-token)
:::