import { useRef, useState, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import Section from './Section'

/* ── SVG icons ── */
function IconMail() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function IconGithub() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function IconLinkedin() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const links = [
  {
    id: 'email',
    label: 'Email',
    sub: 'nayan@example.com',
    href: 'mailto:nayan@example.com',
    Icon: IconMail,
  },
  {
    id: 'github',
    label: 'GitHub',
    sub: 'github.com/nayan-21',
    href: 'https://github.com/nayan-21',
    Icon: IconGithub,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    sub: 'linkedin.com/in/nayan',
    href: 'https://linkedin.com/in/nayan',
    Icon: IconLinkedin,
  },
]

/* ── MagnetLink — cursor magnet on the icon only ── */
function MagnetLink({ link, index, isInView }) {
  const iconRef = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 180, damping: 14, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 180, damping: 14, mass: 0.6 })

  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    const rect = iconRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawX.set((e.clientX - cx) * 0.35)
    rawY.set((e.clientY - cy) * 0.35)
  }, [rawX, rawY])

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
    setHovered(false)
  }, [rawX, rawY])

  return (
    <motion.a
      href={link.href}
      target={link.id !== 'email' ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        padding: '1.35rem 1.5rem',
        borderRadius: '12px',
        border: `1px solid ${hovered ? 'rgba(124,58,237,0.55)' : 'var(--color-border)'}`,
        background: hovered ? 'rgba(124,58,237,0.06)' : 'transparent',
        textDecoration: 'none',
        transition: 'border-color 0.2s, background 0.2s',
        cursor: 'pointer',
      }}
    >
      {/* Icon wrapper — only this moves with the magnet */}
      <motion.div
        ref={iconRef}
        style={{
          x,
          y,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
          borderRadius: '10px',
          background: hovered ? 'rgba(124,58,237,0.18)' : 'var(--color-surface-2)',
          color: hovered ? 'var(--color-mystic-light)' : 'var(--color-text-muted)',
          transition: 'background 0.2s, color 0.2s',
          flexShrink: 0,
        }}
      >
        <link.Icon />
      </motion.div>

      {/* Text — stays completely still */}
      <div>
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.05rem',
          fontWeight: 600,
          color: hovered ? '#fff' : 'var(--color-text)',
          margin: '0 0 2px',
          transition: 'color 0.2s',
        }}>
          {link.label}
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          color: 'var(--color-text-muted)',
          margin: 0,
        }}>
          {link.sub}
        </p>
      </div>

      {/* Arrow — right side */}
      <svg
        style={{
          marginLeft: 'auto',
          color: hovered ? 'var(--color-mystic-light)' : 'var(--color-border)',
          transition: 'color 0.2s, transform 0.2s',
          transform: hovered ? 'translateX(3px)' : 'translateX(0)',
          flexShrink: 0,
        }}
        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </motion.a>
  )
}

/* ── Contact section ── */
export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Section id="contact" style={{ background: 'var(--color-surface)' }}>
      <div
        ref={ref}
        style={{
          maxWidth: 600,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-mystic-light)',
            marginBottom: '0.65rem',
          }}>
            Contact
          </p>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 0.5rem',
          }}>
            Send the Signal.
          </h2>
          <div style={{
            width: 44,
            height: 3,
            borderRadius: 9999,
            background: 'var(--color-mystic)',
            margin: '0.9rem auto 1.25rem',
          }} />
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.05rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.7,
            margin: 0,
          }}>
            Let&apos;s build something together.
          </p>
        </motion.div>

        {/* Link cards — full width, staggered in */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}>
          {links.map((link, i) => (
            <MagnetLink key={link.id} link={link} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </Section>
  )
}
