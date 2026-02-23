/**
 * SpiderManSwing.jsx
 * 
 * Uses fixed positioning (viewport-relative) so the swing isn't clipped by
 * the section's overflow. Uses rAF-driven pendulum physics for realism.
 * 
 * Trigger: IntersectionObserver on the Projects section.
 * Re-triggers after scroll-away and back (3s cooldown after exit).
 */

import { useEffect, useRef, useState, useCallback } from 'react'

/* ── Pendulum physics helpers ── */
// Angle in radians → {x, y} position on screen given anchor and rope length
function pendulumPos(angle, anchorX, anchorY, ropeLen) {
  return {
    x: anchorX + Math.sin(angle) * ropeLen,
    y: anchorY + Math.cos(angle) * ropeLen,
  }
}

/* ── Vector Spider-Man SVG (72×100) ── */
function VectorSpiderMan() {
  return (
    <svg
      width="80" height="110"
      viewBox="0 0 72 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      {/* Head */}
      <ellipse cx="36" cy="14" rx="14" ry="14" fill="#CC1111" />
      {/* Web lines on head */}
      <ellipse cx="36" cy="14" rx="14" ry="14" fill="none" stroke="#111" strokeWidth="0.5" opacity="0.55" />
      <line x1="36" y1="0" x2="36" y2="28" stroke="#111" strokeWidth="0.5" opacity="0.45" />
      <line x1="22" y1="14" x2="50" y2="14" stroke="#111" strokeWidth="0.5" opacity="0.45" />
      <path d="M23 7 Q36 4 49 7" stroke="#111" strokeWidth="0.5" fill="none" opacity="0.42" />
      <path d="M23 21 Q36 24 49 21" stroke="#111" strokeWidth="0.5" fill="none" opacity="0.42" />
      {/* Eyes */}
      <ellipse cx="29.5" cy="12" rx="6" ry="5" fill="#fff" />
      <ellipse cx="42.5" cy="12" rx="6" ry="5" fill="#fff" />
      <ellipse cx="29.5" cy="12" rx="6" ry="5" fill="none" stroke="#111" strokeWidth="0.8" />
      <ellipse cx="42.5" cy="12" rx="6" ry="5" fill="none" stroke="#111" strokeWidth="0.8" />

      {/* Torso */}
      <path d="M 22 28 C 22 22 50 22 50 28 L 52 62 C 52 68 20 68 20 62 Z" fill="#CC1111" />
      {/* Blue chest */}
      <path d="M 26 30 C 26 25 46 25 46 30 L 46 56 C 46 60 26 60 26 56 Z" fill="#1A5BB5" opacity="0.92" />
      {/* Web lines on torso */}
      <line x1="36" y1="22" x2="36" y2="65" stroke="#111" strokeWidth="0.6" opacity="0.35" />
      <path d="M 22 38 Q 36 34 50 38" stroke="#111" strokeWidth="0.5" fill="none" opacity="0.35" />
      <path d="M 21 50 Q 36 46 51 50" stroke="#111" strokeWidth="0.5" fill="none" opacity="0.35" />
      {/* Spider logo */}
      <ellipse cx="36" cy="42" rx="4.5" ry="2.8" fill="#0a0a0a" />
      <line x1="31.5" y1="42" x2="25" y2="38" stroke="#0a0a0a" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="31.5" y1="42" x2="24" y2="47" stroke="#0a0a0a" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="40.5" y1="42" x2="47" y2="38" stroke="#0a0a0a" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="40.5" y1="42" x2="48" y2="47" stroke="#0a0a0a" strokeWidth="1.4" strokeLinecap="round" />

      {/* Left arm — raised toward anchor */}
      <path d="M 22 30 C 14 20 9 10 6 2" stroke="#CC1111" strokeWidth="8.5" strokeLinecap="round" fill="none" />
      <path d="M 22 30 C 14 20 9 10 6 2" stroke="#1A5BB5" strokeWidth="6.5" strokeLinecap="round" fill="none" opacity="0.72" />
      <circle cx="6" cy="2" r="5.5" fill="#CC1111" />
      <rect x="2.5" y="0" width="7" height="3.5" rx="1.75" fill="#0a0a0a" opacity="0.75" />

      {/* Right arm — slightly back */}
      <path d="M 50 30 C 58 20 63 11 66 3" stroke="#CC1111" strokeWidth="8.5" strokeLinecap="round" fill="none" />
      <path d="M 50 30 C 58 20 63 11 66 3" stroke="#1A5BB5" strokeWidth="6.5" strokeLinecap="round" fill="none" opacity="0.72" />
      <circle cx="66" cy="3" r="5.5" fill="#CC1111" />
      <rect x="62.5" y="1" width="7" height="3.5" rx="1.75" fill="#0a0a0a" opacity="0.75" />

      {/* Legs — angled back in swing pose */}
      <path d="M 28 64 C 24 76 21 88 17 98" stroke="#CC1111" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M 28 64 C 24 76 21 88 17 98" stroke="#0a0a0a" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.25" />
      <path d="M 44 64 C 48 75 52 87 56 98" stroke="#CC1111" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M 44 64 C 48 75 52 87 56 98" stroke="#0a0a0a" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.25" />
      {/* Boots */}
      <ellipse cx="16" cy="98.5" rx="7" ry="4.5" fill="#CC1111" />
      <ellipse cx="57" cy="98.5" rx="7" ry="4.5" fill="#CC1111" />
    </svg>
  )
}

/* ── Main component ── */
export default function SpiderManSwing({ sectionRef }) {
  const canvasRef     = useRef(null)
  const animFrameRef  = useRef(null)
  const spideyDivRef  = useRef(null)
  const [visible, setVisible] = useState(false)
  const hasSwung      = useRef(false)
  const resetTimerRef = useRef(null)

  /* ── Run the pendulum swing ── */
  const runSwing = useCallback(() => {
    const canvas = canvasRef.current
    const spidey = spideyDivRef.current
    if (!canvas || !spidey) return

    const ctx = canvas.getContext('2d')
    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width  = W
    canvas.height = H

    /* Anchor point: top-center-right of viewport */
    const anchorX = W * 0.68
    const anchorY = -30 // above viewport top
    const ropeLen = H * 0.58

    /* Start angle: right side ≈ +1.05 rad, end: left side ≈ -1.05 rad */
    const angleStart =  1.05
    const angleEnd   = -1.05

    /* Duration in ms */
    const DURATION = 2400

    let startTime = null
    const SPIDEY_W = 80
    const SPIDEY_H = 110

    function easeInOut(t) {
      // Sine-based for natural pendulum feel
      return 0.5 - 0.5 * Math.cos(Math.PI * t)
    }

    function draw(timestamp) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const t = Math.min(elapsed / DURATION, 1)
      const eased = easeInOut(t)

      // Current angle
      const angle = angleStart + (angleEnd - angleStart) * eased

      // Body position (center of Spider-Man)
      const pos = pendulumPos(angle, anchorX, anchorY, ropeLen)

      // Web attachment on Spider-Man = top-center (wrists), so offset up
      const bodyX = pos.x - SPIDEY_W / 2
      const bodyY = pos.y - 15  // slight offset so web attaches to hands

      // Body rotation lags slightly behind web angle via lerp
      const bodyAngle = angle * (180 / Math.PI) * 0.82  // degrees, slightly lagging

      // Motion blur — stronger near the center (t ≈ 0.5)
      const speedFactor = Math.sin(Math.PI * t) // 0 at edges, 1 at center
      const blurPx = speedFactor * 2.8

      // Update Spider-Man div position + rotation + blur
      spidey.style.left      = `${bodyX}px`
      spidey.style.top       = `${bodyY}px`
      spidey.style.transform = `rotate(${bodyAngle}deg)`
      spidey.style.filter    = `drop-shadow(0 8px 20px rgba(200,0,0,0.6)) blur(${blurPx}px)`

      // Draw web on canvas
      ctx.clearRect(0, 0, W, H)

      // Web attachment point on character = wrists area (hand pos in SVG is at cx=6,cy=2 for left)
      // Roughly top-center of the character
      const webAttachX = pos.x
      const webAttachY = pos.y - 10

      // Draw main web rope (slight cubic curve for sag)
      ctx.beginPath()
      const ctrlX = (anchorX + webAttachX) / 2 + Math.sin(angle) * 18
      const ctrlY = (anchorY + webAttachY) / 2 - 10
      ctx.moveTo(anchorX, anchorY)
      ctx.quadraticCurveTo(ctrlX, ctrlY, webAttachX, webAttachY)
      ctx.strokeStyle = 'rgba(220,220,225,0.90)'
      ctx.lineWidth   = 1.6
      ctx.lineCap     = 'round'
      ctx.stroke()

      // Thin highlight strand
      ctx.beginPath()
      ctx.moveTo(anchorX + 3, anchorY)
      ctx.quadraticCurveTo(ctrlX + 2, ctrlY, webAttachX + 2, webAttachY)
      ctx.strokeStyle = 'rgba(255,255,255,0.55)'
      ctx.lineWidth   = 0.7
      ctx.stroke()

      // Second thinner trailing web
      ctx.beginPath()
      ctx.moveTo(anchorX - 4, anchorY)
      ctx.quadraticCurveTo(ctrlX - 3, ctrlY + 5, webAttachX - 3, webAttachY + 5)
      ctx.strokeStyle = 'rgba(200,200,210,0.42)'
      ctx.lineWidth   = 0.9
      ctx.stroke()

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(draw)
      } else {
        // Animation done — fade out
        ctx.clearRect(0, 0, W, H)
        spidey.style.opacity = '0'
        setTimeout(() => {
          setVisible(false)
          // Re-arm after cooldown
          resetTimerRef.current = setTimeout(() => {
            hasSwung.current = false
          }, 2500)
        }, 400)
      }
    }

    // Begin
    animFrameRef.current = requestAnimationFrame(draw)
  }, [])

  /* ── Trigger on section enter ── */
  const triggerSwing = useCallback(() => {
    if (hasSwung.current) return
    hasSwung.current = true
    setVisible(true)
  }, [])

  /* ── Run animation once visible=true ── */
  useEffect(() => {
    if (!visible) return
    // Small delay to let the DOM mount
    const t = setTimeout(() => {
      if (spideyDivRef.current) {
        spideyDivRef.current.style.opacity = '1'
      }
      runSwing()
    }, 50)
    return () => {
      clearTimeout(t)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [visible, runSwing])

  /* ── IntersectionObserver ── */
  useEffect(() => {
    const el = sectionRef?.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          triggerSwing()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [sectionRef, triggerSwing])

  if (!visible) return null

  return (
    <>
      {/* Full-viewport canvas for the web rope */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />

      {/* Spider-Man character div — positioned by JS */}
      <div
        ref={spideyDivRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transition: 'opacity 0.3s',
          transformOrigin: '40px 5px',   // rotate from wrist attachment point
          willChange: 'transform, filter, left, top',
        }}
      >
        <VectorSpiderMan />
      </div>
    </>
  )
}
