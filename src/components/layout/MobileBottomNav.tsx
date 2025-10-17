import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Bot, Megaphone, Plug, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/chat', icon: Bot, label: 'Chat IA' },
  { to: '/campaigns', icon: Megaphone, label: 'Campanhas' },
  { to: '/integrations', icon: Plug, label: 'Integrações' },
  { to: '/settings', icon: Settings, label: 'Ajustes' },
];

const MobileBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-40 sm:hidden">
      <div className="grid h-full grid-cols-5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary',
                isActive && 'text-primary'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
