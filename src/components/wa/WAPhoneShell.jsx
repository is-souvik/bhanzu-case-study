import { useRef, useEffect } from 'react'

export default function WAPhoneShell({ children, contactName = 'Bhanzu' }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  })

  return (
    <div
      className="rounded-[28px] overflow-hidden shadow-2xl"
      style={{
        width: 260,
        border: '2px solid #1E293B',
        background: '#ECE5DD',
      }}
    >
      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 pt-2 pb-1"
        style={{ background: '#1A2836' }}
      >
        <span className="text-[9px] font-semibold" style={{ color: '#94A3B8' }}>9:41</span>
        <div className="flex gap-1 items-center">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="#94A3B8">
            <rect x="0" y="4" width="2" height="4" rx="0.5"/>
            <rect x="2.5" y="2.5" width="2" height="5.5" rx="0.5"/>
            <rect x="5" y="1" width="2" height="7" rx="0.5"/>
            <rect x="7.5" y="0" width="2" height="8" rx="0.5"/>
          </svg>
          <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
            <rect x="0.5" y="0.5" width="13" height="7" rx="1.5" stroke="#94A3B8"/>
            <rect x="14" y="2.5" width="1.5" height="3" rx="0.75" fill="#94A3B8"/>
            <rect x="1.5" y="1.5" width="9" height="5" rx="0.75" fill="#94A3B8"/>
          </svg>
        </div>
      </div>

      {/* WA Header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: '#1A2836' }}
      >
        {/* Back arrow */}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        {/* Avatar */}
        <div
          className="rounded-full flex items-center justify-center shrink-0"
          style={{ width: 28, height: 28, background: 'linear-gradient(135deg, #00A884, #128C7E)' }}
        >
          <span className="text-[10px] font-bold text-white">B</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold truncate" style={{ color: '#F1F5F9' }}>
            {contactName}
          </p>
          <p className="text-[9px]" style={{ color: '#94A3B8' }}>online</p>
        </div>
        {/* Call icon */}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#94A3B8">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </div>

      {/* Chat area */}
      <div
        ref={scrollRef}
        className="phone-scroll overflow-y-auto py-2"
        style={{ minHeight: 300, maxHeight: 360, background: '#ECE5DD' }}
      >
        {/* Date chip */}
        <div className="flex justify-center mb-2">
          <span
            className="text-[9px] px-2 py-0.5 rounded-full"
            style={{ background: '#D9FDD3', color: '#1B5E20' }}
          >
            Saturday, Nov 3
          </span>
        </div>

        {children}
      </div>

      {/* Input bar */}
      <div
        className="flex items-center gap-2 px-2 py-2"
        style={{ background: '#1A2836' }}
      >
        <div
          className="flex-1 rounded-full px-3 py-1.5 text-[10px]"
          style={{ background: '#2D3748', color: '#64748B' }}
        >
          Message
        </div>
        <div
          className="rounded-full flex items-center justify-center shrink-0"
          style={{ width: 28, height: 28, background: '#00A884' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFFFFF">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
          </svg>
        </div>
      </div>

      {/* Home bar */}
      <div className="flex justify-center py-1.5" style={{ background: '#0B141A' }}>
        <div className="rounded-full" style={{ width: 40, height: 3, background: '#334155' }}/>
      </div>
    </div>
  )
}
