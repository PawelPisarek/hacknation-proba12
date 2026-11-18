// Wariant 1 — „Jedna ocena na jednym ekranie” (docs/pm/03a-warianty.md)
import * as W from '../wspolne/wspolne.mjs';
const st = { rola: 'przelozony', osoba: W.kolejka()[0].id };
const app = document.getElementById('app');

function rysuj() {
  const o = W.osoby.find((x) => x.id === st.osoba); const pr = st.rola === 'przelozony';
  app.innerHTML = W.naglowek(document.body.dataset.tytul || 'Wariant 1 — Jedna ocena na jednym ekranie') + `<main>
    <div class="karta"><div style="display:flex;justify-content:space-between;gap:.5rem;flex-wrap:wrap;align-items:center">
      <h2>${pr ? 'Ocena' : 'Moja ocena'}: ${W.esc(W.nazwa(o))} <span class="male">· ${W.esc(o.stanowisko)}, arkusz ${o.arkusz}</span></h2>
      ${pr ? '<button id="wybierz">Zmień pracownika (6)</button>' : ''}</div>
      ${W.pasekEtapow(o)}
      ${W.poprzedniaHTML(o)}</div>
    <div class="dwie">
      <div class="karta" id="ark"><h2>Arkusz</h2>${W.arkusz(o, { edycja: pr, poprzednia: false })}</div>
      <div class="karta"><h2>Co dalej</h2>${W.kartaTerminu(o)}
        <p>Etap teraz: <strong>${o.teraz ? '①②③④⑤'[o.teraz - 1] + ' ' + W.ETAPY[o.teraz - 1] : 'ocena zamknięta'}</strong></p>
        ${pr ? (o.teraz && o.teraz < 5 ? `<button class="glowny" id="dalej">Zakończ etap ${'①②③④⑤'[o.teraz - 1]} → następny</button>` : '')
          : (o.teraz === 5 ? `${W.potwierdzenie(o)}<p class="info" style="margin-top:.6rem">Masz 7 dni na sprzeciw do dyrektora generalnego — do <strong>${W.fmt(o.termin)}</strong> (art. 83 ust. 1 ustawy).</p>` : '<p class="male">Potwierdzenie pojawi się po ocenie na piśmie.</p>')}
      </div></div></main>`;
  W.dzwonek(document.getElementById('dzw'), (id) => { st.osoba = id; rysuj(); });
  W.przelacznikRoli(document.getElementById('rola'), st.rola, st.osoba, (v) => { if (v === 'przelozony') st.rola = v; else { st.rola = 'pracownik'; st.osoba = v; } rysuj(); });
  W.podepnij(app.querySelector('main'), o, rysuj);
  app.querySelector('#wybierz')?.addEventListener('click', wybor);
  app.querySelector('#dalej')?.addEventListener('click', () => { o.zrobione[o.teraz - 1] = W.DZIS; o.teraz++; rysuj(); });
  app.querySelector('[data-potwierdz]')?.addEventListener('click', (e) => { e.stopPropagation(); W.potwierdz(o.id); rysuj(); });
}
function wybor() {
  const d = document.createElement('dialog'); d.className = 'okno';
  d.innerHTML = `<h3>Wybierz pracownika</h3><table>${W.kolejka().map((o) => `<tr><td><span class="kropka ${W.kolor(o)}"></span>${W.esc(W.nazwa(o))}<div class="male">${W.esc(o.stanowisko)}</div></td><td>${W.pasekEtapow(o, true)}</td><td><button data-id="${o.id}">Wybierz</button></td></tr>`).join('')}</table>
    <div class="przyciski"><button data-zamknij>Zamknij</button></div>`;
  document.body.append(d); d.showModal();
  d.onclick = (e) => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.id) st.osoba = b.dataset.id; d.close(); d.remove(); rysuj(); };
}
rysuj();
