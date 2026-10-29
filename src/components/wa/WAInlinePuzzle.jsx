import { useState, useEffect, useRef } from 'react'
import { WA_SEQUENCE, WA_ANSWER, WA_TIMER_SECONDS } from '../../data/constants'
import SequenceStrip from '../SequenceStrip'

export default function WAInlinePuzzle({ onSolved }) {
  const [phase, setPhase] = useState('idle') // idle | solving | solved | wrong
  const [input, setInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(WA_TIMER_SECONDS)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (phase === 'solving') {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current)
            setPhase('idle')
            return WA_TIMER_SECONDS
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [phase])

  function handleTap() {
    setPhase('solving')
    setInput('')
    setSubmitted(false)
    setIsCorrect(false)
    setTimeLeft(WA_TIMER_SECONDS)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const val = parseInt(input, 10)
    const correct = val === WA_ANSWER
    setSubmitted(true)
    setIsCorrect(correct)
    if (correct) {
      clearInterval(intervalRef.current)
      setPhase('solved')
      if (onSolved) onSolved()
    } else {
      setPhase('wrong')
      setTimeout(() => {
        setPhase('solving')
        setSubmitted(false)
        setInput('')
      }, 900)
    }
  }

  const pct = (timeLeft / WA_TIMER_SECONDS) * 100

  if (phase === 'idle') {
    return (
      <div
        className="mx-3 my-1 rounded-2xl overflow-hidden cursor-pointer transition-all active:scale-98"
        style={{ background: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }}
        onClick={handleTap}
      >
        <div
          className="px-3 py-2 flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #E8532A)' }}
        >
          <div
            className="rounded-lg flex items-center justify-center shrink-0"
            style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)' }}
          >
            <span style={{ fontSize: 16 }}>🧩</span>
          </div>
          <div>
            <p className="text-xs font-bold text-white">Arjun's Puzzle</p>
            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.75)' }}>Tap to try it before the session</p>
          </div>
        </div>
        <div className="px-3 py-2 flex items-center justify-between">
          <span className="text-xs font-medium" style={{ color: '#7C3AED' }}>Tap to solve</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
      </div>
    )
  }

  if (phase === 'solved') {
    return (
      <div
        className="mx-3 my-1 rounded-2xl overflow-hidden msg-enter"
        style={{ background: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }}
      >
        <div
          className="px-3 py-2 flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #00A884, #25D1A2)' }}
        >
          <span style={{ fontSize: 16 }}>&#10003;</span>
          <p className="text-xs font-bold text-white">Puzzle solved! Answer: {WA_ANSWER}</p>
        </div>
        <div className="px-3 py-2">
          <SequenceStrip userInput={String(WA_ANSWER)} submitted={true} isCorrect={true} />
          <p className="text-[10px] mt-2 text-center" style={{ color: '#64748B' }}>
            n(n+1) pattern -- 6&times;7 = 42
          </p>
        </div>
      </div>
    )
  }

  // solving / wrong
  return (
    <div
      className="mx-3 my-1 rounded-2xl overflow-hidden slide-down"
      style={{ background: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }}
    >
      <div
        className="px-3 py-2"
        style={{ background: 'linear-gradient(135deg, #7C3AED, #E8532A)' }}
      >
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs font-bold text-white">What comes next?</p>
          <span
            className="text-xs font-bold tabular-nums"
            style={{ color: timeLeft < 20 ? '#FCA5A5' : 'rgba(255,255,255,0.9)' }}
          >
            {timeLeft}s
          </span>
        </div>
        {/* Timer bar */}
        <div className="rounded-full overflow-hidden" style={{ height: 3, background: 'rgba(255,255,255,0.25)' }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${pct}%`,
              background: timeLeft < 20 ? '#FCA5A5' : '#FFFFFF',
            }}
          />
        </div>
      </div>

      <div className="px-3 py-2">
        <SequenceStrip
          userInput={input}
          submitted={submitted}
          isCorrect={isCorrect}
        />

        <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
          <input
            type="number"
            placeholder="Your answer"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
            className="flex-1 rounded-xl px-3 py-2 text-xs font-medium outline-none"
            style={{
              background: '#F8FAFC',
              border: phase === 'wrong' ? '1.5px solid #EF4444' : '1.5px solid #E2E8F0',
              color: '#0F172A',
            }}
          />
          <button
            type="submit"
            className="px-3 py-2 rounded-xl text-xs font-semibold"
            style={{ background: '#7C3AED', color: '#FFFFFF' }}
          >
            Check
          </button>
        </form>

        {phase === 'wrong' && (
          <p className="text-[10px] text-center mt-1.5 fade-in" style={{ color: '#EF4444' }}>
            Not quite -- try again!
          </p>
        )}
      </div>
    </div>
  )
}
