// Ambil screenshot aplikasi (HP 390x844 @2x dan desktop) lewat Edge headless + Chrome DevTools Protocol.
// Butuh server aplikasi: `npm run build && npm run preview -- --port 4173` di folder root.
// Pakai: node scripts/capture.mjs   → public/shots/*.png + src/shots.json (posisi elemen, px CSS)
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const APP = process.env.APP_URL ?? "http://localhost:4173";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9333;
const OUT = "public/shots";
mkdirSync(OUT, { recursive: true });

const edge = spawn(EDGE, [
  "--headless=new",
  "--hide-scrollbars",
  "--disable-gpu",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${join(tmpdir(), "kf-capture")}`,
  "about:blank",
]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ws;
for (let i = 0; i < 40 && !ws; i++) {
  await sleep(250);
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
    const page = list.find((t) => t.type === "page");
    if (page) ws = new WebSocket(page.webSocketDebuggerUrl);
  } catch {}
}
if (!ws) throw new Error("Edge DevTools tidak bisa dihubungi");
await new Promise((r) => ws.addEventListener("open", r, { once: true }));

let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
const js = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? expression);
  return r.result.value;
};

// Helper di halaman: set nilai input React, klik tombol berdasarkan teks, rect elemen
const HELPERS = `
  window.__set = (sel, v) => { const el = document.querySelector(sel); const P = el.tagName === 'SELECT' ? HTMLSelectElement : HTMLInputElement;
    Object.getOwnPropertyDescriptor(P.prototype, 'value').set.call(el, v); el.dispatchEvent(new Event(el.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })); };
  window.__click = (t) => [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === t).click();
  window.__rect = (sel) => { const b = document.querySelector(sel).getBoundingClientRect(); return { x: b.x, y: b.y + scrollY, w: b.width, h: b.height }; };
  window.__hide = (sel) => document.querySelectorAll(sel).forEach((e) => (e.style.visibility = 'hidden'));
`;

const device = async (w, h, dpr, mobile) => {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: dpr, mobile });
  await send("Emulation.setTouchEmulationEnabled", { enabled: mobile });
};
// Tunggu sampai route lazy selesai dimuat (h1 ada), lalu beri waktu animasi masuk selesai
const go = async (path, wait = 1200) => {
  await send("Page.navigate", { url: APP + path });
  for (let i = 0; i < 50; i++) {
    await sleep(200);
    if (await js("!!document.querySelector('main h1')").catch(() => false)) break;
  }
  // ScrollRestoration memulihkan posisi lama (key sama untuk tiap full load), jadi mulai dari atas
  await js("sessionStorage.clear(); scrollTo(0, 0)");
  await sleep(wait);
  await js(HELPERS);
};
const shot = async (name, { full = false } = {}) => {
  const params = { format: "png" };
  if (full) {
    const h = await js("document.documentElement.scrollHeight");
    const w = await js("innerWidth");
    Object.assign(params, { captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
  }
  const { data } = await send("Page.captureScreenshot", params);
  writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, "base64"));
  console.log(`${name}.png`);
};

await send("Page.enable");
await send("Runtime.enable");
const meta = {};

/* HP ---------------------------------------------------------------- */
await device(390, 844, 2, true);

await go("/");
await shot("home-top");
meta.search = await js("__rect('form[role=search]')");
meta.hasil = await js("__rect('#hasil')");
meta.card = await js("__rect('#hasil a > div')");
// halaman penuh untuk efek scroll: navbar dan bottom nav ditempel terpisah di video
await js("__hide('nav.fixed'); __hide('header')");
await shot("home-full", { full: true });
meta.homeHeight = await js("document.documentElement.scrollHeight");
// layar saat sudah di-scroll: dipotong di video untuk navbar solid + filter sticky (atas) dan bottom nav (bawah)
await go("/");
await js("scrollTo(0, 1200)");
await sleep(700);
await shot("home-scrolled");
meta.barTop = await js("(() => { const b = document.querySelector('#hasil > div').getBoundingClientRect(); return b.y + b.height })()");
meta.navH = await js("document.querySelector('nav.fixed').getBoundingClientRect().height");

// pencarian: ketik lalu lihat hasil
await go("/");
await js("__set('#search-kost', 'airmadidi bawah')");
await sleep(400);
await js("document.getElementById('hasil').scrollIntoView()");
await sleep(600);
await shot("hasil-search");

// filter dan urutkan (viewport di area hasil)
const atResults = async () => {
  await js("document.getElementById('hasil').scrollIntoView()");
  await sleep(700);
};
await go("/");
await atResults();
await shot("hasil-all");
meta.chips = await js(
  "Object.fromEntries(['Putri', '> 700rb', 'Putra'].map((t) => { const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === t).getBoundingClientRect(); return [t, { x: b.x, y: b.y, w: b.width, h: b.height }] }))",
);
meta.sort = await js("(() => { const b = document.getElementById('urutkan').getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height } })()");
await js("__click('Putri')");
await sleep(700);
await shot("hasil-putri");
// geser baris chip supaya chip harga terlihat (seperti swipe di HP)
await js("document.querySelector('#hasil .no-scrollbar').scrollLeft = 240");
await sleep(400);
await shot("hasil-putri-scrolled");
meta.chip700 = await js(
  "(() => { const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === '> 700rb').getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height } })()",
);
meta.cardHasil = await js("(() => { const b = document.querySelector('#hasil a > div').getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height } })()");
await js("__click('> 700rb')");
await sleep(700);
await shot("hasil-putri-700");
await js("__set('#urutkan', 'price-asc')");
await sleep(700);
await shot("hasil-sorted");

// detail
await go("/kost/cornerResidence", 1800);
await js("scrollTo(0, 0)");
await sleep(600);
await shot("detail-top");
meta.gallery = await js("__rect('[aria-roledescription=galeri]')");
await js("__hide('.fixed.bottom-0'); __hide('header')");
await shot("detail-full", { full: true });
meta.detailHeight = await js("document.documentElement.scrollHeight");
await go("/kost/cornerResidence", 1800);
meta.ctaH = await js("document.querySelector('.fixed.bottom-0').getBoundingClientRect().height");
meta.detailHeader = await js("document.querySelector('header').getBoundingClientRect().height");
meta.facilities = await js("__rect('#fasilitas')");
await js("scrollTo(0, 0)");
await sleep(500);
// foto galeri ke-2 dan ke-3 (swipe)
for (const i of [1, 2]) {
  await js(`(() => { const t = document.querySelector('[aria-roledescription=galeri]'); t.scrollTo({ left: ${i} * t.clientWidth }) })()`);
  await sleep(700);
  await shot(`detail-photo-${i}`);
}

// booking
await go("/booking?kost=cornerResidence");
await shot("booking-empty");
await js("document.querySelector('form button[type=submit]').click()");
await sleep(600);
await js("scrollTo(0, 0)");
await sleep(300);
await shot("booking-errors");
await js("__set('#booking-name', 'Adriel Walintukan'); __set('#booking-phone', '0813-1044-9264'); __set('#booking-months', '6')");
await js("(() => { const d = new Date(); d.setDate(d.getDate() + 9); __set('#booking-date', d.toLocaleDateString('en-CA')) })()");
await sleep(600);
await js("document.getElementById('booking-name').scrollIntoView({ block: 'start' }); scrollBy(0, -80)");
await sleep(500);
await shot("booking-filled");
await js("window.open = () => null; document.querySelector('form button[type=submit]').click()");
await sleep(600);
await js("scrollTo(0, document.documentElement.scrollHeight)");
await sleep(500);
await shot("booking-sent");

// kalkulator
await go("/kalkulator?kost=cornerResidence");
await js("__set('#calc-months', '6'); __set('#calc-extra', '150000')");
await sleep(600);
await shot("calc");

// tentang
await go("/tentang");
await shot("about");

/* Desktop ---------------------------------------------------------------- */
await device(1440, 900, 1.5, false);
await go("/", 1800);
await shot("desk-home");
await go("/kost/cornerResidence", 1800);
await shot("desk-detail");

writeFileSync("src/shots.json", JSON.stringify(meta, null, 2));
console.log("src/shots.json", meta);
ws.close();
edge.kill();
process.exit(0);
