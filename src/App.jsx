import { Routes, Route } from 'react-router'
import { House } from 'lucide-react'

// Placeholder fase 1: route lengkap (docs/PRD.md §5) dibuat di fase 2
function SetupCheck() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-4 text-center">
      <div>
        <House className="mx-auto mb-4 text-blue-600" size={48} aria-hidden />
        <h1 className="text-3xl font-bold text-slate-900">KostFinder UNKLAB</h1>
        <p className="mt-2 text-slate-600">React + Vite + Tailwind + React Router siap.</p>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<SetupCheck />} />
    </Routes>
  )
}
