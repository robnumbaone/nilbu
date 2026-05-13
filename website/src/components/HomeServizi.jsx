import { useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const IconWeb = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)

const IconAI = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6"  cy="6"  r="2" />
    <circle cx="18" cy="6"  r="2" />
    <circle cx="6"  cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
    <circle cx="12" cy="12" r="2.5" />
    <line x1="8"  y1="6.8"  x2="10.4" y2="11" />
    <line x1="16" y1="6.8"  x2="13.6" y2="11" />
    <line x1="8"  y1="17.2" x2="10.4" y2="13" />
    <line x1="16" y1="17.2" x2="13.6" y2="13" />
  </svg>
)

const IconData = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="2"  y1="20" x2="22" y2="20" />
    <line x1="6"  y1="20" x2="6"  y2="14" />
    <line x1="12" y1="20" x2="12" y2="4"  />
    <line x1="18" y1="20" x2="18" y2="10" />
  </svg>
)

const SERVICES = [
  {
    id: 'web',
    Icon: IconWeb,
    num: '01',
    title: 'siti web',
    desc: 'design su misura, responsive, ottimizzato per i motori di ricerca e costruito per convertire',
    tags: ['design', 'sviluppo', 'cms', 'seo'],
  },
  {
    id: 'ai',
    Icon: IconAI,
    num: '02',
    title: 'intelligenza artificiale',
    desc: 'chatbot, automazioni, agenti AI e integrazione LLM per ottimizzare processi e ridurre costi operativi',
    tags: ['llm', 'automazione', 'chatbot', 'agenti'],
  },
  {
    id: 'data',
    Icon: IconData,
    num: '03',
    title: 'analisi dei dati',
    desc: 'dashboard, pipeline dati e visualizzazioni per trasformare i numeri in decisioni chiare',
    tags: ['dashboard', 'bi', 'pipeline', 'insight'],
  },
]

export default function HomeServizi() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const eyebrow  = sectionRef.current.querySelector('.hsv-eyebrow')
      const headline = sectionRef.current.querySelector('.hsv-headline')
      const cards    = gsap.utils.toArray('.hsv-card', sectionRef.current)

      if (prefersReduced) {
        gsap.set([eyebrow, headline, ...cards], { opacity: 1, y: 0 })
        return
      }

      gsap.set([eyebrow, headline], { opacity: 0, y: 24 })
      gsap.set(cards, { opacity: 0, y: 44 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
          once: true,
        },
      })
        .to(eyebrow,  { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .to(headline, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .to(cards,    { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.12 }, '-=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hsv-section">
      <div className="hsv-inner">
        <div className="hsv-header">
          <span className="hsv-eyebrow">// servizi</span>
          <h2 className="hsv-headline">quello che costruiamo<span className="h-dot">.</span></h2>
        </div>

        <div className="hsv-grid">
          {SERVICES.map((s) => (
            <Link key={s.id} to="/servizi" className="hsv-card">
              <div className="hsv-card-top">
                <div className="hsv-icon-wrap">
                  <s.Icon />
                </div>
                <span className="hsv-card-num">{s.num}</span>
              </div>

              <h3 className="hsv-card-title">{s.title}<span className="h-dot">.</span></h3>
              <p className="hsv-card-desc">{s.desc}<span className="h-dot">.</span></p>

              <div className="hsv-card-footer">
                <div className="hsv-tags">
                  {s.tags.map((t) => (
                    <span key={t} className="hsv-tag">{t}</span>
                  ))}
                </div>
                <span className="hsv-card-arrow" aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
