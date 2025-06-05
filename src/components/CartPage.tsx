
import { ChevronLeft, Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CartPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Same header as Index would go here */}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Shopping Cart (3 items)</h1>
            
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-xs text-gray-500">Product</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Paracetamol 500mg Tablets</h3>
                    <p className="text-gray-600 text-sm">SKU: MED001</p>
                  </div>
                  
                  <div className="text-right mr-6">
                    <p className="font-semibold text-gray-900">₹25.00</p>
                    <p className="text-sm text-gray-600">Unit Price</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 mr-6">
                    <button className="p-1 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center py-1 border border-gray-300 rounded">1</span>
                    <button className="p-1 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="text-right mr-6">
                    <p className="font-semibold text-gray-900">₹25.00</p>
                    <p className="text-sm text-gray-600">Subtotal</p>
                  </div>
                  
                  <button className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button className="flex items-center text-green-600 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Continue Shopping
              </button>
              <button className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1">
                Empty Cart
              </button>
            </div>

            {/* Empty Cart State (Hidden) */}
            <div className="hidden bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500">Empty Cart</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet</p>
              <Button className="bg-green-600 hover:bg-green-700">Shop Now</Button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹75.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">₹50.00</span>
                  <span className="text-sm text-gray-500">(Standard)</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹125.00</span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 mb-6">
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
    </div>
  );
};

export default CartPage;
