`sl.sql` (SQLite) nyaman untuk data sampai ratusan ribu baris. Untuk jutaan baris, atau berkas **Parquet**, Slak 1.5 menyediakan **DuckDB**: mesin SQL yang dirancang khusus untuk analisis. Di uji kami, 200 ribu baris CSV dirangkum per kota dalam sekitar 40 milidetik di jendela Database.

## 31.1 Memasang

```html
<script src="slak.js"></script>
<script src="slak-data.js"></script>
<script src="slak-duckdb.js"></script>   <!-- 240 KB -->
```

Mesin DuckDB-nya sendiri (sekitar 35 MB) diunduh sekali saat `sl.duckdb` pertama dipakai, lalu disimpan browser. **Di Slak Studio, DuckDB sudah tersedia tanpa internet**, termasuk ekstensi Parquet dan JSON. Ekspor HTML dari Studio menyertakan `slak-duckdb.js` otomatis bila kodemu memakainya.

## 31.2 Kueri pertama

```slak tanpa-jalan
// DataFrame sebagai tabel
const df = sl.dataset("penjualan")
const r = await sl.duckdb("SELECT kota, SUM(total) AS omzet FROM jual GROUP BY kota ORDER BY omzet DESC", { jual: df })
sl.dataframe(r)

// Berkas di folder aplikasi: cukup sebut namanya dalam tanda kutip
const besar = await sl.duckdb("SELECT kanal, COUNT(*) FROM 'transaksi_2024.parquet' GROUP BY kanal")
```

Hasilnya selalu DataFrame. Berkas dicari dengan cara yang sama seperti `read_csv` (Bab 28): folder proyek di Studio, berkas yang dibungkus, atau hosting.

![Satu juta transaksi dirangkum DuckDB](konten/gambar/satu-juta-transaksi-dirangkum-duckdb.png)

## 31.3 Parquet

Parquet menyimpan data per kolom dan terkompresi, biasanya 5 sampai 10 kali lebih kecil dari CSV dan jauh lebih cepat dibaca. Banyak dataset terbuka kini tersedia dalam Parquet.

```slak tanpa-jalan
const df = await sl.read_parquet("penjualan.parquet")
const pq = await sl.duckdb.to_file("SELECT * FROM jual", "jual.parquet", { jual: df })
sl.download_button("Unduh Parquet", pq, { file_name: "jual.parquet" })
```

## 31.4 Kapan memakai SQLite, kapan DuckDB

|                | `sl.sql` / `sl.sqlite` (SQLite)                                                     | `sl.duckdb` (DuckDB)                                 |
|----------------|-------------------------------------------------------------------------------------|------------------------------------------------------|
| Cocok untuk    | Data kecil sampai menengah, tabel yang sering diubah, aplikasi kasir dan inventaris | Analisis data besar, Parquet, ringkasan jutaan baris |
| Tanpa internet | Selalu                                                                              | Di Slak Studio; di halaman lain diunduh sekali       |
| Ukuran pustaka | 1 MB                                                                                | 240 KB + mesin 35 MB                                 |
| Gaya SQL       | SQLite + sebagian PostgreSQL                                                        | Sangat mirip PostgreSQL                              |

Aturan sederhananya: mulai dengan SQLite. Pindah ke DuckDB bila data lebih dari sekitar 500 ribu baris, bila kamu memakai Parquet, atau bila ringkasan terasa lambat.

## 31.5 Contoh: dasbor satu juta transaksi

Galeri contoh Slak Studio punya **Dasbor 1 Juta Transaksi**. DuckDB membuat sendiri sampai dua juta transaksi dengan `range(n)`, lalu merangkumnya setiap kali filter diubah: metrik, tren bulanan per kanal, omzet per kota, dan tombol simpan Parquet. Waktu hitungnya ditampilkan, jadi kamu bisa merasakan kecepatannya di komputermu sendiri.

![Dasbor 1 Juta Transaksi](konten/gambar/dasbor-1-juta-transaksi.png)

DuckDB juga ada di jendela Database (Bab 30): pilih **Koneksi baru › DuckDB**, lalu buka berkas CSV, Parquet, atau .duckdb. Isi berkas disalin ke memori, jadi bisa di-query dan diubah dengan cepat; simpan hasilnya lewat **Ekspor ke Parquet** atau CSV. Berkas .duckdb dibuka hanya-baca.

![DuckDB di jendela Database](konten/gambar/duckdb-di-jendela-database.png)
