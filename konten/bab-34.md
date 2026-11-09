Dunia data analyst sebagian besar berbicara Python: pandas, Jupyter, scikit-learn, Streamlit. Slak tidak dibuat untuk menggantikannya. Slak dibuat supaya langkah pertama terasa ringan: tanpa instalasi, tanpa server, hasilnya langsung bisa dilihat dan dibagikan. Bab ini menunjukkan bahwa yang kamu pelajari di Slak terbawa utuh saat pindah ke Python, dan kapan saatnya pindah.

## 34.1 Yang kamu pelajari di Slak, terbawa ke Python

Nama fungsi Slak Data sengaja dibuat sama dengan pandas, scipy, dan scikit-learn, dan hasil hitungannya sudah diuji sama (Bab 32). Berikut analisis yang sama dalam dua bahasa:

| Slak (JavaScript)                                         | pandas (Python)                                              |
|-----------------------------------------------------------|--------------------------------------------------------------|
| `const df = sl.dataset("penjualan")`                      | `df = pd.read_csv("penjualan.csv", parse_dates=["tanggal"])` |
| `const online = df.query("kanal == 'Online'")`            | `online = df.query("kanal == 'Online'")`                     |
| `online.groupby("kota").agg({ omzet: ["total", "sum"] })` | `online.groupby("kota").agg(omzet=("total", "sum"))`         |
| `.sort_values("omzet", { ascending: false })`             | `.sort_values("omzet", ascending=False)`                     |
| `online.resample("tanggal", "M").agg({ total: "sum" })`   | `online.resample("MS", on="tanggal").agg({"total": "sum"})`  |
| `sl.stats.pearsonr(df.col("jumlah"), df.col("total"))`    | `scipy.stats.pearsonr(df.jumlah, df.total)`                  |
| `sl.ml.LinearRegression().fit(X, y)`                      | `LinearRegression().fit(X, y)`                               |

Keduanya menghasilkan angka yang persis sama: Jayapura 67.971.000 dari 311 transaksi online, korelasi jumlah dan total 0,703. Lima perbedaan yang perlu diingat saat menerjemahkan:

1.  **Opsi bernama** Python (`ascending=False`) ditulis sebagai objek di Slak (`{ ascending: false }`).

2.  **Benar/salah dan kosong**: `True`/`False`/`None` menjadi `true`/`false`/`null`.

3.  **Fungsi kecil**: `lambda r: r.harga * 2` menjadi `r => r.harga * 2`.

4.  **Menunggu**: pembacaan berkas dan database di Slak memakai `await`; di pandas tidak perlu.

5.  **Label periode**: `resample` Slak memberi label awal periode, setara `"MS"` di pandas, bukan `"M"` (akhir bulan).

Daftar padanan lengkap ada di Lampiran E.

## 34.2 Empat anak tangga

1.  **Slak di browser.** Belajar konsep: DataFrame, filter, groupby, grafik, uji statistik. Hasilnya langsung jadi portofolio yang bisa dibuka siapa saja (Bab 21).

2.  **Python di dalam Slak.** `sl.python()` menjalankan Python asli (Pyodide) di halaman yang sama, dengan pandas dan matplotlib (Bab 20). Coba tulis ulang satu analisis Slak-mu dengan pandas, lalu bandingkan hasilnya di halaman yang sama.

3.  **Jupyter atau Google Colab.** Saat analisis tumbuh menjadi eksplorasi panjang, pindah ke notebook. Kode pandas dari langkah 2 bisa disalin apa adanya.

4.  **Streamlit.** Untuk aplikasi Python, `sl.` menjadi `st.`: `sl.title`, `sl.metric`, `sl.selectbox`, `sl.dataframe`, dan `sl.session_state` punya padanan yang sama (Lampiran B).

## 34.3 Satu analisis, dua bahasa, satu halaman

Cara terbaik belajar pandas adalah menerjemahkan analisis yang sudah kamu pahami. `sl.python` menerima DataFrame Slak dan menampilkan hasil pandas di halaman yang sama, jadi kamu bisa memeriksa sendiri bahwa angkanya cocok:

```slak tanpa-jalan
const df = sl.dataset("penjualan")
const slak = df.query("kanal == 'Online'").groupby("kota").agg({ omzet: ["total", "sum"] }).sort_values("omzet", { ascending: false })

const py = await sl.python(`
hasil = (df.query("kanal == 'Online'")
           .groupby("kota").agg(omzet=("total", "sum"))
           .sort_values("omzet", ascending=False).reset_index())
hasil`, { df })

const [a, b] = sl.columns(2)
a.subheader("Slak"); a.dataframe(slak)
b.subheader("pandas"); b.write(py)
```

![Hasil Slak dan pandas berdampingan: angkanya sama](konten/gambar/hasil-slak-dan-pandas-berdampingan-angkanya-sama.png)

Python butuh internet saat pertama kali dipakai (sekitar 10–30 MB), lalu tersimpan di browser.

## 34.4 Kapan pindah ke Python

Tetap di Slak bila tujuanmu dasbor portofolio, aplikasi kecil yang dibuka di browser, atau belajar analisis dasar sampai menengah. Pertimbangkan pindah ke Python bila:

- data rutin di atas satu juta baris dan DuckDB (Bab 31) pun tidak cukup;

- kamu butuh model di luar daftar Slak (misalnya gradient boosting, deep learning, NLP);

- tim atau tempat kerjamu memakai Jupyter, Airflow, atau dbt;

- analisis harus berjalan terjadwal di server, bukan di browser pengunjung;

- kamu butuh pustaka khusus, misalnya geopandas, statsmodels tingkat lanjut, atau Prophet.

Semua itu bukan tanda bahwa waktumu di Slak terbuang: konsep, nama fungsi, dan kebiasaan memeriksa data sudah sama. Yang berganti hanya tanda baca.
