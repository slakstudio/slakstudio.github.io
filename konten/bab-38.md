Tidak semua hasil analisis berbentuk dasbor. Laporan bulanan untuk atasan biasanya berupa tulisan dengan beberapa angka di kalimat, satu tabel, dan satu grafik. **sl.report** menulis laporan seperti itu dari teks Markdown berisi blok SQL. Bab ini juga membahas **mode sel**, cara bekerja bertahap seperti notebook di Slak Studio.

## 38.1 Laporan pertama

```slak
await sl.report(`
# Laporan Penjualan 2024

Sepanjang 2024 toko mencatat **{{ ringkas.transaksi }} transaksi** dengan omzet **{{ ringkas.omzet | rp }}**.
Kota terbesar adalah **{{ kota.kota }}** ({{ kota.porsi | persen }} dari omzet).

~~~sql name=ringkas hide
SELECT COUNT(*) AS transaksi, SUM(total) AS omzet
FROM penjualan WHERE strftime('%Y', tanggal) = '2024'
~~~

## Omzet per kota

~~~sql name=kota chart=bar x=kota y=omzet format=rp horizontal=true
SELECT kota, SUM(total) AS omzet,
       SUM(total) * 1.0 / (SELECT SUM(total) FROM penjualan WHERE strftime('%Y', tanggal) = '2024') AS porsi
FROM penjualan WHERE strftime('%Y', tanggal) = '2024'
GROUP BY kota ORDER BY omzet DESC
~~~
`, { tables: { penjualan: sl.dataset("penjualan") } })
```

![Laporan penjualan 2024: paragraf dengan angka terisi otomatis, grafik omzet per kota, dan tren bulanan](konten/gambar/laporan-penjualan-2024-paragraf-dengan-angka-ter.png)

Slak menjalankan semua blok SQL lebih dulu, lalu menampilkan laporan berurutan. Karena itu, kalimat di atas boleh memakai hasil blok yang baru ditulis di bawahnya. Blok boleh dipagari tiga tanda petik terbalik atau `~~~`; di dalam teks JavaScript, `~~~` lebih praktis karena tidak perlu ditulis dengan garis miring terbalik.

## 38.2 Opsi blok dan isian teks

| Opsi di baris pembuka                                                 | Gunanya                                                            |
|-----------------------------------------------------------------------|--------------------------------------------------------------------|
| `name=ringkas`                                                        | nama hasil, untuk dipakai di teks (bawaan `hasil1`, `hasil2`, ...) |
| `hide`                                                                | jalankan tanpa menampilkan                                         |
| `chart=bar` (`line`, `area`, `scatter`, `pie`) dengan `x=...` `y=...` | tampilkan sebagai grafik                                           |
| `show=table` / `chart` / `both`                                       | tabel, grafik, atau keduanya                                       |
| `format=rp`, `horizontal=true`, `height=240`                          | format angka grafik, batang mendatar, tinggi                       |
| `title="Judul"`                                                       | judul kecil di atas hasil                                          |
| `code`                                                                | tampilkan SQL-nya dalam bagian yang bisa dibuka                    |

Isian `{{ nama.kolom }}` diganti nilai baris pertama hasil itu. Baris lain: `{{ kota.omzet.2 }}` (baris ketiga). Jumlah baris: `{{ kota.length }}`. Format ditulis setelah garis tegak:

| Format         | Contoh hasil                                      |
|----------------|---------------------------------------------------|
| `rp`           | Rp210.297.000                                     |
| `persen`       | 34,6% (nilai 0,346)                               |
| `0` sampai `9` | jumlah angka desimal, misalnya `{{ x.rata | 1 }}` |
| `tanggal`      | 17 Agustus 2026                                   |

Sumber tabel bisa berupa `tables` (DataFrame, butuh `slak-sql.js`), atau `db`: database `sl.sqlite`, koneksi `sl.connection` ke slak-bridge, atau `sl.duckdb`. `params: { tahun: "2024" }` mengisi `:tahun` di SQL, sehingga satu laporan bisa dipakai untuk tahun yang dipilih pengguna. Laporan juga bisa disimpan sebagai berkas: `await sl.report("laporan.md", { ... })`. Blok yang galat menampilkan pesan beserta nomor barisnya, dan laporan tetap dilanjutkan.

## 38.3 Mode sel di Slak Studio

Analisis biasanya dikerjakan bertahap: muat data, bersihkan, ringkas, gambar grafik. Di Slak Studio, baris `// %%` membagi kode menjadi **sel**:

```slak
sl.title("Analisis Pelanggan")
// %% 1. Muat data
const df = sl.dataset("pelanggan")
// %% 2. Ringkas
const per = df.groupby("paket").agg({ churn: ["churn", "mean"] })
sl.dataframe(per)
// %% 3. Grafik
sl.bar_chart(per, { x: "paket", y: "churn" })
```

![Editor Slak Studio dengan pemisah sel bertombol Sel 2, Sel 3, Sel 4, dan pratinjau hasil sampai sel terakhir](konten/gambar/editor-slak-studio-dengan-pemisah-sel-bertombol.png)

- **Shift+Enter** menjalankan kode dari awal sampai akhir sel tempat kursor berada, lalu kursor pindah ke sel berikutnya. Status bar menulis, misalnya, "sampai sel 2 dari 4".

- Tombol **▶ Sel n** di baris pemisah melakukan hal yang sama untuk sel itu.

- **Ctrl+Enter** tetap menjalankan semuanya, dan mode Otomatis tetap menjalankan seluruh kode saat kamu mengetik.

Saat kode dijalankan ulang, sel yang tidak berubah dan berada di atas sel yang diubah **tidak dijalankan lagi**: variabel dan tampilannya diambil dari simpanan. Sel yang diubah dan semua sel di bawahnya dijalankan ulang. Jadi data besar di sel pertama cukup dimuat sekali, lalu sel grafik di bawahnya bisa diubah berkali-kali dengan cepat. Status bar menulis berapa sel yang dipakai ulang.

- Sel yang memakai widget, formulir, `session_state`, `Math.random`, atau waktu sekarang selalu dijalankan ulang, karena hasilnya bisa berbeda walau kodenya sama.

- Tombol **Muat ulang** di pratinjau mengosongkan simpanan, sehingga semua sel dijalankan dari awal.

- Hasil sel 3 tetap selalu sesuai dengan kode sel 1 dan 2 yang sekarang: begitu sel di atas berubah, semua sel di bawahnya ikut dijalankan ulang. Tidak ada "sel yang lupa dijalankan" seperti di notebook.

Di luar Slak Studio, `// %%` hanya komentar biasa, jadi berkasnya tetap jalan di mana saja. Contoh di galeri: **Laporan SQL (Markdown)** dan **Analisis Bertahap (mode sel)**.
