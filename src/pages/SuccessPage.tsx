import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, CreditCard, Loader2 } from 'lucide-react';
import { StripeService } from '../services/stripeService';

const SuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    // Give the webhook a moment to process
    const timer = setTimeout(async () => {
      try {
        const data = await StripeService.getUserSubscription();
        setSubscription(data);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-slate-300 mb-8">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-amber-400" />
            <span>Payment Details</span>
          </h2>
          
          {sessionId && (
            <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Session ID:</div>
              <div className="text-xs text-slate-300 font-mono break-all">{sessionId}</div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-amber-400 mr-2" />
              <span className="text-slate-400">Loading subscription details...</span>
            </div>
          ) : subscription ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Status:</span>
                <span className="text-green-400 font-semibold capitalize">
                  {subscription.subscription_status?.replace('_', ' ')}
                </span>
              </div>
              
              {subscription.current_period_end && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Next billing:</span>
                  <span className="text-white">
                    {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-slate-400">Subscription details will be available shortly.</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Link
            to="/partner-portal"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link
            to="/"
            className="w-full border-2 border-slate-600 hover:border-amber-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-slate-500 text-sm">
            If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;