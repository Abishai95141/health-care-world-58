
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const CartIcon = () => {
  const { cart, navigateTo } = useApp();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={() => navigateTo('/cart')}
      className="relative p-2 hover:scale-105 transition-transform duration-200 group"
    >
      <ShoppingCart className="h-6 w-6 text-slate-700 group-hover:text-green-600 transition-colors" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
