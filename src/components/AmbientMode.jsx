import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AmbientMode() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [hasError, setHasError] = useState(false)

  const audioRef = useRef(null)
  const fadeIntervalId = useRef(null)

  const TARGET_VOLUME = 0.15
  const FADE_STEPS = 25
  const FADE_STEP_DURATION = 60 // 1.5 seconds fade

  useEffect(() => {
    return () => {
      if (fadeIntervalId.current) clearInterval(fadeIntervalId.current)
    }
  }, [])

  const toggleSound = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (fadeIntervalId.current) {
      clearInterval(fadeIntervalId.current)
    }

    if (isPlaying) {
      // Fade out
      setIsPlaying(false)
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
      // Fade in
      setIsPlaying(true)
      setHasError(false)
      audio.volume = 0
      audio.play().catch(err => {
        console.warn('Ambient playback failed. Make sure ambient.mp3 is valid.', err)
        setIsPlaying(false)
        setHasError(true)
      })

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
      <audio
        ref={audioRef}
        src="/ambient.mp3"
        loop
        preload="metadata"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 50,
        }}
      >
        <button
          onClick={toggleSound}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: isPlaying ? 'rgba(124, 58, 237, 0.12)' : 'rgba(13, 13, 16, 0.65)',
            border: `1px solid ${isPlaying ? 'rgba(124, 58, 237, 0.45)' : hovered ? 'var(--color-border)' : 'transparent'}`,
            padding: '8px 16px',
            borderRadius: '999px',
            backdropFilter: 'blur(12px)',
            cursor: 'pointer',
            color: hasError ? '#ef4444' : isPlaying ? 'var(--color-mystic-light)' : 'var(--color-text-muted)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            boxShadow: isPlaying ? '0 0 20px -5px rgba(124, 58, 237, 0.2)' : 'none',
          }}
          aria-label="Toggle Ambient Mode"
        >
          {/* Animated Equalizer Icon */}
          <div style={{ position: 'relative', width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="popLayout">
              {isPlaying && !hasError ? (
                <motion.div
                  key="playing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '10px' }}
                >
                  <motion.div
                    animate={{ height: ['4px', '10px', '4px'] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: '2px', background: 'currentColor', borderRadius: '1px' }}
                  />
                  <motion.div
                    animate={{ height: ['8px', '3px', '8px'] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                    style={{ width: '2px', background: 'currentColor', borderRadius: '1px' }}
                  />
                  <motion.div
                    animate={{ height: ['5px', '9px', '5px'] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                    style={{ width: '2px', background: 'currentColor', borderRadius: '1px' }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="muted"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ color: 'inherit' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          Ambient Mode
        </button>

        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              right: '0',
              marginBottom: '8px',
              padding: '8px 12px',
              background: 'rgba(13, 13, 16, 0.9)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              color: 'var(--color-text-muted)',
              fontSize: '0.7rem',
              fontWeight: 500,
              fontFamily: 'var(--font-sans)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              backdropFilter: 'blur(8px)'
            }}
          >
            Missing <span style={{ color: '#fff' }}>/public/ambient.mp3</span>
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
