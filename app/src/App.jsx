import { Routes, Route } from 'react-router-dom';
import './App.css'
import FormList from './pages/FormList';
import SongDetails from './pages/SongDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormList />}></Route>
      <Route path="/songs/:id" element={<SongDetails />}></Route>
    </Routes>
  )
}

export default App
