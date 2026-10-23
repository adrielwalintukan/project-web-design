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
    <footer className="bg-slate-900 text-white/70">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="text-xl font-extrabold text-white">
            Kost<span className="text-primary-100">Finder</span>
          </p>
          <p className="mt-3 max-w-xs">
            Direktori kost ter-approve di sekitar Universitas Klabat. Aman, terpercaya, dan mudah.
          </p>
        </div>

        <nav aria-label="Navigasi footer" className="hidden md:block">
          <h2 className="mb-4 font-semibold text-white">Navigasi</h2>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-semibold text-white">Hubungi Kami</h2>
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

      <div className="border-t border-white/10">
        <Container className="py-6 text-center text-sm text-white/50">
          &copy; {year} KostFinder UNKLAB. All rights reserved.
        </Container>
      </div>
    </footer>
  )
}
