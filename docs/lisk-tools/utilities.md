---
title: Utilities
slug: /lisk-tools/utilities
description: Summary of various services available for building on Lisk.
keywords:
  [
    Lisk,
    Lisk network,
    Web3 infrastructure,
    Building on Lisk,
    Dapp development,
    Web3 tools,
    Sepolia,
    Utilities,
    web3,
  ]
---

# Utilities

A summary of various services available for building on Lisk.

## Automation
### Web3 Functions

Gelato's [Web3 Functions](https://www.gelato.network/web3-functions) is a powerful automation system designed to streamline and enhance Web3 operations.
Web3 Functions serve as a comprehensive tool, enabling developers to effortlessly set up, manage, and automate their smart contract tasks.
For example, the following are a couple of functions designed to list the latest price feed for Lisk Sepolia:
- [REDSTONE ETH](https://app.gelato.network/functions/task/0x98ab97a550430b0f92bb9d0c89582af773882c1fb60c3cfc043ad780de2cdc9b:4202)
- [REDSTONE USDC](https://app.gelato.network/functions/task/0x67f917f8c1430b0122d60d9b56a50ad0f18394a7ffa9e9467ee7881995ed7d31:4202)

## Account Abstraction

### Safe 
[Safe](https://docs.safe.global) is the account abstraction leader on Ethereum and the EVM with the most secure smart wallet infrastructure and platform.
Safe brings digital ownership of accounts to everyone by building universal and open contract standards for the custody of digital assets, data, and identity.

Gelato deployed a small example [react app](https://gelato-raas-aa.web.app/) with a safe-web3auth integration.
The code for this integration can be found on the [gelato-raas-aa-ui](https://github.com/gelatodigital/gelato-raas-aa-ui) repository.

### 1Balance

[1Balance](https://docs.gelato.network/web3-services/1balance) is a unified multi-chain payments system.
1Balance makes it easy for you to pay all of your costs across all the networks that you are using from one single easy-to-manage balance.

In the [gelato-raas-aa](https://github.com/gelatodigital/gelato-raas-aa) repository, you can find a demo implementation for sponsoring the fees with 1Balance or paying the fees with Safe balance.

## Relay Service

### Gelato Relay

Use Gelato [Relay](https://www.gelato.network/relay), to relay your user's transactions on-chain, enabling secure gasless transactions for an ultra smooth UX for your app.
This allows for a variety of new web3 experiences, as the user can now pay by only signing a message, or their transaction costs can be sponsored by the developer.

## Randomness

### Gelato VRF
[Gelato VRF](https://www.gelato.network/vrf) (Verifiable Random Function) is a tool designed to provide robust randomness with inherent verifiability.
Create transparent & fair games, NFTs, lotteries, and other onchain applications with distributed randomness.
