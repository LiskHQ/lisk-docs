---

title: Oracle  
slug: /lisk-tools/oracles  
description: Dokumentasi untuk berbagai oracle blockchain untuk Lisk.  
keywords:  
  [  
    "Oracle",  
    "Oracle",  
    "Lisk",  
    "Lisk Mainnet",  
    "Lisk Testnet",  
    "jaringan Lisk",  
    "Redstone",  
    Tellor,
    "price feed",  
    "data feed",  
  ]  

---

# Oracle

[Oracle](https://ethereum.org/en/developers/docs/oracles/) menyediakan data offchain ke onchain.  
Ini memungkinkan kode yang berjalan di blockchain untuk mengakses berbagai macam informasi.

Berikut ini adalah oracle yang sudah mendukung jaringan Lisk:

## RedStone

[RedStone](https://redstone.finance/) menawarkan Feed Data fleksibel untuk Pasar Peminjaman, Perpetuals, Opsi, Stablecoins, Yield Aggregator, dan jenis protokol DeFi baru lainnya.

Pembuat dapat memilih bagaimana mereka ingin mengonsumsi data dari tiga model khusus berikut:

*   [RedStone Pull](https://docs.redstone.finance/docs/get-started/models/redstone-pull) (pull oracle) - waktu pembaruan kurang dari 10 detik, spektrum feed yang luas, terbaik untuk sebagian besar kasus penggunaan. Semua [Feed Harga](https://app.redstone.finance/#/app/tokens) tersedia untuk Lisk.
*   [RedStone Push](https://docs.redstone.finance/docs/get-started/models/redstone-push) (push oracle) - untuk protokol yang dirancang untuk antarmuka oracle tradisional, detak jantung yang dapat disesuaikan, dan ambang penyimpangan.
* [RedStone X](https://docs.redstone.finance/docs/get-started/models/redstone-x) - khusus untuk Perpetual dan Opsi, frekuensi pembaruan tertinggi, dan perlindungan dari front-running.
* [ERC7412](https://docs.redstone.finance/docs/get-started/models/redstone-erc7412) - Model Klasik dan Inti yang digabungkan

Tertarik untuk mengintegrasi? [Hubungi](https://discord.com/invite/PVxBZKFr46) tim RedStone!

#### Jaringan yang Didukung

- Lisk

### Panduan

- [Mengakses data oracle dengan Redstone (Pull)](../building-on-lisk/using-oracle-data/redstone-pull.md)
- [Mengakses data oracle dengan Redstone (Push)](../building-on-lisk/using-oracle-data/redstone-push.md)

## Tellor

Tellor adalah protokol oracle terdesentralisasi yang bersifat immutable, di mana pihak-pihak dapat meminta nilai dari data offchain (misalnya, ETH/USD), dan para reporter bersaing untuk menambahkan nilai tersebut ke dalam databank onchain.
Input ke databank ini diamankan oleh jaringan reporter yang men-stake token mereka.

Tellor menggunakan mekanisme insentif kripto-ekonomi, dengan memberikan penghargaan atas pengiriman data yang jujur oleh reporter dan menghukum aktor jahat melalui penerbitan token Tellor, Tributes (TRB), dan mekanisme sengketa.

Pendekatan ini mendorong jaringan terbuka dan tanpa izin untuk pelaporan data dan validasi data, memastikan bahwa data dapat disediakan oleh siapa saja dan diverifikasi oleh semua orang.

[A list of all the Tellor contracts deployed on Lisk is available on their documentation](https://docs.tellor.io/tellor/the-basics/contracts-reference#lisk)

#### Jaringan yang Didukung

- Lisk  
- Lisk Sepolia

### Panduan
- [Mengakses data oracle dengan Tellor](../building-on-lisk/using-oracle-data/tellor.md)