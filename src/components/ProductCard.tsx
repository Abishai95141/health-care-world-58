
import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  mrp: number | null;
  stock: number;
  image_urls: string[] | null;
  brand: string | null;
  requires_prescription: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const hasDiscount = product.mrp && product.mrp > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  const imageUrl = product.image_urls && product.image_urls.length > 0 
    ? product.image_urls[0] 
    : '/placeholder.svg';

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: `/product/${product.slug}`,
          action: 'addToCart',
          productId: product.id,
          quantity: 1
        }
      });
      return;
    }

    if (product.stock >= 1) {
      await addToCart(product.id, 1);
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <div 
      onClick={handleProductClick}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {hasDiscount && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white hover:bg-red-600">
            {discountPercent}% OFF
          </Badge>
        )}
        {product.requires_prescription && (
          <Badge className="absolute top-3 right-3 bg-gray-100 text-[#111] hover:bg-gray-200 rounded-full px-3 py-1">
            Rx
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-3">
        {product.brand && (
          <p className="text-xs text-gray-600 uppercase tracking-wide font-medium">{product.brand}</p>
        )}
        
        <h3 className="font-semibold text-[#111] line-clamp-2 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-[#111]">₹{product.price}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">₹{product.mrp}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">4.5 (24)</span>
          </div>
          
          <span className={`text-xs font-medium ${
            isOutOfStock ? 'text-red-600' : isLowStock ? 'text-orange-600' : 'text-green-600'
          }`}>
            {isOutOfStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
          </span>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-black border-2 border-transparent rounded-lg transition-all duration-200 hover:scale-105"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
