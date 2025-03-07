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
    deployment node,
    Ethereum node,
  ]
tags: ['node']
difficulty: beginner
---

Tutorial ini akan memandu Anda melalui proses pengaturan [Lisk Node] sendiri dengan Docker.  

*Untuk instruksi menjalankan Lisk node dari sumber, silakan lihat instruksi yang dijelaskan di repositori GitHub [Lisk Node](https://github.com/LiskHQ/lisk-node?tab=readme-ov-file#source).*

## Tujuan

Pada akhir tutorial ini, Anda akan dapat:

- Deploy dan menyinkronkan node Lisk

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

Kami merekomendasikan konfigurasi perangkat keras berikut untuk menjalankan node Lisk L2:
- CPU multi-core modern dengan performa single-core yang baik.  
- Minimal 16 GB RAM (disarankan 32 GB).  
- Drive NVMe SSD yang terhubung secara lokal.  
- Kapasitas penyimpanan yang memadai untuk menampung proses pemulihan snapshot (jika memulihkan dari snapshot) dan data rantai, dengan memastikan kapasitas minimum sebesar (2 * ukuran_rantai_saat_ini) + ukuran_snapshot + 20% buffer.  
- Jika menjalankan dengan Docker, harap instal Docker Engine versi [27.0.1](https://docs.docker.com/engine/release-notes/27.0/) atau lebih tinggi.  

*Catatan: Jika menggunakan Amazon Elastic Block Store (EBS), pastikan kecepatan pembacaan disk buffered cukup cepat untuk menghindari masalah latensi seiring dengan penambahan blok baru ke Base selama proses sinkronisasi awal; `io2 block express` disarankan.*

## Penggunaan


:::note
Sekarang memungkinkan untuk menjalankan node Lisk dengan flag `--op-network` pada klien eksekusi `op-geth`.

Saat ini masih belum memungkinkan untuk menjalankan node Lisk dengan flag `--chain` pada klien eksekusi `op-reth`.
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

   3. Saat ini kami mendukung menjalankan node `op-geth` atau `op-reth` bersama dengan `op-node`. Secara default, kami menjalankan node `op-geth`. Jika Anda ingin menjalankan node `op-reth` sebagai gantinya, harap atur variabel lingkungan `CLIENT` ke `reth` sebelum memulai node.  

   :::note  
   Klien `op-reth` dapat dibangun dalam profil `maxperf` (default) atau `release`.  
   Untuk mempelajari lebih lanjut, silakan lihat dokumentasi reth tentang [Optimizations](https://github.com/paradigmxyz/reth/blob/main/book/installation/source.md#optimizations).  
   Harap atur variabel lingkungan `RETH_BUILD_PROFILE` sesuai dengan kebutuhan Anda.  
   Kecuali Anda membangun klien `op-reth` dalam profil `release`, pastikan Anda memiliki mesin dengan RAM 32 GB.  
   Selain itu, jika Anda memiliki Docker Desktop terinstal di sistem Anda, pastikan untuk mengatur batas Memori minimal 16 GB.  
   Pengaturan ini dapat ditemukan di `Settings -> Resources -> Resource Allocation -> Memory limit`.  
   :::

4. Jalankan:
:::peringatan[penting]  
Untuk menjalankan node di Lisk Sepolia, pertama-tama patch Dockerfile(s) dengan:  
```sh  
git apply dockerfile-lisk-sepolia.patch  
```
:::  

dengan klien eksekusi `op-geth`:  

```sh
   docker compose up --build --detach
   ```

atau, dengan klien eksekusi `op-reth`:  

```sh  
CLIENT=reth RETH_BUILD_PROFILE=maxperf docker compose up --build --detach  
```  
5. Sekarang Anda seharusnya dapat menjalankan `curl` pada node Lisk Anda:  
```sh

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
[lisk node]: https://github.com/LiskHQ/lisk-node  

### Snapshots  
:::catatan  
- Snapshot tersedia untuk klien `op-geth` dan `op-reth`:  
  - `op-geth` mendukung snapshot jenis export dan datadir  
  - `op-reth` hanya mendukung snapshot jenis datadir  
- Semua snapshot berasal dari node arsip  
- Jenis snapshot:  
  - `export`: ukuran unduhan kecil, pemulihan lambat, data diverifikasi selama pemulihan (`op-geth` saja)  
  - `datadir`: ukuran unduhan besar, pemulihan cepat, tidak ada verifikasi data selama pemulihan  
:::  

Untuk mengaktifkan pengunduhan dan penerapan snapshot otomatis, atur variabel lingkungan `APPLY_SNAPSHOT` ke `true` saat memulai node:  

```sh  
APPLY_SNAPSHOT=true docker compose up --build --detach  
```  

Untuk menentukan klien dan jenis snapshot, atur variabel lingkungan `CLIENT` dan `SNAPSHOT_TYPE`:  

```sh  
# Untuk op-geth dengan snapshot export (default)  
APPLY_SNAPSHOT=true CLIENT=geth SNAPSHOT_TYPE=export docker compose up --build --detach  

# Untuk op-geth dengan snapshot datadir  
APPLY_SNAPSHOT=true CLIENT=geth SNAPSHOT_TYPE=datadir docker compose up --build --detach  

# Untuk op-reth (hanya mendukung datadir)  
APPLY_SNAPSHOT=true CLIENT=reth SNAPSHOT_TYPE=datadir docker compose up --build --detach  
```  

Anda juga dapat mengunduh dan menerapkan snapshot dari URL khusus dengan mengatur variabel lingkungan `SNAPSHOT_URL`.  
Pastikan file snapshot diakhiri dengan `*.tar.gz`.  
```sh  
APPLY_SNAPSHOT=true SNAPSHOT_URL=<custom-snapshot-url> docker compose up --build --detach  
```