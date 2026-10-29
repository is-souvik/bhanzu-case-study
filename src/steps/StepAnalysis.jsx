import StepHeader from '../components/StepHeader'
import Divider from '../components/Divider'

const FUNNEL = [
  {
    label: 'Demo booked',
    pct: 100,
    note: 'Baseline — paid or organic lead completes booking form',
    color: '#E8532A',
    bar: 1,
  },
  {
    label: 'WA thread opened',
    pct: 85,
    note: 'WhatsApp open rates are high; the puzzle link creates curiosity',
    color: '#7C3AED',
    bar: 0.85,
  },
  {
    label: 'Puzzle attempted',
    pct: 45,
    note: 'Biggest drop — novelty fades, parents are busy, no explicit ask',
    color: '#F59E0B',
    bar: 0.45,
    gap: true,
  },
  {
    label: 'Demo attended',
    pct: 52,
    note: 'Industry benchmark: 50–70% no-show on free EdTech demos',
    color: '#00A884',
    bar: 0.52,
    gap: true,
  },
  {
    label: 'Rescheduled after no-show',
    pct: 22,
    note: 'AI call conversion on cold outreach; 2-in-10 is the ceiling without incentive',
    color: '#64748B',
    bar: 0.22,
    gap: true,
  },
]

const BETS = [
  {
    icon: '🎯',
    title: 'Puzzle result → teacher brief',
    hypothesis: 'The puzzle is the only pre-class signal Bhanzu collects about the child. Right now that signal is unused. Auto-generate a 2-line brief the teacher sees before the demo: "Arjun solved the Grade 5 sequence in 38 seconds. Start harder." Turns engagement data into demo quality signal.',
    impact: 'Higher demo quality → higher trial-to-paid conversion',
    effort: 'Low',
  },
  {
    icon: '📞',
    title: 'Dynamic slots in the AI call',
    hypothesis: "The current AI call offers 2 fixed slots. Parents who miss class have a reason -- they're busy. Offering the next 3 available slots in their timezone (pulled live from availability) reduces the 'I'll do it later' drop. Small change, testable in 2 weeks.",
    impact: 'Reschedule conversion: 22% → ~32%',
    effort: 'Medium',
  },
  {
    icon: '🌐',
    title: 'Language as acquisition signal',
    hypothesis: "Language preference is treated as a UX choice, not a data point. Track show-up rate and trial-to-paid rate by preferred language. If Tamil parents show up at 70% vs Hindi at 48%, that's a targeting signal for paid acquisition -- not just a reminder personalization.",
    impact: 'CAC reduction on highest-converting segments',
    effort: 'Low',
  },
]

const METRICS = [
  {
    label: 'Puzzle completion rate',
    target: '>60%',
    current: '~45% est.',
    color: '#7C3AED',
    note: 'Primary signal of pre-class intent',
  },
  {
    label: 'Demo-to-attended rate',
    target: '>65%',
    current: '~52% est.',
    color: '#E8532A',
    note: 'Core growth lever — 1pp here = 3-5pp on trial conversion',
  },
  {
    label: 'AI call reschedule rate',
    target: '>30%',
    current: '~22% est.',
    color: '#00A884',
    note: 'Ceiling without dynamic slots or incentive',
  },
  {
    label: 'Show-up delta by language',
    target: '<10pp gap',
    current: 'Not tracked',
    color: '#F59E0B',
    note: 'Acquisition targeting and CX quality signal',
  },
]

export default function StepAnalysis() {
  return (
    <div className="flex flex-col gap-6">
      <StepHeader
        step={5}
        title="Where the funnel breaks"
        description="My read on the drop-offs, what I'd change, and what I'd track. Numbers are estimates based on EdTech industry benchmarks."
      />

      <Divider />

      {/* Funnel */}
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-bold mb-2" style={{ color: '#0F172A' }}>Estimated funnel</p>
        {FUNNEL.map((stage, i) => (
          <div key={i} className="flex flex-col gap-1">
            {stage.gap && (
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-lg"
                style={{ background: 'rgba(239,68,68,0.06)', border: '1px dashed #FCA5A5' }}
              >
                <span style={{ fontSize: 10 }}>⚠️</span>
                <p className="text-[10px] font-medium" style={{ color: '#DC2626' }}>drop-off</p>
              </div>
            )}
            <div
              className="p-3 rounded-xl"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-semibold" style={{ color: '#0F172A' }}>{stage.label}</p>
                <span
                  className="text-xs font-black px-2 py-0.5 rounded-full"
                  style={{ background: `${stage.color}14`, color: stage.color }}
                >
                  {stage.pct}%
                </span>
              </div>
              {/* Bar */}
              <div className="h-1.5 rounded-full mb-1.5" style={{ background: '#F1F5F9' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${stage.bar * 100}%`, background: stage.color }}
                />
              </div>
              <p className="text-[10px] leading-relaxed" style={{ color: '#94A3B8' }}>{stage.note}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* My bets */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold" style={{ color: '#0F172A' }}>3 things I'd change</p>
        {BETS.map((bet, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl flex flex-col gap-2"
            style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 18 }}>{bet.icon}</span>
              <p className="text-sm font-bold" style={{ color: '#0F172A' }}>{bet.title}</p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>{bet.hypothesis}</p>
            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <div
                className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold"
                style={{ background: 'rgba(0,168,132,0.08)', color: '#00A884' }}
              >
                <span>↑</span> {bet.impact}
              </div>
              <div
                className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold"
                style={{ background: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}
              >
                Effort: {bet.effort}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* Metrics */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold" style={{ color: '#0F172A' }}>4 metrics I'd track from day one</p>
        <div className="grid grid-cols-2 gap-2">
          {METRICS.map((m, i) => (
            <div
              key={i}
              className="p-3 rounded-xl flex flex-col gap-1.5"
              style={{ background: '#FFFFFF', border: `1.5px solid ${m.color}22` }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: m.color }}
              />
              <p className="text-[11px] font-bold leading-tight" style={{ color: '#0F172A' }}>{m.label}</p>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-medium" style={{ color: '#94A3B8' }}>NOW</span>
                  <span className="text-[10px] font-semibold" style={{ color: '#64748B' }}>{m.current}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-medium" style={{ color: '#94A3B8' }}>TARGET</span>
                  <span className="text-[10px] font-bold" style={{ color: m.color }}>{m.target}</span>
                </div>
              </div>
              <p className="text-[9px] leading-relaxed" style={{ color: '#94A3B8' }}>{m.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div
        className="p-3 rounded-xl"
        style={{ background: '#FAFAFA', border: '1px solid #E2E8F0' }}
      >
        <p className="text-[10px] leading-relaxed" style={{ color: '#94A3B8' }}>
          Funnel estimates based on EdTech industry benchmarks and public conversion data. Actual Bhanzu numbers would sharpen these significantly -- the hypotheses hold at order-of-magnitude level.
        </p>
      </div>
    </div>
  )
}
