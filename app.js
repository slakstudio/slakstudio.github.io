/* Situs resmi Slak (slak.studio, salinan resmi slakstudio.github.io).
 * Seluruh situs adalah satu aplikasi Slak: menu, alamat per halaman, pencarian, dan daftar isi
 * dari Slak.docs.site (slak-docs.js). Isi bab ada di konten/*.md, sumber yang sama dengan Buku Panduan Slak.
 * Mengubah satu bab cukup dengan mengedit berkas .md-nya, lalu (untuk klik dua kali) membungkusnya lagi
 * dengan Bungkus data di Slak Studio sehingga konten/bab-xx.md.js ikut diperbarui. */
(function () {
  const H = window.SITUS_HALAMAN || {};
  const web = /^https?:$/.test(location.protocol);
  const bab = (no, judul, url, deskripsi) => ({ judul, berkas: 'konten/bab-' + String(no).padStart(2, '0') + '.md', url, deskripsi, no });
  const md = (judul, berkas, url, deskripsi) => ({ judul, berkas: 'konten/' + berkas, url, deskripsi });
  const fn = (judul, nama, url, extra) => Object.assign({ judul, url, fungsi: (sl) => H[nama](sl), teks_cari: (H.cari || {})[nama] || '' }, extra || {});

  window.SITUS = {
    versi: 'Slak ' + (Slak.version || '1.9.1'),
    github: 'https://github.com/slakstudio',
    playground: web ? new URL('playground/', location.href).href : 'https://slak.studio/playground/'
  };

  Slak.run(async (sl) => {
    sl.set_page_config({ page_title: 'Slak', page_icon: 'ikon.svg', layout: 'centered' });
    await Slak.docs.site(sl, {
      tampilan: 'jernih',
      judul: 'Slak',
      versi: Slak.version,
      deskripsi: 'Slak: framework JavaScript ala Streamlit untuk aplikasi data yang berjalan sepenuhnya di browser. Tanpa server, tanpa build, gratis dengan lisensi MIT.',
      gambar: 'ikon-512.png',
      playground: window.SITUS.playground,
      sumber: 'https://github.com/slakstudio/slakstudio.github.io/blob/main/',
      menu: [
        { label: 'Dokumentasi', href: '#/mengenal-slak' },
        { label: 'Contoh', href: '#/galeri' },
        { label: 'Portofolio', href: '#/portofolio' },
        { label: 'Playground', href: 'playground/' },
        { label: 'Unduh', href: '#/unduh' },
        { label: 'GitHub', href: window.SITUS.github }
      ],
      kaki: 'Slak dan Slak Studio · Lisensi MIT · Situs ini dibuat dengan Slak · <a href="https://slak.studio">slak.studio</a> · salinan resmi <a href="https://slakstudio.github.io">slakstudio.github.io</a>',
      bab: {
        '': [
          fn('Slak', 'beranda', 'beranda', { polos: true })
        ],
        'Pengantar': [
          bab(1, 'Apa itu Slak?', 'mengenal-slak', 'Apa itu Slak, filosofi Write and Run, dan untuk siapa Slak dibuat.'),
          bab(2, 'Instalasi', 'instalasi', 'Memasang Slak di halaman web dan memasang Slak Studio.'),
          bab(3, 'Aplikasi pertama', 'aplikasi-pertama', 'Membuat kalkulator diskon dalam lima langkah.'),
          bab(21, 'Menerbitkan portofolio', 'portofolio-online', 'Mengonlinekan portofolio Data Analyst.'),
          bab(40, 'Terbit sekali klik dan PWA', 'terbit', 'Terbit ke GitHub Pages, Netlify, dan FTP, serta aplikasi yang bisa dipasang.'),
          bab(32, 'Seberapa jauh Slak bisa dipercaya', 'kepercayaan', 'Uji akurasi, batas ukuran data, dan catatan keamanan.'),
          bab(44, 'Versi stabil dan pindah versi', 'versi-stabil', 'Janji API stabil 1.9 dan cara pindah dari versi lama.')
        ],
        'Konsep': [
          bab(4, 'Konsep inti', 'konsep-inti', 'Jalan ulang, widget, session_state, key, callback, async, cache, stop dan rerun.'),
          bab(12, 'Multi-halaman', 'multi-halaman', 'Aplikasi dengan banyak halaman memakai sl.navigation.'),
          bab(13, 'Menyimpan data', 'menyimpan-data', 'local_state, sl.db, dan berkas.'),
          bab(24, 'Wadah interaktif', 'wadah-interaktif', 'Dialog, popover, fragment, dan status.'),
          bab(26, 'Melindungi jawaban', 'sl-crypto', 'Melindungi jawaban dan password dengan sl.crypto.'),
          bab(29, 'Emoji, login, dan dataset online', 'emoji-login', 'Emoji, sl.login, dan dataset online.'),
          bab(39, 'Berbagi lewat slak-bridge', 'berbagi-bridge', 'Berbagi, login, dan kuis lewat slak-bridge.'),
          bab(35, 'Menguji aplikasi', 'menguji-aplikasi', 'sl.testing dan paritas Streamlit.'),
          bab(36, 'Komponen kustom', 'komponen-kustom', 'Komponen kustom dua arah.'),
          bab(42, 'Kinerja dengan sl.worker', 'kinerja', 'sl.worker dan CSV besar.'),
          bab(43, 'Aksesibilitas', 'aksesibilitas', 'Aplikasi Slak yang bisa dipakai semua orang.'),
          bab(45, 'Situs dokumentasi', 'slak-docs', 'Membuat situs dokumentasi dengan slak-docs.js.')
        ],
        'Widget': [
          bab(25, 'Widget, tabel, dan grafik', 'widget-kaya', 'Widget, tabel, dan grafik yang lebih kaya.'),
          fn('Katalog API', 'katalog', 'katalog', { deskripsi: 'Semua fungsi Slak dengan contoh yang berjalan langsung.' })
        ],
        'Slak Data': [
          bab(14, 'DataFrame', 'dataframe', 'Slak Data: DataFrame bergaya pandas.'),
          bab(15, 'Mengolah data', 'mengolah-data', 'groupby, pivot, merge, dan deret waktu.'),
          bab(16, 'Grafik', 'grafik', 'Grafik untuk analis.'),
          bab(17, 'SQL di browser', 'sql', 'SQLite di browser.'),
          bab(27, 'SQL portabel PostgreSQL', 'sql-postgresql', 'SQL yang juga jalan di PostgreSQL.'),
          bab(18, 'Statistik', 'statistik', 'Uji hipotesis, uji A/B, dan regresi.'),
          bab(19, 'ML dan peramalan', 'ml', 'Machine learning, peramalan, dan analisis bisnis.'),
          bab(22, 'Peta', 'peta', 'Peta titik, choropleth, dan batas wilayah.'),
          bab(23, 'Tabel database', 'tabel-database', 'Tabel database yang bisa diedit.'),
          bab(28, 'Data besar dan berkas lokal', 'data-besar', 'Data besar dan berkas lokal.'),
          bab(31, 'DuckDB', 'duckdb', 'Data besar dengan DuckDB.'),
          bab(33, 'Database di server', 'database-server', 'slak-bridge dan Turso.'),
          bab(41, 'Google BigQuery', 'bigquery', 'Google BigQuery.'),
          bab(38, 'Laporan SQL dan mode sel', 'laporan-sql', 'Laporan SQL dan mode sel.'),
          bab(37, 'Templat dasbor', 'templat-dasbor', 'Coba model dan templat dasbor.')
        ],
        'Ke Python': [
          bab(20, 'Naik level ke Python', 'ke-python', 'Naik level ke Python.'),
          bab(34, 'Pintu masuk ke Python', 'pintu-python', 'Slak sebagai pintu masuk ke Python.')
        ],
        'Slak Studio': [
          bab(5, 'Mengenal Slak Studio', 'slak-studio', 'Antarmuka Slak Studio.'),
          bab(6, 'Berkas', 'berkas-studio', 'Berkas di Slak Studio.'),
          bab(7, 'Editor', 'editor', 'Menulis kode di editor.'),
          bab(8, 'Belajar dengan playground', 'belajar', 'Belajar dengan playground.'),
          bab(30, 'Jendela Database', 'jendela-database', 'Jendela Database di Slak Studio.')
        ],
        'Referensi': [
          bab(9, 'Referensi API', 'referensi-api', 'Referensi API Slak.'),
          bab(10, 'Resep dan proyek', 'resep', 'Resep dan proyek.'),
          bab(11, 'Pemecahan masalah', 'pemecahan-masalah', 'Pemecahan masalah.'),
          md('Lampiran', 'lampiran.md', 'lampiran', 'Pintasan keyboard, perbedaan dengan Streamlit, padanan pandas dan Excel.'),
          md('Riwayat versi', 'riwayat.md', 'riwayat', 'Riwayat Slak 1.0 sampai 1.9.1.'),
          md('Kebijakan versi', 'kebijakan-versi.md', 'kebijakan-versi', 'Kebijakan versi dan API stabil.')
        ],
        'Proyek': [
          fn('Galeri contoh', 'galeri', 'galeri', { deskripsi: 'Contoh aplikasi Slak yang berjalan langsung.' }),
          fn('Portofolio', 'portofolio', 'portofolio', { deskripsi: 'Portofolio analis data yang dibuat dengan Slak.' }),
          fn('Unduh', 'unduh', 'unduh', { deskripsi: 'Unduh slak.js, Slak Studio, dan buku panduan.' }),
          fn('Lisensi', 'lisensi', 'lisensi', { deskripsi: 'Lisensi MIT dan daftar pustaka pihak ketiga.' }),
          md('Berkontribusi', 'berkontribusi.md', 'berkontribusi', 'Cara melapor galat dan ikut mengembangkan Slak.')
        ]
      }
    });
  });
})();
