---
title: ...menggunakan RedStone (Pull)
slug: /building-on-lisk/using-oracle-data/redstone-pull
description: Panduan menggunakan RedStone Pull untuk mengakses data dunia nyata, seperti harga aset, langsung dari smart contract Anda di blockchain Lisk.
keywords: [
    Oracle
    Oracles,
    RedStone,
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
    RedStone Pull,
  ]
---

# Mengakses data dunia nyata menggunakan RedStone Oracle (Pull)

Halaman ini akan menjelaskan cara Anda dapat mengakses data oracle menggunakan [RedStone Pull](https://docs.redstone.finance/docs/get-started/models/redstone-pull/).

RedStone adalah ekosistem data yang menyediakan data yang sering diperbarui, dapat diandalkan, dan beragam untuk dApp dan kontrak pintar Anda yang diluncurkan di Lisk.

## Cara Mengambil Data Oracle dari RedStone

Untuk membuat kontrak pintar yang secara langsung mengambil data terbaru dari RedStone oracle, ikuti panduan ini.

Panduan ini menggunakan model [RedStone Pull](https://docs.redstone.finance/docs/get-started/models/redstone-pull) untuk mengambil data.

Untuk gambaran umum mengenai berbagai modul yang ditawarkan RedStone untuk menerima data oracle, kunjungi [Oracles > RedStone](../../lisk-tools/oracles#redstone).

Panduan ini menggunakan [Hardhat](https://hardhat.org/) untuk membuat kontrak pintar.
Jika Anda ingin menggunakan Foundry, silakan cek [dokumentasi RedStone](https://docs.redstone.finance/docs/get-started/models/redstone-pull#foundry) untuk instruksi.

### Dependensi

- ethers ^5.7.2
- hardhat ^2.14.0

### Instalasi EVM Connector

Instal paket [@redstone-finance/evm-connector](https://www.npmjs.com/package/@redstone-finance/evm-connector).

```sh
npm install @redstone-finance/evm-connector
```

### Mengimpor evm connector

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
* Mengimpor EVM connector
*/
import "@redstone-finance/evm-connector/contracts/data-services/RapidDemoConsumerBase.sol";

contract YourContract is RapidDemoConsumerBase {

    // ...

}
```

### Mendapatkan Data Oracle

Dapatkan data oracle menggunakan fungsi-fungsi yang disediakan oleh EVM connector.

#### Mendapatkan Satu Nilai

Untuk mendapatkan satu data feed harga, gunakan fungsi `getOracleNumericValueFromTxMsg()` dan berikan ID data feed sebagai parameter.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
* Mengimpor EVM connector
*/
import "@redstone-finance/evm-connector/contracts/data-services/RapidDemoConsumerBase.sol";

contract YourContract is RapidDemoConsumerBase {

    // ...

    /**
    * Mendapatkan harga terbaru dari ETH
    */
    function getLatestEthPrice() public view returns (uint256) {
        bytes32 dataFeedId = bytes32("ETH");
        return getOracleNumericValueFromTxMsg(dataFeedId);
    }
}
```

#### Get multiple values

#### Mendapatkan Beberapa Nilai

Untuk mendapatkan data dari beberapa feed harga, gunakan fungsi `getOracleNumericValuesFromTxMsg()` dan berikan array ID data feed sebagai parameter.

```solidity
/**
* Mendapatkan harga terbaru dari ETH dan BTC
*/
function getLatestEthBtcPrices() public view returns (uint256[] memory) {
    bytes32[] memory dataFeedIds = new bytes32[](2);
    dataFeedIds[0] = bytes32("ETH");
    dataFeedIds[1] = bytes32("BTC");
    uint256[] memory values = getOracleNumericValuesFromTxMsg(dataFeedIds);
    return values;
}
```

### Testing

Untuk mengetes fungsi-fungsi yang terkait dengan EVM connector dalam kontrak Anda, maka Anda perlu me-wrap kontrak menggunakan `WrapperBuilder` yang disediakan oleh paket `@redstone-finance/evm-connector`.

```typescript title="test/YourContract.ts"
import { expect } from "chai";
import { ethers } from "hardhat";
import { WrapperBuilder } from "@redstone-finance/evm-connector";

describe("YourContract", function () {
  describe("RedStone", function () {
    it("Get ETH price securely", async function () {
      const YourContract = await ethers.getContractFactory("YourContract");
      const contract = await YourContract.deploy();
      const wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
        dataFeeds: ["ETH"],
      });

      // Berinteraksi dengan kontrak (mengambil nilai oracle secara aman)
      const ethPriceFromContract = await wrappedContract.getLatestEthPrice();
      console.log("Latest ETH price:");
      console.log({ ethPriceFromContract });
    });
  });
});
```

Sekarang jalankan tesnya:

```bash
npx hardhat test
```

Ini akan menampilkan harga ETH terbaru di konsol:

```title="Output"
Latest ETH price:
{ ethPriceFromContract: BigNumber { value: "250255087192" } }
```

## Meluncurkan kontrak pintar di Lisk

Untuk meluncurkan kontrak pintar di Lisk Sepolia atau Lisk Mainnet, ikuti panduan berikut:

- [Meluncurkan kontrak pintar dengan Hardhat](../deploying-smart-contract/with-Hardhat), atau
- [Meluncurkan kontrak pintar dengan Foundry](../deploying-smart-contract/with-Foundry)
