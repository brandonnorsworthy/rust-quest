import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/Toaster';

import LandingPage from './pages/LandingPage';
import AdminPage from './pages/admin/AdminPage';
import LoginPage from './pages/LoginPage';
import NotfoundPage from './pages/NotfoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

import './App.css';
import Background from './components/Background';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* admin routes */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/suggestions" element={<div>Admin Suggestions</div>} />
          <Route path="/admin/quests" element={<div>Admin Quests</div>} />
          <Route path="/admin/users" element={<div>Admin Users</div>} />

          {/* user routes */}
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </Router>
      <Background />
    </QueryClientProvider>
  )
}

export default App;
