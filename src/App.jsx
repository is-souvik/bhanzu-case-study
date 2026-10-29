import { useState } from 'react'
import Landing from './screens/Landing'
import Analysis from './screens/Analysis'

export default function App() {
  const [screen, setScreen] = useState('landing')

  return (
    <div
      className="min-h-screen"
      style={{ background: '#F5F7FA' }}
    >
      {screen === 'landing' && (
        <Landing
          onStart={() => setScreen('analysis')}
        />
      )}

      {screen === 'analysis' && (
        <Analysis onBack={() => setScreen('landing')} />
      )}
    </div>
  )
}
