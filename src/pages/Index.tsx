
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Capsule Care
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your trusted partner for healthcare delivery
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Get your medications delivered to your doorstep quickly and safely.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Care</h3>
              <p className="text-gray-600">Our licensed pharmacists are here to help with all your medication needs.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">Your health information is protected with the highest security standards.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
