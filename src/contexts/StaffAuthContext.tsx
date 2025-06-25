
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
          setUser(staffUser);
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.rpc('authenticate_staff', {
        email_input: email,
        password_input: password
      });

      if (error) throw error;

      if (data && data.length > 0) {
        const staffUser = {
          id: data[0].user_id,
          email: data[0].email,
          role: data[0].role
        };

        setUser(staffUser);
        localStorage.setItem('staff_user', JSON.stringify(staffUser));
        return { error: null };
      } else {
        return { error: { message: 'Invalid email or password' } };
      }
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
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
