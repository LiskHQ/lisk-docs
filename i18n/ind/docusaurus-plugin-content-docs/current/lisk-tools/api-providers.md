---
title: API Providers
slug: /lisk-tools/api-providers
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

# API Providers

Lisk nodes expose an RPC API that allows other parties to interact with the blockchain by invoking requests.

If you're just getting started and need an RPC URL, you can use our [free endpoints](#lisk-rpc).
If you're looking to strengthen your app and avoid rate-limiting for your users, please check out our available RPC node providers like [dRPC](#drpc).

## API reference

The available endpoints for Lisk nodes include all [Geth RPC endpoints](https://geth.ethereum.org/docs/interacting-with-geth/rpc), which also include all standard [JSON-RPC API endpoints](https://ethereum.github.io/execution-apis/api-documentation/) of Ethereum. 


## Lisk RPC

Free, rate limited RPC endpoints for the Lisk networks.


<!-- |               | Lisk Sepolia Testnet              | 
| :------       | :------                           | 
|**HTTP RPC**   | https://rpc.sepolia-api.lisk.com  | 
|**WS RPC**     | `wss://ws.sepolia-api.lisk.com`   |  -->

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

:::note[How to create API keys for dRPC]
In order to use the provided endpoints, you need to [get the corresponding API keys](https://docs.drpc.org/gettingstarted/createaccount).
:::