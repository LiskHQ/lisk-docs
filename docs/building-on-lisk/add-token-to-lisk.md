---
title: Adding ERC-20 Token to Lisk
sidebar_position: 1
slug: /add-token-to-lisk
description: 'Guide to adding external ERC-20 contracts deployed on Ethereum to Lisk network.'
keywords:
  [
    'ERC-20 contract',
    'Lisk Testnet',
    'Sepolia',
    'Ethereum',
    'Lisk Mainnet',
    'Optimism Superchain token list',
  ]
toc_max_heading_level: 4
---


# The Lisk Token List
It is possible to submit an ERC-20 contract for bridging with Lisk which has already been deployed on Ethereum.
Lisk uses [Optimism's Superchain token list](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/optimism.tokenlist.json) as a reference for tokens that have been deployed on Lisk.

:::warning

Tokens approved in the GitHub repository are not necessarily listed on the [Lisk Bridge](https://sepolia-bridge.lisk.com).

**Disclaimer:** Lisk does not endorse any of the tokens that are listed in the [**ethereum-optimism.github.io**](https://github.com/ethereum-optimism/ethereum-optimism.github.io) repository and rely on the preliminary checks put in place, which include the [**automated checks**](https://github.com/ethereum-optimism/ethereum-optimism.github.io?tab=readme-ov-file#automated-checks) listed on the repository.
:::
---

## Adding your token to the list

To add your token to the Lisk Token list, perform the following steps.

### Step 1: Deploy your token on Lisk

Use the recommended framework provided by Lisk's [Standard Bridge](https://sepolia-bridge.lisk.com) to deploy an ERC-20 contract for your token on Lisk.
You can deploy contracts, and your token(s) using the [OptimismMintableERC20Factory](contracts).

### Step 2: Submit details of your token

Follow the instructions in the [ethereum-optimism.github.io repository's README](https://github.com/ethereum-optimism/ethereum-optimism.github.io?tab=readme-ov-file#superchain-token-list) and submit a pull request containing the required details for your token.
You must specify a section for `lisk-sepolia` and/or `lisk` in your token's `data.json` file.
For more information, check out the currently active [pull requests](https://github.com/ethereum-optimism/ethereum-optimism.github.io/pulls) for adding an ERC-20 token to the Lisk network.

### Step 3: Await final approval

Tokens approved in the GitHub repository are not necessarily listed on the Lisk Bridge and are not guaranteed or automatic.
Lisk Bridge reviews are conducted manually by the Lisk team.
For more information, please visit our [Discord](https://lisk.chat/).

:::tip
To learn more about bridging various types of ERC-20 tokens to the Lisk Network, see the following guides:

- [Bridging ERC-20 Tokens to OP Mainnet With the Optimism SDK](https://docs.optimism.io/builders/dapp-developers/tutorials/cross-dom-bridge-erc20)
- [Bridging Your Custom ERC-20 Token to OP Mainnet Using the Standard Bridge](https://docs.optimism.io/builders/dapp-developers/tutorials/standard-bridge-custom-token)
- [Bridging Your Standard ERC-20 Token to OP Mainnet Using the Standard Bridge](https://docs.optimism.io/builders/dapp-developers/tutorials/standard-bridge-standard-token)
:::