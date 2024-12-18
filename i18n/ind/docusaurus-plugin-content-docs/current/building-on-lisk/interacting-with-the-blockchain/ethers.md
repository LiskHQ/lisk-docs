---
title: ...menggunakan ethers.js
slug: /building-on-lisk/interacting-with-the-blockchain/ethers
description: Dokumentasi untuk menggunakan ethers.js, sebuah library JavaScript untuk interaksi dengan blockchain yang kompatibel dengan EVM. Halaman ini mencakup instalasi, pengaturan, koneksi ke jaringan Lisk, membaca dan menulis data blockchain, serta berinteraksi dengan smart contract.
keywords:
  [
    ethers.js,
    JavaScript library,
    Lisk network,
    Lisk mainnet,
    Lisk testnet,
    smart contracts,
    EVM-compatible,
    blockchain,
    JsonRpcProvider,
    Signer,
    ABI,
    interacting with smart contract,
  ]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Berinteraksi dengan blockchain menggunakan ethers.js

[ethers.js](https://docs.ethers.org/) adalah sebuah library JavaScript yang memungkinkan developer untuk berinteraksi dengan jaringan blockchain yang kompatibel dengan EVM.

Anda dapat menggunakan ethers.js untuk berinteraksi dengan _smart contract_ yang telah dideploy di jaringan Lisk.

## Instalasi

Untuk menginstal ethers.js, jalankan perintah berikut:

```bash
npm install --save ethers
```

## _Setup_

Sebelum Anda dapat mulai menggunakan ethers.js, Anda perlu mengimpornya ke dalam proyek Anda.

Tambahkan baris kode berikut di bagian atas file Anda untuk mengimpor ethers.js:

```javascript
const ethers = require("ethers");
```

## Hubungkan ke Lisk

Anda dapat terhubung ke Lisk dengan menginisialisasi objek `JsonRpcProvider` baru dari ethers.js menggunakan URL RPC dari jaringan Lisk:

<Tabs>
  <TabItem value="mainnet" label="Lisk" >
    ```javascript
    const ethers = require('ethers');

    const url = 'https://rpc.api.lisk.com';
    const provider = new ethers.JsonRpcProvider(url);
    ```

  </TabItem>
  <TabItem value="testnet" label="Lisk Sepolia" default>
    ```javascript
    const ethers = require('ethers');

    const url = 'https://rpc.sepolia-api.lisk.com';
    const provider = new ethers.JsonRpcProvider(url);
    ```

  </TabItem>
</Tabs>

:::note
**Provider** (dalam ethers.js) adalah sebuah kelas yang menyediakan abstraksi untuk koneksi ke Jaringan Ethereum. Provider memberikan akses _read-only_ ke Blockchain dan statusnya.
:::

## Membaca data dari blockchain

Setelah Anda membuat _provider_, Anda dapat menggunakannya untuk membaca data dari jaringan Lisk.

Sebagai contoh, Anda dapat menggunakan metode `getBlockNumber` untuk mendapatkan block terbaru:

```javascript
async function getLatestBlock() {
    const latestBlock = await provider.getBlockNumber();
    console.log("The latest block's number is:", latestBlock);
}

getLatestBlock();
```

<details>
<summary>Contoh kode lengkap:</summary>
```javascript
const ethers = require('ethers');

// Untuk jaringan Lisk Sepolia
const url = 'https://rpc.sepolia-api.lisk.com';

// Untuk jaringan Lisk
// const url = 'https://rpc.api.lisk.com';

const provider = new ethers.JsonRpcProvider(url);

async function getLatestBlock() {
    const latestBlock = await provider.getBlockNumber();
    console.log("The latest block's number is:", latestBlock);
}

getLatestBlock();

````
</details>

## Menulis data ke blockchain

Untuk menulis data ke jaringan Lisk, Anda perlu membuat sebuah `Signer`.

:::note
**Signer** adalah sebuah kelas yang (biasanya) secara langsung atau tidak langsung memiliki akses ke private key, yang dapat menandatangani pesan dan transaksi untuk mengizinkan jaringan membayar ether dari akun Anda untuk melakukan operasi.
:::

Anda dapat membuat sebuah `Signer` dengan menginisialisasi objek `Wallet` baru dari ethers.js, serta memberikan private key dan `Provider` kepada objek tersebut.

```javascript
const privateKey = 'PRIVATE_KEY';
const signer = new ethers.Wallet(privateKey, provider);
const receiver = '0x5e1A92F84cA1CE280B3Cb29d79C3368f45b41EBB';
// Kirim 0.01 ether ke alamat yang diberikan.
async function sendTx(to) {
    const tx =  await signer.sendTransaction({
        to: to,
        value: ethers.parseEther("0.01")
    });

    console.log(tx);
}

//sendTx(receiver);
````

:::info
`PRIVATE_KEY` adalah private key dari akun yang akan digunakan saat membuat objek `signer`.
:::

Saldo akun penerima akan bertambah sebanyak `0.01` ETH setelah eksekusi transaksi berhasil.

<details>
<summary>Contoh kode lengkap:</summary>
```javascript
const ethers = require('ethers');

// Untuk jaringan Lisk Sepolia
const url = 'https://rpc.sepolia-api.lisk.com';

// Untuk jaringan Lisk
// const url = 'https://rpc.api.lisk.com';

const provider = new ethers.JsonRpcProvider(url);
// Gantilah PRIVATE_KEY dengan private key dari akun Anda.
const privateKey = 'PRIVATE_KEY';
const signer = new ethers.Wallet(privateKey, provider);
const receiver = '0x5e1A92F84cA1CE280B3Cb29d79C3368f45b41EBB';
// Kirim 0.01 ether ke alamat yang diberikan.
async function sendTx(to) {
    const tx =  await signer.sendTransaction({
        to: to,
        value: ethers.parseEther("0.01")
    });

    console.log(tx);
}

sendTx(receiver);

````
</details>

## Berinteraksi dengan smart contract

Anda dapat menggunakan ethers.js untuk berinteraksi dengan _smart contract_ di Lisk dengan menginisialisasi objek `Contract` menggunakan ABI dan alamat dari kontrak yang telah dideploy:

:::tip
ABI dari sebuah kontrak dapat ditemukan di halaman kontrak terkait di [BlockScout](https://sepolia-blockscout.lisk.com/).

Sebagai contoh, Anda dapat menggunakan ABI untuk [Hello contract](https://sepolia-blockscout.lisk.com/address/0xb18eb752813c2fbedfdf2be6e5e842a85a3b8539?tab=contact_code). Cukup _scroll_ ke bagian `Contract ABI` dan salin ABI dari kontrak yang telah dideploy.
:::

```javascript title="Membaca dari kontrak"
// Gantilah nilai `contractAddress` dengan alamat kontrak yang diinginkan.
const contractAddress = "CONTRACT_ADDRESS"
// read-only
const contract = new ethers.Contract(contractAddress, abi, provider);
const abi = [
… // ABI dari kontrak yang telah dideploy.
];

async function getHello() {
    const value = await contract.message("0x3C46A11471f285E36EE8d089473ce98269D1b081");
    console.log(value.toString());
}

getHello();
````

:::info
`CONTRACT_ADDRESS` adalah alamat dari kontrak yang telah dideploy.
:::

:::note
**Contract** (dalam ethers.js) adalah sebuah abstraksi yang mewakili koneksi ke kontrak tertentu di Jaringan Lisk, sehingga aplikasi dapat menggunakannya seperti objek JavaScript biasa.
:::

Untuk membaca dan menulis kontrak, gunakan objek `Signer` untuk menggantikan objek `Provider`:

```javascript title="Menulis ke kontrak"
// read & write
const contract = new ethers.Contract(contractAddress, abi, signer);
```

Setelah Anda membuat objek `Contract`, Anda dapat menggunakannya untuk memanggil metode yang diinginkan pada _smart contract_:

```javascript
async function createHello(message) {
  const tx = await contract.createHello(message);
  return tx.hash;
}

//createHello("Hello Lisk!");
```

:::tip
Untuk gambaran umum tentang fungsi publik yang ada pada kontrak, silakan cek tab [Read Contract](https://sepolia-blockscout.lisk.com/address/0xb18eb752813c2fbedfdf2be6e5e842a85a3b8539?tab=read_contract) dan [Write Contract](https://sepolia-blockscout.lisk.com/address/0xb18eb752813c2fbedfdf2be6e5e842a85a3b8539?tab=write_contract) untuk kontrak spesifik tersebut.
:::

<details>
<summary>Contoh kode lengkap:</summary>
```javascript
const ethers = require('ethers');

// Untuk jaringan Lisk Sepolia
const url = 'https://rpc.sepolia-api.lisk.com';

// Untuk jaringan Lisk
// const url = 'https://rpc.api.lisk.com';

const provider = new ethers.JsonRpcProvider(url);
const privateKey = 'PRIVATE_KEY';
const signer = new ethers.Wallet(privateKey, provider);
const contractAddress = "0xb18eb752813c2fbedfdf2be6e5e842a85a3b8539"
// Read & Write
const contract = new ethers.Contract(contractAddress, abi, signer);
// Read-only
//const contract = new ethers.Contract(contractAddress, abi, provider);
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "NewHello",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "blacklist",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "counter",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_message",
                "type": "string"
            }
        ],
        "name": "createHello",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxLength",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "message",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "minLength",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "_newBlackList",
                "type": "string[]"
            }
        ],
        "name": "setBlacklist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_newMin",
                "type": "uint32"
            },
            {
                "internalType": "uint32",
                "name": "_newMax",
                "type": "uint32"
            }
        ],
        "name": "setMinMaxMessageLength",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

async function createHello(message) {
    const tx = await contract.createHello(message);
    return tx.hash;
}

//createHello("Hello Lisk!");

async function getHello() {
    const value = await contract.message("0x3C46A11471f285E36EE8d089473ce98269D1b081");
    console.log(value.toString());
}

getHello();
```
</details>