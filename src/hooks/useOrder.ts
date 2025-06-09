
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

export const useOrder = () => {
  const { user } = useAuth();
  const { showToast } = useApp();
  const [loading, setLoading] = useState(false);

  const createOrder = async (cartItems: CartItem[], shippingCost: number, addressId?: string) => {
    if (!user) {
      showToast('Please sign in to place an order', 'error');
      return false;
    }

    if (!cartItems.length) {
      showToast('Your cart is empty', 'error');
      return false;
    }

    setLoading(true);
    try {
      console.log('Creating order for user:', user.id);
      
      // Calculate total amount
      const subtotal = cartItems.reduce((sum, item) => {
        const price = item.product?.price || 0;
        return sum + (price * item.quantity);
      }, 0);
      const totalAmount = subtotal + shippingCost;

      // Create the order
      const { data: orderData, error: orderError } = await supabase
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

      console.log('Order created:', orderData);

      // Create order items and update stock
      for (const item of cartItems) {
        if (!item.product) continue;

        // Insert order item
        const { error: itemError } = await supabase
          .from('order_items')
          .insert({
            order_id: orderData.id,
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.product.price,
            total_price: item.product.price * item.quantity
          });

        if (itemError) {
          console.error('Error creating order item:', itemError);
          throw itemError;
        }

        // Update product stock
        const newStock = item.product.stock - item.quantity;
        const { error: stockError } = await supabase
          .from('products')
          .update({ stock: Math.max(0, newStock) })
          .eq('id', item.product_id);

        if (stockError) {
          console.error('Error updating stock:', stockError);
          throw stockError;
        }

        console.log(`Updated stock for product ${item.product_id}: ${item.product.stock} -> ${newStock}`);
      }

      // Clear the cart
      const { error: clearError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (clearError) {
        console.error('Error clearing cart:', clearError);
        // Don't throw here as order is already created
      }

      showToast('Order placed successfully!', 'success');
      return true;
    } catch (error) {
      console.error('Error creating order:', error);
      showToast('Failed to place order. Please try again.', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder,
    loading
  };
};
