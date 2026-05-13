import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import HeroParticles from '../components/HeroParticles'
import { useInteractionEffects } from '../hooks/useInteractionEffects'
import HomeAmbient from '../components/HomeAmbient'
import HomeIntro from '../components/HomeIntro'
import HomePerChi from '../components/HomePerChi'
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
      gsap.set(['.h-eyebrow', '.h-sub', '.h-actions', '.h-scroll-indicator'], {
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
        <HeroParticles />

        <div className="h-hero-inner">
          <span className="h-eyebrow">consulenza · ai · web · dati</span>

          <h1 className="h-headline" aria-hidden="true" style={{ opacity: 0 }}>
            il partner tech<br />per chi cresce<span className="h-dot">.</span>
          </h1>

          <p className="h-sub">
            siti che funzionano, automazioni che ottimizzano,<br />
            risultati che si vedono<span className="h-dot">.</span>
          </p>

          <div className="h-actions">
            <Link to="/contattaci" className="h-btn-primary">Iniziamo</Link>
            <Link to="/servizi" className="h-btn-ghost">I servizi</Link>
          </div>
        </div>

        <div className="h-scroll-indicator">
          <div className="h-scroll-line" />
        </div>
      </section>

      <HomeIntro />
      <HomePerChi />
      <HomeDifferenze />
      <HomeApproccio />
      <HomeCtaFinale />
      <HomeFooter />
    </main>
  )
}
