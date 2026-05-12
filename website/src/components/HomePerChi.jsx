import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  'il tuo sito non racconta più quello che fai davvero',
  "stai crescendo e hai bisogno di una presenza digitale all'altezza",
  'vuoi automatizzare processi ma non sai da dove partire',
  'hai già lavorato con agenzie e sei uscito deluso da tempi, costi o risultati',
  'cerchi qualità esecutiva senza dover gestire tre fornitori diversi',
  'vuoi sapere esattamente cosa succede, quando e perché',
]

export default function HomePerChi() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const eyebrow = sectionRef.current.querySelector('.hpc-eyebrow')
      const headline = sectionRef.current.querySelector('.hpc-headline')
      const lead = sectionRef.current.querySelector('.hpc-lead')
      const items = gsap.utils.toArray('.hpc-item', sectionRef.current)

      if (prefersReduced) {
        gsap.set([eyebrow, headline, lead, ...items], { opacity: 1, y: 0, x: 0 })
        return
      }

      gsap.set([eyebrow, headline, lead], { opacity: 0, y: 24 })
      gsap.set(items, { opacity: 0, x: -12 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      })
        .to(eyebrow,  { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .to(headline, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.25')
        .to(lead,     { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .to(items, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07 }, '-=0.2')

      items.forEach((item) => {
        const accent = item.querySelector('.hpc-item-accent')
        if (!accent) return
        gsap.set(accent, { scaleX: 0, transformOrigin: 'left center' })
        item.addEventListener('mouseenter', () =>
          gsap.to(accent, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
        )
        item.addEventListener('mouseleave', () =>
          gsap.to(accent, { scaleX: 0, duration: 0.25, ease: 'power2.in' })
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hpc-section">
      <div className="hpc-inner">
        <div className="hpc-header">
          <span className="hpc-eyebrow">// per chi è</span>
          <h2 className="hpc-headline">
            lavoriamo con chi sa cosa vuole<br />— o vuole capirlo<span className="h-dot">.</span>
          </h2>
          <p className="hpc-lead">sei nel posto giusto se:</p>
        </div>
        <ul className="hpc-list" role="list">
          {ITEMS.map((item, i) => (
            <li key={i} className="hpc-item">
              <span className="hpc-item-num" aria-hidden="true">0{i + 1}</span>
              <span className="hpc-item-text">{item}<span className="h-dot">.</span></span>
              <div className="hpc-item-accent" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
