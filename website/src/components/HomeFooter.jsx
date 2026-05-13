import { useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { to: '/',           label: 'home' },
  { to: '/chi-siamo',  label: 'chi siamo' },
  { to: '/servizi',    label: 'servizi' },
  { to: '/contattaci', label: 'contattaci' },
]

export default function HomeFooter() {
  const footerRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const cols   = gsap.utils.toArray('.hf-col', footerRef.current)
      const bottom = footerRef.current.querySelector('.hf-bottom')

      if (prefersReduced) {
        gsap.set([...cols, bottom], { opacity: 1, y: 0 })
        return
      }

      gsap.set([...cols, bottom], { opacity: 0, y: 20 })

      gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          once: true,
        },
      })
        .to(cols,   { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.1 })
        .to(bottom, { opacity: 1, y: 0, duration: 0.5,  ease: 'power3.out' }, '-=0.2')
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="hf-footer">
      <div className="hf-top-line" aria-hidden="true" />
      <div className="hf-inner">
        <div className="hf-col hf-brand">
          <span className="hf-logo">
            nilbu<span className="hf-logo-dot">.</span>
          </span>
          <p className="hf-tagline">il partner tech per chi cresce<span className="h-dot">.</span></p>
          <p className="hf-desc">
            siti performanti, automazioni e sistemi digitali<br />
            per aziende che vogliono crescere con ordine e qualità<span className="h-dot">.</span>
          </p>
        </div>

        <nav className="hf-col hf-nav" aria-label="Navigazione footer">
          <span className="hf-nav-label">navigazione</span>
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="hf-nav-link">{l.label}</Link>
          ))}
        </nav>

        <div className="hf-col hf-contact">
          <span className="hf-nav-label">contatti</span>
          <a href="mailto:info@nilbu.com" className="hf-email">info@nilbu.com</a>
        </div>
      </div>

      <div className="hf-bottom">
        <span className="hf-copy">© 2026 nilbu</span>
        <Link to="/privacy" className="hf-legal">privacy policy</Link>
      </div>
    </footer>
  )
}
