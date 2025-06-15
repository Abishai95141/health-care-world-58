
import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import EnhancedNavigation from '@/components/EnhancedNavigation';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { products, loading, totalCount } = useProducts({
    searchQuery,
    category: selectedCategory,
    sortBy,
    sortOrder,
    page: currentPage,
    pageSize: 20
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy, sortOrder]);

  const categories = [
    'All',
    'Prescription',
    'OTC & Wellness',
    'Vitamins & Supplements',
    'Medical Devices',
    'Personal Care'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('created_at');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || sortBy !== 'created_at' || sortOrder !== 'desc';

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedNavigation />
      
      <div className="pt-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
                <p className="mt-2 text-gray-600">
                  {totalCount > 0 ? `${totalCount} products available` : 'Discover our wide range of healthcare products'}
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-lg">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder="Search for medicines, brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>

                {/* Desktop Filters */}
                <div className={`flex flex-wrap items-center gap-3 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[200px] border-gray-200">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                    const [field, order] = value.split('-');
                    setSortBy(field);
                    setSortOrder(order as 'asc' | 'desc');
                  }}>
                    <SelectTrigger className="w-[200px] border-gray-200">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created_at-desc">Newest First</SelectItem>
                      <SelectItem value="created_at-asc">Oldest First</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>

                  {hasActiveFilters && (
                    <Button variant="outline" onClick={clearFilters} className="text-red-600 border-red-200 hover:bg-red-50">
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Search: "{searchQuery}"
                  </Badge>
                )}
                {selectedCategory !== 'All' && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Category: {selectedCategory}
                  </Badge>
                )}
                {(sortBy !== 'created_at' || sortOrder !== 'desc') && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Sort: {sortBy === 'created_at' ? 'Date' : sortBy === 'price' ? 'Price' : 'Name'} ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-full"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-64 h-64 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                <Search className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                {hasActiveFilters 
                  ? "Try adjusting your filters or search terms to find what you're looking for."
                  : "We're working on adding more products to our inventory."}
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} className="bg-green-600 hover:bg-green-700">
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && products.length > 0 && totalCount > 20 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, Math.ceil(totalCount / 20)) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(Math.ceil(totalCount / 20), currentPage + 1))}
                  disabled={currentPage >= Math.ceil(totalCount / 20)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
