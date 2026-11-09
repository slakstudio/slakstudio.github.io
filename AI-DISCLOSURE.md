# Pernyataan Penggunaan AI

Berkas ini menjelaskan secara terbuka bagaimana kecerdasan buatan (AI) dipakai dalam pembuatan Slak, supaya setiap pengguna, pembaca, dan penyumbang tahu apa yang sedang mereka pakai. Latar belakang, asal nama, dan filosofi Slak ada di [PENGAKUAN.md](PENGAKUAN.md).

## Ringkasan

Slak digagas oleh Teofilus Marpaung, yang memberinya nama, filosofi, dan semangat. Seluruh kode dan tulisan Slak dibuat oleh **Claude**, model AI buatan Anthropic, sebagai asistennya, melalui aplikasi Claude. Claude menawarkan rencana, rancangan, dan pilihan. Teofilus Marpaung menentukan arah, memilih yang dipakai, menolak yang tidak sesuai, dan memeriksa hasilnya.

## Apa saja yang dibuat dengan AI

| Bagian | Peran Claude |
|---|---|
| `slak.js` dan berkas tambahannya (`slak-data.js`, `slak-sql.js`, `slak-peta.js`, `slak-duckdb.js`, `slak-komponen.js`, `slak-docs.js`, dan lainnya) | Menulis seluruh kode |
| Slak Studio dan Playground | Menulis seluruh kode |
| slak-bridge (`slak-bridge.php`, `slak-bridge.js`) | Menulis seluruh kode |
| Uji otomatis | Menulis dan menjalankan uji |
| Buku Panduan Slak | Menulis seluruh naskah, contoh kode, dan tangkapan layar |
| Buku *Belajar JavaScript untuk Analisis Data dengan Slak* | Menulis naskah |
| Situs slak.studio | Menulis seluruh halaman dan isinya |
| Ikon Sl, desain situs, rencana versi | Membuat rancangan dan pilihan, lalu dipilih oleh pembuat Slak |
| Dataset contoh | Membuat data sintetis (kecuali `iris`, yang berstatus domain publik) |

## Peran manusia

Teofilus Marpaung:

- menggagas Slak, memberi nama, dan menetapkan filosofi Write and Run;
- menetapkan syarat yang tidak bisa ditawar, misalnya semua pustaka harus berlisensi terbuka dan boleh dipakai komersial;
- memilih, mengubah, atau menolak setiap rencana, rancangan, dan fitur yang ditawarkan Claude;
- memeriksa hasil dan meminta perbaikan saat ada yang keliru atau tidak sesuai;
- mengambil keputusan akhir tentang apa yang masuk ke Slak dan apa yang dirilis.

## Bagaimana hasilnya diperiksa

Karena kode ditulis oleh AI, setiap rilis diperiksa dengan uji otomatis, bukan hanya dengan dibaca:

- **Uji akurasi:** hasil statistik, machine learning, dan peramalan dibandingkan dengan pandas, scipy, statsmodels, dan scikit-learn.
- **Uji paritas:** 104 perintah Streamlit dicocokkan dengan padanannya di Slak lewat `sl.testing`.
- **Uji permukaan API:** 938 nama yang dijamin stabil (API-STABIL.md) diperiksa agar tidak berubah tanpa sengaja.
- **Uji aksesibilitas:** halaman diperiksa terhadap pedoman WCAG 2.1 AA.
- **Uji contoh:** contoh di buku, pelajaran Slak Studio, dan galeri dijalankan untuk memastikan tidak ada yang gagal.

Meski begitu, AI bisa keliru dengan cara yang tidak selalu tertangkap oleh uji. Jika Anda menemukan galat, perilaku yang aneh, atau penjelasan yang salah di buku, mohon laporkan lewat [GitHub](https://github.com/slakstudio).

## Slak sendiri tidak memakai AI

Slak adalah framework biasa yang berjalan di browser Anda. `slak.js` dan Slak Studio **tidak memanggil layanan AI apa pun** dan tidak mengirim kode atau data Anda ke Anthropic atau pihak lain. Fitur seperti `sl.ml` dan `sl.stats` adalah perhitungan statistik dan machine learning yang berjalan di komputer Anda sendiri.

## Hak cipta dan lisensi

Slak dan Slak Studio dirilis dengan lisensi [MIT](LICENSE). Status hak cipta atas karya yang dibuat dengan bantuan AI masih berbeda-beda di tiap negara dan belum sepenuhnya jelas. Apa pun statusnya, lisensi MIT memastikan siapa saja boleh memakai, mengubah, dan membagikan Slak, termasuk untuk tujuan komersial, tanpa membayar. Sesuai lisensi MIT, Slak diberikan apa adanya, tanpa jaminan apa pun.

Pustaka pihak ketiga yang ikut dibagikan bersama Slak tidak dibuat oleh AI ini dan tetap memakai lisensinya masing-masing, seperti tercantum di [DAFTAR-LISENSI.md](konten/daftar-lisensi.md).

## Untuk penyumbang

Kontribusi yang dibuat dengan bantuan AI diterima, selama penyumbang memahami dan memeriksa apa yang ia kirim. Sebutkan di pull request bila sebagian besar isinya dibuat dengan AI.

---

Claude adalah merek dagang Anthropic. Slak tidak berafiliasi dengan Anthropic.
