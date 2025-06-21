import React, { useState } from 'react';
import { CreditCard, Loader2, CheckCircle } from 'lucide-react';
import { StripeService } from '../services/stripeService';
import type { StripeProduct } from '../stripe-config';

interface ProductCardProps {
  product: StripeProduct;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    try {
      setLoading(true);
      setError(null);

      const { sessionId } = await StripeService.createCheckoutSession({
        priceId: product.priceId,
        mode: product.mode,
      });

      await StripeService.redirectToCheckout(sessionId);
    } catch (err: any) {
      console.error('Error creating checkout session:', err);
      setError(err.message || 'Failed to start checkout');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = () => {
    if (!product.price) return 'Contact for pricing';
    
    const price = product.price / 100; // Convert from cents
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: product.currency || 'usd',
    }).format(price);

    if (product.mode === 'subscription' && product.interval) {
      return `${formatted}/${product.interval}`;
    }

    return formatted;
  };

  return (
    <div className={`bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-400/50 transition-all duration-300 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <CreditCard className="w-6 h-6 text-amber-400" />
        <h3 className="text-xl font-bold">{product.name}</h3>
      </div>

      <p className="text-slate-300 mb-6 leading-relaxed">
        {product.description}
      </p>

      <div className="mb-6">
        <div className="text-3xl font-bold text-amber-400 mb-1">
          {formatPrice()}
        </div>
        {product.mode === 'subscription' && (
          <div className="text-slate-400 text-sm">
            Recurring {product.interval}ly
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handlePurchase}
        disabled={loading}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-600 disabled:to-slate-600 text-slate-900 disabled:text-slate-400 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>{product.mode === 'subscription' ? 'Subscribe' : 'Purchase'}</span>
            <CheckCircle className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
};

export default ProductCard;