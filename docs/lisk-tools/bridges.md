---
title: Bridges
slug: /lisk-tools/bridges
description: Documentation for bridging assets to Lisk. This page covers how to bridge ETH and ERC-20s between Ethereum Sepolia and Lisk Sepoklia, with essential cautions and contract information.
keywords:
  [
    Lisk,
    Lisk network,
    bridging,
    bridge to Lisk,
    bridge ETH,
    bridge ETH to Lisk,
    Lisk Bridge,
    Ethereum Testnet,
    Lisk Testnet,
    ETH,
    ERC-20 tokens,
    asset bridging,
  ]
---

# Bridges

The [Lisk Sepolia Bridge](https://sepolia-bridge.lisk.com) allows you to bridge Testnet ETH from Ethereum to Lisk and vice versa.

## Depositing funds
How to deposit funds from Ethereum Sepolia to Lisk Sepolia:

1. Visit the [Lisk Bridge](https://sepolia-bridge.lisk.com) and make sure you are on the `Deposit` tab.
2. Connect your wallet by clicking `Connect Wallet`.
3. Switch your network to Ethereum Sepolia in your wallet.
4. Choose the amount of ETH you'd like to deposit.
5. Press `Bridge funds` and wait for the transaction to go through.

## Withdrawing funds
How to withdraw funds from Lisk Sepolia to Ethereum Sepolia:

:::info

After initiating your withdrawal, a 7-day [challenge period](https://docs.optimism.io/builders/dapp-developers/bridging/messaging#for-l2-to-l1-transactions) needs to be observed as a security measure. Once the challenge period has passed the withdrawal can be completed with a final transaction.

:::

1. Visit the [Lisk Bridge](https://sepolia-bridge.lisk.com) and switch to the `Withdraw` tab.
2. Connect your wallet by clicking `Connect Wallet`.
3. Switch your network to Lisk Sepolia in your wallet.
4. Choose the amount of ETH you'd like to withdraw.
5. Press `Bridge funds` and wait for the transaction to go through.
6. Wait until the challenge period passes to claim the funds and complete the withdrawal.

:::tip

Check the status of your withdrawals in your [Withdrawals history](https://sepolia-bridge.lisk.com/history?slug=lisk-sepolia-testnet)

:::



