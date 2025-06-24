
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useApp } from '@/contexts/AppContext';
import { useCartSessions } from './useCartSessions';

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

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export const useOrder = () => {
  const { user } = useAuth();
  const { showToast, navigateTo } = useApp();
  const { markSessionConverted } = useCartSessions();
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
      
      // Use the Supabase function to place the order
      const { data, error } = await supabase.rpc('place_order', {
        cart_user_id: user.id,
        shipping_cost: shippingCost,
        order_address_id: addressId
      });

      if (error) {
        console.error('Error creating order:', error);
        throw error;
      }

      console.log('Order function result:', data);

      if (data && data.length > 0) {
        const result = data[0];
        if (result.success) {
          // Mark cart session as converted
          await markSessionConverted();
          
          showToast('Order placed successfully!', 'success');
          navigateTo(`/order-confirmation/${result.order_id}`);
          return true;
        } else {
          showToast(result.error_message || 'Failed to place order', 'error');
          return false;
        }
      } else {
        throw new Error('No response from order function');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      showToast('Failed to place order. Please try again.', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createSingleItemOrder = async (product: Product, quantity: number, shippingCost: number = 50, addressId?: string) => {
    if (!user) {
      showToast('Please sign in to place an order', 'error');
      return false;
    }

    if (product.stock < quantity) {
      showToast('Insufficient stock available', 'error');
      return false;
    }

    setLoading(true);
    try {
      console.log('Creating single item order for product:', product.id);
      
      // First add item to cart temporarily
      const { error: cartError } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          product_id: product.id,
          quantity: quantity
        });

      if (cartError) {
        console.error('Error adding to cart:', cartError);
        throw cartError;
      }

      // Then use the place_order function
      const { data, error } = await supabase.rpc('place_order', {
        cart_user_id: user.id,
        shipping_cost: shippingCost,
        order_address_id: addressId
      });

      if (error) {
        console.error('Error creating single item order:', error);
        throw error;
      }

      console.log('Single item order function result:', data);

      if (data && data.length > 0) {
        const result = data[0];
        if (result.success) {
          // Mark cart session as converted
          await markSessionConverted();
          
          showToast('Order placed successfully!', 'success');
          navigateTo(`/order-confirmation/${result.order_id}`);
          return true;
        } else {
          showToast(result.error_message || 'Failed to place order', 'error');
          return false;
        }
      } else {
        throw new Error('No response from order function');
      }
    } catch (error) {
      console.error('Error creating single item order:', error);
      showToast('Failed to place order. Please try again.', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder,
    createSingleItemOrder,
    loading
  };
};
