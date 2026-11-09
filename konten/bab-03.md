Di bab ini kamu membuat kalkulator diskon dalam lima langkah, lalu mempelajari dua cara menjalankan aplikasi Slak di luar Slak Studio.

## 3.1 Lima langkah di Slak Studio

1.  Buka Slak Studio, lalu tekan **Ctrl+N** untuk membuat berkas baru. Editor berisi `sl.title("Aplikasi baru")` dan pratinjau di kanan langsung menampilkan judul itu.

2.  Ganti judulnya dan tambahkan dua widget input:

```slak
sl.title("Kalkulator Diskon")

const harga = sl.number_input("Harga barang (Rp)", { min: 0, value: 150000, step: 5000 })
const diskon = sl.slider("Diskon (%)", 0, 90, 20)
```

3.  Hitung hasilnya dan tampilkan dengan `sl.metric`:

```slak tanpa-jalan
const bayar = harga * (1 - diskon / 100)
sl.metric("Harus dibayar", "Rp " + bayar.toLocaleString("id-ID"))
```

4.  Geser slider di pratinjau. Angka "Harus dibayar" berubah seketika, tanpa kamu menulis event listener apa pun.

5.  Tekan **Ctrl+S**, beri nama `diskon.slak`, lalu simpan. Untuk membagikannya, tekan **Ctrl+E** agar aplikasimu menjadi satu berkas `diskon.html`.

## 3.2 Cara pertama: tag `<script type="text/slak">`

Cara ini paling ringkas. Variabel `sl` sudah tersedia, dan `await` boleh dipakai langsung di tingkat atas.

```html
<script src="slak.js"></script>
<script type="text/slak" data-layout="wide" data-theme="auto">
  sl.title("Halo!")
</script>
```

Atribut yang bisa ditambahkan pada tag:

| Atribut         | Nilai                         | Fungsi                                                       |
|-----------------|-------------------------------|--------------------------------------------------------------|
| `data-target`   | Selektor CSS, misalnya `#app` | Elemen tempat aplikasi digambar; bawaannya tepat setelah tag |
| `data-theme`    | `auto`, `light`, `dark`       | Tema awal; `auto` mengikuti sistem                           |
| `data-layout`   | `wide`                        | Lebar konten sampai 1280 px                                  |
| `data-title`    | Teks                          | Judul tab browser                                            |
| `data-embedded` | (tanpa nilai)                 | Tinggi mengikuti wadah, bukan seluruh layar                  |

## 3.3 Cara kedua: `Slak.run()` dari JavaScript

Cara ini cocok jika aplikasimu bagian dari halaman yang lebih besar, atau jika kamu ingin membongkarnya kembali.

```slak
const app = Slak.run(async (sl) => {
  sl.title("Aplikasiku")
}, { target: "#app", layout: "wide" })

// nanti, jika perlu:
app.destroy()
```

Opsi `Slak.run(skrip, opsi)`:

| Opsi            | Keterangan                                                                     |
|-----------------|--------------------------------------------------------------------------------|
| `target`        | Elemen atau selektor CSS tempat aplikasi digambar                              |
| `theme`         | `"auto"`, `"light"`, atau `"dark"`                                             |
| `layout`        | `"wide"` untuk tata letak lebar                                                |
| `title`         | Judul tab browser                                                              |
| `embedded`      | `true` agar tinggi mengikuti wadah                                             |
| `hotkeys`       | `false` untuk mematikan tombol R (jalankan ulang)                              |
| `session_state` | Objek awal untuk `sl.session_state`                                            |
| `on_run`        | Fungsi yang dipanggil setiap kali skrip selesai: menerima `{ ms, error, run }` |

Argumen pertama juga boleh berupa teks kode, misalnya `Slak.run("sl.title('Hai')")`.

## 3.4 Bilah atas aplikasi

Setiap aplikasi Slak memiliki bilah tipis di atas dengan tiga kontrol: tombol ☰ untuk membuka sidebar (muncul jika aplikasi memakai sidebar), tombol ↻ untuk menjalankan ulang (pintasan: **R**), dan tombol ◐ untuk berganti tema Otomatis → Terang → Gelap. Tema terakhir yang dipilih diingat oleh browser.
