
import React, { useState } from 'react';
import { X, Minus, Plus, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useOrder } from '@/hooks/useOrder';
import { useNavigate } from 'react-router-dom';
import ReviewsSection from './ReviewsSection';

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
  const [activeTab, setActiveTab] = useState('reviews');
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
      onClose();
    }
  };

  const stockPercentage = (product.stock / 100) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose} 
      />
      <div className="relative bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
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
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all duration-200 ${
                      selectedImageIndex === index ? 'border-black' : 'border-gray-200 hover:border-gray-400'
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
            <div className="mb-6">
              {product.brand && (
                <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              )}
              <h1 className="text-2xl font-bold text-[#111] mb-4">{product.name}</h1>
              
              {/* Info Cards */}
              <div className="space-y-4 mb-6">
                {/* Price Card */}
                <div className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-md hover:translate-y-[-3px] transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-[#111]">₹{product.price}</span>
                    {hasDiscount && (
                      <>
                        <span className="text-lg text-gray-500 line-through">₹{product.mrp}</span>
                        <Badge className="bg-red-500 text-white hover:bg-red-600">
                          {discountPercent}% OFF
                        </Badge>
                      </>
                    )}
                  </div>
                </div>

                {/* Stock Status Card */}
                <div className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-md hover:translate-y-[-3px] transition-all duration-200">
                  <div className="mb-2">
                    <span className="text-sm font-medium text-[#111]">
                      {isOutOfStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
                    </span>
                    <span className="text-sm text-gray-600 ml-2">({product.stock} available)</span>
                  </div>
                  <Progress 
                    value={Math.min(stockPercentage, 100)} 
                    className={`h-2 ${isOutOfStock ? '[&>div]:bg-red-500' : isLowStock ? '[&>div]:bg-orange-500' : '[&>div]:bg-green-500'}`}
                  />
                </div>

                {/* Prescription Badge */}
                {product.requires_prescription && (
                  <div className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-md hover:translate-y-[-3px] transition-all duration-200">
                    <Badge className="bg-gray-100 text-[#111] hover:bg-gray-200 rounded-full px-4 py-2">
                      Rx Required
                    </Badge>
                  </div>
                )}
              </div>

              {/* Quantity selector */}
              {!isOutOfStock && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#111] mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
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
                  className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-black border-2 border-transparent rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock || orderLoading}
                  className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-black border-2 border-transparent rounded-lg transition-all duration-200 hover:scale-105"
                >
                  {orderLoading ? 'Processing...' : 'Buy Now'}
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t pt-6">
              <div className="flex space-x-6 mb-4 border-b">
                {['reviews', 'details', 'ingredients', 'qa'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-sm font-medium capitalize transition-all duration-150 ${
                      activeTab === tab
                        ? 'text-black border-b-2 border-black'
                        : 'text-gray-600 hover:text-[#111]'
                    }`}
                  >
                    {tab === 'qa' ? 'Q&A' : tab === 'reviews' ? 'Customer Reviews' : tab}
                  </button>
                ))}
              </div>

              <div className="text-sm text-[#111]">
                {activeTab === 'reviews' && (
                  <ReviewsSection productId={product.id} />
                )}
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
