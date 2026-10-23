import { formatRupiah } from '../../lib/format.js'

// Dipakai di Booking dan Kalkulator (DESIGN-SYSTEM §6.12)
export default function CostSummary({ price, months }) {
  return (
    <dl aria-live="polite" className="rounded-card border border-line bg-page p-5 text-sm tabular-nums">
      <div className="flex justify-between gap-4">
        <dt className="text-muted">Harga per bulan</dt>
        <dd>{formatRupiah(price)}</dd>
      </div>
      <div className="mt-2 flex justify-between gap-4">
        <dt className="text-muted">Durasi</dt>
        <dd>× {months} bulan</dd>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-4">
        <dt className="font-medium">Total</dt>
        <dd key={price * months} className="animate-fade-in text-2xl font-extrabold">
          {formatRupiah(price * months)}
        </dd>
      </div>
    </dl>
  )
}
