import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DUR  = 2.6
const EASE = 'power3.out'

// Initial GSAP centering per blob (mirrors CSS left/top anchors)
const BLOB_INIT = [
  { xPercent: -50, y: 0          }, // b0: left:50%, top:-5%
  { xPercent: -50, yPercent: -50 }, // b1: left:88%, top:25%
  { xPercent: -50, yPercent: -50 }, // b2: left:10%, top:55%
]

const SCENES = [
  // 0: hero — full centered presence, stable
  [
    { x:    0, y:    0, scale: 1.00, opacity: 1.00 },
    { x:  180, y:  -70, scale: 0.96, opacity: 0.90 },
    { x: -200, y:   70, scale: 0.92, opacity: 0.82 },
  ],
  // 1: intro — expands left, system opening
  [
    { x: -130, y:   90, scale: 1.10, opacity: 0.88 },
    { x:   70, y:   50, scale: 1.04, opacity: 0.78 },
    { x:  -90, y:  160, scale: 0.94, opacity: 0.74 },
  ],
  // 2: per chi — right lateral, structured
  [
    { x:  140, y:  130, scale: 0.92, opacity: 0.82 },
    { x: -110, y:  -50, scale: 1.12, opacity: 0.86 },
    { x:  160, y: -110, scale: 1.08, opacity: 0.70 },
  ],
  // 3: differenze — cold, analytical, contracted
  [
    { x:    0, y:  220, scale: 0.72, opacity: 0.62 },
    { x:  200, y:   80, scale: 0.76, opacity: 0.52 },
    { x: -160, y:  180, scale: 0.74, opacity: 0.58 },
  ],
  // 4: approccio — dim, left-lean (section has own stage bg)
  [
    { x: -200, y:  340, scale: 0.90, opacity: 0.52 },
    { x:  240, y:  200, scale: 0.80, opacity: 0.40 },
    { x:   60, y:  260, scale: 0.88, opacity: 0.48 },
  ],
  // 5: CTA — maximum convergence, full intensity
  [
    { x:    0, y:  480, scale: 1.55, opacity: 1.00 },
    { x:  -70, y:  400, scale: 1.18, opacity: 0.92 },
    { x:   80, y:  420, scale: 1.18, opacity: 0.88 },
  ],
]

function applyScene(blobs, idx) {
  const scene = SCENES[idx]
  blobs.forEach((el, i) => {
    if (!el || !scene[i]) return
    gsap.to(el, { duration: DUR, ease: EASE, ...scene[i] })
  })
}

export function initGradientEngine(blobs, orbs) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  // Set initial centering via GSAP (no CSS transform needed)
  blobs.forEach((el, i) => {
    if (!el) return
    gsap.set(el, BLOB_INIT[i])
  })

  // Hero scene on load
  applyScene(blobs, 0)

  // Orb ambient float
  orbs.forEach(el => {
    if (!el) return
    const xR = 60 + Math.random() * 100
    const yR = 45 + Math.random() * 80
    const d  = 22 + Math.random() * 14

    function step() {
      gsap.to(el, {
        x:     (Math.random() - 0.5) * xR,
        y:     (Math.random() - 0.5) * yR,
        scale: 0.82 + Math.random() * 0.38,
        duration: d + Math.random() * 10,
        ease: 'sine.inOut',
        onComplete: step,
      })
    }
    gsap.delayedCall(Math.random() * 3, step)
  })

  // Section → scene scroll triggers
  const MAP = [
    { sel: '.hi-section',  idx: 1 },
    { sel: '.hpc-section', idx: 2 },
    { sel: '.hd-section',  idx: 3 },
    { sel: '.ha-section',  idx: 4 },
    { sel: '.hcf-section', idx: 5 },
  ]

  const triggers = []
  MAP.forEach(({ sel, idx }) => {
    const el = document.querySelector(sel)
    if (!el) return
    const st = ScrollTrigger.create({
      trigger: el,
      start:   'top 65%',
      onEnter:     () => applyScene(blobs, idx),
      onEnterBack: () => applyScene(blobs, idx - 1),
    })
    triggers.push(st)
  })

  return () => {
    triggers.forEach(t => t.kill())
    blobs.forEach(el => el && gsap.killTweensOf(el))
    orbs.forEach(el => el && gsap.killTweensOf(el))
  }
}
