import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage'
import AuthenticatedDashboard from './pages/Dashboard';

import './App.css'

function App() {
  //dashboard isnt real yet

  return (
    <Router>
      <Routes>
        {/*public routes*/}
        <Route path="/" element={<LandingPage />} />
        {/* protected routes*/}
        <Route
          path="/dashboard"
          element={<AuthenticatedDashboard />}
        />
      </Routes>
    </Router>
  )
}

export default App
