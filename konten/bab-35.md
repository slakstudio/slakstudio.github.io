Aplikasi yang makin besar makin sering rusak tanpa disadari: satu perubahan kecil di rumus diskon, dan total kasir salah di halaman lain. Slak 1.7 menambahkan **sl.testing**, padanan `AppTest` di Streamlit, supaya pemeriksaan itu dijalankan oleh kode, bukan diklik satu per satu. Alat yang sama dipakai untuk memeriksa 104 perintah Streamlit secara otomatis.

## 35.1 Uji pertama

`sl.testing.run(kode)` menjalankan aplikasi secara tersembunyi lalu mengembalikan objek uji. Elemen dipanggil menurut jenis dan labelnya, widget diisi dengan `set_value`, dan `run()` menjalankan ulang aplikasi seperti pengguna mengubah widget.

```slak
const KASIR = `
const harga = sl.number_input("Harga", { value: 50000, step: 1000 })
const jumlah = sl.number_input("Jumlah", { value: 1, min_value: 1 })
const member = sl.checkbox("Member (diskon 10%)")
sl.metric("Total", harga * jumlah * (member ? 0.9 : 1))
if (sl.button("Bayar")) sl.success("Lunas")
`
const { expect } = sl.testing

await sl.testing.test("total awal sama dengan harga", async () => {
  const at = await sl.testing.run(KASIR)
  expect(at.metric("Total").value).toBe(50000)
  at.close()
})
await sl.testing.test("member beli 3 dapat diskon", async () => {
  const at = await sl.testing.run(KASIR)
  at.number_input("Jumlah").set_value(3)
  await at.checkbox("Member (diskon 10%)").check().run()
  expect(at.metric("Total").value).toBe(135000)
  at.close()
})
await sl.testing.test("tombol Bayar menampilkan pesan", async () => {
  const at = await sl.testing.run(KASIR)
  await at.button("Bayar").click().run()
  expect(at.success[0].value).toContain("Lunas")
  at.close()
})
sl.testing.summary()
```

![Hasil sl.testing.test: tiga uji lolos dengan lama waktunya](konten/gambar/hasil-sl-testing-test-tiga-uji-lolos-dengan-lama.png)

Setiap `test` tampil sebagai kotak hijau (lolos, dengan lama waktunya) atau merah (gagal, dengan pesan dalam bahasa Indonesia). Aplikasi yang diuji biasanya disimpan sebagai berkas sendiri, lalu dipanggil dengan `sl.testing.run("kasir.slak")`.

## 35.2 Yang bisa dilakukan objek uji

| Kebutuhan                   | Kode                                                              |
|-----------------------------|-------------------------------------------------------------------|
| Elemen per jenis            | `at.title[0].value`, `at.write[1].value`, `at.dataframe[0].value` |
| Cari dengan label atau key  | `at.metric("Total")`, `at.text_input("nama")`                     |
| Isi widget                  | `.set_value(nilai)`, `.check()`, `.uncheck()`, `.select(nilai)`   |
| Tekan tombol                | `at.button("Bayar").click()`, juga `form_submit_button`           |
| Jalankan ulang              | `await ... .run()`                                                |
| Isi session_state dan galat | `at.session_state.n`, `at.exception`                              |
| Semua teks halaman          | `at.text_content`                                                 |
| Mulai dengan state tertentu | `sl.testing.run(kode, { session_state: { login: true } })`        |

Pernyataan `expect` yang tersedia: `toBe`, `toEqual`, `toContain`, `toMatch`, `toBeGreaterThan`, `toBeLessThan`, `toBeCloseTo(x, desimal)`, `toHaveLength`, `toBeTruthy`, `toBeFalsy`, `toBeNull`, `toThrow`, dan kebalikannya lewat `.not` (misalnya `expect(x).not.toBe(0)`).

## 35.3 Paritas Streamlit yang diperiksa otomatis

Berkas **PARITAS.md** di paket Slak berisi 104 perintah Streamlit beserta padanannya. Daftar itu tidak ditulis tangan: setiap perintah dijalankan sebagai aplikasi kecil dan diperiksa dengan `sl.testing`, termasuk mengisi widget dan menekan tombol. Hasil 1.7:

| Status    | Jumlah | Arti                                                                                          |
|-----------|--------|-----------------------------------------------------------------------------------------------|
| Sama      | 80     | cara tulis dan perilaku setara (`st.` menjadi `sl.`, argumen bernama menjadi objek `{ ... }`) |
| Mirip     | 23     | jalan, dengan beda yang dicatat (misalnya `date_input` mengembalikan teks `YYYY-MM-DD`)       |
| Tidak ada | 1      | `st.App`, konfigurasi server, tidak relevan tanpa server                                      |
| Gagal     | 0      |                                                                                               |

Semua 42 perintah yang paling sering dipakai pemula jalan. Dua celah ditutup di 1.7:

- **`sl.pydeck_chart(spesifikasi)`** menggambar peta 3D dan peta data besar dengan deck.gl (MIT, diunduh saat dipakai). Spesifikasinya JSON deck.gl, sama dengan hasil `pydeck.Deck.to_json()`, jadi contoh pydeck bisa diterjemahkan langsung. Peta dasarnya OpenStreetMap tanpa kunci API; `map_style: null` mematikannya.

- **`sl.secrets`** sengaja kosong. Membacanya menampilkan pesan bahwa password dan kunci API harus disimpan di slak-bridge (Bab 33), karena seluruh isi halaman Slak bisa dibaca pengunjung.

Satu perbaikan kecil ikut ditemukan: `color: "nama_kolom"` di grafik garis, batang, area, dan sebar kini memberi satu warna per kelompok, sama seperti Streamlit.

```slak tanpa-jalan
sl.pydeck_chart({
  initialViewState: { longitude: 120, latitude: -2, zoom: 3.3, pitch: 40 },
  layers: [{ "@@type": "ColumnLayer", data: kota, getPosition: "@@=[lon, lat]",
             getElevation: "@@=omzet * 1000", radius: 40000, getFillColor: [15, 118, 110], pickable: true }]
}, { tooltip: { text: "{kota}: Rp{omzet} juta" } })
```

## 35.4 Berkas uji, panel Uji, dan slak-test.html

Uji sebaiknya disimpan terpisah dari aplikasinya: berkas `kasir.uji.slak` di samping `kasir.slak`. Di dalam berkas uji, objek uji bisa dibuat tanpa langsung dijalankan, sama seperti `AppTest.from_file` di Streamlit:

```slak
const { expect } = sl.testing
await sl.testing.test("total awal sama dengan harga", async () => {
  const at = sl.testing.from_file("kasir.slak")   // juga from_string(kode) dan from_function(fn)
  await at.run()
  expect(at.metric("Total").value).toBe(50000)
  at.close()
})
sl.testing.summary()
```

| Tempat                               | Cara menjalankan                                                                                                                                                                                                                                                                  |
|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Slak Studio                          | Panel **Uji** di rel kiri. **Jalankan uji** menjalankan semua berkas `*.uji.slak` di folder berkas aktif dan merangkum yang lulus dan gagal. **Uji cepat** memastikan berkas aktif jalan tanpa galat. **Buat berkas uji** membuat kerangka uji untuk aplikasi yang sedang dibuka. |
| Browser, dibuka dengan klik dua kali | Buka **slak-test.html** dari paket Slak, klik **Pilih berkas uji dan aplikasinya**, lalu pilih berkas uji, aplikasinya, dan berkas datanya sekaligus.                                                                                                                             |
| Hosting                              | Tulis daftar berkas di `const UJI = ["kasir.uji.slak"]` di dalam slak-test.html; uji langsung berjalan saat halaman dibuka.                                                                                                                                                       |

Tanpa berkas apa pun, slak-test.html menjalankan contoh uji kasir bawaannya, jadi kamu bisa melihat bentuk hasilnya lebih dulu.
