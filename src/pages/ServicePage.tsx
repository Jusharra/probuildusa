import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, DollarSign, Clock, Shield, Users, Phone } from 'lucide-react';

const ServicePage: React.FC = () => {
  const { service } = useParams<{ service: string }>();

  // Complete service data for all 10 high-ticket construction services
  const serviceData = {
    'line-striping': {
      title: 'Professional Line Striping',
      subtitle: 'Precision Line Striping for Safety and Compliance',
      priceRange: '$500 - $5K+',
      timeline: '1-3 days',
      description: 'Ensure clear, compliant, and durable markings for your property with our professional line striping services. We specialize in creating highly visible and long-lasting lines for parking lots, roadways, sports courts, warehouses, and more, enhancing safety and optimizing traffic flow.',
      heroImage: 'https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Parking lot layout & re-striping',
        'ADA compliance markings',
        'Fire lane striping',
        'Directional arrows & stenciling',
        'Sports court markings',
        'Warehouse floor markings',
        'Curb painting',
        'Reflective paint options'
      ],
      idealFor: [
        'Commercial properties needing compliance',
        'Retail shopping centers and malls',
        'Office buildings and medical facilities',
        'Schools and recreational facilities',
        'Warehouses and industrial properties'
      ],
      process: [
        'Site assessment and measurement',
        'Layout planning and design approval',
        'Surface preparation and cleaning',
        'Precision application of markings',
        'Quality inspection and touch-ups',
        'Final walkthrough and documentation'
      ],
      gallery: [
        'https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    },
    'power-washing': {
      title: 'Power Washing Services',
      subtitle: 'Restore and Protect Your Property\'s Exterior',
      priceRange: '$150 - $2K+',
      timeline: '1-2 days',
      description: 'Our expert power washing services effectively remove dirt, grime, mold, mildew, and other unsightly buildup from various surfaces. We use state-of-the-art equipment and eco-friendly solutions to safely clean buildings, driveways, sidewalks, decks, fences, and more, restoring their original appearance and extending their lifespan.',
      heroImage: 'https://images.pexels.com/photos/5025639/pexels-photo-5025639.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Building exterior cleaning (siding, brick, stucco)',
        'Concrete driveway & sidewalk cleaning',
        'Deck & patio washing',
        'Fence cleaning',
        'Graffiti removal',
        'Soft washing for delicate surfaces',
        'Commercial & residential properties',
        'Eco-friendly cleaning solutions'
      ],
      idealFor: [
        'Property managers maintaining curb appeal',
        'Homeowners preparing for sale',
        'Commercial buildings needing maintenance',
        'Restaurants and retail establishments',
        'Properties with mold, mildew, or staining'
      ],
      process: [
        'Property assessment and surface evaluation',
        'Equipment setup and safety preparation',
        'Pre-treatment of stubborn stains',
        'Professional power washing application',
        'Post-cleaning inspection and touch-ups',
        'Property restoration and cleanup'
      ],
      gallery: [
        'https://images.pexels.com/photos/5025639/pexels-photo-5025639.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/4254165/pexels-photo-4254165.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1463917/pexels-photo-1463917.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    },
    'window-cleaning': {
      title: 'Window Cleaning Services',
      subtitle: 'Crystal Clear Views, Every Time',
      priceRange: '$100 - $1K+',
      timeline: '1 day',
      description: 'Experience streak-free, sparkling windows with our professional window cleaning services. Whether it\'s a commercial high-rise or a residential home, our skilled technicians use advanced techniques and purified water systems to deliver impeccable results, enhancing curb appeal and maximizing natural light.',
      heroImage: 'https://images.pexels.com/photos/355164/pexels-photo-355164.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Commercial window cleaning (low-rise to high-rise)',
        'Residential window cleaning (interior & exterior)',
        'Post-construction window cleaning',
        'Screen cleaning',
        'Hard water stain removal',
        'Skylight cleaning',
        'Regular maintenance programs',
        'Purified water systems for streak-free results'
      ],
      idealFor: [
        'Office buildings and commercial properties',
        'Retail stores and restaurants',
        'Residential homes and condominiums',
        'Medical facilities requiring spotless windows',
        'Properties with hard-to-reach windows'
      ],
      process: [
        'Window assessment and access planning',
        'Setup of safety equipment and tools',
        'Pre-cleaning of frames and sills',
        'Professional window cleaning application',
        'Quality inspection for streak-free finish',
        'Final cleanup and customer walkthrough'
      ],
      gallery: [
        'https://images.pexels.com/photos/355164/pexels-photo-355164.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    },
    'seal-coating': {
      title: 'Asphalt Seal Coating',
      subtitle: 'Protect and Preserve Your Pavement Investment',
      priceRange: '$0.50 - $1.50/sq ft',
      timeline: '1-2 days',
      description: 'Seal coating is a protective layer applied to asphalt pavements to shield them from UV rays, water penetration, and chemical spills. This process not only extends the lifespan of your asphalt but also restores its rich black appearance, enhancing curb appeal and preventing costly repairs down the line.',
      heroImage: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Thorough surface cleaning and preparation',
        'Application of high-quality asphalt sealer',
        'Protection against oxidation and water damage',
        'Restoration of pavement color and appearance',
        'Extension of pavement lifespan',
        'Commercial and residential applications',
        'Traffic control during application'
      ],
      idealFor: [
        'Parking lots and commercial properties',
        'Residential driveways',
        'HOA communities and apartment complexes',
        'Any asphalt surface showing signs of aging or fading',
        'Preventative maintenance programs'
      ],
      process: [
        'Initial inspection and surface assessment',
        'Cleaning of debris, dirt, and oil stains',
        'Minor crack filling (if necessary)',
        'Application of one or two coats of sealer',
        'Curing time and re-opening for traffic',
        'Final quality check'
      ],
      gallery: [
        'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3806248/pexels-photo-3806248.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3806247/pexels-photo-3806247.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3806246/pexels-photo-3806246.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    },
    'paving': {
      title: 'Asphalt Paving & Repair',
      subtitle: 'Durable Pavement Solutions for New and Existing Surfaces',
      priceRange: '$2 - $7/sq ft',
      timeline: '2-7 days',
      description: 'From new asphalt installations to comprehensive repairs and overlays, our paving experts deliver smooth, durable, and long-lasting surfaces. We handle everything from sub-base preparation to final compaction, ensuring your pavement can withstand heavy traffic and harsh weather conditions for years to come.',
      heroImage: 'https://images.pexels.com/photos/3806242/pexels-photo-3806242.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'New asphalt construction',
        'Asphalt overlays and resurfacing',
        'Pothole repair and patching',
        'Asphalt removal and replacement',
        'Drainage correction and grading',
        'Speed bump and bollard installation',
        'Commercial and industrial paving',
        'Roadway and parking lot construction'
      ],
      idealFor: [
        'New commercial developments',
        'Existing parking lots needing major repair',
        'Industrial facilities with heavy vehicle traffic',
        'Roadways and private drives',
        'Property managers seeking long-term solutions'
      ],
      process: [
        'Site evaluation and project planning',
        'Excavation and sub-base preparation',
        'Installation of drainage systems (if needed)',
        'Application of asphalt layers',
        'Compaction and finishing',
        'Curing and final inspection'
      ],
      gallery: [
        'https://images.pexels.com/photos/3806242/pexels-photo-3806242.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3806241/pexels-photo-3806241.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3806240/pexels-photo-3806240.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3806239/pexels-photo-3806239.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
      ]
    },
    'crack-sealing': {
      title: 'Asphalt Crack Sealing',
      subtitle: 'Prevent Pavement Deterioration with Expert Crack Sealing',
      priceRange: '$1 - $3/linear ft',
      timeline: '1 day',
      description: 'Crack sealing is a crucial preventative maintenance step that stops water penetration into the asphalt sub-base, preventing potholes and further deterioration. Our team uses hot-applied, rubberized crack sealant to effectively fill and seal cracks, extending the life of your pavement and saving you money on major repairs.',
      heroImage: 'https://images.pexels.com/photos/3806245/pexels-photo-3806245.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
      included: [
        'Cleaning and preparation of cracks',
        'Hot-applied rubberized crack sealant',
        'Prevention of water infiltration',
        'Arrest further pavement deterioration',
        'Cost-effective maintenance solution',
        'Suitable for various crack sizes',
        'Enhance pavement appearance'
      ],
      idealFor: [
        'Parking lots with minor to moderate cracking',
        'Residential driveways with visible cracks',
        'Roadways and pathways showing early signs of wear',
        'Asphalt surfaces needing preventative maintenance',
        'Properties looking to extend pavement life'
      ],
      process: [
        'Pavement inspection to identify cracks',
        'Cleaning cracks of debris and vegetation',
        'Heating and preparing crack sealant',
        'Precision application of sealant into cracks',
        'Allowing sealant to cool and cure',
        'Final inspection and site cleanup'
      ],
      gallery: [
        'https://images.pexels.com/photos/3806245/pexels-photo-3806245.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3806244/pexels-photo-3806244.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3806243/pexels-photo-3806243.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        'https://images.pexels.com/photos/3806238/pexels-photo-3806238.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
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