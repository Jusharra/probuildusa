import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, MapPin, Phone, Mail, Globe, Star, 
  Edit, Trash2, Eye, Search, Filter, Plus, CheckCircle, 
  XCircle, Save, X, AlertCircle, Award, Shield, Loader2,
  Facebook, Instagram, Linkedin, Youtube, Upload, Image, User
} from 'lucide-react';
import { ContractorService } from '../../services/contractorService';
import FileUpload from '../FileUpload';

interface Contractor {
  id: string;
  user_id?: {
    full_name: string | null;
    email: string;
  };
  company_name: string;
  bio: string | null;
  location: string | null;
  specialties: string[] | null;
  website: string | null;
  profile_image_url: string | null;
  subscription_plan: string | null;
  stripe_subscription_id: string | null;
  listing_status: string | null;
  created_at: string;
  tagline: string | null;
  phone: string | null;
  email: string | null;
  license_number: string | null;
  years_experience: number | null;
  certifications: string[] | null;
  insurance_info: string | null;
  social_facebook: string | null;
  social_instagram: string | null;
  social_linkedin: string | null;
  social_youtube: string | null;
  image_gallery: string[] | null;
  featured_video: string | null;
  address: string | null;
  service_regions: string[] | null;
  google_maps_embed_url: string | null;
  allow_booking: boolean | null;
  slug: string | null;
  meta_title: string | null;
  meta_description: string | null;
  featured_profile: boolean | null;
  feature_media_url: string | null;
  carousel_media_urls: string[] | null;
  media_approved: boolean | null;
}

const ContractorManagement: React.FC = () => {
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [formData, setFormData] = useState<Partial<Contractor>>({});
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContractors();
  }, []);

  const loadContractors = async () => {
    try {
      setLoading(true);
      const data = await ContractorService.getContractors();
      setContractors(data || []);
    } catch (error) {
      console.error('Error loading contractors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContractor = () => {
    setFormData({
      company_name: '',
      bio: '',
      location: '',
      specialties: [],
      website: '',
      profile_image_url: '',
      listing_status: 'pending_review',
      tagline: '',
      phone: '',
      email: '',
      license_number: '',
      years_experience: 0,
      certifications: [],
      insurance_info: '',
      social_facebook: '',
      social_instagram: '',
      social_linkedin: '',
      social_youtube: '',
      address: '',
      service_regions: [],
      allow_booking: true,
      featured_profile: false,
      feature_media_url: '',
      carousel_media_urls: [],
      media_approved: true,
      meta_title: '',
      meta_description: ''
    });
    setActiveTab('general');
    setShowCreateModal(true);
  };

  const handleEditContractor = (contractor: Contractor) => {
    setSelectedContractor(contractor);
    setFormData({
      ...contractor,
      specialties: contractor.specialties || [],
      certifications: contractor.certifications || [],
      service_regions: contractor.service_regions || [],
      carousel_media_urls: contractor.carousel_media_urls || []
    });
    setActiveTab('general');
    setShowEditModal(true);
  };

  const handleViewContractor = (contractor: Contractor) => {
    setSelectedContractor(contractor);
    setShowViewModal(true);
  };

  const handleDeleteContractor = async (contractorId: string) => {
    if (!confirm('Are you sure you want to delete this contractor? This action cannot be undone.')) {
      return;
    }

    try {
      await ContractorService.deleteContractor(contractorId);
      await loadContractors();
    } catch (error) {
      console.error('Error deleting contractor:', error);
      alert('Failed to delete contractor. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else if (name === 'service_regions' || name === 'specialties' || name === 'certifications') {
      // Handle array inputs (comma-separated values)
      setFormData({
        ...formData,
        [name]: value.split(',').map(item => item.trim()).filter(item => item !== '')
      });
    } else if (name === 'years_experience') {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleProfileImageUpload = (upload: any) => {
    setFormData({
      ...formData,
      profile_image_url: upload.file_url
    });
  };

  const handleFeatureImageUpload = (upload: any) => {
    setFormData({
      ...formData,
      feature_media_url: upload.file_url
    });
  };

  const handleCarouselImageUpload = (upload: any) => {
    const currentUrls = formData.carousel_media_urls || [];
    setFormData({
      ...formData,
      carousel_media_urls: [...currentUrls, upload.file_url]
    });
  };

  const handleRemoveCarouselImage = (index: number) => {
    if (!formData.carousel_media_urls) return;
    
    const newUrls = [...formData.carousel_media_urls];
    newUrls.splice(index, 1);
    
    setFormData({
      ...formData,
      carousel_media_urls: newUrls
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (selectedContractor) {
        // Update existing contractor
        await ContractorService.updateContractor(selectedContractor.id, formData);
      } else {
        // Create new contractor
        await ContractorService.createContractor(formData as any);
      }
      
      await loadContractors();
      setShowCreateModal(false);
      setShowEditModal(false);
      setSelectedContractor(null);
      setFormData({});
    } catch (error: any) {
      console.error('Error saving contractor:', error);
      setError(error.message || 'Failed to save contractor. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = !searchTerm || 
      contractor.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.specialties?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || contractor.listing_status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'paused':
        return 'bg-amber-500/20 text-amber-400';
      case 'inactive':
        return 'bg-red-500/20 text-red-400';
      case 'pending_review':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const ContractorForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-slate-700 mb-6 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`py-3 px-4 font-medium text-sm transition-colors ${
            activeTab === 'general'
              ? 'border-b-2 border-amber-400 text-amber-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          General Information
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('company')}
          className={`py-3 px-4 font-medium text-sm transition-colors ${
            activeTab === 'company'
              ? 'border-b-2 border-amber-400 text-amber-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Company Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('specialties')}
          className={`py-3 px-4 font-medium text-sm transition-colors ${
            activeTab === 'specialties'
              ? 'border-b-2 border-amber-400 text-amber-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Specialties
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`py-3 px-4 font-medium text-sm transition-colors ${
            activeTab === 'social'
              ? 'border-b-2 border-amber-400 text-amber-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Social Media
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('location')}
          className={`py-3 px-4 font-medium text-sm transition-colors ${
            activeTab === 'location'
              ? 'border-b-2 border-amber-400 text-amber-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Location
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('media')}
          className={`py-3 px-4 font-medium text-sm transition-colors ${
            activeTab === 'media'
              ? 'border-b-2 border-amber-400 text-amber-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Media
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`py-3 px-4 font-medium text-sm transition-colors ${
            activeTab === 'seo'
              ? 'border-b-2 border-amber-400 text-amber-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          SEO
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* General Information Tab */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name || ''}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="company@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
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
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website || ''}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Listing Status
              </label>
              <select
                name="listing_status"
                value={formData.listing_status || 'pending_review'}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="inactive">Inactive</option>
                <option value="pending_review">Pending Review</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Profile Image
              </label>
              <div className="flex items-center space-x-4">
                {formData.profile_image_url ? (
                  <div className="relative">
                    <img
                      src={formData.profile_image_url}
                      alt="Profile"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, profile_image_url: ''})}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
                    <User className="w-8 h-8 text-slate-500" />
                  </div>
                )}
                
                {selectedContractor && (
                  <FileUpload
                    relatedTo="contractor"
                    relatedId={selectedContractor.id}
                    onUploadSuccess={handleProfileImageUpload}
                    maxFiles={1}
                    allowedFileTypes={['image/*']}
                    maxSizeMB={2}
                    label="Upload Profile Image"
                    description="PNG, JPG, GIF up to 2MB"
                    bucketName="uploads"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="featured_profile"
              name="featured_profile"
              checked={formData.featured_profile || false}
              onChange={(e) => setFormData({...formData, featured_profile: e.target.checked})}
              className="w-4 h-4 text-amber-400 bg-slate-700 border-slate-600 rounded focus:ring-amber-400"
            />
            <label htmlFor="featured_profile" className="text-slate-300">
              Featured Profile (appears at top of directory)
            </label>
          </div>
        </div>
      )}

      {/* Company Details Tab */}
      {activeTab === 'company' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline || ''}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Brief company tagline"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Company Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio || ''}
              onChange={handleInputChange}
              rows={5}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Detailed company description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                License Number
              </label>
              <input
                type="text"
                name="license_number"
                value={formData.license_number || ''}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="Contractor license number"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                name="years_experience"
                value={formData.years_experience || 0}
                onChange={handleInputChange}
                min="0"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="Years of experience"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Insurance Information
            </label>
            <input
              type="text"
              name="insurance_info"
              value={formData.insurance_info || ''}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Insurance provider and coverage details"
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="allow_booking"
              name="allow_booking"
              checked={formData.allow_booking !== false}
              onChange={(e) => setFormData({...formData, allow_booking: e.target.checked})}
              className="w-4 h-4 text-amber-400 bg-slate-700 border-slate-600 rounded focus:ring-amber-400"
            />
            <label htmlFor="allow_booking" className="text-slate-300">
              Allow clients to book appointments
            </label>
          </div>
        </div>
      )}

      {/* Specialties Tab */}
      {activeTab === 'specialties' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Specialties (comma-separated)
            </label>
            <textarea
              name="specialties"
              value={(formData.specialties || []).join(', ')}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Luxury Remodeling, Custom Homes, ADUs, etc."
            />
            <p className="text-xs text-slate-500 mt-1">
              Enter specialties separated by commas
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Certifications (comma-separated)
            </label>
            <textarea
              name="certifications"
              value={(formData.certifications || []).join(', ')}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Licensed General Contractor, LEED Certified, etc."
            />
            <p className="text-xs text-slate-500 mt-1">
              Enter certifications separated by commas
            </p>
          </div>
        </div>
      )}

      {/* Social Media Tab */}
      {activeTab === 'social' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                <Facebook className="w-4 h-4 inline mr-1 text-blue-400" />
                Facebook URL
              </label>
              <input
                type="url"
                name="social_facebook"
                value={formData.social_facebook || ''}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="https://facebook.com/yourcompany"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                <Instagram className="w-4 h-4 inline mr-1 text-pink-400" />
                Instagram URL
              </label>
              <input
                type="url"
                name="social_instagram"
                value={formData.social_instagram || ''}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="https://instagram.com/yourcompany"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                <Linkedin className="w-4 h-4 inline mr-1 text-blue-500" />
                LinkedIn URL
              </label>
              <input
                type="url"
                name="social_linkedin"
                value={formData.social_linkedin || ''}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                <Youtube className="w-4 h-4 inline mr-1 text-red-500" />
                YouTube URL
              </label>
              <input
                type="url"
                name="social_youtube"
                value={formData.social_youtube || ''}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="https://youtube.com/c/yourcompany"
              />
            </div>
          </div>
        </div>
      )}

      {/* Location Tab */}
      {activeTab === 'location' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="City, State"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Full Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address || ''}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="123 Main St, City, State, Zip"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Service Regions (comma-separated)
            </label>
            <textarea
              name="service_regions"
              value={(formData.service_regions || []).join(', ')}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Los Angeles, Orange County, San Diego"
            />
            <p className="text-xs text-slate-500 mt-1">
              Enter service regions separated by commas
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Google Maps Embed URL
            </label>
            <input
              type="url"
              name="google_maps_embed_url"
              value={formData.google_maps_embed_url || ''}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            <p className="text-xs text-slate-500 mt-1">
              Paste the embed URL from Google Maps
            </p>
          </div>
        </div>
      )}

      {/* Media Tab */}
      {activeTab === 'media' && (
        <div className="space-y-8">
          {/* Featured Image */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              <Image className="w-4 h-4 inline mr-1" />
              Featured Image (Banner)
            </label>
            <p className="text-sm text-slate-400 mb-4">
              This image will be displayed as the main banner on the profile page. Recommended size: 1920x600px.
            </p>
            
            {formData.feature_media_url ? (
              <div className="mb-4">
                <div className="relative">
                  <img 
                    src={formData.feature_media_url} 
                    alt="Featured banner" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, feature_media_url: '' }))}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors"
                    title="Remove image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-sm text-slate-400">
                  <Eye className="w-4 h-4" />
                  <a 
                    href={formData.feature_media_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    View full image
                  </a>
                </div>
              </div>
            ) : (
              <div className="w-full h-48 bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-slate-500">No featured image</span>
              </div>
            )}
            
            {selectedContractor && (
              <FileUpload
                relatedTo="contractor"
                relatedId={selectedContractor.id}
                onUploadSuccess={handleFeatureImageUpload}
                maxFiles={1}
                allowedFileTypes={['image/*']}
                maxSizeMB={5}
                label="Upload Featured Image"
                description="Upload a high-quality banner image for the profile"
                bucketName="uploads"
                fileNameOverride="feature.jpg"
              />
            )}
          </div>

          {/* Carousel Images */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              <Image className="w-4 h-4 inline mr-1" />
              Gallery Images (Carousel)
            </label>
            <p className="text-sm text-slate-400 mb-4">
              These images will be displayed in the image carousel on the profile page. Recommended size: 600x400px.
            </p>
            
            {formData.carousel_media_urls && formData.carousel_media_urls.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {formData.carousel_media_urls.map((url, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={url} 
                      alt={`Gallery image ${index + 1}`} 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCarouselImage(index)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-32 bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-slate-500">No gallery images</span>
              </div>
            )}
            
            {selectedContractor && (
              <FileUpload
                relatedTo="contractor"
                relatedId={selectedContractor.id}
                onUploadSuccess={handleCarouselImageUpload}
                maxFiles={10}
                allowedFileTypes={['image/*']}
                maxSizeMB={3}
                label="Upload Gallery Image"
                description="Upload images of projects for the gallery carousel"
                bucketName="uploads"
              />
            )}
            
            <p className="text-xs text-slate-500 mt-2">
              You can upload up to 10 images for the gallery carousel. Each image should be less than 3MB.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="media_approved"
              name="media_approved"
              checked={formData.media_approved !== false}
              onChange={(e) => setFormData({...formData, media_approved: e.target.checked})}
              className="w-4 h-4 text-amber-400 bg-slate-700 border-slate-600 rounded focus:ring-amber-400"
            />
            <label htmlFor="media_approved" className="text-slate-300">
              Media Approved (must be checked for images to display publicly)
            </label>
          </div>
        </div>
      )}

      {/* SEO Tab */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              URL Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug || ''}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="company-name-location"
            />
            <p className="text-xs text-slate-500 mt-1">
              Leave blank to auto-generate from company name and location
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              name="meta_title"
              value={formData.meta_title || ''}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Company Name | Location | Services"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Meta Description
            </label>
            <textarea
              name="meta_description"
              value={formData.meta_description || ''}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Brief description for search engines (150-160 characters)"
            />
            <p className="text-xs text-slate-500 mt-1">
              {formData.meta_description?.length || 0}/160 characters
            </p>
          </div>
        </div>
      )}

      <div className="flex space-x-4 pt-6 border-t border-slate-700">
        <button
          type="button"
          onClick={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
            setSelectedContractor(null);
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
              <span>{selectedContractor ? 'Update' : 'Create'} Contractor</span>
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
        <span className="ml-3 text-slate-400">Loading contractors...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Contractor Management</h2>
          <p className="text-slate-400">Manage and approve contractor profiles</p>
        </div>
        <button
          onClick={handleCreateContractor}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Contractor</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search contractors..."
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
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="inactive">Inactive</option>
              <option value="pending_review">Pending Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contractors Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left py-4 px-6 font-semibold">Company</th>
                <th className="text-left py-4 px-6 font-semibold">Contact</th>
                <th className="text-left py-4 px-6 font-semibold">Location</th>
                <th className="text-center py-4 px-6 font-semibold">Status</th>
                <th className="text-center py-4 px-6 font-semibold">Featured</th>
                <th className="text-center py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContractors.map((contractor) => (
                <tr key={contractor.id} className="border-b border-slate-700 hover:bg-slate-800/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      {contractor.profile_image_url ? (
                        <img
                          src={contractor.profile_image_url}
                          alt={contractor.company_name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-slate-500" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-white">{contractor.company_name}</div>
                        <div className="text-sm text-slate-400">{contractor.user_id?.full_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      {contractor.email && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">{contractor.email}</span>
                        </div>
                      )}
                      {contractor.phone && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">{contractor.phone}</span>
                        </div>
                      )}
                      {contractor.website && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Globe className="w-4 h-4 text-slate-400" />
                          <a
                            href={contractor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-400 hover:text-amber-300 transition-colors"
                          >
                            Website
                          </a>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{contractor.location || 'Not specified'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contractor.listing_status)}`}>
                      {contractor.listing_status?.replace('_', ' ').toUpperCase() || 'UNKNOWN'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {contractor.featured_profile ? (
                      <Star className="w-5 h-5 text-amber-400 fill-current mx-auto" />
                    ) : (
                      <Star className="w-5 h-5 text-slate-500 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleViewContractor(contractor)}
                        className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                        title="View Contractor"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditContractor(contractor)}
                        className="p-2 text-slate-400 hover:text-amber-400 transition-colors"
                        title="Edit Contractor"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteContractor(contractor.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete Contractor"
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

        {filteredContractors.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400">No contractors found</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Create New Contractor</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <ContractorForm />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedContractor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Edit Contractor</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <ContractorForm />
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedContractor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Contractor Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Company Info */}
              <div className="flex items-start space-x-4">
                {selectedContractor.profile_image_url ? (
                  <img
                    src={selectedContractor.profile_image_url}
                    alt={selectedContractor.company_name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-slate-700 rounded-xl flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-slate-500" />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-xl font-bold">{selectedContractor.company_name}</h4>
                    {selectedContractor.featured_profile && (
                      <span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full text-xs font-semibold">
                        FEATURED
                      </span>
                    )}
                  </div>
                  
                  {selectedContractor.tagline && (
                    <p className="text-amber-400 mt-1">{selectedContractor.tagline}</p>
                  )}
                  
                  <div className="mt-2 space-y-1">
                    {selectedContractor.location && (
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">{selectedContractor.location}</span>
                      </div>
                    )}
                    {selectedContractor.phone && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">{selectedContractor.phone}</span>
                      </div>
                    )}
                    {selectedContractor.email && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">{selectedContractor.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedContractor.listing_status)}`}>
                    {selectedContractor.listing_status?.replace('_', ' ').toUpperCase() || 'UNKNOWN'}
                  </div>
                  {selectedContractor.user_id?.full_name && (
                    <div className="text-sm text-slate-400 mt-2">
                      User: {selectedContractor.user_id.full_name}
                    </div>
                  )}
                  <div className="text-sm text-slate-400 mt-1">
                    ID: {selectedContractor.id.substring(0, 8)}...
                  </div>
                </div>
              </div>

              {/* Bio */}
              {selectedContractor.bio && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-amber-400 mb-2">Bio</h5>
                  <p className="text-slate-300 whitespace-pre-line">{selectedContractor.bio}</p>
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Specialties */}
                {selectedContractor.specialties && selectedContractor.specialties.length > 0 && (
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h5 className="font-semibold text-amber-400 mb-2">Specialties</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedContractor.specialties.map((specialty, index) => (
                        <span key={index} className="bg-slate-600 text-slate-300 px-2 py-1 rounded text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {selectedContractor.certifications && selectedContractor.certifications.length > 0 && (
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h5 className="font-semibold text-amber-400 mb-2">Certifications</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedContractor.certifications.map((cert, index) => (
                        <span key={index} className="bg-slate-600 text-slate-300 px-2 py-1 rounded text-xs flex items-center space-x-1">
                          <Shield className="w-3 h-3 text-amber-400" />
                          <span>{cert}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Business Details */}
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-amber-400 mb-2">Business Details</h5>
                  <div className="space-y-2 text-sm">
                    {selectedContractor.license_number && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">License:</span>
                        <span className="text-white">{selectedContractor.license_number}</span>
                      </div>
                    )}
                    {selectedContractor.years_experience !== null && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Experience:</span>
                        <span className="text-white">{selectedContractor.years_experience} years</span>
                      </div>
                    )}
                    {selectedContractor.insurance_info && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Insurance:</span>
                        <span className="text-white">{selectedContractor.insurance_info}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-400">Booking Enabled:</span>
                      <span className="text-white">{selectedContractor.allow_booking !== false ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                {/* Service Regions */}
                {selectedContractor.service_regions && selectedContractor.service_regions.length > 0 && (
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h5 className="font-semibold text-amber-400 mb-2">Service Regions</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedContractor.service_regions.map((region, index) => (
                        <span key={index} className="bg-slate-600 text-slate-300 px-2 py-1 rounded text-xs flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{region}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Media Preview */}
              {(selectedContractor.feature_media_url || 
                (selectedContractor.carousel_media_urls && selectedContractor.carousel_media_urls.length > 0)) && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-amber-400 mb-4">Media Gallery</h5>
                  
                  {selectedContractor.feature_media_url && (
                    <div className="mb-4">
                      <p className="text-sm text-slate-400 mb-2">Featured Image:</p>
                      <img 
                        src={selectedContractor.feature_media_url} 
                        alt="Featured banner" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  {selectedContractor.carousel_media_urls && selectedContractor.carousel_media_urls.length > 0 && (
                    <div>
                      <p className="text-sm text-slate-400 mb-2">Gallery Images:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedContractor.carousel_media_urls.map((url, index) => (
                          <img 
                            key={index}
                            src={url} 
                            alt={`Gallery image ${index + 1}`} 
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 text-sm text-slate-400">
                    Media Approved: {selectedContractor.media_approved !== false ? 'Yes' : 'No'}
                  </div>
                </div>
              )}

              {/* Social Media */}
              {(selectedContractor.social_facebook || 
                selectedContractor.social_instagram || 
                selectedContractor.social_linkedin || 
                selectedContractor.social_youtube) && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-amber-400 mb-2">Social Media</h5>
                  <div className="flex flex-wrap gap-4">
                    {selectedContractor.social_facebook && (
                      <a 
                        href={selectedContractor.social_facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>
                    )}
                    {selectedContractor.social_instagram && (
                      <a 
                        href={selectedContractor.social_instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white p-2 rounded-lg transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {selectedContractor.social_linkedin && (
                      <a 
                        href={selectedContractor.social_linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-lg transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {selectedContractor.social_youtube && (
                      <a 
                        href={selectedContractor.social_youtube} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                      >
                        <Youtube className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* SEO Info */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="font-semibold text-amber-400 mb-2">SEO Information</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">URL Slug:</span>
                    <span className="text-white">{selectedContractor.slug || 'Auto-generated'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Meta Title:</span>
                    <span className="text-white">{selectedContractor.meta_title || 'Not set'}</span>
                  </div>
                  {selectedContractor.meta_description && (
                    <div>
                      <span className="text-slate-400">Meta Description:</span>
                      <p className="text-white mt-1">{selectedContractor.meta_description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4 pt-6 border-t border-slate-700">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditContractor(selectedContractor);
                  }}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Contractor</span>
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

export default ContractorManagement;