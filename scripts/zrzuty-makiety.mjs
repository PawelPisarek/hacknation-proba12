// Zrzuty ekranów makiety głównej (/makieta/ = W1) — komputer i telefon 390 px, każdy ekran ścieżki.
// PLAYWRIGHT_CORE=… CHROMIUM=… node scripts/zrzuty-makiety.mjs [katalog wyjścia=docs/zrzuty/R1]
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
const { chromium } = await import(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const wyj = process.argv[2] || 'docs/zrzuty/R1';
await mkdir(wyj, { recursive: true });
const typy = { '.html': 'text/html', '.mjs': 'text/javascript', '.css': 'text/css' };
const srv = createServer(async (q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  try { const t = await readFile(join('makieta', p)); r.writeHead(200, { 'content-type': typy[extname(p)] || 'text/plain' }); r.end(t); } catch { r.writeHead(404); r.end(); }
}).listen(4125);
const przegl = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
let n = 0;
for (const [urz, vp] of [['komputer', { width: 1280, height: 900 }], ['telefon', { width: 390, height: 844 }]]) {
  const s = await przegl.newPage({ viewport: vp });
  const zrzut = async (nazwa, cel) => { const path = `${wyj}/${urz}-${nazwa}.png`; await (cel ? s.locator(cel).first().screenshot({ path }) : s.screenshot({ path, fullPage: true })); n++; };
  await s.goto('http://localhost:4125/');
  await zrzut('01-start-ocena-wisniewski');
  await s.click('#wybierz'); await zrzut('02-wybor-pracownika', 'dialog'); await s.click('dialog [data-zamknij]');
  await s.click('.dzwonek'); await zrzut('03-przypomnienia', 'header'); await s.click('.dzwonek');
  await s.click('button[data-popraw="termin"]'); await s.fill('dialog input[name=w]', '20.11.2026'); await zrzut('04-popraw-termin', 'dialog'); await s.click('dialog button[value=ok]');
  await s.click('button[data-kryt="rzetelność"][data-ocena="3"]'); await zrzut('05-po-zmianie-oceny-pozytywna');
  await s.click('button[data-kryt="komunikacja"][data-ocena="9"]'); await zrzut('06-ocena-9-ze-znaczkiem-arkusz', '#ark');
  await s.click('#wybierz'); await s.click('dialog button[data-id="bielecki"]'); await s.click('button[data-kryt="negocjowanie"][data-ocena="9"]');
  await zrzut('07-bielecki-ocena-9-ze-znaczkiem', '#ark');
  await s.selectOption('#rola select', 'wisniewski'); await zrzut('08-pracownik-moja-ocena');
  await s.click('[data-potwierdz]'); await zrzut('09-pracownik-potwierdzono');
  await s.close();
}
await przegl.close(); srv.close();
console.log(`zrzuty: ${n} plików w ${wyj}`);
