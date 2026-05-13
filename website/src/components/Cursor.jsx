import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useTheme } from '../hooks/useTheme.jsx'
import '../styles/cursor.css'

function resolveState(target) {
  if (!target) return 'default'
  if (target.closest('.hcf-btn, .h-btn-primary')) return 'cta'
  if (target.closest('.hd-card, .hpc-item, .ha-card')) return 'card'
  if (target.closest('a, button, [role="button"]')) return 'link'
  return 'default'
}

const PALETTES = {
  dark: {
    default: { scale: 1,    opacity: 0.45, color: 'rgb(245,244,241)' },
    link:    { scale: 0.72, opacity: 0.85, color: 'rgb(245,244,241)' },
    cta:     { scale: 1.4,  opacity: 0.9,  color: 'rgb(45,91,255)'   },
    card:    { scale: 1.7,  opacity: 0.28, color: 'rgb(245,244,241)' },
  },
  light: {
    default: { scale: 1,    opacity: 0.55, color: 'rgb(15,15,15)'    },
    link:    { scale: 0.72, opacity: 0.85, color: 'rgb(15,15,15)'    },
    cta:     { scale: 1.4,  opacity: 0.9,  color: 'rgb(45,91,255)'   },
    card:    { scale: 1.7,  opacity: 0.32, color: 'rgb(15,15,15)'    },
  },
}

export default function Cursor() {
  const chRef      = useRef(null)
  const stateRef   = useRef('default')
  const visRef     = useRef(false)
  const paletteRef = useRef(PALETTES.dark)
  const { theme }  = useTheme()

  // Update palette + re-apply current color when theme changes
  useEffect(() => {
    paletteRef.current = PALETTES[theme] ?? PALETTES.dark
    const ch = chRef.current
    if (!ch || !visRef.current) return
    const c = paletteRef.current[stateRef.current]
    gsap.to(ch, { color: c.color, opacity: c.opacity, duration: 0.3, overwrite: 'auto' })
  }, [theme])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.documentElement.classList.add('cursor-active')

    const ch = chRef.current
    if (!ch) return

    gsap.set(ch, { opacity: 0, x: -100, y: -100 })

    const xCh = gsap.quickTo(ch, 'x', { duration: 0.055, ease: 'power1.out' })
    const yCh = gsap.quickTo(ch, 'y', { duration: 0.055, ease: 'power1.out' })

    function setState(s) {
      if (s === stateRef.current) return
      stateRef.current = s
      const c = paletteRef.current[s]
      gsap.to(ch, {
        scale:   c.scale,
        color:   c.color,
        opacity: visRef.current ? c.opacity : 0,
        duration: 0.32,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    function onMove(e) {
      xCh(e.clientX)
      yCh(e.clientY)
      if (!visRef.current) {
        visRef.current = true
        gsap.to(ch, { opacity: paletteRef.current[stateRef.current].opacity, duration: 0.4 })
      }
      setState(resolveState(e.target))
    }

    function hide() { gsap.to(ch, { opacity: 0, duration: 0.35, overwrite: 'auto' }) }
    function show() {
      if (visRef.current)
        gsap.to(ch, { opacity: paletteRef.current[stateRef.current].opacity, duration: 0.3, overwrite: 'auto' })
    }

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      document.documentElement.classList.remove('cursor-active')
    }
  }, [])

  return (
    <div className="cur-root" aria-hidden="true">
      <svg
        ref={chRef}
        className="cur-crosshair"
        width="20" height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <line x1="1"  y1="10" x2="7"  y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="13" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="10" y1="1"  x2="10" y2="7"  stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="10" y1="13" x2="10" y2="19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <circle cx="10" cy="10" r="1" fill="currentColor" />
      </svg>
    </div>
  )
}
