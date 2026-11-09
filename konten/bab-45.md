Panduan, katalog produk, atau materi kelas sering lebih enak dibaca sebagai situs: ada menu bab, contoh yang bisa langsung dicoba, daftar isi, dan kotak pencarian. Sejak Slak 1.9.1, semua itu bisa dibuat dengan Slak sendiri lewat berkas tambahan `slak-docs.js`. Situs resmi slak.studio dibangun dengan cara yang sama.

`slak-docs.js` punya nomor versinya sendiri (0.1) dan berlabel eksperimental. Semua fungsinya ada di `Slak.docs` dan menerima `sl` sebagai argumen pertama, jadi berkas ini tidak menambah nama apa pun ke `sl` dan janji API stabil Bab 44 tetap terjaga. Di Slak Studio berkas ini tersedia otomatis.

## 45.1 Situs pertama

Tulis isi setiap bab dalam Markdown di blok `<script type="text/markdown">`, lalu daftarkan bab-babnya dengan `Slak.docs.site`:

```` html
<script src="slak.js"></script>
<script src="slak-docs.js"></script>

<script type="text/markdown" id="bab-1">
## Selamat datang

Panduan ini menjelaskan cara memakai kasir toko.
</script>

<script type="text/markdown" id="bab-2">
## Menghitung diskon

```slak
const harga = sl.number_input("Harga", { value: 150000 })
sl.metric("Setelah diskon 20%", harga * 0.8)
```
</script>

<script type="text/slak">
await Slak.docs.site(sl, {
  judul: "Panduan Kasir",
  bab: {
    "Mulai": [
      { judul: "Pengantar", elemen: "bab-1" },
      { judul: "Diskon", elemen: "bab-2" }
    ]
  }
})
</script>
````

Hasilnya satu halaman dengan menu "Mulai" di sidebar, alamat per bab (`#/pengantar`, `#/diskon`), tombol Sebelumnya dan Berikutnya, daftar isi "Di halaman ini", dan tombol **Cari (Ctrl+K)**. Halaman ini jalan saat dibuka dengan klik dua kali, di Slak Studio, dan di hosting.

Setiap bab berisi `judul` dan salah satu sumber isi:

| Isian                     | Isi bab                                                    | Klik dua kali              |
|---------------------------|------------------------------------------------------------|----------------------------|
| `elemen: "bab-1"`         | Blok `<script type="text/markdown" id="bab-1">` di halaman | Ya                         |
| `isi: "## Judul ..."`     | Teks Markdown langsung                                     | Ya                         |
| `berkas: "bab/diskon.md"` | Berkas Markdown terpisah                                   | Tidak, hanya lewat hosting |
| `fungsi: (sl) => { ... }` | Kode Slak biasa                                            | Ya                         |

Isian lain: `url` (alamat bab), `ikon`, dan `deskripsi`. Di dalam blok Markdown, tulis `<\/script>` bila isi bab memuat tag penutup script.

## 45.2 Contoh yang bisa dijalankan

Blok kode berbahasa `slak` dijalankan: kodenya tampil, lalu hasilnya tampil di kotak di bawahnya, beserta tautan **Buka di Playground**. Pembaca bisa langsung menggeser penggeser di dalam bab. Blok bahasa lain (`js`, `html`, `sql`) hanya ditampilkan. Untuk menampilkan kode Slak tanpa menjalankannya, tulis `slak tanpa-jalan` di baris pembuka blok.

Contoh berbagi halaman dengan babnya. Contoh yang memakai `sl.navigation`, `sl.set_page_config`, atau `sl.stop` akan mengganggu halaman, jadi tandai `tanpa-jalan` dan biarkan pembaca mencobanya lewat Playground.

## 45.3 Fungsi satu per satu

| Fungsi                                                 | Kegunaan                                                                        |
|--------------------------------------------------------|---------------------------------------------------------------------------------|
| `Slak.docs.site(sl, { judul, bab, kaki, playground })` | Seluruh situs sekaligus                                                         |
| `Slak.docs.markdown(sl, teks)`                         | Menampilkan satu bab di aplikasi Slak biasa                                     |
| `Slak.docs.toc(sl)`                                    | Daftar isi dari judul `##` dan `###`, dengan bagian yang sedang dibaca ditandai |
| `Slak.docs.search(sl, halaman)`                        | Tombol Cari dan dialog pencarian                                                |
| `Slak.docs.meta({ deskripsi, gambar, kanonik })`       | Deskripsi, gambar pratinjau, dan alamat kanonik di `<head>`                     |

## 45.4 Menerbitkan dan pratinjau tautan

Folder situs diterbitkan seperti aplikasi lain (Bab 40). WhatsApp, X, dan LinkedIn tidak menjalankan JavaScript saat membuat pratinjau tautan, jadi judul dan deskripsi per bab tidak terbaca dari `Slak.docs.meta`. Untuk itu salin `docs/TEMPLAT-BAB.html` dari paket Slak menjadi `docs/<alamat-bab>.html`, isi judul dan deskripsinya, lalu bagikan alamat berkas itu. Pengunjung langsung diarahkan ke bab yang sama.

Kerangka situs dokumentasi slak.studio ada di folder `docs/` paket Slak, berisi Bab 1 sampai 3 buku ini sebagai contoh.

## 45.5 Situs resmi Slak

Alamat resmi Slak adalah **https://slak.studio**, dengan salinan resmi **https://slakstudio.github.io** yang isinya sama. Playground resminya `https://slak.studio/playground/`, dan alamat itu dipakai `Slak.share.official` serta **Berkas › Salin tautan berbagi** di Slak Studio. Setiap halaman situs memuat alamat kanonik ke slak.studio, sehingga mesin pencari menganggap slak.studio sebagai yang utama. Langkah menerbitkan ada di `TERBIT-SITUS.md` paket Slak.
