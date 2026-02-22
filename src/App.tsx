import { Routes, Route } from 'react-router-dom'
import Landing from '@/pages/Landing'
import Pilot from '@/pages/Pilot'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/pilot" element={<Pilot />} />
    </Routes>
  )
}

export default App
