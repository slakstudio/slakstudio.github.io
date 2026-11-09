Bab terakhir 1.7 membahas cara aplikasi sampai ke orang lain. Kode bisa dibagikan sebagai **tautan** tanpa mengunggah apa pun. Untuk kelas, kantor, atau komunitas, **slak-bridge** (Bab 33) kini bisa memeriksa login di server dan menilai kuis tanpa memperlihatkan kunci jawaban.

## 39.1 Tautan berbagi

Di playground, tombol **🔗 Bagikan** menyalin tautan yang berisi kode, misalnya `https://slak.studio/playground/#kode=K87R...`. Kode dimampatkan ke bagian `#` alamat. Bagian itu tidak pernah dikirim ke server, jadi tidak ada yang disimpan di mana pun. Kode 900 karakter menjadi tautan sekitar 200 karakter.

- Siapa pun yang membuka tautan melihat kode dan hasilnya. Kode simpanan mereka sendiri tidak tertimpa sampai mereka mengedit kode dari tautan.

- Berkas data (CSV, database) tidak ikut. Pakai dataset bawaan, alamat `https://`, atau data kecil yang ditulis di kode.

- Tautan di atas sekitar 8.000 karakter bisa terpotong oleh sebagian aplikasi chat; Slak memperingatkan bila tautan sepanjang itu.

Di Slak Studio, pilih **Berkas › Salin tautan berbagi**. Sejak 1.9.1 tautannya langsung memakai playground resmi `https://slak.studio/playground/`; di jendela itu kamu juga bisa memilih salinan resmi `slakstudio.github.io` atau alamat playground sendiri (unggah folder paket Slak ke GitHub Pages, Netlify, atau cPanel, Bab 21). Tautan lama ke `playground.html#kode=...` tetap terbuka karena halaman itu mengalihkan ke `playground/`. Di jendela yang sama, tempel tautan orang lain untuk membuka kodenya di tab baru.

![Jendela Tautan berbagi di Slak Studio: alamat playground, tautan yang sudah jadi, tombol Salin tautan, dan kolom untuk membuka kode dari tautan](konten/gambar/jendela-tautan-berbagi-di-slak-studio-alamat-pla.png)

Untuk pengembang: `await Slak.share.link(kode, alamat)` membuat tautan, dan `await Slak.share.read(location.hash)` membaca kembali kodenya.

## 39.2 Login di server

Login lokal (Bab 29) menyimpan hash password di halaman. Untuk banyak pengguna, atau bila data di server harus dibatasi per orang, periksa login di slak-bridge. Tambahkan akun di `slak-bridge.php`:

```php
'users' => [
  'guru'  => ['password' => '$2y$10$...', 'role' => 'guru',  'name' => 'Bu Ani'],
  'budi'  => ['password' => '$2y$10$...', 'role' => 'siswa', 'name' => 'Budi'],
],
// atau ambil dari tabel:
'users_query' => 'SELECT username, password, role, name FROM pengguna WHERE username = ?',
```

Hash password dibuat di Slak Studio (**Alat › Lindungi password**) atau dengan `password_hash` di PHP; keduanya diterima. Di halaman:

```slak tanpa-jalan
const db = sl.connection("sekolah", { type: "bridge", url: "slak-bridge.php" })
const u = await sl.login({ bridge: db, title: "Masuk Kelas" })
sl.title("Halo, " + u.name)
sl.dataframe(await db.run("nilai_saya"))
```

Setelah masuk, jembatan memberi token bertanda tangan yang berlaku `session_hours` jam (bawaan 12). Setiap permintaan lewat `db` membawa token itu. `sl.user`, `sl.require_role`, dan tombol **Keluar** bekerja seperti login lokal. Setiap percobaan dengan password salah diperlambat sekitar satu detik.

| Pengaturan di slak-bridge                                                                    | Gunanya                                                                          |
|----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| `'queries' => ['nilai_saya' => ['sql' => '... WHERE username = :_user', 'role' => 'siswa']]` | kueri bernama khusus peran; `:_user` dan `:_role` diisi dari pengguna yang masuk |
| `'login_required' => true`                                                                   | semua kueri wajib masuk                                                          |
| `'write_role' => 'guru'`                                                                     | hanya peran itu yang boleh menambah atau mengubah data                           |
| `'session_hours' => 12`                                                                      | lama sesi                                                                        |

`slak-bridge.js` (Node.js) punya pengaturan yang sama, dan butuh `npm install bcryptjs` untuk login.

## 39.3 Kuis dengan kunci jawaban di server

Pelindung jawaban kuis di Bab 26 menyulitkan orang mengintip, tetapi kuncinya tetap ada di halaman. Dengan slak-bridge, kunci jawaban hanya ada di server:

```php
'quizzes' => [
  'kuis1' => [
    'answers' => ['s1' => 'Jayapura', 's2' => ['42', '42,0'], 's3' => ['all' => ['a', 'c']]],
    'save_to' => 'hasil_kuis',   // username, kuis, skor, total, jawaban, waktu
    'attempts' => 2,             // batas percobaan per pengguna
    'role' => 'siswa',
  ],
],
```

```slak
const s1 = sl.radio("Ibu kota Provinsi Papua?", ["Jayapura", "Merauke", "Sorong"], { index: null })
const s2 = sl.number_input("12 × 3,5 = ?", { value: null })
if (sl.button("Periksa jawaban", { type: "primary" })) {
  const h = await db.check_quiz("kuis1", { s1, s2 })
  sl.metric("Skor", h.score + " / " + h.total)
  for (const [soal, benar] of Object.entries(h.results)) sl.write((benar ? "✅ " : "❌ ") + soal)
}
```

Jawaban dibandingkan tanpa membedakan huruf besar kecil dan spasi berlebih. Angka boleh ditulis dengan koma (3,14) atau titik ribuan (1.250). Daftar berarti beberapa jawaban benar, dan `['all' => [...]]` untuk pilihan ganda yang semua pilihannya harus tepat. Hasilnya `{ score, total, percent, results }`; dengan `'show_answers' => true`, kunci jawaban ikut dikirim setelah dinilai. Bila `save_to` diisi, hasil disimpan ke tabel itu, sehingga guru bisa membuat dasbor nilai dengan kueri bernama.
