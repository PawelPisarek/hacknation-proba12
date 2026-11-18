// Wariant 3 — „Obok siebie” (docs/pm/03a-warianty.md)
import * as W from '../wspolne/wspolne.mjs';
const st = { ekran: 'obok', osoba: 'kowalska' };
const app = document.getElementById('app');
// Oceny cząstkowe poprzedniej oceny — udawane, do ekranu porównania (P12: tak)
const POPRZ = {
  kowalska: { 'wykorzystywanie wiedzy i doskonalenie zawodowe': 5, 'rzetelność': 5, 'organizacja pracy i orientacja na osiąganie celów': 7, 'współpraca': 5, 'komunikacja': 5, 'orientacja na klienta/interesanta': 7, 'myślenie analityczne': 5 },
  bielecki: { 'zarządzanie ludźmi': 7, 'podejmowanie decyzji i odpowiedzialność': 7, 'organizacja pracy i orientacja na osiąganie celów': 7, 'współpraca': 7, 'komunikacja': 7, 'myślenie analityczne': 7, 'negocjowanie': 5 },
  lis: { 'wykorzystywanie wiedzy i doskonalenie zawodowe': 5, 'rzetelność': 5, 'organizacja pracy i orientacja na osiąganie celów': 5, 'współpraca': 7, 'komunikacja': 5 },
};
const os = () => W.osoby.find((x) => x.id === st.osoba);
const sprzeciwDo = {};

function obok() {
  const o = os();
  const lewa = `<div class="karta"><h2>Przełożony — ${W.esc(W.PRZELOZONY)}</h2>
    <table>${W.kolejka().map((x) => `<tr style="${x.id === o.id ? 'background:#e8f0fb' : ''}"><td><span class="kropka ${W.kolor(x)}"></span><button class="link" data-osoba="${x.id}">${W.esc(W.nazwa(x))}</button></td>
      <td>${W.pasekEtapow(x, true)}</td><td class="${W.kolor(x)} male">${W.fmt(x.termin)}</td></tr>`).join('')}</table>
    <hr><h2>${W.esc(W.nazwa(o))} <span class="male">· arkusz ${o.arkusz}</span></h2>${W.pasekEtapow(o)}<div style="margin:.6rem 0">${W.kartaTerminu(o)}</div>
    <div id="ark">${W.arkusz(o)}</div>
    ${o.teraz && o.teraz <= 4 ? `<p><button class="glowny" data-sporzadz>Sporządź ocenę na piśmie i przekaż pracownikowi</button></p>` : ''}
    ${sprzeciwDo[o.id] ? `<div class="info">Pracownik potwierdził zapoznanie (${W.potwierdzenia[o.id]}). Etap ⑤ — <strong>7 dni na sprzeciw: do ${W.fmt(sprzeciwDo[o.id])}</strong>, zostało ${W.dniDo(sprzeciwDo[o.id])} dni.</div>` : ''}
    <p><button data-ekran="porownanie">Arkusz z poprzednią oceną</button></p></div>`;
  const w = W.wynik(o);
  const prawa = `<div class="karta" style="background:#fbfcfe"><h2>Pracownik — Moja ocena (${W.esc(W.nazwa(o))})</h2><p class="male">To widzi druga strona — zmiany po lewej pojawiają się tu od razu.</p>
    ${W.pasekEtapow(o)}<div style="margin:.6rem 0">${W.kartaTerminu(o).replace(/<button[^>]*data-popraw[^>]*>popraw<\/button>/, '')}</div>
    ${W.arkusz(o, { edycja: false })}
    <div style="margin-top:.8rem">${o.teraz === 5 && !W.potwierdzenia[o.id] ? `<button class="glowny" data-potwierdz>Potwierdzam zapoznanie z oceną</button>`
      : W.potwierdzenia[o.id] ? `<div class="potw">✔ Potwierdzono: ${W.potwierdzenia[o.id]}</div>` : `<p class="male">Potwierdzenie będzie możliwe po ocenie na piśmie${w ? '' : ' (przełożony uzupełnia oceny)'}.</p>`}</div></div>`;
  return `<div class="dwie rowne">${lewa}${prawa}</div>`;
}
function osCzasu() {
  const od = Date.parse('2026-11-01'), doo = Date.parse('2027-02-01'); const poz = (iso) => ((Date.parse(iso) - od) / (doo - od)) * 100;
  const wOsi = W.kolejka().filter((o) => o.teraz); const poza = W.kolejka().filter((o) => !o.teraz);
  return `<div class="karta"><h2>Terminy na osi czasu (listopad 2026 – styczeń 2027)</h2><div class="osczasu">
    ${['2026-11-01', '2026-12-01', '2027-01-01'].map((m) => `<span class="mies" style="left:${poz(m)}%">${['', 'sty', '', '', '', '', '', '', '', '', '', 'lis', 'gru'][Number(m.slice(5, 7))]} ${m.slice(0, 4)}</span>`).join('')}
    <span class="dzis" style="left:${poz(W.DZIS)}%">dziś ${W.fmt(W.DZIS)}</span>
    ${wOsi.map((o, i) => `<button class="zn ${W.kolor(o)}" data-osoba="${o.id}" style="left:${poz(o.termin)}%;top:${(i % 3) * 38}px">${W.esc(o.imie[0] + '. ' + o.nazwisko)}<br>${W.fmt(o.termin).slice(0, 5)}</button>`).join('')}</div>
    <p class="male">Czerwone = przypomnienie (≤ 7 dni), żółte ≤ 30 dni. Kliknij znacznik, by wrócić do oceny. Poza osią: ${poza.map((o) => `${W.esc(W.nazwa(o))} (${W.fmt(o.termin)})`).join(', ')}.</p></div>`;
}
function porownanie() {
  const o = os(); const p = POPRZ[o.id];
  const ks = [...new Set([...W.kryteria(o), ...Object.keys(p || {})])];
  const srP = p ? Object.values(p).reduce((a, b) => a + b, 0) / Object.values(p).length : null; const w = W.wynik(o);
  return `<button data-ekran="obok">← Obok siebie</button><div class="karta"><h2>Arkusz z poprzednią oceną: ${W.esc(W.nazwa(o))}</h2>
    ${!p ? `<p>Brak ocen cząstkowych poprzedniej oceny${o.poprzednia ? ` (poprzednia: ${W.fmt(o.poprzednia.data)}, ${W.esc(o.poprzednia.opis)})` : ' — pierwsza ocena'}. Ekran pokazuje tylko obecną.</p>${W.arkusz(o, { edycja: false })}`
    : `<table class="porown"><thead><tr><th>Kryterium</th><th>Poprzednia (${W.fmt(o.poprzednia.data)})</th><th>Obecna</th><th>Różnica</th></tr></thead><tbody>${ks.map((k) => { const a = p[k], b = o.oceny[k]; const r = a != null && b != null ? b - a : null;
      return `<tr><td>${W.esc(k)}</td><td>${a ?? '—'}</td><td>${b ?? '—'}</td><td class="${r > 0 ? 'pozytywna' : r < 0 ? 'negatywna' : 'male'}">${r == null ? '—' : r > 0 ? '+' + r : r}</td></tr>`; }).join('')}</tbody>
      <tfoot><tr><th>Średnia</th><th>${srP.toFixed(2).replace('.', ',')}</th><th>${w ? w.srednia.toFixed(2).replace('.', ',') : '—'}</th><th></th></tr></tfoot></table>`}
    <p class="male">Wybierz inną osobę: ${W.osoby.map((x) => `<button class="link" data-osoba-por="${x.id}">${W.esc(W.nazwa(x))}</button>`).join(' ')}</p></div>`;
}
function potwierdzOkno(o) {
  const d = document.createElement('dialog'); d.className = 'okno';
  d.innerHTML = `<form method="dialog"><h3>Potwierdzenie zapoznania z oceną</h3><p>${W.esc(W.nazwa(o))}: potwierdzam, że przeprowadzono rozmowę oceniającą i zapoznałem/zapoznałam się z oceną i wnioskami do IPRZ.</p>
    <p class="male">Data: ${W.fmt(W.DZIS)}. Od dziś biegnie 7 dni na sprzeciw do dyrektora generalnego (art. 83 ust. 1 ustawy).</p>
    <div class="przyciski"><button value="nie">Anuluj</button><button value="ok" class="glowny">Potwierdzam</button></div></form>`;
  document.body.append(d); d.showModal();
  d.addEventListener('close', () => { if (d.returnValue === 'ok') { W.potwierdz(o.id); o.zrobione[4] = W.DZIS; sprzeciwDo[o.id] = '2026-11-25'; } d.remove(); rysuj(); });
}
function rysuj() {
  const tresc = { obok, osCzasu, porownanie }[st.ekran]();
  app.innerHTML = W.naglowek('Wariant 3 — Obok siebie') + `<main><nav style="display:flex;gap:.4rem;flex-wrap:wrap"><button data-ekran="obok" class="${st.ekran === 'obok' ? 'glowny' : ''}">Obok siebie</button>
    <button data-ekran="osCzasu" class="${st.ekran === 'osCzasu' ? 'glowny' : ''}">Terminy na osi czasu</button><button data-ekran="porownanie" class="${st.ekran === 'porownanie' ? 'glowny' : ''}">Z poprzednią oceną</button></nav>${tresc}</main>`;
  document.getElementById('rola').innerHTML = '<span class="male">Widok obu ról naraz</span>';
  W.dzwonek(document.getElementById('dzw'), (id) => { st.osoba = id; st.ekran = 'obok'; rysuj(); });
  const m = app.querySelector('main'); const o = os();
  W.podepnij(m, o, rysuj);
  m.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.osoba) { st.osoba = b.dataset.osoba; st.ekran = 'obok'; rysuj(); }
    else if (b.dataset.osobaPor) { st.osoba = b.dataset.osobaPor; rysuj(); }
    else if (b.dataset.ekran) { st.ekran = b.dataset.ekran; rysuj(); }
    else if ('sporzadz' in b.dataset) { if (!W.wynik(o)) { alert('Uzupełnij wszystkie oceny cząstkowe.'); return; } for (let i = o.teraz - 1; i < 4; i++) o.zrobione[i] = W.DZIS; o.teraz = 5; rysuj(); }
    else if ('potwierdz' in b.dataset) potwierdzOkno(o);
  });
}
rysuj();
