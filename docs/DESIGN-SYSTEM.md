# Design System — KostFinder UNKLAB v2

Pedoman visual dan komponen untuk refactor dengan **React + Vite + Tailwind CSS v4**.

- Semua token didefinisikan **satu kali** di `src/index.css` lewat blok `@theme` milik Tailwind. Dari situ Tailwind otomatis membuat utility class seperti `bg-primary-600`, `text-muted`, `rounded-card`, dan `shadow-card`.
- Komponen ditulis sebagai komponen React di `src/components/`. Halaman cukup menyusun komponen tersebut.
- Tidak ada warna hex di `className`, tidak ada `style={{…}}` kecuali untuk nilai dinamis, dan tidak ada file CSS per halaman.

Kebutuhan fungsional dan struktur folder ada di [PRD.md](PRD.md).

---

## 1. Prinsip

1. **Foto adalah bintangnya.** Kost dipilih dari foto, jadi UI di sekitarnya dibuat tenang dan netral, dengan satu warna aksen.
2. **Jelas dulu, efek kemudian.** Glassmorphism dan animasi hanya di hero. Halaman lain memakai permukaan solid agar teks selalu terbaca (masalah navbar B2 di PRD).
3. **Mobile-first.** Mayoritas mahasiswa membuka website dari HP. Tulis class tanpa prefix untuk mobile, lalu tambahkan `md:` dan `lg:` untuk layar lebih besar.
4. **Konsisten.** Satu `<Button>`, satu `<Field>`, satu `<Navbar>`. Jika sebuah pola dipakai dua kali, jadikan komponen.

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
  --color-page:    var(--color-slate-50);
  --color-surface: #FFFFFF;
  --color-line:    var(--color-slate-200);
  --color-ink:     var(--color-slate-900);
  --color-muted:   var(--color-slate-600);

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

- **Container:** `mx-auto max-w-7xl px-4 md:px-6`, dibuat sebagai komponen `<Container>` atau class yang konsisten.
- **Jarak antar section:** `py-12 md:py-20`. Jarak dalam kartu `p-4 md:p-5`. Gap grid `gap-6`.
- **Breakpoint bawaan Tailwind:** `sm 640`, `md 768`, `lg 1024`, `xl 1280`.
- **Grid kartu:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`.
- **Navbar:** tinggi `h-16`. Konten halaman non-hero tidak perlu `padding-top` karena navbar memakai `sticky`, bukan `fixed`.

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
- `motion-reduce:transform-none` untuk menonaktifkan gerakan.
- `<KostCardSkeleton>`: blok `bg-slate-100 animate-pulse` dengan ukuran yang sama.

### 6.6 `<Badge>`

`<Badge type="pria|wanita" />` dengan class `rounded-full px-2.5 py-0.5 text-xs font-semibold`. Pria: `bg-pria-bg text-pria-fg`. Wanita: `bg-wanita-bg text-wanita-fg`. Badge "Ter-Approve" hanya ditampilkan jika datanya ada (PRD B16).

### 6.7 `<Navbar>`

- `sticky top-0 z-50 h-16`.
- **Solid** (default): `bg-surface/90 backdrop-blur border-b border-line text-ink`.
- **Transparan** (hanya di `/` saat posisi di atas hero): `bg-transparent text-white`. Berubah ke solid setelah scroll lebih dari 40 px (hook `useScrolled(40)`). Di beranda, hero diberi `-mt-16` agar terlihat di bawah navbar.
- Kiri: logo "Kost<span class="text-primary-600">Finder</span>". Kanan: Beranda · Kalkulator · Tentang Kami · `<Button size="sm">Booking</Button>`.
- Link memakai `<NavLink>`. Link aktif otomatis mendapat `aria-current="page"` dan diberi style `font-semibold text-primary-600`.
- < 768 px: tombol hamburger (`Menu` / `X` dari Lucide, dengan `aria-expanded` dan `aria-controls`) membuka panel berisi link vertikal. Panel ditutup saat route berganti, saat Esc ditekan, atau saat klik di luar panel.

### 6.8 `<Footer>`

`bg-slate-900 text-white/70`. Grid `md:grid-cols-3` (Brand · Navigasi · Kontak), 1 kolom di HP. Baris copyright dengan `border-t border-white/10`. Tahun diisi dengan `new Date().getFullYear()`.

### 6.9 `<Gallery images={…} name={…} />`

- Gambar utama `aspect-[16/10] rounded-card`. Tombol prev/next bulat (`size-10 rounded-full bg-white/90`) di kiri dan kanan. Penghitung "2 / 4" di pojok kanan bawah.
- Thumbnail berupa `<button aria-label="Foto 2 dari 4">` berukuran `size-18 rounded-lg`. Thumbnail aktif diberi `ring-2 ring-primary-600`.
- Tombol ← → di keyboard berfungsi saat galeri difokus.
- Lightbox (P1): elemen `<dialog>` native yang dibuka dengan `showModal()` dan ditutup dengan Esc.

### 6.10 Info Panel & `<StickyCta>` (detail)

- Desktop: panel kanan `lg:sticky lg:top-24`.
- Mobile: `fixed inset-x-0 bottom-0 bg-surface border-t border-line p-3 flex items-center gap-3 lg:hidden`, berisi harga di kiri, dan tombol WA (ikon) serta "Pesan" di kanan. Halaman diberi `pb-24 lg:pb-0` agar konten tidak tertutup.

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

- Gunakan transisi standar Tailwind: `transition duration-200 ease-out-soft`. Hanya animasikan `transform` dan `opacity`.
- Fade-in hero cukup dengan animasi CSS sederhana (sekitar 400 ms). Tidak perlu library animasi (Framer Motion).
- Slider hero: dua `<img>` bertumpuk yang di-crossfade lewat `opacity`, bukan mengganti `background-image`. Interval 6 detik, dibersihkan di cleanup `useEffect`, dan berhenti saat tab tidak terlihat.
- Hapus `background-attachment: fixed` (PRD B12).
- Hormati pengaturan reduced motion: `motion-reduce:transition-none motion-reduce:animate-none`, dan slider tidak berputar jika `matchMedia('(prefers-reduced-motion: reduce)')` bernilai true.

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

- Satu komponen per file, nama file PascalCase (`KostCard.jsx`). Hook diawali `use` (`useScrolled.js`).
- Komponen halaman hanya berisi susunan komponen dan logika halaman. Logika murni (filter, format) ditaruh di `src/lib/` agar mudah dites.
- Gunakan named import untuk ikon (`import { MapPin } from 'lucide-react'`).
- Jangan pakai `dangerouslySetInnerHTML`. Jangan pakai warna hex di `className`. Jika class Tailwind sangat panjang dan berulang, jadikan komponen, bukan `@apply`.
- Urutan class mengikuti plugin `prettier-plugin-tailwindcss` (opsional, tetapi membantu konsistensi tim).
