import { LayoutGrid, Mars, Venus } from 'lucide-react'
import Chip from '../ui/Chip.jsx'

const typeOptions = [
  { value: '', label: 'Semua', icon: LayoutGrid },
  { value: 'pria', label: 'Putra', icon: Mars },
  { value: 'wanita', label: 'Putri', icon: Venus },
]

const priceOptions = [
  { value: 'lt400', label: '≤ 400rb' },
  { value: '400-700', label: '400–700rb' },
  { value: 'gt700', label: '> 700rb' },
]

// Nilai dan onChange datang dari HomePage (disinkronkan ke URL)
export default function FilterBar({ type, price, onChange }) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-3 md:mx-0 md:px-0">
      <div role="group" aria-label="Tipe kost" className="flex gap-2">
        {typeOptions.map((o) => (
          <Chip key={o.label} icon={o.icon} active={type === o.value} onClick={() => onChange('type', o.value)}>
            {o.label}
          </Chip>
        ))}
      </div>
      <span className="my-2 w-px shrink-0 bg-line" aria-hidden />
      <div role="group" aria-label="Harga per bulan" className="flex gap-2">
        {priceOptions.map((o) => (
          <Chip
            key={o.value}
            active={price === o.value}
            onClick={() => onChange('price', price === o.value ? '' : o.value)}
          >
            {o.label}
          </Chip>
        ))}
      </div>
    </div>
  )
}
