
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
    // Check for existing session in localStorage and Supabase
    const checkSession = async () => {
      try {
        const storedUser = localStorage.getItem('staff_user');
        if (storedUser) {
          const staffUser = JSON.parse(storedUser);
          
          // Create a session in Supabase auth for this staff user
          // We'll use a service role to create an anonymous session that links to this staff user
          const { error } = await supabase.auth.signInAnonymously({
            options: {
              data: {
                staff_id: staffUser.id,
                is_staff: true,
                staff_role: staffUser.role
              }
            }
          });

          if (!error) {
            setUser(staffUser);
          }
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

        // Create an anonymous session in Supabase auth with staff metadata
        const { error: authError } = await supabase.auth.signInAnonymously({
          options: {
            data: {
              staff_id: staffUser.id,
              is_staff: true,
              staff_role: staffUser.role
            }
          }
        });

        if (authError) {
          console.error('Auth session creation failed:', authError);
          // Continue anyway, as we can still use localStorage for basic functionality
        }

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
    await supabase.auth.signOut();
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
