import { useEffect, useRef, useCallback } from 'react'

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha.toFixed(4)})`
}

export default function HeroParticles({
  particleColor = '#2D5BFF',
  particleSize = 3,
  glowIntensity = 22,
  particleLifetime = 1.4,
  emissionDensity = 8,
  dispersalRadius = 70,
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animFrameRef = useRef(0)
  const lastTimeRef = useRef(0)
  const cfg = useRef({ particleColor, particleSize, glowIntensity, particleLifetime, emissionDensity, dispersalRadius })
  cfg.current = { particleColor, particleSize, glowIntensity, particleLifetime, emissionDensity, dispersalRadius }

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const sync = () => {
      const dpr = window.devicePixelRatio || 1
      const { width, height } = container.getBoundingClientRect()
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
    }
    const ro = new ResizeObserver(sync)
    ro.observe(container)
    sync()
    return () => ro.disconnect()
  }, [])

  const emit = useCallback((lx, ly) => {
    const { emissionDensity, dispersalRadius, particleSize, particleLifetime } = cfg.current
    const dpr = window.devicePixelRatio || 1
    for (let i = 0; i < emissionDensity; i++) {
      const angle = Math.random() * Math.PI * 2
      const spread = dispersalRadius * Math.sqrt(Math.random()) * 0.45
      const speed = (0.4 + Math.random() * 1.4) * dpr
      const size = particleSize * (0.6 + Math.random() * 0.8) * dpr
      const lifetime = particleLifetime * (0.5 + Math.random() * 0.9)
      particlesRef.current.push({
        x: (lx + Math.cos(angle) * spread) * dpr,
        y: (ly + Math.sin(angle) * spread) * dpr,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        opacity: 0.55 + Math.random() * 0.45,
        life: 0,
        maxLife: lifetime,
      })
    }
    if (particlesRef.current.length > 700)
      particlesRef.current.splice(0, particlesRef.current.length - 700)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const loop = (time) => {
      const dt = Math.min((time - (lastTimeRef.current || time)) / 1000, 0.05)
      lastTimeRef.current = time
      const { particleColor, glowIntensity } = cfg.current
      const dpr = window.devicePixelRatio || 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const alive = []
      for (const p of particlesRef.current) {
        p.life += dt
        if (p.life >= p.maxLife) continue
        p.vx *= 0.963
        p.vy *= 0.963
        p.x += p.vx
        p.y += p.vy
        const progress = p.life / p.maxLife
        const fade = 1 - Math.pow(progress, 1.7)
        const alpha = p.opacity * fade
        const coreR = p.size * (1 - progress * 0.35)
        const glowR = coreR + glowIntensity * dpr * (1 - progress * 0.6)
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR)
        grd.addColorStop(0, hexToRgba(particleColor, alpha * 0.75))
        grd.addColorStop(0.35, hexToRgba(particleColor, alpha * 0.28))
        grd.addColorStop(1, hexToRgba(particleColor, 0))
        ctx.beginPath()
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, coreR, 0, Math.PI * 2)
        ctx.fillStyle = hexToRgba(particleColor, Math.min(alpha * 1.6, 1))
        ctx.fill()
        ctx.restore()
        alive.push(p)
      }
      particlesRef.current = alive
      animFrameRef.current = requestAnimationFrame(loop)
    }
    animFrameRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    // Listen on the parent section — the wrapper has pointer-events:none
    // so its own listeners would never fire
    const target = container.parentElement ?? container
    let lastEmit = 0
    const onMouseMove = (e) => {
      const now = performance.now()
      if (now - lastEmit < 16) return
      lastEmit = now
      const rect = target.getBoundingClientRect()
      emit(e.clientX - rect.left, e.clientY - rect.top)
    }
    const onTouchMove = (e) => {
      const now = performance.now()
      if (now - lastEmit < 16) return
      lastEmit = now
      const rect = target.getBoundingClientRect()
      const t = e.touches[0]
      emit(t.clientX - rect.left, t.clientY - rect.top)
    }
    target.addEventListener('mousemove', onMouseMove)
    target.addEventListener('touchmove', onTouchMove, { passive: true })
    return () => {
      target.removeEventListener('mousemove', onMouseMove)
      target.removeEventListener('touchmove', onTouchMove)
    }
  }, [emit])

  return (
    <div ref={containerRef} className="h-particles-wrap">
      <div className="h-particles-noise" />
      <canvas ref={canvasRef} className="h-particles-canvas" />
    </div>
  )
}
