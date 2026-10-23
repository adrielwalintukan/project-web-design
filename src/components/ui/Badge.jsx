// Istilah yang umum di iklan kost; warna netral, bukan biru/pink
const labels = { pria: 'Putra', wanita: 'Putri' }

// Pill putih: terbaca di atas foto maupun di atas latar halaman
export default function Badge({ type, className = '' }) {
  return (
    <span
      className={`inline-block rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-ink shadow-raise ${className}`}
    >
      {labels[type]}
    </span>
  )
}
