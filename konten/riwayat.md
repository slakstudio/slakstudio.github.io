# Riwayat Slak 1.0 sampai 1.9.1

Ringkasan setiap versi. Penjelasan lengkap ada di README.md (bagian "Baru di Slak …") dan di buku panduan.

| Versi | Tema | Isi utama |
|---|---|---|
| 1.9.1 | Tambalan: ikon dan situs | Ikon Sl di Slak Studio, exe, favicon, PWA, dan sampul buku; situs resmi slak.studio dengan salinan resmi slakstudio.github.io; playground di `playground/` dan `Slak.share.official`; `slak-docs.js` 0.1 untuk situs dokumentasi; `.htaccess`, `robots.txt`, `sitemap.xml`; TERBIT-SITUS.md |
| 1.9 | Penyempurnaan, versi stabil | `sl.worker` (Web Worker) dan CSV besar yang diurai di latar; aksesibilitas (label untuk pembaca layar, papan ketik, kontras, teks grafik); API dibekukan (API-STABIL.md, uji permukaan API, nama lama Streamlit, KEBIJAKAN-VERSI.md); penyapuan galat; buku edisi lengkap |
| 1.8 | Publikasi | Terbit sekali klik ke GitHub Pages, Netlify, dan FTP/FTPS; PWA; Google BigQuery di Slak Studio dan slak-bridge; paket siap menjadi playground resmi; Cek jawaban pelajaran dengan `sl.testing` |
| 1.7 | Menguji, berbagi, melaporkan | `sl.testing`, paritas 104 perintah Streamlit, komponen kustom dua arah dan galeri 10 komponen, `sl.ml_demo`, templat dasbor dan `sl.layout`, tautan berbagi, login dan kuis lewat slak-bridge, `sl.report`, mode sel |
| 1.6 | Kepercayaan dan database server | Uji akurasi terhadap pandas/scipy/statsmodels/scikit-learn, batas ukuran data, slak-bridge.php dan slak-bridge.js, libSQL/Turso, lisensi MIT |
| 1.5 | Klien database | `sl.duckdb` untuk data besar, jendela Database di Slak Studio (SQLite, PostgreSQL, MySQL, MariaDB, SQL Server) |
| 1.4 | Login dan emoji | `sl.login` dengan bcrypt dan peran, emoji dan ikon bernama, dataset online |
| 1.3.2 | Data besar | CSV dan DataFrame lebih cepat, peta dunia, `read_csv` saat dibuka dengan klik dua kali |
| 1.3.1 | Setara Streamlit | Celah Streamlit yang mungkin di browser ditutup, `sl.crypto`, SQL yang juga jalan di PostgreSQL |
| 1.3 | Peta | Peta titik, gelembung, choropleth 38 provinsi, rute, batas kab/kota luring |
| 1.2 | Slak Data | DataFrame gaya pandas, SQL SQLite, statistik, machine learning, deret waktu, `sl.python` |
| 1.1 | Aplikasi nyata | Multi-halaman, `sl.local_state`, `sl.db`, `sl.data_editor` |
| 1.0 | Inti | Model jalan ulang, widget, state, form, grafik dasar, chat, Slak Studio |

## Perbaikan galat di 1.9

| Bagian | Perbaikan |
|---|---|
| Aksesibilitas | Kotak pilih, isian, dan area tabel kini punya nama untuk pembaca layar; kepala kolom indeks tidak lagi kosong; bilah kemajuan bernama; kolom chat bernama; tombol hapus pilihan menyebut pilihannya |
| Kontras warna | Warna teks `:green[...]`, `:orange[...]`, `:yellow[...]`, menu halaman aktif, pil dan segmen terpilih, serta pewarnaan JSON memenuhi kontras WCAG AA di tema terang |
| sl.testing | Tautan halaman dan `switch_page` di aplikasi uji tidak lagi mengubah alamat halaman induk (1.8) |
| Slak Studio | Judul aplikasi dari `set_page_config` dipakai sebagai judul berkas ekspor (1.8) |

## Perbaikan galat di 1.9.1

| Bagian | Perbaikan |
|---|---|
| sl.testing | `at.page_link` membaca label tautan ke objek halaman (`sl.page_link(halaman, { label })`); sebelumnya labelnya kosong |
| Slak Studio | Terbitkan › GitHub Pages tidak lagi menghapus berkas `CNAME` (domain sendiri) di repositori saat terbit ulang |
| Slak.share | Tautan dari Slak Studio dan halaman yang dibuka dengan klik dua kali kini menuju playground resmi; sebelumnya alamatnya harus diisi sendiri |
| Buku panduan | Ukuran `slak.js` dan berkas ekspor, nama paket Slak Studio, dan jumlah contoh di Bab 1, 2, dan 6 disesuaikan dengan keadaan sekarang |
