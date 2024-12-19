---
title: "Mendeploy Token ERC-20 Baru di Lisk"
description: "Panduan untuk Mendeploy Token ERC-20 Baru di Lisk"
keywords:
  [
    "Lisk",
    "Token development",
    "Deploy token",
    "ERC",
    "EIP",
    "ERC-20",
    "Fungible token",
  ]
---

# Cara Mendeploy Token ERC-20 Baru di Lisk

Panduan ini menjelaskan cara mendeploy token ERC-20 baru ke Lisk. Jika Anda ingin menjembatani (_bridge_) token yang sudah ada dari Ethereum, silakan merujuk ke panduan [Menjembatani Token L1 ke Lisk](../add-token-to-lisk).

:::note
Dalam panduan ini, kita akan menggunakan Remix IDE untuk pengembangan _smart contract_, tetapi Anda bebas memilih [framework pengembangan smart contract](/category/building-on-lisk/deploying-smart-contract) lainnya untuk mengimplementasikan kontrak token Anda.
:::

## 1. Buka Remix

Akses [Remix](https://remix.ethereum.org) di browser Anda.

## 2. Buat File Baru

Di dalam folder `contracts`, klik tombol 📄 ("Create new file") untuk membuat file Solidity kosong yang baru.
Anda dapat memberi nama file ini sesuai keinginan, misalnya `MyToken.sol`.

## 3. Salin Kontrak Contoh

Salin kontrak contoh berikut ke dalam file baru Anda:

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

## 4. Kompilasi Kontrak

Pastikan bahwa versi compiler di Remix IDE sesuai dengan versi compiler yang disebutkan di _smart contract_: `pragma solidity ^0.8.28;`.

Tekan tombol hijau play di bagian atas untuk mengompilasi kontrak.

## 5. Deploy Kontrak

Buka tab `Deploy & run transactions` (ikon ini terlihat seperti logo Ethereum dengan panah mengarah ke kanan). Pastikan bahwa _environment_ Anda diatur ke "Injected Provider", _wallet_ Anda terhubung ke jaringan Lisk atau Lisk Sepolia, dan Remix memiliki akses ke _wallet_ Anda.
Kemudian, pilih kontrak `MyToken` dari dropdown deployment dan deploy dengan parameter pilihan Anda, misalnya:

- Nama: MyToken
- Simbol: MYT
- JumlahAwal: 1000000000000000000000

Klik tombol oranye `transact` untuk mendepoy kontrak.
Akhirnya, konfirmasi deployment kontrak di _wallet_ Anda yang terhubung.

Periksa pesan log Remix; pesan tersebut akan mencantumkan alamat kontrak.
_Paste_ alamat ini di BlockScout untuk melihat kontrak di _explorer_ blockchain Lisk:  
https://sepolia-blockscout.lisk.com/address/0x6e8fF2E042c1637a2Da9563763c62362a3bbD712

Jika Anda memilih untuk mendepoy di Lisk Mainnet, _paste_-kan alamat tersebut di https://blockscout.lisk.com

## 6. Verifikasi Kontrak

Jika Anda ingin berinteraksi dengan kontrak Anda di penjelajah blockchain, Anda, atau orang lain, harus memverifikasinya terlebih dahulu.
Kontrak di atas sudah diverifikasi, sehingga Anda seharusnya dapat melihat versi Anda di penjelajah blockchain.
Selebihnya dari panduan ini, kami akan menjelaskan cara memverifikasi kontrak Anda dengan Remix di Lisk Sepolia Testnet.

Anda dapat menerapkan langkah yang sama untuk memverifikasi kontrak di Lisk Mainnet, jika jaringan itu yang Anda gunakan pada proses diatas, cukup gunakan https://blockscout.lisk.com untuk menggantikan https://sepolia-blockscout.lisk.com pada langkah 2 dibawah ini.

1. Di Remix, klik kanan pada kontrak yang ingin Anda verifikasi dan pilih `Flatten`.  
   Ini akan membuat file baru bernama `MyToken_flattened.sol`.
2. Sekarang, buka [kontrak yang baru saja Anda deploy](https://sepolia-blockscout.lisk.com/address/0x6e8fF2E042c1637a2Da9563763c62362a3bbD712) di https://sepolia-blockscout.lisk.com.
3. Buka tab kontrak dan klik tombol biru `Verify and Publish`.
   - (Opsional) Atur lisensi untuk kontrak Anda.
   - Pilih `Solidity (Single file)` sebagai metode verifikasi.
   - Pilih versi compiler yang sesuai untuk kontrak Anda.
   - Nonaktifkan _code optimization_.
   - Salin _source code_ yang telah diflatkan dari Remix dan tempelkan di bidang `Enter the Solidity Contract Code`.
4. Periksa bahwa semua informasi sudah benar, lalu klik tombol `Verify and Publish` untuk memverifikasi kontrak Anda.

Setelah diverifikasi, tab kode akan menyertakan ikon ✅, dan _source code_ akan dapat dilihat.
