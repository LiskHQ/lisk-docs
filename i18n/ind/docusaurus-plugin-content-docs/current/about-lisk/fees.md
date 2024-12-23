---
title: Biaya
sidebar_position: 1
slug: /biaya
description: Dokumentasi tentang biaya jaringan di Lisk. Halaman ini membahas detail sistem biaya dua komponen yang melibatkan biaya eksekusi L2 dan biaya data L1, serta memberikan wawasan tentang variasi biaya dan strategi penghematan biaya.
keywords:
  [
    biaya Lisk,
    biaya transaksi,
    biaya jaringan,
    biaya jaringan Lisk,
    biaya eksekusi L2,
    biaya keamanan L1,
    biaya data L1,
    biaya transaksi,
    biaya gas,
    perhitungan biaya,
    penghematan biaya,
    waktu transaksi,
    variasi biaya,
    platform Lisk,
  ]
---

# Biaya

Biaya di Lisk Mainnet, sebagian besar, jauh lebih rendah dibandingkan dengan jaringan Ethereum L1.
Biaya transaksi yang rendah dapat diberikan karena Lisk adalah jaringan [Layer 2 optimistic rollup](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups).

## Pelacak Gas

Untuk melacak biaya gas saat ini dan yang lalu di Lisk, periksa pelacak gas untuk jaringan masing-masing di Blockscout:

- Lisk Mainnet: https://blockscout.lisk.com/gas-tracker
- Lisk Sepolia Testnet: https://sepolia-blockscout.lisk.com/gas-tracker

## Bagaimana biaya dihitung di Lisk?

Setiap transaksi Lisk Mainnet memiliki dua biaya: **Biaya eksekusi L2** dan **Biaya data L1**.
Secara umum, biaya L2 adalah biaya untuk mengeksekusi transaksi Anda di L2 dan biaya L1 adalah perkiraan biaya untuk mempublikasikan transaksi Anda di L1 (dalam batch rollup).

```text
transaction_fee = l2_execution_fee + l1_data_fee
```

:::note
Perhitungan biaya Lisk didasarkan pada sistem biaya OP Mainnet, menggunakan pembaruan **Fjord** terbaru.
Periksa [halaman Biaya](https://docs.optimism.io/stack/transactions/fees#fjord) dalam dokumentasi Optimism, untuk mempelajari lebih lanjut tentang cara kerja sistem biaya secara rinci.
:::

### Biaya Eksekusi L2
[Biaya Eksekusi L2](https://docs.optimism.io/stack/transactions/fees#execution-gas-fee) sama dengan jumlah gas yang digunakan oleh transaksi dikalikan dengan harga gas yang terlampir pada transaksi tersebut.

```
l2_execution_fee = transaction_gas_price * l2_gas_used
```

Karena Lisk Mainnet setara dengan EVM, **gas yang digunakan** oleh transaksi di Lisk Mainnet **persis sama** dengan gas yang digunakan oleh transaksi yang sama di Ethereum.
Jika suatu transaksi membutuhkan 100.000 unit gas di Ethereum, transaksi yang sama akan membutuhkan 100.000 unit gas di Lisk Mainnet.
**Satu-satunya perbedaan adalah harga gas di Lisk Mainnet jauh lebih rendah** dibandingkan harga gas di Ethereum, sehingga Anda akan membayar jauh lebih sedikit dalam ETH.
Ini juga berarti bahwa total biaya Biaya Eksekusi L2 untuk suatu transaksi dapat diperkirakan menggunakan alat yang sama yang Anda gunakan untuk memperkirakan biaya transaksi di Ethereum.

#### Perhitungan Biaya Eksekusi L2
Harga gas transaksi adalah jumlah dari [Base Fee](https://ethereum.org/en/developers/docs/gas/#base-fee) dan biaya tambahan opsional [Priority Fee](https://ethereum.org/en/developers/docs/gas/#priority-fee).

```
transaction_gas_price = l2_base_fee + l2_priority_fee
```

Seperti Ethereum, Lisk Mainnet menggunakan mekanisme [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) untuk menetapkan Base Fee untuk transaksi (meskipun dengan [nilai parameter yang berbeda](#eip-1559-parameters) dibandingkan dengan Ethereum).

Anda dapat membaca lebih lanjut tentang cara kerja biaya gas Ethereum di [Ethereum.org](https://ethereum.org/en/developers/docs/gas/).

### Biaya Data L1
[Biaya Data L1](https://docs.optimism.io/stack/transactions/fees#l1-data-fee) adalah satu-satunya bagian dari biaya transaksi Lisk Mainnet yang berbeda dari biaya transaksi Ethereum.
Biaya ini muncul karena data transaksi untuk semua transaksi Lisk Mainnet dipublikasikan ke Ethereum.
Ini menjamin bahwa data transaksi tersedia untuk node untuk diunduh dan dieksekusi.

Biaya Data L1 dikenakan secara otomatis untuk setiap transaksi yang dimasukkan ke dalam blok Lisk Mainnet.
Biaya ini dipotong langsung dari alamat yang mengirimkan transaksi.

Biaya Data L1 dipengaruhi secara signifikan oleh base fee Ethereum yang diteruskan secara terus-menerus dan tanpa kepercayaan dari Ethereum ke Lisk Mainnet.

Jumlah sebenarnya dari biaya ini bergantung pada nilai input berikut:

1. **Transaksi yang ditandatangani**, yang diserialisasi sesuai dengan pengkodean RLP transaksi Ethereum standar.
2. **Base fee Ethereum saat ini** dan/atau blob base fee (dikirim secara trustless dari Ethereum).
3. Dua **parameter skalar** yang secara independen mengukur base fee dan blob base fee.

#### Perhitungan Biaya Data L1
Biaya data L1 dihitung berdasarkan rumus berikut:

```
l1_data_fee = estimatedSize * weighted_gas_price
```

Di sini `estimatedSize` adalah perkiraan ukuran yang akan ditempati transaksi saat diposting di blob L1 Ethereum.
Ini dihitung berdasarkan ukuran transaksi yang diserialisasi, menggunakan model regresi linier berdasarkan data historis OP Mainnet, dengan asumsi bahwa itu dikompresi dengan kompresi Brotli.
Untuk rincian lebih lanjut, lihat [dokumentasi OP](https://docs.optimism.io/stack/transactions/fees#fjord) atau [kode kontrak pintar](https://github.com/ethereum-optimism/optimism/blob/e00f23ad0208f2e35aef5435d8a3d2e369144419/packages/contracts-bedrock/src/L2/GasPriceOracle.sol#L203).

Selanjutnya, dua skalar diterapkan pada parameter base fee dan blob base fee untuk menghitung pengali harga gas berbobot.

```
weighted_gas_price = 16*base_fee_scalar*base_fee + blob_base_fee_scalar*blob_base_fee
```

Nilai saat ini untuk skalar adalah:

  - `base_fee_scalar` = 0.020698
  - `blob_base_fee_scalar` = 1.364961

Parameter ini dapat disesuaikan tergantung pada kondisi jaringan, untuk mengurangi lonjakan biaya transaksi.

:::note

Saat ini **tidak** memungkinkan untuk membatasi maksimum Biaya Data L1 yang bersedia dibayar oleh sebuah transaksi.

Untuk informasi lebih lanjut tentang biaya transaksi, periksa [Dokumentasi Pengembang Optimism > Biaya Transaksi](https://docs.optimism.io/stack/transactions/fees)

:::

## Parameter EIP-1559

Parameter [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) yang digunakan oleh Lisk Mainnet berbeda dari yang digunakan oleh Ethereum sebagai berikut:

| Parameter                             | Nilai Lisk Mainnet | Nilai Ethereum (sebagai referensi) |
| ------------------------------------- | -----------------: | ----------------------------------: |
| Batas gas blok                        |   30.000.000 gas   |                 30.000.000 gas     |
| Target gas blok                       |    1.500.000 gas   |                 15.000.000 gas     |
| Pengali elastisitas EIP-1559          |               20    |                              2     |
| Penyebut EIP-1559                     |            1.000   |                              8     |
| Peningkatan maksimum base fee (per blok) |             1,9%  |                          12,5%    |
| Penurunan maksimum base fee (per blok) |             0,1%  |                          12,5%    |
| Waktu blok dalam detik                |                2   |                             12     |

## Bagaimana fluktuasi harga gas di Ethereum (L1) memengaruhi biaya transaksi di Lisk (L2)?

Meskipun Biaya Data L1 akan selalu lebih murah dibandingkan dengan memposting transaksi langsung ke mainnet Ethereum (karena pengkodean yang efisien dalam batching transaksi), nilainya akan bervariasi tergantung pada jumlah transaksi di L1.
Jika waktu transaksi Anda fleksibel, Anda dapat menghemat biaya dengan mengirimkan transaksi selama periode ketika harga gas di L1 lebih rendah dari biasanya, misalnya, pada akhir pekan.

Perubahan setelah transaksi diproses di sequencer tidak memengaruhi biaya yang dibayar pengguna.

Untuk transaksi L2, proses normalnya adalah:

1. Dompet memperkirakan biaya transaksi dan menunjukkannya kepada pengguna.
2. Pengguna kemudian mengirimkan transaksi.
3. Sequencer memproses transaksi dalam dua fase.
    - Pertama, ia memproses transaksi.
    - Kemudian, ia mengurangi biaya gas, berdasarkan harga gas L1 dan L2 pada saat itu.
4. Setelah itu, transaksi ditulis ke L1.

Secara prinsip, antara langkah 1 dan 3, harga gas mungkin berubah.
Namun, harga gas tidak dapat meningkat lebih dari 12,5%, oleh karena itu perbedaan antara harga yang ditunjukkan kepada pengguna pada langkah 1 dan yang sebenarnya dibatasi oleh 12,5%.
Setelah langkah 3, finalitas transaksi menjadi tanggung jawab Lisk.
Jika harga gas L1 melonjak, Lisk membayar biaya baru tersebut.

Kesimpulannya, pengguna akan membayar paling banyak 12,5% lebih dari yang diperkirakan.
Lihat [Dokumentasi Optimism > Biaya Transaksi](https://docs.optimism.io/stack/transactions/fees#mechanism) untuk informasi lebih lanjut tentang biaya transaksi.
