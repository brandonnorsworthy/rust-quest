import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/Toaster';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import NotfoundPage from './pages/NotfoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import AuthenticatedAdminPage from './pages/admin/AdminPage';
import AuthenticatedAdminSuggestionsPage from './pages/admin/AdminSuggestionsPage';

import './App.css';
import { useAuth } from './context/useAuth';
import UsernameBubble from './components/UsernameBubble';
import AuthenticatedAdminUsersPage from './pages/admin/AdminUsersPage';
import AuthenticatedAdminQuestsPage from './pages/admin/AdminQuestsPage';
import LeaderboardPage from './pages/Leaderboard';
import AuthenticatedModeratorPage from './pages/moderator/ModeratorPage';
import AuthenticatedModeratorSuggestionsPage from './pages/moderator/ModeratorSuggestionsPage';
import AuthenticatedModeratorQuestsPage from './pages/moderator/ModeratorQuestsPage';
import { useEffect } from 'react';
import initializeGA, { trackPageView } from './analytics';

function App() {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    initializeGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <>
      <Toaster />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        {/* authorized routes */}
        {/* <Route path="/all-quests" element={<CompletedQuestsPage />} /> */}

        {/* moderator routes */}
        <Route path="/moderator" element={<AuthenticatedModeratorPage />} />
        <Route path="/moderator/suggestions" element={<AuthenticatedModeratorSuggestionsPage />} />
        <Route path="/moderator/quests" element={<AuthenticatedModeratorQuestsPage />} />

        {/* admin routes */}
        <Route path="/admin" element={<AuthenticatedAdminPage />} />
        <Route path="/admin/suggestions" element={<AuthenticatedAdminSuggestionsPage />} />
        <Route path="/admin/quests" element={<AuthenticatedAdminQuestsPage />} />
        <Route path="/admin/users" element={<AuthenticatedAdminUsersPage />} />

        {/* user routes */}
        <Route path="*" element={<NotfoundPage />} />
      </Routes>

      {
        user &&
        <UsernameBubble user={user} />
      }

    </>
  )
}

export default App;
