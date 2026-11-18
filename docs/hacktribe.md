# Zgłoszenie HackTribe — DRAFT (tekst roboczy)

Zadanie: HackNation 2026 „Cyfrowy asystent ocen okresowych”. Pola formularza jeszcze nieznane. Teksty zgodne z `docs/spec.md` (wariant 1) i odpowiedziami Artura P1–P20 (`docs/decyzje.md`).

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

Ocena okresowa w służbie cywilnej wynika z ustawy, ale toczy się na papierze: brakuje jasnej historii, a przełożony i pracownik sami pilnują etapów i terminów. Asystent nie zastępuje oceny — pomaga ją przejść. Przełożony (główny użytkownik) wybiera osobę z listy i na jednym ekranie widzi pasek pięciu etapów, poprzednią ocenę, terminy wyliczone z przepisów oraz arkusz: wpisuje oceny 1/3/5/7/9, a system liczy średnią, poziom i wynik. Przy każdej liczonej wartości jest „popraw” — ostatnie słowo należy do człowieka. Terminy wszystkich osób są w dzwonku z przypomnieniami. Pracownik w „Mojej ocenie” widzi etap, kryteria i termin oraz potwierdza zapoznanie z oceną. Dane w makiecie są sztuczne.

Liczba znaków: 741

## Opis pełny z linkami (≤ 2000 znaków)

Problem. Ocena okresowa w służbie cywilnej jest obowiązkowa i ściśle określona ustawą oraz rozporządzeniem PRM z 2016 r., ale proces toczy się na papierze. Brakuje jasnej historii, trudno ustalić etap oceny, a terminy zależne od daty zatrudnienia trzeba pilnować samemu.

Rozwiązanie. Asystent wspiera ustawową ocenę zamiast ją zastępować; nie wymyślamy własnych kryteriów.

Przełożony (użytkownik główny) zaczyna od listy osób z etapem każdej oceny. Terminy wszystkich osób są w dzwonku z przypomnieniami. Po wybraniu osoby widzi na jednym ekranie: pasek pięciu etapów, poprzednią ocenę (data i poziom), arkusz, kartę terminu i datę następnej oceny. W arkuszu wpisuje oceny 1/3/5/7/9 do kryteriów z przepisów (plus do trzech dodatkowych) i od razu widzi średnią, poziom oraz wynik; system ostrzega, że jedna ocena „1” oznacza ocenę negatywną. Przy każdej liczonej wartości jest „popraw” — człowiek ma ostatnie słowo, a zmiana jest oznaczona. Na końcu: podsumowanie ze średnią, poziomem, wynikiem i datą następnej oceny.

Pracownik (drugi użytkownik) w „Mojej ocenie” widzi etap, poprzednią ocenę, kryteria i termin. Po ocenie na piśmie potwierdza zapoznanie i widzi 7 dni na sprzeciw.

Kadry w pierwszej wersji nie mają osobnego widoku. Przypomnienia działają w aplikacji.

Skala. Zasady są wspólne dla administracji rządowej, więc rozwiązanie może działać w ponad 1740 urzędach.

Demo: https://pawelpisarek.github.io/hacknation-proba12/makieta/ — fikcyjny urząd i sztuczne dane; podpowiedzi AI są zapisane z góry i oznaczone. Kod: https://github.com/PawelPisarek/hacknation-proba12

Użyte narzędzia: zespół botów na OpenMausBot (Apache-2.0), modele Claude (Anthropic), skille pm-skills (MIT).

Liczba znaków: 1787
