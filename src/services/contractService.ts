import { supabase } from '../lib/supabase';
import { sha256 } from 'js-sha256';
import type { Database } from '../lib/database.types';
import { LeadService } from './leadService';

type Contract = Database['public']['Tables']['contracts']['Row'];
type ContractInsert = Database['public']['Tables']['contracts']['Insert'];
type ContractUpdate = Database['public']['Tables']['contracts']['Update'];

export class ContractService {
  // Get all contracts with optional filters
  static async getContracts(filters?: {
    status?: 'draft' | 'sent' | 'signed' | 'declined' | 'archived';
    contractor_id?: string;
    lead_id?: string;
  }) {
    let query = supabase
      .from('contracts')
      .select(`
        *,
        lead:lead_id (
          client_name,
          project_type,
          budget,
          description
        ),
        contractor:contractor_id (
          company_name,
          user_id (
            full_name
          )
        )
      `);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.contractor_id) {
      query = query.eq('contractor_id', filters.contractor_id);
    }

    if (filters?.lead_id) {
      query = query.eq('lead_id', filters.lead_id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get contract by ID
  static async getContractById(id: string) {
    const { data, error } = await supabase
      .from('contracts')
      .select(`
        *,
        lead:lead_id (
          client_name,
          project_type,
          budget,
          description
        ),
        contractor:contractor_id (
          company_name,
          user_id (
            full_name
          )
        ),
        esignatures (
          id,
          signer_name,
          signer_email,
          signature_hash,
          verification_method,
          signed_at
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Create new contract
  static async createContract(contract: ContractInsert) {
    const { data, error } = await supabase
      .from('contracts')
      .insert(contract)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update contract
  static async updateContract(id: string, updates: ContractUpdate) {
    const { data, error } = await supabase
      .from('contracts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete contract
  static async deleteContract(id: string) {
    const { error } = await supabase
      .from('contracts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Generate contract using AI
  static async generateContract(leadId: string, contractorId: string, template: string) {
    // First, create an AI request record
    const { data: aiRequest, error: aiError } = await supabase
      .from('contract_ai_requests')
      .insert({
        lead_id: leadId,
        contractor_id: contractorId,
        requested_template: template,
        status: 'pending'
      })
      .select()
      .single();

    if (aiError) throw aiError;

    // In a real implementation, this would call an AI service
    // For now, we'll simulate the AI response
    const mockAIResponse = {
      contract_text: `Construction Agreement for ${template}`,
      terms: 'Standard construction terms and conditions...',
      generated_at: new Date().toISOString()
    };

    // Update the AI request with the response
    await supabase
      .from('contract_ai_requests')
      .update({
        status: 'generated',
        ai_response: JSON.stringify(mockAIResponse)
      })
      .eq('id', aiRequest.id);

    // Create the actual contract
    const contract = await this.createContract({
      lead_id: leadId,
      contractor_id: contractorId,
      status: 'draft',
      created_by_ai: true
    });

    return contract;
  }

  // Send contract for signature
  static async sendContractForSignature(contractId: string) {
    // Get the contract to find the associated lead
    const { data: contract, error: contractError } = await supabase
      .from('contracts')
      .select('lead_id')
      .eq('id', contractId)
      .single();

    if (contractError) throw contractError;

    // Update contract status
    const { data, error } = await supabase
      .from('contracts')
      .update({ status: 'sent' })
      .eq('id', contractId)
      .select()
      .single();

    if (error) throw error;

    // Update lead status to 'quote_sent' if there's an associated lead
    if (contract.lead_id) {
      try {
        await LeadService.updateLeadStatus(contract.lead_id, 'quote_sent');
      } catch (leadError) {
        console.error('Error updating lead status:', leadError);
        // Continue even if lead update fails
      }
    }

    return data;
  }

  // Generate contract content hash
  static async generateContractContentHash(fileUrl: string | null): Promise<string> {
    if (!fileUrl) {
      throw new Error('No file URL provided for hashing');
    }

    try {
      // In a real implementation, we would fetch the file content and hash it
      // For this example, we'll use the file URL as the basis for the hash
      // This is a simplified approach for demonstration purposes
      return sha256(fileUrl);
    } catch (error) {
      console.error('Error generating contract hash:', error);
      throw new Error('Failed to generate contract hash');
    }
  }

  // Generate signature hash
  static generateSignatureHash(
    contractHash: string,
    signerEmail: string,
    timestamp: string
  ): string {
    // Combine the contract hash, signer email, and timestamp
    const combinedString = `${contractHash}:${signerEmail}:${timestamp}`;
    
    // Hash the combined string
    return sha256(combinedString);
  }

  // Mark contract as signed
  static async markContractSigned(contractId: string, signatureData: {
    signer_name: string;
    signer_email: string;
    signature_hash?: string;
    signature_token?: string;
    verification_method?: string;
  }) {
    // Get the contract to hash its content and find the associated lead
    const { data: contract, error: contractFetchError } = await supabase
      .from('contracts')
      .select('file_url, lead_id')
      .eq('id', contractId)
      .single();

    if (contractFetchError) throw contractFetchError;
    
    // Generate the contract content hash
    const contractHash = await this.generateContractContentHash(contract.file_url);
    
    // Generate timestamp for the signature
    const timestamp = new Date().toISOString();
    
    // Generate the signature hash
    const signatureHash = this.generateSignatureHash(
      contractHash,
      signatureData.signer_email,
      timestamp
    );

    // Update contract status
    const { data: updatedContract, error: contractError } = await supabase
      .from('contracts')
      .update({ 
        status: 'signed',
        signature_date: new Date().toISOString().split('T')[0]
      })
      .eq('id', contractId)
      .select()
      .single();

    if (contractError) throw contractError;

    // Create signature record with the generated hash
    const { data: signature, error: signatureError } = await supabase
      .from('esignatures')
      .insert({
        contract_id: contractId,
        signer_name: signatureData.signer_name,
        signer_email: signatureData.signer_email,
        signature_hash: signatureHash,
        signature_token: signatureData.signature_token,
        verification_method: signatureData.verification_method || 'custom',
        signed_at: timestamp
      })
      .select()
      .single();

    if (signatureError) throw signatureError;

    // Update lead status to 'quote_accepted' if there's an associated lead
    if (contract.lead_id) {
      try {
        await LeadService.updateLeadStatus(contract.lead_id, 'quote_accepted');
      } catch (leadError) {
        console.error('Error updating lead status:', leadError);
        // Continue even if lead update fails
      }
    }

    return { contract: updatedContract, signature };
  }

  // Verify contract signature
  static async verifyContractSignature(contractId: string, signatureId: string): Promise<boolean> {
    try {
      // Get the contract and signature
      const [contractResult, signatureResult] = await Promise.all([
        supabase
          .from('contracts')
          .select('file_url')
          .eq('id', contractId)
          .single(),
        supabase
          .from('esignatures')
          .select('signature_hash, signer_email, signed_at')
          .eq('id', signatureId)
          .eq('contract_id', contractId)
          .single()
      ]);

      if (contractResult.error) throw contractResult.error;
      if (signatureResult.error) throw signatureResult.error;

      const contract = contractResult.data;
      const signature = signatureResult.data;

      if (!contract || !signature) {
        return false;
      }

      // Generate the contract hash
      const contractHash = await this.generateContractContentHash(contract.file_url);
      
      // Generate the expected signature hash
      const expectedSignatureHash = this.generateSignatureHash(
        contractHash,
        signature.signer_email,
        signature.signed_at
      );

      // Compare the stored hash with the expected hash
      return signature.signature_hash === expectedSignatureHash;
    } catch (error) {
      console.error('Error verifying contract signature:', error);
      return false;
    }
  }

  // Mark contract as declined
  static async markContractDeclined(contractId: string) {
    // Get the contract to find the associated lead
    const { data: contract, error: contractFetchError } = await supabase
      .from('contracts')
      .select('lead_id')
      .eq('id', contractId)
      .single();

    if (contractFetchError) throw contractFetchError;

    // Update contract status
    const { data, error } = await supabase
      .from('contracts')
      .update({ status: 'declined' })
      .eq('id', contractId)
      .select()
      .single();

    if (error) throw error;

    // Update lead status if there's an associated lead
    if (contract.lead_id) {
      try {
        await LeadService.updateLeadStatus(contract.lead_id, 'quote_declined');
      } catch (leadError) {
        console.error('Error updating lead status:', leadError);
        // Continue even if lead update fails
      }
    }

    return data;
  }

  // Archive contract
  static async archiveContract(contractId: string) {
    const { data, error } = await supabase
      .from('contracts')
      .update({ status: 'archived' })
      .eq('id', contractId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Duplicate contract for revision
  static async duplicateContract(contractId: string): Promise<Contract> {
    // Get the original contract
    const { data: originalContract, error: fetchError } = await supabase
      .from('contracts')
      .select('*')
      .eq('id', contractId)
      .single();

    if (fetchError) throw fetchError;

    // Create a new contract based on the original
    const newContract: ContractInsert = {
      lead_id: originalContract.lead_id,
      contractor_id: originalContract.contractor_id,
      file_url: originalContract.file_url, // Copy the same file initially
      status: 'draft', // Always start as draft
      created_by_ai: originalContract.created_by_ai,
      // Don't copy signature_date
    };

    const { data: duplicatedContract, error: insertError } = await supabase
      .from('contracts')
      .insert(newContract)
      .select()
      .single();

    if (insertError) throw insertError;
    return duplicatedContract;
  }
}