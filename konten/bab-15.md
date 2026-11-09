Ringkasan per kelompok, tabel pivot, dan penggabungan tabel adalah pekerjaan harian analis. Slak menyediakan ketiganya dengan nama yang sama seperti pandas.

## 15.1 Groupby

```slak tanpa-jalan
const perKota = df.groupby("kota").agg({
  omzet: ["total", "sum"],              // nama_baru: [kolom, fungsi]
  transaksi: ["id_transaksi", "nunique"],
  rata2: ["total", "mean"],
  p90: ["total", "p90"]                 // persentil ke-90
}).sort_values("omzet", { ascending: false })
```

Fungsi agregasi: `sum`, `mean`, `median`, `min`, `max`, `count`, `size`, `nunique`, `std`, `var`, `first`, `last`, `mode`, `p10`…`p99`, atau fungsi buatan sendiri. Pintasan: `df.groupby("kota").sum()`, `.mean()`, `.size()`. Kelompok lebih dari satu kolom: `df.groupby(["kota", "kanal"])`.

`transform` menghitung nilai per kelompok tetapi tetap satu nilai per baris, misalnya porsi tiap transaksi dari total kotanya:

```slak tanpa-jalan
df.assign({ porsi: () => df.groupby("kota").transform("total", "share") })
```

## 15.2 Tabel pivot dan tabel silang

```slak tanpa-jalan
df.pivot_table({ index: "kategori", columns: "kanal", values: "total", aggfunc: "sum", margins: true })
df.crosstab("kota", "kanal")                        // frekuensi
sl.crosstab(df.kota, df.kanal, { normalize: "index" }) // persen per baris
```

`melt` melakukan kebalikannya: tabel lebar menjadi tabel panjang. Ini berguna untuk grafik dengan opsi `by`.

## 15.3 Menggabungkan tabel

```slak tanpa-jalan
const lengkap = penjualan.merge(produk, { on: "produk", how: "left" })
const gabung = sl.concat([data2023, data2024])
```

| `how`              | Hasil                               |
|--------------------|-------------------------------------|
| `"inner"` (bawaan) | Hanya kunci yang ada di kedua tabel |
| `"left"`           | Semua baris kiri, seperti VLOOKUP   |
| `"right"`          | Semua baris kanan                   |
| `"outer"`          | Semua baris dari keduanya           |

Kolom bernama sama yang bukan kunci diberi akhiran `_x` dan `_y`. Opsi `indicator: true` menambah kolom `_merge` untuk memeriksa asal tiap baris.

## 15.4 Deret waktu

```slak tanpa-jalan
const bulanan = df.resample("tanggal", "M").agg({ omzet: ["total", "sum"] })
const dgnTren = bulanan.assign({
  tren: () => bulanan.omzet.rolling(3).mean(),      // rata-rata bergerak
  tumbuh: () => bulanan.omzet.pct_change()          // persen perubahan
})
```

Kode frekuensi: `"D"` hari, `"W"` minggu (mulai Senin), `"M"` bulan, `"Q"` kuartal, `"Y"` tahun. Periode tanpa data tetap muncul dengan nilai 0 atau kosong, jadi grafik tidak melompat. Alat Series lainnya: `shift`, `diff`, `cumsum`, `ewm({ span })`, `expanding()`, dan `rank()`.

Pintasan untuk laporan pertumbuhan: `sl.analysis.growth(df, { date: "tanggal", value: "total" })` menghasilkan kolom `periode`, `pertumbuhan` (MoM), `pertumbuhan_yoy`, dan `kumulatif`.
