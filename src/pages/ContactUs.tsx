
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useApp } from '@/contexts/AppContext';

const ContactUs = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
    subscribe: false
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      subject: '',
      message: ''
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubscribeChange = (checked: boolean | "indeterminate") => {
    setFormData(prev => ({ ...prev, subscribe: checked === true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      showToast('Thank you! We will get back to you soon.', 'success');
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        subject: '',
        message: '',
        subscribe: false
      });
    }
  };

  const isFormValid = formData.fullName.trim() && 
                     formData.email.trim() && 
                     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
                     formData.subject.trim() && 
                     formData.message.trim();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600">We're Here to Help You 24/7</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Your Name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full ${errors.fullName ? 'border-red-500' : ''}`}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Your Mobile Number"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={`w-full ${errors.subject ? 'border-red-500' : ''}`}
                  />
                  {errors.subject && (
                    <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </Label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.message ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="subscribe"
                    checked={formData.subscribe}
                    onCheckedChange={handleSubscribeChange}
                  />
                  <Label htmlFor="subscribe" className="text-sm text-gray-700">
                    Subscribe to our newsletter
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-3 text-white font-semibold rounded-md transition-colors ${
                    isFormValid
                      ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Right Column - Company Details & Map */}
            <div className="space-y-8">
              {/* Contact Information Card */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Corporate Office</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600">
                      123 Green Pharmacy Road<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      <strong>Phone:</strong>{' '}
                      <a 
                        href="tel:+912212345678" 
                        className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      >
                        +91 22 1234 5678
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      <strong>Email:</strong>{' '}
                      <a 
                        href="mailto:support@capsulecare.com" 
                        className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      >
                        support@capsulecare.com
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      <strong>Hours:</strong><br />
                      Mon–Sat: 8 AM – 8 PM<br />
                      Sun: 9 AM – 5 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 border border-gray-200 rounded-lg h-64 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Map Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call-to-Action Strip */}
      <section className="bg-green-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-lg">
            Need Immediate Assistance? Call Us at{' '}
            <a 
              href="tel:+912212345678" 
              className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              +91 22 1234 5678
            </a>
          </p>
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
                {[
                  { text: 'Contact Us', active: true },
                  { text: 'Returns' },
                  { text: 'FAQs' },
                  { text: 'Shipping Policy' }
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

            {/* Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Information</h3>
              <ul className="space-y-2">
                {['About Us', 'Privacy Policy', 'Terms of Service', 'Careers'].map((link) => (
                  <li key={link}>
                    <button className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1">
                      {link}
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

export default ContactUs;
