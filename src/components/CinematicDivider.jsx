/* ─────────────────────────────────────────────────────────────────────────
   CinematicDivider
   – Full-width visual transition between Skills and Projects
   – Uses DEADPOOL_UPSIDE-DOWN_DIVIDER.jpeg (portrait, rotated -90° to landscape)
   – Static image, dark overlay, one subtle line of text
   – No animation, no interaction, no sound
──────────────────────────────────────────────────────────────────────────── */
export default function CinematicDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height: '75vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        background: '#04060e',
      }}
    >
      {/* ── Deadpool image — portrait rotated -90° to read as wide landscape ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <img
          src="/DEADPOOL_UPSIDE-DOWN_DIVIDER.jpeg"
          alt=""
          draggable={false}
          loading="lazy"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vh',
            height: '100vw',
            objectFit: 'cover',
            objectPosition: 'center center',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── Cinematic dark overlay 65% ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(
              to bottom,
              rgba(4, 6, 14, 0.72) 0%,
              rgba(4, 6, 14, 0.52) 40%,
              rgba(4, 6, 14, 0.68) 80%,
              rgba(4, 6, 14, 0.88) 100%
            )
          `,
          pointerEvents: 'none',
        }}
      />

      {/* ── Single subtle text line ── */}
      <p
        style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(0.72rem, 1.2vw, 0.88rem)',
          fontWeight: 500,
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.38)',
          margin: '0 0 2.8rem',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        Alright, enough about me. Here's the real work.
      </p>
    </div>
  )
}
