/* ─────────────────────────────────────────────────────────────────────────
   CustomCursor
   – Dot: snaps instantly to mouse position (cyan glow)
   – Ring: trails behind with lerp lag for smooth feel
   – On hover over links/buttons: ring expands + blends into element
   – Hidden on touch devices
──────────────────────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from 'react'

const LERP_FACTOR = 0.10   // ring lag — lower = more lag
const HOVER_SCALE  = 2.6   // ring scale on interactive hover

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  const mouse   = useRef({ x: -200, y: -200 })
  const ring    = useRef({ x: -200, y: -200 })
  const hovered = useRef(false)
  const raf     = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    /* ── Don't render on touch devices ── */
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = dotRef.current
    const ringEl = ringRef.current

    function onMove(e) {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (!visible) setVisible(true)
    }

    function onEnterInteractive() {
      hovered.current = true
    }
    function onLeaveInteractive() {
      hovered.current = false
    }

    /* ── Attach to all interactive elements ── */
    function attachListeners() {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, label')
        .forEach(el => {
          el.addEventListener('mouseenter', onEnterInteractive)
          el.addEventListener('mouseleave', onLeaveInteractive)
        })
    }

    /* ── RAF loop: lerp ring toward mouse ── */
    function tick() {
      ring.current.x += (mouse.current.x - ring.current.x) * LERP_FACTOR
      ring.current.y += (mouse.current.y - ring.current.y) * LERP_FACTOR

      if (dot) {
        dot.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`
      }
      if (ringEl) {
        const scale = hovered.current ? HOVER_SCALE : 1
        ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%) scale(${scale})`
        ringEl.style.opacity   = hovered.current ? '0.35' : '0.7'
        ringEl.style.borderColor = hovered.current
          ? 'rgba(0, 200, 255, 0.6)'
          : 'rgba(0, 200, 255, 0.85)'
      }

      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    attachListeners()

    // Re-attach when DOM changes (SPA navigation etc.)
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      observer.disconnect()
    }
  }, [])

  if (typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* ── Dot — precise, instant ── */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#00c8ff',
          boxShadow: '0 0 8px 2px rgba(0,200,255,0.7), 0 0 20px 4px rgba(0,160,220,0.35)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          mixBlendMode: 'screen',
        }}
      />

      {/* ── Ring — lagging, expands on hover ── */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: '1.5px solid rgba(0,200,255,0.85)',
          boxShadow: '0 0 12px rgba(0,200,255,0.18)',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          opacity: visible ? 0.7 : 0,
          transition: 'opacity 0.3s, border-color 0.25s, transform 0.12s ease-out',
          mixBlendMode: 'screen',
        }}
      />
    </>
  )
}
