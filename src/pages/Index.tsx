
import React from 'react';
import { motion } from 'framer-motion';
import EnhancedCarousel from '@/components/EnhancedCarousel';
import FeaturedProducts from '@/components/FeaturedProducts';
import ServiceHighlights from '@/components/ServiceHighlights';
import StickyOfferBanner from '@/components/StickyOfferBanner';
import AdvertisementBanner from '@/components/AdvertisementBanner';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <EnhancedCarousel />

      {/* Dedicated to Your Well-being Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-light tracking-tight text-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Dedicated to Your Well-being
          </motion.h2>
          <motion.p 
            className="text-xl text-black/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience healthcare like never before. From prescription medications to wellness products, 
            we bring you quality healthcare solutions with convenience and care at the heart of everything we do.
          </motion.p>
        </div>
      </section>

      {/* Advertisement Banner - Home Placement */}
      <section className="py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AdvertisementBanner placement="home_hero" />
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Service Highlights */}
      <ServiceHighlights />

      {/* Sticky Offer Banner */}
      <StickyOfferBanner />
    </div>
  );
};

export default Index;
