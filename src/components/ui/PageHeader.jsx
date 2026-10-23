import Container from './Container.jsx'

// Judul besar langsung di atas latar halaman (gaya "large title" aplikasi), tanpa pita putih
export default function PageHeader({ title, subtitle }) {
  return (
    <header className="pt-6 pb-2 md:pt-12">
      <Container>
        <h1 className="animate-fade-up text-3xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="stagger mt-2 max-w-2xl animate-fade-up text-muted md:text-lg" style={{ '--i': 1 }}>
            {subtitle}
          </p>
        )}
      </Container>
    </header>
  )
}
