import React from 'react'
import OverwatchLogo from 'assets/images/OverwatchLogoLight.svg'

import { FormattedMessage } from 'react-intl'

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
        placeContent: 'center',
        minHeight: '100vh',
      }}
    >
      <img
        src={OverwatchLogo}
        alt="Overwatch Logo"
        style={{
          height: '50vw',
          width: '50vw',
          maxHeight: '60vh',
          maxWidth: '60vh',
        }}
      />
      <h1 style={{ marginTop: 20, fontSize: 60 }}>-IN DEVELOPMENT-</h1>
    </div>
  )
}

export default App
