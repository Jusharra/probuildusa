import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LogIn, Eye, DollarSign, Calendar, MapPin, Star, TrendingUp, Users, CheckCircle, Clock, Upload, FileText, Download, Edit, X, Check, AlertCircle, CreditCard, Wallet, Phone, Mail, MessageSquare, Settings, Bell, Filter, Search, Plus, ChevronDown, Contact as Contract, PenTool, Send, Archive, RefreshCw, BarChart3, Target, Award, UserCheck, ShieldAlert 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LeadService } from '../services/leadService';
import { ContractService } from '../services/contractService';
import { ContractorService } from '../services/contractorService';
import { PaymentService } from '../services/paymentService';
import { BookingService } from '../services/bookingService';
import SubscriptionCard from '../components/SubscriptionCard';
import BookingManagement from '../components/Partner/BookingManagement';
import ContractManagement from '../components/Partner/ContractManagement';
import FileUpload from '../components/FileUpload';

const PartnerPortal: React.FC = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contractor, setContractor] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});

  // Helper function to get status color classes
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'paused':
        return 'bg-blue-500/20 text-blue-400';
      case 'inactive':
        return 'bg-red-500/20 text-red-400';
      case 'pending_review':
        return 'bg-amber-500/20 text-amber-400';
      case 'new':
        return 'bg-blue-500/20 text-blue-400';
      case 'assigned':
        return 'bg-amber-500/20 text-amber-400';
      case 'accepted':
        return 'bg-green-500/20 text-green-400';
      case 'rejected':
        return 'bg-red-500/20 text-red-400';
      case 'quote_sent':
        return 'bg-purple-500/20 text-purple-400';
      case 'quote_accepted':
        return 'bg-teal-500/20 text-teal-400';
      case 'quote_declined':
        return 'bg-orange-500/20 text-orange-400';
      case 'completed':
        return 'bg-indigo-500/20 text-indigo-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'paused':
        return <Clock className="w-4 h-4" />;
      case 'inactive':
        return <X className="w-4 h-4" />;
      case 'pending_review':
        return <AlertCircle className="w-4 h-4" />;
      case 'new':
        return <AlertCircle className="w-4 h-4" />;
      case 'assigned':
        return <Clock className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <X className="w-4 h-4" />;
      case 'quote_sent':
        return <Send className="w-4 h-4" />;
      case 'quote_accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'quote_declined':
        return <X className="w-4 h-4" />;
      case 'completed':
        return <Award className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Helper function to get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new':
        return 'New';
      case 'assigned':
        return 'Assigned';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      case 'quote_sent':
        return 'Quote Sent';
      case 'quote_accepted':
        return 'Quote Accepted';
      case 'quote_declined':
        return 'Quote Declined';
      case 'completed':
        return 'Completed';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
    }
  };

  useEffect(() => {
    if (user && profile && profile.role === 'professional') {
      loadContractorData();
    }
  }, [user, profile]);

  const loadContractorData = async () => {
    try {
      // Get contractor profile
      const contractorData = await ContractorService.getContractorByUserId(user!.id);
      setContractor(contractorData);

      if (contractorData) {
        // Load leads, contracts, payments, bookings, and stats
        const [leadsData, contractsData, paymentsData, bookingsData, statsData] = await Promise.all([
          LeadService.getLeadsForContractor(contractorData.id),
          ContractService.getContracts({ contractor_id: contractorData.id }),
          PaymentService.getPaymentHistory(user!.id),
          BookingService.getBookingsForContractor(contractorData.id),
          ContractorService.getContractorStats(contractorData.id)
        ]);

        setLeads(leadsData || []);
        setContracts(contractsData || []);
        setPayments(paymentsData || []);
        setBookings(bookingsData || []);
        setStats(statsData || {});
      }
    } catch (error) {
      console.error('Error loading contractor data:', error);
    }
  };

  const handleLeadAction = async (leadId: string, action: 'accept' | 'reject') => {
    try {
      const status = action === 'accept' ? 'accepted' : 'rejected';
      await LeadService.updateLead(leadId, { status });
      
      // Reload leads
      if (contractor) {
        const updatedLeads = await LeadService.getLeadsForContractor(contractor.id);
        setLeads(updatedLeads || []);
      }
      
      // In a real implementation, accepting a lead would trigger:
      // 1. Stripe lead fee charge via webhook/backend
      // 2. PaymentService.recordPayment for the lead fee
      // 3. Notification to admin
      
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const generateContract = async (leadId: string) => {
    try {
      if (!contractor) return;
      
      await ContractService.generateContract(leadId, contractor.id, 'construction_agreement');
      
      // Reload contracts
      const updatedContracts = await ContractService.getContracts({ contractor_id: contractor.id });
      setContracts(updatedContracts || []);
      
    } catch (error) {
      console.error('Error generating contract:', error);
    }
  };

  // Render pending review state
  const renderPendingReviewState = () => {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full border border-amber-500/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Account Pending Review</h1>
            <p className="text-slate-300">
              Thank you for registering as a contractor with ProBuild Concierge. Your account is currently under review by our admin team.
            </p>
          </div>
          
          <div className="bg-slate-700/50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 text-amber-400">What happens next?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-slate-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-400 text-sm font-bold">1</span>
                </div>
                <p className="text-slate-300">Our team will review your contractor information and verify your credentials.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-slate-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-400 text-sm font-bold">2</span>
                </div>
                <p className="text-slate-300">Once approved, you'll receive full access to the partner portal and can start receiving leads.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-slate-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-400 text-sm font-bold">3</span>
                </div>
                <p className="text-slate-300">This process typically takes 24-48 hours. You'll receive an email notification when your account is activated.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-700">
              <span className="text-slate-400">Company Name:</span>
              <span className="text-white font-semibold">{contractor?.company_name || 'Not specified'}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-700">
              <span className="text-slate-400">Email:</span>
              <span className="text-white">{contractor?.email || profile?.email || 'Not specified'}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-700">
              <span className="text-slate-400">Status:</span>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-semibold">Pending Review</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-400">Submission Date:</span>
              <span className="text-white">{new Date(contractor?.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Return to Homepage</span>
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Check Status</span>
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Need help? Contact our support team at <a href="mailto:support@probuildconcierge.com" className="text-amber-400 hover:underline">support@probuildconcierge.com</a>
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (!user || !profile || profile.role !== 'professional') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-slate-400 mb-6">You need to be a registered contractor to access this portal.</p>
          <Link
            to="/why-partner"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Learn About Partnership
          </Link>
        </div>
      </div>
    );
  }

  if (!contractor) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Contractor Profile Not Found</h1>
          <p className="text-slate-400 mb-6">Please complete your contractor registration to access the portal.</p>
          <Link
            to="/why-partner"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Complete Registration
          </Link>
        </div>
      </div>
    );
  }

  // Check if contractor is pending review
  if (contractor.listing_status === 'pending_review') {
    return renderPendingReviewState();
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {profile.full_name || 'Contractor'}!</h1>
              <p className="text-slate-400">{contractor.company_name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
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
              { id: 'leads', label: 'Leads', icon: Target },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'contracts', label: 'Contracts', icon: FileText },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'subscription', label: 'Subscription', icon: Award },
              { id: 'profile', label: 'Profile', icon: Users }
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
            {/* Status Banner - Only show if not active */}
            {contractor.listing_status !== 'active' && (
              <div className={`p-4 rounded-xl ${
                contractor.listing_status === 'paused' 
                  ? 'bg-blue-500/10 border border-blue-500/20' 
                  : 'bg-red-500/10 border border-red-500/20'
              }`}>
                <div className="flex items-start space-x-3">
                  <AlertCircle className={`w-5 h-5 ${
                    contractor.listing_status === 'paused' ? 'text-blue-400' : 'text-red-400'
                  } flex-shrink-0 mt-0.5`} />
                  <div>
                    <h3 className={`font-semibold ${
                      contractor.listing_status === 'paused' ? 'text-blue-400' : 'text-red-400'
                    }`}>
                      {contractor.listing_status === 'paused' 
                        ? 'Your account is currently paused' 
                        : 'Your account is inactive'}
                    </h3>
                    <p className="text-slate-300 text-sm">
                      {contractor.listing_status === 'paused'
                        ? 'Your profile is not visible in the directory and you will not receive new leads until your account is reactivated. Contact support to resume your account.'
                        : 'Your account has been deactivated. Please contact our support team to reactivate your account and resume receiving leads.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-6 h-6 text-blue-400" />
                  <span className="text-2xl font-bold">{stats.totalLeads || 0}</span>
                </div>
                <div className="text-sm text-slate-400">Total Leads</div>
                <div className="text-xs text-green-400 mt-1">+12% this month</div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-6 h-6 text-amber-400" />
                  <span className="text-2xl font-bold">{leads.filter(l => l.status === 'accepted' || l.status === 'quote_accepted').length}</span>
                </div>
                <div className="text-sm text-slate-400">Active Projects</div>
                <div className="text-xs text-blue-400 mt-1">3 starting this week</div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <Wallet className="w-6 h-6 text-green-400" />
                  <span className="text-2xl font-bold">${((stats.pendingPayouts || 0) / 1000).toFixed(1)}K</span>
                </div>
                <div className="text-sm text-slate-400">Pending Payouts</div>
                <div className="text-xs text-amber-400 mt-1">Processing in 3 days</div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <Star className="w-6 h-6 text-amber-400" />
                  <span className="text-2xl font-bold">4.9</span>
                </div>
                <div className="text-sm text-slate-400">Avg Rating</div>
                <div className="text-xs text-green-400 mt-1">+0.2 this month</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {leads.slice(0, 3).map((lead) => (
                    <div key={lead.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{lead.project_type}</h3>
                          <div className="flex items-center space-x-4 text-sm text-slate-400">
                            <span>{lead.client_name}</span>
                            <span>{lead.zip_code}</span>
                            <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-amber-400 mb-1">${lead.budget?.toLocaleString()}</div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                            {getStatusLabel(lead.status)}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-slate-400">
                          Timeline: <span className="text-white">{lead.timeline}</span>
                        </div>
                        <button
                          onClick={() => setActiveTab('leads')}
                          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold mb-4">This Month</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Leads Received</span>
                      <span className="font-bold">{leads.filter(l => new Date(l.created_at).getMonth() === new Date().getMonth()).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Quotes Submitted</span>
                      <span className="font-bold">{contracts.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Projects Won</span>
                      <span className="font-bold text-green-400">{contracts.filter(c => c.status === 'signed').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Win Rate</span>
                      <span className="font-bold text-amber-400">
                        {leads.length > 0 ? Math.round((contracts.filter(c => c.status === 'signed').length / leads.length) * 100) : 0}%
                      </span>
                    </div>
                    <div className="pt-4 border-t border-slate-700">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Earnings</span>
                        <span className="font-bold text-green-400">${((stats.totalEarnings || 0) / 1000).toFixed(1)}K</span>
                      </div>
                    </div>
                  </div>
                </div>

                <SubscriptionCard />
              </div>
            </div>
          </div>
        )}

        {/* Subscription Tab */}
        {activeTab === 'subscription' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Subscription Management</h2>
              <Link
                to="/pricing"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>View Plans</span>
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <SubscriptionCard className="lg:col-span-1" />
              
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold mb-4">Subscription Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Access to premium lead network</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Priority lead matching</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Dedicated account manager</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Advanced project management tools</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Monthly performance reports</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Lead Management</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    className="bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-slate-300 hover:text-white transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-xl mb-2">{lead.project_type}</h3>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-slate-400">Client:</span>
                              <span className="text-white ml-2">{lead.client_name}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">Budget:</span>
                              <span className="text-amber-400 font-bold ml-2">${lead.budget?.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">Location:</span>
                              <span className="text-white ml-2">{lead.zip_code}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">Timeline:</span>
                              <span className="text-white ml-2">{lead.timeline}</span>
                            </div>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                          {getStatusLabel(lead.status)}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-slate-400 mb-4">
                        {lead.phone && (
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{lead.phone}</span>
                          </div>
                        )}
                        {lead.email && (
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{lead.email}</span>
                          </div>
                        )}
                      </div>

                      {lead.description && (
                        <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
                          <span className="text-slate-400 text-sm">Description:</span>
                          <p className="text-slate-300 text-sm mt-1">{lead.description}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {lead.status === 'new' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleLeadAction(lead.id, 'accept')}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-1"
                          >
                            <Check className="w-4 h-4" />
                            <span>Accept</span>
                          </button>
                          <button
                            onClick={() => handleLeadAction(lead.id, 'reject')}
                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-1"
                          >
                            <X className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}

                      {lead.status === 'accepted' && (
                        <>
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-300">Upload Quote/Documents</label>
                            <FileUpload
                              relatedTo="lead"
                              relatedId={lead.id}
                              maxFiles={5}
                              allowedFileTypes={['image/*', 'application/pdf', '.doc', '.docx', '.xls', '.xlsx']}
                              maxSizeMB={10}
                              label="Upload Quote or Documents"
                              description="Share quotes, plans, or other project documents"
                            />
                          </div>

                          <button
                            onClick={() => generateContract(lead.id)}
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                          >
                            <Contract className="w-4 h-4" />
                            <span>Generate Contract</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && contractor && (
          <BookingManagement contractorId={contractor.id} />
        )}

        {/* Contracts Tab */}
        {activeTab === 'contracts' && contractor && (
          <ContractManagement contractorId={contractor.id} />
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Payment History & Billing</h2>
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>

            {/* Payment Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <Wallet className="w-6 h-6 text-green-400" />
                  <span className="text-2xl font-bold text-green-400">${((stats.pendingPayouts || 0) / 1000).toFixed(1)}K</span>
                </div>
                <div className="text-sm text-slate-400">Pending Payouts</div>
                <div className="text-xs text-amber-400 mt-1">Next payout: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <CreditCard className="w-6 h-6 text-blue-400" />
                  <span className="text-2xl font-bold">$1.00</span>
                </div>
                <div className="text-sm text-slate-400">Monthly Subscription</div>
                <div className="text-xs text-blue-400 mt-1">{contractor.subscription_plan || 'Membership #1'} Plan</div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-6 h-6 text-amber-400" />
                  <span className="text-2xl font-bold">8.5%</span>
                </div>
                <div className="text-sm text-slate-400">Success Fee Rate</div>
                <div className="text-xs text-green-400 mt-1">Competitive rate</div>
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-700">
                <h3 className="text-xl font-bold">Recent Transactions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="text-left py-3 px-6 font-semibold">Date</th>
                      <th className="text-left py-3 px-6 font-semibold">Type</th>
                      <th className="text-left py-3 px-6 font-semibold">Description</th>
                      <th className="text-right py-3 px-6 font-semibold">Amount</th>
                      <th className="text-center py-3 px-6 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-slate-700 hover:bg-slate-800/50">
                        <td className="py-4 px-6 text-slate-300">{new Date(payment.created_at).toLocaleDateString()}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            payment.type === 'success_fee' ? 'bg-green-500/20 text-green-400' :
                            payment.type === 'lead_fee' ? 'bg-red-500/20 text-red-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {payment.type?.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-300">
                          {payment.type === 'subscription' ? 'Monthly Platform Access' :
                           payment.type === 'lead_fee' ? 'Lead Acceptance Fee' :
                           payment.type === 'success_fee' ? 'Project Success Fee' :
                           'Payment'}
                        </td>
                        <td className={`py-4 px-6 text-right font-bold ${
                          (payment.amount || 0) > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {(payment.amount || 0) > 0 ? '+' : ''}${Math.abs(payment.amount || 0).toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            payment.payment_status === 'paid' ? 'bg-green-500/20 text-green-400' :
                            payment.payment_status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {payment.payment_status?.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Profile & Settings</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold mb-6">Company Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Company Name</label>
                    <input
                      type="text"
                      defaultValue={contractor.company_name}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Location</label>
                    <input
                      type="text"
                      defaultValue={contractor.location}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Website</label>
                    <input
                      type="url"
                      defaultValue={contractor.website}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Bio</label>
                    <textarea
                      rows={4}
                      defaultValue={contractor.bio}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold mb-6">Specialties & Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Specialties</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Luxury Remodeling', 'Custom Homes', 'Commercial', 'ADUs', 'Outdoor Living', 'Solar + Smart Home'].map((specialty) => (
                        <label key={specialty} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            defaultChecked={contractor.specialties?.includes(specialty)}
                            className="w-4 h-4 text-amber-400 bg-slate-700 border-slate-600 rounded focus:ring-amber-400" 
                          />
                          <span className="text-slate-300 text-sm">{specialty}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Account Status</label>
                    <div className={`px-3 py-2 rounded-lg ${getStatusColor(contractor.listing_status)}`}>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(contractor.listing_status)}
                        <span className="font-semibold">
                          {contractor.listing_status === 'active' && 'Active - Receiving Leads'}
                          {contractor.listing_status === 'paused' && 'Paused - Not Receiving Leads'}
                          {contractor.listing_status === 'inactive' && 'Inactive - Account Disabled'}
                          {contractor.listing_status === 'pending_review' && 'Pending Review - Awaiting Approval'}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      {contractor.listing_status === 'active' 
                        ? 'Your account is active and you are eligible to receive leads.' 
                        : 'Contact support to change your account status.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button className="border border-slate-600 hover:border-slate-500 text-slate-300 px-6 py-2 rounded-lg font-semibold transition-all duration-300">
                Cancel
              </button>
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-2 rounded-lg font-semibold transition-all duration-300">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerPortal;