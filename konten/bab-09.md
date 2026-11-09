Semua fungsi dipanggil lewat `sl` (atau lewat kolom, tab, dan wadah lain yang dibuat dari `sl`). Argumen dalam kurung kurawal `{…}` adalah opsi yang boleh dilewati.

## 9.1 Teks

| Fungsi                                                         | Keterangan                                                                                                     |
|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `title(teks, {divider, anchor})`                               | Judul besar halaman; Markdown sebaris didukung                                                                 |
| `header(teks, {divider})`                                      | Judul bagian; `divider: true` menambah garis bawah berwarna aksen, atau nama warna seperti `"blue"`            |
| `subheader(teks)`                                              | Judul sub-bagian                                                                                               |
| `markdown(teks, {unsafe_allow_html})`                          | Teks Markdown lengkap; HTML diabaikan kecuali `unsafe_allow_html: true`                                        |
| `write(...nilai)`                                              | Serbaguna: teks jadi Markdown, angka diformat, larik objek jadi tabel, objek jadi JSON, Error jadi kotak galat |
| `caption(teks)`                                                | Teks kecil berwarna redup                                                                                      |
| `text(teks)`                                                   | Teks polos berhuruf monospace, tanpa Markdown                                                                  |
| `code(kode, bahasa)` atau `code(kode, {language, wrap_lines})` | Blok kode dengan tombol Salin                                                                                  |
| `json(nilai)`                                                  | Objek atau larik sebagai JSON berwarna                                                                         |
| `html(string)`                                                 | Menyisipkan HTML mentah                                                                                        |
| `divider()`                                                    | Garis pemisah horizontal                                                                                       |

Sintaks Markdown yang didukung `markdown()` dan `write()`:

| Tulis                                              | Hasil                                                                |
|----------------------------------------------------|----------------------------------------------------------------------|
| `**tebal**`, `*miring*`, `~~coret~~`, `` `kode` `` | Format teks                                                          |
| `[teks](https://…)`, `![alt](url-gambar)`          | Tautan dan gambar; URL polos otomatis jadi tautan                    |
| `:red[teks]`                                       | Warna: `red`, `green`, `blue`, `orange`, `violet`, `gray`, `rainbow` |
| `#` sampai `######` di awal baris                  | Judul tingkat 1–6                                                    |
| `- butir`, `1. butir`, `- [x] selesai`             | Daftar, daftar bernomor, daftar tugas                                |
| `> kutipan`, `---`                                 | Kutipan dan garis pemisah                                            |
| Tabel pipa `| a | b |` dengan baris `|---|---:|`   | Tabel, termasuk perataan kolom                                       |
| Tiga backtick                                      | Blok kode                                                            |
| Dua spasi atau `\` di akhir baris                  | Pindah baris paksa                                                   |

## 9.2 Status dan umpan balik

| Fungsi                        | Keterangan                                                                                                           |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `success(teks, {icon})`       | Kotak hijau                                                                                                          |
| `info(teks, {icon})`          | Kotak biru                                                                                                           |
| `warning(teks, {icon})`       | Kotak kuning                                                                                                         |
| `error(teks, {icon})`         | Kotak merah                                                                                                          |
| `exception(err)`              | Kotak galat berisi nama, pesan, dan stack trace yang bisa dibuka                                                     |
| `progress(nilai, teks)`       | Bilah kemajuan berskala 0–100; mengembalikan objek dengan `.progress(nilai, teks)` untuk diperbarui                  |
| `await spinner(teks, fungsi)` | Pemutar selama `fungsi` (boleh async) berjalan; mengembalikan hasil fungsi. Tanpa fungsi: mengembalikan `{ done() }` |
| `toast(teks, ikon)`           | Notifikasi kecil di pojok yang hilang sendiri; opsi `{icon, duration}` dalam milidetik                               |
| `balloons()`                  | Animasi balon perayaan                                                                                               |

## 9.3 Data dan tabel

| Fungsi                                                                     | Keterangan                                                                                                                                                       |
|----------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dataframe(data, {height, hide_index, column_order, max_rows, file_name})` | Tabel interaktif: klik judul kolom untuk mengurutkan (naik → turun → asli), tombol ⤓ CSV untuk mengunduh. Tinggi bawaan 400 px, maksimal 1.000 baris ditampilkan |
| `table(data, {hide_index, column_order})`                                  | Tabel statis, semua baris ditampilkan                                                                                                                            |
| `metric(label, nilai, delta, {delta_color, help, border})`                 | Angka besar dengan perubahan ▲/▼. `delta_color`: `"normal"` (naik = hijau), `"inverse"` (naik = merah), `"off"`                                                  |

Format data yang diterima tabel dan grafik:

```slak tanpa-jalan
// 1. Larik objek: satu objek = satu baris (paling umum)
[{ kota: "Jayapura", suhu: 31 }, { kota: "Sorong", suhu: 30 }]

// 2. Objek kolom: satu kunci = satu kolom
{ kota: ["Jayapura", "Sorong"], suhu: [31, 30] }

// 3. Larik angka: satu kolom bernama "value"
[3, 7, 2, 9]

// 4. Larik dari larik: kolom bernama "0", "1", ...
[["Jayapura", 31], ["Sorong", 30]]
```

## 9.4 Grafik

| Fungsi                      | Cocok untuk                                                                    |
|-----------------------------|--------------------------------------------------------------------------------|
| `line_chart(data, opsi)`    | Perubahan nilai dari waktu ke waktu                                            |
| `area_chart(data, opsi)`    | Seperti garis, dengan area terisi; `stack: true` untuk bagian dari keseluruhan |
| `bar_chart(data, opsi)`     | Membandingkan kategori; `stack: true` untuk batang bertumpuk                   |
| `scatter_chart(data, opsi)` | Hubungan dua angka                                                             |

| Opsi grafik                   | Keterangan                                                             |
|-------------------------------|------------------------------------------------------------------------|
| `x`                           | Nama kolom sumbu X; tanpa `x`, nomor baris dipakai                     |
| `y`                           | Nama kolom atau larik nama kolom; tanpa `y`, semua kolom angka dipakai |
| `height`                      | Tinggi dalam piksel, bawaan 300                                        |
| `title`, `x_label`, `y_label` | Judul grafik dan label sumbu                                           |
| `color`                       | Satu warna atau larik warna CSS, misalnya `["#0f766e", "#ea580c"]`     |
| `stack`                       | `true` untuk menumpuk seri (batang dan area)                           |
| `size`                        | Jari-jari titik pada grafik sebar, bawaan 4                            |

Arahkan kursor ke grafik untuk melihat nilai setiap titik. Grafik menyesuaikan lebar wadahnya dan otomatis mengikuti tema terang atau gelap.

Slak 1.2 menambah `histogram`, `box_plot`, `pie_chart`, `heatmap`, dan `combo_chart`, serta opsi baru untuk grafik di atas (`by`, `horizontal`, `sort`, `labels`, `format`, `trendline`). Penjelasan lengkapnya ada di Bab 16.

## 9.5 Widget input

| Fungsi                                        | Opsi khusus                                                                            | Mengembalikan                    |
|-----------------------------------------------|----------------------------------------------------------------------------------------|----------------------------------|
| `button(label, opsi)`                         | `type: "primary"`, `use_container_width`, `on_click`                                   | `true` sekali setelah diklik     |
| `checkbox(label, nilai)`                      | —                                                                                      | `true` / `false`                 |
| `toggle(label, nilai)`                        | —                                                                                      | `true` / `false`                 |
| `radio(label, opsi, {…})`                     | `index` (bawaan 0; `null` = belum dipilih), `horizontal`, `format_func`                | Opsi terpilih atau `null`        |
| `selectbox(label, opsi, {…})`                 | `index` (`null` = kosong), `placeholder`, `format_func`                                | Opsi terpilih atau `null`        |
| `multiselect(label, opsi, {…})`               | `default` (larik), `max_selections`, `placeholder`, `format_func`                      | Larik opsi terpilih              |
| `slider(label, min, maks, nilai, step)`       | `format` (fungsi pemformat angka); nilai berupa larik `[a, b]` membuat slider rentang  | Angka atau `[a, b]`              |
| `select_slider(label, opsi, {…})`             | `value` (satu opsi atau `[a, b]`), `format_func`                                       | Opsi atau `[a, b]`               |
| `text_input(label, nilai, {…})`               | `placeholder`, `type: "password"`, `max_chars`, `live: true` (terapkan setiap ketikan) | Teks                             |
| `text_area(label, nilai, {…})`                | `height` (bawaan 110), `placeholder`, `max_chars`                                      | Teks                             |
| `number_input(label, min, maks, nilai, step)` | Juga bisa `{min, max, value, step}`; tombol − dan +                                    | Angka                            |
| `date_input(label, "YYYY-MM-DD", {min, max})` | Bawaan hari ini                                                                        | Teks `"YYYY-MM-DD"`              |
| `time_input(label, "HH:MM")`                  | Bawaan jam sekarang                                                                    | Teks `"HH:MM"`                   |
| `color_picker(label, "#rrggbb")`              | Bawaan `#0f766e`                                                                       | Teks warna hex                   |
| `file_uploader(label, {…})`                   | `type` (misalnya `"csv"` atau `["csv", "txt"]`), `accept_multiple_files`               | Objek berkas, larik, atau `null` |
| `download_button(label, data, {…})`           | `file_name`, `mime`, `type`, `use_container_width`                                     | Selalu `false`                   |
| `link_button(label, url, {…})`                | `type`, `use_container_width`                                                          | —                                |

Opsi umum semua widget (`key`, `help`, `disabled`, `label_visibility`, `on_change`, `args`) dijelaskan di Bab 4.5. `format_func` adalah fungsi yang mengubah opsi menjadi teks tampilan, misalnya `{ format_func: (k) => k.toUpperCase() }`. Opsi boleh berupa larik, objek (kuncinya dipakai), `Set`, atau `Map`.

Objek berkas dari `file_uploader`:

| Properti                               | Isi                                                                             |
|----------------------------------------|---------------------------------------------------------------------------------|
| `name`, `size`, `type`, `lastModified` | Nama, ukuran dalam byte, jenis MIME, dan waktu ubah                             |
| `text`                                 | Isi berkas sebagai teks UTF-8                                                   |
| `bytes`                                | Isi mentah sebagai `Uint8Array`                                                 |
| `url`                                  | URL sementara untuk `image`, `audio`, atau `video`                              |
| `json()`                               | Isi berkas yang diurai sebagai JSON                                             |
| `csv({delimiter, header, numbers})`    | Isi berkas sebagai larik objek; pemisah `,` `;` tab atau `|` dideteksi otomatis |

`download_button` menerima teks, `Blob`, `ArrayBuffer`, atau objek. Objek diunduh sebagai JSON, kecuali `mime: "text/csv"` yang mengubah larik objek menjadi CSV.

## 9.6 Tata letak

| Fungsi                                               | Keterangan                                                                                                                                           |
|------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sl.sidebar.<fungsi>(…)`                             | Menaruh elemen apa pun di panel samping kiri                                                                                                         |
| `columns(n atau [bobot], {gap, vertical_alignment})` | Larik kolom. `gap`: `"small"`, `"medium"`, `"large"`; `vertical_alignment`: `"top"`, `"center"`, `"bottom"`. Di layar di bawah 640 px kolom ditumpuk |
| `tabs([label])`                                      | Larik wadah, satu per tab                                                                                                                            |
| `expander(label, {expanded}, fn?)`                   | Bagian yang bisa dibuka-tutup                                                                                                                        |
| `container({border, height}, fn?)`                   | Wadah pengelompok; `height` membuatnya bisa digulir                                                                                                  |
| `empty()`                                            | Wadah satu elemen yang isinya diganti setiap ditulisi                                                                                                |
| `form(key, {clear_on_submit, border}, fn?)`          | Widget di dalamnya baru diterapkan saat tombol kirim ditekan                                                                                         |
| `form_submit_button(label, {type})`                  | Tombol kirim; hanya boleh di dalam form; `true` saat dikirim                                                                                         |

Wadah bisa dipakai dengan dua gaya:

```slak
// Gaya variabel
const kotak = sl.container({ border: true })
kotak.write("Isi kotak")

// Gaya callback
sl.expander("Detail", (e) => {
  e.write("Isi expander")
})
```

## 9.7 Chat dan media

| Fungsi                                           | Keterangan                                                                                                                                      |
|--------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `chat_message(peran, {avatar}, fn?)`             | Gelembung pesan. Peran `"user"` atau `"assistant"` (juga `"pengguna"`, `"asisten"`, `"bot"`); nama lain memakai huruf pertamanya sebagai avatar |
| `chat_input(placeholder, {max_chars, disabled})` | Kolom ketik yang menempel di bawah layar; mengembalikan teks pada jalan setelah dikirim, selain itu `null`                                      |
| `image(src, {caption, width, alt})`              | Gambar dari URL, data URI, atau berkas unggahan                                                                                                 |
| `audio(src, {loop, autoplay})`                   | Pemutar audio                                                                                                                                   |
| `video(src, {loop, autoplay})`                   | Pemutar video                                                                                                                                   |

## 9.8 Kontrol dan utilitas

| Fungsi                                                                    | Keterangan                                                                                   |
|---------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `session_state`                                                           | Objek yang bertahan antar-jalan ulang                                                        |
| `await sleep(ms)`                                                         | Menunggu; berhenti otomatis jika ada interaksi baru                                          |
| `rerun()`                                                                 | Jalankan ulang dari atas sekarang                                                            |
| `stop()`                                                                  | Hentikan skrip di titik ini                                                                  |
| `cache_data(fn, {ttl})`                                                   | Fungsi ber-cache berdasarkan argumen; `ttl` dalam detik                                      |
| `set_page_config({page_title, page_icon, layout, initial_sidebar_state})` | Judul tab, ikon (emoji atau URL), `layout: "wide"`, dan `initial_sidebar_state: "collapsed"` |
| `query_params.get(k)`, `.set(k, v)`, `.all()`                             | Membaca dan menulis parameter di URL halaman                                                 |
| `parse_csv(teks, {delimiter, header, numbers})`                           | Teks CSV menjadi larik objek; angka dan `true`/`false` dikonversi otomatis                   |
| `to_csv(data)`                                                            | Data menjadi teks CSV                                                                        |
| `markdown_to_html(teks)`                                                  | Markdown menjadi HTML (aman)                                                                 |
| `version`                                                                 | Versi Slak, misalnya `"0.2.0"`                                                               |

## 9.9 Objek global `Slak`

| Anggota                                                             | Keterangan                                                                           |
|---------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| `Slak.run(skrip, opsi)`                                             | Menjalankan aplikasi (Bab 3.3); mengembalikan objek dengan `destroy()` dan `rerun()` |
| `Slak.compile(teks)`                                                | Mengubah teks kode menjadi fungsi skrip                                              |
| `Slak.cache_data`, `Slak.parse_csv`, `Slak.to_csv`, `Slak.markdown` | Sama dengan versi `sl.`                                                              |
| `Slak.cache_data.clear()`                                           | Mengosongkan semua cache                                                             |
| `Slak.locale = "id-ID"`                                             | Format angka; tanpa diatur, format bahasa browser dipakai                            |
| `Slak.version`                                                      | Versi Slak                                                                           |

## 9.10 Fungsi baru di Slak 1.1

| Fungsi                                                  | Keterangan                                                              | Bab |
|---------------------------------------------------------|-------------------------------------------------------------------------|-----|
| `navigation(halaman, {position})`                       | Menu multi-halaman; mengembalikan halaman aktif dengan `.run()`         | 12  |
| `page(judul, fungsi, {icon, url, default})`             | Mendefinisikan satu halaman                                             | 12  |
| `switch_page(judul)`, `page_link(judul, {label, icon})` | Berpindah halaman dari kode atau lewat tautan                           | 12  |
| `local_state`, `clear_local_state()`                    | Penyimpanan permanen untuk data JSON kecil                              | 13  |
| Opsi widget `persist: true`                             | Isian widget diingat walau halaman ditutup                              | 13  |
| `db(nama, skema)`, `db_list()`                          | Database IndexedDB lengkap dengan CRUD dan pencarian                    | 13  |
| `data_editor(data atau db.tabel, opsi)`                 | Tabel yang bisa diedit; tersambung langsung ke database                 | 13  |
| `Slak.db(nama, skema)`, `Slak.clear_local_state(id)`    | Versi di luar aplikasi, untuk kode JavaScript lain di halaman yang sama | 13  |
