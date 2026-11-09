Slak 1.3.2 lahir dari uji beban dengan data nyata: penjualan minuman negara bagian Iowa tahun 2021 (24 kolom) dan 1,5 juta perjalanan Uber di New York tahun 2014. Bab ini merangkum seberapa jauh Slak bisa dibawa, cara menjaga aplikasimu tetap cepat, dan cara membuka data saat halaman dibuka dengan klik dua kali.

## 28.1 Seberapa besar data yang nyaman?

Angka berikut diukur di Chromium. Di laptop biasa angkanya bisa lebih lambat, jadi anggap sebagai gambaran kasar.

| Ukuran data (24 kolom) | Baca CSV    | groupby     | SQL pertama | Rasanya                     |
|------------------------|-------------|-------------|-------------|-----------------------------|
| 50 ribu baris          | 0,4–0,6 dtk | 0,1–0,2 dtk | 0,3 dtk     | Seketika                    |
| 250 ribu baris         | 2–3 dtk     | 0,2–0,5 dtk | 0,6 dtk     | Nyaman                      |
| 500 ribu baris         | 4–5 dtk     | 0,4–1,2 dtk | 1,7 dtk     | Masih bisa dipakai          |
| 1 juta baris           | 11–12 dtk   | 1–2 dtk     | 3,6 dtk     | Lambat, memori sekitar 1 GB |

Aturan praktis: sampai sekitar **250 ribu baris** aplikasimu terasa ringan di laptop yang cepat. Untuk pengunjung dengan laptop murah atau HP, batas resmi sejak Slak 1.6 adalah 100 ribu baris (lihat Bab 32). Di atas itu, siapkan data lebih dulu (lihat 28.2). Kolom yang sedikit jauh lebih ringan: 1,5 juta baris data Uber yang hanya 3 kolom terbaca dalam sekitar 4 detik.

## 28.2 Kebiasaan yang membuat aplikasi tetap cepat

1.  **Baca data sekali saja.** `read_csv` menyimpan hasilnya selama halaman terbuka, jadi jalan ulang tidak membaca berkas lagi.

2.  **Saring dulu, baru tampilkan.** `sl.dataframe` hanya menggambar 1.000 baris pertama, tetapi grafik menggambar semua titik. Kelompokkan dulu (`groupby`, `resample`) sebelum membuat grafik.

3.  **Sebut kolom di SQL.** `sl.sql` hanya memuat kolom yang disebut kuerinya. `SELECT kota, SUM(total) ...` jauh lebih cepat daripada `SELECT *` pada tabel lebar.

4.  **Buang kolom yang tidak dipakai** dengan `df.select([...])` sebelum diolah lebih jauh.

5.  **Untuk lebih dari 1 juta baris**, ringkas datanya dengan DuckDB (Bab 31), atau di Excel atau Python lebih dulu, lalu bawa hasil ringkasannya ke Slak.

```slak tanpa-jalan
const semua = await sl.read_csv("penjualan.csv")
const df = semua.select(["tanggal", "kota", "kategori", "total"])   // 4 kolom saja
const bulanan = df.resample("tanggal", "M").agg({ omzet: ["total", "sum"] })
sl.line_chart(bulanan, { x: "tanggal", y: "omzet" })                  // 12 titik, bukan 250 ribu
```

Grafik sebar dengan ratusan ribu titik tetap ringan karena Slak menggambarnya sebagai satu gambar. Sumbunya mengikuti rentang data. Untuk grafik garis yang nilainya jauh dari nol, tambahkan `{ zero: false }`.

## 28.3 Membaca berkas saat dibuka dengan klik dua kali

Browser melarang halaman yang dibuka dengan klik dua kali membaca berkas lain di komputer. Tetapi halaman itu masih boleh memuat berkas JavaScript. Slak memanfaatkannya, sehingga kode `await sl.read_csv("penjualan.csv")` **tidak perlu diubah**. Slak mencari datanya berurutan:

1.  **Berkas yang dibungkus**, yaitu `penjualan.csv.js` di folder yang sama. Buat lewat menu **Alat › Bungkus data** di Slak Studio, atau buka `bungkus.html` dari paket Slak.

2.  **Data di dalam halaman**, misalnya `<script type="text/csv" id="penjualan.csv">`. Ekspor HTML Slak Studio memakai cara ini.

3.  **Folder proyek**, saat kodemu dijalankan di Slak Studio.

4.  **Hosting atau server lokal**, dengan cara biasa.

5.  **Tombol pilih berkas.** Bila semua gagal, Slak meminta pengguna memilih berkasnya sekali dan mengingatnya di browser itu. Tombol kecil "ganti" di pojok kiri bawah dipakai untuk memilih berkas lain.

Membungkus data cocok sampai sekitar 20–50 MB. Untuk berkas yang lebih besar, pakai tombol pilih berkas atau unggah ke hosting.

## 28.4 Peta di luar Indonesia

Peta Slak membawa batas wilayah Indonesia. Untuk titik di negara lain, tambahkan satu berkas:

```html
<script src="slak-peta.js"></script>
<script src="slak-peta-dunia.js"></script>
```

Berkas ini (sekitar 600 KB, tanpa internet) berisi batas 242 negara dan batas negara bagian atau provinsi untuk AS, Kanada, Brasil, Australia, Rusia, India, Tiongkok, dan Afrika Selatan, dari Natural Earth yang berstatus domain publik. Slak Studio menyertakannya otomatis saat peta memakai koordinat. Bila ingin peta jalan dan bangunan, pakai `{ tiles: "osm" }`. Saat internet putus, peta luring tetap tampil di bawahnya.
