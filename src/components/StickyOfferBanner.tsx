
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
      z-40 bg-black shadow-xl border-b border-gray-800 backdrop-blur-sm
      ${isMobile ? 'sticky top-16' : 'sticky top-16'}
    `}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <Sparkles className="w-5 h-5 text-gray-300 animate-pulse" />
            <span className="text-gray-100 font-medium text-sm lg:text-base tracking-wide">
              Premium Healthcare Collection – Exclusive Access
            </span>
          </div>
          
          <Button 
            onClick={onShopNow}
            variant="ghost"
            className="group text-gray-100 hover:bg-gray-800 hover:text-white
                       focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-black
                       transition-all duration-300 text-sm px-6 py-2 h-auto rounded-full
                       hover:scale-105"
          >
            Explore Now
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyOfferBanner;
