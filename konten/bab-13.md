Slak 1.1 menyimpan data di browser pengguna dengan dua cara yang tetap ada walau halaman ditutup: `sl.local_state` untuk data kecil, dan `sl.db` (IndexedDB) untuk data aplikasi sungguhan.

## 13.1 Memilih tempat penyimpanan

| Tempat             | Bertahan setelah halaman ditutup? | Kapasitas                     | Cocok untuk                                 |
|--------------------|-----------------------------------|-------------------------------|---------------------------------------------|
| `sl.session_state` | Tidak                             | Memori                        | Keranjang belanja sementara, langkah wizard |
| `sl.local_state`   | Ya                                | Sekitar 5 MB, hanya data JSON | Pengaturan, isian form, daftar kecil        |
| `sl.db`            | Ya                                | Ratusan MB atau lebih         | Produk, transaksi, catatan, ribuan baris    |

## 13.2 `sl.local_state`

Cara pakainya sama dengan `session_state`; bedanya, isinya disimpan otomatis setiap kali skrip selesai berjalan.

```slak tanpa-jalan
const ls = sl.local_state
if (!ls.catatan) ls.catatan = []
if (sl.button("Tambah")) ls.catatan.push({ teks: "baru", waktu: Date.now() })

sl.text_input("Nama", { persist: true })     // isian widget diingat
if (sl.button("Lupakan semua")) sl.clear_local_state()
```

- Hanya data JSON yang tersimpan: teks, angka, `true`/`false`, `null`, larik, dan objek. Tanggal (`Date`) berubah menjadi teks; simpan sebagai angka `Date.now()` atau teks `"YYYY-MM-DD"`.

- Opsi `persist: true` berlaku untuk semua widget kecuali `file_uploader`.

- Setiap aplikasi punya ruang sendiri. Di halaman web, ruang ditentukan oleh lokasi berkas atau atribut `data-app="nama"` pada tag `<script type="text/slak">`; dengan `Slak.run`, lewat opsi `app_id`. Di Slak Studio, setiap berkas, draf, dan pelajaran punya ruang sendiri.

## 13.3 Membuat database dengan `sl.db`

```slak tanpa-jalan
const db = sl.db("toko", {
  produk: "++id, nama, kategori",
  pelanggan: "&email, nama",
})
```

Argumen pertama adalah nama database; argumen kedua adalah daftar tabel beserta skemanya. Tabel lalu bisa dipakai sebagai `db.produk` dan `db.pelanggan`.

| Tulisan skema                      | Arti                                                     |
|------------------------------------|----------------------------------------------------------|
| `"++id"`                           | Kunci otomatis bernama `id` (1, 2, 3, …)                 |
| `"kode"`                           | Kunci diisi sendiri, bernama `kode`                      |
| `"++id, nama, harga"`              | Kolom setelah kunci diberi indeks agar pencarian cepat   |
| `"++id, &email"`                   | Indeks unik: nilai yang sama tidak boleh muncul dua kali |
| `"++id, *tag"`                     | Indeks untuk kolom berisi larik, misalnya daftar tag     |
| `{ key: "kode", index: ["nama"] }` | Bentuk objek dari skema yang sama                        |

Kolom yang tidak disebut di skema tetap bisa disimpan; skema hanya menentukan kunci dan indeks. Jika skema diubah (tabel atau indeks ditambah), Slak memperbarui database secara otomatis tanpa menghapus data. Mengganti kolom kunci tabel yang sudah ada tidak didukung; buat tabel baru untuk itu.

## 13.4 Create, Read, Update, Delete

Semua perintah database memakai `await`.

| Perintah                                                       | Hasil                                                                      |
|----------------------------------------------------------------|----------------------------------------------------------------------------|
| `await db.produk.insert({ nama: "Kopi", harga: 45000 })`       | Kunci baris baru; larik objek → larik kunci. Galat jika kuncinya sudah ada |
| `await db.produk.put({ id: 1, nama: "Kopi" })`                 | Tambah atau timpa berdasarkan kunci                                        |
| `await db.produk.get(1)`                                       | Satu baris, atau `null`                                                    |
| `await db.produk.all()`                                        | Semua baris                                                                |
| `await db.produk.first()`, `count()`                           | Baris pertama; jumlah baris                                                |
| `await db.produk.update(1, { harga: 40000 })`                  | Baris setelah diubah, atau `null` jika tidak ada                           |
| `await db.produk.update(1, p => ({ ...p, stok: p.stok - 1 }))` | Ubah dengan fungsi, berguna untuk menghitung dari nilai lama               |
| `await db.produk.delete(1)` atau `delete([1, 2])`              | Hapus satu atau beberapa baris                                             |
| `await db.produk.clear()`                                      | Kosongkan tabel                                                            |

Nomor kunci otomatis (`++id`) tidak pernah dipakai ulang, bahkan setelah `clear()`. Jika tabel dikosongkan lalu diisi lagi, baris barunya mulai dari nomor berikutnya, bukan dari 1. Karena itu, ambil kunci dari data (misalnya `(await db.produk.first()).id`), jangan menebak angkanya.

## 13.5 Mencari dan mengurutkan

```slak tanpa-jalan
const minuman = await db.produk.where("kategori").equals("Minuman").all()
const murah = await db.produk.where("harga").below(30000).sortBy("harga").all()
const terbaru = await db.penjualan.orderBy("id", "desc").limit(10).all()
const cocok = await db.produk.filter(p => p.nama.includes("Kopi")).all()
```

| Saringan `where(kolom).…`                        | Arti                                                                                   |
|--------------------------------------------------|----------------------------------------------------------------------------------------|
| `equals(v)`, `notEqual(v)`                       | Sama dengan / tidak sama dengan                                                        |
| `above(v)`, `aboveOrEqual(v)`                    | Lebih dari / lebih dari atau sama dengan                                               |
| `below(v)`, `belowOrEqual(v)`                    | Kurang dari / kurang dari atau sama dengan                                             |
| `between(a, b)`                                  | Dari `a` sampai sebelum `b`; `between(a, b, true, true)` termasuk `b`                  |
| `startsWith(teks)`, `startsWithIgnoreCase(teks)` | Diawali teks tertentu                                                                  |
| `contains(teks)`                                 | Mengandung teks (tanpa membedakan huruf besar-kecil), atau larik yang berisi nilai itu |
| `anyOf([…])`, `noneOf([…])`                      | Salah satu dari / bukan salah satu dari                                                |

Hasil saringan bisa disambung dengan `.filter(fn)`, `.sortBy(kolom, "desc")`, `.reverse()`, `.offset(n)`, `.limit(n)`, lalu diakhiri `.all()`, `.first()`, `.count()`, `.delete()`, atau `.update(perubahan)`. Saringan pada kolom berindeks lebih cepat; kolom tanpa indeks tetap bisa disaring, tetapi semua baris dibaca dulu.

## 13.6 Editor tabel: `sl.data_editor`

`sl.data_editor` menampilkan tabel yang bisa diketik langsung. Klik sel untuk mengubah; **Enter** menyimpan, **Tab** pindah ke sel berikutnya, **Esc** membatalkan. Kolom centang diklik langsung.

![Halaman Produk: editor tabel yang terhubung ke database, sedang mengedit kolom Stok](konten/gambar/halaman-produk-editor-tabel-yang-terhubung-ke-da.png)

Ada dua cara pakai:

```slak tanpa-jalan
// 1. Dengan larik: hasil edit dikembalikan, data asli tidak berubah
const nilai = sl.data_editor(siswa, { num_rows: "dynamic" })

// 2. Dengan tabel database: setiap perubahan langsung tersimpan
await sl.data_editor(db.produk, {
  column_config: {
    nama: { label: "Nama produk", required: true },
    harga: { label: "Harga (Rp)", type: "number", min: 0 },
    kategori: { options: ["Makanan", "Minuman", "Lainnya"] },
  },
})
```

| Opsi                                   | Keterangan                                                                                                                                                                  |
|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `num_rows`                             | `"fixed"` atau `"dynamic"` (tombol **+ Tambah baris** dan **×** hapus). Bawaan: fixed untuk larik, dynamic untuk tabel database                                             |
| `disabled`                             | `true` (semua kolom terkunci) atau daftar kolom, misalnya `["id"]`                                                                                                          |
| `column_config`                        | Per kolom: `label`, `type` (`"text"`, `"number"`, `"checkbox"`, `"select"`, `"date"`), `options`, `min`, `max`, `required`, `disabled`, `help`; `null` menyembunyikan kolom |
| `column_order`, `hide_index`, `height` | Urutan kolom, sembunyikan nomor baris, tinggi maksimal (bawaan 400 px)                                                                                                      |
| `sort_by`, `sort_desc`                 | Urutan baris untuk tabel database; bawaannya berdasarkan kunci                                                                                                              |
| `key`, `on_change`                     | Identitas widget dan fungsi yang dipanggil setelah data berubah                                                                                                             |

Jenis kolom ditebak otomatis dari datanya: angka, centang (`true`/`false`), tanggal (`"YYYY-MM-DD"`), atau teks. Dengan tabel database, kolom kunci selalu terkunci, dan **+ Tambah baris** hanya tersedia untuk tabel berkunci otomatis (`++id`).

## 13.7 Kapan aplikasi dijalankan ulang

- Perubahan data di luar jalan skrip, misalnya dari `data_editor` atau callback `on_click`, langsung menjalankan ulang aplikasi sehingga tampilan ikut berubah.

- Jika skrip membaca tabel lalu mengubahnya di jalan yang sama (contoh: daftar di atas, tombol **Tambah** di bawah), Slak menjalankan ulang sekali lagi setelah skrip selesai agar daftar menampilkan data terbaru.

- Karena jalan ulang tambahan itu mengembalikan tombol ke `false`, pesan yang dibuat dengan `sl.success()` setelah menyimpan bisa langsung hilang. Gunakan `sl.toast()` untuk pesan "Tersimpan".

- Skrip yang menulis ke database di **setiap** jalan (di luar `if (tombol)`) dihentikan setelah dua jalan ulang otomatis, dengan peringatan di konsol.

## 13.8 Cadangan dan pemulihan

Data tersimpan di satu browser saja, jadi sediakan tombol cadangan untuk memindahkan data atau berjaga-jaga:

```slak tanpa-jalan
// Cadangan: unduh seluruh database sebagai JSON
sl.download_button("Unduh cadangan", await db.export(), { file_name: "toko-cadangan.json" })

// Pemulihan: unggah berkas cadangan
const f = sl.file_uploader("Pulihkan dari cadangan", { type: "json" })
if (f && sl.button("Pulihkan")) {
  const n = await db.import(f.json(), { clear: true })
  sl.toast(n + " baris dipulihkan")
}
```

Satu tabel juga bisa diimpor dari CSV: `await db.produk.import(f.text)`. Untuk menghapus seluruh database: `await db.delete()`.

## 13.9 Data di Slak Studio

- Data aplikasi yang dijalankan di pratinjau Studio tersimpan permanen, termasuk setelah Slak Studio ditutup.

- Untuk memulai dari data kosong, klik tombol database bersilang di bilah pratinjau, atau menu **Jalankan → Hapus data aplikasi**. Isi `local_state` dan semua database yang dipakai aplikasi itu dihapus; kodenya tidak ikut terhapus.

- **Ctrl+Shift+Enter** hanya mereset `session_state`; `local_state` dan database tetap ada.

- Berkas hasil **Ekspor HTML** menyimpan datanya sendiri di browser yang membukanya, terpisah dari data di Slak Studio.

## 13.10 Batasan penyimpanan

- Data hanya ada di browser dan komputer itu. Browser lain, mode penyamaran, atau komputer lain tidak melihatnya.

- Data hilang jika pengguna menghapus data situs atau riwayat browser.

- Siapa pun yang memakai komputer itu bisa membaca datanya. Jangan simpan kata sandi atau data rahasia.

- Tidak ada sinkronisasi antar-pengguna. Untuk data bersama banyak orang, dibutuhkan database di server: slak-bridge atau libSQL/Turso (Bab 33).
