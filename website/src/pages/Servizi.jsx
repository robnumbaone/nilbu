import { useRef, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HomeFooter from '../components/HomeFooter'
import '../styles/servizi.css'

gsap.registerPlugin(ScrollTrigger)

function VisualWeb() {
  return (
    <div className="sv-vis-web">
      <div className="sv-browser">
        <div className="sv-browser-bar">
          <div className="sv-browser-dots">
            <span className="sv-bd sv-bd-1" />
            <span className="sv-bd sv-bd-2" />
            <span className="sv-bd sv-bd-3" />
          </div>
          <div className="sv-browser-url">
            <span className="sv-url-proto">https://</span>nilbu.studio
          </div>
        </div>
        <div className="sv-browser-body">
          <div className="sv-mock-nav">
            <div className="sv-mock-logo-block" />
            <div className="sv-mock-nav-links">
              <div /><div /><div /><div />
            </div>
          </div>
          <div className="sv-mock-hero-area">
            <div className="sv-mock-line sv-mock-line-xl" />
            <div className="sv-mock-line sv-mock-line-lg" />
            <div className="sv-mock-line sv-mock-line-md" />
            <div className="sv-mock-spacer" />
            <div className="sv-mock-btn-row">
              <div className="sv-mock-btn-primary" />
              <div className="sv-mock-btn-ghost" />
            </div>
          </div>
          <div className="sv-mock-grid">
            <div className="sv-mock-card" />
            <div className="sv-mock-card" />
            <div className="sv-mock-card" />
          </div>
        </div>
      </div>
    </div>
  )
}

function VisualAI() {
  const nodes = [
    { x: 40,  y: 55,  accent: false },
    { x: 140, y: 25,  accent: true  },
    { x: 250, y: 60,  accent: false },
    { x: 80,  y: 125, accent: false },
    { x: 185, y: 105, accent: true  },
    { x: 275, y: 145, accent: false },
    { x: 30,  y: 195, accent: false },
    { x: 125, y: 178, accent: false },
    { x: 225, y: 195, accent: true  },
  ]

  const edges = [
    [0,1],[1,2],[0,3],[1,3],[1,4],[2,4],[2,5],
    [3,4],[4,5],[3,6],[3,7],[4,7],[4,8],[5,8],[6,7],[7,8],
  ]

  return (
    <div className="sv-vis-ai">
      <svg width="310" height="230" viewBox="0 0 310 230" fill="none">
        {edges.map(([a, b], i) => (
          <line
            key={`e${i}`}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="#202020"
            strokeWidth="1.5"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={`n${i}`} transform={`translate(${n.x},${n.y})`}>
            {n.accent && (
              <circle
                cx={0} cy={0} r={14}
                fill="rgba(45,91,255,0.12)"
                className="sv-ai-ring"
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            )}
            <circle
              cx={0} cy={0}
              r={n.accent ? 5.5 : 3.5}
              fill={n.accent ? 'var(--accent)' : '#1c1c1c'}
              stroke={n.accent ? 'rgba(45,91,255,0.45)' : '#2c2c2c'}
              strokeWidth="1.5"
              className={n.accent ? 'sv-ai-accent-node' : ''}
            />
          </g>
        ))}
      </svg>
      <p className="sv-vis-label">input → process → output</p>
    </div>
  )
}

function VisualData() {
  const bars = [
    { h: 34, label: 'Q1' },
    { h: 52, label: 'Q2' },
    { h: 43, label: 'Q3' },
    { h: 67, label: 'Q4' },
    { h: 60, label: 'Q1' },
    { h: 88, label: 'Q2' },
  ]

  return (
    <div className="sv-vis-data">
      <div className="sv-chart">
        <div className="sv-chart-bars">
          {bars.map((b, i) => (
            <div key={i} className="sv-chart-bar-wrap">
              <div
                className={`sv-chart-bar${i === bars.length - 1 ? ' sv-chart-bar--accent' : ''}`}
                style={{ '--bar-h': b.h + '%', '--bar-i': i }}
              />
              <span className="sv-chart-x-label">{b.label}</span>
            </div>
          ))}
        </div>
        <div className="sv-chart-baseline" />
      </div>
      <p className="sv-vis-label sv-vis-label--accent">crescita trimestrale ↑</p>
    </div>
  )
}

const SERVICES = [
  {
    num: '01',
    id: 'web',
    title: 'siti web',
    body: 'Design su misura, codice pulito, esperienze che funzionano su ogni dispositivo. Dal brief al lancio, con attenzione ai dettagli che fanno la differenza.',
    tags: ['UI / UX', 'CMS', 'SEO', 'Responsive'],
    deliverables: ['design su misura', 'sviluppo front & back', 'ottimizzazione SEO', 'manutenzione continua'],
    Visual: VisualWeb,
  },
  {
    num: '02',
    id: 'ai',
    title: 'intelligenza artificiale',
    body: 'Chatbot, automazioni, agenti AI. Integriamo modelli linguistici e sistemi di machine learning direttamente nei tuoi flussi di lavoro.',
    tags: ['LLM', 'Agents', 'Automazione', 'Integrazione'],
    deliverables: ['chatbot & assistenti', 'agenti autonomi', 'automazioni su misura', 'integrazione nei tuoi tool'],
    Visual: VisualAI,
  },
  {
    num: '03',
    id: 'data',
    title: 'analisi dei dati',
    body: 'Trasformiamo dati grezzi in visualizzazioni chiare e decisioni informate. Dashboard su misura, pipeline dati e business intelligence.',
    tags: ['Dashboard', 'Pipeline', 'BI', 'Visualizzazioni'],
    deliverables: ['dashboard interattive', 'pipeline dati', 'report automatici', 'modelli predittivi'],
    Visual: VisualData,
  },
]

const PROCESS = [
  { num: '01', label: 'brief', text: 'ci racconti il progetto. ti rispondiamo entro 24 ore con le prime domande.' },
  { num: '02', label: 'proposta', text: 'definiamo scope, tempi e preventivo trasparente. nessuna sorpresa.' },
  { num: '03', label: 'build', text: 'costruiamo per iterazioni, con feedback continui e demo regolari.' },
  { num: '04', label: 'lancio & oltre', text: 'andiamo online insieme e seguiamo la crescita nel tempo.' },
]

const FAQ = [
  {
    q: 'quanto tempo serve per un progetto?',
    a: 'dipende dallo scope, ma un sito tipico va online in 3–5 settimane dal brief. per AI e dati definiamo insieme una roadmap a milestone fin dalla proposta.',
  },
  {
    q: 'come funziona il preventivo?',
    a: 'dopo il primo confronto ti inviamo una proposta trasparente con scope, tempi e costo fisso. niente costi nascosti, niente sorprese in corso d’opera.',
  },
  {
    q: 'lavorate con aziende piccole?',
    a: 'sì, è il nostro pane. nilbu nasce proprio per dare alle PMI lo stesso accesso tecnologico delle grandi aziende, senza burocrazia e senza costi sproporzionati.',
  },
  {
    q: 'cosa succede dopo il lancio?',
    a: 'il lancio è l’inizio. offriamo manutenzione, monitoraggio e ottimizzazione continua: misuriamo i risultati e facciamo evolvere il progetto al tuo fianco.',
  },
  {
    q: 'posso scegliere un solo servizio?',
    a: 'assolutamente. web, AI e dati funzionano benissimo anche separati. spesso però si rinforzano a vicenda — e averli da un unico interlocutore semplifica tutto.',
  },
]

function FaqItem({ item, open, onToggle, index }) {
  return (
    <div className={`sv-faq-item${open ? ' sv-faq-item--open' : ''}`}>
      <button
        type="button"
        className="sv-faq-q"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-a-${index}`}
      >
        <span>{item.q}</span>
        <span className="sv-faq-icon" aria-hidden="true" />
      </button>
      <div id={`faq-a-${index}`} className="sv-faq-a-wrap" role="region">
        <p className="sv-faq-a">{item.a}</p>
      </div>
    </div>
  )
}

export default function Servizi() {
  const heroRef   = useRef(null)
  const panelRefs = useRef([])
  const processRef = useRef(null)
  const faqRef     = useRef(null)
  const [openFaq, setOpenFaq] = useState(0)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) return

      /* Hero entrance */
      const eyebrow = heroRef.current.querySelector('.sv-hero-eyebrow')
      const lines   = heroRef.current.querySelectorAll('.sv-hero-line')
      const body    = heroRef.current.querySelector('.sv-hero-body')
      const index   = heroRef.current.querySelector('.sv-hero-index')
      const bgNum   = heroRef.current.querySelector('.sv-hero-bg-num')

      gsap.set([eyebrow, ...lines, body, index], { opacity: 0, y: 30 })
      gsap.set(bgNum, { opacity: 0 })

      gsap.timeline({ delay: 0.1 })
        .to(bgNum,   { opacity: 1, duration: 1.4, ease: 'power2.out' })
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, 0.2)
        .to(lines,   { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.1 }, 0.35)
        .to(body,    { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, 0.6)
        .to(index,   { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, 0.72)

      /* Service panel entrances */
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return

        const bgN    = panel.querySelector('.sv-service-bg-num')
        const ew     = panel.querySelector('.sv-service-eyebrow')
        const title  = panel.querySelector('.sv-service-title')
        const pbody  = panel.querySelector('.sv-service-body')
        const tags   = panel.querySelector('.sv-service-tags')
        const visual = panel.querySelector('.sv-service-visual')
        const isAlt  = i % 2 === 1

        gsap.set([ew, title, pbody, tags], { opacity: 0, y: 24 })
        gsap.set(visual, { opacity: 0, x: isAlt ? -36 : 36 })
        gsap.set(bgN, { opacity: 0 })

        const tl = gsap.timeline({
          scrollTrigger: { trigger: panel, start: 'top 65%', once: true },
        })

        tl.to(bgN,    { opacity: 1, duration: 1.2, ease: 'power2.out' })
          .to(ew,     { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 0.12)
          .to(title,  { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 0.22)
          .to(pbody,  { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, 0.36)
          .to(tags,   { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 0.46)
          .to(visual, { opacity: 1, x: 0, duration: 0.9, ease: 'expo.out' }, 0.18)

        /* Deliverables list */
        const deliv = panel.querySelectorAll('.sv-deliv-item')
        if (deliv.length) {
          gsap.set(deliv, { opacity: 0, x: -16 })
          tl.to(deliv, { opacity: 1, x: 0, duration: 0.5, ease: 'expo.out', stagger: 0.06 }, 0.5)
        }

        /* Chart bars animation for data section */
        const bars = panel.querySelectorAll('.sv-chart-bar')
        if (bars.length) {
          gsap.set(bars, { scaleY: 0, transformOrigin: 'bottom center' })
          tl.to(bars, {
            scaleY: 1, duration: 0.75, ease: 'expo.out', stagger: 0.065,
          }, 0.5)
        }
      })

      /* ── Process band ── */
      const pHeader = processRef.current.querySelector('.sv-process-header')
      const pSteps  = gsap.utils.toArray('.sv-process-step', processRef.current)
      const pLine   = processRef.current.querySelector('.sv-process-line-fill')

      gsap.set(pHeader, { opacity: 0, y: 22 })
      gsap.set(pSteps, { opacity: 0, y: 32 })
      gsap.set(pLine, { scaleX: 0, transformOrigin: 'left center' })

      gsap.to(pHeader, {
        opacity: 1, y: 0, duration: 0.6, ease: 'expo.out',
        scrollTrigger: { trigger: processRef.current, start: 'top 78%', once: true },
      })
      gsap.to(pSteps, {
        opacity: 1, y: 0, duration: 0.65, ease: 'expo.out', stagger: 0.12,
        scrollTrigger: { trigger: '.sv-process-grid', start: 'top 82%', once: true },
      })
      gsap.to(pLine, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: '.sv-process-grid', start: 'top 80%', end: 'bottom 70%', scrub: true },
      })

      /* ── FAQ ── */
      const fHeader = faqRef.current.querySelector('.sv-faq-header')
      const fItems  = gsap.utils.toArray('.sv-faq-item', faqRef.current)
      gsap.set(fHeader, { opacity: 0, y: 22 })
      gsap.set(fItems, { opacity: 0, y: 24 })

      gsap.timeline({
        scrollTrigger: { trigger: faqRef.current, start: 'top 76%', once: true },
      })
        .to(fHeader, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' })
        .to(fItems, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.08 }, '-=0.3')
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="sv-main">

      {/* ── Hero ── */}
      <section ref={heroRef} className="sv-hero">
        <div className="sv-hero-bg-num" aria-hidden="true">03</div>

        <div className="sv-hero-inner">
          <span className="sv-hero-eyebrow">// servizi</span>
          <h1 className="sv-hero-headline">
            <span className="sv-hero-line">costruiamo</span>
            <span className="sv-hero-line">digitale<span className="h-dot">.</span></span>
          </h1>
          <p className="sv-hero-body">tre discipline. un solo interlocutore.</p>
        </div>

        <nav className="sv-hero-index" aria-label="Servizi">
          {SERVICES.map(s => (
            <a key={s.id} href={`#${s.id}`} className="sv-hero-idx-item">
              <span className="sv-hero-idx-num">{s.num}</span>
              <span className="sv-hero-idx-name">{s.title}</span>
              <span className="sv-hero-idx-arrow">→</span>
            </a>
          ))}
        </nav>
      </section>

      {/* ── Service panels ── */}
      {SERVICES.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          ref={el => { panelRefs.current[i] = el }}
          className={`sv-service${i % 2 === 1 ? ' sv-service--alt' : ''}`}
        >
          <span className="sv-service-bg-num" aria-hidden="true">{s.num}</span>

          <div className="sv-service-inner">
            <div className="sv-service-content">
              <span className="sv-service-eyebrow">// {s.num}</span>
              <h2 className="sv-service-title">{s.title}<span className="h-dot">.</span></h2>
              <p className="sv-service-body">{s.body}</p>
              <div className="sv-service-tags">
                {s.tags.map(tag => (
                  <span key={tag} className="sv-service-tag">{tag}</span>
                ))}
              </div>

              <ul className="sv-deliv">
                {s.deliverables.map(d => (
                  <li key={d} className="sv-deliv-item">
                    <span className="sv-deliv-arrow" aria-hidden="true">→</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sv-service-visual">
              <s.Visual />
            </div>
          </div>
        </section>
      ))}

      {/* ── Come iniziamo (process) ── */}
      <section ref={processRef} className="sv-process">
        <div className="sv-process-inner">
          <div className="sv-process-header">
            <span className="sv-process-eyebrow">// come iniziamo</span>
            <h2 className="sv-process-headline">
              dal primo messaggio al lancio<span className="h-dot">.</span>
            </h2>
          </div>
          <div className="sv-process-grid">
            <div className="sv-process-line" aria-hidden="true">
              <div className="sv-process-line-fill" />
            </div>
            {PROCESS.map(p => (
              <div key={p.num} className="sv-process-step">
                <span className="sv-process-num">{p.num}</span>
                <h3 className="sv-process-label">{p.label}<span className="h-dot">.</span></h3>
                <p className="sv-process-text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef} className="sv-faq">
        <div className="sv-faq-inner">
          <div className="sv-faq-header">
            <span className="sv-faq-eyebrow">// domande frequenti</span>
            <h2 className="sv-faq-headline">
              le risposte che cerchi<span className="h-dot">.</span>
            </h2>
          </div>
          <div className="sv-faq-list">
            {FAQ.map((item, i) => (
              <FaqItem
                key={i}
                index={i}
                item={item}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sv-cta">
        <div className="sv-cta-inner">
          <span className="sv-cta-eyebrow">// prossimo passo</span>
          <h2 className="sv-cta-headline">
            hai un progetto<span className="h-dot">?</span>
          </h2>
          <p className="sv-cta-body">
            raccontaci cosa vuoi costruire. rispondiamo entro 24 ore.
          </p>
          <Link to="/contattaci" className="sv-cta-btn">parliamone</Link>
        </div>
      </section>

      <HomeFooter />
    </main>
  )
}
