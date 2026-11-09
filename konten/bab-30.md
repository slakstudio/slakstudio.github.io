Slak Studio 1.5 punya jendela Database: tempat membuka, menjelajah, dan mengubah isi tujuh jenis database tanpa menulis kode. Bukalah dengan tombol **Database** di bilah kiri, menu **Alat › Database**, atau Ctrl+Shift+D.

![Jendela Database: pilihan koneksi](konten/gambar/jendela-database-pilihan-koneksi.png)

## 30.1 Database yang didukung

| Jenis                            | Cara menyambung                               | Catatan                                                            |
|----------------------------------|-----------------------------------------------|--------------------------------------------------------------------|
| SQLite                           | Pilih berkas .db atau buat berkas baru        | Perubahan langsung tersimpan ke berkas                             |
| Penyimpanan aplikasi (IndexedDB) | Otomatis, selalu ada di daftar                | Data `sl.db` dan `sl.sqlite({ name })` milik aplikasi di pratinjau |
| PostgreSQL                       | Isian atau alamat koneksi (URI)               | Pilihan siap pakai **Supabase** dan **Neon**; SSL didukung         |
| MySQL dan MariaDB                | Server, port, pengguna, password              | Termasuk database di hosting cPanel (aktifkan Remote MySQL)        |
| Microsoft SQL Server             | Server, port atau instance, pengguna          | Termasuk SQL Server Express                                        |
| DuckDB                           | Pilih berkas .duckdb, CSV, Parquet, atau JSON | Untuk analisis data besar; lihat Bab 31                            |

Password koneksi tidak pernah ditulis polos. Slak Studio menyimpannya terenkripsi oleh sistem operasi, atau menanyakannya setiap kali bila kamu memilih **Jangan simpan password**.

## 30.2 Melihat dan mengubah data

Klik nama tabel untuk membukanya. Data tampil per halaman 200 baris. Klik judul kolom untuk mengurutkan, dan tulis kondisi di kotak **Saring** (misalnya `harga > 10000`) lalu tekan Enter.

1.  Klik dua kali sel untuk mengubahnya. Enter untuk selesai, Esc untuk batal.

2.  **+ Baris** menambah baris baru. Kolom yang diisi otomatis oleh database ditandai *(otomatis)*.

3.  Klik nomor baris untuk memilihnya (Ctrl+klik untuk beberapa baris), lalu **Hapus baris**.

4.  Perubahan ditandai warna dan belum dikirim. Tekan **Lihat SQL** untuk melihat perintah UPDATE, INSERT, dan DELETE yang akan dijalankan.

5.  Tekan **Simpan** (Ctrl+S). Semua perubahan dijalankan dalam **satu transaksi**: bila satu gagal, semuanya dibatalkan.

![Mengubah data PostgreSQL: sel kuning diubah, baris hijau baru](konten/gambar/mengubah-data-postgresql-sel-kuning-diubah-baris.png)

Tabel tanpa kunci utama (primary key) hanya bisa dilihat, supaya satu perubahan tidak mengenai banyak baris sekaligus. Pengecualiannya SQLite, yang memakai `rowid` bawaannya.

## 30.3 Tab SQL

Klik kanan koneksi lalu **SQL baru**, atau tekan Ctrl+T. Ketik kueri dan tekan **Ctrl+Enter**; bila ada teks terpilih, hanya bagian itu yang dijalankan. Nama tabel dan kolom muncul sebagai saran saat mengetik. Banyak pernyataan sekaligus menghasilkan banyak tab hasil.

![Tab SQL dengan dua hasil kueri](konten/gambar/tab-sql-dengan-dua-hasil-kueri.png)

Kueri berisiko (`DROP TABLE`, `TRUNCATE`, `DELETE` atau `UPDATE` tanpa `WHERE`) selalu meminta konfirmasi dulu. Tombol **Riwayat** menyimpan 80 kueri terakhir, dan **Uji portabel** memeriksa apakah kuerimu juga jalan di PostgreSQL.

## 30.4 Diagram relasi

Tombol **Diagram** menggambar tabel beserta kolomnya. Garis menunjukkan kunci asing (foreign key), misalnya `penjualan.produk_id` yang merujuk ke `produk.id`. Kotak bisa digeser, posisinya diingat, dan diagram bisa disimpan sebagai SVG untuk laporan.

![Diagram relasi tabel](konten/gambar/diagram-relasi-tabel.png)

## 30.5 Impor, ekspor, dan salin

- **Impor**: CSV, Excel, atau JSON ke tabel baru atau tabel yang sudah ada. Tipe kolom ditebak dari isinya dan bisa diubah sebelum disimpan.

- **Ekspor**: klik kanan tabel untuk menyimpannya sebagai CSV, Excel, perintah SQL (INSERT), atau Parquet (DuckDB).

- **Salin ke koneksi lain**: misalnya dari MySQL di hosting ke berkas SQLite, atau dari SQL Server ke PostgreSQL.

![SQL Server di jendela Database](konten/gambar/sql-server-di-jendela-database.png)

## 30.6 Memakai data di aplikasi

Klik kanan tabel › **Pakai di kode Slak** memberi potongan kode siap tempel, misalnya `const db = await sl.sqlite("toko.db")`.

Sejak Slak 1.6, aplikasi di browser bisa membaca MySQL, MariaDB, dan PostgreSQL di hosting lewat `slak-bridge.php`: klik kanan koneksi › **Pakai di kode Slak** › **Buat slak-bridge.php** (Bab 33). SQL Server belum didukung jembatan. Pilihan lain yang tidak butuh server sama sekali: **Ambil salinan untuk aplikasi**, yang menyimpan datanya sebagai CSV, CSV yang dibungkus (`.csv.js`, tetap jalan saat dibuka dengan klik dua kali), atau berkas SQLite. Taruh berkas itu di folder aplikasimu, lalu baca dengan kode yang ditampilkan.
