import Section from './Section'
import SectionHeading from './SectionHeading'

export default function Contact() {
  return (
    <Section id="contact" style={{ background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: 600 }}>
        <SectionHeading
          label="Contact"
          title="Let's work together."
          subtitle="Whether you have a project in mind, a question, or just want to say hi — my inbox is always open."
        />
      </div>

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          maxWidth: 560,
        }}
        onSubmit={e => e.preventDefault()}
      >
        {/* Name + Email row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {['Name', 'Email'].map(f => (
            <div key={f} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {f}
              </label>
              <input
                type={f === 'Email' ? 'email' : 'text'}
                placeholder={f === 'Email' ? 'you@example.com' : 'Your name'}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  outline: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
        </div>

        {/* Message */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Message
          </label>
          <textarea
            rows={5}
            placeholder="Tell me about your project..."
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              padding: '11px 14px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              outline: 'none',
              resize: 'vertical',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            fontWeight: 600,
            padding: '13px 32px',
            borderRadius: 9999,
            background: 'var(--color-mystic)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            alignSelf: 'flex-start',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.target.style.opacity = 0.8)}
          onMouseLeave={e => (e.target.style.opacity = 1)}
        >
          Send Message
        </button>
      </form>
    </Section>
  )
}
