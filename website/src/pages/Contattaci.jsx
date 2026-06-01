import { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import HomeFooter from '../components/HomeFooter'
import '../styles/contattaci.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const TIPI = [
  { id: 'web',   label: 'siti web' },
  { id: 'ai',    label: 'intelligenza artificiale' },
  { id: 'data',  label: 'analisi dei dati' },
  { id: 'altro', label: 'altro / non so ancora' },
]

const PROMISES = [
  'risposta entro 24 ore',
  'prima consulenza gratuita',
  'nessun impegno',
]

const EXPECT = [
  { num: '01', text: 'ti rispondiamo entro 24 ore con una proposta di call esplorativa.' },
  { num: '02', text: 'ascoltiamo il progetto, facciamo le domande giuste, valutiamo insieme i passi.' },
  { num: '03', text: 'se c\'è un buon match, ti inviamo un brief e un preventivo trasparente.' },
]

const SERVICES = ['siti web su misura', 'automazioni e agenti AI', 'dashboard e analisi dati']

const GARANZIE = [
  {
    num: '01',
    title: 'risposta in 24 ore',
    text: 'ogni messaggio riceve una risposta entro un giorno lavorativo. niente attese di settimane, niente silenzi.',
  },
  {
    num: '02',
    title: 'prima call gratuita',
    text: 'la consulenza iniziale è gratuita e senza impegno. capiamo insieme se ha senso lavorare insieme.',
  },
  {
    num: '03',
    title: 'preventivo trasparente',
    text: 'scope, tempi e costo fisso definiti prima di iniziare. nessun costo nascosto, nessuna sorpresa.',
  },
]

export default function Contattaci() {
  const [tipo,  setTipo]  = useState('')
  const [form,  setForm]  = useState({ nome: '', email: '', messaggio: '' })
  const [sent,  setSent]  = useState(false)

  const heroRef = useRef(null)
  const formRef = useRef(null)
  const garRef  = useRef(null)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      /* ── Hero ── */
      const eyebrow    = heroRef.current.querySelector('.ct-hero-eyebrow')
      const headlineEl = heroRef.current.querySelector('.ct-hero-headline')
      const sub        = heroRef.current.querySelector('.ct-hero-sub')
      const promises   = heroRef.current.querySelectorAll('.ct-promise-item')
      const bgEl       = heroRef.current.querySelector('.ct-hero-bg')

      gsap.set([eyebrow, sub], { opacity: 0, y: 20 })
      gsap.set(promises, { opacity: 0, y: 10 })
      gsap.set(headlineEl, { opacity: 1 })
      gsap.set(bgEl, { opacity: 0 })

      const split = SplitText.create(headlineEl, { type: 'words', wordsClass: 'ct-word' })
      gsap.set(split.words, { opacity: 0, yPercent: 100 })

      gsap.timeline({ delay: 0.1 })
        .to(bgEl, { opacity: 1, duration: 1.4, ease: 'power2.out' })
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 0.2)
        .to(split.words, {
          opacity: 1, yPercent: 0, duration: 0.75, ease: 'expo.out', stagger: 0.06,
          onComplete: () => split.revert(),
        }, 0.32)
        .to(sub, { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' }, 0.6)
        .to(promises, { opacity: 1, y: 0, duration: 0.45, ease: 'expo.out', stagger: 0.08 }, 0.72)

      /* ── Form section ── */
      const formItems = formRef.current.querySelectorAll(
        '.ct-tipo-label, .ct-tipo-grid, .ct-form, .ct-info-block, .ct-info-divider'
      )
      gsap.set(formItems, { opacity: 0, y: 20 })

      gsap.timeline({
        scrollTrigger: { trigger: formRef.current, start: 'top 75%', once: true },
      })
        .to(formItems, { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out', stagger: 0.07 })

      /* ── Garanzie ── */
      const garHeader = garRef.current.querySelector('.ct-gar-eyebrow')
      const garCards  = gsap.utils.toArray('.ct-gar-card', garRef.current)
      const garLine   = garRef.current.querySelector('.ct-gar-divider')

      gsap.set(garHeader, { opacity: 0, y: 20 })
      gsap.set(garCards, { opacity: 0, y: 36 })
      gsap.set(garLine, { scaleX: 0, transformOrigin: 'left center' })

      gsap.timeline({
        scrollTrigger: { trigger: garRef.current, start: 'top 78%', once: true },
      })
        .to(garLine, { scaleX: 1, duration: 0.8, ease: 'expo.out' })
        .to(garHeader, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, '-=0.5')
        .to(garCards, { opacity: 1, y: 0, duration: 0.65, ease: 'expo.out', stagger: 0.1 }, '-=0.3')

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <title>Contattaci — nilbu.</title>
      <meta name="description" content="Contatta nilbu per siti web, intelligenza artificiale e analisi dei dati. Prima consulenza gratuita, risposta entro 24 ore." />

      <main className="ct-main">

        {/* ── Hero ── */}
        <section ref={heroRef} className="ct-hero">
          <div className="ct-hero-bg" aria-hidden="true">→</div>
          <div className="ct-hero-inner">
            <span className="ct-hero-eyebrow">// contattaci</span>
            <h1 className="ct-hero-headline" style={{ opacity: 0 }}>
              parliamo<span className="h-dot">.</span>
            </h1>
            <p className="ct-hero-sub">
              raccontaci il progetto. valutiamo insieme se siamo il partner giusto — e se lo siamo, costruiamo qualcosa di buono.
            </p>
          </div>

          <div className="ct-hero-promises" role="list">
            {PROMISES.map((p) => (
              <div key={p} className="ct-promise-item" role="listitem">
                <span className="ct-promise-dot" aria-hidden="true" />
                <span className="ct-promise-text">{p}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Form + Info ── */}
        <section className="ct-section">
          <div ref={formRef} className="ct-section-inner">

            {/* Form */}
            <div className="ct-form-wrap">

              {/* Tipo */}
              <span className="ct-tipo-label">di cosa hai bisogno?</span>
              <div className="ct-tipo-grid" role="group" aria-label="Tipo di servizio">
                {TIPI.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`ct-tipo-btn${tipo === t.id ? ' ct-tipo-btn--active' : ''}`}
                    onClick={() => setTipo(tipo === t.id ? '' : t.id)}
                    aria-pressed={tipo === t.id}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Form or Sent state */}
              {sent ? (
                <div className="ct-sent">
                  <div className="ct-sent-icon" aria-hidden="true">✓</div>
                  <h2 className="ct-sent-headline">
                    messaggio ricevuto<span className="h-dot">.</span>
                  </h2>
                  <p className="ct-sent-body">
                    ti rispondiamo entro 24 ore. nel frattempo, se vuoi accelerare scrivici direttamente a{' '}
                    <a href="mailto:info@nilbu.it" style={{ color: 'var(--accent-soft)' }}>info@nilbu.it</a>
                    <span className="h-dot">.</span>
                  </p>
                </div>
              ) : (
                <form className="ct-form" onSubmit={handleSubmit} noValidate>
                  <div className="ct-form-row">
                    <div className="ct-field">
                      <label className="ct-field-label" htmlFor="nome">nome</label>
                      <input
                        id="nome" name="nome" type="text"
                        className="ct-input" placeholder="il tuo nome"
                        value={form.nome} onChange={handleChange} required
                        autoComplete="name"
                      />
                    </div>
                    <div className="ct-field">
                      <label className="ct-field-label" htmlFor="email">email</label>
                      <input
                        id="email" name="email" type="email"
                        className="ct-input" placeholder="la tua email"
                        value={form.email} onChange={handleChange} required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="ct-field">
                    <label className="ct-field-label" htmlFor="messaggio">il tuo progetto</label>
                    <textarea
                      id="messaggio" name="messaggio"
                      className="ct-input ct-textarea"
                      placeholder="descrivi cosa vuoi costruire, il contesto, i tuoi obiettivi..."
                      rows={6} value={form.messaggio} onChange={handleChange} required
                    />
                  </div>

                  <div className="ct-submit-row">
                    <button type="submit" className="ct-submit">
                      invia messaggio
                      <span className="ct-submit-arrow" aria-hidden="true">→</span>
                    </button>
                    <span className="ct-submit-micro">risposta entro 24h<span className="h-dot">.</span></span>
                  </div>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <aside className="ct-info" aria-label="Informazioni di contatto">
              <div className="ct-info-block">
                <span className="ct-info-label">o scrivici direttamente</span>
                <a href="mailto:info@nilbu.it" className="ct-info-email">info@nilbu.it</a>
              </div>

              <div className="ct-info-divider" aria-hidden="true" />

              <div className="ct-info-block">
                <span className="ct-info-label">cosa aspettarsi</span>
                <ul className="ct-expect-list">
                  {EXPECT.map((e) => (
                    <li key={e.num} className="ct-expect-item">
                      <span className="ct-expect-num">{e.num}</span>
                      <span className="ct-expect-text">{e.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ct-info-divider" aria-hidden="true" />

              <div className="ct-info-block">
                <span className="ct-info-label">cosa costruiamo</span>
                <ul className="ct-services-list">
                  {SERVICES.map((s) => (
                    <li key={s} className="ct-service-item">
                      <span className="ct-service-dot" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

          </div>
        </section>

        {/* ── Garanzie ── */}
        <section ref={garRef} className="ct-gar">
          <div className="ct-gar-divider" aria-hidden="true" />
          <div className="ct-gar-inner">
            <span className="ct-gar-eyebrow">// nessun rischio</span>
            <div className="ct-gar-grid">
              {GARANZIE.map((g) => (
                <div key={g.num} className="ct-gar-card">
                  <span className="ct-gar-num">{g.num}</span>
                  <h3 className="ct-gar-title">{g.title}<span className="h-dot">.</span></h3>
                  <p className="ct-gar-text">{g.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HomeFooter />
      </main>
    </>
  )
}
