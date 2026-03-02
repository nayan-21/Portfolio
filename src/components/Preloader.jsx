/* ─────────────────────────────────────────────────────────────────────────
   Preloader
   – Full-screen cinematic loading screen shown once per session
   – Animated percentage counter + glowing progress bar
   – Logo "N." appears with a character-reveal animation
   – Exits with a vertical curtain wipe revealing the site beneath
──────────────────────────────────────────────────────────────────────────── */
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── CSS injected once ── */
const PRELOADER_STYLES = `
  @keyframes pl-scan {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(400%);  }
  }
  @keyframes pl-pulse {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1;   }
  }
  .pl-bar-shine {
    position: absolute;
    top: 0; bottom: 0;
    width: 25%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.55), transparent);
    animation: pl-scan 1.4s ease-in-out infinite;
    border-radius: inherit;
  }
`

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase]       = useState('loading') // loading | exiting

  /* ── Simulate loading progress ── */
  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      /* accelerate at start, slow in the middle, fast again at end */
      const step = p < 30 ? 3.2 : p < 70 ? 1.2 : 2.8
      p = Math.min(100, p + step + Math.random() * 1.5)
      setProgress(Math.floor(p))
      if (p >= 100) {
        clearInterval(interval)
        /* small pause at 100% before the wipe exit */
        setTimeout(() => setPhase('exiting'), 420)
      }
    }, 42)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {phase === 'loading' && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#04060e',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <style>{PRELOADER_STYLES}</style>

          {/* ── Curtain panels that wipe upward on exit ── */}
          <CurtainExit trigger={phase === 'exiting'} onDone={onDone} />

          {/* ── Logo ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: '3.5rem', textAlign: 'center' }}
          >
            {/* Large "N." character reveal */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(5rem, 12vw, 9rem)',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-4px',
                  lineHeight: 1,
                }}
              >
                N
              </span>
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(5rem, 12vw, 9rem)',
                  fontWeight: 800,
                  color: 'var(--color-mystic)',
                  letterSpacing: '-4px',
                  lineHeight: 1,
                }}
              >
                .
              </motion.span>

              {/* Glow behind the logo */}
              <div style={{
                position: 'absolute',
                inset: '-20px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, transparent 70%)',
                filter: 'blur(18px)',
                pointerEvents: 'none',
                zIndex: -1,
              }} />
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                marginTop: '0.6rem',
              }}
            >
              Loading portfolio
            </motion.p>
          </motion.div>

          {/* ── Progress block ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ width: 'min(320px, 75vw)' }}
          >
            {/* Percentage */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.6rem',
            }}>
              <span style={{
                fontFamily: '"JetBrains Mono","Fira Code",monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.14em',
                color: 'rgba(0,200,255,0.45)',
              }}>
                INITIALISING
              </span>
              <span style={{
                fontFamily: '"JetBrains Mono","Fira Code",monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
                color: 'rgba(0,200,255,0.85)',
                animation: 'pl-pulse 1s ease-in-out infinite',
              }}>
                {progress}%
              </span>
            </div>

            {/* Track */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '3px',
              background: 'rgba(255,255,255,0.07)',
              borderRadius: 9999,
              overflow: 'hidden',
            }}>
              {/* Fill */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: 0, top: 0, bottom: 0,
                  width: `${progress}%`,
                  background: 'linear-gradient(to right, rgba(124,58,237,0.9), rgba(0,200,255,0.95))',
                  borderRadius: 9999,
                  boxShadow: '0 0 10px 2px rgba(0,200,255,0.4)',
                  transition: 'width 0.1s linear',
                }}
              />
              {/* Shine sweep */}
              <div className="pl-bar-shine" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Curtain wipe — two panels slide up to reveal site ── */
function CurtainExit({ trigger, onDone }) {
  return (
    <AnimatePresence>
      {trigger && (
        <>
          {/* Left panel */}
          <motion.div
            key="curtain-l"
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            exit={{}}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={onDone}
            style={{
              position: 'fixed',
              inset: 0,
              right: '50%',
              background: '#04060e',
              zIndex: 10000,
            }}
          />
          {/* Right panel — slight delay for stagger */}
          <motion.div
            key="curtain-r"
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            exit={{}}
            transition={{ duration: 0.72, delay: 0.06, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              left: '50%',
              background: '#04060e',
              zIndex: 10000,
            }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
