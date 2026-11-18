## Product Requirements Document: Asystent ocen okresowych (służba cywilna)

**Autor**: Projektant · **Data**: 2026-11-18 · **Status**: Draft (wersja do makiety i MVP)
Podstawy: `docs/pm/01-competitive-analysis.md`, `docs/pm/02-discover.md`, `docs/pm/03a-warianty.md`, odpowiedzi Artura P1–P20 (`docs/decyzje.md`), przepisy z `docs/materialy.md`. Pełna specyfikacja dla MVP: `docs/spec.md`. Makieta: https://pawelpisarek.github.io/hacknation-proba12/makieta/

## 1. Summary
Aplikacja prowadzi przełożonego przez ustawową ocenę okresową urzędnika służby cywilnej: pokazuje, kogo i do kiedy ocenić, w jakim etapie jest każda ocena, liczy średnią, poziom i wynik oraz daty. Pracownik widzi status swojej oceny i potwierdza zapoznanie. Wszystko oparte na przepisach (ustawa art. 81–83, rozporządzenie 2016/470), dane sztuczne. Człowiek może poprawić każdą wartość (P11, P19).

## 2. Contacts
Artur — kształt produktu (w próbie odpowiada Paweł); Paweł — technika i wygląd; zespół botów: Projektant (spec), Programista (makieta, MVP), Analityk (przepisy, recenzje), Prezenter (README, prezentacja).

## 3. Background
Ocena okresowa jest ustawowa, kryteria i skala są dane z góry (`docs/materialy.md`). Główny ból (P2): brak jasnej historii, wszystko na papierze. Zysk (P3): aktualne informacje o etapach, kryteriach i terminach. Terminy zależą od daty zatrudnienia i poprzedniej oceny (P4); notatek przez rok nie potrzeba (P4). Komercyjne platformy mają własne kryteria, system KPRM to ewidencja dla kadr, Excel i papier nie dają statusu (`01-competitive-analysis.md`; część twierdzeń o konkurentach oznaczona tam „do weryfikacji”).

## 4. Objective
**Cel:** przełożony przechodzi ocenę zgodnie z przepisami, a pracownik wie, na jakim jest etapie.
**Mierniki — ZAŁOŻENIE do odpowiedzi Artura na P21** (pytanie zadane 18:59; bez odpowiedzi po 10 min przyjmujemy rekomendację). Nie mamy danych z rzeczywistości, więc to mierniki pokazu na danych sztucznych:
1. Przełożony znajduje najpilniejszą ocenę i otwiera arkusz w mniej niż 20 s (założenie, P21).
2. Po zmianie jednej oceny widzi nowy wynik od razu i rozumie, czemu jest negatywny (reguła „1”; założenie B z P11; P21).
3. Pokaz główny ścieżki mieści się w 2 min (ustalenie Szefa, `docs/decyzje.md`, f38d0b9).
Dodatkowo kontrola zgodności (nie miernik użytkownika): terminy w makiecie zgodne z przepisami w 6 z 6 sztucznych przypadków (założenie A, P11).

## 5. Market Segment(s)
1. **Przełożony** (kierownik komórki, naczelnik) oceniający 3–10 osób — użytkownik główny (P1). 
2. **Pracownik oceniany** (urzędnik i pracownik na czas nieokreślony) — użytkownik drugi (P1).
Poza zakresem v1: kadry (P7); osoby zatrudnione na czas określony — ocena okresowa dotyczy zatrudnionych na czas nieokreślony ([U] art. 81 ust. 1), a pierwsza ocena z art. 37–38 to inny proces.

## 6. Value Proposition(s)
**Przełożony.** *Kto:* kierownik oceniający zespół. *Dlaczego:* musi pamiętać terminy 30/7 dni, 24 mies. i wyjątki, a oceny prowadzi na papierze. *Przed:* papier/Excel, brak statusu. *Jak:* lista osób z etapem, dzwonek z terminami, arkusz z liczoną średnią i regułą „1”. *Po:* wie, co zrobić dziś, i ma gotowe podsumowanie. *Alternatywy:* Excel/papier, system KPRM (ewidencja).
**Pracownik.** *Kto:* oceniany. *Dlaczego:* nie wie, na jakim etapie jest jego ocena i jakie ma terminy. *Przed:* informacja ustna/papier. *Jak:* „Moja ocena” z paskiem etapów, poprzednią oceną, potwierdzeniem zapoznania i terminem sprzeciwu. *Po:* zna status i swoje 7 dni na sprzeciw. *Alternatywy:* pytanie przełożonego, kadry.

## 7. Solution
**Zakres v1 (wariant 1 „Jedna ocena na jednym ekranie”, P14; pomysły 2–6, P8):**
- **Lista osób (start przełożonego, P16)** z etapem ①–⑤; terminy wszystkich w dzwonku z przypomnieniami (P17, P6 — w aplikacji, bez wysyłki).
- **Ekran oceny:** pasek etapów, poprzednia ocena pod paskiem (P12, P18), arkusz (kryteria obowiązkowe wg A/B/C i do 3 dodatkowe, oceny 1/3/5/7/9, średnia, poziom, wynik), karta terminu z uzasadnieniem źródła i data następnej oceny; „popraw” przy każdej wartości (P19).
- **Podsumowanie (ostatni krok, P20):** średnia, poziom, wynik, data następnej oceny; tylko do odczytu.
- **Moja ocena (pracownik):** ten sam ekran w odczycie, potwierdzenie zapoznania, 7 dni na sprzeciw (P5).
- **Pole „Wnioski do IPRZ”** w arkuszu (część II, `materialy.md`, [R] § 11 ust. 1 pkt 5): z gotową podpowiedzią AI (3 formy rozwoju, P13; napisana z góry, oznaczona, edytowalna), widoczną tylko dla przełożonego; pracownik widzi treść zatwierdzoną; puste → ostrzeżenie.
- **Data zapoznania z oceną** = dzień, w którym pracownik potwierdza (decyzja Szefa 18:58); od niej 7 dni na sprzeciw i 6 mies. do ponownej oceny po negatywnej. **Data zatrudnienia** na czas nieokreślony jest w danych i da się ją poprawić (terminy z niej wynikające się przeliczają).
- **Data następnej oceny** jest „wstępna” do sporządzenia oceny na piśmie (④), także przy pozytywnej; potem ostateczna.
- **Teksty AI** (podpowiedzi do kryteriów dodatkowych, uzasadnienia, wniosków IPRZ; widzi je tylko przełożony) pisane z góry, oznaczone „podpowiedź AI”, edytowalne; aplikacja nie woła modelu (P13).
**Poza v1:** widok kadr (P7), pełna historia ocen, generowanie podpowiedzi AI w locie (wszystkie są napisane z góry), notatki z okresu, wysyłka e-mail/SMS, prawdziwe dane i logowanie.
**Założenia i pytania otwarte:** (1) bieg 24 mies. od sporządzenia oceny — interpretacja zespołu, nie przepis (`materialy.md` T6a); (2) dni liczone kalendarzowo (T-uwagi); (3) pole IPRZ w arkuszu zostaje jako zwykłe pole tekstowe; (4) zmiany ręczne mają znaczek „ustawione ręcznie”, nie ma dziennika zmian.
Szczegóły (dane, reguły, testy akceptacji): `docs/spec.md`.

## 8. Release
1. Makieta główna (jest): lista → ocena → podsumowanie → Moja ocena.
2. MVP w nocy, w kolejności: lista + pasek etapów; terminy i dzwonek; arkusz z regułami; Moja ocena i potwierdzenie (plan z `02-discover.md`).
3. Demo ≤ 2 min: lista → Wiśniewski → zmiana „1” na „3” → „popraw” termin → podsumowanie → przełącznik na pracownika → potwierdzenie.
Intencjonalnie pominięte: widok kadr, historia, AI wywoływane w locie, powiadomienia poza aplikacją.

<!-- skill: przeplywy-pm -->
<!-- skill: create-prd -->
