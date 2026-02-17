---
title: Data Indexers
description: "Brief introduction to all the indexers linked with Lisk L2."
keywords: [
    "indexers",
    "data indexers",
    "Lisk",
    "Lisk test network",
    "Lisk testnet",
    "Goldsky",
    "Solidity",
    "Mirror",
    "Subgraph"
    ]
---

# Data Indexers

## Envio
[Envio](https://envio.dev/) is a modular hyper-performant data indexing solution, enabling applications and developers to efficiently index and aggregate real-time and historical blockchain data.
Envio offers three primary solutions for indexing and accessing large amounts of data: 
[HyperIndex](https://docs.envio.dev/docs/HyperIndex/overview) (a customizable indexing framework), [HyperSync](https://docs.envio.dev/docs/HyperSync/overview) (a real-time indexed data layer), and [HyperRPC](https://docs.envio.dev/docs/HyperRPC/overview-hyperrpc) (extremely fast read-only RPC).

[HyperSync accelerates the synchronization of historical data on Lisk](https://docs.envio.dev/docs/HyperIndex/lisk), enabling what usually takes hours to sync millions of events to be completed in under a minute—up to 2000x faster than traditional RPC methods.

Designed to optimize the user experience, Envio offers automatic code generation, flexible language support, multi-chain data aggregation, and a reliable, cost-effective hosted service.

To get started, follow Envio's [quickstart guide](https://docs.envio.dev/docs/HyperIndex/contract-import).


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