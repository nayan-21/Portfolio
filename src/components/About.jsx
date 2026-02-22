import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Section from './Section'

const lines = [
  "I'm a CS student who got tired of just studying theory — so I started building.",
  "My focus is on frontend development: the part users actually see and feel.",
  "I care about fundamentals. Clean structure, honest code, real projects over tutorials.",
  "Still early in the journey — but building every day, with intention.",
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="about" style={{ background: 'var(--color-surface)' }}>
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
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

          {/* Right column — quick facts */}
          <div
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
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
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
