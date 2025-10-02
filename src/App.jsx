import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UploadPage from './pages/UploadPage'
import StoryPage from './pages/StoryPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/story" element={<StoryPage />} />
      </Routes>
    </Router>
  )
}

export default App
