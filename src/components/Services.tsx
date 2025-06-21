import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Building2, TreePine, Wrench, Zap, Users, Hammer, Stethoscope, Shield, DollarSign } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      id: 'luxury-home-remodeling',
      title: 'Luxury Home Remodeling',
      description: 'Transform your home with premium finishes and expert craftsmanship',
      priceRange: '$50K - $500K+',
      icon: Home,
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Custom Design', 'Premium Materials', 'Project Management', 'Licensed Teams'],
      idealFor: 'Luxury homeowners, High-end properties'
    },
    {
      id: 'accessory-dwelling-units',
      title: 'Accessory Dwelling Units (ADUs)',
      description: 'Add value with custom ADUs, granny flats, and rental units',
      priceRange: '$75K - $300K',
      icon: Building2,
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Permit Handling', 'Design Build', 'Utility Connections', 'Rental Ready'],
      idealFor: 'Property investors, Multi-generational families'
    },
    {
      id: 'commercial-build-outs',
      title: 'Commercial Build-Outs',
      description: 'Professional tenant improvements and commercial renovations',
      priceRange: '$25K - $1M+',
      icon: Building2,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Fast Track', 'ADA Compliance', 'MEP Coordination', 'Minimal Downtime'],
      idealFor: 'Business owners, Commercial investors'
    },
    {
      id: 'luxury-outdoor-living',
      title: 'Luxury Outdoor Living',
      description: 'Pools, outdoor kitchens, patios, and complete outdoor spaces',
      priceRange: '$40K - $400K',
      icon: TreePine,
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Pool Installation', 'Outdoor Kitchens', 'Landscaping', 'Entertainment Areas'],
      idealFor: 'Luxury homeowners, Entertainment enthusiasts'
    },
    {
      id: 'custom-home-building',
      title: 'Custom Home Building',
      description: 'Ground-up custom homes built to your exact specifications',
      priceRange: '$200K - $2M+',
      icon: Home,
      image: 'https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Architectural Design', 'Custom Features', 'Premium Materials', 'Full Service'],
      idealFor: 'Custom home buyers, Land owners'
    },
    {
      id: 'disaster-restoration',
      title: 'Disaster Restoration',
      description: 'Insurance rebuilds and emergency restoration services',
      priceRange: '$15K - $500K',
      icon: Shield,
      image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Insurance Claims', 'Emergency Response', 'Full Restoration', '24/7 Service'],
      idealFor: 'Insurance claims, Emergency situations'
    },
    {
      id: 'solar-smart-home',
      title: 'Solar + Smart Home Retrofits',
      description: 'Energy efficiency upgrades and smart home technology',
      priceRange: '$20K - $150K',
      icon: Zap,
      image: 'https://images.pexels.com/photos/4254165/pexels-photo-4254165.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Solar Installation', 'Smart Automation', 'Energy Audits', 'Financing Available'],
      idealFor: 'Eco-conscious homeowners, Tech enthusiasts'
    },
    {
      id: 'multifamily-conversions',
      title: 'Multifamily Conversions',
      description: 'Convert properties into profitable rental units',
      priceRange: '$50K - $800K',
      icon: Users,
      image: 'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Unit Conversion', 'Zoning Compliance', 'Rental Optimization', 'ROI Analysis'],
      idealFor: 'Property investors, Real estate developers'
    },
    {
      id: 'foundation-repairs',
      title: 'Foundation & Structural Repairs',
      description: 'Expert foundation and structural engineering solutions',
      priceRange: '$10K - $200K',
      icon: Hammer,
      image: 'https://images.pexels.com/photos/5691479/pexels-photo-5691479.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Engineering Reports', 'Structural Repairs', 'Foundation Work', 'Waterproofing'],
      idealFor: 'Structural issues, Foundation problems'
    },
    {
      id: 'healthcare-facilities',
      title: 'Healthcare & Senior Living Facilities',
      description: 'Specialized construction for outpatient care, behavioral health, and senior living',
      priceRange: '$50K - $2M+',
      icon: Stethoscope,
      image: 'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Healthcare Code Compliance', 'Specialized Equipment', 'Infection Control', 'ADA Accessibility'],
      idealFor: 'Healthcare providers, Senior living operators, Behavioral health clinics'
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            High-Ticket <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Construction Services</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From luxury remodels to custom builds, we connect you with premium contractors who specialize in high-value projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-amber-500 p-2 rounded-lg">
                      <IconComponent className="w-5 h-5 text-slate-900" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 font-semibold text-sm">{service.priceRange}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-amber-400 mb-2">What's Included:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {service.features.map((feature, index) => (
                        <div key={index} className="text-xs text-slate-400 flex items-center">
                          <div className="w-1 h-1 bg-amber-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-xs text-slate-500">
                      <span className="font-semibold">Ideal for:</span> {service.idealFor}
                    </div>
                  </div>

                  <Link
                    to={`/services/${service.id}`}
                    className="group/btn w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-amber-500 hover:to-amber-600 text-white hover:text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/get-started"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Start Your Project Today</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;