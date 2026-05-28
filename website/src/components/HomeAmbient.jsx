import { useRef, useLayoutEffect } from 'react'

export default function HomeAmbient() {
  const lightRef = useRef(null)

  /* ── Interaction light — follows cursor ────────────────────────────── */
  useLayoutEffect(() => {
    const el = lightRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const halfW = el.offsetWidth  / 2 || 300
    const halfH = el.offsetHeight / 2 || 300

    // Start centered
    el.style.transform = `translate(${window.innerWidth / 2 - halfW}px, ${window.innerHeight / 2 - halfH}px)`

    let tx = window.innerWidth  / 2 - halfW
    let ty = window.innerHeight / 2 - halfH
    let cx = tx
    let cy = ty
    let raf = null

    const onMove = (e) => {
      tx = e.clientX - halfW
      ty = e.clientY - halfH
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const tick = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      el.style.transform = `translate(${cx}px, ${cy}px)`
      if (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = null
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="bg-root" aria-hidden="true">
      {/* Noise grain */}
      <div className="bg-noise" />

      {/* Static glow blobs */}
      <div className="bg-blob bg-blob-0" />
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />

      {/* Dot grid */}
      <div className="bg-grid" />

      {/* Cursor spotlight — position:fixed, escapes overflow clip */}
      <div ref={lightRef} className="bg-ilight" />
    </div>
  )
}
