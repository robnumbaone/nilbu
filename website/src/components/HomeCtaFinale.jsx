import { useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function HomeCtaFinale() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const headlineEl = sectionRef.current.querySelector('.hcf-headline')
      const body    = sectionRef.current.querySelector('.hcf-body')
      const actions = sectionRef.current.querySelector('.hcf-actions')
      const micro   = sectionRef.current.querySelector('.hcf-micro')

      if (prefersReduced) {
        gsap.set([headlineEl, body, actions, micro], { opacity: 1, y: 0 })
        return
      }

      gsap.set([body, actions, micro], { opacity: 0, y: 20 })
      gsap.set(headlineEl, { opacity: 1 })

      const split = SplitText.create(headlineEl, { type: 'words', wordsClass: 'hcf-word' })
      gsap.set(split.words, { opacity: 0, yPercent: 40 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 68%',
          once: true,
        },
      })
        .to(split.words, {
          opacity: 1, yPercent: 0, duration: 0.75, ease: 'expo.out', stagger: 0.07,
          onComplete: () => split.revert(),
        })
        .to(body,    { opacity: 1, y: 0, duration: 0.6,  ease: 'expo.out' }, '-=0.35')
        .to(actions, { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' }, '-=0.3')
        .to(micro,   { opacity: 1, y: 0, duration: 0.4,  ease: 'expo.out' }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hcf-section">
      <div className="hcf-inner">
        <h2 className="hcf-headline" style={{ opacity: 0 }}>
          costruiamo<br />insieme<span className="h-dot">?</span>
        </h2>
        <p className="hcf-body">
          raccontaci il progetto. valutiamo insieme se siamo il partner giusto — e se lo siamo, partiamo<span className="h-dot">.</span>
        </p>
        <div className="hcf-actions">
          <Link to="/contattaci" className="hcf-btn">inizia la conversazione</Link>
        </div>
        <p className="hcf-micro">prima consulenza gratuita · risposta entro 24 ore<span className="h-dot">.</span></p>
      </div>
    </section>
  )
}
