import { ScrollTrigger } from 'gsap/ScrollTrigger'

const N    = 48
const SLOW = 0.10

function rnd(a, b) { return a + Math.random() * (b - a) }

function make(w, h) {
  return {
    x: rnd(0, w), y: rnd(0, h),
    vx: rnd(-SLOW, SLOW), vy: rnd(-SLOW, SLOW),
    r:     rnd(0.6, 1.4),
    alpha: rnd(0.04, 0.10),
    phase: rnd(0, Math.PI * 2),
  }
}

export function initDataField(canvas) {
  if (!canvas) return null

  const ctx = canvas.getContext('2d')
  let pts = [], raf = null, frame = 0
  let W = 0, H = 0
  let vel = 0, targetVel = 0

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 2)
    W = window.innerWidth
    H = window.innerHeight
    canvas.width  = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    pts = Array.from({ length: N }, () => make(W, H))
  }

  resize()
  window.addEventListener('resize', resize, { passive: true })

  const st = ScrollTrigger.create({
    trigger: document.documentElement,
    start: 'top top',
    end:   'bottom bottom',
    onUpdate(self) {
      targetVel = Math.min(Math.abs(self.getVelocity()) / 800, 1)
    },
  })

  function draw() {
    vel += (targetVel - vel) * 0.05
    targetVel *= 0.92
    frame++

    ctx.clearRect(0, 0, W, H)

    // accent-soft: #B7C4FF = rgb(183, 196, 255)
    for (const p of pts) {
      const pulse = 0.60 + 0.40 * Math.sin(frame * 0.007 + p.phase)
      const a = (p.alpha * pulse).toFixed(3)
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(183,196,255,${a})`
      ctx.fill()

      const boost = 1 + vel * 6
      p.x += p.vx * boost
      p.y += p.vy * boost

      if (p.x < -4) p.x = W + 4
      if (p.x > W + 4) p.x = -4
      if (p.y < -4) p.y = H + 4
      if (p.y > H + 4) p.y = -4
    }

    raf = requestAnimationFrame(draw)
  }

  raf = requestAnimationFrame(draw)

  return () => {
    window.removeEventListener('resize', resize)
    st.kill()
    if (raf) cancelAnimationFrame(raf)
  }
}
