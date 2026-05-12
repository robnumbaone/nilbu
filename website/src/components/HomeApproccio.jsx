import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { id: 'c0', num: '01', label: 'brief',    desc: 'ascoltiamo, capiamo, definiamo gli obiettivi' },
  { id: 'c1', num: '02', label: 'design',   desc: 'wireframe, visual, UI system su misura' },
  { id: 'c2', num: '03', label: 'sviluppo', desc: 'codice pulito, veloce, scalabile' },
  { id: 'c3', num: '04', label: 'lancio',   desc: 'live, seguito, ottimizzato nel tempo' },
]

export default function HomeApproccio() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const cards = gsap.utils.toArray('.ha-card', section)
      const n = cards.length

      gsap.set(cards[0], { opacity: 1, scale: 1.02 })
      gsap.set(cards.slice(1), { opacity: 0.18, scale: 0.92 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      for (let i = 1; i < n; i++) {
        const at = i - 1
        const isLast = i === n - 1

        tl.to(cards[i - 1], { opacity: 0.18, scale: 0.92, duration: 1 }, at)
        tl.to(cards[i], {
          opacity: 1,
          scale: isLast ? 1.05 : 1.02,
          ...(isLast ? { borderColor: 'rgba(45, 91, 255, 0.4)' } : {}),
          duration: 1,
        }, at)
      }

      tl.to(cards[n - 1].querySelector('.ha-card-num'), {
        color: '#2D5BFF',
        duration: 1,
      }, n - 2)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="ha-section">
      <div className="ha-stage">
        <div className="ha-stage-inner">
          <div className="ha-header">
            <span className="ha-eyebrow">// approccio</span>
            <h2 className="ha-headline">come lavoriamo</h2>
          </div>
          <div className="ha-cards">
            {STEPS.map((s) => (
              <div key={s.id} className="ha-card">
                <span className="ha-card-num">{s.num}</span>
                <div className="ha-card-body">
                  <h3 className="ha-card-label">{s.label}</h3>
                  <p className="ha-card-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
