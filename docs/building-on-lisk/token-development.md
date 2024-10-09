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

#### The token contract

1. Open Remix

Navigate to [Remix](https://remix.ethereum.org) in your browser.

2. Create a new file

Click the 📄 ("Create new file") button to create a new empty Solidity file.
You can name this file whatever you'd like, e.g. `MyToken.sol`.

3. Copy the example contract

Copy the following example contract into your new file:

```solidity
pragma solidity ^0.8.26;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(string memory _name, string memory _symbol, uint256 initialSupply) ERC20(_name, _symbol) {
        _mint(msg.sender, initialSupply);
    }
    
}
```

4. Compile the contract

Save the file to automatically compile the contract.
If you've disabled auto-compile, you'll need to manually compile the contract by clicking the "Solidity Compiler" tab (this looks like the letter "S") and pressing the blue "Compile" button.

5. Deploy the contract

Open the deployment tab (this looks like an Ethereum logo with an arrow pointing right).
Make sure that your environment is set to "Injected Provider", your wallet is connected to Lisk or Lisk Sepolia network, and Remix has access to your wallet.
Then, select the `MyToken` contract from the deployment dropdown and deploy it with the parameters of your chouce, for example:

- Name: MyToken
- Symbol: MYT
- InitalSupply: 1000000000000000000000

### Further reading
- [Understand the ERC-20 token smart contract](https://ethereum.org/en/developers/tutorials/understand-the-erc-20-token-smart-contract/)
- [Ethereum Docs: ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)
- [ERC-20 EIP](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin: ERC-20 implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Solidity by example: ERC-20](https://solidity-by-example.org/app/erc20/)
- [Alchemy: Complete guide to ERC-20](https://www.alchemy.com/overviews/erc20-solidity)

## ERC-721
Introduces a standard for Non-Fungible Tokens.

### How to deploy a new ERC-721 token on Lisk

:::note
We will use Remix as framework for smart contract development in this guide, but feel free to choose a [smart contract development framework](/category/building-on-lisk/deploying-smart-contract) of your choice to implement your token contract.
:::

#### The token contract

### Further reading
- [Ethereum Docs: ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)
- [How to implement an ERC-721 market](https://ethereum.org/en/developers/tutorials/how-to-implement-an-erc721-market/)

## ERC-1155

A standard interface for contracts that manage multiple token types.
A single deployed contract may include any combination of fungible tokens, non-fungible tokens or other configurations (e.g. semi-fungible tokens).

### How to deploy a new ERC-1155 token on Lisk

:::note
We will use Remix as framework for smart contract development in this guide, but feel free to choose a [smart contract development framework](/category/building-on-lisk/deploying-smart-contract) of your choice to implement your token contract.
:::

#### The token contract

### Further reading
- [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/)