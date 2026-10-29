import { useState, useEffect } from 'react'
import { IconPhone, IconPhoneOff } from './icons'

export default function PhoneCallScreen({ autoStart = false, onEnd }) {
  const [callState, setCallState] = useState('ringing') // ringing | connected | ended
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (autoStart) {
      const t = setTimeout(() => setCallState('connected'), 2400)
      return () => clearTimeout(t)
    }
  }, [autoStart])

  useEffect(() => {
    if (callState === 'connected') {
      const interval = setInterval(() => setDuration(d => d + 1), 1000)
      return () => clearInterval(interval)
    }
  }, [callState])

  function fmt(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  function handleAnswer() {
    setCallState('connected')
  }

  function handleEnd() {
    setCallState('ended')
    if (onEnd) onEnd()
  }

  return (
    <div
      className="flex flex-col items-center justify-between py-6 px-4 screen-enter"
      style={{ minHeight: 360, background: '#1A1A2E' }}
    >
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-medium mb-1" style={{ color: '#94A3B8' }}>
          {callState === 'ringing' ? 'Incoming call' : callState === 'connected' ? 'Connected' : 'Call ended'}
        </p>
        <p className="text-lg font-semibold" style={{ color: '#F1F5F9' }}>
          Bhanzu Support
        </p>
        {callState === 'connected' && (
          <p className="text-sm mt-0.5 tabular-nums" style={{ color: '#00A884' }}>
            {fmt(duration)}
          </p>
        )}
        {callState === 'ended' && (
          <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>
            Duration: {fmt(duration)}
          </p>
        )}
      </div>

      {/* Avatar */}
      <div className="relative flex items-center justify-center">
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: 80,
            height: 80,
            background: 'linear-gradient(135deg, #7C3AED, #E8532A)',
          }}
        >
          <span className="text-2xl font-black text-white">B</span>
        </div>
        {callState === 'ringing' && (
          <div
            className="absolute inset-0 rounded-full ring-pulse"
            style={{ border: '2px solid rgba(0,168,132,0.5)' }}
          />
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-6 items-center">
        {callState === 'ringing' && (
          <>
            <button
              onClick={handleEnd}
              className="rounded-full flex items-center justify-center transition-transform active:scale-95"
              style={{ width: 56, height: 56, background: '#EF4444' }}
            >
              <span style={{ color: '#FFFFFF' }}><IconPhoneOff /></span>
            </button>
            <button
              onClick={handleAnswer}
              className="rounded-full flex items-center justify-center transition-transform active:scale-95"
              style={{ width: 56, height: 56, background: '#00A884' }}
            >
              <span style={{ color: '#FFFFFF' }}><IconPhone /></span>
            </button>
          </>
        )}
        {callState === 'connected' && (
          <button
            onClick={handleEnd}
            className="rounded-full flex items-center justify-center transition-transform active:scale-95"
            style={{ width: 56, height: 56, background: '#EF4444' }}
          >
            <span style={{ color: '#FFFFFF' }}><IconPhoneOff /></span>
          </button>
        )}
        {callState === 'ended' && (
          <div
            className="rounded-full flex items-center justify-center"
            style={{ width: 56, height: 56, background: '#1E293B' }}
          >
            <span style={{ color: '#64748B' }}><IconPhoneOff /></span>
          </div>
        )}
      </div>
    </div>
  )
}
