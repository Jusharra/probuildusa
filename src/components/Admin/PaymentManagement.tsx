import React, { useState, useEffect } from 'react';
import { 
  CreditCard, DollarSign, TrendingUp, Download, Search, Filter,
  Calendar, User, AlertCircle, CheckCircle, XCircle, RefreshCw,
  Wallet, ArrowUpRight, ArrowDownRight, ExternalLink, Settings
} from 'lucide-react';
import { PaymentService } from '../../services/paymentService';

interface Payment {
  id: string;
  user_id: string | null;
  type: string | null;
  amount: number | null;
  currency: string | null;
  stripe_invoice_id: string | null;
  payment_status: string | null;
  created_at: string;
  user_id?: {
    full_name: string | null;
    email: string;
  };
}

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadPaymentData();
  }, []);

  const loadPaymentData = async () => {
    try {
      setLoading(true);
      const [paymentsData, statsData] = await Promise.all([
        PaymentService.getAllPayments(),
        PaymentService.getPaymentStats()
      ]);
      
      setPayments(paymentsData || []);
      setStats(statsData || {});
    } catch (error) {
      console.error('Error loading payment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = !searchTerm || 
      payment.user_id?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.user_id?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.stripe_invoice_id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || payment.payment_status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getPaymentTypeColor = (type: string | null) => {
    switch (type) {
      case 'subscription':
        return 'bg-blue-500/20 text-blue-400';
      case 'lead_fee':
        return 'bg-red-500/20 text-red-400';
      case 'success_fee':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-amber-500/20 text-amber-400';
      case 'failed':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount / 100); // Convert from cents
  };

  const exportPayments = () => {
    const csvContent = [
      ['Date', 'User', 'Email', 'Type', 'Amount', 'Status', 'Invoice ID'].join(','),
      ...filteredPayments.map(payment => [
        new Date(payment.created_at).toLocaleDateString(),
        payment.user_id?.full_name || 'Unknown',
        payment.user_id?.email || 'Unknown',
        payment.type || 'Unknown',
        formatCurrency(payment.amount),
        payment.payment_status || 'Unknown',
        payment.stripe_invoice_id || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-slate-400">Loading payment data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payment Management</h2>
          <p className="text-slate-400">Monitor all platform payments and transactions</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportPayments}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button
            onClick={loadPaymentData}
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
            <DollarSign className="w-6 h-6 text-green-400" />
            <span className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</span>
          </div>
          <div className="text-sm text-slate-400">Total Revenue</div>
          <div className="text-xs text-green-400 mt-1 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            All time
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <CreditCard className="w-6 h-6 text-blue-400" />
            <span className="text-2xl font-bold">{formatCurrency(stats.subscriptionRevenue)}</span>
          </div>
          <div className="text-sm text-slate-400">Subscription Revenue</div>
          <div className="text-xs text-blue-400 mt-1">Monthly recurring</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-amber-400" />
            <span className="text-2xl font-bold">{formatCurrency(stats.leadFeeRevenue + stats.successFeeRevenue)}</span>
          </div>
          <div className="text-sm text-slate-400">Commission Revenue</div>
          <div className="text-xs text-amber-400 mt-1">Lead + Success fees</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <Wallet className="w-6 h-6 text-purple-400" />
            <span className="text-2xl font-bold">{stats.totalTransactions}</span>
          </div>
          <div className="text-sm text-slate-400">Total Transactions</div>
          <div className="text-xs text-purple-400 mt-1">All payments</div>
        </div>
      </div>

      {/* Stripe Connect Section */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center space-x-2">
              <ExternalLink className="w-5 h-5 text-blue-400" />
              <span>Stripe Connect Integration</span>
            </h3>
            <p className="text-slate-300 mb-4">
              Manage contractor payouts, disputes, and fund withdrawals through Stripe Connect.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-2">Automated Payouts</h4>
                <p className="text-slate-400 text-sm">Contractors receive payments directly to their bank accounts</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Dispute Management</h4>
                <p className="text-slate-400 text-sm">Handle chargebacks and payment disputes automatically</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Fund Withdrawals</h4>
                <p className="text-slate-400 text-sm">Withdraw platform funds to your business account</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2">
            <ExternalLink className="w-4 h-4" />
            <span>Open Stripe Dashboard</span>
          </button>
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Configure Payouts</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="subscription">Subscription</option>
              <option value="lead_fee">Lead Fee</option>
              <option value="success_fee">Success Fee</option>
            </select>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold">Date</th>
                <th className="text-left py-4 px-6 font-semibold">User</th>
                <th className="text-left py-4 px-6 font-semibold">Type</th>
                <th className="text-right py-4 px-6 font-semibold">Amount</th>
                <th className="text-center py-4 px-6 font-semibold">Status</th>
                <th className="text-left py-4 px-6 font-semibold">Invoice ID</th>
                <th className="text-center py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-slate-700 hover:bg-slate-800/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{new Date(payment.created_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-white">{payment.user_id?.full_name || 'Unknown'}</div>
                      <div className="text-sm text-slate-400">{payment.user_id?.email || 'Unknown'}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentTypeColor(payment.type)}`}>
                      {payment.type?.replace('_', ' ').toUpperCase() || 'UNKNOWN'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className={`font-bold ${(payment.amount || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatCurrency(payment.amount)}
                    </div>
                    <div className="text-xs text-slate-400">{payment.currency?.toUpperCase() || 'USD'}</div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center justify-center space-x-1 ${getStatusColor(payment.payment_status)}`}>
                      {getStatusIcon(payment.payment_status)}
                      <span>{payment.payment_status?.toUpperCase() || 'UNKNOWN'}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-slate-300 font-mono text-sm">
                      {payment.stripe_invoice_id || 'N/A'}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      {payment.stripe_invoice_id && (
                        <button
                          onClick={() => window.open(`https://dashboard.stripe.com/invoices/${payment.stripe_invoice_id}`, '_blank')}
                          className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                          title="View in Stripe"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400">No payments found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentManagement;