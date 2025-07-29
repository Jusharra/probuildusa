import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, DollarSign, Clock, Shield, Users, Phone } from 'lucide-react';

const ServicePage: React.FC = () => {
  const { service } = useParams<{ service: string }>();

  // Complete service data for all 10 high-ticket construction services
  const serviceData = {
    'luxury-home-remodeling': {
      title: 'Luxury Home Remodeling',
      subtitle: 'Transform Your Home Into a Masterpiece',
      priceRange: '$50K - $500K+',
      timeline: '3-8 months',
      description: 'Elevate your living space with premium materials, expert craftsmanship, and personalized design. Our luxury remodeling specialists create stunning transformations that increase both comfort and property value.',
      heroImage: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Custom design consultation',
        'Premium material selection',
        'Licensed contractor network',
        'Project management',
        'Permit handling',
        'Quality inspections',
        'Warranty coverage',
        'Financing options'
      ],
      idealFor: [
        'Luxury homeowners seeking premium finishes',
        'Properties valued $500K+',
        'Whole-house renovations',
        'Kitchen and bathroom remodels',
        'Home additions and extensions'
      ],
      process: [
        'Initial consultation and vision assessment',
        'Custom design development',
        'Contractor matching and selection',
        'Project planning and permits',
        'Construction and regular updates',
        'Final inspection and warranty activation'
      ],
      gallery: [
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    },
    'accessory-dwelling-units': {
      title: 'Accessory Dwelling Units (ADUs)',
      subtitle: 'Add Value with Custom ADUs & Rental Units',
      priceRange: '$75K - $300K',
      timeline: '4-8 months',
      description: 'Maximize your property potential with custom ADUs, granny flats, and rental units. Our ADU specialists handle everything from design and permits to construction, creating additional income streams and housing solutions.',
      heroImage: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'ADU design and planning',
        'Permit acquisition and approvals',
        'Utility connections and hookups',
        'Full construction management',
        'Rental-ready finishing',
        'Code compliance assurance',
        'ROI analysis and projections',
        'Financing assistance'
      ],
      idealFor: [
        'Property investors seeking rental income',
        'Multi-generational families',
        'Homeowners maximizing property value',
        'Urban infill development projects',
        'Aging-in-place solutions'
      ],
      process: [
        'Site assessment and feasibility study',
        'Custom ADU design development',
        'Permit application and approval',
        'Utility planning and connections',
        'Construction and quality control',
        'Final inspections and rental preparation'
      ],
      gallery: [
        'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    },
    'commercial-build-outs': {
      title: 'Commercial Build-Outs & Tenant Improvements',
      subtitle: 'Professional Spaces That Drive Business Success',
      priceRange: '$25K - $1M+',
      timeline: '2-6 months',
      description: 'Transform commercial spaces with professional build-outs and tenant improvements. Our commercial specialists deliver functional, code-compliant spaces that enhance productivity and customer experience while minimizing business downtime.',
      heroImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Space planning and design',
        'ADA compliance assurance',
        'MEP coordination and installation',
        'Fast-track construction scheduling',
        'Minimal business disruption',
        'Code compliance and inspections',
        'Technology infrastructure setup',
        'Move-in coordination'
      ],
      idealFor: [
        'Business owners expanding operations',
        'Commercial property investors',
        'Retail and restaurant operators',
        'Professional service firms',
        'Medical and dental practices'
      ],
      process: [
        'Business needs assessment and planning',
        'Commercial space design development',
        'Permit acquisition and approvals',
        'Fast-track construction execution',
        'Systems integration and testing',
        'Final walkthrough and business handover'
      ],
      gallery: [
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3182834/pexels-photo-3182834.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    },
    'luxury-outdoor-living': {
      title: 'Luxury Outdoor Living',
      subtitle: 'Create Your Personal Resort Experience',
      priceRange: '$40K - $400K',
      timeline: '2-6 months',
      description: 'Design and build stunning outdoor living spaces including pools, outdoor kitchens, patios, and complete entertainment areas. Our outdoor living specialists create resort-quality experiences in your own backyard.',
      heroImage: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Custom pool design and installation',
        'Outdoor kitchen construction',
        'Patio and hardscaping',
        'Landscape integration',
        'Lighting and electrical systems',
        'Fire features and water elements',
        'Entertainment area setup',
        'Seasonal maintenance planning'
      ],
      idealFor: [
        'Luxury homeowners seeking entertainment spaces',
        'Properties with large outdoor areas',
        'Pool and spa enthusiasts',
        'Outdoor cooking and dining lovers',
        'Resort-style living seekers'
      ],
      process: [
        'Outdoor space assessment and vision planning',
        'Custom design and 3D visualization',
        'Permit acquisition and utility planning',
        'Excavation and infrastructure installation',
        'Construction and feature integration',
        'Landscaping and final styling'
      ],
      gallery: [
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    },
    'custom-home-building': {
      title: 'Custom Home Building',
      subtitle: 'Build Your Dream Home From the Ground Up',
      priceRange: '$200K - $2M+',
      timeline: '8-18 months',
      description: 'Create your perfect home with ground-up custom construction built to your exact specifications. Our custom home builders deliver personalized living spaces that reflect your lifestyle, preferences, and long-term vision.',
      heroImage: 'https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Architectural design services',
        'Custom floor plan development',
        'Premium material selection',
        'Full construction management',
        'Quality control inspections',
        'Energy efficiency optimization',
        'Smart home integration',
        'Comprehensive warranty coverage'
      ],
      idealFor: [
        'Custom home buyers with specific visions',
        'Land owners ready to build',
        'Families seeking personalized spaces',
        'Luxury home market participants',
        'Energy-conscious builders'
      ],
      process: [
        'Vision consultation and site analysis',
        'Architectural design and planning',
        'Permit acquisition and approvals',
        'Foundation and framing construction',
        'Systems installation and finishing',
        'Final walkthrough and warranty activation'
      ],
      gallery: [
        'https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    },
    'disaster-restoration': {
      title: 'Disaster Restoration & Insurance Rebuilds',
      subtitle: 'Restore Your Property Better Than Before',
      priceRange: '$15K - $500K',
      timeline: '1-8 months',
      description: 'Professional disaster restoration and insurance rebuild services for fire, water, storm, and other damage. Our restoration specialists work directly with insurance companies to restore your property efficiently and comprehensively.',
      heroImage: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Emergency response and stabilization',
        'Insurance claim assistance',
        'Damage assessment and documentation',
        'Full restoration construction',
        'Code upgrade compliance',
        'Content restoration services',
        '24/7 emergency availability',
        'Direct insurance billing'
      ],
      idealFor: [
        'Property owners with insurance claims',
        'Emergency restoration situations',
        'Fire and water damage recovery',
        'Storm and natural disaster victims',
        'Commercial property restoration'
      ],
      process: [
        'Emergency response and damage assessment',
        'Insurance claim documentation and filing',
        'Restoration planning and approvals',
        'Demolition and cleanup services',
        'Reconstruction and restoration work',
        'Final inspection and claim closure'
      ],
      gallery: [
        'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/5691479/pexels-photo-5691479.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/5691484/pexels-photo-5691484.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/5691486/pexels-photo-5691486.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    },
    'solar-smart-home': {
      title: 'Solar + Smart Home Retrofits',
      subtitle: 'Upgrade to Intelligent, Sustainable Living',
      priceRange: '$20K - $150K',
      timeline: '1-4 months',
      description: 'Transform your home with solar energy systems and smart home technology retrofits. Our specialists integrate renewable energy solutions with intelligent automation for maximum efficiency, comfort, and long-term savings.',
      heroImage: 'https://images.pexels.com/photos/4254165/pexels-photo-4254165.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Solar system design and installation',
        'Smart home automation setup',
        'Energy efficiency audits',
        'Battery storage integration',
        'Smart thermostat and lighting',
        'Security system integration',
        'Financing and incentive assistance',
        'Monitoring and maintenance plans'
      ],
      idealFor: [
        'Eco-conscious homeowners',
        'Technology enthusiasts',
        'Energy cost reduction seekers',
        'Home automation adopters',
        'Sustainable living advocates'
      ],
      process: [
        'Energy audit and system assessment',
        'Custom solar and smart home design',
        'Permit acquisition and utility coordination',
        'Solar installation and electrical work',
        'Smart system integration and programming',
        'System testing and homeowner training'
      ],
      gallery: [
        'https://images.pexels.com/photos/4254165/pexels-photo-4254165.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/4254151/pexels-photo-4254151.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/4254167/pexels-photo-4254167.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/4254169/pexels-photo-4254169.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    },
    'multifamily-conversions': {
      title: 'Multifamily Conversions',
      subtitle: 'Convert Properties Into Profitable Rental Units',
      priceRange: '$50K - $800K',
      timeline: '3-10 months',
      description: 'Transform single-family homes and commercial properties into profitable multifamily rental units. Our conversion specialists maximize rental income potential while ensuring code compliance and tenant satisfaction.',
      heroImage: 'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Feasibility analysis and ROI projections',
        'Zoning compliance and permits',
        'Unit conversion and separation',
        'Individual utility metering',
        'Rental-optimized floor plans',
        'Code compliance assurance',
        'Property management preparation',
        'Financing and investment guidance'
      ],
      idealFor: [
        'Real estate investors',
        'Property developers',
        'Rental income seekers',
        'Urban infill projects',
        'Portfolio diversification strategies'
      ],
      process: [
        'Property assessment and conversion planning',
        'Zoning research and permit acquisition',
        'Architectural design for unit separation',
        'Construction and utility installation',
        'Individual unit finishing and preparation',
        'Final inspections and rental readiness'
      ],
      gallery: [
        'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    },
    'foundation-repairs': {
      title: 'Foundation & Structural Repairs',
      subtitle: 'Expert Solutions for Structural Integrity',
      priceRange: '$10K - $200K',
      timeline: '1-6 months',
      description: 'Professional foundation and structural repair services using advanced engineering solutions. Our structural specialists diagnose and resolve foundation issues, ensuring long-term stability and property value protection.',
      heroImage: 'https://images.pexels.com/photos/5691479/pexels-photo-5691479.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Structural engineering assessments',
        'Foundation repair and stabilization',
        'Waterproofing and drainage solutions',
        'Concrete and masonry restoration',
        'Soil stabilization treatments',
        'Structural reinforcement systems',
        'Warranty coverage on repairs',
        'Ongoing monitoring services'
      ],
      idealFor: [
        'Properties with foundation issues',
        'Structural damage situations',
        'Basement waterproofing needs',
        'Settlement and shifting problems',
        'Pre-purchase inspection failures'
      ],
      process: [
        'Comprehensive structural assessment',
        'Engineering analysis and solution design',
        'Permit acquisition and planning',
        'Foundation repair and reinforcement',
        'Waterproofing and drainage installation',
        'Final inspection and warranty activation'
      ],
      gallery: [
        'https://images.pexels.com/photos/5691479/pexels-photo-5691479.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/5691484/pexels-photo-5691484.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/5691486/pexels-photo-5691486.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    },
    'healthcare-facilities': {
      title: 'Healthcare & Senior Living Facilities',
      subtitle: 'Specialized Construction for Care & Wellness',
      priceRange: '$50K - $2M+',
      timeline: '3-12 months',
      description: 'Expert construction and renovation services for outpatient care centers, behavioral health clinics, and senior living facilities. Our healthcare construction specialists ensure regulatory compliance, patient safety, and operational efficiency.',
      heroImage: 'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Healthcare code compliance assurance',
        'Specialized HVAC and air filtration',
        'Infection control systems',
        'ADA accessibility compliance',
        'Medical gas and electrical systems',
        'Behavioral health safety features',
        'Senior-friendly design elements',
        'Fast-track construction scheduling'
      ],
      idealFor: [
        'Outpatient care centers',
        'Behavioral health clinics',
        'Senior living facilities',
        'Memory care units',
        'Rehabilitation centers',
        'Urgent care facilities'
      ],
      process: [
        'Healthcare facility needs assessment',
        'Regulatory compliance planning',
        'Permit acquisition and approvals',
        'Specialized construction and installation',
        'Medical equipment integration',
        'Final inspections and facility handover'
      ],
      gallery: [
        'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    }
  };

  const currentService = serviceData[service as keyof typeof serviceData] || serviceData['line-striping'];

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
            to="/get-started"
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
                  to="/get-started"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mb-4"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <button className="w-full border-2 border-slate-600 hover:border-amber-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call (555) 123-BUILD</span>
                </button>

                <div className="mt-6 pt-6 border-t border-slate-700">
                  <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span>Licensed & Insured</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span>5-Star Pros</span>
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
            Get matched with premium contractors who specialize in high-end projects like yours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-started"
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