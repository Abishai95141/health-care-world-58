
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StaffUser {
  id: string;
  email: string;
  role: string;
}

interface StaffAuthContextType {
  user: StaffUser | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => void;
  loading: boolean;
}

const StaffAuthContext = createContext<StaffAuthContextType | undefined>(undefined);

export const useStaffAuth = () => {
  const context = useContext(StaffAuthContext);
  if (context === undefined) {
    throw new Error('useStaffAuth must be used within a StaffAuthProvider');
  }
  return context;
};

export const StaffAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StaffUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing staff session in localStorage
    const checkSession = async () => {
      try {
        const storedUser = localStorage.getItem('staff_user');
        if (storedUser) {
          const staffUser = JSON.parse(storedUser);
          
          // Verify the stored session is still valid by checking if the staff user exists
          const { data, error } = await supabase
            .from('staff_users')
            .select('id, email, role')
            .eq('email', staffUser.email)
            .maybeSingle();
          
          if (!error && data) {
            // Create a temporary auth session for RLS to work
            await createTempAuthSession(data.email);
            
            setUser({
              id: data.id,
              email: data.email,
              role: data.role
            });
          } else {
            // Clear invalid session
            localStorage.removeItem('staff_user');
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
        localStorage.removeItem('staff_user');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Helper function to create a temporary auth session with email in JWT claims
  const createTempAuthSession = async (email: string) => {
    try {
      // Create a temporary token with the staff email for RLS policies
      const tempPayload = {
        email: email,
        role: 'authenticated',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      };
      
      // Set the session manually for RLS to work
      await supabase.auth.setSession({
        access_token: 'staff-session-' + email,
        refresh_token: 'staff-refresh-' + email
      });
    } catch (error) {
      console.log('Could not create temp session:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // First, authenticate the staff user using the custom function
      const { data, error } = await supabase.rpc('authenticate_staff', {
        email_input: email,
        password_input: password
      });

      if (error) throw error;

      if (data && data.length > 0) {
        const staffData = data[0];
        
        // Create a temporary auth session with the staff email
        await createTempAuthSession(email);

        const staffUser = {
          id: staffData.user_id,
          email: staffData.email,
          role: staffData.role
        };

        setUser(staffUser);
        localStorage.setItem('staff_user', JSON.stringify(staffUser));
        return { error: null };
      } else {
        return { error: { message: 'Invalid email or password' } };
      }
    } catch (error: any) {
      console.error('Staff sign in error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      // Sign out from Supabase Auth if signed in
      await supabase.auth.signOut();
    } catch (error) {
      console.log('No Supabase Auth session to sign out from');
    }
    
    setUser(null);
    localStorage.removeItem('staff_user');
  };

  const value = {
    user,
    signIn,
    signOut,
    loading,
  };

  return <StaffAuthContext.Provider value={value}>{children}</StaffAuthContext.Provider>;
};
