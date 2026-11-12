import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Phone } from 'lucide-react'
import { formatEventDate, mapsUrl, wedding, type WeddingEventId } from '@/config/wedding'
import { Corners, Mandala, SectionHeading } from './Ornaments'

export function VenueSection() {
  const { contactPhone } = wedding
  const [selectedEventId, setSelectedEventId] = useState<WeddingEventId>('mandha')
  const selectableEvents = wedding.events.filter((event) => event.id === 'mandha' || event.id === 'barat')
  const selectedEvent = selectableEvents.find((event) => event.id === selectedEventId) ?? selectableEvents[0]
  const selectedLocation = selectedEvent
    ? [selectedEvent.venue, selectedEvent.address].filter(Boolean).join(', ')
    : ''
  const selectedMapUrl = selectedEvent?.mapUrl || (selectedLocation ? mapsUrl(selectedLocation) : '')
  const mapEmbedUrl = selectedEvent?.mapEmbedUrl || ''

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
            <h3 className="mt-3 font-display text-2xl tracking-[0.12em] uppercase">
              {selectedEvent?.venue || selectedEvent?.name || 'Venue to be announced'}
            </h3>
            <p className="mt-2 text-lg text-paper/85">
              {selectedEvent ? selectedLocation : 'The full address and directions will be shared here shortly.'}
            </p>

            <div className="mt-6 border-t border-gold/40 pt-5">
              <p className="mb-3 font-display text-xs tracking-[0.2em] text-gold-light uppercase">Choose a function location</p>
              <ul className="space-y-2">
                {selectableEvents.map((event) => {
                  const hasLocation = Boolean(event.mapUrl && event.mapEmbedUrl)
                  const isSelected = event.id === selectedEventId
                  return (
                    <li key={event.id}>
                      {hasLocation ? (
                        <button
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setSelectedEventId(event.id)}
                          className={`flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded px-3 py-2 text-left transition-colors ${isSelected ? 'bg-gold/20 ring-1 ring-gold/70' : 'hover:bg-white/10'}`}
                        >
                          <span>
                            <span className="font-hindi text-xl text-gold-light">{event.nameHindi}</span>{' '}
                            <span className="font-display text-sm tracking-[0.15em] uppercase">{event.name}</span>
                          </span>
                          <span className="text-sm text-paper/80">
                            {formatEventDate(event.date).replace(/, \d{4}$/, '')}
                            {event.venue ? ` · ${event.venue}` : ` · ${event.address}`}
                          </span>
                        </button>
                      ) : (
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 px-3 py-2 opacity-75">
                          <span>
                            <span className="font-hindi text-xl text-gold-light">{event.nameHindi}</span>{' '}
                            <span className="font-display text-sm tracking-[0.15em] uppercase">{event.name}</span>
                          </span>
                          <span className="text-sm text-paper/75">Venue details will be shared soon</span>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {selectedMapUrl ? (
                <a
                  href={selectedMapUrl}
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
            {mapEmbedUrl ? (
              <iframe
                title={`${selectedEvent?.name ?? 'Wedding'} venue map`}
                src={mapEmbedUrl}
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
