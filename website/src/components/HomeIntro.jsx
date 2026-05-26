import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const POINTS = [
  'un solo interlocutore per tutto il progetto',
  'metodo trasparente, consegne rispettate',
  'supporto attivo dopo il lancio',
]

export default function HomeIntro() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const divider  = sectionRef.current.querySelector('.hi-divider')
      const eyebrow  = sectionRef.current.querySelector('.hi-eyebrow')
      const headline = sectionRef.current.querySelector('.hi-headline')
      const body     = sectionRef.current.querySelector('.hi-body')
      const points   = gsap.utils.toArray('.hi-point', sectionRef.current)

      if (prefersReduced) {
        gsap.set([eyebrow, headline, body, ...points], { opacity: 1, y: 0 })
        gsap.set(divider, { scaleX: 1 })
        return
      }

      gsap.set(divider, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set([eyebrow, headline, body, ...points], { opacity: 0, y: 28 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })
        .to(divider,  { scaleX: 1, duration: 0.9, ease: 'expo.out' })
        .to(eyebrow,  { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, '-=0.5')
        .to(headline, { opacity: 1, y: 0, duration: 0.75, ease: 'expo.out' }, '-=0.3')
        .to(body,     { opacity: 1, y: 0, duration: 0.65, ease: 'expo.out' }, '-=0.35')
        .to(points,   { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out', stagger: 0.1 }, '-=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hi-section">
      <div className="hi-divider" aria-hidden="true" />
      <div className="hi-inner">
        <div className="hi-col-left">
          <span className="hi-eyebrow">// partner</span>
          <h2 className="hi-headline">
            non un'agenzia<span className="h-dot">.</span><br />
            un partner operativo<span className="h-dot">.</span>
          </h2>
          <p className="hi-body">
            nilbu lavora con aziende che vogliono costruire qualcosa di solido: non una presenza digitale di facciata, ma sistemi che generano risultati reali. web, AI e dati in un unico interlocutore — preciso, diretto, capace di guidare senza perdersi in riunioni inutili<span className="h-dot">.</span>
          </p>
        </div>
        <div className="hi-col-right">
          <ul className="hi-points" role="list">
            {POINTS.map((p, i) => (
              <li key={i} className="hi-point">
                <span className="hi-point-marker" aria-hidden="true">—</span>
                <span>{p}<span className="h-dot">.</span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
