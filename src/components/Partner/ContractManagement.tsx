import React, { useState, useEffect } from 'react';
import { 
  FileText, Plus, Edit, Trash2, Eye, Send, Download, Upload,
  Search, Filter, Calendar, User, Building2, DollarSign,
  CheckCircle, XCircle, Clock, AlertCircle, Save, X,
  PenTool, Award, ExternalLink, RefreshCw, Archive, Copy
} from 'lucide-react';
import { ContractService } from '../../services/contractService';
import { LeadService } from '../../services/leadService';
import FileUpload from '../FileUpload';
import SignContractModal from './SignContractModal';
import ContractWizardModal from './ContractWizardModal';

interface Contract {
  id: string;
  lead_id: string | null;
  contractor_id: string | null;
  file_url: string | null;
  status: 'draft' | 'sent' | 'signed' | 'declined' | 'archived' | null;
  created_by_ai: boolean | null;
  signature_date: string | null;
  created_at: string;
  lead?: {
    client_name: string | null;
    project_type: string | null;
    budget: number | null;
    description: string | null;
  };
  esignatures?: Array<{
    id: string;
    signer_name: string | null;
    signer_email: string | null;
    signature_hash: string | null;
    verification_method: string | null;
    signed_at: string | null;
  }>;
}

interface Lead {
  id: string;
  client_name: string | null;
  project_type: string | null;
  budget: number | null;
  status: string | null;
  description?: string | null;
}

interface ContractManagementProps {
  contractorId: string;
}

const ContractManagement: React.FC<ContractManagementProps> = ({ contractorId }) => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [showWizardModal, setShowWizardModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [signatureVerifications, setSignatureVerifications] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    loadData();
  }, [contractorId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [contractsData, leadsData] = await Promise.all([
        ContractService.getContracts({ contractor_id: contractorId }),
        LeadService.getLeadsForContractor(contractorId)
      ]);
      
      setContracts(contractsData || []);
      setLeads(leadsData || []);
    } catch (error) {
      console.error('Error loading contract data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContract = () => {
    setShowWizardModal(true);
  };

  const handleEditContract = (contract: Contract) => {
    setSelectedContract(contract);
    setFormData({
      lead_id: contract.lead_id || '',
      status: contract.status || 'draft',
      created_by_ai: contract.created_by_ai || false,
      file_url: contract.file_url || ''
    });
    setShowEditModal(true);
  };

  const handleViewContract = async (contract: Contract) => {
    try {
      // Get full contract details including signatures
      const fullContract = await ContractService.getContractById(contract.id);
      setSelectedContract(fullContract);
      
      // Verify signatures if they exist
      if (fullContract.esignatures && fullContract.esignatures.length > 0) {
        const verifications: {[key: string]: boolean} = {};
        
        for (const signature of fullContract.esignatures) {
          if (signature.id && signature.signature_hash) {
            const isVerified = await ContractService.verifyContractSignature(
              fullContract.id,
              signature.id
            );
            verifications[signature.id] = isVerified;
          }
        }
        
        setSignatureVerifications(verifications);
      }
      
      setShowViewModal(true);
    } catch (error) {
      console.error('Error loading contract details:', error);
      alert('Failed to load contract details. Please try again.');
    }
  };

  const handleDeleteContract = async (contractId: string) => {
    if (!confirm('Are you sure you want to delete this contract? This action cannot be undone.')) {
      return;
    }

    try {
      await ContractService.deleteContract(contractId);
      await loadData();
    } catch (error) {
      console.error('Error deleting contract:', error);
      alert('Failed to delete contract. Please try again.');
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const contractData = {
        ...formData,
        contractor_id: contractorId,
        lead_id: formData.lead_id || null
      };

      if (selectedContract) {
        await ContractService.updateContract(selectedContract.id, contractData);
      } else {
        await ContractService.createContract(contractData);
      }
      
      await loadData();
      setShowCreateModal(false);
      setShowEditModal(false);
      setSelectedContract(null);
      setFormData({});
    } catch (error) {
      console.error('Error saving contract:', error);
      alert('Failed to save contract. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendContract = async (contractId: string) => {
    try {
      await ContractService.sendContractForSignature(contractId);
      await loadData();
    } catch (error) {
      console.error('Error sending contract:', error);
      alert('Failed to send contract. Please try again.');
    }
  };

  const handleSignContract = (contract: Contract) => {
    setSelectedContract(contract);
    setShowSignModal(true);
  };

  const handleDeclineContract = async (contractId: string) => {
    if (!confirm('Are you sure you want to decline this contract?')) {
      return;
    }

    try {
      await ContractService.markContractDeclined(contractId);
      await loadData();
    } catch (error) {
      console.error('Error declining contract:', error);
      alert('Failed to decline contract. Please try again.');
    }
  };

  const handleArchiveContract = async (contractId: string) => {
    if (!confirm('Are you sure you want to archive this contract?')) {
      return;
    }

    try {
      await ContractService.archiveContract(contractId);
      await loadData();
    } catch (error) {
      console.error('Error archiving contract:', error);
      alert('Failed to archive contract. Please try again.');
    }
  };

  const handleDuplicateContract = async (contractId: string) => {
    try {
      await ContractService.duplicateContract(contractId);
      await loadData();
    } catch (error) {
      console.error('Error duplicating contract:', error);
      alert('Failed to duplicate contract. Please try again.');
    }
  };

  const handleGenerateAIContract = async (leadId: string) => {
    try {
      await ContractService.generateContract(leadId, contractorId, 'construction_agreement');
      await loadData();
    } catch (error) {
      console.error('Error generating AI contract:', error);
      alert('Failed to generate contract. Please try again.');
    }
  };

  const handleUploadSuccess = (upload: any) => {
    setFormData({ ...formData, file_url: upload.file_url });
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = !searchTerm || 
      contract.lead?.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.lead?.project_type?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'draft':
        return 'bg-slate-500/20 text-slate-400';
      case 'sent':
        return 'bg-blue-500/20 text-blue-400';
      case 'signed':
        return 'bg-green-500/20 text-green-400';
      case 'declined':
        return 'bg-red-500/20 text-red-400';
      case 'archived':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'draft':
        return <Edit className="w-4 h-4" />;
      case 'sent':
        return <Send className="w-4 h-4" />;
      case 'signed':
        return <CheckCircle className="w-4 h-4" />;
      case 'declined':
        return <XCircle className="w-4 h-4" />;
      case 'archived':
        return <Archive className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'Not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const ContractForm = () => (
    <form onSubmit={handleSubmitForm} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Associated Lead
        </label>
        <select
          value={formData.lead_id}
          onChange={(e) => setFormData({ ...formData, lead_id: e.target.value })}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        >
          <option value="">Select a lead (optional)</option>
          {leads.map((lead) => (
            <option key={lead.id} value={lead.id}>
              {lead.client_name} - {lead.project_type} ({formatCurrency(lead.budget)})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Contract Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          required
        >
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="signed">Signed</option>
          <option value="declined">Declined</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Contract Document
        </label>
        <FileUpload
          relatedTo="contract"
          relatedId={selectedContract?.id || 'temp'}
          onUploadSuccess={handleUploadSuccess}
          maxFiles={1}
          allowedFileTypes={['application/pdf', '.doc', '.docx']}
          maxSizeMB={10}
          label="Upload Contract Document"
          description="Upload the contract PDF or document"
          bucketName="contracts"
        />
        {formData.file_url && (
          <div className="mt-2 p-2 bg-slate-700/50 rounded-lg">
            <a
              href={formData.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 text-sm flex items-center space-x-1"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Current Document</span>
            </a>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="created_by_ai"
          checked={formData.created_by_ai}
          onChange={(e) => setFormData({ ...formData, created_by_ai: e.target.checked })}
          className="w-4 h-4 text-amber-400 bg-slate-700 border-slate-600 rounded focus:ring-amber-400"
        />
        <label htmlFor="created_by_ai" className="text-slate-300 font-medium">
          AI Generated Contract
        </label>
      </div>

      <div className="flex space-x-4 pt-6 border-t border-slate-700">
        <button
          type="button"
          onClick={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
            setSelectedContract(null);
            setFormData({});
          }}
          className="flex-1 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-600 disabled:to-slate-600 text-slate-900 disabled:text-slate-400 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{selectedContract ? 'Update' : 'Create'} Contract</span>
            </>
          )}
        </button>
      </div>
    </form>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-slate-400">Loading contracts...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Contract Management</h2>
          <p className="text-slate-400">Create, manage, and track your client contracts</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={loadData}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleCreateContract}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Contract</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-6 h-6 text-blue-400" />
            <span className="text-2xl font-bold">{contracts.length}</span>
          </div>
          <div className="text-sm text-slate-400">Total Contracts</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <Edit className="w-6 h-6 text-slate-400" />
            <span className="text-2xl font-bold">
              {contracts.filter(c => c.status === 'draft').length}
            </span>
          </div>
          <div className="text-sm text-slate-400">Draft</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <Send className="w-6 h-6 text-blue-400" />
            <span className="text-2xl font-bold">
              {contracts.filter(c => c.status === 'sent').length}
            </span>
          </div>
          <div className="text-sm text-slate-400">Sent</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-2xl font-bold">
              {contracts.filter(c => c.status === 'signed').length}
            </span>
          </div>
          <div className="text-sm text-slate-400">Signed</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <Archive className="w-6 h-6 text-purple-400" />
            <span className="text-2xl font-bold">
              {contracts.filter(c => c.status === 'archived').length}
            </span>
          </div>
          <div className="text-sm text-slate-400">Archived</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="signed">Signed</option>
              <option value="declined">Declined</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Contract Generation */}
      {leads.filter(l => l.status === 'accepted').length > 0 && (
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20">
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">AI Contract Generation</h3>
              <p className="text-slate-300 mb-4">
                Generate professional contracts instantly using our AI. Select a lead to create a customized contract.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leads.filter(l => l.status === 'accepted').map((lead) => (
                  <div key={lead.id} className="bg-slate-800/50 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white">{lead.client_name}</div>
                      <div className="text-sm text-slate-400">{lead.project_type}</div>
                    </div>
                    <button
                      onClick={() => handleGenerateAIContract(lead.id)}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center space-x-1"
                    >
                      <PenTool className="w-3 h-3" />
                      <span>Generate</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contracts Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold">Date</th>
                <th className="text-left py-4 px-6 font-semibold">Client</th>
                <th className="text-left py-4 px-6 font-semibold">Project</th>
                <th className="text-center py-4 px-6 font-semibold">Status</th>
                <th className="text-center py-4 px-6 font-semibold">Type</th>
                <th className="text-center py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="border-b border-slate-700 hover:bg-slate-800/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{new Date(contract.created_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-white flex items-center space-x-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span>{contract.lead?.client_name || 'No Client'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-white">{contract.lead?.project_type || 'No Project'}</div>
                      <div className="text-sm text-amber-400 flex items-center space-x-1">
                        <DollarSign className="w-3 h-3" />
                        <span>{formatCurrency(contract.lead?.budget)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center justify-center space-x-1 ${getStatusColor(contract.status)}`}>
                      {getStatusIcon(contract.status)}
                      <span>{contract.status?.charAt(0).toUpperCase() + contract.status?.slice(1)}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {contract.created_by_ai ? (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-semibold flex items-center justify-center space-x-1">
                        <Award className="w-3 h-3" />
                        <span>AI</span>
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-slate-500/20 text-slate-400 rounded text-xs font-semibold flex items-center justify-center space-x-1">
                        <PenTool className="w-3 h-3" />
                        <span>Manual</span>
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleViewContract(contract)}
                        className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                        title="View Contract"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {contract.file_url && (
                        <a
                          href={contract.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-400 hover:text-green-400 transition-colors"
                          title="Download Contract"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                      {contract.status === 'draft' && (
                        <>
                          <button
                            onClick={() => handleEditContract(contract)}
                            className="p-2 text-slate-400 hover:text-amber-400 transition-colors"
                            title="Edit Contract"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleSendContract(contract.id)}
                            className="p-2 text-slate-400 hover:text-amber-400 transition-colors"
                            title="Send for Signature"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {contract.status === 'sent' && (
                        <>
                          <button
                            onClick={() => handleSignContract(contract)}
                            className="p-2 text-slate-400 hover:text-green-400 transition-colors"
                            title="Sign Contract"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeclineContract(contract.id)}
                            className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                            title="Decline Contract"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {(contract.status === 'signed' || contract.status === 'declined') && (
                        <>
                          <button
                            onClick={() => handleArchiveContract(contract.id)}
                            className="p-2 text-slate-400 hover:text-purple-400 transition-colors"
                            title="Archive Contract"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDuplicateContract(contract.id)}
                            className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                            title="Duplicate & Revise"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteContract(contract.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete Contract"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredContracts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400">No contracts found</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Create New Contract</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <ContractForm />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedContract && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Edit Contract</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <ContractForm />
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedContract && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Contract Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-3">Contract Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(selectedContract.status)}`}>
                        {selectedContract.status?.charAt(0).toUpperCase() + selectedContract.status?.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Created:</span>
                      <span className="text-white">{new Date(selectedContract.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Type:</span>
                      <span className="text-white">{selectedContract.created_by_ai ? 'AI Generated' : 'Manual'}</span>
                    </div>
                    {selectedContract.signature_date && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Signed:</span>
                        <span className="text-green-400">{new Date(selectedContract.signature_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-3">Project Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Client:</span>
                      <span className="text-white">{selectedContract.lead?.client_name || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Project:</span>
                      <span className="text-white">{selectedContract.lead?.project_type || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Budget:</span>
                      <span className="text-amber-400 font-semibold">{formatCurrency(selectedContract.lead?.budget)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              {selectedContract.lead?.description && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-3">Project Description</h4>
                  <p className="text-slate-300 leading-relaxed">{selectedContract.lead.description}</p>
                </div>
              )}

              {/* E-Signatures */}
              {selectedContract.esignatures && selectedContract.esignatures.length > 0 && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-3">Electronic Signatures</h4>
                  <div className="space-y-3">
                    {selectedContract.esignatures.map((signature, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <div>
                          <div className="font-semibold text-white">{signature.signer_name}</div>
                          <div className="text-sm text-slate-400">{signature.signer_email}</div>
                          <div className="text-xs text-slate-500">
                            {signature.verification_method} • {signature.signed_at ? new Date(signature.signed_at).toLocaleDateString() : 'Unknown date'}
                          </div>
                        </div>
                        <div className="text-right">
                          {signature.id && signatureVerifications[signature.id] !== undefined && (
                            <div className={`px-2 py-1 rounded text-xs font-semibold ${
                              signatureVerifications[signature.id] 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {signatureVerifications[signature.id] ? 'Verified ✓' : 'Unverified ✗'}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-700">
                {selectedContract.file_url && (
                  <a
                    href={selectedContract.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Contract</span>
                  </a>
                )}
                
                {selectedContract.status === 'draft' && (
                  <button
                    onClick={() => {
                      handleSendContract(selectedContract.id);
                      setShowViewModal(false);
                    }}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send for Signature</span>
                  </button>
                )}
                
                {selectedContract.status === 'sent' && (
                  <>
                    <button
                      onClick={() => {
                        setShowViewModal(false);
                        handleSignContract(selectedContract);
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Sign Contract</span>
                    </button>
                    <button
                      onClick={() => {
                        handleDeclineContract(selectedContract.id);
                        setShowViewModal(false);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Decline</span>
                    </button>
                  </>
                )}
                
                {(selectedContract.status === 'signed' || selectedContract.status === 'declined') && (
                  <>
                    <button
                      onClick={() => {
                        handleArchiveContract(selectedContract.id);
                        setShowViewModal(false);
                      }}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Archive className="w-4 h-4" />
                      <span>Archive</span>
                    </button>
                    <button
                      onClick={() => {
                        handleDuplicateContract(selectedContract.id);
                        setShowViewModal(false);
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Duplicate & Revise</span>
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => setShowViewModal(false)}
                  className="flex-1 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign Modal */}
      {showSignModal && selectedContract && (
        <SignContractModal
          contractId={selectedContract.id}
          contractFileUrl={selectedContract.file_url}
          onClose={() => setShowSignModal(false)}
          onSuccess={() => {
            setShowSignModal(false);
            loadData();
          }}
        />
      )}

      {/* Contract Wizard Modal */}
      {showWizardModal && (
        <ContractWizardModal
          contractorId={contractorId}
          leads={leads}
          onClose={() => setShowWizardModal(false)}
          onSuccess={() => {
            setShowWizardModal(false);
            loadData();
          }}
        />
      )}
    </div>
  );
};

export default ContractManagement;