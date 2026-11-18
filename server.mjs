// Prosty serwer statyczny (MVP: tu dojdzie API). Port 3000.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const typy = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };
const PORT = process.env.PORT || 3000;
createServer(async (req, res) => {
  const sciezka = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  if (sciezka === '/api/zdrowie') { res.writeHead(200, { 'content-type': typy['.json'] }); return res.end('{"ok":true}'); }
  const plik = join('app', sciezka.endsWith('/') ? sciezka + 'index.html' : sciezka);
  try { const t = await readFile(plik); res.writeHead(200, { 'content-type': typy[extname(plik)] || 'application/octet-stream' }); res.end(t); }
  catch { res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }); res.end('Nie znaleziono'); }
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
