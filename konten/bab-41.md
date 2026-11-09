Banyak perusahaan menyimpan data besar di gudang data cloud. Google BigQuery adalah salah satu yang paling umum, dan dataset publiknya (cuaca, transportasi, Stack Overflow, dan lain-lain) bagus untuk berlatih. Slak 1.8 bisa membukanya dari jendela Database Slak Studio dan memakainya di aplikasi lewat slak-bridge.

## 41.1 Menyambung dari Slak Studio

1.  Di Google Cloud Console, buat **service account**, beri peran **BigQuery Job User** dan **BigQuery Data Viewer**, lalu buat kunci **JSON** dan unduh berkasnya.

2.  Di Slak Studio, buka **Database › Koneksi baru › Google BigQuery**, klik **Pilih berkas kunci…**. ID proyek terisi dari kunci.

3.  Biarkan **Dataset tambahan** berisi `bigquery-public-data.samples` untuk mencoba dataset publik, lalu **Simpan dan sambungkan**.

Dataset tampil sebagai skema di sebelah kiri. Klik tabel untuk melihat isinya; jumlah barisnya diambil dari metadata, jadi gratis. Kunci JSON disimpan terenkripsi seperti password.

## 41.2 Biaya per byte

BigQuery menagih menurut jumlah byte yang dibaca kueri, bukan jumlah baris hasilnya. Karena itu:

- Sebelum menjalankan kueri, konsol SQL menghitung **perkiraan byte** (dry run). Bila lebih dari 1 GB, Studio meminta konfirmasi.

- **Batas per kueri** di pengaturan koneksi (bawaan 10 GB) menolak kueri yang lebih besar.

- Setelah kueri jalan, tab Pesan menulis berapa yang diproses, misalnya "Diproses 2,5 MB", atau "dari cache, gratis".

- Pilih kolom yang perlu saja: `SELECT kota, omzet` jauh lebih murah daripada `SELECT *`. BigQuery Sandbox memberi 1 TB kueri gratis per bulan.

Tabel BigQuery tidak diedit langsung dari kisi data. Perintah INSERT, UPDATE, dan DELETE tetap bisa dijalankan di konsol SQL, dan juga ditagih per byte.

## 41.3 Memakai BigQuery di aplikasi

Kunci service account tidak boleh ada di halaman, jadi aplikasi memakai BigQuery lewat slak-bridge versi 1.8. Simpan berkas kunci di luar `public_html`, lalu tambahkan di pengaturan jembatan:

```php
'databases' => [
  'gudang' => ['type' => 'bigquery', 'key_file' => __DIR__ . '/../kunci-bigquery.json', 'dataset' => 'toko', 'max_gb' => 10],
],
'mode' => 'queries',
'queries' => [
  'omzet_kota' => 'SELECT kota, SUM(total) AS omzet FROM penjualan WHERE EXTRACT(YEAR FROM tanggal) = :tahun GROUP BY kota',
],
```

```slak tanpa-jalan
const db = sl.connection("gudang", { type: "bridge", url: "slak-bridge.php", database: "gudang" })
const tahun = sl.selectbox("Tahun", [2023, 2024])
sl.bar_chart(await db.run("omzet_kota", { tahun }), { x: "kota", y: "omzet" })
```

Parameter `:tahun` diubah otomatis menjadi parameter BigQuery `@tahun`, jadi nilainya tidak pernah ditempel ke teks SQL. `max_gb` menjaga satu kueri tidak memproses lebih dari batas itu. Mode `queries` paling aman untuk BigQuery, karena pengunjung hanya bisa menjalankan kueri yang kamu tulis. Jembatan versi Node.js (`slak-bridge.js`) memakai pengaturan yang sama, tanpa pustaka tambahan.
