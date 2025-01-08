---
title: ...menggunakan Tellor
slug: /building-on-lisk/using-oracle-data/tellor
description: Panduan tentang menggunakan Data Feed Tellor untuk mengakses data dunia nyata seperti harga aset, langsung dari kontrak pintar Anda di blockchain Lisk.
keywords: [
    Oracle
    Oracles,
    Redstone,
    price feeds,
    data feeds,
    smart contract,
    Lisk blockchain,
    Lisk network,
    Lisk testnet,
    Lisk test network,
    app development,
    dapp development,
    build a dapp on Lisk,
    build on Lisk,
  ]
---

# Menggunakan Data Oracle dengan Tellor

Halaman ini akan menjelaskan bagaimana aplikasi Anda dapat mengakses data oracle menggunakan Tellor.

[Tellor](https://tellor.io/) adalah protokol oracle terdesentralisasi yang immutable, di mana pihak-pihak dapat meminta nilai data dari luar blockchain (misalnya ETH/USD, LSK/USD), dan reporters bersaing untuk menambahkan nilai ini ke dalam bank data onchain.
Input ke dalam bank data ini dijamin oleh jaringan reporters yang melakukan staking terhadap token mereka.

Tellor memanfaatkan mekanisme insentif kripto-ekonomi, memberikan hadiah kepada reporters yang memberikan data jujur dan menghukum pelaku buruk melalui penerbitan token Tellor, Tributes (TRB), serta mekanisme sengketa.

Hal ini mendorong jaringan pelaporan data dan validasi data yang terbuka serta permissionless, memastikan bahwa data dapat disediakan oleh siapa saja dan diverifikasi oleh semua orang.

## Instalasi

Langkah pertama yang perlu dilakukan adalah menginstal tools dasar yang diperlukan untuk menggunakan Tellor sebagai oracle Anda.

Untuk menginstal [usingtellor](https://github.com/tellor-io/usingtellor), jalankan salah satu perintah berikut:

- Hardhat: `npm install usingtellor`
- Foundry: `forge install tellor-io/usingtellor`

Setelah diinstal, ini memungkinkan kontrak Anda untuk inherit fungsi dari kontrak 'UsingTellor'.

Bagus! Sekarang tools Anda siap, mari kita lakukan latihan sederhana untuk mengambil harga `eth/usd` dan `lsk/usd` dari Tellor.

## Mengimpor

```solidity
pragma solidity >=0.8.0;

import "usingtellor/contracts/UsingTellor.sol";
/**
     * Network: Lisk Mainnet
     * Address: 0x896419Ed2E0dC848a1f7d2814F4e5Df4b9B9bFcc
*/
contract MyContract is UsingTellor {

  constructor(address payable _tellorOracle) UsingTellor(_tellorOracle) {

  }

  // ...

}
```

Untuk mengimpor kontrak UsingTellor ke dalam file Solidity Anda, masukkan alamat Tellor Oracle yang diinginkan sebagai parameter.  
Untuk Lisk Mainnet, alamat Tellor Oracle adalah: [0x896419Ed2E0dC848a1f7d2814F4e5Df4b9B9bFcc](https://blockscout.lisk.com/address/0x896419Ed2E0dC848a1f7d2814F4e5Df4b9B9bFcc).

## Membaca Data

Dalam contoh di bawah ini, kami menambahkan dua fungsi:

- `getETHSpotPrice()` untuk membaca data harga ETH/USD dari Oracle.
- `getLSKSpotPrice()` untuk membaca data harga LSK/USD dari Oracle.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { UsingTellor } from "usingtellor/contracts/UsingTellor.sol";

contract MyContract is UsingTellor {

    uint256 public ethLastStoredTimestamp;
    uint256 public ethLastStoredPrice;
    uint256 public lskLastStoredTimestamp;
    uint256 public lskLastStoredPrice;
    bytes32 public immutable ethQueryId;
    bytes32 public immutable lskQueryId;
    uint256 public constant DISPUTE_BUFFER = 20 minutes;
    uint256 public constant STALENESS_AGE = 12 hours;

    error StalePrice(uint256 price, uint256 timestamp);
    error NoValueRetrieved(uint256 timestamp);

    /**
     * @dev Konstruktor menetapkan alamat Tellor dan queryId untuk ETH serta LSK.
     * @param _tellorOracle adalah alamat dari Tellor oracle.
     */
    constructor (address payable _tellorOracle) UsingTellor(_tellorOracle) {
        // set the ETH queryId
        bytes memory _ethQueryData = abi.encode("SpotPrice", abi.encode("eth", "usd"));
        ethQueryId = keccak256(_ethQueryData);
        // set the LSK queryId
        bytes memory _lskQueryData = abi.encode("SpotPrice", abi.encode("lsk", "usd"));
        lskQueryId = keccak256(_lskQueryData);
    }

    /**
     * @dev Memungkinkan kontrak pengguna untuk membaca harga ETH dari Tellor
     * dan melakukan beberapa pemeriksaan best-practice pada data yang diambil.
     * @return _value harga spot ETH dari Tellor, dengan 18 angka desimal.
     * @return timestamp stempel waktu dari nilai tersebut.
     */
    function getETHSpotPrice()
        public
        returns (
            uint256 _value,
            uint256 timestamp
        )
    {
        // mengambil harga ETH terbaru yang berusia lebih dari 20 menit.
        // buffer memungkinkan waktu untuk men-dispute nilai yang salah.
        (bytes memory _data, uint256 _timestamp) = _getDataBefore(ethQueryId, block.timestamp - DISPUTE_BUFFER);

        // periksa apakah ada nilai yang berhasil diambil
        if (_timestamp == 0 || _data.length == 0) revert NoValueRetrieved(_timestamp);

        // dekode nilai dari bytes ke uint256
        _value = abi.decode(_data, (uint256));

        // mencegah serangan back-in-time dispute dengan menyimpan nilai dan timestamp terbaru.
        // ini menghentikan penyerang dari mendisput nilai Tellor untuk memanipulasi harga yang digunakan
        // oleh protokol Anda
        if (_timestamp > ethLastStoredTimestamp) {
            // jika nilai baru lebih baru daripada nilai terakhir yang disimpan, perbarui cache
            ethLastStoredTimestamp = _timestamp;
            ethLastStoredPrice = _value;
        } else {
            // jika nilai baru lebih lama daripada nilai terakhir yang disimpan, gunakan nilai yang di-cache
            _value = ethLastStoredPrice;
            _timestamp = ethLastStoredTimestamp;
        }

        // periksa apakah nilai terlalu lama
        if (block.timestamp - _timestamp > STALENESS_AGE) revert StalePrice(_value, _timestamp);

        // kembalikan nilai dan timestamp
        return (_value, _timestamp);
    }

    /**
     * @dev Memungkinkan kontrak pengguna untuk membaca harga LSK dari Tellor dan melakukan beberapa
     * pengecekan best-practice pada data yang diambil.
     * @return _value harga spot LSK dari Tellor, dengan 18 tempat desimal.
     * @return timestamp stempel waktu dari nilai tersebut.
     */
    function getLSKSpotPrice()
        public
        returns (
            uint256 _value,
            uint256 timestamp
        )
    {
        (bytes memory _data, uint256 _timestamp) = _getDataBefore(lskQueryId, block.timestamp - DISPUTE_BUFFER);

        if (_timestamp == 0 || _data.length == 0) revert NoValueRetrieved(_timestamp);

        _value = abi.decode(_data, (uint256));

        if (_timestamp > lskLastStoredTimestamp) {
            lskLastStoredTimestamp = _timestamp;
            lskLastStoredPrice = _value;
        } else {
            _value = lskLastStoredPrice;
            _timestamp = lskLastStoredTimestamp;
        }

        if (block.timestamp - _timestamp > STALENESS_AGE) revert StalePrice(_value, _timestamp);

        return (_value, _timestamp);
    }
}
```

Anda dapat menyesuaikan kontrak ini sesuai kebutuhan Anda.
Contoh ini menerapkan beberapa best-practice[^1] untuk menggunakan Tellor dengan mengimplementasikan buffer waktu sengketa dan pemeriksaan staleness data.
Selain itu, contoh ini juga berusaha mengurangi serangan disput back-in-time dengan menyimpan nilai dan timestamp terbaru dalam cache.

[^1]: Berdasarkan contoh dalam [repositori best-practice Tellor](https://github.com/tellor-io/best-practices-user/tree/main)

:::tip
Untuk gambaran umum best-practice menggunakan Tellor, kunjungi [Checklist Pengguna](https://docs.tellor.io/tellor/getting-data/user-checklists) dalam dokumentasi Tellor.
:::

## Meluncurkan di Lisk

Untuk meluncurkan kontrak pintar di Lisk Sepolia atau Lisk Mainnet, ikuti panduan berikut:

- [Meluncurkan kontrak pintar dengan Hardhat](../deploying-smart-contract/with-Hardhat), atau
- [Meluncurkan kontrak pintar dengan Foundry](../deploying-smart-contract/with-Foundry)

## Sumber daya tambahan

- Untuk implementasi yang lebih andal dari oracle Tellor, lihat daftar lengkap fungsi yang tersedia [di sini](https://github.com/tellor-io/usingtellor/blob/master/README.md).
- Apakah Anda memiliki permintaan Data Feed tertentu? [Isi formulir ini](https://github.com/tellor-io/dataSpecs/issues/new?assignees=&labels=&template=new_query_type.yaml&title=%5BNew+Data+Request+Form%5D%3A+).
- Apakah Anda masih memiliki pertanyaan? Hubungi tim Tellor di Discord [di sini](https://discord.gg/tellor).
