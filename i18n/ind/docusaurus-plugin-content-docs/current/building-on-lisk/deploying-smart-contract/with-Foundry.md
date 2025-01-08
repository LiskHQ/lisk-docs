---
title: ... menggunakan Foundry
slug: /building-on-lisk/deploying-smart-contract/with-Foundry
description: "Panduan untuk meluncurkan kontrak pintar di jaringan test Lisk menggunakan Foundry. Termasuk instruksi untuk mengatur environment, mengompilasi, dan meluncurkan kontrak pintar."
keywords:
  [
    "Foundry",
    "kontrak pintar",
    "ERC-20",
    "Lisk",
    "Lisk test network",
    "Lisk testnet",
    "Lisk Sepolia",
    "menguji kontrak pintar",
    "Solidity",
    "peluncuran kontrak pintar",
    "luncurkan kontrak pintar",
    "meluncurkan kontrak pintar",
    "membangun di lisk",
    "menulis ke kontrak pintar",
    "pengembangan kontrak pintar",
  ]
toc_max_heading_level: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Meluncurkan kontrak pintar dengan Foundry

Panduan ini membahas dasar-dasar toolchain pengembangan [Foundry](https://book.getfoundry.sh/) dan menjelaskan cara membuat serta meluncurkan kontrak pintar dengan Foundry ke testnet **Lisk Sepolia**.

:::note
Anda dapat meluncurkan kontrak di mainnet **Lisk** dengan menggunakan proses yang sama.  
Untuk meluncurkan ke mainnet, pastikan dompet Anda memiliki ETH yang cukup.

Teks berikut mencakup perintah untuk Lisk dan Lisk Sepolia demi kemudahan Anda.  
Untuk informasi lebih lanjut, lihat [jaringan Lisk yang tersedia](/network-info) dan [cara menghubungkan dompet ke jaringan tersebut](/user/connecting-to-a-wallet).
:::

Foundry adalah rangkaian tools yang mumpuni untuk mengembangkan, menguji, dan men-debug kontrak pintar Anda.  
Foundry terdiri dari beberapa tools individu seperti:

- [`forge`](https://book.getfoundry.sh/forge/): tools berbasis command-line yang disertakan dengan Foundry. Forge digunakan untuk menguji, membangun, dan meluncurkan kontrak pintar Anda.
- [`cast`](https://book.getfoundry.sh/cast/): tools berbasis command-line untuk melakukan panggilan RPC, seperti berinteraksi dengan kontrak, mengirim transaksi, dan mendapatkan data on-chain.
- [`anvil`](https://book.getfoundry.sh/anvil/): node testnet lokal, dirancang untuk menguji perilaku kontrak dari frontend atau melalui RPC dalam environment pengembangan lokal.
- [`chisel`](https://book.getfoundry.sh/chisel/): REPL Solidity ([Read–Eval–Print Loop](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)) untuk mencoba potongan kode Solidity pada jaringan lokal atau jaringan yang di-fork.

## Prasyarat

Untuk membangun dengan Foundry, Anda memerlukan:

- Pemahaman dasar tentang [Solidity](https://soliditylang.org/).
- Foundry terinstal pada sistem Anda.  
  Untuk menginstalnya, lakukan langkah-langkah berikut:
  - Dari command line, jalankan:
    ```bash
    curl -L https://foundry.paradigm.xyz | bash
    ```
  - Setelah itu, untuk menginstal versi terbaru (nightly) dari Foundry, jalankan:
    ```bash
    foundryup
    ```
- Untuk informasi lebih lanjut, lihat [Panduan Instalasi](https://book.getfoundry.sh/getting-started/installation) di Foundry Book.

### Dana Dompet

**Meluncurkan kontrak** ke blockchain memerlukan **biaya gas**.  
Oleh karena itu, Anda perlu mendanai dompet Anda dengan ETH untuk menutupi biaya gas tersebut.

Dalam panduan ini, Anda akan meluncurkan kontrak ke Lisk Sepolia Testnet.

Anda dapat men-deposit token yang diperlukan menggunakan [Lisk Sepolia Bridge](https://sepolia-bridge.lisk.com/bridge/lisk-sepolia-testnet).

Jika dompet Anda tidak memiliki `SepoliaETH` yang cukup, gunakan salah satu faucet yang tersedia untuk Ethereum Sepolia Testnet seperti [https://sepoliafaucet.com](https://sepoliafaucet.com/) untuk menerima ETH Testnet secara gratis.  
Kemudian, gunakan Lisk Bridge yang disebutkan sebelumnya untuk mengirim token dari **Ethereum Sepolia Testnet** ke **Lisk Sepolia Testnet**.

## Membuat Proyek

Langkah pertama dalam meluncurkan kontrak pintar ke Lisk adalah menyiapkan environment pengembangan Anda dengan membuat proyek Foundry.

Anda dapat membuat direktori baru secara terpisah lalu menginisialisasi proyek Foundry, atau Anda dapat membiarkan Foundry membuat direktori dan menginisialisasi proyek Foundry dengan menjalankan perintah berikut:

```bash
forge init foundry_app && cd foundry_app
```

Perintah ini akan membuat folder bernama `foundry_app` dan sekaligus mengubah direktori kerja terminal ke folder tersebut.

<details>
<summary>Log Eksekusi Perintah `forge init`</summary>
```text
Initializing /XYZ/L2/25/foundry_app/foundry_app...
Installing forge-std in /XYZ/L2/25/foundry_app/foundry_app/lib/forge-std (url: Some("https://github.com/foundry-rs/forge-std"), tag: None)
Cloning into '/XYZ/L2/25/foundry_app/foundry_app/lib/forge-std'...
remote: Enumerating objects: 2181, done.
remote: Counting objects: 100% (2177/2177), done.
remote: Compressing objects: 100% (737/737), done.
remote: Total 2181 (delta 1446), reused 2066 (delta 1373), pack-reused 4
Receiving objects: 100% (2181/2181), 614.11 KiB | 766.00 KiB/s, done.
Resolving deltas: 100% (1446/1446), done.
Submodule 'lib/ds-test' (https://github.com/dapphub/ds-test) registered for path 'lib/ds-test'
Cloning into '/XYZ/L2/25/foundry_app/foundry_app/lib/forge-std/lib/ds-test'...
remote: Enumerating objects: 313, done.        
remote: Counting objects: 100% (171/171), done.        
remote: Compressing objects: 100% (79/79), done.        
remote: Total 313 (delta 91), reused 132 (delta 83), pack-reused 142        
Receiving objects: 100% (313/313), 71.35 KiB | 521.00 KiB/s, done.
Resolving deltas: 100% (130/130), done.
    Installed forge-std v1.7.6
    Initialized forge project
```
</details>

Secara default, setiap aplikasi yang dibuat dengan Foundry akan memiliki struktur direktori yang serupa seperti berikut ini:

```bash
.
├── .github
├── lib
├── script
│   └── Counter.s.sol
├── src
│   └── Counter.sol
├── test
│   └── Counter.t.sol
├── .gitignore
├── .gitmodules
├── foundry.toml
└── README.md
```

Untuk saat ini, hapus file yang ada di `script/Counter.s.sol`, `src/Counter.sol`, dan `test/Counter.t.sol`, karena kita akan membuat kontrak dan kode pengujian sendiri dalam panduan berikutnya.

### **Membuat** Kontrak Pintar

Untuk kemudahan dan keamanan, kita akan menggunakan kontrak `ERC721` yang disediakan oleh [OpenZeppelin Contracts library](https://docs.openzeppelin.com/contracts/5.x/erc721) untuk membuat kontrak pintar ERC-721 sederhana.  
Dengan OpenZeppelin, kita tidak perlu menulis keseluruhan kontrak ERC-721.  
Sebaliknya, kita dapat mengimpor kontrak dari library dan langsung menggunakan fungsinya.

Untuk menginstal OpenZeppelin Contracts library ke proyek Anda, jalankan perintah berikut:

```bash
forge install openzeppelin/openzeppelin-contracts
```

Di dalam folder `src`, buat sebuah kontrak pintar bernama `NFT.sol` dan tambahkan kode berikut ke dalam file yang baru dibuat.

```sol title="src/NFT.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    uint256 public currentTokenId;

    // The following will create an ERC721 Token called Lisk.
    constructor() ERC721("Lisk", "LSK") {}

    // For simplicity, we will only implement the mint function of the Lisk token.
    function mint(address recipient) public payable returns (uint256) {
        uint256 newItemId = ++currentTokenId;
        _safeMint(recipient, newItemId);
        return newItemId;
    }
}
```

### Mengompilasi Kontrak Pintar

Setelah kode kontrak pintar siap, Anda harus mengompilasinya menggunakan Foundry.  
Untuk melakukannya, cukup jalankan perintah berikut:

```bash
forge build
```

Jika kontrak pintar tidak memiliki eror, Anda akan melihat output berikut di terminal:

```text
[⠢] Compiling...
[⠰] Compiling 1 files with 0.8.24
[⠔] Solc 0.8.24 finished in 40.36ms
Compiler run successful!
```

### **Menguji** Kontrak Pintar

Dengan menguji kontrak pintar, Anda dapat memastikan bahwa kontrak pintar berperilaku sesuai harapan dan tidak ada bug sebelum meluncurkannya ke Lisk.

Foundry menyediakan banyak framework testing untuk mendukung Anda dalam menulis test untuk kontrak pintar.  
Lihat [Tests - Foundry Book](https://book.getfoundry.sh/forge/tests) untuk contoh dan referensi terkait framework testing.

Untuk melakukan testing pada kontrak pintar `NFT`, buat file baru bernama `NFT.t.sol` di dalam direktori `test/`, dan tambahkan konten berikut:

```solidity title="foundry_app/test/NFT.t.sol"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {NFT} from "../src/NFT.sol";

contract NFTTest is Test {

    NFT public lsk;

    // Create dummy addresses for alice and bob
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");

    // Initialize the NFT contract's object
    function setUp() public{
        lsk = new NFT();
    }

    // Pass the address of alice and bob to see whether the mint function successfully passes
    function testMintPass() public {
        lsk.mint(alice);
        lsk.mint(bob);
    }

    // To intentionally create a failing test, let's compare the addresses of alice and bob
    function testMintFail() public {
        assertEq(alice, bob);
    }
}
```

Untuk menjalankan test, eksekusi perintah berikut. Flag `-vv` akan menghasilkan informasi detail tentang test yang dijalankan menggunakan perintah berikut:

```bash
forge test -vv
```

Outputnya seharusnya terlihat seperti ini:

```text
[⠢] Compiling...
No files changed, compilation skipped

Ran 2 tests for test/NFT.t.sol:NFTTest
[FAIL. Reason: assertion failed] testMintFail() (gas: 147160)
Logs:
// highlight-start
  Error: a == b not satisfied [address]
        Left: 0x328809Bc894f92807417D2dAD6b7C998c1aFdac6
       Right: 0x1D96F2f6BeF1202E4Ce1Ff6Dad0c2CB002861d3e
// highlight-end

[PASS] testMintPass() (gas: 132327)
Test result: FAILED. 1 passed; 1 failed; 0 skipped; finished in 1.13ms

Ran 1 test suite in 1.13ms: 1 tests passed, 1 failed, 0 skipped (2 total tests)

Failing tests:
Encountered 1 failing test in test/NFT.t.sol:NFTTest
[FAIL. Reason: assertion failed] testMintFail() (gas: 147160)

Encountered a total of 1 failing tests, 1 tests succeeded
```

Test pertama: `testMintPass` berhasil dijalankan karena kriteria untuk fungsi `mint()` terpenuhi.  
Kita memberikan alamat penerima ke fungsi `mint()` sebagaimana yang diminta, sehingga test berhasil.

Test kedua: `testMintFail` gagal karena kita mengasumsikan bahwa alamat `alice` dan `bob` adalah sama.  
Log output yang disorot diatas menjelaskan mengapa asumsi tersebut salah.

### Meluncurkan Smart Contract

Setelah berhasil membangun kontrak pintar, Anda sekarang dapat meluncurkannya ke jaringan Lisk.  
Untuk contoh ini, kita akan menggunakan jaringan Lisk Sepolia untuk meluncurkan kontrak `NFT`.

Tambahkan flag `--verify`, `--verifier`, `--verifier-url`, dan `--private-key` dari akun pengirim ke perintah `forge create` untuk langsung memverifikasi kontrak pintar di BlockScout.

<Tabs>
  <TabItem value="mainnet" label="Lisk" >
    ```bash
    forge create --rpc-url https://rpc.api.lisk.com \
    --etherscan-api-key 123 \
    --verify \
    --verifier blockscout \
    --verifier-url https://blockscout.lisk.com/api \
    --private-key <PRIVATE_KEY> \
    src/NFT.sol:NFT
    ```
  </TabItem>
  <TabItem value="testnet" label="Lisk Sepolia" default>
    ```bash
    forge create --rpc-url https://rpc.sepolia-api.lisk.com \
    --etherscan-api-key 123 \
    --verify \
    --verifier blockscout \
    --verifier-url https://sepolia-blockscout.lisk.com/api \
    --private-key <PRIVATE_KEY> \
    src/NFT.sol:NFT
    ```
  </TabItem>
</Tabs>

Jika peluncuran berhasil, outputnya akan terlihat seperti berikut:

```text
# Perintah yang disebutkan di atas akan terlebih dahulu meluncurkan kontrak dan menampilkan output berikut:

// highlight-start
[⠒] Compiling...
No files changed, compilation skipped
Deployer: 0x5e1A92F84cA1CE280B3Cb29d79C3368f45b41EBB
Deployed to: 0x108872F713A27bc22ca1db8CEefCAC8CbeDdF9E5
Transaction hash: 0xf465528f43e5cbc9b5206e46048feba0b920179813c3eb8c3bdbccbfd13d731e
// highlight-end

# Setelah kontrak berhasil diluncurkan, perintah yang disebutkan di atas akan langsung memverifikasi kontrak tersebut!

// highlight-start
Starting contract verification...
Waiting for blockscout to detect contract deployment...
Start verifying contract `0x108872F713A27bc22ca1db8CEefCAC8CbeDdF9E5` deployed on 4202

Submitting verification for [src/NFT.sol:NFT] 0x108872F713A27bc22ca1db8CEefCAC8CbeDdF9E5.
Submitted contract for verification:
        Response: `OK`
        GUID: `108872f713a27bc22ca1db8ceefcac8cbeddf9e565e71790`
        URL: https://sepolia-blockscout.lisk.com/address/0x108872f713a27bc22ca1db8ceefcac8cbeddf9e5
Contract verification status:
Response: `OK`
Details: `Pending in queue`
Contract verification status:
Response: `OK`
Details: `Pass - Verified`
Contract successfully verified
// highlight-end
```

Setelah kontrak pintar berhasil diluncurkan dan diverifikasi, Anda dapat berinteraksi dengan memanggil fungsi-fungsi publiknya.

### **Memverifikasi** Kontrak Pintar

Setiap kontrak yang diluncurkan harus diverifikasi agar pengguna dan developer lainnya dapat memeriksa source code-nya dan memastikan bahwa source code tersebut sesuai dengan bytecode yang diluncurkan di blockchain.

Selain itu, jika Anda ingin orang lain dapat berinteraksi dengan kontrak Anda melalui penjelajah blockchain seperti interface [Read Contract](https://sepolia-blockscout.lisk.com/address/0x108872F713A27bc22ca1db8CEefCAC8CbeDdF9E5?tab=read_contract) dan [Write Contract](https://sepolia-blockscout.lisk.com/address/0x108872F713A27bc22ca1db8CEefCAC8CbeDdF9E5?tab=write_contract) di Blockscout, kontrak tersebut harus diverifikasi terlebih dahulu.

Kontrak di atas **sudah diverifikasi**, sehingga Anda seharusnya dapat melihat versi Anda di penjelajah blockchain, tetapi kami tetap akan menjelaskan langkah-langkah untuk memverifikasi kontrak di Lisk Sepolia testnet.

:::info
Anda tidak dapat memverifikasi ulang kontrak yang identik dengan yang sudah diverifikasi. Jika Anda mencoba melakukannya, seperti memverifikasi kontrak di atas, Anda akan mendapatkan pesan error seperti:

```text
Start verifying contract `0x108872F713A27bc22ca1db8CEefCAC8CbeDdF9E5` deployed on 4202

Contract [src/NFT.sol:NFT] "0x108872F713A27bc22ca1db8CEefCAC8CbeDdF9E5" is already verified. Skipping verification.
```

:::

Jika kontrak pintar Anda belum diverifikasi, ambil alamat kontrak yang sudah diluncurkan dan jalankan:

<Tabs>
  <TabItem value="mainnet" label="Lisk" >
    ```bash
    forge verify-contract <CONTRACT_ADDRESS> \
    ./src/<CONTRACT_FILE>.sol:<CONTRACT_NAME> \
    --chain 1135 \
    --watch \
    --verifier blockscout \
    --verifier-url https://blockscout.lisk.com/api
    ```
  </TabItem>
  <TabItem value="testnet" label="Lisk Sepolia" default>
    ```bash
    forge verify-contract <CONTRACT_ADDRESS> \
    ./src/<CONTRACT_FILE>.sol:<CONTRACT_NAME> \
    --chain 4202 \
    --watch \
    --verifier blockscout \
    --verifier-url https://sepolia-blockscout.lisk.com/api
    ```
  </TabItem>
</Tabs>

Anda akan melihat output yang serupa dengan berikut:

```
Starting contract verification...
Waiting for blockscout to detect contract deployment...
Start verifying contract `0xcCaA1C3eb8FEb5b09a5Eac1359BC4c70E18e29d9` deployed on 4202

Submitting verification for [src/NFT.sol:NFT] 0xcCaA1C3eb8FEb5b09a5Eac1359BC4c70E18e29d9.
Submitted contract for verification:
       Response: `OK`
       GUID: `ccaa1c3eb8feb5b09a5eac1359bc4c70e18e29d965e5c95a`
       URL: https://sepolia-blockscout.lisk.com/address/0xccaa1c3eb8feb5b09a5eac1359bc4c70e18e29d9
Contract verification status:
Response: `OK`
Details: `Pending in queue`
Contract verification status:
Response: `OK`
Details: `Pass - Verified`
Contract successfully verified
```

Gunakan alamat kontrak, misalnya `0xcCaA1C3eb8FEb5b09a5Eac1359BC4c70E18e29d9`, untuk mencari kontrak Anda di [Blockscout](https://sepolia-blockscout.lisk.com/) dan memastikan bahwa kontrak tersebut telah diverifikasi.

## Berinteraksi dengan Kontrak Pintar

Seperti yang disebutkan sebelumnya, jika Anda telah memverifikasi kontrak pintar di Blockscout, Anda dapat menggunakan bagian `Read contract` dan `Write contract` di bawah tab `Contract` untuk berinteraksi dengan kontrak yang telah diluncurkan.

Tab `Read contract` dapat digunakan tanpa menghubungkan dompet, namun, untuk menggunakan tab `Write contract`, Anda harus terlebih dahulu menghubungkan dompet Anda.  
Anda dapat melakukannya dengan mengklik tombol `Connect wallet`.

### Menggunakan **cast** untuk Berinteraksi

Dengan tool command-line dari Foundry: [`cast`](https://book.getfoundry.sh/cast/), Anda dapat berinteraksi dengan kontrak yang telah diluncurkan, baik untuk membaca maupun menulis data di blockchain.  
Mari kita lakukan panggilan tanpa mempublikasikan transaksi (read), lalu menandatangani dan mempublikasikan transaksi (write) ke kontrak yang telah diluncurkan.

#### Melakukan Panggilan

Sebagai salah satu komponen utama dari toolkit Foundry, `cast` memungkinkan kita untuk berinteraksi dengan kontrak, mengirim transaksi, dan mendapatkan data on-chain menggunakan panggilan RPC Ethereum.  
Pertama, kita akan melakukan panggilan dari sebuah akun tanpa mempublikasikan transaksi.

Isi `<PLACEHOLDERS>` berikut, lalu jalankan perintah:

<Tabs>
  <TabItem value="mainnet" label="Lisk" >
    ```bash
    cast call <DEPLOYED_CONTRACT_ADDRESS> --rpc-url https://rpc.api.lisk.com "balanceOf(address)" <YOUR_ACCOUNT_ADDRESS_HERE>
    ```
  </TabItem>
  <TabItem value="testnet" label="Lisk Sepolia" default>
    ```bash
    cast call <DEPLOYED_CONTRACT_ADDRESS> --rpc-url https://rpc.sepolia-api.lisk.com "balanceOf(address)" <YOUR_ACCOUNT_ADDRESS_HERE>
    ```
  </TabItem>
</Tabs>

Anda akan menerima respons berupa `0x0000000000000000000000000000000000000000000000000000000000000000`, yang setara dengan `0` dalam format heksadesimal.  
Hal ini masuk akal karena Anda baru saja meluncurkan kontrak NFT, namun belum ada NFT yang dicetak, sehingga saldo akun Anda adalah nol.

#### Menandatangani dan Mengirim Transaksi

Sekarang, mari kita tandatangani dan kirim transaksi dengan memanggil fungsi `mint(address)` pada kontrak `NFT` yang baru saja kita luncurkan.

Isi `<PLACEHOLDERS>` berikut, lalu jalankan perintah:

<Tabs>
  <TabItem value="mainnet" label="Lisk" >
    ```bash
    cast send <DEPLOYED_CONTRACT_ADDRESS> --rpc-url https://rpc.api.lisk.com "mint(address)" <RECIPIENT_ADDRESS_HERE> --private-key <SENDER_PRIVATE_KEY>
    ```
  </TabItem>
  <TabItem value="testnet" label="Lisk Sepolia" default>
    ```bash
    cast send <DEPLOYED_CONTRACT_ADDRESS> --rpc-url https://rpc.sepolia-api.lisk.com "mint(address)" <RECIPIENT_ADDRESS_HERE> --private-key <SENDER_PRIVATE_KEY>
    ```
  </TabItem>
</Tabs>

:::info

Karena perintah `cast send` menulis data ke blockchain, maka diperlukan private key akun pengirim yang harus diberikan ke flag `--private-key`.  
Transaksi akan berhasil dikirim jika akun pengirim memiliki dana yang cukup.

Hal ini tidak diperlukan untuk perintah `cast call`, karena perintah tersebut hanya mengambil data yang sudah dipublikasikan dari kontrak pintar.

:::

Jika eksekusi transaksi berhasil, Foundry akan memberikan respons berisi informasi tentang transaksi, termasuk `blockNumber`, `gasUsed`, `transactionHash`, dan banyak lagi.

```text
blockHash               0xfa9d32794b0fc9c1a10d39c5289613dfe80b55f8ead06475ca877a389e088e67
// highlight-next-line
blockNumber             2165375
contractAddress
cumulativeGasUsed       137472
effectiveGasPrice       3000000253
from                    0x5e1A92F84cA1CE280B3Cb29d79C3368f45b41EBB
// highlight-next-line
gasUsed                 93597
logs                    [{"address":"0x108872f713a27bc22ca1db8ceefcac8cbeddf9e5","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000","0x000000000000000000000000488ba3c013020bd1712ed6a1997c4212d9711954","0x0000000000000000000000000000000000000000000000000000000000000001"],"data":"0x","blockHash":"0xfa9d32794b0fc9c1a10d39c5289613dfe80b55f8ead06475ca877a389e088e67","blockNumber":"0x210a7f","transactionHash":"0x76750ee1aaeed89c8f165d6f547002eb3bb833a142f73d63c1c3c9980fce8796","transactionIndex":"0x1","logIndex":"0x0","removed":false}]
logsBloom               0x00000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000200000000008000000000000000000040000000000000000000000000000020000000000000000080800000000000000000000000010000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000001000000000000400000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000
root
status                  1
// highlight-next-line
transactionHash         0x76750ee1aaeed89c8f165d6f547002eb3bb833a142f73d63c1c3c9980fce8796
transactionIndex        1
type                    2
to                      0x1088…f9e5
l1Fee             "0x30fb62bfb0c"
l1GasPrice             "0x6d49929"
l1GasUsed             "0x8a4"
```

Terakhir, Anda dapat mengonfirmasi proses minting dengan [melakukan panggilan](#melakukan-panggilan) lagi.  
Anda seharusnya melihat saldo Anda meningkat dari `0` menjadi `1`.

<Tabs>
  <TabItem value="mainnet" label="Lisk" >
    ```bash
    cast call <DEPLOYED_CONTRACT_ADDRESS> --rpc-url https://rpc.api.lisk.com "balanceOf(address)" <YOUR_ACCOUNT_ADDRESS_HERE>
    ```
  </TabItem>
  <TabItem value="testnet" label="Lisk Sepolia" default>
    ```bash
    cast call <DEPLOYED_CONTRACT_ADDRESS> --rpc-url https://rpc.sepolia-api.lisk.com "balanceOf(address)" <YOUR_ACCOUNT_ADDRESS_HERE>
    ```
  </TabItem>
</Tabs>

Dan responsnya: `0x0000000000000000000000000000000000000000000000000000000000000001` (`1` dalam format heksadesimal) — selamat, Anda berhasil meluncurkan kontrak dan mencetak NFT dengan Foundry!

Lihat token yang telah dicetak dalam panduan ini di [Blockscout explorer](https://sepolia-blockscout.lisk.com/token/0x108872F713A27bc22ca1db8CEefCAC8CbeDdF9E5).

Itu dia! Meskipun ini hanya permulaan, masih banyak hal yang dapat dipelajari tentang Foundry.  
Untuk semua hal tentang Foundry, kunjungi [Foundry book](https://book.getfoundry.sh/), atau bergabunglah dengan [dev chat](https://t.me/foundry_rs) atau [support chat](https://t.me/foundry_support) resmi di Telegram.
