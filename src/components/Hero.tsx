import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Shield, Star, Users, TrendingUp } from 'lucide-react';

const Hero: React.FC = () => {
  const [formData, setFormData] = useState({
    projectType: '',
    budget: '',
    timeline: '',
    location: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Luxury construction site"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="text-left">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
              <span className="text-slate-300 text-sm">Trusted by 500+ Property Owners</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Bigger.</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Faster.</span><br />
              Smarter.
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              High-Ticket Construction Experts On-Demand.<br />
              <span className="text-amber-400">Skip the hassle. Get premium results.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/get-started"
                className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group flex items-center justify-center space-x-3 text-white border-2 border-slate-600 hover:border-amber-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                <Play className="w-5 h-5 text-amber-400" />
                <span>Watch How It Works</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-slate-400">Licensed & Insured</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-slate-400">Completed Projects</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white">$25K+</div>
                <div className="text-sm text-slate-400">Average Project</div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Intake Form */}
          <div className="lg:ml-12">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-2 text-center">Tell Us What You're Building</h3>
              <p className="text-slate-400 text-center mb-6">Get matched with expert contractors in 24 hours</p>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Project Type</label>
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  >
                    <option value="">Select your project type</option>
                    <option value="luxury-remodel">Luxury Home Remodeling</option>
                    <option value="adu">Accessory Dwelling Unit (ADU)</option>
                    <option value="commercial">Commercial Build-Out</option>
                    <option value="outdoor-living">Luxury Outdoor Living</option>
                    <option value="custom-home">Custom Home Building</option>
                    <option value="restoration">Disaster Restoration</option>
                    <option value="solar-smart">Solar + Smart Home</option>
                    <option value="multifamily">Multifamily Conversion</option>
                    <option value="foundation">Foundation Repair</option>
                    <option value="medical">Medical Facility</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Budget Range</label>
                  <select 
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  >
                    <option value="">Select your budget</option>
                    <option value="25k-50k">$25K - $50K</option>
                    <option value="50k-100k">$50K - $100K</option>
                    <option value="100k-250k">$100K - $250K</option>
                    <option value="250k-500k">$250K - $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m+">$1M+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Timeline</label>
                  <select 
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  >
                    <option value="">When do you want to start?</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3months">1-3 months</option>
                    <option value="3-6months">3-6 months</option>
                    <option value="6-12months">6-12 months</option>
                    <option value="planning">Just planning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Location</label>
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
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Get My Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </form>

              <p className="text-xs text-slate-400 text-center mt-4">
                No spam. We'll connect you with 1-3 qualified pros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;