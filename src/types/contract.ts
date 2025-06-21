export enum TemplateFieldType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  DATE = 'date',
  NUMBER = 'number',
  CURRENCY = 'currency',
  CHECKBOX = 'checkbox'
}

export interface TemplateFieldOption {
  value: string;
  label: string;
}

export interface TemplateFieldConditional {
  field: string;
  value: string | string[];
}

export interface TemplateField {
  id: string;
  label: string;
  type: TemplateFieldType;
  required: boolean;
  placeholder?: string;
  options?: TemplateFieldOption[];
  conditionalOn?: TemplateFieldConditional;
  leadField?: string; // Maps to a field in the lead object
}

export interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  fields: TemplateField[];
}

export interface ContractFormData {
  [key: string]: string | boolean | number | null;
}