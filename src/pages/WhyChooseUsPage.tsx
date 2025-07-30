import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Users, Award, Clock, DollarSign, Phone, Star, CheckCircle, ArrowRight } from 'lucide-react';

const WhyChooseUsPage: React.FC = () => {
  const competitors = [
    {
      name: 'ProBuild Concierge',
      logo: 'P',
      isUs: true,
      features: {
        'Dedicated Concierge': true,
        'Pre-Vetted Contractors': true,
        'No Bidding Wars': true,
        'Project Financing': true,
        'Insurance Claims': true,
        'High-Ticket Focus': true,
        'AI-Powered Matching': true,
        '24/7 Support': true
      }
    },
    {
      name: 'Thumbtack',
      logo: 'T',
      isUs: false,
      features: {
        'Dedicated Concierge': false,
        'Pre-Vetted Contractors': false,
        'No Bidding Wars': false,
        'Project Financing': false,
        'Insurance Claims': false,
        'High-Ticket Focus': false,
        'AI-Powered Matching': false,
        '24/7 Support': false
      }
    },
    {
      name: 'HomeAdvisor',
      logo: 'H',
      isUs: false,
      features: {
        'Dedicated Concierge': false,
        'Pre-Vetted Contractors': false,
        'No Bidding Wars': false,
        'Project Financing': false,
        'Insurance Claims': false,
        'High-Ticket Focus': false,
        'AI-Powered Matching': false,
        '24/7 Support': false
      }
    },
    {
      name: 'Angi',
      logo: 'A',
      isUs: false,
      features: {
        'Dedicated Concierge': false,
        'Pre-Vetted Contractors': false,
        'No Bidding Wars': false,
        'Project Financing': false,
        'Insurance Claims': false,
        'High-Ticket Focus': false,
        'AI-Powered Matching': false,
        '24/7 Support': false
      }
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Specialized Service Network',
      description: 'Every contractor is licensed, insured, and background-checked with proven high-ticket experience.',
      stat: '100% Vetted'
    },
    {
      icon: Zap,
      title: 'AI-Powered Matching',
      description: 'Our intelligent system matches you with the perfect contractor based on your specific project needs.',
      stat: '48hr Response'
    },
    {
      icon: Phone,
      title: 'Dedicated Concierge',
      description: 'Personal project coordinator guides you from initial consultation through completion.',
      stat: '1-on-1 Support'
    },
    {
      icon: Award,
      title: 'High-Ticket Specialists',
      description: 'We focus exclusively on premium projects $25K+ with contractors who understand luxury standards.',
      stat: 'Quality Focus'
    },
    {
      icon: Clock,
      title: 'No Bidding Wars',
      description: 'Skip the hassle of managing multiple quotes. We connect you with 1-3 pre-qualified matches.',
      stat: '1-3 Matches'
    },
    {
      icon: DollarSign,
      title: 'Financing Available',
      description: 'Access pre-approved financing options to fund your service project without cash flow constraints.',
      stat: 'Up to $1M'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Service Pro Network</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Unlike generic service directories, we're built specifically for professional line striping, power washing, pressure washing, window cleaning, seal coating, paving, crack sealing, and parking lot sweeping services.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="group bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-2">
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

        {/* Comparison Table */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 mb-20">
          <h3 className="text-2xl font-bold text-center mb-8">
            See How We <span className="text-amber-400">Stack Up</span>
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-2 text-slate-400 font-semibold">Features</th>
                  {competitors.map((competitor) => (
                    <th key={competitor.name} className="text-center py-4 px-2">
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                          competitor.isUs 
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900' 
                            : 'bg-slate-700 text-slate-400'
                        }`}>
                          {competitor.logo}
                        </div>
                        <span className={`text-sm font-semibold ${
                          competitor.isUs ? 'text-amber-400' : 'text-slate-400'
                        }`}>
                          {competitor.name}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(competitors[0].features).map((feature) => (
                  <tr key={feature} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-2 font-semibold text-slate-300">{feature}</td>
                    {competitors.map((competitor) => (
                      <td key={`${competitor.name}-${feature}`} className="text-center py-4 px-2">
                        {competitor.features[feature as keyof typeof competitor.features] ? (
                          <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${
                            competitor.isUs ? 'bg-amber-400' : 'bg-green-500'
                          }`}>
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-600 mx-auto flex items-center justify-center">
                            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center">
            <Phone className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Talk to Our AI Assistant</h3>
            <p className="text-slate-400 mb-6">
              Get instant answers and start your project intake 24/7
            </p>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Call (555) 123-BUILD
            </button>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center">
            <Star className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Schedule Consultation</h3>
            <p className="text-slate-400 mb-6">
              Speak with a construction concierge about your project
            </p>
            <button className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300">
              Book Free Call
            </button>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of property owners who trust us with their essential service needs.
          </p>
          <Link
            to="/get-started"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Get Your Service Quote</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsPage;