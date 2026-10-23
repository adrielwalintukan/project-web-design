import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming, type TransitionPresentation } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Grain, Stabilo, easeScene } from "./kit";
import { Band, Caption, Phone, Pill, Shot, Tap, W, useRise } from "./screens";
import { c, font, shadow } from "./theme";
import shots from "./shots.json";
// Data dan pesan asli dari aplikasi, supaya isi video sama persis dengan yang dikirim aplikasi
import kosts from "../../src/data/kosts.js";
import { bookingMessage } from "../../src/lib/booking.js";
import { formatRupiah } from "../../src/lib/format.js";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const lerp = (f: number, [a, b]: [number, number], [x, y]: [number, number], ease = easeScene) => interpolate(f, [a, b], [x, y], { ...clamp, easing: ease });
const corner = kosts.find((k: { id: string }) => k.id === "cornerResidence")!;

const Sfx = ({ name, at, volume = 0.4 }: { name: "pop" | "chime" | "swoosh" | "thud"; at: number; volume?: number }) => (
  <Sequence from={Math.max(0, at)} layout="none">
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

const Light = ({ children }: { children: React.ReactNode }) => <AbsoluteFill style={{ background: c.page, fontFamily: font, overflow: "hidden" }}>{children}</AbsoluteFill>;
const Dark = ({ children }: { children: React.ReactNode }) => (
  <AbsoluteFill style={{ background: c.night, color: "#fff", fontFamily: font, overflow: "hidden" }}>
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 120%, ${c.green}66, transparent 60%)` }} />
    {children}
    <Grain opacity={0.08} />
  </AbsoluteFill>
);

/** Dorongan kamera pelan sepanjang scene. */
const Push = ({ len, from = 1, to = 1.04, origin = "50% 50%", children }: { len: number; from?: number; to?: number; origin?: string; children: React.ReactNode }) => {
  const s = interpolate(useCurrentFrame(), [0, len], [from, to]);
  return <AbsoluteFill style={{ transform: `scale(${s})`, transformOrigin: origin }}>{children}</AbsoluteFill>;
};

/** HP di posisi tetap dengan animasi masuk + melayang halus. */
const Stage = ({ side, children, s }: { side: "left" | "right"; children: React.ReactNode; s?: number }) => {
  const f = useCurrentFrame();
  const { style } = useRise(4);
  const float = Math.sin(f / 22) * 6;
  return (
    <div style={{ position: "absolute", top: 80 + float, [side]: 190, ...style }}>
      <Phone s={s}>{children}</Phone>
    </div>
  );
};

const Side = ({ side, children, top = 250 }: { side: "left" | "right"; children: React.ReactNode; top?: number }) => (
  <div style={{ position: "absolute", top, [side]: 170, width: 900 }}>{children}</div>
);

/* 1. Hook ---------------------------------------------------------------------------- */
const HOOK = [
  { at: 0, words: ["Cari", "kost", "dekat", "kampus?"], mark: -1 },
  { at: 45, words: ["Tanya", "sana-sini."], mark: 1 },
  { at: 90, words: ["Info", "tersebar", "di", "mana-mana."], mark: 3 },
];

const Hook = () => {
  const f = useCurrentFrame();
  const i = HOOK.filter((l) => f >= l.at).length - 1;
  const line = HOOK[i]!;
  const zoom = interpolate(f - line.at, [0, 45], [1.06, 1]);
  return (
    <Dark>
      {HOOK.map((l) => (
        <Sfx key={l.at} name="pop" at={l.at} volume={0.35} />
      ))}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", transform: `scale(${zoom})` }}>
        <div style={{ fontSize: 150, fontWeight: 800, letterSpacing: "-0.04em", textAlign: "center", lineHeight: 1.05, maxWidth: 1500 }}>
          {line.words.map((w, k) => {
            const p = spring({ frame: f - line.at - k * 3, fps: 30, config: { damping: 15, stiffness: 210 } });
            const word = k === line.mark ? <Stabilo at={line.at + 16} color={`${c.green}`}>{w}</Stabilo> : w;
            return (
              <span key={w} style={{ display: "inline-block", marginRight: "0.22em", opacity: p, transform: `translateY(${(1 - p) * 70}px) scale(${1.18 - 0.18 * p})`, filter: `blur(${(1 - p) * 12}px)` }}>
                {word}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", bottom: 80, width: "100%", textAlign: "center", fontSize: 26, fontWeight: 700, letterSpacing: "0.3em", color: c.green100, opacity: 0.7 }}>
        AIRMADIDI · MINAHASA UTARA
      </div>
    </Dark>
  );
};

/* 2. Reveal ---------------------------------------------------------------------------- */
const Reveal = () => {
  const f = useCurrentFrame();
  const flash = interpolate(f, [0, 6], [0.9, 0], clamp);
  const letters = "KostFinder".split("");
  const tag = spring({ frame: f - 26, fps: 30, config: { damping: 18, stiffness: 140 } });
  return (
    <Light>
      <Sfx name="thud" at={0} volume={0.6} />
      <Push len={120} to={1.035}>
        <Side side="left" top={330}>
          <div style={{ fontSize: 168, fontWeight: 800, letterSpacing: "-0.05em", color: c.ink, lineHeight: 1 }}>
            {letters.map((l, k) => {
              const p = spring({ frame: f - 4 - k * 2, fps: 30, config: { damping: 13, stiffness: 190 } });
              return (
                <span key={k} style={{ display: "inline-block", opacity: p, transform: `translateY(${(1 - p) * 90}px) rotate(${(1 - p) * 8}deg)`, color: k >= 4 ? c.green : c.ink }}>
                  {l}
                </span>
              );
            })}
          </div>
          <div style={{ opacity: tag, transform: `translateY(${(1 - tag) * 30}px)`, marginTop: 40 }}>
            <Pill style={{ fontSize: 32 }}>
              <span style={{ width: 14, height: 14, borderRadius: 7, background: c.green }} />
              {kosts.length} kost ter-approve UNKLAB
            </Pill>
            <div style={{ fontSize: 44, color: c.muted, marginTop: 34, lineHeight: 1.35, maxWidth: 760 }}>
              Bandingkan harga, fasilitas, dan lokasi, lalu booking langsung ke pemilik.
            </div>
          </div>
        </Side>
        <Stage side="right">
          <Shot name="home-top" />
        </Stage>
      </Push>
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
    </Light>
  );
};

/* 3. Cari ---------------------------------------------------------------------------- */
const QUERY = "airmadidi bawah";
const SEARCH_SCROLL = shots.hasil.y - 56; // #hasil punya scroll-mt-14

const Search = () => {
  const f = useCurrentFrame();
  const typed = QUERY.slice(0, Math.max(0, Math.floor((f - 24) / 2)));
  const y = lerp(f, [74, 102], [0, SEARCH_SCROLL]);
  const scrolling = f >= 74;
  const result = lerp(f, [102, 110], [0, 1]);
  const count = spring({ frame: f - 108, fps: 30, config: { damping: 16, stiffness: 160 } });
  const { search } = shots;
  return (
    <Light>
      <Sfx name="pop" at={68} volume={0.35} />
      <Push len={180}>
        <Side side="left">
          <Caption n="01" eyebrow="Cari" title={<>Ketik,<br />langsung ketemu.</>} sub="Cari nama kost atau lokasi. Hasil tersaring saat kamu mengetik." />
          <div style={{ marginTop: 56, opacity: count, transform: `translateY(${(1 - count) * 30}px)` }}>
            <Pill>
              <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 800, color: c.green }}>{Math.round(interpolate(count, [0, 1], [20, 6]))}</span>
              kost di Airmadidi Bawah
            </Pill>
          </div>
        </Side>
        <Stage side="right">
          {!scrolling && <Shot name="home-top" />}
          {scrolling && (
            <>
              <Shot name="home-full" y={y} />
              {y > 40 && <Band name="home-scrolled" edge="top" h={y >= SEARCH_SCROLL - 1 ? shots.barTop : 56} />}
              <Band name="home-scrolled" edge="bottom" h={shots.navH} />
            </>
          )}
          {!scrolling && f >= 22 && (
            <div style={{ position: "absolute", left: search.x + 20, top: search.y + 14, width: 270, height: 36, background: c.surface, display: "flex", alignItems: "center", fontSize: 17, fontWeight: 500, color: c.ink }}>
              {typed}
              <span style={{ width: 2, height: 22, background: c.green, marginLeft: 1, opacity: Math.floor(f / 8) % 2 ? 1 : 0.15 }} />
            </div>
          )}
          <Tap at={68} x={search.x + search.w - 32} y={search.y + search.h / 2} />
          <Shot name="hasil-search" opacity={result} />
        </Stage>
      </Push>
    </Light>
  );
};

/* 4. Filter & urutkan -------------------------------------------------------------------- */
const URL_PARTS = [
  { at: 34, s: "?type=wanita" },
  { at: 98, s: "&price=gt700" },
  { at: 160, s: "&sort=price-asc" },
];
const SORT_OPTIONS = ["Rekomendasi", "Harga termurah", "Harga termahal", "Nama A–Z"];

const Filter = () => {
  const f = useCurrentFrame();
  const { chips, chip700, sort } = shots;
  const putri = chips.Putri;
  const n = f < 34 ? 20 : f < 98 ? 10 : 4;
  const nAt = f < 34 ? 0 : f < 98 ? 34 : 98;
  const bump = spring({ frame: f - nAt, fps: 30, config: { damping: 10, stiffness: 220 } });
  const swipe = lerp(f, [60, 76], [0, 1]);
  const pop = spring({ frame: f - 128, fps: 30, config: { damping: 16, stiffness: 220 } });
  const popOut = lerp(f, [156, 164], [1, 0]);
  const url = URL_PARTS.filter((p) => f >= p.at).map((p) => p.s).join("");
  return (
    <Light>
      {[30, 90, 124, 150].map((at) => (
        <Sfx key={at} name="pop" at={at} volume={0.35} />
      ))}
      <Push len={225}>
        <Side side="left" top={210}>
          <Caption n="02" eyebrow="Filter & urutkan" title={<>Saring sesuai<br />kebutuhan.</>} sub="Putra atau Putri, rentang harga, lalu urutkan dari yang termurah." />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 22, marginTop: 52 }}>
            <Pill>
              <span style={{ display: "inline-block", fontVariantNumeric: "tabular-nums", fontWeight: 800, color: c.green, transform: `scale(${0.7 + 0.3 * bump})` }}>{n}</span>
              kost cocok
            </Pill>
            <Pill style={{ fontSize: 26, fontWeight: 500, color: c.muted, opacity: lerp(f, [30, 40], [0, 1]) }}>
              <span style={{ fontWeight: 700, color: c.ink }}>URL</span>
              /{url}
              <span style={{ width: 2, height: 28, background: c.green, opacity: Math.floor(f / 8) % 2 ? 1 : 0.2 }} />
            </Pill>
            <div style={{ fontSize: 26, color: c.subtle, opacity: lerp(f, [170, 182], [0, 1]) }}>Filter tersimpan di URL, jadi bisa dibagikan.</div>
          </div>
        </Side>
        <Stage side="right">
          <Shot name="hasil-all" />
          <Shot name="hasil-putri" opacity={lerp(f, [33, 39], [0, 1])} />
          <Shot name="hasil-putri-scrolled" opacity={lerp(f, [64, 74], [0, 1])} />
          <Shot name="hasil-putri-700" opacity={lerp(f, [93, 99], [0, 1])} />
          <Shot name="hasil-sorted" opacity={lerp(f, [155, 163], [0, 1])} />
          <Tap at={30} x={putri.x + putri.w / 2} y={putri.y + putri.h / 2} />
          {/* gestur swipe di baris chip */}
          <div style={{ position: "absolute", left: 330 - swipe * 200 - 20, top: putri.y + 0, width: 40, height: 40, borderRadius: 20, background: "rgba(28,25,23,.28)", border: "2px solid rgba(255,255,255,.9)", opacity: f >= 56 && f <= 80 ? 1 : 0 }} />
          <Tap at={90} x={chip700.x + chip700.w / 2} y={chip700.y + chip700.h / 2} />
          <Tap at={124} x={sort.x + sort.w / 2} y={sort.y + sort.h / 2} />
          {/* daftar urutan (select) */}
          <div
            style={{
              position: "absolute",
              left: 150,
              top: sort.y + sort.h + 8,
              width: 224,
              padding: 8,
              borderRadius: 20,
              background: c.surface,
              boxShadow: shadow.float,
              opacity: Math.min(pop, popOut),
              transform: `scale(${0.92 + 0.08 * pop})`,
              transformOrigin: "top right",
            }}
          >
            {SORT_OPTIONS.map((o, k) => (
              <div key={o} style={{ padding: "11px 14px", borderRadius: 14, fontSize: 15, fontWeight: 600, color: c.ink, background: k === 1 && f >= 148 ? c.tonal : k === 0 && f < 148 ? c.green50 : "transparent" }}>
                {o}
              </div>
            ))}
          </div>
          <Tap at={150} x={262} y={sort.y + sort.h + 8 + 8 + 21 + 42} />
        </Stage>
      </Push>
    </Light>
  );
};

/* 5. Detail ---------------------------------------------------------------------------- */
const PHOTOS = corner.images as string[];

const Detail = () => {
  const f = useCurrentFrame();
  const card = shots.cardHasil;
  const g = shots.gallery;
  const fly = lerp(f, [24, 48], [0, 1]);
  const base = lerp(f, [24, 40], [0, 1]);
  const idx = lerp(f, [80, 96], [0, 1]) + lerp(f, [120, 136], [0, 1]);
  const y = lerp(f, [168, 218], [0, shots.facilities.y - 170]);
  const r = { x: card.x + (g.x - card.x) * fly, y: card.y + (g.y - card.y) * fly, w: card.w + (g.w - card.w) * fly, h: card.h + (g.h - card.h) * fly };
  const swipeFinger = (a: number) => (f >= a && f <= a + 18 ? 1 : 0);
  return (
    <Light>
      <Sfx name="pop" at={18} volume={0.35} />
      <Sfx name="swoosh" at={22} volume={0.3} />
      <Push len={270} origin="30% 50%">
        <Stage side="left">
          <Shot name="hasil-sorted" />
          <div style={{ position: "absolute", inset: 0, opacity: base }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: W, transform: `translateY(${-y}px)` }}>
              <Shot name="detail-full" />
              {f >= 48 && (
                <div style={{ position: "absolute", left: g.x, top: g.y, width: g.w, height: g.h, overflow: "hidden" }}>
                  <div style={{ display: "flex", transform: `translateX(${-idx * g.w}px)` }}>
                    {PHOTOS.map((src) => (
                      <Img key={src} src={staticFile(src.slice(1))} style={{ width: g.w, height: g.h, objectFit: "cover", flexShrink: 0 }} />
                    ))}
                  </div>
                  <div style={{ position: "absolute", bottom: 12, width: "100%", display: "flex", justifyContent: "center", gap: 6 }}>
                    {PHOTOS.map((src, k) => (
                      <span key={src} style={{ height: 6, width: Math.round(idx) === k ? 16 : 6, borderRadius: 3, background: "#fff", opacity: Math.round(idx) === k ? 1 : 0.6 }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Band name="detail-top" edge="top" h={shots.detailHeader} />
            <Band name="detail-top" edge="bottom" h={shots.ctaH} />
          </div>
          {f >= 20 && f < 48 && (
            <Img src={staticFile(PHOTOS[0]!.slice(1))} style={{ position: "absolute", left: r.x, top: r.y, width: r.w, height: r.h, objectFit: "cover", borderRadius: 20 * (1 - fly) }} />
          )}
          <Tap at={18} x={card.x + card.w / 2} y={card.y + card.h / 2} />
          {[78, 118].map((a) => (
            <div key={a} style={{ position: "absolute", left: 320 - lerp(f, [a, a + 18], [0, 220]) - 20, top: g.y + g.h / 2 - 20, width: 40, height: 40, borderRadius: 20, background: "rgba(28,25,23,.28)", border: "2px solid rgba(255,255,255,.9)", opacity: swipeFinger(a) }} />
          ))}
        </Stage>
        <Side side="right">
          <Caption align="right" n="03" eyebrow="Detail kost" title={<>Lihat dulu,<br />baru datang.</>} sub="Galeri foto yang bisa di-swipe, fasilitas, dan lokasi di peta." />
          <div style={{ display: "flex", gap: 14, justifyContent: "flex-end", flexWrap: "wrap", marginTop: 50 }}>
            {["Kasur", "Lemari", "AC", "TV"].map((t, k) => {
              const p = spring({ frame: f - 200 - k * 5, fps: 30, config: { damping: 14, stiffness: 200 } });
              return (
                <span key={t} style={{ opacity: p, transform: `scale(${0.6 + 0.4 * p})`, background: c.tonal, borderRadius: 999, padding: "14px 26px", fontSize: 30, fontWeight: 600 }}>
                  {t}
                </span>
              );
            })}
          </div>
        </Side>
      </Push>
    </Light>
  );
};

/* 6. Booking ---------------------------------------------------------------------------- */
const MESSAGE = bookingMessage(corner, { name: "Adriel Walintukan", phone: "0813-1044-9264", date: "2026-11-01", months: 6 });

const Chat = ({ at }: { at: number }) => {
  const f = useCurrentFrame() - at;
  const lines = MESSAGE.split("\n");
  const sent = f > 96;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#efeae2", fontFamily: font }}>
      <div style={{ height: 108, background: "#008069", display: "flex", alignItems: "flex-end", gap: 12, padding: "0 16px 14px", color: "#fff" }}>
        <span style={{ fontSize: 28, lineHeight: 1 }}>‹</span>
        <Img src={staticFile(PHOTOS[0]!.slice(1))} style={{ width: 40, height: 40, borderRadius: 20, objectFit: "cover" }} />
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Corner Residence</div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>Pemilik kost</div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <span style={{ background: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 12, color: "#54656f", fontWeight: 600 }}>HARI INI</span>
      </div>
      <div style={{ position: "absolute", right: 12, top: 160, width: 312, background: "#d9fdd3", borderRadius: "14px 4px 14px 14px", padding: "10px 12px 22px", boxShadow: "0 1px 1px rgba(0,0,0,.08)", fontSize: 14.5, lineHeight: 1.42, color: "#111b21" }}>
        {lines.map((l, k) => {
          const p = interpolate(f, [8 + k * 6, 14 + k * 6], [0, 1], clamp);
          return (
            <div key={k} style={{ minHeight: l ? undefined : 10, opacity: p, transform: `translateY(${(1 - p) * 6}px)`, fontWeight: l.startsWith("Total") ? 700 : 400 }}>
              {l}
            </div>
          );
        })}
        <div style={{ position: "absolute", right: 10, bottom: 5, fontSize: 11, color: "#667781" }}>
          10.24 <span style={{ color: sent ? "#53bdeb" : "#8696a0", fontWeight: 700 }}>✓✓</span>
        </div>
      </div>
      <div style={{ position: "absolute", left: 8, right: 8, bottom: 12, display: "flex", gap: 8 }}>
        <div style={{ flex: 1, height: 48, borderRadius: 24, background: "#fff", padding: "0 18px", display: "flex", alignItems: "center", fontSize: 16, color: "#8696a0" }}>Ketik pesan</div>
        <div style={{ width: 48, height: 48, borderRadius: 24, background: "#00a884" }} />
      </div>
    </div>
  );
};

const Booking = () => {
  const f = useCurrentFrame();
  const shake = f >= 30 && f < 46 ? Math.sin((f - 30) * 1.9) * 10 * (1 - (f - 30) / 16) : 0;
  const filled = f >= 90;
  const total = lerp(f, [96, 140], [0, 5100000], (t) => 1 - (1 - t) ** 3);
  const chatIn = lerp(f, [168, 188], [0, 1]);
  const phase = f < 90 ? "err" : f < 270 ? "total" : "sent";
  const pill = spring({ frame: f - (phase === "err" ? 34 : phase === "total" ? 92 : 270), fps: 30, config: { damping: 15, stiffness: 200 } });
  return (
    <Light>
      <Sfx name="thud" at={30} volume={0.5} />
      <Sfx name="pop" at={160} volume={0.35} />
      <Sfx name="swoosh" at={166} volume={0.3} />
      <Sfx name="chime" at={270} volume={0.45} />
      <Push len={330}>
        <Side side="left" top={220}>
          <Caption n="04" eyebrow="Booking" title={<>Pesan lewat<br />WhatsApp.</>} sub="Validasi langsung di form, total dihitung otomatis, pesan lengkap siap dikirim." />
          <div style={{ marginTop: 52, opacity: f >= 34 ? pill : 0, transform: `translateY(${(1 - pill) * 24}px)` }}>
            {phase === "err" && (
              <Pill style={{ color: c.danger }}>
                <span style={{ width: 14, height: 14, borderRadius: 7, background: c.danger }} />4 data belum valid
              </Pill>
            )}
            {phase === "total" && (
              <Pill>
                Total 6 bulan
                <span style={{ fontWeight: 800, color: c.green700, fontVariantNumeric: "tabular-nums" }}>{formatRupiah(Math.round(total / 1000) * 1000)}</span>
              </Pill>
            )}
            {phase === "sent" && (
              <Pill style={{ color: c.green700 }}>
                <span style={{ fontWeight: 800 }}>✓</span> Terkirim ke pemilik kost
              </Pill>
            )}
          </div>
        </Side>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${shake}px)` }}>
          <Stage side="right">
            <Shot name={f < 30 ? "booking-empty" : "booking-errors"} />
            {filled && <Shot name="booking-filled" opacity={lerp(f, [90, 98], [0, 1])} />}
            <Tap at={160} x={195} y={561} />
            <div style={{ position: "absolute", inset: 0, transform: `translateX(${(1 - chatIn) * W}px)` }}>{f >= 166 && <Chat at={188} />}</div>
          </Stage>
        </div>
      </Push>
    </Light>
  );
};

/* 7. Kalkulator ---------------------------------------------------------------------------- */
const Calc = () => {
  const f = useCurrentFrame();
  const total = lerp(f, [44, 96], [0, 6000000], (t) => 1 - (1 - t) ** 3);
  const ring = spring({ frame: f - 40, fps: 30, config: { damping: 14, stiffness: 160 } });
  const big = spring({ frame: f - 40, fps: 30, config: { damping: 16, stiffness: 150 } });
  return (
    <Light>
      <Sfx name="chime" at={96} volume={0.35} />
      <Push len={180}>
        <Side side="left" top={200}>
          <Caption n="05" eyebrow="Kalkulator sewa" title={<>Tahu totalnya<br />sebelum sewa.</>} sub={<>(Rp 850rb + Rp 150rb listrik/air) × 6 bulan</>} />
          <div style={{ marginTop: 44, opacity: big, transform: `translateY(${(1 - big) * 30}px)`, fontSize: 132, fontWeight: 800, letterSpacing: "-0.04em", color: c.green700, fontVariantNumeric: "tabular-nums" }}>
            {formatRupiah(Math.round(total / 1000) * 1000)}
          </div>
        </Side>
        <Stage side="right">
          <Shot name="calc" />
          <div style={{ position: "absolute", left: 12, top: 512, width: 366, height: 189, borderRadius: 24, border: `3px solid ${c.green}`, opacity: ring * lerp(f, [120, 150], [1, 0]), transform: `scale(${1.06 - 0.06 * ring})` }} />
        </Stage>
      </Push>
    </Light>
  );
};

/* 8. Responsif ---------------------------------------------------------------------------- */
const STACK = ["React 19", "Vite", "Tailwind CSS v4", "React Router", "View Transitions"];

const Responsive = () => {
  const f = useCurrentFrame();
  const laptop = useRise(6, 120);
  const phone = spring({ frame: f - 22, fps: 30, config: { damping: 16, stiffness: 130 } });
  const title = spring({ frame: f, fps: 30, config: { damping: 18, stiffness: 140 } });
  return (
    <Light>
      <Sfx name="pop" at={22} volume={0.3} />
      <Push len={165} to={1.05} origin="50% 60%">
        <div style={{ position: "absolute", top: 70, width: "100%", textAlign: "center", opacity: title, transform: `translateY(${(1 - title) * 30}px)`, fontSize: 76, fontWeight: 800, letterSpacing: "-0.035em", color: c.ink }}>
          Mobile-first, tetap rapi di desktop.
        </div>
        <div style={{ position: "absolute", left: 300, top: 220, ...laptop.style }}>
          <div style={{ width: 1100, padding: 16, paddingBottom: 18, background: "#161616", borderRadius: "26px 26px 8px 8px", boxShadow: shadow.phone }}>
            <Img src={staticFile("shots/desk-home.png")} style={{ display: "block", width: 1068, borderRadius: 10 }} />
          </div>
          <div style={{ width: 1260, height: 26, marginLeft: -80, background: "#d6d3d1", borderRadius: "0 0 22px 22px", boxShadow: "0 30px 50px -30px rgba(0,0,0,.4)" }} />
        </div>
        <div style={{ position: "absolute", left: 1300, top: 360, opacity: phone, transform: `translateY(${(1 - phone) * 160}px)` }}>
          <Phone s={0.66}>
            <Shot name="home-top" />
          </Phone>
        </div>
        <div style={{ position: "absolute", bottom: 64, width: "100%", display: "flex", justifyContent: "center", gap: 16 }}>
          {STACK.map((t, k) => {
            const p = spring({ frame: f - 50 - k * 5, fps: 30, config: { damping: 15, stiffness: 200 } });
            return (
              <span key={t} style={{ opacity: p, transform: `translateY(${(1 - p) * 20}px)`, background: c.surface, boxShadow: shadow.raise, borderRadius: 999, padding: "14px 28px", fontSize: 28, fontWeight: 700, color: c.ink }}>
                {t}
              </span>
            );
          })}
        </div>
      </Push>
    </Light>
  );
};

/* 9. Outro ---------------------------------------------------------------------------- */
const FEATURES = ["Cari", "Filter", "Detail", "Booking", "Kalkulator"];

const Outro = () => {
  const f = useCurrentFrame();
  const mark = spring({ frame: f - 4, fps: 30, config: { damping: 14, stiffness: 150 } });
  const out = lerp(f, [125, 150], [1, 0]);
  return (
    <Dark>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", opacity: out }}>
        <div style={{ fontSize: 190, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, opacity: mark, transform: `scale(${0.85 + 0.15 * mark})`, filter: `blur(${(1 - mark) * 10}px)` }}>
          Kost<span style={{ color: c.green100 }}>Finder</span>
        </div>
        <div style={{ fontSize: 50, fontWeight: 600, color: c.green100, marginTop: 34, opacity: lerp(f, [18, 32], [0, 1]) }}>Kost ter-approve di sekitar UNKLAB</div>
        <div style={{ display: "flex", gap: 14, marginTop: 56 }}>
          {FEATURES.map((t, k) => {
            const p = spring({ frame: f - 34 - k * 4, fps: 30, config: { damping: 15, stiffness: 200 } });
            return (
              <span key={t} style={{ opacity: p, transform: `translateY(${(1 - p) * 20}px)`, border: "2px solid rgba(255,255,255,.22)", borderRadius: 999, padding: "12px 26px", fontSize: 28, fontWeight: 600 }}>
                {t}
              </span>
            );
          })}
        </div>
        <div style={{ fontSize: 28, letterSpacing: "0.2em", fontWeight: 700, color: "rgba(255,255,255,.55)", marginTop: 90, opacity: lerp(f, [56, 70], [0, 1]) }}>
          FINAL PROJECT WEB DESIGN · KELOMPOK 1
        </div>
      </AbsoluteFill>
    </Dark>
  );
};

/* Timeline (120 BPM: 1 ketukan = 15 frame) -------------------------------------------- */
const T = 15;
const SCENES: [React.FC, number][] = [
  [Hook, 150],
  [Reveal, 120],
  [Search, 180],
  [Filter, 225],
  [Detail, 270],
  [Booking, 330],
  [Calc, 180],
  [Responsive, 165],
  [Outro, 150],
];
// null = potongan keras (tanpa overlap)
const TRANSITIONS: (TransitionPresentation<any> | null)[] = [
  null,
  wipe({ direction: "from-left" }),
  fade(),
  slide({ direction: "from-right" }),
  wipe({ direction: "from-right" }),
  slide({ direction: "from-bottom" }),
  fade(),
  fade(),
];
const overlap = (i: number) => (TRANSITIONS.slice(0, i).filter(Boolean).length) * T;
export const PROMO_FRAMES = SCENES.reduce((s, [, d]) => s + d, 0) - overlap(TRANSITIONS.length);
const STARTS = SCENES.map((_, i) => SCENES.slice(0, i).reduce((s, [, d]) => s + d, 0) - overlap(i));

export const Promo = () => {
  const timing = linearTiming({ durationInFrames: T, easing: easeScene });
  return (
    <AbsoluteFill style={{ background: c.page }}>
      <TransitionSeries>
        {SCENES.flatMap(([Scene, d], i) => [
          <TransitionSeries.Sequence key={`s${i}`} durationInFrames={d}>
            <Scene />
          </TransitionSeries.Sequence>,
          TRANSITIONS[i] ? <TransitionSeries.Transition key={`t${i}`} presentation={TRANSITIONS[i]!} timing={timing} /> : null,
        ])}
      </TransitionSeries>
      <Audio src={staticFile("music.wav")} volume={(f) => 0.55 * interpolate(f, [0, 10, PROMO_FRAMES - 40, PROMO_FRAMES], [0, 1, 1, 0], clamp)} />
      {STARTS.slice(2).map((s, k) => (TRANSITIONS[k + 1] ? <Sfx key={s} name="swoosh" at={s - 6} volume={0.22} /> : null))}
    </AbsoluteFill>
  );
};

