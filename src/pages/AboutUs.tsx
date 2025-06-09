import React from 'react';
import { Heart, Shield, Users, Award, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import EnhancedNavigation from '@/components/EnhancedNavigation';
import StickyOfferBanner from '@/components/StickyOfferBanner';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const AboutUs = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const values = [
    {
      icon: Heart,
      title: "Care-First Approach",
      description: "Every decision we make is guided by what's best for our customers' health and wellbeing."
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "We maintain the highest standards of quality and safety in everything we do."
    },
    {
      icon: Users,
      title: "Inclusive Healthcare",
      description: "We believe everyone deserves access to quality healthcare products and information."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We continuously strive to improve our services and exceed expectations."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <EnhancedNavigation />
      <StickyOfferBanner onShopNow={() => navigate('/shop')} />

      {/* Hero Section with adjusted margin for mobile */}
      <section className={`relative bg-gradient-to-r from-green-600 to-emerald-500 py-24 overflow-hidden ${isMobile ? 'mt-40' : 'mt-32'}`}>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Mission is Your Health</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Capsule Care is revolutionizing pharmaceutical access in India through our commitment to quality, convenience, and customer care.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2020, Capsule Care was born from a simple observation: accessing quality healthcare products in India often involved unnecessary hurdles, delays, and uncertainties.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our founders, a team of healthcare professionals and technology specialists, set out to create a solution that would bring transparency, reliability, and convenience to Indian households.
              </p>
              <p className="text-lg text-gray-700">
                Today, we serve millions of customers across the country, providing access to authentic medicines, healthcare products, and wellness guidance - all delivered with care to your doorstep.
              </p>
            </div>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-lg">Image Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              These principles guide everything we do - from product selection to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-8 px-6 pb-8 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <p className="text-4xl font-bold text-green-600 mb-2">1M+</p>
              <p className="text-gray-600">Customers Served</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-green-600 mb-2">500+</p>
              <p className="text-gray-600">Cities Reached</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-green-600 mb-2">5000+</p>
              <p className="text-gray-600">Products Available</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-green-600 mb-2">99%</p>
              <p className="text-gray-600">On-time Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Meet the experienced professionals guiding our mission to transform healthcare access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div key={member} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">Photo</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Executive Name</h3>
                  <p className="text-green-600 mb-4">Position Title</p>
                  <p className="text-gray-600">Brief description of executive's background and expertise.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Journey</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Whether you're a customer, healthcare professional, or potential partner - we'd love to connect with you.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button 
              onClick={() => navigate('/contact-us')}
              variant="outline" 
              className="bg-white text-green-600 hover:bg-green-50 border-white"
            >
              Contact Us
            </Button>
            <Button 
              onClick={() => navigate('/shop')}
              className="bg-green-700 hover:bg-green-800 text-white"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              With fulfillment centers across India, we ensure fast and reliable delivery to your doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Mumbai', 'Delhi', 'Bangalore'].map((city) => (
              <Card key={city} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">City Image</span>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <MapPin className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="text-xl font-bold text-gray-900">{city}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Our {city} fulfillment center serves the entire {city} metropolitan region.</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Same-day delivery available</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                {['Our Story', 'Leadership', 'Careers', 'Press'].map((link) => (
                  <li key={link}>
                    <button className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                {['Contact Us', 'FAQs', 'Returns', 'Shipping'].map((link) => (
                  <li key={link}>
                    <button className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Compliance'].map((link) => (
                  <li key={link}>
                    <button className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4 mb-6">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                © 2025 Capsule Care Pharma.<br />All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
