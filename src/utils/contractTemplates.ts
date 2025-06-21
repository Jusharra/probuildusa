import { ContractTemplate, TemplateField, TemplateFieldType } from '../types/contract';

export const contractTemplates: ContractTemplate[] = [
  {
    id: 'construction-agreement',
    name: 'Construction Agreement',
    description: 'Main agreement between contractor and client covering scope, cost, and timeline',
    fields: [
      {
        id: 'client_name',
        label: 'Client Name',
        type: TemplateFieldType.TEXT,
        required: true,
        placeholder: 'Full legal name of client',
        leadField: 'client_name'
      },
      {
        id: 'project_address',
        label: 'Project Address',
        type: TemplateFieldType.TEXT,
        required: true,
        placeholder: 'Full address of the project location'
      },
      {
        id: 'project_description',
        label: 'Project Description',
        type: TemplateFieldType.TEXTAREA,
        required: true,
        placeholder: 'Detailed description of the work to be performed',
        leadField: 'description'
      },
      {
        id: 'contract_amount',
        label: 'Contract Amount',
        type: TemplateFieldType.CURRENCY,
        required: true,
        placeholder: '50000',
        leadField: 'budget'
      },
      {
        id: 'payment_terms',
        label: 'Payment Terms',
        type: TemplateFieldType.SELECT,
        required: true,
        options: [
          { value: '50-25-25', label: '50% deposit, 25% midway, 25% completion' },
          { value: '33-33-33', label: '33% deposit, 33% midway, 33% completion' },
          { value: '25-25-25-25', label: '25% deposit, 25% framing, 25% finishes, 25% completion' },
          { value: 'custom', label: 'Custom payment schedule' }
        ]
      },
      {
        id: 'custom_payment_terms',
        label: 'Custom Payment Terms',
        type: TemplateFieldType.TEXTAREA,
        required: false,
        placeholder: 'Describe your custom payment schedule',
        conditionalOn: {
          field: 'payment_terms',
          value: 'custom'
        }
      },
      {
        id: 'start_date',
        label: 'Start Date',
        type: TemplateFieldType.DATE,
        required: true
      },
      {
        id: 'completion_date',
        label: 'Estimated Completion Date',
        type: TemplateFieldType.DATE,
        required: true
      },
      {
        id: 'warranty_period',
        label: 'Warranty Period',
        type: TemplateFieldType.SELECT,
        required: true,
        options: [
          { value: '1-year', label: '1 Year Workmanship' },
          { value: '2-year', label: '2 Year Workmanship' },
          { value: '5-year', label: '5 Year Workmanship' },
          { value: 'custom', label: 'Custom Warranty' }
        ]
      },
      {
        id: 'custom_warranty',
        label: 'Custom Warranty Terms',
        type: TemplateFieldType.TEXTAREA,
        required: false,
        placeholder: 'Describe your custom warranty terms',
        conditionalOn: {
          field: 'warranty_period',
          value: 'custom'
        }
      }
    ]
  },
  {
    id: 'subcontractor-agreement',
    name: 'Subcontractor Agreement',
    description: 'Agreement between general contractor and subcontractor',
    fields: [
      {
        id: 'subcontractor_name',
        label: 'Subcontractor Name',
        type: TemplateFieldType.TEXT,
        required: true,
        placeholder: 'Full legal name of subcontractor'
      },
      {
        id: 'subcontractor_license',
        label: 'License Number',
        type: TemplateFieldType.TEXT,
        required: true,
        placeholder: 'Subcontractor license number'
      },
      {
        id: 'project_name',
        label: 'Project Name',
        type: TemplateFieldType.TEXT,
        required: true,
        placeholder: 'Name of the project',
        leadField: 'project_type'
      },
      {
        id: 'scope_of_work',
        label: 'Scope of Work',
        type: TemplateFieldType.TEXTAREA,
        required: true,
        placeholder: 'Detailed description of the work to be performed by the subcontractor'
      },
      {
        id: 'subcontract_amount',
        label: 'Subcontract Amount',
        type: TemplateFieldType.CURRENCY,
        required: true,
        placeholder: '15000'
      },
      {
        id: 'payment_schedule',
        label: 'Payment Schedule',
        type: TemplateFieldType.SELECT,
        required: true,
        options: [
          { value: 'progress', label: 'Progress Payments' },
          { value: 'completion', label: 'Payment upon Completion' },
          { value: 'custom', label: 'Custom Payment Schedule' }
        ]
      },
      {
        id: 'custom_payment_schedule',
        label: 'Custom Payment Schedule',
        type: TemplateFieldType.TEXTAREA,
        required: false,
        placeholder: 'Describe the custom payment schedule',
        conditionalOn: {
          field: 'payment_schedule',
          value: 'custom'
        }
      },
      {
        id: 'start_date',
        label: 'Start Date',
        type: TemplateFieldType.DATE,
        required: true
      },
      {
        id: 'completion_date',
        label: 'Completion Date',
        type: TemplateFieldType.DATE,
        required: true
      },
      {
        id: 'insurance_requirements',
        label: 'Insurance Requirements',
        type: TemplateFieldType.SELECT,
        required: true,
        options: [
          { value: 'standard', label: 'Standard (General Liability $1M, Workers Comp)' },
          { value: 'enhanced', label: 'Enhanced (General Liability $2M, Workers Comp, Auto)' },
          { value: 'custom', label: 'Custom Insurance Requirements' }
        ]
      }
    ]
  },
  {
    id: 'change-order',
    name: 'Change Order Form',
    description: 'Document changes to the original scope, cost, or timeline',
    fields: [
      {
        id: 'client_name',
        label: 'Client Name',
        type: TemplateFieldType.TEXT,
        required: true,
        placeholder: 'Full name of client',
        leadField: 'client_name'
      },
      {
        id: 'project_name',
        label: 'Project Name',
        type: TemplateFieldType.TEXT,
        required: true,
        placeholder: 'Name of the project',
        leadField: 'project_type'
      },
      {
        id: 'change_order_number',
        label: 'Change Order Number',
        type: TemplateFieldType.TEXT,
        required: true,
        placeholder: 'e.g., CO-001'
      },
      {
        id: 'original_contract_date',
        label: 'Original Contract Date',
        type: TemplateFieldType.DATE,
        required: true
      },
      {
        id: 'change_description',
        label: 'Description of Changes',
        type: TemplateFieldType.TEXTAREA,
        required: true,
        placeholder: 'Detailed description of the changes to the original scope'
      },
      {
        id: 'reason_for_change',
        label: 'Reason for Change',
        type: TemplateFieldType.TEXTAREA,
        required: true,
        placeholder: 'Explain why this change is necessary'
      },
      {
        id: 'cost_impact',
        label: 'Cost Impact',
        type: TemplateFieldType.CURRENCY,
        required: true,
        placeholder: '5000'
      },
      {
        id: 'schedule_impact',
        label: 'Schedule Impact',
        type: TemplateFieldType.SELECT,
        required: true,
        options: [
          { value: 'none', label: 'No Impact on Schedule' },
          { value: 'delay', label: 'Extends Completion Date' },
          { value: 'advance', label: 'Advances Completion Date' }
        ]
      },
      {
        id: 'days_changed',
        label: 'Days Added/Removed',
        type: TemplateFieldType.NUMBER,
        required: false,
        placeholder: 'e.g., 7 (positive for delay, negative for advance)',
        conditionalOn: {
          field: 'schedule_impact',
          value: ['delay', 'advance']
        }
      },
      {
        id: 'new_completion_date',
        label: 'New Completion Date',
        type: TemplateFieldType.DATE,
        required: false,
        conditionalOn: {
          field: 'schedule_impact',
          value: ['delay', 'advance']
        }
      }
    ]
  },
  {
    id: 'payment-schedule',
    name: 'Payment Schedule Agreement',
    description: 'Detailed payment milestones and amounts',
    fields: [
      {
        id: 'client_name',
        label: 'Client Name',
        type: TemplateFieldType.TEXT,
        required: true,
        placeholder: 'Full name of client',
        leadField: 'client_name'
      },
      {
        id: 'project_name',
        label: 'Project Name',
        type: TemplateFieldType.TEXT,
        required: true,
        placeholder: 'Name of the project',
        leadField: 'project_type'
      },
      {
        id: 'total_contract_amount',
        label: 'Total Contract Amount',
        type: TemplateFieldType.CURRENCY,
        required: true,
        placeholder: '50000',
        leadField: 'budget'
      },
      {
        id: 'payment_type',
        label: 'Payment Type',
        type: TemplateFieldType.SELECT,
        required: true,
        options: [
          { value: 'milestone', label: 'Milestone-Based Payments' },
          { value: 'monthly', label: 'Monthly Progress Payments' },
          { value: 'custom', label: 'Custom Payment Schedule' }
        ]
      },
      {
        id: 'deposit_amount',
        label: 'Initial Deposit Amount',
        type: TemplateFieldType.CURRENCY,
        required: true,
        placeholder: '10000'
      },
      {
        id: 'deposit_due_date',
        label: 'Deposit Due Date',
        type: TemplateFieldType.DATE,
        required: true
      },
      {
        id: 'milestone_1_description',
        label: 'Milestone 1 Description',
        type: TemplateFieldType.TEXT,
        required: false,
        placeholder: 'e.g., Foundation completion',
        conditionalOn: {
          field: 'payment_type',
          value: 'milestone'
        }
      },
      {
        id: 'milestone_1_amount',
        label: 'Milestone 1 Amount',
        type: TemplateFieldType.CURRENCY,
        required: false,
        placeholder: '10000',
        conditionalOn: {
          field: 'payment_type',
          value: 'milestone'
        }
      },
      {
        id: 'milestone_2_description',
        label: 'Milestone 2 Description',
        type: TemplateFieldType.TEXT,
        required: false,
        placeholder: 'e.g., Framing completion',
        conditionalOn: {
          field: 'payment_type',
          value: 'milestone'
        }
      },
      {
        id: 'milestone_2_amount',
        label: 'Milestone 2 Amount',
        type: TemplateFieldType.CURRENCY,
        required: false,
        placeholder: '10000',
        conditionalOn: {
          field: 'payment_type',
          value: 'milestone'
        }
      },
      {
        id: 'final_payment_amount',
        label: 'Final Payment Amount',
        type: TemplateFieldType.CURRENCY,
        required: true,
        placeholder: '10000'
      },
      {
        id: 'payment_terms',
        label: 'Payment Terms',
        type: TemplateFieldType.TEXTAREA,
        required: true,
        placeholder: 'Additional payment terms and conditions'
      }
    ]
  },
  {
    id: 'warranty-statement',
    name: 'Warranty Statement',
    description: 'Defines warranty terms for materials and labor',
    fields: [
      {
        id: 'client_name',
        label: 'Client Name',
        type: TemplateFieldType.TEXT,
        required: true,
        placeholder: 'Full name of client',
        leadField: 'client_name'
      },
      {
        id: 'project_name',
        label: 'Project Name',
        type: TemplateFieldType.TEXT,
        required: true,
        placeholder: 'Name of the project',
        leadField: 'project_type'
      },
      {
        id: 'project_address',
        label: 'Project Address',
        type: TemplateFieldType.TEXT,
        required: true,
        placeholder: 'Full address of the project'
      },
      {
        id: 'completion_date',
        label: 'Project Completion Date',
        type: TemplateFieldType.DATE,
        required: true
      },
      {
        id: 'workmanship_warranty_period',
        label: 'Workmanship Warranty Period',
        type: TemplateFieldType.SELECT,
        required: true,
        options: [
          { value: '1-year', label: '1 Year' },
          { value: '2-year', label: '2 Years' },
          { value: '5-year', label: '5 Years' },
          { value: '10-year', label: '10 Years' },
          { value: 'custom', label: 'Custom Period' }
        ]
      },
      {
        id: 'custom_workmanship_period',
        label: 'Custom Workmanship Period',
        type: TemplateFieldType.TEXT,
        required: false,
        placeholder: 'Specify custom warranty period',
        conditionalOn: {
          field: 'workmanship_warranty_period',
          value: 'custom'
        }
      },
      {
        id: 'materials_warranty',
        label: 'Materials Warranty',
        type: TemplateFieldType.TEXTAREA,
        required: true,
        placeholder: 'Description of manufacturer warranties for materials used'
      },
      {
        id: 'warranty_exclusions',
        label: 'Warranty Exclusions',
        type: TemplateFieldType.TEXTAREA,
        required: true,
        placeholder: 'List any exclusions or limitations to the warranty'
      },
      {
        id: 'warranty_claim_process',
        label: 'Warranty Claim Process',
        type: TemplateFieldType.TEXTAREA,
        required: true,
        placeholder: 'Describe the process for submitting warranty claims'
      }
    ]
  }
];

export const getTemplateById = (id: string): ContractTemplate | undefined => {
  return contractTemplates.find(template => template.id === id);
};

export const getFieldValue = (field: TemplateField, lead: any): string => {
  if (!field.leadField || !lead) return '';
  
  return lead[field.leadField] || '';
};