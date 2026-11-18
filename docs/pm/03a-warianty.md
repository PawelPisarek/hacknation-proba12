# Trzy warianty ekranu (krok 2, część 1 — przed /write-prd)

Podstawa: `docs/pm/02-discover.md` (pomysły 2–6, oś etapów jednej oceny w kolejce, pasek etapów w „Mojej ocenie” — P9–P10; produkt sam przypomina o terminach — P6; pracownik potwierdza zapoznanie — P5; bez widoku kadr — P7; człowiek może zmienić wszystko, gdy system się pomyli — P11), `docs/materialy.md` (kryteria, skala, etapy, terminy). Wybór wariantu robi Artur po obejrzeniu makiet (pytania (c) dopiero wtedy). Pytanie **P12** (data i poziom poprzedniej oceny): w każdym wariancie pole „poprzednia ocena” jest zaznaczone jako **warunkowe — zależy od odpowiedzi Artura**.

## Wspólne zasady (dla Programisty)
- Data „dziś” w makiecie: **18.11.2026** (stała, żeby demo było powtarzalne). Urząd: Urząd Wojewódzki w Przykładowie (dane sztuczne).
- Role: **przełożony** (Marek Zieliński — dyrektor zespołu, w makiecie ocenia wszystkie 6 osób z tabeli) i **pracownik** (widzi tylko swoją ocenę). Przełącznik roli u góry („Zobacz jako: przełożony / pracownik: <imię>”). Bez widoku kadr.
- Człowiek może zmienić wszystko (P11): termin, data zatrudnienia, każda ocena cząstkowa, średnia i poziom mają przy sobie przycisk „popraw”; poprawiona wartość dostaje znaczek „ustawione ręcznie” i oryginał z systemu widać w podpowiedzi.
- Przypomnienia (P6): lista w aplikacji (dzwonek z liczbą), bez wysyłki na zewnątrz; treść np. „Anna Kowalska: rozmowa oceniająca do 20.01.2027 — zostało 63 dni”.
- **Uwaga do `dane/` i `app/dane.js`:** obecne dane używają skali 1–5 i kryteriów spoza rozporządzenia; trzeba je zastąpić danymi z tego pliku i `docs/materialy.md`: skala **1/3/5/7/9**, 14 kryteriów z załącznika 1, obowiązkowe według arkusza A/B/C, **do 3 dodatkowych**, średnia arytmetyczna, poziomy: 1–2 / >2–4 / >4–6 / >6–8 / >8–9; ocena pozytywna = poziom „na poziomie oczekiwań” lub wyższy **i** żadna ocena cząstkowa nie jest 1.

### Sztuczne dane (6 osób, wszystkie warianty)
Etapy (z `docs/materialy.md`, sekcja 4): ① rozmowa wstępna ② zapoznanie z kryteriami (podpis) ③ rozmowa oceniająca ④ ocena na piśmie ⑤ zapoznanie z oceną (+7 dni na sprzeciw).

| Pracownik | Stanowisko, arkusz | Sytuacja (dziś 18.11.2026) | Etap | Najbliższy termin | Poprzednia ocena (P12: tak) |
|---|---|---|---|---|---|
| Piotr Wiśniewski | Specjalista, C | negatywna ocena sporządzona i przekazana 12.11.2026 | ⑤ (sprzeciw) i nowa rozmowa wstępna | **19.11.2026** — 7 dni na rozmowę wstępną i na sprzeciw (jutro) | 12.11.2026, średnia 5,00 = na poziomie oczekiwań, wynik negatywny przez ocenę „1” (§ 11) |
| Katarzyna Lis | Specjalista, C | zmiana stanowiska 02.11.2026, poprzednia ocena 15.03.2026 (>6 mies.) → ocena poza cyklem | ② kryteria ustalone | **02.12.2026** (do 30 dni po zmianie) — 14 dni | 15.03.2026, na poziomie oczekiwań |
| Ewa Nowak | Starszy specjalista, C | zatrudniona na czas nieokreślony 03.11.2026 | ① czeka na rozmowę wstępną | **03.12.2026** (30 dni) — 15 dni | brak (pierwsza ocena) |
| Jan Bielecki | Kierownik wydziału, B | poprzednia ocena 10.12.2024 → ocena co 24 mies. | ③ rozmowa oceniająca zaplanowana, arkusz w toku | **10.12.2026** — 22 dni | 10.12.2024, powyżej oczekiwań (6,71) |
| Anna Kowalska | Starszy specjalista ds. zamówień publicznych, C | poprzednia ocena 20.01.2025 | ② kryteria ustalone | **20.01.2027** — 63 dni | 20.01.2025, na poziomie oczekiwań (5,57) |
| Tomasz Mazur | Inspektor, C | ocena pozytywna 05.11.2026, zapoznany 05.11, sprzeciw nie wniesiony | zamknięta | następna 05.11.2028 | 05.11.2026, na poziomie oczekiwań (6,0) |

Ocena „Piotr Wiśniewski”: ocena cząstkowa: wykorzystywanie wiedzy 5, rzetelność **1**, organizacja pracy 7, współpraca 7, komunikacja 5 → średnia 5,00 = „na poziomie oczekiwań”, **ale wynik negatywny, bo jest ocena „1”** (reguła do pokazania). Ocena „Jan Bielecki” w toku: zarządzanie ludźmi 7, podejmowanie decyzji 7, organizacja 7, współpraca 7, komunikacja 7, dodatkowe: myślenie analityczne 7, negocjowanie 5 → średnia 6,7 = „powyżej oczekiwań”, pozytywna.

---

## Wariant 1 — „Jedna ocena na jednym ekranie” (jeden obraz na całość)
**Szkic w 3 linijkach.** Układ: jeden duży ekran jednej oceny — u góry pasek etapów ①–⑤, pod nim po lewej arkusz (kryteria, oceny, średnia, poziom), po prawej „co dalej” i termin. Główna ścieżka: przełożony od razu ląduje na najpilniejszej ocenie (Wiśniewski), wpisuje/poprawia oceny, widzi średnią i poziom, przechodzi do następnego etapu. Co widać pierwsze: pasek etapów z zaznaczonym bieżącym i termin „do 19.11.2026 — 1 dzień”.

Ekrany:
1. **Ocena (przełożony)** — pasek etapów, karta terminu (z czego wynika), arkusz: 5 kryteriów obowiązkowych arkusza C + dodatkowe, oceny 1/3/5/7/9 do kliknięcia, średnia i poziom na żywo, ostrzeżenie „jedna ocena 1 = ocena negatywna”, przyciski „popraw” przy terminie, średniej i poziomie. Dane: Wiśniewski (średnia 5,00, negatywna).
2. **Wybór pracownika** — małe okno z listą 6 osób i etapem przy każdej; po wyborze wraca ekran 1.
3. **Moja ocena (pracownik)** — ten sam ekran w trybie odczytu: pasek etapów, kryteria, termin, przycisk „Potwierdzam zapoznanie z oceną” (data i godzina po kliknięciu), informacja „7 dni na sprzeciw do 19.11.2026”. Dane: Wiśniewski jako pracownik.
4. **Przypomnienia** — rozwijana lista z dzwonka: pięć przypomnień z terminami wg tabeli.
5. *(P12: tak)* panel „Poprzednia ocena: 12.11.2026, poniżej oczekiwań” pod paskiem etapów.

Demo (≤ 2 min): ekran 1 Wiśniewski → zmiana jednej oceny z 1 na 3 (poziom i wynik zmieniają się) → „popraw” termin → przełącznik na pracownika → ekran 3 → potwierdzenie.

## Wariant 2 — „Najpierw kolejka” (lista, potem szczegół)
**Szkic w 3 linijkach.** Układ: ekran startowy to kolejka 6 osób posortowana po terminie (kolory: czerwony ≤ 7 dni, żółty ≤ 30, szary reszta), po kliknięciu osi etapów jednej oceny i arkusz. Główna ścieżka: kolejka → pracownik → oś etapów → arkusz → termin/przypomnienie. Co widać pierwsze: kto jest najpilniejszy i ile dni zostało.

Ekrany:
1. **Kolejka przełożonego** — tabela: pracownik, stanowisko i arkusz (A/B/C), etap ①–⑤ (mały pasek), najbliższy termin i dni do niego, przycisk „Przejdź”. Kolejność: Wiśniewski (1 dzień), Lis (14), Nowak (15), Bielecki (22), Kowalska (63), Mazur (zamknięta). Licznik w dzwonku: 4 przypomnienia.
2. **Etapy jednej oceny** (P9) — pionowa oś ①–⑤: co zrobione (data), co teraz, co dalej, termin każdego kroku i z czego wynika (np. „30 dni od zatrudnienia na czas nieokreślony”); przy każdym „popraw”.
3. **Arkusz krok po kroku** — kryteria obowiązkowe (wg arkusza), wybór **do 3** kryteriów dodatkowych z opisem zachowań (pomysł 6), oceny, średnia, poziom, ostrzeżenie o „1”. Dane: Bielecki (6,7, powyżej oczekiwań).
4. **Moja ocena (pracownik)** — pasek postępu etapów (P10), kryteria obowiązkowe i dodatkowe, termin, potwierdzenie zapoznania. Dane: Kowalska.
5. **Przypomnienia / kalendarz** — lista terminów wszystkich osób wg dat (kalendarz terminów, pomysł 2). *(P12: tak)* w kolejce kolumna „poprzednia ocena” (data, poziom).

Demo (≤ 2 min): kolejka → Wiśniewski → oś etapów → arkusz (średnia 5,00, negatywna przez „1”) → przełącznik na pracownika → potwierdzenie.

## Wariant 3 — „Obok siebie” (przełożony i pracownik jednocześnie)
**Szkic w 3 linijkach.** Układ: dwie kolumny — lewa „Przełożony”, prawa „Pracownik” — pokazują tę samą ocenę, a zmiana po lewej od razu widoczna po prawej. Główna ścieżka: wybór pracownika → po lewej przełożony wpisuje oceny, po prawej pracownik widzi etap i termin → przełożony przechodzi do kolejnego etapu, pracownik potwierdza. Co widać pierwsze: dwie kolumny z tym samym paskiem etapów i tym samym terminem.

Ekrany:
1. **Obok siebie** — lewa kolumna: kolejka (6 osób, etap, termin) i arkusz wybranej osoby; prawa: „Moja ocena” tej osoby (pasek etapów, kryteria, termin, przycisk potwierdzenia). Nagłówek „co widzi druga strona”. Dane: Kowalska ↔ Marek Zieliński.
2. **Terminy na osi czasu** — wszyscy z kolejki na jednej osi (listopad 2026 – styczeń 2027): znaczniki terminów, kropka „dziś 18.11.2026”; kliknięcie wraca do ekranu 1. Przypomnienia jako czerwone znaczniki.
3. **Arkusz z poprzednią oceną** *(P12: tak)* — dwie kolumny: poprzednia ocena (12.11.2026 / 10.12.2024 itd.) i obecna, z różnicą przy każdym kryterium; bez P12 ekran pokazuje tylko obecną.
4. **Potwierdzenie zapoznania** — okno po stronie pracownika: „Potwierdzam zapoznanie z oceną”, data; po stronie przełożonego zmienia się etap na ⑤ i startuje odliczanie 7 dni na sprzeciw.
5. **Poprawka** — okno „Popraw wartość” (P11): nowa wartość, powód (jedno zdanie), znaczek „ustawione ręcznie”.

Demo (≤ 2 min): ekran 1 Kowalska → przełożony zmienia ocenę, średnia i poziom zmieniają się po obu stronach → po prawej potwierdzenie → ekran 2 (oś terminów).

---

## Porównanie wariantów (dla Szefa i Artura, bez wyboru)
| | W1 jeden ekran | W2 kolejka | W3 obok siebie |
|---|---|---|---|
| Punkt wyjścia | jedna ocena | lista osób | dwie role naraz |
| Mocna strona | najprostszy, najkrótsze demo | pokazuje terminy i priorytety wszystkich | pokazuje korzyść obu stron naraz |
| Ryzyko | brak przeglądu wszystkich osób | więcej ekranów | gęsty ekran, mniej czytelny na telefonie |
| Pokrywa pomysły | 4, 5, 6 (+2 w karcie terminu) | 2, 3, 4, 5, 6 | 2, 3, 4, 5 |

Odpowiedź P12 (Artur: tak, w części): data i poziom poprzedniej oceny wchodzą do wszystkich trzech wariantów jako zwykłe pole, nie warunkowe.

<!-- skill: przeplywy-pm -->
