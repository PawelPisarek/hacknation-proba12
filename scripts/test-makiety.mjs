// Test klikania 3 makiet wariantów (ścieżki demo z docs/pm/03a-warianty.md). Wymaga playwright-core i chromium:
// PLAYWRIGHT_CORE=/ścieżka/playwright-core/index.mjs CHROMIUM=/ścieżka/chrome node scripts/test-makiety.mjs [katalog=makieta]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
const { chromium } = await import(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const kat = process.argv[2] || 'makieta';
const typy = { '.html': 'text/html', '.mjs': 'text/javascript', '.js': 'text/javascript', '.css': 'text/css' };
const srv = createServer(async (q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  try { const t = await readFile(join(kat, p)); r.writeHead(200, { 'content-type': typy[extname(p)] || 'text/plain' }); r.end(t); } catch { r.writeHead(404); r.end(); }
}).listen(4123);
const przegl = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
let ok = 0, zle = 0; const t = (n, w) => { if (w) ok++; else { zle++; console.error('BŁĄD:', n); } };
const u = 'http://localhost:4123/';
for (const [nazwa, vp] of [['komputer', { width: 1280, height: 900 }], ['telefon', { width: 390, height: 844 }]]) {
  const s = await przegl.newPage({ viewport: vp }); const bledy = []; s.on('pageerror', (e) => bledy.push(e.message));
  const widac = (sel) => s.locator(sel).first().waitFor({ timeout: 3000 }).then(() => true, () => false);
  // Makieta główna (/makieta/ = W1, P14): start + usterka R1 — wiersz z oceną 9 i znaczkiem w jednej linii
  await s.goto(u); t(`${nazwa} M start`, (await s.textContent('header')).includes('Asystent ocen okresowych — makieta') && (await s.textContent('h2')).includes('Wiśniewski'));
  for (const [kto, kr] of [[null, 'komunikacja'], ['bielecki', 'negocjowanie']]) {
    if (kto) { await s.click('#wybierz'); await s.click(`dialog button[data-id="${kto}"]`); }
    const wiersz = () => s.locator(`tr:has(button[data-kryt="${kr}"])`);
    const przed = (await wiersz().boundingBox()).height;
    await s.click(`button[data-kryt="${kr}"][data-ocena="9"]`);
    const po = await wiersz().evaluate((tr) => { const z = tr.querySelector('.reczne'); const b = [...tr.querySelectorAll('.skala button')].map((x) => x.getBoundingClientRect().top);
      return { h: tr.getBoundingClientRect().height, znak: !!z && z.getClientRects().length === 1 && z.getBoundingClientRect().height < 24, przyciski: Math.max(...b) - Math.min(...b) < 2, szer: tr.getBoundingClientRect().right <= document.documentElement.clientWidth }; });
    t(`${nazwa} M ${kr}=9: znaczek w jednej linii`, po.znak); t(`${nazwa} M ${kr}=9: przyciski w jednym rzędzie`, po.przyciski && po.szer);
    t(`${nazwa} M ${kr}=9: wiersz nie urósł (${przed}→${po.h})`, po.h <= przed + 1);
  }
  if (nazwa === 'komputer') { const luka = await s.evaluate(() => Math.min(...[...document.querySelectorAll('.tab-ark tbody tr')].map((tr) => { const td = tr.cells[0]; const r = document.createRange(); r.selectNodeContents(td); return tr.querySelector('.skala').getBoundingClientRect().left - Math.max(...[...r.getClientRects()].map((x) => x.right)); })));
    t(`komputer M odstęp tekst→przyciski ${Math.round(luka)}px ≤ 120`, luka <= 120); }
  // W1: Wiśniewski → 1 na 3 → popraw termin → wybór → pracownik → potwierdzenie → dzwonek
  await s.goto(u + 'warianty/1/'); t(`${nazwa} W1 start Wiśniewski`, (await s.textContent('h2')).includes('Wiśniewski'));
  t(`${nazwa} W1 reguła 1`, await widac('text=Jedna ocena „1” = ocena negatywna'));
  t(`${nazwa} W1 podpowiedź AI (uzasadnienie)`, (await s.$$('.ai')).length >= 2);
  await s.click('button[data-kryt="rzetelność"][data-ocena="3"]'); t(`${nazwa} W1 po zmianie pozytywna`, await widac('.wynik .pozytywna'));
  await s.click('button[data-popraw="termin"]'); await s.fill('dialog input[name=w]', '20.11.2026'); await s.click('dialog button[value=ok]');
  t(`${nazwa} W1 ustawione ręcznie`, await widac('.reczne'));
  await s.click('#wybierz'); await s.click('dialog button[data-id="bielecki"]'); t(`${nazwa} W1 wybór`, (await s.textContent('h2')).includes('Bielecki'));
  await s.selectOption('#rola select', 'wisniewski'); t(`${nazwa} W1 moja ocena`, (await s.textContent('h2')).includes('Moja ocena'));
  t(`${nazwa} W1 poprzednia ocena`, await widac('text=Poprzednia ocena:'));
  await s.click('[data-potwierdz]'); t(`${nazwa} W1 potwierdzono`, await widac('.potw'));
  await s.click('.dzwonek'); t(`${nazwa} W1 przypomnienia 5`, (await s.$$('.przyp')).length === 5);
  // W2: kolejka → Wiśniewski → etapy → arkusz → dodatkowe (max 3) → kalendarz → pracownik
  await s.goto(u + 'warianty/2/'); t(`${nazwa} W2 kolejność`, (await s.textContent('tbody tr:first-child strong')).includes('Wiśniewski'));
  t(`${nazwa} W2 kolumna poprzednia`, await widac('th:has-text("Poprzednia ocena")'));
  await s.click('button[data-osoba="wisniewski"]'); t(`${nazwa} W2 oś etapów`, (await s.$$('.os li')).length === 5);
  await s.click('button[data-ekran="arkusz"]'); t(`${nazwa} W2 arkusz negatywna przez 1`, await widac('text=Jedna ocena „1” = ocena negatywna'));
  for (const k of ['kreatywność', 'negocjowanie', 'myślenie analityczne', 'zarządzanie ludźmi']) { const l = s.locator(`input[data-dod="${k}"]`); if (await l.isEnabled()) await l.click(); }
  t(`${nazwa} W2 max 3 dodatkowe`, (await s.$$('input[data-dod]:checked')).length === 3);
  t(`${nazwa} W2 podpowiedź AI przy dodatkowych`, (await s.$$('.dodatkowe .ai')).length >= 1);
  await s.click('nav button[data-ekran="kalendarz"]'); t(`${nazwa} W2 kalendarz`, (await s.$$('.karta tr')).length === 6);
  await s.selectOption('#rola select', 'kowalska'); t(`${nazwa} W2 moja ocena Kowalska`, (await s.textContent('h2')).includes('Kowalska'));
  t(`${nazwa} W2 moja: poprzednia`, await widac('text=Poprzednia ocena:'));
  // W3: Kowalska po obu stronach → zmiana widoczna po prawej → sporządź → potwierdź → oś czasu → porównanie → poprawka
  await s.goto(u + 'warianty/3/'); t(`${nazwa} W3 dwie kolumny`, (await s.textContent('main')).includes('Pracownik — Moja ocena (Anna Kowalska)'));
  await s.click('button[data-kryt="komunikacja"][data-ocena="9"]');
  t(`${nazwa} W3 zmiana po prawej`, (await s.textContent('.dwie > .karta:nth-child(2)')).includes('znacznie powyżej oczekiwań'));
  await s.click('[data-sporzadz]'); await s.click('[data-potwierdz]'); await s.click('dialog button[value=ok]');
  t(`${nazwa} W3 sprzeciw 7 dni`, await widac('text=7 dni na sprzeciw: do 25.11.2026'));
  await s.click('nav button[data-ekran="osCzasu"]'); t(`${nazwa} W3 oś czasu`, (await s.$$('.osczasu .zn')).length === 5);
  await s.click('.osczasu .zn[data-osoba="bielecki"]'); t(`${nazwa} W3 powrót z osi`, (await s.textContent('main')).includes('Moja ocena (Jan Bielecki)'));
  await s.click('nav button[data-ekran="porownanie"]'); t(`${nazwa} W3 porównanie`, await widac('th:has-text("Różnica")'));
  await s.click('nav button[data-ekran="obok"]'); await s.click('button[data-popraw="srednia"]'); await s.fill('dialog input[name=p]', 'test'); await s.click('dialog button[value=ok]');
  t(`${nazwa} W3 poprawka`, await widac('.reczne'));
  if (nazwa === 'telefon') {
    for (const n of [1, 2, 3]) { await s.goto(u + 'warianty/' + n + '/'); const sz = await s.evaluate(() => document.documentElement.scrollWidth); t(`telefon W${n} szerokość ${sz}px ≤ 400`, sz <= 400); await s.screenshot({ path: `/tmp/w${n}-telefon.png`, fullPage: true }); }
  }
  t(`${nazwa} brak błędów JS (${bledy.join('; ')})`, bledy.length === 0); await s.close();
}
await przegl.close(); srv.close(); console.log(`testy makiet: ${ok} ok, ${zle} błędów`); process.exit(zle ? 1 : 0);
