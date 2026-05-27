import { useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    name: 'siti web.',
    tag: 'design + performance',
    desc: 'design, sviluppo e performance per prodotti e aziende.',
  },
  {
    num: '02',
    name: 'intelligenza artificiale.',
    tag: 'automazione + AI',
    desc: 'workflow AI, automazioni e strumenti utili davvero.',
  },
  {
    num: '03',
    name: 'analisi dei dati.',
    tag: 'dati + decisioni',
    desc: 'dashboard, tracking e insight per decisioni migliori.',
  },
]

export default function HomeServizi() {
  const sectionRef = useRef(null)

  /* ── Scroll entry ──────────────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const eyebrow  = sectionRef.current.querySelector('.hs2-eyebrow')
      const rows     = gsap.utils.toArray('.hs2-row', sectionRef.current)
      const dividers = gsap.utils.toArray('.hs2-row-line', sectionRef.current)
      const details  = gsap.utils.toArray('.hs2-row-detail', sectionRef.current)

      // Initialize detail clip state (GSAP owns this)
      gsap.set(details, {
        clipPath: 'inset(0 0 100% 0)',
        opacity: 0,
      })

      if (prefersReduced) {
        gsap.set([eyebrow, ...rows], { opacity: 1, y: 0 })
        gsap.set(dividers, { scaleX: 1 })
        return
      }

      gsap.set(eyebrow,  { opacity: 0, y: 16 })
      gsap.set(rows,     { opacity: 0, y: 44 })
      gsap.set(dividers, { scaleX: 0, transformOrigin: 'left center' })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      })
        .to(eyebrow,  { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' })
        .to(dividers, { scaleX: 1, duration: 0.9, ease: 'expo.out', stagger: 0.1 }, '-=0.2')
        .to(rows,     { opacity: 1, y: 0, duration: 0.65, ease: 'expo.out', stagger: 0.1 }, '-=0.75')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ── Hover interactions ────────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const rows    = Array.from(sectionRef.current.querySelectorAll('.hs2-row'))
    const details = Array.from(sectionRef.current.querySelectorAll('.hs2-row-detail'))
    const arrows  = Array.from(sectionRef.current.querySelectorAll('.hs2-row-arrow'))
    const handlers = []

    rows.forEach((row, idx) => {
      const detail = details[idx]
      const arrow  = arrows[idx]

      const onEnter = () => {
        // Reveal detail via clip-path
        if (detail) {
          gsap.to(detail, {
            clipPath: 'inset(0 0 0% 0)',
            opacity: 1,
            marginTop: '14px',
            duration: 0.42,
            ease: 'power3.out',
            overwrite: 'auto',
          })
        }
        // Arrow drift
        if (arrow) {
          gsap.to(arrow, { x: 8, rotation: -5, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
        }
        // Dim siblings
        rows.forEach((r, i) => {
          if (i !== idx) {
            gsap.to(r, { opacity: 0.4, duration: 0.28, ease: 'power2.out', overwrite: 'auto' })
          }
        })
      }

      const onLeave = () => {
        if (detail) {
          gsap.to(detail, {
            clipPath: 'inset(0 0 100% 0)',
            opacity: 0,
            marginTop: '0px',
            duration: 0.32,
            ease: 'power3.in',
            overwrite: 'auto',
          })
        }
        if (arrow) {
          gsap.to(arrow, { x: 0, rotation: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
        }
        rows.forEach(r => {
          gsap.to(r, { opacity: 1, duration: 0.32, ease: 'power2.out', overwrite: 'auto' })
        })
      }

      row.addEventListener('mouseenter', onEnter)
      row.addEventListener('mouseleave', onLeave)
      handlers.push({ row, onEnter, onLeave })
    })

    return () => {
      handlers.forEach(({ row, onEnter, onLeave }) => {
        row.removeEventListener('mouseenter', onEnter)
        row.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="hs2-section">
      <div className="hs2-inner">
        <span className="hs2-eyebrow">// servizi</span>
        <ul className="hs2-list" role="list">
          {SERVICES.map((s) => (
            <li key={s.num} className="hs2-row-wrap">
              <div className="hs2-row-line" aria-hidden="true" />
              <Link to="/servizi" className="hs2-row">
                <span className="hs2-row-num">{s.num}</span>
                <div className="hs2-row-body">
                  <span className="hs2-row-name">{s.name}</span>
                  <div className="hs2-row-detail">
                    <span className="hs2-row-tag">{s.tag}</span>
                    <p className="hs2-row-desc">{s.desc}</p>
                  </div>
                </div>
                <span className="hs2-row-arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
          <li className="hs2-row-wrap">
            <div className="hs2-row-line" aria-hidden="true" />
          </li>
        </ul>
      </div>
    </section>
  )
}
