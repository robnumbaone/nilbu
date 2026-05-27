import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    label: 'brief.',
    desc: 'prima di tutto, capire. obiettivi, vincoli, contesto. solo così si parte nel verso giusto.',
    deliverable: 'brief operativo',
  },
  {
    num: '02',
    label: 'design.',
    desc: 'struttura prima, estetica dopo. interfaccia progettata per funzionare, non solo per essere vista.',
    deliverable: 'prototipo interattivo',
  },
  {
    num: '03',
    label: 'sviluppo.',
    desc: 'codice pulito, architettura solida, performance misurate. non costruiamo cose da buttare.',
    deliverable: 'build live',
  },
  {
    num: '04',
    label: 'lancio e supporto.',
    desc: 'andiamo live quando è pronto. poi monitoriamo, aggiorniamo, ottimizziamo. il lavoro non finisce con la consegna.',
    deliverable: 'go-live + supporto',
  },
]

export default function HomeApproccio() {
  const sectionRef      = useRef(null)
  const progressLineRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const eyebrow  = sectionRef.current.querySelector('.ha2-eyebrow')
      const headline = sectionRef.current.querySelector('.ha2-headline')
      const context  = sectionRef.current.querySelector('.ha2-context')
      const dividers = gsap.utils.toArray('.ha2-divider', sectionRef.current)
      const rows     = gsap.utils.toArray('.ha2-row', sectionRef.current)
      const pills    = gsap.utils.toArray('.ha2-del', sectionRef.current)
      const pLine    = progressLineRef.current

      if (prefersReduced) {
        gsap.set([eyebrow, headline, context, ...rows], { opacity: 1, y: 0 })
        gsap.set(dividers, { scaleX: 1 })
        gsap.set(pills, { scale: 1, opacity: 1 })
        if (pLine) gsap.set(pLine, { scaleY: 1 })
        return
      }

      // Progress line — scrub driven
      if (pLine) {
        gsap.set(pLine, { scaleY: 0, transformOrigin: 'top center' })
        gsap.to(pLine, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            end:   'bottom 75%',
            scrub: 1.4,
          },
        })
      }

      gsap.set([eyebrow, headline, context], { opacity: 0, y: 28 })
      gsap.set(dividers, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(rows,  { opacity: 0, y: 32 })
      gsap.set(pills, { scale: 0.8, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      tl.to(eyebrow,  { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' })
        .to(headline, { opacity: 1, y: 0, duration: 0.8,  ease: 'expo.out' }, '-=0.3')
        .to(context,  { opacity: 1, y: 0, duration: 0.65, ease: 'expo.out' }, '-=0.45')

      // Divider → row → pill rhythm
      dividers.slice(0, rows.length).forEach((div, i) => {
        tl.to(div,     { scaleX: 1, duration: 0.5,  ease: 'power3.out' }, i === 0 ? '-=0.3' : '-=0.15')
          .to(rows[i], { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, '-=0.28')
          .to(pills[i], {
            scale: 1, opacity: 1,
            duration: 0.5, ease: 'back.out(2)',
          }, '-=0.28')
      })

      // Last closing divider
      if (dividers[rows.length]) {
        tl.to(dividers[rows.length], { scaleX: 1, duration: 0.5, ease: 'power3.out' }, '-=0.15')
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="ha2-section">
      <div className="ha2-inner">
        <div className="ha2-header">
          <span className="ha2-eyebrow">// approccio</span>
          <h2 className="ha2-headline">
            come lavoriamo<span className="h-dot">.</span>
          </h2>
          <p className="ha2-context">
            quattro fasi chiare.
            ogni step produce un output concreto.
          </p>
        </div>

        <div className="ha2-list">
          {/* Vertical progress line */}
          <div className="ha2-progress-track" aria-hidden="true">
            <div ref={progressLineRef} className="ha2-progress-line" />
          </div>

          {STEPS.map((s) => (
            <div key={s.num} className="ha2-row-wrap">
              <div className="ha2-divider" aria-hidden="true" />
              <div className="ha2-row">
                <span className="ha2-num">{s.num}</span>
                <h3 className="ha2-label">{s.label}</h3>
                <p className="ha2-desc">{s.desc}</p>
                <span className="ha2-del">{s.deliverable}</span>
              </div>
            </div>
          ))}
          <div className="ha2-divider" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
