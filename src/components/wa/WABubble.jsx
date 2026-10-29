export default function WABubble({ msg, onPuzzleTap, puzzleDone }) {
  const isOwn = false // all are inbound in this flow

  if (msg.isPuzzleLink) {
    return (
      <div className="flex justify-start px-3 py-1 msg-enter">
        <div
          className="rounded-2xl rounded-tl-sm overflow-hidden cursor-pointer transition-all active:scale-98"
          style={{
            background: '#FFFFFF',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            maxWidth: '80%',
          }}
          onClick={!puzzleDone ? onPuzzleTap : undefined}
        >
          {/* Puzzle card header */}
          <div
            className="px-3 py-2 flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #E8532A)' }}
          >
            <div
              className="rounded-lg flex items-center justify-center"
              style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)' }}
            >
              <span style={{ fontSize: 16 }}>🧩</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white">{msg.text}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>{msg.subtext}</p>
            </div>
          </div>
          {/* Tap hint */}
          <div className="px-3 py-1.5 flex items-center justify-between">
            <span className="text-xs font-medium" style={{ color: puzzleDone ? '#00A884' : '#7C3AED' }}>
              {puzzleDone ? 'Completed!' : 'Tap to solve'}
            </span>
            {puzzleDone ? (
              <span style={{ color: '#00A884', fontSize: 12 }}>&#10003;</span>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            )}
          </div>
          <div className="px-3 pb-1">
            <span className="text-[9px]" style={{ color: '#94A3B8' }}>{msg.time}</span>
          </div>
        </div>
      </div>
    )
  }

  if (msg.isResult) {
    return (
      <div className="flex justify-start px-3 py-1 msg-enter">
        <div
          className="rounded-2xl rounded-tl-sm px-3 py-2"
          style={{
            background: '#E8F5E9',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            maxWidth: '82%',
            borderLeft: '3px solid #00A884',
          }}
        >
          <p className="text-xs leading-relaxed" style={{ color: '#1B5E20' }}>{msg.text}</p>
          <p className="text-[9px] mt-1 text-right" style={{ color: '#94A3B8' }}>{msg.time}</p>
        </div>
      </div>
    )
  }

  if (msg.isMeta) {
    return (
      <div className="flex flex-col items-center gap-1 px-3 py-2 msg-enter">
        <div
          className="text-center text-[10px] px-2 py-0.5 rounded-full"
          style={{ background: '#D9FDD3', color: '#1B5E20' }}
        >
          Friday, Nov 2
        </div>
        <div className="flex justify-start w-full">
          <div
            className="rounded-2xl rounded-tl-sm px-3 py-2"
            style={{
              background: '#FFFFFF',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              maxWidth: '82%',
            }}
          >
            <p className="text-xs leading-relaxed" style={{ color: '#1A2836' }}>{msg.text}</p>
            <p className="text-[9px] mt-1 text-right" style={{ color: '#94A3B8' }}>{msg.time}</p>
          </div>
        </div>
      </div>
    )
  }

  // default
  return (
    <div className="flex justify-start px-3 py-1 msg-enter">
      <div
        className="rounded-2xl rounded-tl-sm px-3 py-2"
        style={{
          background: '#FFFFFF',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          maxWidth: '82%',
        }}
      >
        <p className="text-xs leading-relaxed" style={{ color: '#1A2836' }}>{msg.text}</p>
        <p className="text-[9px] mt-1 text-right" style={{ color: '#94A3B8' }}>{msg.time}</p>
      </div>
    </div>
  )
}
