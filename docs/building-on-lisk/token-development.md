# Token development

## ERC token standards

Tokens can represent virtually anything in Ethereum:

- reputation points in an online platform
- skills of a character in a game
- financial assets like a share in a company
- a fiat currency like USD
- an ounce of gold
- and more...

A standard interface allows any tokens on Ethereum to be re-used by other applications: from wallets to decentralized exchanges.
**ERCs**(= Ethereum Request for Comments) are a set of technical standards that are used to create and manage tokens on the Ethereum blockchain.

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

#### Prerequisites

We will use HardHat as framework for smart contract development in this guide, but feel free to choose a smart contract development framework of your choice to implement your token contract.

:::tip
If you haven't yet setup a framework for smart contract development, we have guides for several frameworks to get you started:

- [Deploying smart contracts with Hardhat](deploying-smart-contract/with-Hardhat)
- [Deploying smart contracts with Foundry](deploying-smart-contract/with-Foundry)
- [Deploying smart contracts with thirdweb](deploying-smart-contract/with-thirdweb)
:::

#### The token contract

```
npm install --save @openzeppelin/contracts
```

```
```


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

#### Prerequisites

We will use HardHat as framework for smart contract development in this guide, but feel free to choose a smart contract development framework of your choice to implement your token contract.

:::tip
If you haven't yet setup a framework for smart contract development, we have guides for several frameworks to get you started:

- [Deploying smart contracts with Hardhat](deploying-smart-contract/with-Hardhat)
- [Deploying smart contracts with Foundry](deploying-smart-contract/with-Foundry)
- [Deploying smart contracts with thirdweb](deploying-smart-contract/with-thirdweb)
:::

#### The token contract

### Further reading
- [Ethereum Docs: ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)
- [How to implement an ERC-721 market](https://ethereum.org/en/developers/tutorials/how-to-implement-an-erc721-market/)

## ERC-1155

A standard interface for contracts that manage multiple token types.
A single deployed contract may include any combination of fungible tokens, non-fungible tokens or other configurations (e.g. semi-fungible tokens).

### How to deploy a new ERC-1155 token on Lisk

#### Prerequisites

We will use HardHat as framework for smart contract development in this guide, but feel free to choose a smart contract development framework of your choice to implement your token contract.

:::tip
If you haven't yet setup a framework for smart contract development, we have guides for several frameworks to get you started:

- [Deploying smart contracts with Hardhat](deploying-smart-contract/with-Hardhat)
- [Deploying smart contracts with Foundry](deploying-smart-contract/with-Foundry)
- [Deploying smart contracts with thirdweb](deploying-smart-contract/with-thirdweb)
:::

#### The token contract

### Further reading
- [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/)