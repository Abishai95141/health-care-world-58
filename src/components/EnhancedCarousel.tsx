
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const EnhancedCarousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlideTransitioning, setIsSlideTransitioning] = useState(false);

  const slides = [
    {
      title: 'Stay Healthy with Capsule Care',
      buttonText: 'Shop Now',
      action: () => navigate('/shop')
    },
    {
      title: 'Wellness Essentials Sale – Up to 25% Off',
      buttonText: 'Shop Sale Items',
      action: () => navigate('/shop')
    },
    {
      title: 'Free Same-Day Delivery on Orders Over ₹1,000',
      buttonText: 'Learn More',
      action: () => navigate('/shop')
    }
  ];

  // Auto-rotate carousel with fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSlideTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
        setIsSlideTransitioning(false);
      }, 150);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setIsSlideTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsSlideTransitioning(false);
    }, 150);
  };

  const goToPrevious = () => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const goToNext = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  return (
    <section className="relative bg-gradient-to-r from-green-50 to-blue-50 overflow-hidden mx-auto max-w-7xl rounded-lg mt-6 mb-8">
      <div className="py-12 sm:py-20 px-6 sm:px-12">
        <div className={`text-center transition-opacity duration-300 ${isSlideTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            {slides[currentSlide].title}
          </h2>
          <div className="h-48 sm:h-64 bg-gray-200 rounded-lg mb-6 sm:mb-8 flex items-center justify-center">
            <span className="text-gray-500">Hero Image {currentSlide + 1}</span>
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={slides[currentSlide].action}
              className="bg-green-600 hover:bg-green-700 hover:scale-105 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-green-500 transition-all duration-200"
            >
              {slides[currentSlide].buttonText}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Carousel Controls */}
      <button 
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 group"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-green-600 transition-colors duration-200" />
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 hover:-rotate-12 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 group"
      >
        <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-green-600 transition-colors duration-200" />
      </button>
      
      {/* Enhanced Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300 hover:scale-125
              ${currentSlide === index 
                ? 'bg-green-600 shadow-lg scale-110' 
                : 'bg-white/70 hover:bg-white/90'
              }
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default EnhancedCarousel;
