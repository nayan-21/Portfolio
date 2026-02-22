import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'

const items = [
  {
    label: 'DSA Consistency',
    detail: 'Solving problems daily — building the habit, not just chasing solutions.',
  },
  {
    label: 'Refining Existing Projects',
    detail: 'Going back to RetailGuard and CareNavigator to clean up code and improve UX.',
  },
  {
    label: 'Core CS Fundamentals',
    detail: 'OS, networking, and system design — the stuff that makes everything else click.',
  },
  {
    label: 'Deeper React Patterns',
    detail: 'Custom hooks, performance optimisation, and state management beyond the basics.',
  },
  {
    label: 'Writing Better Code',
    detail: 'Readability, naming, structure — code that makes sense to a stranger at 2am.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}

const itemVariants = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Learning() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Section id="learning">
      {/* Heading */}
      <div style={{ marginBottom: '3.5rem' }}>
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
          Currently Learning
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
          }}
        >
          Training Arc.
        </h2>
        <div
          style={{
            marginTop: '1rem',
            width: 44,
            height: 3,
            borderRadius: 9999,
            background: 'var(--color-mystic)',
          }}
        />
        <p
          style={{
            marginTop: '1.1rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.97rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
            maxWidth: 480,
          }}
        >
          Not chasing hype. Focused on the things that actually compound.
        </p>
      </div>

      {/* Staggered bullet list */}
      <motion.ul
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0' }}
      >
        {items.map((item, i) => (
          <motion.li
            key={item.label}
            variants={itemVariants}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.25rem',
              padding: '1.4rem 0',
              borderBottom: i < items.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}
          >
            {/* Number */}
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-mystic-light)',
                opacity: 0.6,
                minWidth: 28,
                paddingTop: '3px',
                letterSpacing: '0.05em',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Text */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#fff',
                  margin: '0 0 4px',
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  color: 'var(--color-text-muted)',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {item.detail}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
