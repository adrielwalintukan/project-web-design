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
| `npm test` | Tes helper dan validasi data kost (`node --test`) |
| `npm run images -- <folder>` | Kompres foto JPG/PNG dari `<folder>` ke WebP di `public/gambar` |

> Jangan membuka `index.html` langsung dengan double-click. Aplikasi harus dijalankan lewat `npm run dev` atau dari hasil deploy.

## Menambah atau mengubah kost

1. Simpan foto asli (JPG/PNG) di sebuah folder, beri nama tanpa spasi, misalnya `kostBaru1.jpg`.
2. Jalankan `npm run images -- <folder>`. Hasilnya `public/gambar/kostBaru1.webp` (1600 px) dan `kostBaru1-sm.webp` (640 px), masing-masing ≤ 200 KB.
3. Tambahkan data di [src/data/kosts.js](src/data/kosts.js) sesuai skema di [docs/PRD.md §6](docs/PRD.md). Key fasilitas yang tersedia ada di [src/lib/facilities.js](src/lib/facilities.js).
4. Jalankan `npm test`. Tes akan gagal jika ada id ganda, foto tidak ditemukan, fasilitas tidak dikenal, atau nomor WhatsApp tidak valid.

## Struktur

```
docs/       PRD dan Design System — baca ini dulu sebelum mengerjakan fitur
public/     File statis: favicon dan foto kost (public/gambar)
scripts/    Script bantu (kompres foto)
src/        Kode aplikasi React
```

Struktur lengkap `src/` ada di [docs/PRD.md §8](docs/PRD.md). Website versi lama (HTML/CSS/JS) sudah dihapus; kodenya masih bisa dilihat di riwayat git (folder `legacy/` pada commit a4b89ac).

## Deploy

Situs ini statis (SPA), jadi bisa di-deploy gratis ke **Vercel** atau **Netlify** langsung dari repo GitHub:

| Pengaturan | Nilai |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |

Rewrite SPA sudah disiapkan, jadi refresh langsung di `/kost/<id>` tidak menghasilkan 404: [vercel.json](vercel.json) untuk Vercel dan [public/_redirects](public/_redirects) untuk Netlify.

Sebelum deploy, jalankan `npm run lint`, `npm test`, dan `npm run build`, lalu cek hasilnya dengan `npm run preview`.

## Dokumen

- [docs/PRD.md](docs/PRD.md) — kebutuhan fitur, route, model data, rencana kerja, checklist QA
- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) — token warna/tipografi, komponen, layout halaman
