import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumbs from '../Breadcrumbs';
import MobileBottomNav from './MobileBottomNav';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  return (
    <div className="flex h-screen bg-muted/40">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className={cn(
          "flex-1",
          // Add padding for bottom nav on mobile, but not for chat page
          isChatPage ? 'pb-16 sm:pb-0' : 'pb-20 sm:pb-6',
          // Add page padding, but not for chat page
          !isChatPage && "p-4 sm:p-6"
        )}>
          {!isChatPage && <Breadcrumbs />}
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default DashboardLayout;
