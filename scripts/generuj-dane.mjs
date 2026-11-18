// Generator sztucznych danych MVP (wszystko fikcyjne): dokładnie 6 przypadków ze spec §3 (decyzja Szefa 18:58, pkt 5).
// Źródło prawdy osób i tekstów AI = makieta główna (makieta/warianty/wspolne/wspolne.mjs) — MVP i makieta mają te same liczby.
// Uruchom: node scripts/generuj-dane.mjs  -> dane/*.json, dane/podpowiedzi-ai.json, app/dane.js
// Pola wyliczane (średnia, poziom, wynik, terminy) liczy app/zasady.mjs — te same reguły co w aplikacji.
import { writeFileSync, mkdirSync } from 'node:fs';
import { OBOWIAZKOWE, SKALA, KRYTERIA, wynikOceny, terminRozmowyWstepnej, terminOceny, oknoOcenyPrzyZmianie } from '../app/zasady.mjs';
import { osoby as M, AI, DZIS } from '../makieta/warianty/wspolne/wspolne.mjs';

const urzad = {
  nazwa: 'Urząd Wojewódzki w Przykładowie (fikcyjny)', miejscowosc: 'Przykładowo', dzis: DZIS,
  przelozony: { id: 'zielinski', imie: 'Marek', nazwisko: 'Zieliński', stanowisko: 'Dyrektor wydziału' },
  dyrektor_generalny: { imie: 'Grażyna', nazwisko: 'Wierzbicka', rola: 'adresat sprzeciwu (art. 83 ust. 1 [U])' },
  komorki: [{ id: 'k1', nazwa: 'Wydział Administracji i Zamówień' }],
};

// Stanowiska = nazwy z makiety; obowiązki do opisu stanowiska (tło dla podpowiedzi kryteriów dodatkowych)
const OPIS = {
  'Specjalista': ['Przygotowanie projektów pism i odpowiedzi', 'Prowadzenie rejestru spraw', 'Pilnowanie terminów KPA'],
  'Starszy specjalista': ['Samodzielne prowadzenie spraw', 'Analiza dokumentacji', 'Wsparcie merytoryczne zespołu'],
  'Kierownik wydziału': ['Kierowanie zespołem 8 osób', 'Planowanie pracy wydziału', 'Uzgodnienia z innymi komórkami'],
  'Starszy specjalista ds. zamówień publicznych': ['Przygotowanie dokumentacji postępowań', 'Badanie i ocena ofert', 'Kontakt z wykonawcami'],
  'Inspektor': ['Obsługa interesantów', 'Kontrola kompletności wniosków', 'Sprawozdania miesięczne'],
};
const nazwyStan = [...new Set(M.map((o) => o.stanowisko))];
const stanowiska = nazwyStan.map((n, i) => ({ id: `s${i + 1}`, nazwa: n, komorka: 'k1', arkusz: M.find((o) => o.stanowisko === n).arkusz, obowiazki: OPIS[n] }));
const stId = (n) => stanowiska.find((s) => s.nazwa === n).id;

// Fakty ze spec §3 potrzebne do terminów (reguły z app/zasady.mjs)
const FAKTY = {
  wisniewski: { poprzednia_ocena: '2024-11-12', ocena_sporzadzona: '2026-11-12', wynik_biezacej: 'negatywna' },
  lis: { poprzednia_ocena: '2026-03-15', zmiana_stanowiska: { data: '2026-11-02', istotna: true } },
  nowak: { poprzednia_ocena: null },
  bielecki: { poprzednia_ocena: '2024-12-10' },
  kowalska: { poprzednia_ocena: '2025-01-20' },
  mazur: { poprzednia_ocena: '2026-11-05' },
};
const liczTermin = (o) => {
  const f = FAKTY[o.id];
  if (f.wynik_biezacej === 'negatywna') return terminRozmowyWstepnej(f.ocena_sporzadzona, true);    // [R] § 7 pkt 2
  if (f.zmiana_stanowiska) return oknoOcenyPrzyZmianie(f.poprzednia_ocena, f.zmiana_stanowiska.data).do; // [U] art. 81 ust. 6
  if (!f.poprzednia_ocena) return terminRozmowyWstepnej(o.zatrudnienie);                             // [R] § 7 pkt 1
  return terminOceny(f.poprzednia_ocena).termin;                                                       // [U] art. 81 ust. 4
};

const osoby = M.map((o) => ({
  id: o.id, imie: o.imie, nazwisko: o.nazwisko, stanowisko: stId(o.stanowisko), przelozony: urzad.przelozony.id,
  czas_nieokreslony_od: o.zatrudnienie, poprzednia_ocena: FAKTY[o.id].poprzednia_ocena,
  ...(FAKTY[o.id].zmiana_stanowiska ? { zmiana_stanowiska: FAKTY[o.id].zmiana_stanowiska } : {}),
  etap: o.teraz, etapy_daty: o.zrobione,
  termin: { data: liczTermin(o), czynnosc: o.czynnosc, zrodlo: o.zrodlo },
  poprzednia: o.poprzednia,
}));
for (const o of osoby) { const m = M.find((x) => x.id === o.id); if (o.termin.data !== m.termin) throw new Error(`${o.id}: termin ${o.termin.data} ≠ makieta ${m.termin}`); }

// Arkusze: bieżące (z ocenami) i poprzednie (dla „Poprzednia ocena”, spec §3)
function arkusz(id, osobaId, kryteria, oceny, d) {
  const w = oceny.every((x) => x != null) ? wynikOceny(oceny) : null;
  return { id, osoba: osobaId, typ_arkusza: M.find((o) => o.id === osobaId).arkusz, status: d.status, kryteria_dodatkowe: kryteria.slice(OBOWIAZKOWE[M.find((o) => o.id === osobaId).arkusz].length),
    oceny: kryteria.map((k, i) => ({ kryterium: k, ocena: oceny[i], opis: oceny[i] ? SKALA[oceny[i]] : null })),
    srednia: w?.srednia ?? null, poziom: w?.poziom ?? null, wynik: w?.wynik ?? null,
    data_sporzadzenia: d.sporzadzenie ?? null, data_zapoznania: d.zapoznanie ?? null, // zapoznanie = dzień potwierdzenia przez pracownika (Szef 18:58)
    uzasadnienie: d.uzasadnienie ?? null, wnioski_iprz: d.iprz ?? null };
}
const biez = (o) => { const ks = [...OBOWIAZKOWE[o.arkusz], ...o.dodatkowe]; return [ks, ks.map((k) => o.oceny[k])]; };
const m = (id) => M.find((o) => o.id === id);
const arkusze = [
  arkusz('a-wisniewski-2026', 'wisniewski', ...biez(m('wisniewski')), { status: 'sporządzona, czeka na potwierdzenie zapoznania', sporzadzenie: '2026-11-12', uzasadnienie: AI.uzasadnienie.wisniewski, iprz: AI.iprz.wisniewski }),
  arkusz('a-bielecki-2026', 'bielecki', ...biez(m('bielecki')), { status: 'w toku' }),
  arkusz('a-kowalska-2026', 'kowalska', ...biez(m('kowalska')), { status: 'w toku' }),
  arkusz('a-mazur-2026', 'mazur', ...biez(m('mazur')), { status: 'zamknięta', sporzadzenie: '2026-11-05', zapoznanie: '2026-11-05', iprz: AI.iprz.mazur }),
  arkusz('p-wisniewski-2024', 'wisniewski', OBOWIAZKOWE.C, [5, 5, 5, 5, 5], { status: 'poprzednia', sporzadzenie: '2024-11-12', zapoznanie: '2024-11-12' }),
  arkusz('p-bielecki-2024', 'bielecki', [...OBOWIAZKOWE.B, 'myślenie analityczne', 'negocjowanie'], [7, 7, 7, 7, 7, 7, 5], { status: 'poprzednia', sporzadzenie: '2024-12-10', zapoznanie: '2024-12-10' }),
  arkusz('p-kowalska-2025', 'kowalska', [...OBOWIAZKOWE.C, 'orientacja na klienta/interesanta', 'negocjowanie'], [5, 5, 7, 5, 5, 5, 7], { status: 'poprzednia', sporzadzenie: '2025-01-20', zapoznanie: '2025-01-20' }),
  arkusz('p-lis-2026', 'lis', OBOWIAZKOWE.C, [5, 5, 5, 7, 5], { status: 'poprzednia', sporzadzenie: '2026-03-15', zapoznanie: '2026-03-16' }),
];

// Notatki przełożonego w okresie (tło do uzasadnienia; kryterium null = „szum”)
const N = (osoba, data, kryterium, tresc) => ({ osoba, autor: urzad.przelozony.id, data, kryterium, tresc });
const notatki = [
  N('wisniewski', '2025-05-12', 'rzetelność', 'Pismo do obywatela wysłane bez załącznika — konieczna korekta.'),
  N('wisniewski', '2025-09-03', 'rzetelność', 'Błędna data w odpowiedzi; omówione na rozmowie bieżącej.'),
  N('wisniewski', '2026-02-18', 'rzetelność', 'Trzecia poprawka formalna pisma przed wysyłką.'),
  N('wisniewski', '2026-04-07', 'współpraca', 'Zastąpił kolegę w czasie urlopu, bez zaległości.'),
  N('lis', '2026-11-02', null, 'Przejście na stanowisko specjalisty — istotna zmiana obowiązków.'),
  N('bielecki', '2025-06-10', 'negocjowanie', 'Uzgodnienie planu zamówień z Wydziałem Finansów — kompromis po 3 spotkaniach.'),
  N('bielecki', '2026-03-02', 'zarządzanie ludźmi', 'Wdrożył 2 nowe osoby w wydziale.'),
  N('kowalska', '2025-10-14', 'orientacja na klienta/interesanta', 'Wykonawca pochwalił szybkie odpowiedzi na pytania do SWZ.'),
  N('mazur', '2026-05-20', 'myślenie analityczne', 'Raport z kontroli wniosków wskazał 3 powtarzające się błędy.'),
].map((n, i) => ({ id: `n${i + 1}`, ...n }));

const szkolenia = [
  ['sz1', 'KPA w praktyce — terminy i odpowiedzi', 'komunikacja'], ['sz2', 'Prosty język w pismach urzędowych', 'komunikacja'],
  ['sz3', 'Nowelizacja Prawa zamówień publicznych', 'wykorzystywanie wiedzy i doskonalenie zawodowe'], ['sz4', 'Kontrola jakości dokumentów', 'rzetelność'],
  ['sz6', 'Planowanie pracy i priorytety', 'organizacja pracy i orientacja na osiąganie celów'], ['sz7', 'Przywództwo dla kierowników zespołów', 'zarządzanie ludźmi'],
  ['sz8', 'Excel w analizie danych', 'myślenie analityczne'], ['sz9', 'Negocjacje z wykonawcami', 'negocjowanie'],
].map(([id, nazwa, kryterium]) => ({ id, nazwa, kryterium }));
for (const k of [...notatki.map((n) => n.kryterium), ...szkolenia.map((s) => s.kryterium)]) if (k && !KRYTERIA.includes(k)) throw new Error('kryterium spoza wykazu: ' + k);

// Teksty „podpowiedź AI” (P13) — z makiety, żeby MVP i makieta pokazywały to samo
const podpowiedzi_ai = {
  opis: 'Teksty „podpowiedź AI” przygotowane z góry (Claude, P13) — aplikacja nie woła modelu. Widzi je tylko przełożony; pracownik widzi treść zatwierdzoną. Źródło: obiekt AI w makieta/warianty/wspolne/wspolne.mjs.',
  oznaczenie: 'podpowiedź AI',
  kryteria_dodatkowe: Object.fromEntries(stanowiska.map((s) => [s.id, (AI.dodatkowe[s.nazwa] || []).map(([kryterium, dlaczego]) => ({ kryterium, dlaczego }))])),
  uzasadnienie: { 'a-wisniewski-2026': AI.uzasadnienie.wisniewski },
  iprz: AI.iprz,
};

const dane = { zrodlo: 'docs/spec.md §3 (6 przypadków); wszystkie osoby i urząd fikcyjne', urzad, skala: SKALA, kryteria: KRYTERIA, kryteria_obowiazkowe: OBOWIAZKOWE,
  stanowiska, osoby, arkusze, sprzeciwy: [], notatki, szkolenia, podpowiedzi_ai };
mkdirSync('dane', { recursive: true });
for (const k of ['stanowiska', 'osoby', 'arkusze', 'sprzeciwy', 'notatki', 'szkolenia']) writeFileSync(`dane/${k}.json`, JSON.stringify(dane[k], null, 2) + '\n');
writeFileSync('dane/podpowiedzi-ai.json', JSON.stringify(podpowiedzi_ai, null, 2) + '\n');
writeFileSync('dane/wszystko.json', JSON.stringify(dane, null, 2) + '\n');
writeFileSync('app/dane.js', `// wygenerowane: node scripts/generuj-dane.mjs\nwindow.DANE = ${JSON.stringify(dane)};\n`);
const liczby = { stanowiska: stanowiska.length, osoby: osoby.length, arkusze: arkusze.length, notatki: notatki.length, szkolenia: szkolenia.length };
console.log(`wynik: ${Object.entries(liczby).map(([k, v]) => `${k}=${v}`).join(' ')}`);
