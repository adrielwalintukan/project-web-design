# PRD — KostFinder UNKLAB (Refactor v2)

| | |
|---|---|
| **Produk** | KostFinder UNKLAB, direktori kost ter-approve di sekitar Universitas Klabat |
| **Tim** | Final Project WDC Kel. 1 |
| **Status** | Draft untuk refactor |
| **Tanggal** | 23 Oktober 2026 |
| **Dokumen terkait** | [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) |

---

## 1. Ringkasan

KostFinder saat ini adalah website statis (HTML + CSS + JavaScript vanilla) yang menampilkan **20 kost** di Airmadidi yang sudah disetujui UNKLAB. Pengguna bisa mencari kost, melihat detail (foto, fasilitas, peta), menghitung biaya sewa, lalu mengirim permintaan booking ke pemilik lewat WhatsApp.

Refactor v2 punya dua tujuan:
1. **UI modern dan konsisten** di semua halaman, desktop maupun HP.
2. **Semua fitur berfungsi dengan benar**, tanpa link mati, tombol yang tidak bekerja, atau data yang tidak sinkron.

**Platform utama: HP.** Mayoritas pengguna membuka dari ponsel, jadi tampilan mobile, animasi, dan UX wajib terasa seperti aplikasi (lihat §7.1). Desktop tetap didukung.

**Stack v2: React + Vite + Tailwind CSS + React Router.** Tetap tanpa backend. Data kost disimpan di `src/data/kosts.js`, dan hasil build berupa file statis yang bisa di-deploy gratis.

---

## 2. Hasil Analisis Kondisi Sekarang

### 2.1 Struktur file

| Kategori | File | Status |
|---|---|---|
| Halaman aktif | `index.html`, `detailkost.html`, `booking.html`, `kalkulatorsewa.html`, `tentangkami.html` | Sudah pakai `styles/modern.css` |
| Halaman lama | `search.html` | Masih Bootstrap + `style.css`, tidak ditautkan dari halaman mana pun |
| JS aktif | `scripts/data.js`, `scripts/app.js`, `scripts/detail.js`, `scripts/booking.js`, `scripts/slider.js` | ES modules |
| JS lama (mati) | `booking.js`, `detailkost.js`, `gambarhome.js`, `kalkulatorsewa.js`, `search.js` | Mencari elemen yang sudah tidak ada. Data duplikat |
| CSS aktif | `styles/variables.css`, `styles/modern.css` + `<style>` inline di setiap halaman | |
| CSS lama (mati) | `style.css`, `styleBookingDetail.css` | Hanya dipakai `search.html` |
| Aset | `gambar/` (≈21 MB, 37 gambar) | Banyak gambar 1–1,6 MB |

Perubahan v2 di `scripts/` dan `styles/` **belum di-commit** (`git status`: untracked).

### 2.2 Bug dan masalah fungsional

| # | Masalah | Lokasi | Dampak |
|---|---|---|---|
| B1 | Script `type="module"` **tidak jalan kalau file dibuka langsung** (`file://`), karena diblokir CORS. Grid kost, detail, dan booking jadi kosong | Semua halaman | **Kritis.** Website terlihat rusak waktu demo. Di v2 teratasi karena dijalankan lewat `npm run dev` atau URL hasil deploy |
| B2 | Navbar `navbar-glass` berteks putih dengan background transparan. Di halaman berlatar terang (detail, booking, kalkulator, tentang) tulisan "Finder" dan link nav hampir tidak terlihat | 4 halaman | Navigasi tidak terbaca |
| B3 | Navbar tidak punya menu hamburger. Di HP link-nya berdesakan atau terpotong | Semua | Mobile rusak |
| B4 | Icon WhatsApp memakai `fas fa-whatsapp`, seharusnya `fab`. Icon tidak muncul | `index.html` | Visual rusak |
| B5 | "Pesan Sekarang" di halaman detail membuka `booking.html` **tanpa** membawa ID kost, jadi user harus memilih ulang | `detailkost.html` | UX buruk |
| B6 | Form booking: input tanpa `id`/`name`/`label for`, dibaca lewat `inputs[0]`, `inputs[2]`. Nomor WA diisi tapi tidak dipakai. Tanggal boleh di masa lalu | `booking.html`, `scripts/booking.js` | Rapuh, validasi lemah |
| B7 | Kalkulator memakai `alert()`, menerima angka negatif atau 0, dan tidak terhubung ke data kost | `kalkulatorsewa.html` | Fitur dangkal |
| B8 | Harga disimpan sebagai string (`'Rp. 300.000 / Bulan'`), jadi tidak bisa difilter atau diurutkan berdasarkan harga | `scripts/data.js` | Menghalangi fitur filter |
| B9 | Halaman "Tentang Kami" menjanjikan "fitur filter harga", padahal fiturnya belum ada | `tentangkami.html` | Klaim tidak sesuai |
| B10 | Kartu kost berupa `div onclick`, tidak bisa difokus dengan keyboard, dan thumbnail tidak punya `alt` yang berarti | `app.js`, `detail.js` | Aksesibilitas |
| B11 | Field `image` dan `images` duplikat. Kontak Wullur dan Mizpa (`0812-3456-7890`, `0813-4567-8901`) terlihat seperti placeholder. 12 kost tidak punya kontak, Anugerah Wisma tidak punya peta | `data.js` | Data tidak lengkap |
| B12 | `background-attachment: fixed` pada hero membuat scroll patah-patah di iOS/Android | `modern.css` | Performa mobile |
| B13 | Gambar 1–1,6 MB tanpa kompresi. Total aset ≈21 MB | `gambar/` | Loading lambat |
| B14 | Pencarian berjalan di setiap `keyup`, termasuk saat Enter (dobel). Tidak ada filter tipe atau harga | `app.js` | Minor |
| B15 | Footer, navbar, dan style form disalin manual di setiap halaman, ditambah banyak `style=""` inline. Kelas Bootstrap sisa (`me-2`, `mb-4`, `mt-5`) tidak punya CSS | Semua | Sulit dirawat, tidak konsisten |
| B16 | Kartu menampilkan badge "Ter-Approve" untuk semua kost tanpa ada sumber datanya | `app.js` | Klaim statis |

### 2.3 Yang sudah baik (dibawa ke v2)
- Satu sumber data `scripts/data.js` yang dipakai index, detail, dan booking. Pindah ke `src/data/kosts.js`.
- Alur booking via WhatsApp dengan pesan otomatis, cocok dengan cara pemilik kost biasa berkomunikasi.
- Galeri foto dengan thumbnail, embed Google Maps, dan mapping icon fasilitas.
- Token CSS di `variables.css` sebagai dasar design system.

---

## 3. Tujuan & Non-Tujuan

### Tujuan
- G1: Semua halaman tampil benar di lebar 360 px sampai 1440 px.
- G2: Semua fitur di §5 lolos acceptance criteria.
- G3: Satu sistem visual: token, komponen, dan navbar/footer yang sama di semua halaman.
- G4: Skor Lighthouse ≥ 90 untuk Performance, Accessibility, dan Best Practices di halaman utama.

### Non-tujuan (di luar scope v2)
- Backend, login, database, dan pembayaran online.
- Panel admin untuk pemilik kost.
- Ketersediaan kamar real-time.
- Ulasan dan rating pengguna.

---

## 4. Pengguna

| Persona | Kebutuhan |
|---|---|
| **Mahasiswa baru UNKLAB** (utama) | Cepat menemukan kost sesuai gender dan budget, melihat foto dan lokasi, lalu menghubungi pemilik |
| **Orang tua mahasiswa** | Yakin kost aman dan ter-approve, tahu total biaya |
| **Mahasiswa pindah kost** | Membandingkan harga dan fasilitas |

---

## 5. Kebutuhan Fungsional

Prioritas: **P0** wajib untuk rilis, **P1** sangat disarankan, **P2** jika ada waktu.

### Routing (React Router)

| Route | Halaman | Pengganti file lama |
|---|---|---|
| `/` | `HomePage` | `index.html`, `search.html` |
| `/kost/:id` | `DetailPage` | `detailkost.html?kost=` |
| `/booking?kost=<id>` | `BookingPage` | `booking.html` |
| `/kalkulator?kost=<id>` | `CalculatorPage` | `kalkulatorsewa.html` |
| `/tentang` | `AboutPage` | `tentangkami.html` |
| `*` | `NotFoundPage` | (baru) |

Semua halaman dibungkus `<Layout>` (Navbar + `<Outlet>` + Footer), dan scroll kembali ke atas setiap kali route berganti.

### F1. Beranda & Daftar Kost (`/`) — P0
- Hero dengan judul, subjudul, dan kolom pencarian. Slider background tetap boleh dipakai, tetapi harus ada overlay agar teks terbaca, dan dimatikan jika `prefers-reduced-motion`.
- Grid kartu kost dari `src/data/kosts.js`.
- **Pencarian** berdasarkan nama atau alamat, langsung saat mengetik (20 data, tanpa debounce). Enter menutup keyboard dan menggulir ke hasil.
- **Filter** (P0): tipe (Semua / Putra / Putri; di URL tetap `pria`/`wanita`), rentang harga (≤ 400rb, 400–700rb, > 700rb).
- **Urutkan** (P1): harga termurah, harga termahal, nama A–Z.
- Menampilkan jumlah hasil ("12 kost ditemukan") dan empty state dengan tombol "Reset filter".
- Kata kunci dan filter disimpan di URL (`?q=&type=&price=&sort=`): dibaca dari URL saat halaman dibuka, disimpan di state lokal, lalu disalin ke URL dengan `history.replaceState` (navigasi router asinkron membuat ketikan dan klik beruntun hilang), sehingga bisa dibagikan dan tetap ada saat tombol Back ditekan. Ini menggantikan `search.html`.

**AC:** mengetik "wullur" menampilkan 1 kartu. Filter Putri + > 700rb menampilkan Corner Residence, Topaz Place, Gazelle, dan Azalea Hall. Refresh halaman dengan `?type=pria` tetap menampilkan filter Putra aktif.

### F2. Kartu Kost — P0
- Berisi foto (rasio 4:3, `loading="lazy"`), badge tipe, nama, alamat singkat (maksimal 2 baris), harga per bulan, ukuran kamar, dan 2–3 fasilitas utama.
- Seluruh kartu berupa `<Link to={`/kost/${id}`}>`, sehingga bisa difokus dan dibuka di tab baru.

### F3. Detail Kost (`/kost/:id`) — P0
- Galeri: gambar utama yang bisa di-**swipe** di HP, thumbnail, tombol prev/next (desktop), navigasi keyboard ← →, dan lightbox (P1).
- Info: nama, harga, tipe, ukuran, alamat, dan fasilitas dengan icon.
- Peta Google Maps. Jika tidak ada, tampilkan link "Buka di Google Maps" dari alamat, atau pesan "Peta belum tersedia".
- CTA **Hubungi Pemilik** (WhatsApp). Jika kontak kosong, gunakan nomor admin dan beri label "Hubungi Admin".
- CTA **Pesan Sekarang** membuka `/booking?kost=<id>` (memperbaiki B5).
- CTA **Hitung Biaya** membuka `/kalkulator?kost=<id>` (P1).
- ID tidak valid menampilkan halaman "Kost tidak ditemukan" yang tetap memakai navbar dan footer.
- Di HP, CTA ditampilkan sebagai sticky bar di bawah layar.
- Bagian "Kost serupa" (P2): 3 kost dengan tipe yang sama.

### F4. Booking (`/booking`) — P0
- Jika ada `?kost=<id>`, kost itu langsung terpilih.
- Daftar pilih kost dengan pencarian. Di HP diganti menjadi `<select>` atau ditampilkan di atas form.
- Field (masing-masing dengan `<label for>`, `id`, `name`): Nama lengkap, No. WhatsApp (pola `08…`/`62…`, 10–14 digit), Tanggal masuk (min = hari ini), Durasi (1–24 bulan).
- Ringkasan biaya live: harga × durasi = total.
- Validasi inline per field (pesan merah di bawah field, bukan `alert`). Cukup dengan state React biasa, tanpa library form.
- Submit membuka `wa.me/<nomor pemilik atau admin>` dengan pesan berisi nama, no. WA, kost, tanggal, durasi, dan total.

**AC:** submit dengan tanggal kemarin ditolak dengan pesan. Pesan WhatsApp memuat kelima data di atas. Nomor `0813-…` dikonversi menjadi `62813…`.

### F5. Kalkulator Sewa (`/kalkulator`) — P1
- Pilihan kost (opsional) yang otomatis mengisi harga, atau input harga manual.
- Input durasi, dan opsional biaya tambahan (listrik/air per bulan).
- Hasil langsung (live) dalam format `Rp 1.800.000`. Tidak menerima nilai ≤ 0.
- Tombol "Booking kost ini" jika kost dipilih.

### F6. Tentang Kami (`/tentang`) — P1
- Misi, keunggulan, dan cara kerja dalam 3 langkah (Cari → Lihat Detail → Booking via WA).
- Hapus klaim fitur yang tidak ada, atau pastikan fiturnya memang tersedia (B9).
- Kontak dan FAQ singkat (P2).

### F7. Layout Global — P0
- **Mobile (< 768 px):** top bar berisi logo, ditambah **bottom tab bar** (Beranda · Booking · Hitung · Tentang) yang selalu terjangkau jempol. Bottom tab bar disembunyikan di halaman detail karena di sana ada sticky CTA.
- **Desktop:** navbar dengan link dan tombol Booking.
- Navbar transparan di atas hero beranda, berubah solid saat di-scroll. Link/tab aktif ditandai dengan animasi.
- Transisi halaman yang halus, dan progress bar tipis di atas layar saat halaman sedang dimuat.
- Footer yang sama di semua halaman.
- Halaman 404 (`NotFoundPage`) untuk route yang tidak dikenal (P0, karena SPA).

---

## 6. Model Data (`src/data/kosts.js`)

```js
{
  id: 'kostWullur',             // slug unik, dipakai di URL
  name: 'Kost Wullur',          // Title Case; uppercase cukup lewat CSS bila perlu
  type: 'pria',                 // 'pria' | 'wanita'
  price: 300000,                // number (Rupiah / bulan)
  size: '4x4',                  // meter
  address: 'Airmadidi Atas, …',
  images: ['/gambar/kostWullur1.webp', …],  // di public/gambar; images[0] = cover; versi -sm.webp dibuat otomatis
  facilities: ['wifi', 'km-dalam', 'ac'],   // key → label & icon di src/lib/facilities.js
  contact: '6281234567890' | null,          // format wa.me; null → pakai ADMIN_PHONE
  mapUrl: 'https://…' | null
}
```

- Helper di `src/lib/format.js`: `formatRupiah(n)`, `normalizePhone(input)` (dipakai juga untuk validasi input No. WA di form booking), `waLink(phone, text)`, `imageSrcSet(src)`, dan konstanta `ADMIN_PHONE`.
- `src/data/kosts.test.js` memvalidasi setiap kost (id unik, foto ada, fasilitas dikenal, kontak valid). Jalankan `npm test` setiap kali data diubah.
- **Status data (fase 3):** 20 kost sudah dimigrasi. 12 kost belum punya kontak (diarahkan ke admin), Anugerah Wisma belum punya peta, dan kontak Wullur dan Mizpa perlu diverifikasi karena terlihat seperti nomor contoh.
- Foto: 33 file (21 MB) dikompres menjadi 66 file WebP (4,7 MB) lewat `npm run images`.

---

## 7. Kebutuhan Non-Fungsional

| Area | Target |
|---|---|
| **Kompatibilitas** | Chrome, Edge, Firefox, Safari versi terbaru, serta Android Chrome dan iOS Safari |
| **Cara menjalankan** | README berisi: Node.js ≥ 20, `npm install`, `npm run dev` (development), `npm run build` + `npm run preview` (cek hasil build) |
| **Deploy** | Vercel atau Netlify (gratis, otomatis dari GitHub). Tambahkan rewrite SPA (`vercel.json` / `public/_redirects`) agar refresh di `/kost/:id` tidak 404 |
| **Performa** | Gambar dikonversi ke WebP, lebar maksimal 1600 px (cover) dan 400 px (thumbnail), ≤ 200 KB per gambar. Gunakan `loading="lazy"` dan `width`/`height` di `<img>`. Halaman di-lazy-load per route (`React.lazy`). LCP < 2,5 detik |
| **Aksesibilitas** | WCAG 2.1 AA: kontras ≥ 4.5:1, semua kontrol bisa diakses dengan keyboard, focus ring terlihat, `alt` deskriptif, `lang="id"`, dan dukungan `prefers-reduced-motion` (`motion-reduce:` di Tailwind) |
| **SEO** | `<title>` unik per halaman lewat tag `<title>` bawaan React 19 di komponen halaman. Open Graph untuk detail kost (P2, terbatas karena SPA) |
| **Keamanan** | Render data lewat JSX biasa (otomatis di-escape). Dilarang memakai `dangerouslySetInnerHTML`. Link eksternal memakai `target="_blank" rel="noopener noreferrer"` |
| **Kode** | `npm run lint` (oxlint dari template Vite) tanpa error. Komponen kecil dan satu tanggung jawab. Tidak ada warna hex di className (pakai token Tailwind). File lama di §2.1 dihapus setelah migrasi selesai |

### 7.1 Standar Mobile & UX (wajib)

| Area | Standar |
|---|---|
| **Perangkat uji** | 360×740 (Android kecil), 390×844 (iPhone), 412×915 (Android besar). Tidak boleh ada scroll horizontal |
| **Jangkauan jempol** | Navigasi utama dan CTA utama (Pesan, Hubungi, Kirim Booking) ada di setengah bawah layar: bottom tab bar dan sticky CTA |
| **Target sentuh** | Minimal 44×44 px, dengan jarak antar target ≥ 8 px |
| **Safe area** | Bar bawah memakai `env(safe-area-inset-bottom)` agar tidak tertutup home indicator iPhone (`viewport-fit=cover`) |
| **Feedback instan** | Setiap tombol, chip, tab, dan kartu mengecil sedikit saat ditekan (`active:scale`). Tidak ada highlight biru bawaan saat di-tap |
| **Transisi halaman** | Cross-fade dan geser halus antar route lewat React `<ViewTransition>`. Foto kartu "terbang" ke galeri detail (shared element, fase 4–5) |
| **Loading** | Skeleton beranimasi untuk konten yang dimuat, dan progress bar di atas layar saat pindah halaman. Tidak pernah ada layar kosong |
| **Animasi masuk** | Konten halaman muncul dengan fade-up bertahap (stagger). Section di bawah lipatan muncul saat di-scroll |
| **Gesture** | Galeri foto bisa di-swipe (CSS scroll-snap). Filter bisa di-scroll horizontal |
| **Keyboard HP** | Input memakai `inputMode` dan `type` yang tepat (`tel`, `numeric`, `date`), sehingga keyboard yang muncul sesuai |
| **Stabil** | Tidak ada pergeseran layout (CLS < 0.1): gambar selalu punya `width`/`height` atau `aspect-ratio` |
| **Aksesibilitas gerak** | Semua animasi dimatikan jika pengguna memilih "kurangi gerakan" (`prefers-reduced-motion`) |

---

## 8. Keputusan Teknis

| # | Keputusan | Status |
|---|---|---|
| D1 | Stack: **React 19 + Vite + Tailwind CSS v4 + React Router**, JavaScript (JSX). TypeScript opsional | ✅ Disepakati |
| D2 | Navbar/footer: satu komponen `<Navbar>` / `<Footer>` di `<Layout>` | ✅ Otomatis dengan React |
| D3 | `search.html` dihapus, digantikan pencarian dan filter di beranda dengan state di URL | Rekomendasi |
| D4 | Kost tanpa kontak diarahkan ke nomor admin `628981548999` dengan label yang jelas | Rekomendasi |
| D5 | Ikon: `lucide-react`, ditambah satu komponen SVG untuk logo WhatsApp (Lucide tidak menyediakan ikon brand) | Rekomendasi |
| D6 | Tanpa state management global (Redux, Zustand) dan tanpa library form. Data statis cukup di-import, filter disimpan di URL | Rekomendasi |
| D7 | Proyek Vite dibuat di root repo; file HTML/CSS/JS lama dipindah ke `legacy/` selama migrasi, lalu dihapus | ✅ Selesai |
| D8 | Navigasi mobile: bottom tab bar, bukan hamburger | ✅ Disepakati |
| D9 | Animasi: CSS native (keyframes Tailwind, scroll-driven animation) dan React `<ViewTransition>`, **tanpa library animasi**. Baru tambahkan `motion` jika butuh gesture drag (misalnya bottom sheet yang bisa ditarik) | ✅ Diterapkan |
| D10 | Router mode data (`createBrowserRouter` + `lazy`): halaman dimuat sebelum transisi dan posisi scroll dipulihkan (`<ScrollRestoration>`) | ✅ Diterapkan |

### Struktur folder

```
public/
  gambar/                 ← foto kost (WebP)
src/
  main.jsx                ← createRoot + RouterProvider
  router.jsx              ← definisi route (lazy per halaman)
  index.css               ← @import "tailwindcss" + @theme (token Design System)
  data/kosts.js
  lib/format.js           ← formatRupiah, waLink, normalizePhone
  lib/facilities.js       ← key fasilitas → label + ikon
  hooks/useScrolled.js
  components/
    layout/  Layout.jsx · Navbar.jsx · BottomNav.jsx · Footer.jsx
    ui/      Button.jsx · Badge.jsx · Field.jsx · Chip.jsx · EmptyState.jsx · Container.jsx · PageHeader.jsx
    kost/    KostCard.jsx · SearchBar.jsx · FilterBar.jsx · Gallery.jsx · CostSummary.jsx
  lib/       format.js · facilities.js · filterKosts.js (+ *.test.js)
  pages/
    HomePage.jsx · DetailPage.jsx · BookingPage.jsx · CalculatorPage.jsx · AboutPage.jsx · NotFoundPage.jsx
```

---

## 9. Rencana Rilis (urutan kerja)

1. **Setup:** `npm create vite@latest` (React), pasang Tailwind v4 (`@tailwindcss/vite`), React Router, lucide-react. Pindahkan file lama ke `legacy/` dan tulis README.
2. **Fondasi:** token `@theme`, token animasi, dan komponen `ui/` (lihat Design System), `Layout` + Navbar + BottomNav + Footer, transisi halaman, routing dan 404.
3. **Data:** migrasi ke `src/data/kosts.js` (§6), `lib/format.js`, kompres gambar ke `public/gambar`.
4. **Beranda:** `KostCard`, pencarian, `FilterBar`, urutkan, state di URL.
5. **Detail:** `Gallery`, CTA yang membawa `?kost=`, sticky CTA di mobile, fallback peta.
6. **Booking:** preselect, validasi, `CostSummary`, pesan WhatsApp lengkap.
7. **Kalkulator dan Tentang Kami.**
8. **QA dan deploy:** checklist §10 di HP dan desktop, Lighthouse, deploy ke Vercel/Netlify, hapus `legacy/`.

---

## 10. Checklist QA (Definition of Done)

- [ ] `npm run build` sukses dan `npm run lint` tanpa error.
- [ ] Tidak ada error di console di semua route.
- [ ] Refresh langsung di `/kost/kostWullur` pada URL deploy tidak menghasilkan 404.
- [ ] Navbar terbaca, bottom tab bar berfungsi, dan tidak tertutup home indicator di 360, 390, dan 412 px.
- [ ] Tidak ada scroll horizontal di 360 px.
- [ ] Semua poin §7.1 terpenuhi: feedback tekan, transisi halaman, skeleton, swipe galeri, keyboard HP sesuai.
- [ ] Dengan "kurangi gerakan" aktif, tidak ada animasi yang berjalan.
- [ ] Pencarian, filter, dan urutkan memberi hasil benar. URL bisa dibagikan.
- [ ] Semua 20 kost bisa dibuka detailnya dan gambar tampil. ID salah menampilkan "Kost tidak ditemukan".
- [ ] Pesan Sekarang → booking dengan kost sudah terpilih.
- [ ] Validasi booking menolak input salah. Pesan WhatsApp lengkap.
- [ ] Kalkulator menolak nilai ≤ 0 dan menampilkan format Rupiah.
- [ ] Semua kontrol bisa diakses dengan Tab dan focus terlihat.
- [ ] Lighthouse ≥ 90 (Performance, Accessibility, Best Practices) di beranda.
- [ ] Folder `legacy/` dan file lama sudah dihapus.
