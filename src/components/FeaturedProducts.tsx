
import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Card, CardContent } from '@/components/ui/card';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToCart, setSelectedProduct, showToast } = useApp();
  const { user } = useAuth();
  
  const { products, loading } = useProducts({
    limit: 8,
    sortBy: 'created_at',
    sortOrder: 'desc'
  });

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    // You can implement a product modal here or navigate to product detail page
    showToast(`Clicked on ${product.name}`, 'info');
  };

  const handleAddToCart = (product: any) => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: '/',
          action: 'addToCart',
          productId: product.id
        }
      });
      return;
    }

    if (product.stock > 0) {
      addToCart(product.id, 1);
      showToast(`${product.name} added to cart`, 'success');
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest and most popular healthcare products, carefully selected for your wellness needs.
          </p>
        </div>
        
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={() => navigate('/shop')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View All Products
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No featured products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
