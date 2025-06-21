import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, DollarSign, FileText, TrendingUp, 
  Calendar, Award, AlertCircle, Eye, Edit, Trash2,
  Plus, Search, Filter, CheckCircle, XCircle, Star,
  Building2, CreditCard, MessageSquare, Settings, Target
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LeadService } from '../services/leadService';
import { ContractorService } from '../services/contractorService';
import { PaymentService } from '../services/paymentService';
import ContractorManagement from '../components/Admin/ContractorManagement';
import LeadManagement from '../components/Admin/LeadManagement';
import PaymentManagement from '../components/Admin/PaymentManagement';
import ReferralManagement from '../components/Admin/ReferralManagement';
import ContractManagement from '../components/Admin/ContractManagement';

const AdminPortal: React.FC = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<any>({});
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [recentContractors, setRecentContractors] = useState<any[]>([]);

  useEffect(() => {
    if (user && profile && profile.role === 'admin') {
      loadDashboardData();
    }
  }, [user, profile]);

  const loadDashboardData = async () => {
    try {
      // Load dashboard statistics
      const [leadsData, contractorsData, paymentsStats, referralStats] = await Promise.all([
        LeadService.getLeads(),
        ContractorService.getContractors(),
        PaymentService.getPaymentStats(),
        PaymentService.getReferralStats()
      ]);

      // Calculate stats
      const totalLeads = leadsData?.length || 0;
      const newLeads = leadsData?.filter(lead => lead.status === 'new').length || 0;
      const assignedLeads = leadsData?.filter(lead => lead.status === 'assigned').length || 0;
      const totalContractors = contractorsData?.length || 0;
      const activeContractors = contractorsData?.filter(c => c.listing_status === 'active').length || 0;

      setStats({
        totalLeads,
        newLeads,
        assignedLeads,
        totalContractors,
        activeContractors,
        totalRevenue: paymentsStats?.totalRevenue || 0,
        monthlyRevenue: paymentsStats?.subscriptionRevenue || 0,
        totalReferrals: referralStats?.totalReferrals || 0,
        pendingFees: (referralStats?.pendingLeadFees || 0) + (referralStats?.pendingSuccessFees || 0)
      });

      // Set recent data
      setRecentLeads(leadsData?.slice(0, 5) || []);
      setRecentContractors(contractorsData?.slice(0, 5) || []);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  if (!user || !profile || profile.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-slate-400 mb-6">You need administrator privileges to access this portal.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold">Admin Portal</h1>
              <p className="text-slate-400">Welcome back, {profile.full_name || 'Administrator'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full"></span>
              </button>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'contractors', label: 'Contractors', icon: Building2 },
              { id: 'leads', label: 'Leads', icon: Target },
              { id: 'contracts', label: 'Contracts', icon: FileText },
              { id: 'referrals', label: 'Referrals', icon: Award },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-6 h-6 text-blue-400" />
                  <span className="text-2xl font-bold">{stats.totalLeads}</span>
                </div>
                <div className="text-sm text-slate-400">Total Leads</div>
                <div className="text-xs text-green-400 mt-1">+{stats.newLeads} new this week</div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <Building2 className="w-6 h-6 text-amber-400" />
                  <span className="text-2xl font-bold">{stats.totalContractors}</span>
                </div>
                <div className="text-sm text-slate-400">Total Contractors</div>
                <div className="text-xs text-blue-400 mt-1">{stats.activeContractors} active</div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-6 h-6 text-green-400" />
                  <span className="text-2xl font-bold">${((stats.totalRevenue || 0) / 100000).toFixed(1)}K</span>
                </div>
                <div className="text-sm text-slate-400">Total Revenue</div>
                <div className="text-xs text-green-400 mt-1">+12% this month</div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-6 h-6 text-purple-400" />
                  <span className="text-2xl font-bold">{stats.totalReferrals}</span>
                </div>
                <div className="text-sm text-slate-400">Total Referrals</div>
                <div className="text-xs text-amber-400 mt-1">${((stats.pendingFees || 0) / 1000).toFixed(1)}K pending</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Leads */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Recent Leads</h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentLeads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div>
                        <div className="font-semibold text-white">{lead.project_type}</div>
                        <div className="text-sm text-slate-400">{lead.client_name} • {lead.zip_code}</div>
                        <div className="text-xs text-amber-400">${lead.budget?.toLocaleString()}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${
                        lead.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                        lead.status === 'assigned' ? 'bg-green-500/20 text-green-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Contractors */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Recent Contractors</h3>
                  <button
                    onClick={() => setActiveTab('contractors')}
                    className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentContractors.map((contractor) => (
                    <div key={contractor.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {contractor.profiles?.profile_image_url ? (
                          <img
                            src={contractor.profiles.profile_image_url}
                            alt={contractor.company_name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-slate-400" />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-white">{contractor.company_name}</div>
                          <div className="text-sm text-slate-400">{contractor.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {contractor.featured_profile && (
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                        )}
                        <div className={`px-2 py-1 rounded text-xs font-semibold ${
                          contractor.listing_status === 'active' ? 'bg-green-500/20 text-green-400' :
                          contractor.listing_status === 'paused' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {contractor.listing_status?.charAt(0).toUpperCase() + contractor.listing_status?.slice(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contractors Tab */}
        {activeTab === 'contractors' && <ContractorManagement />}

        {/* Leads Tab */}
        {activeTab === 'leads' && <LeadManagement />}

        {/* Contracts Tab */}
        {activeTab === 'contracts' && <ContractManagement />}

        {/* Referrals Tab */}
        {activeTab === 'referrals' && <ReferralManagement />}

        {/* Payments Tab */}
        {activeTab === 'payments' && <PaymentManagement />}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Analytics & Reports</h2>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <p className="text-slate-400">Advanced analytics and reporting functionality will be implemented here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortal;