
import React from 'react';
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
  LogOut
} from 'lucide-react';

interface StaffLayoutProps {
  children: React.ReactNode;
}

const StaffLayout = ({ children }: StaffLayoutProps) => {
  const { user, signOut } = useStaffAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[#27AE60]">Capsule Care Staff Portal</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="text-gray-600 hover:text-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href;
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#27AE60] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
