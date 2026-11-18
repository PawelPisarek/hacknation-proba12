// Generator sztucznych danych (wszystko fikcyjne) zgodnych z docs/materialy.md (pkt 5, 10, 11).
// Uruchom: node scripts/generuj-dane.mjs  -> dane/*.json + app/dane.js
// Pola wyliczane (średnia, poziom, wynik, terminy) liczy app/zasady.mjs — te same reguły co w aplikacji.
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { OBOWIAZKOWE, SKALA, KRYTERIA, wynikOceny, terminRozmowyWstepnej, terminOceny, terminyPierwszegoZatrudnienia,
  oknoOcenyPrzyZmianie, ponownaOcenaPo, terminySprzeciwu } from '../app/zasady.mjs';

const urzad = {
  nazwa: 'Urząd Wojewódzki w Przykładowie (fikcyjny)', miejscowosc: 'Przykładowo',
  dyrektor_generalny: { imie: 'Grażyna', nazwisko: 'Wierzbicka', rola: 'dyrektor generalny urzędu — adresat sprzeciwu (art. 83 ust. 1 [U])' },
  komorki: [{ id: 'k1', nazwa: 'Wydział Administracji i Zamówień' }, { id: 'k2', nazwa: 'Wydział Spraw Obywatelskich' }],
};

// Opisy stanowisk — pkt 10.2 (A tylko jako tło)
const stanowiska = [
  { id: 's1', nazwa: 'Kierownik urzędu (tło)', komorka: null, arkusz: 'A', obowiazki: ['Kierowanie urzędem', 'Planowanie strategiczne', 'Nadzór nad budżetem'], wymagania: ['wykształcenie wyższe', '6 lat stażu, w tym 3 na stanowisku kierowniczym'], klienci: 'administracja rządowa, samorządy' },
  { id: 's2', nazwa: 'Naczelnik Wydziału Administracji i Zamówień', komorka: 'k1', arkusz: 'B', obowiazki: ['Kierowanie zespołem 6 osób', 'Zatwierdzanie dokumentacji zamówień', 'Planowanie zamówień rocznych', 'Współpraca z komórką finansową'], wymagania: ['wykształcenie wyższe', '4 lata stażu', 'znajomość Pzp'], klienci: 'komórki urzędu, wykonawcy' },
  { id: 's3', nazwa: 'Naczelnik Wydziału Spraw Obywatelskich', komorka: 'k2', arkusz: 'B', obowiazki: ['Kierowanie zespołem obsługi klienta', 'Nadzór nad wydawaniem paszportów', 'Rozpatrywanie skarg na obsługę'], wymagania: ['wykształcenie wyższe', '4 lata stażu'], klienci: 'obywatele' },
  { id: 's4', nazwa: 'Starszy specjalista ds. zamówień publicznych', komorka: 'k1', arkusz: 'C', obowiazki: ['Przygotowanie dokumentacji postępowań', 'Prowadzenie rejestru zamówień', 'Udział w komisjach przetargowych', 'Sprawozdania do UZP'], wymagania: ['wykształcenie wyższe', '3 lata stażu', 'znajomość Pzp i KPA'], klienci: 'wykonawcy, komórki urzędu' },
  { id: 's5', nazwa: 'Specjalista ds. skarg i wniosków', komorka: 'k2', arkusz: 'C', obowiazki: ['Rejestracja i analiza skarg', 'Projekty odpowiedzi', 'Pilnowanie terminów KPA', 'Raporty kwartalne'], wymagania: ['wykształcenie wyższe', '1 rok stażu'], klienci: 'obywatele' },
  { id: 's6', nazwa: 'Referent ds. obsługi klienta (paszporty)', komorka: 'k2', arkusz: 'C', obowiazki: ['Przyjmowanie wniosków paszportowych', 'Wydawanie dokumentów', 'Udzielanie informacji'], wymagania: ['wykształcenie średnie'], klienci: 'obywatele' },
];

const P = (id, imie, nazwisko, stanowisko, przelozony, korpus, extra = {}) => ({ id, imie, nazwisko, stanowisko, przelozony, korpus, ...extra });
const osoby = [
  P('o1', 'Halina', 'Grabowska', 's2', 'dg', 'urzędnik służby cywilnej', { mianowanie: { rok: 2015, stopien: 'radca', stopien_od: '2019-05-01' }, czas_nieokreslony_od: '2012-03-01', poprzednia_ocena: '2024-09-16' }),
  P('o2', 'Robert', 'Mazur', 's3', 'dg', 'pracownik służby cywilnej', { czas_nieokreslony_od: '2016-07-01', poprzednia_ocena: '2024-10-01' }),
  // Przypadek 2 (materialy.md pkt 11): poprzednia ocena 15.03.2025, nieobecność 01.09–31.12.2025, zmiana oceniającego 10.10.2026
  P('o3', 'Katarzyna', 'Wiśniewska', 's4', 'o1', 'urzędnik służby cywilnej', { mianowanie: { rok: 2020, stopien: 'starszy specjalista', stopien_od: '2020-11-01' }, czas_nieokreslony_od: '2018-04-01', poprzednia_ocena: '2025-03-15', nieobecnosci: [['2025-09-01', '2025-12-31', 'urlop rodzicielski']], zmiana_oceniajacego: { data: '2026-10-10', nowy: 'o1', poprzedni: 'Jan Pietrzak (odszedł z urzędu)' } }),
  // Przypadek 3: negatywna 10.06.2026, sprzeciw 15.06.2026, decyzja doręczona 30.06.2026
  P('o4', 'Tomasz', 'Wójcik', 's5', 'o2', 'urzędnik służby cywilnej', { mianowanie: { rok: 2021, stopien: 'specjalista', stopien_od: '2021-06-01' }, czas_nieokreslony_od: '2019-02-01', poprzednia_ocena: '2026-06-10' }),
  // Przypadek 1: pierwsze zatrudnienie 02.02.2026 (pierwszy raz oceniany)
  P('o5', 'Magdalena', 'Kamińska', 's6', 'o2', 'pracownik służby cywilnej', { pierwsze_zatrudnienie: '2026-02-02' }),
  P('o6', 'Marcin', 'Lewandowski', 's4', 'o1', 'pracownik służby cywilnej', { czas_nieokreslony_od: '2017-09-01', poprzednia_ocena: '2026-03-20' }),
  // Zmiana stanowiska z istotną zmianą obowiązków (T7)
  P('o7', 'Agnieszka', 'Zielińska', 's5', 'o2', 'pracownik służby cywilnej', { czas_nieokreslony_od: '2014-01-02', poprzednia_ocena: '2025-01-20', zmiana_stanowiska: { data: '2026-05-04', z: 's6', na: 's5', istotna: true } }),
  P('o8', 'Paweł', 'Szymański', 's6', 'o2', 'pracownik służby cywilnej', { czas_nieokreslony_od: '2020-10-01', poprzednia_ocena: '2025-11-28' }),
];

// Terminy wg tabeli T1–T13
for (const o of osoby) {
  const t = {};
  if (o.pierwsze_zatrudnienie) {
    Object.assign(t, terminyPierwszegoZatrudnienia(o.pierwsze_zatrudnienie)); t.zrodlo = 'T1–T4';
    t.rozmowa_wstepna_do = terminRozmowyWstepnej(t.czas_nieokreslony_od);
    t.pierwsza_ocena_okresowa = terminOceny(t.czas_nieokreslony_od).termin;
  } else {
    const neg = o.id === 'o4';
    t.rozmowa_wstepna_do = terminRozmowyWstepnej(o.poprzednia_ocena, neg); t.zrodlo = neg ? 'T5 (7 dni po negatywnej), T11' : 'T5, T6, T6a, T8';
    Object.assign(t, terminOceny(o.poprzednia_ocena, (o.nieobecnosci || []).map(([a, b]) => [a, b])));
    if (neg) t.ponowna_ocena_nie_wczesniej_niz = ponownaOcenaPo(o.poprzednia_ocena);
    if (o.zmiana_stanowiska) { t.ocena_przy_zmianie_stanowiska = oknoOcenyPrzyZmianie(o.poprzednia_ocena, o.zmiana_stanowiska.data); t.zrodlo += ', T7'; }
    if (o.zmiana_oceniajacego) t.uwaga_T10 = 'ocena wg kryteriów wybranych wcześniej (§ 9 ust. 3 [R])';
  }
  o.terminy = t;
}

const os = (id) => osoby.find((o) => o.id === id);
const st = (id) => stanowiska.find((s) => s.id === id);
const osobaArk = (o) => ({ imie: o.imie, nazwisko: o.nazwisko, stanowisko: st(o.stanowisko).nazwa });
const oceniajacy = (o) => o.przelozony === 'dg' ? { imie: urzad.dyrektor_generalny.imie, nazwisko: urzad.dyrektor_generalny.nazwisko, stanowisko: 'Dyrektor generalny' } : osobaArk(os(o.przelozony));

// Arkusze — pkt 10.4: (a) poziom oczekiwań, (b) powyżej + stopień, (c) jedna „1” przy średniej >4, (d) negatywna ze średniej + sprzeciw
function arkusz(id, osobaId, dodatkowe, oceny, d, extra = {}) {
  const o = os(osobaId); const typ = st(o.stanowisko).arkusz;
  const kryteria = [...OBOWIAZKOWE[typ], ...dodatkowe];
  if (kryteria.length !== oceny.length) throw new Error(`${id}: liczba ocen ≠ liczba kryteriów`);
  const w = wynikOceny(oceny); const urzednik = o.korpus.startsWith('urzędnik');
  return {
    id, osoba: osobaId, typ_arkusza: typ, scenariusz: extra.scenariusz,
    czesc_I: { urzad: urzad.nazwa, oceniany: osobaArk(o), oceniajacy: oceniajacy(o), kryteria_obowiazkowe: OBOWIAZKOWE[typ], kryteria_dodatkowe: dodatkowe,
      termin_sporzadzenia_oceny: d.termin, data_rozmowy_wstepnej: d.od, oswiadczenie_ocenianego: { miejscowosc: urzad.miejscowosc, data: d.od, podpisano: true } },
    czesc_II: {
      data_rozmowy_oceniajacej: d.rozmowa, okres_od: d.od, okres_do: d.sporzadzenie,
      oceny: kryteria.map((k, i) => ({ kryterium: k, obowiazkowe: i < OBOWIAZKOWE[typ].length, ocena: oceny[i], opis: SKALA[oceny[i]] })),
      srednia: w.srednia, ogolny_poziom: w.poziom, wynik: w.wynik, powod_negatywnej: w.powod,
      uzasadnienie: extra.uzasadnienie ?? null,
      wnioski_iprz: extra.iprz,
      poprzednia_ocena: extra.poprzednia ?? null,
      wniosek_o_stopien: urzednik ? (extra.stopien ? 'TAK' : 'NIE') : 'NIE DOTYCZY',
      data_sporzadzenia: d.sporzadzenie, data_zapoznania_ocenianego: d.zapoznanie,
      pouczenie: `Sprzeciw do dyrektora generalnego urzędu (${urzad.dyrektor_generalny.imie} ${urzad.dyrektor_generalny.nazwisko}) w terminie 7 dni od zapoznania z oceną — art. 83 ust. 1 [U].`,
    },
    czesc_III: extra.stopien ? { imie: o.imie, nazwisko: o.nazwisko, rok_mianowania: o.mianowanie.rok, stopien: o.mianowanie.stopien, stopien_od: o.mianowanie.stopien_od, wniosek: extra.stopien } : null,
  };
}
const IPRZ_DOBRE = (obszar, forma, termin) => ({ kierunki: `rozwój w obszarze: ${obszar}`, obszary: [obszar], formy: [forma], termin, jakosc: 'dobre' });
const arkusze = [
  arkusz('a1', 'o3', ['myślenie analityczne'], [5, 5, 5, 7, 5, 5], { od: '2023-04-12', termin: '2025-03-15', rozmowa: '2025-03-10', sporzadzenie: '2025-03-15', zapoznanie: '2025-03-15' },
    { scenariusz: '(a) pozytywna, na poziomie oczekiwań', iprz: IPRZ_DOBRE('nowelizacja Pzp', 'szkolenie sz3 (2 dni)', '2025-06-30'), poprzednia: { wynik: 'pozytywna', poziom: SKALA[5], data: '2023-03-14' } }),
  arkusz('a2', 'o1', ['zarządzanie strategiczne', 'negocjowanie'], [7, 9, 7, 7, 9, 7, 7], { od: '2022-10-10', termin: '2024-09-16', rozmowa: '2024-09-11', sporzadzenie: '2024-09-16', zapoznanie: '2024-09-16' },
    { scenariusz: '(b) pozytywna, powyżej oczekiwań, wniosek o stopień', iprz: IPRZ_DOBRE('zarządzanie zmianą', 'studia podyplomowe', '2025-12-31'), poprzednia: { wynik: 'pozytywna', poziom: SKALA[7], data: '2022-09-20' },
      stopien: 'Wnioskuję o stopień „główny radca” — wdrożenie e-zamówień w całym urzędzie, zespół bez rotacji przez 2 lata.' }),
  arkusz('a3', 'o6', ['orientacja na klienta/interesanta'], [7, 1, 7, 7, 7, 5], { od: '2024-04-15', termin: '2026-03-20', rozmowa: '2026-03-16', sporzadzenie: '2026-03-20', zapoznanie: '2026-03-23' },
    { scenariusz: '(c) negatywna przez jedną ocenę 1 przy średniej > 4 (§ 11)', uzasadnienie: 'Rzetelność: w 3 postępowaniach błędy w ogłoszeniach wymagające sprostowania (notatki z 12.05.2025, 03.09.2025, 18.11.2025), mimo wcześniejszego omówienia.',
      iprz: IPRZ_DOBRE('rzetelność dokumentacji', 'mentoring z o3 + szkolenie sz3', '2026-09-30'), poprzednia: { wynik: 'pozytywna', poziom: SKALA[5], data: '2024-03-18' } }),
  arkusz('a4', 'o4', [], [3, 3, 5, 3, 1], { od: '2024-07-08', termin: '2026-06-10', rozmowa: '2026-06-05', sporzadzenie: '2026-06-10', zapoznanie: '2026-06-10' },
    { scenariusz: '(d) negatywna ze średniej, z uzasadnieniem; sprzeciw', uzasadnienie: 'Komunikacja: 14 odpowiedzi na skargi po terminie KPA; wykorzystywanie wiedzy: brak udziału w zaplanowanych szkoleniach; organizacja pracy na poziomie oczekiwań.',
      iprz: IPRZ_DOBRE('terminowość w KPA', 'szkolenie sz1 + cotygodniowy przegląd terminów z przełożonym', '2026-11-30'), poprzednia: { wynik: 'pozytywna', poziom: SKALA[5], data: '2024-06-14' } }),
  arkusz('a5', 'o8', [], [5, 5, 7, 5, 5], { od: '2023-12-20', termin: '2025-11-28', rozmowa: '2025-11-24', sporzadzenie: '2025-11-28', zapoznanie: '2025-11-28' },
    { scenariusz: 'pozytywna, IPRZ słabe (puste formy — jak w NIK)', iprz: { kierunki: 'dalszy rozwój', obszary: [], formy: [], termin: null, jakosc: 'słabe' }, poprzednia: null }),
  arkusz('a6', 'o2', ['radzenie sobie w sytuacjach kryzysowych'], [7, 7, 5, 7, 7, 7], { od: '2022-10-24', termin: '2024-10-01', rozmowa: '2024-09-26', sporzadzenie: '2024-10-01', zapoznanie: '2024-10-02' },
    { scenariusz: 'pozytywna, powyżej oczekiwań (pracownik — stopień nie dotyczy)', iprz: IPRZ_DOBRE('zarządzanie ludźmi', 'szkolenie sz7', '2025-04-30'), poprzednia: { wynik: 'pozytywna', poziom: SKALA[5], data: '2022-09-30' } }),
];

// Sprzeciw — pkt 10.8, przypadek 3
const sprzeciwy = [{ id: 'sp1', arkusz: 'a4', osoba: 'o4', adresat: 'dyrektor generalny urzędu', wniesiony: '2026-06-15',
  zarzut: 'Ocena „1” za komunikację nie uwzględnia zwiększenia liczby skarg o 40% w II kwartale i nieobsadzonego etatu w zespole.',
  rozstrzygniecie: 'nieuwzględniony', doreczenie_decyzji: '2026-06-30', ...terminySprzeciwu('2026-06-10', '2026-06-15', '2026-06-30'), zrodlo: 'T12 — art. 83 ust. 1, 3, 5 [U]' }];

// Notatki przełożonego w okresie — pkt 10.5 (z kryterium albo „szum”: kryterium null)
const N = (osoba, data, kryterium, tresc) => ({ osoba, autor: os(osoba).przelozony, data, kryterium, tresc });
const notatki = [
  N('o3', '2025-05-06', 'myślenie analityczne', 'Analiza ofert w przetargu na sprzęt IT — wykryła zaniżoną cenę, uniknięto unieważnienia.'),
  N('o3', '2025-07-22', 'współpraca', 'Pomogła Wydziałowi Finansów przy planie zamówień na 2026.'),
  N('o3', '2025-09-01', null, 'Początek urlopu rodzicielskiego (do 31.12.2025).'),
  N('o3', '2026-02-10', 'wykorzystywanie wiedzy i doskonalenie zawodowe', 'Ukończyła szkolenie z nowelizacji Pzp; przygotowała notatkę dla zespołu.'),
  N('o6', '2025-05-12', 'rzetelność', 'Błąd w ogłoszeniu o zamówieniu — konieczne sprostowanie.'),
  N('o6', '2025-09-03', 'rzetelność', 'Ponowny błąd w terminie składania ofert; omówione na rozmowie bieżącej.'),
  N('o6', '2025-10-14', 'orientacja na klienta/interesanta', 'Wykonawca pochwalił szybkie odpowiedzi na pytania do SWZ.'),
  N('o6', '2025-11-18', 'rzetelność', 'Trzeci błąd formalny (brak załącznika w SWZ).'),
  N('o4', '2025-03-04', 'komunikacja', 'Odpowiedź na skargę po terminie KPA (5 dni).'),
  N('o4', '2025-06-30', null, 'Skarga obywatela na niegrzeczną obsługę telefoniczną — wyjaśniono, nie potwierdziła się.'),
  N('o4', '2025-10-08', 'wykorzystywanie wiedzy i doskonalenie zawodowe', 'Nie stawił się na zaplanowanym szkoleniu z KPA.'),
  N('o4', '2026-02-17', 'organizacja pracy i orientacja na osiąganie celów', 'Wprowadził rejestr terminów w arkuszu — poprawa w lutym.'),
  N('o8', '2024-06-11', 'orientacja na klienta/interesanta', 'Obsłużył 40 interesantów w dniu awarii systemu — bez skarg.'),
  N('o8', '2025-03-03', null, 'Zastępstwo na stanowisku informacji (5 dni).'),
  N('o7', '2026-05-04', null, 'Przejście na stanowisko ds. skarg i wniosków — istotna zmiana obowiązków.'),
  N('o7', '2026-07-15', 'komunikacja', 'Przygotowała wzory odpowiedzi na typowe skargi, przyjęte przez zespół.'),
  N('o1', '2023-11-20', 'zarządzanie ludźmi', 'Wdrożyła 2 nowe osoby; obie zdały egzamin po służbie przygotowawczej.'),
  N('o2', '2024-04-02', 'radzenie sobie w sytuacjach kryzysowych', 'Kolejki przy wydawaniu paszportów przed wakacjami — zorganizowała dodatkowe okienka.'),
].map((n, i) => ({ id: `n${i + 1}`, ...n }));

// Cele okresu — pkt 10.6 (§ 5 ust. 1 pkt 4 [R])
const cele = [
  ['o1', 'Wdrożyć e-zamówienia w całym urzędzie do końca 2025'], ['o1', 'Skrócić średni czas postępowania o 15%'],
  ['o2', 'Czas oczekiwania w kolejce < 20 min'], ['o2', 'Zero skarg zasadnych na obsługę'],
  ['o3', 'Zaktualizować wzory dokumentacji do nowelizacji Pzp'], ['o3', 'Przeszkolić 2 osoby z platformy e-zamówień'],
  ['o4', '100% odpowiedzi na skargi w terminie KPA'], ['o4', 'Raport kwartalny do 10. dnia po kwartale'],
  ['o6', 'Brak sprostowań ogłoszeń z powodu błędów'], ['o6', 'Prowadzić samodzielnie 4 postępowania'],
  ['o7', 'Opracować wzory odpowiedzi na typowe skargi'], ['o7', 'Wdrożyć się w KPA w 3 mies.'],
  ['o8', 'Obsługiwać 30 interesantów dziennie'], ['o8', 'Nauczyć się obsługi systemu ŹRÓDŁO'],
].map(([osoba, cel], i) => ({ id: `c${i + 1}`, osoba, cel }));

// Katalog szkoleń (fikcyjny) — pkt 10.9
const szkolenia = [
  ['sz1', 'KPA w praktyce — terminy i odpowiedzi', 'komunikacja'], ['sz2', 'Prosty język w pismach urzędowych', 'komunikacja'],
  ['sz3', 'Nowelizacja Prawa zamówień publicznych', 'wykorzystywanie wiedzy i doskonalenie zawodowe'], ['sz4', 'Kontrola jakości dokumentów', 'rzetelność'],
  ['sz5', 'Trudny klient — obsługa i deeskalacja', 'orientacja na klienta/interesanta'], ['sz6', 'Planowanie pracy i priorytety', 'organizacja pracy i orientacja na osiąganie celów'],
  ['sz7', 'Przywództwo dla kierowników zespołów', 'zarządzanie ludźmi'], ['sz8', 'Excel w analizie danych', 'myślenie analityczne'],
  ['sz9', 'Negocjacje z wykonawcami', 'negocjowanie'], ['sz10', 'Wystąpienia publiczne dla urzędników', 'wystąpienia publiczne'],
].map(([id, nazwa, kryterium]) => ({ id, nazwa, kryterium }));

for (const k of [...notatki.map((n) => n.kryterium), ...szkolenia.map((s) => s.kryterium)]) if (k && !KRYTERIA.includes(k)) throw new Error('kryterium spoza wykazu: ' + k);

const dane = { zrodlo: 'docs/materialy.md (18.11.2026); wszystkie osoby i urząd fikcyjne', urzad, skala: SKALA, kryteria: KRYTERIA, kryteria_obowiazkowe: OBOWIAZKOWE,
  stanowiska, osoby, arkusze, sprzeciwy, notatki, cele, szkolenia,
  podpowiedzi_ai: JSON.parse(readFileSync('dane/podpowiedzi-ai.json', 'utf8')) }; // teksty AI pisane ręcznie z góry (P13)
mkdirSync('dane', { recursive: true });
for (const k of ['stanowiska', 'osoby', 'arkusze', 'sprzeciwy', 'notatki', 'cele', 'szkolenia']) writeFileSync(`dane/${k}.json`, JSON.stringify(dane[k], null, 2) + '\n');
writeFileSync('dane/wszystko.json', JSON.stringify(dane, null, 2) + '\n');
writeFileSync('app/dane.js', `// wygenerowane: node scripts/generuj-dane.mjs\nwindow.DANE = ${JSON.stringify(dane)};\n`);
const liczby = { stanowiska: stanowiska.length, osoby: osoby.length, arkusze: arkusze.length, sprzeciwy: sprzeciwy.length, notatki: notatki.length, cele: cele.length, szkolenia: szkolenia.length };
console.log(`wynik: ${Object.entries(liczby).map(([k, v]) => `${k}=${v}`).join(' ')} razem=${Object.values(liczby).reduce((a, b) => a + b)}`);
