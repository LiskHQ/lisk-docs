---
title: ... with Foundry
slug: /building-on-lisk/deploying-smart-contract/with-Foundry
description: "A guide on deploying a smart contract on the Lisk test network using Foundry. Includes instructions for setting up the environment, compiling, and deploying the smart contract."
keywords: [
    "Foundry",
    "smart contract",
    "ERC-20", "Lisk",
    "Lisk test network",
    "Lisk testnet",
    "Lisk Sepolia",
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

# Deploying a smart contract with Foundry

In this guide we discuss, the basics of [Foundry](https://book.getfoundry.sh/) development toolchain and will describe how to create and deploy a smart contract with Foundry to the **Lisk Sepolia** testnet.

Foundry is a powerful suite of tools to develop, test, and debug your smart contracts. It comprises several individual tools:

- `forge`: the main workhorse of Foundry — for developing, testing, compiling, and deploying smart contracts
- `cast`: a command-line tool for performing Ethereum RPC calls (e.g., interacting with contracts, sending transactions, and getting onchain data)
- `anvil`: a local testnet node, for testing contract behavior from a frontend or over RPC
- `chisel`: a Solidity [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop), for trying out Solidity snippets on a local or forked network


## Prerequisites
You need:

- A basic understanding of [Solidity](https://soliditylang.org/).
- This guide requires you have Foundry installed.
  - From the command-line (terminal), run: `curl -L https://foundry.paradigm.xyz | bash`
  - Then run `foundryup`, to install the latest (nightly) build of Foundry
For more information, see the Foundry Book [installation guide](https://book.getfoundry.sh/getting-started/installation).

<!-- ### Node v18+

This guide requires you to have Node version 18+ installed.

- Download [Node v18+](https://nodejs.org/en/download/)

If you are using `nvm` to manage your node versions, you can just run `nvm install 18`. -->

### Wallet funds

**Deploying contracts** to the blockchain requires a **gas fee**.
Therefore, you will need to fund your wallet with ETH to cover those gas fees.

For this guide, you will be deploying a contract to the Lisk Sepolia Testnet. 

You can deposit the required tokens by using the [Lisk Bridge](https://sepolia-bridge.lisk.com/bridge/lisk-sepolia-testnet).

In case your wallet doesn't hold enough `SepoliaETH`, use one of the available faucets for the **Ethereum Sepolia** Testnet like [https://sepoliafaucet.com](https://sepoliafaucet.com/) to receive free Testnet ETH.
Then, use the aforementioned Lisk Bridge to send tokens from the **Ethereum Sepolia Testnet** to the **Lisk Sepolia Testnet**.

## Creating a project
Before you can begin deploying smart contracts to Lisk, you need to set up your development environment by creating a Foundry project.

You can separately create a new directory and then initialize a Foundry project, or you can let Foundry create a directory and initiate a Foundry project by running the following command:

```bash
forge init foundry_app && cd foundry_app
```
This command will create a `foundry_app` and will change the terminal's directory to the aforementioned folder as well.

```text
Initializing /XYZ/L2/25/foundry_app/foundry_app...
Installing forge-std in /XYZ/L2/25/foundry_app/foundry_app/lib/forge-std (url: Some("https://github.com/foundry-rs/forge-std"), tag: None)
Cloning into '/XYZ/L2/25/foundry_app/foundry_app/lib/forge-std'...
remote: Enumerating objects: 2181, done.
remote: Counting objects: 100% (2177/2177), done.
remote: Compressing objects: 100% (737/737), done.
remote: Total 2181 (delta 1446), reused 2066 (delta 1373), pack-reused 4
Receiving objects: 100% (2181/2181), 614.11 KiB | 766.00 KiB/s, done.
Resolving deltas: 100% (1446/1446), done.
Submodule 'lib/ds-test' (https://github.com/dapphub/ds-test) registered for path 'lib/ds-test'
Cloning into '/XYZ/L2/25/foundry_app/foundry_app/lib/forge-std/lib/ds-test'...
remote: Enumerating objects: 313, done.        
remote: Counting objects: 100% (171/171), done.        
remote: Compressing objects: 100% (79/79), done.        
remote: Total 313 (delta 91), reused 132 (delta 83), pack-reused 142        
Receiving objects: 100% (313/313), 71.35 KiB | 521.00 KiB/s, done.
Resolving deltas: 100% (130/130), done.
    Installed forge-std v1.7.6
    Initialized forge project
```
By default, any application built with Foundry will have a similar directory structure to the following:

```bash
.
├── .github
├── lib
├── script
│   └── Counter.s.sol
├── src
│   └── Counter.sol
├── test
│   └── Counter.t.sol
├── .gitignore
├── .gitmodules
├── foundry.toml
└── README.md
```

For now, delete the files present in the `script/Counter.s.sol`, `src/Counter.sol` and `test/Counter.t.sol` as we will be creating a contract, relevant script and a test code ourselves in the following guide.

## Creating the contract
For ease and security, we’ll use the `ERC20` interface provided by the [OpenZeppelin Contracts library](https://docs.openzeppelin.com/contracts/5.x/erc20) to create a simple ERC-20 smart contract.
With OpenZeppelin, we don’t need to write the whole ERC-20 interface.
Instead, we can import the library contract and use its functions from the get go.

To add the OpenZeppelin Contracts library to your project, run:

```bash
forge install openzeppelin/openzeppelin-contracts
```
Inside the `src` folder, create a smart contract called `StakeContract.sol` and add the code below to the newly created file.

```sol title="src/StakeContract.sol"
// SPDX-License-Identifier : MIT
pragma solidity ^0.8.23;

import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

error TransferFailed();

contract StakeContract{
    mapping (address => mapping(address => uint256)) public stakedBalances;

    function stake(uint256 amount, address token) external returns (bool) {
        stakedBalances[msg.sender][token] += amount;
        bool success = IERC20(token).transferFrom(msg.sender, address(this), amount);
        if(!success){
            revert TransferFailed();
        } else {
            return success;
        }
    }

    function getStakedBalance(){
      return stakedBalances;
    }
}   
```

The aforementioned is a very simple ERC-20 Staking contract. 
For the purpose of simplicity, users can use the `stake` function of the contract to stake their desired amount.
They can also then retrieve the details of amount staked to the contract by invoking the the contract also allows 

## Compiling the smart contract
To compile the contract using Foundry, simply run:

```bash
forge build
```
If the smart contract doesn't have any errors, you will see the following output on the terminal:

```text
[⠢] Compiling...
[⠰] Compiling 1 files with 0.8.24
[⠔] Solc 0.8.24 finished in 40.36ms
Compiler run successful!
```

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

<!-- TODO: Add link to the block explorer section -->
The contract will be deployed on the Lisk Sepolia Testnet.
You can view the deployment status and contract by using a block explorer and searching for the address returned by your deploy script.

If you're deploying a new or modified contract, you'll need to verify it first.

## Verifying the Smart Contract

If you want to interact with your contract on the block explorer, you, or someone else needs to verify it first.
The above contract has already been verified, so you should be able to view your version on a block explorer already.
For the remainder of this guide, we'll walk through how to verify your contract on the Lisk Sepolia Testnet.

In `hardhat.config.ts`, configure Lisk Sepolia as a custom network.
Add the following to your `HardhatUserConfig`:

```ts title="hardhat.config.ts"
// Add the following information after the "networks" configuration of the HardhatUserConfig
const config: HardhatUserConfig = {
  // Hardhat expects etherscan here, even if you're using Blockscout.
  etherscan: {
    // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
     apiKey: {
      "lisk-sepolia": "123"
     },
     customChains: [
      {
          network: "lisk-sepolia",
          chainId: 4202,
          urls: {
              apiURL: "https://sepolia-blockscout.lisk.com/api",
              browserURL: "https://sepolia-blockscout.lisk.com"
          }
       }
     ]
   },
   sourcify: {
    enabled: false
  },
};
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
https://sepolia-blockscout.lisk.com/address/0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D#code
```

:::info

You can't re-verify a contract identical to one that has already been verified.
If you attempt to do so, such as verifying the above contract, you'll get a message similar to:

```text                                                                      
The contract 0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D has already been verified on Etherscan.
https://sepolia-blockscout.lisk.com/address/0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D#code
```

:::

View your contract on BlockScout, by following the [link to the deployed contract](https://sepolia-blockscout.lisk.com/address/0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D?tab=contract) displayed in the previous steps output message.
The block explorer will confirm that the contract is verified and allow you to [interact](#interacting-with-the-smart-contract) with it.

## Interacting with the Smart Contract

After [the contract is verified](#verifying-the-smart-contract), you can use the `Read Contract` and `Write Contract` tabs to interact with the deployed contract via [BlockScout](https://sepolia-blockscout.lisk.com/address/0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D?tab=contract).
Don't forget to update the contract address in the Blockscout URL.
You'll also need to connect your wallet first, by clicking the `Connect Wallet` button.




<!-- Next, you will need to install [Hardhat](https://hardhat.org/tutorial) and create a new Hardhat project.

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
✔ Hardhat project root: · /Users/lisk/git/hardhat-test
✔ Do you want to add a .gitignore? (Y/n) · y
✔ Help us improve Hardhat with anonymous crash reports & basic usage data? (Y/n) · y
✔ Do you want to install this sample project's dependencies with npm (@nomicfoundation/hardhat-toolbox)? (Y/n) · y
```

It will take a moment for the project setup process to complete. -->

<!-- ## Configuring Hardhat with Lisk

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

Substitute `<YOUR_PRIVATE_KEY>` with the private key for your wallet.

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
``` -->