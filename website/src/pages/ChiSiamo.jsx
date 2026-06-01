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

const METODO = [
  {
    num: '01',
    label: 'ascolto',
    text: 'partiamo dalle domande giuste. capiamo il contesto, gli obiettivi reali e i vincoli, prima di proporre qualsiasi soluzione.',
  },
  {
    num: '02',
    label: 'strategia',
    text: 'definiamo insieme la direzione: cosa costruire, in che ordine e come misurarne il valore. niente fronzoli, solo ciò che serve.',
  },
  {
    num: '03',
    label: 'costruzione',
    text: 'progettiamo e sviluppiamo con cura artigianale. iterazioni rapide, feedback continui, zero sorprese al lancio.',
  },
  {
    num: '04',
    label: 'crescita',
    text: 'il lancio è l’inizio. misuriamo, ottimizziamo e facciamo evolvere il progetto nel tempo, al tuo fianco.',
  },
]

const NUMERI = [
  { value: 3,   suffix: '',  label: 'discipline in un solo team' },
  { value: 24,  suffix: 'h', label: 'risposta garantita' },
  { value: 100, suffix: '%', label: 'focus sul risultato' },
  { value: 0,   suffix: '',  label: 'passaggi di consegne' },
]

const STACK = [
  'react', 'next.js', 'node', 'python', 'typescript', 'gsap',
  'llm & agenti', 'postgres', 'tailwind', 'vercel', 'figma', 'webgl',
]

const DNA_WORDS = ['diretti', 'concreti', 'affidabili', 'appassionati']

export default function ChiSiamo() {
  const heroRef    = useRef(null)
  const storyRef   = useRef(null)
  const valoriRef  = useRef(null)
  const metodoRef  = useRef(null)
  const numeriRef  = useRef(null)
  const stackRef   = useRef(null)
  const dnaRef     = useRef(null)
  const ctaRef     = useRef(null)

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

      /* Parallax: hero bg letter drifts on scroll */
      gsap.to(bgLetter, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })

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

      /* ── Metodo (timeline with drawing line) ── */
      const mHeader = metodoRef.current.querySelector('.cs-metodo-header')
      const mLine   = metodoRef.current.querySelector('.cs-metodo-line-fill')
      const steps   = gsap.utils.toArray('.cs-step', metodoRef.current)

      gsap.set(mHeader, { opacity: 0, y: 20 })
      gsap.set(steps, { opacity: 0, x: -28 })
      gsap.set(mLine, { scaleY: 0, transformOrigin: 'top center' })

      gsap.to(mHeader, {
        opacity: 1, y: 0, duration: 0.6, ease: 'expo.out',
        scrollTrigger: { trigger: metodoRef.current, start: 'top 75%', once: true },
      })
      gsap.to(steps, {
        opacity: 1, x: 0, duration: 0.7, ease: 'expo.out', stagger: 0.14,
        scrollTrigger: { trigger: '.cs-metodo-track', start: 'top 78%', once: true },
      })
      gsap.to(mLine, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.cs-metodo-track', start: 'top 70%', end: 'bottom 75%', scrub: true },
      })

      /* ── Numeri (count-up) ── */
      const nHeader = numeriRef.current.querySelector('.cs-num-eyebrow')
      const nItems  = gsap.utils.toArray('.cs-num-item', numeriRef.current)
      gsap.set([nHeader, ...nItems], { opacity: 0, y: 24 })

      gsap.timeline({
        scrollTrigger: { trigger: numeriRef.current, start: 'top 78%', once: true },
        onStart: () => {
          numeriRef.current.querySelectorAll('.cs-num-value').forEach((el) => {
            const end = Number(el.dataset.value)
            const obj = { v: 0 }
            gsap.to(obj, {
              v: end, duration: 1.6, ease: 'power2.out',
              onUpdate: () => { el.firstChild.textContent = Math.round(obj.v) },
            })
          })
        },
      })
        .to(nHeader, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' })
        .to(nItems, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.1 }, '-=0.2')

      /* ── Stack marquee reveal ── */
      gsap.from(stackRef.current.querySelector('.cs-stack-eyebrow'), {
        opacity: 0, y: 18, duration: 0.6, ease: 'expo.out',
        scrollTrigger: { trigger: stackRef.current, start: 'top 82%', once: true },
      })

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

        {/* ── Metodo / Come lavoriamo ── */}
        <section ref={metodoRef} className="cs-metodo">
          <div className="cs-metodo-inner">
            <div className="cs-metodo-header">
              <span className="cs-metodo-eyebrow">// come lavoriamo</span>
              <h2 className="cs-metodo-headline">
                un metodo, quattro passi<span className="h-dot">.</span>
              </h2>
              <p className="cs-metodo-sub">
                niente processi infiniti. un percorso lineare che ti tiene sempre al centro, dal primo confronto alla crescita continua.
              </p>
            </div>

            <div className="cs-metodo-track">
              <div className="cs-metodo-line" aria-hidden="true">
                <div className="cs-metodo-line-fill" />
              </div>
              {METODO.map((s) => (
                <div key={s.num} className="cs-step">
                  <div className="cs-step-marker" aria-hidden="true">
                    <span className="cs-step-dot" />
                  </div>
                  <div className="cs-step-body">
                    <span className="cs-step-num">{s.num}</span>
                    <h3 className="cs-step-label">{s.label}<span className="h-dot">.</span></h3>
                    <p className="cs-step-text">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Numeri (count-up) ── */}
        <section ref={numeriRef} className="cs-numeri">
          <div className="cs-numeri-inner">
            <span className="cs-num-eyebrow">// in breve</span>
            <div className="cs-num-grid">
              {NUMERI.map((n) => (
                <div key={n.label} className="cs-num-item">
                  <div className="cs-num-value" data-value={n.value}>
                    <span>0</span><span className="cs-num-suffix">{n.suffix}</span>
                  </div>
                  <span className="cs-num-label">{n.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stack / Competenze (marquee) ── */}
        <section ref={stackRef} className="cs-stack">
          <div className="cs-stack-inner">
            <span className="cs-stack-eyebrow">// con cosa lavoriamo</span>
          </div>
          <div className="cs-marquee" aria-hidden="true">
            <div className="cs-marquee-track">
              {[...STACK, ...STACK].map((t, i) => (
                <span key={i} className="cs-marquee-item">
                  {t}<span className="cs-marquee-sep">/</span>
                </span>
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
