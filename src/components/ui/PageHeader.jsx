import Container from './Container.jsx'

export default function PageHeader({ title, subtitle }) {
  return (
    <header className="bg-primary-50 py-12">
      <Container>
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-muted">{subtitle}</p>}
      </Container>
    </header>
  )
}
