import Container from '../components/ui/Container.jsx'

// Hero foto, pencarian, filter, dan grid kost dibuat di fase 4 (PRD F1)
export default function HomePage() {
  return (
    <>
      <title>KostFinder UNKLAB — Cari Kost di Sekitar UNKLAB</title>
      <section className="-mt-14 bg-ink pt-14 text-white md:-mt-16 md:pt-16">
        <Container className="py-24 text-center md:py-32">
          <h1 className="animate-fade-up text-hero font-extrabold tracking-tight">
            Kost ter-approve di sekitar UNKLAB
          </h1>
          <p className="stagger mx-auto mt-4 max-w-xl animate-fade-up text-lg text-white/80" style={{ '--i': 2 }}>
            Bandingkan harga, fasilitas, dan lokasi, lalu booking langsung ke pemilik lewat WhatsApp.
          </p>
        </Container>
      </section>
      <Container className="py-16 text-center text-muted">Daftar kost akan tampil di sini.</Container>
    </>
  )
}
