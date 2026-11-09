Widget bawaan Slak sudah banyak, tetapi kadang kamu butuh yang khusus: rating bintang, pemilih kursi, papan tanda tangan. Sejak 1.7, **sl.component** menjalankan HTML dan JavaScript buatanmu di bingkai terpisah, lalu mengirim nilainya kembali ke Slak seperti widget biasa. Protokol pesannya sama dengan komponen Streamlit, jadi komponen Streamlit yang sudah di-build juga bisa dipakai.

## 36.1 Komponen pertama

```slak
const hitung = sl.component(`
<button id="b" style="font: 16px sans-serif; padding: 6px 14px">Tambah</button>
<script>
  let n = 0
  Slak.component.onRender(args => { n = args.mulai })
  document.getElementById("b").onclick = () => Slak.component.setValue(++n)
<\/script>`, { args: { mulai: 0 }, key: "hitung", default: 0 })
sl.metric("Sudah diklik", hitung)
```

Alurnya dua arah. Slak mengirim `args` ke komponen setiap kali nilainya berubah. Komponen mengirim nilai dengan `setValue`, lalu aplikasi dijalankan ulang dan `sl.component(...)` mengembalikan nilai itu. Tulis `<\/script>` (dengan garis miring terbalik) di dalam teks HTML supaya tidak menutup skrip halaman.

![Tiga komponen: tombol penghitung, isian kota, dan rating bintang, dengan nilainya di bawah masing-masing](konten/gambar/tiga-komponen-tombol-penghitung-isian-kota-dan-r.png)

## 36.2 Di dalam komponen

| Bagian                           | Gunanya                                                                                           |
|----------------------------------|---------------------------------------------------------------------------------------------------|
| `Slak.component.args`            | data dari Slak (DataFrame dikirim sebagai daftar objek)                                           |
| `Slak.component.onRender(fn)`    | dipanggil saat args tiba atau berubah                                                             |
| `Slak.component.setValue(nilai)` | mengirim nilai ke Slak; teks, angka, objek, atau `Uint8Array`                                     |
| `Slak.component.setHeight(px)`   | mengatur tinggi bingkai; bawaannya menyesuaikan isi                                               |
| `Slak.component.theme`           | warna tema aplikasi; juga tersedia sebagai variabel CSS `--slak-fg`, `--slak-bg`, `--slak-accent` |
| `Slak.component.disabled`        | `true` bila komponen dinonaktifkan                                                                |

Objek `Streamlit` (`setComponentValue`, `setFrameHeight`, `setComponentReady`, `events`) juga tersedia, sehingga kode komponen Streamlit tanpa pustaka bisa disalin apa adanya. Saat pengguna mengganti tema terang atau gelap, tema baru dikirim ulang ke semua komponen.

## 36.3 Komponen dari folder, termasuk komponen Streamlit

Komponen yang sudah jadi disimpan sebagai folder berisi `index.html`, misalnya folder **build/** dari paket komponen Streamlit. Taruh foldernya di samping berkas `.slak` atau halaman HTML, lalu:

```slak
const bintang = sl.components.declare_component("bintang", { url: "bintang" })
const nilai = bintang({ label: "Nilai layanan", maxValue: 5, key: "rating", default: 3 })
sl.write("Nilai:", nilai)
```

Seperti di Streamlit, `key`, `default`, dan `on_change` dipakai Slak, sisanya dikirim ke komponen sebagai args. Di Slak Studio, folder komponen dibaca dari samping berkas `.slak` yang sudah disimpan, dan ikut tersalin saat **Ekspor folder situs**.

Yang belum didukung: tabel dalam format Arrow yang dikirim dari komponen (`dataType: "dataframe"`). Slak menampilkan pesan, dan komponen sebaiknya mengirim daftar objek. `sl.components.html(html, { height })` menampilkan HTML di bingkai tanpa nilai kembali, padanan `st.components.v1.html`.

Contoh lengkap ada di galeri Slak Studio: **Komponen Kustom: Rating Bintang**.

## 36.4 Galeri 10 komponen siap pakai

Untuk kebutuhan yang umum, kamu tidak perlu menulis komponen sendiri. Berkas `slak-komponen.js` berisi sepuluh komponen yang dipanggil dengan namanya:

```slak tanpa-jalan
const nilai = sl.component("rating", { label: "Nilai pelayanan", max: 5, key: "nilai" })
const [awal, akhir] = sl.component("rentang_tanggal", { min: "2024-01-01", max: "2024-12-31", key: "periode" })
const hari = sl.component("kalender_heatmap", { data: df, date: "tanggal", value: "total", year: 2024, key: "kal" })
```

| Nama             | Untuk                                                        | Nilai yang dikembalikan              |
|------------------|--------------------------------------------------------------|--------------------------------------|
| rating           | memberi nilai bintang                                        | angka 0 sampai max                   |
| sketsa           | tanda tangan atau coretan                                    | gambar PNG (data URL), atau null     |
| rentang_tanggal  | periode, dengan tombol 7 hari, 30 hari, bulan ini, tahun ini | \[awal, akhir\] sebagai "YYYY-MM-DD" |
| kalender_heatmap | nilai harian setahun, seperti grafik kontribusi GitHub       | { tanggal, nilai } hari yang diklik  |
| kanban           | memindah kartu tugas antarkolom                              | daftar kartu { id, judul, kolom }    |
| titik_peta       | memilih lokasi di peta OpenStreetMap                         | { lat, lon }                         |
| editor_kode      | menulis SQL, JavaScript, atau Python                         | teks kode saat Ctrl+Enter            |
| pengatur_waktu   | stopwatch atau hitung mundur                                 | { detik, berjalan, selesai }         |
| papan_skor       | skor lomba atau kuis kelas                                   | { tim: skor }                        |
| tombol_suara     | ucapan menjadi teks                                          | teks hasil ucapan                    |

Muat `<script src="slak-komponen.js"></script>` sesudah slak.js. Di Slak Studio berkas ini otomatis tersedia dan ikut disertakan saat ekspor bila dipakai. Opsi setiap komponen ada di panel Referensi (kelompok **Galeri komponen**), dan semuanya bisa dicoba di contoh **Galeri Komponen**. `titik_peta` butuh internet untuk gambar peta, dan `tombol_suara` memakai pengenalan suara browser yang ada di Chrome dan Edge; di browser lain muncul kotak ketik sebagai gantinya.

Sumber setiap komponen ada di folder `komponen/` paket Slak, berlisensi MIT, jadi boleh disalin dan diubah. Komponen buatanmu juga bisa diberi nama: `Slak.registerComponent("nama", { html: "<...>", default: args => nilai_awal })`, lalu dipanggil dengan `sl.component("nama", { ... })`.
