---
title: 'Deploying a new ERC-1155 token on Lisk'
description: 'A guide on how to deploy a new ERC-1155 token on Lisk.'
keywords:
  [
    'Lisk',
    'Token development',
    'Deploy token',
    'ERC',
    'EIP',
    'ERC-1155',
    'Hybrid token',
    'Multi token',
  ]
---

# How to deploy a new ERC-1155 token on Lisk

:::note
We will use Remix IDE for smart contract development in this guide, but feel free to choose a [smart contract development framework](/category/guides/deploying-smart-contract) of your choice to implement your token contract.
:::

## 1. Open Remix

Navigate to [Remix](https://remix.ethereum.org) in your browser.

## 2. Create a new file
Inside the `contracts` folder, click the 📄 ("Create new file") button to create a new empty Solidity file.
You can name this file whatever you'd like, e.g., `MyItems.sol`.

## 3. Copy the example contract

Copy the following example contract into your new file:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MyItems is ERC1155 {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant THORS_HAMMER = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, GOLD, 10**18, "");
        _mint(msg.sender, SILVER, 10**27, "");
        _mint(msg.sender, THORS_HAMMER, 1, "");
        _mint(msg.sender, SWORD, 10**9, "");
        _mint(msg.sender, SHIELD, 10**9, "");
    }
}
```

:::note
Gold, Silver, Sword, and shield are fungible tokens, whilst Thor’s Hammer is a non-fungible token, as we minted only one.
:::

An URI pointing to the JSON metadata of the different items/ tokens needs to be specified in the constructor, see [ERC-1155 contract API](https://docs.openzeppelin.com/contracts/3.x/api/token/erc1155#ERC1155).

The URI can include the string `{id}`, which clients must replace with the actual token ID, in lowercase hexadecimal (with no 0x prefix) and leading zero-padded to 64 hex characters.
The URI MUST point to a JSON file that conforms to the [ERC-1155 Metadata URI JSON Schema](https://eips.ethereum.org/EIPS/eip-1155).


For token ID 2 and uri `https://game.example/api/item/{id}.json` clients would replace `{id}` with `0000000000000000000000000000000000000000000000000000000000000002` to retrieve JSON at `https://game.example/api/item/0000000000000000000000000000000000000000000000000000000000000002.json`.

The JSON document for token ID 2 might look something like:

```json
{
    "name": "Thor's hammer",
    "description": "Mjölnir, the legendary hammer of the Norse god of thunder.",
    "image": "https://game.example/item-id-8u5h2m.png",
    "strength": 20
}
```

For more information about the metadata JSON Schema, check out the [ERC-1155 Metadata URI JSON Schema](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema).

## 4. Compile the contract

Please double-check that the compiler version of the Remix IDE is matching  with the compiler version mentioned in the smart contract: `pragma solidity ^0.8.28;`.

Press the green play button at the top to compile the contract.

## 5. Deploy the contract

Open the `Deploy & run transactions` tab (this looks like an Ethereum logo with an arrow pointing right).
Make sure that your environment is set to "Injected Provider", your wallet is connected to Lisk or Lisk Sepolia network, and Remix has access to your wallet.
Then, select the `MyItems` contract from the deployment dropdown and click the orange `Deploy` button to deploy the contract.
Finally, confirm the contract deployment in your connected wallet.

Check the Remix log messages; they should include the contract address.
Paste this address in BlockScout, to see the contract in the Lisk blockchain explorer: https://sepolia-blockscout.lisk.com/address/0x8b2f45e810F539647e70fBCd6441B73d332Ef1A0

In case you chose to deploy on the Lisk Mainnet, you need to paste the address on https://blockscout.lisk.com instead.

## 6. Verify the contract

If you want to interact with your contract on the block explorer, you, or someone else needs to verify it first.
The above contract has already been verified, so you should be able to view your version on a block explorer already.
For the remainder of this guide, we'll walk you through how to verify your contract with Remix on the Lisk Sepolia Testnet.

You can apply the same steps for verifying a contract on Lisk Mainnet, in case you deployed it there in the previous step, just use https://blockscout.lisk.com instead of https://sepolia-blockscout.lisk.com in step 2.

1. In Remix, rightlick on the contract you wish to verify and select `Flatten`.
This will create a new file `MyItems_flattened.sol`.
2.  Now, switch to your [newly deployed contract](https://sepolia-blockscout.lisk.com/address/0x8b2f45e810F539647e70fBCd6441B73d332Ef1A0) on https://sepolia-blockscout.lisk.com/
3. Go to the `Contract` tab and click on the blue `Verify and Publish` button.
    - (Optional) Set a license for your contract.
    - Choose `Solidity (Single file)` as the verification method.
    - Choose the fitting compiler version for your contract.
    - Disable code optimization.
    - Copy the flattened source code from Remix and paste it into the `Enter the Solidity Contract Code` field.
- Check that all info is correct and click the `Verify and Publish` button, to verify your contract.
  
  Once verified, the code tab will include the ✅ icon, and the source code will be viewable.
