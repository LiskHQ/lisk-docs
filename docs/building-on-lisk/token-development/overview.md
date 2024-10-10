---
title: Overview
slug: /token-development
description: 'An introduction into token development on Lisk.'
keywords:
  [
    'Lisk',
    'Token development',
    'Deploy token',
    'ERC',
    'EIP',
    'ERC-20',
    'ERC-721',
    'ERC-1155',
    'NFT',
    'Fungible token',
    'Hybrid token',
  ]
---

# Token development

This page gives an introduction into token development on Lisk.
It includes an explanation of ERCs, a summary of the most important token standards and examples how to deploy these tokens on Lisk.

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


### Further reading
- [Understand the ERC-20 token smart contract](https://ethereum.org/en/developers/tutorials/understand-the-erc-20-token-smart-contract/)
- [ERC-20 EIP](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin: ERC-20 implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Ethereum Docs: ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)
- [Solidity by example: ERC-20](https://solidity-by-example.org/app/erc20/)
- [Alchemy: Complete guide to ERC-20](https://www.alchemy.com/overviews/erc20-solidity)

## ERC-721
Introduces a standard for Non-Fungible Tokens.


### Further reading
- [Ethereum Docs: ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)
- [How to implement an ERC-721 market](https://ethereum.org/en/developers/tutorials/how-to-implement-an-erc721-market/)

## ERC-1155

A standard interface for contracts that manage multiple token types.
A single deployed contract may include any combination of fungible tokens, non-fungible tokens or other configurations (e.g. semi-fungible tokens).

[How to deploy a new ERC-1155 token on Lisk](deploy-erc-1155.md)

:::warning
Please note that there is currently less ecosystem support for ERC-1155 as compared with ERC-20 or ERC-721.
:::

### Further reading
- [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/)