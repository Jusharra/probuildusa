import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Globe, Star, Shield, Award, 
  Calendar, CheckCircle, ArrowRight, Facebook, Instagram, 
  Linkedin, Youtube, ExternalLink, ChevronLeft, ChevronRight,
  X, AlertCircle
} from 'lucide-react';
import { ContractorService } from '../services/contractorService';
import { BookingService } from '../services/bookingService';

const ContractorProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [contractor, setContractor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingStatus, setBookingStatus] = useState<'success' | 'error' | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const loadContractor = async () => {
      try {
        setLoading(true);
        if (!slug) {
          setError('Contractor not found');
          return;
        }
        
        const data = await ContractorService.getContractorBySlug(slug);
        if (!data) {
          setError('Contractor not found');
          return;
        }
        
        setContractor(data);
      } catch (err) {
        console.error('Error loading contractor:', err);
        setError('Failed to load contractor profile');
      } finally {
        setLoading(false);
      }
    };
    
    loadContractor();
  }, [slug]);

  const handleScheduleConsultation = async () => {
    if (!contractor || !contractor.id) {
      setBookingMessage('Unable to schedule consultation. Contractor information is missing.');
      setBookingStatus('error');
      setShowBookingConfirmation(true);
      return;
    }

    try {
      setIsBooking(true);
      // Create a new booking
      const booking = await BookingService.createBooking({
        contractor_id: contractor.id,
        booking_type: 'consultation',
        scheduled_at: new Date().toISOString(), // Current time as placeholder
        status: 'pending',
        notes: 'Consultation requested from public profile. Please contact the client to schedule a specific time.'
      });

      setBookingMessage('Your consultation request has been sent! The contractor will contact you soon to confirm the details.');
      setBookingStatus('success');
      setShowBookingConfirmation(true);
    } catch (err) {
      console.error('Error scheduling consultation:', err);
      setBookingMessage('Failed to schedule consultation. Please try again or contact us directly.');
      setBookingStatus('error');
      setShowBookingConfirmation(true);
    } finally {
      setIsBooking(false);
    }
  };

  const nextImage = () => {
    if (contractor?.carousel_media_urls?.length) {
      setActiveImageIndex((prevIndex) => 
        prevIndex === contractor.carousel_media_urls.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (contractor?.carousel_media_urls?.length) {
      setActiveImageIndex((prevIndex) => 
        prevIndex === 0 ? contractor.carousel_media_urls.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-slate-400">Loading profile...</span>
      </div>
    );
  }

  if (error || !contractor) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Contractor Not Found</h1>
          <p className="text-slate-400 mb-6">The contractor profile you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/contractors"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Browse All Contractors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          {/* Feature Image */}
          <div className="h-80 relative">
            {contractor.feature_media_url ? (
              <img 
                src={contractor.feature_media_url} 
                alt={`${contractor.company_name} featured image`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-700 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-500">{contractor.company_name}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          </div>

          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-start space-x-6">
              {contractor.profile_image_url ? (
                <img
                  src={contractor.profile_image_url}
                  alt={contractor.company_name}
                  className="w-24 h-24 rounded-xl object-cover border-4 border-slate-800"
                />
              ) : (
                <div className="w-24 h-24 bg-slate-700 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-500">{contractor.company_name.charAt(0)}</span>
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold">{contractor.company_name}</h1>
                  {contractor.featured_profile && (
                    <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-2 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </span>
                  )}
                </div>
                
                {contractor.tagline && (
                  <p className="text-amber-400 text-lg mb-3">{contractor.tagline}</p>
                )}
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                  {contractor.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{contractor.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span>4.9 (127 reviews)</span>
                  </div>
                  
                  {contractor.years_experience > 0 && (
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4 text-slate-400" />
                      <span>{contractor.years_experience}+ years experience</span>
                    </div>
                  )}
                </div>
              </div>
              
              <Link
                to="/get-started"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Request Quote</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold mb-4">About {contractor.company_name}</h2>
              {contractor.bio ? (
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">{contractor.bio}</p>
              ) : (
                <p className="text-slate-400 italic">No company description available.</p>
              )}
            </div>

            {/* Specialties */}
            {contractor.specialties && contractor.specialties.length > 0 && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-3">
                  {contractor.specialties.map((specialty: string, index: number) => (
                    <span
                      key={index}
                      className="bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Image Gallery/Carousel */}
            {contractor.carousel_media_urls && contractor.carousel_media_urls.length > 0 && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
                <div className="relative">
                  <div className="relative h-80 rounded-lg overflow-hidden">
                    <img 
                      src={contractor.carousel_media_urls[activeImageIndex]} 
                      alt={`${contractor.company_name} project ${activeImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {contractor.carousel_media_urls.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      
                      <div className="flex justify-center mt-4 space-x-2">
                        {contractor.carousel_media_urls.map((_, index: number) => (
                          <button
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`w-3 h-3 rounded-full ${
                              index === activeImageIndex ? 'bg-amber-400' : 'bg-slate-600'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Certifications */}
            {contractor.certifications && contractor.certifications.length > 0 && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold mb-4">Certifications & Credentials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contractor.certifications.map((certification: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span className="text-slate-300">{certification}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Service Areas */}
            {contractor.service_regions && contractor.service_regions.length > 0 && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold mb-4">Service Areas</h2>
                <div className="flex flex-wrap gap-3">
                  {contractor.service_regions.map((region: string, index: number) => (
                    <span
                      key={index}
                      className="bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
                    >
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span>{region}</span>
                    </span>
                  ))}
                </div>
                
                {contractor.google_maps_embed_url && (
                  <div className="mt-6 rounded-lg overflow-hidden h-64">
                    <iframe
                      src={contractor.google_maps_embed_url}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${contractor.company_name} location map`}
                    ></iframe>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                {contractor.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-slate-400">Phone</div>
                      <a href={`tel:${contractor.phone}`} className="text-white hover:text-amber-400 transition-colors">
                        {contractor.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {contractor.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-slate-400">Email</div>
                      <a href={`mailto:${contractor.email}`} className="text-white hover:text-amber-400 transition-colors">
                        {contractor.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {contractor.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-slate-400">Website</div>
                      <a 
                        href={contractor.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white hover:text-amber-400 transition-colors flex items-center space-x-1"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
                
                {contractor.address && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-slate-400">Address</div>
                      <div className="text-white">{contractor.address}</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-700">
                <Link
                  to="/get-started"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Social Media */}
            {(contractor.social_facebook || contractor.social_instagram || contractor.social_linkedin || contractor.social_youtube) && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-bold mb-4">Connect With Us</h2>
                <div className="flex flex-wrap gap-4">
                  {contractor.social_facebook && (
                    <a 
                      href={contractor.social_facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  
                  {contractor.social_instagram && (
                    <a 
                      href={contractor.social_instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white p-3 rounded-lg transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  
                  {contractor.social_linkedin && (
                    <a 
                      href={contractor.social_linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-lg transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  
                  {contractor.social_youtube && (
                    <a 
                      href={contractor.social_youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-colors"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Credentials */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4">Credentials</h2>
              <div className="space-y-4">
                {contractor.license_number && (
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-slate-400">License Number</div>
                      <div className="text-white">{contractor.license_number}</div>
                    </div>
                  </div>
                )}
                
                {contractor.years_experience > 0 && (
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-slate-400">Experience</div>
                      <div className="text-white">{contractor.years_experience} years</div>
                    </div>
                  </div>
                )}
                
                {contractor.insurance_info && (
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-slate-400">Insurance</div>
                      <div className="text-white">{contractor.insurance_info}</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-semibold">Verified Contractor</span>
                </div>
              </div>
            </div>

            {/* Book Appointment */}
            {contractor.allow_booking && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-bold mb-4">Book a Consultation</h2>
                <p className="text-slate-300 mb-4">
                  Schedule a free consultation to discuss your project needs.
                </p>
                <button 
                  onClick={handleScheduleConsultation}
                  disabled={isBooking}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-slate-500 disabled:to-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  {isBooking ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      <span>Schedule Now</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showBookingConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Booking Request</h3>
              <button
                onClick={() => setShowBookingConfirmation(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                bookingStatus === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                {bookingStatus === 'success' ? (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-400" />
                )}
              </div>
              <p className={`text-lg ${bookingStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {bookingStatus === 'success' ? 'Success!' : 'Error'}
              </p>
              <p className="text-slate-300 mt-2">{bookingMessage}</p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => setShowBookingConfirmation(false)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractorProfilePage;