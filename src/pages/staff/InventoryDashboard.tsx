
import React from 'react';
import { Helmet } from 'react-helmet';
import StaffLayout from '@/components/staff/StaffLayout';
import KPICard from '@/components/dashboard/KPICard';
import InventoryTable from '@/components/dashboard/InventoryTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useInventoryData } from '@/hooks/useDashboardData';
import { 
  DollarSign, 
  AlertTriangle, 
  XCircle, 
  Clock 
} from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const InventoryDashboard = () => {
  const { 
    inventoryKPIs, 
    stockValues, 
    lowStockItems, 
    outOfStockItems, 
    expiringItems, 
    loading,
    refetch 
  } = useInventoryData();

  const stockValueData = stockValues.map(item => ({
    name: item.category,
    value: item.total_value
  }));

  return (
    <>
      <Helmet>
        <title>Inventory Dashboard - Staff Portal</title>
      </Helmet>
      <StaffLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your inventory levels and stock performance
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPICard
              title="Total Stock Value"
              value={inventoryKPIs.totalStockValue}
              icon={DollarSign}
              format="currency"
            />
            <KPICard
              title="Low Stock Items"
              value={inventoryKPIs.lowStockCount}
              icon={AlertTriangle}
            />
            <KPICard
              title="Out of Stock"
              value={inventoryKPIs.outOfStockCount}
              icon={XCircle}
            />
            <KPICard
              title="Expiring Soon"
              value={inventoryKPIs.expiringCount}
              icon={Clock}
            />
          </div>

          {/* Stock Value Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Stock Value by Category</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stockValueData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stockValueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Inventory Tables */}
          <div className="grid gap-4">
            <InventoryTable
              title="Low Stock Items"
              data={lowStockItems}
              loading={loading}
              type="low-stock"
              onRefresh={refetch}
            />
            
            <InventoryTable
              title="Out of Stock Items"
              data={outOfStockItems}
              loading={loading}
              type="out-of-stock"
              onRefresh={refetch}
            />
            
            <InventoryTable
              title="Items Expiring Soon"
              data={expiringItems}
              loading={loading}
              type="expiring"
            />
          </div>
        </div>
      </StaffLayout>
    </>
  );
};

export default InventoryDashboard;
