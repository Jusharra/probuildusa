import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, DollarSign, Phone, Mail, Eye, Filter, Search, Grid, List, Award, Shield, Users, TrendingUp, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { ContractorService, Contractor } from '../services/contractorService';

const ContractorDirectory: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [contractors, setContractors] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    location: '',
    specialty: '',
    priceRange: '',
    rating: '',
    searchTerm: ''
  });

  useEffect(() => {
    loadContractors();
  }, []);

  const loadContractors = async () => {
    try {
      const contractorsData = await ContractorService.getContractors({
        listing_status: 'active'
      });
      setContractors(contractorsData || []);
    } catch (error) {
      console.error('Error loading contractors:', error);
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = !filters.searchTerm || 
      contractor.company_name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      contractor.specialties?.some((specialty: string) => 
        specialty.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    
    const matchesLocation = !filters.location || 
      contractor.location?.toLowerCase().includes(filters.location.toLowerCase()) ||
      contractor.service_regions?.some((region: string) => 
        region.toLowerCase().includes(filters.location.toLowerCase())
      );
    
    const matchesSpecialty = !filters.specialty || 
      contractor.specialties?.includes(filters.specialty);
    
    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  const featuredContractors = filteredContractors.filter(c => c.featured_profile);
  const regularContractors = filteredContractors.filter(c => !c.featured_profile);

  const specialties = [
    'Luxury Remodeling',
    'ADUs',
    'Commercial Build-Outs',
    'Custom Homes',
    'Outdoor Living',
    'Solar + Smart Home',
    'Foundation Repairs',
    'Medical Facilities',
    'Restoration',
    'Multifamily'
  ];

  const locations = [
    'Beverly Hills, CA',
    'Austin, TX',
    'Seattle, WA',
    'San Francisco, CA',
    'Miami, FL',
    'New York, NY',
    'Denver, CO',
    'Phoenix, AZ'
  ];

  const renderContractorCard = (contractor: any) => {
    // Only create profile URL if slug exists
    const hasValidSlug = contractor.slug && typeof contractor.slug === 'string';
    const profileUrl = hasValidSlug ? `/contractors/${contractor.slug}` : '';
    
    if (viewMode === 'list') {
      return (
        <div key={contractor.id} className="bg-slate-800 rounded-xl border border-slate-700 hover:border-amber-400/50 transition-all duration-300">
          <div className="p-6">
            <div className="flex items-start space-x-6">
              {contractor.profile_image_url && (
                <img
                  src={contractor.profile_image_url}
                  alt={contractor.company_name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
              )}
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      {hasValidSlug ? (
                        <Link to={profileUrl}>
                          <h3 className="text-xl font-bold text-white hover:text-amber-400 transition-colors">
                            {contractor.company_name}
                          </h3>
                        </Link>
                      ) : (
                        <h3 className="text-xl font-bold text-white">
                          {contractor.company_name}
                        </h3>
                      )}
                      {contractor.featured_profile && (
                        <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-2 py-1 rounded-full text-xs font-bold">
                          FEATURED
                        </span>
                      )}
                    </div>
                    {contractor.tagline && (
                      <p className="text-amber-400 mb-2">{contractor.tagline}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{contractor.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span>4.8 (127 reviews)</span>
                      </div>
                      {contractor.years_experience > 0 && (
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{contractor.years_experience}+ years</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {contractor.bio && (
                  <p className="text-slate-300 mb-4 leading-relaxed line-clamp-2">{contractor.bio}</p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {contractor.specialties?.slice(0, 4).map((specialty: string, index: number) => (
                    <span
                      key={index}
                      className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                  {contractor.specialties?.length > 4 && (
                    <span className="text-slate-400 text-sm px-3 py-1">
                      +{contractor.specialties.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Licensed & Insured</span>
                  </span>
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>Background Verified</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    {contractor.phone && (
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{contractor.phone}</span>
                      </div>
                    )}
                    {contractor.email && (
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{contractor.email}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    {hasValidSlug ? (
                      <Link
                        to={profileUrl}
                        className="flex items-center space-x-1 text-slate-400 hover:text-amber-400 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Profile</span>
                      </Link>
                    ) : (
                      <span className="flex items-center space-x-1 text-slate-500 cursor-not-allowed">
                        <Eye className="w-4 h-4" />
                        <span>Profile Unavailable</span>
                      </span>
                    )}
                    <Link
                      to="/get-started"
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-1"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={contractor.id} className="group bg-slate-800 rounded-xl border border-slate-700 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
        {contractor.featured_profile && (
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 text-center py-2 font-bold text-sm">
            ⭐ FEATURED CONTRACTOR
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            {contractor.profile_image_url && (
              <img
                src={contractor.profile_image_url}
                alt={contractor.company_name}
                className="w-16 h-16 rounded-xl object-cover"
              />
            )}
            <div className="flex-1">
              {hasValidSlug ? (
                <Link to={profileUrl}>
                  <h3 className="text-xl font-bold text-white mb-1 hover:text-amber-400 transition-colors">
                    {contractor.company_name}
                  </h3>
                </Link>
              ) : (
                <h3 className="text-xl font-bold text-white mb-1">
                  {contractor.company_name}
                </h3>
              )}
              {contractor.tagline && (
                <p className="text-amber-400 text-sm mb-2">{contractor.tagline}</p>
              )}
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                <span className="text-amber-400 font-semibold">4.8</span>
                <span className="text-slate-400 text-sm">(127)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-slate-400 mb-3">
            <MapPin className="w-4 h-4" />
            <span>{contractor.location}</span>
          </div>

          {contractor.years_experience > 0 && (
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-amber-400">{contractor.years_experience}+</div>
              <div className="text-sm text-slate-400">Years Experience</div>
            </div>
          )}

          {contractor.bio && (
            <p className="text-slate-300 text-sm mb-4 leading-relaxed line-clamp-3">
              {contractor.bio}
            </p>
          )}

          <div className="flex flex-wrap gap-1 mb-4">
            {contractor.specialties?.slice(0, 3).map((specialty: string, index: number) => (
              <span
                key={index}
                className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs"
              >
                {specialty}
              </span>
            ))}
            {contractor.specialties?.length > 3 && (
              <span className="text-slate-400 text-xs px-2 py-1">
                +{contractor.specialties.length - 3} more
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <span>Licensed</span>
            </span>
            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Insured</span>
            </span>
          </div>

          {contractor.carousel_media_urls && contractor.carousel_media_urls.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {contractor.carousel_media_urls.slice(0, 3).map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${contractor.company_name} work ${index + 1}`}
                  className="w-full h-16 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <div className="space-y-2">
            {hasValidSlug ? (
              <Link
                to={profileUrl}
                className="w-full flex items-center justify-center space-x-1 text-slate-400 hover:text-amber-400 transition-colors py-2 border border-slate-600 hover:border-amber-400 rounded-lg"
              >
                <Eye className="w-4 h-4" />
                <span>View Full Profile</span>
              </Link>
            ) : (
              <button
                disabled
                className="w-full flex items-center justify-center space-x-1 text-slate-500 py-2 border border-slate-700 rounded-lg cursor-not-allowed"
              >
                <Eye className="w-4 h-4" />
                <span>Profile Unavailable</span>
              </button>
            )}
            <Link
              to="/get-started"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-1"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Premium Contractors</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Connect with vetted, high-ticket construction specialists in your area. Every contractor is licensed, insured, and proven to deliver exceptional results.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search contractors or specialties..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
            </div>

            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <select
              value={filters.specialty}
              onChange={(e) => handleFilterChange('specialty', e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>

            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="">All Ratings</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-slate-400">
              Showing {filteredContractors.length} contractors
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-amber-500 text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-amber-500 text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Contractors */}
        {featuredContractors.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <Award className="w-6 h-6 text-amber-400" />
              <span>Featured Contractors</span>
            </h2>
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {featuredContractors.map(renderContractorCard)}
            </div>
          </div>
        )}

        {/* All Contractors */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">All Contractors</h2>
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {regularContractors.map(renderContractorCard)}
          </div>
        </div>

        {/* CTA for Contractors */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 text-center">
          <h3 className="text-2xl font-bold mb-4">Are You a High-Ticket Contractor?</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Join our exclusive network of premium contractors and get access to qualified leads from serious clients with real budgets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-amber-400">$99-$399</div>
              <div className="text-sm text-slate-400">Monthly Listing Fee</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">5-8%</div>
              <div className="text-sm text-slate-400">Success Fee</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">$25K+</div>
              <div className="text-sm text-slate-400">Average Project</div>
            </div>
          </div>
          <Link
            to="/why-partner"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Join Our Network</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContractorDirectory;