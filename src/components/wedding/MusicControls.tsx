import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Music2, VolumeX } from 'lucide-react'
import { WeddingMusic } from '@/lib/music'
import { wedding } from '@/config/wedding'

interface MusicState {
  playing: boolean
  play: () => void
  pause: () => void
  toggle: () => void
}

const MusicContext = createContext<MusicState | null>(null)

export function MusicProvider({ children }: { children: ReactNode }) {
  const engine = useRef<WeddingMusic | null>(null)
  const [playing, setPlaying] = useState(false)

  const play = useCallback(() => {
    engine.current ??= new WeddingMusic(wedding.music.src)
    engine.current
      .start()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }, [])
  const pause = useCallback(() => {
    engine.current?.stop()
    setPlaying(false)
  }, [])
  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play])

  return <MusicContext.Provider value={{ playing, play, pause, toggle }}>{children}</MusicContext.Provider>
}

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used inside MusicProvider')
  return ctx
}

export function MusicControls() {
  const { playing, toggle } = useMusic()
  return (
    <div className="fixed right-3 bottom-20 z-40 sm:right-5 sm:bottom-6">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={`${playing ? 'Pause' : 'Play'} ${wedding.music.title}`}
        className="group relative flex h-12 items-center gap-2 rounded-full border-2 border-gold bg-maroon pr-4 pl-3 text-paper shadow-xl"
      >
        {playing && <span className="absolute inset-0 animate-ping rounded-full border border-gold-light/60 motion-reduce:animate-none" />}
        {playing ? <Music2 className="size-5 text-gold-light" /> : <VolumeX className="size-5 text-gold-light" />}
        <span className="font-display text-xs tracking-[0.18em] uppercase">{playing ? wedding.music.title : 'Music'}</span>
        {playing && (
          <span aria-hidden className="flex h-4 items-end gap-0.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-0.5 rounded bg-gold-light"
                animate={{ height: ['30%', '100%', '45%', '80%', '30%'] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
              />
            ))}
          </span>
        )}
      </button>
    </div>
  )
}
