Bab ini berisi pola kode siap pakai untuk kebutuhan yang sering muncul, ditutup dengan satu proyek utuh. Semua kode sudah diuji dan bisa ditempel langsung ke Slak Studio.

## 10.1 Validasi sebelum melanjutkan

Gunakan `sl.stop()` agar bagian bawah aplikasi tidak tampil sebelum input wajib diisi.

```slak tanpa-jalan
sl.title("Pendaftaran")
const nama = sl.text_input("Nama lengkap")
if (!nama) {
  sl.info("Isi nama dulu untuk melanjutkan.")
  sl.stop()
}
sl.success(`Halo, ${nama}!`)
```

## 10.2 Aplikasi beberapa halaman

Untuk aplikasi kecil, menu di sidebar dan `if` sudah cukup, seperti contoh di bawah. Untuk aplikasi yang lebih besar, gunakan `sl.navigation` (Bab 12), yang memberi setiap halaman alamatnya sendiri.

```slak
const halaman = sl.sidebar.radio("Menu", ["Beranda", "Data", "Tentang"])

if (halaman === "Beranda") {
  sl.title("Beranda")
  sl.write("Selamat datang di aplikasiku.")
} else if (halaman === "Data") {
  sl.title("Data")
  sl.dataframe([{ a: 1, b: 2 }, { a: 3, b: 4 }])
} else {
  sl.title("Tentang")
  sl.caption("Dibuat dengan Slak.")
}
```

## 10.3 Mengambil data dari internet

Skrip Slak bisa memakai `fetch` bawaan browser. Bungkus dengan `cache_data` agar data tidak diunduh ulang setiap interaksi, dan tangani galat jika internet putus. Server tujuan harus mengizinkan akses dari browser (CORS).

```slak tanpa-jalan
const ambil = sl.cache_data(async () => {
  const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-2.53&longitude=140.72&current=temperature_2m")
  return r.json()
}, { ttl: 600 })

sl.title("Cuaca Jayapura")
try {
  const data = await sl.spinner("Mengambil data…", () => ambil())
  sl.metric("Suhu sekarang", data.current.temperature_2m + " °C")
} catch (e) {
  sl.error("Gagal mengambil data: " + e.message)
}
```

## 10.4 Pilihan yang ikut tersimpan di URL

`query_params` menyimpan pilihan di alamat halaman, sehingga tautan yang dibagikan langsung membuka pilihan yang sama. Pola ini berguna pada aplikasi yang diekspor dan dipasang di web.

```slak tanpa-jalan
const kotaList = ["Jayapura", "Sorong", "Merauke"]
const awal = kotaList.indexOf(sl.query_params.get("kota") || "Jayapura")
const kota = sl.selectbox("Kota", kotaList, { index: Math.max(0, awal) })
sl.query_params.set("kota", kota)
```

## 10.5 Pola lain yang sering dipakai

| Kebutuhan                             | Pola                                                                                                                                |
|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Daftar yang bisa ditambah dan dihapus | Simpan larik di `session_state`; tambah lewat form, hapus lewat tombol dengan `key` unik dan `on_click` (lihat contoh Daftar Tugas) |
| Data contoh saat belum ada unggahan   | `const rows = f ? f.csv() : sl.parse_csv("a,b\n1,2")`                                                                               |
| Menjumlahkan kolom                    | `data.reduce((t, r) => t + r.jumlah, 0)`                                                                                            |
| Mengelompokkan per kategori           | Kumpulkan ke objek, lalu `Object.entries(obj).map(([k, v]) => ({ kategori: k, total: v }))`                                         |
| Format rupiah                         | `"Rp " + angka.toLocaleString("id-ID")`                                                                                             |
| Tombol berdampingan                   | `const [a, b] = sl.columns(2)` lalu `a.button(…)` dan `b.button(…)`                                                                 |
| Animasi yang bisa dimatikan           | `do { … if (jalan) await sl.sleep(60) } while (jalan)` dengan `jalan` dari `sl.toggle`                                              |
| Hasil yang muncul bertahap            | Siapkan `const ph = sl.empty()` lalu tulis ulang `ph` di dalam perulangan                                                           |

## 10.6 Proyek: Catatan Pengeluaran

Proyek ini menggabungkan form, `session_state`, kolom, metric, grafik, tabel, dan unduhan CSV dalam sekitar 40 baris. Buat berkas baru di Slak Studio, tempel kodenya, lalu coba tambahkan beberapa pengeluaran.

```slak tanpa-jalan
sl.set_page_config({ page_title: "Catatan Pengeluaran", page_icon: "💸" })
sl.title("💸 Catatan Pengeluaran")
const ss = sl.session_state
if (!ss.catatan) ss.catatan = []

// 1. Form input
const f = sl.form("tambah", { clear_on_submit: true })
const [a, b] = f.columns(2)
const ket = a.text_input("Keterangan", { placeholder: "mis. Makan siang" })
const jumlah = b.number_input("Jumlah (Rp)", { min: 0, value: 0, step: 1000 })
const kategori = f.selectbox("Kategori", ["Makan", "Transportasi", "Belanja", "Hiburan", "Lainnya"])
if (f.form_submit_button("Simpan", { type: "primary" })) {
  if (!ket || jumlah <= 0) sl.warning("Isi keterangan dan jumlah yang lebih dari nol.")
  else {
    ss.catatan.push({ tanggal: new Date().toLocaleDateString("id-ID"), ket, kategori, jumlah })
    sl.toast("Tersimpan", "✓")
  }
}

// 2. Ringkasan
const rp = (v) => "Rp " + v.toLocaleString("id-ID")
const total = ss.catatan.reduce((t, c) => t + c.jumlah, 0)
const [m1, m2] = sl.columns(2)
m1.metric("Total pengeluaran", rp(total), null, { border: true })
m2.metric("Jumlah catatan", ss.catatan.length, null, { border: true })

// 3. Grafik per kategori
if (ss.catatan.length) {
  const perKategori = {}
  for (const c of ss.catatan) perKategori[c.kategori] = (perKategori[c.kategori] || 0) + c.jumlah
  const data = Object.entries(perKategori).map(([kategori, jumlah]) => ({ kategori, jumlah }))
  sl.bar_chart(data, { x: "kategori", y: "jumlah", title: "Per kategori" })

  // 4. Tabel dan unduhan
  sl.dataframe(ss.catatan, { hide_index: true })
  sl.download_button("Unduh CSV", sl.to_csv(ss.catatan), { file_name: "pengeluaran.csv", mime: "text/csv" })
} else {
  sl.info("Belum ada catatan. Tambahkan lewat form di atas.")
}
```

![Aplikasi Catatan Pengeluaran setelah empat catatan ditambahkan](konten/gambar/aplikasi-catatan-pengeluaran-setelah-empat-catat.png)

Cara kerjanya:

1.  **Form** dengan `clear_on_submit: true` mengosongkan isian setelah Simpan. Selama mengetik, aplikasi tidak dijalankan ulang.

2.  Setiap catatan disimpan sebagai objek di larik `ss.catatan`, sehingga tidak hilang saat skrip berjalan ulang.

3.  **Ringkasan** dihitung ulang dari larik itu setiap jalan, jadi selalu sesuai data.

4.  **Grafik** mengelompokkan jumlah per kategori, lalu **tabel** dan **Unduh CSV** memakai larik yang sama.

Ide pengembangan: tambahkan `sl.sidebar.multiselect` untuk menyaring kategori, tombol hapus per baris, atau `file_uploader` untuk memuat kembali CSV yang pernah diunduh. Agar catatan tidak hilang saat halaman dimuat ulang, ganti sl.session_state dengan sl.local_state, atau simpan catatan ke sl.db (Bab 13).
