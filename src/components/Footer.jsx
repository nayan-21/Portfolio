export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '2rem 32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
          textAlign: 'center',
        }}
      >
        © {new Date().getFullYear()} Nayan Prajapati. All rights reserved.
      </p>
    </footer>
  )
}
