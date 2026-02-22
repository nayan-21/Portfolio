/* ─── Section helper ─────────────────────────────────────────────────────── */
/*  Wrap each section in this to get consistent spacing + max-width.         */

export default function Section({ id, children, style = {} }) {
  return (
    <section
      id={id}
      style={{
        width: '100%',
        padding: '96px 0',
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 32px',
        }}
      >
        {children}
      </div>
    </section>
  )
}
