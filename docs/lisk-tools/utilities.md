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

## Account Abstraction

### Safe 
[Safe](https://docs.safe.global) is the account abstraction leader on Ethereum and the EVM with the most secure smart wallet infrastructure and platform.
Safe brings digital ownership of accounts to everyone by building universal and open contract standards for the custody of digital assets, data, and identity.
To create a Safe account with Lisk, connect your wallet to [Lisk](https://safe.optimism.io/welcome?chain=lisk) or [Lisk Sepolia](https://safe.optimism.io/welcome?chain=lisksep) network through the Superchain-Safe portal.

Gelato deployed a small example [react app](https://gelato-raas-aa.web.app/) with a safe-web3auth integration.
The code for this integration can be found on the [gelato-raas-aa-ui](https://github.com/gelatodigital/gelato-raas-aa-ui) repository.

### 1Balance

[1Balance](https://docs.gelato.network/web3-services/1balance) is a unified multi-chain payments system.
1Balance makes it easy for you to pay all of your costs across all the networks that you are using from one single easy-to-manage balance.

In the [gelato-raas-aa](https://github.com/gelatodigital/gelato-raas-aa) repository, you can find a demo implementation for sponsoring the fees with 1Balance or paying the fees with Safe balance.

## Automation
### Web3 Functions

Gelato's [Web3 Functions](https://www.gelato.network/web3-functions) is a powerful automation system designed to streamline and enhance Web3 operations.
Web3 Functions serve as a comprehensive tool, enabling developers to effortlessly set up, manage, and automate their smart contract tasks.

## Legacy Chain Service

To access data from the Legacy Lisk L1 chain, please use the legacy chain service available under https://legacy.lisk.com.

How to use the legacy chain service:

- Get a **block by height** `https://legacy.lisk.com/blocks/<BLOCK_HEIGHT>.json`
- Get a **transaction by id** `https://legacy.lisk.com/transactions/<TRANSACTION_ID>.json`
- Get an **account by address** `https://legacy.lisk.com/accounts/<LEGACY_ACCOUNT_ADDRESS>.json`
- Get **histories by address** `https://legacy.lisk.com/histories/<LEGACY_ACCOUNT_ADDRESS>.csv`
 
  This serves for all block histories in the past from height 1 https://legacy.lisk.com/blocks/1.json


## Randomness

### Gelato VRF
[Gelato VRF](https://www.gelato.network/vrf) (Verifiable Random Function) is a tool designed to provide robust randomness with inherent verifiability.
Create transparent & fair games, NFTs, lotteries, and other onchain applications with distributed randomness.

## Relay Service

### Gelato Relay

Use Gelato [Relay](https://www.gelato.network/relay), to relay your user's transactions on-chain, enabling secure gasless transactions for an ultra-smooth UX for your app.
This allows for a variety of new web3 experiences, as the user can now pay by only signing a message, or their transaction costs can be sponsored by the developer.
