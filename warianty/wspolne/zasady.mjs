// Reguły oceny okresowej — źródło: docs/materialy.md ([U] ustawa o SC, [R] rozp. PRM z 4.04.2016).
// Wspólne dla generatora danych, testów i aplikacji (ES module, działa w Node i w przeglądarce).

// Wykaz 14 kryteriów — zał. 1 do [R]
export const KRYTERIA = ['komunikacja', 'kreatywność', 'negocjowanie', 'organizacja pracy i orientacja na osiąganie celów',
  'orientacja na klienta/interesanta', 'podejmowanie decyzji i odpowiedzialność', 'radzenie sobie w sytuacjach kryzysowych',
  'rzetelność', 'myślenie analityczne', 'wykorzystywanie wiedzy i doskonalenie zawodowe', 'współpraca', 'wystąpienia publiczne',
  'zarządzanie ludźmi', 'zarządzanie strategiczne'];

// Kryteria obowiązkowe wg arkusza — [R] § 4 ust. 1–3
export const OBOWIAZKOWE = {
  A: ['zarządzanie ludźmi', 'podejmowanie decyzji i odpowiedzialność', 'organizacja pracy i orientacja na osiąganie celów', 'współpraca', 'komunikacja', 'zarządzanie strategiczne'],
  B: ['zarządzanie ludźmi', 'podejmowanie decyzji i odpowiedzialność', 'organizacja pracy i orientacja na osiąganie celów', 'współpraca', 'komunikacja'],
  C: ['wykorzystywanie wiedzy i doskonalenie zawodowe', 'rzetelność', 'organizacja pracy i orientacja na osiąganie celów', 'współpraca', 'komunikacja'],
};
export const MAX_DODATKOWYCH = 3; // [R] § 2 ust. 2

// Skala ocen cząstkowych — [R] § 11 ust. 1 pkt 1
export const SKALA = { 1: 'znacznie poniżej oczekiwań', 3: 'poniżej oczekiwań', 5: 'na poziomie oczekiwań', 7: 'powyżej oczekiwań', 9: 'znacznie powyżej oczekiwań' };

// Średnia → poziom — [R] § 11 ust. 1 pkt 2–3 (przedziały 1–2, >2–4, >4–6, >6–8, >8–9)
export function poziom(srednia) {
  if (srednia <= 2) return SKALA[1];
  if (srednia <= 4) return SKALA[3];
  if (srednia <= 6) return SKALA[5];
  if (srednia <= 8) return SKALA[7];
  return SKALA[9];
}

// Wynik — [R] § 11 ust. 1 pkt 4: pozytywna = poziom ≥ „na poziomie” i żadnej oceny 1; inaczej negatywna.
export function wynikOceny(oceny) {
  const srednia = Math.round((oceny.reduce((a, b) => a + b, 0) / oceny.length) * 100) / 100;
  const p = poziom(srednia);
  const jedynka = oceny.includes(1);
  const pozytywna = srednia > 4 && !jedynka;
  return { srednia, poziom: p, wynik: pozytywna ? 'pozytywna' : 'negatywna',
    powod: pozytywna ? null : jedynka && srednia > 4 ? 'ocena cząstkowa 1 (znacznie poniżej oczekiwań) — § 11' : 'średnia poniżej oczekiwań — § 11' };
}

// ---- Daty (ISO RRRR-MM-DD, UTC). Dni kalendarzowe; miesiące dzień w dzień ([I] z docs/materialy.md pkt 11).
const D = (s) => new Date(s + 'T00:00:00Z');
const iso = (d) => d.toISOString().slice(0, 10);
export const dodajDni = (s, n) => { const d = D(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
export const dodajMiesiace = (s, n) => {
  const d = D(s); const dzien = d.getUTCDate(); d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth() + n);
  const ost = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(dzien, ost)); return iso(d);
};
export const dniWlacznie = (od, doo) => Math.round((D(doo) - D(od)) / 864e5) + 1;

// T1–T4: pierwsze zatrudnienie (art. 35–38 [U])
export function terminyPierwszegoZatrudnienia(start) {
  return { umowa_do: dodajDni(dodajMiesiace(start, 12), -1), sluzba_przygotowawcza_najpozniej: dodajMiesiace(start, 8),
    pierwsza_ocena_po: dodajMiesiace(start, 8), pierwsza_ocena_najpozniej: dodajMiesiace(dodajDni(dodajMiesiace(start, 12), -1), -1),
    czas_nieokreslony_od: dodajMiesiace(start, 12) };
}
// T5: rozmowa wstępna — 30 dni od zatrudnienia na czas nieokreślony / poprzedniej oceny; 7 dni po negatywnej ([R] § 7)
export const terminRozmowyWstepnej = (od, poNegatywnej = false) => dodajDni(od, poNegatywnej ? 7 : 30);
// T6, T6a, T8: termin oceny = start + 24 mies. + czas nieobecności >1 mies. ([U] art. 81 ust. 4, 7)
export function terminOceny(start, nieobecnosci = []) {
  const bazowy = dodajMiesiace(start, 24);
  const doliczone = nieobecnosci.map(([od, doo]) => dniWlacznie(od, doo)).filter((n, i) => dodajMiesiace(nieobecnosci[i][0], 1) <= nieobecnosci[i][1]);
  const dni = doliczone.reduce((a, b) => a + b, 0);
  return { bazowy, przedluzenie_dni: dni, termin: dodajDni(bazowy, dni) };
}
// T7: ocena przy zmianie stanowiska ([U] art. 81 ust. 6; [R] § 9 ust. 2)
export function oknoOcenyPrzyZmianie(ostatniaOcena, zmiana) {
  if (dodajMiesiace(ostatniaOcena, 6) >= zmiana) return null; // ≤ 6 mies. → T7a, powtórzenie rozmowy wstępnej
  return { od: dodajDni(zmiana, -7), do: dodajDni(zmiana, 30) };
}
// T11: ponowna ocena po negatywnej ([U] art. 81 ust. 9)
export const ponownaOcenaPo = (zapoznanie) => dodajMiesiace(zapoznanie, 6);
// Zapoznanie z oceną = dzień, w którym pracownik je potwierdza (Szef, docs/decyzje.md 18:58).
// Od tej daty: 7 dni na sprzeciw ([U] art. 83 ust. 1) i — przy negatywnej — 6 mies. do ponownej oceny ([U] art. 81 ust. 9).
export const terminyPoZapoznaniu = (potwierdzenie, wynik = 'negatywna') => ({ zapoznanie: potwierdzenie, sprzeciw_do: dodajDni(potwierdzenie, 7),
  ponowna_ocena_po: wynik === 'negatywna' ? ponownaOcenaPo(potwierdzenie) : null });
// T12: sprzeciw ([U] art. 83)
export function terminySprzeciwu(zapoznanie, wniesiony, doreczenieDecyzji) {
  return { sprzeciw_do: dodajDni(zapoznanie, 7), rozpatrzenie_do: wniesiony ? dodajDni(wniesiony, 14) : null,
    odwolanie_do_sadu_do: doreczenieDecyzji ? dodajDni(doreczenieDecyzji, 14) : null };
}
