import { useState, useEffect } from 'react'
import { WA_ASSESSMENT } from '../../data/constants'

export default function WAQuickAssessment() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="rounded-2xl rounded-tl-sm mx-3 my-1 overflow-hidden msg-enter"
      style={{
        background: '#FFFFFF',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      }}
    >
      {/* Header */}
      <div
        className="px-3 py-2 flex items-center gap-2"
        style={{ background: 'linear-gradient(135deg, #00A884, #25D1A2)' }}
      >
        <span style={{ fontSize: 14 }}>📊</span>
        <div>
          <p className="text-xs font-bold text-white">Quick assessment</p>
          <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.8)' }}>Arjun's puzzle results</p>
        </div>
      </div>

      {/* Scores */}
      <div className="px-3 py-2 flex flex-col gap-2">
        {WA_ASSESSMENT.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[10px] font-semibold" style={{ color: '#334155' }}>
                {item.label}
              </span>
              <span className="text-[10px] font-bold tabular-nums" style={{ color: '#00A884' }}>
                {item.score}/10
              </span>
            </div>
            {/* Bar */}
            <div className="rounded-full overflow-hidden" style={{ height: 5, background: '#F1F5F9' }}>
              <div
                className="h-full rounded-full score-fill transition-all duration-700"
                style={{
                  width: animated ? `${item.score * 10}%` : '0%',
                  transitionDelay: `${i * 120}ms`,
                }}
              />
            </div>
            <p className="text-[9px] mt-0.5" style={{ color: '#94A3B8' }}>{item.note}</p>
          </div>
        ))}
      </div>

      <div className="px-3 pb-1.5">
        <span className="text-[9px]" style={{ color: '#94A3B8' }}>10:08 AM</span>
      </div>
    </div>
  )
}
