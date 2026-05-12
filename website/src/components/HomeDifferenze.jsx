import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    num: '01',
    title: 'strategia e tecnica insieme',
    body: 'non separiamo il design dallo sviluppo, né il visual dalla logica di business. ogni scelta ha una ragione',
  },
  {
    num: '02',
    title: 'un interlocutore, non un team disperso',
    body: 'parli con chi lavora sul progetto. niente account manager. niente telefono rotto a metà percorso',
  },
  {
    num: '03',
    title: 'metodo, non improvvisazione',
    body: 'lavoriamo per fasi, con obiettivi definiti e output misurabili. nessuna sorpresa, nessuna deriva',
  },
  {
    num: '04',
    title: 'continuità, non solo consegna',
    body: 'il progetto non si chiude con il lancio. lo seguiamo, lo aggiorniamo, lo misuriamo nel tempo',
  },
]

export default function HomeDifferenze() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const eyebrow = sectionRef.current.querySelector('.hd-eyebrow')
      const headline = sectionRef.current.querySelector('.hd-headline')
      const cards = gsap.utils.toArray('.hd-card', sectionRef.current)

      if (prefersReduced) {
        gsap.set([eyebrow, headline, ...cards], { opacity: 1, y: 0 })
        return
      }

      gsap.set([eyebrow, headline], { opacity: 0, y: 24 })
      gsap.set(cards, { opacity: 0, y: 36 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
        .to(eyebrow,  { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .to(headline, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.25')
        .to(cards, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.1 }, '-=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hd-section">
      <div className="hd-inner">
        <div className="hd-header">
          <span className="hd-eyebrow">// differenza</span>
          <h2 className="hd-headline">
            quello che ci distingue<span className="h-dot">.</span>
          </h2>
        </div>
        <div className="hd-grid">
          {CARDS.map((c) => (
            <div key={c.num} className="hd-card">
              <span className="hd-card-num">{c.num}</span>
              <h3 className="hd-card-title">{c.title}<span className="h-dot">.</span></h3>
              <p className="hd-card-body">{c.body}<span className="h-dot">.</span></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
