// Istilah yang umum di iklan kost; warna netral, bukan biru/pink
const labels = { pria: 'Putra', wanita: 'Putri' }

export default function Badge({ type, className = '' }) {
  return (
    <span className={`inline-block rounded-md border border-line bg-surface px-2 py-0.5 text-xs font-semibold text-ink ${className}`}>
      {labels[type]}
    </span>
  )
}
