---
title: Menjalankan Node Lisk
slug: /building-on-lisk/run-a-lisk-node
description: Tutorial yang mengajarkan cara memasang dan menjalankan Node Lisk.
keywords:
  [
    pemasangan node Lisk,
    menjalankan node,
    node Lisk,
    jalankan node Lisk,
    persyaratan perangkat keras,
    sinkronisasi node,
    snapshots node,
    Lisk chain,
    Lisk blockchain,
    jaringan Lisk,
    peluncuran node,
    Ethereum node,
  ]
tags: ['node']
difficulty: beginner
---

**Menjalankan Node Lisk**

Tutorial ini akan memandu Anda untuk mengatur dan menjalankan [Node Lisk] Anda sendiri.

## Tujuan

Pada akhir tutorial ini, Anda akan dapat:

- Meluncurkan dan menyinkronkan node Lisk

## Prasyarat

:::caution

Menjalankan node membutuhkan waktu, sumber daya, dan biaya yang signifikan. Jika Anda belum mengetahui alasan untuk menjalankan node Anda sendiri, kemungkinan besar Anda tidak membutuhkannya.

Jika Anda baru memulai dan memerlukan URL RPC, Anda dapat menggunakan endpoint gratis kami:

- **Mainnet**: `https://rpc.api.lisk.com`
- **Testnet (Sepolia)**: `https://rpc.sepolia-api.lisk.com`

**Catatan:** RPC kami memiliki rate limit, sehingga tidak cocok untuk aplikasi produksi.

Jika Anda ingin memperkuat aplikasi Anda dan menghindari rate limit untuk pengguna Anda, silakan cek salah satu [mitra kami].

:::

## Persyaratan Sistem

Persyaratan sistem berikut direkomendasikan untuk menjalankan node Lisk L2.

### Memori

- CPU multi-core modern dengan kinerja core tunggal yang baik.
- Mesin dengan minimal 16 GB RAM (32 GB disarankan).

### Penyimpanan

- Mesin dengan SSD berkinerja tinggi dengan ruang kosong setidaknya 750GB (untuk node penuh) atau 4.5TB (untuk node arsip).

## Penggunaan

:::note
Saat ini belum memungkinkan untuk menjalankan node dengan flag `--op-network` hingga konfigurasi untuk Lisk digabungkan ke dalam [superchain-registry](https://github.com/ethereum-optimism/superchain-registry).

Saat ini ada [PR terbuka](https://github.com/ethereum-optimism/superchain-registry/pull/234) untuk menambahkan konfigurasi Lisk Mainnet. Dukungan untuk Lisk Sepolia Testnet akan segera ditambahkan.
:::

### Mengkloning Repository

```sh
git clone https://github.com/LiskHQ/lisk-node.git
```

```sh
cd lisk-node
```

### Docker

1. Pastikan Anda memiliki RPC node penuh Ethereum L1 (bukan Lisk), dan atur variabel `OP_NODE_L1_ETH_RPC` dan `OP_NODE_L1_BEACON` (dalam file `.env.*`, jika menggunakan docker-compose).
   Jika Anda menjalankan node L1 sendiri, node tersebut harus disinkronkan sebelum node Lisk dapat sepenuhnya sinkron.
2. Pastikan file environment yang relevan dengan jaringan Anda (`.env.sepolia`, atau `.env.mainnet`) diatur untuk properti `env_file` dalam `docker-compose.yml`. Secara default, diatur ke `.env.mainnet`.

   :::info
   Kami saat ini mendukung menjalankan node `op-geth` atau `op-reth` bersama dengan `op-node`. Secara default, kami menjalankan node `op-geth`. Jika Anda ingin menjalankan node `op-reth`, silakan atur variabel environment `CLIENT` ke `reth` sebelum memulai node.
   :::

3. Jalankan:

   ```
   docker compose up --build --detach
   ```

4. Anda sekarang seharusnya dapat melakukan `curl` ke node Lisk Anda:
   ```
   curl -s -d '{"id":0,"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false]}' \
     -H "Content-Type: application/json" http://localhost:8545
   ```

### Sinkronisasi

Kecepatan sinkronisasi tergantung pada node L1 Anda, karena sebagian besar chain berasal dari data yang dikirimkan ke L1.
Anda dapat memeriksa status sinkronisasi Anda menggunakan RPC `optimism_syncStatus` pada container `op-node`.
Contoh:

```
command -v jq  &> /dev/null || { echo "jq is not installed" 1>&2 ; }
echo Latest synced block behind by: \
$((($( date +%s )-\
$( curl -s -d '{"id":0,"jsonrpc":"2.0","method":"optimism_syncStatus"}' -H "Content-Type: application/json" http://localhost:7545 |
   jq -r .result.unsafe_l2.timestamp))/60)) minutes
```

[mitra kami]: /lisk-tools/api-providers
[node lisk]: https://github.com/LiskHQ/lisk-node
