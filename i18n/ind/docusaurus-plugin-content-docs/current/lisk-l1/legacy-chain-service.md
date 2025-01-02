---
title: Layanan Rantai Legacy
slug: /lisk-l1/legacy-chain-service
description: Cara mengakses data dari rantai legacy Lisk L1.
keywords:
  [
    Lisk L1,
    Lisk legacy,
    Lisk legacy chain,
    legacy chain service,
    Lisk legacy account,
    riwayat rantai,
    riwayat akun
  ]
difficulty: pemula
---
:::warning
Dokumentasi ini merujuk pada rantai Lisk sebelumnya di L1, yang berhenti saat Lisk bermigrasi ke L2 pada Mei 2024.
Jika Anda ingin mengembangkan di rantai Lisk L2 saat ini, silakan merujuk ke dokumentasi pengembang di bawah kategori [Building on Lisk](../category/building-on-lisk).
:::

# Layanan Rantai Legacy

Untuk mengakses data dari rantai Legacy Lisk L1, silakan gunakan layanan rantai legacy yang tersedia di https://legacy.lisk.com.


## Penggunaan
Cara menggunakan layanan rantai legacy:

- Dapatkan **blok berdasarkan tinggi** `https://legacy.lisk.com/blocks/<BLOCK_HEIGHT>.json`
- Dapatkan **transaksi berdasarkan id** `https://legacy.lisk.com/transactions/<TRANSACTION_ID>.json`
- Dapatkan **akun berdasarkan alamat** `https://legacy.lisk.com/accounts/<LEGACY_ACCOUNT_ADDRESS>.json`
- Dapatkan **riwayat berdasarkan alamat** `https://legacy.lisk.com/histories/<LEGACY_ACCOUNT_ADDRESS>.csv`

  dimana `<LEGACY_ACCOUNT_ADDRESS>` adalah alamat Lisk L1 dengan format: `lsk**************************************` atau `*******************L` (untuk akun yang belum diinisialisasi).
 
  Jika sebuah akun legacy Lisk L1 (`*******************L` alamat) telah diinisialisasi, seluruh riwayat termasuk riwayat dari alamat legacy `*******************L` akan digabungkan di bawah alamat `lsk` yang sesuai. Riwayat alamat `*******************L` tidak akan tersedia secara terpisah.


:::info[INFO: Kapan akun Lisk L1 diinisialisasi?]
Akun legacy Lisk L1 dianggap diinisialisasi, jika akun tersebut memiliki transaksi keluar di Lisk Core v2, atau telah melakukan [transaksi reclaim legacy](https://github.com/LiskArchive/lisk-core/blob/development/src/application/modules/legacy/commands/reclaim.ts) di Lisk Core v3/v4, sebelum migrasi Lisk L2, yang terjadi pada akhir Mei 2024, di tinggi blok 24.823.618.
:::
