import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'
import { BrideGroomSection } from '@/components/wedding/BrideGroomSection'
import { EventTimeline } from '@/components/wedding/EventTimeline'
import { Hero } from '@/components/wedding/Hero'
import { InvitationEnvelope } from '@/components/wedding/InvitationEnvelope'
import { Footer, NavDock } from '@/components/wedding/Layout'
import { MusicControls, MusicProvider, useMusic } from '@/components/wedding/MusicControls'
import { PetalShower } from '@/components/wedding/Petals'
import { VenueSection } from '@/components/wedding/VenueSection'
import { WeddingCard } from '@/components/wedding/WeddingCard'
import { WeddingCountdown } from '@/components/wedding/WeddingCountdown'
import { WeddingGallery } from '@/components/wedding/WeddingGallery'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <MusicProvider>
      <Invitation />
    </MusicProvider>
  )
}

function Invitation() {
  const { play } = useMusic()
  const [envelope, setEnvelope] = useState(true)
  const [revealed, setRevealed] = useState(false)

  return (
    <>
      <AnimatePresence>
        {envelope && (
          <InvitationEnvelope
            onOpen={(withMusic) => {
              if (withMusic) play()
              window.setTimeout(() => setRevealed(true), 2200)
            }}
            onDone={() => {
              setRevealed(true)
              setEnvelope(false)
            }}
          />
        )}
      </AnimatePresence>

      <main className="paper relative overflow-x-clip">
        <Hero revealed={revealed} />
        <WeddingCountdown />
        <BrideGroomSection />
        <EventTimeline />
        <WeddingCard />
        <WeddingGallery />
        <VenueSection />
        <Footer />
      </main>

      {!envelope && (
        <>
          <PetalShower />
          <NavDock />
          <MusicControls />
        </>
      )}
    </>
  )
}
