---
title: Data Indexers
slug: /lisk-tools/indexers
description: "Brief introduction to all the indexers linked with Lisk L2."
keywords: [
    "thirdweb",
    "smart contract",
    "ERC-721", "Lisk",
    "Lisk test network",
    "Lisk testnet",
    "Node.js",
    "Solidity",
    "smart contract deployment",
    "deploy a smart contract",
    "deploying smart contracts",
    "build on lisk",
    "write smart contract",
    "smart contract development"
    ]
---

# Data Indexers

## Goldsky

[Goldsky](https://goldsky.com/) is the go-to data indexer for web3 builders, offering high-performance subgraph hosting and real-time data replication pipelines.
It reads, edits, and syncs fresh blockchain data and allows you to hook this information into your code.
The Lisk blockchain is indexed by Goldsky.

Goldsky is comprised of two main components:

- [Subgraphs](https://docs.goldsky.com/introduction#subgraphs): It is a fully backward-compatible subgraph indexing approach offered by Goldsky.
To enhance reliability and performance, the core indexing process uses the exact WASM processing layer together with a rewritten RPC layer, autoscaling query layer, and storage optimizations.
Support for webhooks for notifications, messaging, and other related use cases is included.


- [Mirror](https://docs.goldsky.com/introduction#mirror): With just one `.yaml` definition file, you can use Mirror, a serverless data pipeline technology, to obtain real-time data into your database. 
Data is pushed to your queue or datastore, where it may be queried without any external rate limitations, alongside your existing data.
Goldsky receives instructions from a mirror pipeline on where to obtain data: [sources](https://docs.goldsky.com/mirror/sources/supported-sources), how to process it (optionally), and where to store the results: [sinks](https://docs.goldsky.com/mirror/sinks/supported-sinks).




