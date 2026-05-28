import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { gsap } from 'gsap'
import Logo from './Logo'
import { useTheme } from '../hooks/useTheme.jsx'
import '../styles/navbar.css'

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2"  x2="12" y2="4"/>
      <line x1="12" y1="20" x2="12" y2="22"/>
      <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="2"  y1="12" x2="4"  y2="12"/>
      <line x1="20" y1="12" x2="22" y2="12"/>
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

/* ── Team Pulse + CTA pill ──────────────────────────────────────── */
function NavCTA() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30000)
    return () => clearInterval(id)
  }, [])
  const hh = String(time.getHours()).padStart(2, '0')
  const mm = String(time.getMinutes()).padStart(2, '0')

  return (
    <div className="nav-cta-pill">
      <div className="team-pulse" title="Stato del team — Italia">
        <span className="team-pulse-dot" aria-hidden="true" />
        <span>online</span>
        <span className="team-pulse-sep" aria-hidden="true">·</span>
        <span>{hh}:{mm} CET</span>
        <span className="team-pulse-sep" aria-hidden="true">·</span>
        <span className="team-pulse-slot">1 slot</span>
      </div>
      <div className="nav-cta-sep" aria-hidden="true" />
      <Link to="/contattaci" className="nav-cta-btn">
        parliamo <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}

const links = [
  { to: '/',           label: 'home',       num: '00' },
  { to: '/chi-siamo',  label: 'chi siamo',  num: '01' },
  { to: '/servizi',    label: 'servizi',    num: '02' },
  { to: '/contattaci', label: 'contattaci', num: '03' },
]

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle: toggleTheme } = useTheme()
  const openRef    = useRef(false)
  const tlRef      = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    gsap.set(['.nav-logo-link', '.nav-island', '.nav-cta-pill'], { y: -20, opacity: 0 })
    gsap.to(['.nav-logo-link', '.nav-island', '.nav-cta-pill'], {
      y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay: 1.3,
    })
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    gsap.set('.nav-panel', {
      autoAlpha: 0,
      xPercent: -50,
      yPercent: -6,
      scale: 0.9,
      transformOrigin: 'top center',
    })
    gsap.set('.nav-menu-link', { opacity: 0, y: 8 })

    tlRef.current = gsap.timeline({ paused: true })
      .set(overlayRef.current, { pointerEvents: 'auto' })
      .to('.bar-mid', { opacity: 0, duration: 0.15, ease: 'power2.in' }, 0)
      .to('.bar-top', { attr: { x1: 3, y1: 3, x2: 13, y2: 13 }, duration: 0.28, ease: 'power3.inOut' }, 0)
      .to('.bar-bot', { attr: { x1: 13, y1: 3, x2: 3, y2: 13 }, duration: 0.28, ease: 'power3.inOut' }, 0)
      .to('.nav-backdrop',  { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0)
      .to('.nav-panel', {
        autoAlpha: 1, xPercent: -50, yPercent: 0, scale: 1,
        duration: 0.55, ease: 'back.out(2)',
      }, 0.05)
      .to('.nav-menu-link', {
        opacity: 1, y: 0, duration: 0.28, ease: 'power2.out', stagger: 0.05,
      }, 0.15)

    return () => tlRef.current?.kill()
  }, [])

  const open = () => {
    openRef.current = true
    setIsOpen(true)
    tlRef.current.timeScale(1).play()
  }

  const close = () => {
    if (!openRef.current) return
    openRef.current = false
    setIsOpen(false)
    tlRef.current
      .eventCallback('onReverseComplete', () =>
        gsap.set(overlayRef.current, { pointerEvents: 'none' })
      )
      .timeScale(1)
      .reverse()
  }

  const toggle = () => (openRef.current ? close() : open())

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <Link to="/" className="nav-logo-link" onClick={close}>
        <Logo size={22} />
      </Link>

      {/* Original island — top-center */}
      <div className={`nav-island${scrolled ? ' nav-island--scrolled' : ''}`}>
        <button
          className="nav-theme-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <div className="nav-divider" />
        <button
          className="nav-menu-btn"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls="nav-overlay"
          aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
        >
          <div className="nav-btn-cont">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <line className="bar bar-top" x1="2" y1="5"  x2="14" y2="5"  stroke="var(--mute)" strokeWidth="1.5" strokeLinecap="round" />
              <line className="bar bar-mid" x1="2" y1="8"  x2="14" y2="8"  stroke="var(--mute)" strokeWidth="1.5" strokeLinecap="round" />
              <line className="bar bar-bot" x1="2" y1="11" x2="14" y2="11" stroke="var(--mute)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </button>
      </div>

      {/* Team Pulse + CTA — top-right */}
      <NavCTA />

      <div
        ref={overlayRef}
        className="nav-overlay"
        id="nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Menu di navigazione"
      >
        <div className="nav-backdrop" onClick={close} />
        <nav className="nav-panel">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `nav-menu-link${isActive ? ' nav-menu-link--active' : ''}`
              }
              tabIndex={isOpen ? 0 : -1}
              onClick={close}
            >
              <span className="nav-link-label">{l.label}</span>
              <span className="nav-link-num">{l.num}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  )
}
