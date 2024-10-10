---
title: Overview
slug: /token-development
description: 'An introduction into and ERC token standards and token development on Lisk.'
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
This page is intended for token issuers who wish to create a new ERC-20 contract on Lisk.
It includes an explanation of ERCs, a summary of the most important token standards and examples how to deploy these tokens on Lisk.
In case you already have a token deployed on the Ethereum network, an wish to bridge it to Lisk, please refer to the guide [Bridging an L1 token to Lisk](../add-token-to-lisk/index.md).

## ERC token standards

A standard interface allows any tokens on Ethereum to be re-used by other applications: from wallets to decentralized exchanges.
**ERCs**(= Ethereum Request for Comments) are a set of application-level standards and conventions, including contract standards such as token standards (ERC-20), name registries (ERC-137), URI schemes, library/package formats, and wallet formats for the Ethereum blockchain.

Following the most popular ERC token standards when creating a new token has several benefits:

- **Increased security:** Let your contract inherit from heavily audited and reviewed implementations of the standard, mitigating the possibility of bugs greatly.
- **High application compatibility:** Most applications only support the most popular ERC token standards. By following these standars you ensure your token will be compatible with most external application like wallets or decentralized exchanges.
- **Great documentation:** Benefit from the vast amount of tutorials and guides that are available to develop ERC compliant tokens.

ERCs are a subcategory of **EIPs**(= Ethereum Inprovemnt Proposals).
New EIPs are added following the process outlined in [EIP-1](https://eips.ethereum.org/EIPS/eip-1).

The full list of [ERC proposals](https://eips.ethereum.org/erc).

A summary of some interesting ERC tokens standars can be found below.

- [ERC-20](#erc-20): the most widespread token standard for fungible tokens, albeit somewhat limited by its simplicity.
- [ERC-721](#erc-721): the most popular token standard for non-fungible tokens, often used for collectibles and games.
- [ERC-1155](#erc-1155): a standard for multi-tokens, allowing for a single contract to represent multiple fungible and non-fungible tokens, along with batched operations for increased gas efficiency.

## ERC-20
The most widespread token standard for fungible tokens.
Any token is exactly equal to any other token; no tokens have special rights or behavior associated with them.
This makes [ERC-20](https://eips.ethereum.org/EIPS/eip-20) tokens useful for things like a medium of exchange currency, voting rights, staking, and more.

### Guides
[How to deploy a new ERC-20 token on Lisk](deploy-erc-20.md)

### Further reading
- [Understand the ERC-20 token smart contract](https://ethereum.org/en/developers/tutorials/understand-the-erc-20-token-smart-contract/)
- [ERC-20 EIP](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin: ERC-20 implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Ethereum Docs: ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)
- [Solidity by example: ERC-20](https://solidity-by-example.org/app/erc20/)
- [Alchemy: Complete guide to ERC-20](https://www.alchemy.com/overviews/erc20-solidity)

## ERC-721
[ERC-721](https://eips.ethereum.org/EIPS/eip-721) is a standard for representing ownership of non-fungible tokens.
Non-fungible tokens(NFTs) are used to represent unique objects like real estate or collectibles, where some items are valued more than others, due to their usefulness, rarity, or other individual characteristics.

To represent these unique features on chain, the ERC-721 includes metadata properties that offer information about the token's specific features, such as the title, the creator, and an image preview.

### Guides
[How to deploy a new ERC-721 token on Lisk](deploy-erc-721.md)

### Further reading
- [Ethereum Docs: ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)
- [OpenZeppelin: ERC-721 implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Solidity by example: ERC721](https://solidity-by-example.org/app/erc721/)
- [How to implement an ERC-721 market](https://ethereum.org/en/developers/tutorials/how-to-implement-an-erc721-market/)

## ERC-1155
The [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155) is a standard interface for contracts that manage multiple token types.
The distinctive feature of ERC-1155 is that it uses a single smart contract to represent multiple tokens at once.
A single deployed contract may include any combination of fungible tokens, non-fungible tokens or other configurations (e.g. semi-fungible tokens).

This is why its `balanceOf` function differs from ERC-20’s: 
it has an additional `id` argument for the identifier of the token that you want to query the balance of.
ERC-1155 accounts have a distinct balance for each token id; non-fungible tokens are implemented by simply minting a single one of them.

This approach leads to massive gas savings for projects that require multiple tokens.
Instead of deploying a new contract for each token type, a single ERC-1155 token contract can hold the entire system state, reducing deployment costs and complexity.

### Guides
[How to deploy a new ERC-1155 token on Lisk](deploy-erc-1155.md)

:::warning
Please note that there is currently less ecosystem support for ERC-1155 as compared with ERC-20 or ERC-721.
:::

### Further reading
- [Ethereum Docs: ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/)
- [OpenZeppelin: ERC-1155 implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol)
- [Solidity by example: ERC1155](https://solidity-by-example.org/app/erc1155/)