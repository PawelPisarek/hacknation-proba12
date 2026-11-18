// Generator sztucznych danych do makiety i MVP. Deterministyczny (ziarno), bez zależności.
// Uruchom: node scripts/generuj-dane.mjs [ziarno]  -> dane/*.json + app/dane.js
// UWAGA: pola arkusza oceny to OGÓLNY KSZTAŁT — DO POPRAWY wg docs/materialy.md (Analityk).
import { writeFileSync, mkdirSync } from 'node:fs';

let s = Number(process.argv[2] ?? 12);
const los = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
const wybierz = (t) => t[Math.floor(los() * t.length)];
const zakres = (a, b) => a + Math.floor(los() * (b - a + 1));

const URZAD = 'Urząd Wojewódzki w Przykładowie (dane sztuczne)';
const stanowiska = [
  { id: 'st1', nazwa: 'Starszy specjalista ds. zamówień publicznych', komorka: 'Wydział Administracji', cele: 'Przygotowanie i prowadzenie postępowań o udzielenie zamówienia publicznego.', zadania: ['Przygotowanie dokumentacji postępowań', 'Prowadzenie rejestru zamówień', 'Udział w pracach komisji przetargowych', 'Sporządzanie sprawozdań do UZP'] },
  { id: 'st2', nazwa: 'Inspektor wojewódzki ds. skarg i wniosków', komorka: 'Biuro Wojewody', cele: 'Rozpatrywanie skarg i wniosków obywateli w terminach KPA.', zadania: ['Rejestracja i analiza skarg', 'Przygotowanie projektów odpowiedzi', 'Monitorowanie terminów', 'Raporty kwartalne'] },
  { id: 'st3', nazwa: 'Specjalista ds. kadr', komorka: 'Biuro Kadr', cele: 'Obsługa kadrowa członków korpusu służby cywilnej.', zadania: ['Prowadzenie akt osobowych', 'Organizacja naborów', 'Koordynacja ocen okresowych', 'Planowanie szkoleń'] },
  { id: 'st4', nazwa: 'Główny specjalista ds. funduszy UE', komorka: 'Wydział Finansów', cele: 'Kontrola wydatkowania środków unijnych przez beneficjentów.', zadania: ['Kontrole na miejscu', 'Weryfikacja wniosków o płatność', 'Sporządzanie informacji pokontrolnych'] },
  { id: 'st5', nazwa: 'Referent ds. obsługi klienta', komorka: 'Wydział Spraw Obywatelskich', cele: 'Obsługa interesantów w sprawach paszportowych.', zadania: ['Przyjmowanie wniosków', 'Wydawanie dokumentów', 'Udzielanie informacji'] },
];
const imiona = ['Anna', 'Piotr', 'Katarzyna', 'Tomasz', 'Magdalena', 'Marcin', 'Agnieszka', 'Paweł', 'Joanna', 'Michał', 'Ewa', 'Krzysztof', 'Monika', 'Łukasz', 'Barbara', 'Jakub'];
const nazwiska = ['Kowalsk', 'Nowak', 'Wiśniewsk', 'Wójcik', 'Kamińsk', 'Lewandowsk', 'Zielińsk', 'Szymańsk', 'Dąbrowsk', 'Kozłowsk'];
const zakonczenie = (im, nz) => (nz.endsWith('k') ? nz + (im.endsWith('a') ? 'a' : 'i') : nz);

const przelozeni = [
  { id: 'p1', imie: 'Halina', nazwisko: 'Grabowska', funkcja: 'Dyrektor Wydziału Administracji' },
  { id: 'p2', imie: 'Robert', nazwisko: 'Mazur', funkcja: 'Kierownik Oddziału' },
];

const pracownicy = Array.from({ length: 15 }, (_, i) => {
  const imie = wybierz(imiona); const st = stanowiska[i % stanowiska.length];
  return { id: `pr${i + 1}`, imie, nazwisko: zakonczenie(imie, wybierz(nazwiska)), stanowisko: st.id, przelozony: przelozeni[i % 2].id,
    staz_lat: zakres(1, 20), korpus: wybierz(['pracownik służby cywilnej', 'urzędnik służby cywilnej']), ostatnia_ocena: `20${zakres(22, 24)}-${String(zakres(1, 12)).padStart(2, '0')}-15` };
});

const wzorce = {
  plus: ['Terminowo zakończył(a) {z} mimo zwiększonej liczby spraw.', 'Samodzielnie zaproponował(a) usprawnienie: {z}.', 'Pozytywna opinia interesanta/komórki współpracującej po: {z}.', 'Przeszkolił(a) nową osobę w zakresie: {z}.'],
  minus: ['Opóźnienie ok. {d} dni przy: {z}.', 'Błędy formalne wymagające poprawek w: {z}.', 'Potrzebne wsparcie przy: {z} — do omówienia.'],
  neutral: ['Udział w szkoleniu z {t}.', 'Rozmowa bieżąca: plan na kolejny kwartał, {z}.', 'Zastępstwo za nieobecną osobę ({d} dni).'],
};
const tematy = ['KPA', 'ochrony danych osobowych', 'Prawa zamówień publicznych', 'komunikacji z klientem', 'Excela'];
const notatki = [];
for (const p of pracownicy) {
  const st = stanowiska.find((x) => x.id === p.stanowisko);
  for (let k = 0, n = zakres(3, 6); k < n; k++) {
    const typ = wybierz(['plus', 'plus', 'neutral', 'minus']);
    notatki.push({ id: `n${notatki.length + 1}`, pracownik: p.id, autor: p.przelozony, data: `2025-${String(zakres(1, 12)).padStart(2, '0')}-${String(zakres(1, 28)).padStart(2, '0')}`, typ,
      tresc: wybierz(wzorce[typ]).replace('{z}', wybierz(st.zadania).toLowerCase()).replace('{d}', zakres(2, 10)).replace('{t}', wybierz(tematy)) });
  }
}
notatki.sort((a, b) => a.data.localeCompare(b.data));

// DO POPRAWY wg docs/materialy.md: lista kryteriów, skala i formularz z rozporządzenia.
const kryteria_obowiazkowe = ['sumienność', 'sprawność', 'bezstronność', 'umiejętność stosowania odpowiednich przepisów'];
const kryteria_do_wyboru = ['planowanie i organizacja pracy', 'komunikacja', 'współpraca', 'orientacja na klienta', 'umiejętności analityczne', 'zarządzanie wiedzą', 'inicjatywa'];
const skala = { 5: 'znacznie powyżej oczekiwań', 4: 'powyżej oczekiwań', 3: 'na poziomie oczekiwań', 2: 'poniżej oczekiwań', 1: 'znacznie poniżej oczekiwań' };
const arkusze = pracownicy.map((p, i) => {
  const wybrane = [...kryteria_do_wyboru].sort(() => los() - 0.5).slice(0, 3);
  const oceny = [...kryteria_obowiazkowe, ...wybrane].map((k) => ({ kryterium: k, obowiazkowe: kryteria_obowiazkowe.includes(k), ocena: zakres(2, 5), uzasadnienie: `Uzasadnienie przykładowe dla kryterium „${k}”.` }));
  const sr = oceny.reduce((a, o) => a + o.ocena, 0) / oceny.length;
  return { id: `a${i + 1}`, pracownik: p.id, oceniajacy: p.przelozony, okres_od: '2024-01-01', okres_do: '2025-12-31', status: wybierz(['szkic', 'do rozmowy', 'zakończony']),
    oceny, srednia: Math.round(sr * 100) / 100, ocena_koncowa: sr >= 4.5 ? 'wyróżniająca' : sr >= 3 ? 'pozytywna' : 'negatywna',
    wnioski_rozwojowe: [`Szkolenie: ${wybierz(tematy)}`], _uwaga: 'kształt ogólny — DO POPRAWY wg docs/materialy.md' };
});

const dane = { urzad: URZAD, wygenerowano_ziarnem: Number(process.argv[2] ?? 12), skala, kryteria_obowiazkowe, kryteria_do_wyboru, stanowiska, przelozeni, pracownicy, notatki, arkusze };
mkdirSync('dane', { recursive: true });
for (const k of ['stanowiska', 'przelozeni', 'pracownicy', 'notatki', 'arkusze']) writeFileSync(`dane/${k}.json`, JSON.stringify(dane[k], null, 2) + '\n');
writeFileSync('dane/wszystko.json', JSON.stringify(dane, null, 2) + '\n');
writeFileSync('app/dane.js', `// wygenerowane: node scripts/generuj-dane.mjs\nwindow.DANE = ${JSON.stringify(dane)};\n`);
const razem = stanowiska.length + przelozeni.length + pracownicy.length + notatki.length + arkusze.length;
console.log(`wynik: stanowiska=${stanowiska.length} przelozeni=${przelozeni.length} pracownicy=${pracownicy.length} notatki=${notatki.length} arkusze=${arkusze.length} razem=${razem}`);
