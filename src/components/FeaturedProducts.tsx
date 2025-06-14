
import React, { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProductLocal] = useState<any>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  
  const { products, loading } = useProducts({
    limit: 12,
    sortBy: 'created_at',
    sortOrder: 'desc'
  });

  const handleProductClick = (product: any) => {
    setSelectedProductLocal(product);
    setIsProductModalOpen(true);
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">Featured Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
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
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our latest and most popular healthcare products, carefully selected for your wellness needs.
          </p>
        </div>
        
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-12">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={() => navigate('/shop')}
                className="bg-gray-900 hover:bg-black text-white px-8 sm:px-10 py-3 rounded-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                View All Products
              </button>
            </div>

            {/* Product Modal */}
            {selectedProduct && (
              <ProductModal
                product={selectedProduct}
                isOpen={isProductModalOpen}
                onClose={() => {
                  setIsProductModalOpen(false);
                  setSelectedProductLocal(null);
                }}
              />
            )}
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
