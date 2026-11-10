import { motion } from 'framer-motion'
import { CalendarPlus, Clock, MapPin, Navigation } from 'lucide-react'
import { cdn, eventStart, formatEventDate, formatEventTime, mapsUrl, wedding, type WeddingEvent } from '@/config/wedding'
import { cn } from '@/lib/utils'
import { Diya, SectionHeading } from './Ornaments'

function calendarUrl(event: WeddingEvent) {
  const title = `${event.name} · Kartik & Navya's Wedding`
  let dates: string
  if (event.time) {
    const start = eventStart(event)
    const end = new Date(start.getTime() + 4 * 3600 * 1000)
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    dates = `${fmt(start)}/${fmt(end)}`
  } else {
    const day = event.date.replace(/-/g, '')
    const next = new Date(`${event.date}T12:00:00Z`)
    next.setUTCDate(next.getUTCDate() + 1)
    dates = `${day}/${next.toISOString().slice(0, 10).replace(/-/g, '')}`
  }
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates,
    ctz: wedding.timeZone,
    details: `${event.description}\n\nWith love, ${wedding.hosts}`,
    location: [event.venue, event.address].filter(Boolean).join(', '),
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const featured = event.id === 'barat'
  const flip = index % 2 === 1
  const location = [event.venue, event.address].filter(Boolean).join(', ')

  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative md:grid md:grid-cols-2 md:gap-14"
    >
      {/* timeline node */}
      <div aria-hidden className="absolute top-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <div className="flex size-14 items-center justify-center rounded-full border-2 border-gold bg-paper shadow-md">
          <Diya className="h-8 w-9" delay={index * 0.4} />
        </div>
      </div>

      <div className={cn('overflow-hidden', flip && 'md:order-2')}>
        <div className={cn('frame overflow-hidden rounded-md bg-paper', featured && 'border-[3px]')}>
          <img
            src={cdn(event.image, 900)}
            srcSet={`${cdn(event.image, 600)} 600w, ${cdn(event.image, 900)} 900w, ${cdn(event.image, 1300)} 1300w`}
            sizes="(min-width: 768px) 40vw, 92vw"
            alt={`${event.name} illustration`}
            loading="lazy"
            width={1400}
            height={764}
            className="aspect-[16/10] w-full object-cover"
          />
        </div>
      </div>

      <div
        className={cn(
          'relative -mt-10 mx-3 rounded-md p-6 text-center md:mx-0 md:mt-0 md:self-center md:text-left',
          featured ? 'paper-maroon border-2 border-gold text-paper shadow-2xl' : 'paper frame',
          flip && 'md:order-1 md:text-right',
        )}
      >
        <p className={cn('font-display text-xs tracking-[0.35em] uppercase', featured ? 'text-gold-light' : 'text-gold')}>
          Function {index + 1} of {wedding.events.length}
        </p>
        <h3 className="mt-1">
          <span className={cn('font-hindi block text-4xl sm:text-5xl', featured ? 'text-gold-foil' : 'text-deep-red')}>
            {event.nameHindi}
          </span>
          <span className={cn('font-display text-2xl tracking-[0.2em] uppercase', featured ? 'text-paper' : 'text-maroon')}>
            {event.name}
          </span>
        </h3>
        <p className={cn('mt-3 text-lg leading-snug italic', featured ? 'text-paper/85' : 'text-ink/80')}>{event.description}</p>

        <dl className={cn('mt-4 space-y-2 text-base', featured ? 'text-paper/90' : 'text-ink')}>
          <div className={cn('flex items-start justify-center gap-2 md:justify-start', flip && 'md:flex-row-reverse')}>
            <CalendarPlus className={cn('mt-0.5 size-4 shrink-0', featured ? 'text-gold-light' : 'text-gold')} />
            <dt className="sr-only">Date</dt>
            <dd>
              <span className="font-semibold">{formatEventDate(event.date)}</span>
              <span className="font-hindi block text-sm opacity-80">{formatEventDate(event.date, 'hi')}</span>
            </dd>
          </div>
          <div className={cn('flex items-start justify-center gap-2 md:justify-start', flip && 'md:flex-row-reverse')}>
            <Clock className={cn('mt-0.5 size-4 shrink-0', featured ? 'text-gold-light' : 'text-gold')} />
            <dt className="sr-only">Time</dt>
            <dd>{formatEventTime(event.time)}</dd>
          </div>
          <div className={cn('flex items-start justify-center gap-2 md:justify-start', flip && 'md:flex-row-reverse')}>
            <MapPin className={cn('mt-0.5 size-4 shrink-0', featured ? 'text-gold-light' : 'text-gold')} />
            <dt className="sr-only">Venue</dt>
            <dd>{location || 'Venue details will be shared soon'}</dd>
          </div>
        </dl>

        <div className={cn('mt-5 flex flex-wrap justify-center gap-2 md:justify-start', flip && 'md:justify-end')}>
          <a
            href={calendarUrl(event)}
            target="_blank"
            rel="noreferrer"
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-display text-xs tracking-[0.15em] uppercase transition-colors',
              featured ? 'border-gold-light text-gold-light hover:bg-gold-light hover:text-maroon-deep' : 'border-maroon text-maroon hover:bg-maroon hover:text-paper',
            )}
          >
            <CalendarPlus className="size-3.5" /> Save the date
          </a>
          {location && (
            <a
              href={event.mapUrl || mapsUrl(location)}
              target="_blank"
              rel="noreferrer"
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-xs tracking-[0.15em] uppercase',
                featured ? 'bg-gold text-maroon-deep' : 'bg-maroon text-paper',
              )}
            >
              <Navigation className="size-3.5" /> Directions
            </a>
          )}
        </div>
      </div>
    </motion.li>
  )
}

export function EventTimeline() {
  return (
    <section id="events" className="relative scroll-mt-6 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-content">
        <SectionHeading hindi="मांगलिक कार्यक्रम" title="Wedding Functions" subtitle="Four days of rituals, colour and celebration" />
        <div className="relative">
          <div aria-hidden className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold to-transparent md:block" />
          <ol className="space-y-14 md:space-y-20">
            {wedding.events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
