
import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Search, Star, ShoppingCart, ArrowRight, Pill, Shield, Truck, Clock, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/header/Header';

const ProductCard = ({ product }: { product: any }) => {
  const { addToCart, navigateTo } = useApp();

  const handleAddToCart = () => {
    addToCart(product.id, 1);
  };

  const handleBuyNow = () => {
    addToCart(product.id, 1);
    navigateTo('/checkout');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-square bg-gray-100 rounded-md mb-3 flex items-center justify-center">
        <Pill className="h-8 w-8 text-gray-400" />
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
      
      <div className="flex items-center mb-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
          ))}
        </div>
        <span className="text-sm text-gray-600 ml-2">({product.reviewCount})</span>
      </div>
      
      <div className="flex items-center mb-3">
        <span className="text-lg font-bold text-green-600">₹{product.price}</span>
        {product.mrp > product.price && (
          <span className="text-sm text-gray-500 line-through ml-2">₹{product.mrp}</span>
        )}
      </div>
      
      {product.tags.includes('SummerFever') && (
        <Badge variant="destructive" className="mb-3">Summer Fever</Badge>
      )}
      
      <div className="flex space-x-2">
        <Button onClick={handleAddToCart} variant="outline" size="sm" className="flex-1">
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
        <Button onClick={handleBuyNow} size="sm" className="flex-1">
          Buy Now
        </Button>
      </div>
    </div>
  );
};

const Index = () => {
  const { 
    visibleProducts, 
    searchQuery, 
    setSearchQuery, 
    currentCategory, 
    filterByCategory, 
    currentSort, 
    sortProducts,
    currentPage,
    changePage,
    rowsPerPage
  } = useApp();

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Get Your Medicines Delivered Fast",
      subtitle: "24/7 delivery service with genuine medicines at your doorstep",
      bg: "bg-gradient-to-r from-green-500 to-blue-600"
    },
    {
      title: "Expert Pharmacist Consultation",
      subtitle: "Get professional advice from certified pharmacists anytime",
      bg: "bg-gradient-to-r from-blue-500 to-purple-600"
    },
    {
      title: "Verified & Authentic Products",
      subtitle: "100% genuine medicines from trusted pharmaceutical brands",
      bg: "bg-gradient-to-r from-purple-500 to-pink-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = ['All', 'Prescription', 'OTC & Wellness', 'Vitamins & Supplements', 'Medical Devices'];
  const sortOptions = ['Popular', 'Price: Low→High', 'Price: High→Low', 'Top Rated', 'New Arrivals'];

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentProducts = visibleProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(visibleProducts.length / rowsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Carousel */}
      <section className="relative h-96 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${slide.bg} flex items-center justify-center transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-5xl font-bold mb-4 animate-fade-in">{slide.title}</h1>
              <p className="text-xl mb-8 animate-fade-in">{slide.subtitle}</p>
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick Refill</h3>
            <p className="text-gray-600 text-sm">Reorder your medicines with just one click</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Verified Pharma</h3>
            <p className="text-gray-600 text-sm">100% authentic medicines from licensed pharmacies</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">Same-day delivery in major cities</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Round-the-clock pharmacist consultation</p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={currentCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => filterByCategory(category)}
                  className={currentCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <select
              value={currentSort}
              onChange={(e) => sortProducts(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  onClick={() => changePage(pageNum)}
                  className={currentPage === pageNum ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {pageNum}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Capsule Care</h3>
              <p className="text-gray-400 mb-4">Your trusted online pharmacy for genuine medicines and healthcare products.</p>
              <div className="flex space-x-4">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-400">Licensed & Verified</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Information</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about-us" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/contact-us" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Social Media</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Capsule Care. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
