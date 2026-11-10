import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { cdn, formatEventDate, formatEventTime, wedding } from '@/config/wedding'
import { cn } from '@/lib/utils'
import { Corners, Divider, Kalash, Om, SectionHeading, Swastik } from './Ornaments'

function CardPage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative rounded-sm border-[6px] border-maroon bg-paper p-2 shadow-[0_30px_50px_-25px_rgb(77_15_25/0.7)]',
        className,
      )}
    >
      <div className="motif-band absolute inset-x-0 top-0" />
      <div className="motif-band absolute inset-x-0 bottom-0" />
      <div className="paper relative mt-4 mb-4 h-[calc(100%-2rem)] border-2 border-gold px-5 py-8 sm:px-9">
        <div className="pointer-events-none absolute inset-1.5 border border-deep-red/40" />
        <Corners />
        {children}
      </div>
    </div>
  )
}

function InvitationPage() {
  const { groom, bride } = wedding
  return (
    <div className="font-hindi relative text-center text-ink">
      <div className="mx-auto mb-2 w-28 mix-blend-multiply sm:w-32">
        <img src={cdn('/img/ganesh.jpg', 320)} alt="भगवान श्री गणेश" width={320} height={360} loading="lazy" className="w-full" />
      </div>
      <p className="text-2xl text-deep-red">॥ श्री गणेशाय नमः ॥</p>
      <p className="mx-auto mt-2 max-w-sm text-[0.95rem] leading-relaxed text-maroon/90">
        वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।
        <br />
        निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
      </p>
      <Divider tone="maroon" />
      <p className="mx-auto max-w-md text-lg leading-relaxed">
        परमपिता परमेश्वर की असीम अनुकम्पा एवं पूज्य बुज़ुर्गों के शुभ आशीर्वाद से
      </p>

      <div className="my-5">
        <p className="text-sm text-gold">चिरंजीव</p>
        <p className="text-4xl leading-tight text-maroon sm:text-5xl">{groom.nameHindi}</p>
        {groom.parentsHindi && <p className="mt-1 text-base text-ink/80">{groom.parentsHindi}</p>}
        <div className="my-2 flex items-center justify-center gap-3 text-gold">
          <Swastik className="size-4" />
          <span className="text-2xl text-deep-red">संग</span>
          <Swastik className="size-4" />
        </div>
        <p className="text-sm text-gold">सौभाग्यकांक्षिणी</p>
        <p className="text-4xl leading-tight text-maroon sm:text-5xl">{bride.nameHindi}</p>
        {bride.parentsHindi && <p className="mt-1 text-base text-ink/80">{bride.parentsHindi}</p>}
      </div>

      <p className="mx-auto max-w-md text-lg leading-relaxed">
        का शुभ विवाह संस्कार दिनांक <span className="text-deep-red">{wedding.dateRangeHindi}</span> तक निम्नलिखित कार्यक्रमानुसार
        सम्पन्न होना निश्चित हुआ है।
      </p>
      <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed">
        इस मंगलमय अवसर पर आप सपरिवार सादर आमंत्रित हैं। आपकी गरिमामयी उपस्थिति एवं आशीर्वाद नवदम्पति के लिए प्रार्थनीय है।
      </p>
    </div>
  )
}

function FunctionsPage() {
  return (
    <div className="font-hindi relative flex h-full flex-col text-center text-ink">
      <div className="flex items-center justify-center gap-4">
        <Kalash className="size-12 text-gold" />
        <Om className="text-5xl text-deep-red" />
        <Kalash className="size-12 text-gold" />
      </div>
      <p className="mt-3 text-3xl text-maroon">॥ मांगलिक कार्यक्रम ॥</p>
      <Divider tone="maroon" />

      <ul className="mx-auto mt-2 w-full max-w-md space-y-4">
        {wedding.events.map((e) => (
          <li
            key={e.id}
            className={cn(
              'rounded-sm border px-4 py-3',
              e.id === 'barat' ? 'border-maroon bg-maroon text-paper' : 'border-gold/60 bg-paper-deep/40',
            )}
          >
            <p className={cn('text-2xl', e.id === 'barat' ? 'text-gold-light' : 'text-deep-red')}>
              ❁ {e.nameHindi} ❁
            </p>
            <p className="text-base">{formatEventDate(e.date, 'hi')}</p>
            <p className={cn('text-sm', e.id === 'barat' ? 'text-paper/80' : 'text-ink/75')}>
              {formatEventTime(e.time, 'hi')}
              {e.venue ? ` · ${e.venue}` : ''}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid grid-cols-2 gap-4 text-base">
        <div>
          <p className="text-sm text-gold">स्वागतोत्सुक</p>
          <p className="text-lg text-maroon">{wedding.hostsHindi}</p>
        </div>
        <div>
          <p className="text-sm text-gold">दर्शनाभिलाषी</p>
          <p className="text-lg text-maroon">समस्त इष्ट-मित्र एवं परिजन</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gold-foil text-5xl">॥ शुभ विवाह ॥</p>
        <p className="mt-2 text-base text-deep-red">"आपकी उपस्थिति ही हमारा सौभाग्य है"</p>
      </div>
    </div>
  )
}

export function WeddingCard() {
  const [page, setPage] = useState(0)
  const pages = [<InvitationPage key="invite" />, <FunctionsPage key="functions" />]

  return (
    <section id="card" className="relative scroll-mt-6 overflow-hidden px-3 py-16 sm:px-6 sm:py-24">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-paper-deep/70 to-transparent" />
      <div className="relative mx-auto max-w-content">
        <SectionHeading hindi="निमंत्रण पत्रिका" title="The Invitation Card" subtitle="With folded hands, we invite you and your family" />

        {/* Desktop: open book spread */}
        <div className="hidden gap-0 md:grid md:grid-cols-2" style={{ perspective: 2000 }}>
          <motion.div
            initial={{ rotateY: 25, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ transformOrigin: 'right center' }}
          >
            <CardPage className="h-full rounded-r-none">{pages[0]}</CardPage>
          </motion.div>
          <motion.div
            initial={{ rotateY: -25, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ transformOrigin: 'left center' }}
          >
            <CardPage className="h-full rounded-l-none border-l-[3px]">{pages[1]}</CardPage>
          </motion.div>
        </div>

        {/* Mobile: page-turn */}
        <div className="md:hidden" style={{ perspective: 1600 }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ rotateY: page === 1 ? 80 : -80, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: page === 1 ? -80 : 80, opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) setPage(1)
                if (info.offset.x > 60) setPage(0)
              }}
              style={{ transformOrigin: page === 1 ? 'left center' : 'right center' }}
            >
              <CardPage>{pages[page]}</CardPage>
            </motion.div>
          </AnimatePresence>
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setPage(0)}
              disabled={page === 0}
              aria-label="Previous page"
              className="flex size-10 items-center justify-center rounded-full border border-maroon text-maroon disabled:opacity-30"
            >
              <ChevronLeft className="size-5" />
            </button>
            <p className="flex items-center gap-2 font-display text-sm tracking-[0.2em] text-maroon uppercase">
              <BookOpen className="size-4 text-gold" /> Page {page + 1} / 2
            </p>
            <button
              type="button"
              onClick={() => setPage(1)}
              disabled={page === 1}
              aria-label="Next page"
              className="flex size-10 items-center justify-center rounded-full border border-maroon bg-maroon text-paper disabled:opacity-30"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
