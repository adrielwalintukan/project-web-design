import Container from '../components/ui/Container.jsx'

// Hero foto, pencarian, filter, dan grid kost dibuat di fase 4 (PRD F1)
export default function HomePage() {
  return (
    <>
      <title>KostFinder UNKLAB — Cari Kost di Sekitar UNKLAB</title>
      <section className="-mt-14 bg-slate-900 pt-14 md:-mt-16 md:pt-16 text-white">
        <Container className="py-24 text-center md:py-32">
          <h1 className="animate-fade-up text-hero font-extrabold tracking-tight">
            Cari Kost? <span className="text-primary-100">Lebih Mudah.</span>
          </h1>
          <p className="stagger mx-auto mt-4 max-w-xl animate-fade-up text-lg text-white/80" style={{ '--i': 2 }}>
            Temukan hunian nyaman dan ter-approve di sekitar Universitas Klabat.
          </p>
        </Container>
      </section>
      <Container className="py-16 text-center text-muted">Daftar kost akan tampil di sini.</Container>
    </>
  )
}
