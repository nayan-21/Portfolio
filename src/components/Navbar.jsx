import { useState, useEffect } from 'react'

const links = [
  { label: 'Home',      href: '#home' },
  { label: 'About',     href: '#about' },
  { label: 'Skills',    href: '#skills' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Contact',   href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const onMq = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onMq)
    return () => mq.removeEventListener('change', onMq)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.3s, border-color 0.3s, padding 0.3s',
        background: scrolled ? 'rgba(13,13,16,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        padding: scrolled ? '14px 0' : '22px 0',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        
        <nav
          className={undefined}
          style={{ display: isMobile ? 'none' : 'flex', gap: '2rem', alignItems: 'center' }}
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.target.style.color = '#fff')}
              onMouseLeave={e => (e.target.style.color = 'var(--color-text-muted)')}
            >
              {l.label}
            </a>
          ))}

        </nav>

        
        <button
          style={{ display: isMobile ? 'flex' : 'none',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-text)', flexDirection: 'column',
            gap: 5, padding: 4, marginLeft: 'auto',
          }}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 24,
                height: 2,
                background: menuOpen && i === 1 ? 'transparent' : 'var(--color-text)',
                borderRadius: 2,
                transition: 'transform 0.2s, opacity 0.2s',
                transform:
                  menuOpen
                    ? i === 0
                      ? 'rotate(45deg) translate(5px, 5px)'
                      : i === 2
                      ? 'rotate(-45deg) translate(5px, -5px)'
                      : 'none'
                    : 'none',
              }}
            />
          ))}
        </button>
      </div>

      
      {menuOpen && (
        <div
          style={{
            background: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'var(--color-text)',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
