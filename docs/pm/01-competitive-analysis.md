# Analiza konkurencji: cyfrowy asystent ocen okresowych (służba cywilna)

Data: 2026-11-18 (poprawka po recenzji R1). Przeanalizowano 8 rozwiązań. Podstawa: `docs/zadanie.md`, `docs/decyzje.md`, `docs/materialy.md` (Analityk). Ceny z blogów porównawczych i sprzecznych źródeł — **założenie, do potwierdzenia u dostawców**.

**Perspektywa analizy (z zadania):** zadanie każe pomóc przełożonemu i pracownikowi przejść ustawową ocenę dobrze, nie zastępować jej (`docs/zadanie.md`, ustalenia ludzi) — porównujemy więc rozwiązania pod kątem zgodności z ustawową oceną i realnej pomocy ocenianemu i oceniającemu. Cel: wybrać, w czym produkt ma być inny.

## Podstawa prawna (z `docs/materialy.md`)
Ocena wynika z [ustawy o służbie cywilnej, art. 81–83 (Dz.U. 2026 poz. 590)](https://api.sejm.gov.pl/eli/acts/DU/2026/590/text.pdf) i [rozporządzenia PRM z 4.04.2016 (Dz.U. 2016 poz. 470)](https://api.sejm.gov.pl/eli/acts/DU/2016/470/text.pdf): 14 kryteriów, skala 1/3/5/7/9, ocenia bezpośredni przełożony co 24 miesiące, sprzeciw (art. 83) i odwołanie do sądu pracy. Szczegóły są w `docs/materialy.md`.

## Przegląd rynku
Komercyjne narzędzia do ocen (Lattice, 15Five, Leapsome, Workday, SAP SuccessFactors) są budowane pod cele, OKR i 360° w firmach; AI w nich głównie pomaga pisać komentarze. Ocena w służbie cywilnej jest ustawowa, więc kryteria i arkusz są dane z góry. Rządowy system KPRM służy kadrom do ewidencji ocen i raportów (wg opisu na gov.pl: zakładka „Dodaj ocenę”, import z Excela — **do weryfikacji**, patrz źródła), a nie pomaga przełożonemu w samej ocenie.

## Konkurenci

| Konkurent | Typ | Dla kogo | Pozycjonowanie | Mocna strona | Słaba strona |
|---|---|---|---|---|---|
| Lattice | bezpośredni | firmy | oceny, cele, rozwój; AI pisze szkice ocen | AI w ocenie | kryteria własne, nie ustawowe; ok. 8–13 USD/os./mies. + min. 4 000 USD/rok (źródła się różnią) |
| 15Five | bezpośredni | menedżerowie | check-iny, AI-coach (dodatki płatne) | rytm rozmów 1:1 | jw. |
| Leapsome | bezpośredni | firmy średnie | oceny + cele + nauka + asystent AI | szeroka platforma | własne kryteria |
| SAP SuccessFactors | bezpośredni | duże organizacje | pełny HCM | skala | wdrożenie z partnerem; ok. 3,72 USD/os./mies. za moduł ocen (jedno źródło) plus wdrożenie; wdrożeń w polskiej administracji nie znalazłem (**do weryfikacji**), znalezione: PKO BP, Veolia, Eurocash |
| Workday | bezpośredni | korporacje | pełny HCM, cena na zapytanie | skala | umowy wieloletnie |
| Engagedly (asystent Marissa) | bezpośredni | firmy | AI mniej stronniczych komentarzy (ok. 9 USD/os./mies. wg dostawcy) | pomoc w treści | własne kryteria |
| System ocen KPRM (ewidencja kadr) | ten sam kupujący | kadry urzędów | rejestr ocen i raporty | zgodny z przepisami, już jest | wg opisu nie wspiera przełożonego ani pracownika (**do weryfikacji**) |
| Excel/papier + rozmowa | ten sam kupujący | wszyscy urzędnicy | arkusze A/B/C z rozporządzenia | zero kosztu | formalność; brak pamięci okresu (hipoteza, P2) |

**Polskie alternatywy urzędów — czego szukałem:** moduły ocen w polskich systemach kadrowych dla administracji (np. Comarch HRM, Sage Kadry) — nie znalazłem potwierdzonej oferty modułu ocen dla służby cywilnej. Znalazłem tylko opis przebiegu w urzędzie (przełożony wpisuje oceny → system liczy ocenę → pracownik akceptuje lub się odwołuje) i koszt wdrożenia programu kadrowo-płacowego w UM Rybnik (132 847 zł, bez informacji o ocenach). **Do weryfikacji** u dostawców: [Infor: system ocen w urzędzie](https://kadry.infor.pl/poprzednie_tematy_dnia/106655,System-ocen-pracowniczych-w-urzedzie-publicznym.html), [UM Rybnik](https://benchmarking.silesia.org.pl/pub/pliki/file/strefa%20dobrych%20praktyk/Dobra%20praktyka%20w%20obszarze%20organizacja%20pracy%20urz%C4%99du%20-%20oprogramowanie%20kadrowe%20w%20UM%20Rybnik.pdf).

## Porównanie funkcji
„Nasz produkt”: funkcje oznaczone (założenie) nie są ustalone z Arturem i zależą od odpowiedzi P2–P4.

| Możliwość | Nasz produkt | Lattice/15Five/Leapsome | SuccessFactors/Workday | System KPRM | Excel/papier |
|---|---|---|---|---|---|
| Kryteria i skala wg ustawy | tak (z `docs/materialy.md`) | brak | konfiguracja przy wdrożeniu (założenie) | tak (założenie) | ręcznie |
| Notatki przełożonego w okresie | planowane (założenie, P4) | częściowo | częściowo | brak (założenie) | brak |
| Szkic uzasadnienia z notatek (AI) | planowane (założenie, P2/P3) | częściowo, nie ustawowo | brak/częściowo | brak (założenie) | brak |
| Pomoc w rozmowie oceniającej | planowane (założenie, P3) | częściowo | brak | brak (założenie) | brak |
| Wnioski do planu rozwoju (IPRZ) | planowane (założenie, P3) | tak | tak | brak (założenie) | ręcznie w arkuszu |
| Człowiek decyduje, AI proponuje | tak (ustalenie z zadania) | częściowo | n/d | n/d | n/d |
| Wdrożenie w urzędzie od ręki | założenie (makieta i dane sztuczne w demo) | brak | brak | n/d | tak |

## Mapa pozycjonowania — hipoteza
Oś X: zgodność z ustawową oceną; oś Y: pomoc przełożonemu. Firmowe platformy: duża pomoc, niska zgodność. System KPRM i Excel: wysoka zgodność, mała pomoc. **Hipoteza: nasz produkt w prawym górnym rogu** — do potwierdzenia w P1–P4 i w makiecie.

## Szanse wyróżnienia (hipotezy)
1. **Ustawowa ocena krok po kroku** — kryteria, skala i arkusz z rozporządzenia, nie własne.
2. **Pamięć okresu** (notatki → konkretne przykłady w uzasadnieniu) — zależy od P2, P4.
3. **Wsparcie obu stron** — przełożony i pracownik (P1).
4. **Uzasadnienie możliwe do obrony** — od oceny przysługuje sprzeciw i odwołanie do sądu pracy ([ustawa, art. 83](https://api.sejm.gov.pl/eli/acts/DU/2026/590/text.pdf)); każdy wniosek wskazuje źródło.

## Zagrożenia
1. Rozbudowa systemu KPRM o podobne funkcje — odpowiedź: być nakładką (**do weryfikacji**, brak źródła o planach KPRM).
2. Zaufanie do AI w ocenie ludzi — odpowiedź: AI proponuje, przełożony zatwierdza.
3. Dostawcy kadrowi dodadzą asystenta AI — **do weryfikacji**: brak źródła, że dostawcy ocen dla administracji to planują; wniosek z oferty platform komercyjnych.

## Rekomendacje
- **Postawić na**: zgodność z ustawą + pomoc przełożonemu + człowiek decyduje.
- **Dogonić**: wnioski do planu rozwoju, czytelny arkusz.
- **Pominąć**: cele OKR, 360°, wynagrodzenia, ankiety zaangażowania.

## Odpowiedzi Artura (P1–P4)
Na 18:09 brak odpowiedzi (pytania z 18:05 czekają, `docs/decyzje.md`). Opisy użytkownika i funkcji wyżej to założenia; po odpowiedziach poprawię plik.

## Źródła (sprawdzone 2026-11-18)
- Ceny i AI platform: [Effy](https://www.effy.ai/blog/performance-management-software), [Leapsome vs Lattice](https://site.leapsome.com/comparisons/lattice-competitors), [Engagedly](https://engagedly.com/blog/top-performance-review-software-for-employee-growth/)
- Podstawa prawna: [ustawa Dz.U. 2026 poz. 590](https://api.sejm.gov.pl/eli/acts/DU/2026/590/text.pdf), [rozporządzenie Dz.U. 2016 poz. 470](https://api.sejm.gov.pl/eli/acts/DU/2016/470/text.pdf)
- System KPRM („Dodaj ocenę”, import z Excela): opis instrukcji ze strony [gov.pl/web/sluzbacywilna/oceny-pracownicze](https://www.gov.pl/web/sluzbacywilna/oceny-pracownicze), odczytany z wyników wyszukiwania — **do weryfikacji** w samym systemie
- Wdrożenia SuccessFactors: [PKO BP](https://itwiz.pl/pko-bank-polski-z-najwiekszym-wdrozeniem-sap-successfactors-w-polsce/), [Veolia](https://news.sap.com/poland/?p=3371) — komercyjne, żadne w administracji
- Kontrola sądowa ocen: [sn.pl](https://www.sn.pl/pl/aktualnosci/komunikaty-o-sprawach/zakres-kontroli-ocen-okresowych-pracownikow-sluzby-cywilnej-przez-sady-pracy)

<!-- skill: przeplywy-pm -->
<!-- skill: competitor-analysis -->
