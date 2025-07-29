import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageSquare, Calendar, Shield } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-400/20 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Dream Project?</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of property owners who've trusted ProBuild Concierge with their high-ticket construction projects. Get started in minutes, not weeks.
          </p>
        </div>

        {/* Main CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Instant Quote Card */}
          <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-amber-400/50 rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 rounded-xl mb-6 w-fit">
              <ArrowRight className="w-8 h-8 text-slate-900" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-400 transition-colors">
              Get Instant Quote
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Complete our smart intake form and get matched with 1-3 qualified contractors within 24 hours.
            </p>
            <Link
              to="/get-started"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Project</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Call AI Assistant Card */}
          <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-amber-400/50 rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl mb-6 w-fit">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-400 transition-colors">
              Call AI Assistant
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Speak with our intelligent AI assistant 24/7 for instant project assessment and contractor matching.
            </p>
            <button className="w-full border-2 border-blue-500 hover:bg-blue-500 text-blue-400 hover:text-white px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>(555) 123-BUILD</span>
            </button>
          </div>

          {/* Schedule Consultation Card */}
          <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-amber-400/50 rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl mb-6 w-fit">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-400 transition-colors">
              Book Consultation
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Schedule a free 30-minute consultation with our construction concierge team.
            </p>
            <button className="w-full border-2 border-green-500 hover:bg-green-500 text-green-400 hover:text-white px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Schedule Free Call</span>
            </button>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <Shield className="w-6 h-6 text-amber-400" />
               <span>200+ Service Pros</span>
              </div>
              <p className="text-slate-400 text-sm">
                100% satisfaction guarantee on all matched projects
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">48hr</div>
              <div className="text-slate-400 text-sm">Response Time</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">500+</div>
              <div className="text-slate-400 text-sm">Projects Completed</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">$25K+</div>
              <div className="text-slate-400 text-sm">Average Project Value</div>
            </div>
          </div>
        </div>

        {/* Live Chat Option */}
        <div className="mt-12 text-center">
          <button className="group inline-flex items-center space-x-3 text-amber-400 hover:text-amber-300 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="font-semibold">Start Live Chat Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-slate-500 text-sm mt-2">
            Average response time: 2 minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;