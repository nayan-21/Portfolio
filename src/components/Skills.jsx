import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'

const groups = [
  {
    category: 'Programming & CS',
    skills: [
      { name: 'Java (DSA)',               icon: '☕' },
      { name: 'Python',                   icon: '🐍' },
      { name: 'SQL',                      icon: '🗄️' },
      { name: 'Data Structures & Algo',   icon: '🧩' },
      { name: 'OOP Concepts',             icon: '📦' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML & CSS',       icon: '</>' },
      { name: 'JavaScript',       icon: 'JS' },
      { name: 'React',            icon: '⚛️' },
      { name: 'Tailwind CSS',     icon: '💨' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js',          icon: '🟢' },
      { name: 'Express.js',       icon: '⚡' },
      { name: 'REST APIs',        icon: '🔗' },
      { name: 'JWT',              icon: '🔐' },
      { name: 'MongoDB',          icon: '🍃' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git & GitHub',     icon: null, svg: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ) },
      { name: 'VS Code',          icon: '🔷' },
      { name: 'Postman',          icon: '📮' },
      { name: 'npm / pnpm',       icon: '📦' },
      { name: 'Figma',            icon: '🎨' },
    ],
  },
]



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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {skill.svg ?? skill.icon}
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
