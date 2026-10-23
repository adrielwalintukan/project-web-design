import { formatRupiah } from '../../lib/format.js'

// Dipakai di Booking dan Kalkulator (DESIGN-SYSTEM §6.12); extra = biaya tambahan per bulan
export default function CostSummary({ price, months, extra = 0 }) {
  const total = (price + extra) * months
  const rows = [
    ['Harga per bulan', formatRupiah(price)],
    ...(extra > 0 ? [['Biaya tambahan', `${formatRupiah(extra)} /bulan`]] : []),
    ['Durasi', `× ${months} bulan`],
  ]

  return (
    <dl aria-live="polite" className="space-y-2 rounded-card border border-line bg-page p-5 text-sm tabular-nums">
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between gap-4">
          <dt className="text-muted">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
      <div className="!mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-4">
        <dt className="font-medium">Total</dt>
        <dd key={total} className="animate-fade-in text-2xl font-extrabold">
          {formatRupiah(total)}
        </dd>
      </div>
    </dl>
  )
}
