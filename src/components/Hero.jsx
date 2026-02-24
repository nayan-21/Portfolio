import { motion } from 'framer-motion'



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
      }}
    >
      {/* ── Full-cover background: Iron Man eyes ── */}
      <img
        src="/ironman_eye.jpeg"
        alt=""
        aria-hidden
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 42%',
          zIndex: 0,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />

      {/* ── Dark gradient overlay — cinematic ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: `
            linear-gradient(
              to bottom,
              rgba(4, 6, 14, 0.78) 0%,
              rgba(4, 6, 14, 0.62) 32%,
              rgba(4, 6, 14, 0.72) 65%,
              rgba(4, 6, 14, 0.92) 100%
            )
          `,
          pointerEvents: 'none',
        }}
      />

      {/* ── Soft radial vignette behind the text block ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 720,
          height: 560,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(4,6,14,0.55) 0%, rgba(4,6,14,0.28) 50%, transparent 75%)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero text — z-index 10, fully static ── */}
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
          {/* Primary button — subtle cyan glow matching arc reactor */}
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
              transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
              display: 'inline-block',
              boxShadow: '0 0 18px rgba(0, 190, 255, 0.28), 0 0 40px rgba(0, 160, 220, 0.12)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.82'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 0 26px rgba(0, 200, 255, 0.42), 0 0 60px rgba(0, 160, 220, 0.18)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 0 18px rgba(0, 190, 255, 0.28), 0 0 40px rgba(0, 160, 220, 0.12)'
            }}
          >
            View My Work
          </a>

          {/* Secondary button — unchanged */}
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
