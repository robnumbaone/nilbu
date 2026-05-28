import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    label: 'brief',
    desc: 'ascoltiamo per capire dove vuoi arrivare, non quale tecnologia preferiresti.',
    del: 'discovery call',
  },
  {
    num: '02',
    label: 'design',
    desc: 'prototipi navigabili in figma. iteriamo veloci, decidi senza sorprese.',
    del: 'preview live',
  },
  {
    num: '03',
    label: 'sviluppo',
    desc: 'codice pulito, performance reali, accessibilità inclusa nel deal.',
    del: 'staging url',
  },
  {
    num: '04',
    label: 'lancio',
    desc: 'andiamo online insieme. dopo, restiamo agganciati per supporto e crescita.',
    del: 'go-live + 30g',
  },
]

export default function HomeApproccio() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const rowRefs = useRef([])

  // IntersectionObserver — highlights the row currently in the viewport center
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.idx))
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    rowRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // GSAP scroll entry
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const header = sectionRef.current.querySelector('.appr-header')
      const rows   = gsap.utils.toArray('.appr-row', sectionRef.current)

      gsap.set([header, ...rows], { opacity: 0, y: 28 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
        .to(header, { opacity: 1,    y: 0, duration: 0.65, ease: 'expo.out' })
        .to(rows,   { opacity: 0.65, y: 0, duration: 0.65, ease: 'expo.out', stagger: 0.1 }, '-=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="appr-section" id="approccio">
      <div className="appr-inner">
        <header className="appr-header section-header">
          <span className="section-eyebrow">// approccio</span>
          <h2 className="section-title">come lavoriamo<span className="h-dot">.</span></h2>
          <p className="section-lede">
            quattro passaggi chiari. ogni step produce un output concreto<span className="h-dot">.</span>
          </p>
        </header>

        <div className="appr-list">
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              ref={el => { rowRefs.current[i] = el }}
              data-idx={i}
              className={`appr-row${active === i ? ' appr-row--active' : ''}`}
            >
              <span className="appr-num">{s.num}</span>
              <h3 className="appr-label">{s.label}<span className="h-dot">.</span></h3>
              <p className="appr-desc">{s.desc}</p>
              <span className="appr-del">{s.del}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
