# Merawat situs Slak

Situs ini satu aplikasi Slak tanpa build. Buka `index.html` dengan klik dua kali untuk melihatnya tanpa internet.

| Ingin mengubah | Ubah berkas |
|---|---|
| Isi bab | `konten/bab-xx.md`, lalu bungkus ulang menjadi `konten/bab-xx.md.js` (Bungkus data di Slak Studio, atau `bungkus.html` di paket Slak) |
| Menu, urutan, judul, deskripsi | `app.js` |
| Beranda, Galeri, Portofolio, Unduh, Lisensi, Katalog API | `halaman/*.js` |
| Daftar contoh galeri | `contoh/galeri.js` |
| Katalog API | `api/katalog.js` |
| Pratinjau tautan per bab | `bab/<alamat>.html` (ditulis sekali; tambahkan bila ada bab baru, dan masukkan ke `sitemap.xml`) |

Setelah mengubah isi, ganti `VERSI` di `sw.js` agar pengunjung mendapat versi baru.

Blok ` ```slak ` di bab dijalankan di halaman. Tulis ` ```slak tanpa-jalan ` untuk contoh yang hanya ditampilkan
(misalnya yang butuh berkas, internet, `sl.navigation`, atau `sl.set_page_config`).

`.nojekyll` wajib ada agar GitHub Pages menyajikan berkas `.md` apa adanya. `CNAME` (berisi `slak.studio`) dipakai selama
slak.studio diarahkan ke slakstudio.github.io; hapus setelah slak.studio pindah ke cPanel.
