
import { Button } from '@/components/ui/button';
import { Heart, CheckCircle, Clock, Stethoscope, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useState } from 'react';

const AboutUs = () => {
  const { navigateTo } = useApp();
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  const teamMembers = [
    {
      name: "Dr. Anjali Mehta, Pharm. D.",
      title: "Chief Pharmacist",
      bio: "10+ years experience in community pharmacy care.",
      image: "team-1"
    },
    {
      name: "Dr. Rajesh Kumar, M.D.",
      title: "Medical Director",
      bio: "15+ years in pharmaceutical research and development.",
      image: "team-2"
    },
    {
      name: "Priya Sharma",
      title: "Customer Care Manager",
      bio: "Expert in customer service and healthcare support.",
      image: "team-3"
    },
    {
      name: "Amit Patel",
      title: "Operations Head",
      bio: "Ensuring seamless delivery and logistics nationwide.",
      image: "team-4"
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Founded",
      icon: "🚀",
      detail: "Started with a vision to make healthcare accessible to all"
    },
    {
      year: "2024",
      title: "10,000+ Orders Fulfilled",
      icon: "📦",
      detail: "Successfully delivered authentic medicines to thousands"
    },
    {
      year: "2024",
      title: "Launched Auto-Refill",
      icon: "🔄",
      detail: "Introduced convenient automatic prescription refills"
    },
    {
      year: "2025",
      title: "Expanded to 5 Cities",
      icon: "📍",
      detail: "Now serving customers across major metropolitan areas"
    }
  ];

  const testimonials = [
    {
      quote: "Capsule Care has made managing my medications so much easier. The auto-refill feature is a lifesaver!",
      name: "Sarah Johnson",
      location: "Mumbai"
    },
    {
      quote: "Fast delivery and genuine products. I trust Capsule Care for all my family's healthcare needs.",
      name: "Ramesh Gupta",
      location: "Delhi"
    },
    {
      quote: "The pharmacist chat feature helped me understand my prescriptions better. Excellent service!",
      name: "Priya Reddy",
      location: "Bangalore"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description: "Every decision we make prioritizes our patients' health and wellbeing."
    },
    {
      icon: CheckCircle,
      title: "Authentic Products Only",
      description: "We guarantee 100% genuine medications from verified manufacturers."
    },
    {
      icon: Clock,
      title: "Fast & Reliable Delivery",
      description: "Quick delivery ensuring you never run out of essential medications."
    },
    {
      icon: Stethoscope,
      title: "24/7 Pharmacist Support",
      description: "Expert pharmacist consultation available round the clock."
    }
  ];

  const nextTeamMember = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevTeamMember = () => {
    setCurrentTeamIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Capsule Care</h1>
          <p className="text-xl text-gray-600 italic mb-6">Quality Care, Delivered to Your Doorstep</p>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Our Story & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-200 rounded-lg shadow-lg h-96 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Friendly Pharmacist at Work</span>
              </div>
            </div>

            {/* Right Column - Text */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 mb-8">
                <p>
                  Capsule Care was founded with a simple yet powerful vision: to make quality healthcare 
                  accessible to everyone, everywhere. Starting as a small pharmacy with big dreams, 
                  we recognized the challenges people face in accessing genuine medications and expert 
                  pharmaceutical guidance.
                </p>
                <p>
                  Today, we've grown into a trusted healthcare partner, leveraging technology to bridge 
                  the gap between patients and pharmacists. Our commitment to authenticity, convenience, 
                  and compassionate care drives everything we do.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission & Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{value.title}</h4>
                        <p className="text-sm text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet the Team</h2>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <button 
                onClick={prevTeamMember}
                className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>

              <div className="flex space-x-6 overflow-hidden">
                {teamMembers.slice(currentTeamIndex, currentTeamIndex + 3).map((member, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200 min-w-[250px]"
                  >
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">{member.image}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-green-600 italic mb-2">{member.title}</p>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={nextTeamMember}
                className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative text-center group">
                  <div className="bg-white border-4 border-green-600 rounded-full w-16 h-16 mx-auto flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform cursor-pointer">
                    {milestone.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{milestone.year}</h3>
                  <p className="text-gray-700 font-medium mb-2">{milestone.title}</p>
                  
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap transition-opacity duration-200 pointer-events-none">
                    {milestone.detail}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <Quote className="w-8 h-8 text-green-600 mb-4" />
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Strip */}
      <section className="bg-green-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Health Journey with Capsule Care?
          </h2>
          <Button 
            onClick={() => navigateTo('/')}
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                {['Contact Us', 'Returns', 'FAQs', 'Shipping Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Information</h3>
              <ul className="space-y-2">
                {[
                  { text: 'About Us', active: true },
                  { text: 'Privacy Policy' },
                  { text: 'Terms of Service' },
                  { text: 'Careers' }
                ].map((link) => (
                  <li key={link.text}>
                    <button 
                      className={`hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1 ${
                        link.active ? 'text-green-400 font-semibold' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {link.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4 mb-6">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  </button>
                ))}
              </div>
              <div className="flex space-x-4">
                {['GMP Certified', 'ISO 9001', 'Verified Pharmacy'].map((seal) => (
                  <div key={seal} className="text-xs text-gray-400 border border-gray-600 px-2 py-1 rounded">
                    {seal}
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <div className="flex mb-4">
                <input 
                  type="email"
                  placeholder="Enter your email" 
                  className="flex-1 mr-2 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
                />
                <Button disabled className="bg-gray-600 text-gray-400 cursor-not-allowed">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 mb-2">© 2025 Capsule Care Pharma – All Rights Reserved.</p>
            <a href="#" className="text-gray-500 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1 text-sm">
              Accessibility Statement
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
