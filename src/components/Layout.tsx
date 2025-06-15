
import React from 'react';
import EnhancedNavigation from './EnhancedNavigation';
import ChatWidget from './ChatWidget';

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNavigation = true }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showNavigation && <EnhancedNavigation />}
      {children}
      <ChatWidget />
    </div>
  );
};

export default Layout;
