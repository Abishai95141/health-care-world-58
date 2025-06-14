
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
      className="py-16 sm:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Dedicated to Your Well-being</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We provide a seamless and trustworthy healthcare experience with services designed for you.
            </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <button
                key={index}
                onClick={() => onServiceClick(service.message)}
                className={`
                  group text-center
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
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-5 flex items-center justify-center group-hover:bg-gray-200 group-hover:scale-110 transition-all duration-300">
                  <IconComponent className="w-7 h-7 text-gray-700 group-hover:text-black transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-base group-hover:text-black transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">
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
