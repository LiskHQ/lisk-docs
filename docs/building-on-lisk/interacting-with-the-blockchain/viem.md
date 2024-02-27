---
title: ...with viem
slug: /interacting-with-blockchain/viem
description: Documentation for using Viem, a TypeScript interface for EVM-compatible blockchains. This page covers installation, setup, and various functionalities such as reading and writing blockchain data and interacting with smart contracts on Lisk.
keywords:
  [
    viem,
    Lisk,
    Lisk mainnet,
    Lisk testnet,
    Ethereum,
    smart contracts,
    blockchain,
    RPC URL,
    JavaScript,
    TypeScript,
  ]
---

# Interacting with the blockchain with viem

[viem](https://viem.sh/) a TypeScript interface for Ethereum that provides low-level stateless primitives for interacting with Ethereum.

You can use viem to interact with smart contracts deployed on Lisk.
Viem provides first-class support for chains implemented on the OP stack, see [here](https://viem.sh/op-stack).

## Install

To install viem run the following command:

```bash
npm install --save viem
```

## Setup

Before you can start using viem, you need to setup a [Client](https://viem.sh/docs/clients/intro.html) with a desired [Transport](https://viem.sh/docs/clients/intro.html) and [Chain](https://viem.sh/docs/chains/introduction).



```javascript
import { createPublicClient, http, parseEther } from 'viem'
import { lisk } from 'viem/chains'
 
const client = createPublicClient({
  chain: lisk,
  transport: http(),
}).extend(publicActionsL2()) 
```

:::info

To use Lisk, you must specify `lisk` as the chain when creating a Client.

To use Lisk Sepolia (testnet), replace `lisk` with `liskSepolia`.

:::

## Reading data from the blockchain

Once you have created a client, you can use it to read and access data from Lisk using [Public Actions](https://viem.sh/docs/actions/public/introduction.html)

Public Actions are client methods that map one-to-one with a "public" Ethereum RPC method (`eth_blockNumber`, `eth_getBalance`, etc.)

For example, you can use the `getBlockNumber` client method to get the latest block:

```javascript
const blockNumber = await client.getBlockNumber();

const l1Gas = await client.estimateL1Gas({ 
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
  value: parseEther('1') 
}) 
```

## Writing data to the blockchain

In order to write data to Lisk, you need to create a Wallet client (`createWalletClient`) and specify an [`Account`](https://ethereum.org/en/developers/docs/accounts/) to use.

```javascript
import { createWalletClient, custom } from 'viem'
import { lisk } from 'viem/chains'

const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })

const client = createWalletClient({
  account,
  chain: lisk,
  transport: custom(window.ethereum)
})

client.sendTransaction({ ... })
```

:::info

In addition to making a JSON-RPC request (`eth_requestAccounts`) to get an Account, viem provides various helper methods for creating an `Account`, including: [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey.html), [`mnemonicToAccount`](https://viem.sh/docs/accounts/mnemonic.html), and [`hdKeyToAccount`](https://viem.sh/docs/accounts/hd.html).

To use Lisk Sepolia (testnet), replace `lisk` with `liskSepolia`.

:::

## Interacting with smart contracts

You can use viem to interact with a smart contract on Lisk by creating a `Contract` instance using [`getContract`](https://viem.sh/docs/contract/getContract.html) and passing it the contract ABI, contract address, and and [Public](https://viem.sh/docs/clients/public.html) and/or [Wallet](https://viem.sh/docs/clients/wallet.html) Client:

```javascript
import { getContract } from 'viem';
import { wagmiAbi } from './abi';
import { publicClient } from './client';

// 1. Create contract instance
const contract = getContract({
  address: 'CONTRACT_ADDRESS',
  abi: wagmiAbi,
  publicClient,
});

// 2. Call contract methods, listen to events, etc.
const result = await contract.read.totalSupply();
```

:::info

`CONTRACT_ADDRESS` is the address of the deployed contract.

:::