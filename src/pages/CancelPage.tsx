import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, Home, RefreshCw } from 'lucide-react';

const CancelPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-slate-300 mb-8">
            Your payment was cancelled. No charges have been made to your account.
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold mb-4">What happened?</h2>
          <p className="text-slate-300 mb-4">
            You cancelled the payment process before it was completed. This is completely normal and no charges were made.
          </p>
          <p className="text-slate-400 text-sm">
            If you experienced any issues during checkout, please try again or contact our support team for assistance.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => window.history.back()}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
          
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
            Need help? Contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;