# Bhanzu Growth PM Case Study — Part 4

A prototype demonstrating a personalised pre-session WhatsApp experience that improves demo class attendance for Bhanzu.

## What this shows

Five automated touchpoints that run from booking through session day:

1. **Booking confirmation + puzzle** — Personalised confirmation with a child-specific diagnostic puzzle
2. **24-hour reminder** — In the parent's chosen language, day before the session
3. **1-hour reminder** — Localised message with join link
4. **5-minute reminder** — Final nudge with one-tap join
5. **AI call (fallback)** — Triggered automatically if the 5-min reminder goes unread for 4 hours

## Stack

- Vite + React 18
- Tailwind CSS 3
- No external UI libraries — all animations are custom CSS keyframes

## Local development

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npm run build
```

Push to GitHub and connect to Vercel. The `vercel.json` at the root handles build settings automatically.

## Project structure

```
src/
  data/
    constants.js          Language strings, WA message data, puzzle constants
  components/
    icons.jsx             Inline SVG icon components
    WAPhone.jsx           Dark phone mock (used in Reminders and AI Call steps)
    SequenceStrip.jsx     5-dot timeline strip
    WhenBadge.jsx         Timing badge pill
    PuzzleTimer.jsx       Standalone puzzle with timer
    PhoneCallScreen.jsx   Interactive AI call screen
    Divider.jsx           Labelled section divider
    StepHeader.jsx        Badge + title + subtitle header
    wa/
      WATypingIndicator.jsx  Animated three-dot typing indicator
      WABubble.jsx           Chat bubble (4 variants)
      WAInlinePuzzle.jsx     Interactive puzzle inside WA chat
      WAQuickAssessment.jsx  Assessment result bars
      WAPhoneShell.jsx       WhatsApp-style phone shell (light theme)
  steps/
    StepBooking.jsx       Step 1 — booking form with language picker
    StepWhatsAppFlow.jsx  Step 2 — live WA message flow
    StepReminders.jsx     Step 3 — D5 and D0 reminder scenarios
    StepAICall.jsx        Step 4 — AI fallback call screen
    StepEnd.jsx           Step 5 — summary and conclusion
  screens/
    Landing.jsx           Entry screen
    Analysis.jsx          Step orchestrator (nav, progress bar, routing)
  App.jsx
  main.jsx
  index.css
```

Built by Souvik Biswas — Bhanzu Growth PM Application.
