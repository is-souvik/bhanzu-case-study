import { useState } from 'react'
import StepHeader from '../components/StepHeader'
import Divider from '../components/Divider'
import WAPhoneShell from '../components/wa/WAPhoneShell'
import WhenBadge from '../components/WhenBadge'
import { REMINDER_LANGS, R24_TEXTS, R1H_TEXTS, R5MIN_TEXTS } from '../data/constants'

const REMINDERS = [
  {
    id: 'r24',
    badge: 'D-1: 24 hours before',
    title: '24h reminder',
    icon: '📅',
    getText: (lang) => R24_TEXTS[lang] || R24_TEXTS['en'],
    time: 'Fri, 11:00 AM',
    accent: '#7C3AED',
  },
  {
    id: 'r1h',
    badge: 'D-day: 1 hour before',
    title: '1-hour reminder',
    icon: '⏰',
    getText: (lang) => R1H_TEXTS[lang] || R1H_TEXTS['en'],
    time: 'Sat, 10:00 AM',
    accent: '#E8532A',
  },
  {
    id: 'r5',
    badge: 'D-day: 5 minutes before',
    title: '5-minute nudge',
    icon: '🚀',
    getText: (lang) => R5MIN_TEXTS[lang] || R5MIN_TEXTS['en'],
    time: 'Sat, 10:55 AM',
    accent: '#00A884',
  },
]

export default function StepReminders({ selectedLang, onLangChange }) {
  const [scenario, setScenario] = useState('D5') // D5 | D0

  return (
    <div className="flex flex-col gap-6">
      <StepHeader
        step={3}
        title="Timed reminders keep show-up rates high"
        description="Three automated WhatsApp reminders fire at exactly the right moments. Each one is personalised and localised."
      />

      <Divider />

      {/* Scenario toggle */}
      <div>
        <p className="text-xs font-semibold mb-2" style={{ color: '#64748B' }}>View scenario</p>
        <div className="flex gap-2">
          {[{ id: 'D5', label: 'D-1 to D-day' }, { id: 'D0', label: 'Class day only' }].map(s => (
            <button
              key={s.id}
              onClick={() => setScenario(s.id)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: scenario === s.id ? '#0F172A' : '#F1F5F9',
                color: scenario === s.id ? '#FFFFFF' : '#64748B',
                border: scenario === s.id ? '1.5px solid #0F172A' : '1.5px solid #E2E8F0',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Language picker */}
      <div>
        <p className="text-xs font-semibold mb-2" style={{ color: '#64748B' }}>Language</p>
        <div className="flex gap-1.5 flex-wrap">
          {REMINDER_LANGS.map(lang => (
            <button
              key={lang.code}
              onClick={() => onLangChange(lang.code)}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all"
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

      <Divider />

      {/* Reminder mocks */}
      <div className="flex flex-col gap-6">
        {scenario === 'D5' ? (
          // D5 view: show all 3 reminders
          REMINDERS.map((r) => (
            <div key={r.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <WhenBadge label={r.badge} />
              </div>
              <div className="flex flex-col items-center">
                <WAPhoneShell contactName="Bhanzu">
                  <div className="px-3 py-2">
                    <div
                      className="rounded-2xl rounded-tl-sm px-3 py-2.5 msg-enter"
                      style={{
                        background: '#FFFFFF',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        borderLeft: `3px solid ${r.accent}`,
                      }}
                    >
                      <p className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: '#1A2836' }}>
                        {r.getText(selectedLang)}
                      </p>
                      <p className="text-[9px] mt-1 text-right" style={{ color: '#94A3B8' }}>{r.time}</p>
                    </div>
                  </div>
                </WAPhoneShell>
              </div>
            </div>
          ))
        ) : (
          // D0 view: booking confirmation only (D5 reminder shown on class day)
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <WhenBadge label="D-day: booking confirmation" />
            </div>
            <div className="flex flex-col items-center">
              <WAPhoneShell contactName="Bhanzu">
                <div className="px-3 py-2">
                  <div
                    className="rounded-2xl rounded-tl-sm px-3 py-2.5 msg-enter"
                    style={{
                      background: '#FFFFFF',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                      borderLeft: '3px solid #00A884',
                    }}
                  >
                    <p className="text-xs leading-relaxed" style={{ color: '#1A2836' }}>
                      Souvik's Bhanzu demo class is confirmed!{'\n\n'}
                      Saturday, Nov 3 at 11:00 AM{'\n\n'}
                      Join link: https://bnz.one/HcLQNPNeBgaG7M
                    </p>
                    <p className="text-[9px] mt-1 text-right" style={{ color: '#94A3B8' }}>10:02 AM</p>
                  </div>
                </div>
              </WAPhoneShell>
            </div>
          </div>
        )}
      </div>

      {/* Callouts */}
      <Divider />
      <div className="grid grid-cols-1 gap-3">
        {[
          { icon: '🌐', title: '4 languages supported', body: 'Hindi, English, Tamil, Telugu -- same message, same timing, locally felt.' },
          { icon: '📎', title: 'Join link in every message', body: 'One tap from any reminder takes the parent straight into the class.' },
          { icon: '0', title: 'Zero manual work', body: 'All three reminders fire automatically from the booking event. No CRM task, no human send.' },
        ].map((c, i) => (
          <div key={i} className="flex gap-3 p-4 rounded-2xl card-surface">
            <span className="text-lg font-black" style={{ color: '#E8532A', minWidth: 24, textAlign: 'center' }}>
              {c.icon === '0' ? '0' : c.icon}
            </span>
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
