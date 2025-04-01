---
title: Node providers
slug: /lisk-tools/node-providers
description: Documentation for Node Providers for the Lisk network. Including details on their services, supported networks, and pricing plans.
keywords:
  [
    Node Providers,
    Lisk,
    Lisk network,
    Lisk node,
    hosted nodes,
    archival nodes,
    RPC,
    RPC node,
    RPC URL,
    RPC endpoints,
    blockchain services,
    blockchain infrastructure,
    developer tools,
    API,
    Web3 infrastructure,
    dRPC,
    Sepolia,
  ]
---

# Node providers

Lisk nodes expose an RPC API that allows other parties to interact with the blockchain by invoking requests.

If you're just getting started and need an RPC URL, you can use our [free endpoints](#lisk-rpc).
If you're looking to strengthen your app and avoid rate-limiting for your users, please check out our available RPC node providers like [dRPC](#drpc).

:::tip[API reference]
The available endpoints for Lisk nodes include all [Geth RPC endpoints](https://geth.ethereum.org/docs/interacting-with-geth/rpc), which also include all standard [JSON-RPC API endpoints](https://ethereum.github.io/execution-apis/api-documentation/) of Ethereum. 
:::

## Lisk RPC

Free, rate limited RPC endpoints for the Lisk networks.

|               | Lisk Sepolia Testnet              | Lisk                      |
| :------       | :------                           | :-----------------------  |
|**HTTP RPC**   | https://rpc.sepolia-api.lisk.com  | https://rpc.api.lisk.com  |
|**WS RPC**     | `wss://ws.sepolia-api.lisk.com`   | `wss://ws.api.lisk.com`   |


## dRPC

[dRPC](https://drpc.org/) is a decentralized Web3 infrastructure provider with a focus on resilience and latency.
dRPC offers access to a distributed network of public nodes for Lisk.
They provide a free tier that allows for an unlimited amount of requests over public nodes, or a paid tier that provides access to all providers, as well as other additional features.

|               | Lisk Sepolia Testnet              | Lisk                      |
| :------       | :------                           | :-----------------------  |
|**HTTP RPC**   | https://lisk-sepolia.drpc.org  | https://lisk.drpc.org  |
|**WS RPC**     | `wss://lisk-sepolia.drpc.org`   | `wss://lisk.drpc.org`   |

You can also check the available endpoints for Lisk directly under [https://drpc.org/public-endpoints/lisk](https://drpc.org/public-endpoints/lisk).

dRPC also provides a [faucet for Lisk Sepolia](./faucets.md#drpc-faucet).

:::note[How to create API keys for dRPC]
In order to use the provided endpoints, you need to [get the corresponding API keys](https://docs.drpc.org/gettingstarted/createaccount).
:::

## Gelato

[Gelato](https://www.gelato.network/) RPC Nodes provide a fast and reliable production environment, enabling access to Gelato rollups via RPC. You can send transactions, deploy smart contracts, query blockchain data, and perform other operations without the need to run your own RPC node or manage infrastructure.

- [Gelato RPC nodes](https://docs.gelato.network/rpc-nodes/introduction)
- [Supports Lisk Mainnet](https://docs.gelato.network/rpc-nodes/supported-networks)

## Moralis

[Moralis](https://developers.moralis.com/chains/lisk/) APIs elevate your dapps with unmatched speed, security, and scalability across EVM-compatible chains.

Moralis enforces rate limits at the account level to ensure fair usage across all users.
Each account has a set number of allowed requests per minute, based on your plan.

[Get Free Lisk RPC Nodes using Moralis](https://developers.moralis.com/chains/lisk/)

The free plan for Moralis includes:

- 40K Compute Units per day
- Access to RPC nodes
- Access to all Moralis APIs

To use the Moralis RPC Nodes, follow these steps:

1. **Create a Moralis account:** [Sign up](https://admin.moralis.com/) for free and access your RPC nodes.
2. **Set up your node:** Visit the [Setting Up RPC Nodes](https://docs.moralis.com/get-your-node-api-key) guide to create and configure your RPC node.
3. **Make your first RPC call:** Once you have your node set up, follow the [tutorial](https://docs.moralis.com/make-your-first-rpc-call) to make your first JSON-RPC call using ethers.js.

## Tenderly

[Tenderly](https://tenderly.co/) is a Web3 development platform that offers its tools and infrastructure across 79+ networks. Some networks, like Lisk, also have node RPC support.

- [Lisk Mainnet nodes by Tenderly](https://docs.tenderly.co/node/rpc-reference/lisk)
- [Lisk Sepolia Testnet nodes by Tenderly](https://docs.tenderly.co/node/rpc-reference/lisk-sepolia)

Tenderly provides a [free trier](https://tenderly.co/pricing) to use their RPC nodes.

## thirdweb

[RPC Edge](https://portal.thirdweb.com/infrastructure/rpc-edge/overview) by thirdweb provides reliable access to querying data and interacting with the blockchain through global edge RPCs.

- [Lisk Mainnet RPC by thirdweb](https://thirdweb.com/lisk)
- [Lisk Sepolia Testnet RPC by thirdweb](https://thirdweb.com/lisk-sepolia-testnet)

Thirdweb provides a [free trier](https://thirdweb.com/pricing) to use their RPC nodes.
