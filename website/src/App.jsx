import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Servizi from './pages/Servizi'
import Navbar from './components/Navbar'

const Placeholder = ({ label }) => (
  <div style={{ color: 'var(--paper)', padding: '40px', fontFamily: 'var(--font-mono)' }}>
    {label} — in costruzione
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/chi-siamo"  element={<Placeholder label="chi siamo" />} />
        <Route path="/servizi"    element={<Servizi />} />
        <Route path="/contattaci" element={<Placeholder label="contattaci" />} />
      </Routes>
    </BrowserRouter>
  )
}
