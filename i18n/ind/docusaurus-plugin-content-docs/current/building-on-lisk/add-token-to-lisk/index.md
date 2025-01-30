---
title: Pengenalan
sidebar_position: 1
slug: /building-on-lisk/add-token-to-lisk
description: 'Panduan menambahkan kontrak ERC-20 eksternal yang telah di-deploy di Ethereum ke jaringan Lisk.'
keywords:
  [
    'Kontrak ERC-20',
    'Lisk Testnet',
    'Sepolia',
    'Ethereum',
    'Lisk Mainnet',
    'Lisk',
    'daftar token Optimism Superchain',
  ]
---

# Bridge Token L1 ke Lisk

Halaman ini ditujukan untuk penerbit token yang sudah memiliki kontrak ERC-20 yang di-deploy di Ethereum dan ingin men-submit token mereka untuk bridge antara Ethereum dan Lisk.
Lisk menggunakan Superchain Token List sebagai referensi untuk token-token yang telah di-deploy di Lisk.
Jika Anda ingin membuat token baru di Lisk, silakan merujuk ke halaman [Pengembangan Token](../token-development/overview.md).

## Superchain Token List

[Superchain Token List](https://github.com/ethereum-optimism/ethereum-optimism.github.io) bertujuan membantu pengguna menemukan alamat yang benar untuk setiap token native yang di-bridge.

Pastikan untuk memeriksa daftar ini agar Anda tidak menggunakan representasi token yang salah ketika bridge suatu token native.

<!-- TODO: Tambahkan referensi ke halaman alamat token yang di-bridge setelah halaman tersebut dibuat untuk Lisk.: https://docs.optimism.io/builders/app-developers/bridging/standard-bridge#searching-the-token-list -->

:::warning
Lisk tidak meng-endorse token apa pun yang tercantum dalam repositori [**ethereum-optimism.github.io**](https://github.com/ethereum-optimism/ethereum-optimism.github.io), dan bergantung pada pemeriksaan awal yang telah ditetapkan serta dicantumkan di repositori tersebut.
:::

Developer yang membuat token yang di-bridge mereka sendiri sebaiknya mempertimbangkan untuk [menambahkan token mereka ke dalam list](#menambahkan-token-anda-ke-superchain-token-list).

Token yang ada di Superchain Token List akan otomatis muncul di beberapa tool seperti [Superchain Bridges UI](https://app.optimism.io/bridge).  
Namun, token tidak secara otomatis tercantum di [Lisk Bridge UI](https://bridge.lisk.com/bridge/lisk); pencantuman tersebut tidak dijamin dan tidak bersifat otomatis.  
Peninjauan untuk Lisk Bridge dilakukan secara manual oleh tim Lisk.

## Bridge Standar

Sebelum token yang berasal dari satu chain dapat di-bridge ke chain lainnya, representasi token yang di-bridge harus dibuat di sisi penerima.  
[Bridge Standar](https://docs.optimism.io/builders/app-developers/bridging/standard-bridge) memungkinkan pengguna untuk mengonversi token yang berasal dari satu chain (seperti Ethereum) menjadi representasi token tersebut di chain lain (seperti Lisk).  
Pengguna kemudian dapat mengonversi representasi token yang di-bridge ini kembali ke token native aslinya kapan saja.

:::tip
Mekanisme bridging ini berfungsi secara identik di kedua arah — token yang berasal dari Lisk dapat di-bridge ke Ethereum, sama seperti token yang berasal dari Ethereum dapat di-bridge ke Lisk.
:::

Representasi token yang di-bridge adalah token ERC-20 yang mengimplementasikan interface `IOptimismMintableERC20`[^1].  
Token native dapat memiliki lebih dari satu representasi yang di-bridge dalam waktu yang bersamaan.  
Pengguna harus selalu menentukan token yang ingin mereka gunakan saat menggunakan bridge; lihat [Superchain Token List](#superchain-token-list). Representasi token yang berbeda untuk token native yang sama dianggap sebagai token yang sepenuhnya independen.

Bridge Standar adalah smart contract sederhana dengan fungsionalitas untuk memindahkan token ERC-20 antara Lisk dan Ethereum.

Pada protokol terdiri dari dua kontrak penting:

- Kontrak bridge yang di-deploy di **Ethereum**, disebut [L1StandardBridge](https://etherscan.io/address/0x2658723Bf70c7667De6B25F99fcce13A16D25d08).
- Kontrak bridge yang di-deploy di **Lisk**, disebut [L2StandardBridge](https://blockscout.lisk.com/address/0x4200000000000000000000000000000000000010).

Kedua kontrak ini berinteraksi satu sama lain melalui sistem `CrossDomainMessenger` untuk mengirim pesan antara Ethereum dan Lisk.

[^1]:
    Interface `IOptimismMintableERC20` adalah kumpulan dari [interface ERC-20 standar](https://eips.ethereum.org/EIPS/eip-20) dan mencakup fungsi-fungsi yang memungkinkan bridge untuk memverifikasi deposit/withdrawals serta mint/burn token sesuai kebutuhan.  
    Semua versi token yang di-bridge harus mengimplementasikan interface ini agar dapat di-bridge menggunakan sistem [Bridge Standar](#bridge-standar).  
    Token native tidak perlu mengimplementasikan interface ini.

## Menambahkan Token Anda ke Superchain Token List

Lisk menggunakan [Superchain Token List](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/optimism.tokenlist.json) sebagai referensi untuk token-token yang telah di-deploy di Lisk.

Untuk menambahkan token Anda ke dalam list, lakukan langkah-langkah berikut.

### Langkah 1: Deploy Token Anda di Lisk

Pilih framework bridging yang Anda inginkan, dan gunakan untuk deploy ERC-20 token Anda di Lisk.  
Kami merekomendasikan Anda menggunakan framework yang disediakan oleh kontrak [bridge standar](#bridge-standar) milik Lisk dan deploy token Anda menggunakan [OptimismMintableERC20Factory](contracts#jaringan-lisk-l2).  
Deploy token Anda di Lisk dengan cara ini memberikan jaminan tambahan yang akan memperlancar proses persetujuan.  
Jika Anda memilih framework bridging lain, interfacenya harus kompatibel dengan bridge standar. Jika tidak, kami mungkin akan kesulitan untuk mendukungnya.

Untuk instruksi langkah demi langkah tentang cara deploy token ERC-20 di Lisk, silakan lihat panduan berikut:

- [Deploy Token ERC-20 Standar](./standard-token.md)
- [Deploy Token ERC-20 Sendiri](./custom-token.mdx)

### Langkah 2: Ajukan Detail Token Anda

Ikuti instruksi di [repositori GitHub](https://github.com/ethereum-optimism/ethereum-optimism.github.io) dan ajukan Pull Request (PR) yang berisi detail yang diperlukan untuk token Anda.
Khususnya, ikuti petunjuk khusus Lisk yang dijelaskan secara rinci di bagian [Menentukan chain](https://github.com/ethereum-optimism/ethereum-optimism.github.io?tab=readme-ov-file#specifying-chains).

**Penting:** Anda harus menentukan bagian `lisk-sepolia` dan/atau `lisk` di file `data.json` token Anda.

[PR ini](https://github.com/ethereum-optimism/ethereum-optimism.github.io/pull/899) menunjukkan perubahan yang diperlukan untuk menambahkan token LSK ke Superchain Token Registry.  
Perubahan yang perlu Anda ajukan akan menjadi lebih sederhana jika token Anda sudah ditambahkan ke Superchain Token Registry.  
Sebagai contoh, [PR ini](https://github.com/ethereum-optimism/ethereum-optimism.github.io/commit/27ab9b2d3388f7feba3a152e0a0748c73d732a68) menunjukkan perubahan yang diperlukan untuk cbETH, yang sudah ada di Superchain Token Registry dan bergantung pada bridge standar Base.

### Langkah 3: Tunggu Persetujuan Akhir
Peninjauan secara rutin dilakukan oleh tim Lisk, dan Anda akan menerima balasan dalam waktu 24-72 jam (tergantung apakah PR diajukan pada hari kerja, akhir pekan, atau hari libur).

## Langkah 4 : Menambahkan Token ke Gelato Bridge
Untuk menambahkan token Anda ke [Gelato Bridge](https://bridge.lisk.com/), hubungi tim Lisk di [Discord Lisk](https://lisk.chat) dengan detail token tersebut:

- Masuk ke channel `#lisk-dev`.
- Tag seorang moderator, minta mereka untuk menambahkan token Anda ke Gelato Bridge, dan bagikan tautan PR Anda dari [langkah 2: detail token](#langkah-2-ajukan-detail-token-anda).
- The Lisk team will then coordinate with Gelato to get the token added to the Gelato Bridge.