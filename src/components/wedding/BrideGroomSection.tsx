import { motion } from 'framer-motion'
import { cdn, wedding } from '@/config/wedding'
import { Divider, SectionHeading } from './Ornaments'

function Person({
  role,
  roleHindi,
  name,
  nameHindi,
  parents,
  photo,
  initial,
  from,
}: {
  role: string
  roleHindi: string
  name: string
  nameHindi: string
  parents: string
  photo: string
  initial: string
  from: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <div className="relative size-28 rounded-full bg-gradient-to-br from-gold-light via-gold to-[#7d5a22] p-1 shadow-lg sm:size-36">
        <div className="flex size-full items-center justify-center overflow-hidden rounded-full border-2 border-paper bg-maroon">
          {photo ? (
            <img src={cdn(photo, 300)} alt={name} width={300} height={300} loading="lazy" className="size-full object-cover" />
          ) : (
            <span className="font-hindi text-gold-foil text-6xl sm:text-7xl" aria-hidden>
              {initial}
            </span>
          )}
        </div>
      </div>
      <p className="mt-4 font-display text-xs tracking-[0.35em] text-gold uppercase">
        {role} · <span className="font-hindi tracking-normal">{roleHindi}</span>
      </p>
      <h3 className="mt-1 font-display text-2xl font-semibold tracking-[0.1em] text-maroon sm:text-3xl">{name}</h3>
      <p className="font-hindi text-2xl text-deep-red">{nameHindi}</p>
      {parents && <p className="mt-1 text-base text-ink/75 italic">{parents}</p>}
    </motion.div>
  )
}

export function BrideGroomSection() {
  const { groom, bride } = wedding
  return (
    <section id="couple" className="scroll-mt-6 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-content">
        <SectionHeading hindi="दो दिल, एक खूबसूरत रिश्ता" title="The Bride & Groom" subtitle="Two hearts, one beautiful bond — blessed by both families" />

        <motion.figure
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-3xl"
        >
          <div className="rounded-t-[50%_18%] border-[3px] border-maroon bg-paper p-1.5 shadow-[0_30px_60px_-30px_rgb(77_15_25/0.8)]">
            <div className="overflow-hidden rounded-t-[50%_18%] border border-gold">
              <img
                src={cdn('/img/couple.jpg', 1100)}
                srcSet={`${cdn('/img/couple.jpg', 700)} 700w, ${cdn('/img/couple.jpg', 1100)} 1100w, ${cdn('/img/couple.jpg', 1500)} 1500w`}
                sizes="(min-width: 800px) 768px, 94vw"
                alt="Traditional illustration of Kartik and Navya as groom and bride holding varmala"
                width={1400}
                height={764}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
          <div className="motif-band" />
        </motion.figure>

        <div className="mx-auto mt-12 grid max-w-3xl items-center gap-8 sm:grid-cols-[1fr_auto_1fr]">
          <Person
            role="The Groom"
            roleHindi="वर"
            name={groom.name}
            nameHindi={groom.nameHindi}
            parents={groom.parents}
            photo={groom.photo}
            initial="का"
            from={-40}
          />
          <p className="font-script text-center text-6xl text-gold" aria-hidden>
            &amp;
          </p>
          <Person
            role="The Bride"
            roleHindi="वधू"
            name={bride.name}
            nameHindi={bride.nameHindi}
            parents={bride.parents}
            photo={bride.photo}
            initial="न"
            from={40}
          />
        </div>

        <Divider className="mt-10" />
        <blockquote className="mx-auto max-w-reading text-center">
          <p className="font-hindi text-xl leading-relaxed text-maroon sm:text-2xl">
            "सात फेरों का यह पावन बंधन, सात जन्मों का साथ निभाए"
          </p>
          <p className="mt-2 text-lg text-ink/75 italic">May the seven sacred vows bind them for seven lifetimes.</p>
        </blockquote>
      </div>
    </section>
  )
}
