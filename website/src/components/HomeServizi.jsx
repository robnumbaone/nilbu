import { useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    name: 'siti web',
    tag: 'design + performance',
    desc: 'siti su misura che uniscono estetica e conversione. responsive, veloci, CMS-ready.',
  },
  {
    num: '02',
    name: 'intelligenza artificiale',
    tag: 'automazione + AI',
    desc: 'chatbot, agenti AI, integrazione LLM nei tuoi flussi. meno lavoro manuale, più risultati.',
  },
  {
    num: '03',
    name: 'analisi dei dati',
    tag: 'dati + decisioni',
    desc: 'dashboard, pipeline dati, visualizzazioni. numeri che diventano decisioni.',
  },
]

export default function HomeServizi() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const eyebrow  = sectionRef.current.querySelector('.hs2-eyebrow')
      const rows     = gsap.utils.toArray('.hs2-row', sectionRef.current)
      const dividers = gsap.utils.toArray('.hs2-row-line', sectionRef.current)

      if (prefersReduced) {
        gsap.set([eyebrow, ...rows], { opacity: 1, y: 0 })
        gsap.set(dividers, { scaleX: 1 })
        return
      }

      gsap.set(eyebrow,  { opacity: 0, y: 16 })
      gsap.set(rows,     { opacity: 0, y: 44 })
      gsap.set(dividers, { scaleX: 0, transformOrigin: 'left center' })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      })
        .to(eyebrow,  { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' })
        .to(dividers, { scaleX: 1, duration: 0.9, ease: 'expo.out', stagger: 0.1 }, '-=0.2')
        .to(rows,     { opacity: 1, y: 0, duration: 0.65, ease: 'expo.out', stagger: 0.1 }, '-=0.75')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hs2-section">
      <div className="hs2-inner">
        <span className="hs2-eyebrow">// servizi</span>
        <ul className="hs2-list" role="list">
          {SERVICES.map((s) => (
            <li key={s.num} className="hs2-row-wrap">
              <div className="hs2-row-line" aria-hidden="true" />
              <Link to="/servizi" className="hs2-row">
                <span className="hs2-row-num">{s.num}</span>
                <div className="hs2-row-body">
                  <span className="hs2-row-name">
                    {s.name}<span className="h-dot">.</span>
                  </span>
                  <div className="hs2-row-detail">
                    <span className="hs2-row-tag">{s.tag}</span>
                    <p className="hs2-row-desc">{s.desc}</p>
                  </div>
                </div>
                <span className="hs2-row-arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
          <li className="hs2-row-wrap">
            <div className="hs2-row-line" aria-hidden="true" />
          </li>
        </ul>
      </div>
    </section>
  )
}
