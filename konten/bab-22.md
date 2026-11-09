Data analyst sering diminta menunjukkan **di mana** sesuatu terjadi: sebaran pelanggan, distribusi barang per wilayah, lokasi gudang. Sejak 1.3, Slak punya peta yang bekerja **tanpa internet**. Batas 38 provinsi (termasuk Papua Selatan, Papua Tengah, Papua Pegunungan, dan Papua Barat Daya) dan titik tengah 514 kab/kota sudah ada di dalam pustaka, jadi peta tetap tampil saat halaman dibuka dengan klik dua kali.

## 22.1 Menyiapkan

Di Slak Studio tidak ada yang perlu disiapkan. Di halaman HTML biasa, tambahkan `slak-peta.js` sesudah `slak.js`:

```html
<script src="slak.js"></script>
<script src="slak-data.js"></script>   <!-- bila memakai DataFrame -->
<script src="slak-peta.js"></script>
```

Berkas `slak-peta-kab.js` (batas poligon kab/kota, sekitar 580 KB) hanya dibutuhkan untuk choropleth tingkat kab/kota. Letakkan di folder yang sama; Slak memuatnya otomatis bila perlu. Ekspor dari Slak Studio menyertakannya bila kodemu memakainya.

## 22.2 Peta titik dan gelembung

Bila datamu punya kolom koordinat, cukup sebutkan kolomnya. Kolom bernama `lat`/`lon`, `latitude`/`longitude`, atau `lintang`/`bujur` dikenali otomatis.

```slak tanpa-jalan
sl.map(toko, { lat: "lat", lon: "lon" })
sl.map(toko, { size: "omzet", color: "kanal", label: "nama", tooltip: ["omzet", "kanal"] })
```

| Opsi              | Arti                                                                                                   |
|-------------------|--------------------------------------------------------------------------------------------------------|
| `size`            | Kolom angka untuk ukuran gelembung, atau angka untuk jari-jari tetap                                   |
| `color`           | Kolom angka (gradasi warna) atau kategori (warna berbeda); bisa juga warna tetap seperti `"#ea580c"`   |
| `colors`          | Palet: `"teal"`, `"biru"`, `"hijau"`, `"merah"`, `"oranye"`, `"ungu"`, atau larik warna                |
| `label`           | Kolom teks yang ditulis di samping titik                                                               |
| `tooltip`         | Kolom yang tampil saat kursor di atas titik                                                            |
| `format`          | Format angka, misalnya `"rp"` atau `"compact"`                                                         |
| `height`, `title` | Tinggi peta (bawaan 460 piksel) dan judul                                                              |
| `center`, `zoom`  | Titik tengah `[lat, lon]` dan tingkat perbesaran; bila tidak diisi, peta menyesuaikan diri dengan data |

Geser peta dengan menyeret, perbesar dengan roda tetikus, dua jari, tombol **+ / −**, atau tombol panah dan **+ / −** di papan ketik. Tombol **⌂** mengembalikan tampilan awal. Tombol **PNG** dan **SVG** mengunduh peta lengkap dengan judul dan legenda.

## 22.3 Peta dari nama wilayah

Kebanyakan data bisnis tidak punya koordinat, hanya nama kota atau provinsi. Pakai opsi `region`; Slak mencarikan titik tengahnya dan menjumlahkan baris dengan wilayah yang sama.

```slak
const df = sl.dataset("penjualan")
const perKota = df.groupby("kota").agg({ omzet: ["total", "sum"] })
sl.map(perKota, { region: "kota", size: "omzet", label: "kota" })
```

Pencocokan nama dibuat toleran:

- Singkatan provinsi: Jabar, Jateng, Jatim, NTB, NTT, Kaltara, Sulsel, Kepri, Babel, DKI, DIY, Pabar, PBD.

- Awalan dan akhiran: Prov., Provinsi, Kab., Kabupaten, Kota, Regency, City.

- Ibu kota kabupaten yang lazim ditulis di data: Timika → Kab. Mimika, Wamena → Kab. Jayawijaya, Sentani → Kab. Jayapura, Biak → Kab. Biak Numfor, Cikarang → Kab. Bekasi, dan sekitar 200 lainnya.

- Nama lama: Toba Samosir → Toba, Maluku Tenggara Barat → Kepulauan Tanimbar.

- Salah ketik ringan: Surabya, Makasar.

Nama yang sama untuk kabupaten dan kota (misalnya Bandung) diartikan sebagai **kota**; tulis "Kab. Bandung" untuk kabupatennya. Wilayah yang tidak dikenali dilaporkan di bawah peta, jadi tidak ada data yang hilang diam-diam.

## 22.4 Klaster, heatmap, dan rute

```slak tanpa-jalan
sl.map(titik, { cluster: true })                     // titik berdekatan digabung, klik untuk memperbesar
sl.map(titik, { heatmap: true })                     // peta kepadatan; heatmap: { radius: 30, weight: "jumlah" }
sl.map(kunjungan, { route: { arrows: true }, label: "kota" })      // garis mengikuti urutan baris
sl.map(kirim, { lat: "asal_lat", lon: "asal_lon", to_lat: "lat", to_lon: "lon", width: "jumlah" })  // aliran asal-tujuan
```

Beberapa lapisan bisa digabung dengan opsi `layers`, misalnya heatmap di bawah titik gudang:

```slak tanpa-jalan
sl.map(pelanggan, { heatmap: true, layers: [{ type: "points", data: gudang, label: "nama", radius: 7 }] })
```

## 22.5 Choropleth: mewarnai wilayah

```slak tanpa-jalan
sl.choropleth(perProv, { region: "provinsi", value: "omzet", labels: true, format: "compact" })
```

| Opsi                | Arti                                                                                                                                                  |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `level`             | `"provinsi"` atau `"kabkota"`; bila kosong, ditebak dari nama di data                                                                                 |
| `value`, `agg`      | Kolom nilai dan cara menggabungkan (`"sum"`, `"mean"`, `"median"`, `"count"`, `"max"`, `"min"`). Tanpa `value`, wilayah diwarnai menurut jumlah baris |
| `bins`              | `5` untuk 5 kelas kuantil, atau larik batas seperti `[100, 500, 1000]`                                                                                |
| `colors`, `reverse` | Palet satu arah (`"teal"`, `"biru"`, …) atau dua arah (`"merah-biru"`, `"merah-hijau"`); `midpoint` mengatur titik tengah palet dua arah              |
| `labels`            | `true` menulis nilai di wilayah yang cukup besar; `"nama"` menulis nama wilayah                                                                       |
| `tooltip`           | Kolom tambahan di tooltip                                                                                                                             |
| `missing_color`     | Warna wilayah tanpa data                                                                                                                              |

Kelas kuantil (`bins`) dianjurkan untuk data yang timpang, misalnya omzet DKI Jakarta yang jauh di atas provinsi lain, agar perbedaan antarprovinsi lain tetap terlihat.

## 22.6 Memilih wilayah atau titik dengan klik

Dengan `on_select: "rerun"`, peta berperilaku seperti widget: klik wilayah atau titik mengembalikan pilihannya, klik lagi membatalkan.

```slak tanpa-jalan
const pilih = sl.choropleth(perProv, { region: "provinsi", value: "omzet", on_select: "rerun", key: "peta" })
if (pilih) sl.dataframe(df.filter({ provinsi: pilih.region }))
```

Objek pilihan wilayah berisi `region`, `code` (kode provinsi BPS), `level`, `value`, `rows` (baris data wilayah itu), `index`, `lat`, dan `lon`. Pilihan titik berisi `index`, `row`, `lat`, `lon`.

## 22.7 Alat bantu sl.geo

| Fungsi                                                   | Kegunaan                                    |
|----------------------------------------------------------|---------------------------------------------|
| `sl.geo.distance(lat1, lon1, lat2, lon2)`                | Jarak dalam kilometer                       |
| `sl.geo.geocode(df, "kota")`                             | Menambah kolom `wilayah_baku`, `lat`, `lon` |
| `sl.geo.match("Timika")`                                 | Nama baku, provinsi, jenis, dan koordinat   |
| `sl.geo.centroid("Papua Tengah")`                        | Titik tengah wilayah                        |
| `sl.geo.province_of(lat, lon)`                           | Provinsi tempat titik berada                |
| `sl.geo.kabkota_of(lat, lon)`                            | Kab/kota tempat titik berada                |
| `sl.geo.contains("Bali", lat, lon)`                      | Apakah titik di dalam wilayah               |
| `sl.geo.nearest(df, lat, lon, { k: 3 })`                 | Baris terdekat beserta `jarak_km`           |
| `sl.geo.provinces()`, `sl.geo.kabkota("Papua")`          | Daftar wilayah bawaan                       |
| `sl.geo.to_geojson(df)`, `sl.geo.boundaries("provinsi")` | Ekspor ke GeoJSON                           |

Contoh: menambahkan kolom provinsi ke data per kota, lalu memetakannya.

```slak tanpa-jalan
const data = sl.geo.geocode(perKota, "kota").assign({ provinsi: r => sl.geo.match(r.wilayah_baku).provinsi })
sl.choropleth(data, { region: "provinsi", value: "omzet" })
```

## 22.8 Batas sendiri dan latar peta daring

Untuk batas lain (kecamatan, zona penjualan, wilayah negara lain), baca GeoJSON atau TopoJSON lalu berikan ke opsi `geojson`. Slak menebak properti nama yang cocok dengan datamu; tentukan sendiri dengan `feature_key` bila perlu.

```slak tanpa-jalan
const zona = await sl.read_geojson("zona-penjualan.geojson")
sl.choropleth(target, { geojson: zona, region: "zona", value: "capaian", feature_key: "NAMA_ZONA" })
sl.map({ layers: [{ type: "geojson", geojson: zona, labels: true }] })
```

Latar peta daring bisa dinyalakan dengan `tiles`: `"osm"` (OpenStreetMap), `"carto"`, `"carto-dark"`, `"topo"`, atau templat URL berisi `{z}/{x}/{y}`. Opsi ini butuh internet; tanpa internet, pakai latar bawaan.

Sejak September 2026, CARTO mewajibkan kunci untuk ubin `"carto"` dan `"carto-dark"` (gratis untuk pemakaian kecil, berbayar untuk pemakaian komersial besar). Tanpa kunci, Slak 1.6 memakai ubin OpenStreetMap yang diwarnai abu-abu terang atau gelap sehingga tampilannya mirip, tanpa biaya. Bila kamu punya kunci CARTO, tulis `sl.set_option("tiles.carto_key", "KUNCIMU")` atau `{ tiles: "carto", tiles_key: "KUNCIMU" }`. OpenStreetMap sendiri meminta situs dengan pengunjung sangat banyak memakai penyedia ubin sendiri.

## 22.9 Ketelitian data dan atribusi

Batas wilayah berasal dari BPS, WFP, dan OCHA ROAP lewat geoBoundaries (CC BY 3.0 IGO), digabung dan disederhanakan oleh Slak agar ringan. Batas ini cocok untuk visualisasi, tetapi bukan untuk pengukuran resmi. Atribusi ditulis otomatis di pojok peta; biarkan tetap tampil saat peta dipakai di portofolio. Contoh **Peta Penjualan** di galeri (berkas `contoh-peta.html`) memakai semua teknik di bab ini.
