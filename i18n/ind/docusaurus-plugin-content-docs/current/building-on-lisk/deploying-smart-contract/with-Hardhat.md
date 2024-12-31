---
title: ... menggunakan Hardhat
slug: /building-on-lisk/deploying-smart-contract/with-Hardhat
description: "Panduan untuk meluncurkan kontrak pintar di jaringan test Lisk menggunakan Hardhat. Termasuk instruksi untuk mengatur environment, mengompilasi, dan meluncurkan kontrak pintar."
keywords:
  [
    "Hardhat",
    "kontrak pintar",
    "ERC-721",
    "Lisk",
    "jaringan test Lisk",
    "testnet Lisk",
    "Node.js",
    "Solidity",
    "smart contract deployment",
    "deploy a smart contract",
    "meluncurkan kontrak pintar",
    "membangun di lisk",
    "menulis ke kontrak pintar",
    "pengembangan kontrak pintar",
  ]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Meluncurkan Kontrak Pintar dengan Hardhat

## Prasyarat

### Node v18+

Panduan ini memerlukan Node versi 18+ yang sudah terinstal.

- _Download_ [Node v18+](https://nodejs.org/en/download/)

Jika Anda menggunakan `nvm` untuk mengelola versi Node Anda, cukup jalankan perintah: `nvm install 18`.

### Dana Dompet

**Meluncurkan kontrak** ke blockchain memerlukan **biaya gas**.  
Oleh karena itu, Anda perlu mendanai dompet Anda dengan ETH untuk menutupi biaya gas tersebut.

Dalam panduan ini, Anda akan meluncurkan kontrak ke Lisk Sepolia Testnet.

Anda dapat men-_deposit_ token yang diperlukan menggunakan [Lisk Bridge](https://sepolia-bridge.lisk.com/bridge/lisk-sepolia-testnet).

Jika dompet Anda tidak memiliki `SepoliaETH` yang cukup, gunakan salah satu faucet yang tersedia untuk **Ethereum Sepolia** Testnet, seperti [https://sepoliafaucet.com](https://sepoliafaucet.com/) untuk menerima ETH Testnet secara gratis.  
Kemudian, gunakan Lisk Bridge yang disebutkan sebelumnya untuk mengirim token dari **Ethereum Sepolia Testnet** ke **Lisk Sepolia Testnet**.

:::note
Anda dapat meluncurkan kontrak di Lisk Mainnet dengan menggunakan proses yang sama.  
Untuk meluncurkan ke mainnet, pastikan dompet Anda memiliki cukup ETH.

Teks berikut mencakup perintah untuk Lisk dan Lisk Sepolia demi kemudahan Anda.  
Untuk informasi lebih lanjut, lihat [jaringan Lisk yang tersedia](/network-info) dan [cara menghubungkan dompet ke jaringan tersebut](/user/connecting-to-a-wallet).

:::

## Membuat Proyek

Sebelum Anda dapat mulai meluncurkan kontrak pintar ke Lisk, Anda perlu menyiapkan _environment_ pengembangan dengan membuat proyek Node.js.

Untuk membuat proyek Node.js baru, jalankan perintah berikut:

```bash
npm init --y
```

Selanjutnya, Anda perlu menginstal [Hardhat](https://hardhat.org/tutorial) dan membuat proyek Hardhat baru.

Untuk menginstal Hardhat, jalankan perintah berikut:

```bash
npm install --save-dev hardhat
```

Untuk membuat proyek Hardhat baru, jalankan perintah berikut:

```bash
npx hardhat
```

Pilih `Create a TypeScript project`, lalu tekan _Enter_ untuk mengonfirmasi direktori proyek.

Pilih `y` untuk menambahkan file `.gitignore` dan memuat proyek contoh.  
Secara opsional, Anda dapat memutuskan untuk membagikan laporan crash dan data penggunaan dengan Hardhat.

```
✔ What do you want to do? · Create a TypeScript project
✔ Hardhat project root: · /Users/lisk/git/hardhat-test
✔ Do you want to add a .gitignore? (Y/n) · y
✔ Help us improve Hardhat with anonymous crash reports & basic usage data? (Y/n) · y
✔ Do you want to install this sample project's dependencies with npm (@nomicfoundation/hardhat-toolbox)? (Y/n) · y
```

Proses penyiapan proyek akan memakan waktu beberapa saat hingga selesai.

## Mengonfigurasi Hardhat dengan Lisk

Untuk meluncurkan kontrak pintar ke jaringan Lisk, Anda perlu mengonfigurasi proyek Hardhat Anda dan menambahkan jaringan Lisk.

Contoh ini menggunakan [dotenv](https://www.npmjs.com/package/dotenv) untuk memuat variabel environment `WALLET_KEY` dari file `.env` ke `process.env.WALLET_KEY`.  
Anda sebaiknya menggunakan metode serupa untuk menghindari menuliskan _private key_ secara langsung di dalam _source code_ Anda.

```bash
npm install --save-dev dotenv
```

Setelah Anda menginstal `dotenv`, buat file `.env` dengan konten berikut:

```
WALLET_KEY=<YOUR_PRIVATE_KEY>
```

Ganti `<YOUR_PRIVATE_KEY>` dengan _private key_ dompet Anda.

:::caution

`WALLET_KEY` adalah _private key_ dari dompet yang akan digunakan saat meluncurkan kontrak.  
Ikuti instruksi dari dompet Anda untuk mendapatkan _private key_.  
Misalnya, untuk **MetaMask**, silakan ikuti [instruksi ini](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key).  
**Sangat penting untuk memastikan bahwa Anda TIDAK meng-upload _private key_ ini ke repositori publik.**

:::

Untuk mengonfigurasi Hardhat agar menggunakan Lisk, tambahkan Lisk sebagai jaringan ke file `hardhat.config.ts` di proyek Anda:

<Tabs>
  <TabItem value="mainnet" label="Lisk" >
    ```ts title="hardhat.config.ts"
    import { HardhatUserConfig } from "hardhat/config";
    import "@nomicfoundation/hardhat-toolbox";

    require('dotenv').config();

    const config: HardhatUserConfig = {
      solidity: "0.8.23",
      networks: {
        // untuk mainnet
        'lisk': {
          url: 'https://rpc.api.lisk.com',
          accounts: [process.env.WALLET_KEY as string],
          gasPrice: 1000000000,
        },
      },
    };

    export default config;
    ```

  </TabItem>
  <TabItem value="testnet" label="Lisk Sepolia" default>
    ```ts title="hardhat.config.ts"
    import { HardhatUserConfig } from "hardhat/config";
    import "@nomicfoundation/hardhat-toolbox";

    require('dotenv').config();

    const config: HardhatUserConfig = {
      solidity: "0.8.23",
      networks: {
        // untuk testnet
        'lisk-sepolia': {
          url: 'https://rpc.sepolia-api.lisk.com',
          accounts: [process.env.WALLET_KEY as string],
          gasPrice: 1000000000,
        },
      },
    };

    export default config;
    ```

  </TabItem>
</Tabs>

## Membuat Kontrak

Untuk kemudahan dan keamanan, kita akan menggunakan _interface_ `ERC721` yang disediakan oleh [OpenZeppelin Contracts library](https://docs.openzeppelin.com/contracts/5.x/) untuk membuat kontrak pintar NFT.  
Dengan OpenZeppelin, kita tidak perlu menulis keseluruhan _interface_ ERC-721. Sebaliknya, kita dapat mengimpor kontrak dari library dan menggunakan fungsinya.

Untuk menambahkan libarry OpenZeppelin Contracts ke proyek Anda, jalankan perintah berikut:

```bash
npm install --save @openzeppelin/contracts
```

Di proyek Anda, hapus kontrak `contracts/Lock.sol` yang dihasilkan saat proyek dibuat.  
(Anda juga dapat menghapus file _test_ `test/Lock.ts`, tetapi Anda sebaiknya segera menambahkan _test_ Anda sendiri!).

Tambahkan kode berikut ke file baru bernama `contracts/NFT.sol`.

```sol title="contracts/NFT.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    uint256 public currentTokenId;

    constructor() ERC721("NFT Name", "NFT") {}

    function mint(address recipient) public returns (uint256) {
        uint256 newItemId = ++currentTokenId;
        _safeMint(recipient, newItemId);
        return newItemId;
    }
}
```

## Mengompilasi Smart Contract

Untuk mengompilasi kontrak menggunakan Hardhat, cukup jalankan perintah berikut:

```bash
npx hardhat compile
```

Setelah kompilasi berhasil, Anda akan melihat folder baru bernama `artifacts/`, yang berisi [artefak kompilasi](https://hardhat.org/hardhat-runner/docs/advanced/artifacts).

## Meluncurkan Smart Contract

Setelah kontrak Anda berhasil dikompilasi, Anda dapat meluncurkan kontrak ke jaringan test Lisk Sepolia.

Untuk meluncurkan kontrak ke jaringan test Lisk Sepolia, Anda perlu memodifikasi file `scripts/deploy.ts` di proyek Anda:

```ts title="scripts/deploy.ts"
import { ethers } from 'hardhat';

async function main() {
  const nft = await ethers.deployContract('NFT');

  await nft.waitForDeployment();

  console.log('NFT Contract Deployed at ' + nft.target);
}

// Kami merekomendasikan pattern ini agar dapat menggunakan async/await di seluruh bagian kode.
// dan menangani error dengan baik.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Anda juga memerlukan ETH Testnet di dompet Anda.  
Lihat bagian [Prasyarat](#prasyarat) jika Anda belum melakukannya. Jika tidak, upaya peluncuran akan gagal.

Terakhir, jalankan perintah berikut:

<Tabs>
  <TabItem value="mainnet" label="Lisk" >
  ```bash
  npx hardhat run scripts/deploy.ts --network lisk
  ```
  </TabItem>
  <TabItem value="testnet" label="Lisk Sepolia" default>
  ```bash
  npx hardhat run scripts/deploy.ts --network lisk-sepolia
  ```
  </TabItem>
</Tabs>

<!-- TODO: Add link to the block explorer section -->

Kontrak akan diluncurkan di Lisk Sepolia Testnet.  
Anda dapat melihat status peluncuran dan kontrak dengan menggunakan penjelajah blockchain dan mencari alamat yang dikembalikan oleh skrip peluncuran Anda.

Jika Anda meluncurkan kontrak baru atau yang dimodifikasi, Anda perlu memverifikasinya terlebih dahulu.

## Memverifikasi Kontrak Pintar

Jika Anda ingin berinteraksi dengan kontrak Anda di penjelajah blockchain, Anda atau orang lain perlu memverifikasinya terlebih dahulu.  
Kontrak di atas sudah diverifikasi, sehingga Anda seharusnya dapat melihat versi Anda di penjelajah blockchain.  
Selebihnya di panduan ini, kami akan menjelaskan langkah-langkah memverifikasi kontrak Anda di Lisk Sepolia Testnet.

Di dalam `hardhat.config.ts`, konfigurasikan Lisk Sepolia sebagai jaringan kustom.  
Tambahkan konfigurasi berikut ke `HardhatUserConfig`:

<Tabs>
  <TabItem value="mainnet" label="Lisk" >
  ```ts title="hardhat.config.ts"
  // Tambahkan informasi berikut setelah konfigurasi "networks" di HardhatUserConfig:
  const config: HardhatUserConfig = {
    // Hardhat berekspektasi konfigurasi etherscan di sini, meskipun Anda menggunakan Blockscout.
    etherscan: {
      // Gunakan "123" sebagai placeholder, karena Blockscout tidak memerlukan API key yang sebenarnya, namun Hardhat akan memberikan error jika properti ini tidak diatur.
      apiKey: {
        "lisk": "123"
      },
      customChains: [
        {
            network: "lisk",
            chainId: 1135,
            urls: {
                apiURL: "https://blockscout.lisk.com/api",
                browserURL: "https://blockscout.lisk.com"
            }
        }
      ]
    },
    sourcify: {
      enabled: false
    },
  };
  ```
  </TabItem>
  <TabItem value="testnet" label="Lisk Sepolia" default>
  ```ts title="hardhat.config.ts"
  // Tambahkan informasi berikut setelah konfigurasi "networks" di HardhatUserConfig
  const config: HardhatUserConfig = {
    // Hardhat berekspektasi konfigurasi etherscan di sini, meskipun Anda menggunakan Blockscout.
    etherscan: {
      // Gunakan "123" sebagai placeholder, karena Blockscout tidak memerlukan API key yang sebenarnya, namun Hardhat akan memberikan error jika properti ini tidak diatur.
      apiKey: {
        "lisk-sepolia": "123"
      },
      customChains: [
        {
            network: "lisk-sepolia",
            chainId: 4202,
            urls: {
                apiURL: "https://sepolia-blockscout.lisk.com/api",
                browserURL: "https://sepolia-blockscout.lisk.com"
            }
        }
      ]
    },
    sourcify: {
      enabled: false
    },
  };
  ```
  </TabItem>
</Tabs>

Sekarang, Anda dapat memverifikasi kontrak Anda.  
Ambil alamat kontrak yang telah dideploy dan jalankan perintah berikut:

<Tabs>
  <TabItem value="mainnet" label="Lisk" >
  ```bash
  npx hardhat verify --network lisk <deployed address>
  ```
  </TabItem>
  <TabItem value="testnet" label="Lisk Sepolia" default>
  ```bash
  npx hardhat verify --network lisk-sepolia <deployed address>
  ```
  </TabItem>
</Tabs>

Anda akan melihat output yang serupa dengan:

```text
Successfully submitted source code for contract
contracts/NFT.sol:NFT at 0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D
for verification on the block explorer. Waiting for verification result...

Successfully verified contract NFT on the block explorer.
https://sepolia-blockscout.lisk.com/address/0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D#code
```

:::info

Anda tidak dapat memverifikasi ulang kontrak yang identik dengan yang sudah diverifikasi.  
Jika Anda mencoba melakukannya, seperti memverifikasi kontrak di atas, Anda akan mendapatkan pesan yang serupa dengan:

```text
The contract 0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D has already been verified on Etherscan.
https://sepolia-blockscout.lisk.com/address/0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D#code
```

:::

Lihat kontrak Anda di BlockScout dengan mengikuti [link ke kontrak yang telah diluncurkan](https://sepolia-blockscout.lisk.com/address/0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D?tab=contract) yang ditampilkan dalam pesan output langkah sebelumnya.  
Penjelajah Blockchain akan mengonfirmasi bahwa kontrak tersebut telah diverifikasi dan memungkinkan Anda untuk [berinteraksi](#berinteraksi-dengan-smart-contract) dengannya.

## Berinteraksi dengan Kontrak Pintar

Setelah [kontrak diverifikasi](#verifying-the-smart-contract), Anda dapat menggunakan tab `Read Contract` dan `Write Contract` untuk berinteraksi dengan kontrak yang telah diluncurkan melalui [BlockScout](https://sepolia-blockscout.lisk.com/address/0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D?tab=contract).  
Jangan lupa untuk memperbarui alamat kontrak di URL BlockScout.  
Anda juga perlu menghubungkan dompet Anda terlebih dahulu dengan mengklik tombol `Connect Wallet`.
