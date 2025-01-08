---
title: "Meluncurkan Token ERC-721 Baru di Lisk"
description: "Panduan Cara Meluncurkan Token ERC-721 Baru di Lisk."
keywords:
  [
    "Lisk",
    "Pengembangan Token",
    "Meluncurkan token",
    "ERC",
    "EIP",
    "ERC-721",
    "NFT",
  ]
---

# Cara Meluncurkan Token ERC-721 Baru di Lisk

:::note
Panduan ini menggunakan Remix IDE untuk pengembangan kontrak pintar, tetapi Anda bebas memilih [framework pengembangan kontrak pintar](/category/building-on-lisk/deploying-smart-contract) lain sesuai preferensi Anda untuk mengimplementasikan kontrak token Anda.
:::

## 1. Buka Remix

Akses [Remix](https://remix.ethereum.org) di browser Anda.

## 2. Buat File Baru

Di dalam folder `contracts`, klik tombol 📄 ("Buat file baru") untuk membuat file Solidity kosong baru.
Anda dapat memberikan nama file sesuai keinginan, misalnya, `MyNFT.sol`.

## 3. Salin Contoh Kontrak

Salin contoh kontrak berikut ke dalam file baru Anda:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    uint256 public currentTokenId;

    constructor() ERC721("My NFT", "MNFT") {}

    function mint(address recipient) public returns (uint256) {
        uint256 newItemId = ++currentTokenId;
        _safeMint(recipient, newItemId);
        return newItemId;
    }
}
```

## 4. Kompilasi Kontrak

Pastikan bahwa versi compiler di Remix IDE sesuai dengan versi compiler yang disebutkan di kontrak pintar: `pragma solidity ^0.8.28;`.

Tekan tombol play berwarna hijau di bagian atas untuk mengompilasi kontrak.

## 5. Meluncurkan Kontrak

Buka tab `Deploy & run transactions` (ikon ini terlihat seperti logo Ethereum dengan panah mengarah ke kanan). Pastikan bahwa environment Anda diatur ke "Injected Provider", dompet Anda terhubung ke jaringan Lisk atau Lisk Sepolia, dan Remix memiliki akses ke dompet Anda.
Kemudian, pilih kontrak `MyNFT` dari dropdown deployment dan klik tombol `Deploy` berwarna oranye untuk meluncurkan kontrak, lalu konfirmasikan proses peluncuran kontrak di dompet Anda yang terhubung.

Periksa pesan log Remix; pesan tersebut akan mencantumkan alamat kontrak.
Tempel alamat ini di BlockScout untuk melihat kontrak di explorer blockchain Lisk:  
https://sepolia-blockscout.lisk.com/address/0x73e7a94dD5760d862F6FD9f8ea5D4245Bb143446

Jika Anda memilih untuk meluncurkan di Lisk Mainnet, tempelkan alamat tersebut di https://blockscout.lisk.com

## 6. Verifikasi Kontrak

Jika Anda ingin berinteraksi dengan kontrak Anda di penjelajah blockchain, Anda, atau orang lain, harus memverifikasinya terlebih dahulu.
Kontrak di atas sudah diverifikasi, sehingga Anda seharusnya dapat melihat versi Anda di penjelajah blockchain.
Selebihnya dari panduan ini, kami akan menjelaskan cara memverifikasi kontrak Anda dengan Remix di Lisk Sepolia Testnet.

Anda dapat menerapkan langkah yang sama untuk memverifikasi kontrak di Lisk Mainnet, jika kamu meluncurkannya di jaringan itu di langkah sebelumnya, cukup gunakan https://blockscout.lisk.com dari pada https://sepolia-blockscout.lisk.com pada langkah 2 dibawah ini.

- Di Remix, klik kanan pada kontrak yang ingin Anda verifikasi dan pilih `Flatten`.  
   Ini akan membuat file baru bernama `MyNFT_flattened.sol`.
- Sekarang, buka [kontrak yang baru saja Anda luncurkan](https://sepolia-blockscout.lisk.com/address/0x73e7a94dD5760d862F6FD9f8ea5D4245Bb143446) di https://sepolia-blockscout.lisk.com.
- Buka tab kontrak dan klik tombol `Verify and Publish` berwarna biru.
  - (Opsional) Atur lisensi untuk kontrak Anda.
  - Pilih `Solidity (Single file)` sebagai metode verifikasi.
  - Pilih versi compiler yang sesuai untuk kontrak Anda.
  - Nonaktifkan code optimization.
  - Salin source code yang telah diflatkan dari Remix dan tempelkan di bidang `Enter the Solidity Contract Code`.
- Periksa bahwa semua informasi sudah benar, lalu klik tombol `Verify and Publish` untuk memverifikasi kontrak Anda.

Setelah diverifikasi, tab kode akan menyertakan ikon ✅, dan source code akan dapat dilihat.
