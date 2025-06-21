import React from 'react';
import { stripeProducts } from '../stripe-config';
import ProductCard from '../components/ProductCard';
import { Star, Shield, Users, CheckCircle } from 'lucide-react';

const PricingPage: React.FC = () => {
  const features = [
    'Access to premium contractor network',
    'Priority lead matching',
    'Dedicated account manager',
    'Advanced project management tools',
    'Monthly performance reports',
    '24/7 customer support'
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Membership</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Join our exclusive network of premium contractors and start receiving high-quality leads today.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
            <Shield className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Verified Network</h3>
            <p className="text-slate-400 text-sm">All contractors are licensed, insured, and background verified</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
            <Star className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Premium Leads</h3>
            <p className="text-slate-400 text-sm">High-value projects with serious clients and real budgets</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
            <Users className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Exclusive Access</h3>
            <p className="text-slate-400 text-sm">Limited network means less competition and higher win rates</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stripeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-bold mb-3">Can I cancel anytime?</h3>
              <p className="text-slate-400 text-sm">Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-bold mb-3">How many leads will I receive?</h3>
              <p className="text-slate-400 text-sm">Lead volume varies by location and specialty, but our members typically receive 3-8 qualified leads per month.</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-bold mb-3">What types of projects?</h3>
              <p className="text-slate-400 text-sm">We focus on high-ticket construction projects typically ranging from $25K to $1M+ including luxury remodels, custom homes, and commercial work.</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-bold mb-3">Is there a setup fee?</h3>
              <p className="text-slate-400 text-sm">No setup fees. Just your monthly membership fee to access our premium contractor network and lead matching service.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;