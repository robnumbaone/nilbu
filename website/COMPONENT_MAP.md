# NILBU — Component Map

> Architettura frontend completa. Riferimento per chi deve modificare o estendere.

---

## Struttura cartelle

```
website/
├── package.json
├── vite.config.js
├── vercel.json
│
└── src/
    ├── App.jsx                       ← Router root, providers globali
    ├── main.jsx                      ← Entry point React
    ├── index.css                     ← Reset + body styles
    │
    ├── pages/
    │   ├── Home.jsx                  ← Homepage (Hero inline + composizione sezioni)
    │   └── Servizi.jsx               ← Pagina servizi
    │
    ├── components/
    │   ├── Cursor.jsx                ← Custom cursor (global, in App)
    │   ├── Navbar.jsx                ← Navigazione globale (in App)
    │   ├── Logo.jsx                  ← Wordmark "nilbu."
    │   ├── HomeAmbient.jsx           ← Sistema background (blobs + canvas)
    │   ├── HeroSmoke.jsx             ← Hero: 5 blob animati (yoyo)
    │   ├── HeroParticles.jsx         ← Hero: canvas particelle mouse-reactive
    │   ├── HomeIntro.jsx             ← Sezione 2: partner intro
    │   ├── HomePerChi.jsx            ← Sezione 3: target audience
    │   ├── HomeDifferenze.jsx        ← Sezione 4: differenziatori (card grid)
    │   ├── HomeApproccio.jsx         ← Sezione 5: processo (sticky scroll 450vh)
    │   ├── HomeCtaFinale.jsx         ← Sezione 6: CTA finale
    │   └── HomeFooter.jsx            ← Footer
    │
    ├── animations/
    │   ├── background.js             ← Gradient blob engine (scene-based)
    │   ├── dataField.js              ← Canvas floating dots
    │   ├── interactionLight.js       ← Mouse-following glow radial
    │   └── interactions.js           ← Card tilt 3D, button press, group focus
    │
    ├── hooks/
    │   ├── useInteractionEffects.js  ← Wire interaction effects (usato in Home)
    │   └── useTheme.jsx              ← Theme context (dark/light toggle)
    │
    └── styles/
        ├── tokens.css                ← Design tokens (CSS custom properties)
        ├── home.css                  ← Tutti gli stili homepage (1231 righe)
        ├── navbar.css                ← Stili navbar
        ├── cursor.css                ← Stili custom cursor
        └── servizi.css               ← Stili pagina servizi
```

---

## Dipendenze

| Pacchetto | Versione | Utilizzo |
|---|---|---|
| `react` | ^19.2.6 | Framework UI |
| `react-dom` | ^19.2.6 | DOM rendering |
| `react-router-dom` | ^7.15.0 | Client-side routing |
| `gsap` | ^3.15.0 | Tutte le animazioni |
| `vite` | ^8.0.12 | Build tool |

### Plugin GSAP utilizzati

| Plugin | Tipo | Note |
|---|---|---|
| `ScrollTrigger` | Bundled con GSAP | Scroll-driven animations |
| `SplitText` | **Club GSAP** | Usato in Hero + HomeCtaFinale |

> **Attenzione:** `SplitText` richiede licenza GSAP Club/Business. Se il progetto usa GSAP free, questo è un problema legale e tecnico.

---

## Mappa componenti → responsabilità

### `App.jsx`
- Providers: `ThemeProvider`, `BrowserRouter`
- Componenti globali: `Cursor`, `Navbar`
- Routes: `Home`, `Servizi`, `Placeholder` (chi-siamo, contattaci)
- **Nota:** chi-siamo e contattaci sono placeholder — pagine non costruite

### `pages/Home.jsx`
- Registra GSAP plugins (ScrollTrigger, SplitText)
- Chiama `useInteractionEffects()` al mount
- Contiene la sezione Hero **inline** (non è un componente separato)
- Compone le 6 sezioni + footer
- Importa `home.css`

### `components/HomeAmbient.jsx`
- Renderizza: 3 `bg-blob`, 2 `bg-orb`, 1 `bg-ilight`, 1 `bg-canvas`
- Inizializza: `initGradientEngine`, `initDataField`, `initInteractionLight`
- Il componente non riceve props — configurazione hardcoded (`BLOBS`, `ORBS` arrays)

### `components/HeroSmoke.jsx`
- 5 blob GSAP animati (yoyo, stagger delay)
- Usa `useEffect` (non `useLayoutEffect` — inconsistente con il resto)
- Configurazione blob nell'array `BLOBS` locale

### `components/HeroParticles.jsx`
- Canvas mouse-reactive
- Props configurabili: `particleColor`, `particleSize`, `glowIntensity`, `particleLifetime`, `emissionDensity`, `dispersalRadius`
- Unico componente con props esposte — ottimo per designer

### Sezioni `HomeIntro`, `HomePerChi`, `HomeDifferenze`, `HomeCtaFinale`, `HomeFooter`
- Pattern uniforme: `useRef` + `useLayoutEffect` + GSAP context
- Copy in costanti (`POINTS`, `ITEMS`, `CARDS`, `NAV_LINKS`) all'inizio del file
- Ogni componente pulisce le proprie animazioni (`ctx.revert()`)

### `HomeApproccio.jsx`
- Scroll scrub: sezione alta 450vh, stage sticky 100vh
- Logica mobile/desktop biforcata (`window.matchMedia('(max-width: 768px)')`)
- Copy in `STEPS` array

### `animations/background.js`
- `SCENES` array: 6 scene (hero, intro, per-chi, differenze, approccio, cta)
- Una per sezione della home — strettamente accoppiato alla struttura HTML
- Se le sezioni cambiano ordine, `SCENES` va aggiornato

### `hooks/useTheme.jsx`
- Context `ThemeProvider` + `useTheme`
- Salva in `localStorage`
- Applica `data-theme="light"` su `<html>`

---

## Flusso dati animazioni

```
Home.jsx
  └── useInteractionEffects()
        ├── initCardTilt('.hd-card')          ← animations/interactions.js
        ├── initButtonFeedback(selectors)      ← animations/interactions.js
        └── initCardGroupFocus('.hd-grid', '.hd-card')

HomeAmbient.jsx
  ├── initGradientEngine(blobRefs, orbRefs)   ← animations/background.js
  │     └── ScrollTrigger per sezione → applyScene(blobs, idx)
  ├── initDataField(canvasRef)                ← animations/dataField.js
  └── initInteractionLight(lightRef)          ← animations/interactionLight.js
```

---

## Problemi strutturali

### Critici

1. **Hero inline in `Home.jsx`** — il codice JSX della sezione Hero (righe 83–108) e la sua animazione (righe 24–78) non sono estratti in un componente. Rende `Home.jsx` difficile da leggere e modificare.

2. **`gsap.registerPlugin()` chiamato 8 volte** — in Home.jsx, HomeIntro, HomePerChi, HomeDifferenze, HomeApproccio, HomeCtaFinale, HomeFooter, HomeAmbient. GSAP deduplica automaticamente, ma è rumore e nasconde chi effettivamente usa quale plugin. Va centralizzato in `main.jsx`.

3. **`home.css` da 1231 righe** — tutti gli stili della homepage in un unico file. Impossibile da navigare velocemente. Nessuna separazione logica tra sezioni.

4. **SplitText (Club GSAP)** — plugin a pagamento usato senza menzione della licenza.

### Importanti

5. **Colori hardcoded fuori dal token system** — `#161616`, `#272727`, `#0C0E1A`, `#2E2E2E` in CSS; `rgba(45,91,255,0.4)`, `#2D5BFF` in JS. Il designer non sa quali valori cambierà automaticamente e quali dovrà trovare manualmente.

6. **`--r-card: 18px` token non usato** — le card usano `20px` hardcoded. Token inutile, inconsistenza silenziosa.

7. **`hd-grid--focused` classe aggiunta via JS vanilla** su un componente React — anti-pattern, ma funziona. Un futuro refactor React potrebbe non aspettarsi questo side effect.

8. **`animations/background.js`** usa `document.querySelector` con classi CSS — accoppiamento fragile. Se un class name CSS cambia, l'animazione smette di funzionare in silenzio.

### Minori

9. **Nessuna gestione `<head>`** — niente title, meta description, og tags. SEO completamente assente.

10. **`useEffect` vs `useLayoutEffect`** — `HeroSmoke` usa `useEffect`, tutti gli altri usano `useLayoutEffect`. Inconsistenza che può causare flash su slow connections.

11. **Copyright anno sbagliato** — `HomeFooter.jsx` riga 73: `© 2025 nilbu` (è il 2026).

12. **Chi siamo e Contattaci sono placeholder** — le route esistono ma mostrano solo "in costruzione".
