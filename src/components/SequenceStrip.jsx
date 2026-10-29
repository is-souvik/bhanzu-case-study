import { WA_SEQUENCE } from '../data/constants'

export default function SequenceStrip({ userInput, submitted, isCorrect }) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {WA_SEQUENCE.map((n, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="rounded-xl flex items-center justify-center font-bold text-sm"
            style={{
              width: 44,
              height: 44,
              background: '#F0FDF4',
              border: '1.5px solid #86EFAC',
              color: '#166534',
            }}
          >
            {n}
          </div>
          <div style={{ color: '#94A3B8', fontSize: 16, fontWeight: 600 }}>→</div>
        </div>
      ))}
      {/* Input box */}
      <div
        className="rounded-xl flex items-center justify-center font-bold text-sm transition-all"
        style={{
          width: 44,
          height: 44,
          background: submitted && isCorrect ? '#F0FDF4' : submitted && !isCorrect ? '#FEF2F2' : userInput ? '#FFF7ED' : '#F8FAFC',
          border: submitted && isCorrect
            ? '2px solid #00A884'
            : submitted && !isCorrect
            ? '2px solid #EF4444'
            : userInput
            ? '2px solid #E8532A'
            : '2px dashed #CBD5E1',
          color: submitted && isCorrect
            ? '#166534'
            : submitted && !isCorrect
            ? '#DC2626'
            : userInput
            ? '#E8532A'
            : '#94A3B8',
        }}
      >
        {userInput || '?'}
      </div>
    </div>
  )
}
