Slak 1.4 menambah empat hal: emoji dan ikon yang ditulis dengan nama, login dengan peran pengguna, dataset dari internet yang tetap jalan tanpa internet, dan satu contoh siap jalan untuk setiap fungsi. Semua komponen yang ikut dibundel boleh dipakai, diubah, dan dijual tanpa membayar.

## 29.1 Emoji dan ikon dengan nama

Tulis emoji dengan nama di antara titik dua. Slak mengenali tiga jenis nama di semua teks: judul, markdown, label tombol, tab, dan `page_icon`.

| Jenis nama               | Contoh                                | Jumlah        | Sumber                                  |
|--------------------------|---------------------------------------|---------------|-----------------------------------------|
| Nama Streamlit (Inggris) | `:rocket:`, `:bar_chart:`             | 1.570         | emojilib, sama dengan nama di Streamlit |
| Nama resmi Indonesia     | `:kantung_uang:`, `:wajah_tersenyum:` | sekitar 1.900 | Unicode CLDR bahasa Indonesia           |
| Alias pendek Indonesia   | `:uang:`, `:senyum:`, `:jempol:`      | 185           | ditulis untuk Slak                      |

```slak
sl.title("Laporan :bar_chart:")          // nama Streamlit
sl.write("Omzet naik :kantung_uang:")    // nama resmi Indonesia
sl.write("Mantap :jempol: :senyum:")     // alias pendek
sl.button("Simpan", { icon: ":material/save:" })
```

Bila satu nama dipakai dua jenis, nama Streamlit yang menang, jadi kode Streamlit yang dipindahkan tampil sama persis. Sekitar 250 ikon Material umum (`:material/home:`, `:material/save:`, `:material/download:`) ikut dibundel dan tampil tanpa internet. Ikon lain tetap bisa dipakai bila ada internet.

Lupa namanya? Di editor Slak Studio, ketik `:` lalu beberapa huruf di dalam teks, misalnya `:uang`, dan pilih dari saran. Atau buka **Alat › Cari ikon dan emoji** untuk mencari dengan kata Indonesia atau Inggris lalu menyalin namanya. Dari kode: `sl.emoji("rocket")`, `sl.emoji.search("uang")`, dan `sl.emoji.icons()`.

![Emoji dengan tiga jenis nama dan hasil pencarian](konten/gambar/emoji-dengan-tiga-jenis-nama-dan-hasil-pencarian.png)

## 29.2 Login dan peran pengguna

`sl.login` menampilkan formulir masuk dan menghentikan skrip sampai pengguna berhasil masuk. Password ditulis sebagai hash bcrypt, bukan teks polos. Buat hash lewat **Alat › Lindungi password untuk sl.login**: ketik password, salin hasilnya.

```slak tanpa-jalan
const user = await sl.login({
  users: {
    ani:  { password: "$2y$10$qlFsqVOQ2Fg.JoyEeObqGuxcui98Wciz2a5XQWUPHSKXffI4ng3sy", name: "Ani", role: "admin" },
    budi: { password: "$2y$10$1CqnlJsbMyNlswHM.h5IJO3XSrqx5dBpnknnMT4Sb/2wV/yyP0uEa", name: "Budi", role: "kasir" }
  },
  title: ":convenience_store: Toko Maju"
})

sl.navigation([
  sl.page("Kasir", kasir),
  sl.page("Laporan", laporan, { roles: ["admin"] })
]).run()
```

Setelah masuk, `sl.user` berisi `username`, `name`, `role`, dan `has_role("admin")`. Tombol **Keluar** muncul di sidebar. Halaman dengan `roles` tidak tampil di menu bagi pengguna tanpa peran itu, dan `sl.require_role("admin")` menghentikan halaman dengan pesan. Daftar pengguna juga bisa berupa DataFrame atau fungsi yang membaca dari sl.db atau SQLite; `register: true` menambah tab Daftar.

![Formulir masuk sl.login](konten/gambar/formulir-masuk-sl-login.png)

**Batasnya:** login ini berjalan sepenuhnya di browser, sesuai semangat "HTML dan JavaScript saja". Ia cocok untuk memisahkan tampilan kasir dan admin, atau kelas dan guru. Ia tidak menyembunyikan data dari orang yang membuka kode halaman. Perlindungan sungguhan butuh server, yang tersedia sejak Slak 1.7 lewat slak-bridge (Bab 39).

## 29.3 Dataset online yang tetap jalan tanpa internet

Enam fungsi baru mengambil data terbuka langsung dari sumbernya:

| Fungsi           | Sumber                                        | Contoh                                                             |
|------------------|-----------------------------------------------|--------------------------------------------------------------------|
| `sl.open_data`   | Katalog 15 dataset pilihan beserta lisensinya | `await sl.open_data("penguins")`                                   |
| `sl.github`      | Berkas CSV/JSON/Excel di GitHub               | `await sl.github("plotly/datasets/2014_usa_states.csv")`           |
| `sl.worldbank`   | Indikator Bank Dunia per negara dan tahun     | `await sl.worldbank("NY.GDP.PCAP.CD", { negara: ["IDN", "MYS"] })` |
| `sl.huggingface` | Dataset Hugging Face                          | `await sl.huggingface("scikit-learn/iris", { file: "Iris.csv" })`  |
| `sl.kaggle`      | Dataset Kaggle                                | `await sl.kaggle("uciml/iris", { file: "Iris.csv" })`              |
| `sl.read_url`    | Alamat CSV, JSON, Excel, atau zip mana pun    | `await sl.read_url("https://…/data.csv")`                          |

Setiap unduhan disimpan di browser selama 7 hari (atur dengan `ttl`), jadi aplikasi tetap jalan saat internet putus. Supaya jalan di komputer mana pun, juga saat dibuka dengan klik dua kali, tambahkan `sl.offline_button()`. Tombol itu mengunduh data sebagai berkas `.csv.js`; taruh berkasnya di folder halaman, dan `sl.open_data("penguins")` membacanya tanpa internet. Di Slak Studio, **Alat › Unduh dataset** langsung menyimpan data ke folder proyek.

**Kaggle** tidak mengizinkan browser mengunduh langsung. Di Slak Studio, unduhan lewat aplikasi berjalan biasa (dataset privat butuh berkas `kaggle.json` di folder `.kaggle` pengguna). Di browser biasa, Slak meminta berkas zip hasil unduhan manual dari situs Kaggle, lalu mengingatnya.

Selalu periksa kolom `lisensi` di `sl.open_data.list()` sebelum memakai data untuk tujuan komersial. Beberapa dataset klasik (tips, titanic, flights) tidak menyatakan lisensi di sumbernya.

![Katalog open_data dan grafik penguin](konten/gambar/katalog-open-data-dan-grafik-penguin.png)

## 29.4 Contoh untuk setiap fungsi

Setiap fungsi di Referensi Slak Studio (F1) kini punya tombol **Contoh**. Tombol itu membuka kode contoh beserta hasilnya yang hidup; **Coba di editor** menyalinnya ke berkas baru untuk diubah. Contoh yang sama, lengkap dengan gambar hasilnya, ada di Katalog API di akhir buku. Ada juga tiga pelajaran baru di playground: emoji dan ikon, login dan peran, serta dataset online.

## 29.5 Lisensi komponen yang dibundel

Semua yang ikut dibundel di Slak 1.4 boleh dipakai, diubah, dan dipakai untuk tujuan komersial tanpa membayar. Salinan lisensinya ada di folder `Lisensi/`.

| Komponen               | Dipakai untuk                     | Lisensi                               |
|------------------------|-----------------------------------|---------------------------------------|
| emojilib 2.4           | Nama emoji gaya Streamlit         | MIT                                   |
| Unicode CLDR           | Nama resmi emoji bahasa Indonesia | Unicode License v3                    |
| Material Symbols       | Sekitar 250 ikon luring           | Apache 2.0                            |
| Alias pendek Indonesia | `:uang:`, `:senyum:`, dan lainnya | Ditulis untuk Slak, ikut lisensi Slak |

Dataset online tidak dibundel: data diunduh pengguna dari sumbernya dan tunduk pada lisensi masing-masing.
