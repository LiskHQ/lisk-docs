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

## Creating a project
```bash
% npx hardhat
```

```
✔ What do you want to do? · Create a TypeScript project
✔ Hardhat project root: · /Users/mona/git/hardhat-test
✔ Do you want to add a .gitignore? (Y/n) · y
✔ Help us improve Hardhat with anonymous crash reports & basic usage data? (Y/n) · y
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

```sol
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

```bash
npx hardhat compile
```

## Deploying the smart contract

Once your contract has been successfully compiled, you can deploy the contract to the Base Sepolia test network.

To deploy the contract to the Base Sepolia test network, you'll need to modify the `scripts/deploy.ts` in your project:

```ts
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

You'll also need testnet ETH in your wallet.

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

