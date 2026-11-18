# Specyfikacja MVP: asystent ocen okresowych (służba cywilna)

Wersja z 18.11.2026 (krok 2, `/write-prd`). Podstawy: `docs/pm/03-write-prd.md`, `docs/pm/02-discover.md`, `docs/pm/03a-warianty.md`, odpowiedzi Artura P1–P20 (`docs/decyzje.md`), przepisy: `docs/materialy.md` ([U] ustawa Dz.U. 2026 poz. 590; [R] rozporządzenie Dz.U. 2016 poz. 470).
Makieta wzorcowa (wariant 1, P14): https://pawelpisarek.github.io/hacknation-proba12/makieta/ · zrzuty: `docs/zrzuty/R1/`.

## 1. Co zobaczy i zrobi użytkownik (według Artura)
- **Przełożony (użytkownik główny, P1)** zaczyna od **listy osób** (P16) z etapem ①–⑤ każdej oceny. Terminy wszystkich osób są w **dzwonku z przypomnieniami** (P17, P6), nie na osobnym ekranie. Otwiera osobę, widzi na jednym ekranie: pasek etapów, **poprzednią ocenę pod paskiem** (P12, P18), arkusz, kartę terminu i datę następnej oceny. Wpisuje oceny 1/3/5/7/9, widzi od razu średnią, poziom i wynik. Przy każdej wartości liczonej przez system jest „popraw” (P11, P19). Na końcu **podsumowanie** (P20).
- **Pracownik (drugi, P1)** widzi „Moja ocena”: etap, poprzednią ocenę, kryteria, termin; po ocenie na piśmie potwierdza zapoznanie i widzi 7 dni na sprzeciw (P5).
- **Człowiek ma ostatnie słowo** (P11): każdą liczoną wartość da się zmienić; zmieniona dostaje znaczek „✎ ustawione ręcznie”.
- Produkt sam przypomina o terminach — w aplikacji (dzwonek), bez wysyłki poza nią (P6). Kadry bez własnego widoku (P7).

## 2. Wejście i wyjście
**Wejście (z danych sztucznych, plik JSON/JS ładowany przy starcie; brak logowania, brak backendu poza serwowaniem statyki):** lista osób z polami z §3; klik przełożonego: wybór osoby, wybór oceny cząstkowej 1/3/5/7/9, „popraw”; klik pracownika: „Potwierdzam zapoznanie z oceną”.
**Wyjście (ekran, bez zapisu na serwer; stan w pamięci strony, reset po odświeżeniu):** lista z etapami; arkusz ze średnią (2 miejsca po przecinku, np. 5,00), poziomem i wynikiem; terminy z uzasadnieniem; data następnej oceny; podsumowanie; potwierdzenie z datą i godziną.
Nowe liczby w produkcie nie są wymyślane: wszystko liczone z reguł §5 i z danych §3; teksty AI są wcześniej zapisane (P13).

## 3. Dane sztuczne (urząd fikcyjny, „dziś” = 18.11.2026; przełożony: Marek Zieliński)
| Osoba | Stanowisko, arkusz | Etap teraz | Termin (od dziś) i czynność | Źródło terminu | Poprzednia ocena |
|---|---|---|---|---|---|
| Piotr Wiśniewski | Specjalista, C | ⑤ zapoznanie z oceną (ocena negatywna sporządzona 12.11.2026) | **19.11.2026** (1 dzień): rozmowa wstępna i koniec 7 dni na sprzeciw | 7 dni od negatywnej oceny ([R] § 7 pkt 2; [U] art. 83 ust. 1) | 12.11.2024, na poziomie oczekiwań (5,00) |
| Katarzyna Lis | Specjalista, C | ③ | **02.12.2026** (14): ocena poza cyklem | do 30 dni po zmianie stanowiska 02.11.2026 ([U] art. 81 ust. 6; [R] § 9 ust. 2) | 15.03.2026, na poziomie oczekiwań |
| Ewa Nowak | Starszy specjalista, C | ① | **03.12.2026** (15): rozmowa wstępna | 30 dni od zatrudnienia na czas nieokreślony 03.11.2026 ([R] § 7 pkt 1) | brak (pierwsza) |
| Jan Bielecki | Kierownik wydziału, B + dodatkowe: myślenie analityczne, negocjowanie | ③ | **10.12.2026** (22): ocena okresowa | 24 mies. od poprzedniej oceny ([U] art. 81 ust. 4) | 10.12.2024, powyżej oczekiwań (6,71) |
| Anna Kowalska | Starszy specjalista ds. zamówień publicznych, C + dodatkowe: orientacja na klienta/interesanta | ③ | **20.01.2027** (63): rozmowa oceniająca | 24 mies. od poprzedniej oceny | 20.01.2025, na poziomie oczekiwań (5,57) |
| Tomasz Mazur | Inspektor, C + myślenie analityczne | zamknięta | **05.11.2028**: następna ocena okresowa | 24 mies. od oceny 05.11.2026 | 05.11.2026, na poziomie oczekiwań (6,00) |

Oceny cząstkowe: Wiśniewski (C): wykorzystywanie wiedzy 5, rzetelność **1**, organizacja pracy 7, współpraca 7, komunikacja 5 → 5,00, poziom „na poziomie oczekiwań”, wynik **negatywny** (jest „1”). Bielecki (B): zarządzanie ludźmi, podejmowanie decyzji, organizacja pracy, współpraca, komunikacja po 7; myślenie analityczne 7, negocjowanie 5 → 6,71 „powyżej oczekiwań”, pozytywna. Mazur: 5,7,5,7,5,7 → 6,00 „na poziomie oczekiwań”, pozytywna. Lis, Nowak, Kowalska: arkusz w toku/pusty według pliku danych makiety (Kowalska 5,5,7,5,5,5 + dodatkowe) — wartości w toku nie są wynikiem.
Dzwonek: 5 pozycji z datami i dniami do terminu (sortowane rosnąco; Mazur bez terminu pilnego). Teksty AI: `dane/podpowiedzi-ai.json` i obiekt `AI` w `makieta/warianty/wspolne/wspolne.mjs` (oznaczenie „podpowiedź AI”, edytowalne).
Uwaga: Analityk/Programista trzymają własne dane MVP w `dane/` (8 osób, zgodnie z `docs/materialy.md`); MVP ma pokazać te same 6 przypadków powyżej (liczby: Bielecki 6,71, Kowalska 5,57 — poprawka wg wpisu Programisty z 18:35).

## 4. Ekrany (wariant 1)
1. **Lista osób (start przełożonego).** Nagłówek z nazwą urzędu, dzwonek z licznikiem, przełącznik „Zobacz jako”: przełożony / pracownik (osoba). Tabela: pracownik (kropka koloru pilności, nazwisko, „arkusz X”), stanowisko (ukryte na telefonie), mały pasek etapów, przycisk „Otwórz”. Sortowanie: wg terminu rosnąco, zamknięte na końcu. Podpis: „Terminy wszystkich osób — w dzwonku z przypomnieniami.”
2. **Dzwonek z terminami (P17).** Rozwijana lista: osoba, czynność, data, „za N dni”; klik przechodzi do oceny osoby. Brak wysyłki poza aplikacją (P6).
3. **Ocena (przełożony).** Okruszek „← Lista osób”. Karta górna: tytuł „Ocena: <imię nazwisko> · stanowisko, arkusz X”, pasek etapów ①–⑤ (Rozmowa wstępna → Zapoznanie z kryteriami (podpis) → Rozmowa oceniająca → Ocena na piśmie → Zapoznanie z oceną (+7 dni na sprzeciw)), **poprzednia ocena** (data i poziom) bezpośrednio pod paskiem (P18). Lewa karta „Arkusz”: kryteria obowiązkowe wg A/B/C + dodatkowe (maks. 3, z krótkim opisem zachowań i podpowiedzią AI), przy każdym przyciski ocen 1/3/5/7/9; **średnia, poziom, wynik** na żywo; ostrzeżenie „jedna ocena 1 = ocena negatywna”; „popraw” przy średniej, poziomie i wyniku. Prawa karta „Co dalej”: karta terminu (data, „za N dni”, czynność, z czego wynika, „popraw”), **data następnej oceny** z uzasadnieniem i „popraw”, bieżący etap, przycisk „Dalej: podsumowanie →” (aktywny, gdy wszystkie kryteria ocenione). Zmieniona ocena 9 albo wartość ręczna: znaczek „✎ ustawione ręcznie” w tej samej linii (telefon: tylko „✎”, opis w podpowiedzi) — wymaganie z P15 (brak łamania wiersza, mały odstęp między kolumną kryteriów a ocenami).
4. **Podsumowanie (P20; tylko do odczytu).** Okruszki „← Lista osób”, „← Wróć do oceny”. Cztery pola: **Średnia** (duża), **Poziom**, **Wynik** (pozytywna/negatywna), **Data następnej oceny** z uzasadnieniem. Bez przycisków i pól edycji (P20: „bez klikalnych przycisków”). Gdy wynik negatywny przy średniej > 4: komunikat „Wynik negatywny przez ocenę „1” (§ 11 rozporządzenia), mimo średniej na poziomie oczekiwań.” Ręcznie zmienione wartości mają znaczek.
5. **Moja ocena (pracownik).** Ten sam układ w odczycie, tytuł „Moja ocena”. Etap, poprzednia ocena, arkusz bez edycji. Przy etapie ⑤: przycisk **„Potwierdzam zapoznanie z oceną”** → po kliknięciu data i godzina oraz komunikat „Masz 7 dni na sprzeciw do dyrektora generalnego — do <termin> (art. 83 ust. 1 ustawy)”. Przy wcześniejszych etapach: „Potwierdzenie pojawi się po ocenie na piśmie.” Pracownik nie edytuje ocen, nie widzi „popraw”.
Atrapy: przyciski poza opisanymi nic nie zapisują.

## 5. Reguły (z przepisów; [P] przepis, [I] interpretacja zespołu)
1. **Skala:** 1/3/5/7/9 [R § 11]. **Poziom** = średnia arytmetyczna: 1–2 znacznie poniżej; >2–4 poniżej; >4–6 na poziomie oczekiwań; >6–8 powyżej; >8–9 znacznie powyżej [P].
2. **Wynik:** pozytywna = poziom „na poziomie oczekiwań” lub wyższy **i** żadna ocena cząstkowa = 1; w przeciwnym razie negatywna [P]. Uzasadnienie obowiązkowe przy negatywnej [P].
3. **Kryteria obowiązkowe:** A (6): zarządzanie ludźmi, podejmowanie decyzji i odpowiedzialność, organizacja pracy i orientacja na osiąganie celów, współpraca, komunikacja, zarządzanie strategiczne; B (5): bez zarządzania strategicznego; C (5): wykorzystywanie wiedzy i doskonalenie zawodowe, rzetelność, organizacja pracy i orientacja na osiąganie celów, współpraca, komunikacja [P, R § 4]. **Dodatkowe:** 0–3 z wykazu 14 [P, R § 2 ust. 2].
4. **Etapy (①–⑤)** wg `materialy.md` pkt 4: rozmowa wstępna, zapoznanie z kryteriami (podpis), rozmowa oceniająca, ocena na piśmie, zapoznanie z oceną.
5. **Terminy (liczone w dniach kalendarzowych od dnia następnego [I]):** rozmowa wstępna w 30 dni od zatrudnienia na czas nieokreślony albo od poprzedniej oceny na piśmie; po negatywnej w 7 dni [P, R § 7]; sprzeciw 7 dni od zapoznania; rozpatrzenie 14 dni; odwołanie do sądu pracy 14 dni [P, U art. 83]; ocena co 24 mies. [P, U art. 81 ust. 4]; ocena poza cyklem przy zmianie stanowiska (>6 mies. od ostatniej oceny): od 7 dni przed do 30 dni po zmianie [P, U art. 81 ust. 6]; przedłużenie o czas usprawiedliwionej nieobecności >1 mies. [P, art. 81 ust. 7]. Początek 24 mies. = dzień sporządzenia poprzedniej oceny na piśmie [I, T6a].
6. **Data następnej oceny** (Szef i Programista, 18:50–18:53): ocena **pozytywna** → 24 mies. od dnia sporządzenia oceny na piśmie (etap ④; gdy ④ jeszcze nie zamknięty — od „dziś”); ocena **negatywna** → ponowna ocena po 6 mies. od zapoznania z oceną ([P] art. 81 ust. 9; etap ⑤, gdy jeszcze nie nastąpił — od „dziś”). Wiśniewski: poprzednia ocena z 12.11.2024 (24 mies. przed obecną z 12.11.2026).
7. **Poprawka człowieka (P11, P19):** „popraw” przy średniej, poziomie, wyniku, terminie i dacie następnej oceny; po zmianie znaczek „✎ ustawione ręcznie”; zmiany ocen cząstkowych przeliczają średnią, poziom i wynik, o ile te nie zostały ustawione ręcznie.
8. **Człowiek decyduje, AI proponuje (P13):** podpowiedzi AI tylko jako gotowe teksty z oznaczeniem, bez zapisu w ocenie bez kliknięcia przełożonego.

## 6. Kolejność budowy MVP
(1) lista osób + pasek etapów + dzwonek; (2) karta terminu i data następnej oceny; (3) arkusz z regułami 1–3 i podsumowaniem; (4) Moja ocena i potwierdzenie. Pokaz główny ≤ 2 min: lista → Wiśniewski → zmiana „1” na „3” → „popraw” termin → podsumowanie → pracownik → potwierdzenie.

## 7. Testy akceptacji
| # | Zrób | Oczekiwane |
|---|---|---|
| T1 | Otwórz makietę jako przełożony | najpierw lista 6 osób, pierwsza Wiśniewski, ostatnia Mazur; nie ekran oceny (P16) |
| T2 | Otwórz dzwonek | 5 terminów z datami i „za N dni”: 19.11.2026 (1), 02.12.2026 (14), 03.12.2026 (15), 10.12.2026 (22), 20.01.2027 (63); brak osobnego ekranu terminów (P17) |
| T3 | Otwórz Wiśniewskiego | pod paskiem etapów widać „12.11.2024, na poziomie oczekiwań (5,00)” (P18); średnia 5,00, poziom „na poziomie oczekiwań”, wynik negatywny, ostrzeżenie o „1” |
| T4 | Zmień rzetelność z 1 na 3 | średnia 5,40, poziom bez zmiany, wynik pozytywny; data następnej oceny 12.11.2028 (24 mies. od oceny 12.11.2026) |
| T5 | Wróć na 1 | wynik negatywny, data następnej oceny 18.05.2027 (6 mies. od „dziś”, zapoznanie jeszcze nie nastąpiło; [U] art. 81 ust. 9) |
| T6 | Bielecki: zmień ocenę na 9 | znaczek „✎ ustawione ręcznie” w jednej linii, bez łamania; na telefonie sam „✎” (P15) |
| T7 | Przy każdej z: średnia, poziom, wynik, termin, data następnej oceny kliknij „popraw”, wpisz wartość | wartość się zmienia, pojawia się znaczek; reszta się nie psuje (P11, P19) |
| T8 | Dla Wiśniewskiego przejdź „Dalej: podsumowanie →” | 4 pola: średnia, poziom, wynik, data następnej oceny; na ekranie brak innych przycisków poza okruszkami; komunikat „negatywny przez ocenę 1” (P20) |
| T9 | Przełącz „Zobacz jako” → Wiśniewski (pracownik) | tytuł „Moja ocena”, brak przycisków ocen i „popraw”, etap ⑤, przycisk „Potwierdzam zapoznanie z oceną”, informacja o 7 dniach do 19.11.2026 |
| T10 | Kliknij „Potwierdzam…” | pojawia się data i godzina potwierdzenia; przycisk znika |
| T11 | Pracownik z etapem < ⑤ (np. Nowak) | brak przycisku, tekst „Potwierdzenie pojawi się po ocenie na piśmie.” |
| T12 | Jan Bielecki | arkusz B: 5 obowiązkowych + 2 dodatkowe, średnia 6,71, poziom „powyżej oczekiwań”, poprzednia 10.12.2024 (6,71); Kowalska poprzednia 20.01.2025 (5,57) |
| T13 | Spróbuj dodać 4. kryterium dodatkowe | niemożliwe (maks. 3) |
| T14 | Tekst AI (kryteria dodatkowe/uzasadnienie) | oznaczony „podpowiedź AI”, można zmienić; brak wywołań sieciowych do modelu (P13) |
| T15 | Dane i bez internetu | aplikacja działa na danych sztucznych po załadowaniu strony, bez logowania |

## 8. Ryzyka i eksperymenty (z `/discover`)
- **A (terminy wiarygodne):** kryterium sukcesu: T2–T5, T12 zgodne z przepisami; przy każdym terminie widać źródło i „popraw”.
- **B (zaufanie do średniej i poziomu):** T3–T4, T7, T8: zmiana oceny zmienia wyniki od razu, reguła „1” widoczna.
- Ryzyko: interpretacje [I] (T6a, liczenie dni) mogą różnić się od praktyki urzędów — oznaczone, do potwierdzenia; produkt nie jest poradą prawną.
- Poza zakresem: kadry, pełna historia, IPRZ z AI, wysyłka przypomnień poza aplikacją, logowanie, prawdziwe dane.

<!-- skill: przeplywy-pm -->
<!-- skill: create-prd -->
