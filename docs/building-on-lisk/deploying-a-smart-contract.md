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
## Prerequisites

### Node v18+

This guide requires you have Node version 18+ installed.

- Download [Node v18+](https://nodejs.org/en/download/)

If you are using `nvm` to manage your node versions, you can just run `nvm install 18`.

### Wallet funds

**Deploying contracts** to the blockchain requires a **gas fee**.
Therefore, you will need to fund your wallet with ETH to cover those gas fees.

For this guide, you will be deploying a contract to the Lisk Sepolia Testnet. 

You can deposit the required tokens by using the [Lisk Bridge](https://sepolia-bridge.lisk.com/bridge/lisk-sepolia-testnet).

In case your wallet doesn't hold enough `SepoliaETH`, use one of the available faucets for the Ethereum Sepolia Testnet, like [https://sepoliafaucet.com](https://sepoliafaucet.com/) to receive free Testnet ETH.

## Creating a project
Before you can begin deploying smart contracts to Lisk, you need to set up your development environment by creating a Node.js project.

To create a new Node.js project, run:

```bash
npm init --y
```

Next, you will need to install Hardhat and create a new Hardhat project.

To install Hardhat, run:

```bash
npm install --save-dev hardhat
```

To create a new Hardhat project, run:

```bash
npx hardhat
```

Select `Create a TypeScript project` then press _Enter_ to confirm the project root.

Select `y` for both adding a `.gitignore` and loading the sample project. 
Optionally, you can decide to share crash reports and usage data with HardHat.

```
✔ What do you want to do? · Create a TypeScript project
✔ Hardhat project root: · /Users/mona/git/hardhat-test
✔ Do you want to add a .gitignore? (Y/n) · y
✔ Help us improve Hardhat with anonymous crash reports & basic usage data? (Y/n) · y
✔ Do you want to install this sample project's dependencies with npm (@nomicfoundation/hardhat-toolbox)? (Y/n) · y
```

It will take a moment for the project setup process to complete.

## Configuring Hardhat with Lisk

In order to deploy smart contracts to the Lisk network, you will need to configure your Hardhat project and add the Lisk network.

This example uses [dotenv](https://www.npmjs.com/package/dotenv) to load the `WALLET_KEY` environment variable from a `.env` file to `process.env.WALLET_KEY`.
You should use a similar method to avoid hardcoding your private keys within your source code.

```bash
npm install --save-dev dotenv
```

Once you have `dotenv` installed, create a `.env` file with the following content:

```
WALLET_KEY=<YOUR_PRIVATE_KEY>
```

Substite `<YOUR_PRIVATE_KEY>` with the private key for your wallet.

:::caution

`WALLET_KEY` is the private key of the wallet to use when deploying a contract.
Follow the instructions of your wallet on how to get your private key.
E.g. for **MetaMask**, please follow [these instructions](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key).
**It is critical that you do NOT commit this to a public repo**

:::

To configure Hardhat to use Lisk, add Lisk as a network to your project's `hardhat.config.ts` file:

```ts title="hardhat.config.ts"
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.23",
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

## Creating the contract
For ease and security, we’ll use the `ERC721` interface provided by the [OpenZeppelin Contracts library](https://docs.openzeppelin.com/contracts/5.x/) to create an NFT smart contract.
With OpenZeppelin, we don’t need to write the whole ERC-721 interface. Instead, we can import the library contract and use its functions.

To add the OpenZeppelin Contracts library to your project, run:

```bash
npm install --save @openzeppelin/contracts
```

In your project, delete the `contracts/Lock.sol` contract that was generated with the project.
(You can also delete the `test/Lock.ts` test file, but you should add your own tests ASAP!).

Add the code below to a new file called `contracts/NFT.sol`.

```sol title="contracts/NFT.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    uint256 public currentTokenId;

    constructor() ERC721("NFT Name", "NFT") {}

    function mint(address recipient) public payable returns (uint256) {
        uint256 newItemId = ++currentTokenId;
        _safeMint(recipient, newItemId);
        return newItemId;
    }
}
```

## Compiling the smart contract
To compile the contract using Hardhat, simply run:

```bash
npx hardhat compile
```

After successful compilation, you should see a new folder `artifacts/`, which contains the [compilation artifacts](https://hardhat.org/hardhat-runner/docs/advanced/artifacts).

## Deploying the smart contract

Once your contract has been successfully compiled, you can deploy the contract to the Lisk Sepolia test network.

To deploy the contract to the Lisk Sepolia test network, you'll need to modify the `scripts/deploy.ts` in your project:

```ts title="scripts/deploy.ts"
import { ethers } from 'hardhat';

async function main() {
  const nft = await ethers.deployContract('NFT');

  await nft.waitForDeployment();

  console.log('NFT Contract Deployed at ' + nft.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

You'll also need Testnet ETH in your wallet.
See the [Prerequisites](#prerequisites) if you haven't done that yet.
Otherwise, the deployment attempt will fail.

Finally, run:

```bash
npx hardhat run scripts/deploy.ts --network lisk-sepolia
```

The contract will be deployed on the Lisk Sepolia Testnet.
You can view the deployment status and contract by using a block explorer and searching for the address returned by your deploy script.

If you're deploying a new or modified contract, you'll need to verify it first.

### Verifying the Smart Contract

If you want to interact with your contract on the block explorer, you, or someone, needs to verify it first.
The above contract has already been verified, so you should be able to view your version on a block explorer already.
For the remainder of this guide, we'll walk through how to verify your contract on Lisk Sepolia testnet.

In `hardhat.config.ts`, configure Lisk Sepolia as a custom network.
Add the following to your `HardhatUserConfig`:

```ts title="hardhat.config.ts"
// Hardhat expects etherscan here, even if you're using Blockscout.
etherscan: {
   apiKey: {
    "lisk-sepolia": ""
   },
   customChains: [
    {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
            apiURL: "https://lisk-sepolia.blockscout.com/api",
            browserURL: "https://lisk-sepolia.blockscout.com/"
        }
     }
   ]
 },
```

Now, you can verify your contract.
Grab the deployed address and run:

```bash
npx hardhat verify --network lisk-sepolia <deployed address>
```

You should see an output similar to:

```text
Successfully submitted source code for contract
contracts/NFT.sol:NFT at 0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D
for verification on the block explorer. Waiting for verification result...

Successfully verified contract NFT on the block explorer.
https://lisk-sepolia.blockscout.com/address/0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D#code
```

:::info

You can't re-verify a contract identical to one that has already been verified.
If you attempt to do so, such as verifying the above contract, you'll get an error similar to:

```text
Error in plugin @nomiclabs/hardhat-etherscan: The API responded with an unexpected message.
Contract verification may have succeeded and should be checked manually.
Message: Already Verified
```

:::

View your contract on BlockScout, by following the [link](https://lisk-sepolia.blockscout.com/address/0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D#code) displayed in the output message, to confirm that the contract is verified.

## Interacting with the Smart Contract

After [the contract is verified](#verifying-the-smart-contract), you can use the `Read Contract` and `Write Contract` tabs to interact with the deployed contract via BlockScout.
You'll need to connect your wallet first, by clicking the `Connect Wallet` button.

---