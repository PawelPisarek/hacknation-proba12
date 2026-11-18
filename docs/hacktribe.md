# Zgłoszenie HackTribe — DRAFT (tekst roboczy)

Zadanie: HackNation 2026 „Cyfrowy asystent ocen okresowych”. Pola formularza jeszcze nieznane. Teksty zgodne z `docs/spec.md` (zamknięty 19:12, wariant 1) i odpowiedziami Artura P1–P25 (`docs/decyzje.md`).

## Nazwa projektu (`product-name`, limit ≤ 50)

Asystent Ocen Okresowych

Liczba znaków: 24

## Nazwa zespołu

do uzupełnienia

## Linki

- Repozytorium: https://github.com/PawelPisarek/hacknation-proba12 — HTTP 200
- Makieta (GitHub Pages): https://pawelpisarek.github.io/hacknation-proba12/makieta/ — HTTP 200

## Opis wstępny (≤ 300 znaków)

Asystent ustawowej oceny okresowej w urzędzie: przełożony wybiera osobę z listy i na jednym ekranie widzi etapy, terminy i poprzednią ocenę oraz liczy średnią i wynik; pracownik widzi swoją ocenę i potwierdza zapoznanie.

Liczba znaków: 230

## Opis średni (≤ 1000 znaków)

Ocena okresowa w służbie cywilnej wynika z ustawy, ale toczy się na papierze: brakuje jasnej historii, a przełożony i pracownik sami pilnują etapów i terminów. Asystent nie zastępuje oceny — pomaga ją przejść. Przełożony (główny użytkownik) wybiera osobę z listy i na jednym ekranie widzi pasek pięciu etapów, poprzednią ocenę, terminy wyliczone z przepisów oraz arkusz: wpisuje oceny 1/3/5/7/9, a system liczy średnią, poziom i wynik. Przy każdej liczonej wartości jest „popraw” — ostatnie słowo ma człowiek. Podpowiedź AI do IPRZ widzi tylko przełożony. Terminy wszystkich osób są w dzwonku. Pracownik w „Mojej ocenie” widzi etap, kryteria i termin oraz potwierdza zapoznanie z oceną. Dane w makiecie są sztuczne.

Liczba znaków: 763

## Opis pełny z linkami (≤ 2000 znaków)

Problem. Ocena okresowa w służbie cywilnej jest ściśle określona ustawą i rozporządzeniem PRM z 2016 r., ale toczy się na papierze: brakuje jasnej historii, trudno ustalić etap, a terminy zależne od daty zatrudnienia trzeba pilnować samemu.

Rozwiązanie. Asystent wspiera ustawową ocenę zamiast ją zastępować; nie wymyślamy własnych kryteriów.

Przełożony (użytkownik główny) zaczyna od listy osób z etapem każdej oceny; terminy wszystkich są w dzwonku z przypomnieniami. Po wybraniu osoby widzi na jednym ekranie pasek pięciu etapów, poprzednią ocenę, arkusz, kartę terminu i wstępną datę następnej oceny. Wpisuje oceny 1/3/5/7/9 (plus do trzech kryteriów dodatkowych) i od razu widzi średnią, poziom i wynik; jedna ocena „1” oznacza ocenę negatywną. Przy każdej liczonej wartości jest „popraw” — ostatnie słowo ma człowiek. Wnioski do IPRZ dostaje jako podpowiedź AI, którą może przyjąć, zmienić lub wyczyścić. Na końcu: podsumowanie ze średnią, poziomem, wynikiem i datą następnej oceny (wstępną do czasu sporządzenia oceny na piśmie).

Pracownik (drugi użytkownik) w „Mojej ocenie” widzi etap, poprzednią ocenę, kryteria i termin oraz zatwierdzoną treść IPRZ. Po ocenie na piśmie potwierdza zapoznanie i widzi tylko własny termin 7 dni na sprzeciw. Kadry nie mają w v1 osobnego widoku.

Skala. Zasady są wspólne dla administracji rządowej: ponad 1740 urzędów.

Demo: https://pawelpisarek.github.io/hacknation-proba12/makieta/ — fikcyjny urząd, sztuczne dane; podpowiedzi AI zapisane z góry i widoczne tylko dla przełożonego. Miary sukcesu: najpilniejsza ocena i arkusz w mniej niż 20 s, nowy wynik od razu po zmianie oceny, pokaz w 2 min. Kod: https://github.com/PawelPisarek/hacknation-proba12

Użyte narzędzia: boty na OpenMausBot (Apache-2.0), modele Claude (Anthropic), skille pm-skills (MIT).

Liczba znaków: 1902
