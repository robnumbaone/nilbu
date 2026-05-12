import { useLayoutEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/servizi.css'

gsap.registerPlugin(ScrollTrigger)

const SC = '!@#$%&*<>{}[]\\/|=+~?ABCDEFabcdef0123456789'

function colorize(plain) {
  return plain
    .replace(/&/g, '&amp;')
    .replace(/◎/g, '<span class="s-ca">◎</span>')
    .replace(/○/g, '<span class="s-ca">○</span>')
    .replace(/→/g, '<span class="s-ca">→</span>')
    .replace(/↑/g, '<span class="s-ca">↑</span>')
}

function scramble(el, plain, coloredHTML, ms = 650) {
  let frame = 0
  const total = Math.ceil(ms / 40)
  const chars = [...plain]

  el.textContent = chars.map(c =>
    c === '\n' ? '\n' : SC[Math.floor(Math.random() * SC.length)]
  ).join('')

  const id = setInterval(() => {
    frame++
    const p = frame / total

    if (frame >= total) {
      clearInterval(id)
      el.innerHTML = coloredHTML
      return
    }

    el.textContent = chars.map(c => {
      if (c === '\n') return '\n'
      if (Math.random() < p) return c
      return SC[Math.floor(Math.random() * SC.length)]
    }).join('')
  }, 40)

  return () => {
    clearInterval(id)
    if (el) el.innerHTML = coloredHTML
  }
}

const services = [
  {
    id: 'web',
    label: 'siti web',
    tagline: 'dal brief al live. in settimane.',
    ascii: `┌───────────────────────┐
│ ○  nilbu.             │
├───────────────────────┤
│                       │
│  ████████████████     │
│  ██████████           │
│                       │
│  ░░░░░░  ░░░░░░       │
│                       │
│  [  iniziamo →  ]     │
└───────────────────────┘`,
    meta: 'UI · UX · CMS · SEO',
  },
  {
    id: 'ai',
    label: 'intelligenza artificiale',
    tagline: 'automatizza. integra. scala.',
    ascii: `  ◎ ────── ◎ ────── ◎
  │        │        │
  ◎ ────── ◎ ────── ◎
  │        │        │
  ◎ ────── ◎ ────── ◎

  input → process → output`,
    meta: 'LLM · Agents · Automation',
  },
  {
    id: 'data',
    label: 'analisi dei dati',
    tagline: 'dati grezzi in decisioni chiare.',
    ascii: `  │                    ██
  │              ██    ██
  │        ██    ██    ██
  │  ██    ██    ██    ██
  └──────────────────────
     Q1    Q2    Q3    Q4

  crescita misurabile  ↑`,
    meta: 'Dashboard · BI · Pipeline',
  },
].map(s => ({ ...s, colorized: colorize(s.ascii) }))

export default function ServiziScroll() {
  const sectionRef = useRef(null)
  const preRefs    = useRef([])
  const cleanupRef = useRef(null)

  const scrollToService = useCallback((idx) => {
    const st = ScrollTrigger.getAll().find(t => t.trigger === sectionRef.current)
    if (!st) return
    const seg = (st.end - st.start) / services.length
    window.scrollTo({
      top: st.start + idx * seg + (idx > 0 ? 8 : 0),
      behavior: 'smooth',
    })
  }, [])

  const doScramble = useCallback((idx) => {
    const el = preRefs.current[idx]
    if (!el) return
    if (cleanupRef.current) cleanupRef.current()
    cleanupRef.current = scramble(el, services[idx].ascii, services[idx].colorized)
  }, [])

  const handleRightEnter = useCallback(() => {
    const st = ScrollTrigger.getAll().find(t => t.trigger === sectionRef.current)
    if (!st) return
    const progress = (window.scrollY - st.start) / (st.end - st.start)
    doScramble(Math.min(Math.max(Math.floor(progress * services.length), 0), services.length - 1))
  }, [doScramble])

  useLayoutEffect(() => {
    preRefs.current.forEach((el, i) => {
      if (el) el.innerHTML = services[i].colorized
    })

    const ctx = gsap.context(() => {
      const list      = sectionRef.current.querySelector('.s-list')
      const fill      = sectionRef.current.querySelector('.s-fill')
      const listItems = gsap.utils.toArray('li', list)
      const slides    = gsap.utils.toArray('.s-slide', sectionRef.current)

      gsap.set(listItems[0], { color: '#F5F4F1' })
      gsap.set(slides[0],    { autoAlpha: 1 })
      gsap.set(fill,         { scaleY: 1 / listItems.length, transformOrigin: 'top left' })

      doScramble(0)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=' + listItems.length * 50 + '%',
          pin: true,
          scrub: true,
        },
      })

      listItems.forEach((item, i) => {
        const prev = listItems[i - 1]
        if (prev) {
          tl.set(prev,          { color: '#8A8A8A' }, 0.5 * i)
            .set(item,          { color: '#F5F4F1' }, '<')
            .set(slides[i - 1], { autoAlpha: 0 }, '<')
            .set(slides[i],     { autoAlpha: 1 }, '<')
        }
      })

      tl.to(fill, {
        scaleY: 1,
        transformOrigin: 'top left',
        ease: 'none',
        duration: tl.duration(),
      }, 0).to({}, {})
    }, sectionRef)

    return () => ctx.revert()
  }, [doScramble])

  return (
    <section ref={sectionRef} className="s-pin">
      <div className="s-inner">
        <div className="s-left">
          <span className="s-eyebrow">// servizi</span>
          <div className="s-list-wrap">
            <div className="s-fill" />
            <ul className="s-list">
              {services.map((s, i) => (
                <li key={s.id} onClick={() => scrollToService(i)}>{s.label}</li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="s-right"
          onMouseEnter={handleRightEnter}
        >
          {services.map((s, i) => (
            <div key={s.id} className="s-slide">
              <pre
                className="s-ascii"
                ref={el => { preRefs.current[i] = el }}
              />
              <p className="s-tagline">&gt; {s.tagline}</p>
              <span className="s-meta">{s.meta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
