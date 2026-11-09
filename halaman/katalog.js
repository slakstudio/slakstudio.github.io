/* Katalog API: satu templat untuk semua fungsi, dari api/katalog.js (sama dengan Referensi di Slak Studio). */
(function () {
  const H = window.SITUS_HALAMAN = window.SITUS_HALAMAN || {};
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const css = `.sk-idx h4{margin:14px 0 6px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.sk-idx div{display:flex;flex-wrap:wrap;gap:6px}
.sk-idx a{font:13px var(--mono);padding:3px 8px;border:1px solid var(--line);border-radius:6px;color:var(--fg)!important;text-decoration:none!important}
.sk-idx a:hover,.sk-idx a.on{border-color:var(--accent);background:var(--accent-soft)}
.sk-sig{font:14px var(--mono);padding:10px 14px;border-radius:8px;background:var(--bg2);overflow-x:auto}`;
  if (!document.getElementById('situs-katalog-css')) { const st = document.createElement('style'); st.id = 'situs-katalog-css'; st.textContent = css; document.head.append(st); }
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('[data-api]');
    if (!a) return;
    e.preventDefault();
    window.SITUS_API = a.getAttribute('data-api');
    const b = document.querySelector('.slak-top button[title^="Jalankan ulang"]'); if (b) b.click();
    setTimeout(() => { const t = document.getElementById('fungsi'); if (t) t.scrollIntoView({ behavior: 'smooth' }); }, 250);
  });
  let muat = null;
  const muatKatalog = () => muat || (muat = window.SLAK_KATALOG ? Promise.resolve() : new Promise((ok, gagal) => {
    const s = document.createElement('script'); s.src = 'api/katalog.js'; s.onload = ok; s.onerror = () => gagal(new Error('api/katalog.js tidak bisa dimuat.')); document.head.append(s);
  }));
  const nama = e => (e.ns ? (e.ns === 'Slak' ? 'Slak.' : 'sl.' + e.ns + '.') : 'sl.') + e.n;

  H.katalog = async (sl) => {
    sl.title('Katalog API');
    sl.html('<span class="sd-mark sd-lead-m"></span>');
    sl.markdown('Semua fungsi Slak dengan contoh yang berjalan langsung di halaman ini. Isinya sama dengan panel **Referensi** (F1) di Slak Studio. Daftar nama yang dijamin stabil ada di API-STABIL.md.');
    try { await muatKatalog(); } catch (e) { sl.error(e.message); return; }
    const K = window.SLAK_KATALOG, ss = sl.session_state;
    if (window.SITUS_API) { ss.katalog_pilih = window.SITUS_API; window.SITUS_API = null; }
    const label = K.map(nama);
    if (!label.includes(ss.katalog_pilih)) ss.katalog_pilih = 'sl.slider';
    const pilih = sl.selectbox('Cari fungsi', label, { key: 'katalog_pilih', help: 'Ketik untuk mencari, misalnya slider, read_csv, atau groupby.' });
    const e = K[label.indexOf(pilih)] || K[0];

    sl.header(nama(e), { anchor: 'fungsi' });
    sl.caption(e.g);
    sl.html(`<div class="sk-sig">${esc(e.sig)}</div>`);
    sl.markdown(e.d || '');
    const kode = e.k || (e.s ? (/^\s*(await\s+)?(sl|Slak)\./.test(e.s) ? e.s : 'sl.' + e.s) : '');
    if (kode) await Slak.docs.markdown(sl, '```slak' + (e.online ? ' tanpa-jalan' : '') + '\n' + kode + '\n```', { tampilan: 'jernih' });
    if (e.online) sl.caption('Contoh ini butuh internet, jadi tidak dijalankan otomatis. Buka di Playground untuk mencobanya.');

    sl.header('Semua fungsi', { anchor: 'semua-fungsi' });
    const grup = new Map();
    for (const x of K) { if (!grup.has(x.g)) grup.set(x.g, []); grup.get(x.g).push(x); }
    sl.html(`<div class="sk-idx">${[...grup].map(([g, xs]) => `<h4>${esc(g)}</h4><div>${xs.map(x => `<a href="#/katalog" data-api="${esc(nama(x))}"${x === e ? ' class="on"' : ''}>${esc(nama(x))}</a>`).join('')}</div>`).join('')}</div>`);
  };
  H.cari = Object.assign(H.cari || {}, { katalog: 'Katalog API: semua fungsi sl dan Slak dengan contoh, tanda tangan, dan penjelasan. Referensi F1 Slak Studio.' });
})();
