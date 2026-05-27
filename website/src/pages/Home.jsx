import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import HeroParticles from '../components/HeroParticles'
import HeroSmoke from '../components/HeroSmoke'
import { useInteractionEffects } from '../hooks/useInteractionEffects'
import HomeAmbient from '../components/HomeAmbient'
import HomeServizi from '../components/HomeServizi'
import HomeDifferenze from '../components/HomeDifferenze'
import HomeApproccio from '../components/HomeApproccio'
import HomeCtaFinale from '../components/HomeCtaFinale'
import HomeFooter from '../components/HomeFooter'
import '../styles/home.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const ACCENT = '#2D5BFF'

export default function Home() {
  useInteractionEffects()
  const heroRef    = useRef(null)
  const primaryRef = useRef(null)
  const ghostRef   = useRef(null)
  const splitRef   = useRef(null)

  /* ── Entry timeline ──────────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.set(['.h-eyebrow', '.h-sub', '.h-actions', '.h-scroll-indicator', '.h-hero-aside'], {
        opacity: 1, y: 0,
      })
      heroRef.current.querySelector('.h-headline').style.opacity = 1
      return
    }

    gsap.set(['.h-eyebrow', '.h-sub', '.h-actions', '.h-scroll-indicator', '.h-hero-aside'], {
      opacity: 0, y: 20,
    })

    const headlineEl = heroRef.current.querySelector('.h-headline')
    gsap.set(headlineEl, { opacity: 1 })

    const split = SplitText.create(headlineEl, {
      type: 'chars,words',
      charsClass: 'h-char',
    })
    splitRef.current = split

    // Perspective per char for the rotateX axis
    gsap.set(split.chars, {
      transformPerspective: 500,
      transformOrigin: '50% 100% -20px',
    })

    const tl = gsap.timeline({ delay: 0.1 })

    tl.to('.h-eyebrow', { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' })
      .from(split.chars, {
        duration: 0.95,
        opacity: 0,
        y: 52,
        scale: 0.72,
        rotateX: -90,
        filter: 'blur(8px)',
        ease: 'back.out(1.4)',
        stagger: (i) => i * 0.022 + (Math.random() - 0.5) * 0.006,
      }, '-=0.32')
      .to('.h-sub', { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.4')
      .to('.h-actions', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.42')
      .to('.h-hero-aside', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.45')
      .to('.h-scroll-indicator', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')

    // Scroll indicator — breathing pulse loop
    gsap.to('.h-scroll-line', {
      scaleY: 0.28,
      opacity: 0.3,
      y: 8,
      duration: 1.6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 2.4,
      transformOrigin: 'top center',
    })

    return () => {
      tl.kill()
      gsap.killTweensOf('.h-scroll-line')
      splitRef.current?.revert()
      splitRef.current = null
    }
  }, [])

  /* ── Char hover — set up after entry finishes ────────────────────────────── */
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const headlineEl = heroRef.current?.querySelector('.h-headline')
    if (!headlineEl) return

    const timer = setTimeout(() => {
      const chars = Array.from(headlineEl.querySelectorAll('.h-char'))
      if (!chars.length) return

      const defaultColor = window.getComputedStyle(chars[0]).color
      const handlers = []

      chars.forEach((char, idx) => {
        const onEnter = () => {
          const isSpace = char.textContent.trim() === ''
          chars.forEach((c, i) => {
            const dist = Math.abs(i - idx)
            if (dist === 0) {
              gsap.to(c, {
                yPercent: -12,
                scale: 1.08,
                ...(isSpace ? {} : { color: ACCENT }),
                duration: 0.22,
                ease: 'power2.out',
                overwrite: 'auto',
              })
            } else if (dist === 1) {
              gsap.to(c, { yPercent: -7, scale: 1.03, duration: 0.22, ease: 'power2.out', overwrite: 'auto' })
            } else if (dist === 2) {
              gsap.to(c, { yPercent: -3, duration: 0.25, ease: 'power2.out', overwrite: 'auto' })
            }
          })
        }

        const onLeave = () => {
          chars.forEach(c => {
            gsap.to(c, {
              yPercent: 0,
              scale: 1,
              color: defaultColor,
              duration: 0.38,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          })
        }

        char.addEventListener('mouseenter', onEnter)
        char.addEventListener('mouseleave', onLeave)
        handlers.push({ char, onEnter, onLeave })
      })

      headlineEl._cleanupCharHover = () => {
        handlers.forEach(({ char, onEnter, onLeave }) => {
          char.removeEventListener('mouseenter', onEnter)
          char.removeEventListener('mouseleave', onLeave)
        })
      }
    }, 2600)

    return () => {
      clearTimeout(timer)
      heroRef.current?.querySelector('.h-headline')?._cleanupCharHover?.()
    }
  }, [])

  /* ── Magnetic CTA ────────────────────────────────────────────────────────── */
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
        const rx = Math.max(-18, Math.min(18, cx * 0.42))
        const ry = Math.max(-18, Math.min(18, cy * 0.42))
        qx(rx)
        qy(ry)
        if (qxi) qxi(cx * 0.12)
        if (qyi) qyi(cy * 0.12)
      }

      const onLeave = () => {
        gsap.to(btn,   { x: 0, y: 0, duration: 0.85, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' })
        if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.55, ease: 'power3.out', overwrite: 'auto' })
      }

      btn.addEventListener('mousemove',  onMove)
      btn.addEventListener('mouseleave', onLeave)
      handlers.push({ btn, inner, onMove, onLeave })
    })

    return () => {
      handlers.forEach(({ btn, inner, onMove, onLeave }) => {
        btn.removeEventListener('mousemove',  onMove)
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
        <HeroSmoke />
        <HeroParticles />

        <div className="h-hero-inner">
          <div className="h-hero-content">
            <span className="h-eyebrow">web · ai · dati</span>

            <h1 className="h-headline" style={{ opacity: 0 }}>
              la tecnologia che serve<span className="h-dot">.</span><br />le persone che la costruiscono<span className="h-dot">.</span>
            </h1>

            <p className="h-sub">
              progettiamo siti web, sistemi AI e strumenti data-driven per aziende
              che vogliono crescere online con più chiarezza, velocità e controllo<span className="h-dot">.</span>
            </p>

            <div className="h-actions">
              <Link to="/contattaci" ref={primaryRef} className="h-btn-primary">
                <span className="h-btn-inner">parliamo del progetto</span>
              </Link>
              <Link to="/servizi" ref={ghostRef} className="h-btn-ghost">
                <span className="h-btn-inner">scopri i servizi</span>
              </Link>
            </div>
          </div>

          <aside className="h-hero-aside" aria-hidden="true">
            <div className="h-aside-stat">
              <span className="h-aside-val">04 sett.</span>
              <span className="h-aside-label">per andare online</span>
            </div>
            <div className="h-aside-sep" />
            <div className="h-aside-stat">
              <span className="h-aside-val">01 team</span>
              <span className="h-aside-label">unico interlocutore</span>
            </div>
            <div className="h-aside-sep" />
            <div className="h-aside-stat">
              <span className="h-aside-val">03 aree</span>
              <span className="h-aside-label">web · AI · dati</span>
            </div>
          </aside>
        </div>

        <div className="h-scroll-indicator">
          <div className="h-scroll-line" />
        </div>
      </section>

      <HomeServizi />
      <HomeDifferenze />
      <HomeApproccio />
      <HomeCtaFinale />
      <HomeFooter />
    </main>
  )
}
