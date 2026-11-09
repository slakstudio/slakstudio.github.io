Slak 1.2 menambah lima jenis grafik ke `slak.js` dan memperkaya grafik lama. Semua grafik menerima DataFrame, larik objek, atau objek kolom, dan bisa diunduh sebagai **PNG** atau **SVG**: arahkan kursor ke grafik, lalu klik tombol di pojok kanan atas.

![Galeri grafik Slak 1.2: kombinasi batang dan garis, batang horizontal bersyarat, garis per kota, sebar dengan garis tren, histogram, box plot, donut, heatmap korelasi, sumbu tanggal, dan tabel berformat](konten/gambar/galeri-grafik-slak-1-2-kombinasi-batang-dan-gari.png)

## 16.1 Memilih grafik

| Pertanyaan                     | Grafik            | Contoh                                                                      |
|--------------------------------|-------------------|-----------------------------------------------------------------------------|
| Bagaimana sebaran nilainya?    | Histogram         | `sl.histogram(df, { x: "total", bins: 20 })`                                |
| Apakah kelompok berbeda?       | Box plot          | `sl.box_plot(df, { y: "gaji_juta", by: "pendidikan" })`                     |
| Apakah X berhubungan dengan Y? | Sebar + tren      | `sl.scatter_chart(df, { x, y, trendline: true })`                           |
| Berapa porsi tiap bagian?      | Pie/donut         | `sl.pie_chart(df, { names: "kategori", values: "total", donut: true })`     |
| Pola dua dimensi, korelasi     | Heatmap           | `sl.heatmap(df.corr())`                                                     |
| Jumlah dan rasio sekaligus     | Kombinasi         | `sl.combo_chart(df, { x: "bulan", bar: "omzet", line: "margin" })`          |
| Peringkat kategori             | Batang horizontal | `sl.bar_chart(df, { x: "kota", y: "omzet", horizontal: true, sort: true })` |
| Tren waktu                     | Garis             | `sl.line_chart(df, { x: "tanggal", y: "omzet" })`                           |

## 16.2 Opsi baru untuk grafik garis, area, batang, dan sebar

| Opsi             | Fungsi                                                                                          |
|------------------|-------------------------------------------------------------------------------------------------|
| `by`             | Data panjang: satu seri per nilai kolom, misalnya `{ x: "bulan", y: "omzet", by: "kota" }`      |
| `horizontal`     | Batang mendatar (khusus `bar_chart`)                                                            |
| `sort`           | Urutkan batang: `true` atau `"desc"` dari terbesar, `"asc"` dari terkecil                       |
| `labels`         | Tampilkan nilai di atas batang atau titik                                                       |
| `format`         | `"rupiah"`, `"percent"`, `"percent:0"`, `"compact"` (1,2M), `"decimal:2"`, `"int"`, atau fungsi |
| `trendline`      | Garis tren regresi linear beserta R² di legenda                                                 |
| `color`          | Warna seri, larik warna, atau fungsi `(baris) => warna` untuk pewarnaan bersyarat               |
| `line`, `y2`     | Seri yang digambar sebagai garis di atas batang, dan apakah memakai sumbu kanan                 |
| `y_min`, `y_max` | Batas sumbu Y                                                                                   |
| `tooltip`        | Kolom tambahan yang ikut tampil saat kursor diarahkan                                           |

Jika kolom `x` berisi tanggal, sumbu menjadi sumbu waktu dan labelnya menyesuaikan: tahun, "Jan 2024", atau tanggal lengkap.

## 16.3 Contoh pewarnaan bersyarat

```slak tanpa-jalan
const target = 100_000_000
sl.bar_chart(perKota, {
  x: "kota", y: "omzet", horizontal: true, sort: true, labels: true, format: "compact",
  color: r => r.omzet >= target ? "var(--slak-green)" : "var(--slak-gray)"
})
```

Warna bisa ditulis dengan kode CSS apa saja. Variabel tema seperti `var(--slak-green)`, `var(--slak-red)`, dan `var(--slak-c1)` sampai `var(--slak-c8)` otomatis menyesuaikan tema terang dan gelap.

## 16.4 Tabel yang lebih mudah dibaca

```slak tanpa-jalan
sl.dataframe(df, { format: { omzet: "rupiah", margin: "percent" }, gradient: ["omzet"] })
```

`format` merapikan angka per kolom, dan `gradient` mewarnai sel dari muda ke tua sesuai nilainya. Opsi ini membantu tabel di portofolio terbaca seperti laporan.
