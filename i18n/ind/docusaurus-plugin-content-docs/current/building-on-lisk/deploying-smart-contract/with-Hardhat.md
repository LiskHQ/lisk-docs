---
title: ... menggunakan Hardhat
slug: /building-on-lisk/deploying-smart-contract/with-Hardhat
description: "Panduan untuk deploy smart contract di jaringan test Lisk menggunakan Hardhat. Termasuk instruksi untuk mengatur environment, mengompilasi, dan deploy smart contract."
keywords:
  [
    "Hardhat",
    "smart contract",
    "ERC-721",
    "Lisk",
    "jaringan test Lisk",
    "Lisk testnet",
    "Node.js",
    "Solidity",
    "deployment smart contract",
    "deploy smart contract",
    "deploy smart contract",
    "membangun di lisk",
    "menulis ke smart contract",
    "pengembangan smart contract",
  ]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy Smart Contract dengan Hardhat

Di halaman ini, Anda akan mempelajari cara membuat, menggunakan, dan memverifikasi contract pintar dengan Hardhat ke testnet **Lisk Sepolia**.

## Prasyarat

### Node v18+

Panduan ini memerlukan Node versi 18+ yang sudah terinstal.

- Download [Node v18+](https://nodejs.org/en/download/)

Jika Anda menggunakan `nvm` untuk mengelola versi Node Anda, cukup jalankan perintah: `nvm install 18`.

### Dana Wallet

**Deploy contract** ke blockchain memerlukan **biaya gas**.  
Oleh karena itu, Anda perlu mendanai wallet Anda dengan ETH untuk menutupi biaya gas tersebut.

Dalam panduan ini, Anda akan deploy contract ke Lisk Sepolia Testnet.

Anda dapat men-deposit token yang diperlukan menggunakan [Lisk Bridge](https://sepolia-bridge.lisk.com/bridge/lisk-sepolia-testnet).

Jika wallet Anda tidak memiliki `SepoliaETH` yang cukup, gunakan salah satu faucet yang tersedia untuk **Ethereum Sepolia** Testnet, seperti [https://sepoliafaucet.com](https://sepoliafaucet.com/) untuk menerima ETH Testnet secara gratis.  
Kemudian, gunakan Lisk Bridge yang disebutkan sebelumnya untuk mengirim token dari **Ethereum Sepolia Testnet** ke **Lisk Sepolia Testnet**.

:::note
Anda dapat deploy contract di Lisk Mainnet dengan menggunakan proses yang sama.  
Untuk deploy ke mainnet, pastikan wallet Anda memiliki cukup ETH.

Teks berikut mencakup perintah untuk Lisk dan Lisk Sepolia demi kemudahan Anda.  
Untuk informasi lebih lanjut, lihat [jaringan Lisk yang tersedia](/network-info) dan [cara menghubungkan wallet ke jaringan tersebut](/user/connecting-to-a-wallet).

:::

## Membuat Proyek

Sebelum Anda dapat mulai deploy smart contract ke Lisk, Anda perlu menyiapkan environment pengembangan dengan membuat proyek Node.js.

Untuk membuat proyek Node.js baru, pertama-tama buat folder utama untuk proyek tersebut dan masuk ke dalamnya:

```bash
mkdir my-project && cd my-project
```

Di dalam folder baru tersebut, jalankan:

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

Pilih `Create a TypeScript project`, lalu tekan Enter untuk mengonfirmasi direktori proyek.

Pilih `y` untuk menambahkan file `.gitignore` dan memuat proyek contoh.  
Secara opsional, Anda dapat memutuskan untuk membagikan laporan crash dan data penggunaan dengan Hardhat.

```
✔ What do you want to do? · Create a TypeScript project
✔ Hardhat project root: · /Users/lisk/git/my-project
✔ Do you want to add a .gitignore? (Y/n) · y
✔ Help us improve Hardhat with anonymous crash reports & basic usage data? (Y/n) · y
✔ Do you want to install this sample project's dependencies with npm (@nomicfoundation/hardhat-toolbox)? (Y/n) · y
```

Proses penyiapan proyek akan memakan waktu beberapa saat hingga selesai.

## Mengonfigurasi Hardhat dengan Lisk

Untuk deploy smart contract ke jaringan Lisk, Anda perlu mengonfigurasi proyek Hardhat Anda dan menambahkan jaringan Lisk.

Contoh ini menggunakan [dotenv](https://www.npmjs.com/package/dotenv) untuk memuat variabel environment `WALLET_KEY` dari file `.env` ke `process.env.WALLET_KEY`.  
Anda sebaiknya menggunakan metode serupa untuk menghindari menuliskan private key secara langsung di dalam source code Anda.

```bash
npm install --save-dev dotenv
```

Setelah Anda menginstal `dotenv`, buat file `.env` dengan konten berikut:

```
WALLET_KEY=<YOUR_PRIVATE_KEY>
```

Ganti `<YOUR_PRIVATE_KEY>` dengan private key wallet Anda.

:::caution

`WALLET_KEY` adalah private key dari wallet yang akan digunakan saat deploy contract.  
Ikuti instruksi dari wallet Anda untuk mendapatkan private key.  
Misalnya, untuk **MetaMask**, silakan ikuti [instruksi ini](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/).  
**Sangat penting untuk memastikan bahwa Anda TIDAK meng-upload private key ini ke repositori publik.**

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

## Membuat Contract

Untuk kemudahan dan keamanan, kita akan menggunakan interface `ERC721` yang disediakan oleh [OpenZeppelin Contracts library](https://docs.openzeppelin.com/contracts/5.x/) untuk membuat smart contract NFT.  
Dengan OpenZeppelin, kita tidak perlu menulis keseluruhan interface ERC-721. Sebaliknya, kita dapat mengimpor contract dari library dan menggunakan fungsinya.

Untuk menambahkan libarry OpenZeppelin Contracts ke proyek Anda, jalankan perintah berikut:

```bash
npm install --save @openzeppelin/contracts
```

Di proyek Anda, hapus contract `contracts/Lock.sol` yang dihasilkan saat proyek dibuat.  
(Anda juga dapat menghapus file test `test/Lock.ts`, tetapi Anda sebaiknya segera menambahkan test Anda sendiri!).

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

Untuk mengompilasi contract menggunakan Hardhat, cukup jalankan perintah berikut:

```bash
npx hardhat compile
```

Setelah kompilasi berhasil, Anda akan melihat folder baru bernama `artifacts/`, yang berisi [artefak kompilasi](https://hardhat.org/hardhat-runner/docs/advanced/artifacts).

## Tes Contract

Untuk mengTes contract NFT kita, kita akan menggunakan:

* **Hardhat Network** – Jaringan Ethereum lokal untuk pengembangan.
  Ini sudah termasuk di dalam Hardhat dan digunakan sebagai jaringan default.
* **Ethers.js** – Untuk berinteraksi dengan contract.
* **Mocha** – Sebagai test runner dan alat assertions.

---

### Menyiapkan File Tes

Buat direktori baru bernama `test` di dalam folder utama proyek kita.
Lalu buat file baru di dalam folder tersebut dengan nama `NFT.js`, dan tambahkan kode berikut:

```js title="test/NFT.js"
const { expect } = require("chai");

describe("NFT", function () {
  let nftToken;

  beforeEach(async () => {
    // Deploy contract
    const NFT = await ethers.getContractFactory("NFT");
    nftToken = await NFT.deploy();
  });

  it("Should allow to mint a new NFT", async function () {
    const [owner] = await ethers.getSigners();
    // Sebelum mencetak NFT, saldo akun untuk NFT ini harus 0.
    expect(await nftToken.balanceOf(owner.address)).to.equal(0);
    // Mencetak NFT
    await nftToken.mint(owner.address);
    // Setelah mencetak NFT, saldo akun untuk NFT ini harus 1 untuk akun yang mencetak token tersebut.
    expect(await nftToken.balanceOf(owner.address)).to.equal(1);
  });
});
```

Pertama, kita mengimpor fungsi `expect` dari pustaka [Chai](https://www.chaijs.com/), agar bisa digunakan dalam pengTesan unit contract kita.

Jika kamu sudah mengatur proyek dengan **Hardhat Toolbox** seperti dijelaskan pada langkah [Membuat Proyek](#creating-a-project), maka `ethers` sudah tersedia secara default di proyekmu.
Jika belum, kamu bisa menginstal plugin `ethers` untuk Hardhat seperti dijelaskan pada halaman referensi [hardhat-ethers](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers).

Plugin Hardhat-Ethers memiliki API yang sama dengan [ethers.js](https://docs.ethers.org/v6/), namun dilengkapi fitur tambahan khusus Hardhat ([fitur spesifik](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers#helpers)) yang akan kita gunakan dalam pengTesan contract ini.

Selanjutnya, kita melakukan deploy contract NFT di dalam `beforeEach()` hook, untuk memastikan contract selalu ter-deploy sebelum setiap pengTesan dijalankan. Struktur ini memudahkan kita untuk menambahkan kasus Tes tambahan nanti.

---

### Menjalankan Tes

Sekarang, jalankan perintah berikut di terminal:

```bash
npx hardhat test
```
Kamu seharusnya melihat output berikut:

```sh
% npx hardhat test

  NFT
    ✔ Should allow to mint a new NFT (92ms)


  1 passing (1s)
```

Ini menunjukkan bahwa pengTesan telah berhasil dijalankan.

Untuk informasi lebih lanjut tentang cara mengTes smart contract menggunakan Hardhat, lihat [dokumentasi Hardhat](https://hardhat.org/tutorial/testing-contracts).

## Deploy Smart Contract

Setelah contract Anda berhasil dikompilasi, Anda dapat deploy contract ke jaringan test Lisk Sepolia.

Untuk deploy contract ke jaringan test Lisk Sepolia, Anda perlu memodifikasi file `scripts/deploy.ts` di proyek Anda:

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

Anda juga memerlukan ETH Testnet di wallet Anda.  
Lihat bagian [Prasyarat](#prasyarat) jika Anda belum melakukannya. Jika tidak, upaya deployment akan gagal.

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

Contract akan di-deploy di Lisk Sepolia Testnet.  
Anda dapat melihat status deployment dan contract dengan menggunakan block explorer dan mencari alamat yang dikembalikan oleh skrip deployment Anda.

Jika Anda deploy contract baru atau yang dimodifikasi, Anda perlu memverifikasinya terlebih dahulu.

## Memverifikasi Smart Contract

Jika Anda ingin berinteraksi dengan contract Anda di block explorer, Anda atau orang lain perlu memverifikasinya terlebih dahulu.  
Contract di atas sudah diverifikasi, sehingga Anda seharusnya dapat melihat versi Anda di block explorer.  
Selebihnya di panduan ini, kami akan menjelaskan langkah-langkah memverifikasi contract Anda di Lisk Sepolia Testnet.

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

Sekarang, Anda dapat memverifikasi contract Anda.  
Ambil alamat contract yang telah dideploy dan jalankan perintah berikut:

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

Anda tidak dapat memverifikasi ulang contract yang identik dengan yang sudah diverifikasi.  
Jika Anda mencoba melakukannya, seperti memverifikasi contract di atas, Anda akan mendapatkan pesan yang serupa dengan:

```text
The contract 0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D has already been verified on Etherscan.
https://sepolia-blockscout.lisk.com/address/0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D#code
```

:::

Lihat contract Anda di BlockScout dengan mengikuti [link ke contract yang telah di-deploy](https://sepolia-blockscout.lisk.com/address/0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D?tab=contract) yang ditampilkan dalam pesan output langkah sebelumnya.  
Block Explorer akan mengonfirmasi bahwa contract tersebut telah diverifikasi dan memungkinkan Anda untuk [berinteraksi](#berinteraksi-dengan-smart-contract) dengannya.

## Berinteraksi dengan Smart Contract

Setelah [contract diverifikasi](#memverifikasi-smart-contract), Anda dapat menggunakan tab `Read Contract` dan `Write Contract` untuk berinteraksi dengan contract yang telah di-deploy melalui [BlockScout](https://sepolia-blockscout.lisk.com/address/0xC10710ac55C98f9AACdc9cD0A506411FBe0af71D?tab=contract).  
Jangan lupa untuk memperbarui alamat contract di URL BlockScout.  
Anda juga perlu menghubungkan wallet Anda terlebih dahulu dengan mengklik tombol `Connect Wallet`.
