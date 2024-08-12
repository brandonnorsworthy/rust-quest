import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import withAuth from './hocs/WithAuth/WithAuth'
import Dashboard from './pages/Dashboard';


function App() {
  //dashboard isnt real yet
  const AuthenticatedDashboard = withAuth(Dashboard);

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
