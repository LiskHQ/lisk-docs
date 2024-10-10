# Token development

This page gives an introduction into token development on Lisk.
This includes an explanation of ERCs, a summary of the most important token standards and examples how to deploy these tokens on Lisk.

## ERC token standards

A standard interface allows any tokens on Ethereum to be re-used by other applications: from wallets to decentralized exchanges.
**ERCs**(= Ethereum Request for Comments) are a set of application-level standards and conventions, including contract standards such as token standards (ERC-20), name registries (ERC-137), URI schemes, library/package formats, and wallet formats for the Ethereum blockchain.

ERCs are a subcategory of **EIPs**(= Ethereum Inprovemnt Proposals).
New EIPs are added following the process outlined in [EIP-1](https://eips.ethereum.org/EIPS/eip-1).

The full list of [ERC proposals](https://eips.ethereum.org/erc).

A summary of some interesting ERC tokens standars can be found below.

- [ERC-20](#erc-20): Introduces a standard for Fungible Tokens.
- [ERC-721](#erc-721): Introduces a standard for Non-Fungible Tokens.
- [ERC-1155](#erc-1155): Introduces a standard for Hybrid Tokens.

## ERC-20
Introduces a standard for Fungible Tokens.

### How to deploy a new ERC-20 token on Lisk

This guide explains how to deploy a new ERC-20 token to Lisk.
In case you want to bridge an existing token from Ethereum, please refer to the guide [Bridging an L1 token to Lisk](add-token-to-lisk).

:::note
We will use Remix as framework for smart contract development in this guide, but feel free to choose a [smart contract development framework](/category/building-on-lisk/deploying-smart-contract) of your choice to implement your token contract.
:::

1. Open Remix

Navigate to [Remix](https://remix.ethereum.org) in your browser.

2. Create a new file

Click the 📄 ("Create new file") button to create a new empty Solidity file.
You can name this file whatever you'd like, e.g. `MyToken.sol`.

3. Copy the example contract

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

4. Compile the contract

Press the green play button at the top to compile the contract.

5. Deploy the contract

Open the deployment tab (this looks like an Ethereum logo with an arrow pointing right).
Make sure that your environment is set to "Injected Provider", your wallet is connected to the Lisk Sepolia network, and Remix has access to your wallet.
Then, select the `MyNFT` contract from the deployment dropdown and click the orange `Deploy` button to deploy the contract.
Finally, confirm the contract deployment in your connected wallet.

Check the Remix log messages, it should include the contract address.
Paste this address in BlockScout, to see the contract in the Lisk blockchain explorer: https://sepolia-blockscout.lisk.com/address/0x6e8fF2E042c1637a2Da9563763c62362a3bbD712

6. Verify the contract

If you want to interact with your contract on the block explorer, you, or someone else needs to verify it first.
The above contract has already been verified, so you should be able to view your version on a block explorer already.
For the remainder of this guide, we'll walk through how to verify your contract with Remix on the Lisk Sepolia Testnet.

  - In Remix, rightlick on the contract you wish to verify and select `Flatten`.
  This will create a new file `MyToken_flattened.sol`.
  - Now, switch to your [newly deployed contract](https://sepolia-blockscout.lisk.com/address/0x6e8fF2E042c1637a2Da9563763c62362a3bbD712) on https://sepolia-blockscout.lisk.com/
  - Go to the contract tabe and click on the blue `Verify and Publish` button
    - (Optional) Set a license for your contract.
    - Choose `Solidity (Single file)` as verification method.
    - Choose the fitting compiler version for your contract.
    - Disable code optimization.
    - Copy the flattened source code from Remix and paste it into the `Enter the Solidity Contract Code` field.
  - Check that all info is correct and click the `Verify and Publish` button, to verify your contract.
  
  Once verified, the code tab will include the ✅ icon and source code will be viewable.

### Further reading
- [Understand the ERC-20 token smart contract](https://ethereum.org/en/developers/tutorials/understand-the-erc-20-token-smart-contract/)
- [ERC-20 EIP](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin: ERC-20 implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Ethereum Docs: ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)
- [Solidity by example: ERC-20](https://solidity-by-example.org/app/erc20/)
- [Alchemy: Complete guide to ERC-20](https://www.alchemy.com/overviews/erc20-solidity)

## ERC-721
Introduces a standard for Non-Fungible Tokens.

### How to deploy a new ERC-721 token on Lisk

:::note
We will use Remix as framework for smart contract development in this guide, but feel free to choose a [smart contract development framework](/category/building-on-lisk/deploying-smart-contract) of your choice to implement your token contract.
:::

1. Open Remix

Navigate to [Remix](https://remix.ethereum.org) in your browser.

2. Create a new file

Click the 📄 ("Create new file") button to create a new empty Solidity file.
You can name this file whatever you'd like, e.g. `MyNFT.sol`.

3. Copy the example contract

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

4. Compile the contract

Press the green play button at the top to compile the contract.

5. Deploy the contract

Open the deployment tab (this looks like an Ethereum logo with an arrow pointing right).
Make sure that your environment is set to "Injected Provider", your wallet is connected to Lisk or Lisk Sepolia network, and Remix has access to your wallet.
Then, select the `MyNFT` contract from the deployment dropdown and click the orange `transact` button to deploy the contract and confirm the contract deployment in your connected wallet.

Check the Remix log messages, it should include the contract address.
Paste this address in BlockScout, to see the contract in the Lisk blockchain explorer: https://sepolia-blockscout.lisk.com/address/0x73e7a94dD5760d862F6FD9f8ea5D4245Bb143446

6. Verify the contract

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

### Further reading
- [Ethereum Docs: ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)
- [How to implement an ERC-721 market](https://ethereum.org/en/developers/tutorials/how-to-implement-an-erc721-market/)

## ERC-1155

A standard interface for contracts that manage multiple token types.
A single deployed contract may include any combination of fungible tokens, non-fungible tokens or other configurations (e.g. semi-fungible tokens).

:::warning
Please note that there is currently less ecosystem support for ERC-1155 as compared with ERC-20 or ERC-721.
:::

### How to deploy a new ERC-1155 token on Lisk

:::note
We will use Remix as framework for smart contract development in this guide, but feel free to choose a [smart contract development framework](/category/building-on-lisk/deploying-smart-contract) of your choice to implement your token contract.
:::

1. Open Remix

Navigate to [Remix](https://remix.ethereum.org) in your browser.

2. Create a new file

Click the 📄 ("Create new file") button to create a new empty Solidity file.
You can name this file whatever you'd like, e.g. `MyItems.sol`.

3. Copy the example contract

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
Gold, Silver,Sword and shield are fungible tokens whilst Thor’s Hammer is a non-fungible token as we minted only one.
:::

An URI pointing to the JSON metadata of the different items/ tokens needs to be specified in the constructor, see [ERC-1155 contract API](https://docs.openzeppelin.com/contracts/3.x/api/token/erc1155#ERC1155).

The URI can include the string `{id}` which clients must replace with the actual token ID, in lowercase hexadecimal (with no 0x prefix) and leading zero padded to 64 hex characters.
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

4. Compile the contract

Press the green play button at the top to compile the contract.

5. Deploy the contract

Open the deployment tab (this looks like an Ethereum logo with an arrow pointing right).
Make sure that your environment is set to "Injected Provider", your wallet is connected to Lisk or Lisk Sepolia network, and Remix has access to your wallet.
Then, select the `MyItems` contract from the deployment dropdown and click the orange `Deploy` button to deploy the contract.
Finally, confirm the contract deployment in your connected wallet.

Check the Remix log messages, it should include the contract address.
Paste this address in BlockScout, to see the contract in the Lisk blockchain explorer: https://sepolia-blockscout.lisk.com/address/0x8b2f45e810F539647e70fBCd6441B73d332Ef1A0

6. Verify the contract

If you want to interact with your contract on the block explorer, you, or someone else needs to verify it first.
The above contract has already been verified, so you should be able to view your version on a block explorer already.
For the remainder of this guide, we'll walk through how to verify your contract with Remix on the Lisk Sepolia Testnet.

  - In Remix, rightlick on the contract you wish to verify and select `Flatten`.
  This will create a new file `MyItems_flattened.sol`.
  - Now, switch to your [newly deployed contract](https://sepolia-blockscout.lisk.com/address/0x8b2f45e810F539647e70fBCd6441B73d332Ef1A0) on https://sepolia-blockscout.lisk.com/
  - Go to the contract tabe and click on the blue `Verify and Publish` button
    - (Optional) Set a license for your contract.
    - Choose `Solidity (Single file)` as verification method.
    - Choose the fitting compiler version for your contract.
    - Disable code optimization.
    - Copy the flattened source code from Remix and paste it into the `Enter the Solidity Contract Code` field.
  - Check that all info is correct and click the `Verify and Publish` button, to verify your contract.
  
  Once verified, the code tab will include the ✅ icon and source code will be viewable.

### Further reading
- [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/)