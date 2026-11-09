Slak 1.2 menyertakan **SQLite** sungguhan lewat `slak-sql.js` (sekitar 1 MB). Mesinnya (WebAssembly) disisipkan di dalam berkas, jadi SQL tetap berjalan saat halaman dibuka dengan klik dua kali, tanpa server database. Kueri yang kamu tulis di sini sama dengan yang dipakai di tempat kerja.

```html
<script src="slak.js"></script>
<script src="slak-data.js"></script>
<script src="slak-sql.js"></script>
```

## 17.1 Kueri atas DataFrame

```slak
const df = sl.dataset("penjualan")
const hasil = await sl.sql(`
  SELECT kota, COUNT(*) AS transaksi, SUM(total) AS omzet
  FROM penjualan
  GROUP BY kota
  ORDER BY omzet DESC
`, { penjualan: df })
sl.dataframe(hasil)
```

Argumen kedua memberi nama tabel untuk setiap DataFrame atau larik objek. Hasilnya DataFrame, jadi bisa langsung ditampilkan, digambar, atau diolah lagi. Tabel hanya dimuat ulang ke SQLite bila isinya berubah, sehingga jalan ulang berikutnya cepat.

![Aplikasi SQL: kueri di kotak teks, hasil tabel, dan grafik batang](konten/gambar/aplikasi-sql-kueri-di-kotak-teks-hasil-tabel-dan.png)

## 17.2 Parameter dari widget

Jangan menyambung nilai widget langsung ke teks SQL. Gunakan parameter:

```slak tanpa-jalan
const kota = sl.selectbox("Kota", df.unique("kota"))
await sl.sql("SELECT * FROM t WHERE kota = :kota", { t: df }, { params: { kota } })
await sl.sql("SELECT * FROM t WHERE total > ?", { t: df }, { params: [100000] })
```

## 17.3 SQL tingkat menengah

SQLite 3.54 mendukung CTE (`WITH`), window function, `JOIN`, `CASE`, subkueri, dan fungsi tanggal. Fungsi statistik `stdev`, `variance`, `median`, `lower_quartile`, dan `upper_quartile` juga tersedia.

```sql
WITH bulanan AS (
  SELECT strftime('%Y-%m', tanggal) AS bulan, kota, SUM(total) AS omzet
  FROM penjualan GROUP BY 1, 2
)
SELECT bulan, kota, omzet,
       RANK() OVER (PARTITION BY bulan ORDER BY omzet DESC) AS peringkat,
       omzet - LAG(omzet) OVER (PARTITION BY kota ORDER BY bulan) AS selisih,
       SUM(omzet) OVER (PARTITION BY kota ORDER BY bulan) AS kumulatif
FROM bulanan
```

Tanggal dikirim ke SQLite sebagai teks `YYYY-MM-DD`, sehingga `strftime`, `date`, dan perbandingan seperti `tanggal >= '2024-01-01'` bekerja. Kolom hasil yang berisi tanggal otomatis kembali menjadi tanggal.

## 17.4 Database SQLite sendiri

```slak
const db = await sl.sqlite({ name: "tokoku" })      // tersimpan di browser
db.query("CREATE TABLE IF NOT EXISTS log (id INTEGER PRIMARY KEY, isi TEXT)")
if (sl.button("Tambah")) db.query("INSERT INTO log (isi) VALUES (?)", ["halo"])
sl.dataframe(db.query("SELECT * FROM log"))
```

| Perintah                            | Fungsi                                                                          |
|-------------------------------------|---------------------------------------------------------------------------------|
| `await sl.sqlite({ name })`         | Database yang tersimpan permanen di browser (IndexedDB)                         |
| `await sl.sqlite(berkas)`           | Membuka berkas `.db` atau `.sqlite` dari `file_uploader`, nama berkas, atau URL |
| `db.query(sql, params)`             | Menjalankan SQL; SELECT mengembalikan DataFrame                                 |
| `db.insert("tabel", df)`            | Memasukkan DataFrame ke tabel (`{ if_exists: "replace" }` untuk menimpa)        |
| `db.tables()`, `db.schema("tabel")` | Daftar tabel dan struktur kolom                                                 |
| `db.export()`, `db.blob()`          | Isi database sebagai berkas `.db` untuk diunduh                                 |

Contoh membuka database contoh terkenal seperti Chinook:

```slak
const f = sl.file_uploader("Berkas .db", { type: ["db", "sqlite"] })
if (f) {
  const db = await sl.sqlite(f)
  sl.dataframe(db.tables())
  sl.dataframe(db.query("SELECT * FROM artists LIMIT 10"))
}
```

`sl.sql()` dan `sl.sqlite()` cocok untuk menganalisis dan berlatih. Untuk data yang harus dibagi antar-pengunjung di internet, pakai `slak-bridge.php` atau libSQL/Turso lewat `sl.connection` (Bab 33).
