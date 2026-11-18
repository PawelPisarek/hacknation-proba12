# Analiza konkurencji: cyfrowy asystent ocen okresowych (służba cywilna)

Data: 2026-11-18 (poprawka po recenzji R2). Przeanalizowano 8 rozwiązań. Podstawa: `docs/zadanie.md`, `docs/decyzje.md`, `docs/materialy.md` (Analityk). Ceny z blogów porównawczych i sprzecznych źródeł — **założenie, do potwierdzenia u dostawców**.

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
| SAP SuccessFactors | bezpośredni | duże organizacje | pełny HCM | skala | wdrożenie z partnerem; ok. 3,72 USD/os./mies. za moduł ocen (cennik SAP, region MENA) plus wdrożenie; wdrożeń w polskiej administracji nie znalazłem (**do weryfikacji**), znalezione: PKO BP, Veolia, Eurocash |
| Workday | bezpośredni | korporacje | pełny HCM, cena na zapytanie | skala | umowy wieloletnie |
| Engagedly (asystent Marissa) | bezpośredni | firmy | AI mniej stronniczych komentarzy (ok. 9 USD/os./mies. wg dostawcy) | pomoc w treści | własne kryteria |
| System ocen KPRM (ewidencja kadr) | ten sam kupujący | kadry urzędów | rejestr ocen i raporty | zgodny z przepisami, już jest | wg opisu nie wspiera przełożonego ani pracownika (**do weryfikacji**) |
| Excel/papier + rozmowa | ten sam kupujący | wszyscy urzędnicy | arkusze A/B/C z rozporządzenia | zero kosztu | brak jasnej historii i statusu, wszystko na papierze (P2) |

**Polskie alternatywy urzędów — czego szukałem:** moduły ocen w polskich systemach kadrowych dla administracji (np. Comarch HRM, Sage Kadry) — nie znalazłem potwierdzonej oferty modułu ocen dla służby cywilnej. Znalazłem tylko opis przebiegu w urzędzie (przełożony wpisuje oceny → system liczy ocenę → pracownik akceptuje lub się odwołuje) i koszt wdrożenia programu kadrowo-płacowego w UM Rybnik (132 847 zł, bez informacji o ocenach). **Do weryfikacji** u dostawców: [Infor: system ocen w urzędzie](https://kadry.infor.pl/poprzednie_tematy_dnia/106655,System-ocen-pracowniczych-w-urzedzie-publicznym.html), [UM Rybnik](https://benchmarking.silesia.org.pl/pub/pliki/file/strefa%20dobrych%20praktyk/Dobra%20praktyka%20w%20obszarze%20organizacja%20pracy%20urz%C4%99du%20-%20oprogramowanie%20kadrowe%20w%20UM%20Rybnik.pdf).

## Porównanie funkcji
„Nasz produkt”: wiersze o etapach, terminach i statusie wynikają z P1–P4; oznaczone (założenie) wymagają jeszcze potwierdzenia w makiecie.

| Możliwość | Nasz produkt | Lattice/15Five/Leapsome | SuccessFactors/Workday | System KPRM | Excel/papier |
|---|---|---|---|---|---|
| Kryteria i skala wg ustawy | tak (z `docs/materialy.md`) | brak | konfiguracja przy wdrożeniu (założenie) | tak (założenie) | ręcznie |
| Etapy procesu pokazane krok po kroku (rozmowa wstępna → zapoznanie z kryteriami → rozmowa oceniająca → ocena na piśmie → zapoznanie) | tak (założenie, P3; etapy z `docs/materialy.md` sekcja 4) | brak (własny cykl) | konfiguracja przy wdrożeniu (założenie) | brak (założenie; ewidencja) | brak, na papierze |
| Terminy liczone z daty zatrudnienia i poprzedniej oceny (30 dni, 24 mies., ocena poza cyklem, 7 dni na sprzeciw) | tak (założenie, P3/P4; reguły z `docs/materialy.md` sekcje 1 i 6) | brak | brak/ręcznie | brak (założenie) | ręcznie |
| Widok statusu dla pracownika: na jakim etapie jest jego ocena, jakie kryteria, jaki termin | tak (założenie, P1/P3) | częściowo, inny proces | częściowo | brak (założenie) | brak |
| Widok przełożonego: kogo i kiedy ocenić, co zostało do zrobienia | tak (założenie, P1) | częściowo | częściowo | brak (założenie) | brak |
| Historia oceny w jednym miejscu (kto, kiedy, co ustalono) | tak (założenie, P2) | częściowo | tak (założenie) | tylko rejestr (założenie) | papier w aktach |
| Wnioski do planu rozwoju (IPRZ) | planowane (założenie) | tak | tak | brak (założenie) | ręcznie w arkuszu |
| Człowiek decyduje, AI proponuje | tak (ustalenie z zadania) | częściowo | n/d | n/d | n/d |
| Wdrożenie w urzędzie od ręki | założenie (makieta i dane sztuczne w demo) | brak | brak | n/d | tak |

## Mapa pozycjonowania — hipoteza
Oś X: zgodność z ustawową oceną; oś Y: przejrzystość procesu i historii dla przełożonego i pracownika (diagnoza P2). Firmowe platformy: wysoka przejrzystość, niska zgodność. System KPRM: wysoka zgodność, niska przejrzystość dla ocenianych (rejestr dla kadr). Papier/Excel: zgodność tak, przejrzystość zero. **Hipoteza: nasz produkt w prawym górnym rogu** — do potwierdzenia w makiecie.

## Szanse wyróżnienia (hipotezy)
1. **Jasna historia i status oceny zamiast papieru** — każdy widzi etap, kryteria i termin (P2, P3).
2. **Terminy liczone za użytkownika** z daty zatrudnienia i poprzedniej oceny, w tym 7 dni na sprzeciw (P4; `docs/materialy.md`).
3. **Ustawowa ocena krok po kroku** — kryteria, skala i arkusz z rozporządzenia, nie własne.
4. **Wsparcie obu stron** — przełożony prowadzi, pracownik widzi status (P1).
5. **Uzasadnienie możliwe do obrony** — od oceny przysługuje sprzeciw i odwołanie do sądu pracy ([ustawa, art. 83](https://api.sejm.gov.pl/eli/acts/DU/2026/590/text.pdf)).

## Zagrożenia
1. Rozbudowa systemu KPRM o podobne funkcje — odpowiedź: być nakładką (**do weryfikacji**, brak źródła o planach KPRM).
2. Zaufanie do AI w ocenie ludzi — odpowiedź: AI proponuje, przełożony zatwierdza.
3. Dostawcy kadrowi dodadzą asystenta AI — **do weryfikacji**: brak źródła, że dostawcy ocen dla administracji to planują; wniosek z oferty platform komercyjnych.

## Rekomendacje
- **Postawić na**: jasną historię i status oceny (etapy, kryteria, terminy) dla przełożonego i pracownika + zgodność z ustawą + człowiek decyduje.
- **Dogonić**: wnioski do planu rozwoju, czytelny arkusz.
- **Pominąć**: notatki zbierane przez cały rok (Artur: niepotrzebne, P4), cele OKR, 360°, wynagrodzenia, ankiety zaangażowania.

## Odpowiedzi Artura (P1–P4, 18:10, `docs/decyzje.md`)
- **P1:** użytkownik: przełożony najczęściej, pracownik jako drugi.
- **P2:** główny ból: brak jasnej historii, wszystko na papierze.
- **P3:** zysk: aktualne informacje o ocenie — etapy, kryteria, terminy.
- **P4:** terminy zależą od daty zatrudnienia; notatki przez rok niepotrzebne.
Wnioski wyżej opierają się na tych odpowiedziach; reszta funkcji (np. pomoc AI) pozostaje założeniem.


## Źródła (sprawdzone 2026-11-18)
- Cena SuccessFactors (Performance & Goals): [cennik SAP, strona MENA — 44,64 USD/os./rok = 3,72 USD/mies., umowa 12–36 mies.](https://www.sap.com/mena/products/hcm/performance-goals/pricing.html); inne regiony podają inne kwoty (UK 2,79 GBP, NL/LV 3,15 EUR)
- Ceny i AI platform: [Effy](https://www.effy.ai/blog/performance-management-software), [Leapsome vs Lattice](https://site.leapsome.com/comparisons/lattice-competitors), [Engagedly](https://engagedly.com/blog/top-performance-review-software-for-employee-growth/)
- Podstawa prawna: [ustawa Dz.U. 2026 poz. 590](https://api.sejm.gov.pl/eli/acts/DU/2026/590/text.pdf), [rozporządzenie Dz.U. 2016 poz. 470](https://api.sejm.gov.pl/eli/acts/DU/2016/470/text.pdf)
- System KPRM („Dodaj ocenę”, import z Excela): opis instrukcji ze strony [gov.pl/web/sluzbacywilna/oceny-pracownicze](https://www.gov.pl/web/sluzbacywilna/oceny-pracownicze), odczytany z wyników wyszukiwania — **do weryfikacji** w samym systemie
- Wdrożenia SuccessFactors: [PKO BP](https://itwiz.pl/pko-bank-polski-z-najwiekszym-wdrozeniem-sap-successfactors-w-polsce/), [Veolia](https://news.sap.com/poland/?p=3371) — komercyjne, żadne w administracji
- Kontrola sądowa ocen: [sn.pl](https://www.sn.pl/pl/aktualnosci/komunikaty-o-sprawach/zakres-kontroli-ocen-okresowych-pracownikow-sluzby-cywilnej-przez-sady-pracy)

<!-- skill: przeplywy-pm -->
<!-- skill: competitor-analysis -->
