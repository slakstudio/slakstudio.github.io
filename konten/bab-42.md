Slak berjalan di satu utas browser. Selama skrip menghitung, halaman tidak bisa diklik dan animasi berhenti. Untuk data sampai sekitar 100 ribu baris (batas nyaman di Bab 32) jeda ini hampir tidak terasa. Untuk hitungan yang memakan lebih dari setengah detik, Slak 1.9 menyediakan dua jalan: `sl.worker` untuk hitunganmu sendiri, dan pembaca CSV yang otomatis bekerja di latar untuk berkas besar.

## 42.1 Menjalankan hitungan di latar dengan sl.worker

`sl.worker(fungsi, ...data)` menjalankan fungsi di **Web Worker**, utas terpisah milik browser. Hasilnya ditunggu dengan `await`, dan selama itu halaman tetap bisa dipakai.

```slak tanpa-jalan
const df = sl.dataset("penjualan")
const hasil = await sl.worker((rows, batas) => {
  const per = {}
  for (const r of rows) if (r.total >= batas) per[r.kota] = (per[r.kota] || 0) + r.total
  return Object.entries(per).map(([kota, total]) => ({ kota, total }))
}, df, 300000)
sl.bar_chart(sl.DataFrame(hasil), { x: "kota", y: "total" })
```

Tiga aturan yang perlu diingat:

1.  **Fungsinya dikirim sebagai teks.** Fungsi worker tidak bisa memakai variabel dari luar dirinya, termasuk `sl` dan DataFrame lain. Semua yang dibutuhkan dikirim sebagai argumen sesudah fungsinya. Bila lupa, Slak menjelaskannya: "Fungsi di sl.worker memakai pajak yang tidak ada di dalam worker…".

2.  **DataFrame dikirim sebagai daftar objek** (satu objek per baris), begitu juga Series sebagai larik. Hasil worker berupa data biasa; ubah kembali dengan `sl.DataFrame(hasil)`.

3.  **Kirim dan terima data biasa:** angka, teks, larik, objek, tanggal. Fungsi, widget, dan koneksi database tidak bisa dikirim.

Bila browser menolak Web Worker (misalnya karena aturan keamanan halaman), fungsinya dijalankan biasa dengan aturan yang sama, jadi kodemu tetap benar. Di Slak 1.9, `sl.worker` berlabel **eksperimental**: cara pakainya bisa disempurnakan sebelum Slak 2.0.

Kapan memakainya? Bila hitungan memakan lebih dari setengah detik: simulasi, perulangan besar, pengelompokan ratusan ribu baris. Untuk hitungan singkat, biaya mengirim data ke worker justru lebih besar daripada hitungannya.

## 42.2 CSV besar otomatis di latar

Sejak 1.9, `sl.read_csv` untuk berkas di atas 5 MB mengurai teks di Web Worker secara otomatis: memotong baris dan kolom, mengenali penanda kosong, angka, ya/tidak, dan tanggal ISO. Halaman utama hanya menyusun DataFrame dari hasilnya. Hasilnya sama persis dengan cara biasa; ini diuji pada berkas campuran, desimal koma, tanggal, dan 400 ribu baris.

| Ukuran CSV            | Halaman membeku (1.8) | Halaman membeku (1.9) |
|-----------------------|-----------------------|-----------------------|
| 26 MB, 400 ribu baris | sekitar 0,8 detik     | sekitar 0,2 detik     |

Tidak ada yang perlu diubah di kodemu. Opsi `worker: false` mematikannya, dan `worker: true` memakainya juga untuk berkas kecil:

```slak tanpa-jalan
const df = await sl.read_csv("transaksi-2024.csv")            // otomatis di latar bila > 5 MB
const kecil = await sl.read_csv("kecil.csv", { worker: false }) // selalu cara biasa
```

Jalur latar dipakai bersama opsi `sep`, `decimal`, `usecols`, dan `parse_dates`. Bila kamu memakai `skiprows`, `names`, `nrows`, `na_values`, `dtype`, `header: false`, atau `numbers: false`, Slak memakai cara biasa, dengan hasil yang sama.
