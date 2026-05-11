import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/servizi.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'web',
    label: 'siti web',
    tagline: 'dal brief al live in settimane, non mesi.',
    desc: 'Design su misura, ottimizzato per la conversione. Ogni sito è veloce, responsive e costruito per crescere con il tuo business.',
    tags: ['Branding', 'UI/UX', 'CMS', 'SEO'],
  },
  {
    id: 'ai',
    label: 'intelligenza artificiale',
    tagline: 'automatizza i processi ripetitivi.',
    desc: 'Integriamo modelli AI nel tuo flusso di lavoro: chatbot intelligenti, automazioni su misura e API LLM per prodotti che si aggiornano da soli.',
    tags: ['Chatbot', 'Automazione', 'LLM', 'Agenti AI'],
  },
  {
    id: 'data',
    label: 'analisi dei dati',
    tagline: 'dati chiari, decisioni più veloci.',
    desc: 'Trasformiamo dati grezzi in insight azionabili: dashboard interattive, pipeline automatizzate e report che parlano ai decision maker.',
    tags: ['Dashboard', 'Pipeline', 'BI', 'Visualizzazioni'],
  },
]

export default function ServiziScroll() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const list      = sectionRef.current.querySelector('.s-list')
      const fill      = sectionRef.current.querySelector('.s-fill')
      const listItems = gsap.utils.toArray('li', list)
      const slides    = gsap.utils.toArray('.s-slide', sectionRef.current)

      gsap.set(listItems[0], { color: '#F5F4F1' })
      gsap.set(slides[0],    { autoAlpha: 1 })
      gsap.set(fill,         { scaleY: 1 / listItems.length, transformOrigin: 'top left' })

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
          tl.set(item, { color: '#F5F4F1' }, 0.5 * i)
            .to(slides[i],     { autoAlpha: 1, duration: 0.2 }, '<')
            .set(prev,         { color: '#8A8A8A' }, '<')
            .to(slides[i - 1], { autoAlpha: 0, duration: 0.2 }, '<')
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
  }, [])

  return (
    <section ref={sectionRef} className="s-pin">
      <div className="s-inner">
        <div className="s-left">
          <span className="s-eyebrow">cosa facciamo</span>
          <div className="s-list-wrap">
            <div className="s-fill" />
            <ul className="s-list">
              {services.map(s => (
                <li key={s.id}>{s.label}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="s-right">
          {services.map(s => (
            <div key={s.id} className="s-slide">
              <div className="s-card">
                <p className="s-card-tagline">{s.tagline}</p>
                <p className="s-card-desc">{s.desc}</p>
                <ul className="s-card-tags">
                  {s.tags.map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
