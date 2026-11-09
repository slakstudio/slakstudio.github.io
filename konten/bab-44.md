Slak 1.9 adalah **versi stabil jangka panjang**. Aplikasi yang kamu tulis sekarang tetap jalan di semua rilis 1.9.x tanpa diubah, dan nama-nama yang kamu pakai tetap ada sampai Slak 2.0.

## 44.1 Apa yang dijamin

Berkas **API-STABIL.md** di paket Slak berisi 938 nama: semua perintah `sl.*`, `Slak.*`, isi `sl.stats`, `sl.ml`, `sl.geo`, dan seterusnya. Daftar itu dibuat otomatis dari kode, dan setiap rilis diuji supaya tidak ada nama yang hilang. Aturannya ada di **KEBIJAKAN-VERSI.md**:

| Perubahan versi | Contoh        | Artinya                                                                     |
|-----------------|---------------|-----------------------------------------------------------------------------|
| Tambalan        | 1.9.0 → 1.9.1 | Perbaikan galat saja                                                        |
| Minor           | 1.8 → 1.9     | Fungsi baru boleh ditambah; fungsi lama tidak dihapus atau diubah artinya   |
| Mayor           | 1.x → 2.0     | Satu-satunya tempat perubahan yang merusak kode lama, dengan panduan pindah |

Yang tidak dijamin: nama berawalan garis bawah (`_`), tampilan persis (warna dan jarak bisa disempurnakan), isi pesan galat, dan fungsi berlabel eksperimental (`sl.worker`). Nomor versi bisa dibaca dengan `sl.version`.

## 44.2 Pindah dari versi 1.x yang lebih lama

Ganti berkas `slak*.js` di folder proyekmu dengan berkas dari paket 1.9. Tidak ada kode yang perlu diubah: semua fungsi dari 1.0 sampai 1.8 tetap ada. Berkas `.slak` dan halaman hasil ekspor dari versi lama juga tetap bisa dibuka di Slak Studio 1.9. Ringkasan isi setiap versi ada di **RIWAYAT.md**.

## 44.3 Menyalin contoh Streamlit lama

Banyak contoh Streamlit di internet memakai nama lama. Slak 1.9 mengenalinya, menjalankan nama barunya, dan menulis peringatan sekali di konsol:

| Nama lama                                                        | Nama baru                                  |
|------------------------------------------------------------------|--------------------------------------------|
| `experimental_rerun`                                             | `rerun`                                    |
| `experimental_dialog`, `experimental_fragment`                   | `dialog`, `fragment`                       |
| `experimental_get_query_params`, `experimental_set_query_params` | `query_params`                             |
| `cache`, `experimental_memo`                                     | `cache_data`                               |
| `experimental_singleton`                                         | `cache_resource`                           |
| `beta_columns`, `beta_expander`, `beta_container`, `beta_tabs`   | `columns`, `expander`, `container`, `tabs` |

```slak
const [kiri, kanan] = sl.beta_columns(2)   // jalan, dengan peringatan: pakai sl.columns
```

Daftar lengkap pasangan nama ada di `Slak.old_names`. Sebaiknya ganti ke nama baru saat sempat, karena nama lama hanya dijamin sampai Slak 2.0.
