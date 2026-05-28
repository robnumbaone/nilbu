import { useRef, useCallback, useEffect, useState } from 'react'

export default function HomeBeforeAfter() {
  const [pos, setPos]     = useState(52)
  const wrapRef           = useRef(null)
  const draggingRef       = useRef(false)

  const updateFromEvent = useCallback((clientX) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const x    = Math.max(0, Math.min(rect.width, clientX - rect.left))
    setPos((x / rect.width) * 100)
  }, [])

  const onDown = (e) => {
    draggingRef.current = true
    updateFromEvent(e.touches ? e.touches[0].clientX : e.clientX)
  }
  const onMove = useCallback((e) => {
    if (!draggingRef.current) return
    e.preventDefault()
    updateFromEvent(e.touches ? e.touches[0].clientX : e.clientX)
  }, [updateFromEvent])
  const onUp = () => { draggingRef.current = false }

  useEffect(() => {
    window.addEventListener('mousemove',  onMove)
    window.addEventListener('mouseup',    onUp)
    window.addEventListener('touchmove',  onMove, { passive: false })
    window.addEventListener('touchend',   onUp)
    return () => {
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseup',    onUp)
      window.removeEventListener('touchmove',  onMove)
      window.removeEventListener('touchend',   onUp)
    }
  }, [onMove])

  return (
    <section className="ba-section" id="ba">
      <div className="ba-inner">
        <header className="section-header">
          <span className="section-eyebrow">// trasformazione</span>
          <h2 className="section-title">prima e dopo<span className="h-dot">.</span></h2>
          <p className="section-lede">
            trascina il cursore per confrontare un sito vecchio con uno rifatto da nilbu<span className="h-dot">.</span>
          </p>
        </header>

        <div
          ref={wrapRef}
          className="ba-wrap"
          style={{ '--ba-pos': pos + '%' }}
          onMouseDown={onDown}
          onTouchStart={onDown}
          role="slider"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(pos)}
          aria-label="Trascina per confrontare prima e dopo"
        >
          {/* BEFORE — sito vecchio anni 2000 */}
          <div className="ba-pane ba-before">
            <span className="ba-label">prima</span>
            <div className="ba-content">
              <div className="junk-nav">
                <span>Home</span>
                <span>Chi Siamo</span>
                <span>I miei Servizi</span>
                <span>Galleria Fotografica</span>
                <span>Blog 2017</span>
                <span>CONTATTACI!!!</span>
              </div>
              <h4 className="junk-h">★★★ Benvenuti nel ns. SITO!! ★★★</h4>
              <div className="junk-body">
                <div className="junk-text">
                  <span>Siamo molto lieti di darvi il benvenuto in questa nuova esperienza online che vi permetterà di scoprire tutto quello che la nostra prestigiosa azienda può offrirvi nel campo del WEB DESIGN!!!</span>
                  <span style={{ color: '#ff8844', marginTop: 8, fontSize: 14 }}>📞 Cell. 333.000.0000 — Fax 02.000.0000</span>
                  <span className="junk-cta" style={{ marginTop: 10 }}>CLICCA QUI ORA!!!</span>
                </div>
                <div className="junk-aside">
                  <span style={{ color: '#ffaa33', fontWeight: 'bold', fontSize: 12 }}>★ NOVITÀ ★</span>
                  <span>visitatori: 00012438</span>
                  <span style={{ color: '#ff5555' }}>aggiornato 14/03/2017</span>
                  <span style={{ marginTop: 8, fontSize: 10 }}>powered by FrontPage 2003</span>
                </div>
              </div>
              <div className="junk-loader">[ caricamento immagini hero.jpg 4.2MB · 12.4s ]</div>
            </div>
          </div>

          {/* AFTER — nilbu redesign */}
          <div className="ba-pane ba-after">
            <span className="ba-label">dopo · nilbu</span>
            <div className="ba-content">
              <div className="clean-top">
                <span className="clean-logo">nilbu<span className="h-dot">.</span></span>
                <div className="clean-links">
                  <span>servizi</span>
                  <span>chi siamo</span>
                  <span>contattaci</span>
                </div>
              </div>
              <div>
                <div className="clean-eb">— web · ai · dati</div>
                <h3 className="clean-h">il partner tech per chi cresce<span className="h-dot">.</span></h3>
              </div>
              <div className="clean-bottom">
                <p className="clean-sub">
                  progettiamo siti web, sistemi AI e strumenti data-driven per aziende che vogliono crescere online.
                </p>
                <span className="clean-cta">parliamo →</span>
              </div>
              <div className="clean-meta">
                <span className="clean-ok">lighthouse 99</span>
                <span>· 0.3s LCP</span>
                <span>· 38KB initial</span>
              </div>
            </div>
          </div>

          <div className="ba-handle" aria-hidden="true" />
        </div>

        <div className="ba-caption">
          <span>← trascina per confrontare</span>
          <span className="ba-metric">−92% peso · +340% conversioni</span>
        </div>
      </div>
    </section>
  )
}
