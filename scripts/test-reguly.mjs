// Test reguł § 11 [R] i terminów (przykłady dat z docs/materialy.md pkt 11) oraz spójności danych.
import { readFileSync } from 'node:fs';
import { OBOWIAZKOWE, SKALA, MAX_DODATKOWYCH, wynikOceny, terminOceny, terminRozmowyWstepnej, terminyPierwszegoZatrudnienia, terminySprzeciwu, ponownaOcenaPo, dodajMiesiace } from '../app/zasady.mjs';
let ok = 0, zle = 0;
const t = (nazwa, war) => { if (war) ok++; else { zle++; console.error('BŁĄD:', nazwa); } };

// § 11: jedna „1” przy średniej > 4 → negatywna
const w = wynikOceny([7, 1, 7, 7, 7, 5]);
t('§11 średnia > 4', w.srednia > 4); t('§11 jedna 1 → negatywna', w.wynik === 'negatywna');
t('§11 bez 1, średnia 5 → pozytywna', wynikOceny([5, 5, 5, 5, 5]).wynik === 'pozytywna');
t('§11 średnia 4 → poniżej, negatywna', wynikOceny([3, 5, 3, 5]).wynik === 'negatywna');
// Przypadek 2: 15.03.2025 + 24 mies. + 122 dni nieobecności → 15.07.2027; rozmowa wstępna do 14.04.2025
t('T6+T8 przypadek 2', terminOceny('2025-03-15', [['2025-09-01', '2025-12-31']]).termin === '2027-07-15');
t('T5 przypadek 2', terminRozmowyWstepnej('2025-03-15') === '2025-04-14');
t('T8 nieobecność ≤ 1 mies. nie przedłuża', terminOceny('2025-03-15', [['2025-09-01', '2025-09-20']]).termin === '2027-03-15');
// Przypadek 1
const p1 = terminyPierwszegoZatrudnienia('2026-02-02');
t('T1 umowa do 01.02.2027', p1.umowa_do === '2027-02-01'); t('T3 najpóźniej 01.01.2027', p1.pierwsza_ocena_najpozniej === '2027-01-01');
t('T5 do 04.03.2027', terminRozmowyWstepnej(p1.czas_nieokreslony_od) === '2027-03-04'); t('T6 02.02.2029', terminOceny(p1.czas_nieokreslony_od).termin === '2029-02-02');
// Przypadek 3
const s = terminySprzeciwu('2026-06-10', '2026-06-15', '2026-06-30');
t('T12 sprzeciw 17.06', s.sprzeciw_do === '2026-06-17'); t('T12 rozpatrzenie 29.06', s.rozpatrzenie_do === '2026-06-29'); t('T12 sąd 14.07', s.odwolanie_do_sadu_do === '2026-07-14');
t('T5 po negatywnej 17.06', terminRozmowyWstepnej('2026-06-10', true) === '2026-06-17'); t('T11 10.12.2026', ponownaOcenaPo('2026-06-10') === '2026-12-10');

// Spójność danych
const d = JSON.parse(readFileSync('dane/wszystko.json', 'utf8'));
for (const a of d.arkusze) {
  const II = a.czesc_II; const oceny = II.oceny.map((o) => o.ocena); const r = wynikOceny(oceny);
  t(`${a.id} kryteria obowiązkowe ${a.typ_arkusza}`, JSON.stringify(a.czesc_I.kryteria_obowiazkowe) === JSON.stringify(OBOWIAZKOWE[a.typ_arkusza]));
  t(`${a.id} ≤3 dodatkowe`, a.czesc_I.kryteria_dodatkowe.length <= MAX_DODATKOWYCH);
  t(`${a.id} skala 1/3/5/7/9`, oceny.every((o) => o in SKALA));
  t(`${a.id} średnia/wynik`, r.srednia === II.srednia && r.wynik === II.wynik && r.poziom === II.ogolny_poziom);
  t(`${a.id} uzasadnienie przy negatywnej`, II.wynik === 'pozytywna' || !!II.uzasadnienie);
}
t('dane: jest „1” przy średniej > 4', d.arkusze.some((a) => a.czesc_II.wynik === 'negatywna' && a.czesc_II.srednia > 4));
t('dane: jest sprzeciw', d.sprzeciwy.length >= 1);
t('dane: brak znaczników DO POPRAWY', !readFileSync('dane/wszystko.json', 'utf8').includes('DO POPRAWY'));
// docs/spec.md T4/T5: Wiśniewski (C), ocena na piśmie 12.11.2026, dziś 18.11.2026, zapoznanie jeszcze nie nastąpiło
const nast = (w) => (w.wynik === 'pozytywna' ? dodajMiesiace('2026-11-12', 24) : ponownaOcenaPo('2026-11-18'));
const T4 = wynikOceny([5, 3, 7, 7, 5]), T5 = wynikOceny([5, 1, 7, 7, 5]);
t('spec T4: rzetelność 1→3 → 5,40, poziom bez zmiany, pozytywna, następna 12.11.2028', T4.srednia === 5.4 && T4.poziom === SKALA[5] && T4.wynik === 'pozytywna' && nast(T4) === '2028-11-12');
t('spec T5: z powrotem 1 → negatywna, następna 18.05.2027', T5.wynik === 'negatywna' && T5.srednia === 5 && nast(T5) === '2027-05-18');
console.log(`testy reguł: ${ok} ok, ${zle} błędów`); process.exit(zle ? 1 : 0);
