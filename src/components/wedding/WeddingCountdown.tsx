import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PartyPopper } from 'lucide-react'
import { eventStart, formatEventDate, formatEventTime, wedding, type WeddingEvent } from '@/config/wedding'
import { cn } from '@/lib/utils'
import { Corners, SectionHeading, Swastik } from './Ornaments'

/** Ticks once a second on the client; null during SSR so markup stays stable. */
function useNow() {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

const UNITS = [
  { key: 'days', en: 'Days', hi: 'दिन' },
  { key: 'hours', en: 'Hours', hi: 'घंटे' },
  { key: 'minutes', en: 'Minutes', hi: 'मिनट' },
  { key: 'seconds', en: 'Seconds', hi: 'सेकंड' },
] as const

function Digit({ value, featured }: { value: number | null; featured: boolean }) {
  const text = value === null ? '--' : String(value).padStart(2, '0')
  return (
    <span className="relative inline-block overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ y: '-60%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '60%', opacity: 0 }}
          transition={{ duration: 0.35 }}
          className={cn('block font-display font-semibold', featured ? 'text-4xl sm:text-6xl' : 'text-3xl sm:text-4xl')}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function EventCountdown({ event, now, featured = false }: { event: WeddingEvent; now: number | null; featured?: boolean }) {
  const start = eventStart(event).getTime()
  const started = now !== null && now >= start
  const parts = now === null ? null : split(start - now)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      aria-label={`${event.name} countdown`}
      className={cn(
        'relative overflow-hidden rounded-md px-4 py-6 text-center sm:px-8',
        featured ? 'paper-maroon border-2 border-gold text-paper shadow-2xl sm:py-10' : 'paper frame text-ink',
      )}
    >
      {featured && <Corners />}
      <div className={cn('flex items-center justify-center gap-2', featured ? 'text-gold-light' : 'text-gold')}>
        <Swastik className="size-3.5" />
        <span className="font-display text-xs tracking-[0.3em] uppercase">{featured ? 'The Wedding Day' : 'Countdown'}</span>
        <Swastik className="size-3.5" />
      </div>
      <h3 className="mt-2 flex items-baseline justify-center gap-3">
        <span className={cn('font-hindi', featured ? 'text-gold-foil text-5xl sm:text-6xl' : 'text-3xl text-deep-red')}>
          {event.nameHindi}
        </span>
        <span className={cn('font-display tracking-[0.15em] uppercase', featured ? 'text-xl text-paper' : 'text-lg text-maroon')}>
          {event.name}
        </span>
      </h3>
      <p className={cn('mt-1 text-base italic', featured ? 'text-paper/80' : 'text-muted-foreground')}>
        {formatEventDate(event.date)} · {formatEventTime(event.time)}
      </p>

      <div className="mt-5" aria-live="polite">
        {started ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn('mx-auto flex max-w-md flex-col items-center gap-2 rounded-md border border-dashed p-4', featured ? 'border-gold-light' : 'border-gold')}
          >
            <PartyPopper className={cn('size-8', featured ? 'text-gold-light' : 'text-deep-red')} />
            <p className={cn('text-xl font-semibold', featured ? 'text-paper' : 'text-maroon')}>{event.celebrationMessage}</p>
          </motion.div>
        ) : (
          <div className={cn('mx-auto grid max-w-lg grid-cols-4', featured ? 'gap-2 sm:gap-4' : 'gap-1.5 sm:gap-2')}>
            {UNITS.map((u) => (
              <div
                key={u.key}
                className={cn(
                  'flex flex-col items-center rounded-sm border py-2 sm:py-3',
                  featured ? 'border-gold/70 bg-maroon-deep/40 text-gold-light' : 'border-gold/50 bg-paper-deep/50 text-maroon',
                )}
              >
                <Digit value={parts ? parts[u.key] : null} featured={featured} />
                <span className={cn('font-hindi text-sm', featured ? 'text-paper/90' : 'text-deep-red')}>{u.hi}</span>
                <span className={cn('text-[0.65rem] tracking-[0.15em] uppercase', featured ? 'text-paper/60' : 'text-muted-foreground')}>
                  {u.en}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}

export function WeddingCountdown() {
  const now = useNow()
  const barat = wedding.events.find((e) => e.id === 'barat')!
  const others = wedding.events.filter((e) => e.id !== 'barat')

  return (
    <section id="countdown" className="scroll-mt-6 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-content">
        <SectionHeading hindi="शुभ घड़ी की प्रतीक्षा" title="Counting the Moments" subtitle="Live countdowns in Indian Standard Time (IST)" />
        <EventCountdown event={barat} now={now} featured />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((e) => (
            <EventCountdown key={e.id} event={e} now={now} />
          ))}
        </div>
      </div>
    </section>
  )
}
