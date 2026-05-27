import { useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function HomeCtaFinale() {
  const sectionRef = useRef(null)
  const btnRef     = useRef(null)

  /* ── Scroll entry ──────────────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const headlineEl = sectionRef.current.querySelector('.hcf-headline')
      const body  = sectionRef.current.querySelector('.hcf-body')
      const right = sectionRef.current.querySelector('.hcf-right')

      if (prefersReduced) {
        gsap.set([headlineEl, body, right], { opacity: 1, y: 0 })
        return
      }

      gsap.set([body, right], { opacity: 0, y: 20 })
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
          opacity: 1, yPercent: 0,
          duration: 0.75, ease: 'expo.out', stagger: 0.07,
          onComplete: () => split.revert(),
        })
        .to(body,  { opacity: 1, y: 0, duration: 0.6,  ease: 'expo.out' }, '-=0.35')
        .to(right, { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' }, '-=0.45')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ── Button shimmer ────────────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const btn     = btnRef.current
    if (!btn) return
    const shimmer = btn.querySelector('.hcf-btn-shimmer')
    if (!shimmer) return

    // Ensure shimmer starts off-screen before any interaction
    gsap.set(shimmer, { x: '-120%', skewX: -12 })

    const onEnter = () => {
      gsap.fromTo(shimmer,
        { x: '-120%', skewX: -12 },
        { x: '240%', skewX: -12, duration: 0.52, ease: 'power2.in', overwrite: true }
      )
    }

    btn.addEventListener('mouseenter', onEnter)
    return () => btn.removeEventListener('mouseenter', onEnter)
  }, [])

  return (
    <section ref={sectionRef} className="hcf-section">
      <div className="hcf-inner">
        <div className="hcf-left">
          <h2 className="hcf-headline" style={{ opacity: 0 }}>
            costruiamo<br />insieme<span className="h-dot">?</span>
          </h2>
          <p className="hcf-body">
            raccontaci cosa stai costruendo.
            capiremo insieme se possiamo essere il partner giusto<span className="h-dot">.</span>
          </p>
        </div>
        <div className="hcf-right">
          <Link to="/contattaci" ref={btnRef} className="hcf-btn">
            <span className="hcf-btn-shimmer" aria-hidden="true" />
            inizia la conversazione
          </Link>
          <p className="hcf-micro">prima call gratuita · risposta entro 24h<span className="h-dot">.</span></p>
        </div>
      </div>
    </section>
  )
}
