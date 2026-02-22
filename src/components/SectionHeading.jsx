/* ─── SectionHeading ─────────────────────────────────────────────────────── */
/*  Consistent heading + accent bar for every section.                        */

export default function SectionHeading({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: '3.5rem' }}>
      {/* Eyebrow label */}
      {label && (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-mystic-light)',
            marginBottom: '0.75rem',
          }}
        >
          {label}
        </p>
      )}

      {/* Title */}
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          color: '#fff',
          margin: 0,
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>

      {/* Accent bar */}
      <div
        style={{
          marginTop: '1rem',
          width: 48,
          height: 3,
          borderRadius: 9999,
          background: 'var(--color-mystic)',
        }}
      />

      {/* Optional subtitle */}
      {subtitle && (
        <p
          style={{
            marginTop: '1.25rem',
            maxWidth: 560,
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
