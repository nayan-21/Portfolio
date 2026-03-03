import { useRef, useState, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Section from './Section'

const projects = [
  {
    title: 'EduSafe',
    hackathon: true,
    objective: 'Create a role-based disaster awareness and safety platform for students, teachers, and administrators.',
    approach: 'Built a JWT-authenticated web app with three user roles. Students access disaster modules with videos, notes, and quizzes, report incidents with live location, share experiences via story mode, and compete on leaderboards. Teachers monitor reports in real time; admins manage modules and quizzes dynamically.',
    tech: ['React', 'Node.js', 'JWT', 'Tailwind CSS', 'Maps API', 'REST API'],
    outcome: 'Delivered a secure, scalable learning and reporting system demonstrating strong frontend architecture, role-based access control, and real-world feature design.',
    live: 'https://sih-frontend-one-mu.vercel.app/',
    github: 'https://github.com/nayan-21/SIH',
  },
  {
    title: 'CareNavigator',
    hackathon: true,
    objective: 'Help patients quickly find the right care pathway without sifting through noise.',
    approach: 'Designed the full frontend and integrated an LLM-powered recommendation system via REST API.',
    tech: ['React', 'Node.js', 'LangChain', 'PostgreSQL', 'Tailwind CSS'],
    outcome: 'Delivered a working prototype; sharpened my understanding of AI + UI integration.',
    live: 'https://care-navigator-client.vercel.app/',
    github: 'https://github.com/nayan-21/CareNavigator',
  },
  {
    title: 'RetailGuard',
    hackathon: true,
    objective: 'Detect shoplifting and anomalous behaviour in retail stores in real time.',
    approach: 'Built a live camera-feed analysis pipeline using Python and OpenCV, wired to a React dashboard.',
    tech: ['Python', 'FastAPI', 'OpenCV', 'React', 'WebSocket'],
    outcome: 'Reduced manual monitoring load in a simulated demo; placed at hackathon.',
    live: null,
    github: 'https://github.com/nayan-21/HackTheSpring',
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

/* ── 3D Tilt Card wrapper ── */
function TiltCard({ children, style, className }) {
  const cardRef = useRef(null)

  /* raw mouse position as fraction: -0.5 → +0.5 */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  /* spring config — snappy but smooth */
  const springCfg = { stiffness: 260, damping: 28 }
  const springX = useSpring(rawX, springCfg)
  const springY = useSpring(rawY, springCfg)

  /* map -0.5→0.5 to ±10deg tilt */
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10])
  const rotateX = useTransform(springY, [-0.5, 0.5], [ 10, -10])

  /* gloss position (%) follows mouse */
  const glossX = useTransform(springX, [-0.5, 0.5], [20, 80])
  const glossY = useTransform(springY, [-0.5, 0.5], [20, 80])

  /* gloss opacity: 0 at rest, 0.18 when hovered */
  const [hovered, setHovered] = useState(false)

  const onMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5)
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }, [rawX, rawY])

  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
    setHovered(false)
  }, [rawX, rawY])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        ...style,
        position: 'relative',
        perspective: '900px',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={className}
      >
        {children}

        {/* Gloss overlay — radial gradient following mouse */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
            background: useTransform(
              [glossX, glossY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 65%)`
            ),
            zIndex: 10,
          }}
        />
      </motion.div>
    </motion.div>
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
      style={{ position: 'relative' }}
    >

      {/* 3D Tilt wrapper */}
      <TiltCard>
        {/* Card inner */}
        <div
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

          {/* Title + hackathon badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
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
            {project.hackathon && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.35)',
                borderRadius: 9999,
                padding: '3px 10px',
                boxShadow: '0 0 10px rgba(245,158,11,0.15)',
              }}>
                Hackathon
              </span>
            )}
          </div>

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
        <div className="flex flex-row md:flex-col gap-3 md:items-end w-full md:w-auto pt-1 mt-2 md:mt-0" style={{ position: 'relative', zIndex: 20 }}>
          {project.live && <ProjectButton href={project.live} label="Live" Icon={IconExternalLink} />}
          <ProjectButton href={project.github} label="GitHub" Icon={IconGithub} />
        </div>
        </div>
      </TiltCard>
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
        cursor: 'pointer',
        position: 'relative',
        zIndex: 20,
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
  const sectionRef = useRef(null)

  return (
    <Section
      id="projects"
      style={{ background: 'var(--color-surface)', position: 'relative' }}
      sectionRef={sectionRef}
    >

      {/* Heading */}
      <div style={{ marginBottom: '3.5rem', position: 'relative' }}>
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

      {/* ── Coming Soon Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginTop: '2.5rem', position: 'relative', borderRadius: 16 }}
      >
        {/* Gradient glow backdrop */}
        <div aria-hidden style={{
          position: 'absolute', inset: -1,
          borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(124,58,237,0.6) 0%, rgba(159,103,255,0.3) 50%, rgba(124,58,237,0.6) 100%)',
          filter: 'blur(1px)',
          zIndex: 0,
        }} />

        {/* Inner card */}
        <div style={{
          position: 'relative', zIndex: 1,
          borderRadius: 15,
          padding: '2.5rem 3rem',
          background: 'linear-gradient(135deg, rgba(20,14,40,0.97) 0%, rgba(30,18,60,0.97) 100%)',
          textAlign: 'center',
          overflow: 'hidden',
        }}>

          {/* Subtle dot-grid texture */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(124,58,237,0.18) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
          }} />

          {/* Corner glow orbs */}
          <div aria-hidden style={{ position:'absolute', top:-60, left:-60, width:180, height:180, borderRadius:'50%', background:'rgba(124,58,237,0.12)', filter:'blur(40px)', pointerEvents:'none' }} />
          <div aria-hidden style={{ position:'absolute', bottom:-60, right:-60, width:180, height:180, borderRadius:'50%', background:'rgba(159,103,255,0.1)', filter:'blur(40px)', pointerEvents:'none' }} />

          {/* Status pill */}
          <div style={{ display:'flex', justifyContent:'center', marginBottom:'1.25rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              padding: '5px 14px',
              borderRadius: 9999,
              border: '1px solid rgba(124,58,237,0.55)',
              background: 'rgba(124,58,237,0.15)',
              fontFamily: "'JetBrains Mono','Fira Code',monospace",
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'var(--color-mystic-light)',
              textTransform: 'uppercase',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#9f67ff',
                boxShadow: '0 0 10px rgba(159,103,255,1)',
                animation: 'pulse 1.6s ease-in-out infinite',
              }} />
              Actively Building
            </span>
          </div>

          {/* Main text */}
          <p style={{
            position: 'relative', zIndex: 1,
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
            fontWeight: 700,
            color: '#fff',
            margin: '0 auto',
            display: 'block',
          }}>
            More polished, production-ready projects are{' '}
            <span style={{ color: 'var(--color-mystic-light)' }}>actively being built</span>{' '}
            and will be added soon.
          </p>

        </div>
      </motion.div>
    </Section>
  )
}
