
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    'Prescription',
    'OTC & Wellness', 
    'Vitamins & Supplements',
    'Medical Devices'
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
      >
        <Menu className="h-6 w-6 text-slate-700" />
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl animate-slide-in-right">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Search */}
              <div className="border-b border-gray-200 pb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for medicines, brands..."
                    className="w-full h-10 pl-4 pr-4 rounded-lg border border-gray-300 focus:border-green-600 focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                <Link 
                  to="/" 
                  className="block py-3 px-4 text-slate-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/" 
                  className="block py-3 px-4 text-slate-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Shop
                </Link>
                
                {/* Categories with Submenu */}
                <div>
                  <button
                    onClick={() => setShowCategories(!showCategories)}
                    className="w-full flex items-center justify-between py-3 px-4 text-slate-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                  >
                    <span>Categories</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      showCategories ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {showCategories && (
                    <div className="ml-4 mt-2 space-y-1">
                      {categories.map((category) => (
                        <a
                          key={category}
                          href="#"
                          className="block py-2 px-4 text-sm text-slate-600 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {category}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <Link 
                  to="/about-us" 
                  className="block py-3 px-4 text-slate-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/contact-us" 
                  className="block py-3 px-4 text-slate-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </nav>

              {/* Cart and Auth */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Shopping Cart</span>
                  <CartIcon />
                </div>
                <a 
                  href="#" 
                  className="block py-3 px-4 text-slate-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                >
                  Log In / Sign Up
                </a>
                <a 
                  href="#" 
                  className="block py-3 px-4 text-slate-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                >
                  Help
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
