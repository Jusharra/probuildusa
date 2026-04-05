import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, Phone, Mail, Calendar, ArrowRight, Star, Users } from 'lucide-react';

const ThankYouPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get('leadId');
  const depositSkipped = searchParams.get('depositSkipped') === 'true';
  const depositPaid = searchParams.get('type') === 'deposit';

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {depositPaid ? (
              <>Thank You for <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Securing</span> Your Project!</>
            ) : (
              <>Your Project Has Been <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Submitted</span>!</>
            )}
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {depositPaid ? (
              "Your deposit has been processed and your project is now prioritized in our system."
            ) : depositSkipped ? (
              "Your project has been added to our standard queue. We'll match you with contractors soon."
            ) : (
              "We've received your project details and will begin matching you with qualified contractors."
            )}
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* What Happens Next */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <Clock className="w-6 h-6 text-amber-400" />
              <span>What Happens Next</span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-900 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {depositPaid ? "Priority Contractor Matching (Within 4 Hours)" : "Contractor Matching (Within 24-48 Hours)"}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Our AI system will match you with {depositPaid ? "1-2" : "1-3"} pre-vetted contractors based on your project requirements.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-900 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Initial Contact & Site Assessment</h3>
                  <p className="text-slate-400 text-sm">
                    Contractors will reach out to schedule consultations and provide detailed quotes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-900 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Project Planning & Scheduling</h3>
                  <p className="text-slate-400 text-sm">
                    Choose your preferred contractor and finalize project details and timeline.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Status */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              {depositPaid ? (
                <Star className="w-6 h-6 text-green-400" />
              ) : (
                <Users className="w-6 h-6 text-blue-400" />
              )}
              <span>Your Project Status</span>
            </h2>
            
            <div className="space-y-4">
              {depositPaid ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-green-400">PRIORITY STATUS ACTIVE</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span>Fast-tracked to top contractors</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span>Expedited response times</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span>Dedicated concierge support</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold text-blue-400">STANDARD QUEUE</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span>24-48 hour response time</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span>Standard contractor matching</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span>Email and phone support</span>
                    </li>
                  </ul>
                </div>
              )}
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-2">Project ID</h4>
                <p className="text-slate-300 font-mono text-sm">{leadId}</p>
                <p className="text-slate-400 text-xs mt-1">
                  Reference this ID in all communications
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Need Immediate Assistance?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-amber-500/20 p-4 rounded-xl mb-4">
                <Phone className="w-8 h-8 text-amber-400 mx-auto" />
              </div>
              <h3 className="font-semibold text-white mb-2">Call Us</h3>
              <p className="text-slate-400 text-sm mb-3">Speak with our concierge team</p>
              <button className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                (844) 543-7419
              </button>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500/20 p-4 rounded-xl mb-4">
                <Mail className="w-8 h-8 text-blue-400 mx-auto" />
              </div>
              <h3 className="font-semibold text-white mb-2">Email Support</h3>
              <p className="text-slate-400 text-sm mb-3">Get detailed project updates</p>
              <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                support@goreeassociates.com
              </button>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500/20 p-4 rounded-xl mb-4">
                <Calendar className="w-8 h-8 text-green-400 mx-auto" />
              </div>
              <h3 className="font-semibold text-white mb-2">Schedule Call</h3>
              <p className="text-slate-400 text-sm mb-3">Book a consultation</p>
              <button className="text-green-400 hover:text-green-300 font-semibold transition-colors">
                Book Meeting
              </button>
            </div>
          </div>
        </div>

        {/* Next Steps CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {depositPaid ? "Want to Track Your Priority Project?" : "Want to Upgrade to Priority Status?"}
          </h2>
          <p className="text-slate-300 mb-8">
            {depositPaid ? (
              "Create an account to track your project progress and communicate with contractors."
            ) : (
              "You can still upgrade to priority status and get faster service."
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {depositPaid ? (
              <Link
                to="/login"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Create Account & Track Project</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to={`/deposit-payment?leadId=${leadId}`}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Upgrade to Priority</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/"
                  className="border-2 border-slate-600 hover:border-amber-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Browse Our Services</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;