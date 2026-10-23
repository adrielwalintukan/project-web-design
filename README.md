# KostFinder UNKLAB

Direktori kost ter-approve di sekitar Universitas Klabat, Airmadidi. Pengguna bisa mencari kost, melihat foto, fasilitas, dan lokasi, menghitung biaya sewa, lalu booking ke pemilik lewat WhatsApp.

Final Project Web Design (WDC) — Kelompok 1.

## Stack

- [React 19](https://react.dev) + [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (plugin `@tailwindcss/vite`)
- [React Router](https://reactrouter.com)
- [lucide-react](https://lucide.dev) untuk ikon

## Menjalankan

Butuh **Node.js 20 atau lebih baru**.

```bash
npm install
```

```bash
npm run dev
```

Buka alamat yang muncul di terminal (biasanya http://localhost:5173).

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Server development dengan hot reload |
| `npm run build` | Build produksi ke folder `dist/` |
| `npm run preview` | Menjalankan hasil build secara lokal |
| `npm run lint` | Cek kode dengan oxlint |

> Jangan membuka `index.html` langsung dengan double-click. Aplikasi harus dijalankan lewat `npm run dev` atau dari hasil deploy.

## Struktur

```
docs/       PRD dan Design System — baca ini dulu sebelum mengerjakan fitur
public/     File statis (favicon, nanti foto kost di public/gambar)
src/        Kode aplikasi React
legacy/     Website versi lama (HTML/CSS/JS). Hanya referensi selama migrasi, akan dihapus
```

Struktur lengkap `src/` ada di [docs/PRD.md §8](docs/PRD.md).

## Dokumen

- [docs/PRD.md](docs/PRD.md) — kebutuhan fitur, route, model data, rencana kerja, checklist QA
- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) — token warna/tipografi, komponen, layout halaman
