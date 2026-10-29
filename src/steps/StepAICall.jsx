import { useState } from 'react'
import StepHeader from '../components/StepHeader'
import Divider from '../components/Divider'
import WAPhone from '../components/WAPhone'
import WAPhoneShell from '../components/wa/WAPhoneShell'
import PhoneCallScreen from '../components/PhoneCallScreen'
import WhenBadge from '../components/WhenBadge'

const NO_SHOW_MSGS = [
  { text: "Hi Priya! We noticed you missed the session. Would you like to reschedule?", time: '11:05 AM' },
  { text: "Our next available slot is Monday, Nov 5 at 5 PM or Tuesday at 6 PM.", time: '11:05 AM' },
]

export default function StepAICall() {
  const [callStarted, setCallStarted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <StepHeader
        step={4}
        title="AI call reschedules no-shows"
        description="When a parent misses the class, an AI voice call fires within 5 minutes. Simultaneously, a WhatsApp message gives them a self-serve option."
      />

      <Divider />

      {/* Trigger label */}
      <WhenBadge label="Triggered: 5 min after missed class" />

      {/* Side-by-side phones */}
      <div className="flex gap-4 justify-center flex-wrap">
        {/* WA thread */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium" style={{ color: '#64748B' }}>WhatsApp</p>
          <WAPhoneShell contactName="Bhanzu">
            <div className="px-3 py-2 flex flex-col gap-1">
              {NO_SHOW_MSGS.map((m, i) => (
                <div
                  key={i}
                  className="rounded-2xl rounded-tl-sm px-3 py-2 msg-enter"
                  style={{
                    background: '#FFFFFF',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    animationDelay: `${i * 400}ms`,
                  }}
                >
                  <p className="text-xs leading-relaxed" style={{ color: '#1A2836' }}>{m.text}</p>
                  <p className="text-[9px] mt-1 text-right" style={{ color: '#94A3B8' }}>{m.time}</p>
                </div>
              ))}
            </div>
          </WAPhoneShell>
        </div>

        {/* Phone call */}
        <WAPhone label="AI Voice Call">
          <PhoneCallScreen
            autoStart={callStarted}
            onEnd={() => setCallEnded(true)}
          />
        </WAPhone>
      </div>

      {/* Controls */}
      {!callStarted && (
        <div className="flex justify-center">
          <button
            onClick={() => setCallStarted(true)}
            className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all orange-glow"
            style={{ background: '#E8532A', color: '#FFFFFF' }}
          >
            Simulate AI call
          </button>
        </div>
      )}
      {callEnded && (
        <div className="flex justify-center">
          <button
            onClick={() => { setCallStarted(false); setCallEnded(false) }}
            className="px-4 py-1.5 rounded-full text-xs font-medium"
            style={{ background: '#F1F5F9', color: '#64748B', border: '1px solid #E2E8F0' }}
          >
            Reset
          </button>
        </div>
      )}

      {/* Legend */}
      <div
        className="flex flex-col gap-2 p-4 rounded-2xl"
        style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}
      >
        <p className="text-xs font-bold" style={{ color: '#0F172A' }}>How it works</p>
        <div className="flex flex-col gap-1.5">
          {[
            { color: '#E8532A', label: 'AI call fires at T+5 min, asks to reschedule' },
            { color: '#00A884', label: 'WA message offers two slots as backup' },
            { color: '#7C3AED', label: 'If parent answers, bot books on the call' },
            { color: '#64748B', label: 'If no answer, WA thread stays open for async reply' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <div
                className="rounded-full mt-0.5 shrink-0"
                style={{ width: 8, height: 8, background: item.color }}
              />
              <p className="text-xs" style={{ color: '#64748B' }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Callouts */}
      <div className="grid grid-cols-1 gap-3">
        {[
          { icon: '🤖', title: 'No human agent needed', body: 'The AI handles the full reschedule conversation, including checking slot availability and confirming the new time.' },
          { icon: '⚡', title: '5-minute response window', body: 'Most reschedule conversions happen in the first call. Waiting even 30 minutes drops conversion significantly.' },
          { icon: '📞', title: 'Dual-channel coverage', body: 'Voice call + WA text together cover parents who prefer one channel over the other. Together they outperform either alone.' },
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
