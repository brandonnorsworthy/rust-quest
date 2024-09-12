import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/Toaster';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import NotfoundPage from './pages/NotfoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import AuthenticatedAdminPage from './pages/admin/AdminPage';
import AuthenticatedSuggestionsPage from './pages/admin/SuggestionsPage';

import './App.css';
import Background from './components/Background';
import { useAuth } from './context/useAuth';

const queryClient = new QueryClient()

function App() {
  const { user } = useAuth();

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
            <Route path="/admin" element={<AuthenticatedAdminPage />} />
            <Route path="/admin/suggestions" element={<AuthenticatedSuggestionsPage />} />
            <Route path="/admin/quests" element={<div>Admin Quests</div>} />
            <Route path="/admin/users" element={<div>Admin Users</div>} />

            {/* user routes */}
            <Route path="*" element={<NotfoundPage />} />
          </Routes>
        </Router>

        {
          user &&
          <div className="fixed top-0 right-0 flex flex-col justify-end m-4 text-white">
            <span className="text-right">{user.username} ({user.role})</span>
          </div>
        }

        <Background />
    </QueryClientProvider>
  )
}

export default App;
