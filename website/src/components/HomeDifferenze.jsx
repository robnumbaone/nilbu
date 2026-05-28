import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DIFFS = [
  {
    num: '01',
    title: 'strategia e tecnica, insieme',
    body: 'un team che capisce di business e sa scrivere codice. niente passaggi di consegne.',
  },
  {
    num: '02',
    title: 'un interlocutore, non un team disperso',
    body: 'parli sempre con chi sta costruendo il tuo progetto. zero account manager.',
  },
  {
    num: '03',
    title: 'metodo, non improvvisazione',
    body: 'sappiamo cosa stiamo facendo. il piano è scritto, non interpretato.',
  },
  {
    num: '04',
    title: 'continuità, non solo consegna',
    body: 'restiamo accanto al progetto anche dopo il lancio. il sito vive, anche noi.',
  },
]

export default function HomeDifferenze() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const header = sectionRef.current.querySelector('.diff-header')
      const cards  = gsap.utils.toArray('.diff-card', sectionRef.current)

      gsap.set([header, ...cards], { opacity: 0, y: 32 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
        .to(header, { opacity: 1, y: 0, duration: 0.65, ease: 'expo.out' })
        .to(cards,  { opacity: 1, y: 0, duration: 0.7,  ease: 'expo.out', stagger: 0.1 }, '-=0.35')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="diff-section" id="differenze">
      <div className="diff-inner">
        <header className="diff-header section-header">
          <span className="section-eyebrow">// differenza</span>
          <h2 className="section-title">quello che ci distingue<span className="h-dot">.</span></h2>
          <p className="section-lede">
            quattro cose semplici che fanno la differenza tra un sito che vende
            e uno che resta lì<span className="h-dot">.</span>
          </p>
        </header>

        <div className="diff-grid">
          {DIFFS.map((d) => (
            <article key={d.num} className="diff-card" data-num={d.num}>
              <div className="diff-num">{d.num}</div>
              <h3 className="diff-title">{d.title}<span className="h-dot">.</span></h3>
              <p className="diff-body">{d.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
