import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { ProfileTab } from './settings/ProfileTab';
import { SecurityTab } from './settings/SecurityTab';
import { NotificationsTab } from './settings/NotificationsTab';
import { BillingTab } from './settings/BillingTab';
import { ApiKeysTab } from './settings/ApiKeysTab';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const settingsNav = [
  { path: '', label: 'Perfil' },
  { path: 'security', label: 'Segurança' },
  { path: 'notifications', label: 'Notificações' },
  { path: 'billing', label: 'Faturamento' },
  { path: 'api-keys', label: 'Chaves de API' },
];

const SettingsPage: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/settings/')[1] || '';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações da sua conta e preferências.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <nav className="flex flex-row md:flex-col items-start w-full md:w-1/5 shrink-0 gap-1">
          {settingsNav.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === ''}
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: 'ghost' }),
                  'w-full justify-start',
                  isActive && 'bg-muted hover:bg-muted'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex-1">
          <Routes>
            <Route index element={<ProfileTab />} />
            <Route path="security" element={<SecurityTab />} />
            <Route path="notifications" element={<NotificationsTab />} />
            <Route path="billing" element={<BillingTab />} />
            <Route path="api-keys" element={<ApiKeysTab />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
