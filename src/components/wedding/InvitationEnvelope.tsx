import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MailOpen, Music2 } from 'lucide-react'
import { cdn, wedding } from '@/config/wedding'
import { Corners, Divider, Kalash, Mandala, Swastik } from './Ornaments'
import { PetalBurst } from './Petals'

type Phase = 'closed' | 'opening' | 'leaving'

/**
 * Full-screen traditional envelope shown on first load. Clicking
 * "Open Invitation" breaks the Ganesh seal, lifts the flap, slides out the
 * card, showers petals and reveals the site.
 */
export function InvitationEnvelope({
  onOpen,
  onDone,
}: {
  /** Called on the click (a user gesture) — start music here */
  onOpen: (withMusic: boolean) => void
  /** Called when the reveal animation has finished */
  onDone: () => void
}) {
  const [phase, setPhase] = useState<Phase>('closed')
  const [flapBehind, setFlapBehind] = useState(false)
  const [withMusic, setWithMusic] = useState(true)

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [])

  function open() {
    if (phase !== 'closed') return
    onOpen(withMusic)
    setPhase('opening')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      onDone()
      return
    }
    window.setTimeout(() => setFlapBehind(true), 750)
    window.setTimeout(() => setPhase('leaving'), 2500)
    window.setTimeout(onDone, 3300)
  }

  const opening = phase !== 'closed'

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation envelope"
      className="paper-maroon fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-3 py-4"
      animate={phase === 'leaving' ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <Mandala className="mandala-spin absolute size-[150vmax] text-gold/15" />
      <div aria-hidden className="motif-band absolute inset-x-0 top-0" />
      <div aria-hidden className="motif-band absolute inset-x-0 bottom-0" />

      {opening && <PetalBurst />}

      <motion.div
        className="relative w-[min(92vw,440px)]"
        style={{ height: 'min(86svh, 700px)', perspective: 1400 }}
        initial={{ y: 30, opacity: 0, scale: 0.96 }}
        animate={opening ? { y: 50, opacity: 1, scale: 0.98 } : { y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Inner card that slides out */}
        <motion.div
          aria-hidden
          className="paper frame absolute inset-x-5 top-3 z-[5] flex h-[58%] flex-col items-center justify-start rounded-sm pt-6 text-center"
          initial={{ y: 0 }}
          animate={opening ? { y: '-58%' } : { y: 0 }}
          transition={{ delay: 0.85, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Kalash className="size-12 text-gold" />
          <p className="font-hindi mt-2 text-4xl text-maroon">शुभ विवाह</p>
          <p className="font-script mt-1 text-3xl text-deep-red">
            {wedding.groom.firstName} &amp; {wedding.bride.firstName}
          </p>
        </motion.div>

        {/* Envelope body */}
        <div className="paper absolute inset-0 z-10 overflow-hidden rounded-md border-[3px] border-maroon shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]">
          <div className="pointer-events-none absolute inset-2 rounded-sm border border-gold" />
          <div className="pointer-events-none absolute inset-3.5 rounded-sm border border-gold/50" />
          <Corners />

          <div className="relative flex h-full flex-col items-center justify-end px-6 pt-[calc(31%+52px)] pb-6 text-center sm:px-8">
            <div className="flex flex-1 flex-col items-center justify-center gap-1">
              <p className="font-hindi text-xl text-deep-red sm:text-2xl">॥ श्री गणेशाय नमः ॥</p>
              <p className="max-w-xs text-base leading-snug text-ink/85 italic sm:text-lg">{wedding.blessingLine}</p>
              <Divider className="py-1" />
              <p className="font-hindi text-gold-foil text-5xl leading-tight sm:text-6xl">शुभ विवाह</p>
              <div className="mt-2 font-display text-maroon">
                <p className="text-xl font-semibold tracking-[0.16em] sm:text-2xl">{wedding.groom.name.toUpperCase()}</p>
                <p className="font-script my-0.5 text-3xl text-gold normal-case">&amp;</p>
                <p className="text-xl font-semibold tracking-[0.16em] sm:text-2xl">{wedding.bride.name.toUpperCase()}</p>
              </div>
              <div className="mt-2 flex items-center gap-2 text-deep-red">
                <Swastik className="size-3.5" />
                <p className="font-display text-sm tracking-[0.2em] sm:text-base">{wedding.dateRange.toUpperCase()}</p>
                <Swastik className="size-3.5" />
              </div>
            </div>

            <motion.button
              type="button"
              onClick={open}
              disabled={opening}
              className="group relative mt-4 inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-gold bg-maroon px-7 py-3 font-display text-sm font-semibold tracking-[0.2em] text-paper uppercase shadow-lg focus-visible:ring-4 focus-visible:ring-gold/50 focus-visible:outline-none"
              animate={opening ? { scale: 0.9, opacity: 0 } : { scale: [1, 1.04, 1] }}
              transition={opening ? { duration: 0.3 } : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-gold-light/40 to-transparent transition-transform duration-1000 group-hover:translate-x-[300%] motion-safe:animate-[shine_3s_ease-in-out_infinite]" />
              <MailOpen className="size-4 text-gold-light" />
              Open Invitation
            </motion.button>

            <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-ink/80 select-none">
              <input
                type="checkbox"
                checked={withMusic}
                onChange={(e) => setWithMusic(e.target.checked)}
                className="size-4 accent-[var(--maroon)]"
              />
              <Music2 className="size-3.5 text-gold" />
              Play shehnai &amp; dhol music
            </label>
          </div>
        </div>

        {/* Flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[31%] origin-top"
          style={{ zIndex: flapBehind ? 1 : 20, transformStyle: 'preserve-3d' }}
          initial={{ rotateX: 0 }}
          animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="size-full drop-shadow-[0_6px_6px_rgb(0_0_0/0.35)]">
            <defs>
              <linearGradient id="flapFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#8b252b" />
                <stop offset="1" stopColor="#5e1520" />
              </linearGradient>
            </defs>
            <path d="M0 0h100L54 47q-4 3-8 0z" fill="url(#flapFill)" stroke="#b38a45" strokeWidth=".6" vectorEffect="non-scaling-stroke" />
            <path d="M5 2h90L53 42q-3 2.4-6 0z" fill="none" stroke="#d9b872" strokeWidth=".5" strokeDasharray="1.5 1.2" vectorEffect="non-scaling-stroke" opacity=".8" />
          </svg>
        </motion.div>

        {/* Ganesh wax seal */}
        <motion.div
          className="absolute left-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ top: '31%' }}
          animate={opening ? { scale: 0, rotate: 90, opacity: 0 } : { scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative size-[96px] rounded-full bg-gradient-to-br from-gold-light via-gold to-[#7d5a22] p-[5px] shadow-[0_8px_20px_rgb(0_0_0/0.45)]">
            <div className="size-full overflow-hidden rounded-full border-2 border-maroon bg-paper">
              <img
                src={cdn('/img/ganesh.jpg', 240)}
                alt=""
                width={240}
                height={270}
                className="size-full scale-110 object-cover object-[50%_35%]"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
