import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ContractorService } from '../services/contractorService';
import { AuthService } from '../services/authService';
import FileUpload from '../components/FileUpload';
import {
  User, Mail, Building2, Phone, Globe,
  Award, Shield, Save, X, AlertCircle, Loader2, Image,
  CheckCircle, MapPin, Trash2, Plus, ExternalLink, Lock
} from 'lucide-react';

const ProfileSettingsPage: React.FC = () => {
  const { user, profile, updateProfile: updateAuthProfile, isLoading: authLoading } = useAuth();
  const [contractor, setContractor] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    profile_image_url: '',
    company_name: '',
    bio: '',
    location: '',
    website: '',
    phone: '',
    specialties: [] as string[],
    listing_status: 'pending_review',
    featured_profile: false,
    tagline: '',
    license_number: '',
    years_experience: 0,
    certifications: [] as string[],
    insurance_info: '',
    allow_booking: true,
    feature_media_url: '',
    carousel_media_urls: [] as string[]
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [emailUpdateLoading, setEmailUpdateLoading] = useState(false);
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [isCreatingContractor, setIsCreatingContractor] = useState(false);

  const specialtyOptions = [
    'Luxury Remodeling', 'Custom Homes', 'ADUs', 'Commercial Build-Outs',
    'Outdoor Living', 'Solar + Smart Home', 'Foundation Repairs',
    'Medical Facilities', 'Restoration', 'Multifamily'
  ];

  const certificationOptions = [
    'Licensed General Contractor',
    'LEED Certified',
    'EPA Lead-Safe Certified',
    'NAHB Certified',
    'Energy Star Partner',
    'OSHA Safety Certified',
    'Green Building Professional',
    'Master Electrician',
    'Master Plumber'
  ];

  useEffect(() => {
    const loadData = async () => {
      if (authLoading) return;

      if (!user || !profile) {
        setLoading(false);
        return;
      }

      setFormData(prev => ({
        ...prev,
        full_name: profile.full_name || '',
        email: profile.email || '',
        profile_image_url: profile.profile_image_url || '',
      }));

      if (profile.role === 'professional') {
        try {
          const contractorData = await ContractorService.getContractorByUserId(user.id);
          setContractor(contractorData);
          if (contractorData) {
            setFormData(prev => ({
              ...prev,
              company_name: contractorData.company_name || '',
              bio: contractorData.bio || '',
              location: contractorData.location || '',
              website: contractorData.website || '',
              phone: contractorData.phone || '',
              specialties: contractorData.specialties || [],
              listing_status: contractorData.listing_status || 'pending_review',
              featured_profile: contractorData.featured_profile || false,
              tagline: contractorData.tagline || '',
              license_number: contractorData.license_number || '',
              years_experience: contractorData.years_experience || 0,
              certifications: contractorData.certifications || [],
              insurance_info: contractorData.insurance_info || '',
              allow_booking: contractorData.allow_booking !== false,
              feature_media_url: contractorData.feature_media_url || '',
              carousel_media_urls: contractorData.carousel_media_urls || []
            }));
          }
        } catch (err) {
          console.error('Error loading contractor data:', err);
          setError('Failed to load contractor profile.');
        }
      }
      setLoading(false);
    };

    loadData();
  }, [user, profile, authLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) || 0 : value,
    });
  };

  const handleSpecialtyChange = (specialty: string, isChecked: boolean) => {
    setFormData(prev => {
      const currentSpecialties = [...prev.specialties];
      if (isChecked) {
        if (!currentSpecialties.includes(specialty)) {
          currentSpecialties.push(specialty);
        }
      } else {
        const index = currentSpecialties.indexOf(specialty);
        if (index !== -1) {
          currentSpecialties.splice(index, 1);
        }
      }
      return { ...prev, specialties: currentSpecialties };
    });
  };

  const handleCertificationChange = (certification: string, isChecked: boolean) => {
    setFormData(prev => {
      const currentCertifications = [...prev.certifications];
      if (isChecked) {
        if (!currentCertifications.includes(certification)) {
          currentCertifications.push(certification);
        }
      } else {
        const index = currentCertifications.indexOf(certification);
        if (index !== -1) {
          currentCertifications.splice(index, 1);
        }
      }
      return { ...prev, certifications: currentCertifications };
    });
  };

  const handleProfileImageUploadSuccess = async (upload: any) => {
    if (user) {
      try {
        await updateAuthProfile({ profile_image_url: upload.file_url });
        setFormData(prev => ({ ...prev, profile_image_url: upload.file_url }));
        setSuccess('Profile image updated successfully!');
      } catch (err) {
        console.error('Error updating profile image URL:', err);
        setError('Failed to update profile image URL.');
      }
    }
  };

  const handleFeatureImageUploadSuccess = (upload: any) => {
    setFormData(prev => ({ ...prev, feature_media_url: upload.file_url }));
    setSuccess('Feature image uploaded successfully!');
  };

  const handleCarouselImageUploadSuccess = (upload: any) => {
    setFormData(prev => {
      const newUrls = [...prev.carousel_media_urls, upload.file_url];
      return { ...prev, carousel_media_urls: newUrls };
    });
    setSuccess('Carousel image uploaded successfully!');
  };

  const handleRemoveCarouselImage = (index: number) => {
    setFormData(prev => {
      const newUrls = [...prev.carousel_media_urls];
      newUrls.splice(index, 1);
      return { ...prev, carousel_media_urls: newUrls };
    });
  };

  const createInitialContractorProfile = async () => {
    if (!user || !profile || profile.role !== 'professional' || contractor) {
      return null;
    }

    setIsCreatingContractor(true);
    setError(null);
    
    try {
      // Create a basic contractor profile with just the required fields
      const newContractor = await ContractorService.createContractor({
        user_id: user.id,
        company_name: formData.company_name || 'My Company',
        email: profile.email,
        listing_status: 'pending_review'
      });
      
      setContractor(newContractor);
      setSuccess('Contractor profile created! You can now upload images and complete your profile.');
      return newContractor;
    } catch (err: any) {
      console.error('Error creating initial contractor profile:', err);
      setError(err.message || 'Failed to create contractor profile. Please try again.');
      return null;
    } finally {
      setIsCreatingContractor(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    if (!user || !profile) {
      setError('User not authenticated.');
      setSubmitting(false);
      return;
    }

    try {
      // Check if email has changed
      const emailChanged = formData.email !== profile.email;
      
      if (emailChanged) {
        // Update email via auth service
        await AuthService.updateUserEmail(formData.email);
        setSuccess('Email update initiated. Please check your new email address for a confirmation link.');
      }

      // Update user profile (full_name, profile_image_url, email)
      const profileUpdates: any = {
        full_name: formData.full_name,
        profile_image_url: formData.profile_image_url,
      };
      
      // Only update email in profile if it has changed
      if (emailChanged) {
        profileUpdates.email = formData.email;
      }
      
      await updateAuthProfile(profileUpdates);

      // Update contractor profile if applicable
      if (profile.role === 'professional') {
        let currentContractor = contractor;
        
        // If no contractor exists yet, create one first
        if (!currentContractor) {
          currentContractor = await createInitialContractorProfile();
          if (!currentContractor) {
            setSubmitting(false);
            return; // Error already set in createInitialContractorProfile
          }
        }
        
        // Now update the contractor with all form data
        await ContractorService.updateContractor(currentContractor.id, {
          company_name: formData.company_name,
          bio: formData.bio,
          location: formData.location,
          website: formData.website,
          phone: formData.phone,
          specialties: formData.specialties,
          tagline: formData.tagline,
          license_number: formData.license_number,
          years_experience: formData.years_experience,
          certifications: formData.certifications,
          insurance_info: formData.insurance_info,
          allow_booking: formData.allow_booking,
          feature_media_url: formData.feature_media_url,
          carousel_media_urls: formData.carousel_media_urls
        });
      }

      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setError(err.message || 'Failed to save profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.email) {
      setError('Please enter your email address first.');
      return;
    }

    setPasswordResetLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await AuthService.resetPassword(formData.email);
      setSuccess('Password reset email sent! Check your inbox for instructions.');
    } catch (error: any) {
      console.error('Password reset error:', error);
      setError(error.message || 'Failed to send password reset email. Please try again.');
    } finally {
      setPasswordResetLoading(false);
    }
  };

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

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'paused':
        return <AlertCircle className="w-4 h-4" />;
      case 'inactive':
        return <X className="w-4 h-4" />;
      case 'pending_review':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Function to check if we can proceed to media tab
  const canAccessMediaTab = () => {
    return !!contractor || profile?.role === 'admin';
  };

  // Function to create contractor profile if needed before accessing media tab
  const handleMediaTabClick = async () => {
    if (profile?.role === 'professional' && !contractor) {
      // Check if we have the minimum required fields
      if (!formData.company_name) {
        setError('Please enter your company name before uploading media.');
        setActiveTab('company');
        return;
      }
      
      // Create initial contractor profile
      const newContractor = await createInitialContractorProfile();
      if (newContractor) {
        setActiveTab('media');
      }
    } else {
      setActiveTab('media');
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-slate-400 mb-6">You need to be logged in to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-green-400 text-sm">{success}</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-slate-700 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 px-4 font-medium text-sm transition-colors ${
              activeTab === 'general'
                ? 'border-b-2 border-amber-400 text-amber-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            General Information
          </button>
          {profile.role === 'professional' && (
            <>
              <button
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
                onClick={handleMediaTabClick}
                className={`py-3 px-4 font-medium text-sm transition-colors ${
                  activeTab === 'media'
                    ? 'border-b-2 border-amber-400 text-amber-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                Media & Images
              </button>
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Information Tab */}
          {activeTab === 'general' && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-6">General Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Your full name"
                    required
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
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Your email"
                    required
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Changing your email will require confirmation via your new email address.
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <Image className="w-4 h-4 inline mr-1" />
                    Profile Image
                  </label>
                  <div className="flex items-center space-x-4">
                    {formData.profile_image_url ? (
                      <img
                        src={formData.profile_image_url}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-slate-600"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 text-sm">
                        No Image
                      </div>
                    )}
                    <FileUpload
                      relatedTo="profiles"
                      relatedId={user.id}
                      onUploadSuccess={handleProfileImageUploadSuccess}
                      maxFiles={1}
                      allowedFileTypes={['image/*']}
                      maxSizeMB={2}
                      label="Upload New Image"
                      description="PNG, JPG, GIF up to 2MB"
                      bucketName="uploads"
                    />
                  </div>
                </div>
                
                {/* Account Security Section */}
                <div className="md:col-span-2">
                  <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                    <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Account Security</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-300 mb-2">Password</h4>
                        <p className="text-slate-400 text-sm mb-3">
                          Reset your password to update your login credentials. A reset link will be sent to your email address.
                        </p>
                        <button
                          type="button"
                          onClick={handlePasswordReset}
                          disabled={passwordResetLoading || !formData.email}
                          className="bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 disabled:text-slate-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 disabled:cursor-not-allowed"
                        >
                          {passwordResetLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Sending Reset Email...</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4" />
                              <span>Reset Password</span>
                            </>
                          )}
                        </button>
                      </div>
                      
                      <div className="pt-3 border-t border-slate-600">
                        <div className="flex items-start space-x-3">
                          <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-amber-400 text-sm mb-1">Security Notice</h4>
                            <p className="text-slate-400 text-xs">
                              Email changes require confirmation. Password resets are sent to your current email address.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Company Information Tab */}
          {activeTab === 'company' && profile.role === 'professional' && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-6">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <Building2 className="w-4 h-4 inline mr-1" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Your company name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="https://yourcompany.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Brief tagline or motto"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    License Number
                  </label>
                  <input
                    type="text"
                    name="license_number"
                    value={formData.license_number}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Your contractor license number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="years_experience"
                    value={formData.years_experience}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Insurance Information
                  </label>
                  <input
                    type="text"
                    name="insurance_info"
                    value={formData.insurance_info}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Insurance provider and policy details"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Tell us about your company and services..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Listing Status
                  </label>
                  <div className={`px-3 py-2 rounded-lg ${getStatusColor(formData.listing_status)}`}>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(formData.listing_status)}
                      <span className="font-semibold capitalize">
                        {formData.listing_status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Your listing status determines your visibility and lead eligibility. Contact support to change.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Specialties Tab */}
          {activeTab === 'specialties' && profile.role === 'professional' && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-6">Specialties & Certifications</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <Award className="w-4 h-4 inline mr-1" />
                    Specialties
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {specialtyOptions.map(specialty => (
                      <label key={specialty} className="flex items-center space-x-2 text-slate-300 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.specialties.includes(specialty)}
                          onChange={(e) => handleSpecialtyChange(specialty, e.target.checked)}
                          className="w-4 h-4 text-amber-400 bg-slate-700 border-slate-600 rounded focus:ring-amber-400"
                        />
                        <span>{specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Certifications
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {certificationOptions.map(certification => (
                      <label key={certification} className="flex items-center space-x-2 text-slate-300 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.certifications.includes(certification)}
                          onChange={(e) => handleCertificationChange(certification, e.target.checked)}
                          className="w-4 h-4 text-amber-400 bg-slate-700 border-slate-600 rounded focus:ring-amber-400"
                        />
                        <span>{certification}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="allow_booking"
                    name="allow_booking"
                    checked={formData.allow_booking}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-amber-400 bg-slate-700 border-slate-600 rounded focus:ring-amber-400"
                  />
                  <label htmlFor="allow_booking" className="text-slate-300 font-medium">
                    Allow clients to book appointments with me
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Media & Images Tab */}
          {activeTab === 'media' && profile.role === 'professional' && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-6">Media & Images</h2>
              
              {!contractor && (
                <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <p className="text-amber-400 text-sm">
                      You need to save your basic company information before uploading images. 
                      Please fill out the Company Details tab and save your profile first.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="space-y-8">
                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <Image className="w-4 h-4 inline mr-1" />
                    Featured Image (Banner)
                  </label>
                  <p className="text-sm text-slate-400 mb-4">
                    This image will be displayed as the main banner on your profile page. Recommended size: 1920x800px.
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
                        <ExternalLink className="w-4 h-4" />
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
                  
                  {contractor && (
                    <FileUpload
                      relatedTo="contractor_feature_image"
                      relatedId={contractor.id}
                      onUploadSuccess={handleFeatureImageUploadSuccess}
                      maxFiles={1}
                      allowedFileTypes={['image/*']}
                      maxSizeMB={5}
                      label="Upload Featured Image"
                      description="Upload a high-quality banner image for your profile"
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
                    These images will be displayed in the image carousel on your profile page. Recommended size: 600x400px.
                  </p>
                  
                  {formData.carousel_media_urls.length > 0 ? (
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
                      
                      {/* Add more placeholder */}
                      <div className="w-full h-32 bg-slate-700/50 border border-slate-600 border-dashed rounded-lg flex flex-col items-center justify-center text-slate-400">
                        <Plus className="w-6 h-6 mb-1" />
                        <span className="text-xs">Add more images</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-32 bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-slate-500">No gallery images</span>
                    </div>
                  )}
                  
                  {contractor && (
                    <FileUpload
                      relatedTo="contractor_gallery_image"
                      relatedId={contractor.id}
                      onUploadSuccess={handleCarouselImageUploadSuccess}
                      maxFiles={10}
                      allowedFileTypes={['image/*']}
                      maxSizeMB={3}
                      label="Upload Gallery Image"
                      description="Upload images of your projects for the gallery carousel"
                      bucketName="uploads"
                    />
                  )}
                  
                  <p className="text-xs text-slate-500 mt-2">
                    You can upload up to 10 images for your gallery carousel. Each image should be less than 3MB.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
            <button
              type="button"
              onClick={() => {
                // Reset form to initial loaded state
                setLoading(true); // Trigger reload of data
                setError(null);
                setSuccess(null);
              }}
              className="border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={submitting || isCreatingContractor}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-600 disabled:to-slate-600 text-slate-900 disabled:text-slate-400 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {submitting || isCreatingContractor ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isCreatingContractor ? 'Creating Profile...' : 'Saving...'}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;