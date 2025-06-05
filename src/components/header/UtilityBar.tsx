
import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, HelpCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UtilityBar = () => {
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <div className="bg-gray-50 border-b border-gray-200 h-10">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between text-sm">
        {/* Left Section - Desktop */}
        <div className="hidden lg:flex items-center space-x-4 text-slate-700">
          <a href="#" className="flex items-center space-x-1 hover:text-green-600 transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span>24/7 Pharmacist Chat</span>
          </a>
          <div className="h-4 w-px bg-gray-300"></div>
          <a href="tel:+912212345678" className="flex items-center space-x-1 hover:text-green-600 transition-colors">
            <Phone className="h-4 w-4" />
            <span>+91 22 1234 5678</span>
          </a>
          <a href="mailto:support@capsulecare.com" className="flex items-center space-x-1 hover:text-green-600 transition-colors">
            <Mail className="h-4 w-4" />
            <span>support@capsulecare.com</span>
          </a>
        </div>

        {/* Left Section - Mobile/Tablet */}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-slate-700 p-1">
                More <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white">
              <DropdownMenuItem asChild>
                <a href="#" className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>24/7 Pharmacist Chat</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="tel:+912212345678" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 22 1234 5678</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="mailto:support@capsulecare.com" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@capsulecare.com</span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 text-slate-700">
          <a href="#" className="hover:text-green-600 transition-colors">
            Log In / Sign Up
          </a>
          <button 
            onClick={() => setShowHelpModal(true)}
            className="hover:text-green-600 transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">How do I place an order?</p>
                <p className="text-gray-600">Browse our products and add them to cart...</p>
              </div>
              <div>
                <p className="font-medium">What are your delivery timings?</p>
                <p className="text-gray-600">We deliver 24/7 across major cities...</p>
              </div>
              <div>
                <p className="font-medium">How can I track my order?</p>
                <p className="text-gray-600">Use your order ID to track delivery...</p>
              </div>
            </div>
            <button 
              onClick={() => setShowHelpModal(false)}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UtilityBar;
