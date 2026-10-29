export default function WhenBadge({ label }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-0.5"
      style={{
        background: 'rgba(232, 83, 42, 0.08)',
        color: '#E8532A',
        border: '1px solid rgba(232, 83, 42, 0.2)',
      }}
    >
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      {label}
    </span>
  )
}
