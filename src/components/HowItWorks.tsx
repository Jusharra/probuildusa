import React from 'react';
import { MessageSquare, Search, Handshake, Hammer, CheckCircle, CreditCard } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Tell Us Your Vision',
      description: 'Share your project details through our smart intake form or speak with our AI assistant',
      icon: MessageSquare,
      features: ['5-minute form', 'AI-powered matching', 'Instant response']
    },
    {
      step: '02',
      title: 'We Find Your Match',
      description: 'Our concierge team matches you with 1-3 pre-vetted contractors from our exclusive network',
      icon: Search,
      features: ['Licensed & insured only', 'Background checked', 'Portfolio verified']
    },
    {
      step: '03',
      title: 'Connect & Quote',
      description: 'Meet your matched contractors and receive detailed quotes within 48 hours',
      icon: Handshake,
      features: ['No bidding wars', 'Transparent pricing', 'Direct communication']
    },
    {
      step: '04',
      title: 'Get Financing',
      description: 'Access pre-approved financing options to fund your high-ticket project',
      icon: CreditCard,
      features: ['Instant pre-approval', 'Low rates', 'Flexible terms']
    },
    {
      step: '05',
      title: 'Build With Confidence',
      description: 'Your contractor begins work with our project management support throughout',
      icon: Hammer,
      features: ['Progress tracking', '24/7 support', 'Quality assurance']
    },
    {
      step: '06',
      title: 'Project Complete',
      description: 'Final walkthrough, warranty activation, and satisfaction guarantee',
      icon: CheckCircle,
      features: ['Quality inspection', 'Warranty coverage', '5-star guarantee']
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">It Works</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From initial consultation to project completion, we handle everything so you can focus on your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative group">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-amber-400 to-transparent z-10"></div>
                )}
                
                <div className="bg-slate-800 rounded-2xl p-8 h-full border border-slate-700 group-hover:border-amber-400/50 transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-xl mr-4">
                      <IconComponent className="w-6 h-6 text-slate-900" />
                    </div>
                    <div className="text-4xl font-bold text-amber-400/30">{step.step}</div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 group-hover:text-amber-400 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-slate-300 mb-6">
              Join hundreds of property owners who've trusted us with their high-ticket construction projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Start Project Intake
              </button>
              <button className="border-2 border-slate-600 hover:border-amber-400 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;