Slak memakai SQLite supaya semua berjalan tanpa server. Di dunia kerja, data analyst paling sering bertemu PostgreSQL. Sebagian besar SQL keduanya sama persis; bedanya ada di beberapa fungsi tanggal dan teks. Sejak 1.3.1, Slak memahami gaya PostgreSQL itu, sehingga kueri yang sama bisa dipindah apa adanya.

| Kebutuhan                     | Gaya SQLite (hindari)    | Gaya PostgreSQL (dipakai di Slak)                |
|-------------------------------|--------------------------|--------------------------------------------------|
| Kelompok per bulan            | `strftime('%Y-%m', tgl)` | `date_trunc('month', tgl)`                       |
| Ambil tahun                   | `strftime('%Y', tgl)`    | `EXTRACT(YEAR FROM tgl)`                         |
| Ganti nilai kosong            | `IFNULL(x, 0)`           | `COALESCE(x, 0)`                                 |
| Gabung teks                   | `GROUP_CONCAT(x)`        | `string_agg(x, ', ')`                            |
| Median                        | `median(x)`              | `percentile_cont(0.5) WITHIN GROUP (ORDER BY x)` |
| Ubah tipe                     | `CAST(x AS INTEGER)`     | `x::int` (keduanya boleh)                        |
| Tambah satu bulan             | `date(tgl, '+1 month')`  | `tgl + INTERVAL '1 month'`                       |
| Cari tanpa peduli huruf besar | `LIKE`                   | `ILIKE`                                          |

Fungsi gaya PostgreSQL lain yang dikenali: `date_part`, `to_char`, `now()`, `mode() WITHIN GROUP`, `stddev`, `variance`, `corr`, `greatest`, `least`, `split_part`, `initcap`, `strpos`, `left`, `right`, dan `regexp_replace`. CTE, window function, dan `FILTER (WHERE ...)` memang sudah sama di keduanya.

## 27.1 Mode portabel

```slak tanpa-jalan
const bulanan = await sl.sql(`
  SELECT date_trunc('month', tanggal) AS bulan,
         SUM(total) AS omzet,
         percentile_cont(0.5) WITHIN GROUP (ORDER BY total) AS median_transaksi
  FROM jual
  GROUP BY 1
  ORDER BY 1
`, { jual: df }, { portable: true })
```

Dengan `{ portable: true }`, Slak memperingatkan bila kueri memakai sintaks khusus SQLite. Peringatannya juga menyebut padanan PostgreSQL-nya. Pilihan lain: `sl.set_option("sql.portable", true)` untuk seluruh aplikasi, atau `portable: "error"` agar kueri seperti itu langsung ditolak. `sl.sql.check(kueri)` mengembalikan daftar masalahnya sebagai tabel, dan menu **Alat › Uji portabel SQL ke PostgreSQL** di Slak Studio memeriksa semua kueri di kodemu sekaligus.

## 27.2 sl.connection

Kode Streamlit yang memakai `st.connection` bisa dipindah dengan sedikit perubahan:

```slak tanpa-jalan
const conn = sl.connection("toko", { type: "sql" })          // SQLite tersimpan di browser
const stok = await conn.query("SELECT * FROM barang WHERE stok < :batas", { params: { batas: 5 }, ttl: 60 })
```

`url` mengarah ke berkas .db bila ingin membuka database yang sudah ada. Koneksi ke MySQL, MariaDB, dan PostgreSQL di server akan tersedia lewat `slak-bridge.php` di Slak 1.6.
