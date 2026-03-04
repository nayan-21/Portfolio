
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'


const ARC_STYLES = `
  @keyframes arc-glow-pulse {
    0%, 100% { box-shadow: 0 0 8px rgba(124,58,237,0.4); }
    50%       { box-shadow: 0 0 20px rgba(124,58,237,0.75); }
  }
  @keyframes bar-fill {
    from { width: 0; }
    to   { width: var(--fill-w); }
  }
  .arc-dot {
    animation: arc-glow-pulse 2.8s ease-in-out infinite;
  }
  .hud-card-glow:hover {
    border-color: rgba(124,58,237,0.55) !important;
    background: rgba(124,58,237,0.07) !important;
    box-shadow: 0 0 24px rgba(124,58,237,0.12);
  }
`


const PHASES = [
  {
    phase: '01',
    title: 'Foundation',
    detail: 'Java, OOP, and DSA — learning how to think in code and build problem-solving fundamentals.',
  },
  {
    phase: '02',
    title: 'Full Stack',
    detail: 'Building end-to-end applications using React, Node.js, Express, MongoDB, and REST APIs.',
  },
  {
    phase: '03',
    title: 'Building',
    detail: 'Hackathon-based projects solving real-world problems, focusing on rapid development, teamwork, and practical execution.',
  },
  {
    phase: '04',
    title: 'Present',
    detail: 'Grinding DSA in Java, writing cleaner code, and polishing projects for production-ready deployment.',
  },
]


const SKILLS = [
  { icon: '🧩', title: 'DSA (Java)',              category: 'PROBLEM SOLVING', fill: 60 },
  { icon: '⚛',  title: 'React Patterns',           category: 'FRONTEND',        fill: 78 },
  { icon: '🗄️',  title: 'SQL & Databases',          category: 'BACKEND',         fill: 65 },
  { icon: '🧠', title: 'Core CS Fundamentals',     category: 'FUNDAMENTALS',    fill: 57 },
  { icon: '🌐', title: 'REST APIs & Auth',          category: 'BACKEND',         fill: 70 },
  { icon: '🎯',  title: 'Clean Code Practices',     category: 'CRAFT',           fill: 58 },
]


function TimelineDot({ isInView, delay }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      className="arc-dot"
      style={{
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: 'var(--color-mystic)',
        border: '2px solid var(--color-mystic-light)',
        flexShrink: 0,
        position: 'relative',
        zIndex: 2,
      }}
    />
  )
}


function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isMobile
}


function PhaseCard({ phase, index, isInView }) {
  const isMobile = useIsMobile()
  const isRight = !isMobile && index % 2 === 0

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        position: 'relative',
        flexDirection: isRight ? 'row' : 'row-reverse',
      }}
    >
      
      <motion.div
        initial={{ opacity: 0, x: isMobile ? 0 : (isRight ? -32 : 32), y: isMobile ? 20 : 0 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        style={{
          flex: 1,
          padding: '1rem 1.25rem',
          background: 'var(--color-surface)',
          border: '1px solid rgba(124,58,237,0.18)',
          borderRadius: 10,
          position: 'relative',
        }}
      >
        
        <p
          style={{
            fontFamily: "'JetBrains Mono','Fira Code',monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            color: 'var(--color-mystic-light)',
            margin: '0 0 6px',
          }}
        >
          [ PHASE {phase.phase} ]
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            fontWeight: 700,
            color: '#fff',
            margin: '0 0 6px',
          }}
        >
          {phase.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.88rem',
            color: 'var(--color-text-muted)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {phase.detail}
        </p>

        
        {!isMobile && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              [isRight ? 'right' : 'left']: -8,
              width: 0,
              height: 0,
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              [isRight ? 'borderLeft' : 'borderRight']: '8px solid rgba(124,58,237,0.18)',
            }}
          />
        )}
      </motion.div>

      
      <TimelineDot isInView={isInView} delay={0.1 + index * 0.12} />

      
      {!isMobile && <div style={{ flex: 1 }} />}
    </div>
  )
}


function HudSkillCard({ skill, index, isInView }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="hud-card-glow"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '1.25rem 1.35rem',
        background: 'rgba(124,58,237,0.03)',
        border: '1px solid rgba(124,58,237,0.18)',
        borderRadius: 8,
        transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
      }}
    >
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{skill.icon}</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono','Fira Code',monospace",
            fontSize: '0.5rem',
            letterSpacing: '0.2em',
            color: hov ? 'var(--color-mystic-light)' : 'rgba(124,58,237,0.5)',
            border: `1px solid ${hov ? 'rgba(124,58,237,0.5)' : 'rgba(124,58,237,0.2)'}`,
            borderRadius: 4,
            padding: '2px 6px',
            transition: 'color 0.25s, border-color 0.25s',
          }}
        >
          [ {skill.category} ]
        </span>
      </div>

      
      <p
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: '#fff',
          margin: '0 0 0.75rem',
        }}
      >
        {skill.title}
      </p>

      
      <div
        style={{
          height: 3,
          borderRadius: 9999,
          background: 'rgba(124,58,237,0.12)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.fill}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: 0.4 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%',
            borderRadius: 9999,
            background: 'linear-gradient(to right, var(--color-mystic), var(--color-mystic-light))',
            boxShadow: '0 0 8px rgba(124,58,237,0.4)',
          }}
        />
      </div>
    </motion.div>
  )
}


export default function Learning() {
  const timelineRef = useRef(null)
  const cardsRef    = useRef(null)
  const isMobile    = useIsMobile()
  const timelineInView = useInView(timelineRef, { once: true, margin: '-60px' })
  const cardsInView    = useInView(cardsRef,    { once: true, margin: '-60px' })

  return (
    <Section id="learning">
      <style>{ARC_STYLES}</style>

      
      <div style={{ marginBottom: '4rem' }}>
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
          Not chasing hype. Building the things that actually compound.
        </p>
      </div>

      
      <div ref={timelineRef} style={{ marginBottom: '5rem' }}>
        
        <p
          style={{
            fontFamily: "'JetBrains Mono','Fira Code',monospace",
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            color: 'rgba(124,58,237,0.55)',
            marginBottom: '2.5rem',
          }}
        >
          // THE ARC SO FAR
        </p>

        
        <div style={{ position: 'relative' }}>

          
          <motion.div
            initial={{ scaleY: 0 }}
            animate={timelineInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              left: isMobile ? '13px' : '50%',
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, transparent, var(--color-mystic) 15%, var(--color-mystic-light) 85%, transparent)',
              transform: isMobile ? 'none' : 'translateX(-50%)',
              transformOrigin: 'top center',
              boxShadow: '0 0 12px rgba(124,58,237,0.35)',
            }}
          />

          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {PHASES.map((phase, i) => (
              <PhaseCard
                key={phase.phase}
                phase={phase}
                index={i}
                isInView={timelineInView}
              />
            ))}
          </div>
        </div>
      </div>

      
      <div ref={cardsRef}>
        
        <p
          style={{
            fontFamily: "'JetBrains Mono','Fira Code',monospace",
            fontSize: '0.9rem',
            letterSpacing: '0.22em',
            color: 'rgba(124,58,237,0.85)',
            marginBottom: '2rem',
            fontWeight: 600,
          }}
        >
          // CURRENTLY TRAINING
        </p>

        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {SKILLS.map((skill, i) => (
            <HudSkillCard
              key={skill.title}
              skill={skill}
              index={i}
              isInView={cardsInView}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
