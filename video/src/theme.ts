// Sama dengan token @theme di ../src/index.css (DESIGN-SYSTEM §2)
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";

export const font = loadFont("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] }).fontFamily;

export const c = {
  page: "#faf9f7",
  surface: "#ffffff",
  tonal: "#efeeea",
  line: "#e7e5e4",
  ink: "#1c1917",
  muted: "#57534e",
  subtle: "#78716c",
  green: "#1f5c46",
  green700: "#174837",
  green100: "#d3e5db",
  green50: "#eaf2ee",
  danger: "#b42318",
  whatsapp: "#1c9c4f",
  // latar gelap khusus video (hook & outro): hijau Klabat yang digelapkan
  night: "#0c241b",
  night2: "#123327",
};

export const shadow = {
  raise: "0 1px 2px rgb(28 25 23 / 0.04), 0 6px 20px rgb(28 25 23 / 0.06)",
  float: "0 2px 6px rgb(28 25 23 / 0.06), 0 16px 40px rgb(28 25 23 / 0.14)",
  phone: "0 60px 120px -40px rgb(12 36 27 / 0.45), 0 30px 60px -30px rgb(12 36 27 / 0.3)",
};
