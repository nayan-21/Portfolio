/* ─────────────────────────────────────────────────────────────────────────
   Hero — Cinematic Camera Push-In (Option 4)
   – 300vh sticky scroll container drives a pure-CSS 3D effect
   – Text starts small + blurry (far away), rushes toward viewer on scroll
   – Vignette tightens during push-in, fades out as hero exits
   – Stars parallax drift subtly with scroll
──────────────────────────────────────────────────────────────────────────── */
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ── tiny helpers ── */
const lerp   = (a, b, t) => a + (b - a) * t
const clamp  = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const easeOutCubic   = t => 1 - Math.pow(1 - t, 3)
const easeInOutQuad  = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

/* ── Aurora + Particle CSS keyframes ── */
const AURORA_STYLES = `
  @keyframes aurora-drift-1 {
    0%   { transform: translate(0%,    0%)   scale(1);    }
    33%  { transform: translate(8%,   -12%)  scale(1.12); }
    66%  { transform: translate(-6%,   8%)   scale(0.95); }
    100% { transform: translate(0%,    0%)   scale(1);    }
  }
  @keyframes aurora-drift-2 {
    0%   { transform: translate(0%,    0%)   scale(1);    }
    40%  { transform: translate(-10%,  6%)   scale(1.08); }
    70%  { transform: translate(5%,  -10%)   scale(1.15); }
    100% { transform: translate(0%,    0%)   scale(1);    }
  }
  @keyframes aurora-drift-3 {
    0%   { transform: translate(0%,  0%)   scale(1);    }
    50%  { transform: translate(12%, 8%)   scale(0.92); }
    100% { transform: translate(0%,  0%)   scale(1);    }
  }
  @keyframes aurora-drift-4 {
    0%   { transform: translate(0%,    0%)   scale(1);    }
    30%  { transform: translate(-8%,  -6%)   scale(1.1);  }
    60%  { transform: translate(4%,   10%)   scale(0.97); }
    100% { transform: translate(0%,    0%)   scale(1);    }
  }
  @keyframes particle-rise {
    0%   { transform: translateY(0)   translateX(0);    opacity: 0; }
    10%  { opacity: var(--p-op); }
    80%  { opacity: var(--p-op); }
    100% { transform: translateY(-110vh) translateX(var(--p-dx)); opacity: 0; }
  }
  @keyframes _twinkle {
    from { opacity: var(--so); }
    to   { opacity: calc(var(--so) * 0.15); }
  }
`

/* ── Aurora blob definitions — smaller sizes + lower blur for perf ── */
const AURORA_BLOBS = [
  {
    id: 0,
    color: 'radial-gradient(ellipse, rgba(109,40,217,0.6) 0%, rgba(109,40,217,0) 70%)',
    width: '42vw', height: '38vh',
    top: '-5%', left: '-8%',
    animation: 'aurora-drift-1 22s ease-in-out infinite',
    blur: 48,
  },
  {
    id: 1,
    color: 'radial-gradient(ellipse, rgba(14,165,233,0.5) 0%, rgba(14,165,233,0) 68%)',
    width: '38vw', height: '42vh',
    top: '22%', left: '52%',
    animation: 'aurora-drift-2 28s ease-in-out infinite',
    blur: 52,
  },
  {
    id: 2,
    color: 'radial-gradient(ellipse, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0) 66%)',
    width: '32vw', height: '44vh',
    top: '48%', left: '-3%',
    animation: 'aurora-drift-3 19s ease-in-out infinite',
    blur: 44,
  },
  {
    id: 3,
    color: 'radial-gradient(ellipse, rgba(6,182,212,0.35) 0%, rgba(6,182,212,0) 68%)',
    width: '36vw', height: '36vh',
    top: '-12%', left: '60%',
    animation: 'aurora-drift-4 25s ease-in-out infinite',
    blur: 50,
  },
]

/* ── Particle data — 35 particles, no box-shadow for perf ── */
const rnd = (lo, hi) => lo + Math.random() * (hi - lo)
const PARTICLES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left:   `${rnd(2, 98)}%`,
  bottom: `${rnd(-10, 20)}%`,
  size:   rnd(2, 3.5),
  dur:    rnd(10, 22).toFixed(1),
  delay:  rnd(0, 18).toFixed(1),
  op:     rnd(0.3, 0.6).toFixed(2),
  dx:     `${rnd(-30, 30).toFixed(0)}px`,
  hue:    Math.random() > 0.45 ? '0,200,255' : '168,85,247',
}))

/* ── star data (generated once) ── */
const STARS = Array.from({ length: 110 }, (_, i) => ({
  id: i,
  top:    `${Math.random() * 100}%`,
  left:   `${Math.random() * 100}%`,
  size:   Math.random() * 2 + 0.6,
  dur:    (Math.random() * 3 + 1).toFixed(1),
  op:     (Math.random() * 0.45 + 0.1).toFixed(2),
}))

export default function Hero() {
  const stickyRef  = useRef(null)  // the 300vh wrapper
  const rigRef     = useRef(null)  // camera rig (scales/blurs)
  const vigRef     = useRef(null)  // vignette overlay
  const starsRef   = useRef(null)  // star layer
  const hintRef    = useRef(null)  // scroll hint
  const auroraRef  = useRef(null)  // aurora wrapper (parallax)
  const particleRef = useRef(null) // particle wrapper (fade on exit)

  useEffect(() => {
    const rig      = rigRef.current
    const vig      = vigRef.current
    const stars    = starsRef.current
    const hint     = hintRef.current
    const sticky   = stickyRef.current
    const aurora   = auroraRef.current
    const particles = particleRef.current
    if (!rig || !vig || !stars || !hint || !sticky) return

    function onScroll() {
      const scrollY = window.scrollY
      const totalH  = sticky.offsetHeight - window.innerHeight
      if (totalH <= 0) return
      const raw = clamp(scrollY / totalH, 0, 1)

      /* ── Phase 1: push-in (0 → 0.65 of travel) ── */
      const pushT = clamp(raw / 0.65, 0, 1)
      const eased = easeOutCubic(pushT)

      const scale    = lerp(0.30, 1.0, eased)
      const blur     = lerp(12,   0,   eased)
      const opacity  = lerp(0.12, 1.0, eased)

      /* ── Phase 2: overshoot + fade out (0.65 → 1.0) ── */
      const exitT   = clamp((raw - 0.65) / 0.35, 0, 1)
      const exitE   = easeInOutQuad(exitT)

      const finalScale   = lerp(scale,   1.2, exitE)
      const finalBlur    = lerp(blur,    9,   exitE)
      const finalOpacity = lerp(opacity, 0,   exitE)

      rig.style.transform = `scale(${finalScale.toFixed(4)}) translateZ(0)`
      rig.style.filter    = `blur(${finalBlur.toFixed(2)}px)`
      rig.style.opacity   = finalOpacity.toFixed(4)

      /* ── Vignette: tightens on push-in ── */
      const vigStop = lerp(58, 24, eased)
      vig.style.background = `radial-gradient(
        ellipse at center,
        transparent 0%,
        rgba(4,6,14,0.55) ${vigStop.toFixed(1)}%,
        rgba(4,6,14,0.97) 100%
      )`

      /* ── Stars drift outward as camera pushes ── */
      stars.style.transform = `scale(${lerp(1, 1.14, eased).toFixed(4)}) translateZ(0)`
      stars.style.opacity   = lerp(1, 0.25, exitE).toFixed(3)

      /* ── Aurora: slow counter-parallax + fade on exit ── */
      if (aurora) {
        aurora.style.transform = `translateY(${lerp(0, -40, eased).toFixed(1)}px) scale(${lerp(1, 1.08, eased).toFixed(4)})`
        aurora.style.opacity   = lerp(1, 0, exitE).toFixed(3)
      }

      /* ── Particles: fade out with aurora on exit ── */
      if (particles) {
        particles.style.opacity = lerp(1, 0, exitE).toFixed(3)
      }

      /* ── Scroll hint fades quickly ── */
      hint.style.opacity = raw < 0.04 ? '1' : '0'
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // set initial state
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    /* ── 300vh sticky wrapper — provides scroll travel ── */
    <div
      id="home"
      ref={stickyRef}
      style={{ position: 'relative', height: '300vh' }}
    >
      {/* ── Sticky panel — stays fixed during scroll travel ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          background: '#04060e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ── Aurora & Particle styles ── */}
        <style>{AURORA_STYLES}</style>

        {/* ── Layer 0: Aurora blobs ── */}
        <div
          ref={auroraRef}
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
            willChange: 'opacity',
            contain: 'strict',
          }}
        >
          {AURORA_BLOBS.map(blob => (
            <div
              key={blob.id}
              style={{
                position: 'absolute',
                top: blob.top,
                left: blob.left,
                width: blob.width,
                height: blob.height,
                background: blob.color,
                filter: `blur(${blob.blur}px)`,
                animation: blob.animation,
                /* each blob gets its own GPU compositor layer */
                transform: 'translateZ(0)',
                willChange: 'transform',
                pointerEvents: 'none',
              }}
            />
          ))}
        </div>

        {/* ── Layer 1: Stars ── */}
        <div
          ref={starsRef}
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          {STARS.map(s => (
            <span
              key={s.id}
              style={{
                position: 'absolute',
                top: s.top,
                left: s.left,
                width:  s.size,
                height: s.size,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.8)',
                '--so': s.op,
                opacity: s.op,
                animation: `_twinkle ${s.dur}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* ── Layer 2: Floating particles ── */}
        <div
          ref={particleRef}
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            overflow: 'hidden',
            willChange: 'opacity',
            contain: 'strict',
          }}
        >
          {PARTICLES.map(p => (
            <span
              key={p.id}
              style={{
                position: 'absolute',
                left: p.left,
                bottom: p.bottom,
                width:  p.size,
                height: p.size,
                borderRadius: '50%',
                /* no boxShadow — eliminates per-particle GPU overdraw */
                background: `rgba(${p.hue}, ${p.op})`,
                '--p-op': p.op,
                '--p-dx': p.dx,
                animation: `particle-rise ${p.dur}s ease-in infinite`,
                animationDelay: `${p.delay}s`,
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>

        {/* ── Vignette ── */}
        <div
          ref={vigRef}
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            background: `radial-gradient(
              ellipse at center,
              transparent 0%,
              rgba(4,6,14,0.55) 58%,
              rgba(4,6,14,0.97) 100%
            )`,
          }}
        />

        {/* ── Camera Rig — the push-in target ── */}
        <div
          ref={rigRef}
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            textAlign: 'center',
            maxWidth: 760,
            padding: '0 2rem',
            willChange: 'transform, filter, opacity',
            /* initial pushed-away state — JS will animate from here */
            transform: 'scale(0.30) translateZ(0)',
            filter: 'blur(12px)',
            opacity: 0.12,
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-mystic-light)',
              margin: 0,
            }}
          >
            Frontend Developer &nbsp;/&nbsp; CS Student
          </p>

          {/* Name */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3.2rem, 9vw, 6.5rem)',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.0,
              letterSpacing: '-2px',
            }}
          >
            Nayan
          </h1>

          {/* Main line */}
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.15rem, 2.8vw, 1.6rem)',
              fontWeight: 500,
              color: 'var(--color-text)',
              margin: 0,
              lineHeight: 1.35,
              letterSpacing: '-0.3px',
            }}
          >
            "Every developer has an origin story."
          </p>

          {/* Supporting line */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
              color: 'var(--color-text-muted)',
              margin: 0,
              maxWidth: 480,
              lineHeight: 1.75,
            }}
          >
            Mine started with curiosity — pulling things apart to understand how they work,
            then building them better than before.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
            {/* Primary */}
            <a
              href="#projects"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.9rem',
                padding: '13px 30px',
                borderRadius: 9999,
                background: 'var(--color-mystic)',
                color: '#fff',
                textDecoration: 'none',
                transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
                display: 'inline-block',
                boxShadow: '0 0 18px rgba(0,190,255,0.28), 0 0 40px rgba(0,160,220,0.12)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.82'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 0 26px rgba(0,200,255,0.42), 0 0 60px rgba(0,160,220,0.18)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 0 18px rgba(0,190,255,0.28), 0 0 40px rgba(0,160,220,0.12)'
              }}
            >
              View My Work
            </a>

            {/* Ghost */}
            <a
              href="#contact"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.9rem',
                padding: '13px 30px',
                borderRadius: 9999,
                background: 'transparent',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                textDecoration: 'none',
                transition: 'border-color 0.2s, transform 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-mystic)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)';  e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div
          ref={hintRef}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            transition: 'opacity 0.4s',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-text-faint)',
            }}
          >
            Scroll
          </span>
          <motion.div
            style={{
              width: 1,
              height: 36,
              background: 'linear-gradient(to bottom, var(--color-mystic), transparent)',
              borderRadius: 9999,
            }}
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  )
}
