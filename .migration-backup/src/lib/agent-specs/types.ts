export type IndustryType = 
  | "sales"
  | "retail"
  | "manufacturing"
  | "finance"
  | "healthcare"
  | "education"
  | "it"
  | "real_estate"
  | "media"
  | "legal"
  | "hr"
  | "marketing"
  | "engineering"
  | "executive"
  | "medical"
  | "entrepreneur"
  | "creative"
  | "religious"
  | "administrative"
  | "telecommunications"
  | "construction";

export interface StateSchema {
  org_profile: OrgProfile;
  iso_scope: IsoScope;
  process_map: ProcessMap;
  doc_control: DocControl;
  risk_register: RiskRegister[];
  kpi_register: KpiRegister[];
  outputs: Outputs;
  open_items: OpenItem[];
}

export interface OrgProfile {
  company_name: string;
  industry: string;
  sales_model?: string;
  retail_type?: string;
  stores_count?: number;
  regions?: string;
  customer_segments?: string[];
  channels?: string[];
  crm?: {
    name: string;
    notes?: string;
  };
  products_services?: string;
  systems?: {
    pos?: string;
    erp?: string;
    wms?: string;
  };
}

export interface IsoScope {
  standards: string[];
  scope_statement: string;
  boundaries?: string;
  exclusions: string[];
}

export interface ProcessMap {
  stages?: string[];
  core_processes?: string[];
  support_processes?: string[];
  outsourced_processes?: string[];
  interfaces?: string[];
}

export interface DocControl {
  doc_coding_rule: string;
  versioning_rule: string;
  retention_rule: string;
  doc_register: DocRegisterItem[];
}

export interface DocRegisterItem {
  code: string;
  title: string;
  type: string;
  owner_role: string;
  frequency: string;
  retention: string;
}

export interface RiskRegister {
  id: string;
  process: string;
  risk_description: string;
  likelihood: number;
  impact: number;
  risk_score: number;
  risk_level: "low" | "medium" | "high" | "critical";
  treatment: string;
  control: string;
  owner: string;
  status: "open" | "mitigated" | "closed";
}

export interface KpiRegister {
  id: string;
  name: string;
  definition: string;
  formula: string;
  target: string;
  frequency: string;
  owner_role: string;
  source: string;
}

export interface Outputs {
  policies: Document[];
  sops: Document[];
  work_instructions: Document[];
  forms_logs_templates: Document[];
  audit_program: Document[];
  capa: Document[];
  management_review: Document[];
}

export interface Document {
  id: string;
  code: string;
  title: string;
  version: string;
  owner_role: string;
  approved_by_role: string;
  effective_date: string;
  content?: string;
}

export interface OpenItem {
  id: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "open" | "in_progress" | "resolved";
  assignee?: string;
  due_date?: string;
}

export interface DocumentOutputSchema {
  doc_meta: DocMeta;
  purpose: string;
  scope: string;
  definitions: string[];
  references: References;
  roles_responsibilities: RoleResponsibility[];
  procedure_steps: ProcedureStep[];
  crm_requirements?: CrmRequirement[];
  risks_controls: RiskControl[];
  records_retention: RecordRetention[];
  kpis: Kpi[];
  attachments: Attachment[];
  assumptions: string[];
  need_confirmation: string[];
}

export interface DocMeta {
  title: string;
  code: string;
  version: string;
  owner_role: string;
  approved_by_role: string;
  effective_date: string;
}

export interface References {
  iso_clauses: string[];
  internal_refs: string[];
}

export interface RoleResponsibility {
  role: string;
  responsibility: string;
}

export interface ProcedureStep {
  step: number;
  activity: string;
  who: string;
  record_evidence: string;
  control_point: string;
}

export interface CrmRequirement {
  field_or_object: string;
  rule: string;
  quality_check: string;
  owner_role: string;
}

export interface RiskControl {
  risk: string;
  impact: string;
  control: string;
  evidence: string;
}

export interface RecordRetention {
  record_name: string;
  format: string;
  retention: string;
  storage: string;
}

export interface Kpi {
  name: string;
  definition: string;
  formula: string;
  target: string;
  frequency: string;
  owner_role: string;
}

export interface Attachment {
  type: "form" | "checklist" | "log" | "template";
  name: string;
  id: string;
}

export interface TaskBrief {
  task_id: string;
  assigned_agent: string;
  objective: string;
  inputs_from_state: string[];
  deliverables: string[];
  constraints: string[];
  acceptance_criteria: string[];
}

export interface AgentSpec {
  id: string;
  name: string;
  role: string;
  industry: string;
  system_prompt: string;
  deliverables: string[];
  dependencies: string[];
}
