
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex-1 max-w-2xl mx-8">
      {/* Desktop Search */}
      <div className="hidden md:block relative">
        <div className={`relative transition-all duration-200 ${
          isFocused ? 'shadow-lg' : 'shadow-sm'
        }`}>
          <input
            type="text"
            placeholder="Search for medicines, brands..."
            className={`w-full h-10 pl-12 pr-4 rounded-full border-2 transition-all duration-200 ${
              isFocused 
                ? 'border-green-600 bg-white' 
                : 'border-gray-300 bg-gray-50 hover:bg-white'
            }`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors ${
            isFocused ? 'text-green-600' : 'text-gray-400'
          }`} />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Search className="h-5 w-5 text-gray-600" />
          </button>
        ) : (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4 z-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for medicines, brands..."
                className="w-full h-9 pl-10 pr-4 rounded-full border-2 border-green-600 bg-white"
                autoFocus
                onBlur={() => setIsExpanded(false)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
