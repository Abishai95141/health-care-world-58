
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

const AboutUs = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About Capsule Care
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quality Care, Delivered to Your Doorstep.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Image */}
          <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-lg">Pharmacy Interior Image</span>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, Capsule Care began with a simple mission: to make quality healthcare accessible to everyone, everywhere. Starting as a small pharmacy in Mumbai, we recognized the challenges people face in accessing genuine medicines and professional healthcare advice.
              </p>
              <p className="text-gray-600">
                Today, we've grown to serve thousands of customers across India, combining traditional pharmacy expertise with modern technology to deliver exceptional healthcare solutions right to your doorstep.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission & Values</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">Patient-Centered Care</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">Authentic Products Only</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">Fast & Reliable Delivery</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">24/7 Pharmacist Support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Dr. Anjali Mehta", role: "Chief Pharmacist", bio: "20+ years in pharmaceutical care" },
              { name: "Rahul Kumar", role: "Head of Operations", bio: "Expert in healthcare logistics" },
              { name: "Priya Sharma", role: "Customer Success Lead", bio: "Passionate about patient care" },
              { name: "Dr. Vikram Singh", role: "Clinical Advisor", bio: "Specialist in internal medicine" }
            ].map((member, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300 hover:shadow-lg p-4 rounded-lg">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Photo</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-green-600 text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 text-xs">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
            {[
              { year: "2023", milestone: "Founded" },
              { year: "2024", milestone: "Launched Auto-Refill" },
              { year: "2025", milestone: "Expanded to 5 Cities" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900">{item.year}</h3>
                <p className="text-gray-600">{item.milestone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Call-to-Action */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to start your health journey with Capsule Care?
          </h2>
          <Button 
            onClick={() => navigateTo('/')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
