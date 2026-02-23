import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Section from './Section'

const lines = [
  "I'm a CS student who got tired of just studying theory — so I started building.",
  "My focus is on frontend development: the part users actually see and feel.",
  "I care about fundamentals. Clean structure, honest code, real projects over tutorials.",
  "Still early in the journey — but building every day, with intention.",
]

/* ── Deadpool animation styles — injected once, CSS-only, GPU transforms ── */
const DP_STYLES = `
  /* Sitting idle — breathe anchored from top so he bobs slightly as if sitting */
  @keyframes dp-breathe {
    0%, 100% { transform: scaleY(1);      }
    50%       { transform: scaleY(1.012);  }
  }
  .dp-char {
    animation: dp-breathe 6s ease-in-out infinite;
    will-change: transform;
    transform-origin: top center;
    transition: filter 0.4s ease;
  }
  .dp-char:hover {
    filter: drop-shadow(-4px 8px 22px rgba(200,0,0,0.35))
            drop-shadow(-4px 8px 14px rgba(0,0,0,0.6));
  }
  @media (prefers-reduced-motion: reduce) {
    .dp-char {
      animation: none !important;
    }
  }
`

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="about" style={{ background: 'var(--color-surface)' }}>
      <style>{DP_STYLES}</style>

      {/* Section container — fades in with a slight gravity drop */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 36 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Heading block */}
        <div style={{ marginBottom: '3rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-mystic-light)',
              marginBottom: '0.65rem',
            }}
          >
            About Me
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Where it all began.
          </h2>

          {/* Accent bar */}
          <div
            style={{
              marginTop: '1rem',
              width: 44,
              height: 3,
              borderRadius: 9999,
              background: 'var(--color-mystic)',
            }}
          />
        </div>

        {/* Content — two-column on wide screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* Paragraph lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {lines.map((line) => (
              <p
                key={line}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.05rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.75,
                  margin: 0,
                  borderLeft: '2px solid var(--color-border)',
                  paddingLeft: '1.25rem',
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Right column — info card with Deadpool sitting on top-right edge */}
          <div>
            {/* Info card — position:relative so Deadpool anchors to it */}
            <div
              style={{
                position: 'relative',
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                /* Allow Deadpool to extend visually above the card */
                overflow: 'visible',
              }}
            >
              {[
                { label: 'Degree',    value: 'B.Tech — Computer Science' },
                { label: 'Focus',     value: 'Frontend Development' },
                { label: 'Currently', value: 'Building, learning, shipping' },
                { label: 'Open to',   value: 'Internships & collabs' },
              ].map(item => (
                <div key={item.label}>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-mystic-light)',
                      margin: '0 0 4px',
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.97rem',
                      color: 'var(--color-text)',
                      margin: 0,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}

              {/* ── Deadpool sitting on the card's top-right edge ──────────────
                  deadpool_ON.png = seated reading pose, white bg.
                  mix-blend-mode: multiply dissolves the white bg on the dark card.
                  Negative top pulls him up so his lap/thighs sit on the card edge.
              ─────────────────────────────────────────────────────────────── */}
              <img
                className="dp-char"
                src="/deadpool_new.png"
                alt="Deadpool sitting on the card reading"
                draggable={false}
                style={{
                  position: 'absolute',
                  /* Seat aligns exactly with card top edge */
                  top: '-132px',
                  right: '8px',
                  width: '178px',
                  height: 'auto',
                  filter: 'drop-shadow(-4px 8px 18px rgba(0,0,0,0.65))',
                  zIndex: 2,
                  userSelect: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}

