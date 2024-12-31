---
title: Pengenalan
sidebar_position: 1
slug: /building-on-lisk/add-token-to-lisk
description: "Panduan menambahkan kontrak ERC-20 eksternal yang telah diluncurkan di Ethereum ke jaringan Lisk."
keywords:
  [
    "Kontrak ERC-20",
    "Testnet Lisk",
    "Sepolia",
    "Ethereum",
    "Mainnet Lisk",
    "Lisk",
    "daftar token Optimism Superchain",
  ]
---

# Memindahkan (_Bridging_) Token L1 ke Lisk

Halaman ini ditujukan untuk penerbit token yang sudah memiliki kontrak ERC-20 yang diluncurkan di Ethereum dan ingin men-_submit_ token mereka untuk dipindahkan (_bridging_) antara Ethereum dan Lisk.
Lisk menggunakan _Superchain Token List_ sebagai referensi untuk token-token yang telah diluncurkan di Lisk.

## _Superchain Token List_

[Superchain Token List](https://github.com/ethereum-optimism/ethereum-optimism.github.io) bertujuan membantu pengguna menemukan alamat yang benar untuk token yang dipindahkan melalui _bridge_ (_bridged token_) pada setiap token native tertentu.

Pastikan untuk memeriksa daftar ini agar Anda tidak menggunakan representasi token yang salah ketika memindahkan token native melalui _bridge_.

<!-- TODO: Tambahkan referensi ke halaman alamat token yang dipindahkan melalui bridge setelah halaman tersebut dibuat untuk Lisk.: https://docs.optimism.io/builders/app-developers/bridging/standard-bridge#searching-the-token-list -->

:::warning
Lisk tidak meng-_endorse_ token apa pun yang tercantum dalam repositori [**ethereum-optimism.github.io**](https://github.com/ethereum-optimism/ethereum-optimism.github.io), dan bergantung pada pemeriksaan awal yang telah ditetapkan serta dicantumkan di repositori tersebut.
:::

Developer yang membuat token mereka sendiri yang dipindahkan melalui _bridge_ sebaiknya mempertimbangkan untuk [menambahkan token mereka ke dalam list](#menambahkan-token-anda-ke-superchain-token-list).

Token yang ada di _Superchain Token List_ akan otomatis muncul di beberapa _tool_ seperti [Superchain Bridges UI](https://app.optimism.io/bridge).  
Namun, token tidak secara otomatis tercantum di [Lisk Bridge UI](https://bridge.lisk.com/bridge/lisk); pencantuman tersebut tidak dijamin dan tidak bersifat otomatis.  
Peninjauan untuk Lisk Bridge dilakukan secara manual oleh tim Lisk.

## Bridge Standar

Sebelum token yang berasal dari satu chain dapat dipindahkan ke chain lainnya, representasi token yang dipindahkan melalui _bridge_ harus dibuat di sisi penerima.  
[Bridge Standar](https://docs.optimism.io/builders/app-developers/bridging/standard-bridge) memungkinkan pengguna untuk mengonversi token yang berasal dari satu chain (seperti Ethereum) menjadi representasi token tersebut di chain lain (seperti Lisk).  
Pengguna kemudian dapat mengonversi representasi token yang dipindahkan ini kembali ke token native aslinya kapan saja.

:::tip
Mekanisme _bridging_ ini berfungsi secara identik di kedua arah — token yang berasal dari Lisk dapat dipindahkan ke Ethereum, sama seperti token yang berasal dari Ethereum dapat dipindahkan ke Lisk.
:::

Representasi token yang dipindahkan melalui bridge adalah token ERC-20 yang mengimplementasikan _interface_ `IOptimismMintableERC20`[^1].  
Token native dapat memiliki lebih dari satu representasi yang dipindahkan melalui bridge dalam waktu yang bersamaan.  
Pengguna harus selalu menentukan token yang ingin mereka gunakan saat menggunakan bridge; lihat [Superchain Token List](#superchain-token-list). Representasi token yang berbeda untuk token native yang sama dianggap sebagai token yang sepenuhnya independen.

Bridge Standar adalah kontrak pintar sederhana dengan fungsionalitas untuk memindahkan token ERC-20 antara Lisk dan Ethereum.

Pada protokol terdiri dari dua kontrak penting:

- Kontrak _bridge_ yang diluncurkan di **Ethereum**, disebut [L1StandardBridge](https://etherscan.io/address/0x2658723Bf70c7667De6B25F99fcce13A16D25d08).
- Kontrak _bridge_ yang diluncurkan di **Lisk**, disebut [L2StandardBridge](https://blockscout.lisk.com/address/0x4200000000000000000000000000000000000010).

Kedua kontrak ini berinteraksi satu sama lain melalui sistem `CrossDomainMessenger` untuk mengirim pesan antara Ethereum dan Lisk.

[^1]:
    _Interface_ `IOptimismMintableERC20` adalah kumpulan (_superset_) dari [interface ERC-20 standar](https://eips.ethereum.org/EIPS/eip-20) dan mencakup fungsi-fungsi yang memungkinkan _bridge_ untuk memverifikasi _deposit/withdrawals_ serta mencetak (_mint_) atau membakar (_burn_) token sesuai kebutuhan.  
    Semua versi token yang dipindahkan melalui _bridge_ harus mengimplementasikan _interface_ ini agar dapat dipindahkan menggunakan sistem [Bridge Standar](#bridge-standar).  
    Token native tidak perlu mengimplementasikan interface ini.

## Menambahkan Token Anda ke Superchain Token List

Lisk menggunakan [Superchain Token List](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/optimism.tokenlist.json) sebagai referensi untuk token-token yang telah diluncurkan di Lisk.

Untuk menambahkan token Anda ke dalam list, lakukan langkah-langkah berikut.

### Langkah 1: Luncurkan Token Anda di Lisk

Pilih framework _bridging_ yang Anda inginkan, dan gunakan untuk meluncurkan ERC-20 token Anda di Lisk.  
Kami merekomendasikan Anda menggunakan framework yang disediakan oleh kontrak [bridge standar](#bridge-standar) milik Lisk dan meluncurkan token Anda menggunakan [OptimismMintableERC20Factory](https://docs.lisk.com/contracts#jaringan-lisk-l2).  
Meluncurkan token Anda di Lisk dengan cara ini memberikan jaminan tambahan yang akan memperlancar proses persetujuan.  
Jika Anda memilih framework _bridging_ lain, interfacenya harus kompatibel dengan _bridge standar_. Jika tidak, kami mungkin akan kesulitan untuk mendukungnya.

Untuk instruksi langkah demi langkah tentang cara meluncurkan token ERC-20 di Lisk, silakan lihat panduan berikut:

- [Meluncurkan Token ERC-20 Standar](./standard-token.md)
- [Meluncurkan Token ERC-20 Sendiri](./custom-token.mdx)

### Langkah 2: Ajukan Detail Token Anda

Ikuti instruksi di [repositori GitHub](https://github.com/ethereum-optimism/ethereum-optimism.github.io) dan ajukan _Pull Request_ (PR) yang berisi detail yang diperlukan untuk token Anda.

**Penting:** Anda harus menentukan bagian `lisk-sepolia` dan/atau `lisk` di file `data.json` token Anda.

[PR ini](https://github.com/ethereum-optimism/ethereum-optimism.github.io/pull/899) menunjukkan perubahan yang diperlukan untuk menambahkan token LSK ke _Superchain Token Registry_.  
Perubahan yang perlu Anda ajukan akan menjadi lebih sederhana jika token Anda sudah ditambahkan ke _Superchain Token Registry_.  
Sebagai contoh, [PR ini](https://github.com/ethereum-optimism/ethereum-optimism.github.io/commit/27ab9b2d3388f7feba3a152e0a0748c73d732a68) menunjukkan perubahan yang diperlukan untuk cbETH, yang sudah ada di _Superchain Token Registry_ dan bergantung pada _bridge standar_ Base.

### Langkah 3: Tunggu Persetujuan Akhir

Peninjauan secara rutin dilakukan oleh tim Lisk, dan Anda akan menerima balasan dalam waktu 24-72 jam (tergantung apakah PR diajukan pada hari kerja, akhir pekan, atau hari libur).
