import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useIsMobile } from '@/hooks/use-mobile';

const EnhancedNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const isMobile = useIsMobile();

  // Track scroll position for navbar animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pulse cart when items change
  useEffect(() => {
    if (totalItems > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = (e.target as HTMLFormElement).search.value;
    if (query) {
      navigate('/shop');
    }
  };

  const isProfilePage = location.pathname === '/profile';
  const categories = ['Prescription', 'OTC & Wellness', 'Vitamins & Supplements', 'Medical Devices'];

  return (
    <header className={`
      fixed top-0 w-full z-50 transition-all duration-300 ease-out
      ${isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg h-14' 
        : 'bg-white border-b border-gray-200 h-16'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`
          flex justify-between items-center transition-all duration-300
          ${isScrolled ? 'h-14' : 'h-16'}
        `}>
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className={`
                font-bold text-green-600 hover:text-green-700 transition-all duration-200
                ${isScrolled ? 'text-xl' : 'text-2xl'}
              `}
            >
              Capsule Care
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {[
              { path: '/', label: 'Home' },
              { path: '/shop', label: 'Shop' },
              { path: '/about-us', label: 'About Us' },
              { path: '/contact-us', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  relative px-3 py-2 text-sm font-medium transition-colors duration-200
                  text-gray-700 hover:text-green-600
                  after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-green-600
                  after:left-0 after:bottom-0 after:scale-x-0 after:origin-left
                  after:transition-transform after:duration-300
                  hover:after:scale-x-100
                  ${location.pathname === item.path ? 'text-green-600 after:scale-x-100' : ''}
                `}
              >
                {item.label}
              </button>
            ))}
            
            {/* Categories Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                className="relative flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200
                          after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-green-600
                          after:left-0 after:bottom-0 after:scale-x-0 after:origin-left
                          after:transition-transform after:duration-300
                          hover:after:scale-x-100"
              >
                Categories
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isCategoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoriesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-fade-in">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        navigate('/shop');
                        setIsCategoriesDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors duration-200"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden sm:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input 
                name="search"
                placeholder="Search for medicines, brands…" 
                className={`
                  pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-green-500 focus:border-green-500
                  transition-all duration-300 ease-out
                  ${isSearchFocused ? 'scale-105 shadow-lg' : ''}
                `}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </form>
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Cart */}
            <button
              onClick={() => navigate('/cart')}
              className={`
                relative p-2 text-gray-700 hover:text-green-600 hover:scale-110
                focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg 
                transition-all duration-200
                ${cartPulse ? 'animate-pulse' : ''}
              `}
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className={`
                  absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 
                  flex items-center justify-center transition-all duration-200
                  ${cartPulse ? 'animate-bounce scale-125' : ''}
                `}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* User menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate('/profile')}
                  className="p-2 text-gray-700 hover:text-green-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg transition-all duration-200"
                >
                  <User className="h-6 w-6" />
                </button>
                {isProfilePage && (
                  <button
                    onClick={() => navigate('/')}
                    className="p-2 text-gray-700 hover:text-red-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg transition-all duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                )}
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="hover:scale-105 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => navigate('/auth')}
                className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-200"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Updated for better positioning */}
      <div className="sm:hidden border-t border-gray-200 p-4 bg-white z-40 relative mt-0">
        <form onSubmit={handleSearch} className="relative">
          <Input 
            name="search"
            placeholder="Search for medicines, brands…" 
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </form>
      </div>
    </header>
  );
};

export default EnhancedNavigation;
