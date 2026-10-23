# Design System — KostFinder UNKLAB v2

Pedoman visual dan komponen untuk refactor dengan **React + Vite + Tailwind CSS v4**.

- Semua token didefinisikan **satu kali** di `src/index.css` lewat blok `@theme` milik Tailwind. Dari situ Tailwind otomatis membuat utility class seperti `bg-primary-600`, `text-muted`, `rounded-card`, dan `shadow-raise`.
- Komponen ditulis sebagai komponen React di `src/components/`. Halaman cukup menyusun komponen tersebut.
- Tidak ada warna hex di `className`, tidak ada `style={{…}}` kecuali untuk nilai dinamis, dan tidak ada file CSS per halaman.

Kebutuhan fungsional dan struktur folder ada di [PRD.md](PRD.md).

---

## 1. Prinsip

1. **Foto adalah bintangnya.** Kost dipilih dari foto, jadi UI di sekitarnya dibuat tenang dan netral. Hanya ada satu warna aksen, dan dipakai hemat.
2. **Jelas dulu, efek kemudian.** Teks putih di atas foto hanya di hero, selalu dengan overlay gelap solid. Halaman lain memakai permukaan solid agar teks selalu terbaca (masalah navbar B2 di PRD).
3. **Mobile adalah produk utama.** Desain dan uji di 360–412 px dulu, desktop menyusul. Tulis class tanpa prefix untuk mobile, lalu tambahkan `md:` dan `lg:`. Navigasi dan aksi utama selalu di zona jempol (bawah layar).
4. **Konsisten.** Satu `<Button>`, satu `<Field>`, satu `<Navbar>`. Jika sebuah pola dipakai dua kali, jadikan komponen.
5. **Terasa hidup.** Setiap sentuhan dibalas (tekan, transisi, loading), tapi animasi singkat dan tidak menghalangi. Standar lengkap di PRD §7.1.

### 1.1 Anti "AI slop" (wajib)

Tampilan generik hasil template atau AI mudah dikenali. Aturan berikut menjaga UI tetap bersih dan punya karakter sendiri.

| Jangan | Lakukan |
|---|---|
| Gradien di latar, tombol, atau teks | Warna solid. Hierarki dibangun lewat ukuran, ketebalan font, dan jarak |
| Glassmorphism, `backdrop-blur`, glow, bayangan berwarna | Permukaan solid `bg-surface` dengan `border-line`. Bayangan `shadow-raise` hanya untuk lapisan yang melayang (toast, dialog, search bar di atas foto) |
| Aksen di mana-mana (logo, judul, latar section, ikon dekoratif) | Aksen hijau **hanya** untuk: tombol utama, link di dalam teks, status aktif (tab, focus), dan progress. Maksimal ±10% layar |
| Kata berwarna di judul ("Cari Kost? *Lebih Mudah.*") | Judul satu warna, berisi informasi nyata ("Kost ter-approve di sekitar UNKLAB") |
| Badge biru untuk pria, pink untuk wanita | Badge netral dengan istilah pasar: **Putra / Putri** |
| Semua elemen `rounded-full` atau `rounded-2xl` | Skala radius terbatas: `rounded-md` (badge), `rounded-lg` (tombol, input), `rounded-card` 12 px (kartu, foto). `rounded-full` hanya untuk chip filter dan indikator |
| Animasi memantul (spring), zoom besar, kartu terangkat jauh | Gerakan pendek dan halus: fade dan geser 8 px, scale ≥ 0.96 |
| Emoji atau ikon dekoratif di samping setiap judul | Ikon hanya jika membantu memindai (fasilitas, alamat, tab). Lucide, `strokeWidth` 1.75 |
| Copy hiperbola: "terbaik", "nomor 1", "aman, terpercaya, dan mudah" | Copy spesifik dan bisa dibuktikan: harga, jumlah kost, jarak, fasilitas |
| Section "fitur" dengan 3 kartu ikon yang isinya sama | Tampilkan data asli (kost, harga, foto) secepat mungkin |

---

## 2. Token (`src/index.css`)

```css
@theme {
  /* Netral hangat — hampir semua permukaan dan teks */
  --color-page:        #FAFAF9;  /* latar halaman */
  --color-surface:     #FFFFFF;  /* kartu, navbar, bottom nav */
  --color-hover:       #F5F5F4;  /* hover tombol sekunder, skeleton */
  --color-line:        #E7E5E4;  /* pemisah dekoratif */
  --color-line-strong: #8A847F;  /* batas input — 3.7:1 */
  --color-ink:         #1C1917;  /* teks utama — 16.7:1 */
  --color-muted:       #57534E;  /* teks sekunder — 7.3:1 */
  --color-subtle:      #78716C;  /* placeholder, ikon nonaktif — 4.8:1 */

  /* Satu aksen: hijau Klabat */
  --color-primary-50:  #EEF3F0;  /* latar ringan (jarang) */
  --color-primary-600: #1F5C46;  /* tombol utama, aktif — putih di atasnya 7.8:1 */
  --color-primary-700: #174837;  /* hover */

  --color-danger:   #B42318;     /* error — 6.6:1 */
  --color-whatsapp: #1C9C4F;     /* ikon WA; hijau brand #25D366 hanya 2:1 di atas putih */

  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --text-hero: clamp(2rem, 1.3rem + 3.5vw, 3.25rem);

  --radius-card: 0.75rem;                          /* 12 px */
  --shadow-raise: 0 8px 24px rgb(28 25 23 / .08);  /* hanya lapisan melayang */
}
```

Skala spacing (4 px), breakpoint, dan radius standar (`rounded-md`, `rounded-lg`, `rounded-full`) memakai bawaan Tailwind. **Palet bawaan Tailwind (`slate-*`, `blue-*`, dst.) tidak dipakai di komponen.** Semua warna lewat token di atas, supaya palet bisa diganti dari satu tempat.

### 2.1 Pemakaian warna

| Peran | Class |
|---|---|
| Background halaman | `bg-page` |
| Kartu, navbar, bottom nav | `bg-surface border border-line` |
| Judul & body | `text-ink` |
| Alamat, label sekunder | `text-muted` |
| Placeholder, ikon nonaktif, copyright | `text-subtle` |
| Tombol utama, tab aktif, focus | `bg-primary-600 hover:bg-primary-700 text-white` / `text-primary-600` |
| Filter aktif | `bg-ink text-white` (netral, aksen disimpan untuk aksi) |
| Harga | `text-ink font-bold tabular-nums` |
| Hubungi Pemilik (WA) | Tombol `secondary` + ikon `text-whatsapp`. Tidak ada tombol hijau kedua di samping tombol utama |
| Error form | `text-danger border-danger` |

Riwayat: v1 memakai ungu `#6C63FF` + teal dengan gradien. Draft awal v2 memakai biru `#2453E0`, yang terlalu mirip `blue-600` bawaan Tailwind. Versi final: netral hangat + hijau Klabat.

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
| Judul halaman h1 | `text-2xl md:text-4xl font-bold tracking-tight` |
| Judul section h2 | `text-2xl md:text-3xl font-bold` |
| Judul kartu | `text-lg font-bold line-clamp-1` |
| Body | `text-base` (16 px), `leading-relaxed` untuk paragraf panjang |
| Label / meta | `text-sm font-medium text-muted` |
| Badge / caption | `text-xs font-semibold` |

Nama kost ditulis **Title Case** di data ("Kost Wullur"), bukan huruf kapital semua. Angka harga memakai `tabular-nums` agar sejajar di daftar.

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

- **Ikon:** `lucide-react` (`<MapPin size={16} aria-hidden />`). Ukuran 16/20/24, `strokeWidth` 1.75 (2.25 untuk status aktif). Logo WhatsApp dibuat sebagai komponen `<WhatsAppIcon />` (SVG inline), karena Lucide tidak menyediakan ikon brand.
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

- **Foto:** kartu `aspect-[4/3] object-cover`, galeri utama `aspect-[16/10]`, thumbnail `aspect-square`. Setiap foto punya dua ukuran WebP di `public/gambar/`: `x.webp` (1600 px) dan `x-sm.webp` (640 px). Gunakan `srcSet={imageSrcSet(src)}` dengan `sizes` yang sesuai (kartu: `sizes="(min-width: 640px) 50vw, 100vw"`, thumbnail: cukup `x-sm.webp`). Selalu cantumkan `width`, `height` atau `aspect-ratio`, `loading="lazy"` (kecuali foto pertama yang terlihat), `decoding="async"`, dan `alt={`Foto ${kost.name}`}`.

---

## 6. Komponen

Setiap komponen menerima `className` tambahan dan meneruskan props lain (`...props`) ke elemen aslinya. Untuk menggabungkan class cukup pakai template string. Library `clsx` boleh dipakai jika variannya mulai banyak.

### 6.1 `<Button>` — `components/ui/Button.jsx`

```jsx
<Button>Cari</Button>
<Button variant="secondary" size="sm">Reset filter</Button>
<Button variant="secondary" as="a" href={waLink(...)} target="_blank" rel="noopener noreferrer">
  <WhatsAppIcon className="text-whatsapp" /> Hubungi Pemilik
</Button>
<Button as={Link} to={`/booking?kost=${id}`} block>Pesan Sekarang</Button>
```

| Prop `variant` | Class |
|---|---|
| `primary` (default) | `bg-primary-600 text-white hover:bg-primary-700` |
| `secondary` | `bg-surface text-ink border border-line-strong/50 hover:bg-hover` |
| `ghost` | `text-ink hover:bg-hover` |

Satu layar sebaiknya hanya punya **satu** tombol `primary`.

- Dasar: `inline-flex items-center justify-center gap-2 rounded-lg font-semibold active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed`.
- `size`: `md` = `h-11 px-5` (44 px, target sentuh minimum), `sm` = `h-9 px-4 text-sm`. `block` menambah `w-full`.
- Prop `as` dipakai untuk merender `<a>` atau `<Link>`. Gunakan `<button>` untuk aksi dan link untuk navigasi.

### 6.2 `<Field>` — `components/ui/Field.jsx`

```jsx
<Field label="Nomor WhatsApp" name="phone" type="tel" inputMode="numeric"
       placeholder="08xxxxxxxxxx" error={errors.phone} required />
```

- Merender `<label htmlFor>`, `<input id aria-invalid aria-describedby>`, dan `<p id="…-error">` saat ada error. `id` dibuat otomatis dengan `useId()`.
- Input: `h-12 w-full rounded-lg border border-line-strong bg-surface px-4 placeholder:text-subtle focus:border-primary-600 focus:ring-4 focus:ring-primary-600/15`. Saat error: `border-danger`, pesan `text-danger animate-fade-in`.
- Varian `<SelectField>` untuk dropdown. Prop `prefix="Rp"` untuk input harga.

### 6.3 `<SearchBar>` (hero)

`<form role="search">` berupa kotak putih (`rounded-xl bg-surface shadow-raise p-1.5 flex`) berisi ikon `Search`, input, dan `<Button>`. Di < 640 px tombol hanya menampilkan ikon (dengan `aria-label="Cari"`). Hasil difilter langsung saat mengetik; submit (Enter) menutup keyboard HP dan menggulir ke `#hasil`.

### 6.4 `<FilterBar>` + `<Chip>`

- Satu baris chip yang bisa di-scroll horizontal di HP (`no-scrollbar flex gap-2 overflow-x-auto`), sticky di bawah navbar: `Semua · Putra · Putri | ≤ 400rb · 400–700rb · > 700rb`. Chip harga yang aktif diklik lagi untuk melepasnya. Di bawahnya: "12 kost ditemukan" (`aria-live`), tombol Reset, dan `<select>` Urutkan.
- `<Chip active>` merender `<button aria-pressed>` dengan class `h-9 px-4 rounded-full border text-sm font-medium`. Tidak aktif: `border-line bg-surface text-ink hover:border-line-strong`. Aktif: `border-ink bg-ink text-white`.
- FilterBar tidak menyimpan state; nilai dan `onChange(key, value)` datang dari HomePage, yang menyinkronkannya ke URL (lihat PRD F1). Logika filter ada di `lib/filterKosts.js`.

### 6.5 `<KostCard kost={…} />`

```
┌──────────────────────────┐
│  [ foto 4:3 ]    (Putri) │  ← <Badge> di pojok kiri atas
├──────────────────────────┤
│ Corner Residence         │  font-semibold line-clamp-1
│ Airmadidi Atas           │  shortAddress(), text-sm text-muted
│ 5×4 m · Kasur · Lemari   │  ukuran + 2 fasilitas, text-sm text-subtle
│ Rp 850.000 /bulan        │  font-semibold tabular-nums; "/bulan" text-muted
└──────────────────────────┘
```

- Root berupa `<Link to={`/kost/${kost.id}`} className="group block">`. Foto `rounded-card` sendiri di atas, teks langsung di bawahnya **tanpa kotak dan bayangan**, sehingga foto yang paling menonjol.
- Hover (hanya di perangkat dengan pointer): foto `group-hover:scale-[1.03]` di dalam wadah `overflow-hidden`, `transition duration-300`. Kartu tidak terangkat.
- Tekan (HP): `active:scale-[0.98]`.
- Masuk: di grid, setiap kartu memakai `animate-fade-up stagger` dengan `style={{ '--i': Math.min(index, 8) }}`, sehingga kartu muncul berurutan. Grid diberi `key` dari filter/urutan, jadi kartu masuk ulang saat filter berubah, tapi tidak di setiap ketikan.
- Shared element (fase 5): foto kartu dibungkus `<ViewTransition name={`kost-${id}`}>`, dan gambar utama di galeri detail memakai nama yang sama, sehingga foto "terbang" dari kartu ke halaman detail.
- `<KostCardSkeleton>`: blok dengan class `skeleton` (shimmer) dengan ukuran yang sama.

### 6.6 `<Badge>`

`<Badge type="pria|wanita" />` menampilkan **Putra** / **Putri** dengan class netral `rounded-md border border-line bg-surface px-2 py-0.5 text-xs font-semibold text-ink`. Data tetap memakai `pria`/`wanita`. Badge "Ter-Approve" hanya ditampilkan jika datanya ada (PRD B16).

### 6.7 `<Navbar>` (top bar)

- `sticky top-0 z-50 h-14 md:h-16`.
- **Solid** (default): `bg-surface border-b border-line text-ink`.
- **Transparan** (hanya di `/` saat posisi di atas hero): `bg-transparent text-white`. Berubah ke solid setelah scroll lebih dari 40 px (hook `useScrolled(40)`), dengan `transition-colors duration-300`. Di beranda, hero diberi `-mt-14 pt-14 md:-mt-16 md:pt-16` agar terlihat di bawah navbar.
- Logo: teks "KostFinder" satu warna (`text-ink`, atau putih di atas hero), `font-extrabold tracking-tight`.
- Mobile: hanya logo. Desktop (`md:`): Beranda · Kalkulator · Tentang Kami · `<Button size="sm">Booking</Button>`.
- Link: `text-muted hover:text-ink`. Link aktif (`<NavLink>`, otomatis `aria-current="page"`): `text-ink font-semibold` dengan garis bawah yang memanjang dari kiri (`after:scale-x-0` → `after:scale-x-100`). Saat hover, garis bawah yang sama muncul.

### 6.7b `<BottomNav>` (mobile)

```
┌─────────────────────────────────────┐
│  ──🏠──     📅       🧮       ⓘ     │
│ Beranda   Booking   Hitung  Tentang │
└─────────────────────────────────────┘
```

- `fixed inset-x-0 bottom-0 z-50 md:hidden`, `bg-surface border-t border-line`, `pb-[env(safe-area-inset-bottom)]`.
- 4 tab `grid-cols-4`, masing-masing `h-16`: ikon 22 px + label `text-xs`.
- Tab aktif: `text-primary-600 font-semibold`, ikon `strokeWidth={2.25}`, dan garis 2 px `bg-primary-600` di tepi atas tab yang muncul dengan `animate-scale-in`. Tab lain `text-muted`, ikon `strokeWidth={1.75}`.
- Tekan: `active:scale-95`.
- Disembunyikan di `/kost/:id` karena halaman detail punya `<StickyCta>`.

### 6.8 `<Footer>`

`bg-surface border-t border-line text-muted`, judul kolom `text-sm font-semibold text-ink`. Grid `md:grid-cols-3` (Brand · Navigasi · Kontak), 1 kolom di HP (kolom Navigasi disembunyikan karena sudah ada di bottom nav). Baris copyright `text-sm text-subtle` dengan `border-t border-line`. Tahun diisi dengan `new Date().getFullYear()`.

### 6.9 `<Gallery images={…} name={…} />`

- Gambar utama `aspect-[16/10] rounded-card` berupa track horizontal `flex snap-x snap-mandatory overflow-x-auto` (setiap foto `snap-center shrink-0 w-full`), sehingga di HP cukup di-swipe. Foto aktif dideteksi dari posisi scroll.
- Di HP: indikator titik di bawah gambar (titik aktif memanjang). Di desktop: tombol prev/next bulat (`size-10 rounded-full bg-white/90`) dan penghitung "2 / 4".
- Thumbnail berupa `<button aria-label="Foto 2 dari 4">` berukuran `size-18 rounded-lg`. Thumbnail aktif diberi `ring-2 ring-primary-600`.
- Tombol ← → di keyboard berfungsi saat galeri difokus.
- Lightbox (P1): elemen `<dialog>` native yang dibuka dengan `showModal()` dan ditutup dengan Esc.

### 6.10 Info Panel & `<StickyCta>` (detail)

- Desktop: panel kanan `lg:sticky lg:top-24`.
- Mobile: `fixed inset-x-0 bottom-0 bg-surface border-t border-line p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3 lg:hidden`, berisi harga di kiri, dan tombol WA (`secondary`, ikon saja, `aria-label="Hubungi pemilik lewat WhatsApp"`) serta "Pesan" (`primary`) di kanan. Muncul dengan animasi naik dari bawah. Halaman diberi `pb-28 lg:pb-0` agar konten tidak tertutup.

### 6.11 `<EmptyState>`, `<NotFoundPage>`, Toast

- **EmptyState:** props `icon`, `title`, `description`, `action`. Ikon 40 px `strokeWidth={1.5}` `text-subtle`.
- **Kost tidak ditemukan / 404:** tetap memakai Layout dengan tombol "Kembali ke Beranda".
- **Toast** (opsional): pengganti `alert()`. Cukup sebuah komponen kecil dengan `role="status"`, tanpa library.

### 6.12 `<CostSummary price={…} months={…} extra={…} />`

Kotak `bg-page border border-line rounded-card p-5` dengan `aria-live="polite"`, angka `tabular-nums`:
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
| **HomePage** | Navbar transparan → Hero (foto + overlay gelap solid `bg-ink/65`, tanpa gradien warna; h1 rata kiri, subjudul, SearchBar) → FilterBar sticky + jumlah hasil + Urutkan → grid KostCard → Footer. Bagian "Cara Kerja" 3 langkah sengaja dihapus (pola template generik). |
| **DetailPage** | Link Kembali → Gallery → Info (judul, Badge, harga, meta) → Fasilitas `grid-cols-2` → Alamat + Peta → Kost serupa. Desktop: `lg:grid-cols-3`, konten `lg:col-span-2` dan info panel sticky di kolom kanan |
| **BookingPage** | Judul → (mobile) kost terpilih / SelectField kost → Form → CostSummary → Submit. Desktop: `lg:grid-cols-12`, pilih kost `col-span-5`, form `col-span-7` |
| **CalculatorPage** | Kartu tengah `max-w-xl mx-auto`: pilih kost (opsional) → harga → durasi → biaya tambahan → CostSummary live |
| **AboutPage** | PageHeader → Misi → 3 kartu keunggulan (`md:grid-cols-3`) → Cara kerja → Kontak |

`<PageHeader title subtitle>` untuk halaman non-beranda: `bg-surface border-b border-line py-8 md:py-12`, judul `text-2xl md:text-4xl font-bold tracking-tight` rata kiri, subjudul `text-muted`.

---

## 8. Motion

Semua animasi memakai CSS native dan React `<ViewTransition>`, **tanpa library** (PRD D9). Hanya animasikan `transform` dan `opacity` agar tetap 60 fps di HP.

### 8.1 Token (`src/index.css`)

| Token / class | Nilai | Pemakaian |
|---|---|---|
| `ease-out-soft` | `cubic-bezier(.2,.8,.2,1)` | Default untuk hampir semua transisi |
| `animate-fade-up` | 400 ms, naik 8 px | Konten halaman dan kartu saat masuk |
| `animate-fade-in` | 250 ms | Pesan error, overlay, gambar selesai dimuat |
| `animate-scale-in` | 200 ms, scale 0.96 → 1 | Indikator tab aktif, ikon sukses |
| `animate-progress` | 2 s, scaleX 0 → 0.9 | Progress bar saat pindah halaman |
| `stagger` | `animation-delay: calc(var(--i) * 60ms)` | Daftar yang muncul berurutan: `style={{ '--i': i }}` |
| `reveal` | scroll-driven `animation-timeline: view()` | Section yang muncul saat di-scroll. Browser yang belum mendukung langsung menampilkannya |
| `skeleton` | gradien shimmer 1.4 s | Placeholder loading |

### 8.2 Pola

| Interaksi | Implementasi |
|---|---|
| Pindah halaman | `<ViewTransition default="page">` membungkus `<main>` di Layout: halaman lama memudar 120 ms, halaman baru naik dan muncul 280 ms |
| Kartu → detail | Shared element `<ViewTransition name={`kost-${id}`}>` di foto kartu dan gambar utama detail |
| Tekan tombol/chip/tab | `active:scale-[0.98]` / `active:scale-95` / `active:scale-95` dengan `transition-transform duration-200` |
| Navbar scroll | Transparan → solid, `transition-colors duration-300` |
| Pindah tab bawah | Garis indikator `animate-scale-in` |
| Hero | Judul `animate-fade-up`, subjudul dan search bar `animate-fade-up stagger` (`--i` 2 dan 4) |
| Slider hero | Dua `<img>` bertumpuk di-crossfade lewat `opacity` (700 ms), interval 6 detik, berhenti saat tab tidak terlihat. Jangan memakai `background-attachment: fixed` (PRD B12) |
| Hasil filter berubah | Grid di-render ulang dengan `animate-fade-up stagger` (maksimal 8 kartu pertama diberi delay) |
| Galeri | Swipe native (scroll-snap), `scroll-behavior: smooth` untuk tombol prev/next |
| Form error | Pesan error `animate-fade-in`. Ringkasan biaya angka berubah dengan `animate-fade-in` (key = nilai) |
| Toast | Naik dari bawah `animate-fade-up`, hilang otomatis setelah 3 detik |

### 8.3 Aturan

- Tidak ada easing memantul (spring/overshoot). Gunakan `ease-out-soft`.
- Durasi: 120–300 ms untuk feedback dan transisi, maksimal 400 ms untuk animasi masuk. Tidak ada animasi yang membuat pengguna menunggu.
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
- Jangan pakai `dangerouslySetInnerHTML`. Jangan pakai warna hex atau palet bawaan Tailwind (`slate-*`, `blue-*`) di `className`, cukup token. Jika class Tailwind sangat panjang dan berulang, jadikan komponen, bukan `@apply`.
- Urutan class mengikuti plugin `prettier-plugin-tailwindcss` (opsional, tetapi membantu konsistensi tim).
