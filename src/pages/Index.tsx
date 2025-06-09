
import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, ChevronDown, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';
import FeaturedProducts from '@/components/FeaturedProducts';
import MobileDrawer from '@/components/MobileDrawer';
import ServiceHighlights from '@/components/ServiceHighlights';
import StickyOfferBanner from '@/components/StickyOfferBanner';
import EnhancedNavigation from '@/components/EnhancedNavigation';
import EnhancedCarousel from '@/components/EnhancedCarousel';

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
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Refs for intersection observer
  const featuredProductsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [featuredProductsVisible, setFeaturedProductsVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  // Intersection Observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === featuredProductsRef.current && entry.isIntersecting) {
            setFeaturedProductsVisible(true);
          }
          if (entry.target === footerRef.current && entry.isIntersecting) {
            setFooterVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuredProductsRef.current) observer.observe(featuredProductsRef.current);
    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleServiceClick = (message: string) => {
    showToast(message, 'info');
  };

  const cartItemCount = totalItems;
  const categories = ['Prescription', 'OTC & Wellness', 'Vitamins & Supplements', 'Medical Devices'];

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Navigation */}
      <EnhancedNavigation />

      {/* Sticky Offer Banner */}
      <StickyOfferBanner onShopNow={() => navigate('/shop')} />

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

      {/* Main Content with top padding for sticky header and banner */}
      <main className="pt-32 px-4 sm:px-6 lg:px-8">
        {/* Enhanced Hero Carousel */}
        <EnhancedCarousel />

        {/* Service Highlights Strip */}
        <ServiceHighlights onServiceClick={handleServiceClick} />

        {/* Category Navigation - Horizontal scroll on mobile */}
        <section className="bg-white py-6 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex md:justify-center space-x-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => navigate('/shop')}
                  className="flex-shrink-0 px-4 sm:px-6 py-2 border rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:scale-105 hover:shadow-md snap-center"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section with Animation */}
        <div 
          ref={featuredProductsRef}
          className={`
            mb-8 transition-all duration-700 ease-out
            ${featuredProductsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
            }
          `}
        >
          <FeaturedProducts />
        </div>
      </main>

      {/* Enhanced Footer with Animation */}
      <footer 
        ref={footerRef}
        className={`
          bg-gray-900 text-white py-12 sm:py-16 -mx-4 sm:-mx-6 lg:-mx-8
          transition-all duration-700 ease-out
          ${footerVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                {['Contact Us', 'Returns', 'FAQs', 'Shipping Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1 transition-colors duration-200">{link}</a>
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
                      className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1 transition-colors duration-200"
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
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {['GMP Certified', 'ISO 9001', 'Verified Pharmacy'].map((seal) => (
                  <div key={seal} className="text-xs text-gray-400 border border-gray-600 px-2 py-1 rounded hover:border-gray-500 transition-colors duration-200">
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
            <a href="#" className="text-gray-500 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1 text-sm transition-colors duration-200">
              Accessibility Statement
            </a>
          </div>
        </div>
      </footer>

      {/* Help Modal */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Help & Support</h2>
              <button 
                onClick={() => setIsHelpModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-500 hover:scale-110 transition-all duration-200"
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
