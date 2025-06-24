
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useStaffAuth } from '@/contexts/StaffAuthContext';
import { 
  LogOut, 
  Package, 
  Upload, 
  Users, 
  Plus, 
  Edit, 
  Bell,
  Megaphone,
  BarChart3,
  ShoppingCart,
  Warehouse,
  Star
} from 'lucide-react';

interface StaffLayoutProps {
  children: React.ReactNode;
}

const StaffLayout: React.FC<StaffLayoutProps> = ({ children }) => {
  const { logout } = useStaffAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/staff/login');
  };

  const navItems = [
    {
      title: 'Dashboard',
      items: [
        { name: 'Sales', href: '/staff/dashboard/sales', icon: BarChart3 },
        { name: 'Inventory', href: '/staff/dashboard/inventory', icon: Warehouse },
        { name: 'Customers', href: '/staff/dashboard/customers', icon: Star },
      ]
    },
    {
      title: 'Products',
      items: [
        { name: 'Manage Products', href: '/staff/products', icon: Package },
        { name: 'Add Product', href: '/staff/add-product', icon: Plus },
        { name: 'Bulk Import', href: '/staff/bulk-import', icon: Upload },
        { name: 'Inventory Alerts', href: '/staff/inventory-alerts', icon: Bell },
      ]
    },
    {
      title: 'Marketing',
      items: [
        { name: 'Banner Management', href: '/staff/banners', icon: Megaphone },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/staff" className="text-xl font-bold text-gray-900">
                Staff Portal
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <nav className="space-y-6">
              {navItems.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                            isActive
                              ? 'bg-indigo-50 text-indigo-700'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <Icon 
                            className={`mr-3 h-5 w-5 ${
                              isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                            }`} 
                          />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default StaffLayout;
