
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import CategoriesDropdown from './CategoriesDropdown';
import CartIcon from './CartIcon';
import MobileMenu from './MobileMenu';

const MainNavigation = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm h-18">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-slate-800 hover:text-green-600 transition-colors">
            Capsule Care
          </h1>
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-slate-800 hover:text-green-600 transition-colors relative group"
          >
            <span>Home</span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-full group-hover:left-0 transition-all duration-150"></span>
          </Link>
          <Link 
            to="/" 
            className="text-slate-800 hover:text-green-600 transition-colors relative group"
          >
            <span>Shop</span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-full group-hover:left-0 transition-all duration-150"></span>
          </Link>
          <CategoriesDropdown />
          <Link 
            to="/about-us" 
            className="text-slate-800 hover:text-green-600 transition-colors relative group"
          >
            <span>About Us</span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-full group-hover:left-0 transition-all duration-150"></span>
          </Link>
          <Link 
            to="/contact-us" 
            className="text-slate-800 hover:text-green-600 transition-colors relative group"
          >
            <span>Contact Us</span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-full group-hover:left-0 transition-all duration-150"></span>
          </Link>
          <CartIcon />
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </nav>
  );
};

export default MainNavigation;
