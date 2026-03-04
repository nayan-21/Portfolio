
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'
import Section from './Section'

const FORMSPREE_ID = 'mgoljbzw'


const HUD_STYLES = `
  @keyframes hud-scan {
    0%   { top: -4px;   opacity: 0; }
    5%   { opacity: 1; }
    95%  { opacity: 1; }
    100% { top: 103%;  opacity: 0; }
  }
  @keyframes hud-pulse-ring {
    0%, 100% { opacity: 0.12; transform: scale(1); }
    50%       { opacity: 0.22; transform: scale(1.06); }
  }
  @keyframes hud-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes hud-corner-glow {
    0%, 100% { box-shadow: 0 0 6px rgba(0,200,255,0.3); }
    50%       { box-shadow: 0 0 14px rgba(0,200,255,0.6); }
  }

  .hud-scanline {
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(to right, transparent, rgba(0,200,255,0.35), transparent);
    animation: hud-scan 4.5s ease-in-out infinite;
    pointer-events: none;
    z-index: 10;
  }

  .hud-ring {
    animation: hud-pulse-ring 3s ease-in-out infinite;
  }

  .hud-status-dot {
    animation: hud-blink 2s step-start infinite;
  }

  .hud-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(0,200,255,0.25);
    outline: none;
    width: 100%;
    padding: 10px 0 8px;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.88rem;
    color: #e8e6f0;
    transition: border-color 0.25s;
    caret-color: #00c8ff;
  }
  .hud-input::placeholder { color: rgba(0,200,255,0.25); }
  .hud-input:focus { border-bottom-color: rgba(0,200,255,0.85); }

  .hud-textarea {
    resize: none;
    min-height: 90px;
  }

  /* Corner brackets */
  .hud-corner {
    position: absolute;
    width: 16px; height: 16px;
    border-color: rgba(0,200,255,0.6);
    border-style: solid;
    animation: hud-corner-glow 3s ease-in-out infinite;
  }
  .hud-corner-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
  .hud-corner-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
  .hud-corner-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
  .hud-corner-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
`


function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
function IconGithub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}
function IconLinkedin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { id: 'email',    label: 'EMAIL',    val: 'try.nayanprajapati@gmail.com', href: 'mailto:try.nayanprajapati@gmail.com', Icon: IconMail     },
  { id: 'github',   label: 'GITHUB',   val: 'github.com/nayan-21',     href: 'https://github.com/nayan-21',       Icon: IconGithub   },
  { id: 'linkedin', label: 'LINKEDIN', val: 'linkedin.com/in/nayan-prajapati', href: 'https://www.linkedin.com/in/nayan-prajapati-a83888284/', Icon: IconLinkedin },
]


function HudField({ label, id, name, type = 'text', placeholder, textarea, value, onChange }) {
  const [focused, setFocused] = useState(false)
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "'JetBrains Mono','Fira Code',monospace",
          fontSize: '0.62rem',
          letterSpacing: '0.18em',
          color: focused ? 'rgba(0,200,255,0.9)' : 'rgba(0,200,255,0.45)',
          transition: 'color 0.25s',
          userSelect: 'none',
        }}
      >
        [ {label} ]
      </label>
      <Tag
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`hud-input${textarea ? ' hud-textarea' : ''}`}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={textarea ? 4 : undefined}
      />
    </div>
  )
}


function SocialRow({ link, index, isInView }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.a
      href={link.href}
      target={link.id !== 'email' ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.6 + index * 0.1 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        padding: '0.65rem 0.9rem',
        textDecoration: 'none',
        border: `1px solid ${hov ? 'rgba(0,200,255,0.45)' : 'rgba(0,200,255,0.12)'}`,
        borderRadius: '4px',
        background: hov ? 'rgba(0,200,255,0.05)' : 'transparent',
        transition: 'border-color 0.2s, background 0.2s',
        flex: 1,
      }}
    >
      <span style={{ color: hov ? '#00c8ff' : 'rgba(0,200,255,0.5)', transition: 'color 0.2s' }}>
        <link.Icon />
      </span>
      <div>
        <p style={{
          fontFamily: "'JetBrains Mono','Fira Code',monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.16em',
          color: 'rgba(0,200,255,0.45)',
          margin: '0 0 1px',
        }}>{link.label}</p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.82rem',
          color: hov ? '#fff' : 'var(--color-text-muted)',
          margin: 0,
          transition: 'color 0.2s',
        }}>{link.val}</p>
      </div>
      <svg style={{ marginLeft: 'auto', color: hov ? '#00c8ff' : 'rgba(0,200,255,0.2)', transition: 'color 0.2s, transform 0.2s', transform: hov ? 'translateX(3px)' : 'none' }}
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </motion.a>
  )
}


function HexGrid() {
  return (
    <svg
      aria-hidden
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.045, pointerEvents: 'none' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hex" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
          <polygon points="28,2 52,14 52,38 28,50 4,38 4,14" fill="none" stroke="#00c8ff" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  )
}


export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const [formspreeState, handleSubmit] = useForm(FORMSPREE_ID)
  const succeeded = formspreeState.succeeded
  const submitting = formspreeState.submitting

  return (
    <Section id="contact" style={{ background: '#04060e', position: 'relative', overflow: 'hidden' }}>
      <style>{HUD_STYLES}</style>

      
      <HexGrid />

      
      <div aria-hidden style={{ position: 'absolute', top: '50%', right: '-120px', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        {[220, 310, 400].map((size, i) => (
          <div key={i} className="hud-ring" style={{
            position: 'absolute',
            width: size, height: size,
            borderRadius: '50%',
            border: '1px solid rgba(0,200,255,0.12)',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            animationDelay: `${i * 0.8}s`,
          }} />
        ))}
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto' }}
      >
        
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{
            fontFamily: "'JetBrains Mono','Fira Code',monospace",
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            color: 'rgba(0,200,255,0.5)',
            marginBottom: '0.5rem',
          }}>
            // ESTABLISH CONTACT
          </p>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 0.5rem',
            lineHeight: 1.1,
          }}>
            Send the Signal.
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.75rem' }}>
            <span className="hud-status-dot" style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#28c840', display: 'inline-block',
              boxShadow: '0 0 8px rgba(40,200,64,0.7)',
            }} />
            <span style={{
              fontFamily: "'JetBrains Mono','Fira Code',monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.16em',
              color: 'rgba(40,200,64,0.8)',
            }}>
              SYSTEM ONLINE — READY TO RECEIVE
            </span>
          </div>
        </div>

        
        <div style={{ position: 'relative', marginBottom: '1.75rem' }}>
          
          <span className="hud-corner hud-corner-tl" />
          <span className="hud-corner hud-corner-tr" />
          <span className="hud-corner hud-corner-bl" />
          <span className="hud-corner hud-corner-br" />

          
          <div className="hud-scanline" />

          <form
            onSubmit={handleSubmit}
            style={{
              background: 'rgba(0,200,255,0.025)',
              border: '1px solid rgba(0,200,255,0.12)',
              borderRadius: '6px',
              padding: '2rem 2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.6rem',
            }}
          >
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HudField id="hud-name"  name="name"    label="CALLSIGN"     placeholder="Your name"       />
              <HudField id="hud-email" name="email"   label="FREQUENCY"    placeholder="your@email.com"  type="email" />
            </div>

            
            <HudField id="hud-msg" name="message" label="TRANSMISSION" placeholder="What's the mission?" textarea />

            
            <ValidationError prefix="Email" field="email" errors={formspreeState.errors}
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: '#ff6b6b', marginTop: '-0.5rem' }} />
            <ValidationError prefix="Message" field="message" errors={formspreeState.errors}
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: '#ff6b6b', marginTop: '-0.5rem' }} />

            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                disabled={submitting || succeeded}
                style={{
                  fontFamily: "'JetBrains Mono','Fira Code',monospace",
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  padding: '12px 28px',
                  borderRadius: '4px',
                  border: succeeded
                    ? '1px solid rgba(40,200,64,0.6)'
                    : '1px solid rgba(0,200,255,0.55)',
                  background: succeeded
                    ? 'rgba(40,200,64,0.1)'
                    : 'rgba(0,200,255,0.08)',
                  color: succeeded ? '#28c840' : '#00c8ff',
                  cursor: submitting || succeeded ? 'default' : 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: !submitting && !succeeded
                    ? '0 0 18px rgba(0,200,255,0.12), inset 0 0 12px rgba(0,200,255,0.04)'
                    : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {!submitting && !succeeded && '▶  TRANSMIT MESSAGE'}
                {submitting                && '⟳  TRANSMITTING...'}
                {succeeded                 && '✓  MESSAGE SENT'}

                
                {submitting && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.8, ease: 'linear' }}
                    style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: 2,
                      background: 'linear-gradient(to right, transparent, #00c8ff)',
                      transformOrigin: 'left center',
                    }}
                  />
                )}
              </button>
            </div>
          </form>
        </div>

        
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {SOCIAL_LINKS.map((l, i) => (
            <SocialRow key={l.id} link={l} index={i} isInView={isInView} />
          ))}
        </div>
      </motion.div>
    </Section>
  )
}
