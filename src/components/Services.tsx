import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Zap, ClipboardCheck, Flame, DollarSign, Calculator, FileCheck, Package, Trash2, RefreshCcw, Truck, Star, CalendarDays, Lightbulb, ShieldAlert, Wallet } from 'lucide-react';

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
      featured: true,
      featuredSpecialty: 'Drywall',
      featuredTagline: 'Now Specializing in Drywall Estimation & Bidding',
      featuredDescription: 'From light-gauge framing to large-scale commercial drywall scopes, our estimators deliver precise take-offs, material breakdowns, and competitive bid packages — fast. Win more bids and protect your margins with numbers you can trust.',
      featuredStats: [
        { label: 'Avg. Turnaround', value: '3–5 Days' },
        { label: 'Accuracy Rate', value: '98%+' },
        { label: 'CSI Formatted', value: 'Always' },
      ],
      featuredIncludes: [
        'Drywall Quantity Take-Offs',
        'Material & Labor Breakdowns',
        'Framing & Sheathing Scope',
        'Insulation & Finishing Estimates',
        'Bid Package Assembly',
        'Value Engineering Options',
      ],
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
    {
      id: 'scheduling',
      title: 'Project Scheduling',
      description: 'Master schedule creation, milestone tracking, and timeline management for construction and commercial projects.',
      priceRange: 'Project-Based',
      icon: CalendarDays,
      image: 'https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      subServices: ['Master Schedule Build', 'Milestone Tracking', 'CPM Scheduling', 'Schedule Recovery', 'Lookahead Planning'],
      idealFor: 'GCs, project owners, developers, facility managers',
    },
    {
      id: 'project-feasibility',
      title: 'Project Feasibility',
      description: 'Pre-development feasibility studies, site assessments, and go/no-go analysis for commercial and industrial projects.',
      priceRange: 'Custom / Study-Based',
      icon: Lightbulb,
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      subServices: ['Site Feasibility Studies', 'Cost-Benefit Analysis', 'Market Analysis', 'Zoning & Code Review', 'Pro Forma Modeling'],
      idealFor: 'Developers, investors, property owners, municipalities',
    },
    {
      id: 'project-risk-management',
      title: 'Project Risk Management',
      description: 'Risk identification, mitigation planning, and contingency management to protect your project from cost overruns and delays.',
      priceRange: 'Project-Based',
      icon: ShieldAlert,
      image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      subServices: ['Risk Register Development', 'Mitigation Planning', 'Contingency Analysis', 'Insurance Review', 'Change Order Management'],
      idealFor: 'Project owners, GCs, developers, industrial operators',
    },
    {
      id: 'project-budget-management',
      title: 'Project Budget Management',
      description: 'Budget development, cost tracking, and financial reporting to keep your project on budget from groundbreaking to closeout.',
      priceRange: 'Project-Based',
      icon: Wallet,
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      subServices: ['Budget Development', 'Cost Tracking', 'Cash Flow Forecasting', 'Financial Reporting', 'Variance Analysis'],
      idealFor: 'Owners, developers, GCs, project managers',
    },
  ];

  const featuredService = categories.find((c) => (c as any).featured);
  const gridServices = categories.filter((c) => !(c as any).featured);

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

        {/* Featured Service Banner */}
        {featuredService && (() => {
          const f = featuredService as any;
          const FeaturedIcon = f.icon;
          return (
            <div className="mb-10 rounded-2xl overflow-hidden border-2 border-amber-400/60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl shadow-amber-500/10">
              <div className="grid lg:grid-cols-2">
                {/* Left: image */}
                <div className="relative h-64 lg:h-auto min-h-[280px] overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 via-transparent to-slate-900/80 lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/90"></div>
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <div className="bg-amber-500 p-2.5 rounded-lg shadow-lg">
                      <FeaturedIcon className="w-5 h-5 text-slate-900" />
                    </div>
                    <span className="bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Featured Service</span>
                    </span>
                  </div>
                </div>

                {/* Right: content */}
                <div className="p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-amber-400/30">
                        Now Specializing
                      </span>
                      <span className="text-amber-400 font-bold text-sm">Drywall</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{f.title}</h3>
                    <p className="text-amber-400 font-semibold mb-4">{f.featuredTagline}</p>
                    <p className="text-slate-300 leading-relaxed mb-6">{f.featuredDescription}</p>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-slate-700">
                      {f.featuredStats.map((s: any) => (
                        <div key={s.label} className="text-center">
                          <div className="text-xl font-bold text-amber-400">{s.value}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Includes */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {f.featuredIncludes.map((item: string) => (
                        <div key={item} className="flex items-center space-x-2 text-sm text-slate-300">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={`/get-started?service=${f.id}`}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>Get a Drywall Estimate</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to={`/services/${f.id}`}
                      className="flex-1 border border-slate-600 hover:border-amber-400 text-slate-300 hover:text-amber-400 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gridServices.map((cat) => {
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
