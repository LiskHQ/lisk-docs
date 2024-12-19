---
title: "Mendeploy Token ERC-1155 Baru di Lisk"
description: "Panduan tentang Cara Mendeploy Token ERC-1155 Baru di Lisk"
keywords:
  [
    "Lisk",
    "Token development",
    "Deploy token",
    "ERC",
    "EIP",
    "ERC-1155",
    "Hybrid token",
    "Multi token",
  ]
---

# Cara Mendeploy Token ERC-721 Baru di Lisk

:::note
Panduan ini menggunakan Remix IDE untuk pengembangan _smart contract_, tetapi Anda bebas memilih [framework pengembangan smart contract](/category/building-on-lisk/deploying-smart-contract) lain sesuai preferensi Anda untuk mengimplementasikan kontrak token Anda.
:::

## 1. Buka Remix

Akses [Remix](https://remix.ethereum.org) di browser Anda.

## 2. Buat File Baru

Di dalam folder `contracts`, klik tombol 📄 ("Buat file baru") untuk membuat file Solidity kosong baru.
Anda dapat memberikan nama file sesuai keinginan, misalnya, `MyItems.sol`.

## 3. Salin Contoh Kontrak

Salin contoh kontrak berikut ke dalam file baru Anda:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MyItems is ERC1155 {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant THORS_HAMMER = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, GOLD, 10**18, "");
        _mint(msg.sender, SILVER, 10**27, "");
        _mint(msg.sender, THORS_HAMMER, 1, "");
        _mint(msg.sender, SWORD, 10**9, "");
        _mint(msg.sender, SHIELD, 10**9, "");
    }
}
```

:::note
Pada contoh diatas, _Gold_, _Silver_, _Sword_, dan _Shield_ adalah token yang dapat dipertukarkan (fungible tokens), sedangkan _Thor’s Hammer_ adalah token yang tidak dapat dipertukarkan (non-fungible token) karena kami hanya mencetak satu unit.
:::

Sebuah URI yang menunjuk ke metadata JSON dari item/token yang berbeda harus ditentukan dalam konstruktor, lihat [API kontrak ERC-1155](https://docs.openzeppelin.com/contracts/3.x/api/token/erc1155#ERC1155).

URI tersebut dapat menyertakan string `{id}`, yang harus diganti oleh klien dengan ID token sebenarnya dalam format heksadesimal huruf kecil (tanpa awalan `0x`) dan disertakan nol di depan hingga mencapai 64 karakter heksadesimal.  
URI **HARUS** menunjuk ke file JSON yang sesuai dengan [Skema JSON Metadata URI ERC-1155](https://eips.ethereum.org/EIPS/eip-1155).

Untuk token ID 2 dan URI `https://game.example/api/item/{id}.json`, klien akan mengganti `{id}` dengan `0000000000000000000000000000000000000000000000000000000000000002` untuk mengambil JSON di `https://game.example/api/item/0000000000000000000000000000000000000000000000000000000000000002.json`.

Dokumen JSON untuk token ID 2 mungkin akan terlihat seperti ini:

```json
{
  "name": "Thor's hammer",
  "description": "Mjölnir, the legendary hammer of the Norse god of thunder.",
  "image": "https://game.example/item-id-8u5h2m.png",
  "strength": 20
}
```

Untuk informasi lebih lanjut tentang Skema JSON Metadata, silakan lihat [Skema JSON Metadata URI ERC-1155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema).

## 4. Kompilasi Kontrak

Pastikan bahwa versi compiler di Remix IDE sesuai dengan versi compiler yang disebutkan di _smart contract_: `pragma solidity ^0.8.28;`.

Tekan tombol hijau play di bagian atas untuk mengompilasi kontrak.

## 5. Deploy Kontrak

Buka tab `Deploy & run transactions` (ikon ini terlihat seperti logo Ethereum dengan panah mengarah ke kanan). Pastikan bahwa _environment_ Anda diatur ke "Injected Provider", _wallet_ Anda terhubung ke jaringan Lisk atau Lisk Sepolia, dan Remix memiliki akses ke _wallet_ Anda.
Kemudian, pilih kontrak `MyItems` dari dropdown deployment dan klik tombol oranye `Deploy` untuk mendepoy kontrak.
Akhirnya, konfirmasi deployment kontrak di _wallet_ Anda yang terhubung.

Periksa pesan log Remix; pesan tersebut akan mencantumkan alamat kontrak.
_Paste_ alamat ini di BlockScout untuk melihat kontrak di _explorer_ blockchain Lisk: https://sepolia-blockscout.lisk.com/address/0x8b2f45e810F539647e70fBCd6441B73d332Ef1A0

Jika Anda memilih untuk mendepoy di Lisk Mainnet, _paste_-kan alamat tersebut di https://blockscout.lisk.com

## 6. Verifikasi Kontrak

Jika Anda ingin berinteraksi dengan kontrak Anda di penjelajah blockchain, Anda, atau orang lain, harus memverifikasinya terlebih dahulu.
Kontrak di atas sudah diverifikasi, sehingga Anda seharusnya dapat melihat versi Anda di penjelajah blockchain.
Selebihnya dari panduan ini, kami akan menjelaskan cara memverifikasi kontrak Anda dengan Remix di Lisk Sepolia Testnet.

Anda dapat menerapkan langkah yang sama untuk memverifikasi kontrak di Lisk Mainnet, jika jaringan itu yang Anda gunakan pada proses diatas, cukup gunakan https://blockscout.lisk.com untuk menggantikan https://sepolia-blockscout.lisk.com pada langkah 2 dibawah ini.

1. Di Remix, klik kanan pada kontrak yang ingin Anda verifikasi dan pilih `Flatten`.  
   Ini akan membuat file baru bernama `MyItems_flattened.sol`.
2. Sekarang, buka [kontrak yang baru saja Anda deploy](https://sepolia-blockscout.lisk.com/address/0x8b2f45e810F539647e70fBCd6441B73d332Ef1A0) di https://sepolia-blockscout.lisk.com.
3. Buka tab kontrak dan klik tombol biru `Verify and Publish`.
   - (Opsional) Atur lisensi untuk kontrak Anda.
   - Pilih `Solidity (Single file)` sebagai metode verifikasi.
   - Pilih versi compiler yang sesuai untuk kontrak Anda.
   - Nonaktifkan _code optimization_.
   - Salin _source code_ yang telah diflatkan dari Remix dan tempelkan di bidang `Enter the Solidity Contract Code`.
4. Periksa bahwa semua informasi sudah benar, lalu klik tombol `Verify and Publish` untuk memverifikasi kontrak Anda.

Setelah diverifikasi, tab kode akan menyertakan ikon ✅, dan _source code_ akan dapat dilihat.
