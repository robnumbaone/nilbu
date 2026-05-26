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

export default function Home() {
  useInteractionEffects()
  const heroRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(['.h-eyebrow', '.h-sub', '.h-actions', '.h-scroll-indicator', '.h-hero-strip'], {
        opacity: 0,
        y: 20,
      })

      const headlineEl = heroRef.current.querySelector('.h-headline')
      gsap.set(headlineEl, { opacity: 1 })

      const split = SplitText.create(headlineEl, {
        type: 'chars,words',
        charsClass: 'h-char',
      })

      const tl = gsap.timeline({ delay: 0.05 })

      tl.to('.h-eyebrow', {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
      })
      .from(split.chars, {
        duration: 0.8,
        opacity: 0,
        y: 52,
        scale: 0.72,
        ease: 'expo.out',
        stagger: 0.025,
        onComplete: () => {
          split.revert()
          headlineEl.removeAttribute('aria-hidden')
        },
      }, '-=0.3')
      .to('.h-sub', {
        opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
      }, '-=0.3')
      .to('.h-actions', {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
      }, '-=0.4')
      .to('.h-scroll-indicator', {
        opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
      }, '-=0.3')
      .to('.h-hero-strip', {
        opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
      }, '-=0.3')

      gsap.to('.h-scroll-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.0,
        ease: 'power2.in',
        repeat: -1,
        repeatDelay: 0.6,
        delay: 2,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="home-main">
      <HomeAmbient />
      <section ref={heroRef} className="h-hero">
        <HeroSmoke />
        <HeroParticles />

        <div className="h-hero-inner">
          <span className="h-eyebrow">web · intelligenza artificiale · dati</span>

          <h1 className="h-headline" aria-hidden="true" style={{ opacity: 0 }}>
            il partner tech<br />per chi cresce<span className="h-dot">.</span>
          </h1>

          <p className="h-sub">
            siti performanti, automazioni intelligenti, dati che informano decisioni<span className="h-dot">.</span><br />
            tutto in un unico interlocutore<span className="h-dot">.</span>
          </p>

          <div className="h-actions">
            <Link to="/contattaci" className="h-btn-primary">parliamo del tuo progetto</Link>
            <Link to="/servizi" className="h-btn-ghost">scopri i servizi</Link>
          </div>
        </div>

        <div className="h-scroll-indicator">
          <div className="h-scroll-line" />
        </div>

        <div className="h-hero-strip" aria-hidden="true">
          <div className="h-strip-item">
            <span className="h-strip-val">03</span>
            <span className="h-strip-label">discipline</span>
          </div>
          <div className="h-strip-item">
            <span className="h-strip-val">01</span>
            <span className="h-strip-label">interlocutore</span>
          </div>
          <div className="h-strip-item">
            <span className="h-strip-val">24h</span>
            <span className="h-strip-label">risposta garantita</span>
          </div>
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
