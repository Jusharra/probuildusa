import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield, Star, Award } from 'lucide-react';

const Footer: React.FC = () => {
  const services = [
    'Line Striping',
    'Power Washing',
    'Window Cleaning',
    'Seal Coating',
    'Paving',
    'Parking Lot Sweeping',
    'Crack Sealing',
    'Pressure Washing',
  ];

  const quickLinks = [
    { name: 'Find Contractors', href: '/contractors' },
    { name: 'Partner With Us', href: '/why-partner' },
    { name: 'Get Started', href: '/get-started' },
    { name: 'Pavement Maintenance Guidance', href: '/pavement-maintenance-guidance' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Parking Lot Striping Guide', href: '/parking-lot-striping-guide' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold">P</span>
              </div>
              <span className="text-xl font-bold">ProBuild Concierge</span>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Professional line striping, power washing, and window cleaning experts on-demand. We connect property owners with qualified contractors for essential maintenance services.
            </p>
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-sm">Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="text-sm">5-Star Pros</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Our Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 5).map((service) => (
                <li key={service}>
                  <Link 
                    to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h3>
            <ul className="space-y-2">
              {services.slice(5).map((service) => (
                <li key={service}>
                  <Link 
                    to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h3>
            <ul className="space-y-2 mb-6">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-slate-400 hover:text-amber-300 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-4 text-amber-400">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-400">
                <Phone className="w-4 h-4 text-amber-400" />
                <span className="text-sm">(555) 123-BUILD</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Mail className="w-4 h-4 text-amber-400" />
                <span className="text-sm">hello@probuildconcierge.com</span>
              </div>
              <div className="flex items-start space-x-3 text-slate-400">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5" />
                <span className="text-sm">Serving Premium Markets<br />Nationwide</span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/partner-portal"
                className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors text-sm font-semibold"
              >
                <Award className="w-4 h-4" />
                <span>Partner Portal</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 ProBuild Concierge. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                Contractor Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;