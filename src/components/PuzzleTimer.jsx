import { useState, useEffect, useRef } from 'react'
import { WA_SEQUENCE, WA_ANSWER, WA_TIMER_SECONDS } from '../data/constants'
import { IconStar } from './icons'

export default function PuzzleTimer({ onSolved }) {
  const [phase, setPhase] = useState('idle') // idle | running | solved
  const [input, setInput] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [wrong, setWrong] = useState(false)
  const [rating, setRating] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (phase === 'running') {
      intervalRef.current = setInterval(() => {
        setElapsed(e => {
          if (e >= WA_TIMER_SECONDS) {
            clearInterval(intervalRef.current)
            return e
          }
          return e + 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [phase])

  function handleStart() {
    setPhase('running')
    setElapsed(0)
    setInput('')
    setWrong(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const val = parseInt(input, 10)
    if (val === WA_ANSWER) {
      clearInterval(intervalRef.current)
      const r = elapsed <= 20 ? 5 : elapsed <= 40 ? 4 : elapsed <= 65 ? 3 : 2
      setRating(r)
      setPhase('solved')
      if (onSolved) onSolved({ elapsed, rating: r })
    } else {
      setWrong(true)
      setTimeout(() => setWrong(false), 800)
    }
  }

  const timeLeft = WA_TIMER_SECONDS - elapsed
  const pct = (elapsed / WA_TIMER_SECONDS) * 100

  if (phase === 'idle') {
    return (
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {WA_SEQUENCE.map((n, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', color: '#166534' }}
              >
                {n}
              </div>
              <span style={{ color: '#94A3B8', fontWeight: 600 }}>→</span>
            </div>
          ))}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
            style={{ background: '#F8FAFC', border: '2px dashed #CBD5E1', color: '#94A3B8' }}
          >
            ?
          </div>
        </div>
        <button
          onClick={handleStart}
          className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
          style={{ background: '#E8532A', color: '#FFFFFF' }}
        >
          Start puzzle
        </button>
      </div>
    )
  }

  if (phase === 'solved') {
    return (
      <div className="flex flex-col items-center gap-3 py-4 fade-in">
        <div className="text-2xl font-black" style={{ color: '#00A884' }}>
          {WA_ANSWER} is correct!
        </div>
        <div className="flex items-center gap-1">
          {[1,2,3,4,5].map(s => (
            <span key={s} style={{ color: s <= rating ? '#FBBF24' : '#E2E8F0' }}>
              <IconStar />
            </span>
          ))}
        </div>
        <p className="text-sm" style={{ color: '#64748B' }}>
          Solved in {elapsed}s
        </p>
        <div className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: '#F0FDF4', color: '#166534' }}>
          n(n+1) pattern &rarr; 6&times;7 = 42
        </div>
      </div>
    )
  }

  // running
  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Timer bar */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium" style={{ color: '#64748B' }}>Time remaining</span>
          <span className="text-xs font-bold tabular-nums" style={{ color: timeLeft < 20 ? '#EF4444' : '#0F172A' }}>
            {timeLeft}s
          </span>
        </div>
        <div className="rounded-full overflow-hidden h-2" style={{ background: '#E2E8F0' }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${100 - pct}%`,
              background: timeLeft < 20 ? '#EF4444' : '#00A884',
            }}
          />
        </div>
      </div>

      {/* Sequence */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {WA_SEQUENCE.map((n, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
              style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', color: '#166534' }}
            >
              {n}
            </div>
            <span style={{ color: '#94A3B8', fontWeight: 600 }}>→</span>
          </div>
        ))}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all"
          style={{
            background: wrong ? '#FEF2F2' : input ? '#FFF7ED' : '#F8FAFC',
            border: wrong ? '2px solid #EF4444' : input ? '2px solid #E8532A' : '2px dashed #CBD5E1',
            color: wrong ? '#DC2626' : input ? '#E8532A' : '#94A3B8',
          }}
        >
          {input || '?'}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="number"
          placeholder="Your answer"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 rounded-xl px-4 py-2.5 text-sm font-medium outline-none"
          style={{
            background: '#F8FAFC',
            border: wrong ? '2px solid #EF4444' : '1.5px solid #E2E8F0',
            color: '#0F172A',
          }}
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: '#E8532A', color: '#FFFFFF' }}
        >
          Check
        </button>
      </form>

      {wrong && (
        <p className="text-xs text-center fade-in" style={{ color: '#EF4444' }}>
          Not quite -- try again!
        </p>
      )}
    </div>
  )
}
