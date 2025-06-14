
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import Layout from '@/components/Layout';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProductLocal] = useState<any>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const { products, loading, totalCount, refetch } = useProducts({
    searchQuery,
    category: currentCategory,
    sortBy,
    sortOrder,
    page: currentPage,
    pageSize
  });

  // Categories
  const categories = ['All', 'Prescription', 'OTC & Wellness', 'Vitamins & Supplements', 'Medical Devices'];

  // Sort options
  const sortOptions = [
    { label: 'Newest First', value: 'created_at', order: 'desc' },
    { label: 'Price: Low to High', value: 'price', order: 'asc' },
    { label: 'Price: High to Low', value: 'price', order: 'desc' },
    { label: 'Name: A to Z', value: 'name', order: 'asc' },
    { label: 'Name: Z to A', value: 'name', order: 'desc' }
  ];

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setCurrentPage(1);
    setIsCategoriesDropdownOpen(false);
  };

  const handleSortChange = (value: string, order: 'asc' | 'desc') => {
    setSortBy(value);
    setSortOrder(order);
    setCurrentPage(1);
    setIsSortDropdownOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleProductClick = (product: any) => {
    setSelectedProductLocal(product);
    setIsProductModalOpen(true);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 5;
    let start = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let end = Math.min(totalPages, start + maxPages - 1);
    
    if (end - start + 1 < maxPages) {
      start = Math.max(1, end - maxPages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <h1 className="text-4xl lg:text-5xl font-light text-black mb-8 tracking-tight">
              Shop All Products
            </h1>
            
            {/* Action Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
              {/* Search */}
              <form onSubmit={handleSearch} className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 rounded-2xl border-gray-200 focus:border-black focus:ring-black"
                  />
                </div>
              </form>
              
              {/* Filters and Sort */}
              <div className="flex items-center space-x-4">
                {/* Category Filter */}
                <div className="relative">
                  <button
                    onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                    className="flex items-center space-x-3 px-6 py-3 border border-gray-200 rounded-2xl 
                             hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 
                             focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <span className="hidden sm:inline text-gray-600">Category: </span>
                    <span className="font-medium text-black">{currentCategory}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                  {isCategoriesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 
                                  rounded-2xl shadow-xl z-10 py-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 
                                   hover:text-black transition-colors duration-200"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Sort */}
                <div className="relative">
                  <button
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="flex items-center space-x-3 px-6 py-3 border border-gray-200 rounded-2xl 
                             hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 
                             focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <span className="font-medium text-black">Sort</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                  {isSortDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 
                                  rounded-2xl shadow-xl z-10 py-2">
                      {sortOptions.map((option) => (
                        <button
                          key={`${option.value}-${option.order}`}
                          onClick={() => handleSortChange(option.value, option.order as 'asc' | 'desc')}
                          className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 
                                   hover:text-black transition-colors duration-200"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
              {Array.from({ length: 12 }).map((_, index) => (
                <Card key={index} className="animate-pulse border-gray-100 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-gray-100 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-100 rounded-full mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded-full w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 mb-12">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard
                      product={product}
                      onProductClick={handleProductClick}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0 
                              bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">
                      Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} products
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="rounded-xl border-gray-200 hover:border-black hover:bg-black hover:text-white 
                               transition-all duration-200"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline ml-1">Previous</span>
                    </Button>
                    
                    <div className="flex space-x-1">
                      {getPageNumbers().map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-xl transition-all duration-200 ${
                            currentPage === page
                              ? 'bg-black text-white'
                              : 'border-gray-200 hover:border-black hover:bg-black hover:text-white'
                          }`}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="rounded-xl border-gray-200 hover:border-black hover:bg-black hover:text-white 
                               transition-all duration-200"
                    >
                      <span className="hidden sm:inline mr-1">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">Rows per page:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
                      className="border border-gray-200 rounded-xl px-3 py-2 focus:outline-none 
                               focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    >
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                      <option value={48}>48</option>
                    </select>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <span className="text-gray-400 text-xl">No Results</span>
              </div>
              <h3 className="text-2xl font-light text-black mb-4">No products found</h3>
              <p className="text-gray-600 text-lg">Try adjusting your search criteria or filters</p>
            </div>
          )}
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
      </div>
    </Layout>
  );
};

export default Shop;
