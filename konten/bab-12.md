Sejak Slak 1.1, aplikasi bisa dibagi menjadi beberapa halaman dengan menu navigasi: setiap halaman adalah fungsi biasa, dan `sl.navigation` mengatur menu serta alamatnya.

![Aplikasi Kasir Toko dengan tiga halaman di sidebar: Kasir, Produk, dan Laporan](konten/gambar/aplikasi-kasir-toko-dengan-tiga-halaman-di-sideb.png)

## 12.1 Halaman pertama

```slak tanpa-jalan
const beranda = (sl) => {
  sl.title("🏠 Beranda")
  sl.write("Selamat datang!")
}

const data = (sl) => {
  sl.title("📊 Data")
  sl.dataframe([{ kota: "Jayapura", suhu: 31 }])
}

sl.navigation([
  sl.page("Beranda", beranda, { icon: "🏠" }),
  sl.page("Data", data, { icon: "📊" }),
]).run()
```

1.  Setiap halaman ditulis sebagai fungsi yang menerima `sl`.

2.  `sl.page(judul, fungsi, opsi)` mendaftarkan halaman.

3.  `sl.navigation([...])` menampilkan menu di sidebar dan mengembalikan halaman yang sedang dibuka.

4.  `.run()` menjalankan fungsi halaman itu.

Kode di luar fungsi halaman (sebelum atau sesudah `navigation`) berjalan di semua halaman. Tempat yang tepat untuk `set_page_config`, membuka database, atau menyiapkan `session_state`.

## 12.2 Opsi halaman dan navigasi

| Fungsi dan opsi                                  | Keterangan                                                        |
|--------------------------------------------------|-------------------------------------------------------------------|
| `sl.page(judul, fungsi, { icon })`               | Ikon di menu, misalnya emoji                                      |
| `sl.page(…, { url: "laporan-bulanan" })`         | Alamat halaman; bawaannya dibuat dari judul (`#/laporan-bulanan`) |
| `sl.page(…, { default: true })`                  | Halaman yang dibuka pertama kali; bawaannya halaman pertama       |
| `sl.navigation(daftar, { position: "sidebar" })` | Menu di sidebar (bawaan)                                          |
| `sl.navigation(daftar, { position: "top" })`     | Menu berupa tab di atas halaman                                   |
| `sl.navigation(daftar, { position: "hidden" })`  | Tanpa menu; berpindah lewat `page_link` atau `switch_page`        |
| `sl.navigation({ "Utama": […], "Admin": […] })`  | Menu dikelompokkan dengan judul bagian                            |

Objek yang dikembalikan `navigation` punya `title`, `icon`, `url`, dan `run()`. Contohnya, `pg.title` bisa dipakai untuk menampilkan nama halaman di footer.

## 12.3 Berpindah halaman

- **Menu:** klik nama halaman di sidebar atau di tab atas.

- **Tautan:** `sl.page_link("Data")` membuat tautan ke halaman lain. Untuk situs luar: `sl.page_link("https://…", { label: "Dokumentasi" })`.

- **Dari kode:** `sl.switch_page("Data")` langsung berpindah, misalnya setelah form dikirim. Kode setelah `switch_page` tidak dijalankan.

- **Tombol Back browser** kembali ke halaman sebelumnya, karena setiap halaman punya alamat sendiri.

Di layar sempit, termasuk pratinjau Slak Studio, sidebar dilipat dan tombol ☰ menampilkan nama halaman aktif, misalnya "☰ 🛒 Kasir". Klik tombol itu untuk membuka menu.

## 12.4 Berbagi data antar halaman

`sl.session_state`, `sl.local_state`, dan database dipakai bersama oleh semua halaman. Nilai widget hanya hidup di halamannya; saat berpindah halaman, widget halaman lama dibuang. Agar pilihan tetap ada saat kembali, beri widget `key` (nilainya tersimpan di `session_state`) atau `persist: true` (tersimpan permanen).

```slak
const ss = sl.session_state
if (!ss.keranjang) ss.keranjang = []    // terlihat dari semua halaman

const kasir = (sl) => {
  if (sl.button("Tambah")) ss.keranjang.push("Kopi")
  sl.write(ss.keranjang.length + " barang")
}
```

## 12.5 Halaman yang memakai `await`

Fungsi halaman boleh `async`, misalnya untuk membaca database. Tulis `await` di depan `.run()` agar Slak menunggu halaman selesai:

```slak tanpa-jalan
async function laporan(sl) {
  const rows = await db.penjualan.all()
  sl.dataframe(rows)
}

await sl.navigation([sl.page("Laporan", laporan)]).run()
```

Jika `await` lupa ditulis, Slak tetap menunggu halaman selesai sebelum menyelesaikan jalan, sehingga tidak ada elemen yang hilang.
