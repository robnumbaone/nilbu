import { useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import '../styles/not-found.css'

const LINKS = [
  { to: '/',           label: 'home' },
  { to: '/servizi',    label: 'servizi' },
  { to: '/chi-siamo',  label: 'chi siamo' },
  { to: '/contattaci', label: 'contattaci' },
]

export default function NotFound() {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      const bg       = rootRef.current.querySelector('.nf-bg')
      const eyebrow  = rootRef.current.querySelector('.nf-eyebrow')
      const headline = rootRef.current.querySelector('.nf-headline')
      const body     = rootRef.current.querySelector('.nf-body')
      const links    = rootRef.current.querySelectorAll('.nf-link')

      gsap.set([eyebrow, headline, body], { opacity: 0, y: 24 })
      gsap.set(links, { opacity: 0, y: 14 })
      gsap.set(bg, { opacity: 0, scale: 1.04 })

      gsap.timeline({ delay: 0.05 })
        .to(bg,       { opacity: 1, scale: 1, duration: 1.3, ease: 'power2.out' })
        .to(eyebrow,  { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 0.2)
        .to(headline, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 0.32)
        .to(body,     { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, 0.48)
        .to(links,    { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out', stagger: 0.07 }, 0.6)
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <title>Pagina non trovata — nilbu.</title>
      <meta name="robots" content="noindex" />

      <main ref={rootRef} className="nf-main">
        <div className="nf-bg" aria-hidden="true">404</div>

        <div className="nf-inner">
          <span className="nf-eyebrow">// errore 404</span>
          <h1 className="nf-headline">
            questa pagina<br />non esiste<span className="h-dot">.</span>
          </h1>
          <p className="nf-body">
            il link potrebbe essere vecchio o la pagina è stata spostata.
            nessun problema — riprendiamo da qui<span className="h-dot">.</span>
          </p>

          <nav className="nf-links" aria-label="Pagine principali">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="nf-link">
                <span className="nf-link-label">{l.label}</span>
                <span className="nf-link-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </nav>
        </div>
      </main>
    </>
  )
}
