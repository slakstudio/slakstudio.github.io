# Slak 1.9.1

**Slak** adalah framework untuk membuat aplikasi data dan antarmuka interaktif yang berjalan **sepenuhnya di browser**: tanpa server, tanpa Python, tanpa instalasi, tanpa build step. Cukup satu berkas `slak.js`.

Gaya penulisannya terinspirasi Streamlit. Kamu menulis skrip dari atas ke bawah, setiap widget langsung mengembalikan nilainya, dan saat pengguna mengubah widget, skrip dijalankan ulang. Seluruh kode Slak ditulis dari nol dalam JavaScript. Tidak ada kode sumber Streamlit yang disalin.

```html
<script src="slak.js"></script>
<script type="text/slak">
  sl.title("Halo, Slak!");
  const n = sl.slider("Angka", 0, 100, 25);
  sl.write(`Kuadratnya adalah **${n * n}**`);
</script>
```

Buka berkas HTML itu langsung di browser (klik dua kali). Tidak perlu server.

> **Catatan:** Slak 1.0 sampai 1.9 dikembangkan secara tertutup. Rilis publik pertama Slak adalah **1.9.1** (November 2026). Nomor versinya dipertahankan karena mencatat sejarah pengembangan dan karena sejak 1.9 API Slak sudah dibekukan (API-STABIL.md, KEBIJAKAN-VERSI.md). Versi-versi sebelumnya tidak diterbitkan sebagai unduhan resmi.

Asal nama, filosofi, dan cara Slak dibuat ada di [PENGAKUAN.md](PENGAKUAN.md). Penggunaan AI dalam pembuatan Slak dijelaskan di [AI-DISCLOSURE.md](AI-DISCLOSURE.md).


## Filosofi Slak: Write and Run

**Tulis, simpan, klik, dan langsung jalan.** Slak mengembalikan rasa web di masa awalnya: menulis kode di editor, menyimpannya sebagai berkas, mengklik dua kali, lalu melihat hasilnya di browser.

Setiap fitur Slak harus lolos enam aturan ini:

1. **Tulis lalu langsung jalan.** Tidak ada build, compile, transpile, atau `npm install`.
2. **Klik dua kali cukup.** Aplikasi bisa dibuka langsung dari berkas di komputer.
3. **Unggah cukup.** Untuk online, salin berkas ke hosting biasa (cPanel, GitHub Pages, Netlify) tanpa perintah terminal.
4. **Tanpa instalasi.** Tidak perlu memasang Node.js, Python, Docker, atau server database.
5. **Satu bahasa untuk pengguna.** Aplikasi ditulis dengan JavaScript Slak; bahasa lain hanya jika pengguna sendiri memilihnya.
6. **Bawaan yang masuk akal.** Fitur bekerja tanpa konfigurasi; pengaturan hanya untuk yang ingin lebih.

Aturan ini adalah janji pengembangan Slak. Fitur yang tidak bisa dibuat tanpa melanggarnya tidak ditambahkan diam-diam: alternatif yang setia pada *Write and Run* dicari lebih dulu, dan pengecualiannya dijelaskan secara terbuka.

---

## Isi paket

| Berkas | Keterangan |
|---|---|
| `slak.js` | Framework-nya (satu berkas, tanpa dependensi) |
| `contoh.html` | Contoh minimal: kalkulator tabungan |
| `demo.html` | Galeri semua fitur, dengan navigasi di sidebar |
| `playground/` | Editor langsung: tulis kode di kiri, hasilnya tampil di kanan. Sejak 1.9.1 di folder `playground/`; `playground.html` tinggal pengalihan untuk tautan lama |
| `contoh-kasir.html` | Contoh Slak 1.1: kasir multi-halaman dengan database dan editor tabel |
| `slak-data.js` | **Slak 1.2.** Analisis data: DataFrame, statistik, machine learning, deret waktu, analisis bisnis, dataset contoh (opsional) |
| `slak-sql.js` | **Slak 1.2.** SQL sungguhan (SQLite WebAssembly, sudah tersisip di berkas) (opsional) |
| `contoh-analisis.html` | Contoh Slak 1.2: dasbor analisis penjualan dengan DataFrame, SQL, statistik, dan peramalan |
| `slak-peta.js` | **Slak 1.3.** Peta: titik, gelembung, klaster, heatmap, rute, choropleth; batas 38 provinsi dan titik tengah 514 kab/kota (opsional) |
| `slak-peta-kab.js` | **Slak 1.3.** Batas poligon 514 kab/kota untuk choropleth tingkat kab/kota (opsional, dimuat otomatis) |
| `contoh-peta.html` | Contoh Slak 1.3: peta penjualan (gelembung, choropleth, rute) |
| `contoh-stok-sqlite.html` | Contoh Slak 1.3: tabel SQLite yang bisa diedit dan disimpan |
| `contoh-inventaris.html` | Contoh Slak 1.3: inventaris gudang multi-halaman (SQLite, target, analisis ABC, peta) |
| `slak-peta-dunia.js` | **Slak 1.3.2.** Batas negara dunia, plus provinsi/negara bagian AS, Kanada, Brasil, Australia, Rusia, India, Tiongkok, Afrika Selatan (opsional, luring) |
| `bungkus.html` | **Slak 1.3.2.** Alat kecil: bungkus berkas data menjadi `.js` supaya `read_csv` jalan saat dibuka dengan klik dua kali |
| `contoh-1-5.html` | **Slak 1.5.** Dasbor 1 juta transaksi dengan DuckDB (butuh internet saat pertama dibuka) |
| `slak-duckdb.js` | **Slak 1.5.** DuckDB: SQL analitik cepat untuk data besar dan berkas Parquet (`sl.duckdb`, `sl.read_parquet`). Mesinnya (±35 MB) diunduh saat pertama dipakai (opsional) |
| `contoh-1-4.html` | **Slak 1.4.** Kasir dengan login dan peran (ani / rahasia sebagai admin, budi / admin123 sebagai kasir) |
| `contoh-portofolio.html` | **Slak 1.6.** Templat portofolio data analyst: profil, keahlian, kontak, kartu proyek, dan halaman analisis |
| `slak-bridge.php` | **Slak 1.6.** Jembatan database opsional untuk hosting PHP/cPanel (MySQL/MariaDB, PostgreSQL, SQLite) |
| `slak-bridge.js` | **Slak 1.6.** Jembatan yang sama untuk server Node.js |
| `LICENSE` | **Slak 1.6.** Lisensi MIT untuk kode Slak, dengan terjemahan bahasa Indonesia |
| `DAFTAR-LISENSI.md` | **Slak 1.6.** Semua komponen beserta lisensinya dan syarat layanan pihak ketiga |
| `INTI-WAJIB.md` | **Slak 1.6.** Fitur inti per versi dan peta alat analis data |
| `contoh-1-7.html` | **Slak 1.7.** Tujuh halaman: templat dasbor penjualan, dasbor pelanggan dengan `sl.ml_demo`, laporan SQL (`sl.report`), komponen kustom, uji aplikasi (`sl.testing`), galeri komponen, dan tata letak `sl.layout` |
| `slak-komponen.js` | **Slak 1.7.** Galeri 10 komponen siap pakai untuk `sl.component("nama")`: rating, sketsa, rentang tanggal, kalender heatmap, kanban, titik di peta, editor kode, pengatur waktu, papan skor, tombol suara (opsional, 46 KB). Sumbernya per komponen di folder `komponen/` |
| `slak-test.html` | **Slak 1.7.** Menjalankan semua berkas uji `*.uji.slak` dan merangkum hasilnya |
| `PARITAS.md` | **Slak 1.7.** Daftar 104 perintah Streamlit dan padanannya di Slak, diperiksa otomatis dengan `sl.testing` |
| `index.html` | **Slak 1.8.** Beranda situs Slak: paket ini bisa langsung diunggah sebagai situs (GitHub Pages, Netlify, cPanel) |
| `manifest.webmanifest`, `sw.js`, `ikon*.png`, `ikon.svg`, `.nojekyll` | **Slak 1.8.** Membuat beranda dan playground bisa dipasang seperti aplikasi dan terbuka tanpa internet |
| `TERBIT-SITUS.md` | **Slak 1.9.1.** Menerbitkan paket ini sebagai situs resmi `slak.studio` dan salinan resminya `slakstudio.github.io` (menggantikan TERBIT-GITHUB-PAGES.md) |
| `API-STABIL.md` | **Slak 1.9.** Daftar 938 nama API yang dijamin tetap ada sampai Slak 2.0 (dibuat otomatis dari kode) |
| `KEBIJAKAN-VERSI.md` | **Slak 1.9.** Aturan nomor versi, apa yang dijamin, nama lama, dan masa dukungan |
| `RIWAYAT.md` | **Slak 1.9.** Ringkasan semua versi 1.0 sampai 1.9 dan perbaikan galat 1.9 |
| `slak-docs.js` | **Slak 1.9.1.** Berkas tambahan untuk situs dokumentasi (`Slak.docs`, versi 0.1): menu berkelompok, blok kode yang dijalankan, daftar isi, pencarian Ctrl+K, meta halaman (opsional, 15 KB) |
| `docs/` | **Slak 1.9.1.** Kerangka situs dokumentasi slak.studio dengan tiga bab Pengantar dari buku panduan, dan `TEMPLAT-BAB.html` untuk pratinjau tautan per bab |
| `.htaccess`, `robots.txt`, `sitemap.xml`, `apple-touch-icon.png`, `ikon-32.png` | **Slak 1.9.1.** Pengaturan hosting cPanel, mesin pencari, dan ikon Sl untuk situs |
| `Lisensi/` | Lisensi komponen pihak ketiga: sql.js, SQLite, geoBoundaries, Natural Earth, emojilib, Unicode CLDR, Material Symbols, DuckDB, Apache Arrow, Inter (huruf ikon Sl) |

## Dua cara memakai

**1. Tag skrip khusus.** Paling mirip "bahasa" sendiri:

```html
<script type="text/slak">
  sl.header("Aplikasiku");
</script>
```

Atribut opsional: `data-target="#id"`, `data-theme="light|dark|auto"`, `data-layout="wide"`, `data-title="..."`.

**2. Panggil dari JavaScript.**

```js
const app = Slak.run(async (sl) => {
  sl.title("Aplikasiku");
}, { target: "#app", layout: "wide", theme: "auto" });

app.destroy(); // jika perlu dibongkar
```

## Konsep inti

- **Jalan ulang (rerun).** Setiap interaksi menjalankan ulang seluruh skrip. Slak hanya memperbarui bagian halaman yang berubah, jadi fokus dan posisi gulir tetap terjaga.
- **Widget mengembalikan nilai.** `const x = sl.slider(...)` langsung berisi angka.
- **`sl.session_state`.** Objek yang nilainya bertahan antar-jalan ulang. Widget dengan `key` otomatis tersimpan di sini.
- **Skrip boleh `async`.** Gunakan `await sl.sleep(ms)` untuk animasi atau proses bertahap. Jika pengguna berinteraksi di tengah proses, jalan lama dihentikan dan dimulai ulang.
- **Argumen.** Bisa posisi ala Streamlit `sl.slider("A", 0, 100, 50)` atau objek `sl.slider("A", { min: 0, max: 100, value: 50 })`.

## Referensi API

### Teks
| Fungsi | Catatan |
|---|---|
| `title(teks)`, `header(teks, {divider})`, `subheader(teks)` | Markdown sebaris didukung |
| `markdown(teks, {unsafe_allow_html})` | Tebal, miring, kode, tautan, daftar, tabel, kutipan, `:red[warna]` |
| `write(...nilai)` | Serbaguna: teks → markdown, larik objek → tabel, objek → JSON, Error → galat |
| `caption`, `text`, `code(kode, "bahasa")`, `json(obj)`, `html(str)`, `divider()` | |
| `success`, `info`, `warning`, `error`, `exception(err)` | Kotak status |

### Data & grafik
| Fungsi | Catatan |
|---|---|
| `dataframe(data, {height, hide_index, column_order})` | Bisa diurutkan, ada tombol unduh CSV |
| `table(data)` | Tabel statis |
| `metric(label, nilai, delta, {delta_color, border})` | `delta_color`: `normal`, `inverse`, `off` |
| `line_chart`, `area_chart`, `bar_chart`, `scatter_chart` | Opsi: `x`, `y` (string/larik), `height`, `stack`, `color`, `title`, `x_label`, `y_label` |

Format data yang diterima: larik objek `[{a:1,b:2}]`, objek kolom `{a:[1,2], b:[3,4]}`, larik angka, atau larik dari larik.

### Widget
| Fungsi | Nilai kembali |
|---|---|
| `button(label, {type, on_click})` | `true` hanya pada jalan setelah diklik |
| `checkbox(label, nilai)`, `toggle(label, nilai)` | boolean |
| `radio(label, opsi, {index, horizontal})`, `selectbox(label, opsi, {index, placeholder})` | opsi terpilih |
| `multiselect(label, opsi, {default, max_selections})` | larik |
| `slider(label, min, max, nilai, step)` | angka, atau `[a, b]` bila nilai awal berupa larik |
| `select_slider(label, opsi, {value})` | opsi terpilih |
| `text_input(label, nilai, {type, placeholder, live})` | string (diterapkan saat Enter/keluar fokus; `live: true` untuk setiap ketikan) |
| `text_area`, `number_input`, `date_input`, `time_input`, `color_picker` | string/angka |
| `file_uploader(label, {type, accept_multiple_files})` | objek berkas: `.name`, `.size`, `.text`, `.bytes`, `.url`, `.json()`, `.csv()` |
| `download_button(label, data, {file_name, mime})` | |
| `link_button(label, url)` | |

Opsi umum semua widget: `key`, `help`, `disabled`, `on_change`, `args`, `label_visibility`.

### Tata letak
| Fungsi | Catatan |
|---|---|
| `sl.sidebar.*` | Semua fungsi di atas, ditaruh di sidebar |
| `columns(n atau [bobot])` | Mengembalikan larik objek, tiap objek punya semua fungsi |
| `tabs([label])`, `expander(label, {expanded})`, `container({border, height})` | Bisa dipakai dengan callback: `sl.expander("X", e => e.write("…"))` |
| `empty()` | Placeholder yang isinya diganti setiap kali ditulisi |
| `form(key, {clear_on_submit})` + `form_submit_button(label)` | Widget di dalam form baru diterapkan saat dikirim |

### Chat, status, lain-lain
| Fungsi | Catatan |
|---|---|
| `chat_message("user" atau "assistant")`, `chat_input(placeholder)` | Kolom input chat menempel di bawah |
| `progress(0–100, teks)` | Kembalikan objek dengan `.progress(v, teks)` |
| `await spinner(teks, fungsiAsync)` | |
| `toast(teks, ikon)`, `balloons()` | |
| `image`, `audio`, `video` | URL atau berkas unggahan |
| `set_page_config({page_title, page_icon, layout})` | |
| `cache_data(fn, {ttl})` | Memoisasi berdasarkan argumen |
| `sleep(ms)`, `rerun()`, `stop()` | |
| `parse_csv(teks)`, `to_csv(data)`, `query_params` | |

## Baru di Slak 1.1

### Multi-halaman

```js
const beranda = (sl) => { sl.title("Beranda") }
const data = (sl) => { sl.title("Data") }

sl.navigation([
  sl.page("Beranda", beranda, { icon: "🏠" }),
  sl.page("Data", data, { icon: "📊" }),
], { position: "sidebar" }).run()        // "sidebar", "top", atau "hidden"
```

- Bisa dikelompokkan: `sl.navigation({ "Utama": [...], "Admin": [...] })`.
- Alamat per halaman (`#/data`); tombol Back browser bekerja.
- `sl.switch_page("Data")` dan `sl.page_link("Data")`.

### Data yang tetap tersimpan: `sl.local_state`

```js
const ls = sl.local_state                 // seperti session_state, tetapi permanen
if (!ls.catatan) ls.catatan = []
sl.text_input("Nama", { persist: true })  // isian widget ikut diingat
sl.clear_local_state()                    // kosongkan
```

Data disimpan per browser di `localStorage`, terpisah per aplikasi (atribut `data-app` atau opsi `app_id`). Hanya untuk data JSON.

### Database: `sl.db` (IndexedDB)

```js
const db = sl.db("toko", { produk: "++id, kategori, harga", akun: { key: "email" } })

await db.produk.insert({ nama: "Kopi", kategori: "Minuman", harga: 45000 })
const murah = await db.produk.where("harga").below(50000).sortBy("harga").all()
await db.produk.update(1, { harga: 40000 })
await db.produk.delete(1)
```

| Skema | Arti |
| --- | --- |
| `"++id"` | Kunci otomatis bernama `id` |
| `"kode"` | Kunci manual bernama `kode` |
| `"++id, nama, harga"` | Kolom `nama` dan `harga` diberi indeks (pencarian cepat) |
| `"&email"` | Indeks unik |
| `"*tag"` | Indeks untuk larik |

Perintah tabel: `insert`, `put`, `get`, `update`, `delete`, `clear`, `count`, `all`, `first`, `where(kolom)` (`equals`, `notEqual`, `above`, `aboveOrEqual`, `below`, `belowOrEqual`, `between`, `startsWith`, `contains`, `anyOf`, `noneOf`), `filter(fn)`, `orderBy(kolom, "desc")`, `limit`, `offset`, `import`, `export`. Database: `db.export()`, `db.import(data, { clear })`, `db.delete()`. Perubahan skema dimigrasikan otomatis. Aplikasi otomatis dijalankan ulang ketika data berubah.

### Editor tabel: `sl.data_editor`

```js
const hasil = sl.data_editor(larik, { num_rows: "dynamic" })   // mengembalikan data hasil edit
await sl.data_editor(db.produk)                                 // langsung tersimpan ke database
```

Opsi: `num_rows` (`"fixed"`/`"dynamic"`), `disabled` (`true` atau daftar kolom), `hide_index`, `height`, `column_config` (`{ kolom: { label, type: "text"|"number"|"checkbox"|"select"|"date", options, min, max, required, disabled } }`).

## Baru di Slak 1.2: Slak Data

Tiga berkas, satu filosofi: **Write and Run**. Tambahkan yang dibutuhkan saja:

```html
<script src="slak.js"></script>
<script src="slak-data.js"></script>   <!-- DataFrame, statistik, ML -->
<script src="slak-sql.js"></script>    <!-- SQL (SQLite) -->
```

### Grafik baru (di `slak.js`)

`histogram`, `box_plot`, `pie_chart` (donut), `heatmap`, `combo_chart` (batang + garis, sumbu kanan). Grafik lama mendapat opsi `by` (data panjang), `horizontal`, `sort`, `labels`, `trendline`, `format` (`"rupiah"`, `"percent"`, `"compact"`, `"decimal:2"`), dan `color` berupa fungsi. Sumbu tanggal otomatis. Semua grafik bisa diunduh sebagai **PNG/SVG**. `dataframe` mendapat opsi `format` dan `gradient`.

### DataFrame (gaya pandas)

```js
const df = await sl.read_csv("penjualan.csv")          // juga read_excel, read_json, read_sheets, dataset
const bersih = df.strip_strings().to_numeric("harga").to_datetime("tanggal").drop_duplicates()
const perKota = bersih.groupby("kota").agg({ omzet: ["total", "sum"], transaksi: ["id", "nunique"] })
const pivot = bersih.pivot_table({ index: "kategori", columns: "kanal", values: "total", aggfunc: "sum" })
const bulanan = bersih.resample("tanggal", "M").agg({ total: "sum" })
sl.download_button("Unduh Excel", { Ringkasan: perKota, Pivot: pivot }, { file_name: "laporan.xlsx" })
```

CSV format Indonesia (`;` dan `1.250.000,50`), tanggal `31/12/2024` atau `5 Januari 2024`, dan teks `"Rp 1.250.000"` dikenali. Excel `.xlsx` dibaca dan ditulis tanpa pustaka tambahan.

| pandas | Slak |
|---|---|
| `df["kota"]`, `df.kota` | `df["kota"]`, `df.kota` |
| `df[df.total > 100]` | `df.filter(df.total.gt(100))` atau `df.query("total > 100")` |
| `df.assign(x=lambda d: d.a * 2)` | `df.assign({ x: r => r.a * 2 })` |
| `df.groupby("k").agg(n=("a", "sum"))` | `df.groupby("k").agg({ n: ["a", "sum"] })` |
| `df.sort_values("a", ascending=False)` | `df.sort_values("a", { ascending: false })` |
| `pd.merge(a, b, on="k", how="left")` | `a.merge(b, { on: "k", how: "left" })` |

### SQL

```js
const hasil = await sl.sql(`SELECT kota, SUM(total) AS omzet FROM penjualan GROUP BY kota`, { penjualan: df })
const db = await sl.sqlite({ name: "tokoku" })   // database SQLite yang tersimpan di browser
const chinook = await sl.sqlite(berkasDiunggah) // membuka berkas .db / .sqlite
```

### Statistik, ML, deret waktu, analisis bisnis

```js
sl.write(sl.stats.ttest_ind(df, { value: "nilai", group: "kelas" }))   // hasil + kesimpulan berbahasa Indonesia
sl.write(sl.stats.ab_test(df, { group: "grup", metric: "beli" }))
sl.write(sl.stats.ols(df, "gaji ~ pengalaman + C(pendidikan)"))       // koefisien, p-value, R², VIF
const model = sl.ml.RandomForestClassifier().fit(latih, "churn")
sl.write(sl.ts.forecast(df, { periods: 12 }))                          // Holt-Winters otomatis
sl.heatmap(sl.analysis.cohort(df, { customer: "pelanggan_id", date: "tanggal" }).drop("ukuran"))
```

Hasil uji statistik sudah dicocokkan dengan scipy, dan hasil model dengan scikit-learn.

### Python (tingkat mahir, opsional)

```js
const r = await sl.python(`df.groupby("kota")["total"].sum()`, { data: { df } })
sl.write(r)   // DataFrame pandas kembali sebagai DataFrame Slak; print() dan grafik matplotlib ikut tampil
```

Python dijalankan oleh Pyodide dan **butuh internet** saat pertama kali dimuat. Python tidak tersedia pada halaman yang dibuka dengan klik dua kali, jadi jalankan lewat Slak Studio atau hosting. Ini satu-satunya pengecualian *Write and Run* di Slak 1.2, dan sifatnya opsional.

## Baru di Slak 1.3: Peta

Tambahkan `<script src="slak-peta.js"></script>` sesudah `slak.js`. Batas 38 provinsi (termasuk pemekaran Papua 2022) dan titik tengah 514 kab/kota sudah ada di dalamnya, jadi peta bekerja **tanpa internet**. Batas poligon kab/kota ada di `slak-peta-kab.js` (opsional, dimuat otomatis dari folder yang sama bila dibutuhkan).

```js
sl.map(df, { lat: "lat", lon: "lon", size: "omzet", color: "kanal" })   // titik / gelembung
sl.map(df, { region: "kota", size: "omzet", label: "kota" })            // tanpa koordinat: dari nama wilayah
sl.map(titik, { heatmap: true })                                        // peta kepadatan
sl.map(titik, { cluster: true })                                        // klaster
sl.map(df, { route: { arrows: true } })                                 // rute sesuai urutan baris
sl.map(df, { lat: "asal_lat", lon: "asal_lon", to_lat: "lat", to_lon: "lon", width: "jumlah" })  // aliran asal-tujuan
sl.choropleth(df, { region: "provinsi", value: "omzet", labels: true, bins: 5 })
const pilih = sl.choropleth(df, { region: "provinsi", value: "omzet", on_select: "rerun" })
sl.map(df, { ..., tiles: "osm" })                                       // latar OpenStreetMap (butuh internet)
const gj = await sl.read_geojson("wilayah.geojson")                     // batas sendiri (GeoJSON/TopoJSON)
```

Nama wilayah dikenali dengan toleran: singkatan (Jabar, NTT, Jaksel), awalan (Prov., Kab., Kota), nama lama (Toba Samosir), ibu kota kabupaten (Timika → Kab. Mimika), dan salah ketik ringan. Wilayah yang tidak dikenali dilaporkan di bawah peta.

`sl.geo`: `distance`, `geocode`, `match`, `centroid`, `province_of`, `kabkota_of`, `contains`, `nearest`, `provinces`, `kabkota`, `to_geojson`, `boundaries`.

### Perbaikan data_editor dan SQLite

- `sl.data_editor(df)` kini mengembalikan **DataFrame** bila diberi DataFrame (tipe tanggal tetap Date).
- Daftar perubahan tersedia di `hasil.edits` dan `sl.session_state[key]` dengan format Streamlit: `edited_rows`, `added_rows`, `deleted_rows`.
- `db.save_edits("tabel", data, hasil)` menyimpan hasil editor ke SQLite (UPDATE/INSERT/DELETE dalam satu transaksi).
- Contoh baru: `contoh-peta.html`, `contoh-stok-sqlite.html`, `contoh-inventaris.html`; `demo.html` kini memuat fitur 1.1–1.3.

## Baru di Slak 1.3.1: setara Streamlit

Hampir semua kemampuan Streamlit yang mungkin dijalankan di browser kini ada di Slak. Semuanya ada di `slak.js`; tidak ada berkas baru yang wajib.

### Teks, media, dan status

- `sl.badge`, `sl.latex` (rumus tanpa internet, lewat MathML), `sl.echo`, `sl.help`, `sl.iframe`, `sl.pdf`, `sl.logo`, `sl.space`, `sl.snow`.
- `await sl.write_stream(teks | generator | fetch)`: teks mengalir seperti mesin ketik.
- Markdown: latar `:blue-background[…]`, lencana `:green-badge[…]`, ikon `:material/home:` (font ikon dimuat dari internet), rumus `$…$` dan `$$…$$`, tautan jangkar pada judul.
- `sl.status(label, fn)` untuk proses panjang, `sl.skeleton()` sebagai penanda isi yang sedang dimuat.
- `sl.video(src, { subtitles, start_time, end_time })`.

### Wadah dan alur

- `sl.dialog(judul, fn)`: jendela modal yang jalan ulang sendiri. `sl.popover(label)`: panel melayang.
- `sl.fragment(fn, { run_every })`: bagian yang jalan ulang sendiri, termasuk berkala; `sl.rerun({ scope: "fragment" })`.
- `sl.container({ horizontal, gap, horizontal_alignment, vertical_alignment, height, width })`, `sl.columns(…, { border })`, `sl.bottom`.

### Widget

- `sl.pills`, `sl.segmented_control`, `sl.feedback("thumbs" | "faces" | "stars")`, `sl.menu_button`, `sl.pagination`, `sl.datetime_input`.
- `sl.camera_input` dan `sl.audio_input` (hasil WAV). `sl.chat_input` menerima berkas dan rekaman suara (`accept_file`, `accept_audio`).
- `accept_new_options` untuk `selectbox`/`multiselect`, `captions` untuk `radio`, `icon` dan `type: "tertiary"` untuk tombol, `width` untuk semua widget.

### Tabel, metrik, dan grafik

- `sl.dataframe`: seleksi baris/kolom/sel (`on_select`, `selection_mode`), kotak cari, `row_height`, `placeholder`, kolom yang dipin.
- `sl.column_config`: 21 jenis kolom (Number, Progress, Link, Image, LineChart/BarChart/AreaChart mini, Date/Datetime/Time, Multiselect, List, Json, Markdown, Button, Audio, Video, …), juga di `sl.data_editor`.
- `sl.metric`: `chart_data` (grafik mini), `format`, `delta_arrow`, `delta_description`, `icon`.
- Grafik Slak bisa diklik (`on_select: "rerun"`), `stack: "normalize" | "center" | "layered"`, `width`, `alt`.
- `sl.vega_lite_chart` / `sl.altair_chart` (subset, tanpa internet).
- `sl.plotly_chart`, `sl.echarts_chart`, `sl.mermaid_chart`, `sl.graphviz_chart`: pustakanya diunduh dari internet **hanya saat dipakai** (alamat bisa diganti lewat `Slak.lib_urls`).
- `await sl.pyplot(kode, { df })` menjalankan matplotlib lewat Python.

### Logika, tema, dan opsi

- `sl.cache_resource`, `sl.cache_data(fn, { ttl, max_entries })` dan `fn.clear()`.
- `sl.context` (bahasa, zona waktu, URL, tema, cookie), `sl.query_params.get_all/from_dict/to_dict/clear`.
- `sl.get_option` / `sl.set_option` untuk opsi tema dan `client.*` (toolbarMode, showSidebarNavigation, disableDataExport, showErrorDetails).
- Tema kustom: `sl.set_page_config({ theme: { primaryColor, backgroundColor, font, headingFont, baseRadius, chartCategoricalColors, light: {…}, dark: {…}, sidebar: {…} } })`, plus `menu_items`.
- `sl.connection("nama", { type: "sql" })`: padanan `st.connection` untuk SQLite.

### `sl.crypto`

| Fungsi | Kegunaan |
|---|---|
| `md5`, `sha1`, `sha256`, `sha384`, `sha512`, `hmac` | Sidik jari dan tanda tangan, murni JavaScript |
| `await hash_password(pw)` / `await verify_password(pw, hash)` | bcrypt `$2y$`, cocok dengan `password_hash()` PHP |
| `await encrypt(teks, sandi)` / `await decrypt(data, sandi)` | AES-256-GCM (butuh https, localhost, atau berkas lokal) |
| `quiz_hash(jawaban)` / `quiz_check(jawaban, kode)` | Melindungi kunci jawaban kuis |
| `random_token`, `uuid`, `base64`, `from_base64` | Pelengkap |

Catatan: hash menyembunyikan jawaban dari mata, bukan dari tebakan. Pilihan ganda tetap mudah ditebak.

### SQL yang juga jalan di PostgreSQL

SQLite tetap mesin utama. `sl.sql` dan `sl.sqlite` kini memahami gaya PostgreSQL: `date_trunc`, `date_part`, `EXTRACT(… FROM …)`, `to_char`, `x::date`/`::int`/`::numeric`, `ILIKE`, `DATE '…'`, `+ INTERVAL '1 month'`, `percentile_cont(p) WITHIN GROUP (ORDER BY …)`, `mode() WITHIN GROUP`, `stddev`, `variance`, `corr`, `greatest`, `least`, `split_part`, `initcap`, `strpos`, `left`, `right`, `regexp_replace`, `md5`. Opsi `{ portable: true }` (atau `sl.set_option("sql.portable", true)`) memperingatkan sintaks khusus SQLite seperti `strftime`, `IFNULL`, `GROUP_CONCAT`; `sl.sql.check(kueri)` mengembalikan daftarnya.

### Petunjuk salah awalan

`sl.groupby(...)` dan `df.bar_chart(...)` kini memberi pesan yang menunjuk awalan yang benar. Aturannya: **`sl.`** untuk menampilkan, membuat widget, atau memuat data; **nama tabel** (`df.`) untuk mengolah tabel. `sl.python(kode, { df: penjualan })` kini bisa ditulis tanpa pembungkus `data:`.

## Baru di Slak 1.3.2: data besar dan berkas lokal

Rilis ini lahir dari uji beban dengan data nyata (penjualan minuman Iowa 2021, 24 kolom, dan 1,5 juta perjalanan Uber New York 2014).

### Lebih cepat untuk data besar

| Ukuran (Iowa, 24 kolom) | 1.3.1 | 1.3.2 |
|---|---|---|
| Baca CSV 250 ribu baris | 8,5 dtk, 617 MB | 2,1–2,8 dtk, 280 MB |
| Baca CSV 1 juta baris | 31,6 dtk, 2,3 GB | 11,6 dtk, 1,1 GB |
| SQL pertama, 250 ribu baris | 7,1 dtk | 0,6 dtk |
| Aplikasi portofolio 250 ribu baris: buka | 10,2 dtk | 4,4 dtk |
| …ubah filter | 2,2–2,7 dtk | 0,9–1,7 dtk |
| `data_editor` 20 ribu baris | 6,1 dtk | 0,13 dtk |
| `scatter_chart` 100 ribu titik | 1,2 dtk, 100 ribu elemen | 0,26 dtk, 1 elemen |

- Pembaca CSV baru memotong teks, bukan menyambung huruf demi huruf.
- Format angka dan tanggal di tabel memakai ulang pemformat (sekitar 30 kali lebih cepat per sel).
- `sl.sql` hanya memuat kolom yang disebut kueri. Kueri dengan `*` tetap memuat semua; `{ all_columns: true }` memaksa semua kolom.
- `scatter_chart` dengan lebih dari 3.000 titik digambar sebagai satu gambar di dalam SVG (ekspor PNG/SVG tetap jalan). Sumbu sebar kini mengikuti rentang data, tidak lagi dipaksa mulai dari 0. Grafik garis bisa ikut dengan `{ zero: false }`.
- `data_editor` hanya menggambar baris yang terlihat di layar.
- **Perbaikan bug:** `line_chart`, `scatter_chart`, `histogram`, dan beberapa fungsi Slak Data galat "Maximum call stack size exceeded" di atas sekitar 120 ribu nilai.

### Peta dunia

```html
<script src="slak-peta.js"></script>
<script src="slak-peta-dunia.js"></script>   <!-- opsional, 600 KB, tanpa internet -->
```

Titik di luar Indonesia kini tampil di atas batas negara (dan negara bagian untuk AS, Kanada, Brasil, Australia, Rusia, India, Tiongkok, Afrika Selatan). Sumber: Natural Earth, domain publik. Opsi `{ tiles: "osm" }` (juga `"carto"`, `"carto-dark"`, `"topo"`, atau templat URL) memakai ubin peta daring; saat luring, peta dasar luring tetap digambar di bawahnya.

### `read_csv` saat dibuka dengan klik dua kali

Kode tidak perlu diubah. `sl.read_csv("penjualan.csv")` (juga `read_excel`, `read_json`, `sl.sqlite("toko.db")`, `read_geojson`) mencari data berurutan:

1. **Berkas yang dibungkus**: `penjualan.csv.js` di folder yang sama. Buat lewat `bungkus.html` atau Slak Studio (**Alat → Bungkus data**). Saat halaman dibuka dari komputer, Slak memuatnya sendiri, tanpa perlu menambah tag `<script>`.
2. **Data di dalam halaman**: `<script type="text/csv" id="penjualan.csv">…</script>` atau `<script data-file="penjualan.csv">`.
3. **Folder proyek** di Slak Studio.
4. **Hosting / server lokal** (`fetch` biasa).
5. **Tombol pilih berkas** bila halaman dibuka dari komputer dan semua cara di atas gagal. Pilihan diingat di browser itu; tombol kecil "ganti" di pojok kiri bawah untuk memilih berkas lain.

Batas: membungkus data cocok sampai sekitar 20–50 MB. Untuk berkas yang lebih besar, gunakan tombol pilih berkas atau server lokal.

## Baru di Slak 1.4: emoji, login, dan dataset online

### Emoji dan ikon dengan nama

```js
sl.title("Laporan :bar_chart:")          // nama Streamlit (1.570 nama, sama persis)
sl.write("Omzet naik :kantung_uang:")    // nama resmi bahasa Indonesia (Unicode CLDR)
sl.write("Mantap :jempol: :senyum:")     // alias pendek bahasa Indonesia (185 nama)
sl.button("Simpan", { icon: ":material/save:" })   // 248 ikon Material tampil tanpa internet
```

Nama dikenali di semua teks: judul, markdown, label, tab, `page_icon`. Bila satu nama punya dua arti, nama Streamlit yang menang. Dari kode: `sl.emoji("rocket")`, `sl.emoji.search("uang")`, `sl.emoji.names()`, `sl.emoji.icons()`.

### Login dan peran

```js
const user = await sl.login({
  users: { ani: { password: "$2y$10$...", name: "Ani", role: "admin" } }
})
sl.navigation([
  sl.page("Kasir", kasir),
  sl.page("Laporan", laporan, { roles: ["admin"] })   // hanya tampil untuk admin
]).run()
```

Password ditulis sebagai hash bcrypt (`await sl.crypto.hash_password("...")`, atau Slak Studio: **Alat › Lindungi password untuk sl.login**). Juga tersedia `sl.user` (`name`, `role`, `has_role()`), `sl.logout()`, `sl.require_role("admin")`, `register: true` untuk tab Daftar, dan daftar pengguna dari DataFrame atau fungsi (sl.db/SQLite). Login ini berjalan di browser: cocok untuk memisahkan tampilan per peran, bukan untuk melindungi data rahasia dari orang yang membuka kode halaman.

### Dataset online

| Fungsi | Sumber |
|---|---|
| `await sl.open_data("penguins")` | Katalog 15 dataset terbuka beserta lisensinya (`sl.open_data.list()`) |
| `await sl.github("pemilik/repo/jalur.csv")` | Berkas di GitHub (cadangan otomatis lewat jsDelivr) |
| `await sl.worldbank("NY.GDP.PCAP.CD", { negara: ["IDN"] })` | Indikator Bank Dunia |
| `await sl.huggingface("org/dataset", { file })` | Dataset Hugging Face |
| `await sl.kaggle("pemilik/dataset", { file })` | Kaggle: langsung di Slak Studio; di browser lewat zip unduhan manual |
| `await sl.read_url(url)` | CSV, TSV, JSON, Excel, zip dari alamat mana pun |

Unduhan disimpan di browser 7 hari (`ttl`), jadi tetap jalan saat luring. `sl.offline_button()` mengunduh data sebagai `.csv.js`; taruh di folder halaman agar jalan tanpa internet dan saat dibuka dengan klik dua kali. Fungsi-fungsi ini ada di `slak-data.js`.

### Lainnya

- Slak Studio: tombol **Contoh** untuk setiap fungsi di Referensi (kode + hasil hidup), saran emoji saat mengetik `:nama`, **Alat › Cari ikon dan emoji**, **Alat › Unduh dataset**, tiga pelajaran baru (43 pelajaran).
- Perbaikan: sumbu tahun tidak lagi tampil "2.01k"; penggeser tahun tanpa titik ribuan; `read_json` menerima teks JSON pendek; `ml.roc_curve` menerima DataFrame.

## Baru di Slak 1.5: DuckDB dan klien database di Slak Studio

### `sl.duckdb` untuk data besar

```html
<script src="slak.js"></script>
<script src="slak-data.js"></script>
<script src="slak-duckdb.js"></script>
```

```js
const r = await sl.duckdb("SELECT kota, SUM(total) AS omzet FROM jual GROUP BY kota ORDER BY omzet DESC", { jual: df })
const big = await sl.duckdb("SELECT kanal, COUNT(*) FROM 'transaksi_2024.parquet' GROUP BY kanal")   // berkas di folder aplikasi
const df2 = await sl.read_parquet("penjualan.parquet")
const pq = await sl.duckdb.to_file("SELECT * FROM jual", "jual.parquet", { jual: df })            // untuk download_button
```

DuckDB (duckdb-wasm 1.32, mesin DuckDB 1.4, lisensi MIT) merangkum jutaan baris dalam sekejap dan membaca Parquet. `slak-duckdb.js` berukuran 240 KB; mesinnya (±35 MB) diunduh dari jsDelivr saat pertama dipakai. Atur `Slak.duckdb_base = "folder/"` untuk memakai salinan sendiri (`duckdb-eh.wasm`, `duckdb-browser-eh.worker.js`, dan folder `ext/` berisi ekstensi parquet dan json). Di Slak Studio semuanya sudah tersedia tanpa internet. Halaman yang dibuka dengan klik dua kali tetap butuh internet untuk DuckDB.

Pakai SQLite (`sl.sql`, `sl.sqlite`) untuk data harian dan tabel yang sering diubah; pakai DuckDB untuk data di atas sekitar 500 ribu baris dan berkas Parquet.

### Slak Studio: jendela Database

Tombol **Database** di bilah kiri, menu **Alat › Database**, atau Ctrl+Shift+D. Mendukung SQLite, IndexedDB (`sl.db`), SQLite di browser (`sl.sqlite({ name })`), PostgreSQL (termasuk Supabase dan Neon), MySQL, MariaDB, SQL Server, dan DuckDB. Isinya: ubah data langsung dengan **Simpan** dalam satu transaksi, tab SQL dengan saran nama dan konfirmasi untuk kueri berisiko, diagram relasi tabel, impor CSV/Excel/JSON, ekspor CSV/Excel/SQL/Parquet, salin tabel antar-koneksi, serta **Ambil salinan untuk aplikasi** (CSV, `.csv.js`, atau SQLite). Password koneksi disimpan terenkripsi oleh sistem operasi, atau ditanyakan setiap kali.

### Perbaikan

- `sl.worldbank` untuk beberapa negara sekaligus kini mengambil data per negara (alamat `IDN;MYS` ditolak sebagian browser).
- `sl.kaggle` dan pembaca zip: mendukung ZIP64, format zip yang dipakai Kaggle.
- `sl.python` otomatis memuat pandas saat menerima DataFrame, walau kodenya tidak menulis `import pandas`.
- Singkatan sumbu grafik mengikuti bahasa browser: bahasa Indonesia memakai rb, jt, M (miliar), T; bahasa lain k, M, B, T.

Semua sumber dataset online 1.4 (GitHub, Bank Dunia, Hugging Face, Kaggle, dan 15 dataset `open_data`) sudah diuji ulang dengan internet sungguhan.

## Baru di Slak 1.6: kepercayaan dan database di server

### Bisa dipercaya: akurasi, batas data, keamanan

- **Uji akurasi.** 150 kasus mencakup 409 dari 447 fungsi publik Slak Data, dibandingkan dengan pandas, scipy, statsmodels, dan scikit-learn: 148 cocok, 2 berbeda karena disengaja (pembulatan 1,25 → 1,3 seperti Excel; `str.title()` tidak membesarkan huruf setelah angka). Skrip uji ikut di kode sumber.
- **Batas ukuran data resmi.** Nyaman sampai **100.000 baris** (±5 MB CSV), berat sampai **1.000.000 baris**. Di atas batas nyaman, Slak menampilkan peringatan dan menyarankan DuckDB atau SQL. Ubah lewat `sl.data.limits`.
- **Lebih cepat.** `df.query()` ±10× dan `sort_values()` ±2,6× lebih cepat. Satu putaran baca + delapan operasi + dua grafik untuk 1 juta baris turun dari 17 detik ke 8 detik.
- **Pernyataan keamanan** di buku panduan Bab 32: apa yang aman dan tidak aman disimpan di halaman Slak.

### Database di server

```js
// slak-bridge.php diunggah ke hosting yang sama (cPanel). Password database tinggal di server.
const db = sl.connection("toko", { type: "bridge", url: "slak-bridge.php" })
const df = await db.query("SELECT nama, harga FROM produk WHERE harga < ?", { params: [20000] })
await db.execute("INSERT INTO pesan (nama, isi) VALUES (?, ?)", ["Ani", "Halo"])   // bila mode tulis diizinkan

// libSQL/Turso langsung dari browser (pakai token hanya-baca)
const cloud = sl.connection("cloud", { type: "turso", url: "libsql://nama-db-akun.turso.io", token: "..." })
```

| Fungsi | Hasil |
|---|---|
| `await db.query(sql, { params, ttl })` | DataFrame (kolom tanggal otomatis menjadi tanggal) |
| `await db.execute(sql, params)` | `{ rowCount, lastInsertId }` |
| `await db.run("nama_kueri", params)` | DataFrame dari kueri bernama di server |
| `await db.tables()`, `await db.table(nama)` | daftar tabel, isi satu tabel |

`slak-bridge.php` (PHP 7.4+ dengan PDO) dan `slak-bridge.js` (Node.js) memakai protokol yang sama. Bawaannya **hanya membaca**; mode `write` dibatasi ke tabel yang dipilih, dan mode `queries` hanya menerima kueri bernama. DROP, ALTER, CREATE, dan perintah ganda dari halaman selalu ditolak. Di pratinjau Slak Studio dan halaman klik dua kali, tambahkan `dev_url` berisi alamat lengkap jembatan. Buat berkasnya dari jendela Database: klik kanan › Pakai di kode Slak › **Buat slak-bridge.php**.

### Lainnya

- `sl.read_sheets` kini jalan di halaman yang dibuka dengan klik dua kali (JSONP ke docs.google.com).
- Pesan galat yang tepat saat server lain menolak dibaca dari halaman web (CORS).
- Jendela Database Slak Studio: koneksi **libSQL / Turso**.
- Galeri contoh: **Templat Portofolio** (`contoh-portofolio.html`).
- Ubin peta `"carto"`/`"carto-dark"`: sejak September 2026 CARTO mewajibkan kunci. Tanpa kunci, Slak memakai ubin OpenStreetMap yang diwarnai terang/gelap; dengan kunci, `sl.set_option("tiles.carto_key", "...")`.
- Ekspor Slak Studio tidak lagi menyertakan `slak-sql.js` (1 MB) bila aplikasi hanya memakai koneksi ke server.

### Perbaikan

- `date_range` bulanan: 31 Januari + 1 bulan kini 29 Februari (sebelumnya 2 Maret); `freq` `"ME"`/`"MS"` untuk akhir/awal bulan.
- `toNumber("Rp 12.500")` kini 12.500 (sebelumnya 12,5).
- `transpose()` menaruh kolom label di depan.
- `stats.betainc(a, b, x)` mengikuti urutan argumen scipy; `stats.binom.sf` ditambahkan.
- `std({ ddof })`, `var({ ddof })`, `fillna({ method })`, `get_dummies(df, { columns })`, `str.cat({ sep })` menerima opsi gaya pandas.
- Holt-Winters kini juga mengoptimalkan keadaan awal: galat dalam sampel lebih kecil daripada statsmodels.
- Ikon `:material/insights:`, `auto_awesome`, `file_download`, dan `note` kini tampil (sebelumnya kosong); ikon di `page_link` kini tergambar.
- Jendela Database: dialog kini memakai warna dan huruf tema (di 1.5 tampil polos).

## Baru di Slak 1.7: menguji, berbagi, dan melaporkan

### Menguji aplikasi: `sl.testing`

Padanan `AppTest` di Streamlit. Aplikasi dijalankan tersembunyi, lalu widget diisi dan tombol ditekan dari kode uji:

```js
const at = await sl.testing.run("kasir.slak")
await at.slider("Diskon (%)").set_value(25).run()
sl.testing.expect(at.metric("Bayar").value).toBe(75000)
```

Objek uji juga bisa dibuat tanpa langsung dijalankan, seperti di Streamlit: `sl.testing.from_string(kode)`, `from_file("kasir.slak")`, dan `from_function(fn)`, lalu `await at.run()`.

`sl.testing.test(judul, fn)` menampilkan hasil tiap uji (lolos atau gagal) di aplikasi, dan `sl.testing.summary()` menghitungnya. Pernyataan yang tersedia: `toBe`, `toEqual`, `toContain`, `toMatch`, `toBeGreaterThan`, `toBeLessThan`, `toBeCloseTo`, `toHaveLength`, `toBeTruthy`, `toBeFalsy`, `toBeNull`, `toThrow`, dan `.not`.

Uji disimpan di berkas `nama.uji.slak` di samping aplikasinya. Di Slak Studio, panel **Uji** (rel kiri) menjalankan semua berkas uji di folder itu, **Uji cepat** memastikan berkas aktif jalan tanpa galat, dan **Buat berkas uji** membuat kerangkanya. Di luar Studio, buka **slak-test.html**: pilih berkas uji beserta aplikasinya (saat dibuka dengan klik dua kali), atau tulis daftar berkasnya di `const UJI = [...]` bila halaman diunggah ke hosting.

### Paritas dengan Streamlit

Daftar 104 perintah Streamlit dan padanannya di Slak ada di **PARITAS.md**. Daftar itu dibuat otomatis: setiap perintah dijalankan dan diperiksa dengan `sl.testing`. Hasil saat ini: 80 sama, 23 mirip (jalan dengan beda yang dicatat), 1 tidak relevan (`st.App`), 0 gagal. Semua 42 perintah yang paling sering dipakai pemula jalan.

Dua celah yang ditutup:

- `sl.pydeck_chart(spesifikasi)`: peta 3D dan peta data besar dengan deck.gl (MIT, diunduh saat dipakai). Spesifikasinya JSON deck.gl, sama dengan hasil `pydeck.Deck.to_json()`, dan peta dasarnya OpenStreetMap tanpa kunci API.
- `sl.secrets` sengaja tidak menyimpan apa pun: membacanya menampilkan pesan bahwa rahasia harus disimpan di slak-bridge, karena isi halaman Slak bisa dibaca pengunjung.

### Komponen kustom dua arah

Widget buatan sendiri dari HTML dan JavaScript. Nilai yang dikirim komponen kembali ke kode Slak, seperti widget biasa:

```js
const nilai = sl.component(`
  <button id="b">Tambah</button>
  <script>
    let n = 0
    Slak.component.onRender(args => { n = args.mulai })
    document.getElementById("b").onclick = () => Slak.component.setValue(++n)
  <\/script>`, { args: { mulai: 0 }, key: "hitung", default: 0 })
sl.metric("Diklik", nilai)
```

Di dalam komponen tersedia `Slak.component.args`, `onRender(fn)`, `setValue(nilai)`, `setHeight(px)`, dan `theme`. Tinggi bingkai menyesuaikan isinya, dan warna tema ikut dikirim saat tema berganti.

Komponen yang sudah jadi dipakai dari folder: `const bintang = sl.components.declare_component("bintang", { url: "bintang" })`, lalu `bintang({ label: "Nilai", key: "r", default: 3 })`. Slak memakai protokol pesan yang sama dengan Streamlit, jadi folder **build/** komponen Streamlit bisa langsung dipakai. Tabel Arrow dari komponen belum didukung. Di Slak Studio, folder komponen dibaca dari samping berkas .slak dan ikut tersalin saat **Ekspor folder situs**. `sl.components.html(html)` menampilkan HTML di bingkai tanpa nilai kembali, seperti `st.components.v1.html`.

### Galeri 10 komponen siap pakai

Muat `slak-komponen.js` sesudah `slak.js` (di Slak Studio otomatis, dan ikut disertakan saat ekspor bila dipakai), lalu panggil komponen dengan namanya:

```js
const nilai = sl.component("rating", { label: "Nilai pelayanan", max: 5, key: "nilai" })
const [awal, akhir] = sl.component("rentang_tanggal", { min: "2024-01-01", max: "2024-12-31", key: "periode" })
const tugas = sl.component("kanban", { columns: ["Rencana", "Dikerjakan", "Selesai"], items: daftar, key: "papan" })
```

| Nama | Nilai yang dikembalikan |
|---|---|
| `rating` | angka 0 sampai `max` |
| `sketsa` | gambar PNG (data URL) tanda tangan atau sketsa, atau `null` |
| `rentang_tanggal` | `[awal, akhir]` "YYYY-MM-DD", dengan tombol 7 hari, 30 hari, bulan ini, tahun ini |
| `kalender_heatmap` | `{ tanggal, nilai }` hari yang diklik; data berupa DataFrame |
| `kanban` | daftar kartu `{ id, judul, kolom }` sesudah dipindah |
| `titik_peta` | `{ lat, lon }` titik yang diklik di peta OpenStreetMap (butuh internet) |
| `editor_kode` | teks kode (sql, js, python) saat Ctrl+Enter atau tombol Jalankan |
| `pengatur_waktu` | `{ detik, berjalan, selesai }` stopwatch atau hitung mundur |
| `papan_skor` | `{ tim: skor }` |
| `tombol_suara` | teks ucapan (Web Speech API, Chrome/Edge) |

Opsi tiap komponen dan contohnya ada di panel Referensi Slak Studio (kelompok **Galeri komponen**) dan di contoh **Galeri Komponen**. Komponen buatan sendiri bisa didaftarkan dengan nama yang sama caranya: `Slak.registerComponent("nama", { html: "<...>", default: args => nilai_awal })`.

### Coba model: `sl.ml_demo`

```js
sl.ml_demo(sl.ml.RandomForestClassifier(), sl.dataset("pelanggan").drop("pelanggan_id"),
  { target: "churn", labels: { 0: "Bertahan", 1: "Berhenti" } })
```

Setiap fitur mendapat widget yang sesuai (slider untuk angka, pilihan untuk teks, kotak centang untuk ya/tidak), lalu prediksi tampil langsung. Untuk klasifikasi juga tampil peluang tiap kelas, dan bagian "Fitur mana yang paling berpengaruh?" menampilkan kepentingan fitur atau koefisien. Model yang belum dilatih dilatih otomatis bila `target` diisi.

### Templat dasbor

Tiga templat baru di galeri contoh Slak Studio: **Dasbor Penjualan** (filter periode, wilayah, kanal; angka utama dibanding periode sebelumnya), **Dasbor Pelanggan & Churn** (dengan `sl.ml_demo`), dan **Dasbor SDM**. Datanya dataset bawaan; ganti satu baris `DATA` dengan `await sl.read_csv("datamu.csv")` dan sesuaikan nama kolomnya. Ada juga contoh **Komponen Kustom: Rating Bintang** dan **Uji Aplikasi Otomatis**.

### Tata letak siap pakai: `sl.layout`

```js
const area = sl.layout("kpi-atas", { title: "📊 Dasbor Penjualan" })
area.kpi.metric("Omzet", df.total.sum(), null, { format: "rp" })
area.grafik.bar_chart(perKota, { x: "kota", y: "omzet" })
area.tabel.dataframe(perKota)
```

Empat kerangka: **kpi-atas** (`kpi`, `grafik`, `tabel`; metrik di `kpi` tampil sebagai kartu sejajar), **sidebar-filter** (`filter` di sidebar, `kpi`, `grafik`, `tabel`), **grid-2x2** (`kpi` dan empat kotak `kiri_atas`, `kanan_atas`, `kiri_bawah`, `kanan_bawah`, menjadi satu kolom di layar sempit), dan **laporan** (`judul`, `ringkasan`, `isi`, `catatan`, satu kolom yang nyaman dicetak). Di Slak Studio: **Berkas › Baru dari templat…** membuka keempat kerangka itu beserta templat dasbor lengkap.

### Lainnya

- `color: "nama_kolom"` di `line_chart`, `bar_chart`, `area_chart`, dan `scatter_chart` kini memberi satu warna per kelompok, sama seperti Streamlit (sebelumnya hanya lewat opsi `by`).
- `sl.number_input(label, { value: null })` kini kosong sampai diisi dan mengembalikan `null`, seperti `value=None` di Streamlit; `placeholder` ikut didukung.
- `sl.select_slider` menerima `{ options: [...] }` seperti Streamlit.

### Tautan berbagi

Tombol **🔗 Bagikan** di playground menyalin tautan yang berisi kode, misalnya `https://slak.studio/playground/#kode=K87R…`. Kode dimampatkan ke bagian `#` alamat, jadi tidak dikirim atau disimpan di server mana pun; siapa pun yang membuka tautan melihat kode dan hasilnya. Kode yang dibuka dari tautan tidak menimpa kode simpanan pengunjung sampai ia mengeditnya. Di Slak Studio: menu **Berkas › Salin tautan berbagi**. Sejak 1.9.1 tautannya memakai playground resmi `https://slak.studio/playground/` (bisa diganti ke salinan resmi `slakstudio.github.io` atau playground sendiri). Berkas data (CSV, database) tidak ikut di tautan. Untuk pengembang: `Slak.share.link(kode, alamat)` dan `Slak.share.read(location.hash)`.

### Login dan kuis lewat slak-bridge

```js
const db = sl.connection("sekolah", { type: "bridge", url: "slak-bridge.php" })
const u = await sl.login({ bridge: db })                  // akun diperiksa di server
sl.dataframe(await db.run("nilai_saya"))                  // kueri bernama dengan :_user
const h = await db.check_quiz("kuis1", { s1: "B", s2: "42" })
sl.metric("Skor", h.score + " / " + h.total)
```

Di `slak-bridge.php` (dan `slak-bridge.js`) ada bagian baru:

- `users` (atau `users_query` untuk tabel pengguna) berisi akun dengan password bcrypt. Login mengembalikan token bertanda tangan yang berlaku `session_hours` jam. Password tidak pernah ada di halaman.
- Kueri bernama boleh berbentuk `['sql' => '... WHERE username = :_user', 'role' => 'siswa']`. `:_user` dan `:_role` diisi dari pengguna yang masuk. `login_required` mewajibkan login untuk semua kueri, dan `write_role` membatasi siapa yang boleh menulis.
- `quizzes` menyimpan kunci jawaban di server. Jawaban dibandingkan tanpa membedakan huruf besar kecil dan spasi, angka boleh berkoma (3,14), dan satu soal boleh punya beberapa jawaban benar. `save_to` menyimpan hasil ke tabel, `attempts` membatasi jumlah percobaan, dan `show_answers` mengirim kunci jawaban setelah dinilai.

`slak-bridge.js` butuh `npm install bcryptjs` untuk login; `slak-bridge.php` memakai `password_verify` bawaan PHP. Hash dari Slak Studio (Alat › Lindungi password) dan dari `password_hash` PHP sama-sama diterima.

### Laporan SQL: `sl.report`

````js
await sl.report(`
# Laporan Penjualan
Omzet: **{{ ringkas.omzet | rp }}** dari {{ ringkas.transaksi }} transaksi.

```sql name=ringkas hide
SELECT SUM(total) AS omzet, COUNT(*) AS transaksi FROM penjualan
```

```sql chart=bar x=kota y=omzet format=rp
SELECT kota, SUM(total) AS omzet FROM penjualan GROUP BY kota ORDER BY omzet DESC
```
`, { tables: { penjualan: sl.dataset("penjualan") } })
````

Blok ` ```sql ` dijalankan lebih dulu, lalu laporan ditampilkan berurutan. Opsi blok: `name`, `chart` (bar, line, area, scatter, pie), `x`, `y`, `format`, `show` (table, chart, both), `hide`, `code`, `title`, `height`. Di teks, `{{ nama.kolom | format }}` diisi nilai baris pertama, dengan format `rp`, `persen`, `0`–`9`, atau `tanggal`. Tabel berasal dari `tables` (DataFrame, lewat slak-sql.js) atau `db` (`sl.sqlite`, `sl.connection`, `sl.duckdb`), dan `params` mengisi `:nama` di SQL. Laporan juga bisa dibaca dari berkas: `await sl.report("laporan.md", { ... })`.

### Mode sel `// %%` di Slak Studio

Baris `// %%` (boleh diberi judul, misalnya `// %% Bersihkan data`) membagi kode menjadi sel. Saat kode dijalankan ulang, sel yang tidak berubah dan berada di atas sel yang diubah **tidak dijalankan lagi**: variabel dan tampilannya diambil dari simpanan. Sel yang diubah dan semua sel di bawahnya dijalankan ulang, dan baris status menulis berapa sel dipakai ulang. Jadi memuat data besar cukup sekali, lalu sel grafik di bawahnya bisa diubah berkali-kali dengan cepat. Sel yang memakai widget, formulir, `session_state`, `Math.random`, atau waktu sekarang selalu dijalankan ulang. Tombol **Muat ulang** di pratinjau mengosongkan simpanan.

**Shift+Enter** menjalankan sampai akhir sel tempat kursor berada, lalu kursor pindah ke sel berikutnya. Tombol **▶ Sel n** di baris pemisah melakukan hal yang sama, dan Ctrl+Enter tetap menjalankan semuanya. Di luar Slak Studio, baris itu hanya komentar.

Contoh baru di galeri: **Laporan SQL (Markdown)** dan **Analisis Bertahap (mode sel)**.

### Slak Studio dan pelajaran

Empat pelajaran baru (total 49): **Menguji aplikasi otomatis**, **Membuat widget sendiri**, **Formulir coba model**, dan **Laporan SQL dalam Markdown**. Delapan contoh baru di galeri (termasuk **Galeri Komponen**), panel **Uji**, **Berkas › Baru dari templat…**, dokumentasi dan tombol Contoh untuk setiap fungsi baru di panel Referensi, menu **Berkas › Salin tautan berbagi**, dan **Jalankan › Jalankan sampai sel ini** (Shift+Enter). Jendela Database membuat `slak-bridge.php` versi 1.7 yang sudah berisi bagian login dan kuis.

## Baru di Slak 1.8: terbit sekali klik

### Terbitkan dari Slak Studio

Menu **Berkas › Terbitkan…** (Ctrl+Shift+U, atau tombol Terbitkan di bilah atas) mengunggah aplikasi ke salah satu dari tiga tujuan:

| Tujuan | Yang diisi | Hasil |
|---|---|---|
| **GitHub Pages** | token akses pribadi GitHub (izin Contents dan Pages), nama repositori, cabang `gh-pages` atau `main` | repositori dibuat bila belum ada, Pages diaktifkan, alamat `https://akun.github.io/repo/` |
| **Netlify** | token akses pribadi Netlify, nama situs | situs dibuat bila belum ada, alamat `https://nama.netlify.app` |
| **FTP (cPanel)** | server, pengguna, password, folder (bawaan `public_html`) | FTPS dicoba lebih dulu; hanya berkas yang berubah yang diunggah |

Isinya sama dengan Ekspor folder situs: halaman aplikasi, pustaka Slak yang dipakai, berkas data, dan folder komponen. Token dan password disimpan terenkripsi oleh sistem operasi dan tidak pernah ikut ke situs; terbit dibatalkan bila token ditemukan di kode aplikasi. Jendela yang sama juga bisa menerbitkan sebuah folder, misalnya seluruh paket Slak sebagai situs playground.

### Bisa dipasang dan offline (PWA)

Ekspor folder situs dan Terbitkan kini menambahkan `manifest.webmanifest`, service worker `sw.js`, dan ikon dari `page_icon` aplikasi. Setelah diunggah ke alamat https, Chrome dan Edge menampilkan tombol **Pasang**, dan aplikasi tetap terbuka tanpa internet setelah kunjungan pertama. Saat halaman dibuka dengan klik dua kali, fitur ini tidur. Paket Slak sendiri juga begitu: `index.html` (beranda) dan `playground.html` bisa dipasang.

### Playground resmi

Paket ini sudah berbentuk situs. Sejak 1.9.1 alamat resminya `https://slak.studio` dengan salinan resmi `https://slakstudio.github.io`; langkahnya di **TERBIT-SITUS.md**.

### Google BigQuery

Jendela Database Slak Studio kini bisa terhubung ke **Google BigQuery** dengan berkas kunci JSON service account. Dataset tampil sebagai skema (termasuk dataset publik seperti `bigquery-public-data.samples`), tabel bisa dibuka dan dihitung jumlah barisnya tanpa biaya, dan konsol SQL memperkirakan byte yang akan diproses lebih dulu: di atas 1 GB, Studio meminta konfirmasi, dan ada batas per kueri. Untuk aplikasi Slak, BigQuery dipakai lewat **slak-bridge.php** atau **slak-bridge.js** (versi 1.8) dengan `type: "bigquery"`, supaya kunci tetap di server:

```php
'gudang' => ['type' => 'bigquery', 'key_file' => __DIR__ . '/../kunci-bigquery.json', 'dataset' => 'toko', 'max_gb' => 10],
'queries' => ['omzet_kota' => 'SELECT kota, SUM(total) AS omzet FROM penjualan WHERE tahun = :tahun GROUP BY kota'],
```

```js
const db = sl.connection("gudang", { type: "bridge", url: "slak-bridge.php", database: "gudang" })
sl.dataframe(await db.run("omzet_kota", { tahun: 2024 }))
```

Tidak butuh SDK Google: token dibuat dari kunci dengan tanda tangan RS256 bawaan PHP (openssl) dan Node.js.

### Pelajaran: Cek jawaban dengan sl.testing

Enam pelajaran yang butuh interaksi (menyalakan toggle, memilih jenis grafik, mengirim form, mengetik chat, membuka halaman lewat tautan, memilih kanal) kini diperiksa otomatis: bila belum dicoba di pratinjau, pemeriksa menjalankan kodemu dengan `sl.testing`, mengisi widget, lalu memeriksa hasilnya. Judul uji yang gagal menjadi petunjuk.

### Lainnya

- `sl.testing`: `page_link(...).click()` dan `at.switch_page(...)` kini berpindah halaman di aplikasi uji saja, tanpa mengubah alamat halaman induk.
- Slak Studio: judul aplikasi dari `set_page_config` kini benar-benar dipakai sebagai judul berkas ekspor.

## Baru di Slak 1.9: versi stabil

Slak 1.9 adalah **versi stabil jangka panjang**: semua 938 nama di **API-STABIL.md** dijamin tetap ada dan tetap bermakna sama sampai Slak 2.0. Aturannya di **KEBIJAKAN-VERSI.md**, dan ringkasan semua versi di **RIWAYAT.md**.

### Kinerja: `sl.worker` dan CSV besar

```js
const df = sl.dataset("penjualan")
const besar = await sl.worker((rows, batas) => rows.filter(r => r.total > batas), df, 500000)
sl.dataframe(sl.DataFrame(besar))
```

`sl.worker(fungsi, ...data)` menjalankan hitungan berat di Web Worker, jadi halaman tetap bisa diklik. Fungsinya dikirim sebagai teks: semua yang dibutuhkan harus dikirim sebagai argumen (tidak boleh memakai variabel dari luar fungsi, termasuk `sl`). DataFrame dikirim sebagai daftar objek. Bila browser menolak worker, fungsi dijalankan biasa. `sl.worker` berlabel eksperimental di 1.9.

`read_csv` untuk berkas di atas 5 MB kini mengurai teks, penanda kosong, angka, ya/tidak, dan tanggal ISO di Web Worker secara otomatis. Hasilnya sama persis dengan cara biasa (diuji pada berkas campuran, desimal koma, tanggal, dan 400.000 baris). Pada CSV 26 MB, halaman hanya membeku sekitar 0,2 detik (sebelumnya 0,8 detik). Opsi `worker: false` mematikannya.

### Aksesibilitas

- Setiap widget punya nama untuk pembaca layar, diambil dari labelnya, juga saat `label_visibility: "collapsed"`.
- Semua kontrol bisa dicapai dengan tombol Tab dan punya garis fokus; area tabel bisa difokus dan digulir dengan papan ketik.
- Toast diumumkan oleh pembaca layar; bilah kemajuan dan kolom chat punya nama.
- Grafik punya teks pengganti otomatis, misalnya "Grafik omzet menurut kota, 6 titik". Opsi `alt` atau `title` memberi teks sendiri.
- Warna teks (`:green[...]`, `:orange[...]`, `:yellow[...]`), menu halaman aktif, pil dan segmen terpilih memenuhi kontras WCAG AA.

Diperiksa otomatis dengan axe-core (alat pengembang, tidak ikut paket) pada halaman contoh, playground, beranda, slak-test.html, dan halaman berisi semua widget: 0 pelanggaran serius atau kritis, di tema terang dan gelap.

### Nama lama Streamlit

`sl.experimental_rerun`, `sl.experimental_dialog`, `sl.experimental_fragment`, `sl.experimental_get_query_params`, `sl.experimental_set_query_params`, `sl.cache`, `sl.experimental_memo`, `sl.experimental_singleton`, `sl.beta_columns`, `sl.beta_expander`, `sl.beta_container`, dan `sl.beta_tabs` tetap bekerja, dengan peringatan sekali di konsol yang menyebut nama barunya. Contoh Streamlit lama jadi lebih mudah disalin.

## Baru di Slak 1.9.1: ikon Sl dan situs dokumentasi

Tambalan untuk seri stabil 1.9: tidak ada nama baru di `sl`, dan uji permukaan API tetap 938 nama.

### Ikon Sl

Slak dan Slak Studio kini memakai ikon **Sl**: kotak teal dengan huruf Sl krem dan titik jingga, sama dengan awalan `sl.` di setiap perintah. Ikon ini ada di Slak Studio (bilah atas, jendela, Tentang), `Slak Studio.exe`, favicon, ikon PWA, `apple-touch-icon.png`, dan sampul buku panduan edisi 1.9.1. Hurufnya dari Inter ExtraBold (SIL Open Font License) yang sudah diubah menjadi garis, jadi tampil sama di semua komputer. Untuk 16 sampai 24 piksel dipakai versi tanpa titik supaya tetap tajam. Aplikasi buatanmu tetap memakai ikon dari `page_icon`.

### Situs resmi dan playground

- Alamat resmi Slak: **https://slak.studio**, dengan salinan resmi **https://slakstudio.github.io** yang isinya sama. `slak.ai.id` dialihkan ke slak.studio.
- Playground pindah ke folder `playground/`, jadi alamatnya `https://slak.studio/playground/`. `playground.html` mengalihkan tautan lama beserta kodenya.
- `Slak.share.official` kini `https://slak.studio/playground/`. `Slak.share.link(kode)` di halaman yang dibuka lewat http(s) tetap memakai halaman itu sendiri (sama dengan 1.9.0), jadi salinan mana pun membuat tautan ke dirinya sendiri; dari Slak Studio atau halaman yang dibuka dengan klik dua kali, tautannya ke playground resmi.
- Dialog **Berkas › Salin tautan berbagi** di Slak Studio memakai playground resmi sebagai bawaan, dengan pilihan salinan resmi atau alamat sendiri.
- **Terbitkan › GitHub Pages** kini mempertahankan berkas `CNAME` di repositori, jadi terbit ulang tidak memutus domain sendiri.
- Paket berisi `.htaccess` untuk cPanel, `robots.txt`, `sitemap.xml`, dan alamat kanonik ke slak.studio di setiap halaman. Langkah lengkapnya di **TERBIT-SITUS.md**.

### slak-docs.js

Berkas tambahan untuk membuat situs dokumentasi dengan Slak sendiri. Semua fungsinya di `Slak.docs` (versi 0.1, berlabel eksperimental) dan menerima `sl` sebagai argumen pertama. Isi bab ditulis dalam Markdown di blok `<script type="text/markdown" id="bab-1">`, lalu:

```js
await Slak.docs.site(sl, { judul: "Panduanku", bab: { "Pengantar": [ { judul: "Mulai", elemen: "bab-1" } ] } })
```

| Fungsi | Kegunaan |
|---|---|
| `Slak.docs.site(sl, { judul, bab })` | Seluruh situs: menu berkelompok, alamat per halaman (`#/alamat`), Sebelumnya/Berikutnya, daftar isi, pencarian |
| `Slak.docs.markdown(sl, teks)` | Isi bab. Blok kode berbahasa `slak` dijalankan dan hasilnya tampil di bawahnya, dengan tautan Buka di Playground; `slak tanpa-jalan` hanya ditampilkan |
| `Slak.docs.toc(sl)` | Daftar isi "Di halaman ini" dengan bagian yang sedang dibaca ditandai |
| `Slak.docs.search(sl, halaman)` | Tombol Cari (Ctrl+K) di seluruh situs |
| `Slak.docs.meta({ deskripsi, gambar, kanonik })` | Deskripsi, gambar pratinjau, dan alamat kanonik |

Isi bab bisa ditulis di halaman (`elemen`), sebagai teks (`isi`), atau dari berkas Markdown (`berkas`, hanya lewat hosting). Situs contohnya ada di `docs/` dan jalan saat dibuka dengan klik dua kali, di Slak Studio, dan di hosting. Contoh di dalam bab berbagi halaman dengan bab itu, jadi contoh yang memakai `sl.navigation`, `sl.set_page_config`, atau `sl.stop` sebaiknya ditandai `tanpa-jalan` dan dicoba lewat Playground.

### Perbaikan

- `sl.testing`: `at.page_link` kini membaca label tautan ke objek halaman (`sl.page_link(halaman, { label })`).
- Buku panduan: ukuran berkas, nama paket, dan jumlah contoh di Bab 1, 2, dan 6 diperbarui.

## Rencana berikutnya

| Versi | Isi |
|---|---|
| ~~1.5~~ | Selesai: jendela Database di Slak Studio dan `sl.duckdb` (lihat di atas) |
| ~~1.6~~ | Selesai: akurasi teruji, batas ukuran data, slak-bridge (PHP/Node.js), libSQL/Turso (lihat di atas) |
| ~~1.7~~ | Selesai: `sl.testing`, daftar paritas Streamlit, komponen kustom dua arah, `sl.ml_demo` dan templat dasbor, tautan berbagi, login dan kuis lewat slak-bridge, `sl.report`, mode sel `// %%` dengan simpanan, galeri 10 komponen, `sl.layout`, panel Uji dan slak-test.html (lihat di atas) |
| ~~1.8~~ | Selesai: terbit sekali klik ke GitHub Pages, Netlify, dan FTP; PWA; BigQuery di Slak Studio dan slak-bridge; paket siap jadi situs resmi; Cek jawaban dengan `sl.testing` (lihat di atas) |
| ~~1.9~~ | Selesai: versi stabil jangka panjang, `sl.worker`, CSV besar di Web Worker, aksesibilitas, API dibekukan, buku edisi lengkap (lihat di atas) |
| ~~1.9.1~~ | Selesai: ikon Sl, situs resmi slak.studio dengan salinan slakstudio.github.io, playground di `playground/`, `slak-docs.js` (lihat di atas) |
| 2.0 | Belum direncanakan rinci. Perubahan yang merusak kode lama hanya boleh di sini, dengan panduan pindah |

SQLite tetap menjadi basis data utama. Semua driver dan pustaka yang ditambahkan harus berlisensi bebas untuk dipakai komersial (DuckDB MIT, tedious MIT, libSQL MIT, klien BigQuery Apache 2.0).

## Perbedaan dengan Streamlit

- Berjalan di browser dengan JavaScript, bukan di server Python. Untuk analisis data, gunakan **Slak Data** (`slak-data.js`), yang namanya dibuat mirip pandas, scipy, dan scikit-learn. Python asli tersedia lewat `sl.python()` (butuh internet).
- Grafik digambar sendiri dengan SVG. Plotly, ECharts, deck.gl (`pydeck_chart`), Mermaid, dan Graphviz tersedia tetapi diunduh dari internet saat dipakai.
- `progress()` memakai skala 0–100.
- Tanggal dari `date_input` berupa string `YYYY-MM-DD`.
- Daftar lengkap per perintah ada di **PARITAS.md**.
- Tidak ada server, jadi `st.secrets`, koneksi langsung ke MySQL/PostgreSQL, serta header dan IP pengunjung tidak tersedia. Login lokal ada sejak 1.4 (`sl.login`); klien database ada di Slak Studio sejak 1.5; sejak 1.6 database di server bisa dipakai lewat `slak-bridge.php`/`slak-bridge.js` dan libSQL/Turso.
- Magic (variabel di baris sendiri otomatis tampil) tidak ada karena JavaScript tidak mendukungnya; gunakan `sl.write`.

## Lisensi

Data batas wilayah di `slak-peta.js` dan `slak-peta-kab.js`: BPS, WFP, dan OCHA ROAP lewat geoBoundaries (CC BY 3.0 IGO). Lihat `Lisensi/geoBoundaries.txt`. Batas dunia di `slak-peta-dunia.js`: Natural Earth (domain publik), lihat `Lisensi/NaturalEarth.txt`.

DuckDB di `slak-duckdb.js`: duckdb-wasm dan DuckDB (MIT), Apache Arrow (Apache 2.0); lihat `Lisensi/DuckDB.txt` dan `Lisensi/Apache-Arrow.txt`.

Nama emoji dan ikon di `slak.js`: emojilib (MIT), Unicode CLDR (Unicode License v3), Google Material Symbols (Apache 2.0); alias pendek bahasa Indonesia ditulis untuk Slak. Semua komponen yang dibundel boleh dipakai, diubah, dan dipakai untuk tujuan komersial tanpa membayar; sertakan folder `Lisensi/` saat membagikan ulang. Dataset online tidak dibundel: data diunduh dari sumbernya dan mengikuti lisensi masing-masing.


**Slak berlisensi MIT** (lihat berkas `LICENSE`): bebas dipakai, disalin, diubah, dan dipakai untuk tujuan komersial tanpa membayar. Syaratnya hanya satu: catatan hak cipta dan teks lisensinya ikut disertakan (komentar di awal setiap berkas `slak*.js` sudah memenuhinya). Lisensi ini berlaku untuk `slak*.js`, Slak Studio, `slak-bridge.php`, dan `slak-bridge.js`. Kode Slak ditulis dari nol dan tidak mengandung kode Streamlit. Hindari memakai nama atau logo Streamlit untuk proyek turunan; menyebut "terinspirasi Streamlit" umumnya tidak masalah.
