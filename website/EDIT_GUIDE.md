# NILBU — Edit Guide

> Per ogni sezione: quali file toccare, cosa modificare, cosa non rompere.

---

## Regola generale

Ogni sezione ha **3 punti di intervento**:
1. **Copy/struttura** → file `.jsx` del componente
2. **Visual/layout** → `styles/home.css` (prefisso CSS della sezione)
3. **Animazioni** → `useLayoutEffect` dentro il componente (o file in `animations/`)

---

## NAVBAR

**File:** `src/components/Navbar.jsx` · `src/styles/navbar.css`

| Cosa modificare | Dove |
|---|---|
| Link di navigazione | `Navbar.jsx` riga 32–37, array `links` |
| Logo | `components/Logo.jsx` |
| Comportamento scroll | `Navbar.jsx` riga 59, threshold `> 80` |
| Stile island/panel | `navbar.css` |
| Animazione apertura menu | `Navbar.jsx` riga 65–93 (GSAP timeline `tlRef`) |
| Entry animation | `Navbar.jsx` riga 48–55 |

**Non toccare:** il meccanismo `openRef` + `tlRef` — gestisce il reverse dell'animazione.

---

## SEZIONE 1 — HERO

**File principale:** `src/pages/Home.jsx` (righe 24–108)
**Stili:** `src/styles/home.css` → prefisso `.h-`

| Cosa modificare | File | Dettaglio |
|---|---|---|
| Copy eyebrow | `Home.jsx:88` | `consulenza · ai · web · dati` |
| Copy headline H1 | `Home.jsx:90-92` | Inter Tight 800, SplitText animato |
| Copy sottotitolo | `Home.jsx:94-97` | `.h-sub` |
| Testo bottone primario | `Home.jsx:100` | "Iniziamo" |
| Link bottone primario | `Home.jsx:100` | `to="/contattaci"` |
| Testo bottone ghost | `Home.jsx:101` | "I servizi" |
| Stile bottone primario | `home.css:198` | `.h-btn-primary` |
| Stile bottone ghost | `home.css:227` | `.h-btn-ghost` |
| Dimensione headline | `home.css:165` | `clamp(48px, 6.2vw, 88px)` |
| Altezza hero | `home.css:61` | `height: 100vh; min-height: 700px` |
| Animazione entry | `Home.jsx:24-78` | GSAP timeline, durate in secondi |
| Scroll indicator | `Home.jsx:105-107` + `home.css:252` | `.h-scroll-indicator`, `.h-scroll-line` |

**Background smoke (HeroSmoke):**

| Cosa modificare | File | Dettaglio |
|---|---|---|
| Numero/dimensione blobs | `HeroSmoke.jsx:4-45` | Array `BLOBS` — ogni oggetto è un blob |
| Colori blob | `HeroSmoke.jsx` | `bg` in ogni oggetto blob |
| Velocità animazione | `HeroSmoke.jsx` | `dur` in ogni oggetto (secondi) |
| Background smoke wrapper | `home.css:68` | `.hs-root` e `.hs-blob` |

**Particelle mouse:**

| Cosa modificare | File |
|---|---|
| Colore particelle | `HeroParticles.jsx:12` — prop `particleColor` (default `#2D5BFF`) |
| Densità emissione | `HeroParticles.jsx:15` — prop `emissionDensity` (default `8`) |
| Dimensione particelle | `HeroParticles.jsx:13` — prop `particleSize` (default `3`) |
| Intensità glow | `HeroParticles.jsx:14` — prop `glowIntensity` (default `22`) |

**ATTENZIONE:** L'`h1` ha `aria-hidden="true"` + `style={{ opacity: 0 }}` inizialmente — necessario per GSAP SplitText. Non rimuovere, viene ripristinato in `onComplete`.

---

## SEZIONE 2 — HOMEINTRO

**File:** `src/components/HomeIntro.jsx`
**Stili:** `home.css` → prefisso `.hi-`

| Cosa modificare | File | Dettaglio |
|---|---|---|
| Tutti i bullet points | `HomeIntro.jsx:7-11` | Array `POINTS` — 3 stringhe |
| Copy eyebrow | `HomeIntro.jsx:57` | `// partner` |
| Copy headline | `HomeIntro.jsx:58-61` | H2 con `<br />` |
| Copy corpo | `HomeIntro.jsx:63-66` | Paragrafo |
| Layout griglia | `home.css:453` | `.hi-inner { grid-template-columns: 1fr 1fr }` |
| Gap colonne | `home.css:457` | `gap: 80px` |
| Padding sezione | `home.css:424` | `.hi-section { padding: 0 0 120px }` |
| Stile divider accent | `home.css:437` | `.hi-divider` |
| Animazione entry | `HomeIntro.jsx:16-50` | GSAP timeline, `start: 'top 78%'` |

**Responsive:** a ≤860px la griglia passa a 1 colonna (`home.css:1092`).

---

## SEZIONE 3 — HOMEPERCHI

**File:** `src/components/HomePerChi.jsx`
**Stili:** `home.css` → prefisso `.hpc-`

| Cosa modificare | File | Dettaglio |
|---|---|---|
| Items della lista | `HomePerChi.jsx:7-14` | Array `ITEMS` — 6 stringhe |
| Copy eyebrow | `HomePerChi.jsx:69` | `// per chi è` |
| Copy headline | `HomePerChi.jsx:70-72` | H2 |
| Copy lead | `HomePerChi.jsx:73` | `nilbu è il partner giusto se:` |
| Layout griglia | `home.css:553` | `grid-template-columns: 340px 1fr` |
| Sticky offset header | `home.css:563` | `.hpc-header { top: 120px }` |
| Padding sezione | `home.css:527` | `padding: 120px 0` |
| Hover item accent | `home.css:646` | `.hpc-item-accent` (linea blu bottom) |
| Animazione items | `HomePerChi.jsx:34-46` | slide in da x: -12 |
| Animazione hover accent | `HomePerChi.jsx:48-58` | GSAP `scaleX` mouseenter/leave |

**Responsive:** a ≤860px header non è più sticky (`home.css:1105`).

---

## SEZIONE 4 — HOMEDIFFERENZE

**File:** `src/components/HomeDifferenze.jsx`
**Stili:** `home.css` → prefisso `.hd-`

| Cosa modificare | File | Dettaglio |
|---|---|---|
| Contenuto cards | `HomeDifferenze.jsx:7-28` | Array `CARDS` — `num`, `title`, `body` |
| Copy eyebrow | `HomeDifferenze.jsx:84` | `// differenza` |
| Copy headline | `HomeDifferenze.jsx:85` | H2 |
| Layout griglia | `home.css:713` | `grid-template-columns: repeat(2, 1fr)` |
| Stile card | `home.css:729` | `.hd-card` |
| Hover card | `home.css:774` | `.hd-card:hover` |
| Effetto focus gruppo | `home.css:722` | `.hd-grid--focused .hd-card:not(:hover)` |
| Numero ghost decorativo | `home.css:757` | `.hd-card::after` — 100px mono |
| Animazione card tilt 3D | `animations/interactions.js:4` | `initCardTilt` — rotateX/Y |
| Animazione parallax header | `HomeDifferenze.jsx:62-71` | `yPercent: -10` scrub |
| Animazione entry | `HomeDifferenze.jsx:46-60` | entry alternato sx/dx |

**Responsive:** a ≤720px griglia passa a 1 colonna (`home.css:1119`).

---

## SEZIONE 5 — HOMEAPPROCCIO

**File:** `src/components/HomeApproccio.jsx`
**Stili:** `home.css` → prefisso `.ha-`

| Cosa modificare | File | Dettaglio |
|---|---|---|
| Steps (4 cards) | `HomeApproccio.jsx:7-12` | Array `STEPS` — `id`, `num`, `label`, `desc` |
| Copy eyebrow | `HomeApproccio.jsx:77` | `// approccio` |
| Copy headline | `HomeApproccio.jsx:78` | H2 |
| Altezza sezione (scroll depth) | `home.css:273` | `height: 450vh` |
| Sfondo stage | `home.css:288` | `.ha-stage { background: rgba(0,0,0,0.78) }` |
| Griglia trama | `home.css:289` | `.ha-stage::before` — linee 72px |
| Altezza card mobile | `home.css:1062` | `height: 180px` — potrebbe essere troppo piccolo |
| Velocità scrub | `HomeApproccio.jsx:35` | `scrub: 1` |
| Durata transizione card | `HomeApproccio.jsx:57-58` | `duration: 0.5` (mobile), `duration: 1` (desktop) |

**ATTENZIONE MOBILE:** a ≤768px le card diventano `position:absolute` sovrapposte in 180px. Se le descrizioni sono lunghe, il testo può traboccare.

---

## SEZIONE 6 — HOMECTAFINALE

**File:** `src/components/HomeCtaFinale.jsx`
**Stili:** `home.css` → prefisso `.hcf-`

| Cosa modificare | File | Dettaglio |
|---|---|---|
| Copy headline | `HomeCtaFinale.jsx:54-56` | H2, SplitText per parole |
| Copy corpo | `HomeCtaFinale.jsx:57-60` | Paragrafo 2 righe |
| Testo CTA button | `HomeCtaFinale.jsx:62` | "parliamo" |
| Link CTA | `HomeCtaFinale.jsx:62` | `to="/contattaci"` |
| Micro copy | `HomeCtaFinale.jsx:64` | "risposta entro 24 ore." |
| Dimensione headline | `home.css:847` | `clamp(44px, 5.5vw, 80px)` |
| Glow pulse bottone | `home.css:894` | `cta-glow-pulse 3s` |
| Background dot pattern | `home.css:826` | `.hcf-section::before` |
| Padding sezione | `home.css:814` | `padding: 140px 0` |
| Animazione entry | `HomeCtaFinale.jsx:13-46` | SplitText words + stagger |

**ATTENZIONE:** come il Hero, il H2 ha `style={{ opacity: 0 }}` per GSAP SplitText. Non rimuovere.

---

## SEZIONE 7 — HOMEFOOTER

**File:** `src/components/HomeFooter.jsx`
**Stili:** `home.css` → prefisso `.hf-`

| Cosa modificare | File | Dettaglio |
|---|---|---|
| Link navigazione | `HomeFooter.jsx:8-13` | Array `NAV_LINKS` |
| Tagline | `HomeFooter.jsx:53` | "il partner tech per chi cresce." |
| Descrizione brand | `HomeFooter.jsx:54-57` | 2 righe |
| Email contatto | `HomeFooter.jsx:69` | `info@nilbu.com` |
| Copyright anno | `HomeFooter.jsx:73` | **BUG: cambiare `2025` → `2026`** |
| Link privacy | `HomeFooter.jsx:75` | `to="/privacy"` — route non esiste |
| Layout 3 colonne | `home.css:936` | `grid-template-columns: 1.4fr 1fr 1fr` |
| Animazione entry | `HomeFooter.jsx:18-43` | cols stagger, poi bottom |

**Responsive:** a ≤860px → 2 colonne (brand full-width); a ≤560px → 1 colonna.

---

## SISTEMA BACKGROUND

**File:** `src/components/HomeAmbient.jsx` + `src/animations/background.js`

| Cosa modificare | File | Dettaglio |
|---|---|---|
| Blob principali (dimensione/colore/blur) | `HomeAmbient.jsx:11-36` | Array `BLOBS` |
| Orb ambientali | `HomeAmbient.jsx:38-56` | Array `ORBS` |
| Scene per sezione | `background.js:16-53` | Array `SCENES` — una per sezione |
| Velocità transizione scene | `background.js:6-7` | `DUR = 2.6`, `EASE = 'power3.out'` |
| Mouse interaction light | `animations/interactionLight.js:15` | `duration: 2.0` quickTo |
| Dots canvas (numero/velocità) | `animations/dataField.js:3-4` | `N = 48`, `SLOW = 0.10` |

**Mapping scene → sezioni** (in `background.js:96-101`):
```
.hi-section  → scene 1
.hpc-section → scene 2
.hd-section  → scene 3
.ha-section  → scene 4
.hcf-section → scene 5
```
Se cambia il class name CSS di una sezione, aggiornare anche questo mapping.

---

## DESIGN SYSTEM (tokens)

**File:** `src/styles/tokens.css`

| Cosa modificare | Variabile | Default |
|---|---|---|
| Colore accent principale | `--accent` | `#2D5BFF` |
| Colore accent hover | `--accent-2` | `#6A8BFF` |
| Accent soft (eyebrow) | `--accent-soft` | `#B7C4FF` |
| Testo primario | `--paper` | `#F5F4F1` |
| Testo secondario | `--mute` | `#8A8A8A` |
| Bordi dark | `--line-dk` | `#1F1F1F` |
| Bg body | `--bg-body` | `#000000` |
| Bg superfici | `--bg-surface` | `#0D0D0D` |
| Border radius bottoni | `--r-chip` | `14px` |
| Font display | `--font-display` | `'Inter Tight'` |
| Font body | `--font-body` | `'Inter'` |
| Font mono | `--font-mono` | `'JetBrains Mono'` |

**Cambiare un token cambia automaticamente tutta la pagina** dove quel token è usato.
**NON cambia** i valori hardcoded: `#161616`, `#272727`, `#0C0E1A`, `rgba(45,91,255,*)` nel CSS e nei file JS.

---

## Quick-reference: cosa NON toccare

| Cosa | Perché |
|---|---|
| `aria-hidden` sul Hero H1 e CTA H2 | Rimosso da GSAP `onComplete` — toccare rompe accessibilità |
| `ctx.revert()` nei `useLayoutEffect` | Necessario per cleanup GSAP su navigazione |
| `openRef.current` in Navbar | Gestisce reverse animation — usare solo `open()`/`close()` |
| `will-change: transform` su blob/orb | Performance GPU — non rimuovere senza testare |
| `backface-visibility: hidden` | Anti-flicker animazioni GSAP — non rimuovere |
| `position: fixed` su `bg-ilight` e `bg-canvas` | Devono coprire tutto il viewport, non solo il contenitore |

---

## Checklist before shipping changes

- [ ] Testare su mobile 375px (iPhone SE)
- [ ] Testare su mobile 390px (iPhone 14)
- [ ] Testare tema light (`data-theme="light"`)
- [ ] Verificare `prefers-reduced-motion` (DevTools → Emulate)
- [ ] Verificare `prefers-color-scheme: light` su Safari
- [ ] Controllare che le animazioni si puliscano navigando tra le pagine
- [ ] Verificare HomeApproccio su mobile (altezza card 180px con testo nuovo)
- [ ] Testare Navbar su tablet (860px)
