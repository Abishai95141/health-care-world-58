
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface StickyOfferBannerProps {
  onShopNow: () => void;
}

const StickyOfferBanner: React.FC<StickyOfferBannerProps> = ({ onShopNow }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`
      z-40 bg-black shadow-lg border-b border-gray-800
      ${isMobile ? 'sticky top-16' : 'sticky top-16'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300 font-medium text-sm sm:text-base">
              Summer Essentials – Up to 20% Off!
            </span>
          </div>
          
          <Button 
            onClick={onShopNow}
            variant="ghost"
            className="group text-gray-300 hover:bg-gray-900 hover:text-white
                       focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black
                       transition-all duration-200 text-sm px-4 py-2 h-auto"
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
