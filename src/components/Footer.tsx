import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield, Star, Award } from 'lucide-react';

const Footer: React.FC = () => {
  const services = [
    { name: 'Infrastructure & Surface', href: '/services/infrastructure-surface' },
    { name: 'Mechanical & Electrical', href: '/services/mechanical-electrical' },
    { name: 'Inspections & Compliance', href: '/services/inspections-compliance' },
    { name: 'Oil & Gas / Industrial', href: '/services/oil-gas-industrial' },
    { name: 'Estimation & Bidding', href: '/services/estimation-bidding' },
    { name: 'Permit & Compliance', href: '/services/permit-compliance' },
    { name: 'Material Procurement', href: '/services/material-procurement' },
    { name: 'Cleanup Coordination', href: '/services/cleanup-coordination' },
    { name: 'Warranty & Maintenance', href: '/services/warranty-maintenance' },
    { name: 'Clean Truck Check (CA)', href: '/services/clean-truck-check' },
  ];

  const quickLinks = [
    { name: 'Find Contractors', href: '/contractors' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { name: 'Partner With Us', href: '/why-partner' },
    { name: 'Get a Quote', href: '/get-started' },
    { name: 'FAQs', href: '/faqs' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold">P</span>
              </div>
              <span className="text-xl font-bold">ProBuild Concierge</span>
            </Link>
            <p className="text-slate-400 mb-4 leading-relaxed text-sm">
              Your specialized operations partner for infrastructure, mechanical systems, and compliance-driven projects — nationwide.
            </p>
            <p className="text-slate-500 text-xs mb-6 italic">
              "Where Infrastructure Meets Execution"
            </p>
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-sm">Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="text-sm">Vetted Pros</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">Service Categories</h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">Contact</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-slate-400">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-sm">(661) 123-BUILD</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-sm">hello@probuildconcierge.com</span>
              </div>
              <div className="flex items-start space-x-3 text-slate-400">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Coordinating Projects<br />Nationwide</span>
              </div>
            </div>

            <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-3">For Contractors</h3>
            <Link
              to="/why-partner"
              className="inline-flex items-center space-x-2 text-slate-400 hover:text-amber-400 transition-colors text-sm"
            >
              <Award className="w-4 h-4" />
              <span>Apply to Partner</span>
            </Link>
            <div className="mt-2">
              <Link
                to="/partner-portal"
                className="text-slate-500 hover:text-slate-400 transition-colors text-xs"
              >
                Partner Portal Login →
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2025 ProBuild Concierge. All rights reserved. Coordinating high-value projects nationwide.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-500 hover:text-amber-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 hover:text-amber-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-slate-500 hover:text-amber-400 transition-colors text-sm">
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
