import type { CSSProperties, SVGProps } from 'react'
import { cn } from '@/lib/utils'

type Svg = SVGProps<SVGSVGElement>

/** Right-facing Hindu Swastik with the four auspicious dots */
export function Swastik({ className, ...props }: Svg) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={cn('size-6', className)} {...props}>
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="square">
        <path d="M12 4v16M4 12h16" />
        <path d="M12 4h7M20 12v7M12 20H5M4 12V5" />
      </g>
      <g fill="currentColor">
        <circle cx="8" cy="8" r="1.4" />
        <circle cx="16" cy="8" r="1.4" />
        <circle cx="16" cy="16" r="1.4" />
        <circle cx="8" cy="16" r="1.4" />
      </g>
    </svg>
  )
}

/** Mangal Kalash with mango leaves and coconut */
export function Kalash({ className, ...props }: Svg) {
  return (
    <svg viewBox="0 0 64 72" fill="none" aria-hidden className={cn('size-12', className)} {...props}>
      {/* coconut */}
      <ellipse cx="32" cy="15" rx="8" ry="9" fill="#8a5a2b" stroke="currentColor" strokeWidth="1.2" />
      <path d="M28 9c2-3 6-3 8 0" stroke="#d9b872" strokeWidth="1" />
      {/* mango leaves */}
      <g fill="#5c7a2e" stroke="#3e5520" strokeWidth=".8">
        <path d="M24 24c-8-1-14 2-18 6 7 1 13-1 18-6z" />
        <path d="M40 24c8-1 14 2 18 6-7 1-13-1-18-6z" />
        <path d="M27 24c-5-4-11-5-16-4 4 4 10 6 16 4z" />
        <path d="M37 24c5-4 11-5 16-4-4 4-10 6-16 4z" />
      </g>
      {/* rim */}
      <rect x="21" y="23" width="22" height="5" rx="2" fill="currentColor" />
      {/* pot */}
      <path
        d="M22 28c-9 6-12 14-10 22 2 9 10 14 20 14s18-5 20-14c2-8-1-16-10-22z"
        fill="url(#kalashGold)"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M14 44h36" stroke="currentColor" strokeWidth="1.2" />
      <path d="M14.5 48h35" stroke="#741c28" strokeWidth="2" />
      {/* swastik on pot */}
      <g transform="translate(26.5 50) scale(.46)" stroke="#741c28" strokeWidth="2.4">
        <path d="M12 4v16M4 12h16M12 4h7M20 12v7M12 20H5M4 12V5" />
      </g>
      <path d="M26 64h12l3 6H23z" fill="currentColor" />
      <defs>
        <linearGradient id="kalashGold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f3dfa6" />
          <stop offset=".5" stopColor="#c99b4c" />
          <stop offset="1" stopColor="#8a6424" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Om({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span aria-hidden className={cn('font-hindi leading-none', className)} style={style}>
      ॐ
    </span>
  )
}

/** Lotus-centred ornamental divider */
export function Divider({ className, tone = 'gold' }: { className?: string; tone?: 'gold' | 'maroon' }) {
  const c = tone === 'gold' ? 'var(--gold)' : 'var(--maroon)'
  return (
    <div aria-hidden className={cn('flex items-center justify-center gap-2 py-2', className)}>
      <svg viewBox="0 0 120 12" className="h-3 w-24 sm:w-32" fill="none">
        <path d="M0 6h96" stroke={c} strokeWidth="1" />
        <path d="M100 6l6-5 6 5-6 5z" stroke={c} strokeWidth="1" />
        <circle cx="116" cy="6" r="1.6" fill={c} />
        <circle cx="84" cy="6" r="1.2" fill={c} />
        <circle cx="72" cy="6" r="0.9" fill={c} />
      </svg>
      <svg viewBox="0 0 48 28" className="h-7 w-12" fill="none">
        <path d="M24 2c5 6 5 14 0 22-5-8-5-16 0-22z" fill={c} opacity=".9" />
        <path d="M24 24c-3-8-10-12-18-12 2 8 9 12 18 12z" stroke={c} strokeWidth="1.2" />
        <path d="M24 24c3-8 10-12 18-12-2 8-9 12-18 12z" stroke={c} strokeWidth="1.2" />
        <path d="M24 25c-7-2-14-1-20 2 7 1 14 1 20-2zM24 25c7-2 14-1 20 2-7 1-14 1-20-2z" fill={c} opacity=".5" />
      </svg>
      <svg viewBox="0 0 120 12" className="h-3 w-24 -scale-x-100 sm:w-32" fill="none">
        <path d="M0 6h96" stroke={c} strokeWidth="1" />
        <path d="M100 6l6-5 6 5-6 5z" stroke={c} strokeWidth="1" />
        <circle cx="116" cy="6" r="1.6" fill={c} />
        <circle cx="84" cy="6" r="1.2" fill={c} />
        <circle cx="72" cy="6" r="0.9" fill={c} />
      </svg>
    </div>
  )
}

/** Paisley corner flourish; rotate via className for each corner */
export function Corner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden className={cn('pointer-events-none absolute size-14 sm:size-20', className)}>
      <g stroke="var(--gold)" strokeWidth="1.3">
        <path d="M4 4h44M4 4v44" />
        <path d="M10 10h30M10 10v30" opacity=".7" />
        <path d="M18 18c14-2 24 6 22 18-1 7-9 9-13 4-3-5 1-10 6-8" />
        <path d="M18 18c-2 14 6 24 18 22" opacity=".8" />
      </g>
      <path d="M48 4c6 0 10 4 10 8-4 0-8-2-10-8zM4 48c0 6 4 10 8 10 0-4-2-8-8-10z" fill="var(--gold)" opacity=".85" />
      <circle cx="18" cy="18" r="3" fill="var(--maroon)" stroke="var(--gold)" />
    </svg>
  )
}

export function Corners() {
  return (
    <>
      <Corner className="left-1 top-1" />
      <Corner className="right-1 top-1 -scale-x-100" />
      <Corner className="bottom-1 left-1 -scale-y-100" />
      <Corner className="bottom-1 right-1 -scale-100" />
    </>
  )
}

/** Clay diya with flickering flame */
export function Diya({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 64 56" aria-hidden className={cn('h-10 w-12', className)}>
      <defs>
        <radialGradient id="diyaGlow">
          <stop offset="0" stopColor="#ffd77a" stopOpacity=".9" />
          <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="diyaFlame" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset=".45" stopColor="#ffc247" />
          <stop offset="1" stopColor="#e2541b" />
        </linearGradient>
        <linearGradient id="diyaClay" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#c0602f" />
          <stop offset="1" stopColor="#7a2a14" />
        </linearGradient>
      </defs>
      <circle className="diya-glow" cx="32" cy="18" r="18" fill="url(#diyaGlow)" style={{ animationDelay: `${delay}s` }} />
      <path
        className="diya-flame"
        style={{ animationDelay: `${delay}s` }}
        d="M32 4c4 6 6 10 6 14a6 6 0 0 1-12 0c0-4 2-8 6-14z"
        fill="url(#diyaFlame)"
      />
      <path d="M6 32c4 12 14 18 26 18s22-6 26-18c-8 3-17 4-26 4S14 35 6 32z" fill="url(#diyaClay)" />
      <path d="M6 32c8 3 17 4 26 4s18-1 26-4" stroke="#d9b872" strokeWidth="1.4" fill="none" />
      <path d="M14 41h36" stroke="#d9b872" strokeWidth="1" strokeDasharray="2 3" />
    </svg>
  )
}

export function DiyaRow({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <div aria-hidden className={cn('flex items-end justify-center gap-3 sm:gap-6', className)}>
      {Array.from({ length: count }, (_, i) => (
        <Diya key={i} delay={i * 0.37} className={i % 2 ? 'h-8 w-10' : ''} />
      ))}
    </div>
  )
}

/** Decorative mandala built from petal rings */
export function Mandala({ className }: { className?: string }) {
  const rings = [
    { n: 12, r: 30, len: 16, w: 7 },
    { n: 16, r: 48, len: 18, w: 8 },
    { n: 24, r: 68, len: 16, w: 6 },
    { n: 32, r: 86, len: 12, w: 4 },
  ]
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden className={cn('pointer-events-none', className)} fill="none">
      <g stroke="currentColor" strokeWidth=".7">
        {rings.map((ring, ri) => (
          <g key={ri}>
            <circle r={ring.r - 2} opacity=".5" />
            {Array.from({ length: ring.n }, (_, i) => (
              <path
                key={i}
                transform={`rotate(${(360 / ring.n) * i + (ri % 2 ? 360 / ring.n / 2 : 0)}) translate(0 ${-ring.r})`}
                d={`M0 0c${ring.w} ${-ring.len * 0.4} ${ring.w * 0.6} ${-ring.len * 0.8} 0 ${-ring.len}c${-ring.w * 0.6} ${ring.len * 0.2} ${-ring.w} ${ring.len * 0.6} 0 ${ring.len}z`}
              />
            ))}
          </g>
        ))}
        <circle r="96" />
        <circle r="99" opacity=".5" />
        <circle r="12" />
      </g>
    </svg>
  )
}

/** Section heading with Hindi line, English title and divider */
export function SectionHeading({
  hindi,
  title,
  subtitle,
  light = false,
}: {
  hindi?: string
  title: string
  subtitle?: string
  light?: boolean
}) {
  return (
    <div className="mx-auto mb-10 max-w-reading text-center">
      <div className={cn('mb-3 flex items-center justify-center gap-3', light ? 'text-gold-light' : 'text-gold')}>
        <Swastik className="size-4" />
        <Om className="text-xl" />
        <Swastik className="size-4" />
      </div>
      {hindi && (
        <p className={cn('font-hindi text-2xl sm:text-3xl', light ? 'text-gold-light' : 'text-deep-red')}>{hindi}</p>
      )}
      <h2
        className={cn(
          'mt-1 font-display text-3xl font-semibold tracking-[0.12em] uppercase sm:text-4xl',
          light ? 'text-paper' : 'text-maroon',
        )}
      >
        {title}
      </h2>
      <Divider />
      {subtitle && (
        <p className={cn('text-lg italic sm:text-xl', light ? 'text-paper/80' : 'text-muted-foreground')}>{subtitle}</p>
      )}
    </div>
  )
}
