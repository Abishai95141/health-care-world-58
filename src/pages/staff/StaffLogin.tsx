
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useStaffAuth } from '@/contexts/StaffAuthContext';

const StaffLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { signIn, user } = useStaffAuth();

  const redirectMessage = location.state?.message;

  useEffect(() => {
    if (user) {
      const redirectTo = location.state?.from || '/staff/dashboard';
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message || "Invalid email or password.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in to the staff portal.",
        });
        // Navigation will happen through useEffect
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email.trim() && password.trim();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <Card className="w-full max-w-md shadow-lg rounded-xl border-0">
        <CardHeader className="text-center pb-8">
          <h1 className="text-2xl font-bold text-[#27AE60] mb-2">Capsule Care Staff Portal</h1>
          <p className="text-[#6C757D]">Enter your credentials to continue</p>
          
          {redirectMessage && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{redirectMessage}</p>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#0B1F45] mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="staff@capsulecare.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-lg border-gray-300 focus:border-[#27AE60] focus:ring-[#27AE60]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#0B1F45] mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 rounded-lg border-gray-300 focus:border-[#27AE60] focus:ring-[#27AE60] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full h-11 bg-[#27AE60] hover:bg-[#219150] text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          <div className="text-center text-xs text-[#6C757D] mt-6">
            <p>Default credentials for testing:</p>
            <p>Email: admin@capsulecare.com | Password: admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffLogin;
