// Zrzuty ekranów makiety głównej (/makieta/ = W1) — komputer i telefon 390 px, każdy ekran ścieżki.
// PLAYWRIGHT_CORE=… CHROMIUM=… node scripts/zrzuty-makiety.mjs [katalog wyjścia=docs/zrzuty/R2]
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
const { chromium } = await import(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const wyj = process.argv[2] || 'docs/zrzuty/R3';
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
  const start = async () => { await s.goto('http://localhost:4125/'); }; // każda ścieżka od stanu ze spec §3 (R2: 06/08 = 5,00 i 6,71)
  await start(); await zrzut('01-lista-osob');                                              // P16
  await s.click('.dzwonek'); await s.locator('.lista-przyp').waitFor(); await s.screenshot({ path: `${wyj}/${urz}-02-dzwonek-terminy.png` }); n++; await s.click('.dzwonek'); // P17: lista terminów widoczna
  await s.click('button[data-osoba="wisniewski"]'); await zrzut('03-ocena-wisniewski');       // P18, P19, uzasadnienie, IPRZ (T16)
  await s.click('button[data-popraw="termin"]'); await s.fill('dialog input[name=w]', '20.11.2026'); await zrzut('04-popraw-termin', 'dialog'); await s.click('dialog button[value=anuluj]');
  await s.click('button[data-idz="podsumowanie"]'); await s.locator('#podsumowanie').waitFor(); await zrzut('06-ostatni-krok-podsumowanie-wisniewski'); // P20, 5,00
  await s.click('button[data-idz="ocena"]'); await s.click('button[data-kryt="komunikacja"][data-ocena="9"]'); await s.locator('.reczne.zmiana').first().waitFor();
  await zrzut('05-ocena-9-ze-znaczkiem', '#ark');
  await s.click('button[data-idz="podsumowanie"]'); await zrzut('11-podsumowanie-po-zmianie-recznej');
  await start(); await s.click('button[data-osoba="bielecki"]'); await s.click('button[data-idz="podsumowanie"]'); await zrzut('08-ostatni-krok-podsumowanie-bielecki'); // 6,71, data wstępna
  await s.click('button[data-idz="ocena"]'); await s.click('button[data-kryt="negocjowanie"][data-ocena="9"]'); await s.locator('.reczne.zmiana').first().waitFor(); await zrzut('07-bielecki-ocena-9-ze-znaczkiem', '#ark');
  await s.click('button[data-idz="lista"]'); await s.click('button[data-osoba="lis"]'); await zrzut('12-lis-iprz-ostrzezenie', '#ark');
  await s.click('button[data-idz="lista"]'); await s.click('button[data-osoba="nowak"]'); await s.click('button[data-popraw="zatrudnienie"]'); await s.fill('dialog input[name=w]', '10.11.2026'); await s.fill('dialog input[name=p]', 'data z umowy'); await s.click('dialog button[value=ok]'); await zrzut('13-nowak-popraw-zatrudnienie'); // T17
  await s.click('.dzwonek'); await s.locator('.lista-przyp').waitFor(); await s.screenshot({ path: `${wyj}/${urz}-14-dzwonek-po-poprawie-nowak.png` }); n++; await s.click('.dzwonek'); // R3: dzwonek 10.12.2026
  await start(); await s.selectOption('#rola select', 'wisniewski'); await zrzut('09-pracownik-moja-ocena');
  await s.click('[data-potwierdz]'); await zrzut('10-pracownik-potwierdzono');
  await s.close();
}
await przegl.close(); srv.close();
console.log(`zrzuty: ${n} plików w ${wyj}`);
