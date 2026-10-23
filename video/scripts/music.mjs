// Synthesizes the background music and UI sound effects, so the video carries no third-party audio licence.
// Run: node scripts/music.mjs [seconds]   → public/music.wav, public/sfx/*.wav
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";

const RATE = 44100;
const seconds = Number(process.argv[2] ?? 70);
const midi = (n) => 440 * 2 ** ((n - 69) / 12);
const TAU = 2 * Math.PI;

function save(path, buf, peak = 0.8) {
  const max = buf.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
  assert.ok(Number.isFinite(max) && max > 0, `${path}: silent or NaN`);
  const out = Buffer.alloc(44 + buf.length * 2);
  out.write("RIFF", 0); out.writeUInt32LE(36 + buf.length * 2, 4); out.write("WAVE", 8);
  out.write("fmt ", 12); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(1, 22);
  out.writeUInt32LE(RATE, 24); out.writeUInt32LE(RATE * 2, 28); out.writeUInt16LE(2, 32); out.writeUInt16LE(16, 34);
  out.write("data", 36); out.writeUInt32LE(buf.length * 2, 40);
  for (let i = 0; i < buf.length; i++) out.writeInt16LE(Math.round((buf[i] / max) * peak * 32767), 44 + i * 2);
  writeFileSync(path, out);
  console.log(`${path}: ${(buf.length / RATE).toFixed(1)} s`);
}

/** Adds `fn(t)` (t in seconds from `at`) to `buf` for `dur` seconds. */
const add = (buf, at, dur, fn) => {
  const s = Math.floor(at * RATE);
  for (let i = 0; i < dur * RATE && s + i < buf.length; i++) buf[s + i] += fn(i / RATE);
};

/* Music: 120 BPM, C – G – Am – F, warm pad + plucked arpeggio + soft kick and rim. */
const BEAT = 60 / 120;
const BAR = BEAT * 4;
const CHORDS = [
  { bass: 48, pad: [60, 64, 67] },
  { bass: 43, pad: [59, 62, 67] },
  { bass: 45, pad: [57, 60, 64] },
  { bass: 41, pad: [57, 60, 65] },
];
const music = new Float32Array(Math.ceil(seconds * RATE));
for (let bar = 0; bar * BAR < seconds; bar++) {
  const ch = CHORDS[bar % 4];
  const t0 = bar * BAR;
  // pad: detuned sines, slow swell, overlaps the next bar slightly
  for (const n of ch.pad)
    for (const det of [-0.12, 0.12])
      add(music, t0, BAR + 0.4, (t) => 0.05 * Math.sin(TAU * midi(n + det) * t) * Math.min(1, t / 0.5) * Math.min(1, (BAR + 0.4 - t) / 0.5));
  // bass: root on every beat, short
  for (let b = 0; b < 4; b++)
    add(music, t0 + b * BEAT, BEAT, (t) => 0.16 * Math.sin(TAU * midi(ch.bass) * t) * Math.exp(-t * 5));
  if (bar < 1) continue; // intro: pad + bass only
  // arpeggio: 8th notes over the chord, one octave up
  const arp = [0, 1, 2, 1, 0, 2, 1, 2];
  for (let k = 0; k < 8; k++) {
    const f = midi(ch.pad[arp[k]] + 12);
    add(music, t0 + (k * BEAT) / 2, 0.4, (t) => 0.07 * (Math.sin(TAU * f * t) + 0.3 * Math.sin(TAU * 2 * f * t)) * Math.exp(-t * 9));
  }
  if (bar < 2) continue;
  // kick on 1 and 3, rim on 2 and 4
  for (const b of [0, 2]) add(music, t0 + b * BEAT, 0.35, (t) => 0.5 * Math.sin(TAU * (45 + 65 * Math.exp(-t * 30)) * t) * Math.exp(-t * 9));
  for (const b of [1, 3]) add(music, t0 + b * BEAT, 0.06, (t) => 0.05 * Math.sin(TAU * 1700 * t) * Math.exp(-t * 80));
}
// fade out over the last 3 s
for (let i = 0; i < 3 * RATE; i++) music[music.length - 1 - i] *= i / (3 * RATE);

/* Sound effects: tonal only (noise reads as hiss/crackle). */
const sfx = (dur, fn) => {
  const b = new Float32Array(Math.ceil(dur * RATE));
  add(b, 0, dur, fn);
  return b;
};
const sounds = {
  // light bubble pop for toasts and cards
  pop: sfx(0.18, (t) => Math.sin(TAU * (600 + 3500 * t) * t) * Math.exp(-t * 28)),
  // two-note bell for "fact found"
  chime: (() => {
    const b = new Float32Array(Math.ceil(0.9 * RATE));
    for (const [at, f] of [[0, 1318.5], [0.09, 1975.5]])
      add(b, at, 0.8, (t) => (Math.sin(TAU * f * t) + 0.25 * Math.sin(TAU * f * 2.76 * t)) * Math.exp(-t * 6));
    return b;
  })(),
  // soft rising sweep for scene changes
  swoosh: sfx(0.45, (t) => Math.sin(TAU * (180 * t + 900 * t * t)) * Math.sin((Math.PI * t) / 0.45) ** 2),
  // low thump for the review stamp
  thud: sfx(0.3, (t) => Math.sin(TAU * (50 + 60 * Math.exp(-t * 25)) * t) * Math.exp(-t * 12)),
};

mkdirSync("public/sfx", { recursive: true });
save("public/music.wav", music, 0.7);
for (const [name, b] of Object.entries(sounds)) save(`public/sfx/${name}.wav`, b, 0.6);
