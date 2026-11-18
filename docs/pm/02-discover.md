# Odkrywanie: asystent ocen okresowych (krok 1b, /discover)

Etap: nowy produkt (dane sztuczne, bez realnych użytkowników). Stan: wybór Artura zrobiony (P5–P11), plik kompletny.

## Kontekst (Krok 1)
- **Co badamy:** jak pomóc przełożonemu i pracownikowi przejść ustawową ocenę okresową dobrze, w urzędach służby cywilnej (`docs/zadanie.md`).
- **Co już wiemy:** użytkownik to przełożony, pracownik jako drugi (P1); boli brak jasnej historii, wszystko na papierze (P2); zysk to aktualne informacje o etapach, kryteriach i terminach (P3); terminy zależą od daty zatrudnienia, notatki przez rok niepotrzebne (P4); kryteria, skala, etapy i terminy są ustawowe (`docs/materialy.md`); konkurenci: `docs/pm/01-competitive-analysis.md`.
- **Jaką decyzję ustawia:** które funkcje wchodzą do makiety i demo oraz do `docs/spec.md`. Pokaz produktu trwa do 2 min — ustalenie Szefa (`docs/decyzje.md`, commit f38d0b9).
- **Skąd kontekst (zamiast pytań):** „co już wiemy” pochodzi z odpowiedzi Artura P1–P4 i z zadania, „jaką decyzję ustawia” — z zadania (zbudować makietę i demo ustawowej oceny); wpis w `docs/decyzje.md` z 18:20.

## 10 pomysłów (PM, projektant, inżynier)
1. **Oś oceny** — etapy procesu (rozmowa wstępna → zapoznanie z kryteriami → rozmowa oceniająca → ocena na piśmie → zapoznanie) i status jednej oceny.
2. **Kalendarz terminów** — liczony z daty zatrudnienia i poprzedniej oceny: 30 dni, 24 mies., ocena poza cyklem, 7 dni na sprzeciw.
3. **Kolejka przełożonego** — kogo i kiedy ocenić, co zostało do zrobienia, pilne na górze.
4. **„Moja ocena” dla pracownika** — etap, kryteria, terminy, co się wydarzy dalej.
5. **Arkusz krok po kroku** — oceny cząstkowe 1/3/5/7/9, automatyczna średnia i poziom, ostrzeżenie „jedna 1 = ocena negatywna”.
6. **Wybór kryteriów dodatkowych** (maks. 3) z opisami zachowań z załącznika do rozporządzenia.
7. **Przewodnik rozmów** — tematy rozmowy wstępnej i oceniającej wg rozporządzenia.
8. **Pomoc w uzasadnieniu** — szkic uzasadnienia z punktów, które przełożony wpisze przy ocenie (obowiązkowe przy negatywnej); AI proponuje, człowiek zatwierdza.
9. **Wnioski do planu rozwoju** — szkic z kryteriów ocenionych nisko.
10. **Historia ocen w jednym miejscu** — poprzednie oceny, daty, poziomy, kto oceniał (odpowiedź na P2).

## Wybór Artura (P5–P11)
- **Bierzemy: 2, 3, 4, 5, 6** (P8) — kalendarz terminów, kolejka przełożonego, „Moja ocena”, arkusz krok po kroku, kryteria dodatkowe.
- **Zmiany (P9, P10):** do kolejki dochodzi widok etapów jednej oceny; etapy z pomysłu 1 wchodzą jako pasek postępu w „Mojej ocenie”. Pozostałe odrzucone (1 poza paskiem, 7–10) odpadają.
- **Pracownik** widzi status i potwierdza zapoznanie z oceną (P5). **Produkt sam przypomina** o terminach (P6). **Kadry** bez własnego widoku w pierwszej wersji (P7).
- **Historia (P12):** wchodzi w części — data i poziom poprzedniej oceny w arkuszu i w „Mojej ocenie” (pełna historia, pomysł 10, odpada).
- **Zasada ogólna (P11):** człowiek może zmienić wszystko, jeśli system się pomyli (data, termin, średnia, poziom).

## Pokrycie bólu P2 (brak historii, papier) i IPRZ
- **P2 — brak jasnej historii, wszystko na papierze:** pokrywają częściowo 3 (kolejka z widokiem etapów jednej oceny), 4 („Moja ocena” z paskiem etapów i statusem) i 5 (arkusz zapisany w produkcie zamiast na papierze). Historia poprzednich ocen (pomysł 10) nie weszła do wyboru — **P12 (Artur): wchodzi w części** (tak, jako pole „poprzednia ocena: data i poziom” w arkuszu i w „Mojej ocenie”, zgodnie z polem arkusza w `docs/materialy.md`).
- **IPRZ** (wnioski do planu rozwoju, `docs/pm/01-competitive-analysis.md` „Dogonić”): pomysł 9 odpadł osobno, ale pomysł 5 (arkusz krok po kroku) obejmuje część z IPRZ jako obowiązkowe pole arkusza (`docs/materialy.md`, część II arkusza); szkic wniosków z AI nie wchodzi.

## Najryzykowniejsze założenia (potwierdzone, P11)
- **A.** Przełożony uzna terminy policzone z daty zatrudnienia za wiarygodne i ważniejsze od papieru.
- **B.** Przełożony wpisze oceny w arkusz i zaufa automatycznej średniej i poziomowi.

## Eksperymenty
| Założenie | Eksperyment | Sukces | Gdzie w demo / makiecie |
|---|---|---|---|
| A | Makieta z 6 sztucznymi pracownikami o różnych datach zatrudnienia; przełożony sprawdza ręcznie 1–2 terminy i porównuje | terminy zgodne z rozporządzeniem (`docs/materialy.md`) w każdym przypadku | kolejka + kalendarz; przy terminie widać, z czego wynika, i można go poprawić |
| B | Przełożony wypełnia arkusz jednego pracownika w makiecie, sprawdza średnią i poziom, potem zmienia jedną ocenę | średnia i poziom zmieniają się od razu, ostrzeżenie „jedna 1” widoczne, każdą wartość da się poprawić | arkusz krok po kroku |

## Plan: kolejność funkcji
1. Kolejka przełożonego + widok etapów jednej oceny (3).
2. Kalendarz terminów z przypomnieniami (2).
3. Arkusz krok po kroku z kryteriami dodatkowymi (5, 6).
4. „Moja ocena” z paskiem etapów i potwierdzeniem zapoznania (4).

Główna ścieżka demo (≤ 2 min): kolejka → wybór pracownika → arkusz (średnia, poziom) → termin i przypomnienie → „Moja ocena” pracownika, potwierdzenie.

<!-- skill: przeplywy-pm -->
<!-- skill: brainstorm-ideas-new -->
<!-- skill: identify-assumptions-new -->
<!-- skill: brainstorm-experiments-new -->
