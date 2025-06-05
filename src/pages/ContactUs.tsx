
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      fullName: formData.fullName.trim() === '' ? 'Please enter your name' : '',
      email: formData.email.trim() === '' ? 'Please enter your email' : 
             !validateEmail(formData.email) ? 'Please enter a valid email' : '',
      subject: formData.subject.trim() === '' ? 'Please enter a subject' : '',
      message: formData.message.trim() === '' ? 'Please enter your message' : ''
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Send form data to API
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        subject: '',
        message: '',
        subscribe: false
      });
      showToast('Thank you! We will get back to you soon.', 'success');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setFormData(prev => ({ ...prev, subscribe: checked === true }));
  };

  const isFormValid = formData.fullName.trim() !== '' && 
                     formData.email.trim() !== '' && 
                     validateEmail(formData.email) &&
                     formData.subject.trim() !== '' && 
                     formData.message.trim() !== '';

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600">
            We're here to help you 24/7.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="mt-1"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                  Mobile Number
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  className="mt-1"
                  placeholder="Enter your mobile number"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="mt-1"
                  placeholder="Enter the subject"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message *
                </Label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your message"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="subscribe"
                  checked={formData.subscribe}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="subscribe" className="text-sm text-gray-700">
                  Subscribe to our newsletter
                </Label>
              </div>

              <Button 
                type="submit"
                disabled={!isFormValid}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Right Column - Company Details */}
          <div className="space-y-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Corporate Office</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <p className="text-gray-600">123 Green Pharmacy Road, Mumbai, Maharashtra 400001</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <p className="text-gray-600">
                    <a href="tel:+912212345678" className="hover:text-green-600">+91 22 1234 5678</a>
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <p className="text-gray-600">
                    <a href="mailto:support@capsulecare.com" className="hover:text-green-600">support@capsulecare.com</a>
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Hours:</span>
                  <p className="text-gray-600">Mon–Sat: 8 AM – 8 PM | Sun: 9 AM – 5 PM</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <span className="text-gray-500 text-lg">Map Placeholder</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Call-to-Action */}
      <div className="bg-green-600 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white">
            Need immediate assistance? Call us at{' '}
            <a href="tel:+912212345678" className="underline hover:text-green-200">
              +91 22 1234 5678
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
