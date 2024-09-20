import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/Toaster';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import NotfoundPage from './pages/NotfoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import AuthenticatedAdminPage from './pages/admin/AdminPage';
import AuthenticatedAdminSuggestionsPage from './pages/admin/AdminSuggestionsPage';

import './App.css';
import Background from './components/Background';
import { useAuth } from './context/useAuth';
import UsernameBubble from './components/UsernameBubble';
import AuthenticatedAdminUsersPage from './pages/admin/AdminUsersPage';
import AuthenticatedAdminQuestsPage from './pages/admin/AdminQuestsPage';
import LeaderboardPage from './pages/Leaderboard';

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
          <Route path="/leaderboard" element={<LeaderboardPage />} />

          {/* authorized routes */}
          {/* <Route path="/all-quests" element={<CompletedQuestsPage />} /> */}

          {/* admin routes */}
          <Route path="/admin" element={<AuthenticatedAdminPage />} />
          <Route path="/admin/suggestions" element={<AuthenticatedAdminSuggestionsPage />} />
          <Route path="/admin/quests" element={<AuthenticatedAdminQuestsPage />} />
          <Route path="/admin/users" element={<AuthenticatedAdminUsersPage />} />

          {/* user routes */}
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </Router>

      {
        user &&
        <UsernameBubble user={user} />
      }

      <Background />
    </QueryClientProvider>
  )
}

export default App;
