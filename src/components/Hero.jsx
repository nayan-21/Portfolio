import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────────────
   ArcReactor
   – Iron Man–style energy core (arc reactor)
   – Cool blue / white glow, cinematic and premium
   – Static SVG image + CSS keyframe animations only
   – GPU-friendly: only opacity and transform animated
   – Respects prefers-reduced-motion
──────────────────────────────────────────────────────────────────────────── */

const ARC_REACTOR_STYLES = `
  @keyframes arc-glow-pulse {
    0%, 100% {
      opacity: 0.82;
      filter: drop-shadow(0 0 28px rgba(0,200,255,0.55))
              drop-shadow(0 0 60px rgba(0,160,220,0.28))
              drop-shadow(0 0 100px rgba(0,100,180,0.14));
    }
    50% {
      opacity: 1;
      filter: drop-shadow(0 0 44px rgba(80,230,255,0.9))
              drop-shadow(0 0 88px rgba(0,200,255,0.45))
              drop-shadow(0 0 150px rgba(0,140,220,0.22));
    }
  }

  @keyframes arc-breathe {
    0%, 100% { transform: scale(1) rotate(0deg); }
    50%       { transform: scale(1.028) rotate(0.4deg); }
  }

  /* Light sweep — thin diagonal specular, fires ~every 10s, lasts 0.7s */
  @keyframes arc-sweep {
    0%      { transform: translateX(-160%) rotate(-28deg); opacity: 0;    }
    3%      { opacity: 0.13; }
    7%      { transform: translateX(160%)  rotate(-28deg); opacity: 0;    }
    100%    { transform: translateX(160%)  rotate(-28deg); opacity: 0;    }
  }

  .arc-sweep {
    animation: arc-sweep 10s ease-in-out infinite;
    will-change: transform, opacity;
  }

  @media (prefers-reduced-motion: reduce) {
    .arc-reactor-img {
      animation: none !important;
      opacity: 0.9 !important;
    }
    .arc-sweep {
      animation: none !important;
    }
  }

  .arc-reactor-img {
    animation:
      arc-glow-pulse 4.5s ease-in-out infinite,
      arc-breathe    8s   ease-in-out infinite;
    will-change: transform, opacity, filter;
  }
`

function ArcReactor() {
  return (
    <>
      <style>{ARC_REACTOR_STYLES}</style>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        {/* Outer ambient bloom — pure CSS, no JS */}
        <div
          style={{
            position: 'absolute',
            width: 520,
            height: 520,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0,200,255,0.10) 0%, rgba(0,120,200,0.05) 45%, transparent 70%)',
            animation: 'arc-glow-pulse 4.5s ease-in-out infinite',
            willChange: 'opacity',
          }}
        />

        {/* Light sweep — clipped circle, fires once per 10s cycle */}
        <div
          style={{
            position: 'absolute',
            width: 560,
            height: 560,
            borderRadius: '50%',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div
            className="arc-sweep"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(105deg, transparent 35%, rgba(180,240,255,0.18) 48%, rgba(255,255,255,0.13) 50%, rgba(180,240,255,0.18) 52%, transparent 65%)',
            }}
          />
        </div>

        {/* The reactor image itself */}
        <img
          className="arc-reactor-img"
          src="/arc-reactor.svg"
          alt=""
          width={680}
          height={680}
          style={{
            flexShrink: 0,
            display: 'block',
          }}
          draggable={false}
        />
      </div>
    </>
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
        overflow: 'visible',
        padding: '120px 32px 80px',
        background: 'var(--color-bg)',
      }}
    >
      {/* Arc Reactor — behind hero text, z-index 0 */}
      <ArcReactor />

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
