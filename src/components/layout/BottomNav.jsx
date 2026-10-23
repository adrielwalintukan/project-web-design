import { NavLink } from 'react-router'
import { Calculator, CalendarCheck, House, Info } from 'lucide-react'

const tabs = [
  { to: '/', label: 'Beranda', icon: House, end: true },
  { to: '/booking', label: 'Booking', icon: CalendarCheck },
  { to: '/kalkulator', label: 'Hitung', icon: Calculator },
  { to: '/tentang', label: 'Tentang', icon: Info },
]

export default function BottomNav() {
  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-4">
        {tabs.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium transition-[color,transform] duration-200 active:scale-90 ${isActive ? 'text-primary-600' : 'text-muted'}`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`grid h-8 w-14 place-items-center rounded-full ${isActive ? 'animate-pop bg-primary-100' : ''}`}
                  >
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} aria-hidden />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
