// Test danych MVP (6 przypadków ze spec §3) i tekstów „podpowiedź AI” (P13: pisane z góry, bez modelu na serwerze).
import { readFileSync } from 'node:fs';
import { osoby as M, AI } from '../makieta/warianty/wspolne/wspolne.mjs';
const d = JSON.parse(readFileSync('dane/wszystko.json', 'utf8'));
const p = d.podpowiedzi_ai;
let ok = 0, zle = 0; const t = (n, w) => { if (w) ok++; else { zle++; console.error('BŁĄD:', n); } };
const iso = (s) => s.split('.').reverse().join('-');

t('podpowiedzi w wszystko.json', !!p);
t('podpowiedzi = plik źródłowy', JSON.stringify(p) === JSON.stringify(JSON.parse(readFileSync('dane/podpowiedzi-ai.json', 'utf8'))));
t('podpowiedzi w app/dane.js', readFileSync('app/dane.js', 'utf8').includes('"podpowiedzi_ai"'));
t('oznaczenie „podpowiedź AI”', p.oznaczenie === 'podpowiedź AI');

// Dane = 6 przypadków ze spec §3, zgodne z makietą
const ID = ['wisniewski', 'lis', 'nowak', 'bielecki', 'kowalska', 'mazur'];
t('dokładnie 6 osób ze spec §3', d.osoby.map((o) => o.id).join() === ID.join());
const TERMIN = { wisniewski: '2026-11-19', lis: '2026-12-02', nowak: '2026-12-03', bielecki: '2026-12-10', kowalska: '2027-01-20', mazur: '2028-11-05' };
for (const o of d.osoby) {
  const m = M.find((x) => x.id === o.id);
  t(`${o.id}: termin ${o.termin.data} = spec §3`, o.termin.data === TERMIN[o.id]);
  t(`${o.id}: termin, etap, zatrudnienie = makieta`, o.termin.data === m.termin && o.etap === m.teraz && o.czas_nieokreslony_od === m.zatrudnienie);
  t(`${o.id}: poprzednia = makieta`, JSON.stringify(o.poprzednia) === JSON.stringify(m.poprzednia));
}
const ark = (id) => d.arkusze.find((a) => a.id === id);
t('Wiśniewski bieżąca 5,00 negatywna, zapoznanie puste (czeka na potwierdzenie)', ark('a-wisniewski-2026').srednia === 5 && ark('a-wisniewski-2026').wynik === 'negatywna' && ark('a-wisniewski-2026').data_zapoznania === null);
t('Bielecki poprzednia 6,71', ark('p-bielecki-2024').srednia.toFixed(2) === '6.71');
t('Kowalska poprzednia 5,57', ark('p-kowalska-2025').srednia.toFixed(2) === '5.57');
t('Mazur bieżąca pozytywna, zamknięta', ark('a-mazur-2026').wynik === 'pozytywna' && ark('a-mazur-2026').status === 'zamknięta');
t('Bielecki i Kowalska w toku', ark('a-bielecki-2026').status === 'w toku' && ark('a-kowalska-2026').status === 'w toku');
t('Lis i Nowak bez bieżącego arkusza', !d.arkusze.some((a) => a.id.startsWith('a-') && ['lis', 'nowak'].includes(a.osoba)));
t('brak sprzeciwów', d.sprzeciwy.length === 0);
t('każda notatka o osobie z danych', d.notatki.every((n) => ID.includes(n.osoba)));

// Kryteria dodatkowe: dla każdego stanowiska 1–3 propozycje z wykazu, spoza obowiązkowych, z powodem.
for (const s of d.stanowiska) {
  const l = p.kryteria_dodatkowe[s.id] || [];
  t(`${s.id} ${s.nazwa}: 1–3 kryteria dodatkowe`, l.length >= 1 && l.length <= 3);
  for (const k of l) {
    t(`${s.id}: „${k.kryterium}” z wykazu`, d.kryteria.includes(k.kryterium));
    t(`${s.id}: „${k.kryterium}” nie jest obowiązkowe dla arkusza ${s.arkusz}`, !d.kryteria_obowiazkowe[s.arkusz].includes(k.kryterium));
    t(`${s.id}: „${k.kryterium}” ma powód`, k.dlaczego?.length > 10);
  }
}
// Uzasadnienie: każda negatywna ma szkic, który wskazuje § 11 i kryterium z najniższą oceną; = makieta.
for (const a of d.arkusze.filter((a) => a.id.startsWith('a-') && a.wynik === 'negatywna')) {
  const u = p.uzasadnienie[a.id] || '';
  const min = a.oceny.reduce((m, o) => (o.ocena < m.ocena ? o : m));
  t(`${a.id}: szkic uzasadnienia = makieta`, u.length > 80 && u === AI.uzasadnienie[a.osoba] && a.uzasadnienie === u);
  t(`${a.id}: uzasadnienie cytuje § 11`, u.includes('§ 11'));
  t(`${a.id}: uzasadnienie wskazuje „${min.kryterium}”`, u.includes(min.kryterium));
}
t('pozytywne bez szkicu uzasadnienia', d.arkusze.filter((a) => a.wynik === 'pozytywna').every((a) => !p.uzasadnienie[a.id]));
// IPRZ (spec §3, T16): Wiśniewski, Bielecki, Mazur — 3 formy; Lis, Nowak, Kowalska — brak (ostrzeżenie).
t('IPRZ: podpowiedź dla Wiśniewskiego, Bieleckiego, Mazura; reszta pusta', Object.keys(p.iprz).sort().join() === 'bielecki,mazur,wisniewski');
for (const [id, l] of Object.entries(p.iprz)) {
  const a = d.arkusze.find((x) => x.id.startsWith('a-') && x.osoba === id);
  t(`${id}: IPRZ = makieta`, JSON.stringify(l) === JSON.stringify(AI.iprz[id]));
  t(`${id}: T16 kierunek, obszary, formy i metody`, l.length === 3 && l[0].startsWith('Kierunek rozwoju: ') && l[1].startsWith('Obszary wiedzy i umiejętności do doskonalenia: ') && l[2].startsWith('Formy i metody realizacji: '));
  t(`${id}: 3 formy rozwoju`, /1\) .+; 2\) .+; 3\) .+/.test(l[2]));
  for (const f of l) for (const m of f.match(/\d{2}\.\d{2}\.\d{4}/g) || []) t(`${id}: termin ${m} po dziś`, iso(m) > d.urzad.dzis);
  t(`${id}: arkusz istnieje`, !!a);
}
console.log(`testy danych i podpowiedzi AI: ${ok} ok, ${zle} błędów`); process.exit(zle ? 1 : 0);
