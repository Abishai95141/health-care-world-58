
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CoreMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCustomers: number;
  newCustomersThisMonth: number;
  returningCustomers: number;
  lowStockCount: number;
  outOfStockCount: number;
}

interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
}

interface TopProduct {
  id: string;
  name: string;
  totalQuantity: number;
  totalRevenue: number;
}

interface CategoryPerformance {
  category: string;
  totalSales: number;
  totalRevenue: number;
}

export const useAnalytics = () => {
  const [coreMetrics, setCoreMetrics] = useState<CoreMetrics | null>(null);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [categoryPerformance, setCategoryPerformance] = useState<CategoryPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCoreMetrics = async () => {
    try {
      // Get total revenue and orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('status', 'confirmed');

      if (ordersError) throw ordersError;

      const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
      const totalOrders = orders?.length || 0;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Get customer stats - handle potential null/undefined response
      let customerStats = {
        total_customers: 0,
        new_customers_this_month: 0,
        returning_customers: 0
      };

      try {
        const { data: statsData, error: customerError } = await supabase
          .rpc('get_customer_stats');

        if (!customerError && statsData && statsData.length > 0) {
          const stats = statsData[0];
          customerStats = {
            total_customers: stats.total_customers || 0,
            new_customers_this_month: stats.new_customers_this_month || 0,
            returning_customers: stats.returning_customers || 0
          };
        }
      } catch (error) {
        console.warn('Customer stats not available:', error);
      }

      // Get stock alerts
      const { data: lowStock, error: lowStockError } = await supabase
        .from('low_stock')
        .select('*');

      const { data: outOfStock, error: outOfStockError } = await supabase
        .from('out_of_stock')
        .select('*');

      if (lowStockError || outOfStockError) {
        console.warn('Stock data fetch error:', lowStockError || outOfStockError);
      }

      setCoreMetrics({
        totalRevenue,
        totalOrders,
        averageOrderValue,
        totalCustomers: customerStats.total_customers,
        newCustomersThisMonth: customerStats.new_customers_this_month,
        returningCustomers: customerStats.returning_customers,
        lowStockCount: lowStock?.length || 0,
        outOfStockCount: outOfStock?.length || 0,
      });

    } catch (error: any) {
      console.error('Error fetching core metrics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive",
      });
    }
  };

  const fetchSalesData = async () => {
    try {
      const { data, error } = await supabase
        .from('daily_sales')
        .select('*')
        .order('sale_date', { ascending: true })
        .limit(30);

      if (error) throw error;

      const formattedData = data?.map(item => ({
        date: item.sale_date || '',
        revenue: item.total_revenue || 0,
        orders: item.total_orders || 0,
        customers: 0 // This would need additional calculation
      })) || [];

      setSalesData(formattedData);
    } catch (error: any) {
      console.error('Error fetching sales data:', error);
    }
  };

  const fetchTopProducts = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_top_products', { limit_count: 10 });

      if (error) throw error;

      const formattedData = data?.map(item => ({
        id: item.product_id,
        name: item.product_name,
        totalQuantity: item.total_quantity,
        totalRevenue: item.total_revenue,
      })) || [];

      setTopProducts(formattedData);
    } catch (error: any) {
      console.error('Error fetching top products:', error);
    }
  };

  const fetchCategoryPerformance = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_top_categories', { limit_count: 10 });

      if (error) throw error;

      const formattedData = data?.map(item => ({
        category: item.category,
        totalSales: item.total_sales,
        totalRevenue: item.total_revenue,
      })) || [];

      setCategoryPerformance(formattedData);
    } catch (error: any) {
      console.error('Error fetching category performance:', error);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchCoreMetrics(),
      fetchSalesData(),
      fetchTopProducts(),
      fetchCategoryPerformance(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return {
    coreMetrics,
    salesData,
    topProducts,
    categoryPerformance,
    loading,
    refetch: fetchAllData,
  };
};
