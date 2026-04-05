import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Star, Users, AlertCircle, Building2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthService } from '../services/authService';

const LoginPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '' // Added company name field
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
    setSuccess(''); // Clear success when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isSignUp) {
        // Enhanced validation for sign up
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          return;
        }
        if (!formData.fullName.trim()) {
          setError('Full name is required');
          return;
        }
        if (!formData.companyName.trim()) {
          setError('Company name is required');
          return;
        }

        console.log('🚀 [LoginPage] Starting sign up process');
        
        try {
          await AuthService.signUp(formData.email, formData.password, {
            full_name: formData.fullName,
            company_name: formData.companyName,
            role: 'professional' // Always default to professional role
          });
          
          setSuccess('Account created successfully! Your contractor profile has been submitted for review. You will receive an email when your account is approved.');
          
          // Clear form data on successful signup
          setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            companyName: ''
          });
          
        } catch (signUpError: any) {
          console.error('❌ [LoginPage] Sign up error:', signUpError);
          
          // Provide user-friendly error messages
          if (signUpError.message?.includes('already registered')) {
            setError('An account with this email already exists. Please sign in instead.');
          } else if (signUpError.message?.includes('invalid email')) {
            setError('Please enter a valid email address.');
          } else if (signUpError.message?.includes('weak password')) {
            setError('Password is too weak. Please use a stronger password.');
          } else {
            setError(signUpError.message || 'Failed to create account. Please try again.');
          }
        }
      } else {
        console.log('🔑 [LoginPage] Starting sign in process');
        
        try {
          await AuthService.signIn(formData.email, formData.password);
          // Navigation will be handled by the AuthContext
        } catch (signInError: any) {
          console.error('❌ [LoginPage] Sign in error:', signInError);
          
          // Provide user-friendly error messages
          if (signInError.message?.includes('Invalid login credentials')) {
            setError('Invalid email or password. Please check your credentials and try again.');
          } else if (signInError.message?.includes('Email not confirmed')) {
            setError('Please check your email and click the confirmation link before signing in.');
          } else {
            setError(signInError.message || 'Failed to sign in. Please try again.');
          }
        }
      }
    } catch (error: any) {
      console.error('💥 [LoginPage] Authentication error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setResetLoading(true);
      setError('');
      await AuthService.resetPassword(formData.email);
      setSuccess('Password reset email sent! Check your inbox for instructions.');
      setShowForgotPassword(false);
    } catch (error: any) {
      console.error('❌ [LoginPage] Password reset error:', error);
      setError(error.message || 'Failed to send password reset email. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccess('');
    setShowForgotPassword(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      companyName: ''
    });
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setError('');
    setSuccess('');
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                <span className="text-slate-900 font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold">Goree & Associates Construction Services</span>
            </Link>
            
            <div className="mb-6">
              <h2 className="text-3xl font-bold">Reset Password</h2>
              <p className="mt-2 text-slate-400">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>
          </div>

          {/* Forgot Password Form */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <p className="text-green-400 text-sm">{success}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="Enter your email address"
                />
              </div>

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-600 disabled:to-slate-600 text-slate-900 disabled:text-slate-400 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {resetLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Reset Email...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Email</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Back to sign in */}
            <div className="mt-6 text-center">
              <button
                onClick={toggleForgotPassword}
                className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <span className="text-slate-900 font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold">Goree & Associates Construction Services</span>
          </Link>
          
          <div className="mb-6">
            <h2 className="text-3xl font-bold">
              {isSignUp ? 'Join Our Network' : 'Welcome Back'}
            </h2>
            <p className="mt-2 text-slate-400">
              {isSignUp 
                ? 'Create your contractor account to start receiving premium leads' 
                : 'Sign in to your account'
              }
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <Building2 className="w-4 h-4 inline mr-1" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    placeholder="Enter your company name"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-300">
                  <Lock className="w-4 h-4 inline mr-1" />
                  Password
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={toggleForgotPassword}
                    className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {isSignUp && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-400">
                    By signing up, you understand that your contractor account will require admin approval before you can access the partner portal and receive leads.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-600 disabled:to-slate-600 text-slate-900 disabled:text-slate-400 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                </>
              ) : (
                <>
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Toggle between sign in and sign up */}
          <div className="mt-6 text-center">
            <button
              onClick={toggleMode}
              className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              {isSignUp 
                ? 'Already have an account? Sign In' 
                : "Don't have an account? Sign Up"
              }
            </button>
          </div>

          {/* Additional links */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="flex flex-col space-y-3 text-center">
              <Link
                to="/why-partner"
                className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
              >
                Learn About Partnership Benefits
              </Link>
              <Link
                to="/"
                className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <Shield className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <div className="text-xs text-slate-400">Secure & Licensed</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <div className="text-xs text-slate-400">5-Star Network</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <Users className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <div className="text-xs text-slate-400">500+ Contractors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;