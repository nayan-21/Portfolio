export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '2rem 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          color: 'var(--color-text-faint)',
          margin: 0,
        }}
      >
        © {new Date().getFullYear()} Nayan. Built with React & Tailwind.
      </p>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {['GitHub', 'LinkedIn', 'Twitter'].map(link => (
          <a
            key={link}
            href="#"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              color: 'var(--color-text-faint)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.target.style.color = 'var(--color-mystic-light)')}
            onMouseLeave={e => (e.target.style.color = 'var(--color-text-faint)')}
          >
            {link}
          </a>
        ))}
      </div>
    </footer>
  )
}
