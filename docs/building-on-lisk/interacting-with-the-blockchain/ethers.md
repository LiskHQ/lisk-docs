---
title: ...with ethers.js
slug: /building-on-lisk/interacting-with-the-blockchain/ethers
description: Documentation for using ethers.js, a JavaScript library for EVM-compatible blockchain interactions. This page covers installation, setup, connecting to the Lisk network, reading and writing blockchain data, and interacting with smart contracts.
keywords:
  [
    ethers.js,
    JavaScript library,
    Lisk network,
    Lisk mainnet,
    Lisk testnet,
    smart contracts,
    EVM-compatible,
    blockchain,
    JsonRpcProvider,
    Signer,
    ABI,
    interacting with smart contract,
  ]
---

# Interacting with the blockchain with ethers.js

[ethers.js](https://docs.ethers.org/) is a JavaScript library that allows developers to interact with EVM-compatible blockchain networks.

You can use ethers.js to interact with smart contracts deployed on the Lisk network.


## Install

To install ethers.js run the following command:

```bash
npm install --save ethers
```

## Setup

Before you can start using ethers.js, you need to import it into your project.

Add the following line of code to the top of your file to import ethers.js:

```javascript
const ethers = require('ethers');
```

## Connecting to Lisk

You can connect to Lisk by instantiating a new ethers.js `JsonRpcProvider` object with an RPC URL of the Lisk network:

```javascript
const ethers = require('ethers');

const url = 'https://rpc.sepolia-api.lisk.com';
const provider = new ethers.JsonRpcProvider(url);
```

:::note
A **Provider** (in ethers.js) is a class that provides an abstraction for a connection to the Ethereum Network. It provides read-only access to the Blockchain and its status.
:::

## Reading data from the blockchain

Once you have created a provider, you can use it to read data from the Lisk network.

For example, you can use the `getBlockNumber` method to get the latest block:

```javascript
async function getLatestBlock() {
    const latestBlock = await provider.getBlockNumber();
    console.log("The latest block's number is:", latestBlock);
}

getLatestBlock();
```

<details>
<summary>Complete code example</summary>
```javascript
const ethers = require('ethers');

const url = 'https://rpc.sepolia-api.lisk.com';
const provider = new ethers.JsonRpcProvider(url);

async function getLatestBlock() {
    const latestBlock = await provider.getBlockNumber();
    console.log("The latest block's number is:", latestBlock);
}

getLatestBlock();
```
</details>

## Writing data to the blockchain

In order to write data to the Lisk network, you need to create a `Signer`.

:::note
A **Signer** is a class that (usually) in some way directly or indirectly has access to a private key, which can sign messages and transactions to authorize the network to charge your account ether to perform operations.
:::

You can create a `Signer` by instantiating a new ethers.js `Wallet` object, providing it with a private key and `Provider`.

```javascript
const privateKey = 'PRIVATE_KEY';
const signer = new ethers.Wallet(privateKey, provider);
const receiver = '0x5e1A92F84cA1CE280B3Cb29d79C3368f45b41EBB';
// Send 0.01 ether to a given address.
async function sendTx(to) {
    const tx =  await signer.sendTransaction({
        to: to,
        value: ethers.parseEther("0.01")
    });

    console.log(tx);
}

//sendTx(receiver);
```

:::info
`PRIVATE_KEY` is the private key of the account that is to be used when creating the `signer` object.
:::

The receiving account's balance will increment by `0.01` ETH once the transaction execution is successful.

<details>
<summary>Complete code example</summary>
```javascript
const ethers = require('ethers');

const url = 'https://rpc.sepolia-api.lisk.com';
const provider = new ethers.JsonRpcProvider(url);
// Replace PRIVATE_KEY with the private key of your account.
const privateKey = 'PRIVATE_KEY';
const signer = new ethers.Wallet(privateKey, provider);
const receiver = '0x5e1A92F84cA1CE280B3Cb29d79C3368f45b41EBB';
// Send 0.01 ether to a given address.
async function sendTx(to) {
    const tx =  await signer.sendTransaction({
        to: to,
        value: ethers.parseEther("0.01")
    });

    console.log(tx);
}

sendTx(receiver);
```
</details>

## Interacting with smart contracts

You can use ethers.js to interact with a smart contract on Lisk by instantiating a `Contract` object using the ABI and address of a deployed contract:

:::tip
The ABI of a contract can be found on the respective contract page in [BlockScout](https://sepolia-blockscout.lisk.com/).

For example, you can use the ABI for the [Hello contract](https://sepolia-blockscout.lisk.com/address/0xb18eb752813c2fbedfdf2be6e5e842a85a3b8539?tab=contact_code). Just scroll down to `Contract ABI` and copy the deployed contract's ABI.
:::

```javascript title="Reading from contracts"
// Replace the contractAddress' value with the desired contract.
const contractAddress = "CONTRACT_ADDRESS"
// read-only
const contract = new ethers.Contract(contractAddress, abi, provider);
const abi = [
… // ABI of deployed contract
];

async function getHello() {
    const value = await contract.message("0x3C46A11471f285E36EE8d089473ce98269D1b081");
    console.log(value.toString());
}

getHello();
```

:::info
`CONTRACT_ADDRESS` is the address of the deployed contract.
:::

:::note
A **Contract** (in ethers.js) is an abstraction that represents a connection to a specific contract on the Lisk Network, so that applications can use it like a normal JavaScript object.
:::

For reading and writing contracts, provide a `Signer` object instead of a `Provider` object:

```javascript title="Writing to contracts"
// read & write 
const contract = new ethers.Contract(contractAddress, abi, signer);
```

Once you have created a `Contract` object, you can use it to call desired methods on the smart contract:

```javascript
async function createHello(message) {
  const tx = await contract.createHello(message);
  return tx.hash;
}

//createHello("Hello Lisk!");
```

:::tip
For an overview of existing public functions for the contract, please check the [Read Contract](https://sepolia-blockscout.lisk.com/address/0xb18eb752813c2fbedfdf2be6e5e842a85a3b8539?tab=read_contract) and [Write Contract](https://sepolia-blockscout.lisk.com/address/0xb18eb752813c2fbedfdf2be6e5e842a85a3b8539?tab=write_contract) tabs for the specific contract.
:::

<details>
<summary>Complete code example</summary>
```javascript
const ethers = require('ethers');

const url = 'https://rpc.sepolia-api.lisk.com';
const provider = new ethers.JsonRpcProvider(url);
const privateKey = 'PRIVATE_KEY';
const signer = new ethers.Wallet(privateKey, provider);
const contractAddress = "0xb18eb752813c2fbedfdf2be6e5e842a85a3b8539"
// Read & Write
const contract = new ethers.Contract(contractAddress, abi, signer);
// Read-only
//const contract = new ethers.Contract(contractAddress, abi, provider);
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "NewHello",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "blacklist",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "counter",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_message",
                "type": "string"
            }
        ],
        "name": "createHello",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxLength",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "message",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "minLength",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "_newBlackList",
                "type": "string[]"
            }
        ],
        "name": "setBlacklist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_newMin",
                "type": "uint32"
            },
            {
                "internalType": "uint32",
                "name": "_newMax",
                "type": "uint32"
            }
        ],
        "name": "setMinMaxMessageLength",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

async function createHello(message) {
    const tx = await contract.createHello(message);
    return tx.hash;
}

//createHello("Hello Lisk!");

async function getHello() {
    const value = await contract.message("0x3C46A11471f285E36EE8d089473ce98269D1b081");
    console.log(value.toString());
}

getHello();
```
</details>