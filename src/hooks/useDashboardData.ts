
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SalesKPIs {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  itemsPerOrder: number;
}

interface InventoryKPIs {
  totalStockValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  expiringCount: number;
}

interface CustomerKPIs {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  avgRating: number;
  cartAbandonmentRate: number;
}

export const useSalesData = () => {
  const [salesKPIs, setSalesKPIs] = useState<SalesKPIs>({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    itemsPerOrder: 0
  });
  const [salesOverTime, setSalesOverTime] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [topCategories, setTopCategories] = useState<any[]>([]);
  const [paymentBreakdown, setPaymentBreakdown] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSalesData = async () => {
    try {
      setLoading(true);

      // Fetch daily sales
      const { data: dailySales, error: salesError } = await supabase
        .from('daily_sales')
        .select('*')
        .limit(30);

      if (salesError) throw salesError;

      // Calculate KPIs
      const totalRevenue = dailySales?.reduce((sum, day) => sum + (day.total_revenue || 0), 0) || 0;
      const totalOrders = dailySales?.reduce((sum, day) => sum + (day.total_orders || 0), 0) || 0;
      const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Get items per order
      const { data: orderItems } = await supabase
        .from('order_items')
        .select('quantity, order_id');
      
      const itemsPerOrder = orderItems?.length > 0 ? 
        orderItems.reduce((sum, item) => sum + item.quantity, 0) / totalOrders : 0;

      setSalesKPIs({
        totalRevenue,
        totalOrders,
        avgOrderValue,
        itemsPerOrder
      });

      setSalesOverTime(dailySales || []);

      // Fetch top products
      const { data: products, error: productsError } = await supabase
        .rpc('get_top_products', { limit_count: 10 });

      if (productsError) throw productsError;
      setTopProducts(products || []);

      // Fetch top categories
      const { data: categories, error: categoriesError } = await supabase
        .rpc('get_top_categories', { limit_count: 10 });

      if (categoriesError) throw categoriesError;
      setTopCategories(categories || []);

      // Fetch payment breakdown
      const { data: payments, error: paymentsError } = await supabase
        .from('payment_breakdown')
        .select('*');

      if (paymentsError) throw paymentsError;
      setPaymentBreakdown(payments || []);

    } catch (error: any) {
      console.error('Error fetching sales data:', error);
      toast({
        title: "Error",
        description: "Failed to load sales data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return {
    salesKPIs,
    salesOverTime,
    topProducts,
    topCategories,
    paymentBreakdown,
    loading,
    refetch: fetchSalesData
  };
};

export const useInventoryData = () => {
  const [inventoryKPIs, setInventoryKPIs] = useState<InventoryKPIs>({
    totalStockValue: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    expiringCount: 0
  });
  const [stockValues, setStockValues] = useState<any[]>([]);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);
  const [outOfStockItems, setOutOfStockItems] = useState<any[]>([]);
  const [expiringItems, setExpiringItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchInventoryData = async () => {
    try {
      setLoading(true);

      // Fetch stock values
      const { data: stockData, error: stockError } = await supabase
        .from('stock_values')
        .select('*');

      if (stockError) throw stockError;

      const totalStockValue = stockData?.reduce((sum, category) => sum + (category.total_value || 0), 0) || 0;
      setStockValues(stockData || []);

      // Fetch low stock items
      const { data: lowStock, error: lowStockError } = await supabase
        .from('low_stock')
        .select('*');

      if (lowStockError) throw lowStockError;
      setLowStockItems(lowStock || []);

      // Fetch out of stock items
      const { data: outOfStock, error: outOfStockError } = await supabase
        .from('out_of_stock')
        .select('*');

      if (outOfStockError) throw outOfStockError;
      setOutOfStockItems(outOfStock || []);

      // Fetch expiring items
      const { data: expiring, error: expiringError } = await supabase
        .rpc('get_expiring_soon', { days_ahead: 30 });

      if (expiringError) throw expiringError;
      setExpiringItems(expiring || []);

      setInventoryKPIs({
        totalStockValue,
        lowStockCount: lowStock?.length || 0,
        outOfStockCount: outOfStock?.length || 0,
        expiringCount: expiring?.length || 0
      });

    } catch (error: any) {
      console.error('Error fetching inventory data:', error);
      toast({
        title: "Error",
        description: "Failed to load inventory data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  return {
    inventoryKPIs,
    stockValues,
    lowStockItems,
    outOfStockItems,
    expiringItems,
    loading,
    refetch: fetchInventoryData
  };
};

export const useCustomerData = () => {
  const [customerKPIs, setCustomerKPIs] = useState<CustomerKPIs>({
    totalCustomers: 0,
    newCustomers: 0,
    returningCustomers: 0,
    avgRating: 0,
    cartAbandonmentRate: 0
  });
  const [topRatedProducts, setTopRatedProducts] = useState<any[]>([]);
  const [lowestRatedProducts, setLowestRatedProducts] = useState<any[]>([]);
  const [recentReviews, setRecentReviews] = useState<any[]>([]);
  const [cartAbandonmentData, setCartAbandonmentData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCustomerData = async () => {
    try {
      setLoading(true);

      // Fetch customer stats
      const { data: customerStats, error: statsError } = await supabase
        .rpc('get_customer_stats');

      if (statsError) throw statsError;

      const stats = customerStats?.[0] || {};

      // Calculate average rating
      const { data: reviews } = await supabase
        .from('product_reviews')
        .select('rating');

      const avgRating = reviews?.length > 0 ? 
        reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

      // Get cart abandonment data
      const { data: abandonment, error: abandonmentError } = await supabase
        .rpc('get_cart_abandonment');

      if (abandonmentError) throw abandonmentError;

      const { data: activeSessions } = await supabase
        .from('cart_sessions')
        .select('*')
        .eq('status', 'active');

      const totalSessions = (abandonment?.length || 0) + (activeSessions?.length || 0);
      const cartAbandonmentRate = totalSessions > 0 ? (abandonment?.length || 0) / totalSessions * 100 : 0;

      setCustomerKPIs({
        totalCustomers: stats.total_customers || 0,
        newCustomers: stats.new_customers_this_month || 0,
        returningCustomers: stats.returning_customers || 0,
        avgRating,
        cartAbandonmentRate
      });

      setCartAbandonmentData(abandonment || []);

      // Fetch top rated products
      const { data: topRated, error: topRatedError } = await supabase
        .rpc('get_top_rated', { limit_count: 10 });

      if (topRatedError) throw topRatedError;
      setTopRatedProducts(topRated || []);

      // Fetch lowest rated products
      const { data: lowestRated, error: lowestRatedError } = await supabase
        .rpc('get_lowest_rated', { limit_count: 10 });

      if (lowestRatedError) throw lowestRatedError;
      setLowestRatedProducts(lowestRated || []);

      // Fetch recent reviews
      const { data: recentReviewsData, error: recentReviewsError } = await supabase
        .rpc('recent_reviews', { limit_count: 20 });

      if (recentReviewsError) throw recentReviewsError;
      setRecentReviews(recentReviewsData || []);

    } catch (error: any) {
      console.error('Error fetching customer data:', error);
      toast({
        title: "Error",
        description: "Failed to load customer data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  return {
    customerKPIs,
    topRatedProducts,
    lowestRatedProducts,
    recentReviews,
    cartAbandonmentData,
    loading,
    refetch: fetchCustomerData
  };
};
