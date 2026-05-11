import ServiziScroll from '../components/ServiziScroll'
import '../styles/home.css'

export default function Home() {
  return (
    <main>
      <section className="h-hero">
        <div className="h-hero-inner">
          <span className="h-eyebrow">web agency · ai · data</span>
          <h1 className="h-headline">
            siti web moderni,<br />
            creati più velocemente.
          </h1>
          <p className="h-sub">
            design premium, tempi umani.<br />
            l'ai toglie gli attriti, non la cura.
          </p>
        </div>
      </section>

      <ServiziScroll />

      <section className="h-spacer" />
    </main>
  )
}
