// Wspólne dla 3 wariantów makiety: udawane dane (docs/pm/03a-warianty.md), reguły (zasady.mjs), drobne elementy UI.
import { OBOWIAZKOWE, SKALA, KRYTERIA, wynikOceny, terminyPoZapoznaniu, dodajDni } from './zasady.mjs';
export { OBOWIAZKOWE, SKALA, KRYTERIA, wynikOceny };

export const DZIS = '2026-11-18';
export const URZAD = 'Urząd Wojewódzki w Przykładowie (dane sztuczne)';
export const PRZELOZONY = 'Marek Zieliński — dyrektor zespołu';
export const ETAPY = ['Rozmowa wstępna', 'Zapoznanie z kryteriami (podpis)', 'Rozmowa oceniająca', 'Ocena na piśmie', 'Zapoznanie z oceną (+7 dni na sprzeciw)'];

const C = OBOWIAZKOWE.C, B = OBOWIAZKOWE.B;
const ob = (lista, wart) => Object.fromEntries(lista.map((k, i) => [k, wart ? wart[i] : null]));
// zrobione: daty etapów ①–⑤ (null = jeszcze nie); teraz: numer bieżącego etapu (0 = zamknięta)
export const osoby = [
  { id: 'wisniewski', imie: 'Piotr', nazwisko: 'Wiśniewski', stanowisko: 'Specjalista', arkusz: 'C', dodatkowe: [],
    oceny: ob(C, [5, 1, 7, 7, 5]), teraz: 5, zrobione: ['2024-12-05', '2024-12-05', '2026-11-06', '2026-11-12', null],
    termin: '2026-11-19', czynnosc: 'rozmowa wstępna po negatywnej ocenie', zrodlo: '7 dni od negatywnej oceny (§ 7 pkt 2 rozp.); sprzeciw — 7 dni od dnia, w którym pracownik potwierdzi zapoznanie (art. 83 ust. 1 ustawy)',
    sytuacja: 'negatywna ocena sporządzona i przekazana 12.11.2026', zatrudnienie: '2018-09-03', poprzednia: { data: '2024-11-12', opis: 'na poziomie oczekiwań (5,00)' } },
  { id: 'lis', imie: 'Katarzyna', nazwisko: 'Lis', stanowisko: 'Specjalista', arkusz: 'C', dodatkowe: [],
    oceny: ob(C), teraz: 2, zrobione: ['2026-11-10', null, null, null, null], zatrudnienie: '2019-03-01',
    termin: '2026-12-02', czynnosc: 'ocena poza cyklem (zmiana stanowiska)', zrodlo: 'do 30 dni po zmianie stanowiska 02.11.2026 (art. 81 ust. 6 ustawy; § 9 ust. 2 rozp.)',
    sytuacja: 'zmiana stanowiska 02.11.2026, poprzednia ocena 15.03.2026 (> 6 mies.)', poprzednia: { data: '2026-03-15', opis: 'na poziomie oczekiwań' } },
  { id: 'nowak', imie: 'Ewa', nazwisko: 'Nowak', stanowisko: 'Starszy specjalista', arkusz: 'C', dodatkowe: [],
    oceny: ob(C), teraz: 1, zrobione: [null, null, null, null, null], zatrudnienie: '2026-11-03', terminZZatrudnienia: 30,
    termin: '2026-12-03', czynnosc: 'rozmowa wstępna', zrodlo: '30 dni od zatrudnienia na czas nieokreślony 03.11.2026 (§ 7 pkt 1 rozp.)', // tekst liczony z pola zatrudnienia: zrodloTerminu()
    sytuacja: 'zatrudniona na czas nieokreślony 03.11.2026', poprzednia: null },
  { id: 'bielecki', imie: 'Jan', nazwisko: 'Bielecki', stanowisko: 'Kierownik wydziału', arkusz: 'B', dodatkowe: ['myślenie analityczne', 'negocjowanie'],
    oceny: ob([...B, 'myślenie analityczne', 'negocjowanie'], [7, 7, 7, 7, 7, 7, 5]), teraz: 3, zrobione: ['2024-12-20', '2024-12-20', null, null, null], zatrudnienie: '2015-05-15',
    termin: '2026-12-10', czynnosc: 'ocena okresowa (rozmowa oceniająca zaplanowana)', zrodlo: '24 mies. od poprzedniej oceny 10.12.2024 (art. 81 ust. 4 ustawy)',
    sytuacja: 'arkusz w toku', poprzednia: { data: '2024-12-10', opis: 'powyżej oczekiwań (6,71)' } },
  { id: 'kowalska', imie: 'Anna', nazwisko: 'Kowalska', stanowisko: 'Starszy specjalista ds. zamówień publicznych', arkusz: 'C', dodatkowe: ['orientacja na klienta/interesanta'],
    oceny: ob([...C, 'orientacja na klienta/interesanta'], [5, 5, 7, 5, 5, 5]), teraz: 2, zrobione: ['2025-02-10', null, null, null, null], zatrudnienie: '2017-02-01',
    termin: '2027-01-20', czynnosc: 'rozmowa oceniająca', zrodlo: '24 mies. od poprzedniej oceny 20.01.2025 (art. 81 ust. 4 ustawy)',
    sytuacja: 'kryteria ustalone', poprzednia: { data: '2025-01-20', opis: 'na poziomie oczekiwań (5,57)' } },
  { id: 'mazur', imie: 'Tomasz', nazwisko: 'Mazur', stanowisko: 'Inspektor', arkusz: 'C', dodatkowe: ['myślenie analityczne'], // średnia 6,0 = 5,7,5,7,5 + 7
    oceny: ob([...C, 'myślenie analityczne'], [5, 7, 5, 7, 5, 7]), teraz: 0, zrobione: ['2024-11-12', '2024-11-12', '2026-10-30', '2026-11-05', '2026-11-05'], zatrudnienie: '2022-06-02',
    termin: '2028-11-05', czynnosc: 'następna ocena okresowa', zrodlo: '24 mies. od oceny 05.11.2026', sytuacja: 'ocena pozytywna, sprzeciwu nie wniesiono', poprzednia: { data: '2026-11-05', opis: 'na poziomie oczekiwań (6,00)' } },
];

// Data zatrudnienia na czas nieokreślony (spec §3, T17): „popraw” przelicza termin, który z niej wynika (Nowak: rozmowa wstępna w 30 dni, § 7 pkt 1 rozp.).
export const ZATR = Object.fromEntries(osoby.map((o) => [o.id, o.zatrudnienie]));
export const isoZ = (t) => { const m = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(String(t).trim()); return m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : null; };
export function ustawZatrudnienie(o, isoData) { o.zatrudnienie = isoData; if (o.terminZZatrudnienia) o.termin = dodajDni(isoData, o.terminZZatrudnienia); }
// „Z czego wynika” liczone z bieżącej daty zatrudnienia — jedna data w polu, terminie, dzwonku (R3)
export const zrodloTerminu = (o) => o.terminZZatrudnienia ? `${o.terminZZatrudnienia} dni od zatrudnienia na czas nieokreślony ${fmt(o.zatrudnienie)} (§ 7 pkt 1 rozp.)` : o.zrodlo;
export const kartaZatrudnienia = (o, edycja = true) => { const k = `${o.id}:zatrudnienie`;
  return `<div class="blok" id="zatr"><span class="male">Zatrudnienie od:</span> <strong>${esc(fmt(o.zatrudnienie))}</strong>${znaczek(k, fmt(ZATR[o.id]))}${edycja ? '<button class="link" data-popraw="zatrudnienie">popraw</button>' : ''}</div>`; };

export const OPISY = { // skrót opisów zachowań z zał. 1 do rozp. (parafraza do makiety)
  'komunikacja': 'jasno przekazuje informacje, słucha, dostosowuje język do odbiorcy',
  'kreatywność': 'proponuje nowe rozwiązania i usprawnienia',
  'negocjowanie': 'prowadzi rozmowy do porozumienia, dba o interes urzędu',
  'organizacja pracy i orientacja na osiąganie celów': 'planuje, ustala priorytety, dotrzymuje terminów',
  'orientacja na klienta/interesanta': 'rozpoznaje potrzeby klienta, odpowiada rzetelnie i uprzejmie',
  'podejmowanie decyzji i odpowiedzialność': 'podejmuje decyzje w zakresie uprawnień i bierze za nie odpowiedzialność',
  'radzenie sobie w sytuacjach kryzysowych': 'działa skutecznie pod presją i w nieprzewidzianych sytuacjach',
  'rzetelność': 'wykonuje zadania dokładnie, zgodnie z przepisami',
  'myślenie analityczne': 'zbiera i analizuje informacje, wyciąga trafne wnioski',
  'wykorzystywanie wiedzy i doskonalenie zawodowe': 'stosuje wiedzę w praktyce i stale ją aktualizuje',
  'współpraca': 'dzieli się wiedzą, wspiera innych, działa na rzecz zespołu',
  'wystąpienia publiczne': 'prezentuje informacje zrozumiale przed grupą',
  'zarządzanie ludźmi': 'motywuje, deleguje, rozwija pracowników',
  'zarządzanie strategiczne': 'wyznacza kierunki i cele długofalowe',
};

// Podpowiedzi AI (P13): wygenerowane z góry przez Claude i zapisane jako dane; aplikacja nie woła modelu. Człowiek może zmienić (P11).
export const AI = {
  dodatkowe: { // kryteria dodatkowe do stanowiska — [kryterium, dlaczego]
    "Specjalista": [["orientacja na klienta/interesanta", "stanowisko obsługuje skargi i pisma obywateli"], ["myślenie analityczne", "analiza spraw przed odpowiedzią"]],
    "Starszy specjalista": [["myślenie analityczne", "samodzielna analiza dokumentacji"], ["kreatywność", "usprawnianie procedur zespołu"]],
    "Starszy specjalista ds. zamówień publicznych": [["orientacja na klienta/interesanta", "kontakt z wykonawcami i komórkami zamawiającymi"], ["negocjowanie", "wyjaśnienia i negocjacje z wykonawcami"], ["myślenie analityczne", "badanie i ocena ofert"]],
    "Kierownik wydziału": [["myślenie analityczne", "decyzje oparte na danych wydziału"], ["negocjowanie", "uzgodnienia z innymi komórkami"], ["radzenie sobie w sytuacjach kryzysowych", "szczyty obciążenia wydziału"]],
    "Inspektor": [["orientacja na klienta/interesanta", "bezpośrednia obsługa interesantów"]],
  },
  uzasadnienie: {
    wisniewski: "Ocena negatywna wynika z oceny „znacznie poniżej oczekiwań” w kryterium rzetelność (§ 11 rozporządzenia). W okresie ocenianym w trzech sprawach pisma wymagały poprawek formalnych przed wysyłką, mimo omówienia problemu na rozmowie bieżącej. Pozostałe kryteria — na poziomie oczekiwań lub powyżej; mocną stroną jest współpraca w zespole.",
  },
  iprz: {
    // wnioski do IPRZ (część II arkusza): 3 formy rozwoju (spec §3 R2, źródło: dane/podpowiedzi-ai.json); Lis, Nowak, Kowalska: brak (ostrzeżenie, T16)
    // T16 (R3): kierunek rozwoju, obszary wiedzy i umiejętności, formy i metody realizacji (3 formy)
    wisniewski: ["Kierunek rozwoju: rzetelność — staranność i kontrola jakości pism przed wysyłką.", "Obszary wiedzy i umiejętności do doskonalenia: wymogi formalne pism w KPA, sprawdzanie dat, adresatów i załączników, planowanie czasu na korektę.", "Formy i metody realizacji: 1) szkolenie „Kontrola jakości dokumentów” (1 dzień, do 31.03.2027); 2) lista kontrolna pisma przed wysyłką i przegląd z przełożonym co 2 tygodnie przez 3 mies.; 3) mentoring starszego specjalisty z zespołu, do 30.06.2027."],
    bielecki: ["Kierunek rozwoju: negocjowanie i kierowanie zespołem przy rosnącej liczbie postępowań.", "Obszary wiedzy i umiejętności do doskonalenia: przygotowanie do negocjacji z wykonawcami i komórkami, delegowanie zadań, rozmowy rozwojowe z podwładnymi.", "Formy i metody realizacji: 1) warsztat „Negocjacje z wykonawcami” (2 dni, do 28.02.2027); 2) szkolenie „Przywództwo dla kierowników zespołów” (do 30.06.2027); 3) coaching kierowniczy — 4 sesje, do 31.05.2027."],
    mazur: ["Kierunek rozwoju: myślenie analityczne — wnioski z danych o obsłudze wniosków.", "Obszary wiedzy i umiejętności do doskonalenia: arkusz kalkulacyjny (tabele przestawne), analiza przyczyn powtarzających się błędów, raportowanie.", "Formy i metody realizacji: 1) warsztat „Excel w analizie danych” (do 31.03.2027); 2) mentoring u starszego inspektora przez 3 mies., do 30.06.2027; 3) udział w zespole kontroli zarządczej, do 30.09.2027."],
  },
};
export const iprzAI = (id) => (AI.iprz[id] || []).join('\n');
for (const o of osoby) { o.iprz = iprzAI(o.id); o.uzasadnienie = AI.uzasadnienie[o.id] || ''; } // treść startowa = podpowiedź AI; przełożony ją zmienia i zatwierdza
export const znakAI = "<span class=\"ai\" title=\"Tekst przygotowany wcześniej przez AI; możesz go zmienić\">podpowiedź AI</span>";
export const fmt = (iso) => iso ? iso.split('-').reverse().join('.') : '—';
export const dniDo = (iso) => Math.round((new Date(iso + 'T00:00:00Z') - new Date(DZIS + 'T00:00:00Z')) / 864e5);
export const kolor = (o) => o.teraz === 0 ? 'szary' : dniDo(o.termin) <= 7 ? 'czerwony' : dniDo(o.termin) <= 30 ? 'zolty' : 'szary';
export const kryteria = (o) => [...OBOWIAZKOWE[o.arkusz], ...o.dodatkowe];
export const wynik = (o) => { const w = kryteria(o).map((k) => o.oceny[k]); return w.some((x) => x == null) ? null : wynikOceny(w); };
export const wynikOs = (o) => { const w = wynik(o); const r = w && reczne[`${o.id}:wynik`]; return r ? { ...w, wynik: r.wartosc, reczny: true, wynikSys: w.wynik, powod: r.powod } : w; };
export const nazwa = (o) => `${o.imie} ${o.nazwisko}`;
export const kolejka = () => [...osoby].sort((a, b) => (a.teraz === 0) - (b.teraz === 0) || a.termin.localeCompare(b.termin));
export const ileDni = (n) => `${n} ${n === 1 ? 'dzień' : 'dni'}`;
export const przypomnienia = () => kolejka().filter((o) => o.teraz).map((o) => ({ o, tekst: `${nazwa(o)}: ${o.czynnosc} do ${fmt(o.termin)} — zostało ${ileDni(dniDo(o.termin))}` }));
export const pilne = () => przypomnienia().filter((p) => dniDo(p.o.termin) <= 30).length;
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Poprawki ręczne (P11): klucz -> {wartosc, oryginal, powod}
export const reczne = {};
export const znaczek = (klucz, oryginal) => reczne[klucz] ? `<span class="reczne" title="Z systemu: ${esc(oryginal)}${reczne[klucz].powod ? ' · powód: ' + esc(reczne[klucz].powod) : ''}">ustawione ręcznie</span>` : '';
export const pokaz = (klucz, wartosc) => reczne[klucz]?.wartosc ?? wartosc;
export function popraw(klucz, etykieta, oryginal, poZmianie, zPowodem = false, wzor = '') {
  const d = document.createElement('dialog'); d.className = 'okno';
  d.innerHTML = `<form method="dialog"><h3>Popraw: ${esc(etykieta)}</h3><label>Nowa wartość<input name="w" value="${esc(pokaz(klucz, oryginal))}" required${wzor ? ` pattern="${wzor}"` : ''}></label>
    ${zPowodem ? '<label>Powód zmiany <span class="wym">(wymagane)</span><input name="p" required aria-required="true" placeholder="np. data z umowy"></label>' : ''}<p class="male">Z systemu: ${esc(oryginal)}</p>
    <div class="przyciski"><button value="anuluj" formnovalidate>Anuluj</button><button value="ok" class="glowny">Zapisz</button></div></form>`;
  document.body.append(d); d.showModal();
  d.addEventListener('close', () => { if (d.returnValue === 'ok') { const f = new FormData(d.querySelector('form')); if (zPowodem && !String(f.get('p') || '').trim()) { d.remove(); return; } reczne[klucz] = { wartosc: f.get('w'), oryginal, powod: f.get('p') || '' }; poZmianie(); } d.remove(); });
}

export function pasekEtapow(o, maly = false) {
  return `<ol class="etapy${maly ? ' male-etapy' : ''}">${ETAPY.map((e, i) => {
    const n = i + 1; const st = o.zrobione[i] ? 'zrobione' : n === o.teraz ? 'teraz' : 'potem';
    return `<li class="${st}" title="${esc(e)}"><span class="nr">${'①②③④⑤'[i]}</span>${maly ? '' : `<span class="et">${esc(e)}</span><span class="dt">${o.zrobione[i] ? fmt(o.zrobione[i]) : n === o.teraz ? 'teraz' : ''}</span>`}</li>`;
  }).join('')}</ol>`;
}
export function dzwonek(el, naKlik) {
  el.innerHTML = `<button class="dzwonek" aria-label="Przypomnienia">🔔<span class="licznik">${pilne()}</span></button><div class="lista-przyp" hidden>${przypomnienia().map((p) => `<button data-id="${p.o.id}" class="przyp ${kolor(p.o)}">${esc(p.tekst)}</button>`).join('')}</div>`;
  const lista = el.querySelector('.lista-przyp');
  el.querySelector('.dzwonek').onclick = () => (lista.hidden = !lista.hidden);
  lista.onclick = (e) => { const b = e.target.closest('[data-id]'); if (b) { lista.hidden = true; naKlik?.(b.dataset.id); } };
}
export function naglowek(tytul) {
  return `<header class="gora"><div><strong>${esc(tytul)}</strong><div class="male">${URZAD} · dziś ${fmt(DZIS)}</div></div><div class="rola" id="rola"></div><div class="dzw" id="dzw"></div></header>`;
}
export function przelacznikRoli(el, rola, osobaId, naZmiane) {
  el.innerHTML = `<label class="male">Zobacz jako <select>${['przelozony', ...osoby.map((o) => o.id)].map((v) => `<option value="${v}" ${v === (rola === 'przelozony' ? 'przelozony' : osobaId) ? 'selected' : ''}>${v === 'przelozony' ? 'przełożony' : 'pracownik: ' + nazwa(osoby.find((o) => o.id === v))}</option>`).join('')}</select></label>`;
  el.querySelector('select').onchange = (e) => naZmiane(e.target.value);
}

// ---- Arkusz (wspólny dla wariantów): oceny 1/3/5/7/9, średnia i poziom na żywo, reguła „jedna 1”, „popraw” (P11)
const ORYG = Object.fromEntries(osoby.map((o) => [o.id, { ...o.oceny }]));
export const zmienioneOceny = (o) => kryteria(o).filter((k) => ORYG[o.id][k] != null && ORYG[o.id][k] !== o.oceny[k]);
export function kartaTerminu(o, edycja = true) {
  const k = `${o.id}:termin`; const t = pokaz(k, fmt(o.termin)); const dni = dniDo(o.termin);
  return `<div><div class="male">${esc(o.czynnosc)}</div><div class="termin ${kolor(o)}">do ${esc(t)}${o.teraz ? ` — ${dni} ${dni === 1 ? 'dzień' : 'dni'}` : ''}${znaczek(k, fmt(o.termin))}
    ${edycja ? '<button class="link" data-popraw="termin">popraw</button>' : ''}</div><div class="male">Z czego wynika: ${esc(zrodloTerminu(o))}</div></div>`;
}
export const poprzedniaHTML = (o) => `<div class="info" style="margin:.4rem 0"><strong>Poprzednia ocena:</strong> ${o.poprzednia ? `${fmt(o.poprzednia.data)}, ${esc(o.poprzednia.opis)}` : "brak (pierwsza ocena)"}</div>`;
export function arkusz(o, { edycja = true, poprzednia = true, wszystkiePopraw = false } = {}) {
  const w = wynik(o); const we = wynikOs(o); const ks = kryteria(o);
  const wiersze = ks.map((k, i) => {
    const v = o.oceny[k]; const zm = ORYG[o.id][k] !== v && ORYG[o.id][k] != null;
    return `<tr><td>${esc(k)}${i >= OBOWIAZKOWE[o.arkusz].length ? ' <span class="male">(dodatkowe)</span>' : ''}${zm ? `<span class="reczne zmiana" title="Ustawione ręcznie — z systemu: ${ORYG[o.id][k]}">✎<span class="tx"> ustawione ręcznie</span></span>` : ''}</td>
      <td>${edycja ? `<div class="skala">${[1, 3, 5, 7, 9].map((n) => `<button data-kryt="${esc(k)}" data-ocena="${n}" class="${v === n ? 'wyb' : ''} ${n === 1 ? 'jeden' : ''}" title="${SKALA[n]}">${n}</button>`).join('')}</div>`
        : `<strong class="${v === 1 ? 'negatywna' : ''}">${v ?? '—'}</strong> <span class="male">${v ? SKALA[v] : 'jeszcze bez oceny'}</span>`}</td></tr>`;
  }).join('');
  const sr = w ? w.srednia.toFixed(2).replace('.', ',') : '—';
  const ks2 = `${o.id}:srednia`, kp = `${o.id}:poziom`;
  return `${poprzednia ? poprzedniaHTML(o) : ""}<table class="tab-ark"><thead><tr><th>Kryterium (arkusz ${o.arkusz})</th><th>Ocena</th></tr></thead><tbody>${wiersze}</tbody></table>
    <div class="wynik"><div><div class="male">Średnia</div><span class="duzy">${esc(pokaz(ks2, sr))}</span>${znaczek(ks2, sr)}${edycja && w ? '<button class="link" data-popraw="srednia">popraw</button>' : ''}</div>
    <div><div class="male">Poziom</div><strong>${esc(pokaz(kp, w ? w.poziom : '—'))}</strong>${znaczek(kp, w?.poziom)}${edycja && w ? '<button class="link" data-popraw="poziom">popraw</button>' : ''}</div>
    <div><div class="male">Wynik</div>${w ? `<span class="${esc(pokaz(`${o.id}:wynik`, w.wynik))}">${esc(pokaz(`${o.id}:wynik`, w.wynik))}</span>${znaczek(`${o.id}:wynik`, w.wynik)}${edycja && wszystkiePopraw ? '<button class="link" data-popraw="wynik">popraw</button>' : ''}` : '<span class="male">uzupełnij wszystkie oceny</span>'}</div></div>
    ${we?.reczny ? `<div class="${we.wynik === 'negatywna' ? 'ostrz' : 'info'}" id="wynik-reczny"><strong>Wynik ustawiony ręcznie: ${esc(we.wynik)}</strong> (z systemu: ${esc(we.wynikSys)}; powód: ${esc(we.powod)}).${we.wynik === 'negatywna' ? ' Ocena negatywna — uzasadnienie jest obowiązkowe.' : ''}</div>` : ''}
    ${we && !we.reczny && we.wynik === 'negatywna' && w.srednia > 4 ? '<div class="ostrz"><strong>Jedna ocena „1” = ocena negatywna</strong>, mimo średniej na poziomie oczekiwań (§ 11 rozporządzenia). Uzasadnienie jest obowiązkowe.</div>' : ''}
    ${we && we.wynik === 'negatywna' ? (edycja
      ? `<label class="blok" id="uzas"><strong>Uzasadnienie</strong> (obowiązkowe) ${AI.uzasadnienie[o.id] && o.uzasadnienie === AI.uzasadnienie[o.id] ? znakAI : ''}<textarea rows="7" data-uzas>${esc(o.uzasadnienie)}</textarea></label>`
      : (o.zrobione[3] && o.uzasadnienie ? `<div class="blok" id="uzas"><strong>Uzasadnienie</strong><p class="tresc">${esc(o.uzasadnienie)}</p></div>` : '')) : ''}
    ${iprzHTML(o, edycja)}
    ${we && !we.reczny && we.wynik === 'negatywna' && w.srednia <= 4 ? '<div class="ostrz">Średnia poniżej oczekiwań — ocena negatywna. Uzasadnienie jest obowiązkowe.</div>' : ''}`;
}
// Wnioski do IPRZ (część II arkusza, § 11 ust. 1 pkt 5 rozp.; spec T16): pole tekstowe; puste → ostrzeżenie, bez blokady.
const OSTRZ_IPRZ = 'brak wniosków do IPRZ — to element oceny (§ 11 ust. 1 pkt 5 rozporządzenia)';
export function iprzHTML(o, edycja) {
  if (!edycja && !o.zrobione[3]) return ''; // pracownik widzi je dopiero po ocenie na piśmie (④)
  if (!edycja) return o.iprz.trim() ? `<div class="blok" id="iprz"><strong>Wnioski do IPRZ</strong><p class="tresc">${esc(o.iprz)}</p></div>` : '';
  return `<label class="blok" id="iprz"><strong>Wnioski do IPRZ</strong> ${AI.iprz[o.id] && o.iprz === iprzAI(o.id) ? znakAI : ''} <span class="male">kierunki rozwoju, obszary wiedzy i umiejętności do doskonalenia, formy i metody realizacji</span>
    <textarea rows="4" data-iprz>${esc(o.iprz)}</textarea></label><div class="ostrz" id="iprz-ostrz"${o.iprz.trim() ? ' hidden' : ''}>${OSTRZ_IPRZ}</div>`;
}
const dopasuj = (x) => { x.style.height = 'auto'; x.style.height = `${x.scrollHeight + 2}px`; }; // pole rośnie z tekstem (R1: uzasadnienie czytelne)
export function podepnij(root, o, odswiez) {
  root.querySelectorAll('textarea').forEach(dopasuj);
  root.oninput = (e) => { if (e.target.matches('textarea')) dopasuj(e.target); if (e.target.matches('[data-uzas]')) o.uzasadnienie = e.target.value; if (e.target.matches('[data-iprz]')) { o.iprz = e.target.value; const w = root.querySelector('#iprz-ostrz'); if (w) w.hidden = !!o.iprz.trim(); } };
  root.onclick = (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.ocena) { o.oceny[b.dataset.kryt] = Number(b.dataset.ocena); odswiez(); }
    const p = b.dataset.popraw;
    if (p === 'termin') popraw(`${o.id}:termin`, 'termin', fmt(o.termin), odswiez, true);
    if (p === 'srednia') popraw(`${o.id}:srednia`, 'średnia', wynik(o).srednia.toFixed(2).replace('.', ','), odswiez, true);
    if (p === 'poziom') popraw(`${o.id}:poziom`, 'poziom', wynik(o).poziom, odswiez, true);
    if (p === 'wynik') popraw(`${o.id}:wynik`, 'wynik (pozytywna albo negatywna)', wynik(o).wynik, odswiez, true, 'pozytywna|negatywna');
    if (p === 'zatrudnienie') popraw(`${o.id}:zatrudnienie`, 'zatrudnienie od (DD.MM.RRRR)', fmt(ZATR[o.id]), () => { const d = isoZ(reczne[`${o.id}:zatrudnienie`].wartosc); if (d) ustawZatrudnienie(o, d); else delete reczne[`${o.id}:zatrudnienie`]; odswiez(); }, true);
    if (p === 'nastepna' && o.nastepna) popraw(`${o.id}:nastepna`, 'data następnej oceny', fmt(o.nastepna().data), odswiez, true);
  };
}
export const potwierdzenia = {}; // id -> data i godzina
export function potwierdzenie(o, naKlik) {
  if (potwierdzenia[o.id]) return `<div class="potw">✔ Potwierdzono zapoznanie z oceną: ${potwierdzenia[o.id]}</div>`;
  return `<button class="glowny" data-potwierdz="${o.id}">Potwierdzam zapoznanie z oceną</button>`;
}
// Zapoznanie z oceną = dzień potwierdzenia przez pracownika (Szef, decyzje 18:58): od niego 7 dni na sprzeciw i 6 mies. do ponownej oceny.
export function potwierdz(id) { potwierdzenia[id] = `${fmt(DZIS)}, ${new Date().toTimeString().slice(0, 5)}`; const o = osoby.find((x) => x.id === id); if (o) o.zrobione[4] = DZIS; }
export function sprzeciwHTML(o) {
  if (!potwierdzenia[o.id]) return ''; // komunikat dopiero po kliknięciu „Potwierdzam zapoznanie” (R1, Szef 19:01)
  return `<p class="info" style="margin-top:.6rem">Masz 7 dni na sprzeciw do dyrektora generalnego — do <strong>${fmt(terminyPoZapoznaniu(o.zrobione[4]).sprzeciw_do)}</strong> (art. 83 ust. 1 ustawy).</p>`;
}
