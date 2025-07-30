import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  DollarSign, CheckCircle, Clock, Shield, Star, ArrowRight, 
  X, Loader2, CreditCard, AlertCircle, Phone, Mail, MapPin,
  Award, Zap, Users, TrendingUp
} from 'lucide-react';
import { LeadService } from '../services/leadService';
import { StripeService } from '../services/stripeService';

const DepositPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const leadId = searchParams.get('leadId');
  
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Deposit calculation settings
  const DEPOSIT_PERCENTAGE = 0.10; // 10% of project budget
  const FLAT_FEE = 25000; // $250.00 in cents as minimum deposit
  const MAX_DEPOSIT = 500000; // $5,000.00 in cents as maximum deposit

  useEffect(() => {
    if (!leadId) {
      setError('No lead ID provided');
      setLoading(false);
      return;
    }

    loadLead();
  }, [leadId]);

  const loadLead = async () => {
    try {
      setLoading(true);
      const leadData = await LeadService.getLeadById(leadId!);
      if (!leadData) {
        setError('Lead not found');
        return;
      }
      setLead(leadData);
    } catch (err) {
      console.error('Error loading lead:', err);
      setError('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const calculateDeposit = () => {
    if (!lead) return FLAT_FEE;
    
    if (lead.budget && lead.budget > 0) {
      // Calculate percentage-based deposit
      const percentageDeposit = Math.round(lead.budget * DEPOSIT_PERCENTAGE);
      // Use the higher of percentage or flat fee, but cap at maximum
      return Math.min(Math.max(percentageDeposit, FLAT_FEE), MAX_DEPOSIT);
    }
    
    return FLAT_FEE;
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(cents / 100);
  };

  const handlePayDeposit = async () => {
    if (!lead || !leadId) {
      setError('Lead information not available');
      return;
    }

    setPaymentLoading(true);
    setError(null);

    try {
      const depositAmount = calculateDeposit();
      
      const { sessionId } = await StripeService.createCheckoutSession({
        priceId: '', // Not used for dynamic pricing
        mode: 'payment',
        amount: depositAmount,
        currency: 'usd',
        leadId: leadId,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}&type=deposit&leadId=${leadId}`,
        cancelUrl: `${window.location.origin}/deposit-payment?leadId=${leadId}&cancelled=true`
      });

      await StripeService.redirectToCheckout(sessionId);
    } catch (err: any) {
      console.error('Error creating checkout session:', err);
      setError(err.message || 'Failed to initiate payment. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleSkipDeposit = async () => {
    if (!leadId) return;

    setSkipLoading(true);
    setError(null);

    try {
      await LeadService.updateLead(leadId, { 
        deposit_status: 'skipped' 
      });
      
      // Redirect to thank you page
      navigate(`/thank-you?leadId=${leadId}&depositSkipped=true`);
    } catch (err: any) {
      console.error('Error skipping deposit:', err);
      setError(err.message || 'Failed to skip deposit. Please try again.');
    } finally {
      setSkipLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading project details...</span>
        </div>
      </div>
    );
  }

  if (error && !lead) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Error Loading Project</h1>
          <p className="text-slate-400 mb-6">{error}</p>
          <Link
            to="/get-started"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Start New Project
          </Link>
        </div>
      </div>
    );
  }

  const depositAmount = calculateDeposit();
  const depositPercentage = lead?.budget ? Math.round((depositAmount / lead.budget) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Project is <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Almost Secured!</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Lock in your priority scheduling and guarantee our best contractors with a small deposit
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Project Summary */}
          <div className="space-y-8">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold mb-6">Your Project Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Client:</span>
                  <span className="text-white font-semibold">{lead?.client_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Service Type:</span>
                  <span className="text-white font-semibold">{lead?.project_type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Budget:</span>
                  <span className="text-amber-400 font-bold">
                    {lead?.budget ? formatCurrency(lead.budget) : 'Custom Quote'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Timeline:</span>
                  <span className="text-white">{lead?.timeline || 'To be determined'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-white">{lead?.zip_code}</span>
                </div>
              </div>
            </div>

            {/* Benefits of Securing Deposit */}
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl p-8 border border-green-500/20">
              <h3 className="text-xl font-bold mb-6 text-green-400">Why Secure Your Project Today?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Priority Scheduling</h4>
                    <p className="text-slate-300 text-sm">Jump ahead of the waitlist and secure the earliest available start date</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Star className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Top Contractor Access</h4>
                    <p className="text-slate-300 text-sm">Get matched with our highest-rated, most experienced contractors first</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-amber-500/20 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Price Protection</h4>
                    <p className="text-slate-300 text-sm">Lock in current pricing and protect against seasonal rate increases</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Satisfaction Guarantee</h4>
                    <p className="text-slate-300 text-sm">100% refundable if you're not completely satisfied with our service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Deposit Options */}
          <div className="space-y-8">
            {/* Irresistible Offer */}
            <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl p-8 border border-amber-500/30 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                LIMITED TIME
              </div>
              
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  🎯 <span className="text-amber-400">Secure Your Project</span>
                </h2>
                <div className="text-5xl font-bold text-amber-400 mb-2">
                  {formatCurrency(depositAmount)}
                </div>
                <p className="text-slate-300">
                  {lead?.budget ? `Just ${depositPercentage}% deposit` : 'Small deposit to get started'}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <h3 className="font-bold text-amber-400 mb-3">🚀 What You Get Today:</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Instant project priority activation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Match with top 3 contractors within 24 hours</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Detailed quotes and project timeline</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Dedicated project concierge support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>100% refundable if not satisfied</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 mb-2">💰 Deposit Protection Guarantee</h4>
                  <p className="text-sm text-slate-300">
                    Your deposit is 100% refundable if we can't match you with qualified contractors 
                    or if you're not satisfied with our service within 7 days.
                  </p>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={handlePayDeposit}
                  disabled={paymentLoading}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-600 disabled:to-slate-600 text-slate-900 disabled:text-slate-400 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {paymentLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Secure My Project - {formatCurrency(depositAmount)}</span>
                    </>
                  )}
                </button>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-4 text-xs text-slate-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>SSL Secured</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CreditCard className="w-3 h-3" />
                      <span>Stripe Protected</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>100% Refundable</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-900 text-slate-400">OR</span>
                  </div>
                </div>

                <button
                  onClick={handleSkipDeposit}
                  disabled={skipLoading}
                  className="w-full border-2 border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  {skipLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue Without Deposit</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  Note: Without a deposit, your project will be added to our standard queue with longer response times.
                </p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="font-bold text-white mb-4">What Our Clients Say</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">
                    JD
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-white text-sm">John D.</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300">
                      "The deposit secured me the best contractor in town. Project started 2 weeks earlier than expected!"
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    SK
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-white text-sm">Sarah K.</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300">
                      "Small deposit, huge results. Worth every penny for the priority service!"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700">
                <div className="text-2xl font-bold text-amber-400">98%</div>
                <div className="text-xs text-slate-400">Satisfaction Rate</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700">
                <div className="text-2xl font-bold text-green-400">24hr</div>
                <div className="text-xs text-slate-400">Avg Response</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700">
                <div className="text-2xl font-bold text-blue-400">500+</div>
                <div className="text-xs text-slate-400">Projects Done</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">Questions about the deposit or need help?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors">
              <Phone className="w-4 h-4" />
              <span>Call (555) 123-BUILD</span>
            </button>
            <button className="flex items-center justify-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors">
              <Mail className="w-4 h-4" />
              <span>support@probuildconcierge.com</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPage;