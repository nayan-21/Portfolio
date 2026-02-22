import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useVelocity, useSpring } from 'framer-motion'

// Our highly-crafted Vector Deadpool Parts with Path Morphing
const variants = {
  head: {
    idle: { rotate: [-1, 1, -1], y: [0, 2, 0], transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' } },
    dance: { rotate: [0, 5, 0], y: [0, 4, 0], transition: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' } }
  },
  eyes: {
    idle: { scaleY: [1, 1, 0.1, 1, 1], transition: { repeat: Infinity, duration: 5, times: [0, 0.9, 0.95, 0.98, 1] } },
    dance: { scaleY: [1, 0.7, 1], transition: { repeat: Infinity, duration: 0.6 } }
  },
  torso: {
    idle: { scaleY: [1, 1.02, 1], transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' } },
    dance: { scaleY: [1, 1.05, 1], y: [0, 2, 0], transition: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' } }
  },
  leftArm: {
    idle: { rotate: [0, -2, 0], transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' } },
    dance: { y: [0, 2, 0], rotate: [0, -4, 0], transition: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' } }
  },
  rightArm: {
    idle: { rotate: [0, 2, 0], transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' } },
    dance: { y: [0, 2, 0], rotate: [0, 4, 0], transition: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' } }
  },
  katanas: {
    idle: { rotate: 0, y: 0, transition: { duration: 0 } },
    dance: { rotate: [-5, 5, -5], y: 0, transition: { repeat: Infinity, duration: 0.6 } }
  }
}

// Subcomponent: The Vector Scalable Deadpool
function VectorDeadpool({ state }) {
  const isIdle = state === 'idle';

  return (
    <motion.svg width="100" height="130" viewBox="0 0 100 130" style={{ overflow: 'visible', filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.5))' }}>
      {/* ── Katanas on Back ── */}
      <motion.g animate={state} variants={variants.katanas} style={{ transformOrigin: '50px 70px' }}>
        {/* Left Katana */}
        <line x1="50" y1="40" x2="15" y2="5" stroke="#111" strokeWidth="6" strokeLinecap="round" />
        <line x1="25" y1="15" x2="10" y2="0" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
        {/* Right Katana */}
        <line x1="50" y1="40" x2="85" y2="5" stroke="#111" strokeWidth="6" strokeLinecap="round" />
        <line x1="75" y1="15" x2="90" y2="0" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
      </motion.g>

      {/* ── Torso ── */}
      <motion.g animate={state} variants={variants.torso} style={{ transformOrigin: '50px 100px' }}>
        <path d="M 35 60 C 35 40, 65 40, 65 60 L 70 110 C 70 120, 30 120, 30 110 Z" fill="#E53E3E" />
        
        {/* Belt & Pouches only - removed the weird black side accents that were shifting around */}
        <rect x="28" y="98" width="44" height="10" rx="3" fill="#4A5568" />
        <rect x="30" y="96" width="10" height="14" rx="2" fill="#2D3748" />
        <rect x="60" y="96" width="10" height="14" rx="2" fill="#2D3748" />
        
        {/* Belt Buckle (Logo) */}
        <circle cx="50" cy="103" r="8" fill="#E53E3E" stroke="#1A202C" strokeWidth="2.5" />
        <line x1="50" y1="95" x2="50" y2="111" stroke="#1A202C" strokeWidth="2.5" />
      </motion.g>

      {/* ── Left Arm ── */}
      <motion.g animate={state} variants={variants.leftArm} style={{ transformOrigin: '35px 65px' }}>
        <path d="M 35 65 C 20 65, 15 85, 20 100 C 25 105, 30 100, 30 95 C 30 85, 40 75, 40 65 Z" fill="#E53E3E" />
        <circle cx="23" cy="98" r="6" fill="#1A202C" /> {/* Glove */}
      </motion.g>

      {/* ── Right Arm ── */}
      <motion.g animate={state} variants={variants.rightArm} style={{ transformOrigin: '65px 65px' }}>
        <path d="M 65 65 C 80 65, 85 85, 80 100 C 75 105, 70 100, 70 95 C 70 85, 60 75, 60 65 Z" fill="#E53E3E" />
        <circle cx="77" cy="98" r="6" fill="#1A202C" /> {/* Glove */}
      </motion.g>

      {/* ── Head ── */}
      <motion.g animate={state} variants={variants.head} style={{ transformOrigin: '50px 45px' }}>
        {/* Base Red Head */}
        <ellipse cx="50" cy="35" rx="20" ry="24" fill="#E53E3E" />
        {/* Black Eye Patches */}
        <path d="M 48 30 C 48 20, 35 25, 33 35 C 31 45, 45 45, 48 35 Z" fill="#1A202C" />
        <path d="M 52 30 C 52 20, 65 25, 67 35 C 69 45, 55 45, 52 35 Z" fill="#1A202C" />
        {/* White Eyes (Animated) */}
        <motion.ellipse cx="42" cy="35" rx="3.5" ry="5.5" fill="#FFF" variants={variants.eyes} style={{ transformOrigin: '42px 35px' }} />
        <motion.ellipse cx="58" cy="35" rx="3.5" ry="5.5" fill="#FFF" variants={variants.eyes} style={{ transformOrigin: '58px 35px' }} />
      </motion.g>
    </motion.svg>
  )
}

export default function DeadpoolMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [characterState, setCharacterState] = useState('idle')
  
  const audioRef = useRef(null)
  const fadeIntervalId = useRef(null)

  const TARGET_VOLUME = 0.20
  const FADE_STEPS = 20
  const FADE_STEP_DURATION = 40

  // Always sync character state with play state
  useEffect(() => {
    setCharacterState(isPlaying ? 'dance' : 'idle')
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = TARGET_VOLUME
    audio.play().then(() => {
      setIsPlaying(true)
      setShowTooltip(false)
    }).catch(err => {
      console.warn("Autoplay blocked by browser. Awaiting user interaction.", err)
      setIsPlaying(false)
      setShowTooltip(true)
    })

    return () => {
      if (fadeIntervalId.current) clearInterval(fadeIntervalId.current)
    }
  }, [])

  const toggleSound = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (fadeIntervalId.current) clearInterval(fadeIntervalId.current)

    if (isPlaying) {
      setIsPlaying(false)
      setShowTooltip(true)
      
      let currentVol = audio.volume
      const step = currentVol / FADE_STEPS
      fadeIntervalId.current = setInterval(() => {
        currentVol -= step
        if (currentVol <= 0.01) {
          audio.volume = 0
          audio.pause()
          clearInterval(fadeIntervalId.current)
        } else {
          audio.volume = currentVol
        }
      }, FADE_STEP_DURATION)
    } else {
      setIsPlaying(true)
      setShowTooltip(false)
      
      audio.volume = 0
      audio.play().catch(err => console.warn('Playback failed:', err))

      let currentVol = 0
      const step = TARGET_VOLUME / FADE_STEPS
      fadeIntervalId.current = setInterval(() => {
        currentVol += step
        if (currentVol >= TARGET_VOLUME) {
          audio.volume = TARGET_VOLUME
          clearInterval(fadeIntervalId.current)
        } else {
          audio.volume = currentVol
        }
      }, FADE_STEP_DURATION)
    }
  }, [isPlaying])

  return (
    <>
      <audio ref={audioRef} src="/ambient.mp3" loop preload="auto" />

      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 60,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                background: '#e53e3e',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '8px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(229, 62, 62, 0.3)',
                position: 'absolute',
                bottom: 'calc(100% + 12px)',
                right: '-10px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              Tap me to start the music
              <div
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  right: '30px',
                  width: '8px',
                  height: '8px',
                  background: '#e53e3e',
                  transform: 'rotate(45deg)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleSound}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            position: 'relative',
            outline: 'none',
            display: 'block',
          }}
          aria-label="Toggle Deadpool Music"
        >
          {/* Audio ripples when playing */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.4, 1.8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(229,62,62,0.4) 0%, rgba(229,62,62,0) 70%)',
                  zIndex: -1,
                }}
              />
            )}
          </AnimatePresence>

          {/* Renders the highly custom animated vector component */}
          <VectorDeadpool state={characterState} />
        </motion.button>
      </div>
    </>
  )
}
