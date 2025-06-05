
import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick, onAddToCart }) => {
  const hasDiscount = product.mrp && product.mrp > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div 
        className="relative cursor-pointer"
        onClick={() => onProductClick(product)}
      >
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
          {product.image_urls && product.image_urls.length > 0 ? (
            <img
              src={product.image_urls[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm">No Image</span>
          )}
          
          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
          
          {/* Discount Badge */}
          {hasDiscount && !isOutOfStock && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              {discountPercent}% OFF
            </Badge>
          )}
          
          {/* Prescription Required Badge */}
          {product.requires_prescription && (
            <Badge className="absolute top-2 right-2 bg-blue-500 text-white text-xs">
              Rx
            </Badge>
          )}
          
          {/* Low Stock Badge */}
          {isLowStock && (
            <Badge className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs">
              Only {product.stock} left
            </Badge>
          )}
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">
            {product.name}
          </h3>
          
          {product.brand && (
            <p className="text-gray-600 text-xs mb-2">{product.brand}</p>
          )}
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-green-600">₹{product.price}</span>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through">₹{product.mrp}</span>
              )}
            </div>
          </div>
          
          {/* Rating (placeholder) */}
          <div className="flex items-center mb-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs text-gray-600 ml-1">(24)</span>
          </div>
          
          {/* Add to Cart Button */}
          {onAddToCart && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              disabled={isOutOfStock}
              className={`w-full text-sm ${
                isOutOfStock 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isOutOfStock ? (
                'Out of Stock'
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
