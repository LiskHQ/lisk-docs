---

judul: Pengindeks Data  
slug: /lisk-tools/indexers  
description: "Pengantar singkat untuk semua pengindeks yang terhubung dengan Lisk L2."  
keywords: [  
    "pengindeks",  
    "pengindeks data",  
    "Lisk",  
    "jaringan test Lisk",  
    "Lisk testnet",  
    "Goldsky",  
    "Solidity",  
    "Mirror",  
    "Subgraph"  
]  

---

# Pengindeks Data

## Goldsky

[Goldsky](https://goldsky.com/) adalah pengindeks data pilihan untuk pembangun web3, yang menawarkan hosting subgraph berkinerja tinggi dan saluran replikasi data secara real-time.
Goldsky membaca, mengedit, dan menyinkronkan data blockchain yang baru dan memungkinkan Anda menghubungkan informasi ini ke dalam kode Anda.  
Blockchain Lisk diindeks oleh Goldsky.

Goldsky terdiri dari dua komponen utama:

- [Subgraph](https://docs.goldsky.com/introduction#subgraphs): Ini adalah pendekatan pengindeksan subgraph yang sepenuhnya kompatibel dengan versi sebelumnya yang ditawarkan oleh Goldsky.  
Untuk meningkatkan keandalan dan kinerja, proses pengindeksan inti menggunakan lapisan pemrosesan WASM yang sama bersama dengan lapisan RPC yang ditulis ulang, lapisan kueri yang dapat diskalakan secara otomatis, dan optimasi penyimpanan.  
Dukungan untuk webhook untuk notifikasi, pesan, dan kasus penggunaan terkait lainnya juga disertakan.

- [Mirror](https://docs.goldsky.com/introduction#mirror): Dengan hanya satu file definisi `.yaml`, Anda dapat menggunakan Mirror, teknologi saluran data tanpa server, untuk memperoleh data secara real-time ke dalam basis data Anda.
Data didorong ke antrean atau penyimpanan data Anda, di mana data tersebut dapat dipertanyakan tanpa batasan laju eksternal, bersama dengan data yang sudah ada.  
Goldsky menerima instruksi dari saluran mirror tentang dari mana mendapatkan data: [sumber](https://docs.goldsky.com/mirror/sources/supported-sources), bagaimana memprosesnya (opsional), dan di mana menyimpan hasilnya: [tempat penyimpanan](https://docs.goldsky.com/mirror/sinks/supported-sinks).
