Kode di halaman web selalu bisa dilihat pengunjung lewat *View source*. `sl.crypto` membantu agar nilai penting tidak tertulis apa adanya.

## 26.1 Kunci jawaban kuis

Buka menu **Alat › Lindungi jawaban kuis** di Slak Studio, tulis jawaban yang benar (satu per baris bila ada beberapa), lalu sisipkan kodenya. Hasilnya kira-kira seperti ini:

```slak
const KUNCI_1 = "sq1$94d63156$m6YDhKYmnlCRaoYjA4ZDce7v"
const jawaban = sl.text_input("Provinsi paling timur di Indonesia?")
if (jawaban) {
  if (sl.crypto.quiz_check(jawaban, KUNCI_1)) sl.success("Benar!")
  else sl.error("Belum tepat, coba lagi.")
}
```

Huruf besar/kecil, spasi berlebih, dan titik di akhir diabaikan. Jawaban aslinya tidak ada di kode.

**Batasnya:** kode ini menyembunyikan jawaban dari mata, bukan dari tebakan. Pertanyaan pilihan ganda A–D tetap mudah ditebak walaupun kuncinya disembunyikan, jadi gunakan pertanyaan isian. Pemeriksaan jawaban yang benar-benar aman butuh server, dan tersedia sejak Slak 1.7 lewat slak-bridge (Bab 39).

## 26.2 Password

```slak tanpa-jalan
const hash = await sl.crypto.hash_password("rahasia123")     // simpan hash, bukan passwordnya
const cocok = await sl.crypto.verify_password(input, hash)   // true atau false
```

Hasilnya bcrypt berformat `$2y$`, sama dengan `password_hash()` di PHP. Artinya, pengguna yang didaftarkan di Slak bisa langsung masuk lewat PHP di hosting cPanel nanti (Slak 1.4 dan 1.6), dan sebaliknya.

## 26.3 Hash, enkripsi, dan pelengkap

| Fungsi                                                      | Kegunaan                                                                              |
|-------------------------------------------------------------|---------------------------------------------------------------------------------------|
| `md5`, `sha1`, `sha256`, `sha512`                           | Sidik jari data, misalnya untuk mendeteksi perubahan. MD5 sudah lemah untuk password. |
| `hmac(kunci, pesan)`                                        | Tanda tangan pesan                                                                    |
| `await encrypt(teks, sandi)` / `await decrypt(data, sandi)` | AES-256-GCM. Jangan menulis kata sandinya di halaman yang sama.                       |
| `random_token(16)`, `uuid()`                                | Kode acak, misalnya untuk kode undangan                                               |
| `base64(teks)`, `from_base64(teks)`                         | Mengubah teks ke Base64 dan sebaliknya                                                |

Semua hash ditulis murni dalam JavaScript, jadi tetap jalan saat halaman dibuka dengan klik dua kali. Enkripsi memakai Web Crypto bawaan browser, yang tersedia di halaman https://, localhost, dan berkas lokal.
