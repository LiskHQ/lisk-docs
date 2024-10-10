---
description: 'A guide on how to deploy a new ERC-721 token on Lisk.'
keywords:
  [
    'Lisk',
    'Token development',
    'Deploy token',
    'ERC',
    'EIP',
    'ERC-721',
    'NFT',
  ]
---

# How to deploy a new ERC-721 token on Lisk

:::note
We will use Remix as framework for smart contract development in this guide, but feel free to choose a [smart contract development framework](/category/building-on-lisk/deploying-smart-contract) of your choice to implement your token contract.
:::

## 1. Open Remix

Navigate to [Remix](https://remix.ethereum.org) in your browser.

## 2. Create a new file

Click the 📄 ("Create new file") button to create a new empty Solidity file.
You can name this file whatever you'd like, e.g. `MyNFT.sol`.

## 3. Copy the example contract

Copy the following example contract into your new file:

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

Press the green play button at the top to compile the contract.

## 5. Deploy the contract

Open the deployment tab (this looks like an Ethereum logo with an arrow pointing right).
Make sure that your environment is set to "Injected Provider", your wallet is connected to Lisk or Lisk Sepolia network, and Remix has access to your wallet.
Then, select the `MyNFT` contract from the deployment dropdown and click the orange `transact` button to deploy the contract and confirm the contract deployment in your connected wallet.

Check the Remix log messages, it should include the contract address.
Paste this address in BlockScout, to see the contract in the Lisk blockchain explorer: https://sepolia-blockscout.lisk.com/address/0x73e7a94dD5760d862F6FD9f8ea5D4245Bb143446

## 6. Verify the contract

If you want to interact with your contract on the block explorer, you, or someone else needs to verify it first.
The above contract has already been verified, so you should be able to view your version on a block explorer already.
For the remainder of this guide, we'll walk through how to verify your contract with Remix on the Lisk Sepolia Testnet.

  - In Remix, rightlick on the contract you wish to verify and select `Flatten`.
  This will create a new file `MyNFT_flattened.sol`.
  - Now, switch to your [newly deployed contract](https://sepolia-blockscout.lisk.com/address/0x73e7a94dD5760d862F6FD9f8ea5D4245Bb143446) on https://sepolia-blockscout.lisk.com/
  - Go to the contract tabe and click on the blue `Verify and Publish` button
    - (Optional) Set a license for your contract.
    - Choose `Solidity (Single file)` as verification method.
    - Choose the fitting compiler version for your contract.
    - Disable code optimization.
    - Copy the flattened source code from Remix and paste it into the `Enter the Solidity Contract Code` field.
  - Check that all info is correct and click the `Verify and Publish` button, to verify your contract.
  
  Once verified, the code tab will include the ✅ icon and source code will be viewable.