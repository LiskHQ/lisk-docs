---
title: Running a Lisk Node
slug: /run-a-lisk-node
description: A tutorial that teaches how to set up and run a Lisk Node.
keywords:
  [
    Lisk Node setup,
    running a node,
    Lisk node,
    run a Lisk node,
    hardware requirements,
    node synchronization,
    node snapshots,
    Lisk chain,
    Lisk blockchain,
    Lisk network,
    node deployment,
    Ethereum node,
  ]
tags: ['nodes']
difficulty: beginner
displayed_sidebar: null
---

This tutorial will walk you through setting up your own [Lisk Node].

## Objectives

By the end of this tutorial you should be able to:

- Deploy and sync a Lisk node

## Prerequisites

:::caution

Running a node is time consuming, resource expensive, and potentially costly. If you don't already know why you want to run your own node, you probably don't need to.

If you're just getting started and need an RPC URL, you can use our free endpoints:

<!-- - **Mainnet**: `https://mainnet.base.org`
- **Testnet (Sepolia)**: `https://sepolia.base.org` -->

**Note:** Our RPCs are rate-limited, they are not suitable for production apps.

If you're looking to harden your app and avoid rate-limiting for your users, please check out one of our [partners].

:::

### Hardware requirements

We recommend you have this configuration to run a node:

- 8-Core CPU
- at least 16 GB RAM
- an SSD drive with at least 2.5 TB free

:::info

If utilizing Amazon Elastic Block Store (EBS), ensure timing buffered disk reads are fast enough in order to avoid latency issues alongside the rate of new blocks added to Lisk during the initial synchronization process.

:::

---

[partners]: /lisk-tools/api-providers
[lisk node]: https://github.com/LiskHQ/lisk-node