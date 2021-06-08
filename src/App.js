import React from 'react'
import './App.css'
import Selector from './components/Selector'
import { WhiteCanvas } from './components/WhiteCanvas'
import BlueCanvas from './components/BlueCanvas'

function App() {
  return (
    <div className="App">
      <Selector>
        <WhiteCanvas />
        <BlueCanvas />
      </Selector>
    </div>
  )
}

export default App
