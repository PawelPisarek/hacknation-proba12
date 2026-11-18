# Zgłoszenie HackTribe — DRAFT (tekst roboczy)

Zadanie: HackNation 2026 „Cyfrowy asystent ocen okresowych”. Pola formularza jeszcze nieznane. Teksty zgodne z ustaleniami P1–P4 (docs/decyzje.md, 18:10).

## Nazwa projektu (`product-name`, limit ≤ 50)

Asystent Ocen Okresowych

Liczba znaków: 24

## Nazwa zespołu

do uzupełnienia

## Linki

- Repozytorium: https://github.com/PawelPisarek/hacknation-proba12 — HTTP 200
- Makieta (GitHub Pages): do uzupełnienia (adres poda Programista)

## Opis wstępny (≤ 300 znaków)

Asystent dla przełożonego i pracownika urzędu: pokazuje, na jakim etapie jest ustawowa ocena okresowa, jakie obowiązują kryteria i kiedy upływają terminy liczone od daty zatrudnienia. Koniec z papierem i szukaniem historii.

Liczba znaków: 230

## Opis średni (≤ 1000 znaków)

Ocena okresowa w służbie cywilnej wynika z ustawy, ale w praktyce wszystko dzieje się na papierze: nie ma jasnej historii ocen, a przełożony i pracownik muszą sami pilnować etapów i terminów. Cyfrowy asystent ocen okresowych nie zastępuje ustawowej oceny — pomaga ją przejść. Przełożony (główny użytkownik) i pracownik (drugi użytkownik) widzą aktualne informacje: etapy oceny, kryteria z rozporządzenia PRM z 2016 r. i terminy liczone od daty zatrudnienia. Dzięki temu nikt nie musi zgadywać, co jest dalej i do kiedy. Rozwiązanie jest pomyślane dla ponad 1740 urzędów w całej Polsce. W makiecie używamy wyłącznie sztucznych danych: przykładowych opisów stanowisk i ocen.

Liczba znaków: 707

## Opis pełny (≤ 2000 znaków)

Problem. Ocena okresowa pracowników służby cywilnej jest obowiązkowa i ściśle określona: ustawa i rozporządzenie PRM z 2016 r. wskazują kryteria, skalę i terminy. Mimo to proces zwykle toczy się na papierze. Nie ma jasnej historii, trudno ustalić, na jakim etapie jest ocena, a terminy — zależne od daty zatrudnienia — trzeba pilnować samemu. Przełożony i pracownik tracą czas na ustalanie formalności zamiast skupić się na rozmowie o pracy.

Rozwiązanie. Cyfrowy asystent ocen okresowych wspiera ustawową ocenę zamiast ją zastępować. Nie wymyślamy własnych kryteriów — korzystamy z tych, które już obowiązują.

Dla przełożonego (główny użytkownik): jedno miejsce z aktualnymi informacjami o tym, jakie etapy ma ocena, według jakich kryteriów jest przeprowadzana i jakie terminy go obowiązują, wyliczone od daty zatrudnienia każdego pracownika.

Dla pracownika (drugi użytkownik): jasny obraz, na jakim etapie jest jego ocena, co go jeszcze czeka i według jakich kryteriów będzie oceniany.

Skala. Zasady oceny są wspólne dla administracji rządowej, więc rozwiązanie może działać w ponad 1740 urzędach w całej Polsce i dotyczyć tysięcy pracowniczek i pracowników.

Demo. Makieta pokazuje cały przebieg na danych w całości sztucznych: opisach stanowisk i przykładowych ocenach. Nie używamy żadnych prawdziwych danych o pracownikach.

Co dalej. Dopasowanie do formularzy i procedur w konkretnych urzędach, testy z przełożonymi i pracownikami oraz zabezpieczenie danych osobowych przed wdrożeniem.

Użyte narzędzia: zespół botów na OpenMausBot (Apache-2.0), modele Claude (Anthropic), skille pm-skills (MIT).

Liczba znaków: 1686

Po uzupełnieniu adresu makiety dopisać link (zapas: 314 znaków).
