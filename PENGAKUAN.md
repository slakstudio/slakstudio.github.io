# Pengakuan

Slak dan Slak Studio dibuat oleh **Teofilus Marpaung**. Berkas ini menjelaskan dari mana Slak berasal, kepada siapa Slak berutang budi, apa arti namanya, dan mengapa Slak dibuat.

## Mengikuti jejak Streamlit

Slak dibuat dengan mengikuti cara kerja **Streamlit**. Aplikasi ditulis sebagai skrip dari atas ke bawah, setiap widget langsung mengembalikan nilainya, dan seluruh skrip dijalankan ulang setiap kali pengguna menyentuh sesuatu. Gagasan sederhana itu membuat banyak orang bisa membuat aplikasi data tanpa harus menjadi pengembang web, dan Slak berutang besar pada gagasan tersebut. Nama-nama perintah Slak sengaja dibuat mirip (`sl.write`, `sl.slider`, `sl.session_state`) supaya yang sudah mengenal Streamlit langsung merasa di rumah.

Meski begitu, Slak bukan salinan Streamlit. Seluruh kode Slak ditulis dari nol dalam JavaScript dan tidak mengandung kode sumber Streamlit. Slak juga tidak berafiliasi dengan, disponsori, atau didukung oleh Streamlit maupun Snowflake Inc. Streamlit adalah merek dagang milik pemiliknya.

## Dikembangkan bersama Claude

Slak digagas oleh Teofilus Marpaung, yang memberinya nama, filosofi, dan semangat. Seluruh kode Slak dan Slak Studio, Buku Panduan Slak, buku *Belajar JavaScript untuk Analisis Data dengan Slak*, dan situs slak.studio ditulis oleh **Claude**, model AI buatan Anthropic, sebagai asistennya. Claude menawarkan rencana, rancangan, dan pilihan; Teofilus Marpaung menentukan arah, memilih yang dipakai, menolak yang tidak sesuai, dan memeriksa hasilnya. Keputusan akhir tentang apa yang masuk ke Slak dan apa yang dirilis ada pada Teofilus Marpaung. Sesuai lisensi MIT, Slak diberikan apa adanya, tanpa jaminan apa pun.

Kami mencatat ini secara terbuka karena jujur soal cara sebuah alat dibuat adalah bagian dari semangat Slak itu sendiri. Claude adalah merek dagang Anthropic. Slak tidak berafiliasi dengan Anthropic.

## Dari mana nama "Slak"

Nama Slak berasal dari kata Belanda **slag**. Dalam bahasa Belanda, *slag* punya banyak arti: pukulan, ayunan, gerakan atau langkah, detak, dan juga pertempuran.

Kata ini kemudian diserap ke dalam **bahasa Melayu Manado**, bahasa sehari-hari di Sulawesi Utara, di ujung utara **Pulau Sulawesi**, Indonesia Timur. Di sana kata itu diucapkan dan ditulis **slak**, dengan bunyi akhir yang tertahan, dan maknanya bergeser menjadi **celah** atau **sela**. Penelitian kata serapan Belanda dalam bahasa Melayu Manado mencatat *slak* [slaʔ] dari *slag* dengan arti *ada celah*.

Dalam percakapan sehari-hari, *slak* hidup dalam beberapa ungkapan:

- **Cari slak**: mencari sela, kesempatan, atau cara. *"Kita mo cari slak dulu baru mo kasana"*: saya mau mencari waktu yang pas dulu, baru ke sana.
- **Ilang slak**: hilang gaya, mati gaya, salah tingkah.
- **Taslak**: kebetulan bertepatan. *"Taslak deng kita da ujian"*: bertepatan dengan saat saya ujian.

Nama Slak diambil dari ungkapan yang pertama, **cari slak**: mencari celah, mencari cara untuk menyelesaikan suatu masalah.

Jadi Slak adalah kata yang menempuh perjalanan jauh: lahir di Belanda, berlabuh di Sulawesi, lalu hidup dengan makna barunya di mulut orang Indonesia Timur.

## Filosofi: Write and Run

Sejak awal, filosofi Slak adalah **Write and Run**: **tulis, simpan, klik, dan langsung jalan.** Slak dibuat untuk mengembalikan rasa web di masa awalnya: menulis kode di editor, menyimpannya sebagai berkas, mengklik dua kali, lalu melihat hasilnya di browser. Tanpa terminal, tanpa menunggu, tanpa langkah perantara.

Setiap fitur Slak dan Slak Studio harus lolos enam aturan berikut:

1. **Tulis lalu langsung jalan.** Tidak ada build, compile, transpile, atau `npm install`.
2. **Klik dua kali cukup.** Aplikasi bisa dibuka langsung dari berkas di komputer.
3. **Unggah cukup.** Untuk online, cukup salin berkas ke hosting biasa seperti cPanel, GitHub Pages, atau Netlify, tanpa perintah terminal.
4. **Tanpa instalasi.** Pengguna tidak perlu memasang Node.js, Python, Docker, atau server database sendiri.
5. **Satu bahasa untuk pengguna.** Aplikasi ditulis dengan JavaScript Slak; bahasa lain hanya jika pengguna sendiri memilihnya.
6. **Bawaan yang masuk akal.** Fitur bekerja tanpa konfigurasi; pengaturan hanya untuk yang ingin lebih.

## Semangat: cari slak

Bila Write and Run adalah filosofinya, *cari slak* adalah semangat di balik namanya: tidak menyerah ketika berhadapan dengan masalah, tetapi mencari celah dan cara agar pekerjaan tetap selesai.

Slak sendiri lahir dari *cari slak*. Ada masalah yang lama dibiarkan, dan Slak adalah cara yang ditemukan untuk menyelesaikannya:

- **Celah antara Excel dan pemrograman.** Banyak analis dan pelajar sudah pandai mengolah data di lembar kerja, tetapi langkah berikutnya, yaitu membuat aplikasi data sendiri, terasa jauh: harus memasang Python, menyiapkan server, mempelajari terminal.
- **Celah antara menulis kode dan melihat hasilnya.** Alat modern sering menuntut instalasi, build, dan server pengembangan sebelum satu baris kode bisa dilihat hasilnya.
- **Celah antara membuat dan membagikan.** Aplikasi yang sudah jadi sering sulit dibagikan tanpa hosting khusus dan biaya bulanan.

Write and Run adalah jawabannya: satu berkas, `slak.js`, yang berjalan sepenuhnya di browser. Tidak perlu server, tidak perlu instalasi, tidak perlu build.

Slak juga ingin menjadi alat untuk *cari slak* bagi penggunanya. Seorang guru yang butuh kuis interaktif, analis yang butuh dasbor dari berkas CSV, atau pelajar yang ingin mencoba gagasannya, cukup menulis beberapa baris kode untuk menemukan caranya sendiri.

## Mengapa Slak dibuat

Slak dibuat untuk pelajar dan pemula yang ingin belajar pemrograman lewat hasil yang langsung terlihat, untuk guru yang ingin membuat alat peraga interaktif, dan untuk analis data dasar hingga menengah yang ingin dasbor dan aplikasi tanpa bergantung pada server. Slak dibuat dari Indonesia, dengan bahasa Indonesia, untuk siapa saja.

Karena itu Slak dan Slak Studio **gratis dan terbuka** dengan lisensi MIT. Siapa pun boleh memakai, mengubah, dan membagikannya, termasuk untuk tujuan komersial, tanpa membayar. Semua pustaka pihak ketiga yang ikut dibagikan juga dipilih dari yang berlisensi terbuka dan boleh dipakai komersial.

Seperti arti namanya, Slak ingin menjadi cara yang terbuka bagi siapa saja yang sedang *cari slak*: mencari jalan untuk menyelesaikan masalahnya dengan data.

## Rujukan

- Pingkan Luciawati Sompi, Golda J. Tulung, dan Djeinnie Imbang. 2017. "Kata-kata Serapan Bahasa Belanda pada Bahasa Melayu-Manado (Kajian Morfologi dan Leksikologi)". *Kajian Linguistik*, Tahun IV, No. 3. Program Magister Ilmu Linguistik, Universitas Sam Ratulangi. https://ejournal.unsrat.ac.id/v3/index.php/kaling/article/download/24800/24508/50806
- Manado Baswara, "Idiom Bahasa Manado" (entri *Cari Slak*: cari selanya/caranya; *Ilang Slak*: mati gaya, salah tingkah). https://www.manadobaswara.com/idiom-bahasa-manado/
- *Kamus Bahasa Manado* (entri *slak* dan *taslak*). https://upload.wikimedia.org/wikipedia/commons/2/2a/Kamus_Bahasa_Manado.pdf
- Wiktionary, entri "slag" (bahasa Belanda). https://en.wiktionary.org/wiki/slag

---

Slak dan Slak Studio · © 2026 Para pengembang Slak · Lisensi MIT
