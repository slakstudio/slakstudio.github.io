Sejak 1.3.1, Slak punya wadah yang muncul hanya saat dibutuhkan dan bagian halaman yang bisa jalan ulang sendiri. Semuanya bekerja tanpa internet.

## 24.1 Popover

Popover adalah tombol yang membuka panel kecil. Cocok untuk pengaturan tambahan agar halaman tetap lapang.

```slak
const atur = sl.popover("Pengaturan", { icon: "⚙️" })
const detail = atur.checkbox("Tampilkan detail")
const warna = atur.color_picker("Warna grafik", "#0f766e")
```

Panel tertutup saat pengguna mengklik di luar panel atau menekan Esc.

## 24.2 Dialog

Dialog adalah jendela modal. Buat dulu dengan `sl.dialog(judul, fungsi)`, lalu panggil hasilnya untuk membuka dialog, biasanya saat tombol diklik. Argumen tambahan diteruskan ke fungsi dialog.

```slak tanpa-jalan
const ubah = sl.dialog("Ubah stok", (sl, barang) => {
  sl.write(`Barang: **${barang.nama}**`)
  const stok = sl.number_input("Stok baru", barang.stok)
  if (sl.button("Simpan", { type: "primary" })) {
    sl.session_state.stok = stok
    sl.rerun()          // menutup dialog dan memperbarui halaman
  }
}, { width: "medium" })

if (sl.button("Ubah stok")) ubah({ nama: "Kopi Papua", stok: 12 })
```

Widget di dalam dialog hanya menjalankan ulang isi dialog, sehingga halaman di belakangnya tidak ikut dihitung ulang. Dialog tertutup bila pengguna menekan × atau Esc, mengklik di luar jendela, atau kode memanggil `sl.rerun()`. Opsi `dismissible: false` mematikan penutupan selain lewat kode, dan `on_dismiss` menjalankan fungsi saat dialog ditutup.

## 24.3 Fragment

Biasanya setiap interaksi menjalankan ulang seluruh skrip. Fragment adalah bagian yang bisa jalan ulang sendiri:

```slak
const panel = sl.fragment((sl) => {
  if (sl.button("Tambah")) sl.session_state.n = (sl.session_state.n || 0) + 1
  sl.metric("Hitungan", sl.session_state.n || 0)
})
panel()      // jangan lupa dipanggil
```

Dengan `run_every`, fragment berjalan ulang sendiri secara berkala. Ini cocok untuk dasbor pemantau:

```slak tanpa-jalan
const langsung = sl.fragment(async (sl) => {
  const data = await sl.read_csv("https://contoh.id/data-terbaru.csv")
  sl.metric("Pesanan hari ini", data.length)
}, { run_every: "30s" })
langsung()
```

Di dalam fragment, `sl.rerun({ scope: "fragment" })` hanya menjalankan ulang fragment itu, sedangkan `sl.rerun()` biasa menjalankan ulang seluruh halaman.

## 24.4 Status, skeleton, dan wadah lain

- `sl.status(label, fungsi)` menampilkan kotak proses. Dengan fungsi async, statusnya otomatis berubah menjadi selesai (✓) atau gagal (✕). Bisa juga diubah manual: `s.update({ label: "Selesai", state: "complete" })`.

- `sl.skeleton({ height: 120 })` menampilkan kotak berkilau sebagai penanda isi yang sedang dimuat. Isinya diganti saat kamu menulis ke placeholder itu.

- `sl.container({ horizontal: true, gap: "small" })` menyusun isi berjajar. `height` berupa angka membuat wadah bergulir, cocok untuk riwayat chat.

- `sl.bottom` adalah area yang menempel di bawah layar. `sl.space("medium")` memberi jarak kosong.

- `sl.columns(3, { border: true })` memberi bingkai pada tiap kolom.
