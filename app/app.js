const D = window.DANE || {};
const etykiety = { stanowiska: 'opisy stanowisk', pracownicy: 'pracownicy', notatki: 'notatki przełożonych', arkusze: 'arkusze ocen' };
document.getElementById('liczby').innerHTML = Object.entries(etykiety)
  .map(([k, n]) => `<li>${n}: <strong>${(D[k] || []).length}</strong></li>`).join('');
