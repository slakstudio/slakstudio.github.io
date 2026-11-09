Slak tidak perlu dipasang: cukup sertakan berkas `slak.js` di halaman HTML. Slak Studio dipasang dengan mengekstrak satu berkas zip, tanpa installer dan tanpa hak administrator.

## 2.1 Persyaratan sistem

| Komponen               | Kebutuhan minimum                                                 |
|------------------------|-------------------------------------------------------------------|
| Slak (framework)       | Browser modern: Chrome atau Edge 111+, Firefox 113+, Safari 16.4+ |
| Slak Studio            | Windows 10 atau 11, 64-bit (x64)                                  |
| Ruang disk Slak Studio | Sekitar 370 MB setelah diekstrak (zip sekitar 150 MB)             |
| Memori                 | 4 GB RAM atau lebih disarankan                                    |
| Internet               | Tidak diperlukan, kecuali untuk mengunduh                         |

## 2.2 Memasang Slak di proyek web

1.  Simpan berkas `slak.js` di folder proyekmu.

2.  Buat berkas `index.html` di folder yang sama.

3.  Sertakan Slak dan tulis aplikasimu di dalam tag `<script type="text/slak">`:

```html
<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <title>Aplikasiku</title>
  <script src="slak.js"></script>
</head>
<body>
  <script type="text/slak">
    sl.title("Aplikasiku")
  </script>
</body>
</html>
```

4.  Klik dua kali `index.html`. Halaman terbuka di browser dan aplikasi langsung berjalan.

Struktur folder yang disarankan:

```text
proyek-saya/
├── slak.js
├── index.html
└── data/
    └── penjualan.csv
```

Catatan: browser tidak mengizinkan halaman `file://` membaca berkas lain di disk secara otomatis. Untuk memakai data CSV, gunakan `sl.file_uploader` (Bab 9) atau tempel datanya langsung di kode.

Paket Slak 1.9.1 juga berisi empat berkas opsional untuk analisis data dan peta. Salin ke folder yang sama bila dibutuhkan, lalu tambahkan sesudah `slak.js`:

| Berkas             | Ukuran         | Kapan dipakai                                                                 |
|--------------------|----------------|-------------------------------------------------------------------------------|
| `slak-data.js`     | sekitar 320 KB | DataFrame, statistik, ML, dataset contoh (Bab 14–20)                          |
| `slak-sql.js`      | sekitar 1 MB   | SQL dengan SQLite (Bab 17); pasang setelah `slak-data.js`                     |
| `slak-peta.js`     | sekitar 290 KB | Peta, batas 38 provinsi, titik tengah kab/kota (Bab 22)                       |
| `slak-peta-kab.js` | sekitar 580 KB | Batas kab/kota untuk choropleth tingkat kab/kota; pasang setelah slak-peta.js |

## 2.3 Memasang Slak Studio di Windows

1.  Unduh berkas `SlakStudio-1.9.1-Windows-x64.zip`.

2.  Klik kanan berkas zip, pilih **Extract All…** (Ekstrak Semua), lalu pilih lokasi tetap, misalnya `Documents\Slak Studio`. Jangan menjalankan aplikasi langsung dari dalam zip.

3.  Buka folder hasil ekstrak, lalu klik dua kali **Slak Studio.exe**.

4.  Jika muncul layar biru **Windows protected your PC**, klik **More info** (Info selengkapnya), lalu **Run anyway** (Tetap jalankan). Peringatan ini muncul karena aplikasi belum bertanda tangan digital, dan hanya muncul pada pembukaan pertama.

5.  Slak Studio terbuka dengan berkas `selamat-datang.slak` dan panel **Belajar** di kiri.

Agar mudah dibuka lagi:

- **Pintasan desktop:** klik kanan `Slak Studio.exe` → **Send to** → **Desktop (create shortcut)**.

- **Sematkan ke taskbar:** saat Slak Studio terbuka, klik kanan ikonnya di taskbar → **Pin to taskbar**.

- **Buka berkas .slak dengan klik dua kali:** klik kanan sebuah berkas `.slak` → **Open with** → **Choose another app** → **Choose an app on your PC** → pilih `Slak Studio.exe`, lalu centang **Always use this app**.

## 2.4 Isi folder Slak Studio

| Berkas atau folder                        | Fungsi                                                                                                                |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `Slak Studio.exe`                         | Program utama; klik dua kali untuk membuka                                                                            |
| `Baca Saya.txt`                           | Panduan singkat                                                                                                       |
| `Contoh\`                                 | Tiga puluh lima berkas `.slak` contoh yang siap dibuka                                                                |
| `Lisensi\`                                | Lisensi Electron, Chromium, CodeMirror, sql.js, dan SQLite                                                            |
| `resources\app\`                          | Kode Slak Studio, slak-data.js, slak-sql.js, dan `slak.js`; jangan diubah kecuali kamu ingin memodifikasi aplikasinya |
| Berkas `.dll`, `.pak`, `.bin`, `locales\` | Mesin Chromium dan Electron; jangan dihapus                                                                           |

## 2.5 Memperbarui dan menghapus

- **Memperbarui:** tutup Slak Studio, hapus folder lama, lalu ekstrak versi baru ke lokasi yang sama.

- **Menghapus:** hapus folder Slak Studio beserta pintasannya. Pengaturan, draf, kemajuan belajar, dan data aplikasi yang dicoba di Studio tersimpan di `%APPDATA%\Slak Studio`; hapus folder itu juga jika ingin bersih sepenuhnya.

- Berkas `.slak` milikmu tidak pernah tersimpan di folder aplikasi, jadi aman saat memperbarui.

## 2.6 Tanpa Windows: macOS, Linux, atau browser

Slak Studio juga bisa dibuka sebagai halaman web biasa. Ekstrak `slak-studio-source.zip`, lalu buka `slak-studio/app/index.html` di Chrome atau Edge. Semua fitur berjalan, kecuali **Simpan** yang mengunduh berkas alih-alih menulis langsung ke disk.

Untuk menjalankannya sebagai aplikasi desktop di macOS atau Linux, pasang [Node.js](https://nodejs.org), lalu jalankan di folder `slak-studio`:

```bash
npm install electron
node build-preview.js
npx electron .
```
