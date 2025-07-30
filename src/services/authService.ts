import { supabase } from '../lib/supabase';
import { ContractorService } from './contractorService';
import type { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];

export class AuthService {
  // Sign up new user with improved contractor creation handling
  static async signUp(email: string, password: string, userData: {
    full_name?: string;
    company_name?: string;
    role: 'admin' | 'professional';
  }) {
    console.log('🚀 [AuthService] Starting sign up process for:', email);
    const startTime = performance.now();
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name || '',
            company_name: userData.company_name || '',
            role: userData.role
          }
        }
      });

      const endTime = performance.now();
      console.log(`⏱️ [AuthService] Sign up took ${(endTime - startTime).toFixed(2)}ms`);

      if (error) {
        console.error('❌ [AuthService] Sign up error:', error);
        throw error;
      }

      // For professional users with company name, attempt to create contractor entry
      // but don't fail the entire sign-up process if it fails
      if (data.user && userData.role === 'professional' && userData.company_name) {
        console.log('🏢 [AuthService] Attempting to create contractor entry for professional user');
        
        // Use setTimeout to defer contractor creation slightly
        // This allows the database trigger to complete profile creation first
        setTimeout(async () => {
          try {
            await this.createContractorEntryDeferred(data.user!.id, userData.company_name!, email);
          } catch (contractorError) {
            console.error('❌ [AuthService] Deferred contractor creation failed:', contractorError);
            // In a production app, you might want to:
            // 1. Store this in a retry queue
            // 2. Send an alert to admins
            // 3. Show a message to the user to complete their profile later
          }
        }, 2000); // 2 second delay
      }

      console.log('✅ [AuthService] Sign up successful:', data.user?.id);
      return data;
    } catch (error) {
      console.error('💥 [AuthService] Sign up failed:', error);
      throw error;
    }
  }

  // Deferred contractor creation with retry logic
  static async createContractorEntryDeferred(userId: string, companyName: string, email: string) {
    console.log('🏢 [AuthService] Creating contractor entry (deferred) for user:', userId);
    
    try {
      // First, verify that the profile exists
      const profile = await this.getCurrentProfileById(userId);
      if (!profile) {
        throw new Error('User profile not found. Cannot create contractor entry.');
      }

      const contractorData = {
        user_id: userId,
        company_name: companyName,
        email: email,
        listing_status: 'pending_review' as const, // Changed from 'active' to 'pending_review'
        allow_booking: true,
        featured_profile: false,
        years_experience: 0
      };

      // Use the retry logic for contractor creation
      const contractor = await ContractorService.createContractorWithRetry(contractorData, 3);
      console.log('✅ [AuthService] Deferred contractor created with ID:', contractor.id);
      return contractor;
    } catch (error) {
      console.error('❌ [AuthService] Deferred contractor creation failed:', error);
      throw error;
    }
  }

  // Create contractor entry for professional users (immediate)
  static async createContractorEntry(userId: string, companyName: string, email: string) {
    console.log('🏢 [AuthService] Creating contractor entry for user:', userId);
    
    try {
      const contractorData = {
        user_id: userId,
        company_name: companyName,
        email: email,
        listing_status: 'pending_review' as const, // Changed from 'active' to 'pending_review'
        allow_booking: true,
        featured_profile: false,
        years_experience: 0
      };

      const contractor = await ContractorService.createContractor(contractorData);
      console.log('✅ [AuthService] Contractor created with ID:', contractor.id);
      return contractor;
    } catch (error) {
      console.error('❌ [AuthService] Error creating contractor:', error);
      throw error;
    }
  }

  // Sign in user
  static async signIn(email: string, password: string) {
    console.log('🔑 [AuthService] Starting sign in for:', email);
    const startTime = performance.now();
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      const endTime = performance.now();
      console.log(`⏱️ [AuthService] Sign in API call took ${(endTime - startTime).toFixed(2)}ms`);

      if (error) {
        console.error('❌ [AuthService] Sign in error:', error);
        throw error;
      }

      console.log('✅ [AuthService] Sign in successful:', {
        userId: data.user?.id,
        hasSession: !!data.session,
        sessionExpiry: data.session?.expires_at
      });
      return data;
    } catch (error) {
      console.error('💥 [AuthService] Sign in failed:', error);
      throw error;
    }
  }

  // Sign out user
  static async signOut() {
    console.log('🚪 [AuthService] Signing out user');
    const startTime = performance.now();
    
    try {
      const { error } = await supabase.auth.signOut();
      
      const endTime = performance.now();
      console.log(`⏱️ [AuthService] Sign out took ${(endTime - startTime).toFixed(2)}ms`);
      
      if (error) {
        console.error('❌ [AuthService] Sign out error:', error);
        throw error;
      }
      console.log('✅ [AuthService] Sign out successful');
    } catch (error) {
      console.error('💥 [AuthService] Sign out failed:', error);
      throw error;
    }
  }

  // Get current user profile
  static async getCurrentProfile() {
    console.log('🔍 [AuthService] Getting current profile...');
    const profileStartTime = performance.now();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('👤 [AuthService] No authenticated user found');
        return null;
      }

      return await this.getCurrentProfileById(user.id);
    } catch (error) {
      console.error('💥 [AuthService] Failed to get current profile:', error);
      throw error;
    }
  }

  // Get profile by user ID
  static async getCurrentProfileById(userId: string) {
    console.log('🔍 [AuthService] Getting profile for user ID:', userId);
    const dbStartTime = performance.now();

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      const dbEndTime = performance.now();
      console.log(`⏱️ [AuthService] Database profile query took ${(dbEndTime - dbStartTime).toFixed(2)}ms`);

      if (error) {
        console.error('❌ [AuthService] Error fetching profile:', error);
        // Don't throw error if profile doesn't exist, return null instead
        if (error.code === 'PGRST116') {
          console.log('📭 [AuthService] No profile found for user:', userId);
          return null;
        }
        throw error;
      }

      console.log('✅ [AuthService] Profile found:', {
        id: data.id,
        email: data.email,
        role: data.role,
        full_name: data.full_name
      });
      return data;
    } catch (error) {
      console.error('💥 [AuthService] Failed to get profile by ID:', error);
      throw error;
    }
  }

  // Create user profile (fallback method)
  static async createProfile(profile: ProfileInsert) {
    console.log('🚀 [AuthService] Creating profile with data:', {
      id: profile.id,
      email: profile.email,
      role: profile.role,
      full_name: profile.full_name
    });
    const startTime = performance.now();

    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert(profile)
        .select()
        .single();

      const endTime = performance.now();
      console.log(`⏱️ [AuthService] Profile creation took ${(endTime - startTime).toFixed(2)}ms`);

      if (error) {
        console.error('❌ [AuthService] Error creating profile:', error);
        throw error;
      }

      console.log('✅ [AuthService] Profile created successfully:', {
        id: data.id,
        email: data.email,
        role: data.role
      });

      // If this is a professional user and we have company name in user metadata, create contractor entry
      if (data.role === 'professional') {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          const companyName = user?.user_metadata?.company_name;
          
          if (companyName) {
            console.log('🏢 [AuthService] Creating contractor entry from profile creation');
            // Use deferred creation to avoid race conditions
            setTimeout(async () => {
              try {
                await this.createContractorEntryDeferred(data.id, companyName, data.email);
              } catch (contractorError) {
                console.error('❌ [AuthService] Failed to create contractor entry during profile creation:', contractorError);
              }
            }, 1000);
          }
        } catch (contractorError) {
          console.error('❌ [AuthService] Failed to create contractor entry during profile creation:', contractorError);
          // Don't throw error as profile was created successfully
        }
      }

      return data;
    } catch (error) {
      console.error('💥 [AuthService] Failed to create profile:', error);
      throw error;
    }
  }

  // Update user profile
  static async updateProfile(id: string, updates: Partial<Profile>) {
    console.log('🔄 [AuthService] Updating profile:', id, updates);
    const startTime = performance.now();
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      const endTime = performance.now();
      console.log(`⏱️ [AuthService] Profile update took ${(endTime - startTime).toFixed(2)}ms`);

      if (error) {
        console.error('❌ [AuthService] Error updating profile:', error);
        throw error;
      }
      
      console.log('✅ [AuthService] Profile updated successfully');
      return data;
    } catch (error) {
      console.error('💥 [AuthService] Failed to update profile:', error);
      throw error;
    }
  }

  // Reset password
  static async resetPassword(email: string) {
    console.log('🔄 [AuthService] Sending password reset email to:', email);
    const startTime = performance.now();
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      const endTime = performance.now();
      console.log(`⏱️ [AuthService] Password reset took ${(endTime - startTime).toFixed(2)}ms`);
      
      if (error) {
        console.error('❌ [AuthService] Password reset error:', error);
        throw error;
      }
      
      console.log('✅ [AuthService] Password reset email sent');
    } catch (error) {
      console.error('💥 [AuthService] Failed to send password reset email:', error);
      throw error;
    }
  }

  // Update user email
  static async updateUserEmail(newEmail: string) {
    console.log('📧 [AuthService] Updating user email to:', newEmail);
    const startTime = performance.now();
    
    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail
      });
      
      const endTime = performance.now();
      console.log(`⏱️ [AuthService] Email update took ${(endTime - startTime).toFixed(2)}ms`);
      
      if (error) {
        console.error('❌ [AuthService] Email update error:', error);
        throw error;
      }
      
      console.log('✅ [AuthService] Email update initiated successfully');
    } catch (error) {
      console.error('💥 [AuthService] Failed to update email:', error);
      throw error;
    }
  }

  // Update password
  static async updatePassword(newPassword: string) {
    console.log('🔄 [AuthService] Updating user password');
    const startTime = performance.now();
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      const endTime = performance.now();
      console.log(`⏱️ [AuthService] Password update took ${(endTime - startTime).toFixed(2)}ms`);
      
      if (error) {
        console.error('❌ [AuthService] Password update error:', error);
        throw error;
      }
      
      console.log('✅ [AuthService] Password updated successfully');
    } catch (error) {
      console.error('💥 [AuthService] Failed to update password:', error);
      throw error;
    }
  }
}