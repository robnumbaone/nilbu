import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ChiSiamo from './pages/ChiSiamo'
import Servizi from './pages/Servizi'
import Contattaci from './pages/Contattaci'
import Navbar from './components/Navbar'
import CommandPalette from './components/CommandPalette'
import { ThemeProvider } from './hooks/useTheme.jsx'
import './styles/cmdpalette.css'

export default function App() {
  const [cmdOpen, setCmdOpen]   = useState(false)
  const [devMode, setDevMode]   = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dev', devMode)
  }, [devMode])

  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase()
      if ((e.metaKey || e.ctrlKey) && k === 'k') {
        e.preventDefault()
        setCmdOpen(c => !c)
      }
      if (e.shiftKey && k === 'd' && !e.metaKey && !e.ctrlKey && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault()
        setDevMode(d => !d)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggleDev = () => setDevMode(d => !d)

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/chi-siamo"  element={<ChiSiamo />} />
          <Route path="/servizi"    element={<Servizi />} />
          <Route path="/contattaci" element={<Contattaci />} />
        </Routes>
        <CommandPalette
          open={cmdOpen}
          onClose={() => setCmdOpen(false)}
          devMode={devMode}
          onToggleDev={toggleDev}
        />
        {devMode && (
          <div className="dev-banner" role="status" aria-live="polite">
            <span className="dev-banner-dot" aria-hidden="true" />
            <span>dev mode · shift+D per uscire</span>
          </div>
        )}
      </BrowserRouter>
    </ThemeProvider>
  )
}
