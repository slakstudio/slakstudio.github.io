Aplikasi yang aksesibel bisa dipakai oleh orang yang memakai pembaca layar, hanya papan ketik, atau layar dengan kontras rendah. Slak 1.9 mengurus sebagian besar hal ini secara otomatis, sehingga aplikasimu memenuhi pedoman WCAG 2.1 tingkat AA tanpa kode tambahan.

## 43.1 Yang diurus Slak

- **Nama widget.** Setiap kotak isian, kotak pilih, dan grup radio diberi nama dari labelnya. Pembaca layar menyebut "Kota, kotak pilih", bukan sekadar "kotak pilih". Ini tetap berlaku saat label disembunyikan dengan `label_visibility: "collapsed"`.

- **Papan ketik.** Semua tombol, isian, tab, dan menu bisa dicapai dengan tombol Tab dan punya garis fokus yang jelas. Area tabel bisa difokus dan digulir dengan tombol panah.

- **Pengumuman.** Toast diumumkan oleh pembaca layar; bilah kemajuan dan kolom chat punya nama; tombol hapus pada pilihan ganda menyebut pilihannya ("Hapus Jayapura").

- **Grafik.** Setiap grafik punya teks pengganti otomatis, misalnya "Grafik total menurut kota, 6 titik".

- **Warna.** Warna teks `:green[...]`, `:orange[...]`, `:yellow[...]`, menu halaman aktif, serta pil dan segmen terpilih memenuhi kontras minimal 4,5 : 1, di tema terang dan gelap.

## 43.2 Yang perlu kamu lakukan

1.  **Tulis label yang bermakna**, juga bila labelnya kamu sembunyikan. `sl.selectbox("Kota", ...)` jauh lebih jelas daripada `sl.selectbox("", ...)`.

2.  **Beri grafik penting kalimat kesimpulan** dengan opsi `alt` (atau `title`). Teks otomatis menyebut isinya, tetapi hanya kamu yang tahu pesannya:

```slak tanpa-jalan
sl.bar_chart(df, { x: "kota", y: "total", alt: "Jayapura menyumbang hampir sepertiga omzet" })
```

3.  **Jangan menyampaikan arti hanya lewat warna.** Tulis "turun 12%" di samping panah merah, bukan panah merah saja.

4.  **Beri gambar teks pengganti**: `sl.image("grafik.png", { caption: "..." })`.

## 43.3 Memeriksa sendiri

Cara paling sederhana: letakkan tetikus di samping, lalu pakai aplikasimu hanya dengan Tab, Shift+Tab, Enter, spasi, dan tombol panah. Untuk pemeriksaan otomatis, buka DevTools Chrome (F12), pilih tab **Lighthouse**, centang **Accessibility**, lalu jalankan. Tim Slak memeriksa semua halaman contoh dengan axe-core di setiap rilis (alat pengembang `uji-1.9/a11y`): 0 pelanggaran serius atau kritis di Slak 1.9.
