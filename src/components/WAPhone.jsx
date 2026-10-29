export default function WAPhone({ children, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <p className="text-xs font-medium" style={{ color: '#64748B' }}>{label}</p>
      )}
      <div
        className="relative rounded-[28px] overflow-hidden shadow-2xl"
        style={{
          width: 220,
          background: '#0B141A',
          border: '2px solid #1E293B',
        }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 pt-2 pb-1"
          style={{ background: '#1F2C38' }}
        >
          <span className="text-[9px] font-semibold" style={{ color: '#94A3B8' }}>9:41</span>
          <div className="flex gap-1 items-center">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="#94A3B8">
              <rect x="0" y="4" width="2" height="4" rx="0.5"/>
              <rect x="2.5" y="2.5" width="2" height="5.5" rx="0.5"/>
              <rect x="5" y="1" width="2" height="7" rx="0.5"/>
              <rect x="7.5" y="0" width="2" height="8" rx="0.5"/>
            </svg>
            <svg width="10" height="8" viewBox="0 0 10 8" fill="#94A3B8">
              <path d="M5 1.5C3.2 1.5 1.6 2.3 0.5 3.5L2 5c0.7-0.8 1.8-1.3 3-1.3s2.3 0.5 3 1.3l1.5-1.5C8.4 2.3 6.8 1.5 5 1.5zM5 4.5c-0.8 0-1.5 0.3-2 0.8L4.3 6.6 5 7.5l0.7-0.9L7 5.3C6.5 4.8 5.8 4.5 5 4.5z"/>
            </svg>
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
              <rect x="0.5" y="0.5" width="13" height="7" rx="1.5" stroke="#94A3B8"/>
              <rect x="14" y="2.5" width="1.5" height="3" rx="0.75" fill="#94A3B8"/>
              <rect x="1.5" y="1.5" width="9" height="5" rx="0.75" fill="#94A3B8"/>
            </svg>
          </div>
        </div>

        {/* Phone content */}
        <div style={{ minHeight: 360 }}>
          {children}
        </div>

        {/* Home bar */}
        <div
          className="flex justify-center py-2"
          style={{ background: '#0B141A' }}
        >
          <div className="rounded-full" style={{ width: 48, height: 3, background: '#334155' }}/>
        </div>
      </div>
    </div>
  )
}
