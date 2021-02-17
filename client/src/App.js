import React from 'react'
import { Route } from 'react-router-dom'
import Join from './components/Join'
import Chat from './components/Chat'

import './App.css'

const App = () => {
  return (
    <div className="App">
      <Route path='/' exact component={Join} />
      <Route path='/chat' exact component={Chat} />
    </div>
  )
}

export default App
