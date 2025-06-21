import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight, Shield } from 'lucide-react';
import { AuthService } from '../services/authService';

const PasswordResetPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Get access token from URL parameters
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const type = searchParams.get('type');

  useEffect(() => {
    // Validate that we have the required parameters for password reset
    if (!accessToken || type !== 'recovery') {
      setError('Invalid or expired password reset link. Please request a new one.');
    }
  }, [accessToken, type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!accessToken) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }

    try {
      setLoading(true);
      
      // Update password using the access token
      await AuthService.updatePassword(formData.password);
      
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Password updated successfully. Please sign in with your new password.' 
          } 
        });
      }, 3000);

    } catch (error: any) {
      console.error('Password reset error:', error);
      setError(error.message || 'Failed to update password. Please try again or request a new reset link.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                <span className="text-slate-900 font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold">ProBuild Concierge</span>
            </Link>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Password Updated Successfully!</h2>
            <p className="text-slate-300 mb-6">
              Your password has been updated. You will be redirected to the sign-in page shortly.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-slate-400 mb-6">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Redirecting in 3 seconds...</span>
            </div>

            <Link
              to="/login"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              <span>Go to Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
            <span className="text-2xl font-bold">ProBuild Concierge</span>
          </Link>
          
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Set New Password</h2>
            <p className="mt-2 text-slate-400">
              Enter your new password below
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                <Lock className="w-4 h-4 inline mr-1" />
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !accessToken || type !== 'recovery'}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-600 disabled:to-slate-600 text-slate-900 disabled:text-slate-400 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <span>Update Password</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Security notice */}
          <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-400 text-sm mb-1">Security Notice</h4>
                <p className="text-slate-300 text-xs">
                  After updating your password, you'll be signed out of all devices for security. 
                  You'll need to sign in again with your new password.
                </p>
              </div>
            </div>
          </div>

          {/* Back to login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-amber-400 hover:text-amber-300 font-semibold transition-colors text-sm"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;