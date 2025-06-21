import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, FileText, CheckCircle, AlertCircle, Save, Send } from 'lucide-react';
import { ContractService } from '../../services/contractService';
import { contractTemplates, getTemplateById, getFieldValue } from '../../utils/contractTemplates';
import { ContractTemplate, TemplateField, TemplateFieldType, ContractFormData } from '../../types/contract';
import FileUpload from '../FileUpload';

interface ContractWizardModalProps {
  contractorId: string;
  leads: any[];
  onClose: () => void;
  onSuccess: () => void;
}

const ContractWizardModal: React.FC<ContractWizardModalProps> = ({
  contractorId,
  leads,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState(1);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [formData, setFormData] = useState<ContractFormData>({});
  const [generatedContract, setGeneratedContract] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedTemplateId) {
      const template = getTemplateById(selectedTemplateId);
      setSelectedTemplate(template || null);
    } else {
      setSelectedTemplate(null);
    }
  }, [selectedTemplateId]);

  useEffect(() => {
    if (selectedLeadId) {
      const lead = leads.find(l => l.id === selectedLeadId);
      setSelectedLead(lead || null);
      
      // Pre-fill form data from lead if template is selected
      if (selectedTemplate && lead) {
        const newFormData = { ...formData };
        selectedTemplate.fields.forEach(field => {
          if (field.leadField && lead[field.leadField]) {
            newFormData[field.id] = lead[field.leadField];
          }
        });
        setFormData(newFormData);
      }
    } else {
      setSelectedLead(null);
    }
  }, [selectedLeadId, selectedTemplate, leads]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleFileUploadSuccess = (upload: any) => {
    setFileUrl(upload.file_url);
  };

  const isFieldVisible = (field: TemplateField): boolean => {
    if (!field.conditionalOn) return true;
    
    const { conditionalOn } = field;
    const parentValue = formData[conditionalOn.field];
    
    if (Array.isArray(conditionalOn.value)) {
      return conditionalOn.value.includes(parentValue as string);
    }
    
    return parentValue === conditionalOn.value;
  };

  const validateStep = (): boolean => {
    switch (step) {
      case 1:
        return !!selectedTemplateId;
      case 2:
        return true; // Lead selection is optional
      case 3:
        if (!selectedTemplate) return false;
        
        // Check if all required fields are filled
        return selectedTemplate.fields.every(field => {
          if (!field.required) return true;
          if (!isFieldVisible(field)) return true;
          
          const value = formData[field.id];
          return value !== undefined && value !== '';
        });
      case 4:
        return !!fileUrl || !!generatedContract;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      setError('Please fill in all required fields before proceeding.');
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setError(null);
  };

  const generateContract = async () => {
    if (!selectedTemplate) {
      setError('No template selected');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call an AI service to generate the contract
      // For now, we'll simulate the generation by creating a contract record
      
      const contractData = {
        contractor_id: contractorId,
        lead_id: selectedLeadId || null,
        status: 'draft',
        created_by_ai: true,
        // We'll use the file URL if one was uploaded, otherwise it will be null
        file_url: fileUrl
      };

      const contract = await ContractService.createContract(contractData);
      setGeneratedContract(contract);
      
      // Move to the next step
      setStep(4);
    } catch (err: any) {
      console.error('Error generating contract:', err);
      setError(err.message || 'Failed to generate contract. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveAsDraft = async () => {
    if (!generatedContract && !fileUrl) {
      setError('No contract document available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (generatedContract) {
        // If we already have a generated contract, we're done
        onSuccess();
      } else {
        // Otherwise, create a new contract with the uploaded file
        const contractData = {
          contractor_id: contractorId,
          lead_id: selectedLeadId || null,
          status: 'draft',
          created_by_ai: false,
          file_url: fileUrl
        };

        await ContractService.createContract(contractData);
        onSuccess();
      }
    } catch (err: any) {
      console.error('Error saving contract:', err);
      setError(err.message || 'Failed to save contract. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sendForSignature = async () => {
    if (!generatedContract && !fileUrl) {
      setError('No contract document available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (generatedContract) {
        // If we have a generated contract, send it for signature
        await ContractService.sendContractForSignature(generatedContract.id);
        onSuccess();
      } else {
        // Otherwise, create a new contract and send it for signature
        const contractData = {
          contractor_id: contractorId,
          lead_id: selectedLeadId || null,
          status: 'draft',
          created_by_ai: false,
          file_url: fileUrl
        };

        const contract = await ContractService.createContract(contractData);
        await ContractService.sendContractForSignature(contract.id);
        onSuccess();
      }
    } catch (err: any) {
      console.error('Error sending contract for signature:', err);
      setError(err.message || 'Failed to send contract for signature. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: TemplateField) => {
    if (!isFieldVisible(field)) return null;

    switch (field.type) {
      case TemplateFieldType.TEXT:
        return (
          <div key={field.id}>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            <input
              type="text"
              name={field.id}
              value={formData[field.id] as string || ''}
              onChange={handleInputChange}
              required={field.required}
              placeholder={field.placeholder}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>
        );
      
      case TemplateFieldType.TEXTAREA:
        return (
          <div key={field.id}>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            <textarea
              name={field.id}
              value={formData[field.id] as string || ''}
              onChange={handleInputChange}
              required={field.required}
              placeholder={field.placeholder}
              rows={4}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>
        );
      
      case TemplateFieldType.SELECT:
        return (
          <div key={field.id}>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            <select
              name={field.id}
              value={formData[field.id] as string || ''}
              onChange={handleInputChange}
              required={field.required}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      
      case TemplateFieldType.DATE:
        return (
          <div key={field.id}>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            <input
              type="date"
              name={field.id}
              value={formData[field.id] as string || ''}
              onChange={handleInputChange}
              required={field.required}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>
        );
      
      case TemplateFieldType.NUMBER:
        return (
          <div key={field.id}>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            <input
              type="number"
              name={field.id}
              value={formData[field.id] as number || ''}
              onChange={handleInputChange}
              required={field.required}
              placeholder={field.placeholder}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>
        );
      
      case TemplateFieldType.CURRENCY:
        return (
          <div key={field.id}>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">$</span>
              <input
                type="number"
                name={field.id}
                value={formData[field.id] as number || ''}
                onChange={handleInputChange}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-8 pr-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </div>
        );
      
      case TemplateFieldType.CHECKBOX:
        return (
          <div key={field.id}>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name={field.id}
                checked={!!formData[field.id]}
                onChange={handleInputChange}
                required={field.required}
                className="w-4 h-4 text-amber-400 bg-slate-700 border-slate-600 rounded focus:ring-amber-400"
              />
              <span className="text-slate-300">
                {field.label} {field.required && <span className="text-red-400">*</span>}
              </span>
            </label>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Select Contract Template</h3>
              <p className="text-slate-400">Choose the type of contract you want to create</p>
            </div>

            <div className="grid gap-4">
              {contractTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplateId(template.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedTemplateId === template.id
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-slate-700 hover:border-amber-400/50'
                  }`}
                >
                  <div className="font-semibold text-white mb-1">{template.name}</div>
                  <div className="text-sm text-slate-400">{template.description}</div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Select Lead (Optional)</h3>
              <p className="text-slate-400">Choose a lead to pre-fill contract information</p>
            </div>

            {leads.length > 0 ? (
              <div className="grid gap-4">
                <button
                  onClick={() => setSelectedLeadId('')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedLeadId === ''
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-slate-700 hover:border-amber-400/50'
                  }`}
                >
                  <div className="font-semibold text-white mb-1">No Lead</div>
                  <div className="text-sm text-slate-400">Create contract without associating a lead</div>
                </button>

                {leads.map(lead => (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedLeadId === lead.id
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-slate-700 hover:border-amber-400/50'
                    }`}
                  >
                    <div className="font-semibold text-white mb-1">{lead.client_name}</div>
                    <div className="text-sm text-slate-400">{lead.project_type}</div>
                    <div className="text-sm text-amber-400 mt-1">Budget: ${lead.budget?.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400">No leads available. You can still create a contract without a lead.</p>
              </div>
            )}
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Contract Details</h3>
              <p className="text-slate-400">Fill in the details for your {selectedTemplate?.name}</p>
            </div>

            {selectedTemplate ? (
              <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
                {selectedTemplate.fields.map(field => renderField(field))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400">No template selected. Please go back and select a template.</p>
              </div>
            )}
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Generate or Upload Contract</h3>
              <p className="text-slate-400">Choose to generate an AI contract or upload your own document</p>
            </div>

            <div className="grid gap-6">
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                <h4 className="font-semibold text-amber-400 mb-4">Option 1: Generate AI Contract</h4>
                <p className="text-slate-300 mb-4">
                  Our AI will generate a professional contract based on the information you provided.
                </p>
                <button
                  onClick={generateContract}
                  disabled={loading || !!generatedContract}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-600 text-white disabled:text-slate-400 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </>
                  ) : generatedContract ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Contract Generated</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Generate AI Contract</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                <h4 className="font-semibold text-amber-400 mb-4">Option 2: Upload Your Own Contract</h4>
                <FileUpload
                  relatedTo="contract"
                  relatedId="temp"
                  onUploadSuccess={handleFileUploadSuccess}
                  maxFiles={1}
                  allowedFileTypes={['application/pdf', '.doc', '.docx']}
                  maxSizeMB={10}
                  label="Upload Contract Document"
                  description="Upload your own contract document (PDF, DOC, DOCX)"
                  bucketName="contracts"
                />
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Contract Ready!</h3>
              <p className="text-slate-400">Your contract has been created successfully</p>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <h4 className="font-semibold text-amber-400 mb-4">Contract Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Template:</span>
                  <span className="text-white">{selectedTemplate?.name}</span>
                </div>
                {selectedLead && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Client:</span>
                    <span className="text-white">{selectedLead.client_name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-white">Draft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Created:</span>
                  <span className="text-white">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={saveAsDraft}
                disabled={loading}
                className="flex-1 border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>Save as Draft</span>
              </button>
              <button
                onClick={sendForSignature}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-600 disabled:to-slate-600 text-slate-900 disabled:text-slate-400 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>Send for Signature</span>
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-3xl w-full border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Contract Wizard</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
            <span>Step {step} of 5</span>
            <span>{Math.round((step / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="min-h-[300px]">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
          )}

          {step < 5 && (
            <button
              onClick={nextStep}
              disabled={!validateStep()}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-600 disabled:to-slate-600 text-slate-900 disabled:text-slate-400 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractWizardModal;