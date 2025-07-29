import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, Users, Star, Shield, TrendingUp, Clock, Award, CheckCircle, X } from 'lucide-react';
import { stripeProducts } from '../stripe-config';
import ProductCard from '../components/ProductCard';

const WhyPartner: React.FC = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'High-Value Leads Only',
      description: 'Every lead is $25K+ with serious buyers who have budget and timeline.',
      stat: '$25K+ Average'
    },
    {
      icon: Users,
      title: 'Exclusive Network',
      description: 'Limited contractor network means less competition and higher win rates.',
      stat: '3:1 Lead Ratio'
    },
    {
      icon: Star,
      title: 'Premium Clients',
      description: 'Work with luxury homeowners, investors, and commercial clients.',
      stat: '5-Star Projects'
    },
    {
      icon: Shield,
      title: 'Pre-Qualified Leads',
      description: 'All leads are verified for budget, timeline, and decision-making authority.',
      stat: '100% Verified'
    },
    {
      icon: TrendingUp,
      title: 'Business Growth',
      description: 'Scale your business with consistent, high-quality project opportunities.',
      stat: '40% Growth'
    },
    {
      icon: Clock,
      title: 'Fast Response',
      description: 'Get leads within 24 hours of client submission with full project details.',
      stat: '24hr Delivery'
    }
  ];

  const comparison = [
    {
      feature: 'Lead Quality',
      us: 'Pre-qualified, high-ticket only',
      thumbtack: 'Mixed quality, many tire-kickers',
      homeadvisor: 'Volume-based, low conversion',
      angi: 'Broad range, inconsistent'
    },
    {
      feature: 'Competition',
      us: '1-3 contractors per lead',
      thumbtack: '10+ contractors bidding',
      homeadvisor: '5-8 contractors competing',
      angi: '6-10 contractors per lead'
    },
    {
      feature: 'Lead Cost',
      us: 'Success-based referral fee',
      thumbtack: 'Pay per lead + credits',
      homeadvisor: 'Monthly subscription + fees',
      angi: 'Pay per lead model'
    },
    {
      feature: 'Support',
      us: 'Dedicated concierge team',
      thumbtack: 'Self-service platform',
      homeadvisor: 'Limited phone support',
      angi: 'Basic customer service'
    },
    {
      feature: 'Project Size',
      us: '$25K+ minimum',
      thumbtack: 'All sizes (many small)',
      homeadvisor: 'All sizes mixed',
      angi: 'Mostly smaller projects'
    }
  ];

  const requirements = [
    'Valid contractor license in your state',
    'General liability insurance ($1M minimum)',
    'Workers compensation insurance',
    'Minimum 3 years construction experience',
    'Portfolio of completed high-end projects',
    'Professional references available',
    'Ability to handle projects $25K+',
    'Commitment to 24-hour response time'
  ];

  const testimonials = [
    {
      name: 'David Chen',
      company: 'Elite Custom Homes',
      location: 'San Francisco, CA',
      quote: 'ProBuild has transformed my business. The leads are genuine, the clients have real budgets, and I\'m not competing with 20 other contractors.',
      revenue: '$180K in 6 months',
      projects: 8
    },
    {
      name: 'Maria Rodriguez',
      company: 'Luxury Renovations LLC',
      location: 'Austin, TX',
      quote: 'Finally, a lead service that understands high-end construction. Every lead I get is qualified and ready to move forward.',
      revenue: '$320K in 8 months',
      projects: 12
    },
    {
      name: 'James Wilson',
      company: 'Wilson Commercial Build',
      location: 'Seattle, WA',
      quote: 'The concierge service is incredible. They handle all the initial screening so I only talk to serious prospects.',
      revenue: '$450K in 10 months',
      projects: 15
    }
  ];

  const features = [
    'Access to premium contractor network',
    'Priority lead matching',
    'Dedicated account manager',
    'Advanced project management tools',
    'Monthly performance reports',
    '24/7 customer support'
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Partner With <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Service Pro Network</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Join our exclusive network of professional service providers and get access to quality leads that others can't reach.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Top Contractors Choose Us</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Higher Revenue Per Lead</h3>
                    <p className="text-slate-400">Average project value of $85K vs $12K on other platforms</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg flex-shrink-0">
                    <Users className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Less Competition</h3>
                    <p className="text-slate-400">Maximum 3 contractors per lead vs 10+ on other platforms</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg flex-shrink-0">
                    <Shield className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Pre-Qualified Clients</h3>
                    <p className="text-slate-400">Every lead is verified for budget, timeline, and decision authority</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Ready to Partner?</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
                <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all">
                  <option value="">Select Your Specialty</option>
                  <option value="luxury-remodel">Luxury Remodeling</option>
                  <option value="custom-homes">Custom Homes</option>
                  <option value="commercial">Commercial</option>
                  <option value="outdoor-living">Outdoor Living</option>
                  <option value="restoration">Restoration</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Apply to Partner
                </button>
              </form>
              <p className="text-xs text-slate-400 text-center mt-4">
                We'll review your application within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Partnership Benefits</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Everything you need to grow your construction business with premium clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="group bg-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-xl">
                      <IconComponent className="w-6 h-6 text-slate-900" />
                    </div>
                    <div className="text-2xl font-bold text-amber-400">{benefit.stat}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-amber-400 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">
              How We <span className="text-amber-400">Compare</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              See why contractors are switching from other platforms to ProBuild Concierge
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold">Feature</th>
                    <th className="text-center py-4 px-6">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center font-bold text-slate-900 mb-2">
                          P
                        </div>
                        <span className="text-amber-400 font-semibold">ProBuild</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-6 text-slate-400">Thumbtack</th>
                    <th className="text-center py-4 px-6 text-slate-400">HomeAdvisor</th>
                    <th className="text-center py-4 px-6 text-slate-400">Angi</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, index) => (
                    <tr key={index} className="border-b border-slate-700 hover:bg-slate-800/50">
                      <td className="py-4 px-6 font-semibold text-slate-300">{row.feature}</td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-amber-400 mr-2" />
                          <span className="text-amber-400 font-semibold">{row.us}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center text-slate-400">{row.thumbtack}</td>
                      <td className="py-4 px-6 text-center text-slate-400">{row.homeadvisor}</td>
                      <td className="py-4 px-6 text-center text-slate-400">{row.angi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Plans Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Membership</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Join our exclusive network of premium contractors and start receiving high-quality leads today.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
              <Shield className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Verified Network</h3>
              <p className="text-slate-400 text-sm">All contractors are licensed, insured, and background verified</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
              <Star className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Premium Leads</h3>
              <p className="text-slate-400 text-sm">High-value projects with serious clients and real budgets</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
              <Users className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Exclusive Access</h3>
              <p className="text-slate-400 text-sm">Limited network means less competition and higher win rates</p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {stripeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Partnership Requirements</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                We maintain high standards to ensure quality for both contractors and clients. Here's what we look for in our partners:
              </p>
              
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6">Application Process</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-900 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Submit Application</h4>
                    <p className="text-slate-400 text-sm">Complete our partner application with your company details and portfolio</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-900 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Verification Process</h4>
                    <p className="text-slate-400 text-sm">We verify your licenses, insurance, and check references</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-900 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Interview & Onboarding</h4>
                    <p className="text-slate-400 text-sm">Brief interview and platform training to get you started</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-900 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Start Receiving Leads</h4>
                    <p className="text-slate-400 text-sm">Begin receiving qualified leads within 48 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">What Our Partners Say</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Real contractors sharing their success stories with ProBuild Concierge
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-900 rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="border-t border-slate-700 pt-6">
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-slate-400 text-sm">{testimonial.company}</div>
                  <div className="text-slate-500 text-sm">{testimonial.location}</div>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-400">{testimonial.revenue}</div>
                      <div className="text-xs text-slate-400">Revenue Added</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-400">{testimonial.projects}</div>
                      <div className="text-xs text-slate-400">Projects Won</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to <span className="text-amber-400">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Join our exclusive network of premium contractors and start receiving high-ticket leads today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <span>Apply to Partner</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <Link
              to="/partner-portal"
              className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Partner Login</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-400">
            <div className="flex items-center justify-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Exclusive Network</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5 text-amber-400" />
              <span>Verified Leads Only</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span>Guaranteed Growth</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyPartner;