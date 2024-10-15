---
title: 'Deploying a new ERC-20 token on Lisk'
description: 'A guide on how to deploy a new ERC-20 token on Lisk.'
keywords:
  [
    'Lisk',
    'Token development',
    'Deploy token',
    'ERC',
    'EIP',
    'ERC-20',
    'Fungible token',
  ]
---

# How to deploy a new ERC-20 token on Lisk

This guide explains how to deploy a new ERC-20 token to Lisk.
In case you want to bridge an existing token from Ethereum, please refer to the guide [Bridging an L1 token to Lisk](../add-token-to-lisk).

:::note
We will use Remix IDE for smart contract development in this guide, but feel free to choose a [smart contract development framework](/category/building-on-lisk/deploying-smart-contract) of your choice to implement your token contract.
:::

## 1. Open Remix

Navigate to [Remix](https://remix.ethereum.org) in your browser.

## 2. Create a new file

Inside the `contracts` folder, click the 📄 ("Create new file") button to create a new empty Solidity file.
You can name this file whatever you'd like, e.g., `MyToken.sol`.

## 3. Copy the example contract

Copy the following example contract into your new file:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(string memory _name, string memory _symbol, uint256 initialSupply) ERC20(_name, _symbol) {
        _mint(msg.sender, initialSupply);
    }
    
}
```

## 4. Compile the contract

Please double-check that the compiler version of the Remix IDE is matching  with the compiler version mentioned in the smart contract: `pragma solidity ^0.8.28;`.

Press the green play button at the top to compile the contract.

## 5. Deploy the contract

Open the `Deploy & run transactions` tab (this looks like an Ethereum logo with an arrow pointing right).
Make sure that your environment is set to "Injected Provider", your wallet is connected to the Lisk or Lisk Sepolia network, and Remix has access to your wallet.
Then, select the `MyToken` contract from the deployment dropdown and deploy it with the parameters of your choice, for example:

- Name: MyToken
- Symbol: MYT
- InitalSupply: 1000000000000000000000

Click on the orange `Deploy` button to deploy the contract.
Finally, confirm the contract deployment in your connected wallet.

Check the Remix log messages; they should include the contract address.
Paste this address in BlockScout, to see the contract in the Lisk blockchain explorer: https://sepolia-blockscout.lisk.com/address/0x6e8fF2E042c1637a2Da9563763c62362a3bbD712

## 6. Verify the contract

If you want to interact with your contract on the block explorer, you, or someone else needs to verify it first.
The above contract has already been verified, so you should be able to view your version on a block explorer already.
For the remainder of this guide, we'll walk through how to verify your contract with Remix on the Lisk Sepolia Testnet.

1. In Remix, rightlick on the contract you wish to verify and select `Flatten`.
  This will create a new file `MyToken_flattened.sol`.
2. Now, switch to your [newly deployed contract](https://sepolia-blockscout.lisk.com/address/0x6e8fF2E042c1637a2Da9563763c62362a3bbD712) on https://sepolia-blockscout.lisk.com/
3. Go to the contract tab and click on the blue `Verify and Publish` button.
    - (Optional) Set a license for your contract.
    - Choose `Solidity (Single file)` as the verification method.
    - Choose the fitting compiler version for your contract.
    - Disable code optimization.
    - Copy the flattened source code from Remix and paste it into the `Enter the Solidity Contract Code` field.
4. Check that all info is correct and click the `Verify and Publish` button, to verify your contract.
  
  Once verified, the code tab will include the ✅ icon, and the source code will be viewable.
