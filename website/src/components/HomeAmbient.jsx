import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGradientEngine } from '../animations/background'
import { initDataField } from '../animations/dataField'
import { initInteractionLight } from '../animations/interactionLight'

gsap.registerPlugin(ScrollTrigger)

// Intelligence Layer — 3 large scroll-driven gradient blobs
const BLOBS = [
  {
    id: 'b0',
    size: 'min(1100px, 90vw)',
    color: 'rgba(45,91,255,0.16)',
    blur: '140px',
    left: '50%',
    top: '-5%',
  },
  {
    id: 'b1',
    size: 'min(800px, 68vw)',
    color: 'rgba(20,50,200,0.10)',
    blur: '100px',
    left: '88%',
    top: '25%',
  },
  {
    id: 'b2',
    size: 'min(700px, 58vw)',
    color: 'rgba(45,91,255,0.09)',
    blur: '90px',
    left: '10%',
    top: '55%',
  },
]

// Float Orbs — smaller, continuously drifting
const ORBS = [
  {
    id: 'o0',
    size: 'min(460px, 38vw)',
    color: 'rgba(45,91,255,0.065)',
    blur: '70px',
    left: '-3%',
    top: '22%',
  },
  {
    id: 'o1',
    size: 'min(380px, 32vw)',
    color: 'rgba(30,60,180,0.048)',
    blur: '60px',
    left: '87%',
    top: '60%',
  },
]

export default function HomeAmbient() {
  const blobRefs  = useRef([])
  const orbRefs   = useRef([])
  const lightRef  = useRef(null)
  const canvasRef = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cleanups = [
      initGradientEngine(blobRefs.current, orbRefs.current),
      initDataField(canvasRef.current),
      initInteractionLight(lightRef.current),
    ]

    return () => cleanups.forEach(fn => fn?.())
  }, [])

  return (
    <div className="bg-root" aria-hidden="true">
      {BLOBS.map((b, i) => (
        <div
          key={b.id}
          ref={el => { blobRefs.current[i] = el }}
          className="bg-blob"
          style={{
            width:      b.size,
            height:     b.size,
            left:       b.left,
            top:        b.top,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 65%)`,
            filter:     `blur(${b.blur})`,
          }}
        />
      ))}

      {ORBS.map((o, i) => (
        <div
          key={o.id}
          ref={el => { orbRefs.current[i] = el }}
          className="bg-orb"
          style={{
            width:      o.size,
            height:     o.size,
            left:       o.left,
            top:        o.top,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 65%)`,
            filter:     `blur(${o.blur})`,
          }}
        />
      ))}

      {/* Mouse-following light source — position:fixed, escapes overflow clip */}
      <div ref={lightRef} className="bg-ilight" />

      {/* Data field canvas — position:fixed, always covers viewport */}
      <canvas ref={canvasRef} className="bg-canvas" />
    </div>
  )
}
