import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'

const groups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React',          icon: '⚛' },
      { name: 'JavaScript',     icon: 'JS' },
      { name: 'Tailwind CSS',   icon: '🎨' },
      { name: 'HTML & CSS',     icon: '🖋' },
      { name: 'Framer Motion',  icon: '✦' },
      { name: 'Vite',           icon: '⚡' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js',        icon: '🔧' },
      { name: 'REST APIs',      icon: '🔗' },
      { name: 'Python (basics)',icon: '🐍' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git & GitHub',   icon: '🔀' },
      { name: 'VS Code',        icon: '🖥' },
      { name: 'Figma',          icon: '▲' },
      { name: 'npm / pnpm',     icon: '📦' },
    ],
  },
]

/* Animation variants */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function SkillCard({ skill }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.875rem 1.1rem',
        borderRadius: '10px',
        border: '1px solid rgba(124, 58, 237, 0.2)',
        background: 'var(--color-bg)',
        cursor: 'default',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1rem',
          lineHeight: 1,
          minWidth: 20,
          textAlign: 'center',
          color: 'var(--color-mystic-light)',
          flexShrink: 0,
        }}
      >
        {skill.icon}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.92rem',
          fontWeight: 500,
          color: 'var(--color-text)',
        }}
      >
        {skill.name}
      </span>
    </motion.div>
  )
}

function SkillGroup({ group, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref}>
      {/* Group label */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-mystic-light)',
          marginBottom: '1rem',
        }}
      >
        {group.category}
      </p>

      {/* Staggered card grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4"
      >
        {group.skills.map(skill => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  return (
    <Section id="skills">
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
          Skills
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
          Abilities &amp; Tools.
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
      </div>

      {/* Skill groups stacked vertically with a divider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {groups.map((group, i) => (
          <div key={group.category}>
            <SkillGroup group={group} index={i} />
            {i < groups.length - 1 && (
              <div
                style={{
                  marginTop: '3rem',
                  height: 1,
                  background: 'var(--color-border)',
                  opacity: 0.5,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
