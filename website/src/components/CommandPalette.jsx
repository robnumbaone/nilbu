import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/cmdpalette.css'

function buildItems(devMode, onToggleDev) {
  return [
    { group: 'Naviga',  label: 'home',              hint: 'go home',           path: '/',           section: 'top' },
    { group: 'Naviga',  label: 'servizi',            hint: 'sec. servizi',      path: '/',           section: 'servizi' },
    { group: 'Naviga',  label: 'approccio',          hint: 'come lavoriamo',    path: '/',           section: 'approccio' },
    { group: 'Naviga',  label: 'differenze',         hint: 'cosa ci distingue', path: '/',           section: 'differenze' },
    { group: 'Naviga',  label: 'before / after',     hint: 'la trasformazione', path: '/',           section: 'ba' },
    { group: 'Naviga',  label: 'chi siamo',          hint: '/ chi siamo',       path: '/chi-siamo',  section: null },
    { group: 'Naviga',  label: 'contattaci',         hint: 'parliamo',          path: '/contattaci', section: null },
    { group: 'Azione',  label: devMode ? 'disattiva dev mode' : 'attiva dev mode', hint: 'shift+D', action: onToggleDev },
    { group: 'Azione',  label: 'scrivici',           hint: 'info@nilbu.com',    action: () => { window.location.href = 'mailto:info@nilbu.com' } },
    { group: 'Servizi', label: 'siti web',           hint: '/ web',             path: '/',           section: 's-web' },
    { group: 'Servizi', label: 'intelligenza ai',    hint: '/ ai',              path: '/',           section: 's-ai' },
    { group: 'Servizi', label: 'analisi dati',       hint: '/ dati',            path: '/',           section: 's-dati' },
  ]
}

export default function CommandPalette({ open, onClose, devMode, onToggleDev }) {
  const [q, setQ]     = useState('')
  const [sel, setSel] = useState(0)
  const inputRef      = useRef(null)
  const navigate      = useNavigate()
  const location      = useLocation()

  const items    = buildItems(devMode, onToggleDev)
  const filtered = q
    ? items.filter(it =>
        (it.label + ' ' + (it.hint ?? '') + ' ' + it.group)
          .toLowerCase()
          .includes(q.toLowerCase())
      )
    : items

  useEffect(() => {
    if (open) {
      setQ('')
      setSel(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => { setSel(0) }, [q])

  const runItem = useCallback((it) => {
    onClose()
    if (it.action) {
      setTimeout(() => it.action(), 80)
      return
    }
    if (it.path && it.section) {
      const scroll = () => {
        const el = document.getElementById(it.section)
        el?.scrollIntoView({ behavior: 'smooth' })
      }
      if (location.pathname === it.path) {
        setTimeout(scroll, 80)
      } else {
        navigate(it.path)
        setTimeout(scroll, 420)
      }
    } else if (it.path) {
      navigate(it.path)
    }
  }, [onClose, navigate, location])

  const onKey = (e) => {
    if (e.key === 'Escape')     { onClose(); return }
    if (e.key === 'ArrowDown')  { e.preventDefault(); setSel(s => Math.min(filtered.length - 1, s + 1)) }
    if (e.key === 'ArrowUp')    { e.preventDefault(); setSel(s => Math.max(0, s - 1)) }
    if (e.key === 'Enter')      { const it = filtered[sel]; if (it) runItem(it) }
  }

  if (!open) return null

  const grouped = []
  let lastGroup = null
  filtered.forEach((it, i) => {
    if (it.group !== lastGroup) { grouped.push({ label: it.group, kind: 'group' }); lastGroup = it.group }
    grouped.push({ ...it, kind: 'item', _i: i })
  })

  return (
    <div
      className="cmdk-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="cmdk-panel" role="dialog" aria-modal="true" aria-label="Command palette">
        <input
          ref={inputRef}
          className="cmdk-input"
          placeholder="cerca · naviga · azioni…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKey}
        />
        <div className="cmdk-list">
          {filtered.length === 0 ? (
            <div className="cmdk-item" style={{ color: 'var(--mute-dk)' }}>nessun risultato</div>
          ) : grouped.map((row, k) =>
            row.kind === 'group' ? (
              <div key={'g' + k} className="cmdk-section-label">{row.label}</div>
            ) : (
              <div
                key={'i' + k}
                className={`cmdk-item${row._i === sel ? ' cmdk-item--sel' : ''}`}
                onClick={() => runItem(row)}
                onMouseEnter={() => setSel(row._i)}
              >
                <span>{row.label}</span>
                <span className="cmdk-hint">{row.hint}</span>
              </div>
            )
          )}
        </div>
        <div className="cmdk-foot">
          <span><kbd>↑↓</kbd> naviga · <kbd>↵</kbd> esegui</span>
          <span><kbd>esc</kbd> chiudi</span>
        </div>
      </div>
    </div>
  )
}
