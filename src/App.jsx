import { useState } from 'react'
import './App.css'
import Surface from './components/surface' 
import Sky from './components/sky'
import Profile from './components/profile'
function App() {
  return (
    <>
      <Surface/>
      <Sky/>
      <Profile/>
    </>
  )
}
export default App