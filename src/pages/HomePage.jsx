import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { ArrowUpDown, SearchX } from 'lucide-react'
import kosts from '../data/kosts.js'
import { filterKosts } from '../lib/filterKosts.js'
import { imageSrcSet } from '../lib/format.js'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import SearchBar from '../components/kost/SearchBar.jsx'
import FilterBar from '../components/kost/FilterBar.jsx'
import KostCard from '../components/kost/KostCard.jsx'

const sortOptions = [
  { value: '', label: 'Rekomendasi' },
  { value: 'price-asc', label: 'Harga termurah' },
  { value: 'price-desc', label: 'Harga termahal' },
  { value: 'name', label: 'Nama A–Z' },
]

const filterKeys = ['q', 'type', 'price', 'sort']

export default function HomePage() {
  const [params] = useSearchParams()
  // Filter di state lokal (langsung sinkron), lalu disalin ke URL tanpa navigasi router:
  // navigasi router asinkron membuat klik beruntun membaca nilai lama dan memicu view transition.
  const [filters, setFilters] = useState(() => Object.fromEntries(filterKeys.map((k) => [k, params.get(k) ?? ''])))
  const results = filterKosts(kosts, filters)
  const hasFilter = Boolean(filters.q.trim() || filters.type || filters.price)

  useEffect(() => {
    const qs = new URLSearchParams(Object.entries(filters).filter(([, v]) => v)).toString()
    const url = qs ? `?${qs}` : window.location.pathname
    // shortcut: router tidak tahu perubahan ini, jadi klik "Beranda" saat filter aktif mengosongkan URL
    // tapi filter tetap tampil; pindah ke useSearchParams jika router mendukung update sinkron
    window.history.replaceState(window.history.state, '', url)
  }, [filters])

  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }))
  const reset = () => setFilters((f) => ({ q: '', type: '', price: '', sort: f.sort }))

  return (
    <>
      <title>KostFinder UNKLAB — Kost ter-approve di sekitar UNKLAB</title>

      <section className="relative -mt-14 overflow-hidden rounded-b-[2rem] bg-ink pt-14 text-white md:-mt-16 md:rounded-b-[3rem] md:pt-16">
        <img
          src="/gambar/unklab.webp"
          srcSet={imageSrcSet('/gambar/unklab.webp')}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 size-full animate-fade-in object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" aria-hidden />
        <Container className="relative pt-10 pb-20 md:pt-24 md:pb-32">
          <p className="inline-block animate-fade-up rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
            {kosts.length} kost · Airmadidi
          </p>
          <h1
            className="stagger mt-4 max-w-2xl animate-fade-up text-hero font-extrabold tracking-tight"
            style={{ '--i': 1 }}
          >
            Kost ter-approve di sekitar UNKLAB
          </h1>
          <p className="stagger mt-3 max-w-xl animate-fade-up text-white/80 md:text-lg" style={{ '--i': 2 }}>
            Bandingkan harga, fasilitas, dan lokasi, lalu booking langsung ke pemilik lewat WhatsApp.
          </p>
        </Container>
      </section>

      {/* Search pill menumpang di batas bawah hero */}
      <Container className="relative z-10 -mt-8">
        <SearchBar
          className="stagger mx-auto max-w-2xl animate-fade-up"
          style={{ '--i': 3 }}
          value={filters.q}
          onChange={(v) => update('q', v)}
          onSubmit={(e) => {
            e.currentTarget.querySelector('input').blur() // tutup keyboard HP
            document.getElementById('hasil').scrollIntoView({ behavior: 'smooth' })
          }}
        />
      </Container>

      <section id="hasil" aria-labelledby="hasil-judul" className="mt-4 scroll-mt-14 md:scroll-mt-16">
        <div className="sticky top-14 z-40 bg-page/90 backdrop-blur-lg md:top-16">
          <Container>
            <FilterBar type={filters.type} price={filters.price} onChange={update} />
          </Container>
        </div>

        <Container className="pb-12">
          <div className="flex items-center justify-between gap-4 py-4">
            <h2 id="hasil-judul" className="text-sm text-muted" aria-live="polite">
              <span className="font-semibold text-ink tabular-nums">{results.length}</span> kost ditemukan
            </h2>
            <div className="flex items-center gap-1">
              {hasFilter && (
                <Button variant="ghost" size="sm" onClick={reset}>
                  Reset
                </Button>
              )}
              <label htmlFor="urutkan" className="sr-only">
                Urutkan
              </label>
              <div className="relative">
                <ArrowUpDown
                  size={16}
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink"
                  aria-hidden
                />
                <select
                  id="urutkan"
                  value={filters.sort}
                  onChange={(e) => update('sort', e.target.value)}
                  className="h-10 appearance-none rounded-full bg-tonal pr-4 pl-9 text-sm font-semibold text-ink transition-colors hover:bg-line"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {results.length > 0 ? (
            // key dari filter (bukan teks pencarian): kartu masuk ulang dengan animasi saat filter/urutan
            // berubah, tapi tidak berkedip di setiap ketikan
            <div
              key={`${filters.type}|${filters.price}|${filters.sort}`}
              className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {results.map((kost, i) => (
                <KostCard key={kost.id} kost={kost} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={SearchX}
              title="Tidak ada kost yang cocok"
              description="Coba kata kunci lain atau longgarkan filter harga."
              action={
                <Button variant="secondary" onClick={reset}>
                  Reset filter
                </Button>
              }
            />
          )}
        </Container>
      </section>
    </>
  )
}
