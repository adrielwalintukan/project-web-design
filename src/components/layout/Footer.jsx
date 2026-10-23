import { Link } from 'react-router'
import { Mail, MapPin, Phone } from 'lucide-react'
import Container from '../ui/Container.jsx'

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/booking', label: 'Booking Kamar' },
  { to: '/kalkulator', label: 'Kalkulator Sewa' },
  { to: '/tentang', label: 'Tentang Kami' },
]

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface text-muted">
      <Container className="grid gap-8 py-10 md:grid-cols-3 md:py-12">
        <div>
          <p className="text-lg font-extrabold tracking-tight text-ink">KostFinder</p>
          <p className="mt-3 max-w-xs">
            Daftar kost di Airmadidi yang sudah disetujui Universitas Klabat.
          </p>
        </div>

        <nav aria-label="Navigasi footer" className="hidden md:block">
          <h2 className="mb-3 text-sm font-semibold text-ink">Navigasi</h2>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-sm font-semibold text-ink">Hubungi Kami</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Mail size={16} aria-hidden /> help@kostfinder.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} aria-hidden /> +62 898 1548 999
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} aria-hidden /> Airmadidi, Minahasa Utara
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="py-5 text-sm text-subtle">
          &copy; {year} KostFinder UNKLAB. All rights reserved.
        </Container>
      </div>
    </footer>
  )
}
