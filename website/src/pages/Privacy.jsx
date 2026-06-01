import { useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import HomeFooter from '../components/HomeFooter'
import '../styles/privacy.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const UPDATED = '1 giugno 2026'

const SECTIONS = [
  {
    num: '01',
    id: 'titolare',
    title: 'titolare del trattamento',
    body: [
      'il titolare del trattamento dei dati personali raccolti tramite questo sito è nilbu, contattabile per qualsiasi questione relativa alla privacy al seguente indirizzo:',
    ],
    contact: 'info@nilbu.com',
  },
  {
    num: '02',
    id: 'dati',
    title: 'dati che raccogliamo',
    body: [
      'raccogliamo solo i dati strettamente necessari a rispondere alle tue richieste e a far funzionare il sito.',
    ],
    list: [
      'dati di contatto che ci fornisci volontariamente tramite il form (nome, email, contenuto del messaggio)',
      'dati di navigazione raccolti in forma aggregata e anonima per finalità statistiche',
      'preferenze tecniche salvate localmente nel browser (ad esempio il tema chiaro/scuro)',
    ],
  },
  {
    num: '03',
    id: 'finalita',
    title: 'finalità e base giuridica',
    body: [
      'trattiamo i tuoi dati per rispondere alle richieste inviate tramite il form di contatto e per valutare un’eventuale collaborazione. la base giuridica è il consenso e l’esecuzione di misure precontrattuali adottate su tua richiesta.',
      'i dati di navigazione anonimi vengono trattati sulla base del nostro legittimo interesse a migliorare il sito.',
    ],
  },
  {
    num: '04',
    id: 'conservazione',
    title: 'conservazione',
    body: [
      'conserviamo i dati di contatto solo per il tempo necessario a gestire la tua richiesta e l’eventuale rapporto che ne deriva. trascorso tale periodo, i dati vengono cancellati o resi anonimi.',
    ],
  },
  {
    num: '05',
    id: 'condivisione',
    title: 'condivisione con terzi',
    body: [
      'non vendiamo né cediamo i tuoi dati. possiamo avvalerci di fornitori tecnici (hosting, email) che trattano i dati per nostro conto, in qualità di responsabili del trattamento e nel rispetto della normativa vigente.',
    ],
  },
  {
    num: '06',
    id: 'diritti',
    title: 'i tuoi diritti',
    body: [
      'in qualsiasi momento puoi esercitare i diritti previsti dal GDPR. ti basta scriverci e risponderemo nel più breve tempo possibile.',
    ],
    list: [
      'accesso ai tuoi dati personali',
      'rettifica dei dati inesatti o incompleti',
      'cancellazione dei dati ("diritto all’oblio")',
      'limitazione e opposizione al trattamento',
      'portabilità dei dati che ci hai fornito',
    ],
  },
  {
    num: '07',
    id: 'cookie',
    title: 'cookie',
    body: [
      'questo sito utilizza esclusivamente cookie e tecnologie tecniche necessarie al funzionamento e alla memorizzazione delle tue preferenze. non utilizziamo cookie di profilazione a fini pubblicitari.',
    ],
  },
]

export default function Privacy() {
  const heroRef = useRef(null)
  const bodyRef = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return

      /* ── Hero ── */
      const eyebrow    = heroRef.current.querySelector('.pv-hero-eyebrow')
      const headlineEl = heroRef.current.querySelector('.pv-hero-headline')
      const meta       = heroRef.current.querySelector('.pv-hero-meta')
      const bgEl       = heroRef.current.querySelector('.pv-hero-bg')

      gsap.set([eyebrow, meta], { opacity: 0, y: 20 })
      gsap.set(headlineEl, { opacity: 1 })
      gsap.set(bgEl, { opacity: 0 })

      const split = SplitText.create(headlineEl, { type: 'words', wordsClass: 'pv-word' })
      gsap.set(split.words, { opacity: 0, yPercent: 100 })

      gsap.timeline({ delay: 0.1 })
        .to(bgEl, { opacity: 1, duration: 1.4, ease: 'power2.out' })
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 0.2)
        .to(split.words, {
          opacity: 1, yPercent: 0, duration: 0.75, ease: 'expo.out', stagger: 0.07,
          onComplete: () => split.revert(),
        }, 0.32)
        .to(meta, { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' }, 0.62)

      /* ── Sections ── */
      gsap.utils.toArray('.pv-block', bodyRef.current).forEach((block) => {
        const items = block.querySelectorAll('.pv-block-num, .pv-block-title, .pv-block-content > *')
        gsap.set(items, { opacity: 0, y: 22 })
        gsap.to(items, {
          opacity: 1, y: 0, duration: 0.55, ease: 'expo.out', stagger: 0.05,
          scrollTrigger: { trigger: block, start: 'top 82%', once: true },
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <title>Privacy Policy — nilbu.</title>
      <meta name="description" content="Informativa sulla privacy di nilbu: quali dati raccogliamo, perché, per quanto tempo e quali sono i tuoi diritti ai sensi del GDPR." />

      <main className="pv-main">

        {/* ── Hero ── */}
        <section ref={heroRef} className="pv-hero">
          <div className="pv-hero-bg" aria-hidden="true">§</div>
          <div className="pv-hero-inner">
            <span className="pv-hero-eyebrow">// privacy</span>
            <h1 className="pv-hero-headline" style={{ opacity: 0 }}>
              privacy policy<span className="h-dot">.</span>
            </h1>
            <p className="pv-hero-meta">
              come trattiamo i tuoi dati, in modo chiaro<span className="h-dot">.</span>
              <span className="pv-hero-updated">ultimo aggiornamento · {UPDATED}</span>
            </p>
          </div>
        </section>

        {/* ── Body ── */}
        <section ref={bodyRef} className="pv-body">
          <div className="pv-body-inner">
            {SECTIONS.map((s) => (
              <article key={s.id} id={s.id} className="pv-block">
                <div className="pv-block-aside">
                  <span className="pv-block-num">{s.num}</span>
                </div>
                <div className="pv-block-main">
                  <h2 className="pv-block-title">{s.title}<span className="h-dot">.</span></h2>
                  <div className="pv-block-content">
                    {s.body.map((p, i) => (
                      <p key={i} className="pv-block-text">{p}</p>
                    ))}
                    {s.list && (
                      <ul className="pv-block-list">
                        {s.list.map((li, i) => (
                          <li key={i} className="pv-block-li">
                            <span className="pv-block-li-dot" aria-hidden="true" />
                            <span>{li}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.contact && (
                      <a href={`mailto:${s.contact}`} className="pv-block-mail">{s.contact}</a>
                    )}
                  </div>
                </div>
              </article>
            ))}

            <div className="pv-foot-note">
              <p>
                per qualsiasi domanda su questa informativa o per esercitare i tuoi diritti, scrivici a{' '}
                <a href="mailto:info@nilbu.com" className="pv-inline-mail">info@nilbu.com</a> oppure dalla pagina{' '}
                <Link to="/contattaci" className="pv-inline-link">contatti</Link><span className="h-dot">.</span>
              </p>
            </div>
          </div>
        </section>

        <HomeFooter />
      </main>
    </>
  )
}
