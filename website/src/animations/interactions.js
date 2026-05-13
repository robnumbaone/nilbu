import gsap from 'gsap'

// Card tilt — mouse-tracking 3D rotation on .hd-card elements
export function initCardTilt(selector) {
  const cards = document.querySelectorAll(selector)
  if (!cards.length) return null

  const handlers = []

  cards.forEach(card => {
    gsap.set(card, { transformPerspective: 900 })

    const qRotY = gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power2.out' })
    const qRotX = gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power2.out' })

    const onMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect()
      const nx = (e.clientX - left - width  / 2) / (width  / 2)
      const ny = (e.clientY - top  - height / 2) / (height / 2)
      qRotY(nx * 7)
      qRotX(-ny * 4)
      gsap.to(card, { scale: 1.018, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
    }

    const onLeave = () => {
      gsap.to(card, {
        rotateX: 0, rotateY: 0, scale: 1,
        duration: 0.8, ease: 'power3.out', overwrite: 'auto',
      })
    }

    card.addEventListener('mousemove',  onMove)
    card.addEventListener('mouseleave', onLeave)
    handlers.push({ card, onMove, onLeave })
  })

  return () => {
    handlers.forEach(({ card, onMove, onLeave }) => {
      card.removeEventListener('mousemove',  onMove)
      card.removeEventListener('mouseleave', onLeave)
      gsap.set(card, { clearProps: 'rotateX,rotateY,scale,transformPerspective' })
    })
  }
}

// Button click — scale pop feedback on all interactive buttons
export function initButtonFeedback(selector) {
  const btns = document.querySelectorAll(selector)
  if (!btns.length) return null

  const handlers = []

  btns.forEach(btn => {
    const onDown  = () => gsap.to(btn, { scale: 0.94, duration: 0.1,  ease: 'power2.in',   overwrite: true })
    const onUp    = () => gsap.to(btn, { scale: 1,    duration: 0.45, ease: 'back.out(2.2)',overwrite: true })
    const onLeave = () => gsap.to(btn, { scale: 1,    duration: 0.3,  ease: 'power2.out',  overwrite: true })

    btn.addEventListener('pointerdown',  onDown)
    btn.addEventListener('pointerup',    onUp)
    btn.addEventListener('pointerleave', onLeave)
    handlers.push({ btn, onDown, onUp, onLeave })
  })

  return () => {
    handlers.forEach(({ btn, onDown, onUp, onLeave }) => {
      btn.removeEventListener('pointerdown',  onDown)
      btn.removeEventListener('pointerup',    onUp)
      btn.removeEventListener('pointerleave', onLeave)
    })
  }
}

// Card group focus — dims siblings when any card is hovered
export function initCardGroupFocus(gridSelector, cardSelector) {
  const grid = document.querySelector(gridSelector)
  if (!grid) return null

  const handlers = []

  grid.querySelectorAll(cardSelector).forEach(card => {
    const onEnter = () => grid.classList.add('hd-grid--focused')
    const onLeave = () => grid.classList.remove('hd-grid--focused')
    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)
    handlers.push({ card, onEnter, onLeave })
  })

  return () => {
    grid.classList.remove('hd-grid--focused')
    handlers.forEach(({ card, onEnter, onLeave }) => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
    })
  }
}
