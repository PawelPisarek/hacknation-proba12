// Test klikania makiety głównej (/makieta/, P16–P20, usterka R1) i 3 makiet wariantów (ścieżki demo z docs/pm/03a-warianty.md). Wymaga playwright-core i chromium:
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
  // Makieta główna (/makieta/ = W1, P14) z P16–P20 i usterką R1
  await s.goto(u); t(`${nazwa} M nagłówek`, (await s.textContent('header')).includes('Asystent ocen okresowych — makieta'));
  t(`${nazwa} M P16 start = lista 6 osób, bez arkusza`, (await s.$$('button[data-osoba]')).length === 6 && (await s.$$('#ark')).length === 0);
  await s.click('.dzwonek'); const przyp = await s.$$eval('.przyp', (l) => l.map((x) => x.textContent));
  t(`${nazwa} M P17 terminy pozostałych w dzwonku (${przyp.length})`, przyp.length === 5 && przyp.every((x) => /do \d{2}\.\d{2}\.\d{4}/.test(x)));
  await s.click('.dzwonek');
  for (const [kto, kr] of [['wisniewski', 'komunikacja'], ['bielecki', 'negocjowanie']]) {
    if (kto === 'bielecki') { await s.click('button[data-idz="lista"]'); }
    await s.click(`button[data-osoba="${kto}"]`);
    if (kto === 'wisniewski') {
      t(`${nazwa} M otwarta ocena Wiśniewskiego`, (await s.textContent('h2')).includes('Wiśniewski'));
      t(`${nazwa} M P18 poprzednia ocena tuż pod paskiem etapów`, await s.evaluate(() => { const e = document.querySelector('.etapy'); return !!e && e.nextElementSibling?.textContent.includes('Poprzednia ocena:'); }));
      t(`${nazwa} M Wiśniewski: poprzednia ocena 12.11.2024, 5,00`, await widac('text=Poprzednia ocena: 12.11.2024, na poziomie oczekiwań (5,00)'));
      const pop = await s.$$eval('[data-popraw]', (l) => l.map((b) => b.dataset.popraw).sort().join(','));
      t(`${nazwa} M P19 „popraw” przy każdej wartości (${pop})`, pop === 'nastepna,poziom,srednia,termin,wynik,zatrudnienie');
      await s.click('button[data-popraw="wynik"]'); await s.fill('dialog input[name=w]', 'pozytywna'); await s.fill('dialog input[name=p]', 'test'); await s.click('dialog button[value=ok]');
      t(`${nazwa} M P19 poprawiony wynik ma znaczek`, await widac('.wynik .reczne'));
      await s.click('button[data-popraw="wynik"]'); await s.fill('dialog input[name=w]', 'negatywna'); await s.click('dialog button[value=ok]');
    }
    const wiersz = () => s.locator(`tr:has(button[data-kryt="${kr}"])`);
    await wiersz().first().waitFor({ timeout: 3000 });
    const przed = (await wiersz().boundingBox()).height;
    await s.click(`button[data-kryt="${kr}"][data-ocena="9"]`);
    const po = await wiersz().evaluate((tr) => { const z = tr.querySelector('.reczne'); const b = [...tr.querySelectorAll('.skala button')].map((x) => x.getBoundingClientRect().top);
      return { h: tr.getBoundingClientRect().height, znak: !!z && z.getClientRects().length === 1 && z.getBoundingClientRect().height < 24, przyciski: Math.max(...b) - Math.min(...b) < 2, szer: tr.getBoundingClientRect().right <= document.documentElement.clientWidth }; });
    t(`${nazwa} M ${kr}=9: znaczek w jednej linii`, po.znak); t(`${nazwa} M ${kr}=9: przyciski w jednym rzędzie`, po.przyciski && po.szer);
    t(`${nazwa} M ${kr}=9: wiersz nie urósł (${przed}→${po.h})`, po.h <= przed + 1);
    if (nazwa === 'komputer') { const luka = await s.evaluate(() => Math.min(...[...document.querySelectorAll('.tab-ark tbody tr')].map((tr) => { const r = document.createRange(); r.selectNodeContents(tr.cells[0]); return tr.querySelector('.skala').getBoundingClientRect().left - Math.max(...[...r.getClientRects()].map((x) => x.right)); })));
      t(`komputer M ${kto} odstęp tekst→przyciski ${Math.round(luka)}px ≤ 120`, luka <= 120); }
    // P20: ostatni krok — podsumowanie tylko do odczytu
    await s.click('button[data-idz="podsumowanie"]'); const pd = await s.textContent('#podsumowanie');
    t(`${nazwa} M P20 ${kto} podsumowanie: średnia, poziom, wynik, data następnej`, ['Średnia', 'Poziom', 'Wynik', 'Data następnej oceny'].every((x) => pd.includes(x)));
    t(`${nazwa} M P20 ${kto} data następnej i wynik`, pd.includes(kto === 'wisniewski' ? '18.05.2027' : '18.11.2028') && pd.includes(kto === 'wisniewski' ? 'negatywna' : 'pozytywna'));
    t(`${nazwa} M P20 ${kto} bez klikalnych elementów`, (await s.$$('#podsumowanie :is(button,a,input,select,textarea,[contenteditable],[onclick])')).length === 0);
    t(`${nazwa} M P20 ${kto} znaczek przy wartości poprawionej`, kto === 'bielecki' || (await s.$$('#podsumowanie .reczne')).length >= 1);
    await s.click('button[data-idz="ocena"]');
  }
  // spec T4/T5 w UI (świeża strona) i T12 poprzednie oceny Bielecki/Kowalska
  { const s2 = await przegl.newPage({ viewport: vp }); await s2.goto(u); await s2.click('button[data-osoba="wisniewski"]');
    await s2.click('button[data-kryt="rzetelność"][data-ocena="3"]'); await s2.click('button[data-idz="podsumowanie"]'); const p4 = await s2.textContent('#podsumowanie');
    t(`${nazwa} M spec T4: 5,40, pozytywna, 12.11.2028`, p4.includes('5,40') && p4.includes('na poziomie oczekiwań') && p4.includes('pozytywna') && p4.includes('12.11.2028'));
    await s2.click('button[data-idz="ocena"]'); await s2.click('button[data-kryt="rzetelność"][data-ocena="1"]'); await s2.click('button[data-idz="podsumowanie"]'); const p5 = await s2.textContent('#podsumowanie');
    t(`${nazwa} M spec T5: negatywna, 18.05.2027 wstępna`, p5.includes('negatywna') && p5.includes('18.05.2027') && p5.includes('wstępna — po potwierdzeniu zapoznania'));
    await s2.click('button[data-idz="ocena"]');
    if (nazwa === 'telefon') { const g = await s2.evaluate(() => { const r = (q) => document.querySelector(q)?.getBoundingClientRect(); return { t: r('.termin'), n: r('#terminy .blok'), a: r('#ark'), e: r('.etapy') }; });
      t('telefon M P22 (Artur 19:03) termin i data następnej oceny pod arkuszem', g.t && g.n && g.t.top >= g.a.bottom - 1 && g.n.top >= g.a.bottom - 1); }
    t(`${nazwa} M spec T16: Wiśniewski IPRZ z §3 (podpowiedź AI), bez ostrzeżenia`, /^Kierunek rozwoju: .+\nObszary wiedzy i umiejętności do doskonalenia: .+\nFormy i metody realizacji: 1\) .+2\) .+3\) .+/.test(await s2.inputValue('[data-iprz]')) && (await s2.inputValue('[data-iprz]')).includes('Kontrola jakości dokumentów') && (await s2.textContent('#iprz')).includes('podpowiedź AI') && await s2.isHidden('#iprz-ostrz'));
    t(`${nazwa} M R1: pole uzasadnienia czytelne (≥ 5 wierszy, bez przewijania)`, await s2.evaluate(() => { const x = document.querySelector('[data-uzas]'); return x && x.clientHeight >= 5 * 18 && x.scrollHeight <= x.clientHeight + 2; }));
    await s2.click('button[data-idz="lista"]'); await s2.click('button[data-osoba="bielecki"]');
    t(`${nazwa} M R1: Bielecki data następnej „wstępna — do sporządzenia oceny na piśmie”`, (await s2.textContent('main')).includes('wstępna — do sporządzenia oceny na piśmie'));
    await s2.click('button[data-idz="podsumowanie"]'); const pb = await s2.textContent('#podsumowanie');
    t(`${nazwa} M R1: podsumowanie Bieleckiego ze stanu spec 6,71, bez znaczka`, pb.includes('6,71') && (await s2.$$('#podsumowanie .reczne')).length === 0);
    await s2.click('button[data-idz="ocena"]'); await s2.click('button[data-kryt="negocjowanie"][data-ocena="9"]'); await s2.click('button[data-idz="podsumowanie"]');
    t(`${nazwa} M R1: po zmianie oceny znaczek na podsumowaniu`, (await s2.textContent('#podsumowanie')).includes('7,29') && (await s2.$$('#podsumowanie .reczne')).length >= 1);
    await s2.click('button[data-idz="lista"]'); await s2.click('button[data-osoba="lis"]');
    t(`${nazwa} M spec T16: Lis puste IPRZ → ostrzeżenie`, (await s2.inputValue('[data-iprz]')) === '' && (await s2.textContent('#iprz-ostrz')).includes('brak wniosków do IPRZ') && await s2.isVisible('#iprz-ostrz'));
    await s2.fill('[data-iprz]', 'Plan wdrożenia 3 mies.'); t(`${nazwa} M spec T16: po wpisaniu ostrzeżenie znika`, await s2.isHidden('#iprz-ostrz'));
    await s2.click('button[data-idz="lista"]'); await s2.click('button[data-osoba="lis"]');
    t(`${nazwa} M spec T16: tekst IPRZ zostaje po zmianie ekranu`, (await s2.inputValue('[data-iprz]')) === 'Plan wdrożenia 3 mies.');
    await s2.click('button[data-idz="lista"]'); await s2.click('button[data-osoba="nowak"]');
    const zr = async () => (await s2.textContent('.termin + .male')) || ''; const dz = async () => { await s2.click('.dzwonek'); const x = await s2.$$eval('.przyp', (l) => l.map((y) => y.textContent).join('|')); await s2.click('.dzwonek'); return x; };
    t(`${nazwa} M spec T17: Nowak zatrudnienie 03.11.2026, termin 03.12.2026 (= dane/)`, (await s2.textContent('#zatr')).includes('03.11.2026') && (await s2.textContent('.termin')).includes('03.12.2026'));
    t(`${nazwa} M R3: przed poprawą jedna data — „Z czego wynika” 03.11.2026, dzwonek 03.12.2026`, (await zr()).includes('03.11.2026') && (await dz()).includes('Ewa Nowak: rozmowa wstępna do 03.12.2026'));
    await s2.click('button[data-popraw="zatrudnienie"]'); await s2.fill('dialog input[name=w]', '10.11.2026'); await s2.click('dialog button[value=ok]');
    t(`${nazwa} M spec T17: po poprawie termin 10.12.2026 i znaczek`, (await s2.textContent('.termin')).includes('10.12.2026') && (await s2.textContent('#zatr')).includes('10.11.2026') && (await s2.$$('#zatr .reczne')).length === 1);
    const d17 = await dz(); t(`${nazwa} M spec T17: dzwonek Nowak 10.12.2026, bez 03.12.2026`, d17.includes('Ewa Nowak: rozmowa wstępna do 10.12.2026') && !d17.includes('03.12.2026'));
    t(`${nazwa} M R3: po poprawie „Z czego wynika” 10.11.2026, bez 03.11.2026`, (await zr()).includes('10.11.2026') && !(await zr()).includes('03.11.2026'));
    await s2.selectOption('#rola select', 'wisniewski'); const m9 = await s2.textContent('main');
    t(`${nazwa} M spec T9: przed potwierdzeniem bez komunikatu i daty sprzeciwu, bez „popraw” i ocen`, !m9.includes('Masz 7 dni') && !m9.includes('25.11.2026') && (await s2.$$('[data-popraw], button[data-ocena], textarea')).length === 0);
    t(`${nazwa} M R1: pracownik bez „podpowiedź AI”, widzi zatwierdzone uzasadnienie i IPRZ`, !m9.includes('podpowiedź AI') && (await s2.textContent('#uzas')).includes('rzetelność') && (await s2.textContent('#iprz')).includes('Kontrola jakości dokumentów'));
    t(`${nazwa} M P24: przed potwierdzeniem pracownik widzi termin przełożonego`, m9.includes('19.11.2026'));
    if (nazwa === 'telefon') { await s2.evaluate(() => window.scrollTo(0, 600)); const g = await s2.evaluate(() => ({ p: getComputedStyle(document.querySelector('.gora')).position, d: document.querySelector('.gora').getBoundingClientRect().bottom }));
      t(`telefon M P25: górny pasek nieprzyklejony, przewija się z treścią (${g.p}, dół ${Math.round(g.d)}px)`, g.p !== 'sticky' && g.p !== 'fixed' && g.d <= 0); await s2.evaluate(() => window.scrollTo(0, 0)); }
    else t('komputer M P25: na komputerze pasek bez zmian (sticky)', await s2.evaluate(() => getComputedStyle(document.querySelector('.gora')).position) === 'sticky');
    await s2.click('[data-potwierdz]'); const m10 = await s2.textContent('main');
    t(`${nazwa} M P24: po potwierdzeniu bez terminu przełożonego (19.11.2026, „— 1 dzień”)`, !m10.includes('19.11.2026') && !m10.includes('— 1 dzień') && (await s2.$$('main .termin')).length === 0 && (await s2.$$('.dzwonek')).length === 0);
    t(`${nazwa} M spec T10: sprzeciw do 25.11.2026, przycisk znika`, m10.includes('Masz 7 dni na sprzeciw') && m10.includes('do 25.11.2026') && m10.includes('Potwierdzono zapoznanie z oceną: 18.11.2026') && (await s2.$$('[data-potwierdz]')).length === 0);
    await s2.selectOption('#rola select', 'przelozony'); await s2.click('button[data-idz="lista"]'); await s2.click('button[data-osoba="wisniewski"]'); await s2.click('button[data-idz="podsumowanie"]'); const p10 = await s2.textContent('#podsumowanie');
    t(`${nazwa} M spec T10: następna ostateczna 18.05.2027`, p10.includes('18.05.2027') && !p10.includes('wstępna') && p10.includes('potwierdzenia przez pracownika'));
    for (const [kto, txt] of [['bielecki', '10.12.2024, powyżej oczekiwań (6,71)'], ['kowalska', '20.01.2025, na poziomie oczekiwań (5,57)']]) {
      await s2.click('button[data-idz="lista"]'); await s2.click(`button[data-osoba="${kto}"]`); t(`${nazwa} M spec T12: ${kto} poprzednia ${txt}`, (await s2.textContent('main')).includes(txt)); }
    await s2.close(); }
  await s.click('button[data-idz="lista"]'); await s.selectOption('#rola select', 'wisniewski');
  t(`${nazwa} M pracownik: moja ocena + poprzednia`, (await s.textContent('h2')).includes('Moja ocena') && await widac('text=Poprzednia ocena:'));
  await s.click('[data-potwierdz]'); t(`${nazwa} M pracownik potwierdził`, await widac('.potw'));
  if (nazwa === 'telefon') { await s.goto(u); const sz = await s.evaluate(() => document.documentElement.scrollWidth); t(`telefon M szerokość ${sz}px ≤ 400`, sz <= 400); }
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
