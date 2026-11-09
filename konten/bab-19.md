Tiga namespace melengkapi Slak Data: `sl.ml` untuk model prediksi, `sl.ts` untuk deret waktu, dan `sl.analysis` untuk analisis bisnis siap pakai. Nama dan alurnya mengikuti scikit-learn agar mudah berpindah ke Python nanti.

## 19.1 Alur kerja machine learning

```slak
const df = sl.dataset("pelanggan").drop("pelanggan_id")
const [latih, uji] = sl.ml.train_test_split(df, { test_size: 0.25, stratify: "churn" })

const model = sl.ml.RandomForestClassifier({ n_estimators: 100, max_depth: 8 })
model.fit(latih, "churn")                      // kolom "churn" = target, sisanya fitur
const pred = model.predict(uji.drop("churn"))

sl.metric("Akurasi", sl.ml.accuracy_score(uji.churn, pred))
sl.dataframe(sl.ml.classification_report(uji.churn, pred))
sl.heatmap(sl.ml.confusion_matrix(uji.churn, pred))
sl.bar_chart(model.importances(), { x: "fitur", y: "kepentingan", horizontal: true })
```

Kolom teks otomatis diubah menjadi kolom 0/1 (one-hot), dan kolom benar/salah menjadi 1/0. Nilai kosong harus diisi atau dibuang dulu; Slak memberi tahu kolom dan barisnya. Model bisa dibuat dengan atau tanpa `new`.

![Pelajaran Machine learning di Slak Studio: kode, materi, dan hasil evaluasi model](konten/gambar/pelajaran-machine-learning-di-slak-studio-kode-m.png)

| Kebutuhan                        | Model / alat                                                                                                                               |
|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| Klasifikasi (ya/tidak, kategori) | `LogisticRegression`, `DecisionTreeClassifier`, `RandomForestClassifier`, `KNeighborsClassifier`, `GaussianNB`                             |
| Regresi (angka)                  | `LinearRegression`, `Ridge`, `DecisionTreeRegressor`, `RandomForestRegressor`, `KNeighborsRegressor`                                       |
| Klaster                          | `KMeans`, `sl.ml.elbow(X, { k_max: 8 })`, `silhouette_score`                                                                               |
| Reduksi dimensi                  | `PCA({ n_components: 2 })`                                                                                                                 |
| Praproses                        | `StandardScaler`, `MinMaxScaler`, `RobustScaler`, `SimpleImputer`, `LabelEncoder`, `get_dummies`                                           |
| Evaluasi klasifikasi             | `accuracy_score`, `precision_score`, `recall_score`, `f1_score`, `classification_report`, `confusion_matrix`, `roc_curve`, `roc_auc_score` |
| Evaluasi regresi                 | `r2_score`, `mean_absolute_error`, `rmse`, `mape`                                                                                          |
| Validasi                         | `train_test_split`, `cross_validate(model, df, "target", { cv: 5 })`                                                                       |

`DecisionTreeClassifier` punya `.rules()` yang menampilkan aturan pohon sebagai teks "jika … maka …", cocok untuk menjelaskan model ke orang bisnis. Prediksi pohon keputusan dan KNN Slak sudah dicocokkan identik dengan scikit-learn.

Model dilatih ulang setiap kali skrip berjalan. Agar aplikasi tetap cepat, bungkus pelatihan dengan `sl.cache_data`:

```slak tanpa-jalan
const latihModel = sl.cache_data((jenis) => buatModel(jenis).fit(latih, "churn"))
const model = latihModel(pilihan)
```

## 19.2 Peramalan deret waktu

```slak
const df = sl.dataset("penjualan_bulanan")
const d = sl.ts.decompose(df, { period: 12 })          // tren + musiman + residu
sl.line_chart(d, { x: "bulan", y: ["nilai", "tren"] })
sl.write(sl.ts.forecast(df, { periods: 12 }))           // grafik, metrik, tabel ramalan
```

`forecast` dengan `method: "auto"` mencoba pemulusan eksponensial sederhana, Holt (tren), dan Holt-Winters (tren + musiman, aditif dan multiplikatif), lalu memilih yang AIC-nya terkecil. Metode lain: `"linear"`, `"naive"`, `"seasonal_naive"`, dan `"ma"`. Kolom tanggal dan frekuensinya dikenali otomatis. Hasilnya mencakup batas bawah dan atas (perkiraan interval 95%) serta MAE, RMSE, dan MAPE. `sl.ts.acf(series)` menampilkan autokorelasi untuk melihat pola berulang.

## 19.3 Analisis bisnis siap pakai

| Analisis       | Perintah                                                                | Hasil                                                                     |
|----------------|-------------------------------------------------------------------------|---------------------------------------------------------------------------|
| Kohort retensi | `sl.analysis.cohort(df, { customer, date, period: "M" })`               | Baris = bulan kohort, kolom `bulan_0`, `bulan_1`, … berisi persen retensi |
| RFM            | `sl.analysis.rfm(df, { customer, date, amount })`                       | Recency, Frequency, Monetary, skor 1–5, dan segmen                        |
| Funnel         | `sl.analysis.funnel({ Kunjungan: 10000, Keranjang: 1200, Bayar: 300 })` | Konversi dari awal dan dari tahap sebelumnya                              |
| Pareto/ABC     | `sl.analysis.pareto(df, { category, value })`                           | Persen, persen kumulatif, kelas A/B/C                                     |
| Pertumbuhan    | `sl.analysis.growth(df, { date, value })`                               | MoM, YoY, kumulatif                                                       |

Segmen RFM memakai nama Indonesia: **Juara**, **Pelanggan Setia**, **Calon Setia**, **Pelanggan Baru**, **Menjanjikan**, **Perlu Perhatian**, **Hampir Tertidur**, **Berisiko**, **Jangan Sampai Hilang**, dan **Tertidur**. Tampilkan kohort dengan `sl.heatmap(ko.drop("ukuran"), { format: "percent:0" })` dan Pareto dengan `sl.combo_chart(par, { x, bar: "total", line: "persen_kumulatif" })`.

Funnel juga bisa dihitung dari data peristiwa: `sl.analysis.funnel(df, { step: "tahap", user: "user_id", order: ["lihat", "keranjang", "bayar"] })` menghitung pengguna unik yang mencapai setiap tahap secara berurutan.
