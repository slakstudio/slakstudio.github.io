Sebagian besar masalah berasal dari salah ketik atau dari lupa bahwa skrip dijalankan ulang. Mulailah dari pesan di bilah status Slak Studio, yang menyebut nomor baris dan penjelasannya.

## 11.1 Instalasi dan aplikasi

| Masalah                                       | Penyebab                                               | Solusi                                                                               |
|-----------------------------------------------|--------------------------------------------------------|--------------------------------------------------------------------------------------|
| Layar biru "Windows protected your PC"        | Aplikasi belum bertanda tangan digital                 | Klik **More info** → **Run anyway**                                                  |
| Aplikasi tidak terbuka atau langsung tertutup | Dijalankan dari dalam zip, atau ada berkas yang hilang | Ekstrak seluruh zip dulu, lalu jalankan dari folder hasil ekstrak                    |
| Antivirus memblokir `Slak Studio.exe`         | Program baru yang belum dikenal                        | Izinkan berkas itu di pengaturan antivirus, atau tambahkan foldernya ke pengecualian |
| Membuka berkas `.slak` membuka Notepad        | Asosiasi berkas belum diatur                           | Ikuti langkah "Buka berkas .slak dengan klik dua kali" di Bab 2.3                    |
| Tab dan kemajuan hilang                       | Folder `%APPDATA%\Slak Studio` terhapus                | Berkas yang sudah disimpan ke disk tetap aman; buka lagi lewat **Buka**              |
| Pratinjau berhenti merespons                  | Kode berat tanpa jeda di luar perulangan               | Perbaiki kodenya, lalu klik **Muat ulang pratinjau** di notifikasi                   |

## 11.2 Galat saat menjalankan kode

| Pesan                                                     | Artinya                                                      | Solusi                                                                                                       |
|-----------------------------------------------------------|--------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| `sl.xxx is not a function`                                | Nama fungsi salah ketik                                      | Ikuti saran "Maksudmu …?", atau cari di Referensi (F1)                                                       |
| `xxx is not defined`                                      | Variabel belum dibuat atau salah eja                         | Buat dulu dengan `const`/`let`, periksa huruf besar-kecil. Kode Streamlit memakai `st`; di Slak gunakan `sl` |
| `missing ) after argument list`                           | Kurung tutup atau koma hilang                                | Periksa baris yang ditandai dan baris sebelumnya                                                             |
| `Unexpected end of input`                                 | Ada `{`, `(`, atau `[` yang belum ditutup                    | Cari pasangan kurung; editor menyorot pasangannya saat kursor di sampingnya                                  |
| `Invalid or unexpected token`                             | Tanda kutip tidak ditutup, atau tanda kutip miring dari Word | Ketik ulang tanda kutip dengan `"` biasa                                                                     |
| `Cannot read properties of undefined`                     | Membaca isi dari variabel kosong                             | Pastikan datanya ada, misalnya `if (f) { … }` sebelum memakai berkas unggahan                                |
| `Assignment to constant variable`                         | Mengubah variabel `const`                                    | Ganti dengan `let`                                                                                           |
| `Key widget "x" dipakai lebih dari sekali`                | Dua widget memakai `key` yang sama                           | Buat `key` unik, misalnya `"hapus-" + item.id`                                                               |
| `Perulangan berjalan lebih dari 2,5 detik…`               | Perulangan tanpa akhir                                       | Periksa kondisi berhenti; untuk animasi tambahkan `await sl.sleep(…)`                                        |
| `await is only valid in async functions`                  | `await` di dalam fungsi biasa                                | Tandai fungsinya dengan `async`                                                                              |
| `form_submit_button() hanya bisa dipakai di dalam form`   | Tombol kirim di luar form                                    | Panggil lewat objek form: `f.form_submit_button(…)`                                                          |
| `Gunakan form_submit_button() untuk tombol di dalam form` | `button` biasa di dalam form                                 | Ganti dengan `form_submit_button`                                                                            |

## 11.3 Perilaku yang membingungkan

| Gejala                                            | Penjelasan dan solusi                                                                                                         |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Angka tidak bertambah setiap tombol diklik        | Variabel biasa direset setiap jalan ulang. Simpan di `sl.session_state` (Bab 4.3)                                             |
| Isian widget kembali ke awal setelah label diubah | Widget dikenali dari labelnya. Beri `key` yang tetap (Bab 4.4)                                                                |
| Teks di `text_input` belum dipakai aplikasi       | Nilai diterapkan saat Enter ditekan atau saat pindah fokus. Gunakan `{ live: true }` untuk setiap ketikan                     |
| `text_area` tidak memicu perubahan                | Tekan **Ctrl+Enter** atau klik di luar kotak                                                                                  |
| Widget di dalam form tidak berefek                | Itu sifat form: nilai baru diterapkan setelah tombol kirim ditekan                                                            |
| `button` kembali `false`                          | Tombol hanya `true` pada satu jalan setelah diklik. Untuk keadaan yang menetap, simpan di `session_state` atau pakai `toggle` |
| Data hilang setelah halaman dimuat ulang          | `session_state` hanya hidup selama halaman terbuka. Sediakan tombol unduh CSV atau JSON                                       |
| Grafik kosong: "Tidak ada data numerik"           | Kolom `y` tidak berisi angka, misalnya angka tersimpan sebagai teks `"12"`. Ubah dengan `Number(…)` atau `parse_csv`          |
| CSV terbaca sebagai satu kolom                    | Pemisahnya tidak terdeteksi. Gunakan `f.csv({ delimiter: ";" })`                                                              |
| Berkas lokal tidak bisa dibaca dengan `fetch`     | Browser memblokir `file://`. Gunakan `file_uploader` atau tempel datanya di kode                                              |

## 11.4 Tips mencari kesalahan

1.  Baca baris yang ditandai merah, lalu baris tepat di atasnya; banyak galat sintaks berasal dari baris sebelumnya.

2.  Tambahkan `console.log(variabel)` untuk melihat isinya di panel Konsol.

3.  Gunakan `sl.write(variabel)` atau `sl.json(variabel)` untuk melihat isinya langsung di pratinjau.

4.  Beri komentar pada separuh kode dengan **Ctrl+/** untuk mempersempit lokasi masalah.

5.  Tekan **Ctrl+Shift+Enter** untuk memastikan masalahnya bukan dari `session_state` lama.

## 11.5 Masalah penyimpanan dan database

| Pesan atau gejala                                       | Penyebab                                                                      | Solusi                                                          |
|---------------------------------------------------------|-------------------------------------------------------------------------------|-----------------------------------------------------------------|
| `Tabel "x" tidak ada`                                   | Tabel belum disebut di skema `sl.db`                                          | Tambahkan, misalnya `sl.db("toko", { x: "++id" })`              |
| `Data dengan kunci yang sama sudah ada`                 | `insert` dengan kunci yang sudah dipakai, atau melanggar indeks unik `&`      | Gunakan `put` untuk menimpa, atau periksa nilainya              |
| `Kunci atau nilai tidak valid`                          | Kunci berupa `true`/`false`, objek, atau kosong pada tabel berkunci manual    | Kunci harus angka, teks, atau tanggal                           |
| `Nama kunci "…" tidak valid`                            | Penulisan skema keliru                                                        | Contoh yang benar: `"++id"`, `"kode"`, `"&email"`               |
| `Database tidak tersedia`                               | Mode penyamaran tertentu, atau browser memblokir penyimpanan                  | Buka di jendela biasa; izinkan data situs                       |
| `skrip menulis ke database di setiap jalan` (di konsol) | Perintah tulis berada di luar `if (tombol)`                                   | Pindahkan `insert`/`update` ke dalam `if` atau callback         |
| `local_state` tidak tersimpan                           | Isinya bukan data JSON (fungsi, objek khusus), atau penyimpanan browser penuh | Simpan hanya teks, angka, larik, dan objek biasa                |
| Data di Studio berbeda dengan di browser                | Setiap tempat menyimpan datanya sendiri                                       | Pindahkan data dengan cadangan `db.export()` dan `db.import()`  |
| Daftar tidak ikut berubah setelah menambah data         | Kode lama yang membaca data setelah perubahan di jalan berikutnya             | Slak 1.1 menjalankan ulang otomatis; pastikan memakai versi 1.1 |
