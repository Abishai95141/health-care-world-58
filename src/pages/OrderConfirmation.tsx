
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product?: {
    name: string;
    image_urls: string[] | null;
  };
}

interface Order {
  id: string;
  total_amount: number;
  shipping_amount: number | null;
  created_at: string;
  order_items: OrderItem[];
}

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !orderId) {
      console.log('Missing user or orderId:', { user: !!user, orderId });
      setError('Invalid order access');
      setLoading(false);
      return;
    }

    fetchOrder();
  }, [user, orderId]);

  const fetchOrder = async () => {
    try {
      console.log('Fetching order:', orderId, 'for user:', user!.id);
      
      // Add a small delay to ensure the order is fully created
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select(`
          id,
          total_amount,
          shipping_amount,
          created_at,
          order_items (
            id,
            product_id,
            quantity,
            unit_price,
            total_price,
            product:products (
              name,
              image_urls
            )
          )
        `)
        .eq('id', orderId)
        .eq('user_id', user!.id)
        .single();

      if (orderError) {
        console.error('Error fetching order:', orderError);
        
        // If not found, try without user_id filter to see if order exists at all
        const { data: anyOrder, error: anyOrderError } = await supabase
          .from('orders')
          .select('id, user_id')
          .eq('id', orderId)
          .single();
          
        if (anyOrderError) {
          console.error('Order does not exist:', anyOrderError);
          setError('Order not found');
        } else {
          console.error('Order exists but belongs to different user:', anyOrder);
          setError('You do not have permission to view this order');
        }
        return;
      }

      console.log('Order fetched successfully:', orderData);
      setOrder(orderData);
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const subtotal = order ? order.total_amount - (order.shipping_amount || 0) : 0;

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !order) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
            <p className="text-gray-600 mb-6">
              {error || "We couldn't find the order you're looking for or you don't have permission to view it."}
            </p>
            <Button 
              onClick={() => navigate('/shop')}
              className="bg-green-600 hover:bg-green-700"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank you for your order!</h1>
            <p className="text-gray-600">
              Your order has been confirmed and is being prepared for delivery.
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
              <div className="mt-2 text-sm text-gray-600">
                <p>Order #: {order.id}</p>
                <p>Order Date: {formatDate(order.created_at)}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    {item.product?.image_urls && item.product.image_urls.length > 0 ? (
                      <img
                        src={item.product.image_urls[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">No Image</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product?.name || 'Unknown Product'}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{item.unit_price}</p>
                    <p className="text-sm text-gray-600">Unit Price</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{item.total_price}</p>
                    <p className="text-sm text-gray-600">Total</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                {order.shipping_amount && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">₹{order.shipping_amount}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total</span>
                  <span>₹{order.total_amount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              onClick={() => navigate('/shop')}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Continue Shopping
            </Button>
            <Button 
              onClick={() => navigate('/profile')}
              variant="outline"
              className="flex-1"
            >
              View My Orders
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
