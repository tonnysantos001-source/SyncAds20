import React from 'react';
import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/dashboard" className="flex items-center space-x-2">
      <Bot className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold tracking-tight text-foreground">
        Marketing AI
      </span>
    </Link>
  );
};

export default Logo;
