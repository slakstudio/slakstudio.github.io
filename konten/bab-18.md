`sl.stats` menyediakan uji statistik yang paling sering dipakai analis, dengan nama yang sama seperti scipy dan statsmodels. Setiap hasil uji bisa ditampilkan langsung dengan `sl.write(...)`: statistik, p-value, ukuran efek, interval kepercayaan, dan **kesimpulan dalam bahasa Indonesia**. Hasil Slak sudah dicocokkan dengan scipy, scikit-learn, dan pandas hingga minimal empat angka penting.

![Hasil uji A/B, uji-t, regresi OLS, dan peramalan seperti tampil di aplikasi](konten/gambar/hasil-uji-a-b-uji-t-regresi-ols-dan-peramalan-se.png)

## 18.1 Membaca hasil uji

- **H₀** (hipotesis nol): tidak ada perbedaan atau hubungan.

- **p-value**: peluang melihat hasil sebesar ini jika H₀ benar. Jika **p \< α** (bawaan 0,05), H₀ ditolak.

- **Ukuran efek** (Cohen's d, η², Cramér's V, r) menjawab "seberapa besar", bukan hanya "apakah ada". Perbedaan kecil bisa signifikan bila datanya sangat banyak.

Semua uji mengembalikan objek dengan `statistic`, `p_value`, `significant`, `conclusion`, `ci`, `effect`, dan `summary()` (tabel ringkasan). Opsi umum: `alpha` dan `alternative` (`"two-sided"`, `"greater"`, `"less"`).

## 18.2 Memilih uji

| Pertanyaan                             | Data normal                                             | Tidak normal / ordinal               |
|----------------------------------------|---------------------------------------------------------|--------------------------------------|
| Rata-rata berbeda dari nilai tertentu? | `ttest_1samp(x, 75)`                                    | `wilcoxon(x)` (selisih dari 0)       |
| Dua kelompok independen berbeda?       | `ttest_ind(df, { value, group })`                       | `mannwhitneyu(df, { value, group })` |
| Sebelum vs sesudah (berpasangan)?      | `ttest_rel(sebelum, sesudah)`                           | `wilcoxon(sebelum, sesudah)`         |
| Tiga kelompok atau lebih?              | `f_oneway(df, { value, group })` lalu `pairwise_ttests` | `kruskal(df, { value, group })`      |
| Dua variabel kategori berhubungan?     | `chi2_contingency(df, "a", "b")`                        | sama                                 |
| Dua variabel angka berhubungan?        | `corr(x, y, "pearson")`                                 | `corr(x, y, "spearman")`             |
| Apakah data normal?                    | `shapiro(x)`, `jarque_bera(x)`                          |                                      |
| Apakah varians sama?                   | `levene(df, { value, group })`                          |                                      |
| Proporsi berbeda?                      | `proportions_ztest([k1, k2], [n1, n2])`                 |                                      |

Uji-t dua kelompok memakai versi **Welch** secara bawaan karena tidak mengasumsikan varians sama; beri `{ equal_var: true }` untuk versi klasik. Data bisa diberikan sebagai dua larik/Series, atau sebagai DataFrame beserta nama kolom nilai dan kolom kelompok.

## 18.3 Uji A/B

```slak
const df = sl.dataset("ab_test")
sl.write(sl.stats.ab_test(df, { group: "grup", metric: "beli", control: "A" }))

// atau dari angka ringkasan
sl.write(sl.stats.ab_test({ A: { n: 5000, conversions: 500 }, B: { n: 5000, conversions: 570 } }))
```

Metrik 0/1 diuji sebagai proporsi (uji-z), metrik lain sebagai rata-rata (uji-t Welch). Hasilnya mencakup tingkat konversi tiap grup, **lift**, interval kepercayaan selisih, p-value, dan peringatan bila daya uji (power) di bawah 80%. Untuk merencanakan eksperimen:

```slak
sl.stats.sample_size_proportion(0.10, 0.10, { relative: true })  // naik 10% dari 10%
// → { per_group: 14751, total: 29502, … }
```

Pelengkap lain: `ci_mean`, `ci_proportion` (Wilson), `bootstrap_ci(x, "median")`, `multipletests(pvalues, "holm")`, dan distribusi `sl.stats.norm`, `t`, `chi2`, `f`, `binom` (`cdf`, `sf`, `ppf`, `pdf`).

## 18.4 Regresi linear berganda

```slak
const model = sl.stats.ols(sl.dataset("karyawan"),
  "gaji_juta ~ pengalaman_tahun + C(pendidikan) + departemen")
sl.write(model)
const p = model.predict([{ pengalaman_tahun: 5, pendidikan: "S1", departemen: "TI" }]).get(0)
```

| Bagian rumus         | Arti                                                                          |
|----------------------|-------------------------------------------------------------------------------|
| `y ~ x1 + x2`        | y dijelaskan oleh x1 dan x2                                                   |
| `C(kolom)`           | Kolom kategori (kolom teks otomatis kategori); kategori pertama menjadi acuan |
| `C(kolom, ref="S1")` | Memilih kategori acuan                                                        |
| `log(x)`, `sqrt(x)`  | Transformasi                                                                  |
| `I(x ** 2)`          | Ekspresi bebas, misalnya kuadrat                                              |
| `x1:x2`, `x1 * x2`   | Interaksi                                                                     |
| `y ~ .`              | Semua kolom lain                                                              |
| `- 1`                | Tanpa intercept                                                               |

`sl.write(model)` menampilkan R², R² terkoreksi, uji F, tabel koefisien (std error, t, p-value, interval kepercayaan), dan bagian **Diagnostik model**: plot residu, Durbin-Watson, normalitas residu, RMSE, dan **VIF** untuk multikolinearitas (VIF \> 10 berarti tinggi). Baris dengan nilai kosong otomatis tidak dipakai, dan jumlahnya disebutkan.

## 18.5 Regresi logistik

```slak
const m = sl.stats.logit(sl.dataset("pelanggan"),
  "churn ~ lama_berlangganan + jumlah_keluhan + pakai_aplikasi + paket")
sl.write(m)
```

Target boleh 0/1, benar/salah, atau dua kategori teks (opsi `positive` memilih kelas "1"). Tabelnya menambahkan **odds ratio**: nilai 1,7 berarti peluang (odds) naik 70% untuk setiap kenaikan satu satuan. Statistik model: pseudo R² McFadden, uji rasio likelihood, AIC, dan BIC. Bila koefisien tidak konvergen karena pemisahan sempurna, Slak memberi peringatan dan menyarankan opsi `{ l2: 1 }`.
