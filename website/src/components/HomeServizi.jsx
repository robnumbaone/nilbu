import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function BrowserMockup() {
  return (
    <svg viewBox="0 0 460 180" className="tile-viz" style={{ width: '60%', maxWidth: 460 }} aria-hidden="true">
      <defs>
        <linearGradient id="bm-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="var(--viz-fade-0)" />
          <stop offset="50%"  stopColor="var(--viz-fade-1)" />
          <stop offset="100%" stopColor="var(--viz-fade-2)" />
        </linearGradient>
      </defs>
      <g transform="translate(40,18)">
        <rect x="0" y="0" width="420" height="160" rx="10" fill="var(--viz-surface)" stroke="var(--viz-line)"/>
        <circle cx="14" cy="14" r="3" fill="var(--viz-dot)"/>
        <circle cx="26" cy="14" r="3" fill="var(--viz-dot)"/>
        <circle cx="38" cy="14" r="3" fill="var(--viz-dot)"/>
        <rect x="60" y="9" width="340" height="10" rx="3" fill="var(--viz-surface-2)"/>
        <rect x="14" y="40" width="50"  height="6"  rx="2" fill="#2D5BFF"/>
        <rect x="14" y="56" width="280" height="14" rx="2" fill="var(--viz-text)"/>
        <rect x="14" y="76" width="220" height="14" rx="2" fill="var(--viz-text)" opacity="0.85"/>
        <rect x="14" y="98"  width="160" height="6" rx="2" fill="var(--viz-mute)"/>
        <rect x="14" y="110" width="200" height="6" rx="2" fill="var(--viz-mute)" opacity="0.6"/>
        <rect x="14"  y="128" width="74" height="20" rx="6" fill="#2D5BFF"/>
        <rect x="96"  y="128" width="62" height="20" rx="6" fill="none" stroke="var(--viz-dot)"/>
        <rect x="0" y="0" width="420" height="160" fill="url(#bm-fade)" rx="10"/>
      </g>
    </svg>
  )
}

function NetworkMockup() {
  return (
    <svg viewBox="0 0 240 200" className="tile-viz" style={{ width: '85%', right: '7.5%' }} aria-hidden="true">
      <defs>
        <linearGradient id="ng-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(45,91,255,0.6)"/>
          <stop offset="100%" stopColor="rgba(45,91,255,0.1)"/>
        </linearGradient>
      </defs>
      <g stroke="url(#ng-stroke)" strokeWidth="1" fill="none">
        <line x1="40"  y1="40"  x2="120" y2="100"/>
        <line x1="200" y1="40"  x2="120" y2="100"/>
        <line x1="40"  y1="160" x2="120" y2="100"/>
        <line x1="200" y1="160" x2="120" y2="100"/>
        <line x1="40"  y1="40"  x2="200" y2="40"/>
        <line x1="40"  y1="160" x2="200" y2="160"/>
        <line x1="120" y1="100" x2="120" y2="30"/>
        <line x1="120" y1="100" x2="120" y2="180"/>
      </g>
      <g>
        <circle cx="40"  cy="40"  r="6" fill="var(--viz-node)"/>
        <circle cx="200" cy="40"  r="6" fill="var(--viz-node)"/>
        <circle cx="40"  cy="160" r="6" fill="var(--viz-node)"/>
        <circle cx="200" cy="160" r="6" fill="var(--viz-node)"/>
        <circle cx="120" cy="30"  r="4" fill="#6A8BFF"/>
        <circle cx="120" cy="180" r="4" fill="#6A8BFF"/>
        <circle cx="120" cy="100" r="10" fill="#2D5BFF">
          <animate attributeName="r" values="10;13;10" dur="3.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="120" cy="100" r="18" fill="none" stroke="#2D5BFF" strokeWidth="1" opacity="0.4">
          <animate attributeName="r"       values="14;26;14" dur="3.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0;0.5" dur="3.5s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
  )
}

function DashboardMockup() {
  return (
    <svg viewBox="0 0 460 160" className="tile-viz" style={{ width: '70%' }} aria-hidden="true">
      <defs>
        <linearGradient id="dm-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(45,91,255,0.4)"/>
          <stop offset="100%" stopColor="rgba(45,91,255,0)"/>
        </linearGradient>
        <linearGradient id="dm-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="var(--viz-fade-0)" />
          <stop offset="100%" stopColor="var(--viz-fade-3)" />
        </linearGradient>
      </defs>
      <g transform="translate(20,10)">
        <rect x="0"   y="0" width="100" height="40" rx="6" fill="var(--viz-surface)" stroke="var(--viz-line)"/>
        <text x="10"  y="16" fontFamily="JetBrains Mono" fontSize="7" fill="var(--viz-mute)" letterSpacing="1">MRR</text>
        <text x="10"  y="32" fontFamily="Inter Tight" fontWeight="800" fontSize="14" fill="var(--viz-text)">€42.8k</text>
        <text x="58"  y="32" fontFamily="JetBrains Mono" fontSize="7" fill="#3DDC97">+12%</text>
        <rect x="110" y="0" width="100" height="40" rx="6" fill="var(--viz-surface)" stroke="var(--viz-line)"/>
        <text x="120" y="16" fontFamily="JetBrains Mono" fontSize="7" fill="var(--viz-mute)" letterSpacing="1">CONV</text>
        <text x="120" y="32" fontFamily="Inter Tight" fontWeight="800" fontSize="14" fill="var(--viz-text)">3.8%</text>
        <text x="168" y="32" fontFamily="JetBrains Mono" fontSize="7" fill="#3DDC97">+0.4</text>
        <rect x="220" y="0" width="100" height="40" rx="6" fill="var(--viz-surface)" stroke="var(--viz-line)"/>
        <text x="230" y="16" fontFamily="JetBrains Mono" fontSize="7" fill="var(--viz-mute)" letterSpacing="1">LCP</text>
        <text x="230" y="32" fontFamily="Inter Tight" fontWeight="800" fontSize="14" fill="var(--viz-text)">0.3s</text>
        <text x="278" y="32" fontFamily="JetBrains Mono" fontSize="7" fill="#3DDC97">good</text>
        <g transform="translate(0,52)">
          <path d="M0 60 L40 50 L80 55 L120 38 L160 30 L200 22 L240 28 L280 18 L320 10 L320 70 L0 70 Z" fill="url(#dm-area)"/>
          <path d="M0 60 L40 50 L80 55 L120 38 L160 30 L200 22 L240 28 L280 18 L320 10" stroke="#2D5BFF" strokeWidth="1.5" fill="none"/>
          <circle cx="320" cy="10" r="3" fill="#2D5BFF"/>
        </g>
        <rect x="0" y="0" width="320" height="160" fill="url(#dm-fade)"/>
      </g>
    </svg>
  )
}

export default function HomeServizi() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const header = sectionRef.current.querySelector('.bento-header')
      const tiles  = gsap.utils.toArray('.bento-tile', sectionRef.current)

      gsap.set([header, ...tiles], { opacity: 0, y: 36 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      })
        .to(header, { opacity: 1, y: 0, duration: 0.65, ease: 'expo.out' })
        .to(tiles,  { opacity: 1, y: 0, duration: 0.75, ease: 'expo.out', stagger: 0.07 }, '-=0.35')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bento-section" id="servizi">
      <div className="bento-inner">
        <header className="bento-header section-header">
          <span className="section-eyebrow">// servizi</span>
          <h2 className="section-title">tre aree, un metodo<span className="h-dot">.</span></h2>
          <p className="section-lede">
            siti che convertono. sistemi AI che riducono il lavoro ripetitivo.
            dati che parlano la lingua del business<span className="h-dot">.</span>
          </p>
        </header>

        <div className="bento">
          <article className="bento-tile tile t-web" data-dev="[bento · web]">
            <div className="tile-eyebrow">01 / siti web</div>
            <h3 className="tile-title">siti su misura<span className="h-dot">.</span></h3>
            <p className="tile-body">
              design + sviluppo. responsive, accessibili, SEO-ready. nessun template,
              nessun page builder. consegniamo siti che caricano in meno di un secondo<span className="h-dot">.</span>
            </p>
            <div className="tile-tags">
              <span className="tile-tag">design</span>
              <span className="tile-tag">react · vite</span>
              <span className="tile-tag">cms headless</span>
              <span className="tile-tag">seo tecnica</span>
              <span className="tile-tag">a11y</span>
            </div>
            <div className="tile-spacer" />
            <BrowserMockup />
          </article>

          <article className="bento-tile tile t-ai" data-dev="[bento · ai]">
            <div className="tile-eyebrow">02 / ai</div>
            <h3 className="tile-title">sistemi AI<span className="h-dot">.</span></h3>
            <p className="tile-body">
              chatbot, agenti, automazioni. integrati nei tuoi flussi reali —
              non demo da fiera<span className="h-dot">.</span>
            </p>
            <div className="tile-tags">
              <span className="tile-tag">LLM</span>
              <span className="tile-tag">agents</span>
              <span className="tile-tag">RAG</span>
              <span className="tile-tag">automazione</span>
            </div>
            <div className="tile-spacer" />
            <NetworkMockup />
          </article>

          <article className="bento-tile tile t-dati" data-dev="[bento · dati]">
            <div className="tile-eyebrow">03 / dati</div>
            <h3 className="tile-title">analisi dei dati<span className="h-dot">.</span></h3>
            <p className="tile-body">
              dashboard, pipeline, BI. numeri leggibili, decisioni veloci<span className="h-dot">.</span>
            </p>
            <div className="tile-tags">
              <span className="tile-tag">dashboard</span>
              <span className="tile-tag">ETL</span>
              <span className="tile-tag">BI</span>
              <span className="tile-tag">viz</span>
            </div>
            <div className="tile-spacer" />
            <DashboardMockup />
          </article>

          <aside className="bento-tile tile t-quote quote-tile" data-dev="[quote]">
            <div className="q-mark">"</div>
            <p className="q-text">
              non un'agenzia<span className="h-dot">.</span> un partner operativo<span className="h-dot">.</span>
            </p>
            <div className="q-attr">— il manifesto nilbu</div>
          </aside>

          <div className="bento-tile tile t-stat" data-dev="[stat]">
            <div className="stat-num">04<span className="stat-unit">sett.</span></div>
            <div className="stat-label">tempo medio<br/>go-live</div>
          </div>
          <div className="bento-tile tile t-stat" data-dev="[stat]">
            <div className="stat-num">99<span className="stat-unit">/100</span></div>
            <div className="stat-label">lighthouse<br/>performance</div>
          </div>
          <div className="bento-tile tile t-stat" data-dev="[stat]">
            <div className="stat-num">24<span className="stat-unit">h</span></div>
            <div className="stat-label">risposta media<br/>email</div>
          </div>
          <div className="bento-tile tile t-stat" data-dev="[stat]">
            <div className="stat-num">01<span className="stat-unit">team</span></div>
            <div className="stat-label">interlocutore<br/>unico</div>
          </div>
        </div>
      </div>
    </section>
  )
}
