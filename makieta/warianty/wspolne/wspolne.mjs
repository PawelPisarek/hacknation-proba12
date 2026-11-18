// Wspólne dla 3 wariantów makiety: udawane dane (docs/pm/03a-warianty.md), reguły (zasady.mjs), drobne elementy UI.
import { OBOWIAZKOWE, SKALA, KRYTERIA, wynikOceny } from './zasady.mjs';
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
    termin: '2026-11-19', czynnosc: 'rozmowa wstępna i koniec terminu na sprzeciw', zrodlo: '7 dni od negatywnej oceny (§ 7 pkt 2 rozp.; art. 83 ust. 1 ustawy)',
    sytuacja: 'negatywna ocena sporządzona i przekazana 12.11.2026', poprzednia: { data: '2026-11-12', opis: 'na poziomie oczekiwań, wynik negatywny (jedna ocena „1”)' } },
  { id: 'lis', imie: 'Katarzyna', nazwisko: 'Lis', stanowisko: 'Specjalista', arkusz: 'C', dodatkowe: [],
    oceny: ob(C), teraz: 3, zrobione: ['2026-11-10', '2026-11-10', null, null, null],
    termin: '2026-12-02', czynnosc: 'ocena poza cyklem (zmiana stanowiska)', zrodlo: 'do 30 dni po zmianie stanowiska 02.11.2026 (art. 81 ust. 6 ustawy; § 9 ust. 2 rozp.)',
    sytuacja: 'zmiana stanowiska 02.11.2026, poprzednia ocena 15.03.2026 (> 6 mies.)', poprzednia: { data: '2026-03-15', opis: 'na poziomie oczekiwań' } },
  { id: 'nowak', imie: 'Ewa', nazwisko: 'Nowak', stanowisko: 'Starszy specjalista', arkusz: 'C', dodatkowe: [],
    oceny: ob(C), teraz: 1, zrobione: [null, null, null, null, null],
    termin: '2026-12-03', czynnosc: 'rozmowa wstępna', zrodlo: '30 dni od zatrudnienia na czas nieokreślony 03.11.2026 (§ 7 pkt 1 rozp.)',
    sytuacja: 'zatrudniona na czas nieokreślony 03.11.2026', poprzednia: null },
  { id: 'bielecki', imie: 'Jan', nazwisko: 'Bielecki', stanowisko: 'Kierownik wydziału', arkusz: 'B', dodatkowe: ['myślenie analityczne', 'negocjowanie'],
    oceny: ob([...B, 'myślenie analityczne', 'negocjowanie'], [7, 7, 7, 7, 7, 7, 5]), teraz: 3, zrobione: ['2024-12-20', '2024-12-20', null, null, null],
    termin: '2026-12-10', czynnosc: 'ocena okresowa (rozmowa oceniająca zaplanowana)', zrodlo: '24 mies. od poprzedniej oceny 10.12.2024 (art. 81 ust. 4 ustawy)',
    sytuacja: 'arkusz w toku', poprzednia: { data: '2024-12-10', opis: 'powyżej oczekiwań (6,8)' } },
  { id: 'kowalska', imie: 'Anna', nazwisko: 'Kowalska', stanowisko: 'Starszy specjalista ds. zamówień publicznych', arkusz: 'C', dodatkowe: ['orientacja na klienta/interesanta'],
    oceny: ob([...C, 'orientacja na klienta/interesanta'], [5, 5, 7, 5, 5, 5]), teraz: 3, zrobione: ['2025-02-10', '2025-02-10', null, null, null],
    termin: '2027-01-20', czynnosc: 'rozmowa oceniająca', zrodlo: '24 mies. od poprzedniej oceny 20.01.2025 (art. 81 ust. 4 ustawy)',
    sytuacja: 'kryteria ustalone', poprzednia: { data: '2025-01-20', opis: 'na poziomie oczekiwań (5,6)' } },
  { id: 'mazur', imie: 'Tomasz', nazwisko: 'Mazur', stanowisko: 'Inspektor', arkusz: 'C', dodatkowe: ['myślenie analityczne'], // średnia 6,0 = 5,7,5,7,5 + 7
    oceny: ob([...C, 'myślenie analityczne'], [5, 7, 5, 7, 5, 7]), teraz: 0, zrobione: ['2024-11-12', '2024-11-12', '2026-10-30', '2026-11-05', '2026-11-05'],
    termin: '2028-11-05', czynnosc: 'następna ocena okresowa', zrodlo: '24 mies. od oceny 05.11.2026', sytuacja: 'ocena pozytywna, sprzeciwu nie wniesiono', poprzednia: { data: '2026-11-05', opis: 'na poziomie oczekiwań (6,0)' } },
];

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
    wisniewski: ["Kontrola jakości dokumentów — szkolenie 1 dzień, do 31.03.2027", "Lista kontrolna pisma przed wysyłką + przegląd z przełożonym co 2 tygodnie przez 3 mies.", "Mentoring: starszy specjalista z zespołu"],
    bielecki: ["Przywództwo dla kierowników zespołów — szkolenie, 2027", "Negocjacje z wykonawcami — warsztat"],
    kowalska: ["Nowelizacja Prawa zamówień publicznych — szkolenie 2 dni", "Udział w komisji przetargowej jako przewodnicząca (rozwój: podejmowanie decyzji)"],
    lis: ["Wdrożenie na nowym stanowisku: plan 3 mies. z przełożonym", "KPA w praktyce — terminy i odpowiedzi"],
  },
};
export const znakAI = "<span class=\"ai\" title=\"Tekst przygotowany wcześniej przez AI; możesz go zmienić\">podpowiedź AI</span>";
export const fmt = (iso) => iso ? iso.split('-').reverse().join('.') : '—';
export const dniDo = (iso) => Math.round((new Date(iso + 'T00:00:00Z') - new Date(DZIS + 'T00:00:00Z')) / 864e5);
export const kolor = (o) => o.teraz === 0 ? 'szary' : dniDo(o.termin) <= 7 ? 'czerwony' : dniDo(o.termin) <= 30 ? 'zolty' : 'szary';
export const kryteria = (o) => [...OBOWIAZKOWE[o.arkusz], ...o.dodatkowe];
export const wynik = (o) => { const w = kryteria(o).map((k) => o.oceny[k]); return w.some((x) => x == null) ? null : wynikOceny(w); };
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
export function popraw(klucz, etykieta, oryginal, poZmianie, zPowodem = false) {
  const d = document.createElement('dialog'); d.className = 'okno';
  d.innerHTML = `<form method="dialog"><h3>Popraw: ${esc(etykieta)}</h3><label>Nowa wartość<input name="w" value="${esc(pokaz(klucz, oryginal))}" required></label>
    ${zPowodem ? '<label>Powód (jedno zdanie)<input name="p"></label>' : ''}<p class="male">Z systemu: ${esc(oryginal)}</p>
    <div class="przyciski"><button value="anuluj" formnovalidate>Anuluj</button><button value="ok" class="glowny">Zapisz</button></div></form>`;
  document.body.append(d); d.showModal();
  d.addEventListener('close', () => { if (d.returnValue === 'ok') { const f = new FormData(d.querySelector('form')); reczne[klucz] = { wartosc: f.get('w'), oryginal, powod: f.get('p') || '' }; poZmianie(); } d.remove(); });
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
export function kartaTerminu(o) {
  const k = `${o.id}:termin`; const t = pokaz(k, fmt(o.termin)); const dni = dniDo(o.termin);
  return `<div><div class="male">${esc(o.czynnosc)}</div><div class="termin ${kolor(o)}">do ${esc(t)}${o.teraz ? ` — ${dni} ${dni === 1 ? 'dzień' : 'dni'}` : ''}${znaczek(k, fmt(o.termin))}
    <button class="link" data-popraw="termin">popraw</button></div><div class="male">Z czego wynika: ${esc(o.zrodlo)}</div></div>`;
}
export const poprzedniaHTML = (o) => `<div class="info" style="margin:.4rem 0"><strong>Poprzednia ocena:</strong> ${o.poprzednia ? `${fmt(o.poprzednia.data)}, ${esc(o.poprzednia.opis)}` : "brak (pierwsza ocena)"}</div>`;
export function arkusz(o, { edycja = true, poprzednia = true } = {}) {
  const w = wynik(o); const ks = kryteria(o);
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
    <div><div class="male">Wynik</div>${w ? `<span class="${w.wynik}">${w.wynik}</span>` : '<span class="male">uzupełnij wszystkie oceny</span>'}</div></div>
    ${w && w.wynik === 'negatywna' && w.srednia > 4 ? '<div class="ostrz"><strong>Jedna ocena „1” = ocena negatywna</strong>, mimo średniej na poziomie oczekiwań (§ 11 rozporządzenia). Uzasadnienie jest obowiązkowe.</div>' : ''}
    ${w && w.wynik === 'negatywna' ? `<label class="blok"><strong>Uzasadnienie</strong> (obowiązkowe) ${AI.uzasadnienie[o.id] ? znakAI : ''}<textarea rows="4" ${edycja ? '' : 'readonly'}>${esc(AI.uzasadnienie[o.id] || '')}</textarea></label>` : ''}
    ${AI.iprz[o.id] ? `<div class="blok"><strong>Wnioski do IPRZ — propozycje form rozwoju</strong> ${znakAI}<ul>${AI.iprz[o.id].map((x) => `<li${edycja ? ' contenteditable' : ''}>${esc(x)}</li>`).join('')}</ul></div>` : ''}
    ${w && w.wynik === 'negatywna' && w.srednia <= 4 ? '<div class="ostrz">Średnia poniżej oczekiwań — ocena negatywna. Uzasadnienie jest obowiązkowe.</div>' : ''}`;
}
export function podepnij(root, o, odswiez) {
  root.onclick = (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.ocena) { o.oceny[b.dataset.kryt] = Number(b.dataset.ocena); odswiez(); }
    const p = b.dataset.popraw;
    if (p === 'termin') popraw(`${o.id}:termin`, 'termin', fmt(o.termin), odswiez, true);
    if (p === 'srednia') popraw(`${o.id}:srednia`, 'średnia', wynik(o).srednia.toFixed(2).replace('.', ','), odswiez, true);
    if (p === 'poziom') popraw(`${o.id}:poziom`, 'poziom', wynik(o).poziom, odswiez, true);
  };
}
export const potwierdzenia = {}; // id -> data i godzina
export function potwierdzenie(o, naKlik) {
  if (potwierdzenia[o.id]) return `<div class="potw">✔ Potwierdzono zapoznanie z oceną: ${potwierdzenia[o.id]}</div>`;
  return `<button class="glowny" data-potwierdz="${o.id}">Potwierdzam zapoznanie z oceną</button>`;
}
export function potwierdz(id) { potwierdzenia[id] = `${fmt(DZIS)}, ${new Date().toTimeString().slice(0, 5)}`; }
