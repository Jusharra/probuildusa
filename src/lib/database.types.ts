export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'professional'
          stripe_customer_id: string | null
          created_at: string
          profile_image_url: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role: 'admin' | 'professional'
          stripe_customer_id?: string | null
          created_at?: string
          profile_image_url?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'professional'
          stripe_customer_id?: string | null
          created_at?: string
          profile_image_url?: string | null
        }
      }
      contractors: {
        Row: {
          id: string
          user_id: string | null
          company_name: string
          bio: string | null
          location: string | null
          specialties: string[] | null
          website: string | null
          profile_image_url: string | null
          subscription_plan: string | null
          stripe_subscription_id: string | null
          listing_status: string | null
          created_at: string
          tagline: string | null
          phone: string | null
          email: string | null
          license_number: string | null
          years_experience: number | null
          certifications: string[] | null
          insurance_info: string | null
          social_facebook: string | null
          social_instagram: string | null
          social_linkedin: string | null
          social_youtube: string | null
          image_gallery: string[] | null
          featured_video: string | null
          address: string | null
          service_regions: string[] | null
          google_maps_embed_url: string | null
          allow_booking: boolean | null
          slug: string | null
          meta_title: string | null
          meta_description: string | null
          featured_profile: boolean | null
          feature_media_url: string | null
          carousel_media_urls: string[] | null
          media_approved: boolean | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          company_name: string
          bio?: string | null
          location?: string | null
          specialties?: string[] | null
          website?: string | null
          profile_image_url?: string | null
          subscription_plan?: string | null
          stripe_subscription_id?: string | null
          listing_status?: string | null
          created_at?: string
          tagline?: string | null
          phone?: string | null
          email?: string | null
          license_number?: string | null
          years_experience?: number | null
          certifications?: string[] | null
          insurance_info?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_youtube?: string | null
          image_gallery?: string[] | null
          featured_video?: string | null
          address?: string | null
          service_regions?: string[] | null
          google_maps_embed_url?: string | null
          allow_booking?: boolean | null
          slug?: string | null
          meta_title?: string | null
          meta_description?: string | null
          featured_profile?: boolean | null
          feature_media_url?: string | null
          carousel_media_urls?: string[] | null
          media_approved?: boolean | null
        }
        Update: {
          id?: string
          user_id?: string | null
          company_name?: string
          bio?: string | null
          location?: string | null
          specialties?: string[] | null
          website?: string | null
          profile_image_url?: string | null
          subscription_plan?: string | null
          stripe_subscription_id?: string | null
          listing_status?: string | null
          created_at?: string
          tagline?: string | null
          phone?: string | null
          email?: string | null
          license_number?: string | null
          years_experience?: number | null
          certifications?: string[] | null
          insurance_info?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_youtube?: string | null
          image_gallery?: string[] | null
          featured_video?: string | null
          address?: string | null
          service_regions?: string[] | null
          google_maps_embed_url?: string | null
          allow_booking?: boolean | null
          slug?: string | null
          meta_title?: string | null
          meta_description?: string | null
          featured_profile?: boolean | null
          feature_media_url?: string | null
          carousel_media_urls?: string[] | null
          media_approved?: boolean | null
        }
      }
      leads: {
        Row: {
          id: string
          client_name: string | null
          phone: string | null
          email: string | null
          project_type: string | null
          zip_code: string | null
          budget: number | null
          timeline: string | null
          description: string | null
          source: string | null
          status: string | null
          assigned_contractor_id: string | null
          contract_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          client_name?: string | null
          phone?: string | null
          email?: string | null
          project_type?: string | null
          zip_code?: string | null
          budget?: number | null
          timeline?: string | null
          description?: string | null
          source?: string | null
          status?: string | null
          assigned_contractor_id?: string | null
          contract_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          client_name?: string | null
          phone?: string | null
          email?: string | null
          project_type?: string | null
          zip_code?: string | null
          budget?: number | null
          timeline?: string | null
          description?: string | null
          source?: string | null
          status?: string | null
          assigned_contractor_id?: string | null
          contract_id?: string | null
          created_at?: string
        }
      }
      contracts: {
        Row: {
          id: string
          lead_id: string | null
          contractor_id: string | null
          file_url: string | null
          status: 'draft' | 'sent' | 'signed' | 'declined' | 'archived' | null
          created_by_ai: boolean | null
          signature_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          lead_id?: string | null
          contractor_id?: string | null
          file_url?: string | null
          status?: 'draft' | 'sent' | 'signed' | 'declined' | 'archived' | null
          created_by_ai?: boolean | null
          signature_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          lead_id?: string | null
          contractor_id?: string | null
          file_url?: string | null
          status?: 'draft' | 'sent' | 'signed' | 'declined' | 'archived' | null
          created_by_ai?: boolean | null
          signature_date?: string | null
          created_at?: string
        }
      }
      referrals: {
        Row: {
          id: string
          lead_id: string | null
          contractor_id: string | null
          lead_fee_amount: number | null
          lead_fee_paid: boolean | null
          contract_value: number | null
          success_fee_rate: number | null
          success_fee_paid: boolean | null
          invoice_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          lead_id?: string | null
          contractor_id?: string | null
          lead_fee_amount?: number | null
          lead_fee_paid?: boolean | null
          contract_value?: number | null
          success_fee_rate?: number | null
          success_fee_paid?: boolean | null
          invoice_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          lead_id?: string | null
          contractor_id?: string | null
          lead_fee_amount?: number | null
          lead_fee_paid?: boolean | null
          contract_value?: number | null
          success_fee_rate?: number | null
          success_fee_paid?: boolean | null
          invoice_id?: string | null
          created_at?: string
        }
      }
      stripe_payments: {
        Row: {
          id: string
          user_id: string | null
          type: 'subscription' | 'lead_fee' | 'success_fee' | null
          amount: number | null
          currency: string | null
          stripe_invoice_id: string | null
          payment_status: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          type?: 'subscription' | 'lead_fee' | 'success_fee' | null
          amount?: number | null
          currency?: string | null
          stripe_invoice_id?: string | null
          payment_status?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          type?: 'subscription' | 'lead_fee' | 'success_fee' | null
          amount?: number | null
          currency?: string | null
          stripe_invoice_id?: string | null
          payment_status?: string | null
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          lead_id: string | null
          contractor_id: string | null
          booking_type: 'consultation' | 'inspection' | 'project_start' | null
          scheduled_at: string | null
          status: 'pending' | 'confirmed' | 'completed' | 'canceled' | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          lead_id?: string | null
          contractor_id?: string | null
          booking_type?: 'consultation' | 'inspection' | 'project_start' | null
          scheduled_at?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'canceled' | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          lead_id?: string | null
          contractor_id?: string | null
          booking_type?: 'consultation' | 'inspection' | 'project_start' | null
          scheduled_at?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'canceled' | null
          notes?: string | null
          created_at?: string
        }
      }
      contract_ai_requests: {
        Row: {
          id: string
          contractor_id: string | null
          lead_id: string | null
          requested_template: string | null
          status: 'pending' | 'generated' | 'error' | null
          ai_response: string | null
          created_at: string
        }
        Insert: {
          id?: string
          contractor_id?: string | null
          lead_id?: string | null
          requested_template?: string | null
          status?: 'pending' | 'generated' | 'error' | null
          ai_response?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          contractor_id?: string | null
          lead_id?: string | null
          requested_template?: string | null
          status?: 'pending' | 'generated' | 'error' | null
          ai_response?: string | null
          created_at?: string
        }
      }
      esignatures: {
        Row: {
          id: string
          contract_id: string | null
          signer_name: string | null
          signer_email: string | null
          signature_hash: string | null
          signature_token: string | null
          verification_method: string | null
          blockchain_tx_id: string | null
          signed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          contract_id?: string | null
          signer_name?: string | null
          signer_email?: string | null
          signature_hash?: string | null
          signature_token?: string | null
          verification_method?: string | null
          blockchain_tx_id?: string | null
          signed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          contract_id?: string | null
          signer_name?: string | null
          signer_email?: string | null
          signature_hash?: string | null
          signature_token?: string | null
          verification_method?: string | null
          blockchain_tx_id?: string | null
          signed_at?: string | null
          created_at?: string
        }
      }
      uploads: {
        Row: {
          id: string
          uploaded_by: string | null
          related_to: string | null
          related_id: string | null
          file_url: string | null
          file_type: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          uploaded_by?: string | null
          related_to?: string | null
          related_id?: string | null
          file_url?: string | null
          file_type?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          uploaded_by?: string | null
          related_to?: string | null
          related_id?: string | null
          file_url?: string | null
          file_type?: string | null
          description?: string | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          recipient_id: string | null
          type: 'system' | 'booking' | 'contract' | 'payment' | null
          message: string | null
          action_url: string | null
          read: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          recipient_id?: string | null
          type?: 'system' | 'booking' | 'contract' | 'payment' | null
          message?: string | null
          action_url?: string | null
          read?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          recipient_id?: string | null
          type?: 'system' | 'booking' | 'contract' | 'payment' | null
          message?: string | null
          action_url?: string | null
          read?: boolean | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}