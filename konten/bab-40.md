Aplikasi yang hanya ada di laptopmu belum bisa dipakai orang lain. Bab 21 menjelaskan cara menyiapkan folder situs lalu mengunggahnya sendiri. Sejak Slak 1.8, Slak Studio bisa langsung menerbitkannya ke GitHub Pages, Netlify, atau hosting cPanel, dan situsnya bisa dipasang seperti aplikasi yang tetap jalan tanpa internet.

## 40.1 Jendela Terbitkan

Buka aplikasimu, lalu pilih **Berkas › Terbitkan…** (Ctrl+Shift+U) atau tombol **Terbitkan** di bilah atas. Pilih tujuannya:

| Tujuan       | Yang perlu disiapkan                                                                         | Alamat hasilnya                       |
|--------------|----------------------------------------------------------------------------------------------|---------------------------------------|
| GitHub Pages | akun GitHub dan token akses pribadi (fine-grained) dengan izin Contents dan Pages read/write | `https://akunmu.github.io/nama-repo/` |
| Netlify      | akun Netlify dan token akses pribadi (User settings › Applications)                          | `https://nama-situs.netlify.app`      |
| FTP (cPanel) | server FTP, pengguna, dan password dari cPanel (menu FTP Accounts)                           | alamat domainmu                       |

Tekan **Terbitkan**. Kotak catatan menampilkan setiap langkah, lalu tautan situsmu muncul di bawahnya. Untuk GitHub, repositori dibuat bila belum ada dan GitHub Pages diaktifkan otomatis; perubahan biasanya tampil satu sampai dua menit kemudian. Untuk FTP, hanya berkas yang berubah sejak terbit terakhir yang diunggah.

## 40.2 Token dan password tetap rahasia

- Token dan password disimpan **terenkripsi oleh sistem operasi** di komputer ini, bukan di berkas .slak. Tombol **Lupakan token tersimpan** menghapusnya.

- Isinya tidak pernah ikut ke situs. Sebelum mengunggah, Slak Studio memeriksa semua berkas; bila token ditemukan, misalnya karena kamu menempelnya di kode, terbit dibatalkan.

- FTP selalu mencoba **FTPS** (terenkripsi) lebih dulu. FTP biasa hanya dipakai bila kamu mencentang "Izinkan FTP tanpa enkripsi". Banyak hosting murah memakai sertifikat buatan sendiri; centang "Terima sertifikat FTPS buatan sendiri" bila muncul pesan *self signed certificate*.

## 40.3 Bisa dipasang dan jalan offline

Centang **Bisa dipasang dan jalan offline (PWA)** (bawaannya menyala). Slak Studio menambahkan tiga hal ke situs:

| Berkas                         | Gunanya                                                                                                           |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------|
| `manifest.webmanifest`         | nama, warna, dan ikon aplikasi untuk tombol Pasang                                                                |
| `sw.js`                        | service worker yang menyimpan semua berkas situs, sehingga situs terbuka tanpa internet setelah kunjungan pertama |
| `ikon-192.png`, `ikon-512.png` | ikon dari `page_icon` di `sl.set_page_config`, atau huruf pertama judul                                           |

Setelah situs diterbitkan di alamat https, Chrome dan Edge menampilkan tombol **Pasang** di bilah alamat. Di ponsel Android, pilih **Tambahkan ke layar utama**. Pustaka yang dimuat dari internet saat dipakai (misalnya Plotly) ikut disimpan setelah pertama dimuat. Saat halaman dibuka dengan klik dua kali, service worker tidak jalan, dan itu memang disengaja oleh browser.

## 40.4 Menerbitkan folder dan playground resmi

Pilihan **Folder situs** menerbitkan isi sebuah folder apa adanya. Paket Slak sendiri adalah situs: `index.html` sebagai beranda, `playground/`, `docs/`, semua contoh, manifest, dan service worker. Paket inilah yang menjadi situs resmi **slak.studio** dan salinan resminya **slakstudio.github.io** (Bab 45); langkahnya ada di TERBIT-SITUS.md dalam paket.
