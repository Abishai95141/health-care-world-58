import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight, Star, Filter, X, Minus, Plus, Menu, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useApp } from '@/contexts/AppContext';

interface Product {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  brand: string;
  tags: string[];
  prescription: boolean;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Paracetamol 500mg",
    description: "Fever and pain relief medication",
    unitPrice: 50,
    category: "OTC & Wellness",
    stock: 100,
    rating: 4.5,
    reviews: 120,
    brand: "HealthCare",
    tags: ["fever", "pain relief", "headache"],
    prescription: false
  },
  {
    id: "p2",
    name: "Amoxicillin 250mg",
    description: "Antibiotic for bacterial infections",
    unitPrice: 120,
    category: "Prescription",
    stock: 50,
    rating: 4.2,
    reviews: 85,
    brand: "MediPharm",
    tags: ["antibiotic", "infection"],
    prescription: true
  },
  {
    id: "p3",
    name: "Vitamin D3 1000IU",
    description: "Supports bone health and immunity",
    unitPrice: 350,
    category: "Vitamins & Supplements",
    stock: 200,
    rating: 4.8,
    reviews: 210,
    brand: "NutriLife",
    tags: ["vitamin", "immunity", "bone health"],
    prescription: false
  },
  {
    id: "p4",
    name: "Blood Glucose Monitor",
    description: "Digital device for monitoring blood sugar levels",
    unitPrice: 1200,
    category: "Medical Devices",
    stock: 30,
    rating: 4.6,
    reviews: 95,
    brand: "DigiHealth",
    tags: ["diabetes", "monitor", "device"],
    prescription: false
  },
  {
    id: "p5",
    name: "Omeprazole 20mg",
    description: "For acid reflux and heartburn",
    unitPrice: 85,
    category: "OTC & Wellness",
    stock: 75,
    rating: 4.3,
    reviews: 110,
    brand: "GastroHelp",
    tags: ["heartburn", "acid reflux", "stomach"],
    prescription: false
  },
  {
    id: "p6",
    name: "Insulin Pen",
    description: "For diabetes management",
    unitPrice: 950,
    category: "Prescription",
    stock: 25,
    rating: 4.7,
    reviews: 65,
    brand: "DiabeCare",
    tags: ["diabetes", "insulin", "injection"],
    prescription: true
  },
  {
    id: "p7",
    name: "First Aid Kit",
    description: "Complete emergency medical kit",
    unitPrice: 450,
    category: "Medical Supplies",
    stock: 40,
    rating: 4.4,
    reviews: 88,
    brand: "SafetyFirst",
    tags: ["emergency", "first aid", "bandage"],
    prescription: false
  },
  {
    id: "p8",
    name: "Multivitamin Tablets",
    description: "Daily essential vitamins and minerals",
    unitPrice: 280,
    category: "Vitamins & Supplements",
    stock: 150,
    rating: 4.5,
    reviews: 175,
    brand: "NutriLife",
    tags: ["vitamin", "daily", "supplement"],
    prescription: false
  }
];

const categories = [
  { key: 'all', label: 'All Categories' },
  { key: 'otc', label: 'OTC & Wellness' },
  { key: 'prescription', label: 'Prescription' },
  { key: 'vitamins', label: 'Vitamins & Supplements' },
  { key: 'devices', label: 'Medical Devices' },
  { key: 'supplies', label: 'Medical Supplies' }
];

const featureMessages = [
  "Free delivery on orders over ₹1,000",
  "24/7 pharmacist consultation available",
  "100% genuine medicines guaranteed",
  "Easy returns within 30 days"
];

const Index = () => {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    navigateTo, 
    showToast,
    isLoggedIn 
  } = useApp();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sortOption, setSortOption] = useState('popularity');
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const carouselSlides = [
    {
      title: "Stay Healthy with Capsule Care",
      buttonText: "Shop Prescription Drugs",
      action: () => filterByCategory('Prescription')
    },
    {
      title: "Wellness Essentials Sale – Up to 25% Off",
      buttonText: "Shop OTC & Wellness", 
      action: () => filterByCategory('OTC & Wellness')
    },
    {
      title: "Free Same-Day Delivery on Orders Over ₹1,000",
      buttonText: "Learn More",
      action: () => scrollToSection('about')
    }
  ];

  // Carousel auto-play effect
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentSlide]);

  const nextSlide = () => {
    setFadeClass('opacity-0');
    setTimeout(() => {
      setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
      setFadeClass('opacity-100');
    }, 300);
  };

  const prevSlide = () => {
    setFadeClass('opacity-0');
    setTimeout(() => {
      setCurrentSlide(prev => prev === 0 ? carouselSlides.length - 1 : prev - 1);
      setFadeClass('opacity-100');
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      pauseAutoPlay();
      setFadeClass('opacity-0');
      setTimeout(() => {
        setCurrentSlide(index);
        setFadeClass('opacity-100');
      }, 300);
    }
  };

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      navigateTo('/login');
    } else {
      navigateTo('/cart');
    }
  };

  const handleHelpClick = () => {
    setIsHelpModalOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log(`Navigate to ${sectionId} section`);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const searchProducts = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const results = products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
    
    setFilteredProducts(results);
    setSelectedCategory('All Categories');
  };

  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'All Categories') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const filterByPrice = (range: number[]) => {
    setPriceRange(range);
    
    const filtered = products.filter(product => 
      product.unitPrice >= range[0] && product.unitPrice <= range[1]
    );
    
    setFilteredProducts(filtered);
  };

  const sortProducts = (option: string) => {
    setSortOption(option);
    let sorted = [...filteredProducts];
    
    switch (option) {
      case 'price-low':
        sorted.sort((a, b) => a.unitPrice - b.unitPrice);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.unitPrice - a.unitPrice);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        sorted.sort((a, b) => b.reviews - a.reviews);
        break;
    }
    
    setFilteredProducts(sorted);
  };

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
    setQuantity(1);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product, qty: number = 1) => {
    if (product.prescription && !isLoggedIn) {
      showToast('Please log in to purchase prescription medications', 'warning');
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      unitPrice: product.unitPrice,
      quantity: qty,
      stock: product.stock
    });
    
    showToast(`${product.name} added to cart`, 'success');
  };

  const incrementQuantity = () => {
    if (selectedProduct && quantity < selectedProduct.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-green-600 cursor-pointer" onClick={() => navigateTo('/')}>
                Capsule Care
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for medicines, brands…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      searchProducts(searchQuery);
                    }
                  }}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Cart and Account Links */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={handleCartClick}
                className="relative p-2 text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                aria-label="View cart"
              >
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button 
                onClick={() => navigateTo('/login')}
                className="text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
              >
                Log In / Sign Up
              </button>
              <button 
                onClick={handleHelpClick}
                className="text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
              >
                Help
              </button>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="border-t border-gray-200 py-4">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => navigateTo('/')}
                className="text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
              >
                Home
              </button>
              <button 
                onClick={() => navigateTo('/shop')}
                className="text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
              >
                Shop
              </button>
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
                >
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    {categories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => {
                          filterByCategory(category.label);
                          setIsCategoriesOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={() => navigateTo('/about-us')}
                className="text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
              >
                About Us
              </button>
              <button 
                onClick={() => navigateTo('/contact-us')}
                className="text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
              >
                Contact Us
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Carousel */}
      <section className="relative h-96 bg-gradient-to-r from-green-50 to-blue-50 overflow-hidden">
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-600 ${fadeClass}`}>
          <div className="text-center px-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {carouselSlides[currentSlide].title}
            </h2>
            <Button 
              onClick={() => {
                pauseAutoPlay();
                carouselSlides[currentSlide].action();
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
            >
              {carouselSlides[currentSlide].buttonText}
            </Button>
          </div>
        </div>

        {/* Carousel Controls */}
        <button 
          onClick={() => { pauseAutoPlay(); prevSlide(); }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <button 
          onClick={() => { pauseAutoPlay(); nextSlide(); }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                index === currentSlide ? 'bg-green-600' : 'bg-white bg-opacity-60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Feature Messages */}
      <section className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featureMessages.map((message, index) => (
              <div key={index} className="flex items-center justify-center text-center p-2">
                <span className="text-sm text-gray-600">{message}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-900 mr-2">
              {selectedCategory === 'All Categories' ? 'All Products' : selectedCategory}
            </h2>
            <span className="text-sm text-gray-500">
              ({filteredProducts.length} items)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => sortProducts(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="rating">Sort by: Rating</option>
                <option value="price-low">Sort by: Price (Low to High)</option>
                <option value="price-high">Sort by: Price (High to Low)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-1 bg-white border border-gray-300 rounded-md py-2 px-4 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.key} className="flex items-center">
                      <Checkbox
                        id={`category-${category.key}`}
                        checked={selectedCategory === category.label}
                        onCheckedChange={() => filterByCategory(category.label)}
                      />
                      <Label
                        htmlFor={`category-${category.key}`}
                        className="ml-2 text-sm text-gray-600"
                      >
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 1500]}
                    max={1500}
                    step={50}
                    value={priceRange}
                    onValueChange={(value) => filterByPrice(value)}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Prescription Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Prescription</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="rx-required" />
                    <Label
                      htmlFor="rx-required"
                      className="ml-2 text-sm text-gray-600"
                    >
                      Prescription Required
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="rx-not-required" />
                    <Label
                      htmlFor="rx-not-required"
                      className="ml-2 text-sm text-gray-600"
                    >
                      No Prescription Needed
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
              {/* Product Image */}
              <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                <span className="text-gray-400 text-sm">Product Image</span>
                <button
                  onClick={() => openQuickView(product)}
                  className="absolute bottom-2 right-2 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Quick view"
                >
                  <Search className="h-4 w-4" />
                </button>
                {product.prescription && (
                  <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    Rx
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-700 ml-1">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">({product.reviews} reviews)</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">₹{product.unitPrice}</span>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Quick View Modal */}
      {isQuickViewOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end p-4">
              <button 
                onClick={closeQuickView}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product Image */}
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Product Image</span>
              </div>
              
              {/* Product Details */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{selectedProduct.name}</h2>
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-gray-700 ml-1">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-gray-500 ml-2">({selectedProduct.reviews} reviews)</span>
                </div>
                
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">₹{selectedProduct.unitPrice}</span>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-1">Brand: {selectedProduct.brand}</p>
                  <p className="text-sm text-gray-600 mb-1">Category: {selectedProduct.category}</p>
                  <p className="text-sm text-gray-600 mb-1">
                    Availability: 
                    <span className={selectedProduct.stock > 0 ? "text-green-600" : "text-red-600"}>
                      {selectedProduct.stock > 0 ? " In Stock" : " Out of Stock"}
                    </span>
                  </p>
                  
                  {selectedProduct.prescription && (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-3">
                      <p className="text-sm text-blue-800">
                        This medication requires a valid prescription.
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="px-3 py-1 border-r border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button 
                      onClick={incrementQuantity}
                      disabled={quantity >= selectedProduct.stock}
                      className="px-3 py-1 border-l border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <Button
                    onClick={() => {
                      handleAddToCart(selectedProduct, quantity);
                      closeQuickView();
                    }}
                    disabled={selectedProduct.stock <= 0}
                    className="bg-green-600 hover:bg-green-700 text-white flex-1"
                  >
                    Add to Cart
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProduct.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Help & FAQ</h3>
              <button 
                onClick={() => setIsHelpModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">How do I place an order?</h4>
                <p className="text-gray-600 text-sm">Simply browse our products, add items to your cart, and proceed to checkout.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">What are your delivery charges?</h4>
                <p className="text-gray-600 text-sm">Standard delivery is ₹50. Free delivery on orders above ₹1,000.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">How can I contact customer support?</h4>
                <p className="text-gray-600 text-sm">Call us at +91 22 1234 5678 or use our 24/7 chat support.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Capsule Care</h3>
              <p className="text-gray-400 text-sm mb-4">
                Your trusted online pharmacy for all your healthcare needs.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigateTo('/about-us')}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateTo('/contact-us')}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => showToast('Coming Soon', 'info')}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    FAQs
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => showToast('Coming Soon', 'info')}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Policies</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => showToast('Coming Soon', 'info')}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => showToast('Coming Soon', 'info')}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => showToast('Coming Soon', 'info')}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Returns Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => showToast('Coming Soon', 'info')}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Shipping Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-gray-400 text-sm">123 Green Pharmacy Road, Mumbai, Maharashtra 400001</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 text-sm">+91 22 1234 5678</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 text-sm">support@capsulecare.com</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 text-sm">Mon–Sat: 8 AM – 8 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} Capsule Care. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
