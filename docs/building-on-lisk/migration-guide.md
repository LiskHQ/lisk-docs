---
title: L1 migration guide
slug: /building-on-lisk/migration-guide
description: "A migration guide, explaining how to smoothly migrate any Lisk L1 app to Lisk L2."
keywords: [
    "Lisk",
    "Lisk migration",
    "Lisk L1",
    "Lisk L2",
    "Lisk testnet",
    "Lisk SDK",
    "Solidity",
    "smart contract deployment",
    "build on lisk",
    ]
---

# L1 migration guide

How to smoothly migrate any Lisk L1 app to Lisk L2.

## Requirements

You need:

- A Lisk L1 application built on Lisk SDK version 6.0.0 or later.
- The smart contract development framework of your choice. 
In this guide, we will use the [Foundry](https://book.getfoundry.sh/) framework.

## Project setup

```bash
forge init hello_liskl2
```

```bash
cd hello_liskl2
```

## Module migration

**Modules in Lisk L1 are re-implemented as smart contracts in Lisk L2.**

Create a new smart contract called `hello`. 
Inside the new contract, we will put all the logic that was residing in the Lisk L1 `Hello` module before.

:::note

Depending on the complexity of your modules, it can be beneficial to split the logic into several smart contracts, too.

:::

### Table: Lisk L1/L2 comparison
| Description          | Lisk L1                      | Lisk L2                       |
| :------------------- | :----------------------------|------------------------------ |
| Onchain data storage | Stores(onchain)              | State variables               |
| State-transition logic triggered by a transaction| Commands       | Functions       |
| Logging to the blockchain| Blockchain Events        | Events                        |
| API                  | Endpoints                    | View functions                |
| internal API         | Methods                      | Functions (+ modifiers)       |

### Stores

### Commands

### Events

### Endpoints

### Methods

<!-- ## Plugin migration -->