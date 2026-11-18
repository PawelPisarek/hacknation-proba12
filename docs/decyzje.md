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
P1 18:10 odpowiedź: przełożony najczęściej, pracownik jako drugi użytkownik (Artur w pokoju)
P2 18:10 odpowiedź: brak jasnej historii — wszystko jest na papierze (Artur w pokoju; zamiast rekomendacji „ogólnikowe uzasadnienia”)
P3 18:10 odpowiedź: mieć aktualne informacje o ocenie: etapy, kryteria, terminy (Artur w pokoju)
P4 18:10 odpowiedź: terminy zależą od daty zatrudnienia; nie ma potrzeby zbierać notatek przez cały rok (Artur w pokoju; zamiast rekomendacji „przez cały rok”)
18:10 Szef: krok 1a poprawka R1 (0cb220c), znacznik jest → recenzja R2 (Analityk).
18:10 Szef: krok 1a recenzja R2 (Analityk): 4 braki (P1–P4 Artura zmieniają nacisk: historia i terminy zamiast notatek z roku) → poprawka Projektanta, potem R3 (ostatnia).
18:11 Projektant: podpis „Opera on Mac” = Paweł (odp. Opera on Mac w pokoju); odpowiada też za Artura (zgodnie z wpisem Szefa 18:06)
18:11 Szef: krok 1a poprawka R2 (5a6aa0d) → recenzja R3 (Analityk, ostatnia).
18:12 Szef: krok 1a zamknięty po R3 (Analityk: brak braków zmieniających zakres lub kryteria). Rundy 1a: 3. Start 1b /discover (Projektant).
18:12 Projektant: pominięte (co badamy w /discover) — z zadania: pomoc przełożonemu i pracownikowi przejść ustawową ocenę; reszta kontekstu z P1–P4
P5 18:12 Artur: Co robi pracownik w produkcie — tylko widzi status, czy też potwierdza zapoznanie z oceną? Polecam: widzi status i potwierdza zapoznanie — czeka
P6 18:12 Artur: Czy produkt ma sam przypominać o terminach, czy wystarczy widok „co przed Tobą”? Polecam: widok z wyróżnionymi bliskimi terminami — czeka
P7 18:12 Artur: Czy dział kadr ma mieć swój widok? Polecam: nie w pierwszej wersji — czeka
P8 18:12 Artur: Które 3–5 pomysłów z 10 bierzemy do dalszej pracy (albo wszystkie)? Polecam: 1, 2, 3, 4, 5 — czeka
18:14 Prezenter: hacktribe.md dopasowany do pytań 1–4 (przełożony główny, pracownik drugi; brak historii/papier; aktualne etapy, kryteria, terminy od daty zatrudnienia; bez notatek z roku). odpowiedzi na pytania 5–8 nieujęte (wpis, nie pytanie; poprawka formatu: Szef).
P5 18:15 odpowiedź: pracownik widzi status i potwierdza zapoznanie z oceną (Artur w pokoju)
P6 18:15 odpowiedź: produkt sam przypomina o terminach (Artur w pokoju; więcej niż rekomendacja „sam widok”)
P7 18:15 odpowiedź: kadry bez własnego widoku w pierwszej wersji (Artur w pokoju)
P8 18:15 odpowiedź: bierzemy pomysły 2, 3, 4, 5, 6 (Artur w pokoju; zamiast rekomendacji 1–5: dodane 6, odpada 1)
P9 18:15 Artur: Co w wybranych pomysłach (2–6) zmienić albo dodać? Polecam: nic nie zmieniać, tylko dopisać do kolejki widok osi etapów jednej oceny — czeka
P10 18:15 Artur: Czy któryś odrzucony pomysł (1, 7–10) warto wziąć choć w części? Polecam: etapy z pomysłu 1 jako pasek postępu w „Mojej ocenie”, reszta odpada — czeka
P11 18:15 Artur: Czy potwierdzasz dwa najryzykowniejsze założenia: (A) terminy policzone z daty zatrudnienia przełożony uzna za wiarygodne i ważniejsze od papieru; (B) przełożony wpisze oceny w arkusz i zaufa automatycznej średniej i poziomowi? Polecam: tak, oba do sprawdzenia w demo — czeka
P9 18:18 odpowiedź: nic nie zmieniać w 2–6; dopisać do kolejki widok etapów jednej oceny (Artur w pokoju)
P10 18:18 odpowiedź: etapy z pomysłu 1 jako pasek postępu w „Mojej ocenie”; reszta odrzuconych odpada (Artur w pokoju)
P11 18:18 odpowiedź: założenia A i B potwierdzone jako najryzykowniejsze; dodatkowo: człowiek może zmienić wszystko, jeśli system się pomyli (Artur w pokoju)
18:18 Prezenter: hacktribe.md uwzględnia odpowiedzi na pytania 5–8 (status i potwierdzenie zapoznania, przypomnienia produktu, brak widoku kadr w v1, zakres: pomysły 2–6).
