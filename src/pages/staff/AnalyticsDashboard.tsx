
import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  AlertTriangle,
  Package,
  UserPlus,
  RefreshCw
} from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import MetricCard from '@/components/analytics/MetricCard';
import SalesChart from '@/components/analytics/SalesChart';
import TopProductsChart from '@/components/analytics/TopProductsChart';
import CategoryChart from '@/components/analytics/CategoryChart';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const AnalyticsDashboard = () => {
  const { 
    coreMetrics, 
    salesData, 
    topProducts, 
    categoryPerformance, 
    loading, 
    refetch 
  } = useAnalytics();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Comprehensive view of your e-commerce operations</p>
            </div>
            <Button onClick={refetch} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </Button>
          </div>
        </motion.div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={`₹${coreMetrics?.totalRevenue?.toLocaleString() || 0}`}
            icon={DollarSign}
          />
          <MetricCard
            title="Total Orders"
            value={coreMetrics?.totalOrders || 0}
            icon={ShoppingCart}
          />
          <MetricCard
            title="Average Order Value"
            value={`₹${coreMetrics?.averageOrderValue?.toFixed(2) || 0}`}
            icon={TrendingUp}
          />
          <MetricCard
            title="Total Customers"
            value={coreMetrics?.totalCustomers || 0}
            icon={Users}
          />
          <MetricCard
            title="New Customers (This Month)"
            value={coreMetrics?.newCustomersThisMonth || 0}
            icon={UserPlus}
          />
          <MetricCard
            title="Returning Customers"
            value={coreMetrics?.returningCustomers || 0}
            icon={Users}
          />
          <MetricCard
            title="Low Stock Items"
            value={coreMetrics?.lowStockCount || 0}
            icon={AlertTriangle}
            className="border-orange-200 bg-orange-50"
          />
          <MetricCard
            title="Out of Stock Items"
            value={coreMetrics?.outOfStockCount || 0}
            icon={Package}
            className="border-red-200 bg-red-50"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SalesChart data={salesData} />
          <TopProductsChart data={topProducts} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryChart data={categoryPerformance} />
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Manage Inventory
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Orders
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Customer Reports
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
