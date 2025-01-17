---
title: ...menggunakan RedStone (Push)
slug: /building-on-lisk/using-oracle-data/redstone-push
description: Panduan menggunakan RedStone Push untuk mengakses data dunia nyata seperti harga aset, langsung dari smart contract Anda di blockchain Lisk.
keywords: [
    Oracle
    Oracles,
    RedStone,
    feeds harga,
    feeds data,
    smart contract,
    Lisk blockchain,
    jaringan Lisk,
    Lisk testnet,
    jaringan uji Lisk,
    pengembangan app,
    pengembangan dapp,
    membangun dapp di Lisk,
    membangun di Lisk,
    RedStone Push,
  ]
---

# Mengakses Data Dunia Nyata menggunakan RedStone Oracle (Push)

Halaman ini akan menjelaskan bagaimana Anda dapat mengakses data oracle menggunakan [RedStone Push](https://docs.redstone.finance/docs/get-started/models/redstone-push).

RedStone adalah ekosistem data yang menyediakan data yang sering diperbarui, dapat diandalkan, dan beragam untuk dApp dan smart contract Anda yang di-deploy di Lisk.

Data feed RedStone kompatibel dengan [AggregatorV3Interface](https://docs.chain.link/data-feeds/using-data-feeds#solidity) dari Chainlink dan mencakup komponen berikut:

- **Kontrak Agregator**: Agregator adalah kontrak yang menerima pembaruan data berkala dari jaringan oracle.
  Agregator menyimpan data yang telah digabungkan di onchain sehingga konsumen dapat mengambilnya dan menggunakannya dalam transaksi yang sama.
  Kontrak-kontrak ini sudah di-deploy di jaringan Lisk dan dapat langsung digunakan oleh konsumen.
- **Konsumen (Consumer)**: Konsumen adalah aplikasi onchain atau offchain yang menggunakan data feed.
  Kontrak konsumen menggunakan `AggregatorV3Interface` untuk memanggil fungsi pada kontrak proxy[^1] dari Agregator untuk mengambil data oracle.

[^1]:
    Kontrak proxy adalah proxy onchain yang menunjuk ke agregator untuk data feed tertentu.
    Penggunaan proxy memungkinkan agregator dasar untuk ditingkatkan tanpa mengganggu layanan bagi kontrak yang mengonsumsinya.

## Data Feed di Lisk

Agregator berikut tersedia di Lisk Mainnet untuk RedStone Push:

- [ETH/USD L2PriceFeedWithoutRounds](https://blockscout.lisk.com/address/0x6b7AB4213c77A671Fc7AEe8eB23C9961fDdaB3b2)
  - alamat: `0x6b7AB4213c77A671Fc7AEe8eB23C9961fDdaB3b2`
- [LSK/USD L2PriceFeedWithoutRounds](https://blockscout.lisk.com/address/0xa1EbA9E63ed7BA328fE0778cFD67699F05378a96)
  - alamat: `0xa1EbA9E63ed7BA328fE0778cFD67699F05378a96`
- [USDT/USD L2PriceFeedWithoutRounds](https://blockscout.lisk.com/address/0xd2176Dd57D1e200c0A8ec9e575A129b511DBD3AD)
  - alamat: `0xd2176Dd57D1e200c0A8ec9e575A129b511DBD3AD`
- [USDC/USD L2PriceFeedWithoutRounds](https://blockscout.lisk.com/address/0xb4e6A7861067674AC398a26DD73A3c524C602184)
  - alamat: `0xb4e6A7861067674AC398a26DD73A3c524C602184`
- [WBTC/USD L2PriceFeedWithoutRounds](https://blockscout.lisk.com/address/0x13da43eA89fB692bdB6666F053FeE70aC61A53cd)
  - alamat: `0x13da43eA89fB692bdB6666F053FeE70aC61A53cd`

Dalam panduan ini, kita akan mengembangkan kontrak konsumen yang akan meminta harga spot terbaru dari data feed ETH, LSK, dan USDT.

:::note
RedStone Push hanya sepenuhnya tersedia di Lisk Mainnet, jadi pastikan untuk deploy kontrak konsumen Anda di Lisk Mainnet juga.

Jika Anda ingin deploy di Lisk Sepolia Testnet, periksa panduan [Tellor](./tellor.md), yang tersedia untuk kedua jaringan.
:::

## Mengimpor

Untuk menggunakan data RedStone di dalam kontrak Anda, impor [AggregatorV3Interface](https://docs.chain.link/data-feeds/using-data-feeds#solidity) dari Chainlink seperti yang ditunjukkan dalam contoh kontrak di bawah ini.

Untuk setiap data feed yang ingin Anda simpan, buat konstanta baru dengan tipe `AggregatorV3Interface`.

Dalam konstruktor, tetapkan konstanta yang telah didefinisikan di atas untuk menunjuk ke data feed masing-masing:
Gunakan fungsi `AggregatorV3Interface()` dan masukkan alamat kontrak data feed yang sesuai sebagai parameter.

```solidity title="Importing the AggregatorV3Interface"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract RedStoneDataConsumer {
    AggregatorV3Interface internal dataFeedETH;
    AggregatorV3Interface internal dataFeedLSK;
    AggregatorV3Interface internal dataFeedUSDT;

    /**
     * Network: Lisk
     * Aggregator: ETH/USD
     * Address: 0x6b7AB4213c77A671Fc7AEe8eB23C9961fDdaB3b2
     */
     /**
     * Network: Lisk
     * Aggregator: LSK/USD
     * Address: 0xa1EbA9E63ed7BA328fE0778cFD67699F05378a96
     */
      /**
     * Network: Lisk
     * Aggregator: USDT/USD
     * Address: 0xd2176Dd57D1e200c0A8ec9e575A129b511DBD3AD
     */
    constructor() {
        dataFeedETH = AggregatorV3Interface(
            0x6b7AB4213c77A671Fc7AEe8eB23C9961fDdaB3b2
        );
        dataFeedLSK = AggregatorV3Interface(
            0xa1EbA9E63ed7BA328fE0778cFD67699F05378a96
        );
        dataFeedUSDT = AggregatorV3Interface(
            0xd2176Dd57D1e200c0A8ec9e575A129b511DBD3AD
        );
    }
}
```

## Membaca Data

Untuk membaca data dari feeds harga, kita mendefinisikan fungsi-fungsi berikut dalam kontrak:

- `getRedStoneETHDataFeedLatestAnswer()`
- `getRedStoneLSKDataFeedLatestAnswer()`
- `getRedStoneUSDTDataFeedLatestAnswer()`

Di dalam fungsi-fungsi tersebut, panggil [latestRoundData](https://docs.chain.link/data-feeds/api-reference#latestrounddata) pada masing-masing data feed untuk menerima harga spot terbaru untuk token yang bersangkutan.

Fungsi `latestRoundData()` me-return nilai-nilai berikut:

- `roundId`(uint80): ID dari ronde.  
  Untuk semua [data feed](#data-feed-di-lisk), ronde selalu bernilai `1`, karena kontrak ini tidak menggunakan ronde, sesuai dengan namanya.
- `answer`(int256): Data yang disediakan oleh feed ini.  
  Tergantung pada feed yang dipilih, `answer` menyediakan harga aset, cadangan, dan jenis data lainnya.
- `startedAt`(uint256): Timestamp ketika ronde dimulai.
- `updatedAt`(uint256): Timestamp ketika ronde diperbarui.
- `answeredInRound`(uint80): Deprecated - Sebelumnya digunakan ketika jawaban membutuhkan beberapa ronde untuk dihitung.

Dalam contoh ini, kita hanya akan menggunakan `answer` dan `updatedAt`.  
Nilai `updatedAt` harus digunakan untuk memastikan bahwa `answer` cukup baru untuk digunakan oleh aplikasi Anda.  
Anda dapat membandingkan `updatedAt` dengan waktu blok terbaru (`uint256 currentTime = block.timestamp;`) untuk memastikan hanya menggunakan data oracle terbaru dalam aplikasi Anda.

:::caution
Ini adalah contoh kontrak yang menggunakan kode yang belum diaudit.
Jangan gunakan kode ini dalam produksi.
:::

```solidity title="Reading data feeds"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract RedStoneDataConsumer {
  AggregatorV3Interface internal priceFeedETH;
  AggregatorV3Interface internal priceFeedLSK;
  AggregatorV3Interface internal priceFeedUSDT;

  constructor() {
      priceFeedETH = AggregatorV3Interface(
          0x6b7AB4213c77A671Fc7AEe8eB23C9961fDdaB3b2
      );
      priceFeedLSK = AggregatorV3Interface(
          0xa1EbA9E63ed7BA328fE0778cFD67699F05378a96
      );
      priceFeedUSDT = AggregatorV3Interface(
          0xd2176Dd57D1e200c0A8ec9e575A129b511DBD3AD
      );
  }

  /**
    * Me-return harga ETH terbaru, serta waktu terakhir kali diperbarui.
    */
  function getRedStoneETHDataFeedLatestAnswer() public view returns (int, uint) {
      (
        /* uint80 roundID */,
        int answer,
        uint updatedAt,
        /*uint startedAt*/,
        /*uint80 answeredInRound*/
      ) = priceFeedETH.latestRoundData();
      return (answer, updatedAt);
  }
  /**
    * Me-return harga LSK terbaru, serta waktu terakhir kali diperbarui.
    */
  function getRedStoneLSKDataFeedLatestAnswer() public view returns (int, uint) {
      (
        /* uint80 roundID */,
        int answer,
        uint updatedAt,
        /*uint startedAt*/,
        /*uint80 answeredInRound*/
      ) = priceFeedLSK.latestRoundData();
      return (answer, updatedAt);
  }
  /**
    * Me-return harga USDT terbaru, serta waktu terakhir kali diperbarui.
    */
  function getRedStoneUSDTDataFeedLatestAnswer() public view returns (int, uint) {
      (
        /* uint80 roundID */,
        int answer,
        uint updatedAt,
        /*uint startedAt*/,
        /*uint80 answeredInRound*/
      ) = priceFeedUSDT.latestRoundData();
      return (answer, updatedAt);
  }
}
```

## Deploy di Lisk

Untuk deploy smart contract di Lisk, ikuti panduan berikut:

- [Deploy smart contract dengan Hardhat](../deploying-smart-contract/with-Hardhat), atau
- [Deploy smart contract dengan Foundry](../deploying-smart-contract/with-Foundry)

:::note
RedStone Push hanya tersedia di Lisk Mainnet, jadi pastikan Anda deploy kontrak konsumen di Lisk Mainnet.

Jika Anda ingin deploy di Lisk Sepolia Testnet, silakan cek panduan [Tellor](./tellor.md), yang tersedia untuk kedua jaringan.
:::
