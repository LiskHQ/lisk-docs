---
title: Penyedia API  
slug: /lisk-tools/api-providers  
description: Dokumentasi untuk Penyedia Node untuk jaringan Lisk. Termasuk rincian tentang layanan mereka, jaringan yang didukung, dan paket harga.  
keywords:  
  [
    Penyedia Node,
    Lisk,
    jaringan Lisk,
    node Lisk,
    node yang dihosting,
    node arsip,
    RPC,
    node RPC,
    URL RPC,
    endpoint RPC,
    layanan blockchain,
    infrastruktur blockchain,
    alat pengembang,
    API,
    infrastruktur Web3,
    dRPC,
    Sepolia,
  ]  

---

# Penyedia API

Node Lisk mengungkapkan API RPC yang memungkinkan pihak lain berinteraksi dengan blockchain dengan mengirimkan permintaan.

Jika Anda baru memulai dan membutuhkan URL RPC, Anda dapat menggunakan [endpoint gratis kami](#lisk-rpc).  
Jika Anda ingin memperkuat aplikasi Anda dan menghindari rate-limit untuk pengguna Anda, silakan lihat penyedia node RPC yang tersedia seperti [dRPC](#drpc).

## Referensi API

Endpoint yang tersedia untuk node Lisk mencakup semua [endpoint RPC Geth](https://geth.ethereum.org/docs/interacting-with-geth/rpc), yang juga mencakup semua [endpoint API JSON-RPC standar](https://ethereum.github.io/execution-apis/api-documentation/) dari Ethereum.

## Lisk RPC

Endpoint RPC gratis dengan pembatasan laju untuk jaringan Lisk.

|               | Lisk Sepolia Testnet              | Lisk                      |
| :------       | :------                           | :-----------------------  |
|**HTTP RPC**   | https://rpc.sepolia-api.lisk.com  | https://rpc.api.lisk.com  |
|**WS RPC**     | `wss://ws.sepolia-api.lisk.com`   | `wss://ws.api.lisk.com`   |

## dRPC

[dRPC](https://drpc.org/) adalah penyedia infrastruktur Web3 terdesentralisasi yang berfokus pada ketahanan dan latensi.  
dRPC menyediakan akses ke jaringan terdistribusi dari node publik untuk Lisk.  
Mereka menawarkan tier gratis yang memungkinkan jumlah permintaan yang tidak terbatas melalui node publik, atau tier berbayar yang menyediakan akses ke semua penyedia, serta fitur tambahan lainnya.

|               | Lisk Sepolia Testnet              | Lisk                      |
| :------       | :------                           | :-----------------------  |
|**HTTP RPC**   | https://lisk-sepolia.drpc.org  | https://lisk.drpc.org  |
|**WS RPC**     | `wss://lisk-sepolia.drpc.org`   | `wss://lisk.drpc.org`   |

Anda juga dapat memeriksa endpoint yang tersedia untuk Lisk langsung di [https://drpc.org/public-endpoints/lisk](https://drpc.org/public-endpoints/lisk).

:::note[Cara membuat kunci API untuk dRPC]  
Untuk menggunakan endpoint yang disediakan, Anda perlu [mendapatkan kunci API yang sesuai](https://docs.drpc.org/gettingstarted/createaccount).  
:::
