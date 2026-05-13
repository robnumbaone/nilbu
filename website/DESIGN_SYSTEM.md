# NILBU — Design System

> Estratto completo da `tokens.css` + `home.css`. Base per collaborazione con designer.

---

## 1. Palette colori

### Tema dark (default)

| Token | Valore | Utilizzo |
|---|---|---|
| `--ink` | `#0A0A0A` | Sfondo testo scuro |
| `--ink-2` | `#141414` | Superfici scure |
| `--paper` | `#F5F4F1` | Testo primario su dark |
| `--paper-2` | `#ECEAE4` | Testo secondario/superfici |
| `--line` | `#E6E3DC` | Bordi light |
| `--line-dk` | `#1F1F1F` | Bordi dark (usato ovunque nella home) |
| `--mute` | `#8A8A8A` | Testo secondario, body copy |
| `--mute-dk` | `#6B6B6B` | Testo terziario |
| `--accent` | `#2D5BFF` | Blu primario — CTA, highlights, dot |
| `--accent-2` | `#6A8BFF` | Blu hover |
| `--accent-soft` | `#B7C4FF` | Blu soft — eyebrow labels |
| `--bg-body` | `#000000` | Background pagina |
| `--bg-surface` | `#0D0D0D` | Card/superfici elevate |

### Semantic hero tokens (dark)

| Token | Valore dark | Valore light |
|---|---|---|
| `--hero-bg-start` | `#0b1222` | `#dce3f5` |
| `--hero-bg-mid` | `#060912` | `#eef1fb` |
| `--hero-bg-end` | `#0A0A0A` | `#F5F4F1` |
| `--hero-text` | `#F5F4F1` | `#0F0F0F` |
| `--hero-sub` | `#8A8A8A` | `#5A5A5A` |
| `--hero-eyebrow` | `#B7C4FF` | `#2D5BFF` |
| `--hero-border` | `#3A3A3A` | `#C8C6BE` |
| `--hero-border-hover` | `#6B6B6B` | `#9A9890` |

### Colori hardcoded (non nel token system — da normalizzare)

| Valore | Dove | Problema |
|---|---|---|
| `#161616` | `.ha-card` background | dovrebbe essere `--bg-surface` |
| `#272727` | `.ha-card` border | dovrebbe essere un token |
| `#0C0E1A` | `.hd-card:hover` background | fuori sistema |
| `#2E2E2E` | `.ha-card-num` color | fuori sistema |
| `rgba(45,91,255,0.4)` | HomeApproccio JS | dovrebbe usare CSS var |
| `#2D5BFF` | HomeApproccio JS (card-num color) | dovrebbe usare `var(--accent)` |

---

## 2. Tipografia

### Font stack

| Token | Font | Utilizzo |
|---|---|---|
| `--font-display` | `'Inter Tight', sans-serif` | Headline, titoli, bottoni |
| `--font-body` | `'Inter', sans-serif` | Corpo testo, descrizioni |
| `--font-mono` | `'JetBrains Mono', monospace` | Eyebrow labels, numeri, micro |

### Scale tipografica

| Elemento | Font | Size | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|---|
| Hero H1 | display | `clamp(48px, 6.2vw, 88px)` | 800 | -0.04em | 0.94 |
| Hero eyebrow | mono | `12px` | 500 | 0.2em | — |
| Hero sub | body | `clamp(15px, 1.2vw, 18px)` | 400 | — | 1.6 |
| H2 Intro | display | `clamp(28px, 3.2vw, 48px)` | 800 | -0.03em | 1.05 |
| H2 PerChi | display | `clamp(22px, 2.4vw, 34px)` | 800 | -0.03em | 1.1 |
| H2 Differenze | display | `clamp(26px, 3vw, 44px)` | 800 | -0.03em | 1.1 |
| H2 Approccio | display | `clamp(26px, 3vw, 44px)` | 800 | -0.03em | 1 |
| H2 CTA | display | `clamp(44px, 5.5vw, 80px)` | 800 | -0.04em | 0.95 |
| H3 card title (hd) | display | `clamp(17px, 1.5vw, 22px)` | 700 | -0.02em | 1.2 |
| H3 card label (ha) | display | `clamp(15px, 1.4vw, 19px)` | 700 | -0.02em | 1.1 |
| Section eyebrow | mono | `11px` | 500 | 0.2em | — |
| Body text | body | `clamp(14px, 1.1vw, 16px)` | 400 | — | 1.7 |
| Card body | body | `13px` – `13.5px` | 400 | — | 1.65 |
| Bullet item | body | `14px` | 400 | — | 1.4–1.5 |
| Footer nav | body | `14px` | 400 | — | 1 |
| Footer label | mono | `10px` | — | 0.18em | — |
| Micro / legal | mono | `11px` | — | 0.1em | — |
| Logo | display | `20px` | 800 | -0.03em | — |
| Card num (ha) | mono | `34px` | 800 | -0.04em | 1 |
| Num ghost (hd ::after) | mono | `100px` | 800 | -0.06em | 1 |

---

## 3. Spacing system

Non esiste uno spacing scale formalizzato. I valori ricorrenti sono:

| Valore | Utilizzo principale |
|---|---|
| `12px` | Gap interno header |
| `14px` – `16px` | Gap card interne, gap actions |
| `20px` | Gap header colonne, padding item |
| `24px` – `28px` | Gap sezioni interne, gap hero-inner |
| `32px` | Padding side mobile |
| `36px` – `40px` | Gap stage-inner, padding inner desktop |
| `40px` | Side padding desktop, sezione stage padding |
| `60px` | Section padding mobile |
| `64px` | hd-inner column gap |
| `80px` | Section padding tablet, footer spacing |
| `120px` | Section padding desktop (hpc, hd, hcf) |
| `140px` | hcf-section padding desktop |
| `1200px` | max-width contenitori |

**Breakpoints responsivi:**

| Breakpoint | Trigger |
|---|---|
| `≤ 900px` | Hero inner: remove flex-direction override |
| `≤ 860px` | Intro/PerChi/Differenze/Footer: stack columns |
| `≤ 768px` | Approccio: stack cards absolute, align-items start |
| `≤ 720px` | Differenze grid: 1 colonna |
| `≤ 560px` | Small mobile: padding ridotto, bottoni full-width |

---

## 4. Border radius

| Token | Valore | Usato su |
|---|---|---|
| `--r-chip` | `14px` | Bottoni (h-btn-primary, h-btn-ghost, hcf-btn) |
| `--r-card` | `18px` | **Token definito ma non usato** — cards usano 20px hardcoded |
| `--r-hero` | `22px` | Non usato direttamente |
| `--r-icon` | `28px` | Non usato direttamente |
| `20px` (hardcoded) | `.ha-card`, `.hd-card` | Dovrebbe usare `--r-card` |

---

## 5. Button system

### Primary (`h-btn-primary` / `hcf-btn`)

```
background:    var(--accent)          #2D5BFF
color:         #fff
font:          Inter Tight 700, 13px, 0.06em tracking, uppercase
padding:       14px 32px  (hero) | 16px 44px (CTA)
border-radius: var(--r-chip)          14px
transition:    background 0.25s, transform 0.2s, box-shadow 0.25s

:hover
  background:  var(--accent-2)        #6A8BFF
  transform:   translateY(-2px)
  box-shadow:  0 14px 28px rgba(45,91,255,0.35)

:active
  transform:   translateY(0)
  box-shadow:  0 6px 12px rgba(45,91,255,0.2)
```

**CTA extra:** pseudoelemento `::before` con `box-shadow` glow pulsante (animation `cta-glow-pulse` 3s).

### Ghost (`h-btn-ghost`)

```
background:    transparent
color:         var(--hero-sub)
border:        1px solid var(--hero-border)
font:          Inter Tight 700, 13px, 0.06em tracking, uppercase
padding:       13px 28px
border-radius: var(--r-chip)

:hover
  color:        var(--hero-text)
  border-color: var(--hero-border-hover)
  transform:    translateY(-2px)
```

---

## 6. Card system

### `hd-card` (Differenze — 2×2 grid)

```
background:    var(--bg-surface)      #0D0D0D
border:        1px solid var(--line-dk)
border-radius: 20px
padding:       36px 32px
min-height:    260px
transition:    border-color 0.3s, background 0.3s, opacity 0.35s, filter 0.35s

::before    linea accent top (opacity 0 → 1 on hover)
::after     numero ghost 100px (opacity 0.028 → 0.06 on hover)

:hover
  border-color:  rgba(45,91,255,0.25)
  background:    #0C0E1A   ← hardcoded fuori sistema
  ::before: opacity 1

GSAP tilt: rotateX ±4°, rotateY ±7°, scale 1.018 on hover
```

### `ha-card` (Approccio — sequenza scroll)

```
background:    #161616   ← hardcoded
border:        1px solid #272727   ← hardcoded
border-radius: 20px
padding:       28px 24px
min-height:    240px
transform-origin: center center

GSAP scrub: cards appaiono in sequenza (scale 0.92→1.02, opacity 0.18→1)
```

---

## 7. Shadows

Non esiste un sistema di shadow formalizzato. Shadows usate:

| Effetto | Valore | Dove |
|---|---|---|
| Button hover | `0 14px 28px rgba(45,91,255,0.35)` | h-btn-primary hover |
| CTA hover | `0 22px 44px rgba(45,91,255,0.4)` | hcf-btn hover |
| CTA active | `0 8px 16px rgba(45,91,255,0.25)` | hcf-btn active |
| Hero btn active | `0 6px 12px rgba(45,91,255,0.2)` | h-btn-primary active |
| CTA glow pulse | `0 0 42px 8px rgba(45,91,255,0.45)` | hcf-btn ::before animation |

---

## 8. Animazioni

### Entry animations (GSAP, once, su scroll)

| Sezione | Trigger | Elementi animati | Tecnica |
|---|---|---|---|
| Hero | mount (0.05s delay) | eyebrow, headline chars, sub, actions, scroll-indicator | SplitText stagger |
| HomeIntro | `top 78%` | divider scaleX, eyebrow, headline, body, points | timeline stagger |
| HomePerChi | `top 72%` | eyebrow, headline, lead, items slide-in-x | timeline stagger |
| HomeDifferenze | `top 70%` | eyebrow, headline, cards (alternate x offset) | timeline stagger |
| HomeCtaFinale | `top 68%` | headline words, body, actions, micro | SplitText words |
| HomeFooter | `top 90%` | cols, bottom | timeline stagger |
| Navbar | mount (1.3s delay) | logo, island | gsap.to |

### Scroll-driven (GSAP scrub)

| Componente | Meccanismo | Dettaglio |
|---|---|---|
| HomeApproccio | `scrub: 1`, `start: 'top top'` | 4 card si attivano in sequenza (scale + opacity) |
| HomeDifferenze header | `scrub: 1.2` | `yPercent: -10` parallax |
| HomeAmbient blobs | scene scroll triggers | 6 scene con x/y/scale/opacity per sezione |
| DataField velocity | `onUpdate: getVelocity()` | Dots accelerano con velocità scroll |

### Loop / idle

| Effetto | Meccanismo | Durata |
|---|---|---|
| HeroSmoke blobs | GSAP `yoyo: true, repeat: -1` | 24–36s per blob |
| Scroll line | GSAP `scaleY: 0, repeat: -1` | 1s, `repeatDelay: 0.6` |
| DataField dots | `requestAnimationFrame` | continuo |
| Ambient orbs | GSAP random, `onComplete: step` | 22–40s |
| Dot grid drift | CSS `animation dot-drift 45–60s` | continuo |
| CTA bg pulse | CSS `cta-pulse 6s` | continuo |
| CTA btn glow | CSS `cta-glow-pulse 3s` | continuo |

### Mouse interactions

| Effetto | Meccanismo | Target |
|---|---|---|
| Particle trail | Canvas mousemove su `.h-hero` | HeroParticles |
| Interaction light | GSAP `quickTo` 2.0s ease | bg-ilight (fixed) |
| Card tilt 3D | GSAP `quickTo` rotateX/Y | `.hd-card` |
| Button press | GSAP scale 0.94 → 1 | h-btn-primary, h-btn-ghost, hcf-btn |
| Card group focus | CSS class toggle | `.hd-grid` → `.hd-grid--focused` |
| PerChi item accent | GSAP scaleX 0→1 | `.hpc-item-accent` |

---

## 9. Hover effects (riepilogo)

| Elemento | Effetto |
|---|---|
| `.h-btn-primary` | lift +2px, bg → accent-2, shadow |
| `.h-btn-ghost` | lift +2px, border → border-hover, color → hero-text |
| `.hcf-btn` | lift +3px, bg → accent-2, shadow |
| `.hd-card` | border accent, bg blu-nero, top line appare, num ghost brightens, 3D tilt via GSAP |
| `.hpc-item` | bg tint accent 0.04, num → accent, text → paper, linea accent scaleX 0→1 |
| `.hf-nav-link` | color → paper |
| `.hf-email` | color → accent-2 |
| `.hf-legal` | color → mute |
| `.nav-menu-link` | (vedi navbar.css) |

---

## 10. Accessibilità e motion

- `prefers-reduced-motion: reduce` → tutte le animazioni GSAP disabilitate, canvas nascosti
- `prefers-reduced-motion` gestito manualmente in ogni componente (non centralizzato)
- Mobile (`max-width: 768px`): blur ridotti su blob/orb, `bg-ilight` nascosto
- `pointer: coarse` → card tilt e interaction light disabilitati
