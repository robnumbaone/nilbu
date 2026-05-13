import { useLayoutEffect } from 'react'
import { initCardTilt, initButtonFeedback, initCardGroupFocus } from '../animations/interactions'

export function useInteractionEffects() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cleanups = [
      initCardTilt('.hd-card'),
      initButtonFeedback('.h-btn-primary, .h-btn-ghost, .hcf-btn'),
      initCardGroupFocus('.hd-grid', '.hd-card'),
    ]

    return () => cleanups.forEach(fn => fn?.())
  }, [])
}
