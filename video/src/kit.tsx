// Project-agnostic motion building blocks. Only transform/opacity/clip-path/filter are animated.
import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

export const ease = Easing.bezier(0.2, 0.8, 0.2, 1);
export const easeScene = Easing.bezier(0.65, 0, 0.35, 1);

/** 0 → 1 between frame `at` and `at + dur` (relative to the enclosing Sequence). */
export const useProgress = (at: number, dur: number, easing = ease) =>
  interpolate(useCurrentFrame(), [at, at + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

type Kids = { children: React.ReactNode; style?: React.CSSProperties };

export const FadeUp = ({ at = 0, dur = 18, dist = 40, children, style }: Kids & { at?: number; dur?: number; dist?: number }) => {
  const p = useProgress(at, dur);
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * dist}px)`, ...style }}>{children}</div>;
};

/** Highlighter stroke drawn left → right behind the text. */
export const Stabilo = ({ at, color, children }: { at: number; color: string; children: React.ReactNode }) => {
  const p = useProgress(at, 14);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          position: "absolute",
          left: "-0.04em",
          right: "-0.04em",
          bottom: "0.06em",
          height: "0.42em",
          background: color,
          transform: `scaleX(${p})`,
          transformOrigin: "left",
        }}
      />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  );
};

/** Number count-up with a little overshoot. */
export const CountUp = ({ to, at = 0, dur = 36 }: { to: number; at?: number; dur?: number }) => {
  const p = useProgress(at, dur, Easing.out(Easing.back(1.6)));
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{Math.round(p * to)}</span>;
};

export const Typewriter = ({ text, at = 0, cps = 28, fps = 30 }: { text: string; at?: number; cps?: number; fps?: number }) => {
  const n = Math.max(0, Math.floor(((useCurrentFrame() - at) * cps) / fps));
  return <>{text.slice(0, n)}</>;
};

/** Words appear one by one, spread evenly over `dur` frames (rough sync with a voice clip). */
export const Words = ({ text, at = 0, dur, dim = 0.18 }: { text: string; at?: number; dur: number; dim?: number }) => {
  const f = useCurrentFrame() - at;
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => {
        const p = interpolate(f, [(i / words.length) * dur, (i / words.length) * dur + 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <span key={i} style={{ opacity: dim + (1 - dim) * p, display: "inline-block", transform: `translateY(${(1 - p) * 8}px)`, marginRight: "0.25em" }}>
            {w}
          </span>
        );
      })}
    </>
  );
};

/** Film grain + vignette over the whole frame. */
export const Grain = ({ opacity = 0.07 }: { opacity?: number }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity, mixBlendMode: "overlay" }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={f % 8} />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.45))" }} />
    </div>
  );
};

/** Screenshot inside a minimal browser window with a slow push-in. */
export const BrowserFrame = ({ src, url, len, width = "78%" }: { src: string; url: string; len: number; width?: string }) => {
  const zoom = interpolate(useCurrentFrame(), [0, len], [1, 1.06]);
  return (
    <div
      style={{
        width,
        borderRadius: 18,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 40px 80px -30px rgba(0,0,0,.45)",
        transform: `scale(${zoom})`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", background: "#eee" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((col) => (
          <span key={col} style={{ width: 14, height: 14, borderRadius: 7, background: col }} />
        ))}
        <span style={{ marginLeft: 16, fontSize: 18, color: "#666", fontFamily: "sans-serif" }}>{url}</span>
      </div>
      <Img src={staticFile(src)} style={{ display: "block", width: "100%" }} />
    </div>
  );
};
