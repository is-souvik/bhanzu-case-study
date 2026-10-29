import { useState, useEffect, useRef } from 'react'
import StepHeader from '../components/StepHeader'
import Divider from '../components/Divider'
import { WA_MSGS } from '../data/constants'
import WAPhoneShell from '../components/wa/WAPhoneShell'
import WABubble from '../components/wa/WABubble'
import WATypingIndicator from '../components/wa/WATypingIndicator'
import WAInlinePuzzle from '../components/wa/WAInlinePuzzle'
import WAQuickAssessment from '../components/wa/WAQuickAssessment'

const STEP_MSGS = WA_MSGS.slice(0, 3) // msgs 1-3 (id 1,2,3)
const RESULT_MSG = WA_MSGS[3]        // msg 4
const META_MSG = WA_MSGS[4]          // msg 5

export default function StepWhatsAppFlow() {
  const [visibleIds, setVisibleIds] = useState([])
  const [typing, setTyping] = useState(false)
  const [puzzleOpen, setPuzzleOpen] = useState(false)
  const [puzzleSolved, setPuzzleSolved] = useState(false)
  const [showAssessment, setShowAssessment] = useState(false)
  const [showMeta, setShowMeta] = useState(false)
  const [started, setStarted] = useState(false)
  const scrollRef = useRef(null)
  const timeoutsRef = useRef([])

  function clearTimeouts() {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  function reset() {
    clearTimeouts()
    setVisibleIds([])
    setTyping(false)
    setPuzzleOpen(false)
    setPuzzleSolved(false)
    setShowAssessment(false)
    setShowMeta(false)
    setStarted(false)
  }

  function start() {
    reset()
    setStarted(true)

    let cumulative = 0

    STEP_MSGS.forEach((msg, i) => {
      const showTypingAt = cumulative + (i === 0 ? 400 : 800)
      const showMsgAt = showTypingAt + 1000

      const t1 = setTimeout(() => setTyping(true), showTypingAt)
      const t2 = setTimeout(() => {
        setTyping(false)
        setVisibleIds(ids => [...ids, msg.id])
      }, showMsgAt)

      timeoutsRef.current.push(t1, t2)
      cumulative = showMsgAt + (msg.delay || 0)
    })
  }

  function handlePuzzleSolved() {
    setPuzzleSolved(true)
    setPuzzleOpen(false)

    const t1 = setTimeout(() => {
      setVisibleIds(ids => [...ids, RESULT_MSG.id])
    }, 800)
    const t2 = setTimeout(() => {
      setShowAssessment(true)
    }, 2200)
    const t3 = setTimeout(() => {
      setShowMeta(true)
    }, 4000)

    timeoutsRef.current.push(t1, t2, t3)
  }

  // auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleIds, typing, puzzleOpen, showAssessment, showMeta])

  return (
    <div className="flex flex-col gap-6">
      <StepHeader
        step={2}
        title="WhatsApp flow with embedded puzzle"
        description="Within seconds of booking, Bhanzu sends a WhatsApp message with a live math puzzle embedded directly in the thread."
      />

      <Divider />

      <div className="flex flex-col items-center gap-4">
        <WAPhoneShell contactName="Bhanzu">
          <div ref={scrollRef} className="phone-scroll overflow-y-auto" style={{ maxHeight: 360 }}>
            {/* Date chip */}
            <div className="flex justify-center mb-2">
              <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: '#D9FDD3', color: '#1B5E20' }}>
                Saturday, Nov 3
              </span>
            </div>

            {STEP_MSGS.map(msg => (
              visibleIds.includes(msg.id) ? (
                <div key={msg.id}>
                  {msg.isPuzzleLink ? (
                    puzzleOpen ? (
                      <WAInlinePuzzle onSolved={handlePuzzleSolved} />
                    ) : (
                      <WABubble
                        msg={msg}
                        onPuzzleTap={() => setPuzzleOpen(true)}
                        puzzleDone={puzzleSolved}
                      />
                    )
                  ) : (
                    <WABubble msg={msg} />
                  )}
                </div>
              ) : null
            ))}

            {typing && <WATypingIndicator />}

            {visibleIds.includes(RESULT_MSG.id) && (
              <WABubble msg={RESULT_MSG} />
            )}

            {showAssessment && <WAQuickAssessment />}

            {showMeta && <WABubble msg={META_MSG} />}
          </div>
        </WAPhoneShell>

        {!started ? (
          <button
            onClick={start}
            className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all orange-glow"
            style={{ background: '#E8532A', color: '#FFFFFF' }}
          >
            Play through the flow
          </button>
        ) : (
          <button
            onClick={reset}
            className="px-4 py-1.5 rounded-full text-xs font-medium"
            style={{ background: '#F1F5F9', color: '#64748B', border: '1px solid #E2E8F0' }}
          >
            Reset
          </button>
        )}
      </div>

      {/* Callouts */}
      <div className="grid grid-cols-1 gap-3">
        {[
          { icon: '⚡', title: 'Sent within 30 seconds', body: 'Booking confirmation triggers the WA flow instantly, no manual intervention.' },
          { icon: '🧩', title: 'Puzzle embedded in-thread', body: 'Parents tap to open the puzzle directly inside WhatsApp -- no app download, no link redirect.' },
          { icon: '📊', title: 'Teacher gets results first', body: "Ms. Anjali sees the puzzle results before Saturday's class and can personalise accordingly." },
        ].map((c, i) => (
          <div key={i} className="flex gap-3 p-4 rounded-2xl card-surface">
            <span style={{ fontSize: 20 }}>{c.icon}</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>{c.title}</p>
              <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#64748B' }}>{c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
