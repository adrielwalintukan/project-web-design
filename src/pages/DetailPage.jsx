import { Link, useParams } from 'react-router'
import { Calculator, ChevronLeft, MapPin, MessageCircle, SearchX } from 'lucide-react'
import kosts from '../data/kosts.js'
import { getFacility } from '../lib/facilities.js'
import { ADMIN_PHONE, formatRupiah, shortAddress, waLink } from '../lib/format.js'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Gallery from '../components/kost/Gallery.jsx'
import KostCard from '../components/kost/KostCard.jsx'

export default function DetailPage() {
  const { id } = useParams()
  const kost = kosts.find((k) => k.id === id)

  if (!kost) {
    return (
      <Container>
        <title>Kost Tidak Ditemukan — KostFinder UNKLAB</title>
        <h1 className="sr-only">Kost tidak ditemukan</h1>
        <EmptyState
          icon={SearchX}
          title="Kost tidak ditemukan"
          description="Kost ini tidak ada atau sudah tidak terdaftar."
          action={
            <Button as={Link} to="/">
              Lihat semua kost
            </Button>
          }
        />
      </Container>
    )
  }

  // Kontak kosong → nomor admin (PRD D4)
  const wa = {
    href: waLink(kost.contact ?? ADMIN_PHONE, `Halo, saya tertarik dengan ${kost.name} (${formatRupiah(kost.price)}/bulan) dari KostFinder UNKLAB. Apakah masih ada kamar kosong?`),
    label: kost.contact ? 'Hubungi Pemilik' : 'Hubungi Admin',
  }
  const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${kost.name}, ${kost.address}`)}`
  const similar = kosts
    .filter((k) => k.type === kost.type && k.id !== kost.id)
    .sort((a, b) => Math.abs(a.price - kost.price) - Math.abs(b.price - kost.price))
    .slice(0, 3)

  return (
    <>
      <title>{`${kost.name} — KostFinder UNKLAB`}</title>

      <Container className="pb-12">
        <Link
          to="/"
          className="-ml-2 inline-flex h-11 items-center gap-1 rounded-lg px-2 text-sm font-medium text-muted hover:text-ink"
        >
          <ChevronLeft size={18} aria-hidden /> Semua kost
        </Link>

        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Gallery id={kost.id} images={kost.images} name={kost.name} />
          </div>

          <aside className="self-start lg:sticky lg:top-24 lg:col-start-3 lg:row-span-2 lg:row-start-1">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Badge type={kost.type} />
              <span>{kost.size.replace('x', '×')} m</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{kost.name}</h1>
            <p className="mt-1 text-muted">{shortAddress(kost.address)}</p>
            <p className="mt-4 tabular-nums">
              <span className="text-2xl font-bold">{formatRupiah(kost.price)}</span>
              <span className="text-muted"> /bulan</span>
            </p>

            <div className="mt-6 hidden gap-2 lg:grid">
              <Button as={Link} to={`/booking?kost=${kost.id}`} block>
                Pesan Sekarang
              </Button>
              <Button as="a" href={wa.href} target="_blank" rel="noopener noreferrer" variant="secondary" block>
                <MessageCircle size={18} className="text-whatsapp" aria-hidden /> {wa.label}
              </Button>
              <Button as={Link} to={`/kalkulator?kost=${kost.id}`} variant="ghost" block>
                <Calculator size={18} aria-hidden /> Hitung Biaya Sewa
              </Button>
            </div>
            <Link
              to={`/kalkulator?kost=${kost.id}`}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 lg:hidden"
            >
              <Calculator size={16} aria-hidden /> Hitung total biaya sewa
            </Link>
          </aside>

          <div className="space-y-10 lg:col-span-2">
            <section aria-labelledby="fasilitas">
              <h2 id="fasilitas" className="text-lg font-semibold">
                Fasilitas
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                {kost.facilities.map((key) => {
                  const { label, icon: Icon } = getFacility(key)
                  return (
                    <li key={key} className="flex items-center gap-3 text-sm">
                      <Icon size={20} strokeWidth={1.75} className="shrink-0 text-muted" aria-hidden />
                      {label}
                    </li>
                  )
                })}
              </ul>
            </section>

            <section aria-labelledby="lokasi">
              <h2 id="lokasi" className="text-lg font-semibold">
                Lokasi
              </h2>
              <p className="mt-2 flex gap-2 text-sm text-muted">
                <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden />
                {kost.address}
              </p>
              {kost.mapUrl ? (
                <iframe
                  src={kost.mapUrl}
                  title={`Peta lokasi ${kost.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="mt-4 aspect-[4/3] w-full rounded-card border border-line bg-hover md:aspect-video"
                />
              ) : (
                <p className="mt-4 rounded-card border border-line bg-surface p-4 text-sm text-muted">
                  Peta untuk kost ini belum tersedia.
                </p>
              )}
              <a
                href={mapsSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-primary-600 hover:underline"
              >
                Buka di Google Maps
              </a>
            </section>
          </div>
        </div>

        {similar.length > 0 && (
          <section aria-labelledby="serupa" className="mt-14">
            <h2 id="serupa" className="text-lg font-semibold">
              Kost {kost.type === 'pria' ? 'putra' : 'putri'} lainnya
            </h2>
            <div className="mt-4 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((k, i) => (
                <KostCard key={k.id} kost={k} index={i} />
              ))}
            </div>
          </section>
        )}
      </Container>

      {/* CTA utama di jangkauan jempol (HP); di desktop CTA ada di panel kanan */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex animate-fade-up items-center gap-3 border-t border-line bg-surface p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden">
        <p className="min-w-0 flex-1 leading-tight tabular-nums">
          <span className="block font-bold">{formatRupiah(kost.price)}</span>
          <span className="text-sm text-muted">per bulan</span>
        </p>
        <Button
          as="a"
          href={wa.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          aria-label={`${wa.label} lewat WhatsApp`}
          className="px-3"
        >
          <MessageCircle size={20} className="text-whatsapp" aria-hidden />
        </Button>
        <Button as={Link} to={`/booking?kost=${kost.id}`} className="px-6">
          Pesan Sekarang
        </Button>
      </div>
    </>
  )
}
