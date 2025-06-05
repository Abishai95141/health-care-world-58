import { useState, useEffect } from 'react';
import { Search, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight, Star, X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useApp } from '@/contexts/AppContext';

const Index = () => {
  const {
    visibleProducts,
    cart,
    selectedProduct,
    searchQuery,
    currentCategory,
    currentSort,
    currentPage,
    rowsPerPage,
    filters,
    setSearchQuery,
    filterByCategory,
    sortProducts,
    applyAllFilters,
    addToCart,
    setSelectedProduct,
    changePage,
    setRowsPerPage,
    navigateTo,
    showToast
  } = useApp();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [tempFilters, setTempFilters] = useState(filters);
  const [tempPriceRange, setTempPriceRange] = useState({ min: 0, max: 2000 });

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = (e.target as HTMLFormElement).search.value;
    setSearchQuery(query);
    if (query) {
      document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart functionality
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartClick = () => {
    navigateTo('/cart');
  };

  // Category dropdown
  const categories = ['Prescription', 'OTC & Wellness', 'Vitamins & Supplements', 'Medical Devices'];

  // Product grid pagination
  const totalPages = Math.ceil(visibleProducts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedProducts = visibleProducts.slice(startIndex, startIndex + rowsPerPage);

  // Modal handlers
  const openProductModal = (product: any) => {
    setSelectedProduct(product);
    setProductQuantity(1);
    setSelectedImageIndex(0);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  // Filter modal handlers
  const openFilterModal = () => {
    setTempFilters(filters);
    setIsFilterModalOpen(true);
  };

  const applyFilters = () => {
    applyAllFilters(tempFilters);
    setIsFilterModalOpen(false);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: {
        prescription: false,
        otc: false,
        vitamins: false,
        devices: false
      },
      price: { min: 0, max: 2000 },
      brands: {
        'Acme Pharma': false,
        'BioHealth': false,
        'CapsuleCare': false,
        'OmniMeds': false
      },
      special: {
        inStock: false,
        expiresSoon: false,
        autoRefill: false,
        requiresPrescription: false
      }
    };
    setTempFilters(clearedFilters);
  };

  // Product modal handlers
  const handleAddToCart = () => {
    if (selectedProduct && selectedProduct.stock > 0) {
      addToCart(selectedProduct.id, productQuantity);
    }
  };

  const handleBuyNow = () => {
    if (selectedProduct && selectedProduct.stock > 0) {
      addToCart(selectedProduct.id, productQuantity);
      navigateTo('/checkout');
    }
  };

  // Feature card handlers
  const featureMessages = {
    'Quick Refill': 'Auto-refill setup coming soon!',
    'Verified Pharma': 'All products are 100% genuine',
    'Fast Delivery': 'Free delivery on orders over ₹500',
    '24/7 Pharmacist Chat': 'Chat support coming soon!',
    'Secure Payment': 'Your payments are 100% secure',
    'Easy Returns': '14-day hassle-free returns'
  };

  const handleFeatureClick = (featureTitle: string) => {
    showToast(featureMessages[featureTitle] || 'Feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-green-600">Capsule Care</h1>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Input 
                  name="search"
                  placeholder="Search for medicines, brands…" 
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </form>
            </div>
            
            {/* Cart and Account */}
            <div className="flex items-center space-x-6">
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
              <div className="flex space-x-4 text-sm">
                <button 
                  onClick={() => navigateTo('/login')}
                  className="text-gray-600 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
                >
                  Log In / Sign Up
                </button>
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
        
        {/* Navigation Bar */}
        <nav className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-8 h-12">
              <button 
                onClick={() => filterByCategory('All')}
                className="text-gray-700 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
              >
                Home
              </button>
              <button 
                onClick={() => document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' })}
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
                          filterByCategory(category);
                          setIsCategoriesDropdownOpen(false);
                          document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 focus:outline-none focus:bg-gray-100"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="text-gray-700 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">
                About Us
              </button>
              <button className="text-gray-700 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">
                Contact Us
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Carousel */}
        <section className="relative bg-gradient-to-r from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {currentSlide === 0 && 'Stay Healthy with Capsule Care'}
                {currentSlide === 1 && 'Wellness Essentials Sale – Up to 25% Off'}
                {currentSlide === 2 && 'Free Same-Day Delivery on Orders Over ₹1,000'}
              </h2>
              <div className="h-64 bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
                <span className="text-gray-500">Hero Image {currentSlide + 1}</span>
              </div>
              <Button 
                onClick={() => {
                  if (currentSlide === 0) {
                    filterByCategory('Prescription');
                  } else if (currentSlide === 1) {
                    filterByCategory('OTC & Wellness');
                  } else {
                    console.log('Learn More clicked');
                  }
                  document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg focus:ring-2 focus:ring-green-500 transition-colors"
              >
                {currentSlide === 0 && 'Shop Prescription Drugs'}
                {currentSlide === 1 && 'Shop OTC & Wellness'}
                {currentSlide === 2 && 'Learn More'}
              </Button>
            </div>
          </div>
          
          {/* Carousel Controls */}
          <button 
            onClick={() => setCurrentSlide(currentSlide === 0 ? 2 : currentSlide - 1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button 
            onClick={() => setCurrentSlide((currentSlide + 1) % 3)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
          
          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Category Navigation */}
        <section className="bg-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    filterByCategory(category);
                    document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-6 py-2 border rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    currentCategory === category
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {[
                { title: 'Quick Refill', subtitle: 'Auto-refill on meds' },
                { title: 'Verified Pharma', subtitle: 'Genuine Brands' },
                { title: 'Fast Delivery', subtitle: 'Within 48 Hours' },
                { title: '24/7 Pharmacist Chat', subtitle: 'Expert Help Anytime' },
                { title: 'Secure Payment', subtitle: 'Encrypted & Safe' },
                { title: 'Easy Returns', subtitle: '14-Day Policy' }
              ].map((feature, index) => (
                <button
                  key={index}
                  onClick={() => handleFeatureClick(feature.title)}
                  className="bg-white p-6 rounded-lg text-center hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-green-600 rounded"></div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.subtitle}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Top Deals Banner */}
        <section className="bg-orange-500 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">💊</span>
                <span className="text-lg font-semibold">Summer Fever Essentials – Up to 20% Off Bongolife 500 Tablets!</span>
              </div>
              <Button 
                onClick={() => {
                  // TODO: Filter by SummerFever tag
                  document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-orange-500 hover:bg-gray-100 focus:ring-2 focus:ring-white px-6 py-2"
              >
                Shop Now
              </Button>
            </div>
          </div>
        </section>

        {/* Action Bar */}
        <section className="bg-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center relative">
                  <span className="text-gray-700 mr-2">Sort:</span>
                  <button 
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="flex items-center text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
                  >
                    {currentSort} <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {isSortDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {['Popular', 'New Arrivals', 'Price: Low→High', 'Price: High→Low', 'Top Rated'].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            sortProducts(option);
                            setIsSortDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button 
                  onClick={openFilterModal}
                  className="flex items-center text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
                >
                  Filter: All <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="flex items-center relative">
                  <span className="text-gray-700 mr-2">Price:</span>
                  <button 
                    onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
                    className="flex items-center text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
                  >
                    ₹{tempPriceRange.min} – ₹{tempPriceRange.max} <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {isPriceDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <Input 
                            type="number"
                            placeholder="Min" 
                            value={tempFilters.price.min}
                            onChange={(e) => 
                              setTempFilters(prev => ({
                                ...prev,
                                price: { ...prev.price, min: parseInt(e.target.value) || 0 }
                              }))
                            }
                            className="flex-1" 
                          />
                          <Input 
                            type="number"
                            placeholder="Max" 
                            value={tempFilters.price.max}
                            onChange={(e) => 
                              setTempFilters(prev => ({
                                ...prev,
                                price: { ...prev.price, max: parseInt(e.target.value) || 2000 }
                              }))
                            }
                            className="flex-1" 
                          />
                        </div>
                        <Button 
                          onClick={() => {
                            applyAllFilters({ ...filters, price: tempPriceRange });
                            setIsPriceDropdownOpen(false);
                          }}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section id="product-grid" className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {paginatedProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => openProductModal(product)}
                      className="bg-white p-4 rounded-lg hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 text-left"
                    >
                      <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-gray-500">Product Image</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-lg font-bold text-green-600 mb-2">₹{product.price}</p>
                      <div className="flex items-center">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">({product.reviewCount})</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-12">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => changePage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 text-gray-500 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded disabled:opacity-50"
                    >
                      ‹
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => changePage(page)}
                          className={`px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            page === currentPage
                              ? 'bg-green-600 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button 
                      onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-500 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded disabled:opacity-50"
                    >
                      ›
                    </button>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700 mr-2">Rows per page:</span>
                    <select 
                      value={rowsPerPage}
                      onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value={20}>20</option>
                      <option value={40}>40</option>
                      <option value={60}>60</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              // Empty State
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500">No Results</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found for your filters</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                {['About Us', 'Privacy Policy', 'Terms of Service', 'Careers'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">{link}</a>
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
              <div className="flex space-x-4">
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
              <div className="flex mb-4">
                <Input 
                  placeholder="Enter your email" 
                  className="flex-1 mr-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
                />
                <Button disabled className="bg-gray-600 text-gray-400 cursor-not-allowed">Subscribe</Button>
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

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Filter Products</h2>
              <button 
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {[
                    { key: 'prescription', label: 'Prescription' },
                    { key: 'otc', label: 'OTC & Wellness' },
                    { key: 'vitamins', label: 'Vitamins & Supplements' },
                    { key: 'devices', label: 'Medical Devices' }
                  ].map((category) => (
                    <div key={category.key} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category.key}
                        checked={tempFilters.categories[category.key]}
                        onCheckedChange={(checked) => 
                          setTempFilters(prev => ({
                            ...prev,
                            categories: { ...prev.categories, [category.key]: checked }
                          }))
                        }
                      />
                      <Label htmlFor={category.key} className="text-sm">{category.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Input 
                      type="number"
                      placeholder="Min" 
                      value={tempFilters.price.min}
                      onChange={(e) => 
                        setTempFilters(prev => ({
                          ...prev,
                          price: { ...prev.price, min: parseInt(e.target.value) || 0 }
                        }))
                      }
                      className="flex-1" 
                    />
                    <Input 
                      type="number"
                      placeholder="Max" 
                      value={tempFilters.price.max}
                      onChange={(e) => 
                        setTempFilters(prev => ({
                          ...prev,
                          price: { ...prev.price, max: parseInt(e.target.value) || 2000 }
                        }))
                      }
                      className="flex-1" 
                    />
                  </div>
                </div>
              </div>

              {/* Brand */}
              <div>
                <h3 className="font-semibold mb-3">Brand</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {Object.keys(tempFilters.brands).map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox 
                        id={brand}
                        checked={tempFilters.brands[brand]}
                        onCheckedChange={(checked) => 
                          setTempFilters(prev => ({
                            ...prev,
                            brands: { ...prev.brands, [brand]: checked }
                          }))
                        }
                      />
                      <Label htmlFor={brand} className="text-sm">{brand}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Filters */}
              <div>
                <h3 className="font-semibold mb-3">Special Filters</h3>
                <div className="space-y-2">
                  {[
                    { key: 'inStock', label: 'Only In-Stock' },
                    { key: 'expiresSoon', label: 'Expires Soon (Next 30 Days)' },
                    { key: 'autoRefill', label: 'Auto-Refill Eligible' },
                    { key: 'requiresPrescription', label: 'Requires Prescription' }
                  ].map((filter) => (
                    <div key={filter.key} className="flex items-center space-x-2">
                      <Checkbox 
                        id={filter.key}
                        checked={tempFilters.special[filter.key]}
                        onCheckedChange={(checked) => 
                          setTempFilters(prev => ({
                            ...prev,
                            special: { ...prev.special, [filter.key]: checked }
                          }))
                        }
                      />
                      <Label htmlFor={filter.key} className="text-sm">{filter.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 border-t">
              <button 
                onClick={clearAllFilters}
                className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
              >
                Clear All
              </button>
              <Button 
                onClick={applyFilters}
                className="bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {isProductModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">{selectedProduct.name}</h2>
              <button 
                onClick={closeProductModal}
                className="p-1 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Images */}
              <div>
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center relative">
                  <span className="text-gray-500">Large Product Image {selectedImageIndex + 1}</span>
                  <button 
                    onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setSelectedImageIndex(Math.min(selectedProduct.images.length - 1, selectedImageIndex + 1))}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex space-x-2">
                  {selectedProduct.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-20 h-20 bg-gray-200 rounded flex items-center justify-center border-2 ${
                        selectedImageIndex === index ? 'border-green-600' : 'border-gray-300'
                      }`}
                    >
                      <span className="text-xs text-gray-500">Thumb {index + 1}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h1>
                  <div className="flex items-center mt-2">
                    <span className="text-2xl font-bold text-green-600">₹{selectedProduct.price}</span>
                    <span className="text-lg text-gray-500 line-through ml-2">₹{selectedProduct.mrp}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <button className="text-sm text-blue-600 hover:underline ml-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">
                      ({selectedProduct.reviewCount} reviews)
                    </button>
                  </div>
                </div>

                <p className="text-gray-600">{selectedProduct.description}</p>

                {/* Stock Indicator */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Stock Level</span>
                    <span className="text-sm text-green-600">In Stock: {selectedProduct.stock} units</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (selectedProduct.stock / 200) * 100)}%` }}
                    ></div>
                  </div>
                  {selectedProduct.stock < 20 && (
                    <p className="text-sm text-red-600 mt-1">Only {selectedProduct.stock} left!</p>
                  )}
                </div>

                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setProductQuantity(Math.max(1, productQuantity - 1))}
                      disabled={productQuantity <= 1}
                      className="p-2 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border border-gray-300 rounded bg-gray-50">{productQuantity}</span>
                    <button 
                      onClick={() => setProductQuantity(Math.min(selectedProduct.stock, productQuantity + 1))}
                      disabled={productQuantity >= selectedProduct.stock}
                      className="p-2 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button 
                    onClick={handleAddToCart}
                    disabled={selectedProduct.stock === 0}
                    className="flex-1 bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {selectedProduct.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                  <Button 
                    onClick={handleBuyNow}
                    disabled={selectedProduct.stock === 0}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {selectedProduct.stock === 0 ? 'Out of Stock' : 'Buy Now'}
                  </Button>
                </div>

                {/* You Might Also Like */}
                <div>
                  <h3 className="font-semibold mb-3">You Might Also Like</h3>
                  <div className="flex space-x-3 overflow-x-auto">
                    {visibleProducts.filter(p => p.id !== selectedProduct.id).slice(0, 3).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedProduct(item);
                          setProductQuantity(1);
                          setSelectedImageIndex(0);
                        }}
                        className="flex-shrink-0 w-24 text-center focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                      >
                        <div className="w-20 h-20 bg-gray-200 rounded mb-2 mx-auto flex items-center justify-center">
                          <span className="text-xs text-gray-500">IMG</span>
                        </div>
                        <p className="text-xs text-gray-700 mb-1">{item.name.slice(0, 15)}...</p>
                        <p className="text-xs font-semibold text-green-600">₹{item.price}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="border-t pt-6">
                  <nav className="flex space-x-6">
                    {['Details', 'Ingredients', 'Customer Reviews', 'Q&A'].map((tab) => (
                      <button
                        key={tab}
                        className="text-sm font-medium text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1 py-1"
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            <div className="p-6 border-t">
              <div className="flex items-center justify-between">
                <button 
                  onClick={closeProductModal}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
