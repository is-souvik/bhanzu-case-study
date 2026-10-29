export default function StepHeader({ step, title, description }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-bold tracking-wider uppercase"
          style={{ color: '#E8532A' }}
        >
          Step {step}
        </span>
      </div>
      <h2 className="text-xl font-bold leading-snug" style={{ color: '#0F172A' }}>
        {title}
      </h2>
      {description && (
        <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
          {description}
        </p>
      )}
    </div>
  )
}
