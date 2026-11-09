/* Halaman Proyek: Portofolio, Unduh, dan Lisensi. */
(function () {
  const H = window.SITUS_HALAMAN = window.SITUS_HALAMAN || {};
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const lead = (sl, teks) => { sl.html('<span class="sd-mark sd-lead-m"></span>'); sl.markdown(teks); };

  /* ---------- Portofolio ---------- */
  const PORTOFOLIO = ['portofolio_penjualan', 'templat_dasbor_penjualan', 'templat_dasbor_pelanggan', 'templat_dasbor_sdm', 'portofolio_profil'];
  H.portofolio = async (sl) => {
    sl.title('Portofolio');
    lead(sl, 'Etalase portofolio analis data yang dibuat dengan Slak. Setiap contoh bisa dibuka di Playground, diubah dengan datamu sendiri, lalu diterbitkan ke cPanel, GitHub Pages, atau Netlify (lihat [Menerbitkan portofolio](#/portofolio-online)).');
    const E = (window.SLAK_EXAMPLES || []).filter(e => PORTOFOLIO.includes(e.id)).sort((a, b) => PORTOFOLIO.indexOf(a.id) - PORTOFOLIO.indexOf(b.id));
    for (const e of E) {
      const box = sl.container({ border: true });
      box.subheader(`${e.ikon || ''} ${e.judul}`);
      box.write(e.ringkas || '');
      const pg = await Slak.share.link(e.kode, (window.SITUS || {}).playground);
      box.html(`<div class="sg-aksi"><a class="utama" href="#/galeri" data-contoh="${esc(e.id)}">Lihat langsung</a><a href="${esc(pg)}" target="_blank" rel="noopener">Buka di Playground</a></div>`);
    }
    sl.info('Saat peluncuran, etalase ini hanya berisi contoh resmi. Kiriman portofolio dari pengguna akan dibuka lewat formulir issue di GitHub yang berisi tautan saja.');
  };

  /* ---------- Unduh ---------- */
  // Unggahan besar ada di GitHub Releases. Bila daftar rilis tidak bisa dibaca (misalnya tanpa internet), dipakai daftar cadangan ini.
  const RILIS_REPO = 'slakstudio/slak';
  const CADANGAN = {
    versi: '1.9.1', tanggal: '4 November 2026',
    berkas: [
      { nama: 'slak-1.9.1.zip', isi: 'Paket Slak: slak.js, tambahan (data, SQL, peta, DuckDB, komponen, docs), contoh, playground, dan situs contoh.' },
      { nama: 'SlakStudio-1.9.1-Windows-x64.zip', isi: 'Slak Studio untuk Windows 10/11 64-bit. Ekstrak, lalu jalankan Slak Studio.exe.' },
      { nama: 'slak-studio-1.9.1-source.zip', isi: 'Kode sumber Slak Studio, untuk macOS dan Linux (jalankan dengan Node.js).' },
      { nama: 'Buku-Panduan-Slak-1.9.1.pdf', isi: 'Buku Panduan Slak edisi lengkap 45 bab, untuk dibaca tanpa internet atau dicetak.' }
    ]
  };
  const ukuran = b => b > 1048576 ? (b / 1048576).toFixed(1).replace('.', ',') + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
  async function rilisTerbaru() {
    try {
      const r = await fetch(`https://api.github.com/repos/${RILIS_REPO}/releases/latest`, { headers: { Accept: 'application/vnd.github+json' } });
      if (!r.ok) return null;
      const j = await r.json();
      return { versi: String(j.tag_name || '').replace(/^v/, ''), tanggal: (j.published_at || '').slice(0, 10), url: j.html_url, berkas: (j.assets || []).map(a => ({ nama: a.name, url: a.browser_download_url, ukuran: a.size })) };
    } catch (e) { return null; }
  }
  H.unduh = async (sl) => {
    sl.title('Unduh Slak');
    lead(sl, `Versi terbaru adalah **Slak ${esc(Slak.version)}**, versi stabil jangka panjang yang menerima perbaikan galat sampai Slak 2.0 dan paling sedikit enam bulan sesudahnya. Slak dan Slak Studio gratis dengan lisensi MIT, boleh dipakai untuk proyek pribadi maupun komersial.`);
    sl.header('slak.js saja', { anchor: 'slak-js' });
    sl.markdown('Satu berkas JavaScript untuk semua sistem operasi. Taruh di samping berkas HTML-mu, lalu buka dengan klik dua kali. Klik kanan pada tautan lalu pilih **Simpan tautan sebagai**.');
    sl.html(`<div class="sg-aksi"><a class="utama" href="slak.js" download>Unduh slak.js</a><a href="slak-data.js" download>slak-data.js</a><a href="slak-sql.js" download>slak-sql.js</a><a href="slak-peta.js" download>slak-peta.js</a><a href="slak-docs.js" download>slak-docs.js</a></div>`);

    sl.header('Paket, Slak Studio, dan buku', { anchor: 'paket' });
    const st = sl.empty();
    st.caption('Membaca daftar rilis dari GitHub…');
    const R = await rilisTerbaru();
    st.empty();
    const rel = R || { versi: CADANGAN.versi, tanggal: CADANGAN.tanggal, url: `https://github.com/${RILIS_REPO}/releases`, berkas: [] };
    const byName = new Map((R ? R.berkas : []).map(b => [b.nama, b]));
    const daftar = CADANGAN.berkas.map(b => Object.assign({}, b, byName.get(b.nama.replace(CADANGAN.versi, rel.versi)) || {}));
    for (const b of (R ? R.berkas : [])) if (!daftar.some(d => d.nama === b.nama)) daftar.push(b);
    for (const b of daftar) {
      const box = sl.container({ border: true });
      box.markdown(`**${b.nama}**${b.ukuran ? ' · ' + ukuran(b.ukuran) : ''}`);
      if (b.isi) box.caption(b.isi);
      box.html(`<div class="sg-aksi"><a class="utama" href="${esc(b.url || rel.url)}" target="_blank" rel="noopener">${b.url ? 'Unduh' : 'Buka GitHub Releases'}</a></div>`);
    }
    sl.caption(R ? `Rilis ${rel.versi} (${rel.tanggal}) dari GitHub Releases. Checksum SHA-256 ada di catatan rilis.` : 'Daftar rilis dari GitHub belum bisa dibaca, jadi yang tampil adalah daftar cadangan di situs ini.');
    sl.warning('Windows bisa menampilkan peringatan SmartScreen karena Slak Studio belum bertanda tangan digital. Klik **Info selengkapnya**, lalu **Tetap jalankan**.');

    sl.header('Mulai dalam tiga langkah', { anchor: 'mulai' });
    sl.markdown('1. Buat folder, lalu simpan `slak.js` di dalamnya.\n2. Buat berkas `index.html` berisi kode di bawah.\n3. Klik dua kali `index.html`. Aplikasimu terbuka di browser.');
    sl.code('<!doctype html>\n<script src="slak.js"></' + 'script>\n<script type="text/slak">\nsl.title("Halo, Slak")\nsl.write("Aplikasi pertamaku berjalan tanpa server.")\n</' + 'script>', { language: 'html' });
    sl.markdown(`Versi lama dan catatan rilis ada di [GitHub Releases](https://github.com/${RILIS_REPO}/releases) dan [Riwayat versi](#/riwayat).`);
  };

  /* ---------- Lisensi ---------- */
  async function teks(nama) {
    const b = await Slak.load_file(nama, { pick: false });
    return new TextDecoder().decode(b);
  }
  H.lisensi = async (sl) => {
    sl.title('Lisensi');
    lead(sl, 'Slak dan Slak Studio berlisensi **MIT**: bebas dipakai, diubah, dan dibagikan, termasuk untuk tujuan komersial, tanpa membayar. Semua pustaka pihak ketiga yang ikut dibagikan juga berlisensi terbuka dan boleh dipakai komersial.');
    sl.header('Lisensi MIT', { anchor: 'mit' });
    try { sl.code(await teks('konten/lisensi-mit.txt'), { language: 'text', wrap_lines: true }); }
    catch (e) { sl.markdown('Teks lisensi ada di berkas `LICENSE` di paket Slak.'); }
    sl.header('Pustaka pihak ketiga', { anchor: 'pihak-ketiga' });
    try { await Slak.docs.markdown(sl, (await teks('konten/daftar-lisensi.md')).replace(/^# .*\n/, ''), { playground: false }); }
    catch (e) { sl.markdown('Daftar lengkap ada di berkas `DAFTAR-LISENSI.md` di paket Slak.'); }
  };

  H.cari = Object.assign(H.cari || {}, {
    portofolio: 'Portofolio analis data, templat dasbor penjualan, pelanggan dan churn, SDM, templat profil',
    unduh: 'Unduh slak.js, paket Slak, Slak Studio Windows, kode sumber, Buku Panduan PDF, GitHub Releases, SmartScreen',
    lisensi: 'Lisensi MIT, pustaka pihak ketiga, DAFTAR-LISENSI, komersial'
  });
})();
