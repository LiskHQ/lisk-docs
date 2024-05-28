---
title: Running a Lisk Node
slug: /building-on-lisk/run-a-lisk-node
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
---

This tutorial will walk you through setting up your own [Lisk Node].

## Objectives

By the end of this tutorial you should be able to:

- Deploy and sync a Lisk node

## Prerequisites

:::caution

Running a node is time consuming, resource expensive, and potentially costly. If you don't already know why you want to run your own node, you probably don't need to.

If you're just getting started and need an RPC URL, you can use our free endpoints:

- **Mainnet**: `https://rpc.api.lisk.com`
- **Testnet (Sepolia)**: `https://rpc.sepolia-api.lisk.com`

**Note:** Our RPCs are rate-limited, they are not suitable for production apps.

If you're looking to harden your app and avoid rate-limiting for your users, please check out one of our [partners].

:::

## System requirements

The following system requirements are recommended to run a Lisk L2 node.

### Memory

- Modern multi-core CPU with good single-core performance.
- Machines with a minimum of 16 GB RAM (32 GB recommended).

### Storage

- Machines with a high-performing SSD drive with at least 4 TB free.

## Usage

:::note
It is currently not possible to run the nodes with the `--op-network` flag until the configs for Lisk have been merged into the [superchain-registry](https://github.com/ethereum-optimism/superchain-registry).

There is currently an [open PR](https://github.com/ethereum-optimism/superchain-registry/pull/234) to add the Lisk Mainnet config.
The Lisk Sepolia Testnet will be supported soon as well.
:::

### Clone the Repository

```sh
git clone https://github.com/LiskHQ/lisk-node.git
```

```sh
cd lisk-node
```

### Docker

1. Ensure you have an Ethereum L1 full node RPC available (not Lisk), and set the `OP_NODE_L1_ETH_RPC` and the `OP_NODE_L1_BEACON` variables (within the `.env.*` files, if using docker-compose).
If running your own L1 node, it needs to be synced before the Lisk node will be able to fully sync.
2. Please ensure that the environment file relevant to your network (`.env.sepolia`, or `.env.mainnet`) is set for the `env_file` properties within `docker-compose.yml`.
By default, it is set to `.env.mainnet`.
3. Run:

```
docker compose up --build --detach
```

4. You should now be able to `curl` your Lisk node:

```
curl -s -d '{"id":0,"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false]}' \
  -H "Content-Type: application/json" http://localhost:8545
```

### Syncing

Sync speed depends on your L1 node, as the majority of the chain is derived from data submitted to the L1.
You can check your syncing status using the `optimism_syncStatus` RPC on the `op-node` container.
Example:

```
command -v jq  &> /dev/null || { echo "jq is not installed" 1>&2 ; }
echo Latest synced block behind by: \
$((($( date +%s )-\
$( curl -s -d '{"id":0,"jsonrpc":"2.0","method":"optimism_syncStatus"}' -H "Content-Type: application/json" http://localhost:7545 |
   jq -r .result.unsafe_l2.timestamp))/60)) minutes
```


[partners]: /lisk-tools/api-providers
[lisk node]: https://github.com/LiskHQ/lisk-node