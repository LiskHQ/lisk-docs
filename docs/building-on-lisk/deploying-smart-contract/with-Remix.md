---
title: ... with Remix
slug: /building-on-lisk/deploying-smart-contract/with-Hardhat
description: "A guide on deploying a smart contract on the Lisk network using Remix. Includes instructions for setting up the environment, compiling, deploying and verifying the smart contract."
keywords: [
    "Remix",
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

# Deploying a smart contract with Remix

On this page, you will learn how to create, deploy and verify a smart contract with the Remix IDE to the **Lisk Sepolia** testnet.

Remix Online IDE is a powerful toolset for developing, deploying, debugging, and testing Ethereum and EVM-compatible smart contracts.
It requires no setup and can be accessed directly through the browser under https://remix.ethereum.org/.

## Prerequites

### Wallet funds

**Deploying contracts** to the blockchain requires a **gas fee**.
Therefore, you will need to fund your wallet with ETH to cover those gas fees.

For this guide, you will be deploying a contract to the Lisk Sepolia Testnet. 

You can deposit the required tokens by using the [Lisk Bridge](https://sepolia-bridge.lisk.com/bridge/lisk-sepolia-testnet).

In case your wallet doesn't hold enough `SepoliaETH`, use one of the available faucets for the **Ethereum Sepolia** Testnet like [https://sepoliafaucet.com](https://sepoliafaucet.com/) to receive free Testnet ETH.
Then, use the aforementioned Lisk Bridge to send tokens from the **Ethereum Sepolia Testnet** to the **Lisk Sepolia Testnet**.

:::note
You can deploy a contract on Lisk Mainnet by adopting the same process.
For deploying to Mainnet, ensure that your wallet has enough ETH.
:::

## 1. Open Remix

Navigate to [Remix](https://remix.ethereum.org) in your browser.

## 2. Create a new file

Inside the `contracts` folder, click the 📄 ("Create new file") button to create a new empty Solidity file.
You can name this file whatever you'd like, e.g., `MyNFT.sol`.

## 3. Copy the example contract

Copy the following example contract into your new file to deploy a simple NFT contract, or replace it with your own contract you wish to deploy:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    uint256 public currentTokenId;

    constructor() ERC721("My NFT", "MNFT") {}

    function mint(address recipient) public returns (uint256) {
        uint256 newItemId = ++currentTokenId;
        _safeMint(recipient, newItemId);
        return newItemId;
    }
}
```

## 4. Compile the contract

Please double-check that the compiler version of the Remix IDE is matching with the compiler version mentioned in the smart contract: `pragma solidity ^0.8.28;`.

Press the green play button at the top to compile the contract.

## 5. Deploy the contract

Open the `Deploy & run transactions` tab (this looks like an Ethereum logo with an arrow pointing right).
Make sure that your environment is set to "Injected Provider", your wallet is connected to Lisk or Lisk Sepolia network, and Remix has access to your wallet.
Then, select the `MyNFT` contract from the deployment dropdown and click the orange `Deploy` button to deploy the contract and confirm the contract deployment in your connected wallet.

Check the Remix log messages; they should include the contract address.
Paste this address in BlockScout, to see the contract in the Lisk blockchain explorer: https://sepolia-blockscout.lisk.com/address/0x73e7a94dD5760d862F6FD9f8ea5D4245Bb143446

In case you chose to deploy on the Lisk Mainnet, you need to paste the address on https://blockscout.lisk.com instead.

## 6. Verify the contract

If you want to interact with your contract on the block explorer, you first need to verify it.
The above contract has already been verified, so you should be able to view your version on a block explorer already.
For the remainder of this guide, we'll walk through how to verify your contract with Remix on the Lisk Sepolia Testnet.

You can apply the same steps for verifying a contract on Lisk Mainnet, in case you deployed it there in the previous step, just use https://blockscout.lisk.com instead of https://sepolia-blockscout.lisk.com in step 2.

  - In Remix, rightlick on the contract you wish to verify and select `Flatten`.
  This will create a new file `MyNFT_flattened.sol`.
  - Now, switch to your [newly deployed contract](https://sepolia-blockscout.lisk.com/address/0x73e7a94dD5760d862F6FD9f8ea5D4245Bb143446) on https://sepolia-blockscout.lisk.com/
  - Go to the contract tab and click on the blue `Verify and Publish` button.
    - (Optional) Set a license for your contract.
    - Choose `Solidity (Single file)` as the verification method.
    - Choose the fitting compiler version for your contract.
    - Disable code optimization.
    - Copy the flattened source code from Remix and paste it into the `Enter the Solidity Contract Code` field.
  - Check that all info is correct and click the `Verify and Publish` button, to verify your contract.
  
  Once verified, the code tab will include the ✅ icon, and the source code will be viewable.

## Interacting with the Smart Contract

After [the contract is verified](#verifying-the-smart-contract), you can use the `Read Contract` and `Write Contract` tabs to interact with the deployed contract via BlockScout: https://sepolia-blockscout.lisk.com/address/0x73e7a94dD5760d862F6FD9f8ea5D4245Bb143446?tab=contract.
Don't forget to update the contract address in the Blockscout URL.
You'll also need to connect your wallet first, by clicking the `Connect Wallet` button.