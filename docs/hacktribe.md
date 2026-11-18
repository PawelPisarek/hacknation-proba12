# Zgłoszenie HackTribe — DRAFT (tekst roboczy)

Zadanie: HackNation 2026 „Cyfrowy asystent ocen okresowych”. Pola formularza jeszcze nieznane. Teksty zgodne z ustaleniami Artura (docs/decyzje.md, odpowiedzi P1–P8).

## Nazwa projektu (`product-name`, limit ≤ 50)

Asystent Ocen Okresowych

Liczba znaków: 24

## Nazwa zespołu

do uzupełnienia

## Linki

- Repozytorium: https://github.com/PawelPisarek/hacknation-proba12 — HTTP 200
- Makieta (GitHub Pages): https://pawelpisarek.github.io/hacknation-proba12/makieta/ — HTTP 200

## Opis wstępny (≤ 300 znaków)

Asystent ustawowej oceny okresowej w urzędzie: liczy terminy od daty zatrudnienia i sam przypomina o nich, prowadzi przełożonego przez arkusz oceny, a pracownikowi pokazuje status oceny i pozwala potwierdzić zapoznanie. Zamiast papieru.

Liczba znaków: 240

## Opis średni (≤ 1000 znaków)

Ocena okresowa w służbie cywilnej wynika z ustawy, ale w praktyce toczy się na papierze: brakuje jasnej historii, a przełożony i pracownik sami pilnują etapów i terminów. Cyfrowy asystent ocen okresowych nie zastępuje ustawowej oceny — pomaga ją przejść. Przełożony (główny użytkownik) dostaje kalendarz terminów liczonych od daty zatrudnienia, kolejkę „kogo i kiedy ocenić” z przypomnieniami oraz arkusz krok po kroku: oceny cząstkowe 1/3/5/7/9, automatyczną średnią i poziom oceny, wybór kryteriów dodatkowych. Pracownik (drugi użytkownik) w „Mojej ocenie” widzi etap, kryteria i terminy oraz potwierdza zapoznanie z oceną. Pierwsza wersja nie ma osobnego widoku dla kadr. Dla ponad 1740 urzędów; makieta na danych sztucznych.

Liczba znaków: 768

## Opis pełny z linkami (≤ 2000 znaków)

Problem. Ocena okresowa pracowników służby cywilnej jest obowiązkowa i ściśle określona: ustawa i rozporządzenie PRM z 2016 r. wskazują kryteria, skalę i terminy. Mimo to proces zwykle toczy się na papierze. Nie ma jasnej historii, trudno ustalić, na jakim etapie jest ocena, a terminy — zależne od daty zatrudnienia — trzeba pilnować samemu.

Rozwiązanie. Cyfrowy asystent ocen okresowych wspiera ustawową ocenę zamiast ją zastępować. Nie wymyślamy własnych kryteriów — korzystamy z obowiązujących.

Dla przełożonego (główny użytkownik):
- kalendarz terminów liczony od daty zatrudnienia i poprzedniej oceny, z własnymi przypomnieniami produktu;
- kolejka: kogo i kiedy ocenić, co zostało do zrobienia, pilne sprawy na górze;
- arkusz oceny krok po kroku: oceny cząstkowe w skali 1/3/5/7/9, automatyczna średnia i poziom oceny, ostrzeżenie, że jedna ocena „1” oznacza ocenę negatywną;
- wybór kryteriów dodatkowych (maksymalnie trzech) z opisami zachowań z rozporządzenia.

Dla pracownika (drugi użytkownik): widok „Moja ocena” — etap, kryteria, terminy i to, co wydarzy się dalej. Pracownik potwierdza w produkcie zapoznanie z oceną.

Czego w pierwszej wersji nie ma: osobnego widoku dla działu kadr.

Skala. Zasady oceny są wspólne dla administracji rządowej, więc rozwiązanie może działać w ponad 1740 urzędach w całej Polsce i dotyczyć tysięcy pracowniczek i pracowników.

Demo: https://pawelpisarek.github.io/hacknation-proba12/makieta/ — dane w całości sztuczne, bez prawdziwych danych o pracownikach. Kod: https://github.com/PawelPisarek/hacknation-proba12

Co dalej. Dopasowanie do procedur konkretnych urzędów, testy z przełożonymi i pracownikami oraz zabezpieczenie danych osobowych przed wdrożeniem.

Użyte narzędzia: zespół botów na OpenMausBot (Apache-2.0), modele Claude (Anthropic), skille pm-skills (MIT).

Liczba znaków: 1914
