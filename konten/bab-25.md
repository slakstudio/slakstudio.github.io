## 25.1 Widget pilihan modern

| Widget                                      | Hasil                      | Kegunaan                                       |
|---------------------------------------------|----------------------------|------------------------------------------------|
| `sl.pills(label, opsi, { selection_mode })` | nilai atau larik           | Pilihan berupa tombol bulat                    |
| `sl.segmented_control(label, opsi)`         | nilai                      | 2–5 mode, misalnya Harian/Mingguan/Bulanan     |
| `sl.feedback("thumbs" | "faces" | "stars")` | angka atau null            | Umpan balik: jempol 1/0, wajah dan bintang 0–4 |
| `sl.menu_button(label, opsi)`               | opsi yang diklik atau null | Tombol dengan daftar pilihan                   |
| `sl.pagination(jumlah)`                     | nomor halaman (mulai 1)    | Penomoran halaman                              |
| `sl.datetime_input(label)`                  | teks "YYYY-MM-DD HH:MM"    | Tanggal dan jam sekaligus                      |
| `sl.camera_input(label)`                    | berkas foto atau null      | Ambil foto dari kamera                         |
| `sl.audio_input(label)`                     | berkas WAV atau null       | Rekam suara                                    |

`sl.chat_input` kini bisa menerima berkas dan rekaman suara. Dengan `accept_file` atau `accept_audio`, hasilnya berupa objek `{ text, files, audio }`. Bila dipanggil di dalam wadah, kotak chat tampil di tempat, bukan menempel di bawah.

Opsi baru untuk widget lama: `accept_new_options` (selectbox dan multiselect boleh diisi pilihan baru), `captions` untuk radio, `icon` dan `type: "tertiary"` untuk tombol, serta `width` untuk semua widget.

## 25.2 Tabel yang bisa dipilih dan jenis kolom

```slak tanpa-jalan
const pilih = sl.dataframe(df, {
  on_select: "rerun", selection_mode: "multi-row",
  column_config: {
    omzet: sl.column_config.NumberColumn("Omzet", { format: "rp" }),
    capaian: sl.column_config.ProgressColumn("Capaian", { min_value: 0, max_value: 1 }),
    tren: sl.column_config.LineChartColumn("Tren 6 bulan"),
    situs: sl.column_config.LinkColumn("Situs")
  }
})
const terpilih = df.iloc(pilih.selection.rows)
```

`selection_mode` bisa "single-row", "multi-row", "single-column", "multi-column", "single-cell", atau "multi-cell". Ada 21 jenis kolom; ketik `sl.column_config.` di Slak Studio untuk melihat semuanya. Jenis yang sama berlaku di `sl.data_editor`, termasuk kolom multiselect, tanggal-jam, dan JSON yang bisa diedit. Tabel juga punya kotak cari (⌕) dan kolom yang bisa dipin dengan `pinned: true`.

## 25.3 Metrik dengan grafik mini

```slak
sl.metric("Omzet", 128500000, "+12,4%", {
  format: "rp", chart_data: [92, 98, 95, 104, 110, 118, 128], chart_type: "area",
  delta_description: "vs bulan lalu", border: true
})
```

`format` juga menerima "dollar", "percent", "compact", "bytes", atau gaya printf seperti "%.1f".

## 25.4 Grafik yang bisa diklik dan pustaka grafik lain

Semua grafik Slak bisa dipilih dengan `on_select: "rerun"`. Hasilnya `{ selection: { points, rows } }`, sehingga klik pada batang bisa membuka dialog rincian. Grafik batang juga mendapat `stack: "normalize"` (100%), `"center"`, dan `"layered"`.

`sl.vega_lite_chart(data, spec)` (juga `sl.altair_chart`) memahami subset Vega-Lite dan menggambarnya dengan mesin grafik Slak tanpa internet. Untuk kebutuhan khusus tersedia `sl.plotly_chart`, `sl.echarts_chart`, `sl.mermaid_chart`, dan `sl.graphviz_chart`. Keempatnya mengunduh pustakanya dari internet hanya saat dipakai, jadi pakailah bila halamanmu memang akan dibuka dalam keadaan online.

## 25.5 Teks, rumus, dan tema

- `sl.badge("Baru", { color: "green" })`, `sl.echo(fungsi)`, `sl.help(objek)`, `sl.iframe(url)`, `sl.pdf(berkas)`, `sl.logo(gambar)`, `sl.snow()`.

- `await sl.write_stream(teks)` menulis teks sedikit demi sedikit seperti chatbot.

- Markdown mengenal `:blue-background[teks]`, `:green-badge[teks]`, dan ikon `:material/home:` (font ikon diunduh dari internet).

- `sl.latex(...)` dan rumus di dalam markdown digambar dengan MathML bawaan browser, tanpa pustaka.

Tema bisa diatur sendiri:

```slak tanpa-jalan
sl.set_page_config({
  theme: {
    primaryColor: "#7c3aed", font: "Inter", baseRadius: "large",
    dark: { backgroundColor: "#0f0a1e" }
  },
  menu_items: { About: "**Toko Kopi** — dasbor penjualan" }
})
```

Font selain sans-serif, serif, dan monospace diunduh dari Google Fonts saat online; saat offline, Slak memakai font bawaan sistem.
