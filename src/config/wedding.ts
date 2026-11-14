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
  /** Optional event-specific Google Maps directions URL */
  mapUrl?: string
  /** Optional Google Maps embed URL for the venue map */
  mapEmbedUrl?: string
}

export interface GalleryItem {
  src: string
  alt: string
  category: 'couple' | 'family' | 'prewedding' | 'illustration'
}

export const wedding = {
  groom: {
    name: 'Kartik Choudhary',
    firstName: 'Kartik',
    nameHindi: 'कार्तिक चौधरी',
    firstNameHindi: 'कार्तिक',
    /** e.g. "Son of Shri ... & Smt. ..." — leave '' to hide */
    parents: 'Son of Pradeep Kumar & Omlata Devi' as string,
    parentsHindi: 'सुपुत्र श्री प्रदीप कुमार एवं श्रीमती ओमलता देवी' as string,
    /** Optional photograph in /public/img, e.g. '/img/kartik.jpg' */
    photo: '' as string,
  },
  bride: {
    name: 'Navya Choudhary',
    firstName: 'Navya',
    nameHindi: 'नव्या चौधरी',
    firstNameHindi: 'नव्या',
    parents: 'Daughter of Lokesh Kumar & Rajni Devi' as string,
    parentsHindi: 'सुपुत्री श्री लोकेश कुमार एवं श्रीमती रजनी देवी' as string,
    photo: '' as string,
  },

  dateRange: '6 – 12 December 2026',
  dateRangeHindi: '६ – १२ दिसम्बर २०२६',
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
      date: '2026-12-06',
      time: '',
      venue: 'Seekri Kalan',
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
      venue: 'Seekri Kalan',
      address: '',
      description:
        'Henna, Ladies Sangeet, songs and dholak as the bride’s hands bloom with colour.',
      celebrationMessage: 'Mehndi rang laayi! The henna evening is on. 🌿',
      image: '/img/mehndi.jpg',
      accent: '#4F6B2A',
    },
    {
      id: 'mandha',
      name: 'Mandha',
      nameHindi: 'मंढा',
      date: '2026-12-11',
      time: '09:30',
      venue: 'Ch. Yashpal Singh House',
      address: 'Seekri, Uttar Pradesh 247231',
      description:
        'Lagan Sagai at 8:30 AM, then the sacred Mandha rituals at 9:30 AM. Lunch from 11:00 AM onwards.',
      celebrationMessage: 'The Mandha rituals have begun. Shubh aashirwad! 🪔',
      image: '/img/mandha.jpg',
      accent: '#B0452A',
      mapUrl: 'https://maps.app.goo.gl/TbHKqaVvqQTahqGL7',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m17!1m11!1m3!1d690.1060824919845!2d77.47752891320171!3d30.04056543097304!2m2!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ee90034ec67df%3A0x16f1d7fd1fb9a3ac!2sCh.%20Yashpal%20Singh%20House!5e1!3m2!1sen!2sin!4v1794471594322!5m2!1sen!2sin',
    },
    {
      id: 'barat',
      name: 'Barat',
      nameHindi: 'बारात',
      date: '2026-12-12',
      time: '10:00',
      venue: 'Veer Farm',
      address: 'Near Titron, Nakur, Saharanpur, Uttar Pradesh',
      description:
        'The groom rides out on his ghodi with dhol, shehnai and dancing family — the grand wedding day.',
      celebrationMessage: 'The Barat has arrived! Shubh Vivah — Kartik weds Navya. 🐎✨',
      image: '/img/barat.jpg',
      accent: '#741C28',
      mapUrl: 'https://maps.app.goo.gl/py6STvqbRJ6s3bZN7',
      mapEmbedUrl: 'https://www.google.com/maps?q=Veer%20Farms%2C%20Titron%2C%20Nakur%2C%20Saharanpur%2C%20Uttar%20Pradesh&z=15&output=embed',
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
    /** The background song in /public/audio, played on a loop */
    src: '/audio/din-shagna-da.mp3',
    /** Name shown on the music button while the song plays */
    title: 'Din Shagna Da',
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
