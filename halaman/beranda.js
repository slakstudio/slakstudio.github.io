/* Beranda situs Slak. Ditulis dengan sl.*; contoh kalkulator di bawah berjalan langsung. */
(function () {
  const H = window.SITUS_HALAMAN = window.SITUS_HALAMAN || {};
  const css = `.sb-hero{display:flex;flex-direction:column;gap:18px;padding:12px 0 8px}
.sb-hero h1{margin:0;font-size:46px;line-height:1.1;letter-spacing:-.025em}
.sb-hero p{margin:0;font-size:19px;line-height:1.6;color:var(--sd-lead)}
.sb-btns{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.sb-btn{display:inline-flex;align-items:center;min-height:44px;padding:0 18px;border-radius:8px;font-weight:600;font-size:15px;text-decoration:none!important;border:1px solid var(--line2);color:var(--fg)!important;background:var(--panel)}
.sb-btn.utama{background:var(--accent);border-color:var(--accent);color:var(--accent-fg)!important}
.sb-btn:hover{border-color:var(--accent)}
.sb-link{font-weight:600;color:var(--accent-ink)!important;text-decoration:none}
.sb-h2{margin:30px 0 0;font-size:26px;letter-spacing:-.01em}
.sb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}
.sb-kartu{display:flex;flex-direction:column;gap:6px;padding:16px 18px;border:1px solid var(--line);border-radius:10px;background:var(--panel);color:var(--fg)!important;text-decoration:none!important}
a.sb-kartu:hover{border-color:var(--accent)}
.sb-kartu b{font-size:16px}.sb-kartu span{font-size:14px;line-height:1.55;color:var(--sd-lead)}
.sb-kartu i{font-style:normal;font-size:26px;line-height:1}
.sb-studio{display:flex;flex-direction:column;gap:12px;padding:22px 24px;border-radius:12px;background:var(--accent-soft)}
.sb-studio h2{margin:0;font-size:24px}.sb-studio p{margin:0;color:var(--sd-note)}
@media (max-width:900px){.sb-hero h1{font-size:34px}}`;
  function gaya() {
    if (document.getElementById('situs-beranda-css')) return;
    const st = document.createElement('style'); st.id = 'situs-beranda-css'; st.textContent = css; document.head.append(st);
  }
  const DEMO = '```slak\nsl.subheader("Kalkulator diskon")\nconst harga = sl.number_input("Harga", { value: 250000, step: 10000 })\nconst persen = sl.slider("Diskon (%)", 0, 50, 20)\nsl.metric("Bayar", harga * (1 - persen / 100))\n```';
  const FITUR = [
    ['🐼', 'Olah data seperti pandas', 'DataFrame, groupby, pivot, dan merge dalam JavaScript, dengan hasil statistik yang diuji terhadap pandas, scipy, dan scikit-learn.', '#/dataframe'],
    ['🗄️', 'SQL tanpa server', 'SQLite dan DuckDB berjalan di browser. Saat siap, sambungkan ke MariaDB atau PostgreSQL lewat slak-bridge.', '#/sql'],
    ['🗺️', 'Grafik, peta, dan model', 'Grafik siap pakai, peta provinsi yang tetap jalan tanpa internet, uji hipotesis, regresi, dan peramalan.', '#/grafik'],
    ['🚀', 'Terbit di mana saja', 'Unggah folder ke cPanel, GitHub Pages, atau Netlify. Bisa juga dibuka dengan klik dua kali, tanpa internet.', '#/terbit']
  ];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  H.beranda = async (sl) => {
    gaya();
    const S = window.SITUS || {};
    sl.html(`<section class="sb-hero">
<h1>Tulis, simpan, klik. Aplikasi data langsung jalan di browser.</h1>
<p>Slak adalah framework JavaScript ala Streamlit untuk analis data pemula hingga menengah. Tanpa server, tanpa build: cukup satu berkas <code>slak.js</code>. Gratis dan open-source dengan lisensi MIT.</p>
<div class="sb-btns"><a class="sb-btn utama" href="#/mengenal-slak">Mulai belajar</a><a class="sb-btn" href="#/unduh">Unduh ${esc(S.versi || 'Slak')}</a><a class="sb-link" href="playground/">Coba di Playground →</a></div>
</section>`);
    await Slak.docs.markdown(sl, DEMO, { tampilan: 'jernih' });
    sl.html(`<h2 class="sb-h2">Dibuat dengan Slak</h2>`);
    const pilihan = (window.SLAK_EXAMPLES || []).filter(e => ['tabungan', 'portofolio_profil', 'dasbor_duckdb', 'kuis_interaktif'].includes(e.id));
    sl.html(`<div class="sb-grid">${pilihan.map(e => `<a class="sb-kartu" href="#/galeri" data-contoh="${esc(e.id)}"><i>${esc(e.ikon || '')}</i><b>${esc(e.judul)}</b><span>${esc(e.ringkas || '')}</span></a>`).join('')}</div>
<p><a class="sb-link" href="#/galeri">Lihat galeri contoh →</a></p>`);
    sl.html(`<h2 class="sb-h2">Yang bisa dikerjakan</h2><div class="sb-grid">${FITUR.map(f => `<a class="sb-kartu" href="${f[3]}"><i>${f[0]}</i><b>${esc(f[1])}</b><span>${esc(f[2])}</span></a>`).join('')}</div>`);
    sl.html(`<section class="sb-studio"><h2>Slak Studio</h2><p>Editor dengan pratinjau langsung, 49 pelajaran bertahap, galeri contoh, dan jendela Database untuk SQLite, PostgreSQL, MySQL, MariaDB, SQL Server, dan DuckDB.</p>
<div class="sb-btns"><a class="sb-btn utama" href="#/unduh">Unduh untuk Windows</a><a class="sb-btn" href="playground/">Buka versi web</a></div></section>`);
  };
  H.cari = Object.assign(H.cari || {}, { beranda: 'Slak framework JavaScript ala Streamlit, tanpa server, tanpa build, Slak Studio, unduh' });
})();
