import { createBrowserRouter } from 'react-router'
import Layout from './components/layout/Layout.jsx'

// Halaman dimuat per route; router menunggu file halaman selesai dimuat sebelum pindah,
// jadi tidak ada layar kosong saat transisi
const page = (load) => () => load().then((m) => ({ Component: m.default }))

export const router = createBrowserRouter([
  {
    Component: Layout,
    HydrateFallback: () => null,
    children: [
      { index: true, lazy: page(() => import('./pages/HomePage.jsx')) },
      { path: 'kost/:id', lazy: page(() => import('./pages/DetailPage.jsx')) },
      { path: 'booking', lazy: page(() => import('./pages/BookingPage.jsx')) },
      { path: 'kalkulator', lazy: page(() => import('./pages/CalculatorPage.jsx')) },
      { path: 'tentang', lazy: page(() => import('./pages/AboutPage.jsx')) },
      { path: '*', lazy: page(() => import('./pages/NotFoundPage.jsx')) },
    ],
  },
])
