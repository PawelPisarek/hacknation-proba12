# Decyzje

18:04 Szef: start próby 12 — zakres do makiety (krok 0, 0P, łańcuch pm-skills, 3 warianty, makieta, krytyk) + docs/hacktribe.md.
18:04 Szef: kryteria oceny pracownika = ustawowe (ustawa o służbie cywilnej + rozporządzenie); ustala Analityk w kroku 0 ze źródłami; nie pytamy o nie ludzi.
18:04 Szef: dane sztuczne (opisy stanowisk, przykładowe oceny, notatki przełożonego); ciężkie liczenie na OMENie.
18:04 Szef: Paweł odpowiada jako on i jako Artur (pokój Produkt).
18:05 Prezenter: docs/hacktribe.md jako DRAFT; nazwa „Asystent Ocen Okresowych” (z tytułu zadania); zespół i makieta do uzupełnienia.
18:06 Szef: Paweł potwierdził — mówi za siebie i za Artura (Paweł 18:05).
18:05 Projektant: pominięte (jaki to produkt i kategoria) — z zadania: „Cyfrowy asystent ocen okresowych” dla urzędów służby cywilnej
18:05 Projektant: pominięte (czy szukamy konkurentów sami) — z zadania: nie ma listy konkurentów, szukamy sami
18:05 Projektant: pominięte (perspektywa i cel analizy) — z zadania: ocena porównawcza pod wybór wartości dla urzędów i ocenę jurorów
P1 18:05 Artur: Kto ma z produktu korzystać najczęściej — przełożony oceniający, pracownik czy kadry? Polecam: przełożony, a pracownik jako drugi użytkownik — czeka
P2 18:05 Artur: Co dziś najbardziej boli w ocenie okresowej? Polecam: ogólnikowe uzasadnienia i brak notatek z całego okresu — czeka
P3 18:05 Artur: Co ma zyskać użytkownik? Polecam: rzetelną ocenę z konkretnymi przykładami szybciej i plan rozwoju po rozmowie — czeka
P4 18:05 Artur: Czy produkt zbiera notatki przez cały rok, czy zaczyna dopiero przy ocenie? Polecam: notatki przez cały rok — czeka
18:07 Szef: krok 1a — znacznik przeplywy-pm jest; recenzja przejścia R1 → Analityk.
18:07 Programista: stos — statyczna strona (HTML/CSS/JS, bez budowania) w `app/` + serwer `server.mjs` (Node, port 3000, Dockerfile); łatwe do zmiany. Powód: makieta na gh-pages bez kroku budowania, MVP w tym samym kodzie.
18:07 Programista: dane sztuczne z `node scripts/generuj-dane.mjs` (deterministyczne, ziarno 12) → `dane/*.json` + `app/dane.js`. Pola arkusza (kryteria, skala 1–5, ocena końcowa) = założenie ogólne, DO POPRAWY wg `docs/materialy.md`.
18:08 Szef: krok 0 materialy.md przyjęty (c519969; rozporządzenie PRM 4.04.2016, Dz.U. 2016 poz. 470; arkusze A/B/C, skala 1/3/5/7/9, co 24 mies.).
18:08 Szef: krok 1a recenzja R1 (Analityk): 5 braków → poprawka Projektanta.
18:09 Projektant: korekta wpisu 18:05 (perspektywa i cel analizy) — z zadania: pomóc przełożonemu i pracownikowi przejść ustawową ocenę (docs/zadanie.md); „pod ocenę jurorów” usunięte. Poprawka R1 pliku 01: podstawa prawna 2016/470, założenia w kolumnie „Nasz produkt”, polskie alternatywy i źródła lub „do weryfikacji”.
