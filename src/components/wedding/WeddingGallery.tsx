import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { cdn, wedding, type GalleryItem } from '@/config/wedding'
import { cn } from '@/lib/utils'
import { SectionHeading } from './Ornaments'

const FILTERS: { id: 'all' | GalleryItem['category']; label: string; hindi: string }[] = [
  { id: 'all', label: 'All', hindi: 'सभी' },
  { id: 'couple', label: 'Couple', hindi: 'जोड़ी' },
  { id: 'family', label: 'Family', hindi: 'परिवार' },
  { id: 'prewedding', label: 'Pre-wedding', hindi: 'प्री-वेडिंग' },
  { id: 'illustration', label: 'Illustrations', hindi: 'चित्र' },
]

function Lightbox({ items, index, onClose, onIndex }: { items: GalleryItem[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const item = items[index]
  const prev = useCallback(() => onIndex((index - 1 + items.length) % items.length), [index, items.length, onIndex])
  const next = useCallback(() => onIndex((index + 1) % items.length), [index, items.length, onIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [onClose, prev, next])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo preview"
      className="fixed inset-0 z-[70] flex flex-col bg-[#1f0a0e]/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-paper">
        <p className="font-display text-sm tracking-[0.2em]">
          {index + 1} / {items.length}
        </p>
        <button type="button" onClick={onClose} aria-label="Close preview" autoFocus className="flex size-10 items-center justify-center rounded-full border border-gold/60 text-gold-light">
          <X className="size-5" />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={item.src}
            src={cdn(item.src, 1600)}
            alt={item.alt}
            className="max-h-[78svh] max-w-full rounded-sm border-2 border-gold object-contain shadow-2xl"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) next()
              if (info.offset.x > 60) prev()
            }}
          />
        </AnimatePresence>
        {items.length > 1 && (
          <>
            <button type="button" onClick={prev} aria-label="Previous photo" className="absolute left-2 flex size-11 items-center justify-center rounded-full bg-maroon/80 text-paper sm:left-6">
              <ChevronLeft className="size-6" />
            </button>
            <button type="button" onClick={next} aria-label="Next photo" className="absolute right-2 flex size-11 items-center justify-center rounded-full bg-maroon/80 text-paper sm:right-6">
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>
      <p className="px-6 py-4 text-center text-lg text-paper/85 italic">{item.alt}</p>
    </motion.div>
  )
}

export function WeddingGallery() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('all')
  const [open, setOpen] = useState<number | null>(null)
  const items = useMemo(() => (filter === 'all' ? wedding.gallery : wedding.gallery.filter((g) => g.category === filter)), [filter])

  return (
    <section id="gallery" className="scroll-mt-6 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-content">
        <SectionHeading hindi="यादों का एल्बम" title="Wedding Gallery" subtitle="Moments from our story — tap any picture to view it full screen" />

        <div role="tablist" aria-label="Gallery categories" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:justify-center">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              type="button"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2 text-base transition-colors',
                filter === f.id ? 'border-maroon bg-maroon text-paper' : 'border-gold/70 text-maroon hover:bg-paper-deep',
              )}
            >
              {f.label} <span className="font-hindi text-sm opacity-75">· {f.hindi}</span>
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="paper frame mx-auto flex max-w-md flex-col items-center rounded-md p-10 text-center">
            <Camera className="size-10 text-gold" />
            <p className="mt-3 font-display text-lg tracking-[0.12em] text-maroon uppercase">Photographs coming soon</p>
            <p className="mt-1 text-ink/75 italic">These memories will be added as the celebrations unfold.</p>
          </div>
        ) : (
          <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
            <AnimatePresence initial={false}>
              {items.map((item, i) => (
                <motion.li
                  key={item.src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="mb-3 break-inside-avoid sm:mb-4"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    className="group relative block w-full overflow-hidden rounded-sm border-2 border-gold/80 bg-paper p-1 shadow-md focus-visible:ring-4 focus-visible:ring-gold/50 focus-visible:outline-none"
                  >
                    <img
                      src={cdn(item.src, 700)}
                      alt={item.alt}
                      loading="lazy"
                      width={700}
                      height={i % 3 === 0 ? 875 : 525}
                      className={cn(
                        'w-full object-cover transition-transform duration-700 group-hover:scale-105',
                        i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]',
                      )}
                    />
                    <span className="absolute inset-1 flex items-end justify-end bg-gradient-to-t from-maroon-deep/60 via-transparent to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Expand className="size-5 text-paper" />
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      <AnimatePresence>
        {open !== null && items[open] && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
      </AnimatePresence>
    </section>
  )
}
