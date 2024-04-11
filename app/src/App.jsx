import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import {Formlist, SongDetails} from './pages/Formlist'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Formlist />}></Route>
      <Route path="/songs/:id" element={<SongDetails />}></Route>
    </Routes>
  )
}

export default App
