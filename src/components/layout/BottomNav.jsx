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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-4">
        {tabs.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative flex h-16 flex-col items-center justify-center gap-1 text-xs transition-[color,transform] duration-200 active:scale-95 ${isActive ? 'font-semibold text-primary-600' : 'font-medium text-muted'}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute inset-x-6 top-0 h-0.5 animate-scale-in rounded-full bg-primary-600" aria-hidden />
                  )}
                  <Icon size={22} strokeWidth={isActive ? 2.25 : 1.75} aria-hidden />
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
