import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, User, LogOut, Settings, BarChart3, LogIn, CreditCard, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const { user, profile, signOut } = useAuth();

  const mainNavigation = [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { name: 'Partner With Us', href: '/why-partner' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false); // Ensure menu closes on sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getDashboardLink = () => {
    if (!profile) return '/dashboard';
    return profile.role === 'admin' ? '/admin' : '/partner-portal';
  };

  const getDashboardLabel = () => {
    if (!profile) return 'Dashboard';
    return profile.role === 'admin' ? 'Admin Portal' : 'Partner Portal';
  };

  const services = [
    { name: 'Infrastructure & Surface', href: '/services/infrastructure-surface' },
    { name: 'Mechanical & Electrical', href: '/services/mechanical-electrical' },
    { name: 'Inspections & Compliance', href: '/services/inspections-compliance' },
    { name: 'Oil & Gas / Industrial', href: '/services/oil-gas-industrial' },
    { name: 'Estimation & Bidding', href: '/services/estimation-bidding' },
    { name: 'Permit & Compliance', href: '/services/permit-compliance' },
    { name: 'Material Procurement', href: '/services/material-procurement' },
    { name: 'Cleanup Coordination', href: '/services/cleanup-coordination' },
    { name: 'Warranty & Maintenance Plans', href: '/services/warranty-maintenance' },
    { name: 'Clean Truck Check (CA)', href: '/services/clean-truck-check' },
    { name: 'Project Scheduling', href: '/services/scheduling' },
    { name: 'Project Feasibility', href: '/services/project-feasibility' },
    { name: 'Project Risk Management', href: '/services/project-risk-management' },
    { name: 'Project Budget Management', href: '/services/project-budget-management' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [servicesDropdownRef]);

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-lg">P</span>
            </div>
            <span className="text-lg font-bold whitespace-nowrap">Goree & Associates Construction Services</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Services Dropdown */}
            <div className="relative" ref={servicesDropdownRef}>
              <button
                className="flex items-center space-x-1 text-sm text-slate-300 hover:text-amber-400 transition-colors duration-200"
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesDropdownOpen && (
                <div className="absolute left-0 mt-3 w-56 bg-slate-800 rounded-xl shadow-xl border border-slate-700 py-2 z-50">
                  {services.map((serviceItem) => (
                    <Link
                      key={serviceItem.name}
                      to={serviceItem.href}
                      className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-amber-400 transition-colors"
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      {serviceItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm text-slate-300 hover:text-amber-400 transition-colors duration-200 whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {user && profile ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={getDashboardLink()}
                  className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>{getDashboardLabel()}</span>
                </Link>
                
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors">
                    <User className="w-4 h-4" />
                    <span>{profile.full_name || 'User'}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                        {profile.email}
                      </div>
                      <Link
                        to={getDashboardLink()}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>{getDashboardLabel()}</span>
                      </Link>
                      <Link
                        to="/profile-settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </Link>
                      <Link
                        to="/pricing"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Subscription</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm text-slate-300 hover:text-amber-400 transition-colors flex items-center space-x-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/get-started"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
                >
                  Get Quote
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800">
            <nav className="space-y-4" ref={servicesDropdownRef}>
              {/* Services Dropdown for Mobile */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-slate-300 hover:text-amber-400 transition-colors"
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isServicesDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {services.map((serviceItem) => (
                      <Link
                        key={serviceItem.name}
                        to={serviceItem.href}
                        className="block text-sm text-slate-300 hover:text-amber-400 transition-colors"
                        onClick={() => {
                          // Close both the services dropdown and the main mobile menu
                          setIsServicesDropdownOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        {serviceItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Main Navigation Items for Mobile */}
              <Link
                to="/contractors"
                className="block text-slate-300 hover:text-amber-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Contractors
              </Link>
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-slate-300 hover:text-amber-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 space-y-3 border-t border-slate-800">
                <button className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>(844) 543-7419</span>
                </button>
                
                {user && profile ? (
                  <>
                    <Link
                      to={getDashboardLink()}
                      className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)} // Close main mobile menu
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>{getDashboardLabel()}</span>
                    </Link>
                    <Link
                      to="/profile-settings"
                      className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors" // Close main mobile menu
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </Link>
                    <Link
                      to="/pricing"
                      className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors" // Close main mobile menu
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Subscription</span>
                    </Link>
                    <button
                      onClick={() => {
                        // Call handleSignOut which already closes the menu
                        // and ensure the menu is closed directly here as well
                        // for robustness.
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)} // Close main mobile menu
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      to="/get-started"
                      className="block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-2 rounded-lg font-semibold text-center transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Quote
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;