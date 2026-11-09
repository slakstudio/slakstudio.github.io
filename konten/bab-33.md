Sampai Slak 1.5, aplikasi di browser hanya bisa memakai data yang ikut terkirim bersama halaman (CSV, SQLite, `sl.db`). Slak 1.6 menambahkan dua jalan untuk membaca dan menulis database yang tinggal di server, tanpa mengubah prinsip "Write and Run": halaman tetap satu berkas HTML, dan Slak tetap berjalan penuh tanpa server.

| Jalan               | Untuk database                                            | Yang diunggah   | Password database                         |
|---------------------|-----------------------------------------------------------|-----------------|-------------------------------------------|
| **slak-bridge.php** | MySQL/MariaDB, PostgreSQL, SQLite di hosting PHP (cPanel) | satu berkas PHP | tinggal di server                         |
| **slak-bridge.js**  | sama, untuk server/VPS Node.js                            | satu berkas JS  | tinggal di server                         |
| **libSQL/Turso**    | SQLite di cloud Turso, atau server sqld                   | tidak ada       | token di halaman (pakai token hanya-baca) |

## 33.1 slak-bridge.php di hosting cPanel

slak-bridge.php adalah "jembatan": halaman Slak mengirim kueri SQL ke berkas ini, berkas ini menjalankannya di database hosting, lalu mengembalikan hasilnya. Password database ditulis di berkas PHP dan tidak pernah dikirim ke browser.

Cara termudah membuatnya: di jendela Database Slak Studio, sambungkan ke database hostingmu (lihat Bab 30), klik kanan tabel atau koneksi › **Pakai di kode Slak** › **Buat slak-bridge.php**. Isi password, pilih izinnya, lalu simpan. Di hosting cPanel, server database biasanya `localhost`.

![Membuat slak-bridge.php dari jendela Database](konten/gambar/membuat-slak-bridge-php-dari-jendela-database.png)

Unggah berkas itu ke folder yang sama dengan aplikasimu, misalnya `public_html`. Buka `https://situsmu.com/slak-bridge.php` di browser: tulisan `{"ok":true, ...}` berarti jembatan siap. Lalu di aplikasi:

```slak tanpa-jalan
const db = sl.connection("toko", { type: "bridge", url: "slak-bridge.php" })

const produk = await db.query("SELECT nama, harga, stok FROM produk WHERE harga < ?", { params: [20000] })
sl.dataframe(produk)
```

![Hasil kueri lewat slak-bridge.php](konten/gambar/hasil-kueri-lewat-slak-bridge-php.png)

Hasil `query` berupa DataFrame, jadi semua fungsi Slak Data (Bab 14–19) langsung bisa dipakai. Kolom tanggal otomatis menjadi tanggal. Tanda `?` diisi dari `params` secara aman, jadi jangan menyusun SQL dengan menyambung teks dari isian pengguna.

## 33.2 Izin: membaca, menulis, atau kueri bernama

Jembatan bawaan **hanya boleh membaca** (SELECT), satu perintah per permintaan. Ini pilihan paling aman, karena siapa pun yang membaca kode halamanmu bisa mengirim kueri sendiri ke jembatan. Bila aplikasi perlu menambah data, misalnya buku tamu, pilih "Membaca dan menulis" dan sebutkan tabel yang boleh diubah:

```slak tanpa-jalan
const db = sl.connection("toko", { type: "bridge", url: "slak-bridge.php" })
const nama = sl.text_input("Nama"), isi = sl.text_area("Pesan")
if (sl.button("Kirim")) {
  await db.execute("INSERT INTO pesan (nama, isi) VALUES (?, ?)", [nama, isi])
  sl.success("Terima kasih!")
}
sl.dataframe(await db.query("SELECT nama, isi FROM pesan ORDER BY id DESC LIMIT 20"))
```

Untuk keamanan paling ketat, pakai **mode "queries"**: halaman tidak bisa mengirim SQL sendiri, hanya memanggil kueri bernama yang kamu tulis di slak-bridge.php, misalnya `'omzet_per_kota' => 'SELECT kota, SUM(total) ...'`. Di aplikasi: `await db.run("omzet_per_kota")`.

Perintah yang mengubah struktur (DROP, ALTER, CREATE) selalu ditolak bila dikirim dari halaman, apa pun modenya. Hanya kueri bernama yang kamu tulis sendiri di slak-bridge.php yang dipercaya penuh.

| Fungsi                                 | Hasil                                                                                                  |
|----------------------------------------|--------------------------------------------------------------------------------------------------------|
| `await db.query(sql, { params, ttl })` | DataFrame. `ttl` (detik) menyimpan hasil sementara agar tidak bertanya ke server di setiap jalan ulang |
| `await db.execute(sql, params)`        | `{ rowCount, lastInsertId }`                                                                           |
| `await db.run("nama_kueri", params)`   | DataFrame dari kueri bernama                                                                           |
| `await db.tables()`                    | daftar tabel                                                                                           |
| `await db.table("produk")`             | seluruh isi satu tabel                                                                                 |

## 33.3 Mencoba sebelum diunggah

Alamat pendek `"slak-bridge.php"` baru berlaku setelah halaman diunggah ke hosting yang sama. Di pratinjau Slak Studio dan di halaman yang dibuka dengan klik dua kali, tambahkan alamat lengkap untuk percobaan:

```slak tanpa-jalan
const db = sl.connection("toko", { type: "bridge", url: "slak-bridge.php", dev_url: "https://situsmu.com/slak-bridge.php" })
```

Bila server menjalankan Node.js, bukan PHP, pakai **slak-bridge.js**. Isi pengaturannya sama, pasang driver sekali (`npm install mysql2` atau `npm install pg`; SQLite tidak perlu apa-apa), lalu jalankan `node slak-bridge.js`. Alamatnya menjadi `http://localhost:8787`. Kedua jembatan memakai bahasa yang sama, jadi kode aplikasi tidak perlu diubah.

## 33.4 libSQL dan Turso

Turso menyediakan database SQLite di cloud dengan paket gratis. Server libSQL menerima kueri lewat HTTP dan mengizinkan browser memanggilnya, jadi tidak perlu jembatan:

```slak tanpa-jalan
const db = sl.connection("cloud", { type: "turso", url: "libsql://nama-db-akun.turso.io", token: "TOKEN_HANYA_BACA" })
const df = await db.query("SELECT nama, harga FROM produk ORDER BY harga DESC")
sl.bar_chart(df, { x: "nama", y: "harga" })
```

![Data dari libSQL/Turso](konten/gambar/data-dari-libsql-turso.png)

Token yang ditulis di halaman bisa dibaca pengunjung, jadi buat token **hanya-baca**: `turso db tokens create nama-db --read-only`. Untuk menulis data dari aplikasi, simpan token penuh di slak-bridge.js, bukan di halaman.

Jendela Database Slak Studio juga bisa membuka libSQL/Turso (Koneksi baru › libSQL / Turso): lihat tabel, ubah data dalam satu transaksi, dan jalankan SQL, sama seperti database lain.

![libSQL di jendela Database](konten/gambar/libsql-di-jendela-database.png)

## 33.5 Mana yang dipilih

- **Data tidak berubah, atau hanya kamu yang mengubahnya:** tetap pakai CSV, Parquet, atau SQLite yang ikut diunggah bersama halaman. Paling sederhana dan paling cepat.

- **Hosting cPanel yang sudah punya MySQL:** slak-bridge.php.

- **Tidak punya hosting PHP, ingin database gratis di cloud:** Turso.

- **Banyak pengunjung menulis data dan butuh login sungguhan:** Slak belum dirancang untuk itu (Bab 32.3). Gunakan layanan backend khusus, lalu tampilkan datanya dengan Slak.
