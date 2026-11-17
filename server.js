// Uygulamanın içinde, yalnızca bu bilgisayardan erişilebilen küçük bir dosya sunucusu.
// İnternet kullanmaz. Pencere, dosyaları http://127.0.0.1:<port>/ üzerinden okur.
const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.wasm': 'application/wasm',
  '.gz': 'application/octet-stream', '.png': 'image/png', '.ttf': 'font/ttf'
};
const FONTLAR = [
  'C:\\Windows\\Fonts\\arial.ttf',
  '/System/Library/Fonts/Supplemental/Arial.ttf',
  '/Library/Fonts/Arial.ttf',
  '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
];

function baslat(kok) {
  const kokDuz = path.resolve(kok);
  return new Promise((resolve, reject) => {
    const sunucu = http.createServer((req, rsp) => {
      let yol;
      try { yol = decodeURIComponent(req.url.split('?')[0]); } catch (e) { rsp.writeHead(400); return rsp.end(); }
      if (yol === '/') yol = '/index.html';

      let dosya;
      if (yol === '/font.ttf') {
        dosya = FONTLAR.find(f => fs.existsSync(f));
      } else {
        const aday = path.resolve(kokDuz, '.' + yol);
        if (aday === kokDuz || aday.startsWith(kokDuz + path.sep)) dosya = aday;
      }
      if (!dosya) { rsp.writeHead(404); return rsp.end('Bulunamadi'); }

      const oku = fs.createReadStream(dosya);
      oku.on('open', () => {
        rsp.writeHead(200, {
          'Content-Type': MIME[path.extname(dosya).toLowerCase()] || 'application/octet-stream',
          'Cache-Control': 'no-store'
        });
        oku.pipe(rsp);
      });
      oku.on('error', () => { if (!rsp.headersSent) rsp.writeHead(404); rsp.end('Bulunamadi'); });
    });
    sunucu.on('error', reject);
    sunucu.listen(0, '127.0.0.1', () => resolve(sunucu));
  });
}
module.exports = { baslat };
