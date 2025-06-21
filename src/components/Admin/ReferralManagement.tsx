import React, { useState, useEffect } from 'react';
import { 
  Target, DollarSign, TrendingUp, CheckCircle, XCircle, Clock,
  Search, Filter, Edit, Eye, RefreshCw, Download, AlertCircle,
  User, Building2, MapPin, Calendar, Award, Wallet
} from 'lucide-react';
import { PaymentService } from '../../services/paymentService';

interface Referral {
  id: string;
  lead_id: string | null;
  contractor_id: string | null;
  lead_fee_amount: number | null;
  lead_fee_paid: boolean | null;
  contract_value: number | null;
  success_fee_rate: number | null;
  success_fee_paid: boolean | null;
  invoice_id: string | null;
  created_at: string;
  lead?: {
    client_name: string | null;
    project_type: string | null;
    budget: number | null;
    zip_code: string | null;
    created_at: string;
  };
  contractor?: {
    company_name: string;
    location: string | null;
    profiles?: {
      full_name: string | null;
      email: string;
    };
  };
}

const ReferralManagement: React.FC = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [editData, setEditData] = useState<any>({});

  useEffect(() => {
    loadReferralData();
  }, []);

  const loadReferralData = async () => {
    try {
      setLoading(true);
      const [referralsData, statsData] = await Promise.all([
        PaymentService.getAllReferrals(),
        PaymentService.getReferralStats()
      ]);
      
      setReferrals(referralsData || []);
      setStats(statsData || {});
    } catch (error) {
      console.error('Error loading referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditReferral = (referral: Referral) => {
    setSelectedReferral(referral);
    setEditData({
      lead_fee_amount: referral.lead_fee_amount || 0,
      lead_fee_paid: referral.lead_fee_paid || false,
      contract_value: referral.contract_value || 0,
      success_fee_rate: referral.success_fee_rate || 8.5,
      success_fee_paid: referral.success_fee_paid || false
    });
    setShowEditModal(true);
  };

  const handleUpdateReferral = async () => {
    if (!selectedReferral) return;

    try {
      await PaymentService.updateReferral(selectedReferral.id, editData);
      await loadReferralData();
      setShowEditModal(false);
      setSelectedReferral(null);
    } catch (error) {
      console.error('Error updating referral:', error);
      alert('Failed to update referral. Please try again.');
    }
  };

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = !searchTerm || 
      referral.contractor?.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.lead?.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.lead?.project_type?.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter === 'lead_fee_pending') {
      matchesStatus = !referral.lead_fee_paid;
    } else if (statusFilter === 'lead_fee_paid') {
      matchesStatus = !!referral.lead_fee_paid;
    } else if (statusFilter === 'success_fee_pending') {
      matchesStatus = !referral.success_fee_paid && !!referral.contract_value;
    } else if (statusFilter === 'success_fee_paid') {
      matchesStatus = !!referral.success_fee_paid;
    }
    
    return matchesSearch && matchesStatus;
  });

  const calculateSuccessFee = (contractValue: number | null, rate: number | null) => {
    if (!contractValue || !rate) return 0;
    return contractValue * rate / 100;
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const exportReferrals = () => {
    const csvContent = [
      ['Date', 'Contractor', 'Client', 'Project Type', 'Lead Fee', 'Lead Fee Paid', 'Contract Value', 'Success Fee Rate', 'Success Fee Amount', 'Success Fee Paid'].join(','),
      ...filteredReferrals.map(referral => [
        new Date(referral.created_at).toLocaleDateString(),
        referral.contractor?.company_name || 'Unknown',
        referral.lead?.client_name || 'Unknown',
        referral.lead?.project_type || 'Unknown',
        formatCurrency(referral.lead_fee_amount),
        referral.lead_fee_paid ? 'Yes' : 'No',
        formatCurrency(referral.contract_value),
        `${referral.success_fee_rate || 0}%`,
        formatCurrency(calculateSuccessFee(referral.contract_value, referral.success_fee_rate)),
        referral.success_fee_paid ? 'Yes' : 'No'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `referrals-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-slate-400">Loading referral data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Referral Management</h2>
          <p className="text-slate-400">Track lead fees and success fees from contractor referrals</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportReferrals}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={loadReferralData}
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
            <Target className="w-6 h-6 text-blue-400" />
            <span className="text-2xl font-bold">{stats.totalReferrals}</span>
          </div>
          <div className="text-sm text-slate-400">Total Referrals</div>
          <div className="text-xs text-blue-400 mt-1">All time</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-6 h-6 text-amber-400" />
            <span className="text-2xl font-bold">{formatCurrency(stats.totalLeadFees)}</span>
          </div>
          <div className="text-sm text-slate-400">Total Lead Fees</div>
          <div className="text-xs text-green-400 mt-1">{stats.paidLeadFees} paid</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <span className="text-2xl font-bold">{formatCurrency(stats.totalSuccessFees)}</span>
          </div>
          <div className="text-sm text-slate-400">Total Success Fees</div>
          <div className="text-xs text-green-400 mt-1">{stats.paidSuccessFees} paid</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <Wallet className="w-6 h-6 text-purple-400" />
            <span className="text-2xl font-bold">{formatCurrency(stats.pendingLeadFees + stats.pendingSuccessFees)}</span>
          </div>
          <div className="text-sm text-slate-400">Pending Fees</div>
          <div className="text-xs text-amber-400 mt-1">Awaiting payment</div>
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
                placeholder="Search referrals..."
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
              <option value="all">All Referrals</option>
              <option value="lead_fee_pending">Lead Fee Pending</option>
              <option value="lead_fee_paid">Lead Fee Paid</option>
              <option value="success_fee_pending">Success Fee Pending</option>
              <option value="success_fee_paid">Success Fee Paid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold">Date</th>
                <th className="text-left py-4 px-6 font-semibold">Contractor</th>
                <th className="text-left py-4 px-6 font-semibold">Lead Details</th>
                <th className="text-right py-4 px-6 font-semibold">Lead Fee</th>
                <th className="text-right py-4 px-6 font-semibold">Success Fee</th>
                <th className="text-center py-4 px-6 font-semibold">Status</th>
                <th className="text-center py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReferrals.map((referral) => (
                <tr key={referral.id} className="border-b border-slate-700 hover:bg-slate-800/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{new Date(referral.created_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-white flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span>{referral.contractor?.company_name || 'Unknown'}</span>
                      </div>
                      <div className="text-sm text-slate-400">{referral.contractor?.profiles?.full_name}</div>
                      <div className="text-sm text-slate-400 flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{referral.contractor?.location || 'Unknown'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-white">{referral.lead?.client_name || 'Unknown'}</div>
                      <div className="text-sm text-slate-400">{referral.lead?.project_type}</div>
                      <div className="text-sm text-amber-400">
                        Budget: {formatCurrency(referral.lead?.budget)}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="font-bold text-amber-400">
                      {formatCurrency(referral.lead_fee_amount)}
                    </div>
                    <div className={`text-xs flex items-center justify-end space-x-1 ${
                      referral.lead_fee_paid ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {referral.lead_fee_paid ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      <span>{referral.lead_fee_paid ? 'Paid' : 'Pending'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="font-bold text-green-400">
                      {formatCurrency(calculateSuccessFee(referral.contract_value, referral.success_fee_rate))}
                    </div>
                    <div className="text-xs text-slate-400">
                      {referral.success_fee_rate}% of {formatCurrency(referral.contract_value)}
                    </div>
                    <div className={`text-xs flex items-center justify-end space-x-1 ${
                      referral.success_fee_paid ? 'text-green-400' : 'text-amber-400'
                    }`}>
                      {referral.success_fee_paid ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      <span>{referral.success_fee_paid ? 'Paid' : 'Pending'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="space-y-1">
                      {referral.lead_fee_paid && referral.success_fee_paid ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold">
                          Complete
                        </span>
                      ) : referral.lead_fee_paid ? (
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs font-semibold">
                          Partial
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold">
                          Pending
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEditReferral(referral)}
                        className="p-2 text-slate-400 hover:text-amber-400 transition-colors"
                        title="Edit Referral"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReferrals.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400">No referrals found</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedReferral && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Edit Referral</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Lead Fee Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editData.lead_fee_amount}
                    onChange={(e) => setEditData({...editData, lead_fee_amount: parseFloat(e.target.value) || 0})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Lead Fee Status
                  </label>
                  <select
                    value={editData.lead_fee_paid ? 'paid' : 'pending'}
                    onChange={(e) => setEditData({...editData, lead_fee_paid: e.target.value === 'paid'})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Contract Value
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editData.contract_value}
                    onChange={(e) => setEditData({...editData, contract_value: parseFloat(e.target.value) || 0})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Success Fee Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editData.success_fee_rate}
                    onChange={(e) => setEditData({...editData, success_fee_rate: parseFloat(e.target.value) || 0})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Success Fee Status
                </label>
                <select
                  value={editData.success_fee_paid ? 'paid' : 'pending'}
                  onChange={(e) => setEditData({...editData, success_fee_paid: e.target.value === 'paid'})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-2">Calculated Success Fee</h4>
                <div className="text-2xl font-bold text-green-400">
                  {formatCurrency(calculateSuccessFee(editData.contract_value, editData.success_fee_rate))}
                </div>
              </div>

              <div className="flex space-x-4 pt-6 border-t border-slate-700">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateReferral}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Update Referral
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralManagement;