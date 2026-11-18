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
18:18 Szef: 1b /discover — recenzja przejścia runda 1 zlecona Analitykowi.
18:19 Analityk: krok 1b recenzja R1 (02-discover.md): 4 braki — brak pytania/pominięcia „co już wiemy” i „jaką decyzję ustawia”; „do 2 min” bez źródła; ból P2 (historia) bez pokrycia w wybranych 2–6; „dogonić IPRZ” z 01 odpadło bez adnotacji → poprawka Projektanta.
18:20 Programista: sonda OMEN (klasa testy): 4 rdzenie, 7 GB RAM, GPU niewidoczne w zadaniu (nvidia-smi: brak urządzeń), brak torch/ollama/modeli w ~/.cache, internet jest (HF 200). Instalacja llama-cpp przerwana przez Slurm (CANCELLED ~1 min). Czasu odpowiedzi modelu brak — do ustalenia z Pawłem: klasa z GPU albo model przez API.
18:20 Szef: 1b R1 braki → Projektant. Rozstrzygnięcia: pokaz produktu trwa do 2 min — ustalenie Szefa (źródło dla „do 2 min”); arkusz krok po kroku (pomysł 5) obejmuje część z IPRZ, bo to obowiązkowe pole arkusza wg docs/materialy.md.
P13 18:20 Paweł: Programista nie ma GPU w klasie „testy” na OMENie, a dłuższa instalacja jest przerywana — jaką klasę albo limit z GPU może użyć do modelu językowego? Polecam: daj klasę z GPU i dłuższy limit na jedną instalację; do tego czasu makieta na udawanych wynikach — czeka
18:20 Projektant: pominięte (co już wiemy; jaką decyzję ustawia /discover) — z zadania i odpowiedzi P1–P4: kontekst jest ustalony, decyzja = wybór funkcji makiety i demo (do 2 min — ustalenie Szefa, f38d0b9)
P12 18:20 Artur: Czy historia poprzednich ocen ma wejść choć w części (data i poziom poprzedniej oceny w arkuszu i w „Mojej ocenie”)? Polecam: tak, w tej części — czeka
18:21 Szef: zdublowany numer P12 — pytanie do Pawła (GPU na OMENie) przenumerowane na P13; P12 zostaje dla pytania Artura o historię.
18:21 Analityk: krok 1b recenzja R2 (02-discover.md): brak braków zmieniających zakres lub kryteria; pytanie 12 (historia ocen) odnotowane w pliku (wpis, nie pytanie; poprawka formatu: Szef).
18:22 Szef: krok 1b zamknięty po 2 rundach recenzji przejścia; start kroku 2 — szkice 3 wariantów (Projektant) → makiety wariantów (Programista) → wybór Artura → /write-prd.
18:24 Programista: dane sztuczne przerobione pod docs/materialy.md (arkusze A/B/C, części I–III, skala 1/3/5/7/9, § 11, IPRZ, terminy T1–T13, przypadki dat 1–3, sprzeciw); reguły w app/zasady.mjs. Założenia [I] z materialy.md pkt 11 (24 mies. od poprzedniej oceny, dni kalendarzowe). Granica: średnia dokładnie 4 = „poniżej oczekiwań” (przedział >2–4).
P12 18:27 odpowiedź: tak — data i poziom poprzedniej oceny w arkuszu i w „Mojej ocenie” (Artur w pokoju)
P13 18:30 odpowiedź: zamiast modelu na OMENie — Claude z naszej subskrypcji (Paweł). Rozstrzygnięcie Szefa: subskrypcja działa dla botów, nie dla aplikacji na serwerze (bez klucza API) → teksty AI (podpowiedzi do arkusza, przykładowe uzasadnienia, notatki) Programista generuje Claude'em z góry i zapisuje jako dane; w aplikacji oznaczone „podpowiedź AI”. Klucz API do działania na żywo — osobna decyzja Pawła, jeśli zechce.
18:35 Programista: makiety 3 wariantów (makieta/warianty/1–3, gh-pages /warianty/N/) na 6 osobach ze szkiców 03a-warianty.md (osobno od dane/ — 8 osób pod materialy.md). Teksty AI (P13) napisane z góry w makieta/warianty/wspolne/wspolne.mjs (obiekt AI), oznaczone „podpowiedź AI”, edytowalne (P11). Niespójności szkicu: Bielecki „poprzednia 6,8” niemożliwa przy 7 ocenach nieparzystych → pokazana jako tekst, porównanie liczy 6,71; Kowalska 5,6 → 5,57; Wiśniewski „poniżej oczekiwań” przy ocenach 5,1,7,7,5 → średnia 5,00 = „na poziomie oczekiwań”, wynik negatywny przez „1” (§ 11) — pokazana wersja wyliczona.
18:37 Szef: warianty https://pawelpisarek.github.io/hacknation-proba12/warianty/1/ https://pawelpisarek.github.io/hacknation-proba12/warianty/2/ https://pawelpisarek.github.io/hacknation-proba12/warianty/3/
P14 18:37 Artur: Który wariant produktu wybierasz: 1 (jedna ocena na jednym ekranie), 2 (najpierw kolejka osób) czy 3 (przełożony i pracownik obok siebie)? Polecam: 2 — przełożony od razu widzi, kogo i do kiedy ocenić, a ekran jednej oceny dostaje po kliknięciu osoby — czeka
P14 18:39 odpowiedź: wariant 1 — jedna ocena na jednym ekranie (Artur w pokoju; co się podoba/nie — nie podał, dopytuję w P15)
P15 18:39 Artur: Co Ci się podoba, a co nie w wariancie 1 (https://pawelpisarek.github.io/hacknation-proba12/warianty/1/)? Polecam: napisz jednym zdaniem każde. — czeka
P16 18:39 Artur: Po wejściu przełożony ma od razu widzieć najpilniejszą ocenę (dziś Wiśniewski, termin jutro), czy wybierać osobę z listy (https://pawelpisarek.github.io/hacknation-proba12/warianty/1/)? Polecam: od razu najpilniejszą, z małym wyborem osoby. — czeka
P17 18:39 Artur: Gdzie przełożony ma widzieć terminy pozostałych 5 osób (https://pawelpisarek.github.io/hacknation-proba12/warianty/1/)? Polecam: w dzwonku z przypomnieniami, bez osobnego ekranu. — czeka
P18 18:39 Artur: Poprzednia ocena (data i poziom): pokazać pod paskiem etapów czy obok arkusza (https://pawelpisarek.github.io/hacknation-proba12/warianty/1/)? Polecam: pod paskiem etapów. — czeka
P19 18:39 Artur: Poprawianie wartości przez człowieka: przycisk „popraw” przy każdej wartości czy jeden tryb „edytuj całość” (https://pawelpisarek.github.io/hacknation-proba12/warianty/1/)? Polecam: przycisk przy każdej wartości. — czeka
P15 18:43 odpowiedź: nie podoba się odstęp od przycisku; po wybraniu oceny 9 dodaje się plakietka i nie mieści się w jednej linii; pyta, co ma być na ostatnim kroku (podsumowanie?) (Artur w pokoju)
P16 18:43 odpowiedź: woli listę (wybór osoby z listy zamiast lądowania na najpilniejszej) (Artur w pokoju)
P17 18:43 odpowiedź: w dzwonku z przypomnieniami, bez osobnego ekranu (Artur w pokoju)
P18 18:43 odpowiedź: jak jest teraz, jest dobrze — pod paskiem etapów (Artur w pokoju)
P19 18:43 odpowiedź: przycisk przy każdej wartości (Artur w pokoju)
P20 18:43 Artur: Ostatni krok oceny (po wpisaniu wszystkich ocen) — pokazać podsumowanie: średnia, poziom, wynik pozytywny/negatywny, data następnej oceny i przycisk „Przekaż pracownikowi do zapoznania” (https://pawelpisarek.github.io/hacknation-proba12/warianty/1/)? Polecam: tak, takie podsumowanie. — czeka
P20 18:46 odpowiedź: tak — ostatni krok to podsumowanie (średnia, poziom, wynik, data następnej oceny), bez klikalnych przycisków; w makiecie przyciski są tylko atrapą (Artur w pokoju)
18:46 Programista: makieta główna /makieta/ = W1 (P14), ten sam kod co /warianty/1/ (tytuł z index.html). Usterka R1 (Artur: ocena 9 + znaczek łamie wiersz, za duży odstęp): znaczek przy zmienionej ocenie jako „✎ ustawione ręcznie” bez łamania, na telefonie sam „✎” (tekst w podpowiedzi); kolumna ocen tuż za najdłuższą nazwą kryterium; test w test-makiety. Teksty AI dla danych MVP w dane/podpowiedzi-ai.json (pisane z góry, P13; generator dokleja je do wszystko.json), test scripts/test-podpowiedzi.mjs.
18:50 Programista: /makieta/ ma własny kod (makieta/app.mjs), /warianty/1/ bez zmian. Wprowadzone P16 (start = lista osób), P17 (terminy w dzwonku), P18 (poprzednia pod paskiem etapów), P19 („popraw” przy średniej, poziomie, wyniku, terminie i dacie następnej oceny; oceny cząstkowe zmienia się przyciskami 1–9), P20 (podsumowanie bez elementów klikalnych; nawigacja „← Lista osób / ← Wróć do oceny” nad kartą). Data następnej oceny: pozytywna → +24 mies. od sporządzenia (dziś, gdy etap ④ niezamknięty), negatywna → +6 mies. od zapoznania (art. 81 ust. 9). Zrzuty: docs/zrzuty/R1/ (20 plików).
18:52 Szef: makieta R1 https://pawelpisarek.github.io/hacknation-proba12/makieta/ (200; zrzuty docs/zrzuty/R1/; krytyk po docs/spec.md)
18:52 Szef: Wiśniewski — „poprzednia ocena” to ocena sprzed 24 miesięcy (12.11.2024), nie bieżąca z 12.11.2026; poprawka w danych makiety: Programista, w 03a: Projektant.
18:53 Prezenter: hacktribe.md — dodany link do makiety (HTTP 200) i do repo w opisie pełnym (1914 znaków ≤ 2000); nazwa zespołu nadal do uzupełnienia.
18:53 Programista: Wiśniewski — poprzednia ocena w danych makiety: 12.11.2024, „na poziomie oczekiwań (5,00)” (wpis Szefa 18:52); dotyczy /makieta/ i wariantów (wspólne dane); test w test-makiety; zrzuty R1 odświeżone.
