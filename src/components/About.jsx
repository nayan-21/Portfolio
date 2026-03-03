import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Section from './Section'

/* ── Terminal lines — command + output pairs ── */
const TERMINAL_LINES = [
  { type: 'cmd',  text: 'whoami' },
  { type: 'out',  text: 'Nayan — ICT Student & Software Developer' },
  { type: 'cmd',  text: 'cat about.txt' },
  { type: 'out',  text: "I got tired of just studying theory — so I started building real software." },
  { type: 'out',  text: "I enjoy understanding how systems work end-to-end." },
  { type: 'cmd',  text: 'ls skills/' },
  { type: 'out',  text: 'DSA   MERN   ' },
  // { type: 'out',  text: 'React   Node.js   Express   MongoDB' },
  // { type: 'out',  text: 'DSA   OOP' },
  { type: 'cmd',  text: 'cat highlights.txt' },
  { type: 'out',  text: '↳ Participated in a hackathon with CareNavigator' },
  { type: 'out',  text: '↳ Built this portfolio from scratch' },
  { type: 'out',  text: '↳ Consistently building and improving projects' },
  { type: 'cmd',  text: 'echo $status' },
  { type: 'out',  text: 'Open to internships & collabs ✅' },
]

const CHAR_SPEED_CMD = 38   // ms per char for commands
const CHAR_SPEED_OUT = 12   // ms per char for output
const LINE_PAUSE     = 280  // ms pause between lines

/* ── Typewriter hook ── */
function useTypewriter(lines, active) {
  const [rendered, setRendered] = useState([])   // fully completed lines
  const [current, setCurrent]   = useState('')   // line being typed
  const [lineIdx, setLineIdx]   = useState(0)
  const [charIdx, setCharIdx]   = useState(0)
  const [done, setDone]         = useState(false)

  useEffect(() => {
    if (!active || done) return
    if (lineIdx >= lines.length) { setDone(true); return }

    const line = lines[lineIdx]
    const speed = line.type === 'cmd' ? CHAR_SPEED_CMD : CHAR_SPEED_OUT

    if (charIdx < line.text.length) {
      const t = setTimeout(() => {
        setCurrent(prev => prev + line.text[charIdx])
        setCharIdx(c => c + 1)
      }, speed)
      return () => clearTimeout(t)
    } else {
      // line finished — push to rendered, move on
      const t = setTimeout(() => {
        setRendered(prev => [...prev, { type: line.type, text: line.text }])
        setCurrent('')
        setCharIdx(0)
        setLineIdx(i => i + 1)
      }, LINE_PAUSE)
      return () => clearTimeout(t)
    }
  }, [active, lineIdx, charIdx, done, lines])

  return { rendered, current, currentType: lines[lineIdx]?.type, done }
}

/* ── Deadpool animation styles ── */
const DP_STYLES = `
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
    .dp-char { animation: none !important; }
  }

  /* blinking cursor */
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  .term-cursor {
    display: inline-block;
    width: 8px;
    height: 1em;
    background: #00c8ff;
    margin-left: 2px;
    vertical-align: text-bottom;
    animation: blink 1s step-start infinite;
  }
  @media (max-width: 768px) {
    .dp-char { display: none !important; }
    .about-info-card { overflow: hidden !important; padding-top: 1.5rem !important; }
  }
`

export default function About() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { rendered, current, currentType, done } = useTypewriter(TERMINAL_LINES, isInView)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const onMq = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onMq)
    return () => mq.removeEventListener('change', onMq)
  }, [])

  return (
    <Section id="about" style={{ background: 'var(--color-surface)' }}>
      <style>{DP_STYLES}</style>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 36 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Heading block */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-mystic-light)',
            marginBottom: '0.65rem',
          }}>
            About Me
          </p>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.15,
          }}>
            Where it all began.
          </h2>
          <div style={{
            marginTop: '1rem',
            width: 44,
            height: 3,
            borderRadius: 9999,
            background: 'var(--color-mystic)',
          }} />
        </div>

        {/* Content — two-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">

          {/* ── LEFT: Terminal window ── */}
          <div style={{
            background: '#0b0d17',
            border: '1px solid rgba(0,200,255,0.18)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 0 40px -10px rgba(0,200,255,0.08), 0 8px 32px rgba(0,0,0,0.5)',
            fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
          }}>
            {/* Title bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              background: '#141620',
              borderBottom: '1px solid rgba(0,200,255,0.1)',
            }}>
              {/* Traffic lights */}
              {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
                <span key={i} style={{
                  width: 12, height: 12,
                  borderRadius: '50%',
                  background: c,
                  display: 'inline-block',
                  opacity: 0.85,
                }} />
              ))}
              <span style={{
                marginLeft: 'auto',
                fontSize: '0.68rem',
                color: 'rgba(0,200,255,0.4)',
                letterSpacing: '0.12em',
              }}>
                nayan@portfolio: ~
              </span>
            </div>

            {/* Terminal body */}
            <div style={{
              padding: '1.2rem 1.4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              minHeight: '260px',
            }}>
              {/* Completed lines */}
              {rendered.map((line, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '0.5rem',
                  fontSize: '0.82rem',
                  lineHeight: 1.7,
                  color: line.type === 'cmd' ? '#e8e6f0' : 'rgba(0,200,255,0.75)',
                }}>
                  {line.type === 'cmd' && (
                    <span style={{ color: '#28c840', flexShrink: 0 }}>$</span>
                  )}
                  {line.type === 'out' && (
                    <span style={{ color: 'rgba(0,200,255,0.3)', flexShrink: 0 }}>{'>'}</span>
                  )}
                  <span>{line.text}</span>
                </div>
              ))}

              {/* Currently typing line */}
              {!done && current !== undefined && (
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  fontSize: '0.82rem',
                  lineHeight: 1.7,
                  color: currentType === 'cmd' ? '#e8e6f0' : 'rgba(0,200,255,0.75)',
                }}>
                  {currentType === 'cmd' && (
                    <span style={{ color: '#28c840', flexShrink: 0 }}>$</span>
                  )}
                  {currentType === 'out' && (
                    <span style={{ color: 'rgba(0,200,255,0.3)', flexShrink: 0 }}>{'>'}</span>
                  )}
                  <span>
                    {current}
                    <span className="term-cursor" />
                  </span>
                </div>
              )}

              {/* Idle cursor after all done */}
              {done && (
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  fontSize: '0.82rem',
                  lineHeight: 1.7,
                  color: '#e8e6f0',
                  marginTop: '0.25rem',
                }}>
                  <span style={{ color: '#28c840' }}>$</span>
                  <span className="term-cursor" />
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Info card with Deadpool ── */}
          <div>
            <div
              className="about-info-card"
              style={{
              position: 'relative',
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              overflow: 'visible',
            }}
            >
              {[
                { label: 'Degree',    value: 'B.E — Information & Communication Technology' },
                { label: 'Focus',     value: 'Software Development & Problem Solving' },
                { label: 'Currently', value: 'Building, learning, shipping' },
                { label: 'Open to',   value: 'Internships & Entry-Level Roles' },
              ].map(item => (
                <div key={item.label}>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-mystic-light)',
                    margin: '0 0 4px',
                  }}>
                    {item.label}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.97rem',
                    color: 'var(--color-text)',
                    margin: 0,
                  }}>
                    {item.value}
                  </p>
                </div>
              ))}

              {/* ── Deadpool — unchanged ── */}
              <img
                className="dp-char"
                src="/deadpool_new.png"
                alt="Deadpool sitting on the card reading"
                draggable={false}
                style={{
                  display: isMobile ? 'none' : 'block',
                  position: 'absolute',
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
