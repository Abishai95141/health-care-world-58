
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const OrderConfirmation = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your order. Your items are being prepared for delivery.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigateTo('/shop')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Continue Shopping
          </Button>
          <Button 
            onClick={() => navigateTo('/')}
            variant="outline"
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
