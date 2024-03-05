---
title: Bridging ERC-20 tokens to Lisk
slug: /building-on-lisk/bridge-tokens-to-lisk
description: Learn how to use the Optimism SDK to transfer ERC-20 tokens between Layer 1 (Ethereum Sepolia) and Layer 2 (Lisk Sepolia).
---

# Bridging ERC-20 Tokens to Lisk With the Optimism SDK
This tutorial explains how you can use the [Optimism SDK](https://sdk.optimism.io) to bridge ERC-20 tokens from L1 (Ethereum Sepolia) to L2 (Lisk Sepolia).
The Optimism SDK is an easy way to add bridging functionality to your javascript-based application.
It also provides some safety rails to prevent common mistakes that could cause tokens to be made inaccessible.

Behind the scenes, the Optimism SDK uses the [Standard Bridge](https://docs.optimism.io/builders/dapp-developers/bridging/standard-bridge) contracts to transfer tokens.
Make sure to check out the [Standard Bridge guide](https://docs.optimism.io/builders/dapp-developers/bridging/standard-bridge) if you want to learn more about how the bridge works under the hood.

:::warning
The Standard Bridge **does not** support [**fee on transfer tokens**](https://github.com/d-xo/weird-erc20#fee-on-transfer) or [**rebasing tokens**](https://github.com/d-xo/weird-erc20#balance-modifications-outside-of-transfers-rebasingairdrops) because they can cause bridge accounting errors.
:::

## Dependencies

*   [node](https://nodejs.org/en/)
*   [pnpm](https://pnpm.io/installation)

## Prerequisites

### 1. Create a Demo Project

You're going to use the Optimism SDK for this tutorial.
Since the Optimism SDK is a [Node.js](https://nodejs.org/en/) library, you'll need to create a Node.js project to use it.


#### 1.1 Make a Project Folder

```bash
mkdir op-sample-project
cd op-sample-project
```

#### 1.2 Initialize the Project

```bash
pnpm init
```

#### 1.3 Install the Optimism SDK

```bash
pnpm add @eth-optimism/sdk
```

#### 1.4 Install ethers.js

```bash
pnpm add ethers@^5
```

:::tip
Want to create a new wallet for this tutorial?
If you have [`cast`](https://book.getfoundry.sh/getting-started/installation) installed you can run `cast wallet new` in your terminal to create a new wallet and get the private key.
:::

### 2. Get ETH on Sepolia and Lisk Sepolia

This tutorial explains how to bridge tokens from Sepolia to Lisk Sepolia.
You will need to get some ETH on both of these testnets.

:::info
You can use [this faucet](https://sepoliafaucet.com) to get ETH on Sepolia.
You can use the [Superchain Faucet](https://app.optimism.io/faucet?utm_source=docs) to get ETH on Lisk Sepolia.
:::

### 3. Add a Private Key to Your Environment

You need a private key in order to sign transactions.
Set your private key as an environment variable with the `export` command.
Make sure this private key corresponds to an address that has ETH on both Sepolia and Lisk Sepolia.

```bash
export TUTORIAL_PRIVATE_KEY=0x...
```

### 4. Start the Node REPL

You're going to use the Node REPL to interact with the Optimism SDK.
To start the Node REPL run the following command in your terminal:

```bash
node
```

This will bring up a Node REPL prompt that allows you to run javascript code.

### 5. Import Dependencies

You need to import some dependencies into your Node REPL session.

#### 5.1 Import the Optimism SDK

```js 
const optimism = require("@eth-optimism/sdk")
```

#### 5.2 Import ethers.js

```js
const ethers = require("ethers")
```

### 6. Set Session Variables

You'll need a few variables throughout this tutorial.
Let's set those up now.

#### 6.1 Load your private key

```js
const privateKey = process.env.TUTORIAL_PRIVATE_KEY
```

#### 6.2 Create the RPC providers and wallets

```js
const l1Provider = new ethers.providers.StaticJsonRpcProvider("https://rpc.ankr.com/eth_sepolia")
const l2Provider = new ethers.providers.StaticJsonRpcProvider("https://rpc.sepolia-api.lisk.com")
const l1Wallet = new ethers.Wallet(privateKey, l1Provider)
const l2Wallet = new ethers.Wallet(privateKey, l2Provider)
```

#### 6.3 Set the L1 and L2 ERC-20 addresses

This tutorial uses existing ERC-20 tokens that have been deployed on Sepolia and Lisk Sepolia.
These tokens are designed for testing the bridging process.

```js
const l1Token = "0x5589BB8228C07c4e15558875fAf2B859f678d129"
const l2Token = "0xD08a2917653d4E460893203471f0000826fb4034"
```

:::note
If you're coming from the [Adding Your Standard ERC-20 Token to Lisk](./add-token-to-lisk/standard-token) or [Adding Your Custom ERC-20 Token to Lisk](./add-token-to-lisk/custom-token) tutorials, you can use the addresses of your own ERC-20 tokens here instead.
:::

### 7. Get L1 Tokens

You're going to need some tokens on L1 that you can bridge to L2.
The L1 testing token located at [`0x5589BB8228C07c4e15558875fAf2B859f678d129`](https://sepolia.etherscan.io/address/0x5589BB8228C07c4e15558875fAf2B859f678d129) has a `faucet` function that makes it easy to get tokens.

#### 8.1 Set the ERC20 ABI

```js
const erc20ABI = [{ constant: true, inputs: [{ name: "_owner", type: "address" }], name: "balanceOf", outputs: [{ name: "balance", type: "uint256" }], type: "function" }, { inputs: [], name: "faucet", outputs: [], stateMutability: "nonpayable", type: "function" }]
```

#### 8.2 Create a Contract instance for the L1 token

```js
const l1ERC20 = new ethers.Contract(l1Token, erc20ABI, l1Wallet)
```

#### 8.3 Request some tokens

```js
console.log('Getting L1 tokens from faucet...')
tx = await l1ERC20.faucet()
await tx.wait()
```

#### 8.4 Check your token balance

```js
console.log((await l1ERC20.balanceOf(l1Wallet.address)).toString())
```

## Deposit Tokens

Now that you have some tokens on L1 you can deposit those tokens into the `L1StandardBridge` contract.
You'll then receive the same number of tokens on L2 in return.

### 1. Define the amount to deposit

The testing token has 18 decimal places, so you'll want to define a variable that represents one token.

```js
const oneToken = 1000000000000000000n
```

### 2. Create a CrossChainMessenger instance

The Optimism SDK exports a `CrossChainMessenger` class that makes it easy to interact with the `L1StandardBridge` contract.

Create an instance of the `CrossChainMessenger` class:

```js
const messenger = new optimism.CrossChainMessenger({
    l1ChainId: 11155111, // 11155111 for Sepolia
    l2ChainId: 4202, // 4202 for Lisk Sepolia
    l1SignerOrProvider: l1Wallet,
    l2SignerOrProvider: l2Wallet,
})
```

### 3. Allow the Standard Bridge to access your tokens

Before you can deposit your tokens, you'll need to give the Standard Bridge contract an allowance of tokens on L1.
This will allow the Standard Bridge to pull these tokens out of your address and escrow inside the bridge.

```js
tx = await messenger.approveERC20(l1Token, l2Token, oneToken)
await tx.wait()
```

### 4. Deposit your tokens

Now you can deposit your tokens into the Standard Bridge contract.

```js
tx = await messenger.depositERC20(l1Token, l2Token, oneToken)
await tx.wait()
```

:::info
Using a smart contract wallet?
As a safety measure, `depositERC20` will fail if you try to deposit ETH from a smart contract wallet without specifying a `recipient`.
Add the `recipient` option to the `depositERC20` call to fix this.
Check out the [Optimism SDK docs](https://sdk.optimism.io/classes/crosschainmessenger#depositERC20-2) for more info on the options you can pass to `depositERC20`.
:::

### 5. Wait for the deposit to be relayed

You can use the `waitForMessageStatus` function to wait for the deposit to be relayed to L2.

```js
await messenger.waitForMessageStatus(tx.hash, optimism.MessageStatus.RELAYED)
```

### 6. Check your token balance on L1

You should now have one less token on L1.

```js
console.log((await l1ERC20.balanceOf(l1Wallet.address)).toString())
```

### 7. Create a Contract instance for the L2 token

```js
const l2ERC20 = new ethers.Contract(l2Token, erc20ABI, l2Wallet)
```

### 8. Check your token balance on L2

You should now have one more token on L2.

```js
console.log((await l2ERC20.balanceOf(l2Wallet.address)).toString())
```

## Withdraw Tokens

You just bridged some tokens from L1 to L2.
Nice!
Now you're going to repeat the process in reverse to bridge some tokens from L2 to L1.

### 1. Start your withdrawal on L2

The first step to withdrawing tokens from L2 to L1 is to start the withdrawal on L2.

```js
const withdrawal = await messenger.withdrawERC20(l1Token, l2Token, oneToken)
await withdrawal.wait()
```

### 2. Check your token balance on L2

You should now have one less token on L2, but your token balance on L1 will not have changed yet.

```js
console.log((await l2ERC20.balanceOf(l2Wallet.address)).toString())
```

### 3. Wait until the withdrawal is ready to prove

The second step to withdrawing tokens from L2 to L1 is to prove to the bridge on L1 that the withdrawal happened on L2.
You first need to wait until the withdrawal is ready to prove.

```js
await messenger.waitForMessageStatus(withdrawal.hash, optimism.MessageStatus.READY_TO_PROVE)
```

:::info
This step can take a few minutes.
Feel free to take a quick break while you wait.
:::

### 4. Prove the withdrawal on L1

Once the withdrawal is ready to be proven, you'll send an L1 transaction to prove that the withdrawal happened on L2.

```js
await messenger.proveMessage(withdrawal.hash)
```

### 5. Wait until the withdrawal is ready for relay

The final step to withdrawing tokens from L2 to L1 is to relay the withdrawal on L1.
This can only happen after the fault proof period has elapsed.
On Lisk Sepolia, this is only a few seconds.
<!-- On OP Mainnet, this takes 7 days. -->

```js
await messenger.waitForMessageStatus(withdrawal.hash, optimism.MessageStatus.READY_FOR_RELAY)
```

### 6. Relay the withdrawal on L1

Once the withdrawal is ready to be relayed you can finally complete the withdrawal process.

```js
await messenger.finalizeMessage(withdrawal.hash)
```

### 7. Wait until the withdrawal is relayed

Now you simply wait until the message is relayed.

```js
await messenger.waitForMessageStatus(withdrawal.hash, optimism.MessageStatus.RELAYED)
```

### 8. Check your token balance on L1

You should now have one more token on L1.

```js
console.log((await l1ERC20.balanceOf(l1Wallet.address)).toString())
```

## Next Steps

Congrats!
You've just deposited and withdrawn tokens using the Optimism SDK.
You should now be able to write applications that use the Optimism SDK to transfer ERC-20 tokens between L1 and L2.
<!-- TODO: Add on Lisk Mainnet release -->
<!-- Although this tutorial used Sepolia and OP Sepolia, the same process works for Ethereum and OP Mainnet. -->