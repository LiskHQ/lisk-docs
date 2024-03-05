---
title: Deploying a standard token
slug: /building-on-lisk/add-token-to-lisk/standard-token
description: 'Learn how to add your standard ERC-20 token to Lisk using the standard bridge.'
keywords:
  [
    'ERC-20 contract',
    'Standard token',
    'Lisk Testnet',
    'Sepolia',
    'Ethereum',
    'Lisk Sepolia',
    'Optimism Superchain token list',
  ]
---

# Deploying Your Standard ERC-20 Token to Lisk

:::info
**This tutorial is for developers who want to bridge a new ERC-20 token to Lisk Sepolia.**
If you want to bridge existing tokens, you can skip to the tutorial on [Bridging ERC-20 tokens to Lisk](../bridge-tokens-to-lisk).
:::

In this tutorial you'll learn how to bridge a standard ERC-20 token from Ethereum to Lisk using the Standard Bridge system.
This tutorial is meant for developers who already have an existing ERC-20 token on Ethereum and want to create a bridged representation of that token on Lisk.

This tutorial explains how to use the [`OptimismMintableERC20Factory`](https://github.com/ethereum-optimism/optimism/blob/186e46a47647a51a658e699e9ff047d39444c2de/packages/contracts-bedrock/contracts/universal/OptimismMintableERC20Factory.sol) to deploy a standardized ERC-20 token on Lisk Sepolia.
Tokens created by this factory contract are compatible with the Standard Bridge system and include basic logic for deposits, transfers, and withdrawals.
If you want to include specialized logic within your L2 token, see the tutorial on [Bridging Your Custom ERC-20 Token to Lisk](./custom-token) instead.

## Dependencies

*   [cast](https://book.getfoundry.sh/getting-started/installation)

## Prerequisites

### Get ETH on Sepolia and Lisk Sepolia

This tutorial explains how to create a bridged ERC-20 token on Lisk Sepolia.
You will need to get some ETH on both of these testnets.

:::info
You can use [this faucet](https://sepoliafaucet.com) to get ETH on Sepolia.
You can use the [Superchain Faucet](https://app.optimism.io/faucet?utm_source=docs) to get ETH on Lisk Sepolia.
:::

### Get an L1 ERC-20 Token Address

You will need an L1 ERC-20 token for this tutorial.
If you already have an L1 ERC-20 token deployed on Sepolia, you can skip this step.
Otherwise, you can use the testing token located at [`0x5589BB8228C07c4e15558875fAf2B859f678d129`](https://sepolia.etherscan.io/address/0x5589BB8228C07c4e15558875fAf2B859f678d129) that includes a `faucet()` function that can be used to mint tokens.

## Create an L2 ERC-20 Token

Once you have an L1 ERC-20 token, you can use the [`OptimismMintableERC20Factory`](https://github.com/ethereum-optimism/optimism/blob/186e46a47647a51a658e699e9ff047d39444c2de/packages/contracts-bedrock/contracts/universal/OptimismMintableERC20Factory.sol) to create a corresponding L2 ERC-20 token on Lisk Sepolia.
All tokens created by the factory implement the `IOptimismMintableERC20` interface and are compatible with the Standard Bridge system.

### 1. Add a private key to your environment

You'll need a private key in order to sign transactions.
Set your private key as an environment variable with the `export` command.
Make sure this private key corresponds to an address that has ETH on Lisk Sepolia.

```bash
export TUTORIAL_PRIVATE_KEY=0x...
```

### 2. Add an Lisk Sepolia RPC URL to your environment

You'll need an RPC URL in order to connect to Lisk Sepolia.
Set your RPC URL as an environment variable with the `export` command.

```bash 
export TUTORIAL_RPC_URL=https://rpc.sepolia-api.lisk.com
```

### 3. Add your L1 ERC-20 token address to your environment

You'll need to know the address of your L1 ERC-20 token in order to create a bridged representation of it on Lisk Sepolia.
Set your L1 ERC-20 token address as an environment variable with the `export` command.

```bash
# Replace this with your L1 ERC-20 token if not using the testing token!
export TUTORIAL_L1_ERC20_ADDRESS=0x5589BB8228C07c4e15558875fAf2B859f678d129
```

### 4. Deploy your L2 ERC-20 token

You can now deploy our L2 ERC-20 token using the [`OptimismMintableERC20Factory`](https://github.com/ethereum-optimism/optimism/blob/186e46a47647a51a658e699e9ff047d39444c2de/packages/contracts-bedrock/contracts/universal/OptimismMintableERC20Factory.sol).
Use the `cast` command to trigger the deployment function on the factory contract.
This example command creates a token with the name "My Standard Demo Token" and the symbol "L2TKN".
The resulting L2 ERC-20 token address is printed to the console.

```bash 
cast send 0x4200000000000000000000000000000000000012 "createOptimismMintableERC20(address,string,string)" $TUTORIAL_L1_ERC20_ADDRESS "My Standard Demo Token" "L2TKN" --private-key $PRIVATE_KEY --rpc-url $TUTORIAL_RPC_URL --json | jq -r '.logs[0].topics[2]' | cast parse-bytes32-address
```

## Bridge Some Tokens

Now that you have an L2 ERC-20 token, you can bridge some tokens from L1 to L2.
Check out the tutorial on [Bridging ERC-20 tokens to Lisk](../bridge-tokens-to-lisk.md) to learn how to bridge your L1 ERC-20 to L2s and vice versa using the Optimism SDK.

<!-- ## Add to the Superchain Token List

The [Superchain Token List](https://github.com/ethereum-optimism/ethereum-optimism.github.io#readme) is a common list of tokens deployed on chains within the Optimism Superchain.
This list is used by services like the [Optimism Bridge UI](https://app.optimism.io/bridge).
If you want your OP Mainnet token to be included in this list, take a look at the [review process and merge criteria](https://github.com/ethereum-optimism/ethereum-optimism.github.io#review-process-and-merge-criteria). -->