Model machine learning (Bab 19) paling mudah dijelaskan kepada atasan atau klien dengan **dicoba**: "kalau pelanggan ini punya tiga keluhan, apakah ia akan berhenti?" `sl.ml_demo` membuat formulir coba model itu dalam satu baris. Bab ini juga memperkenalkan tiga templat dasbor siap pakai yang bisa langsung diganti datanya.

## 37.1 sl.ml_demo

```slak
const df = sl.dataset("pelanggan").drop("pelanggan_id")
const hasil = sl.ml_demo(sl.ml.RandomForestClassifier({ n_estimators: 30 }), df,
  { target: "churn", labels: { 0: "Bertahan", 1: "Berhenti" } })
if (hasil.proba["1"] > 0.5) sl.warning("Pelanggan seperti ini berisiko berhenti.")
```

![Formulir coba model churn: slider umur, lama berlangganan, tagihan, keluhan, pilihan kota dan paket, lalu prediksi dengan peluang tiap kelas](konten/gambar/formulir-coba-model-churn-slider-umur-lama-berla.png)

Setiap fitur mendapat widget yang sesuai:

| Jenis kolom     | Widget                                             | Nilai awal                      |
|-----------------|----------------------------------------------------|---------------------------------|
| Angka           | slider dari nilai terkecil sampai terbesar di data | median                          |
| Teks (kategori) | pilihan                                            | nilai yang paling sering muncul |
| Ya/tidak        | kotak centang                                      | mayoritas                       |
| Tanggal         | pilihan tanggal                                    | tanggal tengah                  |

Prediksi tampil langsung di bawahnya. Untuk klasifikasi, grafik batang menunjukkan peluang tiap kelas; untuk regresi, keterangan menyebut rentang target di data latih. Bagian **Fitur mana yang paling berpengaruh?** menampilkan kepentingan fitur (pohon dan hutan acak) atau koefisien (regresi).

| Opsi                          | Gunanya                                                                       |
|-------------------------------|-------------------------------------------------------------------------------|
| `target`                      | kolom yang ditebak; model yang belum dilatih otomatis dilatih dengan data itu |
| `features`                    | hanya kolom tertentu yang ditampilkan sebagai widget                          |
| `labels`                      | nama kelas, misalnya `{ 0: "Bertahan", 1: "Berhenti" }`                       |
| `title`, `caption`, `columns` | judul, keterangan, dan jumlah kolom widget (bawaan 3)                         |
| `key`                         | pembeda bila ada beberapa formulir di satu halaman                            |
| `explain: false`              | menyembunyikan bagian fitur berpengaruh                                       |

`sl.ml_demo` mengembalikan `{ input, prediction, proba }`, jadi hasilnya bisa dipakai untuk peringatan atau saran tindak lanjut. Ingat bahwa prediksi model adalah perkiraan dari pola di data, bukan kepastian.

## 37.2 Tiga templat dasbor

Galeri Slak Studio punya tiga templat baru. Semuanya memakai dataset bawaan, dan bagian atas kodenya menjelaskan cara mengganti data.

| Templat                      | Isi                                                                                                                                              | Data bawaan |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| **Dasbor Penjualan**         | filter periode, wilayah, kanal; omzet, transaksi, rata-rata dibanding periode sebelumnya; tren, kategori, wilayah, 10 produk terlaris; unduh CSV | `penjualan` |
| **Dasbor Pelanggan & Churn** | tingkat churn per paket, kota, dan jumlah keluhan; tab Coba model dengan `sl.ml_demo`                                                            | `pelanggan` |
| **Dasbor SDM**               | gaji per departemen, pendidikan, pelatihan dan kinerja, korelasi; perkiraan gaji dengan regresi linear                                           | `karyawan`  |

![Templat Dasbor Penjualan: filter di samping, empat angka utama dengan perubahan dibanding periode sebelumnya, tren bulanan, dan grafik per kategori dan wilayah](konten/gambar/templat-dasbor-penjualan-filter-di-samping-empat.png)

Untuk memakai datamu sendiri pada Dasbor Penjualan, ganti dua baris di atas:

```slak tanpa-jalan
const KOLOM = { tanggal: "tgl_jual", nilai: "nilai", kategori: "jenis", wilayah: "cabang", kanal: "kanal", produk: "barang", transaksi: "no_nota" }
const DATA = await sl.read_csv("penjualan-toko.csv")
```

Ketiga templat juga ada sebagai halaman di `contoh-1-7.html` dalam paket Slak.

## 37.3 Kerangka halaman: sl.layout

Templat di atas adalah aplikasi lengkap. Bila kamu ingin mulai dari kerangka kosong yang rapi, `sl.layout` menyiapkan area bernama yang tinggal diisi:

```slak tanpa-jalan
const df = sl.dataset("penjualan")
const area = sl.layout("grid-2x2", { title: "Dasbor Empat Kotak" })
area.kpi.metric("Omzet", df.total.sum(), null, { format: "rp" })
area.kpi.metric("Transaksi", df.length)
area.kiri_atas.line_chart(...)
area.kanan_atas.bar_chart(...)
area.kiri_bawah.pie_chart(...)
area.kanan_bawah.dataframe(...)
```

| Kerangka       | Area                                                | Cocok untuk                                                |
|----------------|-----------------------------------------------------|------------------------------------------------------------|
| kpi-atas       | kpi, grafik, tabel                                  | ringkasan harian atau bulanan                              |
| sidebar-filter | filter (di sidebar), kpi, grafik, tabel             | dasbor yang disaring                                       |
| grid-2x2       | kpi, kiri_atas, kanan_atas, kiri_bawah, kanan_bawah | empat grafik sekaligus; menjadi satu kolom di layar sempit |
| laporan        | judul, ringkasan, isi, catatan                      | laporan yang dibaca atau dicetak                           |

Metrik yang ditulis ke area `kpi` tampil sebagai kartu sejajar. Opsi `title` dan `caption` ditaruh di atas kerangka (pada kerangka laporan, di area judul). Di Slak Studio, **Berkas › Baru dari templat…** membuka keempat kerangka ini beserta ketiga templat dasbor lengkap.
