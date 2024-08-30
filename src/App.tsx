import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard';
import DevPage from './pages/DevPage';
import withAuth from './hocs/WithAuth';

import './App.css'

const AuthenticatedDashboard = withAuth(Dashboard);
const queryClient = new QueryClient()

function App() {
  //dashboard isnt real yet

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<LandingPage />} />

          {/* protected routes */}
          <Route
            path="/dashboard"
            element={<AuthenticatedDashboard />}
          />
          <Route
            path="/dev"
            element={<DevPage />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
