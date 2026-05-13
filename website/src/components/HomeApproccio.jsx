import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    id: 'c0', num: '01', label: 'brief',
    desc: 'prima di tutto, capire. obiettivi, vincoli, contesto. solo così si parte nel verso giusto',
    deliverable: 'brief doc',
  },
  {
    id: 'c1', num: '02', label: 'design',
    desc: 'struttura prima, estetica dopo. interfaccia progettata per funzionare, non solo per essere vista',
    deliverable: 'prototipo',
  },
  {
    id: 'c2', num: '03', label: 'sviluppo',
    desc: 'codice pulito, architettura solida, performance misurate. non costruiamo cose da buttare',
    deliverable: 'build live',
  },
  {
    id: 'c3', num: '04', label: 'lancio e supporto',
    desc: 'andiamo live quando è pronto. poi monitoriamo, aggiorniamo, ottimizziamo. il lavoro non finisce con la consegna',
    deliverable: 'go-live + 3 mesi',
  },
]

export default function HomeApproccio() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const section   = sectionRef.current
      const cards     = gsap.utils.toArray('.ha-card', section)
      const compacts  = gsap.utils.toArray('.ha-card-compact', section)
      const fulls     = gsap.utils.toArray('.ha-card-full', section)
      const phaseNums = gsap.utils.toArray('.ha-phase-num', section)
      const progFill  = section.querySelector('.ha-progress-fill')
      const n = cards.length

      // Initial state — card 0 active
      gsap.set(cards[0],           { flexGrow: 2.5 })
      gsap.set(cards.slice(1),     { flexGrow: 1 })
      gsap.set(compacts[0],        { opacity: 0 })
      gsap.set(compacts.slice(1),  { opacity: 1 })
      gsap.set(fulls[0],           { opacity: 1 })
      gsap.set(fulls.slice(1),     { opacity: 0 })
      gsap.set(phaseNums[0],       { opacity: 1 })
      gsap.set(phaseNums.slice(1), { opacity: 0 })
      gsap.set(progFill,           { width: `${100 / n}%` })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `top+=${window.innerHeight * 1.7}`,
          scrub: 1.2,
        },
      })

      for (let i = 1; i < n; i++) {
        const at = i - 1

        // Card expand / collapse
        tl.to(cards[i - 1], { flexGrow: 1,   duration: 0.7 }, at)
        tl.to(cards[i],     { flexGrow: 2.5, duration: 0.7 }, at + 0.1)

        // Content swap
        tl.to(fulls[i - 1],    { opacity: 0,  duration: 0.3  }, at)
        tl.to(compacts[i - 1], { opacity: 1,  duration: 0.35 }, at + 0.15)
        tl.to(compacts[i],     { opacity: 0,  duration: 0.3  }, at + 0.35)
        tl.to(fulls[i],        { opacity: 1,  duration: 0.45 }, at + 0.5)

        // Phase indicator
        tl.to(phaseNums[i - 1], { opacity: 0, duration: 0.25 }, at + 0.2)
        tl.to(phaseNums[i],     { opacity: 1, duration: 0.25 }, at + 0.45)

        // Progress fill
        tl.to(progFill, {
          width: `${((i + 1) / n) * 100}%`,
          duration: 0.7,
          ease: 'none',
        }, at + 0.15)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="ha-section">
      <div className="ha-stage">
        <div className="ha-stage-inner">

          <div className="ha-header">
            <span className="ha-eyebrow">// approccio</span>
            <h2 className="ha-headline">come lavoriamo<span className="h-dot">.</span></h2>
            <div className="ha-meta">
              <span className="ha-meta-phase">
                ── fase{' '}
                <span className="ha-phase-nums">
                  {STEPS.map((s) => (
                    <span key={s.id} className="ha-phase-num">{s.num}</span>
                  ))}
                </span>
                {' '}di 04
              </span>
            </div>
            <div className="ha-progress-track">
              <div className="ha-progress-fill" />
            </div>
          </div>

          <div className="ha-cards">
            {STEPS.map((s) => (
              <div key={s.id} className="ha-card">
                <div className="ha-card-compact">
                  <span className="ha-card-num">{s.num}</span>
                  <span className="ha-card-label-sm">{s.label}</span>
                  <span className="ha-card-del-mini">{s.deliverable}</span>
                </div>
                <div className="ha-card-full">
                  <h3 className="ha-card-label">{s.label}<span className="h-dot">.</span></h3>
                  <p className="ha-card-desc">{s.desc}<span className="h-dot">.</span></p>
                  <div className="ha-card-info">
                    <span className="ha-card-deliverable">deliverable · {s.deliverable}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
