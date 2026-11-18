// Test tekstów „podpowiedź AI” w danych MVP (P13: pisane z góry, bez modelu na serwerze).
import { readFileSync } from 'node:fs';
const d = JSON.parse(readFileSync('dane/wszystko.json', 'utf8'));
const p = d.podpowiedzi_ai;
let ok = 0, zle = 0; const t = (n, w) => { if (w) ok++; else { zle++; console.error('BŁĄD:', n); } };
const iso = (s) => s.split('.').reverse().join('-');

t('podpowiedzi w wszystko.json', !!p);
t('podpowiedzi = plik źródłowy', JSON.stringify(p) === JSON.stringify(JSON.parse(readFileSync('dane/podpowiedzi-ai.json', 'utf8'))));
t('podpowiedzi w app/dane.js', readFileSync('app/dane.js', 'utf8').includes('"podpowiedzi_ai"'));
t('oznaczenie „podpowiedź AI”', p.oznaczenie === 'podpowiedź AI');

// Kryteria dodatkowe: dla każdego stanowiska z komórką 1–3 propozycje z wykazu, spoza obowiązkowych, z powodem.
for (const s of d.stanowiska.filter((s) => s.komorka)) {
  const l = p.kryteria_dodatkowe[s.id] || [];
  t(`${s.id}: 1–3 kryteria dodatkowe`, l.length >= 1 && l.length <= 3);
  for (const k of l) {
    t(`${s.id}: „${k.kryterium}” z wykazu`, d.kryteria.includes(k.kryterium));
    t(`${s.id}: „${k.kryterium}” nie jest obowiązkowe dla arkusza ${s.arkusz}`, !d.kryteria_obowiazkowe[s.arkusz].includes(k.kryterium));
    t(`${s.id}: „${k.kryterium}” ma powód`, k.dlaczego?.length > 10);
  }
}
// Uzasadnienie: każda negatywna ma szkic, który wskazuje § 11 i kryterium z najniższą oceną.
for (const a of d.arkusze.filter((a) => a.czesc_II.wynik === 'negatywna')) {
  const u = p.uzasadnienie[a.id] || '';
  const min = a.czesc_II.oceny.reduce((m, o) => (o.ocena < m.ocena ? o : m));
  t(`${a.id}: szkic uzasadnienia`, u.length > 80);
  t(`${a.id}: uzasadnienie cytuje § 11`, u.includes('§ 11'));
  t(`${a.id}: uzasadnienie wskazuje „${min.kryterium}”`, u.includes(min.kryterium));
  t(`${a.id}: średnia w uzasadnieniu = arkusz`, a.czesc_II.srednia > 4 ? u.includes('1') : u.includes(a.czesc_II.srednia.toFixed(2).replace('.', ',')));
}
t('pozytywne bez szkicu uzasadnienia', d.arkusze.filter((a) => a.czesc_II.wynik === 'pozytywna').every((a) => !p.uzasadnienie[a.id]));
// IPRZ: każdy arkusz ma 2–3 formy; daty w formach po sporządzeniu oceny; szkolenia z katalogu istnieją.
for (const a of d.arkusze) {
  const l = p.iprz[a.id] || [];
  t(`${a.id}: 2–3 formy IPRZ`, l.length >= 2 && l.length <= 3);
  for (const f of l) {
    for (const m of f.match(/\d{2}\.\d{2}\.\d{4}/g) || []) t(`${a.id}: termin ${m} po sporządzeniu`, iso(m) > a.czesc_II.data_sporzadzenia);
    for (const m of f.match(/\bsz\d+\b/g) || []) { const sz = d.szkolenia.find((s) => s.id === m); t(`${a.id}: ${m} w katalogu i nazwa się zgadza`, !!sz && f.includes(sz.nazwa)); }
  }
}
t('a5 (IPRZ słabe w arkuszu) ma podpowiedź', (p.iprz.a5 || []).length >= 2);
console.log(`testy podpowiedzi AI: ${ok} ok, ${zle} błędów`); process.exit(zle ? 1 : 0);
