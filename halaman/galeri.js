/* Galeri contoh: setiap contoh berjalan di bingkai (contoh/lihat.html) agar tidak mengganggu situs. */
(function () {
  const H = window.SITUS_HALAMAN = window.SITUS_HALAMAN || {};
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const css = `.sg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}
.sg-k{display:flex;flex-direction:column;gap:4px;padding:14px 16px;border:1px solid var(--line);border-radius:10px;background:var(--panel);color:var(--fg)!important;text-decoration:none!important;cursor:pointer}
.sg-k:hover,.sg-k.on{border-color:var(--accent)}.sg-k.on{background:var(--accent-soft)}
.sg-k i{font-style:normal;font-size:24px;line-height:1.1}.sg-k b{font-size:15px}.sg-k span{font-size:13.5px;line-height:1.5;color:var(--sd-lead)}
.sg-aksi{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.sg-aksi a{display:inline-flex;align-items:center;min-height:38px;padding:0 14px;border-radius:8px;font-weight:600;font-size:14px;text-decoration:none!important;border:1px solid var(--line2);color:var(--fg)!important}
.sg-aksi a.utama{background:var(--accent);border-color:var(--accent);color:var(--accent-fg)!important}
.sd-jernih .slak-iframe-wrap iframe{border:1px solid var(--line);border-radius:10px;background:#fff}`;
  // Kartu di Beranda (data-contoh) memilih contoh yang tampil saat Galeri dibuka.
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('[data-contoh]');
    if (!a) return;
    window.SITUS_PILIH = a.getAttribute('data-contoh');
    if (a.hasAttribute('data-sini')) { e.preventDefault(); const b = document.querySelector('.slak-top button[title^="Jalankan ulang"]'); if (b) b.click(); setTimeout(() => { const t = document.getElementById('contoh-terpilih'); if (t) t.scrollIntoView({ behavior: 'smooth' }); }, 250); }
  });

  if (!document.getElementById('situs-galeri-css')) { const st = document.createElement('style'); st.id = 'situs-galeri-css'; st.textContent = css; document.head.append(st); }

  H.galeri = async (sl) => {
    const E = window.SLAK_EXAMPLES || [];
    const ss = sl.session_state;
    if (window.SITUS_PILIH) { ss.galeri_pilih = window.SITUS_PILIH; window.SITUS_PILIH = null; }
    if (!E.some(e => e.id === ss.galeri_pilih)) ss.galeri_pilih = 'portofolio_penjualan';
    const c = E.find(e => e.id === ss.galeri_pilih) || E[0];

    sl.title('Galeri contoh');
    sl.html('<span class="sd-mark sd-lead-m"></span>');
    sl.markdown('Setiap contoh berjalan langsung di halaman ini. Buka di Playground untuk mengubah kodenya. Semua contoh ini juga ada di menu **Contoh** Slak Studio.');
    if (!c) { sl.warning('Daftar contoh (contoh/galeri.js) tidak termuat.'); return; }

    sl.header(`${c.ikon || ''} ${c.judul}`, { anchor: 'contoh-terpilih' });
    sl.caption(c.ringkas || '');
    const hash = await Slak.share.encode(c.kode);
    const pg = await Slak.share.link(c.kode, (window.SITUS || {}).playground);
    sl.html(`<div class="sg-aksi"><a class="utama" href="${esc(pg)}" target="_blank" rel="noopener">Buka di Playground</a><a href="contoh/lihat.html?c=${esc(c.id)}#${esc(hash)}" target="_blank" rel="noopener">Buka di tab baru</a></div>`);
    sl.iframe(`contoh/lihat.html?c=${encodeURIComponent(c.id)}#${hash}`, { height: 620 });
    sl.expander('Lihat kode').code(c.kode, { language: 'javascript' });

    sl.header('Semua contoh', { anchor: 'semua-contoh' });
    sl.html(`<div class="sg-grid">${E.map(e => `<a class="sg-k${e.id === c.id ? ' on' : ''}" href="#/galeri" data-contoh="${esc(e.id)}" data-sini><i>${esc(e.ikon || '')}</i><b>${esc(e.judul)}</b><span>${esc(e.ringkas || '')}</span></a>`).join('')}</div>`);
  };
  H.cari = Object.assign(H.cari || {}, { galeri: 'Galeri contoh: ' + (window.SLAK_EXAMPLES || []).map(e => e.judul + ' ' + (e.ringkas || '')).join('. ') });
})();
