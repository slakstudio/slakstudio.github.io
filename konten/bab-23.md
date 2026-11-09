Bab 9 dan Bab 16 memperkenalkan `sl.data_editor` dan SQLite. Versi 1.3 menyatukan keduanya: tabel yang diedit di layar bisa disimpan kembali ke database dengan satu perintah.

## 23.1 DataFrame masuk, DataFrame keluar

Bila diberi DataFrame, `sl.data_editor` mengembalikan DataFrame, sehingga hasilnya langsung bisa dianalisis. Tipe tanggal tetap berupa tanggal.

```slak
const target = new sl.DataFrame([{ gudang: "Jayapura", target: 15000000 }, { gudang: "Sorong", target: 12000000 }])
const t = sl.data_editor(target, { key: "target", persist: true, disabled: ["gudang"] })
sl.metric("Total target", "Rp " + t.target.sum().toLocaleString("id-ID"))
```

Opsi `persist: true` menyimpan hasil edit di browser, jadi angka target tetap ada saat halaman dibuka lagi.

## 23.2 Daftar perubahan

Setiap hasil `data_editor` punya `hasil.edits`, dengan format yang sama seperti Streamlit (juga tersedia di `sl.session_state[key]`):

```slak tanpa-jalan
{
  edited_rows: { 0: { stok: 25 } },        // baris ke-0 kolom stok diubah
  added_rows: [ { nama: "Garam", stok: 3 } ],
  deleted_rows: [ 2 ]                       // baris ke-2 dihapus
}
```

Nomor baris mengacu pada data asli yang diberikan ke editor.

## 23.3 Menyimpan ke SQLite dengan save_edits

`db.save_edits(tabel, data, hasil)` menerjemahkan daftar perubahan menjadi `UPDATE`, `INSERT`, dan `DELETE` dalam satu transaksi. Bila satu perintah gagal (misalnya kolom wajib kosong), semuanya dibatalkan dan pesan galat ditampilkan.

```slak tanpa-jalan
const db = await sl.sqlite({ name: "stok-barang" })
const data = db.query("SELECT * FROM barang ORDER BY id")
const hasil = sl.data_editor(data, { key: "ed", num_rows: "dynamic", disabled: ["id"] })

if (sl.button("Simpan", { type: "primary" })) {
  let n = null
  try { n = db.save_edits("barang", data, hasil) } catch (e) { sl.error(e.message) }
  if (n) {
    delete sl.session_state.ed      // kosongkan catatan perubahan
    sl.toast(`${n.diubah} diubah, ${n.ditambah} ditambah, ${n.dihapus} dihapus`)
    sl.rerun()
  }
}
```

Hal yang perlu diperhatikan:

- Tabel butuh **kunci utama** tunggal, misalnya `id INTEGER PRIMARY KEY AUTOINCREMENT`, dan kolom kunci itu harus ada di hasil `SELECT`. Sembunyikan dari tampilan dengan `column_config: { id: null }` bila perlu. Kunci lain bisa disebut dengan `{ key: "sku" }`.

- Kolom yang dibiarkan kosong pada baris baru memakai nilai `DEFAULT` tabel.

- Jangan menaruh `sl.rerun()` di dalam `try { } catch`, karena sinyal rerun ikut tertangkap dan aplikasi tidak dijalankan ulang.

- Database `sl.sqlite({ name })` tersimpan di browser pengunjung. Tombol **Unduh database** (`sl.download_button("…", db.blob(), { file_name: "stok.db" })`) memberi salinan berkas `.db`.

## 23.4 Contoh lengkap: Inventaris Gudang

Contoh **Inventaris Gudang** di galeri (berkas `contoh-inventaris.html`) merangkum Slak 1.1 sampai 1.3 dalam satu aplikasi:

| Halaman     | Isi                                                                                                   |
|-------------|-------------------------------------------------------------------------------------------------------|
| Ringkasan   | Metric nilai stok, peta sebaran gudang, grafik per kategori, daftar barang yang perlu restok          |
| Data barang | Tabel SQLite yang bisa diedit per gudang, disimpan dengan `save_edits`                                |
| Target      | Tabel target biasa yang bisa diedit (`persist: true`), dibandingkan dengan realisasi                  |
| Analisis    | Klasifikasi ABC (Pareto), perkiraan hari stok cukup, tren barang keluar, unduh daftar restok ke Excel |

Contoh lain yang lebih sederhana: **Stok Barang (SQLite)** (`contoh-stok-sqlite.html`).
