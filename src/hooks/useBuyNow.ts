
import { useState } from 'react';
import { useCart } from './useCart';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export const useBuyNow = () => {
  const { user } = useAuth();
  const { showToast } = useApp();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const buyNow = async (product: Product, quantity: number = 1) => {
    if (!user) {
      showToast('Please sign in to continue', 'error');
      navigate('/auth');
      return;
    }

    if (product.stock < quantity) {
      showToast('Insufficient stock available', 'error');
      return;
    }

    setLoading(true);
    try {
      // Add item to cart first
      const success = await addToCart(product.id, quantity);
      
      if (success) {
        // Navigate directly to checkout
        navigate('/checkout');
      }
    } catch (error) {
      console.error('Error in buy now flow:', error);
      showToast('Failed to proceed to checkout', 'error');
    } finally {
      setLoading(false);
    }
  };

  return {
    buyNow,
    loading
  };
};
