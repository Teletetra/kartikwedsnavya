import { motion } from 'framer-motion'
import { MapPin, Navigation, Phone } from 'lucide-react'
import { formatEventDate, mapsUrl, wedding } from '@/config/wedding'
import { Corners, Mandala, SectionHeading } from './Ornaments'

export function VenueSection() {
  const { venue, contactPhone } = wedding
  const query = venue.mapQuery || [venue.name, venue.address].filter(Boolean).join(', ')

  return (
    <section id="venue" className="scroll-mt-6 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-content">
        <SectionHeading hindi="विवाह स्थल" title="Venue & Location" subtitle="We look forward to welcoming you" />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="paper-maroon relative overflow-hidden rounded-md border-2 border-gold p-7 text-paper sm:p-9"
          >
            <Corners />
            <MapPin className="size-8 text-gold-light" />
            <h3 className="mt-3 font-display text-2xl tracking-[0.12em] uppercase">{venue.name || 'Venue to be announced'}</h3>
            <p className="mt-2 text-lg text-paper/85">
              {venue.address || 'The full address and directions will be shared here shortly.'}
            </p>

            <ul className="mt-6 space-y-3 border-t border-gold/40 pt-5">
              {wedding.events.map((e) => (
                <li key={e.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <span>
                    <span className="font-hindi text-xl text-gold-light">{e.nameHindi}</span>{' '}
                    <span className="font-display text-sm tracking-[0.15em] uppercase">{e.name}</span>
                  </span>
                  <span className="text-base text-paper/80">
                    {formatEventDate(e.date).replace(/, \d{4}$/, '')}
                    {e.venue ? ` · ${e.venue}` : ''}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              {query ? (
                <a
                  href={mapsUrl(query)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-display text-xs font-semibold tracking-[0.18em] text-maroon-deep uppercase shadow"
                >
                  <Navigation className="size-4" /> Open in Google Maps
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-5 py-3 font-display text-xs tracking-[0.18em] text-gold-light uppercase">
                  <Navigation className="size-4" /> Map link coming soon
                </span>
              )}
              {contactPhone && (
                <a
                  href={`tel:${contactPhone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-full border border-gold-light px-5 py-3 font-display text-xs tracking-[0.18em] text-gold-light uppercase"
                >
                  <Phone className="size-4" /> Call family
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="frame relative min-h-80 overflow-hidden rounded-md bg-paper"
          >
            {query ? (
              <iframe
                title="Wedding venue map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
                className="absolute inset-0 size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="paper absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <Mandala className="mandala-spin absolute size-[130%] text-gold/20" />
                <MapPin className="relative size-12 text-maroon" />
                <p className="font-hindi relative mt-3 text-2xl text-deep-red">स्थान की जानकारी शीघ्र</p>
                <p className="relative mt-1 max-w-xs text-lg text-ink/75 italic">
                  The map will appear here as soon as the venue is confirmed.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
