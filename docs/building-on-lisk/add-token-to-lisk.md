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


# Adding ERC-20 Token to Lisk
This tutorial is meant for developers with an existing **Standard ERC-20** token or a **Custom ERC-20** token on Ethereum who want to deploy their respective token on Lisk.
In this guide, you'll learn how to deploy a Standard or a Custom ERC-20 token from Ethereum to Lisk.

<!-- Lisk uses [Optimism's Superchain token list](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/optimism.tokenlist.json) as a reference for tokens that have been deployed on Lisk. -->

<!-- :::warning

Tokens approved in the GitHub repository are not necessarily listed on the [Lisk Bridge](https://sepolia-bridge.lisk.com).

**Disclaimer:** Lisk does not endorse any of the tokens that are listed in the [**ethereum-optimism.github.io**](https://github.com/ethereum-optimism/ethereum-optimism.github.io) repository and rely on the preliminary checks put in place, which include the [**automated checks**](https://github.com/ethereum-optimism/ethereum-optimism.github.io?tab=readme-ov-file#automated-checks) listed on the repository.
::: -->

<!-- ## Adding your token to the list

To add your token to the Lisk Token list, perform the following steps. -->

## Deploying an ERC-20 Token

### Deploying a Standard ERC-20 Token

To deploy a Standard ERC-20 Token to Lisk Mainnet, follow the steps mentioned in the [Creating and Deploying a Standard L2 ERC-20 Token](https://docs.optimism.io/builders/dapp-developers/tutorials/standard-bridge-standard-token#create-an-l2-erc-20-token) section.

:::important
While following the aforementioned guide, update the `TUTORIAL_RPC_URL` variable to `https://rpc.sepolia-api.lisk.com/` to connect with Lisk Sepolia network.
The rest of the steps are the same for Lisk as they are for Optimism.
:::


### Deploying a Custom ERC-20 token

To deploy a Custom ERC-20 token, one needs to implement all the functions defined by the [IOptimismMintableERC20](https://github.com/ethereum-optimism/optimism/blob/v1.1.4/packages/contracts-bedrock/src/universal/IOptimismMintableERC20.sol) interface such as the logic for the `mint`, `burn`, `remoteToken` and `bridge`, functions of the `IOptimismMintableERC20` interface.
To do the aforementioned, follow the steps mentioned in the [Bridging Your Custom ERC-20 Token to OP Mainnet Using the Standard Bridge](https://docs.optimism.io/builders/dapp-developers/tutorials/standard-bridge-custom-token#create-an-l2-erc-20-token) guide.

:::important
While following the aforementioned guide, ensure your wallet is connected to Lisk Sepolia in step 6.
The rest of the steps are the same for Lisk as they are for Optimism.
:::

<!-- ### Step 2: Submit details of your token

Follow the instructions in the [ethereum-optimism.github.io repository's README](https://github.com/ethereum-optimism/ethereum-optimism.github.io?tab=readme-ov-file#superchain-token-list) and submit a pull request containing the required details for your token.
You must specify a section for `lisk-sepolia` and/or `lisk` in your token's `data.json` file.
For more information, check out the currently active [pull requests](https://github.com/ethereum-optimism/ethereum-optimism.github.io/pulls) for adding an ERC-20 token to the Lisk network.

### Step 3: Await final approval

Tokens approved in the GitHub repository are not necessarily listed on the Lisk Bridge; their listing is neither guaranteed nor automatic.
Lisk Bridge reviews are conducted manually by the Lisk team.
For more information, please visit our [Discord](https://lisk.chat/). -->



