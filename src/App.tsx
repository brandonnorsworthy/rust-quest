import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import LandingPage from './pages/LandingPage'
import AuthenticatedDashboard from './pages/Dashboard';

import './App.css'

const queryClient = new QueryClient()

function App() {
  //dashboard isnt real yet

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
