import { useRef, useState, ViewTransition } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { imageSrcSet } from '../../lib/format.js'

// Swipe = scroll-snap bawaan browser; foto aktif dibaca dari posisi scroll
export default function Gallery({ id, images, name }) {
  const track = useRef(null)
  const [active, setActive] = useState(0)
  const many = images.length > 1

  const go = (i) => {
    const el = track.current
    const next = Math.max(0, Math.min(images.length - 1, i))
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div>
      <div className="relative -mx-4 md:mx-0">
        <div
          ref={track}
          tabIndex={many ? 0 : undefined}
          role="region"
          aria-roledescription="galeri"
          aria-label={`Foto ${name}`}
          onScroll={(e) => setActive(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(active + 1)
            if (e.key === 'ArrowLeft') go(active - 1)
          }}
          className="no-scrollbar flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto bg-hover md:aspect-[16/10] md:rounded-card"
        >
          {images.map((src, i) => {
            const img = (
              <img
                key={src}
                src={src}
                srcSet={imageSrcSet(src)}
                sizes="(min-width: 1024px) 66vw, 100vw"
                alt={`${name}, foto ${i + 1} dari ${images.length}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
                className="size-full shrink-0 snap-center object-cover"
              />
            )
            // Nama sama dengan foto di KostCard, jadi foto "terbang" dari kartu ke sini
            return i === 0 ? (
              <ViewTransition key={src} name={`kost-${id}`}>
                {img}
              </ViewTransition>
            ) : (
              img
            )
          })}
        </div>

        {many && (
          <>
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5 md:hidden" aria-hidden>
              {images.map((src, i) => (
                <span
                  key={src}
                  className={`h-1.5 rounded-full bg-white transition-opacity duration-200 ${i === active ? 'w-4' : 'w-1.5 opacity-60'}`}
                />
              ))}
            </div>
            <span className="absolute right-3 bottom-3 hidden rounded-md bg-ink/70 px-2 py-0.5 text-xs font-medium text-white tabular-nums md:block">
              {active + 1} / {images.length}
            </span>
            {[
              { dir: -1, label: 'Foto sebelumnya', Icon: ChevronLeft, side: 'left-3' },
              { dir: 1, label: 'Foto berikutnya', Icon: ChevronRight, side: 'right-3' },
            ].map(({ dir, label, Icon, side }) => (
              <button
                key={dir}
                type="button"
                aria-label={label}
                onClick={() => go(active + dir)}
                disabled={dir < 0 ? active === 0 : active === images.length - 1}
                className={`absolute top-1/2 ${side} hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-raise transition-[opacity,transform] duration-200 active:scale-95 disabled:opacity-0 md:grid`}
              >
                <Icon size={20} />
              </button>
            ))}
          </>
        )}
      </div>

      {many && (
        <div className="no-scrollbar mt-3 hidden gap-2 overflow-x-auto md:flex">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Foto ${i + 1} dari ${images.length}`}
              aria-current={i === active || undefined}
              onClick={() => go(i)}
              className={`size-18 shrink-0 overflow-hidden rounded-lg transition-opacity duration-200 ${i === active ? 'ring-2 ring-primary-600 ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
            >
              <img src={src.replace(/\.webp$/, '-sm.webp')} alt="" loading="lazy" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
