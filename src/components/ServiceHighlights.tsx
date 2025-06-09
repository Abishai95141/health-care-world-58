
import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Shield, Truck, MessageCircle, CreditCard } from 'lucide-react';

interface ServiceHighlight {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  message: string;
}

const services: ServiceHighlight[] = [
  {
    icon: RotateCcw,
    title: 'Quick Refill',
    subtitle: 'Auto-refill on meds',
    message: 'Auto-refill setup coming soon!'
  },
  {
    icon: Shield,
    title: 'Verified Pharma',
    subtitle: 'Genuine Brands',
    message: 'All products are 100% genuine'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    subtitle: 'Within 48 Hours',
    message: 'Free delivery on orders over ₹500'
  },
  {
    icon: MessageCircle,
    title: '24/7 Chat',
    subtitle: 'Expert Help Anytime',
    message: 'Chat support coming soon!'
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    subtitle: 'Encrypted & Safe',
    message: 'Your payments are 100% secure'
  }
];

interface ServiceHighlightsProps {
  onServiceClick: (message: string) => void;
}

const ServiceHighlights: React.FC<ServiceHighlightsProps> = ({ onServiceClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-12 bg-gradient-to-r from-green-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <button
                key={index}
                onClick={() => onServiceClick(service.message)}
                className={`
                  group bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100
                  hover:shadow-lg hover:-translate-y-2 hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                  transition-all duration-300 ease-out
                  ${isVisible 
                    ? `animate-fade-in opacity-100 translate-y-0` 
                    : 'opacity-0 translate-y-8'
                  }
                `}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                  <IconComponent className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm group-hover:text-green-700 transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                  {service.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
