import React, { useState, useEffect } from 'react';
import { 
  FileText, Download, Eye, Edit, Send, CheckCircle, XCircle, Clock,
  Search, Filter, RefreshCw, User, Building2, DollarSign, Calendar,
  AlertCircle, Award, ExternalLink, PenTool
} from 'lucide-react';
import { ContractService } from '../../services/contractService';

interface Contract {
  id: string;
  lead_id: string | null;
  contractor_id: string | null;
  file_url: string | null;
  status: 'draft' | 'sent' | 'signed' | 'declined' | null;
  created_by_ai: boolean | null;
  signature_date: string | null;
  created_at: string;
  lead?: {
    client_name: string | null;
    project_type: string | null;
    budget: number | null;
    description: string | null;
  };
  contractor?: {
    company_name: string;
    profiles?: {
      full_name: string | null;
    };
  };
  esignatures?: Array<{
    signer_name: string | null;
    signer_email: string | null;
    signed_at: string | null;
    verification_method: string | null;
  }>;
}

const ContractManagement: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      setLoading(true);
      const contractsData = await ContractService.getContracts();
      setContracts(contractsData || []);
    } catch (error) {
      console.error('Error loading contracts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewContract = async (contract: Contract) => {
    try {
      const fullContract = await ContractService.getContractById(contract.id);
      setSelectedContract(fullContract);
      setShowViewModal(true);
    } catch (error) {
      console.error('Error loading contract details:', error);
    }
  };

  const handleSendContract = async (contractId: string) => {
    try {
      await ContractService.sendContractForSignature(contractId);
      await loadContracts();
    } catch (error) {
      console.error('Error sending contract:', error);
      alert('Failed to send contract. Please try again.');
    }
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = !searchTerm || 
      contract.lead?.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.contractor?.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const exportContracts = () => {
    const csvContent = [
      ['Date', 'Client', 'Contractor', 'Project Type', 'Budget', 'Status', 'AI Generated', 'Signature Date'].join(','),
      ...filteredContracts.map(contract => [
        new Date(contract.created_at).toLocaleDateString(),
        contract.lead?.client_name || 'Unknown',
        contract.contractor?.company_name || 'Unknown',
        contract.lead?.project_type || 'Unknown',
        formatCurrency(contract.lead?.budget),
        contract.status || 'Unknown',
        contract.created_by_ai ? 'Yes' : 'No',
        contract.signature_date ? new Date(contract.signature_date).toLocaleDateString() : 'Not signed'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contracts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
          <p className="text-slate-400">Manage and track all construction contracts</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportContracts}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={loadContracts}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-6 h-6 text-blue-400" />
            <span className="text-2xl font-bold">{contracts.length}</span>
          </div>
          <div className="text-sm text-slate-400">Total Contracts</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-2xl font-bold">
              {contracts.filter(c => c.status === 'signed').length}
            </span>
          </div>
          <div className="text-sm text-slate-400">Signed Contracts</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-6 h-6 text-amber-400" />
            <span className="text-2xl font-bold">
              {contracts.filter(c => c.status === 'sent').length}
            </span>
          </div>
          <div className="text-sm text-slate-400">Pending Signature</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-6 h-6 text-purple-400" />
            <span className="text-2xl font-bold">
              {contracts.filter(c => c.created_by_ai).length}
            </span>
          </div>
          <div className="text-sm text-slate-400">AI Generated</div>
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
            </select>
          </div>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold">Date</th>
                <th className="text-left py-4 px-6 font-semibold">Client</th>
                <th className="text-left py-4 px-6 font-semibold">Contractor</th>
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
                        <span>{contract.lead?.client_name || 'Unknown'}</span>
                      </div>
                      <div className="text-sm text-slate-400">{contract.lead?.project_type}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-white flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span>{contract.contractor?.company_name || 'Unknown'}</span>
                      </div>
                      <div className="text-sm text-slate-400">{contract.contractor?.profiles?.full_name}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-white">{contract.lead?.project_type}</div>
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
                        <button
                          onClick={() => window.open(contract.file_url!, '_blank')}
                          className="p-2 text-slate-400 hover:text-green-400 transition-colors"
                          title="Download Contract"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                      {contract.status === 'draft' && (
                        <button
                          onClick={() => handleSendContract(contract.id)}
                          className="p-2 text-slate-400 hover:text-amber-400 transition-colors"
                          title="Send for Signature"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}
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

      {/* View Modal */}
      {showViewModal && selectedContract && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Contract Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Contract Info */}
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
                      <span className="text-white">{selectedContract.lead?.client_name || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Project:</span>
                      <span className="text-white">{selectedContract.lead?.project_type || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Budget:</span>
                      <span className="text-amber-400 font-semibold">{formatCurrency(selectedContract.lead?.budget)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Contractor:</span>
                      <span className="text-white">{selectedContract.contractor?.company_name || 'Unknown'}</span>
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
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-semibold">Signed</div>
                          <div className="text-xs text-slate-400">
                            {signature.signed_at ? new Date(signature.signed_at).toLocaleDateString() : 'Unknown date'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-4 pt-6 border-t border-slate-700">
                {selectedContract.file_url && (
                  <button
                    onClick={() => window.open(selectedContract.file_url!, '_blank')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Contract</span>
                  </button>
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
    </div>
  );
};

export default ContractManagement;