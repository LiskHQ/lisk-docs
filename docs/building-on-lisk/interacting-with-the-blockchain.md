---
title: Interacting with the blockchain
slug: /building-on-lisk/interacting-with-the-blockchain
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

[ethers.js](https://docs.ethers.org/v5/) is a JavaScript library that allows developers to interact with EVM-compatible blockchain networks.

You can use ethers.js to interact with smart contracts deployed on the Lisk network.

---

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

You can connect to Lisk by instantiating a new ethers.js `JsonRpcProvider` object with a RPC URL of the Lisk network:

```javascript
const ethers = require('ethers');

const url = 'https://rpc.sepolia-api.lisk.com';
const provider = new ethers.JsonRpcProvider(url);
```

:::note
A **Provider** (in ethers.js) is a class which provides an abstraction for a connection to the Ethereum Network. It provides read-only access to the Blockchain and its status.
:::

## Reading data from the blockchain

Once you have created a provider, you can use it to read data from the Lisk network.

For example, you can use the `getBlockNumber` method to get the latest block:

```javascript
async function getLatestBlock() {
  const latestBlock = await provider.getBlockNumber();
  console.log(latestBlock);
}
```

## Writing data to the blockchain

In order to write data to the Lisk network, you need to create a `Signer`.

:::note
A **Signer** is a class which (usually) in some way directly or indirectly has access to a private key, which can sign messages and transactions to authorize the network to charge your account ether to perform operations.
:::

You can create a `Signer` by instantiating a new ethers.js `Wallet` object, providing it with a private key and `Provider`.

```javascript
const privateKey = 'PRIVATE_KEY';
const signer = new ethers.Wallet(privateKey, provider);
// Send 1 ether to an ens name.
const tx = signer.sendTransaction({
    to: "lisk.eth",
    value: ethers.parseEther("1.0")
});
```

:::info
`PRIVATE_KEY` is the private key of the wallet to use when creating the signer.
:::

## Interacting with smart contracts

You can use ethers.js to interact with a smart contract on Lisk by instantiating a `Contract` object using the ABI and address of a deployed contract:

:::tip
The ABI of a contract can be found on the respective contract page in [BlockScout](https://sepolia-blockscout.lisk.com/).

For example, you can find the ABI for the `Hello` contract [here](https://sepolia-blockscout.lisk.com/address/0xb18eb752813c2fbedfdf2be6e5e842a85a3b8539?tab=contact_code). Just scroll down to `Contract ABI`.
:::

```javascript
const abi = [
… // ABI of deployed contract
];

const contractAddress = "CONTRACT_ADDRESS"

// read only
const contract = new ethers.Contract(contractAddress, abi, provider);
```

:::info
`CONTRACT_ADDRESS` is the address of the deployed contract.
:::

:::note
A **Contract** (in ethers.js) is an abstraction which represents a connection to a specific contract on the Lisk Network, so that applications can use it like a normal JavaScript object.	
:::

For reading and writing to contracts, provide a `Signer` object instead of a `Provider` object:

```javascript
// read & write 
const contract = new ethers.Contract(contractAddress, abi, signer);
```

Once you have created a `Contract` object, you can use it to call desired methods on the smart contract:

```javascript
async function createHello(message) {
  const tx = await contract.createHello(message);
  return tx.hash;
}
  
async function getHello() {
  const value = await contract.message("0x3C46A11471f285E36EE8d089473ce98269D1b081");
  return value.toString();
}
```

:::tip
For an overview of existing public functions for the contract, please check the [Read Contract](https://sepolia-blockscout.lisk.com/address/0xb18eb752813c2fbedfdf2be6e5e842a85a3b8539?tab=read_contract) and [Write Contract](https://sepolia-blockscout.lisk.com/address/0xb18eb752813c2fbedfdf2be6e5e842a85a3b8539?tab=write_contract) tabs for the specific contract.
:::