
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
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

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

      {/* Main Content - Removed top padding gap */}
      <main className="relative">
        {/* Enhanced Hero Carousel - No gap from banner */}
        <EnhancedCarousel />

        {/* Category Navigation */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-6xl mx-auto text-center px-6 lg:px-8">
            <div className="mb-12">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8 animate-fade-in">
                Shop by Category
              </h3>
            </div>
            <div className="flex justify-center flex-wrap gap-4">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => navigate('/shop')}
                  className="group px-8 py-4 bg-white border border-gray-200 rounded-2xl transition-all duration-300 
                           hover:border-black hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 
                           focus:ring-black focus:ring-offset-2 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-gray-700 group-hover:text-black transition-colors duration-200 font-medium">
                    {category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Service Highlights Strip */}
        <ServiceHighlights onServiceClick={handleServiceClick} />

        {/* Featured Products Section */}
        <div 
          ref={featuredProductsRef}
          className={`
            transition-all duration-700 ease-out
            ${featuredProductsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
            }
          `}
        >
          <FeaturedProducts />
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer 
        ref={footerRef}
        className={`
          bg-black text-white py-20 lg:py-24
          transition-all duration-700 ease-out
          ${footerVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Customer Service */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-6 text-white">Customer Service</h3>
              <ul className="space-y-4">
                {['Contact Us', 'Returns', 'FAQs', 'Shipping Policy'].map((link, index) => (
                  <li key={link}>
                    <button 
                      className="text-gray-400 hover:text-white transition-all duration-200 
                               hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-white 
                               focus:ring-offset-2 focus:ring-offset-black rounded-sm animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-6 text-white">Information</h3>
              <ul className="space-y-4">
                {[
                  { text: 'About Us', onClick: () => navigateTo('/about-us') },
                  { text: 'Privacy Policy', onClick: () => {} },
                  { text: 'Terms of Service', onClick: () => {} },
                  { text: 'Careers', onClick: () => {} }
                ].map((link, index) => (
                  <li key={link.text}>
                    <button 
                      onClick={link.onClick}
                      className="text-gray-400 hover:text-white transition-all duration-200 
                               hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-white 
                               focus:ring-offset-2 focus:ring-offset-black rounded-sm animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {link.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-6 text-white">Connect</h3>
              <div className="flex space-x-4 mb-8">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social, index) => (
                  <button
                    key={social}
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center 
                             hover:bg-white hover:scale-110 transition-all duration-300 
                             focus:outline-none focus:ring-2 focus:ring-white animate-fade-in group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-gray-400 group-hover:bg-black rounded transition-colors duration-200"></div>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {['GMP Certified', 'ISO 9001', 'Verified Pharmacy'].map((seal, index) => (
                  <div 
                    key={seal} 
                    className="text-xs text-gray-400 border border-gray-700 px-3 py-2 rounded-full 
                             hover:border-gray-500 hover:scale-105 transition-all duration-200 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {seal}
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-6 text-white">Newsletter</h3>
              <div className="space-y-4">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 
                           focus:ring-white focus:border-white rounded-xl h-12 transition-all duration-200"
                />
                <Button 
                  disabled 
                  className="w-full bg-gray-700 text-gray-400 cursor-not-allowed rounded-xl h-12 
                           transition-all duration-200"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-12 text-center">
            <p className="text-gray-400 mb-4 text-lg">© 2025 Capsule Care Pharma – All Rights Reserved.</p>
            <button className="text-gray-500 hover:text-white hover:scale-105 transition-all duration-200 
                             focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 
                             focus:ring-offset-black rounded-sm">
              Accessibility Statement
            </button>
          </div>
        </div>
      </footer>

      {/* Help Modal */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl">
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <h2 className="text-2xl font-semibold text-black">Help & Support</h2>
              <button 
                onClick={() => setIsHelpModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 
                         focus:outline-none focus:ring-2 focus:ring-black hover:scale-110"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4 text-black text-lg">Frequently Asked Questions</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="hover:text-black transition-colors duration-200">• How do I place an order?</li>
                    <li className="hover:text-black transition-colors duration-200">• What are your delivery options?</li>
                    <li className="hover:text-black transition-colors duration-200">• How can I track my order?</li>
                    <li className="hover:text-black transition-colors duration-200">• What is your return policy?</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-black text-lg">Contact Support</h3>
                  <div className="text-gray-600 space-y-2 leading-relaxed">
                    <p>Email: support@capsulecare.com</p>
                    <p>Phone: 1-800-CAPSULE</p>
                    <p>Hours: 24/7</p>
                  </div>
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
