import React, { useState } from 'react';
import { CheckCircle, AlertCircle, X, FileText, User, Mail, Lock } from 'lucide-react';
import { ContractService } from '../../services/contractService';

interface SignContractModalProps {
  contractId: string;
  contractFileUrl: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

const SignContractModal: React.FC<SignContractModalProps> = ({
  contractId,
  contractFileUrl,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    signerName: '',
    signerEmail: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions to sign this contract.');
      return;
    }

    if (!contractFileUrl) {
      setError('No contract document found. Please contact support.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await ContractService.markContractSigned(contractId, {
        signer_name: formData.signerName,
        signer_email: formData.signerEmail,
        verification_method: 'electronic_signature'
      });

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      console.error('Error signing contract:', err);
      setError(err.message || 'Failed to sign contract. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Sign Contract</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="text-xl font-bold mb-2">Contract Signed Successfully!</h4>
            <p className="text-slate-300 mb-6">
              Your signature has been securely recorded and the contract has been marked as signed.
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </div>
            )}

            <div className="mb-6">
              <div className="bg-slate-700/50 rounded-lg p-4 flex items-center space-x-3">
                <FileText className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white">Contract Document</div>
                  {contractFileUrl ? (
                    <a
                      href={contractFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      View contract document
                    </a>
                  ) : (
                    <p className="text-sm text-red-400">No document available</p>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="signerName"
                  value={formData.signerName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Enter your full legal name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="signerEmail"
                  value={formData.signerEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-400 mb-2">Secure Electronic Signature</h4>
                    <p className="text-sm text-slate-300 mb-4">
                      By signing this contract, you agree to be legally bound by its terms and conditions. 
                      Your signature will be secured using cryptographic hashing for verification purposes.
                    </p>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-amber-400 bg-slate-700 border-slate-600 rounded focus:ring-amber-400"
                      />
                      <label htmlFor="agreeToTerms" className="text-sm text-slate-300">
                        I have read the contract and agree to the terms and conditions
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-6 border-t border-slate-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.agreeToTerms}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-600 disabled:to-slate-600 text-slate-900 disabled:text-slate-400 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Sign Contract</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignContractModal;