import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, MapPin, DollarSign, Calendar, User, Phone, Mail, AlertTriangle, HardHat, ClipboardCheck } from 'lucide-react';
import { LeadService } from '../services/leadService';
import { useAuth } from '../contexts/AuthContext';
import FileUpload from '../components/FileUpload';

const LeadIntake: React.FC = () => {
  const navigate = useNavigate();
  useAuth();
  const [searchParams] = useSearchParams();
  const contractorId = searchParams.get('contractorId');
  const source = searchParams.get('source') || 'website_form';
  const preselectedService = searchParams.get('service') || '';

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tempLeadId] = useState(`temp-${Date.now()}`);
  const [formData, setFormData] = useState({
    // Step 1
    projectType: preselectedService,
    projectDescription: '',

    // Step 2: Location & Budget
    address: '',
    city: '',
    state: '',
    zip: '',
    budget: '',
    budgetFlexible: false,

    // Step 3: Service-Specific Technical Data

    // Infrastructure & Surface
    sqFootage: '',
    parkingSpaces: '',
    surfaceMaterial: '',
    surfaceCondition: '',
    adaCompliance: '',
    striping: '',

    // Mechanical & Electrical
    systemType: '',
    buildingSqFt: '',
    panelAmperage: '',
    equipmentAge: '',
    numberOfUnits: '',
    mechanicalWorkScope: '',

    // Inspections & Compliance
    inspectionType: '',
    propertyYearBuilt: '',
    lastInspectionDate: '',
    complianceConcern: '',
    certifyingBody: '',

    // Oil & Gas / Industrial
    oilGasSiteType: '',
    acreage: '',
    regulatoryAgency: '',
    hazmatPresent: '',
    cleanupScope: '',
    environmentalConcern: '',

    // Pressure Washing
    pwSurfaceType: '',
    buildingStories: '',
    stainType: '',
    pwFrequency: '',

    // Step 4: Site Access & Operational Details
    timeline: '',
    startDate: '',
    propertyType: '',
    workHoursConstraints: '',
    siteAccessNotes: '',
    safetyRequirements: '',
    permitStatus: '',
    occupancyStatus: '',
    frequency: '',

    // Step 5: Contact Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    jobTitle: '',
    bestTimeToCall: '',
    preferredContact: '',

    // Step 6: Financing
    needsFinancing: '',
    creditScore: '',
    downPayment: '',
  });

  const totalSteps = 6;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const nextStep = () => { if (currentStep < totalSteps) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const handleUploadSuccess = (upload: any) => { console.log('File uploaded:', upload); };
  const handleUploadError = (error: string) => { alert(`Upload error: ${error}`); };

  const submitForm = async () => {
    try {
      setLoading(true);
      const budgetLower = formData.budget.split('-')[0].replace(/[^0-9]/g, '');
      const budgetNumber = budgetLower ? parseInt(budgetLower) : null;

      const technicalDetails = buildTechnicalSummary();

      const leadData = {
        client_name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        email: formData.email,
        project_type: formData.projectType,
        zip_code: formData.zip,
        budget: budgetNumber,
        timeline: formData.timeline,
        description: [
          formData.projectDescription && `Overview: ${formData.projectDescription}`,
          technicalDetails,
          formData.propertyType && `Property Type: ${formData.propertyType}`,
          formData.workHoursConstraints && `Work Hours: ${formData.workHoursConstraints}`,
          formData.siteAccessNotes && `Site Access: ${formData.siteAccessNotes}`,
          formData.safetyRequirements && `Safety/Certs Required: ${formData.safetyRequirements}`,
          formData.permitStatus && `Permit Status: ${formData.permitStatus}`,
          formData.occupancyStatus && `Occupancy: ${formData.occupancyStatus}`,
          formData.companyName && `Company: ${formData.companyName}`,
          formData.jobTitle && `Title: ${formData.jobTitle}`,
        ].filter(Boolean).join('\n'),
        source,
        status: 'new',
        assigned_contractor_id: contractorId || null,
      };

      const createdLead = await LeadService.createLead(leadData);
      navigate(`/deposit-payment?leadId=${createdLead.id}`);
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('There was an error submitting your project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const buildTechnicalSummary = (): string => {
    switch (formData.projectType) {
      case 'infrastructure-surface':
        return [
          formData.sqFootage && `Site Area: ${formData.sqFootage} sq ft`,
          formData.parkingSpaces && `Parking Spaces: ${formData.parkingSpaces}`,
          formData.surfaceMaterial && `Surface Material: ${formData.surfaceMaterial}`,
          formData.surfaceCondition && `Surface Condition: ${formData.surfaceCondition}`,
          formData.adaCompliance && `ADA Compliance: ${formData.adaCompliance}`,
          formData.striping && `Striping/Markings: ${formData.striping}`,
        ].filter(Boolean).join('\n');
      case 'mechanical-electrical':
        return [
          formData.systemType && `System Type: ${formData.systemType}`,
          formData.buildingSqFt && `Building Size: ${formData.buildingSqFt} sq ft`,
          formData.panelAmperage && `Panel/Service Amperage: ${formData.panelAmperage}`,
          formData.equipmentAge && `Equipment Age: ${formData.equipmentAge}`,
          formData.numberOfUnits && `Number of Units: ${formData.numberOfUnits}`,
          formData.mechanicalWorkScope && `Scope: ${formData.mechanicalWorkScope}`,
        ].filter(Boolean).join('\n');
      case 'inspections-compliance':
        return [
          formData.inspectionType && `Inspection Type: ${formData.inspectionType}`,
          formData.propertyYearBuilt && `Year Built: ${formData.propertyYearBuilt}`,
          formData.lastInspectionDate && `Last Inspection: ${formData.lastInspectionDate}`,
          formData.complianceConcern && `Compliance Concern: ${formData.complianceConcern}`,
          formData.certifyingBody && `Certifying Body: ${formData.certifyingBody}`,
        ].filter(Boolean).join('\n');
      case 'oil-gas-industrial':
        return [
          formData.oilGasSiteType && `Site Type: ${formData.oilGasSiteType}`,
          formData.acreage && `Site Acreage: ${formData.acreage}`,
          formData.regulatoryAgency && `Regulatory Agency: ${formData.regulatoryAgency}`,
          formData.hazmatPresent && `Hazmat Present: ${formData.hazmatPresent}`,
          formData.cleanupScope && `Cleanup Scope: ${formData.cleanupScope}`,
          formData.environmentalConcern && `Environmental Notes: ${formData.environmentalConcern}`,
        ].filter(Boolean).join('\n');
      default:
        return '';
    }
  };

  const projectTypes = [
    { id: 'infrastructure-surface', name: 'Infrastructure & Surface', icon: '🏗️', description: 'Striping, paving, sealcoating, parking lot repair, ADA compliance' },
    { id: 'mechanical-electrical', name: 'Mechanical & Electrical', icon: '⚡', description: 'Commercial electrical, HVAC, panel upgrades, industrial systems' },
    { id: 'inspections-compliance', name: 'Inspections & Compliance', icon: '🔍', description: 'Code compliance, pre-purchase, fire, ADA, environmental audits' },
    { id: 'oil-gas-industrial', name: 'Oil & Gas / Industrial', icon: '🛢️', description: 'Site cleanup, equipment install, environmental compliance' },
    { id: 'estimation-bidding', name: 'Estimation & Bidding', icon: '📋', description: 'Quantity take-offs, bid packages, cost estimation' },
    { id: 'permit-compliance', name: 'Permit & Compliance', icon: '📄', description: 'Permit acquisition, code research, regulatory filings' },
    { id: 'material-procurement', name: 'Material Procurement', icon: '📦', description: 'Sourcing, purchasing, and delivery logistics coordination' },
    { id: 'cleanup-coordination', name: 'Cleanup Coordination', icon: '🧹', description: 'Post-construction cleanup, debris removal, site restoration' },
    { id: 'warranty-maintenance', name: 'Warranty & Maintenance Plans', icon: '🔄', description: 'Ongoing maintenance contracts and warranty management' },
    { id: 'clean-truck-check', name: 'Clean Truck Check (CA Only)', icon: '🚛', description: 'CARB compliance verification for California truck fleets' },
  ];

  const renderServiceSpecificStep = () => {
    switch (formData.projectType) {
      case 'infrastructure-surface':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Infrastructure & Surface Details</h2>
              <p className="text-slate-400">Provide site measurements and surface specifications</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Total Site Area (sq ft)</label>
                <input type="number" name="sqFootage" value={formData.sqFootage} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. 45000" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Number of Parking Spaces</label>
                <input type="number" name="parkingSpaces" value={formData.parkingSpaces} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. 250" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Surface Material</label>
                <select name="surfaceMaterial" value={formData.surfaceMaterial} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select surface type</option>
                  <option value="asphalt">Asphalt</option>
                  <option value="concrete">Concrete</option>
                  <option value="pavers">Pavers / Brick</option>
                  <option value="gravel">Gravel / Aggregate</option>
                  <option value="mixed">Mixed / Multiple</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Current Surface Condition</label>
                <select name="surfaceCondition" value={formData.surfaceCondition} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select condition</option>
                  <option value="good">Good — minor wear, maintenance only</option>
                  <option value="fair">Fair — moderate cracking/fading</option>
                  <option value="poor">Poor — significant damage, potholing</option>
                  <option value="critical">Critical — full replacement needed</option>
                  <option value="new">New construction / bare substrate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">ADA Compliance Work Required?</label>
                <select name="adaCompliance" value={formData.adaCompliance} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select option</option>
                  <option value="yes-full">Yes — full ADA upgrade needed</option>
                  <option value="yes-partial">Yes — partial (signage/markings only)</option>
                  <option value="no">No ADA work required</option>
                  <option value="unknown">Not sure — needs assessment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Striping / Markings Needed?</label>
                <select name="striping" value={formData.striping} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select option</option>
                  <option value="full-restripe">Full restripe (all spaces + lanes)</option>
                  <option value="touch-up">Touch-up existing markings</option>
                  <option value="new-layout">New layout design</option>
                  <option value="fire-lanes">Fire lanes / safety markings only</option>
                  <option value="no">No striping needed</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Additional Project Description</label>
                <textarea name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} rows={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Describe scope: areas affected, last reseal/repave date, known issues (oil stains, drainage problems, structural damage), etc." />
              </div>
            </div>
          </div>
        );

      case 'mechanical-electrical':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Mechanical & Electrical Details</h2>
              <p className="text-slate-400">Provide system specifications and building data</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">System / Trade Type</label>
                <select name="systemType" value={formData.systemType} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select system type</option>
                  <option value="electrical-commercial">Commercial Electrical</option>
                  <option value="electrical-industrial">Industrial Electrical (480V+)</option>
                  <option value="hvac-commercial">Commercial HVAC</option>
                  <option value="hvac-industrial">Industrial HVAC / Chillers</option>
                  <option value="plumbing">Commercial Plumbing</option>
                  <option value="fire-suppression">Fire Suppression Systems</option>
                  <option value="generator">Standby Generator / UPS</option>
                  <option value="lighting">Exterior Lighting / LED Retrofit</option>
                  <option value="ev-charging">EV Charging Infrastructure</option>
                  <option value="multiple">Multiple Systems</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Building Size (sq ft)</label>
                <input type="number" name="buildingSqFt" value={formData.buildingSqFt} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. 25000" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Electrical Service Size (Amps)</label>
                <select name="panelAmperage" value={formData.panelAmperage} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select or enter amperage</option>
                  <option value="200A">200A (light commercial)</option>
                  <option value="400A">400A</option>
                  <option value="800A">800A</option>
                  <option value="1200A">1200A</option>
                  <option value="2000A+">2000A+ (industrial)</option>
                  <option value="unknown">Unknown / needs assessment</option>
                  <option value="na">N/A — not electrical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Existing Equipment Age</label>
                <select name="equipmentAge" value={formData.equipmentAge} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select age range</option>
                  <option value="0-5">0–5 years</option>
                  <option value="6-10">6–10 years</option>
                  <option value="11-20">11–20 years</option>
                  <option value="20+">20+ years (end of life)</option>
                  <option value="new-install">New installation (no existing)</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Number of Units / Zones</label>
                <input type="text" name="numberOfUnits" value={formData.numberOfUnits} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. 4 RTU, 12 VAV zones, 3 panels" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Scope of Work</label>
                <select name="mechanicalWorkScope" value={formData.mechanicalWorkScope} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select scope</option>
                  <option value="repair">Repair / troubleshoot existing</option>
                  <option value="replace">Replace / upgrade equipment</option>
                  <option value="new-install">New installation</option>
                  <option value="preventive">Preventive maintenance contract</option>
                  <option value="retrofit">Energy efficiency retrofit</option>
                  <option value="code-upgrade">Code compliance upgrade</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Technical Description & Known Issues</label>
                <textarea name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} rows={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Describe the issue or scope: symptoms, error codes, system model numbers, last service date, specific code violations, load calculations if available, etc." />
              </div>
            </div>
          </div>
        );

      case 'inspections-compliance':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Inspection & Compliance Details</h2>
              <p className="text-slate-400">Specify the inspection scope and compliance requirements</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Inspection Type</label>
                <select name="inspectionType" value={formData.inspectionType} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select inspection type</option>
                  <option value="pre-purchase">Pre-Purchase / Due Diligence</option>
                  <option value="code-compliance">Building Code Compliance</option>
                  <option value="fire-life-safety">Fire & Life Safety</option>
                  <option value="ada-accessibility">ADA / Accessibility</option>
                  <option value="electrical">Electrical Systems</option>
                  <option value="structural">Structural / Engineering</option>
                  <option value="environmental">Environmental / Phase I ESA</option>
                  <option value="phase-ii">Phase II Environmental</option>
                  <option value="mold-air">Mold / Indoor Air Quality</option>
                  <option value="energy-audit">Energy Audit / Benchmarking</option>
                  <option value="roofing">Roofing Assessment</option>
                  <option value="elevator">Elevator / Lift Certification</option>
                  <option value="annual-facility">Annual Facility Inspection</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Year Property Was Built</label>
                <input type="text" name="propertyYearBuilt" value={formData.propertyYearBuilt} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. 1987" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Last Inspection Date</label>
                <input type="text" name="lastInspectionDate" value={formData.lastInspectionDate} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Month/Year or 'Never'" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Certifying / Issuing Authority</label>
                <select name="certifyingBody" value={formData.certifyingBody} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select authority</option>
                  <option value="local-ahj">Local AHJ (Authority Having Jurisdiction)</option>
                  <option value="state-fire">State Fire Marshal</option>
                  <option value="osha">OSHA</option>
                  <option value="epa">EPA</option>
                  <option value="insurance">Insurance Carrier</option>
                  <option value="lender">Lender / Bank</option>
                  <option value="municipality">City / County</option>
                  <option value="internal">Internal / Ownership</option>
                  <option value="unknown">Not sure yet</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Compliance Concern or Trigger for Inspection</label>
                <textarea name="complianceConcern" value={formData.complianceConcern} onChange={handleInputChange} rows={2}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. Failed previous inspection, preparing for sale, tenant complaint, insurance renewal requirement, known violation notice, etc." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Scope & Additional Context</label>
                <textarea name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} rows={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Property size (sq ft / acres), number of buildings, specific systems or areas to inspect, any known issues or prior findings, previous inspection reports available, etc." />
              </div>
            </div>
          </div>
        );

      case 'oil-gas-industrial':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Oil, Gas & Industrial Site Details</h2>
              <p className="text-slate-400">Provide site type, regulatory requirements, and safety scope</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start space-x-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-200">This information is used to match you with contractors who hold the correct certifications, insurance, and regulatory authorizations for your site.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Site Type</label>
                <select name="oilGasSiteType" value={formData.oilGasSiteType} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select site type</option>
                  <option value="tank-farm">Tank Farm / Storage Facility</option>
                  <option value="pipeline">Pipeline / Gathering System</option>
                  <option value="wellsite">Wellsite / Pad</option>
                  <option value="refinery">Refinery / Processing Plant</option>
                  <option value="compressor-station">Compressor Station</option>
                  <option value="distribution-terminal">Distribution Terminal</option>
                  <option value="industrial-plant">Industrial Manufacturing Plant</option>
                  <option value="chemical-facility">Chemical / Petrochemical Facility</option>
                  <option value="remediation-site">Environmental Remediation Site</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Site Acreage</label>
                <input type="text" name="acreage" value={formData.acreage} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. 12 acres" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Primary Regulatory Agency</label>
                <select name="regulatoryAgency" value={formData.regulatoryAgency} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select agency</option>
                  <option value="epa">EPA (Environmental Protection Agency)</option>
                  <option value="osha">OSHA (Federal)</option>
                  <option value="cal-osha">Cal/OSHA (California)</option>
                  <option value="phmsa">PHMSA (Pipeline / Hazmat)</option>
                  <option value="state-oil-gas">State Oil & Gas Commission</option>
                  <option value="dtsc">DTSC (CA Dept. of Toxic Substances)</option>
                  <option value="rwqcb">RWQCB (Regional Water Quality Board)</option>
                  <option value="dot">DOT</option>
                  <option value="multiple">Multiple agencies</option>
                  <option value="unknown">Unknown / needs determination</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Hazardous Materials Present?</label>
                <select name="hazmatPresent" value={formData.hazmatPresent} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select option</option>
                  <option value="hydrocarbons">Yes — Hydrocarbons (oil/fuel)</option>
                  <option value="chemicals">Yes — Industrial Chemicals</option>
                  <option value="asbestos">Yes — Asbestos / ACM</option>
                  <option value="lead">Yes — Lead Paint / Contamination</option>
                  <option value="multiple-hazmat">Yes — Multiple hazmat types</option>
                  <option value="suspected">Suspected — needs assessment</option>
                  <option value="no">No hazmat present</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Cleanup / Remediation Scope</label>
                <select name="cleanupScope" value={formData.cleanupScope} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select scope</option>
                  <option value="surface-only">Surface cleanup only</option>
                  <option value="soil-excavation">Soil excavation & disposal</option>
                  <option value="groundwater">Groundwater / pump-and-treat</option>
                  <option value="tank-cleaning">Tank cleaning / decommissioning</option>
                  <option value="full-remediation">Full site remediation</option>
                  <option value="equipment-install">Equipment installation / upgrade</option>
                  <option value="maintenance">Ongoing O&M contract</option>
                  <option value="not-cleanup">Not a cleanup — other industrial work</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Environmental / Safety Concern</label>
                <input type="text" name="environmentalConcern" value={formData.environmentalConcern} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. UST release, soil contamination, NOV received, regulatory deadline" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Site Description & Scope of Work</label>
                <textarea name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} rows={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Describe the work needed: regulatory deadline, prior investigation reports, site history, equipment involved, special access requirements (TWIC, confined space), etc." />
              </div>
            </div>
          </div>
        );

      case 'estimation-bidding':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Estimation & Bidding Details</h2>
              <p className="text-slate-400">Tell us about the project scope and deliverables you need</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Estimate Type</label>
                <select name="systemType" value={formData.systemType} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select estimate type</option>
                  <option value="conceptual">Conceptual / Budget estimate</option>
                  <option value="schematic">Schematic design estimate</option>
                  <option value="design-dev">Design development estimate</option>
                  <option value="bid-package">Full bid package preparation</option>
                  <option value="quantity-takeoff">Quantity take-off only</option>
                  <option value="bid-leveling">Bid leveling / comparison</option>
                  <option value="value-engineering">Value engineering review</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Project Type / Trade</label>
                <select name="mechanicalWorkScope" value={formData.mechanicalWorkScope} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select trade</option>
                  <option value="general">General construction</option>
                  <option value="civil">Civil / site work</option>
                  <option value="electrical">Electrical</option>
                  <option value="mechanical">Mechanical / HVAC</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="concrete">Concrete / masonry</option>
                  <option value="steel">Structural steel</option>
                  <option value="multi-trade">Multi-trade scope</option>
                  <option value="industrial">Industrial / process</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Total Project Value (Estimated)</label>
                <input type="text" name="buildingSqFt" value={formData.buildingSqFt} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. $2.5M" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Bid / Estimate Deadline</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Documents Available</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['Architectural drawings', 'Structural drawings', 'MEP drawings', 'Specifications (specs book)', 'Geotech report', 'None yet'].map(doc => (
                    <label key={doc} className="flex items-center space-x-2 text-sm text-slate-300 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-amber-400 bg-slate-700 border-slate-600 rounded" />
                      <span>{doc}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Scope Description & Special Requirements</label>
                <textarea name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} rows={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Describe the project scope, specific deliverables needed (CSI divisions, subcontractor breakdowns, alternates), number of bid packages, prevailing wage requirements, etc." />
              </div>
            </div>
          </div>
        );

      case 'permit-compliance':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Permit & Compliance Details</h2>
              <p className="text-slate-400">Tell us about the permit type and current status</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Permit Type</label>
                <select name="inspectionType" value={formData.inspectionType} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select permit type</option>
                  <option value="building">Building permit</option>
                  <option value="electrical">Electrical permit</option>
                  <option value="mechanical">Mechanical / HVAC permit</option>
                  <option value="plumbing">Plumbing permit</option>
                  <option value="grading">Grading / earthwork permit</option>
                  <option value="encroachment">Encroachment / ROW permit</option>
                  <option value="environmental">Environmental permit (CEQA, etc.)</option>
                  <option value="fire">Fire department permit</option>
                  <option value="conditional-use">Conditional use / variance</option>
                  <option value="multiple">Multiple permit types</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Jurisdiction</label>
                <input type="text" name="certifyingBody" value={formData.certifyingBody} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. City of Los Angeles, LA County, Bakersfield" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Current Permit Status</label>
                <select name="permitStatus" value={formData.permitStatus} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select status</option>
                  <option value="not-started">Not started — need full coordination</option>
                  <option value="submitted">Submitted — pending review</option>
                  <option value="corrections">Corrections required</option>
                  <option value="approved">Approved — need inspections</option>
                  <option value="violation">Active violation / NOV</option>
                  <option value="expired">Permit expired — need renewal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Compliance Deadline</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Compliance Concern & Context</label>
                <textarea name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} rows={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Describe the project requiring the permit, any violations or prior denials, code concerns, zoning issues, or specific regulatory deadlines you are working toward." />
              </div>
            </div>
          </div>
        );

      case 'material-procurement':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Material Procurement Details</h2>
              <p className="text-slate-400">Describe what you need sourced and delivered</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Primary Material Category</label>
                <select name="systemType" value={formData.systemType} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select material type</option>
                  <option value="concrete-masonry">Concrete / masonry</option>
                  <option value="steel-metal">Structural steel / metal</option>
                  <option value="lumber-framing">Lumber / framing</option>
                  <option value="electrical-materials">Electrical materials and gear</option>
                  <option value="hvac-equipment">HVAC equipment and ductwork</option>
                  <option value="plumbing">Plumbing fixtures and pipe</option>
                  <option value="asphalt-paving">Asphalt / paving materials</option>
                  <option value="industrial-equipment">Industrial equipment</option>
                  <option value="specialty">Specialty / hard-to-source</option>
                  <option value="multiple">Multiple material types</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Estimated Material Budget</label>
                <input type="text" name="buildingSqFt" value={formData.buildingSqFt} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. $150,000" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Delivery Required By</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Spec Sheets Available?</label>
                <select name="mechanicalWorkScope" value={formData.mechanicalWorkScope} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select option</option>
                  <option value="full-specs">Yes — full specs and submittals</option>
                  <option value="partial-specs">Partial specs available</option>
                  <option value="no-specs">No specs — standard grade acceptable</option>
                  <option value="engineer-required">Engineer-specified — must match exactly</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Material List & Requirements</label>
                <textarea name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} rows={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="List materials needed (quantities, grades, sizes), delivery address, staging area constraints, any brand or spec requirements, tax-exempt purchasing, phased delivery schedule, etc." />
              </div>
            </div>
          </div>
        );

      case 'cleanup-coordination':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Cleanup Coordination Details</h2>
              <p className="text-slate-400">Describe the site and type of cleanup needed</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Cleanup Type</label>
                <select name="cleanupScope" value={formData.cleanupScope} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select cleanup type</option>
                  <option value="rough-cleanup">Rough cleanup (construction debris)</option>
                  <option value="final-cleanup">Final / broom-clean</option>
                  <option value="detail-cleaning">Detail cleaning (pre-occupancy)</option>
                  <option value="industrial-cleanup">Industrial / post-maintenance cleanup</option>
                  <option value="hazmat-cleanup">Hazmat / environmental cleanup</option>
                  <option value="demo-debris">Demolition debris removal</option>
                  <option value="full-scope">Full scope (rough + final + detail)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Site Area (sq ft)</label>
                <input type="number" name="sqFootage" value={formData.sqFootage} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. 20000" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Primary Debris / Waste Type</label>
                <select name="stainType" value={formData.stainType} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select debris type</option>
                  <option value="construction-debris">General construction debris</option>
                  <option value="concrete-masonry">Concrete / masonry waste</option>
                  <option value="steel-metal">Steel / metal scrap</option>
                  <option value="drywall-insulation">Drywall / insulation</option>
                  <option value="hazmat">Hazmat / contaminated material</option>
                  <option value="vegetation">Vegetation / landscaping</option>
                  <option value="mixed">Mixed debris</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Hazmat / Special Disposal?</label>
                <select name="hazmatPresent" value={formData.hazmatPresent} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select option</option>
                  <option value="no">No — standard debris only</option>
                  <option value="asbestos">Yes — asbestos / ACM</option>
                  <option value="lead">Yes — lead paint</option>
                  <option value="chemicals">Yes — industrial chemicals</option>
                  <option value="unknown">Unknown — assessment needed</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Site Description & Access Notes</label>
                <textarea name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} rows={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Describe the site, floors/levels involved, dumpster access, elevator availability, parking for crews, inspection deadline driving the cleanup schedule, LEED certification requirements, etc." />
              </div>
            </div>
          </div>
        );

      case 'warranty-maintenance':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Warranty & Maintenance Plan Details</h2>
              <p className="text-slate-400">Tell us about the systems or services you need covered</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Systems / Services to Cover</label>
                <select name="systemType" value={formData.systemType} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select primary system</option>
                  <option value="hvac">HVAC systems</option>
                  <option value="electrical">Electrical systems</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="fire-suppression">Fire suppression</option>
                  <option value="parking-surface">Parking lot / surfaces</option>
                  <option value="roofing">Roofing</option>
                  <option value="industrial-equipment">Industrial equipment</option>
                  <option value="full-facility">Full facility (multi-system)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Number of Units / Assets</label>
                <input type="text" name="numberOfUnits" value={formData.numberOfUnits} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. 6 RTUs, 3 buildings, 12 units" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Current Contract Status</label>
                <select name="mechanicalWorkScope" value={formData.mechanicalWorkScope} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select status</option>
                  <option value="no-contract">No current contract</option>
                  <option value="expiring">Existing contract expiring</option>
                  <option value="unhappy">Unhappy with current provider</option>
                  <option value="new-install">New installation needing coverage</option>
                  <option value="post-warranty">Manufacturer warranty expiring</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Preferred Maintenance Frequency</label>
                <select name="frequency" value={formData.frequency} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select frequency</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semi-annual">Semi-annual</option>
                  <option value="annual">Annual</option>
                  <option value="custom">Custom schedule</option>
                  <option value="reactive">Reactive / on-call only</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Scope & Priorities</label>
                <textarea name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} rows={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Describe the assets needing coverage, building size, equipment makes/models, existing warranty documents, priority response time requirements, 24/7 emergency call-out needs, budget range for annual contract, etc." />
              </div>
            </div>
          </div>
        );

      case 'clean-truck-check':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Clean Truck Check Details</h2>
              <p className="text-slate-400">Provide fleet information for CARB compliance coordination</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start space-x-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-200">California's Clean Truck Check applies to medium and heavy-duty vehicles (GVWR 14,001+ lbs) registered in CA. Non-compliant vehicles face fines and registration holds.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Number of Vehicles in Fleet</label>
                <input type="number" name="numberOfUnits" value={formData.numberOfUnits} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. 12" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Primary Vehicle / Fleet Type</label>
                <select name="systemType" value={formData.systemType} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select fleet type</option>
                  <option value="semi-trucks">Semi-trucks / tractor-trailers</option>
                  <option value="dump-trucks">Dump trucks</option>
                  <option value="box-trucks">Box trucks / straight trucks</option>
                  <option value="construction-equipment">Construction equipment (Class 7–8)</option>
                  <option value="field-service">Field service / utility trucks</option>
                  <option value="mixed-fleet">Mixed fleet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Current CARB Compliance Status</label>
                <select name="oilGasSiteType" value={formData.oilGasSiteType} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select status</option>
                  <option value="compliant">Fully compliant — need annual inspection</option>
                  <option value="partial">Partially compliant — some vehicles pending</option>
                  <option value="non-compliant">Non-compliant — need immediate help</option>
                  <option value="unknown">Unknown — need full fleet assessment</option>
                  <option value="new">New to CA operations</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Compliance / Inspection Deadline</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Fleet Details & Additional Notes</label>
                <textarea name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} rows={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="List vehicle years/makes/models if known, VIPER IDs, any active violations or registration holds, fleet operating location (yard address), any vehicles already inspected, preferred inspection site or mobile inspection needed, etc." />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Project Technical Details</h2>
              <p className="text-slate-400">Go back to Step 1 and select a service category first.</p>
            </div>
          </div>
        );
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">What service do you need?</h2>
              <p className="text-slate-400">Select the category that best matches your project</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFormData({ ...formData, projectType: type.id })}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                    formData.projectType === type.id
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-slate-700 hover:border-amber-400/50'
                  }`}
                >
                  <div className="text-3xl mb-3">{type.icon}</div>
                  <div className="font-semibold text-white mb-1">{type.name}</div>
                  <div className="text-xs text-slate-400">{type.description}</div>
                </button>
              ))}
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
                  Project Site Address
                </label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Street address (or nearest intersection)" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">City</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="City" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">State</label>
                <select name="state" value={formData.state} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select State</option>
                  {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">ZIP Code</label>
                <input type="text" name="zip" value={formData.zip} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="ZIP Code" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Project Budget Range
                </label>
                <select name="budget" value={formData.budget} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select budget range</option>
                  <option value="10000-25000">$10K – $25K</option>
                  <option value="25000-50000">$25K – $50K</option>
                  <option value="50000-100000">$50K – $100K</option>
                  <option value="100000-250000">$100K – $250K</option>
                  <option value="250000-500000">$250K – $500K</option>
                  <option value="500000-1000000">$500K – $1M</option>
                  <option value="1000000+">$1M+</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" name="budgetFlexible" checked={formData.budgetFlexible} onChange={handleInputChange}
                    className="w-5 h-5 text-amber-400 bg-slate-700 border-slate-600 rounded focus:ring-amber-400" />
                  <span className="text-slate-300">Budget is flexible for the right solution / qualified contractor</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 3:
        return renderServiceSpecificStep();

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Site Access & Operational Requirements</h2>
              <p className="text-slate-400">Help us match contractors who can meet your site-specific constraints</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  When do you need this started?
                </label>
                <select name="timeline" value={formData.timeline} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select timeline</option>
                  <option value="emergency">Emergency — within 24–48 hours</option>
                  <option value="asap">ASAP — within 1–2 weeks</option>
                  <option value="this-month">This month</option>
                  <option value="next-30-60">Next 30–60 days</option>
                  <option value="next-quarter">Next quarter</option>
                  <option value="flexible">Flexible / scheduling open</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Property / Facility Type</label>
                <select name="propertyType" value={formData.propertyType} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select property type</option>
                  <option value="commercial-office">Commercial Office</option>
                  <option value="retail-strip">Retail / Strip Mall</option>
                  <option value="industrial-warehouse">Industrial / Warehouse</option>
                  <option value="multifamily">Multifamily / HOA</option>
                  <option value="healthcare">Healthcare / Medical</option>
                  <option value="education">Educational Institution</option>
                  <option value="municipal">Municipal / Government</option>
                  <option value="hospitality">Hospitality / Hotel</option>
                  <option value="mixed-use">Mixed Use</option>
                  <option value="oil-gas-site">Oil & Gas / Industrial Site</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Allowable Work Hours</label>
                <select name="workHoursConstraints" value={formData.workHoursConstraints} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select work hours</option>
                  <option value="standard">Standard business hours (M–F, 7am–5pm)</option>
                  <option value="nights">Nights only (after 7pm)</option>
                  <option value="weekends">Weekends only</option>
                  <option value="nights-weekends">Nights & weekends</option>
                  <option value="shutdown">Full shutdown / outage window</option>
                  <option value="24-7">24/7 — no restrictions</option>
                  <option value="flexible">Flexible — contractor can advise</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Occupancy During Work</label>
                <select name="occupancyStatus" value={formData.occupancyStatus} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select occupancy status</option>
                  <option value="occupied-full">Fully occupied — work around tenants</option>
                  <option value="occupied-partial">Partially occupied</option>
                  <option value="vacant">Vacant / unoccupied</option>
                  <option value="operational-industrial">Operational industrial facility</option>
                  <option value="phased-shutdown">Phased sections taken offline</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <HardHat className="w-4 h-4 inline mr-1" />
                  Safety / Certification Requirements
                </label>
                <select name="safetyRequirements" value={formData.safetyRequirements} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select requirements</option>
                  <option value="osha-10">OSHA-10 required</option>
                  <option value="osha-30">OSHA-30 required</option>
                  <option value="confined-space">Confined space entry</option>
                  <option value="twic">TWIC card required</option>
                  <option value="lockout-tagout">Lockout/Tagout (LOTO) program</option>
                  <option value="hot-work">Hot work permit required</option>
                  <option value="prevailing-wage">Prevailing wage / Davis-Bacon</option>
                  <option value="union">Union labor required</option>
                  <option value="none">No special requirements</option>
                  <option value="multiple">Multiple — details in notes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <ClipboardCheck className="w-4 h-4 inline mr-1" />
                  Permit Status
                </label>
                <select name="permitStatus" value={formData.permitStatus} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select permit status</option>
                  <option value="not-required">No permit required</option>
                  <option value="need-to-obtain">Need to obtain — contractor to pull</option>
                  <option value="already-obtained">Already obtained</option>
                  <option value="under-review">Submitted, under review</option>
                  <option value="unknown">Unknown — needs determination</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Site Access Notes & Special Conditions</label>
                <textarea name="siteAccessNotes" value={formData.siteAccessNotes} onChange={handleInputChange} rows={3}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Gate codes, key/badge pickup, escort required, overhead clearance limits, weight restrictions, vendor check-in procedures, utility locates required, traffic control needed, etc." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <Upload className="w-4 h-4 inline mr-1" />
                  Upload Site Plans, Photos, or Specs
                </label>
                <FileUpload
                  relatedTo="lead"
                  relatedId={tempLeadId}
                  onUploadSuccess={handleUploadSuccess}
                  onUploadError={handleUploadError}
                  maxFiles={5}
                  allowedFileTypes={['image/*', 'application/pdf', '.doc', '.docx', '.dwg', '.dxf']}
                  maxSizeMB={25}
                  label="Add Site Photos, Plans, or Spec Sheets"
                  description="Upload site photos, CAD drawings, spec sheets, prior reports, or NOVs to speed up matching"
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
              <h2 className="text-3xl font-bold mb-4">Your Contact Information</h2>
              <p className="text-slate-400">Our operations team will reach out within 1 business day</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  First Name
                </label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="First name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Last name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Company / Organization</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Company name (optional)" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Job Title / Role</label>
                <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="e.g. Facilities Director, Property Manager, Owner" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                </label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number
                </label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="(555) 123-4567" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Best Time to Call</label>
                <select name="bestTimeToCall" value={formData.bestTimeToCall} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                  <option value="">Select best time</option>
                  <option value="morning">Morning (8am–12pm)</option>
                  <option value="afternoon">Afternoon (12pm–5pm)</option>
                  <option value="evening">Evening (5pm–8pm)</option>
                  <option value="anytime">Anytime</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Preferred Contact Method</label>
                <select name="preferredContact" value={formData.preferredContact} onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
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
              <h2 className="text-3xl font-bold mb-4">Project Financing</h2>
              <p className="text-slate-400">Would you like information about commercial project financing?</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Do you need financing for this project?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['Yes, I need financing', 'Maybe, tell me more', 'No, paying out of pocket'].map((option) => (
                    <button key={option}
                      onClick={() => setFormData({ ...formData, needsFinancing: option })}
                      className={`p-4 rounded-lg border-2 text-center text-sm transition-all duration-300 ${
                        formData.needsFinancing === option
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-slate-700 hover:border-amber-400/50'
                      }`}
                    >{option}</button>
                  ))}
                </div>
              </div>

              {formData.needsFinancing !== 'No, paying out of pocket' && formData.needsFinancing !== '' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Business Credit Profile</label>
                    <select name="creditScore" value={formData.creditScore} onChange={handleInputChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                      <option value="">Select credit profile</option>
                      <option value="excellent">Excellent (750+)</option>
                      <option value="good">Good (700–749)</option>
                      <option value="fair">Fair (650–699)</option>
                      <option value="building">Building / Limited history</option>
                      <option value="unsure">Not sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Down Payment / Equity Available</label>
                    <select name="downPayment" value={formData.downPayment} onChange={handleInputChange}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent">
                      <option value="">Select down payment range</option>
                      <option value="0%">$0 (100% financing needed)</option>
                      <option value="5-10%">5–10% of project cost</option>
                      <option value="10-20%">10–20% of project cost</option>
                      <option value="20%+">20%+ of project cost</option>
                    </select>
                  </div>
                </>
              )}

              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-amber-400 mb-3">Commercial Financing Options</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  {[
                    'SBA 504 and 7(a) loan programs available',
                    'Equipment financing up to $5M',
                    'Working capital lines up to $2M',
                    'Fast approval: 24–72 hours on most programs',
                  ].map((item) => (
                    <li key={item} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
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
      case 1: return formData.projectType !== '';
      case 2: return !!(formData.city && formData.state && formData.zip && formData.budget);
      case 3: return true; // service-specific step, all fields optional (ops team follows up)
      case 4: return !!(formData.timeline && formData.propertyType);
      case 5: return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
      case 6: return true;
      default: return false;
    }
  };

  const hintMessages: Record<number, string> = {
    1: 'Select a service category to continue.',
    2: 'Enter city, state, ZIP, and budget range to continue.',
    4: 'Select a start timeline and property type to continue.',
    5: 'Enter your name, email, and phone number to continue.',
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
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          {renderStep()}

          {!canProceed() && currentStep !== totalSteps && hintMessages[currentStep] && (
            <p className="text-center text-sm text-slate-500 mt-6">{hintMessages[currentStep]}</p>
          )}

          <div className="flex justify-between mt-4 pt-6 border-t border-slate-700">
            <button onClick={prevStep} disabled={currentStep === 1}
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
              <button onClick={submitForm} disabled={!canProceed() || loading}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
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
              <button onClick={nextStep} disabled={!canProceed()}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next Step</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Help */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 mb-4">Prefer to speak with someone directly?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors">
              <Phone className="w-4 h-4" />
              <span>Call (661) 123-BUILD</span>
            </button>
            <button className="flex items-center justify-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors">
              <Mail className="w-4 h-4" />
              <span>hello@probuildconcierge.com</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadIntake;
