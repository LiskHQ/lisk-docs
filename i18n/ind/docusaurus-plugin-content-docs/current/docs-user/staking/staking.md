---
title: Gambaran Umum
sidebar_position: 1
slug: /user/staking/overview
description: 'Cara untuk staking token LSK untuk menerima hadiah staking.'
keywords:
  [
    'Lisk',
    'staking Lisk',
    'staking LSK',
    'hadiah staking',
    'hadiah Lisk',
    'dapatkan LSK',
    'dapatkan Lisk',
  ]
---

# Staking Token LSK

Staking LSK diperlukan untuk berpartisipasi dalam [Lisk DAO](https://www.tally.xyz/gov/lisk), memungkinkan keterlibatan aktif dalam pengambilan keputusan proyek. Sistem staking kami memberikan hadiah kepada staker LSK atas partisipasi mereka dengan [hadiah staking](#hadiah-staking) berdasarkan durasi komitmen mereka.

## Panduan Staking

- [Cara staking, klaim, dan buka staking](stake-unstake.mdx)
- [Cara menghentikan posisi penguncian](pause-position.mdx)
- [Cara menambah staking](../staking/increase-stake.mdx)
- [Cara memperpanjang durasi stake](extend-duration.mdx)
- [Cara membuka staking lebih awal](early-unlock.mdx)

## Posisi Penguncian

Setiap kali Anda melakukan [Staking](stake-unstake.mdx#cara-staking-token-lsk-anda) sejumlah LSK untuk durasi penguncian tertentu, posisi **penguncian** baru akan dibuat.

:::tip
**Durasi penguncian minimum** untuk staking adalah **dua minggu**.

**Durasi penguncian maksimum** untuk staking adalah **dua tahun**.
:::

Posisi penguncian diwakili dengan **NFT** menggunakan standar ERC-721, mirip dengan posisi likuiditas Uniswap v3.
Ini meningkatkan komposabilitas ke dalam DeFi dan penggunaan potensial di masa depan.

## Hadiah Staking

Hadiah staking memberikan insentif bagi pengguna untuk berpartisipasi dalam governance, menjadikan pengambilan keputusan lebih terdesentralisasi dan didorong oleh komunitas.  
Secara singkat, pengguna mendapatkan [kekuatan suara](docs-user/governance/overview.mdx#kekuatan-suara) dan hadiah untuk staking token selama periode waktu tertentu.

Lisk menerapkan **peningkatan bobot berdasarkan waktu** pada hadiah:
Semakin jauh akhir durasi penguncian di masa depan, semakin banyak hadiah yang Anda dapatkan.
Ini juga berarti bahwa hadiah akan berkurang setiap hari.
Dengan cara ini, kami memberi penghargaan kepada pemegang token yang berkomitmen jangka panjang pada proyek Lisk sehingga kami menarik mereka sebagai pendukung jangka panjang Lisk sambil mengurangi spekulasi jangka pendek dan volatilitas.

- Pengguna dapat [mengklaim](stake-unstake.mdx#cara-mengklaim-hadiah-staking) hadiah mereka kapan saja.   
- Pengguna dapat memodifikasi posisi penguncian mereka (menambah jumlah, memperpanjang durasi penguncian) kapan saja.
- Pengguna memiliki opsi untuk **menghentikan** hitungan mundur durasi penguncian mereka.
Ini berarti, durasi penguncian yang tersisa tetap sama sampai pengguna memutuskan untuk melanjutkannya.
Perhatikan bahwa ini menghasilkan **hadiah staking yang lebih tinggi**, karena bobot tetap sama, dibandingkan dengan bobot yang menurun setiap hari saat hitungan mundur aktif.

### Distribusi Hadiah Staking
Sebanyak 24 juta token LSK akan digunakan selama 3 tahun untuk program hadiah staking LSK (8 juta LSK per tahun).
Jumlah ini diberikan kepada [contract Hadiah](https://blockscout.lisk.com/address/0xD35ca9577a9DADa7624a35EC10C2F55031f0Ab1f).

**Perhitungan Hadiah Harian:** Hadiah diambil dari saldo contract Hadiah dan dihitung setiap hari, berdasarkan jumlah yang dikunci dan durasi penguncian yang tersisa.
Secara konkret, bobot untuk jumlah yang dikunci diberikan oleh:

```
bobot = jumlahDikunci * (durasiPenguncianTersisaDalamHari + 150)
```

Jumlah total hadiah staking harian, 8.000.000 / 365 LSK, kemudian dibagikan kepada semua pengguna secara proporsional dengan bobot mereka.

Artinya, hadiah harian untuk posisi penguncian dihitung sebagai:

```
hadiahHarian = bobot/totalBobot * TotalHadiahHarian
```

Nilai saat ini dari `totalBobot` dapat dicek di [contract Hadiah](https://blockscout.lisk.com/address/0xD35ca9577a9DADa7624a35EC10C2F55031f0Ab1f?tab=read_proxy).
`TotalHadiahHarian` dapat dihitung dengan membagi hadiah tahunan yang tersedia dengan 365:  `8.000.000 / 365 = 21917`

### Contoh: Perhitungan Hadiah untuk 1 vs 2 Tahun
Misalnya, jika seseorang melakukan staking 100 LSK selama *1 tahun*, ini akan menghasilkan hadiah berikut pada hari itu, dengan asumsi `totalBobot` adalah `12462098705` untuk contoh ini:

```
bobot = 100 * (365 + 150) = 51500
```

```
hadiahHarian = 51500 / 12462098705 * 21917 = 0.0905726657 LSK 
```

Jika 100 LSK yang di-staking habis dalam *dua tahun*, ini akan menghasilkan hadiah berikut pada hari itu:

```
bobot  = 100 * (730 + 150) = 88000
```

```
hadiahHarian = 88000 / 12462098705 * 21917 = 0.15476494334 LSK 
```

Setelah akhir periode 3 tahun ini, kami mengharapkan bahwa perkembangan dalam Ekosistem Optimism Superchain (sequencer terdesentralisasi bersama) akan membawa kami ke mekanisme staking baru.

## Buka Staking

Setelah periode penguncian dari sebuah [posisi penguncian](#posisi-penguncian) berakhir, Anda dapat membuka kembali token yang di-stake dengan cara [membuka staking](stake-unstake.mdx#cara-membuka-staking-token-lsk-anda).

:::tip
Jika Anda perlu membuka token Anda lebih awal dari periode penguncian yang ditentukan, Anda dapat membuka staking token Anda sebelum periode penguncian berakhir dengan menggunakan opsi [early unlock](#membuka-staking-lebih-awal).

Membuka kunci lebih cepat akan melibatkan penalti yang harus dibayar.
:::

Setelah membuka staking, token LSK dapat digunakan seperti sebelumnya untuk tujuan lainnya.

### Membuka Staking Lebih Awal
Membuka staking lebih awal memungkinkan Anda untuk membuka staking token LSK sebelum periode penguncian mereka berakhir.
Ini melibatkan pembayaran penalti dan menunggu periode pembukaan kunci darurat selama 3 hari.
Penalti dihitung berdasarkan formula:

```
Penalti = 0.5 * Jumlah yang di-staking * (Hari Tersisa / 730)
```

Harap dicatat bahwa nilai maksimum untuk hari yang tersisa adalah 730.

Misalnya, jika seorang pengguna ingin melakukan membuka staking lebih awal dengan 100 LSK dan durasi penguncian yang tersisa adalah 150 hari, maka penalti dihitung sebagai berikut:

```
Penalti = 0.5 x 100 x (147 / 730) = 10.068 LSK
```

Perhatikan bahwa kami mengalikan dengan 147 dan bukan 150, karena pengguna masih harus menunggu selama 3 hari, jadi durasi penguncian secara keseluruhan berkurang sebanyak 147.
