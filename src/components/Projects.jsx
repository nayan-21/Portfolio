import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'

const projects = [
  {
    title: 'RetailGuard',
    objective: 'Detect shoplifting and anomalous behaviour in retail stores in real time.',
    approach: 'Built a live camera-feed analysis pipeline using Python and OpenCV, wired to a React dashboard.',
    tech: ['Python', 'FastAPI', 'OpenCV', 'React', 'WebSocket'],
    outcome: 'Reduced manual monitoring load in a simulated demo; placed at hackathon.',
    live: '#',
    github: '#',
  },
  {
    title: 'CareNavigator',
    objective: 'Help patients quickly find the right care pathway without sifting through noise.',
    approach: 'Designed the full frontend and integrated an LLM-powered recommendation system via REST API.',
    tech: ['React', 'Node.js', 'LangChain', 'PostgreSQL', 'Tailwind CSS'],
    outcome: 'Delivered a working prototype; sharpened my understanding of AI + UI integration.',
    live: '#',
    github: '#',
  },
  {
    title: 'This Portfolio',
    objective: 'A portfolio that actually reflects how I think about code and design.',
    approach: 'Built from scratch with React + Tailwind CSS; used Framer Motion for intentional, physics-aware animation.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    outcome: 'Learned to balance motion with restraint — clarity beats theatrics.',
    live: '#',
    github: '#',
  },
]

/* ── Icons (inline SVG to avoid lucide dependency issues) ── */
function IconExternalLink({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function IconGithub({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="flex flex-col md:grid md:grid-cols-[1fr_auto] gap-6 items-start p-6 md:p-9"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '14px',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(124,58,237,0.55)'
        e.currentTarget.style.boxShadow = '0 0 32px -8px rgba(124,58,237,0.22)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Left — content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.35rem',
            fontWeight: 700,
            color: '#fff',
            margin: 0,
          }}
        >
          {project.title}
        </h3>

        {/* Fields */}
        {[
          { label: 'Objective', value: project.objective },
          { label: 'Approach',  value: project.approach  },
          { label: 'Outcome',   value: project.outcome   },
        ].map(f => (
          <div key={f.label} style={{ display: 'flex', gap: '0.6rem', alignItems: 'baseline' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-mystic-light)',
                flexShrink: 0,
                paddingTop: '2px',
              }}
            >
              {f.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
              }}
            >
              {f.value}
            </span>
          </div>
        ))}

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
          {project.tech.map(t => (
            <span
              key={t}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 500,
                padding: '3px 11px',
                borderRadius: 9999,
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.22)',
                color: 'var(--color-mystic-light)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Right — buttons, stacked vertically */}
      <div className="flex flex-row md:flex-col gap-3 md:items-end w-full md:w-auto pt-1 mt-2 md:mt-0">
        <ProjectButton href={project.live}  label="Live"    Icon={IconExternalLink} />
        <ProjectButton href={project.github} label="GitHub" Icon={IconGithub}       />
      </div>
    </motion.div>
  )
}

/* Button component — gold icon only on hover */
function ProjectButton({ href, label, Icon }) {
  const [hovered, setHovered] = useToggle()

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.82rem',
        fontWeight: 600,
        padding: '7px 14px',
        borderRadius: 8,
        border: `1px solid ${hovered ? 'rgba(124,58,237,0.5)' : 'var(--color-border)'}`,
        background: hovered ? 'rgba(124,58,237,0.08)' : 'transparent',
        color: hovered ? '#fff' : 'var(--color-text-muted)',
        textDecoration: 'none',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Icon turns gold on hover */}
      <Icon color={hovered ? 'var(--color-gold)' : 'currentColor'} />
      {label}
    </a>
  )
}

/* Tiny hook for hover toggle */
function useToggle() {
  return useState(false)
}

export default function Projects() {
  return (
    <Section id="projects" style={{ background: 'var(--color-surface)' }}>
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
          Projects
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
          Missions Completed.
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

      {/* Vertically stacked project cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
