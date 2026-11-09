# Kebijakan versi Slak

Slak 1.9 adalah **versi stabil jangka panjang** sebelum Slak 2.0. Aplikasi yang ditulis untuk Slak 1.9 tetap jalan di semua rilis 1.9.x tanpa diubah.

## Nomor versi

Slak memakai nomor versi tiga bagian, `mayor.minor.tambalan` (versi semantik):

| Bagian | Contoh | Artinya |
|---|---|---|
| Tambalan | 1.9.0 → 1.9.1 | Perbaikan galat saja. Tidak ada fungsi baru, tidak ada perubahan perilaku yang disengaja. |
| Minor | 1.8 → 1.9 | Fungsi baru boleh ditambahkan. Fungsi yang ada tidak dihapus dan tidak berubah arti. |
| Mayor | 1.x → 2.0 | Satu-satunya tempat fungsi boleh dihapus atau diubah artinya, dengan panduan pindah. |

Nomor versi bisa dibaca di kode: `sl.version`, `Slak.version`, dan `Slak.data.version`.

## Apa yang dijamin

- Semua nama di **API-STABIL.md** (938 nama pada 1.9.0: perintah `sl.*`, `Slak.*`, metode DataFrame dan Series, dan seterusnya) tetap ada sampai 2.0. Daftar itu dibuat otomatis dari kode, dan uji `permukaan.js periksa` gagal bila ada nama yang hilang.
- Format berkas yang dibaca Slak (CSV, Excel, JSON, SQLite, `.slak`) dan protokol slak-bridge tetap kompatibel.
- Berkas `.slak` dan halaman HTML hasil ekspor dari versi 1.x mana pun tetap bisa dibuka dengan Slak 1.9.

Yang **tidak** dijamin: nama berawalan garis bawah (`_`), tampilan persis (warna, jarak, ukuran huruf, ikon) yang bisa disempurnakan, isi pesan galat, dan fungsi berlabel eksperimental (pada 1.9.x: `sl.worker`).

## Berkas tambahan dengan nomor versi sendiri

`slak-docs.js` (sejak 1.9.1) punya nomor versinya sendiri, dimulai dari 0.1 (`Slak.docs.version`). Selama masih 0.x, cara pakainya boleh disempurnakan. Berkas ini hanya memakai API stabil dan tidak menambah nama ke `sl`, jadi tidak termasuk dalam API-STABIL.md. Fungsi yang terbukti berguna menjadi kandidat inti Slak 2.0.

## Nama lama

Bila sebuah nama diganti, nama lamanya tetap bekerja dan menulis peringatan **sekali** di konsol browser, misalnya:

```
[Slak] sl.experimental_rerun adalah nama lama; pakai sl.rerun. Nama lama tetap bekerja sampai Slak 2.0.
```

Nama lama Streamlit yang dikenali sejak 1.9: `experimental_rerun`, `experimental_dialog`, `experimental_fragment`, `experimental_get_query_params`, `experimental_set_query_params`, `cache`, `experimental_memo`, `experimental_singleton`, `beta_columns`, `beta_expander`, `beta_container`, `beta_tabs`. Ini memudahkan menyalin contoh Streamlit lama.

## Dukungan

- Seri 1.9 menerima perbaikan galat dan keamanan sampai Slak 2.0 terbit, dan paling sedikit enam bulan sesudahnya.
- Pustaka pihak ketiga yang dimuat dari internet (Plotly, deck.gl, DuckDB, Pyodide, dan lainnya) dikunci pada versi tertentu, sehingga aplikasi tidak berubah sendiri saat pustaka itu merilis versi baru.
- Semua komponen tetap berlisensi bebas untuk dipakai komersial (lihat DAFTAR-LISENSI.md).
