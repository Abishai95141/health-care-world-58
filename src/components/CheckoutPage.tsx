import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useApp } from '@/contexts/AppContext';
import { useState } from 'react';

const CheckoutPage = () => {
  const { cart, navigateTo, showToast } = useApp();
  
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('');
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [addressError, setAddressError] = useState('');
  const [shippingError, setShippingError] = useState('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Sample addresses
  const addresses = [
    {
      id: 'addr1',
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai, Maharashtra 400001',
      phone: '+91 98765 43210'
    },
    {
      id: 'addr2',
      name: 'John Doe (Office)',
      address: '456 Business Park, Floor 12',
      city: 'Mumbai, Maharashtra 400070',
      phone: '+91 98765 43210'
    }
  ];

  const shippingMethods = [
    { id: 'standard', name: 'Standard Delivery', price: 50, time: '3–5 days' },
    { id: 'express', name: 'Express Delivery', price: 100, time: '1–2 days' },
    { id: 'same-day', name: 'Same-Day Delivery', price: 200, time: 'Today' }
  ];

  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const shippingCost = selectedShippingMethod ? 
    shippingMethods.find(m => m.id === selectedShippingMethod)?.price || 50 : 50;
  const total = subtotal + shippingCost;

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
    setAddressError('');
  };

  const handleShippingMethodSelect = (methodId: string) => {
    setSelectedShippingMethod(methodId);
    setShippingError('');
  };

  const handleContinueToPayment = () => {
    let hasError = false;

    if (!selectedAddressId) {
      setAddressError('Please select a shipping address');
      hasError = true;
    }

    if (!selectedShippingMethod) {
      setShippingError('Please choose a shipping method');
      hasError = true;
    }

    if (!hasError) {
      navigateTo('/checkout/payment');
    }
  };

  const openAddressModal = (addressId?: string) => {
    setIsAddressModalOpen(true);
    // TODO: populate fields if editing existing address
  };

  const saveAddress = (addressData: any) => {
    // TODO: Save new address
    showToast('Address saved successfully', 'success');
    setIsAddressModalOpen(false);
  };

  const handleBillingCheckboxChange = (checked: boolean | "indeterminate") => {
    setBillingSameAsShipping(checked === true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                {addresses.map((address) => (
                  <button
                    key={address.id}
                    onClick={() => handleAddressSelect(address.id)}
                    className={`w-full border rounded-lg p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      selectedAddressId === address.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-start">
                      <input 
                        type="radio" 
                        name="address" 
                        checked={selectedAddressId === address.id}
                        onChange={() => handleAddressSelect(address.id)}
                        className="mt-1 mr-3 focus:ring-green-500" 
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{address.name}</h3>
                        <p className="text-gray-600 text-sm">{address.address}</p>
                        <p className="text-gray-600 text-sm">{address.city}</p>
                        <p className="text-gray-600 text-sm">{address.phone}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openAddressModal(address.id);
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                      >
                        Edit
                      </button>
                    </div>
                  </button>
                ))}
              </div>

              <Button 
                onClick={() => openAddressModal()}
                variant="outline" 
                className="w-full border-dashed border-green-300 text-green-600 hover:bg-green-50"
              >
                + Add New Address
              </Button>

              {addressError && (
                <div className="mt-3 text-red-600 text-sm">
                  {addressError}
                </div>
              )}
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Shipping Method</h2>
              
              <RadioGroup value={selectedShippingMethod} onValueChange={handleShippingMethodSelect}>
                <div className="space-y-4">
                  {shippingMethods.map((method) => (
                    <div 
                      key={method.id} 
                      className={`flex items-center space-x-3 p-4 border rounded-lg transition-colors ${
                        selectedShippingMethod === method.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{method.name}</p>
                            <p className="text-sm text-gray-600">{method.time}</p>
                          </div>
                          <span className="font-semibold text-gray-900">₹{method.price}</span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {shippingError && (
                <div className="mt-3 text-red-600 text-sm">
                  {shippingError}
                </div>
              )}
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="billing-same" 
                  checked={billingSameAsShipping}
                  onCheckedChange={handleBillingCheckboxChange}
                />
                <Label htmlFor="billing-same" className="text-sm">Billing address same as shipping</Label>
              </div>
              
              {!billingSameAsShipping && (
                <div className="mt-4 space-y-4">
                  <h3 className="font-medium text-gray-900">Billing Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Full Name" />
                    <Input placeholder="Phone Number" />
                    <Input placeholder="Street Address" className="md:col-span-2" />
                    <Input placeholder="City" />
                    <Input placeholder="State" />
                    <Input placeholder="PIN Code" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">₹{item.unitPrice * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₹{shippingCost}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleContinueToPayment}
                className={`w-full ${
                  selectedAddressId && selectedShippingMethod
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-400 text-gray-300 cursor-not-allowed'
                }`}
              >
                Continue to Payment
              </Button>

              {(addressError || shippingError) && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">Please complete all required fields above</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Add New Address</h2>
              <button 
                onClick={() => setIsAddressModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <Input placeholder="Full Name" />
              <Input placeholder="Phone Number" />
              <Input placeholder="Street Address" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="City" />
                <Input placeholder="State" />
              </div>
              <Input placeholder="PIN Code" />
            </div>

            <div className="flex items-center justify-between p-6 border-t">
              <button 
                onClick={() => setIsAddressModalOpen(false)}
                className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
              >
                Cancel
              </button>
              <Button 
                onClick={() => saveAddress({})}
                className="bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500"
              >
                Save Address
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
