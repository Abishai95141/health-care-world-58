
import React, { useState } from 'react';
import { useStaffAuth } from '@/contexts/StaffAuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Plus, 
  Upload, 
  Package, 
  AlertTriangle,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';

interface StaffLayoutProps {
  children: React.ReactNode;
}

const StaffLayout = ({ children }: StaffLayoutProps) => {
  const { user, signOut } = useStaffAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate('/staff/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/staff/dashboard', icon: LayoutDashboard },
    { name: 'Add New Product', href: '/staff/products/new', icon: Plus },
    { name: 'Bulk Import (CSV)', href: '/staff/products/import', icon: Upload },
    { name: 'Manage Products', href: '/staff/products', icon: Package },
    { name: 'Inventory Alerts', href: '/staff/inventory', icon: AlertTriangle },
    { name: 'Order Management', href: '/staff/orders', icon: ShoppingCart },
  ];

  const currentPath = location.pathname;

  const NavigationItems = ({ onItemClick }: { onItemClick?: () => void }) => (
    <ul className="space-y-2">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.href;
        
        return (
          <li key={item.name}>
            <Link
              to={item.href}
              onClick={onItemClick}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors min-h-[44px] ${
                isActive
                  ? 'bg-[#27AE60] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b relative z-50">
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          {/* Left side - Logo and hamburger */}
          <div className="flex items-center space-x-3">
            {/* Mobile hamburger menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-[#27AE60] hover:bg-gray-100 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Logo */}
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-bold text-[#27AE60]">Capsule Care</h1>
              <span className="text-sm text-gray-600 hidden sm:block">Staff Portal</span>
            </div>
          </div>

          {/* Right side - User info and logout */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* User info */}
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-600 hidden sm:block" />
              <div className="flex flex-col text-right">
                <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">Welcome,</span>
                <span className="text-xs sm:text-sm text-gray-800 truncate max-w-[120px] sm:max-w-none">
                  {user?.email}
                </span>
              </div>
            </div>
            
            {/* Logout button */}
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="text-gray-600 hover:text-red-600 min-h-[44px] px-3 sm:px-4"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Log Out</span>
            </Button>
          </div>
        </div>
        
        {/* Mobile subtitle */}
        <div className="px-4 pb-2 sm:hidden">
          <span className="text-sm text-gray-600">Staff Portal</span>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed left-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Navigation items */}
            <div className="p-4">
              <NavigationItems onItemClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <nav className="hidden md:block w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <NavigationItems />
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 w-full md:w-auto">
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
