---
title: Deploy Token Standar
slug: /building-on-lisk/add-token-to-lisk/standard-token
description: 'Pelajari cara menambahkan token ERC-20 standar Anda ke Lisk menggunakan bridge standar.'
keywords:
  [
    'kontrak ERC-20',
    'Token Standar',
    'Lisk Testnet',
    'Sepolia',
    'Ethereum',
    'Lisk Sepolia',
    'daftar token Optimism Superchain',
  ]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy Token ERC-20 Standar Anda ke Lisk

<!-- :::info
**Tutorial ini ditujukan untuk developer yang ingin bridge token ERC-20 Standar baru ke Lisk Sepolia.**
Jika Anda ingin bridge token yang sudah ada, silakan ikuti tutorial [Bridge Token ERC-20 dengan Optimism SDK](https://docs.optimism.io/builders/app-developers/tutorials/cross-dom-bridge-erc20).
::: -->

Dalam tutorial ini, Anda akan belajar cara bridge token ERC-20 standar dari Ethereum ke Lisk menggunakan [Sistem Bridge Standar](https://docs.optimism.io/builders/dapp-developers/bridging/standard-bridge).  
Tutorial ini ditujukan untuk developer yang sudah memiliki token ERC-20 di Ethereum dan ingin membuat representasi token tersebut di Lisk.

Tutorial ini menjelaskan cara menggunakan [`OptimismMintableERC20Factory`](https://github.com/ethereum-optimism/optimism/blob/186e46a47647a51a658e699e9ff047d39444c2de/packages/contracts-bedrock/contracts/universal/OptimismMintableERC20Factory.sol) untuk deploy token ERC-20 standar di jaringan Lisk atau Lisk Sepolia.  
Token yang dibuat oleh kontrak factory ini kompatibel dengan sistem Bridge Standar dan mencakup logika dasar untuk deposit, transfer, dan withdrawals.  
Jika Anda ingin menyertakan logika khusus di dalam token L2 Anda, lihat tutorial [Bridge Token ERC-20 Kustom Anda ke Lisk](./custom-token).

## Dependensi

- [cast](https://book.getfoundry.sh/getting-started/installation)

## Prasyarat

:::note
Anda dapat deploy **token ERC-20 Standar** Anda di Lisk Mainnet dengan menggunakan proses yang sama.  
Untuk deploy ke mainnet, pastikan wallet Anda memiliki ETH yang cukup.

Teks berikut mencakup perintah untuk Lisk dan Lisk Sepolia demi kemudahan Anda.  
Untuk informasi lebih lanjut, lihat [jaringan Lisk yang tersedia](/network-info) dan [cara menghubungkan wallet ke jaringan tersebut](/user/connecting-to-a-wallet).
:::

### Dapatkan ETH di Sepolia dan Lisk Sepolia

Tutorial ini menjelaskan cara membuat token ERC-20 yang di-bridge di Lisk Sepolia.  
Anda perlu mendapatkan sejumlah ETH di kedua testnet ini.

:::info
Anda dapat menggunakan [ETH Sepolia Faucet](https://sepoliafaucet.com/) untuk mendapatkan ETH di Sepolia.  
Anda dapat menggunakan [Superchain Faucet](https://console.optimism.io/faucet) untuk mendapatkan ETH di Lisk Sepolia.
:::

### Dapatkan Alamat Token ERC-20 L1

Anda memerlukan token ERC-20 L1 untuk tutorial ini.  
Jika Anda sudah memiliki token ERC-20 L1 yang di-deploy di Ethereum Mainnet atau Sepolia, Anda dapat melewati langkah ini.  
Untuk Sepolia, Anda dapat menggunakan token uji coba yang berada di alamat [`0x5589BB8228C07c4e15558875fAf2B859f678d129`](https://sepolia.etherscan.io/address/0x5589BB8228C07c4e15558875fAf2B859f678d129), yang memiliki fungsi `faucet()` untuk me-mint token.

## Membuat Token ERC-20 L2

Setelah Anda memiliki token ERC-20 L1, Anda dapat menggunakan [`OptimismMintableERC20Factory`](https://github.com/ethereum-optimism/optimism/blob/186e46a47647a51a658e699e9ff047d39444c2de/packages/contracts-bedrock/contracts/universal/OptimismMintableERC20Factory.sol) untuk membuat token ERC-20 L2 yang sesuai di jaringan Lisk atau Lisk Sepolia.  
Semua token yang dibuat oleh factory ini mengimplementasikan interface `IOptimismMintableERC20` dan kompatibel dengan sistem Bridge Standar.  
Untuk membuat token ERC-20 L2, lakukan langkah-langkah berikut:

### 1. Tambahkan private key ke environment Anda

Anda memerlukan private key untuk menandatangani transaksi.  
Atur private key Anda sebagai variabel environment menggunakan perintah `export`.  
Pastikan private key ini sesuai dengan alamat yang memiliki ETH di jaringan Lisk atau Lisk Sepolia.

```bash
export TUTORIAL_PRIVATE_KEY=0x...
```

### 2. Tambahkan URL RPC Lisk ke environment Anda

Anda memerlukan URL RPC untuk terhubung ke jaringan Lisk atau Lisk Sepolia.  
Atur URL RPC Anda sebagai variabel environment menggunakan perintah `export`.

<Tabs>
  <TabItem value="mainnet" label="Lisk" >
    ```bash 
    export TUTORIAL_RPC_URL=https://rpc.api.lisk.com
    ```
  </TabItem>
  <TabItem value="testnet" label="Lisk Sepolia" default>
    ```bash 
    export TUTORIAL_RPC_URL=https://rpc.sepolia-api.lisk.com
    ```
  </TabItem>
</Tabs>

### 3. Tambahkan alamat token ERC-20 L1 Anda ke environment

Anda perlu mengetahui alamat token ERC-20 L1 Anda untuk membuat representasi token tersebut di jaringan Lisk atau Lisk Sepolia.  
Atur alamat token ERC-20 L1 Anda sebagai variabel environment menggunakan perintah `export`.

```bash
# Replace this with your L1 ERC-20 token if not using the testing token!
export TUTORIAL_L1_ERC20_ADDRESS=0x5589BB8228C07c4e15558875fAf2B859f678d129
```

### 4. Deploy token ERC-20 L2 Anda

Anda sekarang dapat deploy token ERC-20 L2 Anda menggunakan [`OptimismMintableERC20Factory`](https://github.com/ethereum-optimism/optimism/blob/186e46a47647a51a658e699e9ff047d39444c2de/packages/contracts-bedrock/contracts/universal/OptimismMintableERC20Factory.sol).  
Gunakan perintah `cast` untuk memicu fungsi deployment pada kontrak factory.  
Contoh perintah berikut akan membuat token dengan nama "My Standard Demo Token" dan simbol "L2TKN".  
Alamat token ERC-20 L2 yang dihasilkan akan mint di konsol.

```bash
cast send 0x4200000000000000000000000000000000000012 "createOptimismMintableERC20(address,string,string)" $TUTORIAL_L1_ERC20_ADDRESS "My Standard Demo Token" "L2TKN" --private-key $TUTORIAL_PRIVATE_KEY --rpc-url $TUTORIAL_RPC_URL --json | jq -r '.logs[0].topics[2]' | cast parse-bytes32-address
```

Jika semua berjalan dengan lancar, Anda akan menerima respons berisi alamat kontrak yang baru saja di-deploy:

```text
0x891C582b83F69B7c2d3107cd73A3e491CB33962F
```

:::note[Menggunakan factory **tidak** direkomendasikan untuk production]
Factory memudahkan proses deployment kontrak secara instan.  
Namun, kelemahannya adalah Anda tidak memiliki kendali atas source code dari kontrak yang akan di-deploy karena proses ini dilakukan oleh factory.

Selain itu, verifikasi kontrak tersebut di Blockscout tidak begitu mudah dilakukan, karena source code kontrak diperlukan untuk proses verifikasi.
:::

<!-- ## Bridge Beberapa Token

Sekarang setelah Anda memiliki token ERC-20 L2, Anda dapat bridge beberapa token dari L1 ke L2.
Lihat tutorial [Bridge Token ERC-20 dengan Optimism SDK](https://docs.optimism.io/builders/app-developers/tutorials/cross-dom-bridge-erc20) untuk mempelajari cara bridge token ERC-20 L1 ke L2 dan sebaliknya menggunakan Optimism SDK. -->

<!-- ## Tambahkan ke Superchain Token List

[Superchain Token List](https://github.com/ethereum-optimism/ethereum-optimism.github.io#readme) adalah daftar umum token yang telah di-deploy di chain dalam Optimism Superchain.
Daftar ini digunakan oleh layanan seperti [Optimism Bridge UI](https://app.optimism.io/bridge).
Jika Anda ingin token OP Mainnet Anda dimasukkan ke dalam daftar ini, silakan lihat [proses peninjauan dan kriteria penggabungan](https://github.com/ethereum-optimism/ethereum-optimism.github.io#review-process-and-merge-criteria). -->
