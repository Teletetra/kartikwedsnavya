/**
 * Central wedding configuration.
 *
 * Every name, date, time, venue, photo and message shown on the site comes
 * from this file. Update the values here and the whole invitation updates.
 *
 * Times use 24-hour "HH:mm" in Indian Standard Time (Asia/Kolkata).
 * Leave `time` empty until the muhurat is fixed: the countdown then counts to
 * the start of that day (00:00 IST) and the card shows "to be announced".
 */

export type WeddingEventId = 'haldi' | 'mehndi' | 'mandha' | 'barat'

export interface WeddingEvent {
  id: WeddingEventId
  name: string
  nameHindi: string
  /** ISO date, YYYY-MM-DD (IST) */
  date: string
  /** "HH:mm" 24h IST, or '' if not yet decided */
  time: string
  venue: string
  address: string
  /** Short line shown on the event card */
  description: string
  /** Shown when the countdown reaches zero */
  celebrationMessage: string
  image: string
  /** Accent used for the card tint */
  accent: string
}

export interface GalleryItem {
  src: string
  alt: string
  category: 'couple' | 'family' | 'prewedding' | 'illustration'
}

export const wedding = {
  groom: {
    name: 'Kartik Rawal',
    firstName: 'Kartik',
    nameHindi: 'कार्तिक रावल',
    firstNameHindi: 'कार्तिक',
    /** e.g. "Son of Shri ... & Smt. ..." — leave '' to hide */
    parents: '' as string,
    parentsHindi: '' as string,
    /** Optional photograph in /public/img, e.g. '/img/kartik.jpg' */
    photo: '' as string,
  },
  bride: {
    name: 'Navya Choudhary',
    firstName: 'Navya',
    nameHindi: 'नव्या चौधरी',
    firstNameHindi: 'नव्या',
    parents: '' as string,
    parentsHindi: '' as string,
    photo: '' as string,
  },

  dateRange: '7 – 12 December 2026',
  dateRangeHindi: '७ – १२ दिसम्बर २०२६',
  timeZone: 'Asia/Kolkata',

  /** The family that sends the invitation (shown on the printed card) */
  hosts: 'The Choudhary Family',
  hostsHindi: 'समस्त चौधरी परिवार',

  blessingLine: 'With the blessings of Lord Ganesha and our families.',

  events: [
    {
      id: 'haldi',
      name: 'Haldi',
      nameHindi: 'हल्दी',
      date: '2026-12-07',
      time: '',
      venue: '',
      address: '',
      description:
        'Turmeric, marigolds and laughter — the first golden blessing of the celebrations.',
      celebrationMessage: 'The Haldi has begun! May the glow of turmeric bless the couple. 🌼',
      image: '/img/haldi.jpg',
      accent: '#D99A1E',
    },
    {
      id: 'mehndi',
      name: 'Mehndi',
      nameHindi: 'मेहंदी',
      date: '2026-12-10',
      time: '',
      venue: '',
      address: '',
      description:
        'An evening of henna, songs and dholak as the bride’s hands bloom with colour.',
      celebrationMessage: 'Mehndi rang laayi! The henna evening is on. 🌿',
      image: '/img/mehndi.jpg',
      accent: '#4F6B2A',
    },
    {
      id: 'mandha',
      name: 'Mandha',
      nameHindi: 'मंढा',
      date: '2026-12-11',
      time: '',
      venue: '',
      address: '',
      description:
        'The sacred mandap is raised and the family gathers for the auspicious rituals.',
      celebrationMessage: 'The Mandha rituals have begun. Shubh aashirwad! 🪔',
      image: '/img/mandha.jpg',
      accent: '#B0452A',
    },
    {
      id: 'barat',
      name: 'Barat',
      nameHindi: 'बारात',
      date: '2026-12-12',
      time: '',
      venue: '',
      address: '',
      description:
        'The groom rides out on his ghodi with dhol, shehnai and dancing family — the grand wedding day.',
      celebrationMessage: 'The Barat has arrived! Shubh Vivah — Kartik weds Navya. 🐎✨',
      image: '/img/barat.jpg',
      accent: '#741C28',
    },
  ] as WeddingEvent[],

  /** Main venue for the Location section */
  venue: {
    name: '' as string,
    address: '' as string,
    /** Google Maps search text or "lat,lng". Leave '' until the venue is fixed. */
    mapQuery: '' as string,
  },

  /** Optional contact for guests, e.g. '+91 98xxxxxxx' — '' hides it */
  contactPhone: '' as string,

  gallery: [
    { src: '/img/couple.jpg', alt: 'Illustration of Kartik and Navya exchanging varmala', category: 'couple' },
    { src: '/img/mandap.jpg', alt: 'The pheras around the sacred fire under the mandap', category: 'illustration' },
    { src: '/img/barat.jpg', alt: 'The groom on a decorated ghodi with the barat procession', category: 'illustration' },
    { src: '/img/haldi.jpg', alt: 'Haldi bowls with marigold garlands', category: 'illustration' },
    { src: '/img/mehndi.jpg', alt: 'Bridal mehndi hands with roses', category: 'illustration' },
    { src: '/img/mandha.jpg', alt: 'The decorated mandap for the Mandha rituals', category: 'illustration' },
    { src: '/img/ganesh.jpg', alt: 'Lord Ganesha seated on a lotus', category: 'illustration' },
    // Add photographs here, e.g.
    // { src: '/img/photos/family-1.jpg', alt: 'The Choudhary family', category: 'family' },
    // { src: '/img/photos/prewedding-1.jpg', alt: 'Pre-wedding shoot', category: 'prewedding' },
  ] as GalleryItem[],

  music: {
    /**
     * Optional recorded track in /public/audio (e.g. '/audio/shehnai.mp3').
     * When empty, a gentle shehnai-and-dhol melody is synthesised in the browser.
     */
    src: '' as string,
  },
}

export type Wedding = typeof wedding

/** Returns the absolute instant an event starts, interpreted in IST (+05:30). */
export function eventStart(event: Pick<WeddingEvent, 'date' | 'time'>): Date {
  const time = event.time || '00:00'
  return new Date(`${event.date}T${time}:00+05:30`)
}

const HINDI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']
export function toHindiDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => HINDI_DIGITS[Number(d)])
}

export function formatEventDate(date: string, locale: 'en' | 'hi' = 'en') {
  const d = new Date(`${date}T12:00:00+05:30`)
  if (locale === 'hi') {
    const weekday = new Intl.DateTimeFormat('hi-IN', { weekday: 'long', timeZone: 'Asia/Kolkata' }).format(d)
    const month = new Intl.DateTimeFormat('hi-IN', { month: 'long', timeZone: 'Asia/Kolkata' }).format(d)
    const [year, , day] = date.split('-')
    return `${weekday}, ${toHindiDigits(Number(day))} ${month} ${toHindiDigits(year)}`
  }
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(d)
}

export function formatEventTime(time: string, locale: 'en' | 'hi' = 'en') {
  if (!time) return locale === 'hi' ? 'समय शीघ्र सूचित किया जाएगा' : 'Muhurat time to be announced'
  const [h, m] = time.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour12 = ((h + 11) % 12) + 1
  const en = `${hour12}:${String(m).padStart(2, '0')} ${suffix} IST`
  return locale === 'hi' ? toHindiDigits(`${hour12}:${String(m).padStart(2, '0')}`) + (h >= 12 ? ' बजे सायं' : ' बजे प्रातः') : en
}

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

/** Netlify Image CDN URL for a file in /public */
export function cdn(src: string, width: number) {
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=webp&q=80`
}
