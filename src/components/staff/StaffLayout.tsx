
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Upload, 
  AlertTriangle,
  Users,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStaffAuth } from '@/contexts/StaffAuthContext';

const StaffLayout = () => {
  const location = useLocation();
  const { signOut } = useStaffAuth();

  const navItems = [
    { path: '/staff', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/staff/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/staff/products', icon: Package, label: 'Products' },
    { path: '/staff/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/staff/add-product', icon: Upload, label: 'Add Product' },
    { path: '/staff/inventory-alerts', icon: AlertTriangle, label: 'Alerts' },
    { path: '/staff/bulk-import', icon: FileText, label: 'Bulk Import' },
    { path: '/staff/advertisements', icon: Settings, label: 'Ads' },
    { path: '/staff/banners', icon: Settings, label: 'Banners' },
  ];

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Staff Portal</h2>
        </div>
        
        <nav className="mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t">
          <Link to="/" className="flex items-center mb-3 text-sm text-gray-600 hover:text-gray-900">
            <Home className="w-4 h-4 mr-2" />
            Back to Store
          </Link>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full flex items-center justify-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default StaffLayout;
