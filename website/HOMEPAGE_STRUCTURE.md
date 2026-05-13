# NILBU — Homepage Structure

> Documento di handoff per Cloud Design.
> Generato il 2026-05-13. Non modificare il design prima della review.

---

## Mappa delle sezioni (ordine di rendering)

| # | Componente | CSS prefix | Tipo | Altezza |
|---|---|---|---|---|
| 0 | `Navbar` | `.nav-*` | Global overlay, fixed | auto |
| 1 | `HomeAmbient` | `.bg-*` | Background layer, position:absolute | full page |
| 2 | **Hero** (inline in Home.jsx) | `.h-*` | Full-screen hero | 100vh |
| 3 | `HomeIntro` | `.hi-*` | 2-column content | auto |
| 4 | `HomePerChi` | `.hpc-*` | Sticky header + list | auto |
| 5 | `HomeDifferenze` | `.hd-*` | 2×2 card grid | auto |
| 6 | `HomeApproccio` | `.ha-*` | Sticky scroll (pinned) | 450vh |
| 7 | `HomeCtaFinale` | `.hcf-*` | Centered CTA | auto |
| 8 | `HomeFooter` | `.hf-*` | 3-column footer | auto |

---

## Struttura gerarchica completa

```
<App>
  <ThemeProvider>                        ← dark/light context
    <BrowserRouter>
      <Cursor />                         ← custom cursor (global)
      <Navbar />                         ← logo + menu island
      <Routes>
        <Route path="/">
          <Home>                         ← pages/Home.jsx
            <main class="home-main">
              │
              ├── <HomeAmbient />        ── background system
              │     ├── bg-blob ×3       ── large gradient blobs (scroll-driven)
              │     ├── bg-orb ×2        ── small ambient orbs (random drift)
              │     ├── bg-ilight        ── mouse-following radial glow (fixed)
              │     └── bg-canvas        ── floating data-field dots (fixed)
              │
              ├── <section.h-hero>       ── SEZIONE 1: HERO
              │     ├── <HeroSmoke />    ── 5 animated gradient blobs (yoyo)
              │     ├── <HeroParticles />── mouse-reactive canvas particles
              │     └── .h-hero-inner
              │           ├── .h-eyebrow      "consulenza · ai · web · dati"
              │           ├── h1.h-headline   "il partner tech per chi cresce."
              │           ├── p.h-sub         sottotitolo 2 righe
              │           ├── .h-actions
              │           │     ├── Link "Iniziamo"     → /contattaci
              │           │     └── Link "I servizi"    → /servizi
              │           └── .h-scroll-indicator      linea pulsante
              │
              ├── <HomeIntro />          ── SEZIONE 2: PARTNER INTRO
              │     ├── .hi-divider      ── linea orizzontale accent
              │     └── .hi-inner (grid 1fr 1fr)
              │           ├── .hi-col-left
              │           │     ├── .hi-eyebrow    "// partner"
              │           │     ├── h2.hi-headline "non un'agenzia. un partner operativo."
              │           │     └── p.hi-body      paragrafo posizionamento
              │           └── .hi-col-right
              │                 └── ul.hi-points (3 bullet points)
              │                       └── li.hi-point ×3
              │
              ├── <HomePerChi />         ── SEZIONE 3: PER CHI È
              │     └── .hpc-inner (grid 340px 1fr)
              │           ├── .hpc-header (sticky top:120px)
              │           │     ├── .hpc-eyebrow   "// per chi è"
              │           │     ├── h2.hpc-headline
              │           │     └── p.hpc-lead
              │           └── ul.hpc-list
              │                 └── li.hpc-item ×6
              │                       ├── .hpc-item-num   "01"–"06"
              │                       ├── .hpc-item-text  frase
              │                       └── .hpc-item-accent ── linea hover
              │
              ├── <HomeDifferenze />     ── SEZIONE 4: DIFFERENZIATORI
              │     └── .hd-inner
              │           ├── .hd-header
              │           │     ├── .hd-eyebrow    "// differenza"
              │           │     └── h2.hd-headline "quello che ci distingue."
              │           └── .hd-grid (2×2)
              │                 └── .hd-card ×4
              │                       ├── .hd-card-num   "01"–"04"
              │                       ├── h3.hd-card-title
              │                       └── p.hd-card-body
              │
              ├── <HomeApproccio />      ── SEZIONE 5: PROCESSO (450vh scroll)
              │     └── .ha-section (height: 450vh)
              │           └── .ha-stage (sticky, 100vh)
              │                 └── .ha-stage-inner
              │                       ├── .ha-header
              │                       │     ├── .ha-eyebrow    "// approccio"
              │                       │     └── h2.ha-headline "come lavoriamo."
              │                       └── .ha-cards
              │                             └── .ha-card ×4 (sequenza GSAP scrub)
              │                                   ├── .ha-card-num   "01"–"04"
              │                                   └── .ha-card-body
              │                                         ├── h3.ha-card-label
              │                                         └── p.ha-card-desc
              │
              ├── <HomeCtaFinale />      ── SEZIONE 6: CTA FINALE
              │     └── .hcf-inner
              │           ├── h2.hcf-headline "hai un progetto da realizzare?"
              │           ├── p.hcf-body
              │           ├── .hcf-actions
              │           │     └── Link.hcf-btn "parliamo" → /contattaci
              │           └── p.hcf-micro "risposta entro 24 ore."
              │
              └── <HomeFooter />         ── SEZIONE 7: FOOTER
                    ├── .hf-top-line    ── separatore
                    ├── .hf-inner (grid 1.4fr 1fr 1fr)
                    │     ├── .hf-brand
                    │     │     ├── .hf-logo     "nilbu."
                    │     │     ├── p.hf-tagline
                    │     │     └── p.hf-desc
                    │     ├── nav.hf-nav
                    │     │     └── Link ×4 (home/chi siamo/servizi/contattaci)
                    │     └── .hf-contact
                    │           └── a.hf-email
                    └── .hf-bottom
                          ├── .hf-copy   "© 2025 nilbu"
                          └── Link.hf-legal "privacy policy"
```

---

## Copy attuale per sezione

### Hero
- Eyebrow: `consulenza · ai · web · dati`
- H1: `il partner tech per chi cresce.`
- Sub: `siti che funzionano, automazioni che ottimizzano, risultati che si vedono.`
- CTA primaria: `Iniziamo`
- CTA ghost: `I servizi`

### HomeIntro
- Eyebrow: `// partner`
- H2: `non un'agenzia. un partner operativo.`
- Corpo: paragrafo 4 righe
- Bullets (3): interlocutore unico · metodo/consegne · supporto post-lancio

### HomePerChi
- Eyebrow: `// per chi è`
- H2: `costruiamo per chi ha obiettivi chiari e standard alti.`
- Lead: `nilbu è il partner giusto se:`
- Items (6): sito non aggiornato · crescita · automazione · deluso da agenzie · qualità senza 3 fornitori · trasparenza

### HomeDifferenze
- Eyebrow: `// differenza`
- H2: `quello che ci distingue.`
- Card 01: `strategia e tecnica insieme`
- Card 02: `un interlocutore, non un team disperso`
- Card 03: `metodo, non improvvisazione`
- Card 04: `continuità, non solo consegna`

### HomeApproccio
- Eyebrow: `// approccio`
- H2: `come lavoriamo.`
- Step 01: `brief`
- Step 02: `design`
- Step 03: `sviluppo`
- Step 04: `lancio e supporto`

### HomeCtaFinale
- H2: `hai un progetto da realizzare?`
- Corpo: 2 righe
- CTA: `parliamo`
- Micro: `risposta entro 24 ore.`

### HomeFooter
- Tagline: `il partner tech per chi cresce.`
- Desc: 2 righe
- Email: `info@nilbu.com`
- Copyright: `© 2025 nilbu` ← **BUG: anno sbagliato (2026)**
