import { ViewTransition } from 'react'
import { Link } from 'react-router'
import Badge from '../ui/Badge.jsx'
import { getFacility } from '../../lib/facilities.js'
import { formatRupiah, imageSrcSet, shortAddress } from '../../lib/format.js'

export default function KostCard({ kost, index = 0 }) {
  const highlights = [`${kost.size.replace('x', '×')} m`, ...kost.facilities.slice(0, 2).map((f) => getFacility(f).label)]

  return (
    <Link
      to={`/kost/${kost.id}`}
      className="group stagger block animate-fade-up rounded-card transition-transform duration-200 active:scale-[0.98]"
      style={{ '--i': Math.min(index, 8) }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-hover">
        {/* Nama sama dengan foto pertama di Gallery detail (shared element) */}
        <ViewTransition name={`kost-${kost.id}`}>
          <img
            src={kost.images[0]}
            srcSet={imageSrcSet(kost.images[0])}
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            alt={`Foto ${kost.name}`}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
            className="size-full object-cover transition-transform duration-300 ease-out-soft group-hover:scale-[1.03]"
          />
        </ViewTransition>
        <Badge type={kost.type} className="absolute top-3 left-3" />
      </div>
      <div className="mt-3 space-y-0.5">
        <h3 className="line-clamp-1 font-semibold">{kost.name}</h3>
        <p className="line-clamp-1 text-sm text-muted">{shortAddress(kost.address)}</p>
        <p className="line-clamp-1 text-sm text-subtle">{highlights.join(' · ')}</p>
        <p className="pt-1 tabular-nums">
          <span className="font-semibold">{formatRupiah(kost.price)}</span>
          <span className="text-sm text-muted"> /bulan</span>
        </p>
      </div>
    </Link>
  )
}
