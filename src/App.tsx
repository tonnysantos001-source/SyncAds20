import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/app/DashboardPage';
import CampaignsPage from './pages/app/CampaignsPage';
import CampaignDetailsPage from './pages/app/campaigns/CampaignDetailsPage';
import AnalyticsPage from './pages/app/AnalyticsPage';
import ChatPage from './pages/app/ChatPage';
import IntegrationsPage from './pages/app/IntegrationsPage';
import SettingsPage from './pages/app/SettingsPage';
import { Toaster } from './components/ui/toaster';
import { useStore } from './store/useStore';
import LandingPage from './pages/public/LandingPage';
import NotFoundPage from './pages/public/NotFoundPage';

const ProtectedRoutes = () => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

const AuthRoutes = () => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth Routes */}
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>
          
          {/* Protected App Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/campaigns/:id" element={<CampaignDetailsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
