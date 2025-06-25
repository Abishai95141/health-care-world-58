
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useApp } from '@/contexts/AppContext';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
    stock: number;
  };
}

export const useSimpleOrder = () => {
  const { user } = useAuth();
  const { showToast, navigateTo } = useApp();
  const [loading, setLoading] = useState(false);

  const placeSimpleOrder = async (cartItems: CartItem[], shippingCost: number, addressId?: string) => {
    if (!user) {
      showToast('Please sign in to place an order', 'error');
      return false;
    }

    if (!cartItems.length) {
      showToast('Your cart is empty', 'error');
      return false;
    }

    if (!addressId) {
      showToast('Please select a delivery address', 'error');
      return false;
    }

    setLoading(true);
    try {
      console.log('Creating simple order for user:', user.id);
      
      // Calculate total
      const subtotal = cartItems.reduce((total, item) => {
        return total + ((item.product?.price || 0) * item.quantity);
      }, 0);
      
      const totalAmount = subtotal + shippingCost;

      // Create order directly
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          shipping_amount: shippingCost,
          address_id: addressId,
          status: 'confirmed',
          payment_status: 'paid'
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw orderError;
      }

      console.log('Order created:', order);

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.product?.price || 0,
        total_price: (item.product?.price || 0) * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        throw itemsError;
      }

      // Update product stock
      for (const item of cartItems) {
        const { error: stockError } = await supabase
          .from('products')
          .update({
            stock: (item.product?.stock || 0) - item.quantity
          })
          .eq('id', item.product_id);

        if (stockError) {
          console.error('Error updating stock:', stockError);
          // Don't fail the order for stock update issues
        }
      }

      showToast('Order placed successfully!', 'success');
      
      // Navigate to order confirmation
      navigateTo(`/order-confirmation/${order.id}`);
      return true;
    } catch (error) {
      console.error('Error creating simple order:', error);
      showToast('Failed to place order. Please try again.', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    placeSimpleOrder,
    loading
  };
};
