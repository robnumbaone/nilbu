# NILBU — Design System

> Web agency premium. Siti web moderni, creati più velocemente grazie all'AI.

**Versione:** 1.0 · 2026
**Autore:** Studio NILBU

---

## 1. Posizionamento

**Promessa di brand:** Siti web moderni, creati più velocemente.

| | |
|---|---|
| **Target** | Piccole aziende, attività locali, freelancer che vogliono apparire moderni e attirare più clienti online. |
| **Mission** | Rendere il design premium accessibile e veloce. L'AI toglie attriti, non cura. |
| **Personalità** | Premium ma diretta. Tecnologica ma calda. Sicura senza essere arrogante. |

### Pilastri

1. **Velocità** — Online in settimane, non in mesi.
2. **Design moderno** — Estetica cinematografica.
3. **AI smart** — Strumento al servizio della cura.
4. **Semplicità** — Linguaggio chiaro. Niente tecnicismi.

---

## 2. Logo

**Wordmark:** `nilbu.` — Inter Tight 800, minuscolo, tracking −5.5%.
Il punto blu accent chiude il nome: un click, una pausa, un timer.

### Costruzione

| Proprietà | Valore |
|---|---|
| Typeface | Inter Tight |
| Weight | 800 / ExtraBold |
| Tracking | −5.5% (−0.055em) |
| Case | lowercase |
| Accent | Punto · `#2D5BFF` |
| Clear space | ≥ altezza "N" |
| Min. size | 24px digital / 14mm print |

### Varianti
- **Primario scuro** — wordmark paper su ink (default).
- **Primario chiaro** — wordmark ink su paper.
- **Brand** — wordmark white su accent blue.
- **Monogramma "N"** — app icon, favicon, avatar (con/senza puntino blu).

### Favicon
A formati piccoli (≤32px) il puntino sparisce. Resta la **N**.

---

## 3. Colore

Palette stretta. Due colori dominanti, un accento. **Mai #000 puro.**

| Nome | Hex | RGB | Uso |
|---|---|---|---|
| **Nilbu Nero** (Ink) | `#0A0A0A` | 10 / 10 / 10 | Sfondo principale, testo su chiaro |
| **Soft White** (Paper) | `#F5F4F1` | 245 / 244 / 241 | Sfondo chiaro, testo su scuro |
| **Nilbu Blue** (Accent) | `#2D5BFF` | 45 / 91 / 255 | Segnale, CTA, accenti |
| **Stone** (Surface) | `#ECEAE4` | 236 / 234 / 228 | Card, surface secondaria |
| **Carbon** (Ink Line) | `#1F1F1F` | 31 / 31 / 31 | Bordi su scuro |
| **Soft Blue** (Accent Soft) | `#B7C4FF` | 183 / 196 / 255 | Eyebrow, label su scuro |
| **Mute** | `#8A8A8A` | 138 / 138 / 138 | Testo secondario su scuro |
| **Mute Dark** | `#6B6B6B` | 107 / 107 / 107 | Testo secondario su chiaro |

### Regola 60 / 30 / 10

- **60%** Ink (sfondo / testo principale)
- **30%** Paper (sfondo alternato / testo su scuro)
- **10%** Accent (segnali, mai riempitivo)

> L'accent non riempie. Punta.

---

## 4. Tipografia

**Inter Tight** per tutto ciò che parla. **JetBrains Mono** per etichette, codice, dettagli funzionali.

### Famiglie

| Ruolo | Famiglia | Pesi |
|---|---|---|
| Display / Body | Inter Tight | 400, 500, 600, 700, 800 |
| UI generico | Inter | 400, 500, 600 |
| Mono / Tag | JetBrains Mono | 400, 500 |

### Scala (1920×1080)

| Token | Size | Weight | Tracking | Uso |
|---|---|---|---|---|
| `--type-hero` | 280px | 800 | −5% | Cover wordmark |
| `--type-display` | 168px | 800 | −5% | Headline cinematografica |
| `--type-title` | 92px | 700 | −3.5% | Titolo slide |
| `--type-subtitle` | 52px | 400 | −2.5% | Sottotitolo |
| `--type-body` | 32px | 400 | −1% | Corpo |
| `--type-small` | 26px | 400 | 0 | Caption |
| `--type-eyebrow` | 22px (mono) | 500 | +18% | Eyebrow, tag |

### Regole
- **Lowercase** sui wordmark e display titles. **UPPERCASE** solo per eyebrow mono.
- **Numeri tabulari** per prezzi e dati.
- **Line-height** stretto (0.9–1.0) sui display, comodo (1.35–1.5) sul body.
- **Tracking negativo** sui display, **positivo** (+0.12–0.18em) sui mono.

---

## 5. Voice & Tone

Parliamo come un consulente sicuro che ti spiega le cose al bar. Frasi corte. Verbi attivi. Zero tecnicismi.

### Sei attributi
**Premium · Semplice · Sicuro · Diretto · Moderno · Caldo**

### Sì, va bene

- "Creiamo siti web più velocemente."
- "Online in settimane, non in mesi."
- "La tua attività merita un sito moderno."
- "Più qualità in meno tempo."

### No, mai così

- ~~"Soluzioni full-stack scalabili per il tuo digital business."~~
- ~~"Sfruttiamo LLM proprietari per ottimizzare il workflow."~~
- ~~"Rivoluziona il tuo brand con la nostra metodologia."~~
- ~~"Discover the power of next-gen web solutions."~~

### Regola pratica
Leggi ad alta voce. Se inciampa, riscrivi.

---

## 6. Sistema grafico

Tre asset, infinite combinazioni.

1. **Tech grid** — griglia blu sottile su ink. Diagrammi, hero, sezioni tecniche.
2. **Speed trails** — linee orizzontali che sfumano in blu. Slide velocità, motion.
3. **Brand fill** — diagonali bianche su accent. Background social, copertine.

### Forme

- **Radius:** 14px (chip), 18px (card), 22px (hero card), 28–36px (app icon).
- **Border:** 1px solid `--line` su chiaro · `#1F1F1F` su scuro.
- **Shadow:** `0 40px 80px rgba(0,0,0,0.08)` su biglietti / card sollevate.
- **Orb gradient:** radial blu 35% opacity + blur 60px — atmosfera, non decorazione.

---

## 7. Componenti

### Pulsanti

| Tipo | Sfondo | Testo | Radius |
|---|---|---|---|
| Primary | `--accent` | `#fff` | 12px |
| Ghost | transparent + border `#2A2A2E` | `--paper` | 12px |
| Link | — | `--accent` underline | — |

### Pill / Tag

- Background `transparent`, border 1px `#2A2A2E`, padding `6px 14px`, radius 999px.
- Font: JetBrains Mono 13px, letter-spacing 0.1em, uppercase.
- Dot blu 6px opzionale a sinistra.

### Card

- Background `#fff` o `--ink`, border 1px `--line` o `--ink`, radius 18–22px.
- Padding 28–40px in base alla densità.
- **Featured card:** background `--ink`, testo `--paper`, accent label `--accent-soft`.

### Pricing card

- Tre tier: Starter / Business (featured) / Premium.
- Featured: ink background + badge "Consigliato" in accent.
- Lista feature con bullet dot 7px (ink su chiaro, accent su featured).

---

## 8. Layout & spazio

Padding consistente:
- `--pad-top: 96px` · `--pad-bottom: 96px` · `--pad-x: 104px` (1920×1080)
- `--gap-title: 48px` · `--gap-item: 28px`

**Griglia di base:** 12 colonne, gap 22–24px.
**Breakpoint:** desktop-first, scala fluida fino a 1280px, breakpoint mobile a 768px.

---

## 9. Applicazioni

- **Web** — sito principale, dark mode di default.
- **Slide deck** — 16:9 1920×1080, alternanza scuro/chiaro.
- **Biglietti da visita** — 85×55mm, fronte ink, retro accent.
- **Social** — 1:1 1080×1080, mix dark/blue/paper.
- **Email signature** — wordmark + nome + contatti mono.
- **Merch** — tee con monogramma N + dot.

---

## 10. Token (CSS)

```css
:root {
  /* Color */
  --ink: #0A0A0A;
  --ink-2: #141414;
  --paper: #F5F4F1;
  --paper-2: #ECEAE4;
  --line: #E6E3DC;
  --line-dk: #1F1F1F;
  --mute: #8A8A8A;
  --mute-dk: #6B6B6B;
  --accent: #2D5BFF;
  --accent-2: #6A8BFF;
  --accent-soft: #B7C4FF;

  /* Type scale (deck) */
  --type-hero: 280px;
  --type-display: 168px;
  --type-title: 92px;
  --type-subtitle: 52px;
  --type-body: 32px;
  --type-small: 26px;
  --type-eyebrow: 22px;

  /* Spacing */
  --pad-top: 96px;
  --pad-bottom: 96px;
  --pad-x: 104px;
  --gap-title: 48px;
  --gap-item: 28px;

  /* Radius */
  --r-chip: 14px;
  --r-card: 18px;
  --r-hero: 22px;
  --r-icon: 28px;
}
```

---

## 11. Don't

- ❌ Usare `#000` puro al posto di `--ink`.
- ❌ Saturare la palette con altri colori brand.
- ❌ Usare l'accent come riempitivo / background largo (>10%).
- ❌ Maiuscole sul display (lowercase always).
- ❌ Font diversi da Inter Tight / Inter / JetBrains Mono.
- ❌ Linguaggio tecnico, anglicismi gratuiti, claim aggressivi.
- ❌ Gradient arcobaleno, ombre marcate, glow generici.
- ❌ Emoji nel copy ufficiale.

---

**NILBU · info@nilbu.com · 2026**
