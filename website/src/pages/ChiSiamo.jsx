import { useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import HomeFooter from '../components/HomeFooter'
import '../styles/chi-siamo.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const VALORI = [
  {
    num: '01',
    label: 'chiarezza',
    text: 'obiettivi definiti, comunicazione diretta. sai sempre cosa stiamo facendo, perché lo stiamo facendo e quando arriverà.',
  },
  {
    num: '02',
    label: 'qualità',
    text: 'non consegniamo mai qualcosa di cui non siamo orgogliosi. ogni progetto è curato nei dettagli che contano davvero.',
  },
  {
    num: '03',
    label: 'continuità',
    text: 'non siamo un fornitore, siamo un partner. il progetto non si chiude con il lancio — lo seguiamo, lo misuriamo, lo facciamo crescere.',
  },
]

const DNA_WORDS = ['diretti', 'concreti', 'affidabili', 'appassionati']

export default function ChiSiamo() {
  const heroRef   = useRef(null)
  const storyRef  = useRef(null)
  const valoriRef = useRef(null)
  const dnaRef    = useRef(null)
  const ctaRef    = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      /* ── Hero ── */
      const eyebrow    = heroRef.current.querySelector('.cs-hero-eyebrow')
      const headlineEl = heroRef.current.querySelector('.cs-hero-headline')
      const sub        = heroRef.current.querySelector('.cs-hero-sub')
      const bgLetter   = heroRef.current.querySelector('.cs-hero-bg')

      gsap.set([eyebrow, sub], { opacity: 0, y: 24 })
      gsap.set(headlineEl, { opacity: 1 })
      gsap.set(bgLetter, { opacity: 0 })

      const split = SplitText.create(headlineEl, { type: 'words', wordsClass: 'cs-word' })
      gsap.set(split.words, { opacity: 0, yPercent: 80, rotationX: -20 })

      gsap.timeline({ delay: 0.1 })
        .to(bgLetter, { opacity: 1, duration: 1.4, ease: 'power2.out' })
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' }, 0.2)
        .to(split.words, {
          opacity: 1, yPercent: 0, rotationX: 0,
          duration: 0.85, ease: 'expo.out', stagger: 0.07,
          onComplete: () => split.revert(),
        }, 0.35)
        .to(sub, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, 0.68)

      /* ── Story ── */
      const divider = storyRef.current.querySelector('.cs-story-divider')
      const quote   = storyRef.current.querySelector('.cs-story-quote')
      const bodies  = storyRef.current.querySelectorAll('.cs-story-body')
      const stats   = storyRef.current.querySelector('.cs-story-stats')

      gsap.set([quote, ...bodies, stats], { opacity: 0, y: 28 })
      gsap.set(divider, { scaleX: 0, transformOrigin: 'left center' })

      gsap.timeline({
        scrollTrigger: { trigger: storyRef.current, start: 'top 72%', once: true },
      })
        .to(divider, { scaleX: 1, duration: 0.9, ease: 'expo.out' })
        .to(quote,   { opacity: 1, y: 0, duration: 0.75, ease: 'expo.out' }, '-=0.5')
        .to(bodies,  { opacity: 1, y: 0, duration: 0.65, ease: 'expo.out', stagger: 0.1 }, '-=0.4')
        .to(stats,   { opacity: 1, y: 0, duration: 0.5,  ease: 'expo.out' }, '-=0.25')

      /* ── Valori ── */
      const vHeader = valoriRef.current.querySelector('.cs-val-header')
      const cards   = gsap.utils.toArray('.cs-val-card', valoriRef.current)

      gsap.set(vHeader, { opacity: 0, y: 20 })
      gsap.set(cards, { opacity: 0, y: 40 })

      gsap.timeline({
        scrollTrigger: { trigger: valoriRef.current, start: 'top 70%', once: true },
      })
        .to(vHeader, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' })
        .to(cards, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.1 }, '-=0.3')

      /* ── DNA ── */
      const dnaWords = gsap.utils.toArray('.cs-dna-word', dnaRef.current)
      const dnaSeps  = gsap.utils.toArray('.cs-dna-sep', dnaRef.current)
      const dnaLabel = dnaRef.current.querySelector('.cs-dna-label')

      gsap.set([dnaLabel, ...dnaWords, ...dnaSeps], { opacity: 0, y: 24 })

      gsap.timeline({
        scrollTrigger: { trigger: dnaRef.current, start: 'top 75%', once: true },
      })
        .to(dnaLabel, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' })
        .to([...dnaWords, ...dnaSeps], {
          opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.06,
        }, '-=0.2')

      /* ── CTA ── */
      const ctaEls = ctaRef.current.querySelectorAll('.cs-cta-eyebrow, .cs-cta-headline, .cs-cta-body, .cs-cta-btn')
      gsap.set(ctaEls, { opacity: 0, y: 20 })

      gsap.timeline({
        scrollTrigger: { trigger: ctaRef.current, start: 'top 72%', once: true },
      })
        .to(ctaEls, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.1 })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <title>Chi Siamo — nilbu.</title>
      <meta name="description" content="Scopri chi siamo: il tech partner italiano per siti web, AI e analisi dei dati. Piccolo team, approccio diretto, risultati concreti." />

      <main className="cs-main">

        {/* ── Hero ── */}
        <section ref={heroRef} className="cs-hero">
          <div className="cs-hero-bg" aria-hidden="true">N</div>
          <div className="cs-hero-inner">
            <span className="cs-hero-eyebrow">// chi siamo</span>
            <h1 className="cs-hero-headline" style={{ opacity: 0 }}>
              costruiamo il digitale<br />
              di chi vuole crescere<span className="h-dot">.</span>
            </h1>
            <p className="cs-hero-sub">
              un piccolo team italiano con un approccio diretto: nessuna sovrastruttura, solo lavoro concreto e risultati che si misurano davvero.
            </p>
          </div>
          <div className="cs-hero-scroll" aria-hidden="true">
            <div className="cs-hero-scroll-line" />
          </div>
        </section>

        {/* ── Storia ── */}
        <section ref={storyRef} className="cs-story">
          <div className="cs-story-divider" aria-hidden="true" />
          <div className="cs-story-inner">
            <div className="cs-story-left">
              <span className="cs-story-label">// la nostra storia</span>
              <blockquote className="cs-story-quote">
                "le PMI italiane meritano lo stesso accesso tecnologico delle grandi aziende — senza burocrazia e senza costi sproporzionati."
              </blockquote>
            </div>

            <div className="cs-story-right">
              <p className="cs-story-body">
                nilbu nasce da una convinzione precisa: le piccole e medie imprese italiane meritano un partner tecnologico serio, non un'agenzia che scompare dopo il lancio. siamo partiti costruendo quello che avremmo voluto avere noi stessi.
              </p>
              <p className="cs-story-body">
                un interlocutore unico, capace di lavorare su web, intelligenza artificiale e dati con la stessa qualità esecutiva. senza team dispersi, senza account manager nel mezzo, senza strutture che rallentano e costano. solo lavoro vero, orientato ai risultati.
              </p>
              <div className="cs-story-stats">
                <div className="cs-stat">
                  <span className="cs-stat-num">3</span>
                  <span className="cs-stat-label">discipline in un solo team</span>
                </div>
                <div className="cs-stat">
                  <span className="cs-stat-num">24h</span>
                  <span className="cs-stat-label">risposta garantita</span>
                </div>
                <div className="cs-stat">
                  <span className="cs-stat-num">100%</span>
                  <span className="cs-stat-label">focus sul risultato</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Valori ── */}
        <section ref={valoriRef} className="cs-valori">
          <div className="cs-valori-inner">
            <div className="cs-val-header">
              <span className="cs-val-eyebrow">// valori</span>
              <h2 className="cs-val-headline">
                quello in cui crediamo<span className="h-dot">.</span>
              </h2>
            </div>
            <div className="cs-val-grid">
              {VALORI.map((v) => (
                <div key={v.num} className="cs-val-card">
                  <div className="cs-val-card-top">
                    <span className="cs-val-num">{v.num}</span>
                    <div className="cs-val-rule" aria-hidden="true" />
                  </div>
                  <h3 className="cs-val-label">{v.label}<span className="h-dot">.</span></h3>
                  <p className="cs-val-text">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DNA strip ── */}
        <section ref={dnaRef} className="cs-dna">
          <div className="cs-dna-inner">
            <span className="cs-dna-label">// il nostro DNA</span>
            <div className="cs-dna-words">
              {DNA_WORDS.map((word, i) => (
                <span key={word}>
                  <span className="cs-dna-word">{word}</span>
                  {i < DNA_WORDS.length - 1 && (
                    <span className="cs-dna-sep" aria-hidden="true"> · </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section ref={ctaRef} className="cs-cta">
          <div className="cs-cta-inner">
            <span className="cs-cta-eyebrow">// lavoriamo insieme</span>
            <h2 className="cs-cta-headline">
              hai un progetto<span className="h-dot">?</span>
            </h2>
            <p className="cs-cta-body">
              raccontaci cosa stai costruendo. valutiamo insieme se siamo il partner giusto per te.
            </p>
            <Link to="/contattaci" className="cs-cta-btn">inizia la conversazione</Link>
          </div>
        </section>

        <HomeFooter />
      </main>
    </>
  )
}
