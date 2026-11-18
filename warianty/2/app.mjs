// Wariant 2 — „Najpierw kolejka” (docs/pm/03a-warianty.md)
import * as W from '../wspolne/wspolne.mjs';
const st = { rola: 'przelozony', ekran: 'kolejka', osoba: null, pracownik: 'kowalska' };
const app = document.getElementById('app');
const dni = (o) => (o.teraz ? W.ileDni(W.dniDo(o.termin)) : 'zamknięta');
const wstecz = (cel, txt) => `<button data-ekran="${cel}">← ${txt}</button>`;

function kolejka() {
  return `<div class="karta"><h2>Kolejka ocen — ${W.esc(W.PRZELOZONY)}</h2><table><thead><tr><th>Pracownik</th><th class="bez-tel">Stanowisko, arkusz</th><th>Etap</th><th>Najbliższy termin</th>
    <th>Poprzednia ocena</th><th></th></tr></thead><tbody>${W.kolejka().map((o) => `<tr><td><span class="kropka ${W.kolor(o)}"></span><strong>${W.esc(W.nazwa(o))}</strong></td>
    <td class="bez-tel">${W.esc(o.stanowisko)} <span class="male">(${o.arkusz})</span></td><td>${W.pasekEtapow(o, true)}</td>
    <td class="${W.kolor(o)}">${W.fmt(o.termin)}<div class="male">${dni(o)}</div></td>
    <td class="male">${o.poprzednia ? `${W.fmt(o.poprzednia.data)}, ${W.esc(o.poprzednia.opis)}` : 'brak'}</td>
    <td><button class="glowny" data-osoba="${o.id}">Przejdź</button></td></tr>`).join('')}</tbody></table>
    <p class="male"><span class="kropka czerwony"></span>≤ 7 dni <span class="kropka zolty"></span>≤ 30 dni <span class="kropka szary"></span>pozostałe</p></div>`;
}
function os() {
  const o = W.osoby.find((x) => x.id === st.osoba);
  return `${wstecz('kolejka', 'Kolejka')}<div class="karta"><h2>Etapy oceny: ${W.esc(W.nazwa(o))} <span class="male">· ${W.esc(o.stanowisko)}, arkusz ${o.arkusz}</span></h2>
    <ol class="os">${W.ETAPY.map((e, i) => { const n = i + 1; const zr = o.zrobione[i]; const teraz = n === o.teraz;
      return `<li class="${zr ? 'zrobione' : teraz ? 'teraz' : 'potem'}"><strong>${'①②③④⑤'[i]} ${W.esc(e)}</strong>
        <div class="male">${zr ? `zrobione ${W.fmt(zr)}` : teraz ? 'teraz' : 'potem'}</div>
        ${teraz ? `<div style="margin-top:.3rem">${W.kartaTerminu(o)}</div>` : ''}</li>`; }).join('')}</ol>
    <button class="glowny" data-ekran="arkusz">Otwórz arkusz</button></div>`;
}
const pod = (o, k) => { const p = (W.AI.dodatkowe[o.stanowisko] || []).find(([x]) => x === k); return p ? ` ${W.znakAI} <span class="male">${W.esc(p[1])}</span>` : ''; };
function arkusz() {
  const o = W.osoby.find((x) => x.id === st.osoba);
  const dod = W.KRYTERIA.filter((k) => !W.OBOWIAZKOWE[o.arkusz].includes(k));
  return `${wstecz('os', 'Etapy')}<div class="karta"><h2>Arkusz krok po kroku: ${W.esc(W.nazwa(o))}</h2>
    <h3 style="font-size:.95rem">1. Kryteria obowiązkowe (arkusz ${o.arkusz})</h3><p class="male">${W.OBOWIAZKOWE[o.arkusz].join(' · ')}</p>
    <h3 style="font-size:.95rem">2. Kryteria dodatkowe — do 3 (wybrano ${o.dodatkowe.length})</h3>
    <div class="dodatkowe">${dod.map((k) => `<label style="display:block;margin:.2rem 0"><input type="checkbox" data-dod="${W.esc(k)}" ${o.dodatkowe.includes(k) ? 'checked' : ''} ${!o.dodatkowe.includes(k) && o.dodatkowe.length >= 3 ? 'disabled' : ''}>
      <strong>${W.esc(k)}</strong> <span class="male">— ${W.esc(W.OPISY[k])}</span>${pod(o, k)}</label>`).join('')}</div>
    <h3 style="font-size:.95rem">3. Oceny</h3>${W.arkusz(o)}</div>`;
}
function moja() {
  const o = W.osoby.find((x) => x.id === st.pracownik);
  return `<div class="karta"><h2>Moja ocena — ${W.esc(W.nazwa(o))}</h2>${W.pasekEtapow(o)}
    <div style="margin:.8rem 0">${W.kartaTerminu(o).replace(/<button[^>]*data-popraw[^>]*>popraw<\/button>/, '')}</div>
    ${W.poprzedniaHTML(o)}<p><strong>Kryteria obowiązkowe:</strong> ${W.OBOWIAZKOWE[o.arkusz].join(', ')}</p><p><strong>Kryteria dodatkowe:</strong> ${o.dodatkowe.join(', ') || 'brak'}</p>
    ${o.teraz >= 2 || o.teraz === 0 ? (W.potwierdzenia[o.id] ? `<div class="potw">✔ Potwierdzono zapoznanie: ${W.potwierdzenia[o.id]}</div>` : `<button class="glowny" data-potwierdz="${o.id}">Potwierdzam zapoznanie z kryteriami i terminem</button>`) : '<p class="male">Czeka na rozmowę wstępną.</p>'}</div>`;
}
function kalendarz() {
  const lista = [...W.kolejka()].sort((a, b) => a.termin.localeCompare(b.termin));
  return `<div class="karta"><h2>Kalendarz terminów</h2><table>${lista.map((o) => `<tr><td class="${W.kolor(o)}"><strong>${W.fmt(o.termin)}</strong><div class="male">${dni(o)}</div></td>
    <td>${W.esc(W.nazwa(o))}<div class="male">${W.esc(o.czynnosc)} · ${W.esc(W.zrodloTerminu(o))}</div></td><td><button data-osoba="${o.id}">Przejdź</button></td></tr>`).join('')}</table></div>`;
}
function rysuj() {
  const pr = st.rola === 'przelozony';
  const tresc = !pr ? moja() : { kolejka, os, arkusz, kalendarz }[st.ekran]();
  app.innerHTML = W.naglowek('Wariant 2 — Najpierw kolejka') + `<main>${pr ? `<nav style="display:flex;gap:.4rem"><button data-ekran="kolejka" class="${st.ekran === 'kolejka' ? 'glowny' : ''}">Kolejka</button><button data-ekran="kalendarz" class="${st.ekran === 'kalendarz' ? 'glowny' : ''}">Kalendarz terminów</button></nav>` : ''}${tresc}</main>`;
  W.dzwonek(document.getElementById('dzw'), (id) => { st.rola = 'przelozony'; st.osoba = id; st.ekran = 'os'; rysuj(); });
  W.przelacznikRoli(document.getElementById('rola'), st.rola, st.pracownik, (v) => { if (v === 'przelozony') st.rola = v; else { st.rola = 'pracownik'; st.pracownik = v; } rysuj(); });
  const m = app.querySelector('main');
  if (st.osoba) W.podepnij(m, W.osoby.find((x) => x.id === st.osoba), rysuj);
  m.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.osoba) { st.osoba = b.dataset.osoba; st.ekran = 'os'; rysuj(); }
    else if (b.dataset.ekran) { st.ekran = b.dataset.ekran; rysuj(); }
    else if (b.dataset.potwierdz) { W.potwierdz(b.dataset.potwierdz); rysuj(); }
  });
  m.addEventListener('change', (e) => {
    const k = e.target.dataset.dod; if (!k) return; const o = W.osoby.find((x) => x.id === st.osoba);
    if (e.target.checked) { o.dodatkowe.push(k); o.oceny[k] = null; } else { o.dodatkowe = o.dodatkowe.filter((x) => x !== k); delete o.oceny[k]; }
    rysuj();
  });
}
rysuj();
