
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Minus, Plus, Star, ShoppingCart, Share2, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useSingleProduct } from '@/hooks/useProducts';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useOrder } from '@/hooks/useOrder';
import ReviewsSection from '@/components/ReviewsSection';
import EnhancedNavigation from '@/components/EnhancedNavigation';
import FeaturedProducts from '@/components/FeaturedProducts';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { product, loading } = useSingleProduct(slug || '');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { createSingleItemOrder, loading: orderLoading } = useOrder();

  useEffect(() => {
    if (!loading && !product) {
      navigate('/404');
    }
  }, [loading, product, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <EnhancedNavigation />
        <div className="pt-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-8 w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <div className="h-96 bg-gray-200 rounded-2xl"></div>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-16 w-16 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

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
          from: `/product/${slug}`,
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
    }
  };

  const shareUrl = window.location.href;
  const shareText = `Check out ${product.name} on HealthCareWorld`;

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        break;
    }
    if (url) window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <EnhancedNavigation />
      
      {/* Breadcrumb */}
      <div className="pt-20 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={() => navigate('/')}
                  className="cursor-pointer hover:text-green-600 transition-colors"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={() => navigate('/shop')}
                  className="cursor-pointer hover:text-green-600 transition-colors"
                >
                  {product.category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden bg-gray-50 animate-fade-in">
                <img
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover transition-all duration-300"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                      disabled={selectedImageIndex === 0}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(Math.min(images.length - 1, selectedImageIndex + 1))}
                      disabled={selectedImageIndex === images.length - 1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                        selectedImageIndex === index 
                          ? 'border-green-500 scale-105' 
                          : 'border-gray-200 hover:border-gray-400'
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

            {/* Product Info Panel */}
            <div className="space-y-8">
              {/* Brand and Title */}
              <div className="space-y-2">
                {product.brand && (
                  <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">{product.brand}</p>
                )}
                <h1 className="text-3xl lg:text-4xl font-bold text-black leading-tight">{product.name}</h1>
              </div>

              {/* Pricing */}
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-black">₹{product.price}</span>
                {hasDiscount && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.mrp}</span>
                    <Badge className="bg-red-500 text-white hover:bg-red-600 text-sm px-3 py-1">
                      {discountPercent}% OFF
                    </Badge>
                  </>
                )}
              </div>

              {/* Tags and Prescription */}
              <div className="flex flex-wrap gap-2">
                {product.requires_prescription && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 rounded-full px-4 py-2">
                    Rx Required
                  </Badge>
                )}
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-4 py-2">
                  {product.category}
                </Badge>
                {product.tags?.slice(0, 2).map((tag, index) => (
                  <Badge key={index} className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-4 py-2">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Stock Indicator */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${
                    isOutOfStock ? 'text-red-600' : isLowStock ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {isOutOfStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
                  </span>
                  <span className="text-sm text-gray-600">
                    {!isOutOfStock && `${product.stock} available`}
                  </span>
                </div>
                <Progress 
                  value={Math.min((product.stock / 100) * 100, 100)} 
                  className={`h-2 ${
                    isOutOfStock ? '[&>div]:bg-red-500' : 
                    isLowStock ? '[&>div]:bg-orange-500' : 
                    '[&>div]:bg-green-500'
                  }`}
                />
              </div>

              {/* Quantity and Actions */}
              {!isOutOfStock && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-6 py-3 border border-gray-300 rounded-lg min-w-[80px] text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-black border-2 border-transparent rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg py-4 text-lg font-medium"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={handleBuyNow}
                      disabled={orderLoading}
                      className="w-full bg-white text-black border-2 border-black hover:bg-black hover:text-white rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg py-4 text-lg font-medium"
                    >
                      {orderLoading ? 'Processing...' : 'Buy Now'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Social Share */}
              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-3">Share this product</p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-all duration-200 hover:scale-105"
                  >
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-200 hover:scale-105"
                  >
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="p-3 border border-gray-200 rounded-lg hover:border-green-500 hover:text-green-500 transition-all duration-200 hover:scale-105"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Content */}
          <div className="mt-16">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-50 p-1 rounded-lg">
                <TabsTrigger 
                  value="details" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger 
                  value="ingredients" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                >
                  Ingredients
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger 
                  value="qa" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                >
                  Q&A
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6 animate-fade-in">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description || 'No description available for this product.'}
                  </p>
                  {product.manufacturer && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-black mb-1">Manufacturer</h4>
                      <p className="text-gray-600">{product.manufacturer}</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="ingredients" className="mt-6 animate-fade-in">
                <div className="text-gray-700">
                  <p>Ingredient information is not available for this product.</p>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 animate-fade-in">
                <ReviewsSection productId={product.id} />
              </TabsContent>

              <TabsContent value="qa" className="mt-6 animate-fade-in">
                <div className="text-gray-700">
                  <p>Questions and answers will be displayed here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-black mb-8">You Might Also Like</h2>
          <FeaturedProducts />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
