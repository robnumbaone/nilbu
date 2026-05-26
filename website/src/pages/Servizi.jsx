import { useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
    Visual: VisualWeb,
  },
  {
    num: '02',
    id: 'ai',
    title: 'intelligenza artificiale',
    body: 'Chatbot, automazioni, agenti AI. Integriamo modelli linguistici e sistemi di machine learning direttamente nei tuoi flussi di lavoro.',
    tags: ['LLM', 'Agents', 'Automazione', 'Integrazione'],
    Visual: VisualAI,
  },
  {
    num: '03',
    id: 'data',
    title: 'analisi dei dati',
    body: 'Trasformiamo dati grezzi in visualizzazioni chiare e decisioni informate. Dashboard su misura, pipeline dati e business intelligence.',
    tags: ['Dashboard', 'Pipeline', 'BI', 'Visualizzazioni'],
    Visual: VisualData,
  },
]

export default function Servizi() {
  const heroRef  = useRef(null)
  const panelRefs = useRef([])

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

        /* Chart bars animation for data section */
        const bars = panel.querySelectorAll('.sv-chart-bar')
        if (bars.length) {
          gsap.set(bars, { scaleY: 0, transformOrigin: 'bottom center' })
          tl.to(bars, {
            scaleY: 1, duration: 0.75, ease: 'expo.out', stagger: 0.065,
          }, 0.5)
        }
      })
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
            </div>

            <div className="sv-service-visual">
              <s.Visual />
            </div>
          </div>
        </section>
      ))}

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

    </main>
  )
}
