---
title: Meluncurkan Token Standar
slug: /building-on-lisk/add-token-to-lisk/standard-token
description: "Pelajari cara menambahkan token ERC-20 standar Anda ke Lisk menggunakan bridge standar."
keywords:
  [
    "kontrak ERC-20",
    "Token Standar",
    "Testnet Lisk",
    "Sepolia",
    "Ethereum",
    "Lisk Sepolia",
    "Daftar Token Optimism Superchain",
  ]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Meluncurkan Token ERC-20 Standar Anda ke Lisk

<!-- :::info
**Tutorial ini ditujukan untuk developer yang ingin memindahkan token ERC-20 Standar baru ke Lisk Sepolia.**
Jika Anda ingin memindahkan token yang sudah ada, silakan ikuti tutorial [Memindahkan Token ERC-20 dengan Optimism SDK](https://docs.optimism.io/builders/app-developers/tutorials/cross-dom-bridge-erc20).
::: -->

Dalam tutorial ini, Anda akan belajar cara memindahkan token ERC-20 standar dari Ethereum ke Lisk menggunakan [Sistem Bridge Standar](https://docs.optimism.io/builders/dapp-developers/bridging/standard-bridge).  
Tutorial ini ditujukan untuk developer yang sudah memiliki token ERC-20 di Ethereum dan ingin membuat representasi token tersebut di Lisk.

Tutorial ini menjelaskan cara menggunakan [`OptimismMintableERC20Factory`](https://github.com/ethereum-optimism/optimism/blob/186e46a47647a51a658e699e9ff047d39444c2de/packages/contracts-bedrock/contracts/universal/OptimismMintableERC20Factory.sol) untuk meluncurkan token ERC-20 standar di jaringan Lisk atau Lisk Sepolia.  
Token yang dibuat oleh kontrak factory ini kompatibel dengan sistem Bridge Standar dan mencakup logika dasar untuk deposit, transfer, dan withdrawals.  
Jika Anda ingin menyertakan logika khusus di dalam token L2 Anda, lihat tutorial [Memindahkan Token ERC-20 Kustom Anda ke Lisk](./custom-token).

## Dependensi

- [cast](https://book.getfoundry.sh/getting-started/installation)

## Prasyarat

:::note
Anda dapat meluncurkan **token ERC-20 Standar** Anda di Lisk Mainnet dengan menggunakan proses yang sama.  
Untuk meluncurkan ke mainnet, pastikan dompet Anda memiliki ETH yang cukup.

Teks berikut mencakup perintah untuk Lisk dan Lisk Sepolia demi kemudahan Anda.  
Untuk informasi lebih lanjut, lihat [jaringan Lisk yang tersedia](/network-info) dan [cara menghubungkan dompet ke jaringan tersebut](/user/connecting-to-a-wallet).
:::

### Dapatkan ETH di Sepolia dan Lisk Sepolia

Tutorial ini menjelaskan cara membuat token ERC-20 yang dipindahkan melalui bridge di Lisk Sepolia.  
Anda perlu mendapatkan sejumlah ETH di kedua testnet ini.

:::info
Anda dapat menggunakan [ETH Sepolia Faucet](https://sepoliafaucet.com/) untuk mendapatkan ETH di Sepolia.  
Anda dapat menggunakan [Superchain Faucet](https://app.optimism.io/faucet?utm_source=docs) untuk mendapatkan ETH di Lisk Sepolia.
:::

### Dapatkan Alamat Token ERC-20 L1

Anda memerlukan token ERC-20 L1 untuk tutorial ini.  
Jika Anda sudah memiliki token ERC-20 L1 yang diluncurkan di Ethereum Mainnet atau Sepolia, Anda dapat melewati langkah ini.  
Untuk Sepolia, Anda dapat menggunakan token uji coba yang berada di alamat [`0x5589BB8228C07c4e15558875fAf2B859f678d129`](https://sepolia.etherscan.io/address/0x5589BB8228C07c4e15558875fAf2B859f678d129), yang memiliki fungsi `faucet()` untuk me-_mint_ token.

## Membuat Token ERC-20 L2

Setelah Anda memiliki token ERC-20 L1, Anda dapat menggunakan [`OptimismMintableERC20Factory`](https://github.com/ethereum-optimism/optimism/blob/186e46a47647a51a658e699e9ff047d39444c2de/packages/contracts-bedrock/contracts/universal/OptimismMintableERC20Factory.sol) untuk membuat token ERC-20 L2 yang sesuai di jaringan Lisk atau Lisk Sepolia.  
Semua token yang dibuat oleh factory ini mengimplementasikan _interface_ `IOptimismMintableERC20` dan kompatibel dengan sistem _Bridge Standar_.  
Untuk membuat token ERC-20 L2, lakukan langkah-langkah berikut:

### 1. Tambahkan _private key_ ke _environment_ Anda

Anda memerlukan _private key_ untuk menandatangani transaksi.  
Atur _private key_ Anda sebagai variabel _environment_ menggunakan perintah `export`.  
Pastikan _private key_ ini sesuai dengan alamat yang memiliki ETH di jaringan Lisk atau Lisk Sepolia.

```bash
export TUTORIAL_PRIVATE_KEY=0x...
```

### 2. Tambahkan URL RPC Lisk ke _environment_ Anda

Anda memerlukan URL RPC untuk terhubung ke jaringan Lisk atau Lisk Sepolia.  
Atur URL RPC Anda sebagai variabel _environment_ menggunakan perintah `export`.

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

### 3. Tambahkan alamat token ERC-20 L1 Anda ke _environment_

Anda perlu mengetahui alamat token ERC-20 L1 Anda untuk membuat representasi token tersebut di jaringan Lisk atau Lisk Sepolia.  
Atur alamat token ERC-20 L1 Anda sebagai variabel _environment_ menggunakan perintah `export`.

```bash
# Replace this with your L1 ERC-20 token if not using the testing token!
export TUTORIAL_L1_ERC20_ADDRESS=0x5589BB8228C07c4e15558875fAf2B859f678d129
```

### 4. Luncurkan token ERC-20 L2 Anda

Anda sekarang dapat meluncurkan token ERC-20 L2 Anda menggunakan [`OptimismMintableERC20Factory`](https://github.com/ethereum-optimism/optimism/blob/186e46a47647a51a658e699e9ff047d39444c2de/packages/contracts-bedrock/contracts/universal/OptimismMintableERC20Factory.sol).  
Gunakan perintah `cast` untuk memicu fungsi peluncuran pada kontrak factory.  
Contoh perintah berikut akan membuat token dengan nama _"My Standard Demo Token"_ dan simbol _"L2TKN"_.  
Alamat token ERC-20 L2 yang dihasilkan akan dicetak di konsol.

```bash
cast send 0x4200000000000000000000000000000000000012 "createOptimismMintableERC20(address,string,string)" $TUTORIAL_L1_ERC20_ADDRESS "My Standard Demo Token" "L2TKN" --private-key $TUTORIAL_PRIVATE_KEY --rpc-url $TUTORIAL_RPC_URL --json | jq -r '.logs[0].topics[2]' | cast parse-bytes32-address
```

Jika semua berjalan dengan lancar, Anda akan menerima respons berisi alamat kontrak yang baru saja diluncurkan:

```text
0x891C582b83F69B7c2d3107cd73A3e491CB33962F
```

:::note[Menggunakan _factory_ **tidak** direkomendasikan untuk _production_]
_Factory_ memudahkan proses peluncuran kontrak secara instan.  
Namun, kelemahannya adalah Anda tidak memiliki kendali atas _source code_ dari kontrak yang akan diluncurkan karena proses ini dilakukan oleh _factory_.

Selain itu, verifikasi kontrak tersebut di Blockscout tidak begitu mudah dilakukan, karena _source code_ kontrak diperlukan untuk proses verifikasi.
:::

<!-- ## Memindahkan (Bridge) Beberapa Token

Sekarang setelah Anda memiliki token ERC-20 L2, Anda dapat memindahkan beberapa token dari L1 ke L2.
Lihat tutorial [Memindahkan Token ERC-20 dengan Optimism SDK](https://docs.optimism.io/builders/app-developers/tutorials/cross-dom-bridge-erc20) untuk mempelajari cara memindahkan token ERC-20 L1 ke L2 dan sebaliknya menggunakan Optimism SDK. -->

<!-- ## Tambahkan ke Superchain Token List

[Superchain Token List](https://github.com/ethereum-optimism/ethereum-optimism.github.io#readme) adalah daftar umum token yang telah diluncurkan di chain dalam Optimism Superchain.
Daftar ini digunakan oleh layanan seperti [Optimism Bridge UI](https://app.optimism.io/bridge).
Jika Anda ingin token OP Mainnet Anda dimasukkan ke dalam daftar ini, silakan lihat [proses peninjauan dan kriteria penggabungan](https://github.com/ethereum-optimism/ethereum-optimism.github.io#review-process-and-merge-criteria). -->
