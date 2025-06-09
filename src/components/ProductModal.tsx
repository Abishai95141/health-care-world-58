
import React, { useState } from 'react';
import { X, Minus, Plus, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useOrder } from '@/hooks/useOrder';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  mrp: number | null;
  stock: number;
  image_urls: string[] | null;
  brand: string | null;
  requires_prescription: boolean;
  description?: string;
}

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { createSingleItemOrder, loading: orderLoading } = useOrder();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const hasDiscount = product.mrp && product.mrp > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  const images = product.image_urls && product.image_urls.length > 0 
    ? product.image_urls 
    : ['/placeholder.svg'];

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: window.location.pathname,
          action: 'addToCart',
          productId: product.id,
          quantity
        }
      });
      return;
    }

    if (product.stock >= quantity) {
      await addToCart(product.id, quantity);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: '/order-confirmation',
          action: 'buyNow',
          productId: product.id,
          quantity
        }
      });
      return;
    }

    if (product.stock >= quantity) {
      await createSingleItemOrder(product, quantity);
      // The createSingleItemOrder function will handle navigation to order confirmation
      onClose(); // Close the modal
    }
  };

  const stockPercentage = (product.stock / 100) * 100; // Assuming max stock of 100 for display

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left side - Images */}
          <div className="p-6">
            <div className="mb-4">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                      selectedImageIndex === index ? 'border-green-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Product info */}
          <div className="p-6 overflow-y-auto">
            <div className="mb-4">
              {product.brand && (
                <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
              )}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">(24 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
                {hasDiscount && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.mrp}</span>
                    <Badge className="bg-red-500 text-white">
                      {discountPercent}% OFF
                    </Badge>
                  </>
                )}
              </div>

              {/* Prescription badge */}
              {product.requires_prescription && (
                <Badge className="bg-blue-500 text-white mb-4">
                  Prescription Required
                </Badge>
              )}

              {/* Stock status */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    {isOutOfStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
                  </span>
                  <span className="text-sm text-gray-600">{product.stock} available</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Quantity selector */}
              {!isOutOfStock && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border border-gray-300 rounded min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock || orderLoading}
                  variant="outline"
                  className="w-full"
                >
                  {orderLoading ? 'Processing...' : 'Buy Now'}
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t pt-6">
              <div className="flex space-x-6 mb-4 border-b">
                {['details', 'ingredients', 'reviews', 'qa'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-sm font-medium capitalize ${
                      activeTab === tab
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab === 'qa' ? 'Q&A' : tab}
                  </button>
                ))}
              </div>

              <div className="text-sm text-gray-700">
                {activeTab === 'details' && (
                  <div>
                    <p>{product.description || 'No description available.'}</p>
                  </div>
                )}
                {activeTab === 'ingredients' && (
                  <div>
                    <p>Ingredient information not available.</p>
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div>
                    <p>Customer reviews will be displayed here.</p>
                  </div>
                )}
                {activeTab === 'qa' && (
                  <div>
                    <p>Questions and answers will be displayed here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
