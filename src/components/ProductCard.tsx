
import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  price: number;
  mrp: number | null;
  stock: number;
  image_urls: string[] | null;
  brand: string | null;
  requires_prescription: boolean;
}

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const hasDiscount = product.mrp && product.mrp > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  // Use the uploaded image as the standard placeholder for all products
  const getPlaceholderImage = () => {
    return '/lovable-uploads/608483b2-2513-434b-be33-5704c93f7423.png';
  };

  // Get the first valid image URL or use placeholder
  const getImageUrl = () => {
    if (product.image_urls && product.image_urls.length > 0) {
      // Filter out empty strings and null values
      const validUrls = product.image_urls.filter(url => url && url.trim() !== '');
      if (validUrls.length > 0) {
        return validUrls[0];
      }
    }
    return getPlaceholderImage();
  };

  const imageUrl = getImageUrl();

  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-500 ease-out overflow-hidden cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden rounded-t-2xl">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-medium text-lg">Out of Stock</span>
            </div>
          )}
          
          {/* Discount Badge */}
          {hasDiscount && !isOutOfStock && (
            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs font-medium rounded-full">
              {discountPercent}% OFF
            </Badge>
          )}
          
          {/* Prescription Required Badge */}
          {product.requires_prescription && (
            <Badge className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded-full font-medium">
              Rx
            </Badge>
          )}
          
          {/* Low Stock Badge */}
          {isLowStock && !isOutOfStock && (
            <Badge className="absolute bottom-3 right-3 bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              Only {product.stock} left
            </Badge>
          )}
        </div>
        
        {/* Product Info */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium text-black text-base line-clamp-2 group-hover:text-gray-800 transition-colors duration-300 leading-relaxed">
              {product.name}
            </h3>
            
            {product.brand && (
              <p className="text-gray-500 text-sm font-light group-hover:text-gray-600 transition-colors duration-300">{product.brand}</p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-semibold text-black group-hover:text-gray-800 transition-colors duration-300">₹{product.price}</span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through font-light">₹{product.mrp}</span>
              )}
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-light">(24)</span>
          </div>
          
          {/* Stock status indicator */}
          <div className="text-xs font-medium">
            {isOutOfStock ? (
              <span className="text-red-500 bg-red-50 px-2 py-1 rounded-full">Out of Stock</span>
            ) : isLowStock ? (
              <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Low Stock</span>
            ) : (
              <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full">In Stock</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
