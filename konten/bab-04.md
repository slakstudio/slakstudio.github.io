Delapan konsep di bab ini menjelaskan hampir semua perilaku Slak; pahami yang pertama, dan sisanya akan terasa wajar.

## 4.1 Jalan ulang (rerun)

Setiap interaksi menjalankan ulang seluruh skrip dari baris pertama. Akibatnya, variabel biasa selalu kembali ke nilai awalnya:

```slak
let klik = 0
if (sl.button("Tambah")) klik++
sl.write(klik)   // selalu 0 atau 1, tidak pernah bertambah terus
```

Untuk nilai yang harus bertahan, gunakan `sl.session_state` (4.3). Slak tidak menggambar ulang seluruh halaman; ia mencocokkan elemen lama dengan yang baru dan hanya mengubah yang berbeda.

## 4.2 Widget mengembalikan nilai

Widget adalah fungsi biasa yang mengembalikan nilai saat ini:

| Widget                                                                | Nilai kembali                                                        |
|-----------------------------------------------------------------------|----------------------------------------------------------------------|
| `button`, `form_submit_button`                                        | `true` hanya pada satu jalan ulang setelah diklik, lalu `false` lagi |
| `checkbox`, `toggle`                                                  | `true` atau `false`                                                  |
| `slider`, `number_input`                                              | Angka, atau larik `[a, b]` untuk slider rentang                      |
| `text_input`, `text_area`, `date_input`, `time_input`, `color_picker` | Teks                                                                 |
| `selectbox`, `radio`, `select_slider`                                 | Opsi yang dipilih                                                    |
| `multiselect`                                                         | Larik opsi yang dipilih                                              |
| `file_uploader`                                                       | Objek berkas, larik berkas, atau `null`                              |
| `chat_input`                                                          | Teks yang baru dikirim, atau `null`                                  |

Argumen widget bisa ditulis berurutan ala Streamlit atau sebagai objek. Kedua baris berikut sama:

```slak
sl.slider("Volume", 0, 100, 50, 5)
sl.slider("Volume", { min: 0, max: 100, value: 50, step: 5 })
```

## 4.3 Mengingat nilai dengan `session_state`

`sl.session_state` adalah objek yang isinya bertahan antar-jalan ulang selama halaman terbuka. Isi nilai awal hanya jika belum ada:

```slak
const ss = sl.session_state
if (!("skor" in ss)) ss.skor = 0
if (sl.button("+1")) ss.skor++
sl.metric("Skor", ss.skor)
```

Isinya hilang jika halaman dimuat ulang; untuk data yang harus bertahan, gunakan sl.local_state atau sl.db (Bab 13). Di Slak Studio, isinya bertahan saat kamu mengedit kode, dan direset dengan **Ctrl+Shift+Enter**.

## 4.4 Identitas widget dan `key`

Slak mengenali widget dari jenis dan labelnya. Jika label berubah, widget dianggap baru dan nilainya kembali ke awal. Beri `key` agar identitasnya tetap, dan agar nilainya tersimpan otomatis di `session_state`:

```slak
sl.text_input("Nama", { key: "nama" })
sl.write("Halo " + sl.session_state.nama)
```

Setiap `key` harus unik dalam satu jalan. Memakai `key` yang sama dua kali menghasilkan galat "Key widget dipakai lebih dari sekali".

## 4.5 Callback: `on_click` dan `on_change`

Callback dipanggil **sebelum** skrip dijalankan ulang, sehingga perubahannya langsung terlihat. Gunakan `args` untuk mengirim argumen:

```slak tanpa-jalan
const hapus = (id) => { ss.daftar = ss.daftar.filter(x => x.id !== id) }
sl.button("Hapus", { key: "h" + item.id, on_click: hapus, args: [item.id] })
```

Opsi yang berlaku untuk semua widget:

| Opsi                     | Fungsi                                                       |
|--------------------------|--------------------------------------------------------------|
| `key`                    | Identitas tetap dan penyimpanan otomatis di `session_state`  |
| `help`                   | Teks bantuan pada ikon ? di samping label                    |
| `disabled`               | `true` untuk menonaktifkan widget                            |
| `label_visibility`       | `"visible"`, `"hidden"` (ruangnya tetap), atau `"collapsed"` |
| `on_change` / `on_click` | Fungsi yang dipanggil saat nilai berubah atau tombol diklik  |
| `args`                   | Larik argumen untuk callback                                 |

## 4.6 Skrip async: `await`, `sleep`, dan `empty`

Skrip Slak boleh memakai `await`. Kombinasikan `await sl.sleep(ms)` dengan `sl.empty()` untuk animasi atau proses bertahap:

```slak
if (sl.button("Mulai")) {
  const tempat = sl.empty()
  for (let i = 5; i >= 1; i--) {
    tempat.header(String(i))
    await sl.sleep(1000)
  }
  tempat.success("Selesai!")
}
```

`sl.empty()` adalah wadah yang hanya memuat satu elemen: setiap tulisan baru menggantikan yang lama. Jika pengguna berinteraksi di tengah proses, Slak menghentikan jalan lama dan memulai jalan baru secara otomatis.

## 4.7 Menyimpan hasil hitungan dengan `cache_data`

Bungkus fungsi yang berat dengan `sl.cache_data`. Hasilnya disimpan berdasarkan argumen, sehingga tidak dihitung ulang setiap jalan:

```slak
const buatData = sl.cache_data((n) => {
  return Array.from({ length: n }, (_, i) => ({ x: i, y: Math.sin(i / 5) }))
}, { ttl: 60 })   // ttl dalam detik; tanpa ttl = selamanya

const data = buatData(200)
```

Untuk mengosongkan semua cache, panggil `Slak.cache_data.clear()`.

## 4.8 Mengendalikan alur: `stop` dan `rerun`

- `sl.stop()` menghentikan skrip di titik itu. Elemen di bawahnya tidak digambar. Cocok untuk validasi, misalnya "isi nama dulu".

- `sl.rerun()` langsung menjalankan ulang skrip dari atas, misalnya setelah mengubah `session_state`.
