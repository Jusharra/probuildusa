import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Shield, Clock, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    location: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Industrial infrastructure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/82"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-slate-900/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — Hero Copy */}
          <div className="text-left">
            <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-5">
              Specialized Operations Partner
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Infrastructure.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Compliance.
              </span>
              <br />
              Execution—Handled.
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl">
              We connect property owners, developers, and operators with qualified professionals for high-value construction, mechanical systems, and compliance-driven projects—nationwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                to="/get-started"
                className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Get Matched With a Contractor</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="group flex items-center justify-center space-x-3 text-white border-2 border-slate-600 hover:border-amber-400 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300">
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Speak With Our Operations Desk</span>
              </button>
            </div>

            {/* Trust Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-700/50">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Shield className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-slate-400">Licensed & Insured</div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white">24hr</div>
                <div className="text-sm text-slate-400">Response Time</div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white">Nationwide</div>
                <div className="text-sm text-slate-400">Coverage</div>
              </div>
            </div>
          </div>

          {/* Right — Quick Intake */}
          <div className="lg:ml-8">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-1">Start Your Project</h3>
              <p className="text-slate-400 text-sm mb-6">
                Tell us what you need — we'll match you with vetted professionals in 24 hours.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Service Category</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  >
                    <option value="">Select a service category</option>
                    <option value="infrastructure-surface">🏗️ Infrastructure & Surface Services</option>
                    <option value="mechanical-electrical">⚡ Mechanical & Electrical Systems</option>
                    <option value="inspections-compliance">🔍 Inspections & Compliance</option>
                    <option value="oil-gas-industrial">🛢️ Oil & Gas / Industrial Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Project Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, State"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  />
                </div>

                <Link
                  to="/get-started"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-4 rounded-lg font-bold text-base transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Get Matched Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>Vetted, licensed, and compliance-ready contractors</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>No commitment. No spam. Matched within 24 hours.</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>Commercial, industrial, and regulated projects welcome</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
