Editor Slak Studio mengenal semua fungsi Slak: ia menyarankan nama fungsi, menunjukkan urutan argumennya, dan menjelaskan galat dalam bahasa Indonesia.

## 7.1 Menjalankan kode

- **Otomatis:** dengan sakelar **Otomatis** menyala, kode dijalankan sekitar 0,5 detik setelah kamu berhenti mengetik. `session_state` dipertahankan, jadi kamu bisa mengedit tanpa kehilangan isian.

- **Manual:** matikan **Otomatis**, lalu tekan **Ctrl+Enter** atau tombol **Jalankan** saat siap. Cocok untuk kode berat atau animasi.

- **Dari awal:** **Ctrl+Shift+Enter** atau tombol ↺ di bilah pratinjau mengosongkan `session_state` dan menjalankan dari nol.

Status di bilah pratinjau menunjukkan hasilnya: **Selesai · 12 ms** (berhasil, beserta waktunya), **Galat**, atau **Berjalan…** (skrip masih bekerja, misalnya animasi yang memakai `await`).

## 7.2 Saran fungsi

Ketik `sl.` dan daftar fungsi muncul lengkap dengan format argumen dan keterangannya. Ketik beberapa huruf untuk menyaring, pilih dengan panah atas/bawah, lalu tekan **Enter**. Contoh pemakaian disisipkan, dan teks label pertama langsung terpilih sehingga bisa langsung kamu timpa.

![Saran fungsi muncul setelah mengetik sl.sl](konten/gambar/saran-fungsi-muncul-setelah-mengetik-sl-sl.png)

- Saran juga bekerja pada kolom dan wadah, misalnya `kiri.` setelah `const [kiri, kanan] = sl.columns(2)`.

- Tekan **Ctrl+Spasi** untuk memunculkan saran kapan saja.

- Saat kursor berada di dalam tanda kurung sebuah fungsi, bilah status menampilkan formatnya, misalnya `slider(label, min, max, nilai, step)`.

Saran fungsi juga mengenali database. Setelah `const db = sl.db("toko", { produk: "++id" })`, mengetik `db.` menampilkan nama tabel dan perintah database, dan `db.produk.` menampilkan perintah tabel seperti `all`, `insert`, dan `where`.

## 7.3 Membaca galat

Saat kode salah, Slak Studio menunjukkan masalahnya di empat tempat sekaligus:

1.  Baris yang bermasalah diberi latar merah muda di editor.

2.  Pratinjau menampilkan kotak galat beserta tombol **Detail** untuk melihat stack trace.

3.  Konsol mencatat galat dalam bahasa aslinya, lalu menambahkan baris 💡 berisi penjelasan dalam bahasa Indonesia.

4.  Bilah status menampilkan nomor baris dan penjelasannya. Klik untuk melompat ke baris itu.

![Galat salah ketik sl.metrik dengan saran Maksudmu sl.metric?](konten/gambar/galat-salah-ketik-sl-metrik-dengan-saran-maksudm.png)

Untuk salah ketik nama fungsi, Slak Studio menebak fungsi yang kamu maksud, misalnya "Fungsi sl.metrik tidak ada. Maksudmu sl.metric?". Daftar lengkap galat umum ada di Bab 11.

## 7.4 Konsol

Gunakan `console.log()` untuk melihat isi variabel saat skrip berjalan. Keluarannya muncul di panel **Konsol** di bawah pratinjau, bersama `console.warn()` (kuning) dan `console.error()` (merah).

- Konsol dikosongkan setiap kali kode dijalankan ulang dari editor. Tombol **Bersihkan** mengosongkannya kapan saja.

- Klik teks `baris N` di ujung kanan sebuah pesan untuk melompat ke baris itu.

- Konsol terbuka otomatis saat ada galat. Sembunyikan atau tampilkan dengan **Ctrl+J**.

## 7.5 Pengaman perulangan tanpa akhir

Perulangan seperti `while (i < 10) {}` tanpa `i++` akan berjalan selamanya. Slak Studio menyisipkan pemeriksa ke setiap perulangan `for`, `while`, dan `do`; jika satu perulangan berjalan lebih dari 2,5 detik tanpa jeda, perulangan itu dihentikan dengan pesan yang menunjuk barisnya. Editor tetap bisa dipakai, dan kodemu tidak diubah.

Untuk animasi yang memang tidak berhenti, beri jeda dengan `await sl.sleep(…)` di dalam perulangan. Perulangan dengan jeda tidak pernah dihentikan.

## 7.6 Fitur penyuntingan lain

| Fitur                              | Cara                                      |
|------------------------------------|-------------------------------------------|
| Cari teks                          | **Ctrl+F** saat kursor di editor          |
| Cari dan ganti                     | **Shift+Ctrl+F** di editor                |
| Lompat ke baris                    | **Ctrl+G**                                |
| Komentar atau hapus komentar baris | **Ctrl+/**                                |
| Rapikan indentasi seluruh berkas   | **Shift+Alt+F**                           |
| Indentasi blok terpilih            | **Tab** dan **Shift+Tab**                 |
| Kurung dan tanda kutip             | Ditutup otomatis; pasangan kurung disorot |
