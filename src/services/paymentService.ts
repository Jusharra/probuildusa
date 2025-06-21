import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type StripePayment = Database['public']['Tables']['stripe_payments']['Row'];
type StripePaymentInsert = Database['public']['Tables']['stripe_payments']['Insert'];
type Referral = Database['public']['Tables']['referrals']['Row'];
type ReferralInsert = Database['public']['Tables']['referrals']['Insert'];

export class PaymentService {
  // Get payment history for user
  static async getPaymentHistory(userId: string) {
    const { data, error } = await supabase
      .from('stripe_payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get all payments (admin only)
  static async getAllPayments() {
    const { data, error } = await supabase
      .from('stripe_payments')
      .select(`
        *,
        user_id (
          full_name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get all referrals with related data (admin only)
  static async getAllReferrals() {
    const { data, error } = await supabase
      .from('referrals')
      .select(`
        *,
        lead:lead_id (
          client_name,
          project_type,
          budget,
          zip_code,
          created_at
        ),
        contractor:contractor_id (
          company_name,
          location,
          user_id (
            full_name,
            email
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Record a payment
  static async recordPayment(payment: StripePaymentInsert) {
    const { data, error } = await supabase
      .from('stripe_payments')
      .insert(payment)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get referrals for contractor
  static async getReferrals(contractorId: string) {
    const { data, error } = await supabase
      .from('referrals')
      .select(`
        *,
        lead:lead_id (
          client_name,
          project_type,
          budget
        )
      `)
      .eq('contractor_id', contractorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Create referral record
  static async createReferral(referral: ReferralInsert) {
    const { data, error } = await supabase
      .from('referrals')
      .insert(referral)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update referral
  static async updateReferral(id: string, updates: Partial<Referral>) {
    const { data, error } = await supabase
      .from('referrals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mark lead fee as paid
  static async markLeadFeePaid(referralId: string, invoiceId: string) {
    const { data, error } = await supabase
      .from('referrals')
      .update({
        lead_fee_paid: true,
        invoice_id: invoiceId
      })
      .eq('id', referralId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mark success fee as paid
  static async markSuccessFeePaid(referralId: string, contractValue: number) {
    const { data, error } = await supabase
      .from('referrals')
      .update({
        success_fee_paid: true,
        contract_value: contractValue
      })
      .eq('id', referralId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get pending payouts for contractor
  static async getPendingPayouts(contractorId: string) {
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('contractor_id', contractorId)
      .eq('success_fee_paid', false)
      .not('contract_value', 'is', null);

    if (error) throw error;

    const totalPending = data?.reduce((sum, referral) => {
      const successFee = (referral.contract_value || 0) * (referral.success_fee_rate || 0) / 100;
      return sum + successFee;
    }, 0) || 0;

    return {
      referrals: data,
      totalAmount: totalPending
    };
  }

  // Get payment statistics
  static async getPaymentStats(userId?: string) {
    let query = supabase
      .from('stripe_payments')
      .select('*');

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) throw error;

    const stats = {
      totalRevenue: 0,
      subscriptionRevenue: 0,
      leadFeeRevenue: 0,
      successFeeRevenue: 0,
      totalTransactions: data?.length || 0
    };

    data?.forEach(payment => {
      const amount = payment.amount || 0;
      stats.totalRevenue += amount;

      switch (payment.type) {
        case 'subscription':
          stats.subscriptionRevenue += amount;
          break;
        case 'lead_fee':
          stats.leadFeeRevenue += amount;
          break;
        case 'success_fee':
          stats.successFeeRevenue += amount;
          break;
      }
    });

    return stats;
  }

  // Get referral statistics
  static async getReferralStats() {
    const { data, error } = await supabase
      .from('referrals')
      .select('*');

    if (error) throw error;

    const stats = {
      totalReferrals: data?.length || 0,
      totalLeadFees: data?.reduce((sum, ref) => sum + (ref.lead_fee_amount || 0), 0) || 0,
      totalSuccessFees: data?.reduce((sum, ref) => {
        if (ref.contract_value && ref.success_fee_rate) {
          return sum + (ref.contract_value * ref.success_fee_rate / 100);
        }
        return sum;
      }, 0) || 0,
      paidLeadFees: data?.filter(ref => ref.lead_fee_paid).length || 0,
      paidSuccessFees: data?.filter(ref => ref.success_fee_paid).length || 0,
      pendingLeadFees: data?.filter(ref => !ref.lead_fee_paid).reduce((sum, ref) => sum + (ref.lead_fee_amount || 0), 0) || 0,
      pendingSuccessFees: data?.filter(ref => !ref.success_fee_paid && ref.contract_value && ref.success_fee_rate)
        .reduce((sum, ref) => sum + ((ref.contract_value || 0) * (ref.success_fee_rate || 0) / 100), 0) || 0
    };

    return stats;
  }
}