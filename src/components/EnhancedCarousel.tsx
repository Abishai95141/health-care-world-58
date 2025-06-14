
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
      title: 'Your Health, Our Priority.',
      subtitle: 'Discover premium healthcare products, delivered to your door with care and precision.',
      buttonText: 'Explore Products',
      action: () => navigate('/shop'),
      image: 'https://images.unsplash.com/photo-1533120383344-351d4a895929?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
    },
    {
      title: 'Wellness Redefined.',
      subtitle: 'Unlock peak performance and well-being with our curated selection of supplements and vitamins.',
      buttonText: 'Shop Wellness',
      action: () => navigate('/shop'),
      image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
    },
    {
      title: 'Seamless Care, Faster Than Ever.',
      subtitle: 'Experience the convenience of same-day delivery on all your essential healthcare needs.',
      buttonText: 'Learn More',
      action: () => navigate('/shop'),
      image: 'https://images.unsplash.com/photo-1554224324-4813533e3745?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
    }
  ];

  // Auto-rotate carousel with fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setIsSlideTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsSlideTransitioning(false);
    }, 300); // match transition duration
  };

  const goToPrevious = () => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const goToNext = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  return (
    <section className="relative bg-black overflow-hidden mx-auto max-w-7xl rounded-lg mt-6 mb-8 h-[60vh] min-h-[500px] flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className="absolute inset-0 w-full h-full bg-black/60"></div>
      </div>

      <div className="relative z-10 py-12 sm:py-20 px-6 sm:px-12 w-full">
        <div className={`text-center text-white transition-all duration-500 ease-in-out ${isSlideTransitioning ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            {slides[currentSlide].title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={slides[currentSlide].action}
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold focus:ring-2 focus:ring-white transition-all duration-300 text-base"
            >
              {slides[currentSlide].buttonText}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Carousel Controls */}
      <button 
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 group"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200 group"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
      
      {/* Enhanced Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-2.5 h-2.5 rounded-full transition-all duration-300
              ${currentSlide === index 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/70'
              }
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default EnhancedCarousel;
