
import React from 'react';
import { Helmet } from 'react-helmet';
import StaffLayout from '@/components/staff/StaffLayout';
import KPICard from '@/components/dashboard/KPICard';
import SalesChart from '@/components/dashboard/SalesChart';
import TopProductsChart from '@/components/dashboard/TopProductsChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSalesData } from '@/hooks/useDashboardData';
import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  Package 
} from 'lucide-react';

const SalesDashboard = () => {
  const { 
    salesKPIs, 
    salesOverTime, 
    topProducts, 
    topCategories, 
    paymentBreakdown, 
    loading 
  } = useSalesData();

  return (
    <>
      <Helmet>
        <title>Sales Dashboard - Staff Portal</title>
      </Helmet>
      <StaffLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sales Dashboard</h1>
            <p className="text-muted-foreground">
              Track your sales performance and revenue metrics
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPICard
              title="Total Revenue"
              value={salesKPIs.totalRevenue}
              icon={DollarSign}
              format="currency"
            />
            <KPICard
              title="Total Orders"
              value={salesKPIs.totalOrders}
              icon={ShoppingCart}
            />
            <KPICard
              title="Average Order Value"
              value={salesKPIs.avgOrderValue}
              icon={TrendingUp}
              format="currency"
            />
            <KPICard
              title="Items per Order"
              value={salesKPIs.itemsPerOrder.toFixed(1)}
              icon={Package}
            />
          </div>

          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <SalesChart data={salesOverTime} loading={loading} />
            <TopProductsChart data={topProducts} loading={loading} />
          </div>

          {/* Tables */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Top Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead>Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topCategories.slice(0, 5).map((category, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{category.category}</TableCell>
                          <TableCell>{category.total_sales}</TableCell>
                          <TableCell>₹{category.total_revenue?.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Payment Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentBreakdown.map((payment, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium capitalize">
                            {payment.payment_status}
                          </TableCell>
                          <TableCell>{payment.order_count}</TableCell>
                          <TableCell>₹{payment.total_amount?.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </StaffLayout>
    </>
  );
};

export default SalesDashboard;
