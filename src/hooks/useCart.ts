
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useApp } from '@/contexts/AppContext';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  product?: {
    id: string;
    name: string;
    price: number;
    stock: number;
    image_urls: string[] | null;
  };
}

export const useCart = () => {
  const { user } = useAuth();
  const { showToast } = useApp();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart items from database
  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products(
            id,
            name,
            price,
            stock,
            image_urls
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      showToast('Failed to load cart', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      showToast('Please sign in to add items to cart', 'error');
      return false;
    }

    try {
      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .maybeSingle();

      if (existingItem) {
        // Update quantity if item exists
        const { error } = await supabase
          .from('cart_items')
          .update({ 
            quantity: existingItem.quantity + quantity,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingItem.id);

        if (error) throw error;
        showToast('Cart updated successfully', 'success');
      } else {
        // Insert new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: productId,
            quantity
          });

        if (error) throw error;
        showToast('Item added to cart', 'success');
      }

      // Refresh cart
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToast('Failed to add item to cart', 'error');
      return false;
    }
  };

  // Update cart item quantity
  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (!user) return false;

    try {
      if (quantity <= 0) {
        return await removeFromCart(cartItemId);
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ 
          quantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', cartItemId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error updating quantity:', error);
      showToast('Failed to update quantity', 'error');
      return false;
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartItemId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      showToast('Item removed from cart', 'info');
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      showToast('Failed to remove item', 'error');
      return false;
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      
      showToast('Cart cleared', 'info');
      setCartItems([]);
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      showToast('Failed to clear cart', 'error');
      return false;
    }
  };

  // Calculate totals
  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.product?.price || 0;
    return total + (price * item.quantity);
  }, 0);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Fetch cart when user changes
  useEffect(() => {
    fetchCart();
  }, [user?.id]);

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('cart-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cart_items',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchCart();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refetch: fetchCart,
    cartTotal,
    totalItems
  };
};
