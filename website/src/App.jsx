import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ChiSiamo from './pages/ChiSiamo'
import Servizi from './pages/Servizi'
import Contattaci from './pages/Contattaci'
import Navbar from './components/Navbar'
import { ThemeProvider } from './hooks/useTheme.jsx'

export default function App() {
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
      </BrowserRouter>
    </ThemeProvider>
  )
}
