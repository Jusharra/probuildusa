import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, DollarSign, Clock, Shield, Phone } from 'lucide-react';

const ServicePage: React.FC = () => {
  const { service } = useParams<{ service: string }>();

  const serviceData = {
    'infrastructure-surface': {
      title: 'Infrastructure & Surface Services',
      subtitle: 'Commercial Pavement Solutions for High-Traffic Properties',
      priceRange: '$500 - $75K+',
      timeline: '1-7 days',
      description: 'From freshly striped parking lots to full asphalt resurfacing, we coordinate commercial pavement and surface work that keeps your property safe, compliant, and professional. Businesses, retail centers, and warehouses trust us to manage their surface infrastructure end-to-end.',
      heroImage: 'https://images.pexels.com/photos/3806242/pexels-photo-3806242.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Parking lot line striping & re-striping',
        'ADA compliance markings',
        'Asphalt paving (new & overlay)',
        'Asphalt sealcoating',
        'Pothole repair & patching',
        'Crack sealing (hot-applied rubber)',
        'Drainage correction & grading',
        'Parking blocks, speed bumps & bollards',
        'Fire lane and directional markings',
        'Parking lot signs & bollard covers',
      ],
      idealFor: [
        'Retail shopping centers and strip malls',
        'Commercial office parks and medical facilities',
        'Warehouses and distribution centers',
        'Schools, municipalities, and government properties',
        'Property management companies and HOAs',
      ],
      process: [
        'Site assessment and surface inspection',
        'Scope of work and layout planning',
        'Contractor selection and scheduling',
        'Surface preparation and traffic control',
        'Service execution and quality inspection',
        'Final walkthrough and documentation',
      ],
      gallery: [
        'https://images.pexels.com/photos/3806242/pexels-photo-3806242.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3806245/pexels-photo-3806245.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      ],
    },
    'mechanical-electrical': {
      title: 'Mechanical & Electrical Systems',
      subtitle: 'Commercial and Industrial Electrical & HVAC Services',
      priceRange: '$2,500 - $200K+',
      timeline: '1-21 days',
      description: 'Electrical failures and HVAC breakdowns cost businesses thousands per hour. We connect you with licensed, commercial-grade electrical and HVAC contractors who handle everything from panel upgrades to full industrial system installs — fast, code-compliant, and built to last.',
      heroImage: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Commercial electrical wiring and installation',
        'Panel upgrades and service entrance work',
        'Industrial electrical maintenance and repair',
        'Emergency electrical response',
        'Commercial HVAC system installation',
        'HVAC repair and diagnostics',
        'Rooftop unit (RTU) replacement',
        'Preventative HVAC maintenance contracts',
        'Chiller and boiler systems',
        'Energy efficiency retrofits',
      ],
      idealFor: [
        'Commercial office buildings and medical offices',
        'Retail stores, restaurants, and hospitality venues',
        'Industrial facilities and manufacturing plants',
        'Warehouses and distribution centers',
        'Property managers seeking ongoing service contracts',
      ],
      process: [
        'System assessment and scope definition',
        'Licensed contractor assignment',
        'Permit acquisition (if required)',
        'Scheduled installation or repair',
        'Code compliance inspection',
        'System testing and sign-off',
      ],
      gallery: [
        'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      ],
    },
    'inspections-compliance': {
      title: 'Inspections & Compliance',
      subtitle: 'Due Diligence, Safety, and Pre-Project Clarity',
      priceRange: '$300 - $10K+',
      timeline: '1-3 days',
      description: 'Our inspection services are your compliance bridge — protecting your investment before you buy, build, or sign. From residential home inspections to commercial site evaluations and pre-project safety assessments, we ensure nothing is overlooked before work begins or deals close.',
      heroImage: 'https://images.pexels.com/photos/5025639/pexels-photo-5025639.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Home inspections (pre-purchase & pre-listing)',
        'Commercial property inspections',
        'Pre-project site condition assessments',
        'Safety and hazard inspections',
        'Code compliance reviews',
        'ADA compliance audits',
        'Roof and structural assessments',
        'Electrical and HVAC pre-inspection reports',
        'Environmental preliminary assessments',
        'Written inspection reports with photos',
      ],
      idealFor: [
        'Property buyers and sellers',
        'Real estate investors and developers',
        'General contractors starting new projects',
        'Property managers maintaining compliance',
        'Oil & gas and industrial site operators',
      ],
      process: [
        'Intake and site access coordination',
        'Certified inspector assignment',
        'On-site inspection and documentation',
        'Photo-backed written report delivery',
        'Debrief and recommendations call',
        'Compliance pathway planning (if needed)',
      ],
      gallery: [
        'https://images.pexels.com/photos/5025639/pexels-photo-5025639.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      ],
    },
    'oil-gas-industrial': {
      title: 'Oil & Gas / Industrial Services',
      subtitle: 'Site Coordination, Safety & Environmental Compliance',
      priceRange: '$10K - $500K+',
      timeline: 'Project-based',
      description: 'This is your differentiator. Nobody at our level is coordinating oil & gas site services — from cleanup and equipment maintenance to environmental compliance and regulatory reporting. We bridge the gap between operators and qualified, compliant contractors so projects move without delays or liability.',
      heroImage: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Site cleanup coordination and remediation oversight',
        'Equipment maintenance coordination',
        'Safety inspections and hazard assessments',
        'Environmental compliance services',
        'Spill response coordination',
        'Regulatory reporting assistance',
        'Contractor vetting for industrial projects',
        'Ongoing site monitoring coordination',
        'Documentation and compliance recordkeeping',
        'OSHA and EPA compliance support',
      ],
      idealFor: [
        'Oil & gas operators and exploration companies',
        'Industrial facility managers',
        'Energy companies with active field sites',
        'Environmental and regulatory consultants',
        'Property owners with industrial legacy sites',
      ],
      process: [
        'Site and scope intake consultation',
        'Regulatory and compliance review',
        'Qualified contractor sourcing and vetting',
        'Project coordination and scheduling',
        'On-site oversight and documentation',
        'Compliance sign-off and reporting delivery',
      ],
      gallery: [
        'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/247763/pexels-photo-247763.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      ],
    },
    'estimation-bidding': {
      title: 'Estimation & Bidding Services',
      subtitle: 'Professional Cost Estimation and Bid Package Preparation',
      priceRange: 'Custom / Project-Based',
      timeline: '3-10 business days',
      description: 'Accurate estimates win projects and protect margins. We coordinate professional quantity take-offs, bid package preparation, and cost estimation for commercial, industrial, and infrastructure projects — giving owners and GCs the numbers they need to move with confidence.',
      heroImage: 'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Quantity take-offs (materials, labor, equipment)',
        'Bid package preparation and assembly',
        'Subcontractor scope breakdowns',
        'Cost comparison and value engineering',
        'CSI division organization',
        'Conceptual and schematic estimates',
        'Budget tracking and reconciliation',
        'Pre-bid site walk coordination',
        'Bid leveling and analysis',
        'Final estimate summary and presentation',
      ],
      idealFor: [
        'General contractors bidding new projects',
        'Property owners seeking independent cost validation',
        'Developers planning commercial builds',
        'Project managers overseeing multi-trade scopes',
        'Industrial operators managing capital projects',
      ],
      process: [
        'Project scope and document review',
        'Estimator assignment and take-off initiation',
        'Quantity verification and pricing research',
        'Draft estimate review and refinement',
        'Final deliverable and debrief call',
        'Revisions based on scope changes',
      ],
      gallery: [
        'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      ],
    },
    'permit-compliance': {
      title: 'Permit & Compliance',
      subtitle: 'Permit Acquisition, Code Research & Regulatory Filings',
      priceRange: '$500 - $15K+',
      timeline: 'Varies by jurisdiction',
      description: 'Permits delayed are projects delayed. We handle permit applications, code research, regulatory filings, and compliance documentation so your project moves on schedule — without the back-and-forth with the building department.',
      heroImage: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Building permit application preparation',
        'Plan check coordination',
        'Code research (IBC, CBC, local amendments)',
        'Zoning and land use verification',
        'ADA and accessibility compliance review',
        'Environmental permit coordination',
        'Fire marshal plan review coordination',
        'Inspection scheduling and tracking',
        'Compliance documentation and recordkeeping',
        'NOV (Notice of Violation) response support',
      ],
      idealFor: [
        'General contractors managing multiple permit jurisdictions',
        'Property owners unfamiliar with the permitting process',
        'Developers on fast-track construction schedules',
        'Industrial operators with regulatory deadlines',
        'Businesses responding to code violations or NOVs',
      ],
      process: [
        'Project review and jurisdiction research',
        'Document collection and application preparation',
        'Permit submission and tracking',
        'Plan check response and corrections',
        'Inspection coordination and sign-off',
        'Final permit closeout and documentation',
      ],
      gallery: [
        'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      ],
    },
    'material-procurement': {
      title: 'Material Procurement',
      subtitle: 'Sourcing, Purchasing & Logistics Coordination',
      priceRange: 'Project-Based',
      timeline: 'Per delivery schedule',
      description: 'Supply chain delays kill project timelines. We source, purchase, and coordinate delivery logistics for construction materials and equipment — managing vendor relationships, lead times, and spec compliance so your crew never sits idle waiting on materials.',
      heroImage: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Material specification review and sourcing',
        'Vendor qualification and pricing comparison',
        'Purchase order management',
        'Lead time tracking and expediting',
        'Delivery scheduling and site logistics',
        'Material substitution coordination (value engineering)',
        'Quality verification on receipt',
        'Surplus material management',
        'Specialty and hard-to-source material procurement',
        'Equipment and tool rental coordination',
      ],
      idealFor: [
        'General contractors managing large material budgets',
        'Project owners seeking procurement transparency',
        'Industrial facilities with ongoing supply needs',
        'Developers managing multiple projects simultaneously',
        'Operations teams without dedicated procurement staff',
      ],
      process: [
        'Spec sheet and bill of materials review',
        'Vendor outreach and bid solicitation',
        'Price comparison and approval',
        'Purchase order issuance',
        'Delivery coordination and tracking',
        'Receipt verification and documentation',
      ],
      gallery: [
        'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      ],
    },
    'cleanup-coordination': {
      title: 'Cleanup Coordination',
      subtitle: 'Post-Construction Cleanup, Debris Removal & Site Restoration',
      priceRange: '$500 - $25K+',
      timeline: '1-5 days',
      description: 'A clean site is a safe site — and a prerequisite for final inspection sign-off. We coordinate post-construction cleanup, debris hauling, and site restoration for commercial and industrial projects, ensuring your site is broom-clean, compliant, and ready for occupancy or the next phase.',
      heroImage: 'https://images.pexels.com/photos/5691599/pexels-photo-5691599.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Rough cleanup (debris, scrap, packaging removal)',
        'Final broom-clean and detail cleaning',
        'Window and glass cleaning',
        'Concrete and surface dust removal',
        'Dumpster and haul-off coordination',
        'Hazardous material disposal coordination',
        'Landscaping and exterior restoration',
        'Punch-list cleanup support',
        'LEED and green building compliance cleanup',
        'Industrial site decontamination coordination',
      ],
      idealFor: [
        'General contractors completing commercial builds',
        'Property managers after renovation projects',
        'Industrial facilities post-maintenance shutdown',
        'Developers preparing for tenant move-in',
        'Owners needing final inspection clearance',
      ],
      process: [
        'Site assessment and scope walkthrough',
        'Crew and equipment scheduling',
        'Rough cleanup and debris removal',
        'Detail cleaning and surface prep',
        'Final inspection walkthrough',
        'Sign-off documentation',
      ],
      gallery: [
        'https://images.pexels.com/photos/5691599/pexels-photo-5691599.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/5025639/pexels-photo-5025639.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      ],
    },
    'warranty-maintenance': {
      title: 'Warranty & Maintenance Plans',
      subtitle: 'Ongoing Maintenance Contracts and Warranty Management',
      priceRange: 'Custom / Subscription',
      timeline: 'Ongoing',
      description: 'Your project does not end at completion. We build ongoing maintenance programs that protect your investment, manage contractor warranties, and keep your systems, surfaces, and equipment performing at peak levels — year after year.',
      heroImage: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Preventive maintenance scheduling and dispatch',
        'Contractor warranty tracking and enforcement',
        'Annual inspection coordination',
        'HVAC and mechanical maintenance contracts',
        'Surface and pavement maintenance programs',
        'Electrical system preventive maintenance',
        'Plumbing and fire suppression maintenance',
        'Emergency repair dispatch (24/7 available)',
        'Maintenance log and documentation management',
        'Budget forecasting for capital maintenance',
      ],
      idealFor: [
        'Property managers with multiple assets',
        'Facility directors seeking vendor consolidation',
        'Commercial real estate owners and investors',
        'Industrial operators with complex systems',
        'Businesses wanting predictable maintenance costs',
      ],
      process: [
        'Facility and asset inventory review',
        'Maintenance scope and frequency planning',
        'Contractor assignment and contract execution',
        'Scheduled service delivery and documentation',
        'Monthly reporting and budget tracking',
        'Annual plan review and renewal',
      ],
      gallery: [
        'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      ],
    },
    'clean-truck-check': {
      title: 'Clean Truck Check (CA Only)',
      subtitle: 'CARB Compliance Verification for California Fleets',
      priceRange: 'Per Vehicle / Fleet Pricing',
      timeline: '1-3 days',
      description: 'California\'s Clean Truck Check program requires annual inspections for medium and heavy-duty trucks. Non-compliance means fines, registration holds, and operational shutdowns. We coordinate CARB-authorized inspections, documentation, and fleet compliance plans to keep your trucks running legally in California.',
      heroImage: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'CARB Clean Truck Check inspection coordination',
        'OBD (On-Board Diagnostics) inspection scheduling',
        'Fleet compliance status assessment',
        'VIPER system registration support',
        'Repair coordination for non-compliant vehicles',
        'Fleet compliance recordkeeping',
        'Ongoing compliance monitoring',
        'DOT and registration cross-compliance review',
        'Deadline tracking and renewal reminders',
        'Multi-vehicle fleet discounts available',
      ],
      idealFor: [
        'Trucking companies operating in California',
        'Construction fleets with medium/heavy-duty vehicles',
        'Logistics and delivery operations',
        'Oil & gas field service operators',
        'Any business with CA-registered trucks (GVWR 14,001+ lbs)',
      ],
      process: [
        'Fleet inventory and CARB status review',
        'Inspection site scheduling and vehicle routing',
        'CARB inspection coordination and documentation',
        'Non-compliance repair identification and dispatch',
        'Re-inspection and clearance tracking',
        'Compliance certificate filing and recordkeeping',
      ],
      gallery: [
        'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      ],
    },
  };

  const currentService = serviceData[service as keyof typeof serviceData] || serviceData['infrastructure-surface'];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={currentService.heroImage}
            alt={currentService.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {currentService.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
            {currentService.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-semibold">{currentService.priceRange}</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="text-slate-300">{currentService.timeline}</span>
            </div>
          </div>

          <Link
            to={`/get-started?service=${service}`}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Get Your Quote</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">About This Service</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {currentService.description}
              </p>

              <h3 className="text-xl font-bold text-amber-400 mb-4">What's Included:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {currentService.included.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                <h4 className="font-bold text-amber-400 mb-3">Ideal For:</h4>
                <ul className="space-y-2">
                  {currentService.idealFor.map((item, index) => (
                    <li key={index} className="text-slate-300 flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:sticky lg:top-8">
              <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700">
                <h3 className="text-2xl font-bold mb-6 text-center">Get Started Today</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-slate-700">
                    <span className="text-slate-400">Project Value:</span>
                    <span className="text-amber-400 font-bold">{currentService.priceRange}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-700">
                    <span className="text-slate-400">Timeline:</span>
                    <span className="text-slate-300">{currentService.timeline}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-700">
                    <span className="text-slate-400">Response Time:</span>
                    <span className="text-slate-300">24 hours</span>
                  </div>
                </div>

                <Link
                  to={`/get-started?service=${service}`}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mb-4"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <button className="w-full border-2 border-slate-600 hover:border-amber-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call (661) 123-BUILD</span>
                </button>

                <div className="mt-6 pt-6 border-t border-slate-700">
                  <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span>Licensed & Insured</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span>Vetted Pros</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentService.process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-900 mr-3">
                      {index + 1}
                    </div>
                    <h3 className="font-bold">Step {index + 1}</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{step}</p>
                </div>

                {index < currentService.process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Project Gallery</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentService.gallery.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl aspect-square">
                <img
                  src={image}
                  alt={`${currentService.title} example ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your <span className="text-amber-400">{currentService.title}</span> Project?
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Get matched with vetted contractors who specialize in commercial-grade work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/get-started?service=${service}`}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Get Your Quote Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
