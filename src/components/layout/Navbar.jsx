import { Link, NavLink, useLocation } from 'react-router'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import useScrolled from '../../hooks/useScrolled.js'

// Link desktop; di HP navigasi pindah ke BottomNav
const links = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/kalkulator', label: 'Kalkulator' },
  { to: '/tentang', label: 'Tentang Kami' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const scrolled = useScrolled(40)
  const transparent = pathname === '/' && !scrolled

  const linkClass = ({ isActive }) =>
    `relative py-1 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-current after:transition-transform after:duration-300 ${isActive ? 'font-semibold after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'} ${transparent ? (isActive ? 'text-white' : 'text-white/80 hover:text-white') : isActive ? 'text-ink' : 'text-muted hover:text-ink'}`

  return (
    <header
      className={`sticky top-0 z-50 h-14 border-b transition-colors duration-300 md:h-16 ${transparent ? 'border-transparent bg-transparent text-white [&_:focus-visible]:outline-white' : 'border-line bg-surface text-ink'}`}
    >
      <Container className="flex h-full items-center justify-between">
        <Link to="/" className="text-lg font-extrabold tracking-tight">
          KostFinder
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <Button as={Link} to="/booking" size="sm">
            Booking
          </Button>
        </nav>
      </Container>
    </header>
  )
}
