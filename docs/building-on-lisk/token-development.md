# ERC token standards

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


## Fungible Token standards

- [ERC-20](https://ethereum.org/en/developers/tutorials/understand-the-erc-20-token-smart-contract/):
Introduces a standard for Fungible Tokens
- [ERC-223](https://ethereum.org/en/developers/docs/standards/tokens/erc-223/):
Similar to the ERC-20 standard.
The key difference is that ERC-223 defines not only the token API but also the logic for transferring tokens from sender to recipient.
- [ERC-777]: Improves the ERC-20 standard, but is difficult to implement properly, due to its [susceptibility to different forms of attack](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620).
It is recommended to use ERC-20 instead.
- [ERC-4626](https://ethereum.org/en/developers/docs/standards/tokens/erc-4626/):
An extension on the ERC-20 standard that provides basic functionality for depositing and withdrawing tokens and reading balances.

## NFT standards

- [ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/):
Introduces a standard for Non-Fungible Tokens.
- [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/):
A standard interface for contracts that manage multiple token types.
A single deployed contract may include any combination of fungible tokens, non-fungible tokens or other configurations (e.g. semi-fungible tokens).

## Security Token standards

- [ERC-1400]
- [ERC-1404]

## Digital Identity standards

- [ERC-725]

## Development ressources
### General
- [OpenZeppelin Docs: Tokens](https://docs.openzeppelin.com/contracts/3.x/tokens)
- [How to analyze smart contracts with Slither](https://ethereum.org/en/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Token integration checklist](https://ethereum.org/en/developers/tutorials/token-integration-checklist/)

### ERC-20
- [Solidity by example: ERC-20](https://solidity-by-example.org/app/erc20/)
- [Ethereum Docs: ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)
- [ERC-20 EIP](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin: ERC-20 implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy: Complete guide to ERC-20](https://www.alchemy.com/overviews/erc20-solidity)

### ERC-721
- [How to implement an ERC-721 market](https://ethereum.org/en/developers/tutorials/how-to-implement-an-erc721-market/)