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
    'pressure-washing': {
      title: 'Pressure Washing',
      subtitle: 'Commercial & Industrial Surface Cleaning',
      priceRange: '$200 - $5K+',
      timeline: '1-2 days',
      description: 'Commercial-grade pressure washing for businesses, parking structures, industrial facilities, and exterior surfaces. A practical starting point to assess your property\'s needs — and often the first step before larger surface or compliance projects.',
      heroImage: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Concrete driveways, sidewalks, and lots',
        'Building exteriors (brick, stucco, siding)',
        'Parking garages and structures',
        'Graffiti and rust stain removal',
        'Grease and oil removal',
        'Pre-treatment for stubborn stains',
        'Eco-friendly cleaning agents available',
        'Commercial and industrial properties',
      ],
      idealFor: [
        'Businesses prepping for surface work or restriping',
        'Property managers maintaining curb appeal',
        'Industrial sites with heavy grime buildup',
        'Retail and restaurant exterior maintenance',
        'Properties preparing for inspections or sale',
      ],
      process: [
        'Surface assessment and preparation',
        'Application of appropriate cleaning solutions',
        'High-pressure washing execution',
        'Detailed rinse and inspection',
        'Final quality review and site cleanup',
      ],
      gallery: [
        'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/5025639/pexels-photo-5025639.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/4254165/pexels-photo-4254165.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1463917/pexels-photo-1463917.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
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
