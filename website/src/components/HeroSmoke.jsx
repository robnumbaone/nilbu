import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const BLOBS = [
  {
    w: 'min(900px, 78vw)', h: 'min(680px, 65vh)',
    bg: 'radial-gradient(ellipse at center, rgba(45,91,255,0.38) 0%, rgba(45,91,255,0.14) 38%, transparent 66%)',
    top: '-10%', left: '5%',
    blur: '70px',
    br: '62% 38% 54% 46% / 44% 58% 42% 56%',
    x: [-60, 80], y: [-40, 55], scale: [0.92, 1.10], dur: 24,
  },
  {
    w: 'min(700px, 60vw)', h: 'min(560px, 54vh)',
    bg: 'radial-gradient(ellipse at center, rgba(13,27,150,0.32) 0%, rgba(20,45,190,0.10) 42%, transparent 68%)',
    top: '-4%', left: '52%',
    blur: '65px',
    br: '48% 52% 60% 40% / 40% 58% 42% 60%',
    x: [60, -80], y: [40, -60], scale: [0.88, 1.08], dur: 28,
  },
  {
    w: 'min(560px, 48vw)', h: 'min(460px, 45vh)',
    bg: 'radial-gradient(ellipse at center, rgba(45,91,255,0.26) 0%, rgba(45,91,255,0.06) 48%, transparent 68%)',
    top: '42%', left: '-4%',
    blur: '60px',
    br: '44% 56% 48% 52% / 56% 44% 60% 40%',
    x: [-40, 100], y: [-65, 38], scale: [0.85, 1.12], dur: 32,
  },
  {
    w: 'min(420px, 36vw)', h: 'min(360px, 35vh)',
    bg: 'radial-gradient(ellipse at center, rgba(107,139,255,0.22) 0%, transparent 62%)',
    top: '-18%', left: '66%',
    blur: '55px',
    br: '52% 48% 44% 56% / 60% 42% 56% 44%',
    x: [80, -50], y: [25, 85], scale: [0.80, 1.16], dur: 36,
  },
  {
    w: 'min(320px, 28vw)', h: 'min(280px, 27vh)',
    bg: 'radial-gradient(ellipse at center, rgba(45,91,255,0.20) 0%, transparent 60%)',
    top: '18%', left: '80%',
    blur: '50px',
    br: '58% 42% 52% 48% / 46% 54% 44% 56%',
    x: [-80, 45], y: [55, -70], scale: [0.86, 1.08], dur: 30,
  },
]

export default function HeroSmoke() {
  const blobRefs = useRef([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const blobs = blobRefs.current.filter(Boolean)
    blobs.forEach((blob, i) => {
      const b = BLOBS[i]
      gsap.fromTo(
        blob,
        { x: b.x[0], y: b.y[0], scale: b.scale[0] },
        {
          x: b.x[1], y: b.y[1], scale: b.scale[1],
          duration: b.dur,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 3.8,
        }
      )
    })

    return () => gsap.killTweensOf(blobRefs.current)
  }, [])

  return (
    <div className="hs-root" aria-hidden="true">
      {BLOBS.map((b, i) => (
        <div
          key={i}
          ref={el => { blobRefs.current[i] = el }}
          className="hs-blob"
          style={{
            width: b.w,
            height: b.h,
            background: b.bg,
            top: b.top,
            left: b.left,
            filter: `blur(${b.blur})`,
            borderRadius: b.br,
          }}
        />
      ))}
    </div>
  )
}
