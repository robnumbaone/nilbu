import { useEffect, useRef, useCallback } from "react"
import { addPropertyControls, ControlType } from "framer"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
    particleColor?: string
    particleSize?: number
    glowIntensity?: number
    particleLifetime?: number
    emissionDensity?: number
    dispersalRadius?: number
    style?: React.CSSProperties
    children?: React.ReactNode
}

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    life: number
    maxLife: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgba(hex: string, alpha: number): string {
    const h = hex.replace("#", "")
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    return `rgba(${r},${g},${b},${alpha.toFixed(4)})`
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ParticleHeroGlow({
    particleColor = "#2D5BFF",
    particleSize = 3,
    glowIntensity = 22,
    particleLifetime = 1.4,
    emissionDensity = 8,
    dispersalRadius = 70,
    style,
    children,
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const animFrameRef = useRef<number>(0)
    const lastTimeRef = useRef<number>(0)

    // Live config ref — avoids stale closures in the RAF loop
    const cfg = useRef({ particleColor, particleSize, glowIntensity, particleLifetime, emissionDensity, dispersalRadius })
    cfg.current = { particleColor, particleSize, glowIntensity, particleLifetime, emissionDensity, dispersalRadius }

    // ── Canvas resize (DPR-aware) ──────────────────────────────────────────────
    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!container || !canvas) return

        const sync = () => {
            const dpr = window.devicePixelRatio || 1
            const { width, height } = container.getBoundingClientRect()
            canvas.width = Math.round(width * dpr)
            canvas.height = Math.round(height * dpr)
        }

        const ro = new ResizeObserver(sync)
        ro.observe(container)
        sync()

        return () => ro.disconnect()
    }, [])

    // ── Particle emitter ──────────────────────────────────────────────────────
    const emit = useCallback((lx: number, ly: number) => {
        const { emissionDensity, dispersalRadius, particleSize, particleLifetime } = cfg.current
        const dpr = window.devicePixelRatio || 1

        for (let i = 0; i < emissionDensity; i++) {
            const angle = Math.random() * Math.PI * 2
            // Bias toward the outer ring of the spread area for a more organic look
            const spread = dispersalRadius * Math.sqrt(Math.random()) * 0.45
            const speed = (0.4 + Math.random() * 1.4) * dpr
            const size = particleSize * (0.6 + Math.random() * 0.8) * dpr
            const lifetime = particleLifetime * (0.5 + Math.random() * 0.9)

            particlesRef.current.push({
                x: (lx + Math.cos(angle) * spread) * dpr,
                y: (ly + Math.sin(angle) * spread) * dpr,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size,
                opacity: 0.55 + Math.random() * 0.45,
                life: 0,
                maxLife: lifetime,
            })
        }

        // Hard cap to keep memory and draw cost bounded
        if (particlesRef.current.length > 700) {
            particlesRef.current.splice(0, particlesRef.current.length - 700)
        }
    }, [])

    // ── Animation loop ────────────────────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")!

        const loop = (time: number) => {
            const dt = Math.min((time - (lastTimeRef.current || time)) / 1000, 0.05)
            lastTimeRef.current = time

            const { particleColor, glowIntensity } = cfg.current
            const dpr = window.devicePixelRatio || 1

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const alive: Particle[] = []

            for (const p of particlesRef.current) {
                p.life += dt
                if (p.life >= p.maxLife) continue

                // Soft physics: velocity decay (drag)
                p.vx *= 0.963
                p.vy *= 0.963
                p.x += p.vx
                p.y += p.vy

                const progress = p.life / p.maxLife
                // Ease-out fade: fast initial brightness, slow tail
                const fade = 1 - Math.pow(progress, 1.7)
                const alpha = p.opacity * fade
                const coreR = p.size * (1 - progress * 0.35)
                const glowR = coreR + glowIntensity * dpr * (1 - progress * 0.6)

                ctx.save()
                // "screen" blend: multiple glows add naturally without clipping
                ctx.globalCompositeOperation = "screen"

                // Outer glow halo
                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR)
                grd.addColorStop(0, hexToRgba(particleColor, alpha * 0.75))
                grd.addColorStop(0.35, hexToRgba(particleColor, alpha * 0.28))
                grd.addColorStop(1, hexToRgba(particleColor, 0))

                ctx.beginPath()
                ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2)
                ctx.fillStyle = grd
                ctx.fill()

                // Bright core
                ctx.beginPath()
                ctx.arc(p.x, p.y, coreR, 0, Math.PI * 2)
                ctx.fillStyle = hexToRgba(particleColor, Math.min(alpha * 1.6, 1))
                ctx.fill()

                ctx.restore()
                alive.push(p)
            }

            particlesRef.current = alive
            animFrameRef.current = requestAnimationFrame(loop)
        }

        animFrameRef.current = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(animFrameRef.current)
    }, [])

    // ── Input events ──────────────────────────────────────────────────────────
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        let lastEmit = 0

        const onMouseMove = (e: MouseEvent) => {
            const now = performance.now()
            if (now - lastEmit < 16) return // throttle ~60fps
            lastEmit = now
            const rect = container.getBoundingClientRect()
            emit(e.clientX - rect.left, e.clientY - rect.top)
        }

        const onTouchMove = (e: TouchEvent) => {
            const now = performance.now()
            if (now - lastEmit < 16) return
            lastEmit = now
            const rect = container.getBoundingClientRect()
            const t = e.touches[0]
            emit(t.clientX - rect.left, t.clientY - rect.top)
        }

        container.addEventListener("mousemove", onMouseMove)
        container.addEventListener("touchmove", onTouchMove, { passive: true })

        return () => {
            container.removeEventListener("mousemove", onMouseMove)
            container.removeEventListener("touchmove", onTouchMove)
        }
    }, [emit])

    // ─────────────────────────────────────────────────────────────────────────

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                // Deep dark background with a faint cool-blue tint at top
                background:
                    "radial-gradient(ellipse 130% 70% at 50% -15%, #0b1222 0%, #060912 50%, #010204 100%)",
                overflow: "hidden",
                cursor: "default",
                ...style,
            }}
        >
            {/* Subtle noise grain overlay via CSS — zero JS cost */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "repeat",
                    backgroundSize: "180px 180px",
                    opacity: 0.03,
                    pointerEvents: "none",
                    mixBlendMode: "overlay",
                }}
            />

            {/* Particle canvas — pointer-events off so children stay interactive */}
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                    pointerEvents: "none",
                }}
            />

            {/* Content slot */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {children}
            </div>
        </div>
    )
}

// ─── Framer Property Controls ─────────────────────────────────────────────────

addPropertyControls(ParticleHeroGlow, {
    particleColor: {
        type: ControlType.Color,
        title: "Colore particelle",
        defaultValue: "#2D5BFF",
    },
    particleSize: {
        type: ControlType.Number,
        title: "Dimensione",
        defaultValue: 3,
        min: 0.5,
        max: 12,
        step: 0.5,
        displayStepper: true,
    },
    glowIntensity: {
        type: ControlType.Number,
        title: "Intensità glow",
        defaultValue: 22,
        min: 0,
        max: 80,
        step: 1,
        displayStepper: true,
    },
    particleLifetime: {
        type: ControlType.Number,
        title: "Durata (s)",
        defaultValue: 1.4,
        min: 0.2,
        max: 5,
        step: 0.1,
        displayStepper: true,
    },
    emissionDensity: {
        type: ControlType.Number,
        title: "Densità emissione",
        defaultValue: 8,
        min: 1,
        max: 30,
        step: 1,
        displayStepper: true,
    },
    dispersalRadius: {
        type: ControlType.Number,
        title: "Raggio dispersione",
        defaultValue: 70,
        min: 10,
        max: 220,
        step: 5,
        displayStepper: true,
    },
})
