# Analiza konkurencji: cyfrowy asystent ocen okresowych (służba cywilna)

Data: 2026-11-18. Przeanalizowano 7 rozwiązań. Podstawa: `docs/zadanie.md`, `docs/decyzje.md`; kryteria ustawowe — `docs/materialy.md` (Analityk, w toku; tu nie powtarzamy). Ceny z blogów porównawczych i sprzecznych źródeł — **założenie, do potwierdzenia u dostawców**.

## Przegląd rynku
Komercyjne narzędzia do ocen (Lattice, 15Five, Leapsome, Workday, SAP SuccessFactors) są budowane pod cele, OKR i 360° w firmach prywatnych; AI w nich głównie pomaga pisać komentarze i podsumowania. Ocena w służbie cywilnej jest inna: ustawowa (rozporządzenie PRM z 23.07.2015, Dz.U. 2015 poz. 1143), jedna ścieżka, ocenia bezpośredni przełożony, a wynik może być kontrolowany przez sąd pracy. Rządowy system KPRM służy kadrom do ewidencji ocen i raportów (zakładka „Dodaj ocenę”, import z Excela), nie pomaga przełożonemu w samej ocenie.

## Konkurenci

| Konkurent | Typ | Dla kogo | Pozycjonowanie | Mocna strona | Słaba strona |
|---|---|---|---|---|---|
| Lattice | bezpośredni | firmy HR | oceny, cele, rozwój; AI pisze szkice ocen z danych | AI w ocenie, znany | kryteria własne, nie ustawowe; od ok. 8–13 USD/os./mies. + min. 4 000 USD/rok (źródła się różnią) |
| 15Five | bezpośredni | menedżerowie | cykliczne check-iny, AI-coach (dodatki płatne) | rytm rozmów 1:1 | jw.; AI jako dodatek |
| Leapsome | bezpośredni | firmy średnie | oceny + cele + nauka + wynagrodzenia, asystent AI | szeroka platforma | ciężka, własne kryteria, brak polskich przepisów |
| SAP SuccessFactors | bezpośredni | duże organizacje | pełny HCM | skala, wdrożenia w administracji | wdrożenie z partnerem, drogo, długo |
| Workday | bezpośredni | korporacje | pełny HCM, cena na zapytanie | skala | jw., umowy wieloletnie |
| Engagedly (asystent Marissa) | bezpośredni | firmy | AI mniej stronniczych komentarzy (ok. 9 USD/os./mies. wg dostawcy) | pomoc w treści | jw. |
| System ocen KPRM (ewidencja HR) | pośredni | kadry urzędów | rejestr ocen i raporty rocznych sprawozdań | zgodny z przepisami, już jest | nie wspiera przełożonego ani pracownika; brak notatek z okresu |
| Excel/Word + rozmowa | pośredni | wszyscy | formularz z rozporządzenia wypełniany ręcznie | zero kosztu | formalność, ogólnikowe uzasadnienia, brak pamięci o okresie |

## Porównanie funkcji
Legenda: tak / częściowo / brak.

| Możliwość | Nasz produkt | Lattice/15Five/Leapsome | SuccessFactors/Workday | System KPRM | Excel/Word |
|---|---|---|---|---|---|
| Kryteria i skala wg ustawy | tak (docs/materialy.md) | brak | konfiguracja drogą wdrożenia | tak | ręcznie |
| Notatki przełożonego w ciągu okresu | tak | częściowo | częściowo | brak | brak |
| Szkic uzasadnienia z notatek (AI) | tak | częściowo (nie ustawowo) | brak/częściowo | brak | brak |
| Pomoc w rozmowie oceniającej | tak | częściowo | brak | brak | brak |
| Plan rozwoju po ocenie | tak | tak | tak | brak | brak |
| Człowiek decyduje, AI tylko proponuje | tak | częściowo | n/d | n/d | n/d |
| Wdrożenie w urzędzie od ręki, dane sztuczne w demo | tak | brak | brak | n/d | tak |

## Mapa pozycjonowania (słownie)
Oś X: zgodność z ustawową oceną (niska → wysoka); oś Y: realna pomoc przełożonemu (mała → duża). Firmowe platformy: duża pomoc, niska zgodność. System KPRM i Excel: wysoka zgodność, mała pomoc. **Nasz produkt: prawy górny róg — wysoka zgodność i duża pomoc.**

## Szanse wyróżnienia
1. **Ustawowa ocena prowadzona krok po kroku** — kryteria i skala z rozporządzenia, nie własne; żadna platforma komercyjna tego nie ma.
2. **Pamięć okresu**: notatki przez rok zamieniane na konkretne przykłady w uzasadnieniu (leczy „ogólnikowe uzasadnienia”) — hipoteza, potwierdza Artur (P2, P4).
3. **Wsparcie obu stron**: przełożony dostaje szkic, pracownik przygotowuje się do rozmowy.
4. **Uzasadnienie możliwe do obrony** (ocena bywa kontrolowana przez sąd pracy): każdy wniosek wskazuje notatkę-źródło.

## Zagrożenia
1. Rozbudowa systemu KPRM o podobne funkcje — odpowiedź: być nakładką, nie konkurencyjnym rejestrem.
2. Zaufanie do AI w ocenie ludzi — odpowiedź: AI proponuje, przełożony zatwierdza, widać źródło każdego zdania.
3. Dostawcy HCM już obecni w administracji dodadzą asystenta AI — odpowiedź: przewaga w znajomości ustawowej procedury.

## Rekomendacje
- **Postawić na**: zgodność z ustawą + szkic oparty na notatkach + człowiek decyduje.
- **Dogonić (minimum)**: plan rozwoju po ocenie, czytelny formularz.
- **Pominąć**: cele OKR, 360°, wynagrodzenia, ankiety zaangażowania.

## Czego jeszcze nie wiemy (pytania do Artura: P1–P4 w docs/decyzje.md; lista: docs/pm/00-niewiadome-a.md)
Główny użytkownik, najbardziej bolący problem, zysk, moment zbierania notatek. Do tego czasu opisy użytkownika wyżej to **założenia**.

## Źródła (sprawdzone 2026-11-18)
- Ceny i AI platform: [Effy](https://www.effy.ai/blog/performance-management-software), [Leapsome vs Lattice](https://site.leapsome.com/comparisons/lattice-competitors), [Engagedly](https://engagedly.com/blog/top-performance-review-software-for-employee-growth/)
- Rozporządzenie PRM z 23.07.2015: [Dz.U. 2015 poz. 1143](https://api.sejm.gov.pl/eli/acts/DU/2015/1143/text.html)
- Oceny w służbie cywilnej, system KPRM: [gov.pl/web/sluzbacywilna/oceny-pracownicze](https://www.gov.pl/web/sluzbacywilna/oceny-pracownicze)
- Kontrola sądowa ocen: [sn.pl](https://www.sn.pl/pl/aktualnosci/komunikaty-o-sprawach/zakres-kontroli-ocen-okresowych-pracownikow-sluzby-cywilnej-przez-sady-pracy)

<!-- skill: przeplywy-pm -->
<!-- skill: competitor-analysis -->
