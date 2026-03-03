/* ─── Section helper ─────────────────────────────────────────────────────── */
/*  Wrap each section in this to get consistent spacing + max-width.         */

const SECTION_STYLES = `
  .section-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px;
  }
  @media (max-width: 640px) {
    .section-inner { padding: 0 20px; }
    .section-wrap  { padding: 64px 0 !important; }
  }
`

export default function Section({ id, children, style = {}, sectionRef }) {
  return (
    <section
      id={id}
      ref={sectionRef}
      className="section-wrap"
      style={{
        width: '100%',
        padding: '96px 0',
        ...style,
      }}
    >
      <style>{SECTION_STYLES}</style>
      <div className="section-inner">
        {children}
      </div>
    </section>
  )
}
