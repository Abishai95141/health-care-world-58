
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Same header as Index would go here */}
      
      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center justify-center space-x-8">
            <span className="text-gray-400">Cart</span>
            <span className="text-gray-400">→</span>
            <span className="font-semibold text-green-600">Address</span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-400">Payment</span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-400">Review</span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-400">Confirmation</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Address & Shipping */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Shipping Address</h2>
              
              {/* Saved Addresses */}
              <div className="space-y-4 mb-6">
                {[
                  {
                    name: 'John Doe',
                    address: '123 Main Street, Apartment 4B',
                    city: 'Mumbai, Maharashtra 400001',
                    phone: '+91 98765 43210'
                  },
                  {
                    name: 'John Doe (Office)',
                    address: '456 Business Park, Floor 12',
                    city: 'Mumbai, Maharashtra 400070',
                    phone: '+91 98765 43210'
                  }
                ].map((address, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 cursor-pointer">
                    <div className="flex items-start">
                      <input 
                        type="radio" 
                        name="address" 
                        className="mt-1 mr-3 focus:ring-green-500" 
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{address.name}</h3>
                        <p className="text-gray-600 text-sm">{address.address}</p>
                        <p className="text-gray-600 text-sm">{address.city}</p>
                        <p className="text-gray-600 text-sm">{address.phone}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full border-dashed border-green-300 text-green-600 hover:bg-green-50">
                + Add New Address
              </Button>

              {/* Error placeholder (hidden) */}
              <div className="hidden mt-3 text-red-600 text-sm">
                Please select a shipping address
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Shipping Method</h2>
              
              <RadioGroup className="space-y-4">
                {[
                  { id: 'standard', name: 'Standard Delivery', price: '₹50', time: '3–5 days' },
                  { id: 'express', name: 'Express Delivery', price: '₹100', time: '1–2 days' },
                  { id: 'same-day', name: 'Same-Day Delivery', price: '₹200', time: 'Today' }
                ].map((method) => (
                  <div key={method.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300">
                    <RadioGroupItem value={method.id} id={method.id} disabled />
                    <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{method.name}</p>
                          <p className="text-sm text-gray-600">{method.time}</p>
                        </div>
                        <span className="font-semibold text-gray-900">{method.price}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Error placeholder (hidden) */}
              <div className="hidden mt-3 text-red-600 text-sm">
                Please select a shipping method
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="billing-same" />
                <Label htmlFor="billing-same" className="text-sm">Billing address same as shipping</Label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Paracetamol 500mg</p>
                      <p className="text-xs text-gray-600">Qty: 1</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">₹25.00</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹75.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₹50.00</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹125.00</span>
                  </div>
                </div>
              </div>

              <Button 
                disabled 
                className="w-full bg-gray-400 text-white cursor-not-allowed hover:bg-gray-400"
              >
                Continue to Payment
              </Button>

              {/* Error banner (hidden) */}
              <div className="hidden mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">Please complete all required fields above</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
