import Section from './Section'
import SectionHeading from './SectionHeading'

const items = [
  { name: 'Rust',           reason: 'Systems-level performance in web tooling' },
  { name: 'Three.js / R3F', reason: 'Immersive 3-D web experiences' },
  { name: 'Kubernetes',     reason: 'Container orchestration at scale' },
  { name: 'Solidity',       reason: 'Smart contract fundamentals' },
  { name: 'Elixir',         reason: 'Fault-tolerant concurrent systems' },
]

export default function Learning() {
  return (
    <Section id="learning">
      <SectionHeading
        label="Currently Learning"
        title="What's on my workbench."
        subtitle="Technologies I'm actively exploring, broken down by my motivation for each."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map((item, i) => (
          <div
            key={item.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.75rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--color-mystic-light)',
                minWidth: 28,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#fff',
                  margin: 0,
                }}
              >
                {item.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)',
                  margin: '2px 0 0',
                }}
              >
                {item.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
