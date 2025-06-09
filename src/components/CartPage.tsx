
import React from 'react';
import { ChevronLeft, Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const CartPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    cartItems, 
    loading, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal 
  } = useCart();

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  const handleEmptyCart = () => {
    if (window.confirm("Are you sure you want to remove all items?")) {
      clearCart();
    }
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const shipping = 50;
  const total = cartTotal + shipping;

  if (!user) {
    return (
      <Layout>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Please sign in</h3>
            <p className="text-gray-600 mb-6">You need to be signed in to view your cart</p>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-green-600 hover:bg-green-700"
            >
              Sign In
            </Button>
          </div>
        </main>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 w-48 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-32 mx-auto"></div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500">Empty Cart</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet</p>
            <Button 
              onClick={() => navigate('/shop')}
              className="bg-green-600 hover:bg-green-700"
            >
              Shop Now
            </Button>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Your Shopping Cart ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
            </h1>
            
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
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
                    <h3 className="font-semibold text-gray-900">{item.product?.name || 'Unknown Product'}</h3>
                    <p className="text-gray-600 text-sm">SKU: {item.product_id}</p>
                    {item.product?.brand && (
                      <p className="text-gray-600 text-sm">Brand: {item.product.brand}</p>
                    )}
                  </div>
                  
                  <div className="text-right mr-6">
                    <p className="font-semibold text-gray-900">₹{item.product?.price || 0}</p>
                    <p className="text-sm text-gray-600">Unit Price</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 mr-6">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center py-1 border border-gray-300 rounded">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.product ? item.quantity >= item.product.stock : true}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="text-right mr-6">
                    <p className="font-semibold text-gray-900">₹{(item.product?.price || 0) * item.quantity}</p>
                    <p className="text-sm text-gray-600">Subtotal</p>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button 
                onClick={handleContinueShopping}
                className="flex items-center text-green-600 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Continue Shopping
              </button>
              <button 
                onClick={handleEmptyCart}
                className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1"
              >
                Empty Cart
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <div className="text-right">
                    <span className="font-semibold">₹{shipping}</span>
                    <span className="text-sm text-gray-500 block">(Standard)</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleProceedToCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 mb-6"
              >
                Proceed to Checkout
              </Button>

              {/* Trust Badges */}
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-3">We accept:</p>
                <div className="flex space-x-2">
                  {['Visa', 'MC', 'UPI'].map((payment) => (
                    <div key={payment} className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">{payment}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default CartPage;
