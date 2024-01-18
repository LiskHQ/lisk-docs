---
title: How to deploy a smart contract (Hardhat)
slug: /building-on-lisk/deploying-a-smart-contract
description: "A guide on deploying a smart contract on the Lisk test network using Hardhat. Includes instructions for setting up the environment, compiling, and deploying the smart contract."
keywords: [
    "Hardhat",
    "smart contract",
    "ERC-721", "Lisk",
    "Lisk test network",
    "Lisk testnet",
    "Node.js",
    "Solidity",
    "smart contract deployment",
    "deploy a smart contract",
    "deploying smart contracts",
    "build on lisk",
    "write smart contract",
    "smart contract development"
    ]
---

# How to deploy a smart contract (Hardhat)

## Creating a project
```bash
% npx hardhat
```

```
✔ What do you want to do? · Create a TypeScript project
✔ Hardhat project root: · /Users/mona/git/hardhat-test
✔ Do you want to add a .gitignore? (Y/n) · y
✖ Help us improve Hardhat with anonymous crash reports & basic usage data? (Y/n) · y
✔ Do you want to install this sample project's dependencies with npm (@nomicfoundation/hardhat-toolbox)? (Y/n) · y
```

## Configuring Hardhat with Lisk

In order to deploy smart contracts to the Lisk network, you will need to configure your Hardhat project and add the Lisk network.

This example uses [dotenv](https://www.npmjs.com/package/dotenv) to load the `WALLET_KEY` environment variable from a `.env` file to `process.env.WALLET_KEY`. You should use a similar method to avoid hardcoding your private keys within your source code.

```bash
npm install --save-dev dotenv
```

Once you have `dotenv` installed, create a `.env` file with the following content:

```
WALLET_KEY=<YOUR_PRIVATE_KEY>
```

Substite `<YOUR_PRIVATE_KEY>` with the private key for your wallet.

:::caution

`WALLET_KEY` is the private key of the wallet to use when deploying a contract. Follow the instructions of your wallet on how to get your private key. E.g. for **MetaMask**, please follow these [instructions](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key). **It is critical that you do NOT commit this to a public repo**

:::

To configure Hardhat to use Lisk, add Lisk as a network to your project's `hardhat.config.ts` file:

```ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    // for testnet
    'lisk-sepolia': {
      url: 'https://rpc.sepolia-api.lisk.com',
      accounts: [process.env.WALLET_KEY as string],
      gasPrice: 1000000000,
    },
  },
};

export default config;
```

## Compiling the smart contract

## Deploying the smart contract
