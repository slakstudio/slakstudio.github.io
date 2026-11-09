/* Service worker situs Slak (Slak 1.8; 1.9.1: playground di folder playground/; situs Jernih: bab dari konten/): situs dan playground tetap terbuka tanpa internet.
 * Berkas inti disimpan saat dipasang; berkas lain (contoh, peta dunia, pustaka dari internet) disimpan saat pertama dibuka.
 * Ganti VERSI setiap kali isi situs diperbarui. */
const VERSI = 'slak-situs-2026-11-09b';
const LUAR = 'slak-situs-luar';
const INTI = ['./', 'index.html', 'playground/', 'playground/index.html', 'slak.js', 'slak-data.js', 'slak-sql.js', 'slak-komponen.js', 'slak-peta.js',
  'slak-docs.js', 'app.js', 'contoh/galeri.js', 'halaman/beranda.js', 'halaman/galeri.js', 'halaman/proyek.js', 'halaman/katalog.js',
  'manifest.webmanifest', 'ikon.svg', 'ikon-32.png', 'ikon-192.png', 'ikon-512.png', 'apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSI).then(c => c.addAll(INTI)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('slak-situs-') && k !== VERSI && k !== LUAR).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    e.respondWith(caches.open(VERSI).then(c => c.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => { if (res && res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
  } else if (url.protocol === 'https:' && url.hostname !== 'api.github.com') {
    e.respondWith(caches.open(LUAR).then(c => c.match(req).then(hit => hit || fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()); return res; }))));
  }
});
