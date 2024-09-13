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
        <div className="fixed bottom-0 left-0 flex flex-col justify-end p-2 m-4 rounded text-black/50 bg-white/50">
          <p className="text-right">
            <span className="font-bold">{user.username}</span>
            {
              user.role !== "user" && <span className="font-bold text-blue-500"> [{user.role}]</span>
            }
          </p>
        </div>
      }

      <Background />
    </QueryClientProvider>
  )
}

export default App;
