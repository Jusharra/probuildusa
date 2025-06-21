import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, MapPin, DollarSign, Calendar, User, Phone, Mail } from 'lucide-react';
import { LeadService } from '../services/leadService';
import { useAuth } from '../contexts/AuthContext';
import FileUpload from '../components/FileUpload';

const LeadIntake: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const contractorId = searchParams.get('contractorId');
  const source = searchParams.get('source') || 'website_form';
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tempLeadId, setTempLeadId] = useState(`temp-${Date.now()}`);
  const [formData, setFormData] = useState({
    // Step 1: Project Type
    projectType: '',
    projectDescription: '',
    
    // Step 2: Location & Budget
    address: '',
    city: '',
    state: '',
    zip: '',
    budget: '',
    budgetFlexible: false,
    
    // Step 3: Timeline & Details
    timeline: '',
    startDate: '',
    urgency: '',
    permits: '',
    
    // Step 4: Project Details
    projectSize: '',
    currentCondition: '',
    specialRequirements: '',
    inspirationImages: [],
    
    // Step 5: Contact Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bestTimeToCall: '',
    preferredContact: '',
    
    // Step 6: Financing
    needsFinancing: '',
    creditScore: '',
    downPayment: ''
  });

  const totalSteps = 6;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleUploadSuccess = (upload: any) => {
    console.log('File uploaded successfully:', upload);
  };

  const handleUploadError = (error: string) => {
    console.error('File upload error:', error);
    alert(`Upload error: ${error}`);
  };

  const submitForm = async () => {
    try {
      setLoading(true);
      
      // Convert budget string to number
      const budgetValue = formData.budget.replace(/[^0-9]/g, '');
      const budgetNumber = budgetValue ? parseInt(budgetValue) : null;
      
      // Create lead object
      const leadData = {
        client_name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        email: formData.email,
        project_type: formData.projectType,
        zip_code: formData.zip,
        budget: budgetNumber,
        timeline: formData.timeline,
        description: formData.projectDescription,
        source: source,
        status: 'new',
        assigned_contractor_id: contractorId || null
      };

      // Submit to database
      const createdLead = await LeadService.createLead(leadData);
      
      // Show success message and redirect
      alert('Thank you! Your project has been submitted. We\'ll connect you with qualified contractors within 24 hours.');
      navigate('/');
      
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('There was an error submitting your project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const projectTypes = [
    { id: 'luxury-remodel', name: 'Luxury Home Remodeling', icon: '🏠' },
    { id: 'adu', name: 'Accessory Dwelling Unit (ADU)', icon: '🏘️' },
    { id: 'commercial', name: 'Commercial Build-Out', icon: '🏢' },
    { id: 'outdoor-living', name: 'Luxury Outdoor Living', icon: '🌳' },
    { id: 'custom-home', name: 'Custom Home Building', icon: '🏗️' },
    { id: 'restoration', name: 'Disaster Restoration', icon: '🔧' },
    { id: 'solar-smart', name: 'Solar + Smart Home', icon: '⚡' },
    { id: 'multifamily', name: 'Multifamily Conversion', icon: '🏪' },
    { id: 'foundation', name: 'Foundation Repair', icon: '🔨' },
    { id: 'medical', name: 'Medical Facility', icon: '🏥' }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">What type of project do you have?</h2>
              <p className="text-slate-400">Select the option that best describes your construction project</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({...formData, projectType: type.id})}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                    formData.projectType === type.id
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-slate-700 hover:border-amber-400/50'
                  }`}
                >
                  <div className="text-3xl mb-3">{type.icon}</div>
                  <div className="font-semibold text-white">{type.name}</div>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Describe your project in detail
              </label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                placeholder="Tell us about your vision, specific requirements, and any special considerations..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Project Location & Budget</h2>
              <p className="text-slate-400">Help us understand your project scope and investment range</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Project Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="Street address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="City"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                >
                  <option value="">Select State</option>
                  <option value="CA">California</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <option value="NY">New York</option>
                  <option value="WA">Washington</option>
                  <option value="CO">Colorado</option>
                  <option value="AZ">Arizona</option>
                  <option value="NV">Nevada</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="ZIP Code"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                >
                  <option value="">Select your budget range</option>
                  <option value="25000-50000">$25K - $50K</option>
                  <option value="50000-100000">$50K - $100K</option>
                  <option value="100000-250000">$100K - $250K</option>
                  <option value="250000-500000">$250K - $500K</option>
                  <option value="500000-1000000">$500K - $1M</option>
                  <option value="1000000+">$1M+</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="budgetFlexible"
                    checked={formData.budgetFlexible}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-amber-400 bg-slate-700 border-slate-600 rounded focus:ring-amber-400"
                  />
                  <span className="text-slate-300">My budget is flexible for the right solution</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Timeline & Project Details</h2>
              <p className="text-slate-400">When would you like to start and how urgent is this project?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  When do you want to start?
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
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
                <label className="block text-sm font-semibold text-slate-300 mb-2">Preferred Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Project Urgency</label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                >
                  <option value="">Select urgency level</option>
                  <option value="emergency">Emergency (Insurance claim, etc.)</option>
                  <option value="high">High (Moving deadline, event)</option>
                  <option value="normal">Normal</option>
                  <option value="flexible">Flexible (Can wait for right contractor)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Permit Status</label>
                <select
                  name="permits"
                  value={formData.permits}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                >
                  <option value="">Select permit status</option>
                  <option value="none-needed">No permits needed</option>
                  <option value="need-help">Need help obtaining permits</option>
                  <option value="in-progress">Permits in progress</option>
                  <option value="approved">Permits already approved</option>
                  <option value="unsure">Not sure what's needed</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Project Size/Scope</label>
                <textarea
                  name="projectSize"
                  value={formData.projectSize}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="Square footage, number of rooms, specific areas to be worked on, etc."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Additional Project Details</h2>
              <p className="text-slate-400">Help us understand your specific requirements and vision</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Current Condition</label>
                <textarea
                  name="currentCondition"
                  value={formData.currentCondition}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="Describe the current state of the space, any existing issues, what needs to be demolished, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Special Requirements</label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="Accessibility needs, eco-friendly materials, smart home integration, specific brands or finishes, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <Upload className="w-4 h-4 inline mr-1" />
                  Inspiration Images or Plans
                </label>
                <FileUpload
                  relatedTo="lead"
                  relatedId={tempLeadId}
                  onUploadSuccess={handleUploadSuccess}
                  onUploadError={handleUploadError}
                  maxFiles={5}
                  allowedFileTypes={['image/*', 'application/pdf', '.doc', '.docx']}
                  maxSizeMB={10}
                  label="Add Inspiration Images or Plans"
                  description="Upload photos, sketches, or plans to help us understand your vision"
                  bucketName="uploads"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
              <p className="text-slate-400">How can our contractors reach you?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="First name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="Last name"
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
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
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
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Best Time to Call</label>
                <select
                  name="bestTimeToCall"
                  value={formData.bestTimeToCall}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                >
                  <option value="">Select best time</option>
                  <option value="morning">Morning (8am-12pm)</option>
                  <option value="afternoon">Afternoon (12pm-5pm)</option>
                  <option value="evening">Evening (5pm-8pm)</option>
                  <option value="anytime">Anytime</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Preferred Contact Method</label>
                <select
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                >
                  <option value="">Select preference</option>
                  <option value="phone">Phone call</option>
                  <option value="email">Email</option>
                  <option value="text">Text message</option>
                  <option value="any">Any method</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Financing Options</h2>
              <p className="text-slate-400">Would you like information about project financing?</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Do you need financing for this project?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['Yes, I need financing', 'Maybe, tell me more', 'No, paying cash'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setFormData({...formData, needsFinancing: option})}
                      className={`p-4 rounded-lg border-2 text-center transition-all duration-300 ${
                        formData.needsFinancing === option
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-slate-700 hover:border-amber-400/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {formData.needsFinancing !== 'No, paying cash' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Credit Score Range</label>
                    <select
                      name="creditScore"
                      value={formData.creditScore}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    >
                      <option value="">Select credit score range</option>
                      <option value="750+">Excellent (750+)</option>
                      <option value="700-749">Good (700-749)</option>
                      <option value="650-699">Fair (650-699)</option>
                      <option value="600-649">Poor (600-649)</option>
                      <option value="below-600">Below 600</option>
                      <option value="unsure">Not sure</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Down Payment Available</label>
                    <select
                      name="downPayment"
                      value={formData.downPayment}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    >
                      <option value="">Select down payment amount</option>
                      <option value="0%">$0 (100% financing)</option>
                      <option value="5-10%">5-10% of project cost</option>
                      <option value="10-20%">10-20% of project cost</option>
                      <option value="20%+">20%+ of project cost</option>
                    </select>
                  </div>
                </>
              )}

              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-amber-400 mb-3">Financing Benefits</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Competitive rates starting at 5.99% APR</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Up to $1M in funding available</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Fast approval process (24-48 hours)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Flexible payment terms up to 20 years</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.projectType && formData.projectDescription;
      case 2:
        return formData.city && formData.state && formData.zip && formData.budget;
      case 3:
        return formData.timeline;
      case 4:
        return true; // Optional step
      case 5:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 6:
        return true; // Optional step
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t border-slate-700">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                currentStep === 1
                  ? 'text-slate-500 cursor-not-allowed'
                  : 'text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {currentStep === totalSteps ? (
              <button
                onClick={submitForm}
                disabled={!canProceed() || loading}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next Step</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 mb-4">Need help with your submission?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors">
              <Phone className="w-4 h-4" />
              <span>Call (555) 123-BUILD</span>
            </button>
            <button className="flex items-center justify-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors">
              <Mail className="w-4 h-4" />
              <span>Email Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadIntake;