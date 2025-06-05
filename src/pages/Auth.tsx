
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { signIn, signUp, signInWithGoogle, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        
        const redirectTo = location.state?.from || '/';
        navigate(redirectTo, { replace: true });
      } else {
        if (password !== confirmPassword) {
          toast({
            title: "Password mismatch",
            description: "Please make sure your passwords match.",
            variant: "destructive",
          });
          return;
        }

        const { error } = await signUp(email, password);
        
        if (error) throw error;
        
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during authentication.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { error } = await signInWithGoogle();
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred with Google authentication.",
        variant: "destructive",
      });
    }
  };

  // Show message if user was redirected here
  const showRedirectMessage = location.state?.from;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Hero Image */}
      <div className="relative lg:w-1/2 h-[40vh] lg:h-screen bg-cover bg-center bg-no-repeat"
           style={{
             backgroundImage: `linear-gradient(rgba(39, 174, 96, 0.3), rgba(39, 174, 96, 0.3)), url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
           }}>
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <div className="mb-4">
            <div className="w-24 h-0.5 bg-white mb-6"></div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Your Health, Our Priority
            </h1>
            <p className="text-lg opacity-85">
              Trusted Care Delivered to Your Doorstep
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Authentication Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <Card className="w-full max-w-md shadow-lg rounded-xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#27AE60] mb-2">Capsule Care</h2>
            </div>
            
            {showRedirectMessage && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  You must be logged in to add items to your cart or complete checkout.
                </p>
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-[#0B1F45] mb-2">
              {isLogin ? 'Log In' : 'Sign Up'}
            </h3>
            <p className="text-[#6C757D]">
              {isLogin ? 'Access your account' : 'Create a new account'}
            </p>
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
                  placeholder="Enter your email"
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

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#0B1F45] mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-11 rounded-lg border-gray-300 focus:border-[#27AE60] focus:ring-[#27AE60] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#27AE60] hover:bg-[#219150] text-white font-semibold rounded-lg transition-colors"
              >
                {isLoading ? 'Loading...' : (isLogin ? 'Log In' : 'Create Account')}
              </Button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#27AE60] hover:underline font-medium"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
              </button>
            </div>

            <div className="relative">
              <Separator className="my-6" />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-gray-500 text-sm">
                or
              </span>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleAuth}
              className="w-full h-11 border-gray-300 hover:bg-gray-50 rounded-lg"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            <p className="text-center text-xs text-[#6C757D] mt-6">
              By continuing, you agree to our{' '}
              <a href="#" className="text-[#27AE60] underline hover:no-underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#27AE60] underline hover:no-underline">
                Terms of Service
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
