import StepHeader from '../components/StepHeader'
import Divider from '../components/Divider'
import { IconCheck } from '../components/icons'

const TIMELINE = [
  { step: 1, label: 'Booking', detail: 'Parent books free demo on bhanzu.com', color: '#E8532A' },
  { step: 2, label: 'WA puzzle', detail: 'Instant confirmation + embedded puzzle in thread', color: '#7C3AED' },
  { step: 3, label: 'Reminders', detail: '3 timed reminders in parent\'s language', color: '#00A884' },
  { step: 4, label: 'AI call', detail: 'AI reschedules no-shows within 5 minutes', color: '#E8532A' },
]

const CONCLUSION_CARDS = [
  {
    icon: '🎯',
    title: 'What this demonstrates',
    body: 'A growth loop where the product experience starts at the point of acquisition -- the puzzle in Step 2 isn\'t a gimmick, it\'s the first moment the teacher learns who the student is. That shifts the demo from a sales call into a personalised first class.',
  },
  {
    icon: '🔧',
    title: 'The problem being solved',
    body: 'Demo no-show rates at EdTech companies typically run 30-50%. Each no-show is a paid lead that converts at near-zero. The reminder + AI call stack is the structural fix: it addresses the gap between intent (booking) and action (showing up).',
  },
  {
    icon: '📈',
    title: 'The key metric being improved',
    body: 'Demo-to-attended rate. Every percentage point here flows directly into trial-to-paid conversion, since attended demos convert at 3-5x the rate of no-shows. This stack is designed to move that number without adding headcount.',
  },
]

export default function StepEnd({ onRestart }) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeader
        step={5}
        title="The full picture"
        description="From booking to class-day, here's the complete flow Bhanzu runs on every new lead."
      />

      <Divider />

      {/* Timeline */}
      <div className="relative flex flex-col gap-0">
        {TIMELINE.map((item, i) => (
          <div key={i} className="flex gap-3">
            {/* Left: dot + line */}
            <div className="flex flex-col items-center" style={{ width: 32 }}>
              <div
                className="rounded-full flex items-center justify-center shrink-0 z-10"
                style={{
                  width: 32,
                  height: 32,
                  background: item.color,
                  boxShadow: `0 0 0 4px ${item.color}22`,
                }}
              >
                <span style={{ color: '#FFFFFF' }}><IconCheck size={12} /></span>
              </div>
              {i < TIMELINE.length - 1 && (
                <div
                  className="flex-1 mt-1"
                  style={{ width: 2, background: '#E2E8F0', minHeight: 24 }}
                />
              )}
            </div>

            {/* Right: content */}
            <div className="pb-5 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-black" style={{ color: item.color }}>
                  Step {item.step}
                </span>
                <span className="text-sm font-bold" style={{ color: '#0F172A' }}>
                  {item.label}
                </span>
              </div>
              <p className="text-xs" style={{ color: '#64748B' }}>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* 3-part conclusion */}
      <div className="flex flex-col gap-3">
        {CONCLUSION_CARDS.map((card, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl fade-in"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              animationDelay: `${i * 120}ms`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span style={{ fontSize: 18 }}>{card.icon}</span>
              <p className="text-sm font-bold" style={{ color: '#0F172A' }}>{card.title}</p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>{card.body}</p>
          </div>
        ))}
      </div>

      <Divider />

      {/* Footer */}
      <div className="flex flex-col items-center gap-3 py-2">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: '#F0FDF4', color: '#166534', border: '1px solid #86EFAC' }}
        >
          <IconCheck size={10} />
          Case study complete
        </div>

        <p className="text-xs text-center" style={{ color: '#94A3B8' }}>
          Built by Souvik Biswas
        </p>

        <button
          onClick={onRestart}
          className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all"
          style={{
            background: '#F8FAFC',
            color: '#0F172A',
            border: '1.5px solid #E2E8F0',
          }}
        >
          Start over
        </button>
      </div>
    </div>
  )
}
