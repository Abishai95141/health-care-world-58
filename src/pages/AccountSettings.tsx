
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Lock, 
  CreditCard, 
  MapPin, 
  Bell, 
  Shield, 
  Download,
  Trash2,
  Link,
  Camera,
  Mail,
  Phone,
  Eye,
  EyeOff
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const AccountSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    emailNotifications: true,
    smsAlerts: true,
    newsletter: true,
    newsletterFrequency: 'weekly'
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.2
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    // Save logic here
    setHasUnsavedChanges(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-light text-black mb-2">Account Settings</h1>
            <p className="text-gray-600">Manage your account preferences and security settings</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20"
          >
            {/* Personal Information */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-lg rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-black">
                    <User className="w-6 h-6" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Change Photo
                    </Button>
                  </div>
                  
                  <motion.div variants={inputVariants} whileFocus="focus">
                    <Label htmlFor="fullName" className="text-base font-medium text-black">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="mt-2 h-12"
                    />
                  </motion.div>

                  <div>
                    <Label className="text-base font-medium text-black">Email</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-12"
                      />
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-sm mt-1">
                      Change Email
                    </Button>
                  </div>

                  <div>
                    <Label className="text-base font-medium text-black">Phone</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="h-12"
                      />
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-sm mt-1">
                      Change Phone
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Security */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-lg rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-black">
                    <Lock className="w-6 h-6" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="currentPassword" className="text-base font-medium text-black">Current Password</Label>
                    <div className="relative mt-2">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        className="h-12 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newPassword" className="text-base font-medium text-black">New Password</Label>
                    <div className="relative mt-2">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                        className="h-12 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-base font-medium text-black">Confirm New Password</Label>
                    <div className="relative mt-2">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="h-12 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium text-black">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                    <Switch
                      checked={formData.twoFactorEnabled}
                      onCheckedChange={(checked) => handleInputChange('twoFactorEnabled', checked)}
                    />
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" className="w-full">
                      View Login Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Methods */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-lg rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-black">
                    <CreditCard className="w-6 h-6" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <RadioGroup defaultValue="card1">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="card1" id="card1" />
                          <div>
                            <Label htmlFor="card1" className="font-medium">•••• •••• •••• 4242</Label>
                            <p className="text-sm text-gray-600">Expires 12/25</p>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="card2" id="card2" />
                          <div>
                            <Label htmlFor="card2" className="font-medium">•••• •••• •••• 8888</Label>
                            <p className="text-sm text-gray-600">Expires 08/26</p>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add New Card
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Addresses */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-lg rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-black">
                    <MapPin className="w-6 h-6" />
                    Addresses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="font-medium">Default Shipping Address</Label>
                      <Button variant="link" size="sm">Edit</Button>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>123 Main Street</p>
                      <p>New York, NY 10001</p>
                      <p>United States</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add New Address
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notifications & Preferences */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-lg rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-black">
                    <Bell className="w-6 h-6" />
                    Notifications & Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium text-black">Email Notifications</Label>
                      <p className="text-sm text-gray-600">Order updates and promotions</p>
                    </div>
                    <Switch
                      checked={formData.emailNotifications}
                      onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium text-black">SMS Alerts</Label>
                      <p className="text-sm text-gray-600">Delivery and prescription reminders</p>
                    </div>
                    <Switch
                      checked={formData.smsAlerts}
                      onCheckedChange={(checked) => handleInputChange('smsAlerts', checked)}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium text-black">Newsletter</Label>
                        <p className="text-sm text-gray-600">Health tips and product updates</p>
                      </div>
                      <Switch
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
                      />
                    </div>
                    {formData.newsletter && (
                      <Select
                        value={formData.newsletterFrequency}
                        onValueChange={(value) => handleInputChange('newsletterFrequency', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Privacy & Data */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-lg rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-black">
                    <Shield className="w-6 h-6" />
                    Privacy & Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download My Data
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete My Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </motion.div>

            {/* Connected Accounts */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-lg rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-black">
                    <Link className="w-6 h-6" />
                    Connected Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <Label className="font-medium">Google</Label>
                        <p className="text-sm text-gray-600">Connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <Label className="font-medium">Facebook</Label>
                        <p className="text-sm text-gray-600">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Sticky Save Button */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t p-4 z-50"
            initial={{ y: 100 }}
            animate={{ y: hasUnsavedChanges ? 0 : 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <p className="text-sm text-gray-600">You have unsaved changes</p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setHasUnsavedChanges(false)}>
                  Cancel
                </Button>
                <motion.div
                  animate={hasUnsavedChanges ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Button onClick={handleSave} className="bg-black hover:bg-gray-800">
                    Save Changes
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountSettings;
