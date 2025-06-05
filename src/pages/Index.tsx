
import { useState } from 'react';
import { Search, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight, Star, X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const Index = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-green-600">Capsule Care</h1>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Input 
                  placeholder="Search for medicines, brands…" 
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            
            {/* Cart and Account */}
            <div className="flex items-center space-x-6">
              <button 
                aria-label="View cart"
                className="relative p-2 text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </button>
              <div className="flex space-x-4 text-sm">
                <a href="#" className="text-gray-600 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">Log In / Sign Up</a>
                <a href="#" className="text-gray-600 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">Help</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Bar */}
        <nav className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-8 h-12">
              <a href="#" className="text-gray-700 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">Home</a>
              <a href="#" className="text-gray-700 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">Shop</a>
              <div className="flex items-center">
                <a href="#" className="text-gray-700 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">Categories</a>
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </div>
              <a href="#" className="text-gray-700 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">About Us</a>
              <a href="#" className="text-gray-700 hover:text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">Contact Us</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Carousel */}
        <section className="relative bg-gradient-to-r from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Stay Healthy with Capsule Care</h2>
              <div className="h-64 bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
                <span className="text-gray-500">Placeholder Hero Image</span>
              </div>
              <Button 
                disabled 
                className="bg-gray-400 text-white px-8 py-3 rounded-lg hover:bg-gray-500 focus:ring-2 focus:ring-gray-500 transition-colors cursor-not-allowed"
              >
                Shop Prescription Drugs
              </Button>
            </div>
          </div>
          
          {/* Carousel Controls */}
          <button className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
          
          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="bg-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-4">
              {['Prescription', 'OTC & Wellness', 'Vitamins & Supplements', 'Medical Devices'].map((category) => (
                <button
                  key={category}
                  className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-green-50 hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {[
                { title: 'Quick Refill', subtitle: 'Auto-refill on meds' },
                { title: 'Verified Pharma', subtitle: 'Genuine Brands' },
                { title: 'Fast Delivery', subtitle: 'Within 48 Hours' },
                { title: '24/7 Pharmacist Chat', subtitle: 'Expert Help Anytime' },
                { title: 'Secure Payment', subtitle: 'Encrypted & Safe' },
                { title: 'Easy Returns', subtitle: '14-Day Policy' }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg text-center hover:shadow-lg hover:-translate-y-1 focus-within:ring-2 focus-within:ring-green-500 transition-all duration-200 cursor-pointer"
                  tabIndex={0}
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="w-6 h-6 bg-green-600 rounded"></div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Deals Banner */}
        <section className="bg-orange-500 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">💊</span>
                <span className="text-lg font-semibold">Summer Fever Essentials – Up to 20% Off Bongolife 500 Tablets!</span>
              </div>
              <Button className="bg-white text-orange-500 hover:bg-gray-100 focus:ring-2 focus:ring-white px-6 py-2">
                Shop Now
              </Button>
            </div>
          </div>
        </section>

        {/* Action Bar */}
        <section className="bg-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <span className="text-gray-700 mr-2">Sort:</span>
                  <button className="flex items-center text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1">
                    Popular <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </div>
                <button 
                  onClick={() => setIsFilterModalOpen(true)}
                  className="flex items-center text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
                >
                  Filter: All <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="flex items-center">
                  <span className="text-gray-700 mr-2">Price:</span>
                  <button className="flex items-center text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1">
                    ₹0 – ₹2,000 <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg hover:scale-105 hover:shadow-lg focus-within:outline-2 focus-within:outline-green-500 transition-all duration-200 cursor-pointer"
                  tabIndex={0}
                  onClick={() => setIsProductModalOpen(true)}
                >
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500">Product Image</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Paracetamol 500mg Tablets</h3>
                  <p className="text-lg font-bold text-green-600 mb-2">₹25.00</p>
                  <div className="flex items-center">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">(120)</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-12">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded">‹</button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-2 rounded ${page === 1 ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                  >
                    {page}
                  </button>
                ))}
                <button className="p-2 text-gray-500 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded">›</button>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 mr-2">Rows per page:</span>
                <button className="flex items-center text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1">
                  20 <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Empty State (Hidden) */}
            <div className="hidden text-center py-16">
              <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500">No Results</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found for your filters</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                {['Contact Us', 'Returns', 'FAQs', 'Shipping Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Information</h3>
              <ul className="space-y-2">
                {['About Us', 'Privacy Policy', 'Terms of Service', 'Careers'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4 mb-6">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  </button>
                ))}
              </div>
              <div className="flex space-x-4">
                {['GMP Certified', 'ISO 9001', 'Verified Pharmacy'].map((seal) => (
                  <div key={seal} className="text-xs text-gray-400 border border-gray-600 px-2 py-1 rounded">
                    {seal}
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <div className="flex mb-4">
                <Input 
                  placeholder="Enter your email" 
                  className="flex-1 mr-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
                />
                <Button disabled className="bg-gray-600 text-gray-400 cursor-not-allowed">Subscribe</Button>
              </div>
              <div className="hidden text-green-400 text-sm">Thank you for subscribing!</div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 mb-2">© 2025 Capsule Care Pharma – All Rights Reserved.</p>
            <a href="#" className="text-gray-500 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1 text-sm">
              Accessibility Statement
            </a>
          </div>
        </div>
      </footer>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Filter Products</h2>
              <button 
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {['Prescription', 'OTC & Wellness', 'Vitamins & Supplements', 'Medical Devices'].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={category} />
                      <Label htmlFor={category} className="text-sm">{category}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-green-600 rounded w-1/2"></div>
                  </div>
                  <div className="flex space-x-2">
                    <Input placeholder="Min" className="flex-1" />
                    <Input placeholder="Max" className="flex-1" />
                  </div>
                </div>
              </div>

              {/* Brand */}
              <div>
                <h3 className="font-semibold mb-3">Brand</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {['Acme Pharma', 'BioHealth', 'CapsuleCare', 'OmniMeds', 'Other'].map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox id={brand} />
                      <Label htmlFor={brand} className="text-sm">{brand}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Filters */}
              <div>
                <h3 className="font-semibold mb-3">Special Filters</h3>
                <div className="space-y-2">
                  {[
                    'Only In-Stock', 
                    'Expires Soon (Next 30 Days)', 
                    'Auto-Refill Eligible', 
                    'Requires Prescription'
                  ].map((filter) => (
                    <div key={filter} className="flex items-center space-x-2">
                      <Checkbox id={filter} />
                      <Label htmlFor={filter} className="text-sm">{filter}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 border-t">
              <button className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1">
                Clear All
              </button>
              <Button className="bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Paracetamol 500mg Tablets</h2>
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Images */}
              <div>
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center relative">
                  <span className="text-gray-500">Large Product Image</span>
                  <button className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex space-x-2">
                  {[1, 2, 3].map((thumb) => (
                    <div key={thumb} className="w-20 h-20 bg-gray-200 rounded border-2 border-green-600 flex items-center justify-center">
                      <span className="text-xs text-gray-500">Thumb {thumb}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Paracetamol 500mg Tablets</h1>
                  <div className="flex items-center mt-2">
                    <span className="text-2xl font-bold text-green-600">₹25.00</span>
                    <span className="text-lg text-gray-500 line-through ml-2">₹30.00</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <button className="text-sm text-blue-600 hover:underline ml-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">
                      (120 reviews)
                    </button>
                  </div>
                </div>

                <p className="text-gray-600">
                  Effective pain relief and fever reducer. Each tablet contains 500mg of paracetamol for adults and children over 12 years.
                </p>

                {/* Stock Indicator */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Stock Level</span>
                    <span className="text-sm text-green-600">In Stock: 150 units</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-sm text-red-600 mt-1">Only 10 left!</p>
                </div>

                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <button 
                      disabled 
                      className="p-2 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border border-gray-300 rounded bg-gray-50">1</span>
                    <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500">
                    Add to Cart
                  </Button>
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-500">
                    Buy Now
                  </Button>
                </div>

                {/* You Might Also Like */}
                <div>
                  <h3 className="font-semibold mb-3">You Might Also Like</h3>
                  <div className="flex space-x-3 overflow-x-auto">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex-shrink-0 w-24 text-center">
                        <div className="w-20 h-20 bg-gray-200 rounded mb-2 mx-auto flex items-center justify-center">
                          <span className="text-xs text-gray-500">Item {item}</span>
                        </div>
                        <p className="text-xs text-gray-700 mb-1">Product Name</p>
                        <p className="text-xs font-semibold text-green-600">₹15.00</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="border-t pt-6">
                  <nav className="flex space-x-6">
                    {['Details', 'Ingredients', 'Customer Reviews', 'Q&A'].map((tab) => (
                      <button
                        key={tab}
                        className="text-sm font-medium text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1 py-1"
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            <div className="p-6 border-t">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setIsProductModalOpen(false)}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
                >
                  Close
                </button>
                <div className="hidden bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-green-800">
                  ✓ 2 items added to cart. <button className="font-semibold hover:underline">View Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
