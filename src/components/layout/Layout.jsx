import { ViewTransition } from 'react'
import { Outlet, ScrollRestoration, useLocation, useNavigation } from 'react-router'
import Navbar from './Navbar.jsx'
import BottomNav from './BottomNav.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  // Halaman detail punya sticky CTA sendiri di bawah layar
  const showBottomNav = !pathname.startsWith('/kost/')
  const loading = useNavigation().state === 'loading'

  return (
    <div
      className={`flex min-h-screen flex-col ${showBottomNav ? 'pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0' : 'pb-[calc(4.375rem+env(safe-area-inset-bottom))] lg:pb-0'}`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:shadow-raise"
      >
        Lewati ke konten
      </a>
      {loading && (
        <div
          role="progressbar"
          aria-label="Memuat halaman"
          className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left animate-progress bg-primary-600"
        />
      )}
      <Navbar />
      <ViewTransition default="page">
        <main id="main" className="flex-1">
          <Outlet />
        </main>
      </ViewTransition>
      <Footer />
      {showBottomNav && <BottomNav />}
      <ScrollRestoration />
    </div>
  )
}
