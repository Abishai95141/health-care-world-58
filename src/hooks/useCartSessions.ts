
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useCartSessions = () => {
  const { user } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);

  const generateSessionId = () => {
    return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const createOrUpdateSession = async (newSessionId?: string) => {
    if (!user) return;

    const currentSessionId = newSessionId || sessionId || generateSessionId();
    
    try {
      // Check if session exists
      const { data: existingSession } = await supabase
        .from('cart_sessions')
        .select('*')
        .eq('session_id', currentSessionId)
        .single();

      if (!existingSession) {
        // Create new session
        await supabase
          .from('cart_sessions')
          .insert({
            session_id: currentSessionId,
            user_id: user.id,
            status: 'active'
          });
      } else {
        // Update existing session
        await supabase
          .from('cart_sessions')
          .update({ 
            status: 'active',
            updated_at: new Date().toISOString()
          })
          .eq('session_id', currentSessionId);
      }

      setSessionId(currentSessionId);
      localStorage.setItem('cart_session_id', currentSessionId);
    } catch (error) {
      console.error('Error managing cart session:', error);
    }
  };

  const markSessionConverted = async () => {
    if (!sessionId || !user) return;

    try {
      await supabase
        .from('cart_sessions')
        .update({ 
          status: 'converted',
          converted_at: new Date().toISOString()
        })
        .eq('session_id', sessionId)
        .eq('user_id', user.id);
    } catch (error) {
      console.error('Error marking session converted:', error);
    }
  };

  useEffect(() => {
    if (user) {
      const storedSessionId = localStorage.getItem('cart_session_id');
      if (storedSessionId) {
        setSessionId(storedSessionId);
        createOrUpdateSession(storedSessionId);
      }
    }
  }, [user]);

  return {
    sessionId,
    createOrUpdateSession,
    markSessionConverted
  };
};
