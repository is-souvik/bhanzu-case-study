function IconChat() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

function IconPuzzle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function IconBarChart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  )
}

const JOURNEY_STEPS = [
  { icon: <IconChat />, label: 'Book', sub: 'Free demo class', color: '#E8532A' },
  { icon: <IconPuzzle />, label: 'Puzzle', sub: 'WA thread + math puzzle', color: '#7C3AED' },
  { icon: <IconCheck />, label: 'Remind', sub: '3 timed reminders', color: '#00A884' },
  { icon: <IconBarChart />, label: 'Rescue', sub: 'AI call for no-shows', color: '#E8532A' },
]

export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md flex flex-col items-center gap-8 screen-enter">

        {/* Badge */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: 'rgba(232, 83, 42, 0.08)',
            color: '#E8532A',
            border: '1px solid rgba(232, 83, 42, 0.2)',
          }}
        >
          <span style={{ fontSize: 12 }}>📋</span>
          Growth PM Case Study
        </div>

        {/* Headline */}
        <div className="text-center flex flex-col gap-3">
          <h1
            className="text-3xl font-black leading-tight tracking-tight"
            style={{ color: '#0F172A' }}
          >
            How Bhanzu turns a{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #E8532A, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              free demo booking
            </span>{' '}
            into a paying student
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
            A walkthrough of the 4-step growth loop: booking, WhatsApp puzzle, timed reminders, and AI-driven no-show recovery.
          </p>
        </div>

        {/* Journey strip */}
        <div
          className="w-full rounded-2xl p-4 card-surface"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          <div className="flex justify-between items-start">
            {JOURNEY_STEPS.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                {/* Icon circle */}
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    background: `${s.color}14`,
                    color: s.color,
                    border: `1.5px solid ${s.color}30`,
                  }}
                >
                  {s.icon}
                </div>
                <p className="text-[10px] font-bold text-center" style={{ color: '#0F172A' }}>{s.label}</p>
                <p className="text-[9px] text-center" style={{ color: '#94A3B8' }}>{s.sub}</p>

                {/* Connector */}
                {i < JOURNEY_STEPS.length - 1 && (
                  <div
                    className="absolute"
                    style={{
                      width: 1,
                      height: 1,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Progress line */}
          <div
            className="h-0.5 mt-3 rounded-full"
            style={{ background: 'linear-gradient(90deg, #E8532A, #7C3AED, #00A884, #E8532A)' }}
          />
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="px-8 py-3.5 rounded-full font-bold text-base transition-all orange-glow"
          style={{ background: '#E8532A', color: '#FFFFFF' }}
        >
          Walk me through it
        </button>

        {/* Footer strip */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs" style={{ color: '#94A3B8' }}>Built by</span>
          <span className="text-xs font-semibold" style={{ color: '#64748B' }}>Souvik Biswas</span>
          <span className="text-xs" style={{ color: '#CBD5E1' }}>·</span>
          <span className="text-xs" style={{ color: '#94A3B8' }}>Growth PM application for Bhanzu</span>
        </div>

      </div>
    </div>
  )
}
