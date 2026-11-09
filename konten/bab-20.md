Slak Data mencakup kebutuhan Data Analyst pemula hingga menengah. Untuk tingkat mahir, misalnya statsmodels, scikit-learn lengkap, atau kode Python dari kursus, `sl.python()` menjalankan **Python asli** di browser lewat Pyodide (Python 3.13, pandas, numpy, scikit-learn, matplotlib, dan ratusan paket lain).

```slak tanpa-jalan
const df = sl.dataset("penjualan")
const r = await sl.spinner("Memuat Python…", () => sl.python(`
import pandas as pd
import matplotlib.pyplot as plt
bulanan = df.set_index("tanggal").resample("MS")["total"].sum()
bulanan.plot(title="Omzet bulanan")
df.groupby(["kota", "kanal"]).total.sum().unstack()
`, { data: { df } }))
sl.write(r)
```

Sejak 1.3.1, tabel bisa dikirim langsung dengan nama yang dipakai di Python, tanpa pembungkus `data:`: `sl.python(kode, { df })` atau `sl.python(kode, { df: penjualan })`. Untuk grafik matplotlib ada jalan pintas `await sl.pyplot("plt.hist(df.total, bins=20)", { df })`, yang langsung menampilkan gambarnya.

> **Dua dunia, satu aturan.** Di dalam tanda kutip terbalik berlaku aturan Python: `pd.` untuk pandas, `df.` untuk tabel pandas. Di luarnya berlaku aturan Slak: `sl.` untuk Slak, `df.` untuk tabel Slak Data. Kebiasaan umum di Python adalah `import pandas as pd`, bukan `as df`, karena nama `df` dipakai untuk tabel. Slak Studio memberi petunjuk bila kamu menulis `import pandas as df`, dan mewarnai kode Python di dalam `sl.python(...)` agar mudah dibedakan.

| Nama | Artinya                          | Padanan di Slak |
|------|----------------------------------|-----------------|
| `pd` | pustaka pandas                   | `sl`            |
| `df` | sebuah tabel (variabel buatanmu) | `df`            |

![Hasil sl.python: grafik matplotlib dan tabel pandas tampil di aplikasi Slak](konten/gambar/hasil-sl-python-grafik-matplotlib-dan-tabel-pand.png)

## 20.1 Cara kerja

- `data: { df }` mengirim DataFrame Slak ke Python sebagai **pandas DataFrame** bernama `df`. Kolom tanggal tetap bertipe tanggal. Larik dan angka dikirim apa adanya.

- Nilai **baris terakhir** dikembalikan ke Slak: DataFrame atau Series pandas menjadi DataFrame Slak, larik numpy menjadi larik, nilai lain menjadi JSON.

- Hasil `print()` dan setiap grafik **matplotlib** ikut ditampilkan oleh `sl.write(r)`. Isinya juga tersedia sebagai `r.stdout`, `r.images`, dan `r.value`.

- Paket di-`import` dimuat otomatis. Paket tambahan: `{ packages: ["scipy"] }`.

- Variabel Python bertahan antar-jalan ulang. Opsi `{ globals: ["model"] }` mengambil variabel Python kembali ke JavaScript.

## 20.2 Pengecualian Write and Run

`sl.python()` adalah satu-satunya bagian Slak 1.2 yang tidak sepenuhnya mengikuti filosofi *Write and Run*, dan sifatnya opsional:

| Batasan                | Penjelasan                                                                                          |
|------------------------|-----------------------------------------------------------------------------------------------------|
| Butuh internet         | Python dimuat dari CDN saat pertama dipakai, sekitar 10–30 MB                                       |
| Tidak di halaman lokal | Halaman yang dibuka dengan klik dua kali tidak bisa memuat Python; gunakan Slak Studio atau hosting |
| Pemuatan awal lambat   | Sekitar 10–20 detik pertama kali, lalu cepat selama halaman terbuka                                 |

Bungkus panggilan dengan `try { … } catch (e) { sl.warning(e.message) }` agar aplikasi tetap rapi saat offline. Untuk memakai salinan Pyodide sendiri, isi `Slak.pyodide_url` dengan alamat foldernya.

## 20.3 Kapan memakai Python

- Pakai **Slak Data** untuk dasbor dan portofolio: cepat, ringan, dan jalan tanpa internet.

- Pakai **Python** saat butuh metode yang belum ada di Slak, misalnya ARIMA, regresi bertingkat, NLP, atau model scikit-learn yang lebih lengkap.

- Keduanya bisa digabung: bersihkan data dan tampilkan dengan Slak, lalu kirim ke Python hanya untuk pemodelan.
