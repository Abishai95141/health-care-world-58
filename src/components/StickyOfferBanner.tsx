
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface StickyOfferBannerProps {
  onShopNow: () => void;
}

const StickyOfferBanner: React.FC<StickyOfferBannerProps> = ({ onShopNow }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`
      z-50 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 shadow-lg
      ${isMobile ? 'sticky top-16' : 'sticky top-16'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <span className="text-2xl animate-pulse">🔥</span>
              <div className="absolute inset-0 bg-orange-300 rounded-full animate-ping opacity-20"></div>
            </div>
            <span className="text-white font-semibold text-sm sm:text-base">
              Summer Fever Essentials – Up to 20% Off!
            </span>
          </div>
          
          <Button 
            onClick={onShopNow}
            className="group bg-white text-orange-600 hover:bg-gray-100 hover:scale-105 
                       focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-500
                       transition-all duration-200 text-sm px-4 py-2"
          >
            Shop Now
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyOfferBanner;
