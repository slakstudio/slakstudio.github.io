Slak adalah framework JavaScript untuk membuat aplikasi data dan antarmuka interaktif yang berjalan sepenuhnya di browser, tanpa server, tanpa instalasi Python, dan tanpa langkah build. Seluruh framework-nya hanya satu berkas, `slak.js`, sekitar 670 KB tanpa dependensi.

Gaya penulisannya terinspirasi Streamlit: kamu menulis skrip dari atas ke bawah, dan setiap widget langsung mengembalikan nilainya. Seluruh kode Slak ditulis dari nol dalam JavaScript, jadi tidak mengandung kode sumber Streamlit.

```slak
sl.title("Halo, Slak!")
const n = sl.slider("Angka", 0, 100, 25)
sl.write(`Kuadratnya adalah **${n * n}**`)
```

Tiga baris di atas sudah menghasilkan aplikasi lengkap: judul, penggeser angka, dan teks yang berubah otomatis setiap kali penggeser digeser.

## Filosofi Slak: Write and Run

**Tulis, simpan, klik, dan langsung jalan.** Slak dibuat untuk mengembalikan rasa web di masa awalnya: menulis kode di editor, menyimpannya sebagai berkas, mengklik dua kali, lalu melihat hasilnya di browser. Tanpa terminal, tanpa menunggu, tanpa langkah perantara.

Setiap fitur Slak dan Slak Studio harus lolos enam aturan berikut:

1.  **Tulis lalu langsung jalan.** Tidak ada build, compile, transpile, atau `npm install`.

2.  **Klik dua kali cukup.** Aplikasi bisa dibuka langsung dari berkas di komputer.

3.  **Unggah cukup.** Untuk online, cukup salin berkas ke hosting biasa seperti cPanel, GitHub Pages, atau Netlify, tanpa perintah terminal.

4.  **Tanpa instalasi.** Pengguna tidak perlu memasang Node.js, Python, Docker, atau server database sendiri.

5.  **Satu bahasa untuk pengguna.** Aplikasi ditulis dengan JavaScript Slak; bahasa lain hanya jika pengguna sendiri memilihnya.

6.  **Bawaan yang masuk akal.** Fitur bekerja tanpa konfigurasi; pengaturan hanya untuk yang ingin lebih.

| Langkah           | Alur framework pada umumnya                    | Alur Slak                                            |
|-------------------|------------------------------------------------|------------------------------------------------------|
| Mulai             | Pasang Node.js, buat proyek, `npm install`     | Buat satu berkas `.html` atau buka Slak Studio       |
| Mencoba perubahan | Jalankan server pengembangan, tunggu kompilasi | Simpan, lalu muat ulang (di Studio: langsung tampil) |
| Membagikan        | `npm run build`, unggah folder hasil build     | Unggah berkas `.html` itu sendiri                    |
| Setahun kemudian  | Dependensi usang, build gagal                  | Berkas yang sama tetap terbuka di browser            |

Aturan ini adalah janji pengembangan Slak. Jika sebuah fitur tidak bisa dibuat tanpa melanggarnya, fitur itu tidak ditambahkan diam-diam: alternatif yang tetap setia pada Write and Run dicari lebih dulu, dan pengecualiannya dijelaskan secara terbuka.

## Untuk siapa Slak?

| Pengguna           | Yang bisa dibuat                                         |
|--------------------|----------------------------------------------------------|
| Pelajar dan pemula | Belajar pemrograman lewat hasil yang langsung terlihat   |
| Guru               | Kalkulator, kuis, dan alat peraga interaktif untuk kelas |
| Analis data        | Dasbor, tabel, dan grafik dari berkas CSV                |
| Pengembang web     | Prototipe cepat dan alat internal sekali pakai           |

## Keunggulan utama

- **Tanpa server.** Semua kode dan data tetap di komputer pengguna, termasuk berkas yang diunggah.

- **Satu berkas.** Aplikasi bisa dibagikan sebagai satu berkas `.html` yang dibuka dengan klik dua kali.

- **Lengkap.** Ada sekitar 20 widget input, tabel interaktif, empat jenis grafik, form, tab, sidebar, chat, aplikasi multi-halaman, penyimpanan permanen, dan database di browser.

- **Ramah pemula.** Tidak perlu memahami event listener, DOM, atau React.

## Slak dan Slak Studio

**Slak** adalah framework-nya: berkas `slak.js` yang kamu sertakan di halaman web. **Slak Studio** adalah aplikasi desktop Windows untuk menulis kode Slak. Kode diketik di kiri dan hasilnya langsung tampil di kanan, lengkap dengan 49 pelajaran interaktif, termasuk jalur Analisis Data. Kamu bisa memakai Slak tanpa Slak Studio, tetapi Slak Studio membuat belajar dan bekerja jauh lebih cepat.

## Cara kerja Slak

Setiap kali pengguna menyentuh widget, Slak menyimpan nilai barunya lalu menjalankan ulang seluruh skrip dari baris pertama. Slak lalu hanya memperbarui bagian halaman yang berubah, sehingga fokus kursor dan posisi gulir tetap terjaga.

![Siklus jalan ulang Slak · 4 langkah](./media/image1.png)

Siklus jalan ulang Slak · 4 langkah

Karena seluruh skrip dijalankan ulang, kode bisa ditulis seperti resep dari atas ke bawah; nilai yang harus bertahan disimpan di `sl.session_state` (Bab 4).
