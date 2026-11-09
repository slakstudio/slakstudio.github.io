Slak 1.2 menambahkan **Slak Data** (`slak-data.js`), alat analisis data yang namanya dibuat mirip pandas. Inti alat ini adalah **DataFrame**: tabel yang setiap kolomnya punya nama dan tipe. Semua berjalan di browser, termasuk saat halaman dibuka dengan klik dua kali.

> **Aturan satu kalimat: `sl.` atau nama tabel?** Awalan **`sl.`** dipakai untuk *menyuruh Slak*: menampilkan sesuatu, membuat widget, atau memuat data (`sl.bar_chart(df)`, `sl.slider(...)`, `sl.read_csv(...)`). **Nama tabel** dipakai untuk *mengolah tabel itu* (`df.groupby(...)`, `df.query(...)`). Nama `df` hanyalah kebiasaan; tabelmu boleh bernama `penjualan`, lalu ditulis `penjualan.groupby("kota")`. Bila awalannya tertukar, misalnya `sl.groupby(...)` atau `df.bar_chart(...)`, Slak memberi pesan yang menunjuk tulisan yang benar.

## 14.1 Memasang

Tambahkan satu baris sesudah `slak.js`. Di Slak Studio berkas ini sudah otomatis tersedia, dan ikut disertakan saat ekspor bila kodemu memakainya.

```html
<script src="slak.js"></script>
<script src="slak-data.js"></script>
```

## 14.2 Memuat data

| Sumber          | Perintah                                                               |
|-----------------|------------------------------------------------------------------------|
| Dataset contoh  | `sl.dataset("penjualan")`                                              |
| CSV atau TSV    | `await sl.read_csv("data.csv")`                                        |
| Excel (.xlsx)   | `await sl.read_excel("data.xlsx", { sheet: "Penjualan" })`             |
| JSON            | `await sl.read_json("data.json")`                                      |
| Google Sheets   | `await sl.read_sheets("https://docs.google.com/spreadsheets/d/…")`     |
| Berkas unggahan | `const f = sl.file_uploader("Data"); if (f) df = await sl.read_csv(f)` |
| Larik objek     | `sl.DataFrame([{ nama: "Ani", nilai: 90 }])`                           |

Nama berkas dibaca dengan urutan ini: data yang disematkan di halaman, berkas di folder skrip (di Slak Studio), lalu alamat web. Saat halaman dibuka dengan klik dua kali, browser melarang membaca berkas lain di komputer. Karena itu, simpan skrip di folder yang sama dengan datanya dan ekspor lewat Slak Studio: datanya otomatis disematkan.

Dataset contoh berisi data sintetis kecuali `iris`:

| Nama                | Isi                                        | Cocok untuk                            |
|---------------------|--------------------------------------------|----------------------------------------|
| `penjualan`         | 3.000-an transaksi toko di Papua 2023–2024 | EDA, groupby, deret waktu, kohort, RFM |
| `penjualan_bulanan` | Omzet bulanan 2019–2024                    | Dekomposisi dan peramalan              |
| `kunjungan_harian`  | Kunjungan situs harian, dua tahun          | Rolling, resample                      |
| `pelanggan`         | 1.000 pelanggan dan status churn           | Klasifikasi, regresi logistik          |
| `ab_test`           | Eksperimen checkout, 4.000 pengunjung      | Uji A/B                                |
| `karyawan`          | 300 karyawan dan gajinya                   | Regresi berganda, ANOVA                |
| `nilai_ujian`       | Nilai 90 siswa sebelum dan sesudah         | Uji-t berpasangan, ANOVA               |
| `data_kotor`        | Pesanan yang sengaja berantakan            | Latihan pembersihan                    |
| `iris`              | Data bunga Fisher (1936), data asli        | Klasifikasi, klaster                   |

## 14.3 Format Indonesia dikenali

- Pemisah `;` dan desimal koma: `1.250.000,50` menjadi 1250000.5.

- Tanggal `31/12/2024`, `31-12-2024`, `2024-12-31`, dan `5 Januari 2024`. Bila ragu, Slak menganggap hari ditulis lebih dulu.

- Teks harga `"Rp 1.250.000"` diubah dengan `to_numeric`.

- Nilai `NA`, `-`, `null`, dan sel kosong dianggap kosong.

Opsi `read_csv` yang paling sering dipakai: `sep`, `decimal`, `dtype` (memaksa tipe kolom), `parse_dates`, `skiprows`, `nrows`, dan `usecols`.

## 14.4 Mengenal data

```slak
const df = sl.dataset("penjualan")
sl.write(df.head())        // 5 baris pertama
sl.write(df.shape)         // [jumlah baris, jumlah kolom]
sl.write(df.info())        // tipe, terisi, kosong, unik per kolom
sl.write(df.describe())    // statistik ringkas kolom angka
sl.write(df.missing())     // nilai kosong per kolom
sl.write(df.value_counts("kota"))
```

Kolom dibaca dengan `df.kota` atau `df["nama kolom"]` dan hasilnya **Series**: `df.total.sum()`, `.mean()`, `.median()`, `.std()`, `.quantile(0.9)`, `.nunique()`. Jika nama kolom sama dengan nama perintah (misalnya kolom bernama `count`), gunakan `df.col("count")`.

## 14.5 Menyaring dan mengurutkan

```slak tanpa-jalan
df.query("total > 200000 and kota in ['Jayapura', 'Sorong']")
df.query("month(tanggal) == 12")
df.query("total >= @minimal", { minimal })      // nilai dari widget
df.filter(r => r.kanal === "Online")             // fungsi per baris
df.filter(df.total.gt(100000))                   // Series benar/salah
df.sort_values("total", { ascending: false }).head(10)
df.select(["kota", "total"])
```

Ekspresi `query` mendukung `and`, `or`, `not`, `in [...]`, `between ... and ...`, `is null`, aritmetika, nama kolom berspasi dalam tanda `` ` ``, serta fungsi `contains`, `startswith`, `lower`, `year`, `month`, `quarter`, `isna`, dan `len`.

## 14.6 Membersihkan data

```slak
let df = sl.dataset("data_kotor")
df = df.strip_strings()                                        // spasi berlebih
df = df.assign({ kota: () => df.kota.str.title() })            // huruf besar-kecil
df = df.to_numeric("harga").to_datetime("tanggal")            // teks ke angka/tanggal
df = df.drop_duplicates().fillna({ jumlah: 1 })
df = df.remove_outliers("harga")                               // metode IQR
```

| Masalah               | Perintah                                                                              |
|-----------------------|---------------------------------------------------------------------------------------|
| Nama kolom tidak rapi | `df.clean_names()`                                                                    |
| Nilai kosong          | `dropna()`, `fillna(nilai | {kolom: nilai} | "mean" | "ffill")`, `interpolate()`      |
| Duplikat              | `duplicated()`, `drop_duplicates({ subset })`                                         |
| Tipe salah            | `astype({ kolom: "int" })`, `to_numeric`, `to_datetime`                               |
| Pencilan              | `outliers(kolom)`, `remove_outliers`, `cap_outliers`                                  |
| Teks                  | `.str.lower()`, `.str.title()`, `.str.replace()`, `.str.contains()`, `.str.extract()` |
| Kelompok angka        | `sl.cut(df.umur, [0, 25, 40, 60])`, `sl.qcut(df.total, 4)`                            |

Setiap perintah menghasilkan DataFrame baru, jadi data asli tidak berubah. Tulis hasilnya ke variabel lagi, seperti contoh di atas.

## 14.7 Menambah kolom

```slak tanpa-jalan
df.assign({
  pajak: r => r.total * 0.11,               // fungsi per baris
  bulan: () => df.tanggal.dt.month,         // Series
  kelas: () => sl.cut(df.total, [0, 50000, 200000, Infinity], { labels: ["kecil", "sedang", "besar"] })
})
```

Bagian tanggal tersedia lewat `.dt`: `year`, `month`, `day`, `quarter`, `week`, `weekday` (0 = Senin), `day_name()` ("Senin"), `month_name()` ("Januari"), `strftime("%Y-%m")`, dan `to_period("M")`.

## 14.8 Menyimpan dan mengunduh

```slak tanpa-jalan
sl.download_button("Unduh CSV", df, { file_name: "bersih.csv" })
sl.download_button("Unduh Excel", { Data: df, Ringkasan: ringkas }, { file_name: "laporan.xlsx" })
```

Nama berkas menentukan formatnya: `.csv`, `.xlsx`, `.json`, atau `.md`. Berkas Excel dibuat tanpa pustaka tambahan, lengkap dengan baris judul yang dibekukan dan filter otomatis. `df.to_csv({ sep: ";", decimal: "," })` menghasilkan CSV gaya Indonesia.
