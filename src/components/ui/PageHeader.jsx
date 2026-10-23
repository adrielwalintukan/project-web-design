import Container from './Container.jsx'

export default function PageHeader({ title, subtitle }) {
  return (
    <header className="border-b border-line bg-surface py-8 md:py-12">
      <Container>
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-muted">{subtitle}</p>}
      </Container>
    </header>
  )
}
