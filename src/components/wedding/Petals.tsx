import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#e8891c', '#f2b31b', '#c2272d', '#a3162b', '#f6e7c8', '#e35d3a']

function Petal({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden>
      <path d="M10 1c5 4 7 9 4 15-1 2-3 3-4 3s-3-1-4-3C3 10 5 5 10 1z" fill={color} opacity=".92" />
      <path d="M10 3v14" stroke="rgb(0 0 0 / .15)" strokeWidth=".8" />
    </svg>
  )
}

interface Spec {
  left: number
  size: number
  color: string
  dur: number
  delay: number
  drift: number
  spin: number
}

function makeSpecs(count: number): Spec[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    size: 10 + Math.random() * 14,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    dur: 10 + Math.random() * 12,
    delay: -Math.random() * 20,
    drift: (Math.random() - 0.5) * 160,
    spin: 360 + Math.random() * 540,
  }))
}

/** Gentle, continuous petal fall across the viewport (client-only). */
export function PetalShower({ count = 14 }: { count?: number }) {
  const [specs, setSpecs] = useState<Spec[]>([])
  useEffect(() => {
    const isSmall = window.innerWidth < 640
    setSpecs(makeSpecs(isSmall ? Math.ceil(count * 0.6) : count))
  }, [count])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {specs.map((s, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${s.left}%`,
              '--dur': `${s.dur}s`,
              '--delay': `${s.delay}s`,
              '--drift': `${s.drift}px`,
              '--spin': `${s.spin}deg`,
            } as React.CSSProperties
          }
        >
          <Petal color={s.color} size={s.size} />
        </span>
      ))}
    </div>
  )
}

/** One-time burst of petals from the centre, used when the envelope opens. */
export function PetalBurst({ count = 46 }: { count?: number }) {
  const [specs] = useState(() =>
    Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2
      const dist = 140 + Math.random() * 380
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 80,
        size: 12 + Math.random() * 16,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: (Math.random() - 0.5) * 720,
        delay: Math.random() * 0.25,
      }
    }),
  )
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center">
      {specs.map((s, i) => (
        <motion.span
          key={i}
          className="absolute"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
          animate={{ x: s.x, y: [0, s.y, s.y + 260], opacity: [0, 1, 0], scale: 1, rotate: s.rot }}
          transition={{ duration: 2.6, delay: s.delay, ease: 'easeOut' }}
        >
          <Petal color={s.color} size={s.size} />
        </motion.span>
      ))}
    </div>
  )
}
