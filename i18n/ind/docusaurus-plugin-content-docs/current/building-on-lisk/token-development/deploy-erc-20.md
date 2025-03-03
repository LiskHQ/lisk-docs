---
title: 'Deploy Token ERC-20 Baru di Lisk'
description: 'Panduan untuk deploy Token ERC-20 Baru di Lisk'
keywords:
  [
    'Lisk',
    'Pengembangan token',
    'Deploy token',
    'ERC',
    'EIP',
    'ERC-20',
    'Fungible token',
  ]
---

# Cara Deploy Token ERC-20 Baru di Lisk

Panduan ini menjelaskan cara deploy token ERC-20 baru ke Lisk. Jika Anda ingin menjembatani token yang sudah ada dari Ethereum, silakan merujuk ke panduan [Menjembatani Token L1 ke Lisk](../add-token-to-lisk).

:::note
Dalam panduan ini, kita akan menggunakan Remix IDE untuk pengembangan smart contract, tetapi Anda bebas memilih [framework pengembangan smart contract](/category/building-on-lisk/deploying-smart-contract) lainnya untuk mengimplementasikan contract token Anda.
:::

## 1. Buka Remix

Akses [Remix](https://remix.ethereum.org) di browser Anda.

## 2. Buat File Baru

Di dalam folder `contracts`, klik tombol 📄 ("Create new file") untuk membuat file Solidity kosong yang baru.
Anda dapat memberi nama file ini sesuai keinginan, misalnya `MyToken.sol`.

## 3. Salin Contract Contoh

Salin contract contoh berikut ke dalam file baru Anda:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(string memory _name, string memory _symbol, uint256 initialSupply) ERC20(_name, _symbol) {
        _mint(msg.sender, initialSupply);
    }

}
```

## 4. Kompilasi Contract

Pastikan bahwa versi compiler di Remix IDE sesuai dengan versi compiler yang disebutkan di smart contract: `pragma solidity ^0.8.28;`.

Tekan tombol play berwarna hijau di bagian atas untuk mengompilasi contract.

## 5. Deploy Contract

Buka tab `Deploy & run transactions` (ikon ini terlihat seperti logo Ethereum dengan panah mengarah ke kanan). Pastikan bahwa environment Anda diatur ke "Injected Provider", wallet Anda terhubung ke jaringan Lisk atau Lisk Sepolia, dan Remix memiliki akses ke wallet Anda.
Kemudian, pilih contract `MyToken` dari dropdown deployment dan deploy dengan parameter pilihan Anda, misalnya:

- Nama: MyToken
- Simbol: MYT
- JumlahAwal: 1000000000000000000000

Klik tombol `transact` berwarna oranye untuk deploy contract.
Akhirnya, konfirmasi deployment contract di wallet Anda yang terhubung.

Periksa pesan log Remix; pesan tersebut akan mencantumkan alamat contract.
Tempel alamat ini di BlockScout untuk melihat contract di explorer blockchain Lisk:  
https://sepolia-blockscout.lisk.com/address/0x6e8fF2E042c1637a2Da9563763c62362a3bbD712

Jika Anda memilih untuk deploy di Lisk Mainnet, tempelkan alamat tersebut di https://blockscout.lisk.com

## 6. Verifikasi Contract

Jika Anda ingin berinteraksi dengan contract Anda di block explorer, Anda, atau orang lain, harus memverifikasinya terlebih dahulu.
Contract di atas sudah diverifikasi, sehingga Anda seharusnya dapat melihat versi Anda di block explorer.
Selebihnya dari panduan ini, kami akan menjelaskan cara memverifikasi contract Anda dengan Remix di Lisk Sepolia Testnet.

Anda dapat menerapkan langkah yang sama untuk memverifikasi contract di Lisk Mainnet, jika jaringan itu yang Anda gunakan pada proses diatas, cukup gunakan https://blockscout.lisk.com untuk menggantikan https://sepolia-blockscout.lisk.com pada langkah 2 dibawah ini.

1. Di Remix, klik kanan pada contract yang ingin Anda verifikasi dan pilih `Flatten`.  
   Ini akan membuat file baru bernama `MyToken_flattened.sol`.
2. Sekarang, buka [contract yang baru saja Anda deploy](https://sepolia-blockscout.lisk.com/address/0x6e8fF2E042c1637a2Da9563763c62362a3bbD712) di https://sepolia-blockscout.lisk.com.
3. Buka tab contract dan klik tombol `Verify and Publish` berwarna biru.
   - (Opsional) Atur lisensi untuk contract Anda.
   - Pilih `Solidity (Single file)` sebagai metode verifikasi.
   - Pilih versi compiler yang sesuai untuk contract Anda.
   - Nonaktifkan code optimization.
   - Salin source code yang telah diflatkan dari Remix dan tempelkan di kolom `Enter the Solidity Contract Code`.
4. Periksa bahwa semua informasi sudah benar, lalu klik tombol `Verify and Publish` untuk memverifikasi contract Anda.

Setelah diverifikasi, tab kode akan menyertakan ikon ✅, dan source code akan dapat dilihat.
