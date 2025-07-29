import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AuthService } from '../services/authService';
import type { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: { full_name?: string; role: 'admin' | 'professional' }) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    console.log('🔄 [AuthContext] Starting auth initialization...');
    const initStartTime = performance.now();

    // Get initial session
    const initializeAuth = async () => {
      try {
        console.log('🔄 [AuthContext] Getting initial session...');
        const sessionStartTime = performance.now();
        
        const { data: { session } } = await supabase.auth.getSession();
        
        const sessionEndTime = performance.now();
        console.log(`⏱️ [AuthContext] Initial session fetch took ${(sessionEndTime - sessionStartTime).toFixed(2)}ms`);
        
        if (!mounted) {
          console.log('⚠️ [AuthContext] Component unmounted during session fetch');
          return;
        }

        console.log('📋 [AuthContext] Initial session:', {
          hasSession: !!session,
          userId: session?.user?.id || 'No session',
          expiresAt: session?.expires_at
        });
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('👤 [AuthContext] User found in session, loading profile...');
          await loadProfile(session.user.id);
        } else {
          console.log('👤 [AuthContext] No user in session');
        }
      } catch (error) {
        console.error('💥 [AuthContext] Error initializing auth:', error);
      } finally {
        if (mounted) {
          const initEndTime = performance.now();
          console.log(`⏱️ [AuthContext] Total auth initialization took ${(initEndTime - initStartTime).toFixed(2)}ms`);
          console.log('✅ [AuthContext] Setting isLoading to false');
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    console.log('👂 [AuthContext] Setting up auth state change listener...');
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) {
        console.log('⚠️ [AuthContext] Component unmounted during auth state change');
        return;
      }

      console.log('🔄 [AuthContext] Auth state change:', {
        event,
        hasSession: !!session,
        userId: session?.user?.id || 'No user',
        timestamp: new Date().toISOString()
      });
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log('👤 [AuthContext] User authenticated, loading profile...');
        await loadProfile(session.user.id);
        
        // Redirect after successful authentication
        if (event === 'SIGNED_IN') {
          const redirectTo = getRedirectPath();
          console.log('🚀 [AuthContext] Redirecting to:', redirectTo);
          navigate(redirectTo, { replace: true });
        }
      } else {
        console.log('👤 [AuthContext] No user, clearing profile');
        setProfile(null);
        
        // Redirect to login if user signs out and is on protected route
        if (event === 'SIGNED_OUT' && isProtectedRoute(location.pathname)) {
          console.log('🚪 [AuthContext] Redirecting to login from protected route');
          navigate('/login', { replace: true });
        }
      }
      
      console.log('✅ [AuthContext] Auth state change processing complete, setting isLoading to false');
      setIsLoading(false);
    });

    return () => {
      console.log('🧹 [AuthContext] Cleaning up auth context');
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const loadProfile = async (userId: string, retryCount = 0) => {
    const maxRetries = 5; // Increased retries for better reliability
    const retryDelay = 500; // 500ms delay between retries
    
    console.log(`🔍 [AuthContext] Loading profile for user: ${userId} (attempt ${retryCount + 1}/${maxRetries + 1})`);
    const profileStartTime = performance.now();

    try {
      // Try to get the profile
      let fetchedProfile = await AuthService.getCurrentProfile();
      
      // If no profile exists and we haven't exceeded retry limit
      if (!fetchedProfile && retryCount < maxRetries) {
        console.log(`📭 [AuthContext] No profile found, retrying in ${retryDelay}ms... (attempt ${retryCount + 1}/${maxRetries})`);
        
        // Wait before retrying (for database trigger to complete)
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        
        // Retry recursively
        return await loadProfile(userId, retryCount + 1);
      }

      if (fetchedProfile) {
        setProfile(fetchedProfile);
        const profileEndTime = performance.now();
        console.log(`⏱️ [AuthContext] Profile loading took ${(profileEndTime - profileStartTime).toFixed(2)}ms`);
        console.log('✅ [AuthContext] Profile loaded successfully:', {
          id: fetchedProfile.id,
          email: fetchedProfile.email,
          role: fetchedProfile.role,
          retryCount
        });
      } else {
        console.error('❌ [AuthContext] Failed to load or create profile after all attempts');
        setProfile(null);
      }
    } catch (error) {
      console.error('💥 [AuthContext] Error in loadProfile:', error);
      setProfile(null);
    }
  };

  const getRedirectPath = () => {
    // Check if there's a stored redirect path
    const from = location.state?.from?.pathname;
    if (from && from !== '/login') {
      console.log('🔄 [AuthContext] Using stored redirect path:', from);
      return from;
    }

    // Default redirect based on role (will be determined after profile loads)
    console.log('🔄 [AuthContext] Using default redirect path: /dashboard');
    return '/dashboard';
  };

  const isProtectedRoute = (pathname: string) => {
    const protectedRoutes = ['/partner-portal', '/admin', '/dashboard'];
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
    console.log('🔒 [AuthContext] Checking if route is protected:', { pathname, isProtected });
    return isProtected;
  };

  const signIn = async (email: string, password: string) => {
    console.log('🔑 [AuthContext] Sign in initiated for:', email);
    const signInStartTime = performance.now();
    
    try {
      await AuthService.signIn(email, password);
      const signInEndTime = performance.now();
      console.log(`⏱️ [AuthContext] Sign in process took ${(signInEndTime - signInStartTime).toFixed(2)}ms`);
    } catch (error) {
      console.error('❌ [AuthContext] Sign in failed:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData: { full_name?: string; role: 'admin' | 'professional' }) => {
    console.log('🚀 [AuthContext] Sign up initiated for:', email);
    await AuthService.signUp(email, password, userData);
  };

  const signOut = async () => {
    console.log('🚪 [AuthContext] Sign out initiated');
    await AuthService.signOut();
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');
    
    console.log('🔄 [AuthContext] Profile update initiated for user:', user.id);
    try {
      const updatedProfile = await AuthService.updateProfile(user.id, updates);
      setProfile(updatedProfile);
      console.log('✅ [AuthContext] Profile updated successfully');
    } catch (error) {
      console.error('❌ [AuthContext] Profile update failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  console.log('🎯 [AuthContext] Current state:', {
    hasUser: !!user,
    hasProfile: !!profile,
    hasSession: !!session,
    isLoading,
    userRole: profile?.role,
    timestamp: new Date().toISOString()
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}