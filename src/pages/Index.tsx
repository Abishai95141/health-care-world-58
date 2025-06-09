
import { useState, useEffect } from 'react';
import { Search, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight, Star, X, Plus, Minus, Clock, Shield, Truck, MessageCircle, CreditCard, RotateCcw, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';
import FeaturedProducts from '@/components/FeaturedProducts';
import MobileDrawer from '@/components/MobileDrawer';

const Index = () => {
  const {
    selectedProduct,
    searchQuery,
    setSearchQuery,
    setSelectedProduct,
    navigateTo,
    showToast
  } = useApp();

  const { user } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlideTransitioning, setIsSlideTransitioning] = useState(false);

  // Auto-rotate carousel with fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSlideTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(prev => (prev + 1) % 3);
        setIsSlideTransitioning(false);
      }, 150);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = (e.target as HTMLFormElement).search.value;
    setSearchQuery(query);
    if (query) {
      navigate('/shop');
    }
  };

  const cartItemCount = totalItems;

  const handleCartClick = () => {
    if (!user) {
      navigate('/auth', { state: { from: '/cart' } });
    } else {
      navigateTo('/cart');
    }
  };

  const handleProfileClick = () => {
    if (!user) {
      navigate('/auth', { state: { from: '/profile' } });
    } else {
      navigateTo('/profile');
    }
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };

  // Category dropdown
  const categories = ['Prescription', 'OTC & Wellness', 'Vitamins & Supplements', 'Medical Devices'];

  // Feature card handlers with proper icons
  const features = [
    { 
      title: 'Quick Refill', 
      subtitle: 'Auto-refill on meds',
      icon: RotateCcw,
      message: 'Auto-refill setup coming soon!'
    },
    { 
      title: 'Verified Pharma', 
      subtitle: 'Genuine Brands',
      icon: Shield,
      message: 'All products are 100% genuine'
    },
    { 
      title: 'Fast Delivery', 
      subtitle: 'Within 48 Hours',
      icon: Truck,
      message: 'Free delivery on orders over ₹500'
    },
    { 
      title: '24/7 Pharmacist Chat', 
      subtitle: 'Expert Help Anytime',
      icon: MessageCircle,
      message: 'Chat support coming soon!'
    },
    { 
      title: 'Secure Payment', 
      subtitle: 'Encrypted & Safe',
      icon: CreditCard,
      message: 'Your payments are 100% secure'
    },
    { 
      title: 'Easy Returns', 
      subtitle: '14-Day Policy',
      icon: Clock,
      message: '14-day hassle-free returns'
    }
  ];

  const handleFeatureClick = (message: string) => {
    showToast(message, 'info');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button & Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="md:hidden p-2 text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-green-600">Capsule Care</h1>
              </div>
            </div>
            
            {/* Search Bar - Hidden on small screens */}
            <div className="hidden sm:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Input 
                  name="search"
                  placeholder="Search for medicines, brands…" 
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </form>
            </div>
            
            {/* Right side actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={handleCartClick}
                aria-label="View cart"
                className="relative p-2 text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              </button>
              
              <button 
                onClick={handleProfileClick}
                aria-label="View profile"
                className="p-2 text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg transition-colors"
              >
                <User className="h-6 w-6" />
              </button>
              
              {/* Desktop Auth/Help - Hidden on mobile */}
              <div className="hidden md:flex space-x-4 text-sm">
                {user ? (
                  <span className="text-gray-600">
                    Welcome, {user.email?.split('@')[0]}
                  </span>
                ) : (
                  <button 
                    onClick={handleLoginClick}
                    className="text-gray-600 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
                  >
                    Log In / Sign Up
                  </button>
                )}
                <button 
                  onClick={() => setIsHelpModalOpen(true)}
                  className="text-gray-600 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
                >
                  Help
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="sm:hidden border-t border-gray-200 p-4">
          <form onSubmit={handleSearch} className="relative">
            <Input 
              name="search"
              placeholder="Search for medicines, brands…" 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </form>
        </div>
        
        {/* Desktop Navigation Bar */}
        <nav className="hidden md:block bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-8 h-12">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-700 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/shop')}
                className="text-gray-700 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
              >
                Shop
              </button>
              <div className="relative">
                <button 
                  onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
                >
                  Categories
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                </button>
                {isCategoriesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          navigate('/shop');
                          setIsCategoriesDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 focus:outline-none focus:bg-gray-100"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={() => navigateTo('/about-us')}
                className="text-gray-700 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
              >
                About Us
              </button>
              <button 
                onClick={() => navigateTo('/contact-us')}
                className="text-gray-700 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
              >
                Contact Us
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer 
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        user={user}
        cartItemCount={cartItemCount}
        categories={categories}
        onNavigate={(path) => {
          navigate(path);
          setIsMobileDrawerOpen(false);
        }}
        onHelp={() => {
          setIsHelpModalOpen(true);
          setIsMobileDrawerOpen(false);
        }}
      />

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8">
        {/* Hero Carousel with better mobile spacing */}
        <section className="relative bg-gradient-to-r from-green-50 to-blue-50 overflow-hidden mx-auto max-w-7xl rounded-lg mt-6 mb-8">
          <div className="py-12 sm:py-20 px-6 sm:px-12">
            <div className={`text-center transition-opacity duration-300 ${isSlideTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                {currentSlide === 0 && 'Stay Healthy with Capsule Care'}
                {currentSlide === 1 && 'Wellness Essentials Sale – Up to 25% Off'}
                {currentSlide === 2 && 'Free Same-Day Delivery on Orders Over ₹1,000'}
              </h2>
              <div className="h-48 sm:h-64 bg-gray-200 rounded-lg mb-6 sm:mb-8 flex items-center justify-center">
                <span className="text-gray-500">Hero Image {currentSlide + 1}</span>
              </div>
              <div className="flex justify-center">
                <Button 
                  onClick={() => navigate('/shop')}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-green-500 transition-colors"
                >
                  {currentSlide === 0 && 'Shop Now'}
                  {currentSlide === 1 && 'Shop Sale Items'}
                  {currentSlide === 2 && 'Learn More'}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Carousel Controls */}
          <button 
            onClick={() => {
              setIsSlideTransitioning(true);
              setTimeout(() => {
                setCurrentSlide(currentSlide === 0 ? 2 : currentSlide - 1);
                setIsSlideTransitioning(false);
              }, 150);
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button 
            onClick={() => {
              setIsSlideTransitioning(true);
              setTimeout(() => {
                setCurrentSlide((currentSlide + 1) % 3);
                setIsSlideTransitioning(false);
              }, 150);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
          
          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => {
                  setIsSlideTransitioning(true);
                  setTimeout(() => {
                    setCurrentSlide(index);
                    setIsSlideTransitioning(false);
                  }, 150);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Category Navigation - Horizontal scroll on mobile */}
        <section className="bg-white py-6 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex md:justify-center space-x-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => navigate('/shop')}
                  className="flex-shrink-0 px-4 sm:px-6 py-2 border rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300 snap-center"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <div className="mb-8">
          <FeaturedProducts />
        </div>

        {/* Feature Highlights with better mobile grid */}
        <section className="bg-gray-50 py-12 sm:py-16 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleFeatureClick(feature.message)}
                    className="bg-white p-4 sm:p-6 rounded-lg text-center hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{feature.subtitle}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Top Deals Banner */}
        <section className="bg-orange-500 text-white py-4 -mx-4 sm:-mx-6 lg:-mx-8 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center">
                <span className="text-2xl mr-3">💊</span>
                <span className="text-lg font-semibold text-center sm:text-left">Summer Fever Essentials – Up to 20% Off!</span>
              </div>
              <Button 
                onClick={() => navigate('/shop')}
                className="bg-white text-orange-500 hover:bg-gray-100 focus:ring-2 focus:ring-white px-6 py-2"
              >
                Shop Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                {['Contact Us', 'Returns', 'FAQs', 'Shipping Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Information</h3>
              <ul className="space-y-2">
                {[
                  { text: 'About Us', onClick: () => navigateTo('/about-us') },
                  { text: 'Privacy Policy', onClick: () => {} },
                  { text: 'Terms of Service', onClick: () => {} },
                  { text: 'Careers', onClick: () => {} }
                ].map((link) => (
                  <li key={link.text}>
                    <button 
                      onClick={link.onClick}
                      className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
                    >
                      {link.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4 mb-6">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {['GMP Certified', 'ISO 9001', 'Verified Pharmacy'].map((seal) => (
                  <div key={seal} className="text-xs text-gray-400 border border-gray-600 px-2 py-1 rounded">
                    {seal}
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <Input 
                  placeholder="Enter your email" 
                  className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
                />
                <Button disabled className="bg-gray-600 text-gray-400 cursor-not-allowed whitespace-nowrap">Subscribe</Button>
              </div>
              <div className="hidden text-green-400 text-sm">Thank you for subscribing!</div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 mb-2">© 2025 Capsule Care Pharma – All Rights Reserved.</p>
            <a href="#" className="text-gray-500 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1 text-sm">
              Accessibility Statement
            </a>
          </div>
        </div>
      </footer>

      {/* Help Modal */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Help & Support</h2>
              <button 
                onClick={() => setIsHelpModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• How do I place an order?</li>
                    <li>• What are your delivery options?</li>
                    <li>• How can I track my order?</li>
                    <li>• What is your return policy?</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Contact Support</h3>
                  <p className="text-sm text-gray-600">
                    Email: support@capsulecare.com<br/>
                    Phone: 1-800-CAPSULE<br/>
                    Hours: 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
