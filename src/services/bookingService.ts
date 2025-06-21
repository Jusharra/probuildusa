import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Booking = Database['public']['Tables']['bookings']['Row'];
type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
type BookingUpdate = Database['public']['Tables']['bookings']['Update'];

export class BookingService {
  // Get all bookings with optional filters
  static async getBookings(filters?: {
    status?: 'pending' | 'confirmed' | 'completed' | 'canceled';
    booking_type?: 'consultation' | 'inspection' | 'project_start';
    contractor_id?: string;
    lead_id?: string;
  }) {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        lead:lead_id (
          client_name,
          project_type,
          phone,
          email,
          zip_code
        ),
        contractor:contractor_id (
          company_name,
          profiles:user_id (
            full_name
          )
        )
      `);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.booking_type) {
      query = query.eq('booking_type', filters.booking_type);
    }

    if (filters?.contractor_id) {
      query = query.eq('contractor_id', filters.contractor_id);
    }

    if (filters?.lead_id) {
      query = query.eq('lead_id', filters.lead_id);
    }

    const { data, error } = await query.order('scheduled_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  // Get booking by ID
  static async getBookingById(id: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        lead:lead_id (
          client_name,
          project_type,
          phone,
          email,
          zip_code,
          description
        ),
        contractor:contractor_id (
          company_name,
          profiles:user_id (
            full_name
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Create new booking
  static async createBooking(booking: BookingInsert) {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update booking
  static async updateBooking(id: string, updates: BookingUpdate) {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete booking
  static async deleteBooking(id: string) {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Get bookings for specific contractor
  static async getBookingsForContractor(contractorId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        lead:lead_id (
          client_name,
          project_type,
          phone,
          email,
          zip_code
        )
      `)
      .eq('contractor_id', contractorId)
      .order('scheduled_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  // Get upcoming bookings for contractor
  static async getUpcomingBookings(contractorId: string) {
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        lead:lead_id (
          client_name,
          project_type,
          phone,
          email
        )
      `)
      .eq('contractor_id', contractorId)
      .gte('scheduled_at', now)
      .in('status', ['pending', 'confirmed'])
      .order('scheduled_at', { ascending: true })
      .limit(5);

    if (error) throw error;
    return data;
  }

  // Confirm booking
  static async confirmBooking(id: string) {
    return this.updateBooking(id, { status: 'confirmed' });
  }

  // Cancel booking
  static async cancelBooking(id: string, reason?: string) {
    const updates: BookingUpdate = { status: 'canceled' };
    if (reason) {
      updates.notes = reason;
    }
    return this.updateBooking(id, updates);
  }

  // Complete booking
  static async completeBooking(id: string, notes?: string) {
    const updates: BookingUpdate = { status: 'completed' };
    if (notes) {
      updates.notes = notes;
    }
    return this.updateBooking(id, updates);
  }

  // Reschedule booking
  static async rescheduleBooking(id: string, newDateTime: string, notes?: string) {
    const updates: BookingUpdate = { 
      scheduled_at: newDateTime,
      status: 'pending'
    };
    if (notes) {
      updates.notes = notes;
    }
    return this.updateBooking(id, updates);
  }

  // Get booking statistics for contractor
  static async getBookingStats(contractorId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('status, booking_type')
      .eq('contractor_id', contractorId);

    if (error) throw error;

    const stats = {
      total: data?.length || 0,
      pending: data?.filter(b => b.status === 'pending').length || 0,
      confirmed: data?.filter(b => b.status === 'confirmed').length || 0,
      completed: data?.filter(b => b.status === 'completed').length || 0,
      canceled: data?.filter(b => b.status === 'canceled').length || 0,
      consultations: data?.filter(b => b.booking_type === 'consultation').length || 0,
      inspections: data?.filter(b => b.booking_type === 'inspection').length || 0,
      projectStarts: data?.filter(b => b.booking_type === 'project_start').length || 0
    };

    return stats;
  }
}