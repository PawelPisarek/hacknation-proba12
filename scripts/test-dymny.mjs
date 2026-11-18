// Test dymny: serwer startuje, strona i dane odpowiadają.
import { spawn } from 'node:child_process';
const port = 3999; const s = spawn('node', ['server.mjs'], { env: { ...process.env, PORT: port } });
await new Promise((r) => setTimeout(r, 500));
let ok = 0, zle = 0;
for (const [u, szukaj] of [['/', 'Cyfrowy asystent'], ['/dane.js', 'window.DANE'], ['/api/zdrowie', 'ok']]) {
  const r = await fetch(`http://localhost:${port}${u}`); const t = await r.text();
  if (r.status === 200 && t.includes(szukaj)) ok++; else { zle++; console.error('BŁĄD', u, r.status); }
}
s.kill(); console.log(`testy: ${ok} ok, ${zle} błędów`); process.exit(zle ? 1 : 0);
