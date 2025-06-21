import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

export interface Contractor {
  id: string;
  user_id: string | null;
  company_name: string;
  bio: string | null;
  location: string | null;
  specialties: string[] | null;
  website: string | null;
  profile_image_url: string | null;
  subscription_plan: string | null;
  stripe_subscription_id: string | null;
  listing_status: string | null;
  created_at: string;
  tagline: string | null;
  phone: string | null;
  email: string | null;
  license_number: string | null;
  years_experience: number | null;
  certifications: string[] | null;
  insurance_info: string | null;
  social_facebook: string | null;
  social_instagram: string | null;
  social_linkedin: string | null;
  social_youtube: string | null;
  image_gallery: string[] | null;
  featured_video: string | null;
  address: string | null;
  service_regions: string[] | null;
  google_maps_embed_url: string | null;
  allow_booking: boolean | null;
  slug: string | null;
  meta_title: string | null;
  meta_description: string | null;
  featured_profile: boolean | null;
  feature_media_url: string | null;
  carousel_media_urls: string[] | null;
  media_approved: boolean | null;
  // Add other fields as needed
  user_id?: { 
    full_name: string | null; 
    email: string; 
  }; // Joined profile data
}

type ContractorInsert = Database['public']['Tables']['contractors']['Insert'];
type ContractorUpdate = Database['public']['Tables']['contractors']['Update'];

export class ContractorService {
  // Get all contractors with optional filters
  static async getContractors(filters?: {
    location?: string;
    specialties?: string[];
    subscription_plan?: string;
    listing_status?: string;
  }) {
    try {
      console.log('🔍 [ContractorService] Getting contractors with filters:', filters);
      
      let query = supabase.from('contractors').select(`
        *,
        user_id (
          full_name,
          email
        )
      `);

      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      if (filters?.specialties && filters.specialties.length > 0) {
        query = query.overlaps('specialties', filters.specialties);
      }

      if (filters?.subscription_plan) {
        query = query.eq('subscription_plan', filters.subscription_plan);
      }

      if (filters?.listing_status) {
        query = query.eq('listing_status', filters.listing_status);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('❌ [ContractorService] Error getting contractors:', error);
        throw error;
      }

      console.log('✅ [ContractorService] Successfully retrieved contractors:', data?.length || 0);
      return data;
    } catch (error) {
      console.error('💥 [ContractorService] Failed to get contractors:', error);
      throw error;
    }
  }

  // Get contractor by ID
  static async getContractorById(id: string) {
    try {
      console.log('🔍 [ContractorService] Getting contractor by ID:', id);
      
      const { data, error } = await supabase.from('contractors').select(`
        *,
        user_id (
          full_name,
          email
        )
      `)
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('❌ [ContractorService] Error getting contractor by ID:', error);
        throw error;
      }

      if (!data) {
        console.log('📭 [ContractorService] No contractor found with ID:', id);
        return null;
      }

      console.log('✅ [ContractorService] Successfully retrieved contractor:', data.id);
      return data;
    } catch (error) {
      console.error('💥 [ContractorService] Failed to get contractor by ID:', error);
      throw error;
    }
  }

  // Get contractor by slug for public profile pages
  static async getContractorBySlug(slug: string) {
    try {
      console.log('🔍 [ContractorService] Getting contractor by slug:', slug);
      
      const { data, error } = await supabase.from('contractors').select(`
        *,
        user_id (
          full_name,
          email
        )
      `)
        .eq('slug', slug)
        .eq('listing_status', 'active')
        .maybeSingle();

      if (error) {
        console.error('❌ [ContractorService] Error getting contractor by slug:', error);
        throw error;
      }

      if (!data) {
        console.log('📭 [ContractorService] No contractor found with slug:', slug);
        return null;
      }

      console.log('✅ [ContractorService] Successfully retrieved contractor by slug:', data.id);
      return data;
    } catch (error) {
      console.error('💥 [ContractorService] Failed to get contractor by slug:', error);
      throw error;
    }
  }

  // Get contractor by user ID
  static async getContractorByUserId(userId: string) {
    try {
      console.log('🔍 [ContractorService] Getting contractor by user ID:', userId);
      
      const { data, error } = await supabase.from('contractors').select(`
        *,
        user_id (
          full_name,
          email
        )
      `)
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('❌ [ContractorService] Error getting contractor by user ID:', error);
        throw error;
      }

      if (!data) {
        console.log('📭 [ContractorService] No contractor found for user:', userId);
        return null;
      }

      console.log('✅ [ContractorService] Successfully retrieved contractor by user ID:', data.id);
      return data;
    } catch (error) {
      console.error('💥 [ContractorService] Failed to get contractor by user ID:', error);
      throw error;
    }
  }

  // Create new contractor with enhanced error handling and slug generation
  static async createContractor(contractor: ContractorInsert) {
    try {
      console.log('🚀 [ContractorService] Creating contractor:', {
        company_name: contractor.company_name,
        user_id: contractor.user_id,
        location: contractor.location
      });

      // Generate unique slug
      if (contractor.company_name && !contractor.slug) {
        contractor.slug = await this.generateUniqueSlug(contractor.company_name, contractor.location);
        console.log('🏷️ [ContractorService] Generated slug:', contractor.slug);
      }

      // Validate required fields
      if (!contractor.company_name) {
        throw new Error('Company name is required');
      }

      // Set default values for required fields
      const contractorData: ContractorInsert = {
        ...contractor,
        listing_status: contractor.listing_status || 'pending_review',
        allow_booking: contractor.allow_booking !== undefined ? contractor.allow_booking : true,
        featured_profile: contractor.featured_profile || false,
        years_experience: contractor.years_experience || 0,
        created_at: contractor.created_at || new Date().toISOString(),
        media_approved: contractor.media_approved !== undefined ? contractor.media_approved : true,
        feature_media_url: contractor.feature_media_url || null,
        carousel_media_urls: contractor.carousel_media_urls || []
      };

      const { data, error } = await supabase
        .from('contractors')
        .insert(contractorData)
        .select()
        .single();

      if (error) {
        console.error('❌ [ContractorService] Error creating contractor:', error);
        
        // Provide specific error messages for common issues
        if (error.code === '23505') {
          if (error.message.includes('contractors_slug_key')) {
            throw new Error('A contractor with this company name and location already exists. Please use a different name or location.');
          }
          throw new Error('A contractor with these details already exists.');
        }
        
        if (error.code === '23503') {
          if (error.message.includes('contractors_user_id_fkey')) {
            throw new Error('User profile must be created before creating contractor profile. Please try again in a moment.');
          }
          throw new Error('Invalid user reference. Please ensure the user exists.');
        }

        throw error;
      }

      console.log('✅ [ContractorService] Successfully created contractor:', data.id);
      return data;
    } catch (error) {
      console.error('💥 [ContractorService] Failed to create contractor:', error);
      throw error;
    }
  }

  // Update contractor with enhanced error handling
  static async updateContractor(id: string, updates: ContractorUpdate) {
    try {
      console.log('🔄 [ContractorService] Updating contractor:', id, updates);

      // First check if the contractor exists
      const { data: existingContractor, error: checkError } = await supabase
        .from('contractors')
        .select('id, company_name, location')
        .eq('id', id)
        .maybeSingle();

      if (checkError) {
        console.error('❌ [ContractorService] Error checking contractor existence:', checkError);
        throw checkError;
      }

      if (!existingContractor) {
        console.error('❌ [ContractorService] Contractor not found for update:', id);
        throw new Error('Contractor not found for update. The contractor may have been deleted.');
      }

      // Update slug if company name or location changed
      if (updates.company_name || updates.location) {
        const newCompanyName = updates.company_name || existingContractor.company_name;
        const newLocation = updates.location || existingContractor.location;
        updates.slug = await this.generateUniqueSlug(newCompanyName, newLocation, id);
        console.log('🏷️ [ContractorService] Updated slug:', updates.slug);
      }

      const { data, error } = await supabase
        .from('contractors')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) {
        console.error('❌ [ContractorService] Error updating contractor:', error);
        
        // Provide specific error messages
        if (error.code === '23505') {
          if (error.message.includes('contractors_slug_key')) {
            throw new Error('A contractor with this company name and location already exists.');
          }
          throw new Error('A contractor with these details already exists.');
        }

        throw error;
      }

      if (!data || data.length === 0) {
        console.error('❌ [ContractorService] Contractor not found for update:', id);
        throw new Error('Contractor not found for update. The contractor may have been deleted.');
      }

      console.log('✅ [ContractorService] Successfully updated contractor:', data[0].id);
      return data[0];
    } catch (error) {
      console.error('💥 [ContractorService] Failed to update contractor:', error);
      throw error;
    }
  }

  // Delete contractor
  static async deleteContractor(id: string) {
    try {
      console.log('🗑️ [ContractorService] Deleting contractor:', id);
      
      const { error } = await supabase
        .from('contractors')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('❌ [ContractorService] Error deleting contractor:', error);
        throw error;
      }

      console.log('✅ [ContractorService] Successfully deleted contractor:', id);
    } catch (error) {
      console.error('💥 [ContractorService] Failed to delete contractor:', error);
      throw error;
    }
  }

  // Get contractor statistics
  static async getContractorStats(contractorId: string) {
    try {
      console.log('📊 [ContractorService] Getting contractor stats:', contractorId);
      
      // Get leads assigned to contractor
      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .eq('assigned_contractor_id', contractorId);

      if (leadsError) {
        console.error('❌ [ContractorService] Error getting leads:', leadsError);
        throw leadsError;
      }

      // Get completed contracts
      const { data: contracts, error: contractsError } = await supabase
        .from('contracts')
        .select('*')
        .eq('contractor_id', contractorId)
        .eq('status', 'signed');

      if (contractsError) {
        console.error('❌ [ContractorService] Error getting contracts:', contractsError);
        throw contractsError;
      }

      // Get referrals and payments
      const { data: referrals, error: referralsError } = await supabase
        .from('referrals')
        .select('*')
        .eq('contractor_id', contractorId);

      if (referralsError) {
        console.error('❌ [ContractorService] Error getting referrals:', referralsError);
        throw referralsError;
      }

      const stats = {
        totalLeads: leads?.length || 0,
        completedProjects: contracts?.length || 0,
        totalEarnings: referrals?.reduce((sum, ref) => sum + (ref.contract_value || 0), 0) || 0,
        pendingPayouts: referrals?.filter(ref => !ref.success_fee_paid).reduce((sum, ref) => sum + ((ref.contract_value || 0) * (ref.success_fee_rate || 0) / 100), 0) || 0,
      };

      console.log('✅ [ContractorService] Successfully calculated stats:', stats);
      return stats;
    } catch (error) {
      console.error('💥 [ContractorService] Failed to get contractor stats:', error);
      throw error;
    }
  }

  // Generate unique SEO-friendly slug with collision detection
  static async generateUniqueSlug(companyName: string, location?: string, excludeId?: string): Promise<string> {
    try {
      console.log('🏷️ [ContractorService] Generating unique slug for:', companyName, location);
      
      let baseSlug = companyName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim();

      if (location) {
        const locationSlug = location
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
        
        baseSlug += `-${locationSlug}`;
      }

      // Add timestamp suffix to ensure uniqueness
      const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
      let uniqueSlug = `${baseSlug}-${timestamp}`;

      // Check if slug already exists (excluding current contractor if updating)
      let query = supabase
        .from('contractors')
        .select('id')
        .eq('slug', uniqueSlug);

      if (excludeId) {
        query = query.neq('id', excludeId);
      }

      const { data: existing } = await query.maybeSingle();

      // If slug exists, add a random suffix
      if (existing) {
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        uniqueSlug = `${baseSlug}-${timestamp}-${randomSuffix}`;
        console.log('🔄 [ContractorService] Slug collision detected, using random suffix:', uniqueSlug);
      }

      console.log('✅ [ContractorService] Generated unique slug:', uniqueSlug);
      return uniqueSlug;
    } catch (error) {
      console.error('💥 [ContractorService] Failed to generate unique slug:', error);
      // Fallback to basic slug with timestamp
      const fallbackSlug = `${companyName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
      console.log('🆘 [ContractorService] Using fallback slug:', fallbackSlug);
      return fallbackSlug;
    }
  }

  // Legacy method for backward compatibility
  static generateSlug(companyName: string, location?: string): string {
    console.warn('⚠️ [ContractorService] Using deprecated generateSlug method. Use generateUniqueSlug instead.');
    
    let slug = companyName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();

    if (location) {
      const locationSlug = location
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      slug += `-${locationSlug}`;
    }

    return slug;
  }

  // Get featured contractors for homepage
  static async getFeaturedContractors(limit: number = 6) {
    try {
      console.log('⭐ [ContractorService] Getting featured contractors, limit:', limit);
      
      const { data, error } = await supabase
        .from('contractors').select(`
          *,
          user_id (
            full_name
          )
        `)
        .eq('listing_status', 'active')
        .eq('featured_profile', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('❌ [ContractorService] Error getting featured contractors:', error);
        throw error;
      }

      console.log('✅ [ContractorService] Successfully retrieved featured contractors:', data?.length || 0);
      return data;
    } catch (error) {
      console.error('💥 [ContractorService] Failed to get featured contractors:', error);
      throw error;
    }
  }

  // Search contractors by location and services
  static async searchContractors(query: {
    location?: string;
    service?: string;
    radius?: number;
  }) {
    try {
      console.log('🔍 [ContractorService] Searching contractors with query:', query);
      
      let dbQuery = supabase.from('contractors').select(`
        *,
        user_id (
          full_name
        )
      `)
        .eq('listing_status', 'active');

      if (query.location) {
        dbQuery = dbQuery.or(`location.ilike.%${query.location}%,service_regions.cs.{${query.location}}`);
      }

      if (query.service) {
        dbQuery = dbQuery.contains('specialties', [query.service]);
      }

      const { data, error } = await dbQuery.order('featured_profile', { ascending: false });

      if (error) {
        console.error('❌ [ContractorService] Error searching contractors:', error);
        throw error;
      }

      console.log('✅ [ContractorService] Successfully searched contractors:', data?.length || 0);
      return data;
    } catch (error) {
      console.error('💥 [ContractorService] Failed to search contractors:', error);
      throw error;
    }
  }

  // Update contractor SEO metadata
  static async updateSEOMetadata(id: string, metadata: {
    meta_title?: string;
    meta_description?: string;
    slug?: string;
  }) {
    try {
      console.log('🔍 [ContractorService] Updating SEO metadata for contractor:', id);
      
      const { data, error } = await supabase
        .from('contractors')
        .update(metadata)
        .eq('id', id)
        .select();

      if (error) {
        console.error('❌ [ContractorService] Error updating SEO metadata:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.error('❌ [ContractorService] Contractor not found for SEO metadata update:', id);
        throw new Error('Contractor not found for SEO metadata update.');
      }

      console.log('✅ [ContractorService] Successfully updated SEO metadata');
      return data[0];
    } catch (error) {
      console.error('💥 [ContractorService] Failed to update SEO metadata:', error);
      throw error;
    }
  }

  // Create contractor with retry logic for race conditions
  static async createContractorWithRetry(contractor: ContractorInsert, maxRetries: number = 3): Promise<Contractor> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 [ContractorService] Creating contractor attempt ${attempt}/${maxRetries}`);
        
        // Add a small delay for subsequent attempts to allow for profile creation
        if (attempt > 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
        
        return await this.createContractor(contractor);
      } catch (error: any) {
        lastError = error;
        console.warn(`⚠️ [ContractorService] Attempt ${attempt} failed:`, error.message);
        
        // Don't retry for certain types of errors
        if (error.code === '23505' || // Unique constraint violation
            error.message.includes('already exists') ||
            attempt === maxRetries) {
          break;
        }
        
        // Only retry for foreign key constraint violations (race conditions)
        if (error.code !== '23503') {
          break;
        }
      }
    }
    
    console.error('💥 [ContractorService] All retry attempts failed');
    throw lastError || new Error('Failed to create contractor after multiple attempts');
  }
}