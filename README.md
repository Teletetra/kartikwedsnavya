# Kartik weds Navya — शुभ विवाह

A traditional North Indian Hindu wedding invitation website for **Kartik Choudhary & Navya Choudhary**, celebrating Haldi, Mehndi, Mandha and Barat on **6, 10, 11 and 12 December 2026**.

The site opens like a real wedding card: guests see a printed envelope with a Ganesh Ji seal, tap **Open Invitation**, and the flap lifts, the card slides out, petals shower and the invitation is revealed — with "Din Shagna Da" playing in the background. It is designed mobile-first, because most guests will open it from WhatsApp.

## What's inside

- **Opening envelope**: ॥ श्री गणेशाय नमः ॥, शुभ विवाह, the couple's names and dates, an animated open button and a music toggle.
- **Live countdowns**: four separate timers in Indian Standard Time, with the Barat shown as the main wedding countdown. Each one switches to a celebration message once its event starts.
- **Bride & Groom**: "दो दिल, एक खूबसूरत रिश्ता", with a couple illustration and optional photographs.
- **Wedding functions**: an illustrated timeline of all four events, with "Save the date" (Google Calendar) and directions links.
- **Printed invitation card**: a two-page Hindi card with the Ganesh shloka, invitation wording, names, every function and शुभ विवाह. It opens as a book on desktop and turns pages on mobile.
- **Gallery**: category filters and a full-screen viewer that supports swipe and the keyboard.
- **Venue & map**: the venue address, a Google Maps embed and a navigation button.
- **Atmosphere**: floating petals, flickering diyas, slowly turning mandalas, gold-foil type, and background music that starts only after the guest taps.

## Updating the wedding details

All names, dates, times, venues, photos and messages are in **`src/config/wedding.ts`**.

- **Times** use 24-hour `HH:mm` in IST (for example `'18:30'`). While `time` is empty, the card shows "Muhurat time to be announced" and the countdown runs to midnight IST at the start of that day.
- **Venues**: fill in `venue` and `address` for each event, plus the main `venue` block. The map and Directions buttons appear automatically.
- **Photos**: put the files in `public/img/` and set `groom.photo` / `bride.photo`, or add entries to `gallery` with the category `couple`, `family`, `prewedding` or `illustration`.
- **Music**: the song is `public/audio/din-shagna-da.mp3`. To change it, add another file to `public/audio/` and update `music.src` and `music.title`.
- **Family names**: `parents` / `parentsHindi`, `hosts` / `hostsHindi`.

## Tech stack

- TanStack Start (React 19, TypeScript) on Netlify
- Tailwind CSS 4 (the theme is in `src/styles.css`)
- Framer Motion for animations, Lucide React for icons
- Netlify Image CDN for resized WebP images
- Google Fonts: Tiro Devanagari Hindi, Noto Serif Devanagari, Cinzel, Cormorant Garamond and Great Vibes

## Running locally

```bash
pnpm install
netlify dev        # full Netlify emulation (forms, image CDN) on http://localhost:8888
# or
pnpm dev           # Vite only, on http://localhost:3000
```

