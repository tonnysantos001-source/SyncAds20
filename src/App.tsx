import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/app/DashboardPage';
import CampaignsPage from './pages/app/CampaignsPage';
import AnalyticsPage from './pages/app/AnalyticsPage';
import ChatPage from './pages/app/ChatPage';
import IntegrationsPage from './pages/app/IntegrationsPage';
import SettingsPage from './pages/app/SettingsPage';

function App() {
  // Mock de autenticação. Em um app real, isso viria de um contexto ou store.
  const isAuthenticated = true; 

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route 
          path="/*"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/campaigns" element={<CampaignsPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/integrations" element={<IntegrationsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
