import { useLayoutEffect } from 'react'
import { initButtonFeedback } from '../animations/interactions'

export function useInteractionEffects() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cleanup = initButtonFeedback('.h-btn-primary, .h-btn-ghost, .hcf-btn')
    return () => cleanup?.()
  }, [])
}
