Kode Slak disimpan sebagai berkas teks berekstensi `.slak` yang berisi skrip JavaScript saja, tanpa HTML. Untuk dibagikan, berkas itu diekspor menjadi satu berkas `.html` mandiri.

## 6.1 Jenis tab

| Ikon di tab | Jenis                        | Disimpan di mana                                                          |
|-------------|------------------------------|---------------------------------------------------------------------------|
| ✎           | Draf (belum pernah disimpan) | Tersimpan otomatis di dalam Slak Studio; muncul lagi saat aplikasi dibuka |
| 📄          | Berkas                       | Di disk, di lokasi yang kamu pilih saat menyimpan                         |
| 🎓          | Pelajaran                    | Tersimpan otomatis per pelajaran; tidak perlu disimpan manual             |

## 6.2 Membuat, membuka, dan menutup

- **Berkas baru:** **Ctrl+N**, tombol **Baru**, atau tombol **+** di ujung deretan tab. Draf diberi nama `tanpa-judul-1.slak`, `tanpa-judul-2.slak`, dan seterusnya.

- **Membuka:** **Ctrl+O** atau tombol **Buka**, lalu pilih satu atau beberapa berkas `.slak` atau `.js`.

- **Seret dan lepas:** seret berkas `.slak` dari File Explorer ke jendela Slak Studio.

- **Terakhir dibuka:** panel **Berkas** menyimpan delapan berkas terakhir; klik untuk membukanya lagi.

- **Berpindah tab:** klik tabnya, atau **Ctrl+Tab** dan **Ctrl+Shift+Tab**.

- **Menutup tab:** **Ctrl+W**, tanda × di tab, atau klik tengah (roda tetikus) pada tab. Slak Studio bertanya dulu jika tab berisi perubahan yang belum disimpan.

## 6.3 Menyimpan

- **Simpan (Ctrl+S):** menulis ke berkas aslinya. Untuk draf, Slak Studio membuka dialog Simpan sebagai.

- **Simpan sebagai (Ctrl+Shift+S):** menyimpan ke lokasi atau nama baru. Lokasi bawaan adalah folder **Documents**.

- **Menyimpan kode pelajaran:** Simpan pada tab pelajaran membuat salinan sebagai berkas baru, misalnya `latihan-input.slak`; tab pelajaran tetap ada.

- **Judul jendela** diawali ● selama ada perubahan yang belum disimpan.

- **Saat menutup aplikasi** dengan berkas yang belum disimpan, Slak Studio menampilkan peringatan. Draf dan kode pelajaran tidak hilang karena tersimpan otomatis.

Slak Studio mengingat semua tab yang terbuka. Saat dibuka lagi, tab dipulihkan dan berkas yang tidak berubah dibaca ulang dari disk agar selalu versi terbaru.

## 6.4 Ekspor ke HTML

Tekan **Ctrl+E** atau tombol **Ekspor HTML**, lalu pilih lokasi. Hasilnya satu berkas `.html` sekitar 700 KB yang berisi seluruh `slak.js` beserta kodemu. Setelah ekspor, tombol **Buka** di notifikasi membuka berkas itu di browser.

Berkas hasil ekspor:

- bisa dibuka dengan klik dua kali di komputer mana pun yang punya browser modern;

- tidak membutuhkan internet, server, atau Slak Studio;

- bisa dikirim lewat email atau WhatsApp, diunggah ke Google Drive, atau dipasang di hosting statis seperti GitHub Pages dan Netlify.

Judul tab browser hasil ekspor diambil dari `sl.set_page_config({ page_title })` jika ada, atau dari nama berkas.

Sejak 1.2, ekspor menyertakan `slak-data.js` dan `slak-sql.js` (sejak 1.3 juga slak-peta.js dan slak-peta-kab.js) bila kodemu memakainya, dan menyematkan berkas data yang dibaca dengan nama berkas (misalnya `sl.read_csv("data.csv")`) dari folder skrip. Untuk mengunggah ke hosting, gunakan **Ekspor folder situs** (Ctrl+Shift+E); lihat Bab 21.

## 6.5 Membuka berkas .slak di luar Slak Studio

Berkas `.slak` adalah teks biasa, jadi bisa dibuka di Notepad atau VS Code. Untuk menjalankannya di browser tanpa Slak Studio, tempel isinya ke dalam tag `<script type="text/slak">` seperti pada Bab 3.
