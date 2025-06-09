
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Settings, Package, Heart, Camera, Edit2, Save, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '+91 98765 43210'
  });
  const [progressValue, setProgressValue] = useState(0);

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(80), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would normally save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({
      fullName: user?.user_metadata?.full_name || '',
      email: user?.email || '',
      phone: '+91 98765 43210'
    });
  };

  const statCards = [
    { icon: Package, label: 'Orders Placed', value: '0', color: 'text-blue-600' },
    { icon: Heart, label: 'Wishlist Items', value: '0', color: 'text-red-600' },
    { icon: MapPin, label: 'Saved Addresses', value: '0', color: 'text-green-600' }
  ];

  const memberSince = new Date(user?.created_at || '').toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Cover Banner */}
        <div className="relative h-48 bg-gradient-to-r from-green-400 via-green-500 to-green-600 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Avatar Section */}
          <div className="relative -mt-16 mb-8 text-center">
            <div className="relative inline-block group">
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                <AvatarImage src="" alt={profileData.fullName} />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-green-400 to-green-600 text-white">
                  {profileData.fullName?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">{profileData.fullName || 'User'}</h1>
            <p className="text-sm text-gray-600">Member since {memberSince}</p>
          </div>

          {/* Profile Completeness */}
          <Card className="mb-8 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Profile Completeness</span>
                <span className="text-sm font-bold text-green-600">{progressValue}% Complete</span>
              </div>
              <Progress value={progressValue} className="h-2 transition-all duration-1000 ease-out" />
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <Card 
                key={stat.label} 
                className="text-center transform hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Personal Information
                    </div>
                    {!isEditing ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleEdit}
                        className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-700 hover:scale-110 transition-all duration-200"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancel}
                          className="text-red-600 hover:text-red-700 hover:scale-110 transition-all duration-200"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      {isEditing ? (
                        <Input
                          value={profileData.fullName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                          className="transition-all duration-300 focus:scale-105"
                        />
                      ) : (
                        <p className="text-gray-900 p-2 rounded hover:bg-gray-50 transition-colors duration-200">
                          {profileData.fullName || 'Not provided'}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      {isEditing ? (
                        <Input
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="transition-all duration-300 focus:scale-105"
                        />
                      ) : (
                        <p className="text-gray-900 p-2 rounded hover:bg-gray-50 transition-colors duration-200">
                          {profileData.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      {isEditing ? (
                        <Input
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          className="transition-all duration-300 focus:scale-105"
                        />
                      ) : (
                        <p className="text-gray-900 p-2 rounded hover:bg-gray-50 transition-colors duration-200">
                          {profileData.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date Joined</label>
                      <p className="text-gray-900 p-2 rounded hover:bg-gray-50 transition-colors duration-200">
                        {new Date(user?.created_at || '').toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card className="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="relative inline-block">
                      <Package className="h-16 w-16 text-gray-300 mx-auto mb-4 animate-bounce" style={{ animationDuration: '3s' }} />
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-gray-600 text-lg font-medium">No orders yet</p>
                    <p className="text-sm text-gray-500 mt-2">Start shopping to see your orders here</p>
                    <Button className="mt-4 bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-200">
                      Start Shopping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start hover:bg-red-50 hover:border-red-200 hover:scale-105 transition-all duration-200 group">
                    <Heart className="h-4 w-4 mr-3 group-hover:text-red-500 transition-colors duration-200" />
                    Wishlist
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-green-50 hover:border-green-200 hover:scale-105 transition-all duration-200 group">
                    <MapPin className="h-4 w-4 mr-3 group-hover:text-green-500 transition-colors duration-200" />
                    Addresses
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-blue-50 hover:border-blue-200 hover:scale-105 transition-all duration-200 group">
                    <Settings className="h-4 w-4 mr-3 group-hover:text-blue-500 transition-colors duration-200" />
                    Account Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card className="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Email Verified</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 hover:scale-110 transition-transform duration-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Phone Verified</span>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:scale-110 transition-transform duration-200">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
