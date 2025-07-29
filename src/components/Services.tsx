import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Building2, TreePine, Wrench, Zap, Users, Hammer, Stethoscope, Shield, DollarSign } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      id: 'line-striping',
      title: 'Line Striping Services',
      description: 'Professional parking lot striping, roadway markings, and ADA compliance',
      priceRange: '$500 - $5K+',
      icon: Home,
      image: 'https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['ADA Compliance', 'Durable Paint', 'Precise Layout', 'Fast Service', 'Custom Stenciling', 'Durable Thermoplastic', 'Parking Lot Signs & Bollard Covers'],
      idealFor: 'Commercial properties, Shopping centers, Schools'
    },
    {
      id: 'power-washing',
      title: 'Power Washing Services',
      description: 'Deep cleaning for buildings, driveways, sidewalks, and outdoor surfaces',
      priceRange: '$150 - $2K+',
      icon: Building2,
      image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Eco-Friendly Solutions', 'High-Pressure Equipment', 'Surface Protection', 'Quick Results'],
      idealFor: 'Homeowners, Property managers, Business owners'
    },
    {
      id: 'window-cleaning',
      title: 'Window Cleaning Services',
      description: 'Crystal clear windows for residential and commercial properties',
      priceRange: '$100 - $1K+',
      icon: TreePine,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Streak-Free Results', 'Interior & Exterior', 'Screen Cleaning', 'Regular Maintenance'],
      idealFor: 'Office buildings, Retail stores, Homeowners'
    },
    {
      id: 'seal-coating',
      title: 'Asphalt Seal Coating',
      description: 'Protect and extend the life of your asphalt surfaces with professional seal coating.',
      priceRange: '$0.50 - $1.50/sq ft',
      icon: Shield,
      image: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['UV Protection', 'Water Resistance', 'Enhanced Appearance', 'Crack Prevention'],
      idealFor: 'Parking lots, Driveways, Commercial properties'
    },
    {
      id: 'paving',
      title: 'Asphalt Paving & Repair',
      description: 'Expert asphalt paving for new installations, overlays, and comprehensive repairs.',
      priceRange: '$2 - $7/sq ft',
      icon: Hammer,
      image: 'https://images.pexels.com/photos/3806242/pexels-photo-3806242.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['New Construction', 'Resurfacing', 'Patching', 'Drainage Solutions', 'Pothole Repair', 'Parking Blocks & Speed Bumps'],
      idealFor: 'Roadways, Parking lots, Industrial sites'
    },
    {
      id: 'crack-sealing',
      title: 'Asphalt Crack Sealing',
      description: 'Prevent further damage and extend pavement life by sealing cracks effectively.',
      priceRange: '$1 - $3/linear ft',
      icon: Wrench,
      image: 'https://images.pexels.com/photos/3806245/pexels-photo-3806245.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Waterproofs Pavement', 'Prevents Potholes', 'Cost-Effective', 'Extends Pavement Life'],
      idealFor: 'Parking lots, Driveways, Roads with minor cracks'
    }
    ,
    {
      id: 'parking-lot-sweeping',
      title: 'Parking Lot Sweeping',
      description: 'Keep your parking areas clean and safe with our comprehensive sweeping services.',
      priceRange: '$100 - $1K+',
      icon: Users, // Using Users icon as a placeholder for now
      image: 'https://images.pexels.com/photos/3806238/pexels-photo-3806238.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', // Placeholder image
      features: ['Debris Removal', 'Litter Pickup', 'Dust Control', 'Scheduled Maintenance'],
      idealFor: 'Commercial properties, Retail centers, Industrial parks'
    },
    {
      id: 'pressure-washing',
      title: 'Pressure Washing Services',
      description: 'High-pressure cleaning for tough stains on concrete, brick, and other hard surfaces.',
      priceRange: '$200 - $3K+',
      icon: Zap,
      image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Deep Stain Removal', 'Concrete Cleaning', 'Brick Restoration', 'Graffiti Removal', 'Commercial & Residential'],
      idealFor: 'Driveways, Sidewalks, Building exteriors, Parking garages'
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Service Solutions</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From precise line striping to sparkling clean windows, we connect you with expert service providers who deliver exceptional results.
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
            <span>Get Your Service Quote Today</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;