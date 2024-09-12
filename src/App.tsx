import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LandingPage from './pages/LandingPage';
import DeveloperPage from './pages/DeveloperPage';
import LoginPage from './pages/LoginPage';

import './App.css';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* protected routes */}
          <Route path="/dev" element={<DeveloperPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App;
