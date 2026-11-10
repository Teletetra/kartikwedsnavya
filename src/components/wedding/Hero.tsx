import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cdn, wedding } from '@/config/wedding'
import { Divider, DiyaRow, Kalash, Mandala, Swastik } from './Ornaments'

export function Hero({ revealed }: { revealed: boolean }) {
  const show = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <header id="home" className="relative flex min-h-svh flex-col overflow-hidden">
      <div className="motif-band" />
      <Mandala className="mandala-spin absolute top-1/2 left-1/2 size-[min(140vw,900px)] -translate-x-1/2 -translate-y-1/2 text-gold/20" />

      <div className="relative mx-auto flex w-full max-w-content flex-1 flex-col items-center justify-center px-5 pt-8 pb-24 text-center">
        <motion.div {...show(0.1)} className="flex items-center gap-6 text-gold">
          <Kalash className="size-10 sm:size-12" />
          <motion.img
            src={cdn('/img/ganesh.jpg', 420)}
            srcSet={`${cdn('/img/ganesh.jpg', 280)} 1x, ${cdn('/img/ganesh.jpg', 560)} 2x`}
            alt="Lord Ganesha seated on a lotus"
            width={280}
            height={315}
            className="w-36 mix-blend-multiply sm:w-44"
            animate={revealed ? { scale: [0.96, 1] } : undefined}
            transition={{ duration: 1.4 }}
          />
          <Kalash className="size-10 sm:size-12" />
        </motion.div>

        <motion.p {...show(0.3)} className="font-hindi mt-2 text-2xl text-deep-red sm:text-3xl">
          ॥ श्री गणेशाय नमः ॥
        </motion.p>
        <motion.p {...show(0.4)} className="mt-1 max-w-md text-lg text-ink/80 italic sm:text-xl">
          {wedding.blessingLine}
        </motion.p>

        <motion.div {...show(0.5)}>
          <Divider />
        </motion.div>

        <motion.h1 {...show(0.6)} className="mt-1">
          <span className="font-hindi text-gold-foil block text-6xl leading-tight sm:text-8xl">शुभ विवाह</span>
          <span className="mt-4 block font-display text-3xl font-semibold tracking-[0.14em] text-maroon sm:text-5xl">
            {wedding.groom.name.toUpperCase()}
          </span>
          <span className="font-script block text-5xl text-gold sm:text-6xl" aria-label="and">
            &amp;
          </span>
          <span className="block font-display text-3xl font-semibold tracking-[0.14em] text-maroon sm:text-5xl">
            {wedding.bride.name.toUpperCase()}
          </span>
        </motion.h1>

        <motion.p {...show(0.8)} className="font-hindi mt-3 text-xl text-deep-red sm:text-2xl">
          {wedding.groom.nameHindi} <span className="text-gold">संग</span> {wedding.bride.nameHindi}
        </motion.p>

        <motion.div {...show(0.95)} className="mt-6 inline-flex items-center gap-3 border-y-2 border-double border-gold px-6 py-2 text-maroon">
          <Swastik className="size-4 text-deep-red" />
          <span className="font-display text-base tracking-[0.25em] sm:text-lg">{wedding.dateRange.toUpperCase()}</span>
          <Swastik className="size-4 text-deep-red" />
        </motion.div>

        <motion.div {...show(1.1)} className="mt-8">
          <DiyaRow count={5} />
        </motion.div>
      </div>

      <motion.a
        href="#countdown"
        aria-label="Scroll to countdown"
        className="absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center text-maroon sm:bottom-8"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-display text-[0.65rem] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="size-5" />
      </motion.a>
    </header>
  )
}
