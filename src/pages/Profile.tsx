
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, User, MapPin, Package, Upload } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [activeSection, setActiveSection] = useState('account');

  // Mock data for demonstration
  const [accountData, setAccountData] = useState({
    fullName: user?.user_metadata?.full_name || 'John Doe',
    email: user?.email || 'john.doe@example.com'
  });

  const [contactData, setContactData] = useState({
    phone: '+91 98765 43210',
    dateOfBirth: '1990-01-15',
    gender: 'Male'
  });

  const mockAddresses = [
    {
      id: 1,
      name: 'John Doe',
      street: '101 Green Lane',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400001',
      phone: '+91 98765 43210',
      isDefault: true
    }
  ];

  const mockOrders = [
    {
      id: '#12345',
      date: '05 Jun 2025',
      status: 'Delivered',
      items: 3,
      total: '₹1,250.00'
    },
    {
      id: '#12344',
      date: '02 Jun 2025',
      status: 'Pending',
      items: 1,
      total: '₹450.00'
    }
  ];

  const sidebarItems = [
    { id: 'account', label: 'Account Information', icon: User },
    { id: 'contact', label: 'Contact & Personal Details', icon: User },
    { id: 'addresses', label: 'My Addresses', icon: MapPin },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'prescriptions', label: 'Prescriptions', icon: Upload }
  ];

  const handleSaveAccount = () => {
    setIsEditingAccount(false);
    // Here you would save to Supabase
  };

  const handleSaveContact = () => {
    setIsEditingContact(false);
    // Here you would save to Supabase
  };

  const renderAccountSection = () => (
    <Card className="mb-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-semibold text-[#0B1F45]">Account Information</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditingAccount(!isEditingAccount)}
          className="text-[#27AE60] hover:text-[#219150]"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        {isEditingAccount ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#0B1F45] mb-2">Full Name</label>
              <Input
                value={accountData.fullName}
                onChange={(e) => setAccountData({...accountData, fullName: e.target.value})}
                className="h-11"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0B1F45] mb-2">Email Address</label>
              <Input
                value={accountData.email}
                onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                className="h-11"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0B1F45] mb-2">Password</label>
              <div className="flex items-center justify-between">
                <span className="text-base">••••••••</span>
                <Button variant="link" className="text-[#27AE60] p-0">Change Password</Button>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button onClick={handleSaveAccount} className="bg-[#27AE60] hover:bg-[#219150]">
                Save Changes
              </Button>
              <Button variant="ghost" onClick={() => setIsEditingAccount(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#0B1F45] mb-1">Full Name</label>
              <p className="text-base">{accountData.fullName}</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0B1F45] mb-1">Email Address</label>
              <p className="text-base">{accountData.email}</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0B1F45] mb-1">Password</label>
              <div className="flex items-center justify-between">
                <span className="text-base">••••••••</span>
                <Button variant="link" className="text-[#27AE60] p-0">Change Password</Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderContactSection = () => (
    <Card className="mb-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-semibold text-[#0B1F45]">Contact & Personal Details</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditingContact(!isEditingContact)}
          className="text-[#27AE60] hover:text-[#219150]"
        >
          <Edit className="w-4 h-4 mr-2" />
          {contactData.phone ? 'Edit' : 'Add Details'}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditingContact ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#0B1F45] mb-2">Phone Number</label>
              <Input
                value={contactData.phone}
                onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                placeholder="Enter your phone number"
                className="h-11"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0B1F45] mb-2">Date of Birth</label>
              <Input
                type="date"
                value={contactData.dateOfBirth}
                onChange={(e) => setContactData({...contactData, dateOfBirth: e.target.value})}
                className="h-11"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0B1F45] mb-2">Gender</label>
              <select
                value={contactData.gender}
                onChange={(e) => setContactData({...contactData, gender: e.target.value})}
                className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:border-[#27AE60] focus:ring-[#27AE60]"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div className="flex gap-4 pt-4">
              <Button onClick={handleSaveContact} className="bg-[#27AE60] hover:bg-[#219150]">
                Save
              </Button>
              <Button variant="ghost" onClick={() => setIsEditingContact(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#0B1F45] mb-1">Phone Number</label>
              <p className="text-base">{contactData.phone || 'Not provided'}</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0B1F45] mb-1">Date of Birth</label>
              <p className="text-base">{contactData.dateOfBirth ? new Date(contactData.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0B1F45] mb-1">Gender</label>
              <p className="text-base">{contactData.gender || 'Not provided'}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderAddressesSection = () => (
    <Card className="mb-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-semibold text-[#0B1F45]">My Addresses</h3>
        <Button className="bg-[#27AE60] hover:bg-[#219150] text-sm">
          + Add New Address
        </Button>
      </CardHeader>
      <CardContent>
        {mockAddresses.length > 0 ? (
          <div className="space-y-4">
            {mockAddresses.map((address) => (
              <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-base">{address.name}</h4>
                    <p className="text-sm text-gray-600">{address.street}</p>
                    <p className="text-sm text-gray-600">{address.city}, {address.state}, {address.pinCode}</p>
                    <p className="text-sm text-gray-600">{address.phone}</p>
                    {address.isDefault && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mt-2 inline-block">
                        Default Address
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="link" className="text-blue-600 text-sm p-0">Edit</Button>
                    <Button variant="link" className="text-red-600 text-sm p-0">Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No addresses added yet.</p>
            <Button className="bg-[#27AE60] hover:bg-[#219150]">Add New Address</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderOrdersSection = () => (
    <Card className="mb-10">
      <CardHeader>
        <h3 className="text-xl font-semibold text-[#0B1F45]">Order History</h3>
      </CardHeader>
      <CardContent>
        {mockOrders.length > 0 ? (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-base">Order {order.id} • {order.date}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{order.items} items • {order.total}</p>
                  </div>
                  <Button variant="link" className="text-blue-600 text-sm">View Details</Button>
                </div>
              </div>
            ))}
            <Button variant="link" className="text-[#27AE60] text-sm">View All Orders</Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
            <Button className="bg-[#27AE60] hover:bg-[#219150]">Start Shopping</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderPrescriptionsSection = () => (
    <Card className="mb-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-semibold text-[#0B1F45]">My Prescriptions</h3>
        <Button className="bg-[#27AE60] hover:bg-[#219150] text-sm">
          Upload New Prescription
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No prescriptions uploaded.</p>
          <Button className="bg-[#27AE60] hover:bg-[#219150]">Upload Prescription</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10">
          <div>
            <p className="text-sm text-gray-500 mb-2">Home › My Profile</p>
            <h1 className="text-3xl font-bold text-[#0B1F45] mb-2">My Profile</h1>
            <p className="text-[#6C757D]">Manage your account details and preferences.</p>
          </div>
          <div className="mt-6 lg:mt-0 flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-[#27AE60] text-white text-lg">
                {accountData.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-medium text-[#0B1F45]">
                Hello, {accountData.fullName.split(' ')[0]}!
              </h3>
              <Button variant="link" className="text-[#27AE60] text-sm p-0">Change Photo</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card className="mb-6">
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-none first:rounded-t-lg last:rounded-b-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-[#F0FAF4] text-[#27AE60] border-r-2 border-[#27AE60]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </button>
                  ))}
                  <button
                    onClick={signOut}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-none last:rounded-b-lg transition-colors"
                  >
                    Log Out
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === 'account' && renderAccountSection()}
            {activeSection === 'contact' && renderContactSection()}
            {activeSection === 'addresses' && renderAddressesSection()}
            {activeSection === 'orders' && renderOrdersSection()}
            {activeSection === 'prescriptions' && renderPrescriptionsSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
