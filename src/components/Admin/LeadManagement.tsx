import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Edit, Trash2, Eye, Search, Filter, 
  CheckCircle, XCircle, AlertCircle, Clock, MapPin, 
  Phone, Mail, DollarSign, Calendar, User, Building2,
  Save, X, ArrowRight, Target, TrendingUp, Award
} from 'lucide-react';
import { LeadService } from '../../services/leadService';
import { ContractorService } from '../../services/contractorService';

interface Lead {
  id: string;
  client_name: string | null;
  phone: string | null;
  email: string | null;
  project_type: string | null;
  zip_code: string | null;
  budget: number | null;
  timeline: string | null;
  description: string | null;
  source: string | null;
  status: string | null;
  assigned_contractor_id: string | null;
  contract_id: string | null;
  created_at: string;
  contractor?: {
    company_name: string;
    user_id?: {
      full_name: string;
    };
  };
}

interface Contractor {
  id: string;
  company_name: string;
  location: string | null;
  specialties: string[] | null;
}

const LeadManagement: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectTypeFilter, setProjectTypeFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState<Partial<Lead>>({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [leadsData, contractorsData] = await Promise.all([
        LeadService.getLeads(),
        ContractorService.getContractors({ listing_status: 'active' })
      ]);
      setLeads(leadsData || []);
      setContractors(contractorsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLead = () => {
    setFormData({
      client_name: '',
      phone: '',
      email: '',
      project_type: '',
      zip_code: '',
      budget: null,
      timeline: '',
      description: '',
      source: 'manual_entry',
      status: 'new'
    });
    setShowCreateModal(true);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setFormData(lead);
    setShowEditModal(true);
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setShowViewModal(true);
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      return;
    }

    try {
      // Note: LeadService doesn't have a delete method, so we'll update the status to 'deleted'
      await LeadService.updateLead(leadId, { status: 'deleted' });
      await loadData();
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('Failed to delete lead. Please try again.');
    }
  };

  const handleAssignContractor = async (leadId: string, contractorId: string) => {
    try {
      await LeadService.assignLeadToContractor(leadId, contractorId);
      await loadData();
    } catch (error) {
      console.error('Error assigning contractor:', error);
      alert('Failed to assign contractor. Please try again.');
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (selectedLead) {
        // Update existing lead
        await LeadService.updateLead(selectedLead.id, formData);
      } else {
        // Create new lead
        await LeadService.createLead(formData as any);
      }
      
      await loadData();
      setShowCreateModal(false);
      setShowEditModal(false);
      setSelectedLead(null);
      setFormData({});
    } catch (error) {
      console.error('Error saving lead:', error);
      alert('Failed to save lead. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'budget' ? (value ? parseFloat(value) : null) : value
    }));
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchTerm || 
      lead.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.project_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.zip_code?.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesProjectType = projectTypeFilter === 'all' || lead.project_type === projectTypeFilter;
    
    return matchesSearch && matchesStatus && matchesProjectType && lead.status !== 'deleted';
  });

  const getStatusColor = (status: string | null) => {
    switch (status) {
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

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-4 h-4" />;
      case 'assigned':
        return <Clock className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'quote_sent':
        return <Mail className="w-4 h-4" />;
      case 'quote_accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'quote_declined':
        return <XCircle className="w-4 h-4" />;
      case 'completed':
        return <Award className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string | null) => {
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
        return status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown';
    }
  };

  const projectTypes = [
    'Luxury Home Remodeling',
    'Accessory Dwelling Unit (ADU)',
    'Commercial Build-Out',
    'Luxury Outdoor Living',
    'Custom Home Building',
    'Disaster Restoration',
    'Solar + Smart Home',
    'Multifamily Conversion',
    'Foundation Repair',
    'Medical Facility'
  ];

  const LeadForm = () => (
    <form onSubmit={handleSubmitForm} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            Client Name *
          </label>
          <input
            type="text"
            name="client_name"
            required
            value={formData.client_name || ''}
            onChange={handleInputChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            placeholder="Enter client name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleInputChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            placeholder="client@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            <Phone className="w-4 h-4 inline mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleInputChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            <Building2 className="w-4 h-4 inline mr-1" />
            Project Type *
          </label>
          <select
            name="project_type"
            required
            value={formData.project_type || ''}
            onChange={handleInputChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="">Select project type</option>
            {projectTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            ZIP Code
          </label>
          <input
            type="text"
            name="zip_code"
            value={formData.zip_code || ''}
            onChange={handleInputChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            placeholder="12345"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Budget
          </label>
          <input
            type="number"
            name="budget"
            min="0"
            step="1000"
            value={formData.budget || ''}
            onChange={handleInputChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            placeholder="50000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Timeline
          </label>
          <select
            name="timeline"
            value={formData.timeline || ''}
            onChange={handleInputChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="">Select timeline</option>
            <option value="asap">ASAP</option>
            <option value="1-3months">1-3 months</option>
            <option value="3-6months">3-6 months</option>
            <option value="6-12months">6-12 months</option>
            <option value="planning">Just planning</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status || 'new'}
            onChange={handleInputChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="new">New</option>
            <option value="assigned">Assigned</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="quote_sent">Quote Sent</option>
            <option value="quote_accepted">Quote Accepted</option>
            <option value="quote_declined">Quote Declined</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Project Description
        </label>
        <textarea
          name="description"
          rows={4}
          value={formData.description || ''}
          onChange={handleInputChange}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          placeholder="Describe the project requirements..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Lead Source
        </label>
        <select
          name="source"
          value={formData.source || 'manual_entry'}
          onChange={handleInputChange}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        >
          <option value="website_form">Website Form</option>
          <option value="manual_entry">Manual Entry</option>
          <option value="phone_call">Phone Call</option>
          <option value="referral">Referral</option>
          <option value="marketing">Marketing Campaign</option>
          <option value="profile_page">Contractor Profile Page</option>
        </select>
      </div>

      <div className="flex space-x-4 pt-6 border-t border-slate-700">
        <button
          type="button"
          onClick={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
            setSelectedLead(null);
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
              <span>{selectedLead ? 'Update' : 'Create'} Lead</span>
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
        <span className="ml-3 text-slate-400">Loading leads...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Lead Management</h2>
          <p className="text-slate-400">Manage and track all construction project leads</p>
        </div>
        <button
          onClick={handleCreateLead}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-6 h-6 text-blue-400" />
            <span className="text-2xl font-bold">{leads.filter(l => l.status !== 'deleted').length}</span>
          </div>
          <div className="text-sm text-slate-400">Total Leads</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-6 h-6 text-amber-400" />
            <span className="text-2xl font-bold">
              {leads.filter(l => l.status === 'new').length}
            </span>
          </div>
          <div className="text-sm text-slate-400">New Leads</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-2xl font-bold">
              {leads.filter(l => l.status === 'accepted' || l.status === 'quote_accepted').length}
            </span>
          </div>
          <div className="text-sm text-slate-400">Accepted Leads</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <span className="text-2xl font-bold">
              ${Math.round((leads.filter(l => l.status !== 'deleted').reduce((sum, l) => sum + (l.budget || 0), 0)) / 1000)}K
            </span>
          </div>
          <div className="text-sm text-slate-400">Total Pipeline Value</div>
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
                placeholder="Search leads..."
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
              <option value="new">New</option>
              <option value="assigned">Assigned</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="quote_sent">Quote Sent</option>
              <option value="quote_accepted">Quote Accepted</option>
              <option value="quote_declined">Quote Declined</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <select
              value={projectTypeFilter}
              onChange={(e) => setProjectTypeFilter(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="all">All Project Types</option>
              {projectTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold">Client</th>
                <th className="text-left py-4 px-6 font-semibold">Project</th>
                <th className="text-left py-4 px-6 font-semibold">Budget</th>
                <th className="text-left py-4 px-6 font-semibold">Location</th>
                <th className="text-center py-4 px-6 font-semibold">Status</th>
                <th className="text-left py-4 px-6 font-semibold">Contractor</th>
                <th className="text-center py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-700 hover:bg-slate-800/50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-white">{lead.client_name || 'Unknown'}</div>
                      <div className="text-sm text-slate-400">{lead.email}</div>
                      <div className="text-sm text-slate-400">{lead.phone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-white">{lead.project_type}</div>
                      <div className="text-sm text-slate-400">{lead.timeline}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-amber-400">
                      {lead.budget ? `$${lead.budget.toLocaleString()}` : 'Not specified'}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-1 text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{lead.zip_code || 'Not specified'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(lead.status)}`}>
                        {getStatusIcon(lead.status)}
                        <span>{getStatusLabel(lead.status)}</span>
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {lead.contractor ? (
                      <div>
                        <div className="font-semibold text-white">{lead.contractor.company_name}</div>
                        <div className="text-sm text-slate-400">{lead.contractor.user_id?.full_name}</div>
                      </div>
                    ) : lead.status === 'new' ? (
                      <select
                        onChange={(e) => e.target.value && handleAssignContractor(lead.id, e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm text-white"
                        defaultValue=""
                      >
                        <option value="">Assign contractor...</option>
                        {contractors.map(contractor => (
                          <option key={contractor.id} value={contractor.id}>
                            {contractor.company_name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-slate-400 text-sm">Unassigned</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleViewLead(lead)}
                        className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                        title="View Lead"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditLead(lead)}
                        className="p-2 text-slate-400 hover:text-amber-400 transition-colors"
                        title="Edit Lead"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete Lead"
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

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400">No leads found</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Create New Lead</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <LeadForm />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Edit Lead</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <LeadForm />
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Lead Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-1">Client Name</label>
                  <div className="text-white">{selectedLead.client_name || 'Not specified'}</div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-1">Email</label>
                  <div className="text-white">{selectedLead.email || 'Not specified'}</div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-1">Phone</label>
                  <div className="text-white">{selectedLead.phone || 'Not specified'}</div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-1">Project Type</label>
                  <div className="text-white">{selectedLead.project_type || 'Not specified'}</div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-1">Budget</label>
                  <div className="text-amber-400 font-semibold">
                    {selectedLead.budget ? `$${selectedLead.budget.toLocaleString()}` : 'Not specified'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-1">Timeline</label>
                  <div className="text-white">{selectedLead.timeline || 'Not specified'}</div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-1">Location</label>
                  <div className="text-white">{selectedLead.zip_code || 'Not specified'}</div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-1">Status</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedLead.status)}`}>
                    {getStatusLabel(selectedLead.status)}
                  </span>
                </div>
              </div>
              
              {selectedLead.description && (
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-1">Description</label>
                  <div className="text-white bg-slate-700/50 p-4 rounded-lg">{selectedLead.description}</div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-1">Source</label>
                  <div className="text-white">{selectedLead.source || 'Not specified'}</div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-1">Created</label>
                  <div className="text-white">{new Date(selectedLead.created_at).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="flex space-x-4 pt-6 border-t border-slate-700">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditLead(selectedLead);
                  }}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Lead</span>
                </button>
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

export default LeadManagement;