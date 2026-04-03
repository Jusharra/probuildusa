import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Zap, ClipboardCheck, Flame, DollarSign, Calculator, FileCheck, Package, Trash2, RefreshCcw, Truck } from 'lucide-react';

const Services: React.FC = () => {
  const categories = [
    {
      id: 'infrastructure-surface',
      title: 'Infrastructure & Surface',
      description: 'Commercial pavement, parking lot, and surface solutions built for high-traffic properties.',
      priceRange: '$500 - $75K+',
      icon: Building2,
      image: 'https://images.pexels.com/photos/3806242/pexels-photo-3806242.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      subServices: ['Line Striping', 'Asphalt Paving', 'Sealcoating', 'Crack Sealing', 'Parking Lot Repair'],
      idealFor: 'Businesses, warehouses, retail centers, property managers',
    },
    {
      id: 'mechanical-electrical',
      title: 'Mechanical & Electrical',
      description: 'High-ticket commercial and industrial electrical and HVAC services that businesses depend on.',
      priceRange: '$2,500 - $200K+',
      icon: Zap,
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      subServices: ['Commercial Electrical', 'Panel Upgrades', 'Industrial Electrical', 'Commercial HVAC', 'Maintenance Contracts'],
      idealFor: 'Commercial facilities, industrial plants, office buildings',
    },
    {
      id: 'inspections-compliance',
      title: 'Inspections & Compliance',
      description: 'Professional inspections that protect your investment and bridge your path to full compliance.',
      priceRange: '$300 - $10K+',
      icon: ClipboardCheck,
      image: 'https://images.pexels.com/photos/5025639/pexels-photo-5025639.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      subServices: ['Pre-Purchase Inspections', 'Code Compliance Reviews', 'ADA Audits', 'Safety Checks', 'Environmental Assessments'],
      idealFor: 'Property owners, developers, project managers, buyers',
    },
    {
      id: 'oil-gas-industrial',
      title: 'Oil & Gas / Industrial',
      description: 'Site coordination, environmental compliance, and industrial maintenance — done right.',
      priceRange: '$10K - $500K+',
      icon: Flame,
      image: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      subServices: ['Site Cleanup', 'Equipment Maintenance', 'Safety Inspections', 'Environmental Compliance', 'Regulatory Reporting'],
      idealFor: 'Oil & gas operators, industrial sites, energy companies',
    },
    {
      id: 'estimation-bidding',
      title: 'Estimation & Bidding',
      description: 'Professional quantity take-offs, bid packages, and cost estimation for commercial and industrial projects.',
      priceRange: 'Custom / Project-Based',
      icon: Calculator,
      image: 'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      subServices: ['Quantity Take-Offs', 'Bid Package Prep', 'Cost Estimation', 'Bid Leveling', 'Value Engineering'],
      idealFor: 'General contractors, developers, project owners',
    },
    {
      id: 'permit-compliance',
      title: 'Permit & Compliance',
      description: 'Permit acquisition, code research, regulatory filings, and compliance documentation handled for you.',
      priceRange: '$500 - $15K+',
      icon: FileCheck,
      image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      subServices: ['Permit Applications', 'Plan Check Coordination', 'Code Research', 'NOV Response', 'Inspection Scheduling'],
      idealFor: 'Contractors, property owners, developers, industrial operators',
    },
    {
      id: 'material-procurement',
      title: 'Material Procurement',
      description: 'Sourcing, purchasing, and logistics coordination for construction materials and supplies.',
      priceRange: 'Project-Based',
      icon: Package,
      image: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      subServices: ['Material Sourcing', 'Vendor Management', 'Purchase Orders', 'Delivery Coordination', 'Specialty Procurement'],
      idealFor: 'GCs, project owners, industrial facilities, developers',
    },
    {
      id: 'cleanup-coordination',
      title: 'Cleanup Coordination',
      description: 'Post-construction cleanup, debris removal, and site restoration — fully coordinated.',
      priceRange: '$500 - $25K+',
      icon: Trash2,
      image: 'https://images.pexels.com/photos/5691599/pexels-photo-5691599.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      subServices: ['Rough Cleanup', 'Final Broom-Clean', 'Debris Hauling', 'Hazmat Disposal', 'Industrial Site Cleanup'],
      idealFor: 'GCs, property managers, industrial facilities, developers',
    },
    {
      id: 'warranty-maintenance',
      title: 'Warranty & Maintenance Plans',
      description: 'Ongoing maintenance contracts, warranty management, and preventive care programs.',
      priceRange: 'Custom / Subscription',
      icon: RefreshCcw,
      image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      subServices: ['Preventive Maintenance', 'Warranty Tracking', 'Emergency Dispatch', 'Annual Inspections', 'Budget Forecasting'],
      idealFor: 'Property managers, facility directors, commercial owners',
    },
    {
      id: 'clean-truck-check',
      title: 'Clean Truck Check',
      description: 'CARB compliance verification and fleet inspections for California Clean Truck Check requirements.',
      priceRange: 'Per Vehicle / Fleet',
      icon: Truck,
      image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      subServices: ['CARB Inspections', 'Fleet Compliance Review', 'VIPER Registration', 'Repair Coordination', 'Compliance Recordkeeping'],
      idealFor: 'CA trucking fleets, construction, logistics, field service',
      badge: 'CA Only',
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-3">What We Manage</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Serious Operations</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We're not a directory. We're your operations partner — connecting property owners and project managers with elite contractors across high-stakes commercial services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div key={cat.id} className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <div className="bg-amber-500 p-2 rounded-lg">
                      <IconComponent className="w-4 h-4 text-slate-900" />
                    </div>
                    {(cat as any).badge && (
                      <span className="bg-blue-500/90 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{(cat as any).badge}</span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center space-x-1">
                      <DollarSign className="w-3 h-3 text-amber-400" />
                      <span className="text-amber-400 font-semibold text-xs">{cat.priceRange}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-amber-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-slate-400 mb-3 leading-relaxed text-sm">
                    {cat.description}
                  </p>

                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Services Include:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {cat.subServices.map((svc, i) => (
                        <div key={i} className="text-xs text-slate-400 flex items-center">
                          <div className="w-1 h-1 bg-amber-400 rounded-full mr-2 flex-shrink-0"></div>
                          {svc}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 text-xs text-slate-500">
                    <span className="font-semibold text-slate-400">Ideal for:</span> {cat.idealFor}
                  </div>

                  <Link
                    to={`/services/${cat.id}`}
                    className="group/btn mt-auto w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-amber-500 hover:to-amber-600 text-white hover:text-slate-900 px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
                  >
                    <span>Learn More & Get Quote</span>
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
