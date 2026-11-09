Bab ini menjawab tiga pertanyaan jujur yang biasanya muncul sebelum orang memakai alat baru untuk portofolio: apakah hasil hitungannya benar, seberapa besar data yang sanggup ditangani, dan apa yang aman disimpan di halaman Slak. Semua angka di bab ini hasil pengukuran Slak 1.6, dan skrip pengujinya ikut disertakan di kode sumber (folder `test/akurasi` dan `test/ukuran`) sehingga siapa pun bisa mengulanginya.

## 32.1 Akurasi: dibandingkan dengan pandas, scipy, statsmodels, dan scikit-learn

Setiap fungsi hitung Slak Data dijalankan pada data yang sama dengan pustaka Python yang menjadi standar analis data, lalu hasilnya dibandingkan angka demi angka. Hasil dianggap cocok bila selisih relatifnya di bawah satu per sejuta; untuk fungsi yang memakai pengacakan (k-means, random forest, validasi silang, bootstrap) dipakai toleransi yang disebutkan di laporan.

| Kelompok                                              | Kasus uji | Cocok   | Beda disengaja | Pembanding                     |
|-------------------------------------------------------|-----------|---------|----------------|--------------------------------|
| Series                                                | 35        | 34      | 1              | pandas, numpy, scipy           |
| Series.str dan Series.dt                              | 11        | 10      | 1              | pandas                         |
| DataFrame                                             | 28        | 28      | 0              | pandas                         |
| groupby dan resample                                  | 11        | 11      | 0              | pandas                         |
| Statistik                                             | 26        | 26      | 0              | scipy, statsmodels             |
| Machine learning                                      | 21        | 21      | 0              | scikit-learn                   |
| Deret waktu                                           | 4         | 4       | 0              | statsmodels                    |
| Analisis bisnis (RFM, kohort, pareto, growth, funnel) | 5         | 5       | 0              | definisi standar dengan pandas |
| Baca berkas, fungsi umum, alias                       | 9         | 9       | 0              | pandas                         |
| **Jumlah**                                            | **150**   | **148** | **2**          |                                |

Ke-150 kasus itu mencakup 409 dari 447 fungsi publik Slak Data. Sisanya, 38 fungsi, bukan fungsi hitung (misalnya `head`, `to_csv`, `read_excel`, atau pengunduh dataset online) dan diuji lewat 332 contoh API di Katalog. Selisih terbesar pada kasus yang cocok sekitar 0,000000006 (enam per miliar), yaitu batas ketelitian angka di komputer.

Dua perbedaan memang disengaja, karena Slak memilih perilaku yang lebih akrab bagi pemula di Indonesia:

- `round(1.25, 1)` menghasilkan 1,3 seperti Excel dan pelajaran sekolah. pandas dan numpy memakai pembulatan bankir sehingga hasilnya 1,2.

- `str.title()` tidak membesarkan huruf setelah angka, jadi "Sagu 500g" tetap "Sagu 500g". Python menghasilkan "Sagu 500G".

Beberapa pilihan bawaan Slak juga berbeda dari Python, tetapi hasilnya sama persis bila opsinya disamakan: `PCA` menstandarkan kolom lebih dulu (`scale: false` untuk mematikannya), `LogisticRegression` memberi penalti pada fitur yang sudah distandarkan, dan `resample` memberi label awal periode (minggu dimulai Senin).

Pengujian ini menemukan sepuluh galat yang diperbaiki di Slak 1.6, antara lain `date_range` bulanan yang melompat dari 31 Januari ke 2 Maret, `toNumber("Rp 12.500")` yang terbaca 12,5, urutan argumen `stats.betainc`, dan peramalan Holt-Winters yang kini sedikit lebih pas dengan data daripada statsmodels.

## 32.2 Batas ukuran data

Slak memproses data di memori browser. Pengukuran memakai data penjualan sintetis 8 kolom; setiap putaran membaca CSV, menjalankan delapan operasi yang lazim (groupby, query, sort_values, describe, pivot_table, ringkasan harian), menampilkan tabel, dan menggambar dua grafik. Kolom "laptop cepat" adalah komputer pengujian; kolom "perangkat menengah" adalah komputer yang sama dengan prosesor diperlambat 4 kali, mendekati laptop murah atau HP kelas menengah.

| Jumlah baris | Ukuran CSV | Laptop cepat | Perangkat menengah | Memori  |
|--------------|------------|--------------|--------------------|---------|
| 50.000       | 2,4 MB     | 0,6 detik    | 3,0 detik          | ±60 MB  |
| 100.000      | 4,8 MB     | 1,3 detik    | 4,3 detik          | ±55 MB  |
| 250.000      | 12 MB      | 2,7 detik    | 10,7 detik         | ±250 MB |
| 500.000      | 25 MB      | 4,1 detik    | 18,0 detik         | ±490 MB |
| 1.000.000    | 49 MB      | 8,3 detik    | 31,7 detik         | ±500 MB |
| 2.000.000    | 99 MB      | 20,6 detik   | tidak diuji        | ±2 GB   |

Dari angka itu, Slak 1.6 menetapkan dua batas resmi:

- **Batas nyaman: 100.000 baris** (sekitar 5 MB CSV). Seluruh halaman siap dalam kurang dari 5 detik di perangkat menengah, dan perubahan widget terasa cepat.

- **Batas berat: 1.000.000 baris** (sekitar 50 MB CSV). Masih berjalan di laptop, tetapi lambat di HP dan memakai ratusan megabyte memori. Di atas 2 juta baris, browser bisa kehabisan memori.

Bila data yang dibaca melewati batas nyaman, Slak menampilkan peringatan kecil di pojok halaman beserta saran langkah berikutnya. Untuk data di atas batas, ringkas dulu dengan DuckDB (Bab 31) atau SQL (Bab 17), lalu tampilkan hasil ringkasnya saja. DuckDB merangkum satu juta baris dalam hitungan detik tanpa membebani memori halaman.

Batas ini bisa diubah bila Anda tahu pengunjung memakai komputer kuat:

```slak
Slak.data.limits.nyaman = 500000      // peringatan baru muncul di atas 500 ribu baris
Slak.data.limits.nyaman = Infinity    // matikan peringatan
```

## 32.3 Keamanan: apa yang aman dan tidak aman disimpan

Slak dibuat untuk portofolio, belajar, dan data publik. Prinsip yang perlu diingat: **semua kode dan data halaman Slak dikirim ke browser pengunjung**. Siapa pun bisa membuka menu "View source" atau alat pengembang browser dan membaca semuanya, termasuk berkas data yang dibaca halaman.

| Aman untuk Slak                                           | Jangan disimpan di halaman Slak                                |
|-----------------------------------------------------------|----------------------------------------------------------------|
| Data publik dan data contoh                               | Password asli, PIN, kunci API berbayar                         |
| Dasbor portofolio dan hasil analisis                      | Data pribadi orang lain: NIK, nomor HP, alamat, data kesehatan |
| Kuis latihan dan aplikasi belajar                         | Data rahasia perusahaan atau pelanggan                         |
| Aplikasi pribadi yang dipakai offline di komputer sendiri | Kredensial database (user dan password server)                 |

Yang perlu dipahami tentang fitur yang terdengar "aman":

- **`sl.login` dan `require_role`** menyembunyikan halaman dari pengunjung biasa, tetapi bukan pengaman sungguhan. Orang yang membaca kode sumber tetap bisa melihat isinya.

- **Fungsi kriptografi** (`sl.crypto.md5`, `sha256`, `hash_password`, jawaban kuis tersandi) hanya menyamarkan. Teks pendek seperti jawaban kuis pilihan ganda tetap bisa ditebak dengan mencoba semua kemungkinan. `hash_password` (bcrypt) jauh lebih kuat dari MD5, tetapi hash yang tersimpan di halaman tetap bisa diambil dan ditebak di komputer lain.

- **`sl.db`, `local_state`, dan IndexedDB** tersimpan di browser pengunjung itu saja. Pemilik browser bisa membaca dan mengubahnya lewat alat pengembang.

- **Koneksi database di Slak Studio** menyimpan password terenkripsi oleh sistem operasi. Itu melindungi komputer Anda, bukan halaman yang Anda terbitkan: jangan pernah menaruh user dan password database di kode halaman. Untuk aplikasi yang perlu database bersama, gunakan slak-bridge (Bab 33).

- **Pustaka dari internet.** Plotly, Python (Pyodide), DuckDB, dan pustaka lain diunduh dari CDN (jsDelivr) saat pertama dipakai. Di halaman klik dua kali, `sl.read_sheets` memuat skrip langsung dari docs.google.com. Bila Anda tidak ingin halaman bergantung pada server luar, simpan salinan pustakanya di folder halaman dan arahkan `Slak.lib_urls` ke sana.

Singkatnya: perlakukan halaman Slak seperti poster yang ditempel di dinding. Apa pun yang tidak boleh dibaca orang lain jangan ditempel di sana.

## 32.4 Halaman yang dibuka dengan klik dua kali

Semua 332 contoh API sudah diuji di halaman yang dibuka dengan klik dua kali (alamat `file://`) dengan internet sungguhan, dan semuanya berjalan. Browser hanya membatasi dua hal, dan Slak memberi pesan yang jelas untuk keduanya:

- **Membaca berkas lain di komputer** (misalnya `penjualan.csv` di folder yang sama). Slak menawarkan memilih berkas, atau berkas bisa dibungkus menjadi `.js` lewat Alat › Bungkus data di Slak Studio.

- **Membaca data dari server yang tidak mengizinkannya** (aturan CORS). Slak menjelaskan pilihannya: jalankan di Slak Studio, unggah halaman ke hosting, atau unduh berkasnya ke folder halaman. Google Sheets kini sudah tidak terkena batasan ini.
