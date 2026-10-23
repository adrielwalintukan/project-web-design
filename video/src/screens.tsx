// Mockup HP + potongan screenshot aplikasi. Semua koordinat di dalam <Phone> memakai px CSS aplikasi (390x844),
// sama dengan src/shots.json yang ditulis scripts/capture.mjs.
import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { c, font, shadow } from "./theme";

export const W = 390;
export const H = 844;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Phone = ({ s = 1.04, children, style }: { s?: number; children: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    style={{
      width: W * s + 28,
      height: H * s + 28,
      padding: 14,
      borderRadius: 64 * s,
      background: "#141414",
      boxShadow: `${shadow.phone}, inset 0 0 0 2px #2c2c2c`,
      ...style,
    }}
  >
    <div style={{ position: "relative", width: W * s, height: H * s, borderRadius: 50 * s, overflow: "hidden", background: c.page }}>
      <div style={{ position: "absolute", width: W, height: H, transform: `scale(${s})`, transformOrigin: "0 0", fontFamily: font }}>{children}</div>
      <div style={{ position: "absolute", top: 11 * s, left: "50%", width: 112 * s, height: 33 * s, marginLeft: -56 * s, borderRadius: 20 * s, background: "#000" }} />
    </div>
  </div>
);

/** Screenshot penuh layar (atau halaman panjang yang digeser lewat `y`). */
export const Shot = ({ name, y = 0, opacity = 1, style }: { name: string; y?: number; opacity?: number; style?: React.CSSProperties }) => (
  <Img
    src={staticFile(`shots/${name}.png`)}
    style={{ position: "absolute", left: 0, top: 0, width: W, transform: `translateY(${-y}px)`, opacity, ...style }}
  />
);

/** Potongan pita atas/bawah dari sebuah screenshot (navbar, filter sticky, bottom nav, bar CTA). */
export const Band = ({ name, edge, h }: { name: string; edge: "top" | "bottom"; h: number }) => (
  <div style={{ position: "absolute", left: 0, right: 0, [edge]: 0, height: h, overflow: "hidden" }}>
    <Img src={staticFile(`shots/${name}.png`)} style={{ position: "absolute", left: 0, [edge]: 0, width: W }} />
  </div>
);

/** Ketukan jari: titik ditekan lalu cincin melebar. */
export const Tap = ({ at, x, y }: { at: number; x: number; y: number }) => {
  const f = useCurrentFrame() - at;
  const press = interpolate(f, [-8, 0, 5, 14], [0, 1, 0.8, 0], clamp);
  const ring = interpolate(f, [0, 16], [0.4, 1.8], clamp);
  const ringO = interpolate(f, [0, 16], [0.55, 0], clamp);
  return (
    <>
      <div style={{ position: "absolute", left: x - 22, top: y - 22, width: 44, height: 44, borderRadius: 22, border: `3px solid ${c.ink}`, opacity: f >= 0 ? ringO : 0, transform: `scale(${ring})` }} />
      <div style={{ position: "absolute", left: x - 20, top: y - 20, width: 40, height: 40, borderRadius: 20, background: "rgba(28,25,23,.28)", border: "2px solid rgba(255,255,255,.9)", opacity: press, transform: `scale(${0.7 + press * 0.3})` }} />
    </>
  );
};

/** Masuk dengan pegas dari bawah, sedikit miring lalu tegak (dipakai untuk HP dan kartu). */
export const useRise = (at = 0, dist = 140) => {
  const f = useCurrentFrame();
  const p = spring({ frame: f - at, fps: 30, config: { damping: 18, stiffness: 110, mass: 0.9 } });
  return { p, style: { opacity: Math.min(1, p * 1.4), transform: `perspective(2400px) translateY(${(1 - p) * dist}px) rotateX(${(1 - p) * 14}deg)` } };
};

/** Judul + subjudul di sisi kiri/kanan HP. */
export const Caption = ({ n, eyebrow, title, sub, at = 0, align = "left" }: { n: string; eyebrow: string; title: React.ReactNode; sub?: React.ReactNode; at?: number; align?: "left" | "right" }) => {
  const f = useCurrentFrame();
  const line = (d: number) => {
    const p = spring({ frame: f - at - d, fps: 30, config: { damping: 20, stiffness: 140 } });
    return { opacity: p, transform: `translateY(${(1 - p) * 36}px)`, filter: `blur(${(1 - p) * 8}px)` };
  };
  return (
    <div style={{ fontFamily: font, textAlign: align, color: c.ink }}>
      <div style={{ ...line(0), display: "flex", alignItems: "center", gap: 18, justifyContent: align === "right" ? "flex-end" : "flex-start", fontSize: 26, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: c.green }}>
        <span style={{ fontVariantNumeric: "tabular-nums", background: c.green100, color: c.green700, borderRadius: 999, padding: "6px 16px" }}>{n}</span>
        {eyebrow}
      </div>
      <div style={{ ...line(4), fontSize: 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.035em", marginTop: 26 }}>{title}</div>
      {sub && <div style={{ ...line(9), fontSize: 36, lineHeight: 1.4, color: c.muted, marginTop: 28, maxWidth: 680, marginLeft: align === "right" ? "auto" : 0 }}>{sub}</div>}
    </div>
  );
};

/** Pill kecil berlatar putih untuk label melayang (URL, jumlah hasil, dsb). */
export const Pill = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: c.surface, borderRadius: 999, padding: "16px 28px", boxShadow: shadow.float, fontFamily: font, fontSize: 30, fontWeight: 600, color: c.ink, ...style }}>
    {children}
  </div>
);
