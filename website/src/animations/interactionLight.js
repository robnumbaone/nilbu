import gsap from 'gsap'

export function initInteractionLight(el) {
  if (!el) return null
  if (window.matchMedia('(pointer: coarse)').matches) return null

  const halfW = el.offsetWidth  / 2  // 350 at 700px CSS width
  const halfH = el.offsetHeight / 2  // 350

  gsap.set(el, {
    x: window.innerWidth  / 2 - halfW,
    y: window.innerHeight / 2 - halfH,
  })

  const qx = gsap.quickTo(el, 'x', { duration: 2.0, ease: 'power2.out' })
  const qy = gsap.quickTo(el, 'y', { duration: 2.0, ease: 'power2.out' })

  const onMove = e => {
    qx(e.clientX - halfW)
    qy(e.clientY - halfH)
  }

  window.addEventListener('mousemove', onMove, { passive: true })

  return () => {
    window.removeEventListener('mousemove', onMove)
    gsap.killTweensOf(el)
  }
}
