import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, User, LogOut, Settings, BarChart3, LogIn, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const navigation = [
    { name: 'Find Contractors', href: '/contractors' },
    { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Financing', href: '/financing' },
    { name: 'Partner With Us', href: '/why-partner' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
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

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold">ProBuild Concierge</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-300 hover:text-amber-400 transition-colors duration-200"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-slate-300 hover:text-amber-400 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors">
              <Phone className="w-4 h-4" />
              <span>(661) 123-BUILD</span>
            </button>
            
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
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/get-started"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  Get Quote
                </Link>
              </div>
            )}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <nav className="space-y-4">
              {navigation.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-slate-300 hover:text-amber-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-slate-300 hover:text-amber-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              
              <div className="pt-4 space-y-3 border-t border-slate-800">
                <button className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>(661) 123-BUILD</span>
                </button>
                
                {user && profile ? (
                  <>
                    <Link
                      to={getDashboardLink()}
                      className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>{getDashboardLabel()}</span>
                    </Link>
                    <Link
                      to="/profile-settings"
                      className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </Link>
                    <Link
                      to="/pricing"
                      className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Subscription</span>
                    </Link>
                    <button
                      onClick={() => {
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
                      onClick={() => setIsMenuOpen(false)}
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