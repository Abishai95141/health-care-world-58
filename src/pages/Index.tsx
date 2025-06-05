import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Filter, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { cart, addToCart, navigateTo } = useApp();
  const { user, isLoggedIn } = useAuth();

  const products = [
    { id: 1, name: 'Paracetamol 500mg Tablets', category: 'Pain Relief', price: 25, rating: 4.5, reviews: 128, stock: 50, image: '/placeholder.svg', description: 'Effective pain relief for headaches, fever, and mild to moderate pain.' },
    { id: 2, name: 'Vitamin D3 Supplements', category: 'Vitamins', price: 180, rating: 4.3, reviews: 89, stock: 30, image: '/placeholder.svg', description: 'Essential vitamin D3 for bone health and immune system support.' },
    { id: 3, name: 'Cough Syrup', category: 'Cold & Flu', price: 85, rating: 4.2, reviews: 156, stock: 25, image: '/placeholder.svg', description: 'Soothing cough syrup for dry and productive coughs.' },
    { id: 4, name: 'Hand Sanitizer 250ml', category: 'Health & Hygiene', price: 45, rating: 4.6, reviews: 203, stock: 100, image: '/placeholder.svg', description: 'Alcohol-based hand sanitizer with 70% alcohol content.' },
    { id: 5, name: 'Multivitamin Tablets', category: 'Vitamins', price: 220, rating: 4.4, reviews: 167, stock: 40, image: '/placeholder.svg', description: 'Complete multivitamin formula for daily nutritional support.' },
    { id: 6, name: 'Antiseptic Cream', category: 'First Aid', price: 65, rating: 4.1, reviews: 94, stock: 35, image: '/placeholder.svg', description: 'Antiseptic cream for minor cuts, wounds, and skin infections.' }
  ];

  const categories = ['All', 'Pain Relief', 'Vitamins', 'Cold & Flu', 'Health & Hygiene', 'First Aid'];

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      // Store the product to add after login
      localStorage.setItem('pendingCartItem', JSON.stringify({
        product: selectedProduct,
        quantity: quantity
      }));
      navigateTo('/auth');
      return;
    }

    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      unitPrice: selectedProduct.price,
      quantity: quantity,
      stock: selectedProduct.stock
    });
    
    setSelectedProduct(null);
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      navigateTo('/auth');
    } else {
      navigateTo('/cart');
    }
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigateTo('/auth');
    } else {
      navigateTo('/profile');
    }
  };

  // Check for pending cart item after login
  useEffect(() => {
    if (isLoggedIn) {
      const pendingItem = localStorage.getItem('pendingCartItem');
      if (pendingItem) {
        const { product, quantity } = JSON.parse(pendingItem);
        addToCart({
          id: product.id,
          name: product.name,
          unitPrice: product.price,
          quantity: quantity,
          stock: product.stock
        });
        localStorage.removeItem('pendingCartItem');
      }
    }
  }, [isLoggedIn, addToCart]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">PharmaCare</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Categories</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Prescriptions</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              {/* Profile Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleProfileClick}
                className="relative p-2"
              >
                <User className="h-5 w-5" />
                {isLoggedIn && (
                  <span className="ml-1 hidden sm:inline">Profile</span>
                )}
              </Button>
              
              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCartClick}
                className="relative p-2"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="bg-white border-b sm:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center space-x-4 flex-1">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
            >
              <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                  <span className="text-sm text-gray-500">{product.stock} in stock</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Product Image</span>
                </div>
                
                <div>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-lg">{selectedProduct.rating}</span>
                      <span className="ml-2 text-gray-500">({selectedProduct.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <p className="text-3xl font-bold text-gray-900 mb-4">₹{selectedProduct.price}</p>
                  
                  <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-12 text-center">{quantity}</span>
                        <button
                          onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      {selectedProduct.stock} units available
                    </div>
                    
                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={selectedProduct.stock === 0}
                    >
                      {selectedProduct.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
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
