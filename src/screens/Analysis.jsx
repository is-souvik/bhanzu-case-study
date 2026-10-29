import { useState } from 'react'
import { IconArrowLeft, IconArrowRight } from '../components/icons'
import StepBooking from '../steps/StepBooking'
import StepWhatsAppFlow from '../steps/StepWhatsAppFlow'
import StepReminders from '../steps/StepReminders'
import StepAICall from '../steps/StepAICall'
import StepEnd from '../steps/StepEnd'

const STEPS = [
  { id: 0, label: 'Booking' },
  { id: 1, label: 'WA Flow' },
  { id: 2, label: 'Reminders' },
  { id: 3, label: 'AI Call' },
  { id: 4, label: 'Summary' },
]

export default function Analysis({ onBack }) {
  const [step, setStep] = useState(0)
  const [selectedLang, setSelectedLang] = useState('hi')

  const total = STEPS.length
  const pct = ((step + 1) / total) * 100

  function prev() {
    if (step > 0) setStep(s => s - 1)
    else onBack()
  }

  function next() {
    if (step < total - 1) setStep(s => s + 1)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F5F7FA' }}>

      {/* Sticky nav */}
      <div
        className="sticky top-0 z-20 px-4 pt-3 pb-2"
        style={{ background: 'rgba(245, 247, 250, 0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}
      >
        <div className="max-w-lg mx-auto flex flex-col gap-2">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <button
              onClick={prev}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{ background: '#F1F5F9', color: '#64748B', border: '1px solid #E2E8F0' }}
            >
              <IconArrowLeft />
              {step === 0 ? 'Home' : 'Back'}
            </button>

            <div className="flex items-center gap-1">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setStep(i)}
                  className="transition-all"
                  style={{
                    width: step === i ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: step === i ? '#E8532A' : i < step ? '#CBD5E1' : '#E2E8F0',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={step === total - 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: step === total - 1 ? '#F1F5F9' : '#E8532A',
                color: step === total - 1 ? '#CBD5E1' : '#FFFFFF',
                opacity: step === total - 1 ? 0.5 : 1,
              }}
            >
              Next
              <IconArrowRight />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #E8532A, #7C3AED)' }}
            />
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-4 py-6">
        <div className="max-w-lg mx-auto">
          <div key={step} className="screen-enter">
            {step === 0 && (
              <StepBooking
                selectedLang={selectedLang}
                onLangChange={setSelectedLang}
              />
            )}
            {step === 1 && <StepWhatsAppFlow />}
            {step === 2 && (
              <StepReminders
                selectedLang={selectedLang}
                onLangChange={setSelectedLang}
              />
            )}
            {step === 3 && <StepAICall />}
            {step === 4 && <StepEnd onRestart={() => { setStep(0); onBack() }} />}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div
        className="sticky bottom-0 px-4 py-3"
        style={{ background: 'rgba(245, 247, 250, 0.9)', backdropFilter: 'blur(12px)', borderTop: '1px solid #E2E8F0' }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-xs font-medium" style={{ color: '#94A3B8' }}>
            {STEPS[step].label}
          </span>
          <span className="text-xs font-medium" style={{ color: '#94A3B8' }}>
            {step + 1} / {total}
          </span>
        </div>
      </div>

    </div>
  )
}
