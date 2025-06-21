import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Lead = Database['public']['Tables']['leads']['Row'];
type LeadInsert = Database['public']['Tables']['leads']['Insert'];
type LeadUpdate = Database['public']['Tables']['leads']['Update'];

export class LeadService {
  // Get all leads with optional filters
  static async getLeads(filters?: {
    status?: string;
    project_type?: string;
    assigned_contractor_id?: string;
    budget_min?: number;
    budget_max?: number;
  }) {
    let query = supabase
      .from('leads')
      .select(`
        *,
        contractor:assigned_contractor_id (
          company_name,
          user_id (
            full_name
          )
        ),
        contract:contract_id (
          status,
          file_url
        )
      `);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.project_type) {
      query = query.eq('project_type', filters.project_type);
    }

    if (filters?.assigned_contractor_id) {
      query = query.eq('assigned_contractor_id', filters.assigned_contractor_id);
    }

    if (filters?.budget_min) {
      query = query.gte('budget', filters.budget_min);
    }

    if (filters?.budget_max) {
      query = query.lte('budget', filters.budget_max);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get lead by ID
  static async getLeadById(id: string) {
    const { data, error } = await supabase
      .from('leads')
      .select(`
        *,
        contractor:assigned_contractor_id (
          company_name,
          user_id (
            full_name
          )
        ),
        contract:contract_id (
          status,
          file_url
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Create new lead
  static async createLead(lead: LeadInsert) {
    const { data, error } = await supabase
      .from('leads')
      .insert(lead)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update lead
  static async updateLead(id: string, updates: LeadUpdate) {
    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update lead status
  static async updateLeadStatus(id: string, newStatus: string) {
    return this.updateLead(id, { status: newStatus });
  }

  // Assign lead to contractor
  static async assignLeadToContractor(leadId: string, contractorId: string) {
    const { data, error } = await supabase
      .from('leads')
      .update({ 
        assigned_contractor_id: contractorId,
        status: 'assigned'
      })
      .eq('id', leadId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get leads for specific contractor
  static async getLeadsForContractor(contractorId: string) {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('assigned_contractor_id', contractorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get unassigned leads
  static async getUnassignedLeads() {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .is('assigned_contractor_id', null)
      .eq('status', 'new')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}