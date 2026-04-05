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
              Pre-Construction & Post-Construction Services
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              From First Plans{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                to Final Closeout
              </span>
              <br />
              — We've Got It.
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed max-w-xl">
              Goree & Associates Construction Services is a pre- and post-construction services firm. We handle estimation, scheduling, permitting, feasibility, risk, and budget management — then coordinate the contractors and compliance work to see it through to completion.
            </p>

            {/* Phase pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {[
                { label: 'Pre-Construction', items: 'Feasibility · Estimation · Scheduling · Permitting' },
                { label: 'Post-Construction', items: 'Cleanup · Warranty · Compliance · Maintenance' },
              ].map((phase) => (
                <div key={phase.label} className="bg-slate-800/70 border border-slate-600 rounded-lg px-4 py-2">
                  <span className="text-amber-400 font-semibold text-xs uppercase tracking-wide">{phase.label}</span>
                  <p className="text-slate-400 text-xs mt-0.5">{phase.items}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                to="/get-started"
                className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="group flex items-center justify-center space-x-3 text-white border-2 border-slate-600 hover:border-amber-400 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300">
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Speak With Our Team</span>
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
                Pre-construction planning or post-construction closeout — tell us where you are and we'll handle the rest.
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
                    <option value="estimation-bidding">📋 Estimation & Bidding</option>
                    <option value="permit-compliance">📄 Permit & Compliance</option>
                    <option value="material-procurement">📦 Material Procurement</option>
                    <option value="cleanup-coordination">🧹 Cleanup Coordination</option>
                    <option value="warranty-maintenance">🔄 Warranty & Maintenance Plans</option>
                    <option value="clean-truck-check">🚛 Clean Truck Check (CA Only)</option>
                    <option value="scheduling">📅 Project Scheduling</option>
                    <option value="project-feasibility">💡 Project Feasibility</option>
                    <option value="project-risk-management">🛡️ Project Risk Management</option>
                    <option value="project-budget-management">💰 Project Budget Management</option>
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
                  <span>Pre-construction: estimation, scheduling, feasibility & permitting</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>Post-construction: cleanup, compliance, warranty & maintenance</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span>Matched with vetted professionals within 24 hours</span>
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
