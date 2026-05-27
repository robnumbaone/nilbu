import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const ITEMS = [
  {
    num: '01',
    title: 'design e sviluppo nascono insieme.',
    body: 'chi progetta sa anche costruire. ogni scelta estetica ha una ragione tecnica, ogni scelta tecnica rafforza l\'esperienza. niente silos, niente feedback a catena.',
  },
  {
    num: '02',
    title: 'parli direttamente con chi realizza il progetto.',
    body: 'nessun account manager a fare da filtro. hai accesso diretto a chi conosce il tuo progetto, dalla prima call fino al lancio e oltre.',
  },
  {
    num: '03',
    title: 'tempi chiari, processi semplici.',
    body: 'lavoriamo per milestone con deliverable definiti. sai sempre a che punto sei, cosa manca e quando finisce. nessuna deriva.',
  },
  {
    num: '04',
    title: 'dopo il lancio, continuiamo a seguirti.',
    body: 'il progetto non si chiude con la consegna. lo seguiamo, aggiorniamo e ottimizziamo nel tempo. il lancio è l\'inizio, non la fine.',
  },
]

export default function HomeDifferenze() {
  const sectionRef  = useRef(null)
  const bodySplits  = useRef([])

  /* ── Scroll entry + body text reveal ──────────────────────────────────────── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const eyebrow  = sectionRef.current.querySelector('.hd-eyebrow')
      const headline = sectionRef.current.querySelector('.hd-headline')
      const context  = sectionRef.current.querySelector('.hd-context')
      const dividers = gsap.utils.toArray('.hd-divider', sectionRef.current)
      const rows     = gsap.utils.toArray('.hd-row', sectionRef.current)
      const bodies   = gsap.utils.toArray('.hd-row-body', sectionRef.current)

      if (prefersReduced) {
        gsap.set([eyebrow, headline, context, ...rows], { opacity: 1, y: 0 })
        gsap.set(dividers, { scaleX: 1 })
        return
      }

      // Split body text into lines for clip-path reveal
      bodySplits.current = bodies.map(el =>
        SplitText.create(el, { type: 'lines', linesClass: 'hd-line' })
      )
      const allLines = bodySplits.current.flatMap(s => s.lines)
      gsap.set(allLines, { clipPath: 'inset(0 0 100% 0)', y: 6 })

      gsap.set([eyebrow, headline, context], { opacity: 0, y: 20 })
      gsap.set(dividers, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(rows, { opacity: 0, y: 16 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
        .to(eyebrow,  { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' })
        .to(headline, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, '-=0.25')
        .to(context,  { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, '-=0.4')
        .to(dividers, { scaleX: 1, duration: 0.55, ease: 'expo.out', stagger: 0.07 }, '-=0.35')
        .to(rows,     { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out', stagger: 0.08 }, '-=0.45')
        // Stagger body line reveals after rows are visible
        .to(allLines, {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.06,
        }, '-=0.2')
    }, sectionRef)

    return () => {
      ctx.revert()
      bodySplits.current.forEach(s => s.revert())
      bodySplits.current = []
    }
  }, [])

  /* ── Number hover ──────────────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const nums = Array.from(sectionRef.current.querySelectorAll('.hd-row-num'))
    const handlers = []

    nums.forEach(num => {
      const onEnter = () => {
        gsap.to(num, {
          color: '#2D5BFF',
          scale: 1.15,
          rotation: 3,
          duration: 0.28,
          ease: 'back.out(2)',
          overwrite: 'auto',
        })
      }
      const onLeave = () => {
        gsap.to(num, {
          color: '',
          scale: 1,
          rotation: 0,
          duration: 0.32,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      num.addEventListener('mouseenter', onEnter)
      num.addEventListener('mouseleave', onLeave)
      handlers.push({ num, onEnter, onLeave })
    })

    return () => {
      handlers.forEach(({ num, onEnter, onLeave }) => {
        num.removeEventListener('mouseenter', onEnter)
        num.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="hd-section">
      <div className="hd-inner">
        <div className="hd-header">
          <span className="hd-eyebrow">// perché nilbu</span>
          <h2 className="hd-headline">
            quello che ci distingue<span className="h-dot">.</span>
          </h2>
          <p className="hd-context">
            non lavoriamo come un'agenzia tradizionale.
            meno passaggi, meno dispersione, più qualità esecutiva.
          </p>
        </div>

        <div className="hd-list">
          {ITEMS.map((item) => (
            <div key={item.num} className="hd-row-wrap">
              <div className="hd-divider" aria-hidden="true" />
              <div className="hd-row">
                <span className="hd-row-num">{item.num}</span>
                <h3 className="hd-row-title">{item.title}</h3>
                <p className="hd-row-body">{item.body}</p>
              </div>
            </div>
          ))}
          <div className="hd-divider" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
