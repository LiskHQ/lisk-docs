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

This tutorial will walk you through setting up your own [Lisk Node] with Docker.

*For instructions to run a Lisk node from source, please check the instructions detailed in the [Lisk Node](https://github.com/LiskHQ/lisk-node?tab=readme-ov-file#source) GitHub repository.*

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

We recommend you the following hardware configuration to run a Lisk L2 node:

- A modern multi-core CPU with good single-core performance.
- A minimum of 16 GB RAM (32 GB recommended).
- A locally attached NVMe SSD drive.
- Adequate storage capacity to accommodate both the snapshot restoration process (if restoring from snapshot) and chain data, ensuring a minimum of (2 * current_chain_size) + snapshot_size + 20%_buffer.
- If running with Docker, please install Docker Engine version [27.0.1](https://docs.docker.com/engine/release-notes/27.0/) or higher.

*Note: If utilizing Amazon Elastic Block Store (EBS), ensure timing buffered disk reads are fast enough in order to avoid latency issues alongside the rate of new blocks added to Base during the initial synchronization process; `io2 block express` is recommended.*

## Usage

:::note
It is now possible to run the Lisk nodes with the `--op-network` flag on the `op-geth` execution client.

It is still not possible to run the Lisk nodes with the `--chain` flag on the `op-reth` execution client.
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
3. We currently support, running either the `op-geth` or the `op-reth` nodes alongside the `op-node`.
By default, we run the `op-geth` node. If you would like to run the `op-reth` node instead, please set the `CLIENT` environment variable to `reth` before starting the node.
    :::note
    The `op-reth` client can be built in either the `maxperf` (default) or `release` profile.
    To learn more about them, please check reth's documentation on [Optimizations](https://github.com/paradigmxyz/reth/blob/main/book/installation/source.md#optimizations).
    Please set the `RETH_BUILD_PROFILE` environment variable accordingly.
    Unless you are building the `op-reth` client in `release` profile, please ensure that you have a machine with 32 GB RAM.
    Additionally, if you have the Docker Desktop installed on your system, please make sure to set Memory limit to a minimum of 16 GB.
    It can be set under `Settings -> Resources -> Resource Allocation -> Memory limit`.
    :::

4. Run:
    :::warning[important]
    To run the node on Lisk Sepolia, first patch the Dockerfile(s) with:
    ```sh
    git apply dockerfile-lisk-sepolia.patch
    ```
    :::

    with `op-geth` execution client:

    ```sh
    docker compose up --build --detach
    ```

    or, with `op-reth` execution client:

    ```sh
    CLIENT=reth RETH_BUILD_PROFILE=maxperf docker compose up --build --detach
    ```
5. You should now be able to `curl` your Lisk node:
    ```sh
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

[partners]: /lisk-tools/node-providers
[lisk node]: https://github.com/LiskHQ/lisk-node

### Snapshots

:::note
- Snapshots are available for both `op-geth` and `op-reth` clients:
  - `op-geth` supports both export and datadir snapshots
  - `op-reth` only supports datadir snapshots
- All snapshots are from archival nodes
- Snapshot types:
  - `export`: small download size, slow to restore from, data is verified during restore (`op-geth` only)
  - `datadir`: large download size, fast to restore from, no data verification during restore
:::

To enable auto-snapshot download and application, set the `APPLY_SNAPSHOT` environment variable to `true` when starting the node:

```sh
APPLY_SNAPSHOT=true docker compose up --build --detach
```
To specify the client and snapshot type, set both the `CLIENT` and `SNAPSHOT_TYPE` environment variables:

```sh
# For op-geth with export snapshot (default)
APPLY_SNAPSHOT=true CLIENT=geth SNAPSHOT_TYPE=export docker compose up --build --detach

# For op-geth with datadir snapshot
APPLY_SNAPSHOT=true CLIENT=geth SNAPSHOT_TYPE=datadir docker compose up --build --detach

# For op-reth (only supports datadir)
APPLY_SNAPSHOT=true CLIENT=reth SNAPSHOT_TYPE=datadir docker compose up --build --detach
```

You can also download and apply a snapshot from a custom URL by setting the `SNAPSHOT_URL` environment variable.
Please make sure the snapshot file ends with `*.tar.gz`.

```sh
APPLY_SNAPSHOT=true SNAPSHOT_URL=<custom-snapshot-url> docker compose up --build --detach
```
