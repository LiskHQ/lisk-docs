---
title: 'Deploy Token ERC-721 Baru di Lisk'
description: 'Panduan Cara Deploy Token ERC-721 Baru di Lisk.'
keywords:
  [
    'Lisk',
    'Pengembangan Token',
    'Deploy token',
    'ERC',
    'EIP',
    'ERC-721',
    'NFT',
  ]
---

# Cara Deploy Token ERC-721 Baru di Lisk

:::note
Panduan ini menggunakan Remix IDE untuk pengembangan smart contract, tetapi Anda bebas memilih [framework pengembangan smart contract](/category/building-on-lisk/deploying-smart-contract) lain sesuai preferensi Anda untuk mengimplementasikan contract token Anda.
:::

## 1. Buka Remix

Akses [Remix](https://remix.ethereum.org) di browser Anda.

## 2. Buat File Baru

Di dalam folder `contracts`, klik tombol 📄 ("Buat file baru") untuk membuat file Solidity kosong baru.
Anda dapat memberikan nama file sesuai keinginan, misalnya, `MyNFT.sol`.

## 3. Salin Contoh Contract

Salin contoh contract berikut ke dalam file baru Anda:

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

## 4. Kompilasi Contract

Pastikan bahwa versi compiler di Remix IDE sesuai dengan versi compiler yang disebutkan di smart contract: `pragma solidity ^0.8.28;`.

Tekan tombol play berwarna hijau di bagian atas untuk mengompilasi contract.

## 5. Deploy Contract

Buka tab `Deploy & run transactions` (ikon ini terlihat seperti logo Ethereum dengan panah mengarah ke kanan). Pastikan bahwa environment Anda diatur ke "Injected Provider", wallet Anda terhubung ke jaringan Lisk atau Lisk Sepolia, dan Remix memiliki akses ke wallet Anda.
Kemudian, pilih contract `MyNFT` dari dropdown deployment dan klik tombol `Deploy` berwarna oranye untuk deploy contract, lalu konfirmasikan proses deployment contract di wallet Anda yang terhubung.

Periksa pesan log Remix; pesan tersebut akan mencantumkan alamat contract.
Tempel alamat ini di BlockScout untuk melihat contract di explorer blockchain Lisk:  
https://sepolia-blockscout.lisk.com/address/0x73e7a94dD5760d862F6FD9f8ea5D4245Bb143446

Jika Anda memilih untuk deploy di Lisk Mainnet, tempelkan alamat tersebut di https://blockscout.lisk.com

## 6. Verifikasi Contract

Jika Anda ingin berinteraksi dengan contract Anda di block explorer, Anda, atau orang lain, harus memverifikasinya terlebih dahulu.
Contract di atas sudah diverifikasi, sehingga Anda seharusnya dapat melihat versi Anda di block explorer.
Selebihnya dari panduan ini, kami akan menjelaskan cara memverifikasi contract Anda dengan Remix di Lisk Sepolia Testnet.

Anda dapat menerapkan langkah yang sama untuk memverifikasi contract di Lisk Mainnet, jika kamu deploy di jaringan itu di langkah sebelumnya, cukup gunakan https://blockscout.lisk.com dari pada https://sepolia-blockscout.lisk.com pada langkah 2 dibawah ini.

- Di Remix, klik kanan pada contract yang ingin Anda verifikasi dan pilih `Flatten`.  
   Ini akan membuat file baru bernama `MyNFT_flattened.sol`.
- Sekarang, buka [contract yang baru saja Anda deploy](https://sepolia-blockscout.lisk.com/address/0x73e7a94dD5760d862F6FD9f8ea5D4245Bb143446) di https://sepolia-blockscout.lisk.com.
- Buka tab contract dan klik tombol `Verify and Publish` berwarna biru.
  - (Opsional) Atur lisensi untuk contract Anda.
  - Pilih `Solidity (Single file)` sebagai metode verifikasi.
  - Pilih versi compiler yang sesuai untuk contract Anda.
  - Nonaktifkan code optimization.
  - Salin source code yang telah diflatkan dari Remix dan tempelkan di bidang `Enter the Solidity Contract Code`.
- Periksa bahwa semua informasi sudah benar, lalu klik tombol `Verify and Publish` untuk memverifikasi contract Anda.

Setelah diverifikasi, tab kode akan menyertakan ikon ✅, dan source code akan dapat dilihat.
