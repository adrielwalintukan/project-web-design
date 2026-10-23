# Design System — KostFinder UNKLAB v2

Pedoman visual dan komponen untuk refactor dengan **React + Vite + Tailwind CSS v4**.

- Semua token didefinisikan **satu kali** di `src/index.css` lewat blok `@theme` milik Tailwind. Dari situ Tailwind otomatis membuat utility class seperti `bg-primary-600`, `text-muted`, `rounded-card`, dan `shadow-card`.
- Komponen ditulis sebagai komponen React di `src/components/`. Halaman cukup menyusun komponen tersebut.
- Tidak ada warna hex di `className`, tidak ada `style={{…}}` kecuali untuk nilai dinamis, dan tidak ada file CSS per halaman.

Kebutuhan fungsional dan struktur folder ada di [PRD.md](PRD.md).

---

## 1. Prinsip

1. **Foto adalah bintangnya.** Kost dipilih dari foto, jadi UI di sekitarnya dibuat tenang dan netral, dengan satu warna aksen.
2. **Jelas dulu, efek kemudian.** Efek kaca (glassmorphism) dan teks putih di atas foto hanya di hero. Halaman lain memakai permukaan solid agar teks selalu terbaca (masalah navbar B2 di PRD).
3. **Mobile adalah produk utama.** Desain dan uji di 360–412 px dulu, desktop menyusul. Tulis class tanpa prefix untuk mobile, lalu tambahkan `md:` dan `lg:`. Navigasi dan aksi utama selalu di zona jempol (bawah layar).
4. **Konsisten.** Satu `<Button>`, satu `<Field>`, satu `<Navbar>`. Jika sebuah pola dipakai dua kali, jadikan komponen.
5. **Terasa hidup.** Setiap sentuhan dibalas (tekan, transisi, loading), tapi animasi singkat dan tidak menghalangi. Standar lengkap di PRD §7.1.

---

## 2. Token (`src/index.css`)

```css
@import "tailwindcss";

@theme {
  /* ---------- Warna ---------- */
  --color-primary-50:  #EEF4FF;
  --color-primary-100: #DCE7FE;
  --color-primary-500: #3B6FF6;
  --color-primary-600: #2453E0;   /* tombol utama, link */
  --color-primary-700: #1C40B0;   /* hover */

  --color-accent-500:  #F59E0B;   /* highlight, badge "Baru" */

  --color-whatsapp:       #25D366;
  --color-whatsapp-hover: #1EBE5A;

  --color-pria-bg:   #E0EDFF;  --color-pria-fg:   #1D4ED8;
  --color-wanita-bg: #FDE7F1;  --color-wanita-fg: #BE185D;

  /* Alias peran → class: bg-page, bg-surface, border-line, text-ink, text-muted */
  --color-page:    #F8FAFC;   /* = slate-50 */
  --color-surface: #FFFFFF;
  --color-line:    #E2E8F0;   /* = slate-200 */
  --color-ink:     #0F172A;   /* = slate-900 */
  --color-muted:   #475569;   /* = slate-600 */

  /* ---------- Tipografi ---------- */
  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --text-hero: clamp(2.25rem, 1.4rem + 4vw, 3.75rem);
  --text-hero--line-height: 1.1;

  /* ---------- Radius & bayangan ---------- */
  --radius-card: 1rem;       /* 16 px → rounded-card */
  --radius-panel: 1.5rem;    /* 24 px → rounded-panel */
  --shadow-card:  0 1px 2px rgb(15 23 42 / .06);
  --shadow-raise: 0 12px 32px rgb(15 23 42 / .12);

  /* ---------- Motion ---------- */
  --ease-out-soft: cubic-bezier(.2, .8, .2, 1);
}

@layer base {
  html { @apply bg-page text-ink antialiased; }
  :focus-visible { @apply outline-2 outline-offset-2 outline-primary-500; }
}
```

Palet slate, skala spacing (4 px), breakpoint, dan radius standar (`rounded-lg`, `rounded-xl`, `rounded-full`) sudah bawaan Tailwind, jadi tidak perlu ditulis ulang.

### 2.1 Pemakaian warna

| Peran | Class |
|---|---|
| Background halaman | `bg-page` |
| Kartu, navbar solid, modal | `bg-surface border border-line` |
| Judul & body | `text-ink` |
| Alamat, label sekunder | `text-muted` |
| Tombol utama, link, filter aktif | `bg-primary-600 hover:bg-primary-700 text-white` |
| Harga | `text-ink font-bold` (lebih mudah dibaca daripada teks berwarna) |
| Hubungi Pemilik | `bg-whatsapp hover:bg-whatsapp-hover text-white` |
| Error form | `text-red-600 border-red-600` |

Palet lama (`#6C63FF` ungu + teal) diganti dengan biru yang lebih tenang dan dapat dipercaya. Semua pasangan teks/latar di atas memenuhi kontras WCAG AA (≥ 4.5:1).

> **Dark mode:** di luar scope v2. Karena komponen memakai alias peran (`bg-surface`, `text-ink`), dark mode nanti cukup dibuat dengan mendefinisikan ulang alias tersebut.

---

## 3. Tipografi

Satu keluarga font: **Plus Jakarta Sans** (dibuat oleh desainer Indonesia), menggantikan Poppins + Inter. Font dimuat di `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

| Elemen | Class |
|---|---|
| Hero h1 | `text-hero font-extrabold tracking-tight` |
| Judul halaman h1 | `text-3xl md:text-4xl font-bold` |
| Judul section h2 | `text-2xl md:text-3xl font-bold` |
| Judul kartu | `text-lg font-bold line-clamp-1` |
| Body | `text-base` (16 px), `leading-relaxed` untuk paragraf panjang |
| Label / meta | `text-sm font-medium text-muted` |
| Badge / caption | `text-xs font-semibold` |

Nama kost ditulis **Title Case** di data ("Kost Wullur"), bukan huruf kapital semua.

---

## 4. Layout & Spacing

- **Container:** komponen `<Container>` (`mx-auto max-w-7xl px-4 md:px-6`).
- **Jarak antar section:** `py-12 md:py-20`. Jarak dalam kartu `p-4 md:p-5`. Gap grid `gap-6`.
- **Breakpoint bawaan Tailwind:** `sm 640`, `md 768`, `lg 1024`, `xl 1280`.
- **Grid kartu:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`.
- **Navbar:** tinggi `h-14 md:h-16`. Konten halaman non-hero tidak perlu `padding-top` karena navbar memakai `sticky`, bukan `fixed`.
- **Bottom tab bar (mobile):** tinggi `h-16` + safe area. Layout sudah memberi `pb-[calc(4rem+env(safe-area-inset-bottom))]`, jadi halaman tidak perlu menambah padding sendiri.

---

## 5. Ikon & Gambar

- **Ikon:** `lucide-react` (`<MapPin size={16} aria-hidden />`). Ukuran 16/20/24. Logo WhatsApp dibuat sebagai komponen `<WhatsAppIcon />` (SVG inline), karena Lucide tidak menyediakan ikon brand.
- **Map fasilitas → ikon** disimpan di satu tempat (`src/lib/facilities.js`):

| Key | Label | Ikon Lucide |
|---|---|---|
| `wifi` | Wi-Fi Gratis | `Wifi` |
| `km-dalam` | Kamar Mandi Dalam | `Bath` |
| `ac` | AC | `Snowflake` |
| `dapur` / `dapur-bersama` | Dapur / Dapur Bersama | `CookingPot` |
| `keamanan` | Keamanan 24 Jam | `ShieldCheck` |
| `kasur` | Kasur / Tempat Tidur | `BedDouble` |
| `lemari` | Lemari | `Archive` |
| `meja` | Meja | `Table` |
| `kursi` | Kursi | `Armchair` |
| `tv` | TV | `Tv` |
| `kulkas` | Kulkas Bersama | `Refrigerator` |
| (tidak dikenal) | sesuai data | `CircleCheck` |

- **Foto:** kartu `aspect-[4/3] object-cover`, galeri utama `aspect-[16/10]`, thumbnail `aspect-square`. Format WebP ≤ 200 KB di `public/gambar/`. Selalu cantumkan `width`, `height`, `loading="lazy"` (kecuali foto hero), dan `alt={`Foto ${kost.name}`}`.

---

## 6. Komponen

Setiap komponen menerima `className` tambahan dan meneruskan props lain (`...props`) ke elemen aslinya. Untuk menggabungkan class cukup pakai template string. Library `clsx` boleh dipakai jika variannya mulai banyak.

### 6.1 `<Button>` — `components/ui/Button.jsx`

```jsx
<Button>Cari</Button>
<Button variant="secondary" size="sm">Reset filter</Button>
<Button variant="whatsapp" as="a" href={waLink(...)} target="_blank">Hubungi Pemilik</Button>
<Button as={Link} to={`/booking?kost=${id}`} block>Pesan Sekarang</Button>
```

| Prop `variant` | Class |
|---|---|
| `primary` (default) | `bg-primary-600 text-white hover:bg-primary-700` |
| `secondary` | `bg-surface text-ink border border-line hover:bg-slate-50` |
| `whatsapp` | `bg-whatsapp text-white hover:bg-whatsapp-hover` |
| `ghost` | `text-primary-600 hover:bg-primary-50` |

- Dasar: `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed`.
- `size`: `md` = `h-11 px-5` (44 px, target sentuh minimum), `sm` = `h-9 px-4 text-sm`. `block` menambah `w-full`.
- Prop `as` dipakai untuk merender `<a>` atau `<Link>`. Gunakan `<button>` untuk aksi dan link untuk navigasi.

### 6.2 `<Field>` — `components/ui/Field.jsx`

```jsx
<Field label="Nomor WhatsApp" name="phone" type="tel" inputMode="numeric"
       placeholder="08xxxxxxxxxx" error={errors.phone} required />
```

- Merender `<label htmlFor>`, `<input id aria-invalid aria-describedby>`, dan `<p id="…-error">` saat ada error. `id` dibuat otomatis dengan `useId()`.
- Input: `h-12 w-full rounded-lg border border-line bg-surface px-4 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20`. Saat error: `border-red-600`.
- Varian `<SelectField>` untuk dropdown. Prop `prefix="Rp"` untuk input harga.

### 6.3 `<SearchBar>` (hero)

`<form role="search">` berbentuk pill putih (`rounded-full shadow-raise p-2 flex`) berisi ikon `Search`, input, dan `<Button>`. Di < 640 px tombol hanya menampilkan ikon (dengan `aria-label="Cari"`). Submit memperbarui `?q=` di URL.

### 6.4 `<FilterBar>` + `<Chip>`

- Satu baris yang bisa di-scroll horizontal di HP (`flex gap-2 overflow-x-auto`): `Semua · Pria · Wanita | ≤ 400rb · 400–700rb · > 700rb`, ditambah `<select>` Urutkan di kanan, serta teks "12 kost ditemukan".
- `<Chip active>` merender `<button aria-pressed>` dengan class `h-9 px-4 rounded-full text-sm font-medium`. Tidak aktif: `bg-slate-100 text-ink`. Aktif: `bg-primary-600 text-white`.
- Semua nilai dibaca dan ditulis lewat `useSearchParams`, bukan disimpan di `useState`.

### 6.5 `<KostCard kost={…} />`

```
┌──────────────────────────┐
│  [ foto 4:3 ]   (Wanita) │  ← <Badge> di pojok kiri atas
├──────────────────────────┤
│ Corner Residence         │  text-lg font-bold line-clamp-1
│ 📍 Airmadidi Atas        │  text-sm text-muted line-clamp-2
│ ▢ 5x4 m · ❄ AC · 📶 WiFi │  maksimal 3 fasilitas
│ Rp 850.000 /bulan        │  font-bold; "/bulan" text-muted
└──────────────────────────┘
```

- Root berupa `<Link to={`/kost/${kost.id}`} className="group block overflow-hidden rounded-card border border-line bg-surface shadow-card">`.
- Hover (hanya di perangkat dengan pointer): `hover:-translate-y-1 hover:shadow-raise`, foto `group-hover:scale-105`, `transition duration-200`. Efek lama (`-15px`, `scale(1.15)`) terlalu berlebihan.
- Tekan (HP): `active:scale-[0.98]`.
- Masuk: di grid, setiap kartu memakai `animate-fade-up stagger` dengan `style={{ '--i': index }}`, sehingga kartu muncul berurutan.
- Shared element: foto kartu dibungkus `<ViewTransition name={`kost-${id}`}>`, dan gambar utama di galeri detail memakai nama yang sama, sehingga foto "terbang" dari kartu ke halaman detail.
- `<KostCardSkeleton>`: blok dengan class `skeleton` (shimmer) dengan ukuran yang sama.

### 6.6 `<Badge>`

`<Badge type="pria|wanita" />` dengan class `rounded-full px-2.5 py-0.5 text-xs font-semibold`. Pria: `bg-pria-bg text-pria-fg`. Wanita: `bg-wanita-bg text-wanita-fg`. Badge "Ter-Approve" hanya ditampilkan jika datanya ada (PRD B16).

### 6.7 `<Navbar>` (top bar)

- `sticky top-0 z-50 h-14 md:h-16`.
- **Solid** (default): `bg-surface/90 backdrop-blur border-b border-line text-ink`.
- **Transparan** (hanya di `/` saat posisi di atas hero): `bg-transparent text-white`. Berubah ke solid setelah scroll lebih dari 40 px (hook `useScrolled(40)`), dengan `transition-colors duration-300`. Di beranda, hero diberi `-mt-14 pt-14 md:-mt-16 md:pt-16` agar terlihat di bawah navbar.
- Mobile: hanya logo. Desktop (`md:`): Beranda · Kalkulator · Tentang Kami · `<Button size="sm">Booking</Button>`.
- Link aktif (`<NavLink>`, otomatis `aria-current="page"`): `font-semibold` dengan garis bawah yang memanjang dari kiri (`after:scale-x-0` → `after:scale-x-100`). Saat hover, garis bawah yang sama muncul.

### 6.7b `<BottomNav>` (mobile)

```
┌─────────────────────────────────────┐
│  ( 🏠 )     📅       🧮       ⓘ     │
│ Beranda   Booking   Hitung  Tentang │
└─────────────────────────────────────┘
```

- `fixed inset-x-0 bottom-0 z-50 md:hidden`, `bg-surface/95 backdrop-blur border-t border-line`, `pb-[env(safe-area-inset-bottom)]`.
- 4 tab `grid-cols-4`, masing-masing `h-16`: ikon 22 px + label `text-xs`.
- Tab aktif: `text-primary-600`, ikon dengan `strokeWidth={2.5}`, dan pil `bg-primary-100` di belakang ikon yang muncul dengan `animate-pop` (efek spring). Tab lain `text-muted`.
- Tekan: `active:scale-90`.
- Disembunyikan di `/kost/:id` karena halaman detail punya `<StickyCta>`.

### 6.8 `<Footer>`

`bg-slate-900 text-white/70`. Grid `md:grid-cols-3` (Brand · Navigasi · Kontak), 1 kolom di HP. Baris copyright dengan `border-t border-white/10`. Tahun diisi dengan `new Date().getFullYear()`.

### 6.9 `<Gallery images={…} name={…} />`

- Gambar utama `aspect-[16/10] rounded-card` berupa track horizontal `flex snap-x snap-mandatory overflow-x-auto` (setiap foto `snap-center shrink-0 w-full`), sehingga di HP cukup di-swipe. Foto aktif dideteksi dari posisi scroll.
- Di HP: indikator titik di bawah gambar (titik aktif memanjang). Di desktop: tombol prev/next bulat (`size-10 rounded-full bg-white/90`) dan penghitung "2 / 4".
- Thumbnail berupa `<button aria-label="Foto 2 dari 4">` berukuran `size-18 rounded-lg`. Thumbnail aktif diberi `ring-2 ring-primary-600`.
- Tombol ← → di keyboard berfungsi saat galeri difokus.
- Lightbox (P1): elemen `<dialog>` native yang dibuka dengan `showModal()` dan ditutup dengan Esc.

### 6.10 Info Panel & `<StickyCta>` (detail)

- Desktop: panel kanan `lg:sticky lg:top-24`.
- Mobile: `fixed inset-x-0 bottom-0 bg-surface/95 backdrop-blur border-t border-line p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3 lg:hidden`, berisi harga di kiri, dan tombol WA (ikon) serta "Pesan" di kanan. Muncul dengan animasi naik dari bawah. Halaman diberi `pb-28 lg:pb-0` agar konten tidak tertutup.

### 6.11 `<EmptyState>`, `<NotFoundPage>`, Toast

- **EmptyState:** props `icon`, `title`, `description`, `action`. Ikon 48 px `text-slate-400`.
- **Kost tidak ditemukan / 404:** tetap memakai Layout dengan tombol "Kembali ke Beranda".
- **Toast** (opsional): pengganti `alert()`. Cukup sebuah komponen kecil dengan `role="status"`, tanpa library.

### 6.12 `<CostSummary price={…} months={…} extra={…} />`

Kotak `bg-primary-50 rounded-xl p-5` dengan `aria-live="polite"`:
```
Harga per bulan      Rp 850.000
Durasi               × 6 bulan
────────────────────────────────
Total                Rp 5.100.000   ← text-2xl font-extrabold
```
Dipakai bersama di halaman Booking dan Kalkulator.

---

## 7. Layout Halaman

| Halaman | Struktur (mobile → desktop) |
|---|---|
| **HomePage** | Navbar transparan → Hero (foto + overlay `bg-black/60`, h1, subjudul, SearchBar) → FilterBar + jumlah hasil → KostGrid → "Cara Kerja" 3 langkah → Footer |
| **DetailPage** | Link Kembali → Gallery → Info (judul, Badge, harga, meta) → Fasilitas `grid-cols-2` → Alamat + Peta → Kost serupa. Desktop: `lg:grid-cols-3`, konten `lg:col-span-2` dan info panel sticky di kolom kanan |
| **BookingPage** | Judul → (mobile) kost terpilih / SelectField kost → Form → CostSummary → Submit. Desktop: `lg:grid-cols-12`, pilih kost `col-span-5`, form `col-span-7` |
| **CalculatorPage** | Kartu tengah `max-w-xl mx-auto`: pilih kost (opsional) → harga → durasi → biaya tambahan → CostSummary live |
| **AboutPage** | PageHeader → Misi → 3 kartu keunggulan (`md:grid-cols-3`) → Cara kerja → Kontak |

`<PageHeader title subtitle>` untuk halaman non-beranda: `bg-primary-50 py-12`, judul `text-3xl font-bold`, subjudul `text-muted`. Gradient ungu dengan sudut bulat 50 px yang lama tidak dipakai lagi.

---

## 8. Motion

Semua animasi memakai CSS native dan React `<ViewTransition>`, **tanpa library** (PRD D9). Hanya animasikan `transform` dan `opacity` agar tetap 60 fps di HP.

### 8.1 Token (`src/index.css`)

| Token / class | Nilai | Pemakaian |
|---|---|---|
| `ease-out-soft` | `cubic-bezier(.2,.8,.2,1)` | Default untuk hampir semua transisi |
| `ease-spring` | `cubic-bezier(.34,1.56,.64,1)` | Efek "memantul" kecil: pil tab aktif, badge baru |
| `animate-fade-up` | 500 ms, naik 16 px | Konten halaman dan kartu saat masuk |
| `animate-fade-in` | 300 ms | Overlay, gambar selesai dimuat |
| `animate-pop` | 300 ms, scale 0.6 → 1 spring | Indikator aktif, ikon sukses |
| `animate-progress` | 2 s, scaleX 0 → 0.9 | Progress bar saat pindah halaman |
| `stagger` | `animation-delay: calc(var(--i) * 60ms)` | Daftar yang muncul berurutan: `style={{ '--i': i }}` |
| `reveal` | scroll-driven `animation-timeline: view()` | Section yang muncul saat di-scroll. Browser yang belum mendukung langsung menampilkannya |
| `skeleton` | gradien shimmer 1.4 s | Placeholder loading |

### 8.2 Pola

| Interaksi | Implementasi |
|---|---|
| Pindah halaman | `<ViewTransition default="page">` membungkus `<main>` di Layout: halaman lama memudar 120 ms, halaman baru naik dan muncul 280 ms |
| Kartu → detail | Shared element `<ViewTransition name={`kost-${id}`}>` di foto kartu dan gambar utama detail |
| Tekan tombol/chip/tab | `active:scale-[0.97]` / `active:scale-95` / `active:scale-90` dengan `transition-transform duration-200` |
| Navbar scroll | Transparan → solid, `transition-colors duration-300` |
| Pindah tab bawah | Pil latar ikon `animate-pop` |
| Hero | Judul `animate-fade-up`, subjudul dan search bar `animate-fade-up stagger` (`--i` 2 dan 4) |
| Slider hero | Dua `<img>` bertumpuk di-crossfade lewat `opacity` (700 ms), interval 6 detik, berhenti saat tab tidak terlihat. Jangan memakai `background-attachment: fixed` (PRD B12) |
| Hasil filter berubah | Grid di-render ulang dengan `animate-fade-up stagger` (maksimal 8 kartu pertama diberi delay) |
| Galeri | Swipe native (scroll-snap), `scroll-behavior: smooth` untuk tombol prev/next |
| Form error | Pesan error `animate-fade-in`. Ringkasan biaya angka berubah dengan `animate-fade-in` (key = nilai) |
| Toast | Naik dari bawah `animate-fade-up`, hilang otomatis setelah 3 detik |

### 8.3 Aturan

- Durasi: 120–300 ms untuk feedback dan transisi, maksimal 500 ms untuk animasi masuk. Tidak ada animasi yang membuat pengguna menunggu.
- Jangan menganimasikan `width`, `height`, `top`, atau `left`. Gunakan `transform`.
- `prefers-reduced-motion: reduce` sudah dimatikan secara global di `index.css` (termasuk view transition). Jangan menambah animasi yang mengabaikannya.

---

## 9. Aksesibilitas (wajib)

- Kontras teks ≥ 4.5:1, teks besar dan ikon UI ≥ 3:1. Teks di atas foto hero wajib memakai overlay.
- Focus ring global sudah ada di `@layer base`. Jangan pernah memakai `outline-none` tanpa pengganti.
- Target sentuh ≥ 44×44 px (`h-11`).
- Satu `<h1>` per halaman, urutan heading berurutan. Gunakan landmark `<header> <nav> <main> <footer>`, yang dirender oleh Layout.
- Setiap input punya label lewat `<Field>`. Error dihubungkan dengan `aria-describedby`.
- Tambahkan link "Lewati ke konten" (`sr-only focus:not-sr-only`) di awal Layout.
- Saat route berganti, scroll ke atas dan perbarui `<title>`.

---

## 10. Konvensi Kode

- Satu komponen per file, nama file PascalCase (`KostCard.jsx`). Hook diawali `use` dan disimpan di `src/hooks/` (`useScrolled.js`).
- Komponen halaman hanya berisi susunan komponen dan logika halaman. Logika murni (filter, format) ditaruh di `src/lib/` agar mudah dites.
- Gunakan named import untuk ikon (`import { MapPin } from 'lucide-react'`).
- Jangan pakai `dangerouslySetInnerHTML`. Jangan pakai warna hex di `className`. Jika class Tailwind sangat panjang dan berulang, jadikan komponen, bukan `@apply`.
- Urutan class mengikuti plugin `prettier-plugin-tailwindcss` (opsional, tetapi membantu konsistensi tim).
