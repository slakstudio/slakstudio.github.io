Panel **Belajar** berisi 49 pelajaran bertahap dalam dua bagian: 25 pelajaran Dasar Slak dan 24 pelajaran Analisis Data. Setiap pelajaran memuat materi singkat, kode contoh yang langsung berjalan, satu tantangan, dan pemeriksa otomatis. Pelajar pemula biasanya menyelesaikan bagian dasar dalam 4–6 jam, dan bagian Analisis Data dalam 6–10 jam.

## 8.1 Daftar pelajaran

| No. | Pelajaran                 | Yang dipelajari                                 | Tantangan                                             |
|-----|---------------------------|-------------------------------------------------|-------------------------------------------------------|
| 1   | Halo, Slak!               | `title`, `write`                                | Ganti judul dengan namamu dan ceritakan hobimu        |
| 2   | Teks & Markdown           | `header`, `markdown`, daftar, warna             | Daftar tiga makanan favorit, satu berwarna hijau      |
| 3   | Pesan status              | `success`, `info`, `warning`, `error`, `if`     | Pesan "Nilai istimewa!" untuk nilai 90 ke atas        |
| 4   | Widget pertama            | `button`, `checkbox`, `toggle`, jalan ulang     | Toggle yang memunculkan pesan rahasia                 |
| 5   | Input teks & angka        | `text_input`, `number_input`, `slider`          | Konverter suhu Celsius ke Fahrenheit                  |
| 6   | Memilih opsi              | `selectbox`, `radio`, `multiselect`             | Total harga makanan dan minuman                       |
| 7   | Tata letak                | `columns`, `sidebar`, `tabs`, `expander`        | Pemilih kota di sidebar                               |
| 8   | Mengingat nilai           | `session_state`, `on_click`                     | Penghitung dengan tombol Tambah, Kurang, Reset        |
| 9   | Data & tabel              | `dataframe`, `filter`, `metric`                 | Saring siswa berdasarkan nilai minimum                |
| 10  | Grafik                    | `line_chart`, `bar_chart`, `area_chart`         | Pilihan jenis grafik                                  |
| 11  | Form                      | `form`, `form_submit_button`                    | Buku tamu yang menyimpan semua kiriman                |
| 12  | Animasi & proses          | `await`, `sleep`, `progress`, `empty`           | Hitung mundur peluncuran roket                        |
| 13  | Berkas & CSV              | `file_uploader`, `parse_csv`, `download_button` | Grafik dan unduhan `hasil.csv`                        |
| 14  | Proyek: Bot Chat          | `chat_message`, `chat_input`                    | Bot yang menjawab soal cuaca dan waktu                |
| 15  | Data yang tetap tersimpan | `local_state`, `persist`                        | Penghitung yang bertahan setelah dijalankan dari awal |
| 16  | Multi-halaman             | `navigation`, `page`, `page_link`               | Halaman Kontak dengan tautan dari Beranda             |
| 17  | Database di browser       | `sl.db`, `data_editor`, `clear`                 | Buku tamu permanen yang bisa diedit langsung          |

Bagian **Analisis Data** (baru di 1.2) memakai dataset contoh, jadi tidak perlu menyiapkan data sendiri. Pelajaran 31 butuh internet karena memuat Python.

| No. | Pelajaran                        | Yang dipelajari                                                               | Tantangan                                                |
|-----|----------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------|
| 18  | DataFrame pertamamu              | `dataset`, `head`, `info`, `describe`                                         | Statistik ringkas dan dua metric                         |
| 19  | Menyaring dan menghitung         | `query`, `value_counts`, batang horizontal                                    | Frekuensi kota untuk kanal Online                        |
| 20  | Membersihkan data kotor          | `strip_strings`, `.str.title`, `to_numeric`, `to_datetime`, `drop_duplicates` | Data pesanan bersih, 60 baris                            |
| 21  | Groupby dan tabel pivot          | `groupby().agg`, `pivot_table`, `heatmap`                                     | Omzet per kategori dan kanal                             |
| 22  | Data deret waktu                 | `resample`, `rolling`, `analysis.growth`                                      | Omzet bulanan dengan tren 3 bulan                        |
| 23  | Grafik untuk analis              | `histogram`, `box_plot`, `scatter_chart` + tren                               | Gaji per pendidikan dan pengalaman                       |
| 24  | SQL di browser                   | `sl.sql`, `GROUP BY`, CTE, `RANK() OVER`                                      | Produk terlaris di setiap kota                           |
| 25  | Uji hipotesis dan uji A/B        | `stats.ab_test`, `chi2_contingency`                                           | Apakah varian B lebih baik?                              |
| 26  | Regresi berganda                 | `stats.ols`, `C()`, `predict`                                                 | Faktor penentu gaji dan prediksinya                      |
| 27  | Machine learning: prediksi churn | `train_test_split`, `RandomForestClassifier`, metrik                          | Laporan klasifikasi, confusion matrix, kepentingan fitur |
| 28  | Kohort dan RFM                   | `analysis.cohort`, `analysis.rfm`                                             | Jumlah pelanggan per segmen                              |
| 29  | Meramal penjualan                | `ts.decompose`, `ts.forecast`                                                 | Ramalan dengan slider periode                            |
| 30  | Dasbor portofolio                | `navigation`, metric, filter sidebar                                          | Dasbor dua halaman dengan temuan                         |
| 31  | Naik level: Python (pandas)      | `sl.python`, `data: { df }`                                                   | Omzet per kategori dengan pandas                         |

Pelajaran 32–49 ditambahkan di versi 1.3 sampai 1.7:

| No. | Pelajaran                                 | Bagian        | Yang dipelajari                                    |
|-----|-------------------------------------------|---------------|----------------------------------------------------|
| 32  | Peta titik dan gelembung                  | Analisis Data | `sl.map`, ukuran dan warna titik                   |
| 33  | Peta wilayah (choropleth)                 | Analisis Data | `sl.choropleth` provinsi dan kab/kota              |
| 34  | Tabel database yang bisa diedit           | Analisis Data | `data_editor` dengan SQLite, `save_edits`          |
| 35  | Dialog dan popover                        | Dasar Slak    | `sl.dialog`, `sl.popover`                          |
| 36  | Fragment: jalan ulang sebagian            | Dasar Slak    | `sl.fragment`, `run_every`                         |
| 37  | Pills, segmented control, dan umpan balik | Dasar Slak    | `pills`, `segmented_control`, `feedback`           |
| 38  | Kuis dengan jawaban terlindung            | Dasar Slak    | `sl.crypto.quiz`                                   |
| 39  | Tabel yang bisa dipilih dan jenis kolom   | Analisis Data | `on_select`, `column_config`                       |
| 40  | SQL yang juga jalan di PostgreSQL         | Analisis Data | `date_trunc`, mode portabel                        |
| 41  | Emoji dan ikon dengan nama                | Dasar Slak    | `:nama:`, `sl.emoji`                               |
| 42  | Login dan peran pengguna                  | Dasar Slak    | `sl.login`, `require_role`                         |
| 43  | Dataset online dan simpanan luring        | Analisis Data | `open_data`, `worldbank`, `offline_button`         |
| 44  | Data besar dengan DuckDB                  | Analisis Data | `sl.duckdb` atas satu juta baris                   |
| 45  | SQL yang sama di SQLite dan DuckDB        | Analisis Data | membandingkan dua mesin, Parquet                   |
| 46  | Menguji aplikasi otomatis                 | Dasar Slak    | `sl.testing.run`, `set_value`, `expect` (Bab 35)   |
| 47  | Membuat widget sendiri                    | Dasar Slak    | `sl.component`, `Slak.component.setValue` (Bab 36) |
| 48  | Formulir coba model                       | Analisis Data | `sl.ml_demo` (Bab 37)                              |
| 49  | Laporan SQL dalam Markdown                | Analisis Data | `sl.report`, `{{ nama.kolom }}` (Bab 38)           |

## 8.2 Alur satu pelajaran

1.  Buka panel **Belajar** dan klik sebuah pelajaran, atau klik **Mulai belajar** untuk pelajaran berikutnya yang belum selesai.

2.  Tab 🎓 **Pelajaran N.slak** terbuka berisi kode contoh, dan hasilnya langsung tampil di pratinjau. Baca materinya di panel kiri.

3.  Ubah-ubah kode contoh untuk melihat efeknya. Tidak ada yang bisa rusak: tombol **↺ Kembalikan kode awal** memulihkannya.

4.  Kerjakan **Tantangan**. Jika macet, klik **Petunjuk**.

5.  Klik **Cek jawaban** di panel kiri atau di strip bawah editor. Pemeriksa melihat kode dan hasil di pratinjau, lalu menjawab dengan kotak hijau (berhasil) atau merah beserta saran yang spesifik.

6.  Setelah satu kali gagal, pemeriksa mengecek ulang otomatis setiap kali kamu mengubah kode, sehingga kotak berubah hijau begitu jawabanmu benar.

7.  Klik **Berikutnya →** untuk lanjut. Pelajaran yang selesai ditandai ✓, dan kemajuanmu tersimpan.

![Pelajaran 5 selesai: kotak hijau, tanda centang, dan tombol Berikutnya](konten/gambar/pelajaran-5-selesai-kotak-hijau-tanda-centang-da.png)

Beberapa tantangan meminta kamu berinteraksi dengan pratinjau sebelum mengecek, misalnya menyalakan toggle, memilih "Batang", mengirim dua tamu lewat form, atau mengetik pesan di chat. Pesan pemeriksa akan memberi tahu jika langkah itu belum dilakukan.

## 8.3 Petunjuk dan solusi

- **Petunjuk** memberi arah tanpa membocorkan jawaban.

- **Lihat solusi** mengganti kode di editor dengan jawaban lengkap setelah konfirmasi. Kode lamamu bisa dikembalikan dengan **Ctrl+Z**.

- Coba kerjakan sendiri dulu minimal sekali sebelum melihat solusi; pemeriksa memberi saran yang cukup jelas untuk sebagian besar kesalahan.

## 8.4 Kemajuan dan kode latihan

- Kode setiap pelajaran tersimpan otomatis, terpisah satu sama lain. Kembali ke pelajaran 3 menampilkan kode terakhirmu di pelajaran 3.

- Hanya ada satu tab pelajaran. Membuka pelajaran lain mengganti isi tab itu, setelah kode sebelumnya tersimpan.

- Untuk menyimpan latihan sebagai berkas biasa, tekan **Ctrl+S** pada tab pelajaran.

## 8.5 Galeri contoh dan referensi

Setelah pelajaran, gunakan panel **Contoh** untuk melihat aplikasi yang lebih lengkap. Setiap contoh dibuka sebagai salinan di tab baru, jadi bebas diubah:

| Contoh                              | Fitur yang diperagakan                                                                               |
|-------------------------------------|------------------------------------------------------------------------------------------------------|
| Kalkulator Tabungan                 | `number_input`, `slider`, `select_slider`, `metric`, `area_chart`                                    |
| Dasbor Penjualan                    | Sidebar, `multiselect`, slider rentang, `cache_data`, tab, `dataframe`                               |
| Daftar Tugas                        | `session_state`, form, `checkbox` dengan `key`, `on_click`                                           |
| Kuis Pengetahuan                    | `radio` tanpa pilihan awal, form, skor, `balloons`                                                   |
| Konverter Satuan                    | `selectbox` dinamis, objek data, `table`                                                             |
| Animasi Gelombang                   | `empty`, `await sl.sleep`, `toggle`                                                                  |
| Bot Chat                            | `chat_message`, `chat_input`, `spinner`                                                              |
| Kasir Toko                          | `navigation` tiga halaman, `sl.db` dua tabel, `data_editor`, laporan dan unduhan CSV                 |
| Jurnal Harian                       | `local_state`, form, `persist`, pencarian, hapus per catatan                                         |
| Penjelajah Data (1.2)               | Unggah CSV/Excel/JSON, profil kolom, pencilan, korelasi, unduh CSV dan Excel                         |
| Portofolio Analisis Penjualan (1.2) | Empat halaman: KPI, tren, SQL dengan window function, Pareto, kohort, RFM, temuan                    |
| Prediksi Churn (1.2)                | Lima model, `cache_data`, metrik, kurva ROC, validasi silang, form "bagaimana jika"                  |
| Kalkulator Uji A/B (1.2)            | `stats.ab_test`, grafik konversi, kalkulator ukuran sampel                                           |
| Peta Penjualan (1.3)                | `sl.map` titik dan gelembung, `sl.choropleth` per provinsi, heatmap                                  |
| Stok Barang SQLite (1.3)            | `data_editor` yang menyimpan ke SQLite, tambah dan hapus baris                                       |
| Inventaris Gudang (1.3)             | Multihalaman, SQLite yang bisa diedit, tabel target, analisis Slak Data, peta gudang                 |
| Kuis Interaktif (1.3.1)             | Kunci jawaban terlindung (sl.crypto), popover petunjuk, skor, feedback bintang                       |
| Dasbor Pantau Toko (1.3.1)          | Fragment berkala, metric dengan grafik mini, tabel terpilih, grafik yang bisa diklik, dialog rincian |
| Laporan SQL Portabel (1.3.1)        | date_trunc, EXTRACT, percentile_cont, FILTER, window function, pemeriksa portabel                    |

Panel **Referensi** (tekan **F1**) memuat semua fungsi Slak yang sama dengan Bab 9. Ketik di kotak pencarian, misalnya `chart`, lalu klik **Sisipkan** untuk memasukkan contoh pemakaiannya ke editor.
