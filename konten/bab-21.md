Portofolio Slak adalah situs statis: hanya berkas HTML dan JavaScript. Situs ini bisa diunggah ke hosting apa pun yang menampilkan halaman web, termasuk cPanel, GitHub Pages, dan Netlify, tanpa server Python, database, atau perintah terminal.

![Contoh portofolio: dasbor analisis penjualan multi-halaman dengan filter, KPI, tren, dan grafik](konten/gambar/contoh-portofolio-dasbor-analisis-penjualan-mult.png)

## 21.1 Menyusun cerita portofolio

1.  **Pertanyaan bisnis**: tulis di awal halaman, misalnya "kota dan produk mana yang paling berharga?"

2.  **Data**: sebutkan sumbernya dan langkah pembersihannya.

3.  **Temuan**: 3–4 metric utama, grafik tren, dan perbandingan.

4.  **Rekomendasi**: tulis dengan `sl.markdown`, bukan hanya grafik.

5.  **Metode**: SQL, uji statistik, atau model yang dipakai.

Contoh **Portofolio Analisis Penjualan** di galeri Slak Studio, dan `contoh-analisis.html` di paket Slak, mengikuti struktur ini dalam empat halaman: Ringkasan, Produk, Pelanggan, dan Temuan.

Sejak Slak 1.6, galeri contoh juga punya **Templat Portofolio**: halaman profil dengan nama, peran, keahlian, tombol kontak, dan kartu proyek, ditambah satu halaman analisis dan halaman "Tentang". Kartu proyek bisa membuka halaman di aplikasi yang sama (`page_link`) atau berkas HTML lain hasil ekspor proyekmu (`link_button`). Cukup ganti isi `PROFIL` dan `PROYEK` di bagian atas kode. Temuan di halaman analisis dihitung langsung dari data, jadi tetap benar saat datanya kamu ganti.

![Templat Portofolio di galeri contoh Slak 1.6](konten/gambar/templat-portofolio-di-galeri-contoh-slak-1-6.png)

## 21.2 Data milikmu

Simpan skrip `.slak` di folder yang sama dengan berkas data, lalu baca dengan nama berkasnya:

```slak tanpa-jalan
const df = await sl.read_csv("penjualan.csv")
const target = await sl.read_excel("target.xlsx")
```

Saat ekspor, Slak Studio mencari nama berkas `.csv`, `.tsv`, `.json`, `.xlsx`, `.db`, dan `.sqlite` di kodemu, lalu **menyematkan** isinya ke halaman. Halaman hasil ekspor tetap bisa dibuka dengan klik dua kali maupun dari hosting. Berkas yang tidak ditemukan disebutkan dalam peringatan.

## 21.3 Ekspor folder situs

Pilih **Berkas → Ekspor folder situs (portofolio)** atau tekan **Ctrl+Shift+E**. Slak Studio membuat folder berisi:

| Berkas               | Isi                                                 |
|----------------------|-----------------------------------------------------|
| `index.html`         | Aplikasimu beserta data yang disematkan             |
| `slak.js`            | Pustaka inti                                        |
| `slak-data.js`       | Ikut bila kode memakai Slak Data                    |
| `slak-sql.js`        | Ikut bila kode memakai `sl.sql` atau `sl.sqlite`    |
| `PANDUAN-UNGGAH.txt` | Langkah unggah ke cPanel, GitHub Pages, dan Netlify |

**Ekspor HTML** (Ctrl+E) tetap tersedia untuk satu berkas mandiri, misalnya untuk dikirim lewat email.

## 21.4 Mengunggah

| Tempat       | Langkah                                                                             | Alamat hasil                          |
|--------------|-------------------------------------------------------------------------------------|---------------------------------------|
| cPanel       | File Manager → `public_html` (atau subfolder) → Upload semua berkas                 | `https://domainmu.com/`               |
| GitHub Pages | Repositori baru → Add file → Upload files → Settings → Pages → Deploy from a branch | `https://namamu.github.io/nama-repo/` |
| Netlify      | Buka `app.netlify.com/drop`, seret folder situs                                     | Alamat acak yang bisa diganti         |

## 21.5 Yang perlu diketahui saat online

- Setiap pengunjung menjalankan aplikasi di browsernya sendiri. Analisis, grafik, dan model berjalan di komputer pengunjung, jadi hosting murah pun cukup.

- Data milik pengunjung (`sl.local_state`, `sl.db`, `sl.sqlite`) tersimpan di browser masing-masing dan tidak terlihat oleh pengunjung lain. Untuk data bersama, pakai `slak-bridge.php` di hosting yang sama, atau libSQL/Turso (Bab 33).

- Data yang disematkan bisa dilihat siapa saja lewat "View source". Jangan menyematkan data pribadi atau rahasia; gunakan data sintetis atau data yang sudah dianonimkan.

- `sl.python()` memuat Python dari internet di browser pengunjung.
