import { useState } from 'react'
import StepHeader from '../components/StepHeader'
import Divider from '../components/Divider'
import { BOOKING_LANGS, CONFIRMATION_TEXTS } from '../data/constants'
import { IconCheck } from '../components/icons'

export default function StepBooking({ selectedLang, onLangChange }) {
  const [confirmed, setConfirmed] = useState(false)
  const [childName, setChildName] = useState('Souvik')
  const [grade, setGrade] = useState('Grade 5')

  const confirmText = CONFIRMATION_TEXTS[selectedLang] || CONFIRMATION_TEXTS['en']

  return (
    <div className="flex flex-col gap-6">
      <StepHeader
        step={1}
        title="Parent books a free demo"
        description="A parent visits bhanzu.com and books a free 1-on-1 session for their child. This is where the journey starts."
      />

      <Divider />

      <div className="flex flex-col gap-4">
        {/* Mock browser chrome */}
        <div
          className="rounded-2xl overflow-hidden card-surface"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          {/* Browser bar */}
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{ background: '#F1F5F9', borderBottom: '1px solid #E2E8F0' }}
          >
            <div className="flex gap-1.5">
              <div className="rounded-full" style={{ width: 8, height: 8, background: '#EF4444' }}/>
              <div className="rounded-full" style={{ width: 8, height: 8, background: '#FBBF24' }}/>
              <div className="rounded-full" style={{ width: 8, height: 8, background: '#22C55E' }}/>
            </div>
            <div
              className="flex-1 rounded-lg px-2 py-1 text-[10px] flex items-center gap-1"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#64748B' }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#00A884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              bhanzu.com/book-demo
            </div>
          </div>

          {/* Form content */}
          {!confirmed ? (
            <div className="p-4 flex flex-col gap-4">
              <div>
                <h3 className="text-base font-bold mb-0.5" style={{ color: '#0F172A' }}>
                  Book a free demo class
                </h3>
                <p className="text-xs" style={{ color: '#64748B' }}>
                  Let's get your child excited about math
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[10px] font-semibold mb-1 block" style={{ color: '#64748B' }}>
                    PARENT NAME
                  </label>
                  <div
                    className="rounded-xl px-3 py-2 text-xs font-medium"
                    style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', color: '#0F172A' }}
                  >
                    Priya Sharma
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold mb-1 block" style={{ color: '#64748B' }}>
                    CHILD'S NAME
                  </label>
                  <input
                    className="w-full rounded-xl px-3 py-2 text-xs font-medium outline-none"
                    style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', color: '#0F172A' }}
                    value={childName}
                    onChange={e => setChildName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold mb-1 block" style={{ color: '#64748B' }}>
                    GRADE
                  </label>
                  <select
                    className="w-full rounded-xl px-3 py-2 text-xs font-medium outline-none"
                    style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', color: '#0F172A' }}
                    value={grade}
                    onChange={e => setGrade(e.target.value)}
                  >
                    {['Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8'].map(g => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-semibold mb-1 block" style={{ color: '#64748B' }}>
                    PREFERRED LANGUAGE
                  </label>
                  <div className="flex gap-1.5 flex-wrap">
                    {BOOKING_LANGS.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => onLangChange(lang.code)}
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all"
                        style={{
                          background: selectedLang === lang.code ? '#E8532A' : '#F1F5F9',
                          color: selectedLang === lang.code ? '#FFFFFF' : '#64748B',
                          border: selectedLang === lang.code ? '1.5px solid #E8532A' : '1.5px solid #E2E8F0',
                        }}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setConfirmed(true)}
                className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all orange-glow"
                style={{ background: '#E8532A', color: '#FFFFFF' }}
              >
                Book my free class
              </button>
            </div>
          ) : (
            <div className="p-4 flex flex-col items-center gap-3 fade-in">
              <div
                className="rounded-full flex items-center justify-center"
                style={{ width: 44, height: 44, background: '#F0FDF4', border: '2px solid #00A884' }}
              >
                <span style={{ color: '#00A884' }}><IconCheck size={18} /></span>
              </div>
              <div className="text-center">
                <p className="font-bold text-sm" style={{ color: '#0F172A' }}>Demo class confirmed!</p>
                <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>
                  Saturday, Nov 3 at 11:00 AM IST
                </p>
              </div>

              <button
                onClick={() => setConfirmed(false)}
                className="text-xs font-medium underline"
                style={{ color: '#94A3B8' }}
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* What Bhanzu sends */}
        {confirmed && (
          <div className="slide-down">
            <div
              className="rounded-2xl overflow-hidden card-surface"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{ borderBottom: '1px solid #E2E8F0' }}
              >
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{ width: 28, height: 28, background: 'linear-gradient(135deg, #00A884, #128C7E)' }}
                >
                  <span className="text-[10px] font-bold text-white">B</span>
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: '#0F172A' }}>Bhanzu</p>
                  <p className="text-[10px]" style={{ color: '#64748B' }}>WhatsApp confirmation sent</p>
                </div>
              </div>
              <div className="p-4">
                <pre
                  className="text-xs leading-relaxed whitespace-pre-wrap font-sans"
                  style={{ color: '#1A2836' }}
                >
                  {confirmText}
                </pre>
              </div>
            </div>

            <p className="text-xs mt-2 text-center" style={{ color: '#94A3B8' }}>
              Message sent in {BOOKING_LANGS.find(l => l.code === selectedLang)?.label || 'English'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
