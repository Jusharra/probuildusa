import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { StripeService, type SubscriptionData } from '../services/stripeService';
import { stripeProducts, getProductByPriceId } from '../stripe-config';

interface SubscriptionCardProps {
  className?: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ className = '' }) => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await StripeService.getUserSubscription();
      setSubscription(data);
    } catch (err: any) {
      console.error('Error loading subscription:', err);
      setError(err.message || 'Failed to load subscription');
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptionProduct = () => {
    if (!subscription?.price_id) return null;
    return getProductByPriceId(subscription.price_id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'trialing':
        return 'text-blue-400';
      case 'past_due':
        return 'text-yellow-400';
      case 'canceled':
      case 'unpaid':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'trialing':
        return <CheckCircle className="w-4 h-4" />;
      case 'past_due':
      case 'canceled':
      case 'unpaid':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className={`bg-slate-800 rounded-xl p-6 border border-slate-700 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
          <span className="ml-2 text-slate-400">Loading subscription...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-slate-800 rounded-xl p-6 border border-red-500/20 ${className}`}>
        <div className="flex items-center space-x-2 text-red-400 mb-4">
          <AlertCircle className="w-5 h-5" />
          <span className="font-semibold">Error</span>
        </div>
        <p className="text-slate-300 mb-4">{error}</p>
        <button
          onClick={loadSubscription}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const product = getSubscriptionProduct();

  return (
    <div className={`bg-slate-800 rounded-xl p-6 border border-slate-700 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <CreditCard className="w-6 h-6 text-amber-400" />
        <h3 className="text-xl font-bold">Subscription</h3>
      </div>

      {subscription && subscription.subscription_status !== 'not_started' ? (
        <div className="space-y-4">
          {/* Product Info */}
          {product && (
            <div>
              <h4 className="font-semibold text-white mb-1">{product.name}</h4>
              <p className="text-slate-400 text-sm">{product.description}</p>
            </div>
          )}

          {/* Status */}
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Status:</span>
            <div className={`flex items-center space-x-1 ${getStatusColor(subscription.subscription_status)}`}>
              {getStatusIcon(subscription.subscription_status)}
              <span className="font-semibold capitalize">
                {subscription.subscription_status.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Billing Period */}
          {subscription.current_period_start && subscription.current_period_end && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Current period:</span>
                <div className="text-white">
                  {formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}
                </div>
              </div>
            </div>
          )}

          {/* Payment Method */}
          {subscription.payment_method_brand && subscription.payment_method_last4 && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-slate-400">Payment method:</span>
              <span className="text-white">
                {subscription.payment_method_brand.toUpperCase()} •••• {subscription.payment_method_last4}
              </span>
            </div>
          )}

          {/* Cancel at period end */}
          {subscription.cancel_at_period_end && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-yellow-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-semibold">Subscription will cancel at period end</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-slate-400 mb-4">No active subscription</p>
          <p className="text-slate-500 text-sm">Subscribe to access premium features</p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;