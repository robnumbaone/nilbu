import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HomeAmbient from '../components/HomeAmbient'
import HeroParticles from '../components/HeroParticles'
import HomeServizi from '../components/HomeServizi'
import HomeDifferenze from '../components/HomeDifferenze'
import HomeApproccio from '../components/HomeApproccio'
import HomeBeforeAfter from '../components/HomeBeforeAfter'
import HomeCtaFinale from '../components/HomeCtaFinale'
import HomeFooter from '../components/HomeFooter'
import { useInteractionEffects } from '../hooks/useInteractionEffects'
import '../styles/home.css'

gsap.registerPlugin(ScrollTrigger)

const SLOT_WORDS = ['cresce', 'scala', 'costruisce', 'accelera']

function SlotMachineWord({ words, interval = 3200 }) {
  const [idx, setIdx] = useState(0)
  const [itemH, setItemH] = useState(0)
  const sizerRef = useRef(null)

  useEffect(() => {
    const measure = () => {
      if (sizerRef.current) setItemH(sizerRef.current.offsetHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIdx(i => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [interval, words.length])

  const widest = words.reduce((a, b) => a.length >= b.length ? a : b)

  return (
    <span className="h-slot" aria-live="polite" aria-atomic="true">
      <span ref={sizerRef} className="h-slot-sizer" aria-hidden="true">{widest}</span>
      <span
        className="h-slot-track"
        style={{ transform: itemH ? `translateY(${-idx * itemH}px)` : 'none' }}
      >
        {words.map((w, i) => (
          <span key={i} className="h-slot-item">{w}</span>
        ))}
      </span>
    </span>
  )
}

function HeroStatTile({ label, value, unit, delta }) {
  return (
    <div className="h-stat-tile">
      <div className="h-stat-label">{label}</div>
      <div className="h-stat-value">
        <span>{value}</span>
        <span className="h-stat-unit">{unit}</span>
      </div>
      <div className="h-stat-delta">{delta}</div>
    </div>
  )
}

function HeroGeom() {
  return (
    <svg className="h-hero-geom" viewBox="0 0 380 380" aria-hidden="true">
      <defs>
        <radialGradient id="hg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(45,91,255,0.35)" />
          <stop offset="60%" stopColor="rgba(45,91,255,0.08)" />
          <stop offset="100%" stopColor="rgba(45,91,255,0)" />
        </radialGradient>
        <linearGradient id="hg-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(183,196,255,0.85)" />
          <stop offset="100%" stopColor="rgba(45,91,255,0.20)" />
        </linearGradient>
      </defs>
      <circle cx="190" cy="190" r="180" fill="url(#hg-glow)" />
      <g stroke="url(#hg-stroke)" fill="none" strokeWidth="1">
        <circle cx="190" cy="190" r="160" opacity="0.35">
          <animateTransform attributeName="transform" type="rotate" from="0 190 190" to="360 190 190" dur="60s" repeatCount="indefinite"/>
        </circle>
        <circle cx="190" cy="190" r="120" opacity="0.6"/>
        <circle cx="190" cy="190" r="80" opacity="0.85" strokeDasharray="4 6">
          <animateTransform attributeName="transform" type="rotate" from="360 190 190" to="0 190 190" dur="40s" repeatCount="indefinite"/>
        </circle>
      </g>
      <g fill="#B7C4FF">
        <circle cx="190" cy="30"  r="3.5"/>
        <circle cx="350" cy="190" r="3"/>
        <circle cx="190" cy="350" r="2.5"/>
        <circle cx="30"  cy="190" r="3"/>
        <circle cx="305" cy="80"  r="2"/>
        <circle cx="305" cy="300" r="2.5"/>
        <circle cx="75"  cy="305" r="2"/>
        <circle cx="75"  cy="75"  r="3"/>
      </g>
      <g fill="#2D5BFF">
        <circle cx="190" cy="190" r="6"/>
      </g>
      <g stroke="rgba(45,91,255,0.35)" strokeWidth="0.6">
        <line x1="190" y1="190" x2="190" y2="30"/>
        <line x1="190" y1="190" x2="350" y2="190"/>
        <line x1="190" y1="190" x2="305" y2="80"/>
        <line x1="190" y1="190" x2="75"  y2="305"/>
      </g>
    </svg>
  )
}

export default function Home() {
  useInteractionEffects()
  const heroRef    = useRef(null)
  const primaryRef = useRef(null)
  const ghostRef   = useRef(null)

  /* ── Entry timeline ──────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const targets = ['.h-eyebrow', '.h-headline', '.h-sub', '.h-actions', '.h-meta', '.h-hero-aside']

    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    gsap.set(targets, { opacity: 0, y: 24 })

    const tl = gsap.timeline({ delay: 0.15 })
    tl.to('.h-eyebrow',    { opacity: 1, y: 0, duration: 0.6,  ease: 'power3.out' })
      .to('.h-headline',   { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.3')
      .to('.h-sub',        { opacity: 1, y: 0, duration: 0.6,  ease: 'power3.out' }, '-=0.42')
      .to('.h-actions',    { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.4')
      .to('.h-meta',       { opacity: 1, y: 0, duration: 0.5,  ease: 'power3.out' }, '-=0.38')
      .to('.h-hero-aside', { opacity: 1, y: 0, duration: 0.6,  ease: 'power3.out' }, '-=0.5')

    return () => tl.kill()
  }, [])

  /* ── Magnetic CTA ────────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const btns = [primaryRef.current, ghostRef.current].filter(Boolean)
    const handlers = []

    btns.forEach(btn => {
      const inner = btn.querySelector('.h-btn-inner')
      const qx  = gsap.quickTo(btn, 'x', { duration: 0.55, ease: 'power3.out' })
      const qy  = gsap.quickTo(btn, 'y', { duration: 0.55, ease: 'power3.out' })
      const qxi = inner ? gsap.quickTo(inner, 'x', { duration: 0.3, ease: 'power2.out' }) : null
      const qyi = inner ? gsap.quickTo(inner, 'y', { duration: 0.3, ease: 'power2.out' }) : null

      const onMove = (e) => {
        const { left, top, width, height } = btn.getBoundingClientRect()
        const cx = e.clientX - left - width  / 2
        const cy = e.clientY - top  - height / 2
        qx(Math.max(-18, Math.min(18, cx * 0.42)))
        qy(Math.max(-18, Math.min(18, cy * 0.42)))
        if (qxi) qxi(cx * 0.12)
        if (qyi) qyi(cy * 0.12)
      }
      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.85, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' })
        if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.55, ease: 'power3.out', overwrite: 'auto' })
      }

      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
      handlers.push({ btn, inner, onMove, onLeave })
    })

    return () => {
      handlers.forEach(({ btn, inner, onMove, onLeave }) => {
        btn.removeEventListener('mousemove', onMove)
        btn.removeEventListener('mouseleave', onLeave)
        gsap.set(btn, { x: 0, y: 0 })
        if (inner) gsap.set(inner, { x: 0, y: 0 })
      })
    }
  }, [])

  return (
    <main className="home-main">
      <HomeAmbient />

      <section ref={heroRef} className="h-hero">
        <HeroParticles />
        <HeroGeom />

        <div className="h-hero-inner">
          <div className="h-hero-content">
            <span className="h-eyebrow">web · ai · dati</span>

            <h1 className="h-headline">
              il partner tech per chi{' '}
              <SlotMachineWord words={SLOT_WORDS} /><span className="h-dot">.</span>
            </h1>

            <p className="h-sub">
              progettiamo siti web, sistemi AI e strumenti data-driven per aziende
              che vogliono crescere online con più chiarezza, velocità e controllo<span className="h-dot">.</span>
            </p>

            <div className="h-actions">
              <Link to="/contattaci" ref={primaryRef} className="h-btn-primary">
                <span className="h-btn-inner">parliamo del progetto</span>
                <span className="h-btn-arrow" aria-hidden="true">→</span>
              </Link>
              <Link to="/servizi" ref={ghostRef} className="h-btn-ghost">
                <span className="h-btn-inner">scopri i servizi</span>
              </Link>
            </div>

            <div className="h-meta">
              <span className="h-meta-ok">online ed operativo</span>
              <span aria-hidden="true">·</span>
              <span>risposta &lt; 24h</span>
              <span aria-hidden="true">·</span>
              <span>milano · italia</span>
            </div>
          </div>

          <aside className="h-hero-aside" aria-label="Statistiche">
            <HeroStatTile
              label="go-live"
              value="04"
              unit="sett."
              delta={<>tempo medio<br />dal brief</>}
            />
            <HeroStatTile
              label="team"
              value="01"
              unit="interlocutore"
              delta={<>nessun passaggio<br />di consegne</>}
            />
            <HeroStatTile
              label="aree"
              value="03"
              unit="web · ai · dati"
              delta={<>un metodo,<br />integrato</>}
            />
          </aside>
        </div>
      </section>

      <HomeServizi />
      <HomeDifferenze />
      <HomeApproccio />
      <HomeBeforeAfter />
      <HomeCtaFinale />
      <HomeFooter />
    </main>
  )
}
