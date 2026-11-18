// Makieta główna — wariant 1 (P14) z odpowiedziami Artura P16–P20 (docs/decyzje.md, 18:43–18:46):
// P16 start = lista osób; P17 terminy pozostałych w dzwonku; P18 poprzednia ocena pod paskiem etapów;
// P19 „popraw” przy każdej wartości; P20 ostatni krok = podsumowanie tylko do odczytu.
import * as W from './warianty/wspolne/wspolne.mjs';
import { dodajMiesiace, ponownaOcenaPo } from './warianty/wspolne/zasady.mjs';
const st = { rola: 'przelozony', osoba: null, ekran: 'lista' };
const app = document.getElementById('app');
const NR = '①②③④⑤';

// Data następnej oceny: pozytywna → 24 mies. od sporządzenia (T8, art. 81 ust. 4); negatywna → ponowna po 6 mies. od zapoznania (T11, art. 81 ust. 9).
for (const o of W.osoby) o.nastepna = () => {
  const w = W.wynik(o); if (!w) return null;
  const wyn = W.pokaz(`${o.id}:wynik`, w.wynik);
  if (wyn === 'negatywna') return { data: ponownaOcenaPo(o.zrobione[4] || W.DZIS), wstepna: o.zrobione[4] ? '' : 'wstępna — po potwierdzeniu zapoznania', skad: o.zrobione[4] ? 'ponowna ocena 6 mies. od zapoznania (potwierdzenia przez pracownika) z negatywną (art. 81 ust. 9 ustawy)' : 'ponowna ocena 6 mies. od zapoznania — liczone od dziś, dopóki pracownik nie potwierdzi (art. 81 ust. 9 ustawy)' };
  return { data: dodajMiesiace(o.zrobione[3] || W.DZIS, 24), wstepna: o.zrobione[3] ? '' : 'wstępna — do sporządzenia oceny na piśmie', skad: 'następna ocena okresowa 24 mies. po sporządzeniu (art. 81 ust. 4 ustawy)' };
};
const WST = (n) => ` <span class="wstepna male">${n.wstepna}</span>`;
const kartaNastepnej = (o) => { const n = o.nastepna(); if (!n) return ''; const k = `${o.id}:nastepna`;
  return `<div class="blok"><div class="male">Data następnej oceny</div><strong>${W.esc(W.pokaz(k, W.fmt(n.data)))}</strong>${n.wstepna && !W.reczne[k] ? WST(n) : ''}${W.znaczek(k, W.fmt(n.data))}<button class="link" data-popraw="nastepna">popraw</button><div class="male">Z czego wynika: ${W.esc(n.skad)}</div></div>`; };

function lista() {
  return `<main><div class="karta"><h2>Wybierz osobę do oceny</h2><p class="male">Terminy wszystkich osób — w dzwonku z przypomnieniami.</p>
    <table class="lista-osob"><thead><tr><th>Pracownik</th><th class="bez-tel">Stanowisko</th><th>Etap</th><th></th></tr></thead><tbody>
    ${W.kolejka().map((o) => `<tr><td><span class="kropka ${W.kolor(o)}"></span><strong>${W.esc(W.nazwa(o))}</strong><div class="male">arkusz ${o.arkusz}</div></td>
      <td class="bez-tel">${W.esc(o.stanowisko)}</td><td>${W.pasekEtapow(o, true)}</td><td><button data-osoba="${o.id}">Otwórz</button></td></tr>`).join('')}
    </tbody></table></div></main>`;
}
function ocena(o) {
  const pr = st.rola === 'przelozony'; const w = W.wynik(o);
  const terminy = `<div id="terminy">${W.kartaTerminu(o, pr)}${pr ? kartaNastepnej(o) : ''}</div>`; // P22 (Artur 19:03): na telefonie zostaje pod arkuszem
  return `<main><nav class="okruchy">${pr ? '<button class="link" data-idz="lista">← Lista osób</button>' : ''}</nav>
    <div class="karta"><h2>${pr ? 'Ocena' : 'Moja ocena'}: ${W.esc(W.nazwa(o))} <span class="male">· ${W.esc(o.stanowisko)}, arkusz ${o.arkusz}</span></h2>
      ${W.pasekEtapow(o)}${W.poprzedniaHTML(o)}</div>
    <div class="dwie">
      <div class="karta" id="ark"><h2>Arkusz</h2>${W.arkusz(o, { edycja: pr, poprzednia: false, wszystkiePopraw: true })}</div>
      <div class="karta"><h2>Co dalej</h2>${terminy}${pr ? W.kartaZatrudnienia(o) : ''}
        <p>Etap teraz: <strong>${o.teraz ? NR[o.teraz - 1] + ' ' + W.ETAPY[o.teraz - 1] : 'ocena zamknięta'}</strong></p>
        ${pr ? (w ? '<button class="glowny" data-idz="podsumowanie">Dalej: podsumowanie →</button>' : '<p class="male">Podsumowanie po wpisaniu wszystkich ocen.</p>')
          : (o.teraz === 5 ? `${W.potwierdzenie(o)}${W.sprzeciwHTML(o)}` : '<p class="male">Potwierdzenie pojawi się po ocenie na piśmie.</p>')}
      </div></div></main>`;
}
// P20: podsumowanie tylko do odczytu — bez przycisków i pól; wartości poprawione ręcznie mają znaczek.
function podsumowanie(o) {
  const w = W.wynik(o); const n = o.nastepna(); const P = (k, v) => `${W.esc(W.pokaz(`${o.id}:${k}`, v))}${W.znaczek(`${o.id}:${k}`, v)}`;
  const sr = w.srednia.toFixed(2).replace('.', ','); const zm = W.zmienioneOceny(o); const wyn = W.pokaz(`${o.id}:wynik`, w.wynik);
  return `<main><nav class="okruchy"><button class="link" data-idz="lista">← Lista osób</button> <button class="link" data-idz="ocena">← Wróć do oceny</button></nav>
    <div class="karta" id="podsumowanie"><h2>Podsumowanie oceny: ${W.esc(W.nazwa(o))}</h2><p class="male">${W.esc(o.stanowisko)}, arkusz ${o.arkusz} · tylko do odczytu</p>
      <dl class="podsum">
        <div><dt>Średnia</dt><dd class="duzy">${P('srednia', sr)}${zm.length ? `<span class="reczne zmiana" title="Oceny zmienione ręcznie: ${W.esc(zm.join(', '))}">✎<span class="tx"> ustawione ręcznie</span></span>` : ''}</dd></div>
        <div><dt>Poziom</dt><dd>${P('poziom', w.poziom)}</dd></div>
        <div><dt>Wynik</dt><dd class="${W.esc(wyn)}">${P('wynik', w.wynik)}</dd></div>
        <div><dt>Data następnej oceny</dt><dd>${P('nastepna', W.fmt(n.data))}${n.wstepna && !W.reczne[`${o.id}:nastepna`] ? WST(n) : ''}<div class="male">${W.esc(n.skad)}</div></dd></div>
      </dl>
      ${w.wynik === 'negatywna' && w.srednia > 4 ? '<p class="ostrz">Wynik negatywny przez ocenę „1” (§ 11 rozporządzenia), mimo średniej na poziomie oczekiwań.</p>' : ''}
    </div></main>`;
}
function rysuj() {
  const o = W.osoby.find((x) => x.id === st.osoba);
  const ekran = st.rola !== 'przelozony' ? ocena(o) : st.ekran === 'lista' || !o ? lista() : st.ekran === 'podsumowanie' && W.wynik(o) ? podsumowanie(o) : ocena(o);
  app.innerHTML = W.naglowek(document.body.dataset.tytul || 'Asystent ocen okresowych — makieta') + ekran;
  W.dzwonek(document.getElementById('dzw'), (id) => { st.osoba = id; st.ekran = 'ocena'; rysuj(); });
  W.przelacznikRoli(document.getElementById('rola'), st.rola, st.osoba, (v) => { if (v === 'przelozony') { st.rola = v; } else { st.rola = 'pracownik'; st.osoba = v; } rysuj(); });
  const m = app.querySelector('main');
  if (o && st.rola === 'przelozony' && st.ekran === 'ocena') W.podepnij(m, o, rysuj);
  if (o && st.rola !== 'przelozony') m.querySelector('[data-potwierdz]')?.addEventListener('click', (e) => { e.stopPropagation(); W.potwierdz(o.id); rysuj(); });
  m.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.osoba) { st.osoba = b.dataset.osoba; st.ekran = 'ocena'; rysuj(); window.scrollTo(0, 0); }
    if (b.dataset.idz) { st.ekran = b.dataset.idz; rysuj(); window.scrollTo(0, 0); } });
}
rysuj();
