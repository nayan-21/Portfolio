import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────────────
   PortalRing
   – SVG arcs that form a stylised open portal / ring
   – Floats very slowly (y oscillation) via Framer Motion
   – A **very subtle** attraction toward the cursor (cursor magnet on the
     element itself, NOT the text) using a spring so it feels physical
──────────────────────────────────────────────────────────────────────────── */
function PortalRing() {
  const ringRef = useRef(null)

  // spring-smoothed raw mouse values
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 28, damping: 18, mass: 1.4 })
  const y = useSpring(rawY, { stiffness: 28, damping: 18, mass: 1.4 })

  useEffect(() => {
    const handleMouse = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2

      // offset from visual center, scaled down to keep movement tiny
      const dx = (e.clientX - cx) * 0.022
      const dy = (e.clientY - cy) * 0.022

      rawX.set(dx)
      rawY.set(dy)
    }

    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [rawX, rawY])

  return (
    <motion.div
      ref={ringRef}
      style={{ x, y }}
      // slow float: breathe up and down
      animate={{ y: [0, -18, 0] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
        // note: the spring y from cursor sits on top of this via style.y
        // they combine automatically in Framer
      }}
      aria-hidden
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 540 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.72, maxWidth: 540, maxHeight: 540 }}
      >
        {/* ── Outer diffuse glow blob (not a ring, just radial colour) ── */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#7C3AED" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>

          {/* arc gradient – purple → indigo → transparent */}
          <linearGradient id="arcGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#9F67FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="arcGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%"   stopColor="#7C3AED" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0.05" />
          </linearGradient>

          {/* Tiny bright dot at arc tip */}
          <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Diffuse background glow */}
        <circle cx="270" cy="270" r="270" fill="url(#glow)" />

        {/* ── Ring 1 – outer arc, 75 % of circle ── */}
        <motion.circle
          cx="270" cy="270" r="220"
          stroke="url(#arcGrad1)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="1036"        /* circumference ≈ 2π×220 ≈ 1382 */
          strokeDashoffset="345"        /* leaves ~75% visible */
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '270px 270px' }}
        />

        {/* ── Ring 2 – inner, rotates opposite, ~55 % visible ── */}
        <motion.circle
          cx="270" cy="270" r="172"
          stroke="url(#arcGrad2)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="1081"         /* 2π×172 ≈ 1081 */
          strokeDashoffset="486"         /* leaves ~55% visible */
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '270px 270px' }}
        />

        {/* ── Ring 3 – innermost accent ring, very faint ── */}
        <motion.circle
          cx="270" cy="270" r="128"
          stroke="#C084FC"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="804"
          strokeDashoffset="600"
          opacity="0.35"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '270px 270px' }}
        />

        {/* ── Glowing dots at arc tips (outer ring, 0° and ~270°) ── */}
        <motion.circle
          cx="490" cy="270" r="4"
          fill="#9F67FF"
          filter="url(#bloom)"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '270px 270px' }}
        />
        <motion.circle
          cx="270" cy="50" r="3"
          fill="#7C3AED"
          filter="url(#bloom)"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '270px 270px' }}
        />
      </svg>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   Hero
──────────────────────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '120px 32px 80px',
        background: 'var(--color-bg)',
      }}
    >
      {/* Abstract portal ring — behind text */}
      <PortalRing />

      {/* ── Hero text — fully static, no motion ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: 760,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-mystic-light)',
            margin: 0,
          }}
        >
          Frontend Developer &nbsp;/&nbsp; CS Student
        </p>

        {/* Name */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3.2rem, 9vw, 6.5rem)',
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.0,
            letterSpacing: '-2px',
          }}
        >
          Nayan
        </h1>

        {/* Main line */}
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.15rem, 2.8vw, 1.6rem)',
            fontWeight: 500,
            color: 'var(--color-text)',
            margin: 0,
            lineHeight: 1.35,
            letterSpacing: '-0.3px',
          }}
        >
          "Every developer has an origin story."
        </p>

        {/* Supporting line */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
            color: 'var(--color-text-muted)',
            margin: 0,
            maxWidth: 480,
            lineHeight: 1.75,
          }}
        >
          Mine started with curiosity — pulling things apart to understand how they work, then building them better than before.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
          <a
            href="#projects"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '0.9rem',
              padding: '13px 30px',
              borderRadius: 9999,
              background: 'var(--color-mystic)',
              color: '#fff',
              textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.82'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '0.9rem',
              padding: '13px 30px',
              borderRadius: 9999,
              background: 'transparent',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              textDecoration: 'none',
              transition: 'border-color 0.2s, transform 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-mystic)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Get In Touch
          </a>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '-72px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-faint)' }}>
            Scroll
          </span>
          {/* Animated scroll line */}
          <motion.div
            style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, var(--color-mystic), transparent)', borderRadius: 9999 }}
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  )
}
