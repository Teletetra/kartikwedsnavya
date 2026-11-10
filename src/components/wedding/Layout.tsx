import { useEffect, useState } from 'react'
import { BookOpen, CalendarHeart, Home, Images } from 'lucide-react'
import { wedding } from '@/config/wedding'
import { cn } from '@/lib/utils'
import { Divider, DiyaRow, Om, Swastik } from './Ornaments'

const LINKS = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'events', label: 'Functions', Icon: CalendarHeart },
  { id: 'card', label: 'Card', Icon: BookOpen },
  { id: 'gallery', label: 'Gallery', Icon: Images },
]

/** Floating bottom navigation, thumb-friendly on phones */
export function NavDock() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <nav aria-label="Sections" className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:bottom-4">
      <ul className="flex w-full max-w-md items-center justify-between rounded-full border-2 border-gold bg-maroon/95 px-2 py-1.5 shadow-2xl backdrop-blur-sm">
        {LINKS.map(({ id, label, Icon }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={cn(
                'flex flex-col items-center rounded-full px-3 py-1 text-[0.65rem] tracking-[0.12em] uppercase transition-colors',
                active === id ? 'bg-gold text-maroon-deep' : 'text-paper/80 hover:text-gold-light',
              )}
            >
              <Icon className="size-4" />
              <span className="font-display">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="paper-maroon relative mt-10 overflow-hidden pt-14 pb-32 text-center text-paper sm:pb-24">
      <div className="motif-band absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-reading px-5">
        <Om className="text-gold-foil text-6xl" />
        <p className="font-hindi mt-4 text-2xl text-gold-light sm:text-3xl">"आपकी उपस्थिति ही हमारा सौभाग्य है"</p>
        <p className="mt-2 text-lg text-paper/80 italic">Your presence is our greatest blessing.</p>
        <Divider />
        <p className="font-script text-5xl text-gold-light">
          {wedding.groom.firstName} &amp; {wedding.bride.firstName}
        </p>
        <p className="mt-2 flex items-center justify-center gap-2 font-display tracking-[0.25em] uppercase">
          <Swastik className="size-3.5 text-gold-light" />
          {wedding.dateRange}
          <Swastik className="size-3.5 text-gold-light" />
        </p>
        <p className="mt-4 text-base text-paper/70">
          With love and warm regards — {wedding.hosts} · <span className="font-hindi">{wedding.hostsHindi}</span>
        </p>
        <DiyaRow className="mt-8" count={7} />
      </div>
    </footer>
  )
}
