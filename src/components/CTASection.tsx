import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Calendar, Shield } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-400/30 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Headline */}
        <div className="text-center mb-16">
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-4">Ready to Move Forward?</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Have a project that requires{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              precision, coordination,
            </span>
            <br />
            and qualified professionals?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We don't match volume — we match quality. Tell us your project, and we'll connect you with the right people to execute it.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Primary CTA */}
          <div className="group bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 col-span-1 md:col-span-1">
            <div className="bg-slate-900/20 p-4 rounded-xl mb-6 w-fit">
              <ArrowRight className="w-8 h-8 text-slate-900" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Get Matched Today</h3>
            <p className="text-slate-900/80 mb-6 leading-relaxed">
              Submit your project request and get matched with vetted, qualified contractors within 24 hours.
            </p>
            <Link
              to="/get-started"
              className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Operations Desk */}
          <div className="group bg-slate-800/60 backdrop-blur-sm border border-slate-700 hover:border-amber-400/50 rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-blue-500/10 p-4 rounded-xl mb-6 w-fit">
              <Phone className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
              Operations Desk
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Speak directly with our team for complex, multi-site, or compliance-sensitive project needs.
            </p>
            <button className="w-full border-2 border-slate-600 hover:border-amber-400 text-white hover:text-amber-400 px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>(661) 123-BUILD</span>
            </button>
          </div>

          {/* Consultation */}
          <div className="group bg-slate-800/60 backdrop-blur-sm border border-slate-700 hover:border-amber-400/50 rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-green-500/10 p-4 rounded-xl mb-6 w-fit">
              <Calendar className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
              Schedule a Consultation
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Book a free 30-minute call to walk through your project scope and compliance requirements.
            </p>
            <button className="w-full border-2 border-slate-600 hover:border-green-400 text-white hover:text-green-400 px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Book Free Call</span>
            </button>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center">
            <div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-amber-400" />
                <span className="font-semibold text-white">Vetted Network</span>
              </div>
              <p className="text-slate-400 text-sm">Licensed, insured & compliance-ready pros</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400 mb-1">24hr</div>
              <div className="text-slate-400 text-sm">Contractor Match Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400 mb-1">$50M+</div>
              <div className="text-slate-400 text-sm">Project Value Managed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400 mb-1">Nationwide</div>
              <div className="text-slate-400 text-sm">Coverage Across Key U.S. Markets</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
