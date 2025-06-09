import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
interface DashboardStats {
  totalProducts: number;
  outOfStockItems: number;
  lowStockItems: number;
  recentImports: number;
}
const StaffDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    outOfStockItems: 0,
    lowStockItems: 0,
    recentImports: 0
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchDashboardStats();
  }, []);
  const fetchDashboardStats = async () => {
    try {
      // Fetch total products
      const {
        count: totalProducts
      } = await supabase.from('products').select('*', {
        count: 'exact',
        head: true
      });

      // Fetch out of stock items
      const {
        count: outOfStockItems
      } = await supabase.from('products').select('*', {
        count: 'exact',
        head: true
      }).eq('stock', 0);

      // Fetch low stock items (stock <= 10 but > 0)
      const {
        count: lowStockItems
      } = await supabase.from('products').select('*', {
        count: 'exact',
        head: true
      }).gt('stock', 0).lte('stock', 10);

      // Fetch recent imports (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const {
        count: recentImports
      } = await supabase.from('product_import_logs').select('*', {
        count: 'exact',
        head: true
      }).gte('imported_at', sevenDaysAgo.toISOString());
      setStats({
        totalProducts: totalProducts || 0,
        outOfStockItems: outOfStockItems || 0,
        lowStockItems: lowStockItems || 0,
        recentImports: recentImports || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };
  const statCards = [{
    title: 'Total Products',
    value: stats.totalProducts,
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  }, {
    title: 'Out of Stock Items',
    value: stats.outOfStockItems,
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  }, {
    title: 'Low Stock Items',
    value: stats.lowStockItems,
    icon: TrendingUp,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  }, {
    title: 'Recent Imports',
    value: stats.recentImports,
    icon: Clock,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  }];
  if (loading) {
    return <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#0B1F45]">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>)}
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#0B1F45]">Dashboard</h1>
        <p className="text-sm text-gray-600">
      </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(card => {
        const Icon = card.icon;
        return <Card key={card.title} className="rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                    <p className="text-2xl font-bold text-[#0B1F45]">{card.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>;
      })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#0B1F45]">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Add New Product</span>
              <span className="text-xs text-gray-500">Manually add products</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Bulk Import</span>
              <span className="text-xs text-gray-500">Import via CSV</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Inventory Check</span>
              <span className="text-xs text-gray-500">Review stock levels</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#0B1F45]">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Database</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Backup</span>
              <span className="text-xs text-gray-500">Today, 2:00 AM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Storage Usage</span>
              <span className="text-xs text-gray-500">45% of 100GB</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default StaffDashboard;