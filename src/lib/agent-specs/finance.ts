import { AgentSpec, TaskBrief } from "./types";

export const FINANCE_STATE_SCHEMA = {
  org_profile: {
    company_name: "NEED_CONFIRMATION",
    industry: "finance",
    finance_type: "NEED_CONFIRMATION",
    services: "NEED_CONFIRMATION",
    regions: "NEED_CONFIRMATION",
    systems: { core_banking: "NEED_CONFIRMATION", erp: "NEED_CONFIRMATION", crm: "NEED_CONFIRMATION" }
  },
  iso_scope: {
    standards: ["ISO9001", "ISO27001"],
    scope_statement: "NEED_CONFIRMATION",
    boundaries: "Financial services operations",
    exclusions: []
  },
  process_map: { core_processes: [], support_processes: [], outsourced_processes: [] },
  doc_control: { doc_coding_rule: "FIN-<AREA>-<TYPE>-<NNN>", versioning_rule: "vMajor.Minor", retention_rule: "NEED_CONFIRMATION", doc_register: [] },
  risk_register: [], kpi_register: [],
  outputs: { policies: [], sops: [], work_instructions: [], forms_logs_templates: [], audit_program: [], capa: [], management_review: [] },
  open_items: []
};

export const FINANCE_ORCHESTRATOR: AgentSpec = {
  id: "isoFinanceOrchestrator",
  name: "ISO Finance Orchestrator",
  role: "Orchestrator",
  industry: "finance",
  system_prompt: `Kamu adalah \`isoFinanceOrchestrator\`. Pimpin pembangunan ISO Financial Services Management System dengan fokus ISO 9001 dan ISO 27001 (keamanan data finansial). Tugas: validasi compliance, risk management, data governance.`,
  deliverables: ["Finance Process Map", "Document Register", "ISO Clause-Evidence Matrix", "Internal Audit Program"],
  dependencies: []
};

export const FINANCE_SPECIALISTS: AgentSpec[] = [
  {
    id: "accountingManagerAgent",
    name: "Accounting Manager Agent",
    role: "Accounting Manager",
    industry: "finance",
    system_prompt: `Fokus: accounting, financial reporting, fixed assets, reconciliation. Deliverables: SOP Accounting, Chart of Accounts, Reconciliation Template, Fixed Asset Control.`,
    deliverables: ["SOP Accounting", "Chart of Accounts", "Reconciliation Template", "Fixed Asset Control"],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "treasuryAgent",
    name: "Treasury Agent",
    role: "Treasury Manager",
    industry: "finance",
    system_prompt: `Fokus: cash management, banking, investment, liquidity. Deliverables: SOP Treasury, Cash Flow Template, Banking Control, Investment Policy.`,
    deliverables: ["SOP Treasury", "Cash Flow Template", "Banking Control", "Investment Policy"],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "taxAgent",
    name: "Tax Agent",
    role: "Tax Manager",
    industry: "finance",
    system_prompt: `Fokus: tax compliance, tax planning, tax reporting. Deliverables: SOP Tax, Tax Calendar, Tax Compliance Checklist, Transfer Pricing Policy.`,
    deliverables: ["SOP Tax", "Tax Calendar", "Tax Compliance", "Transfer Pricing"],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "auditAgent",
    name: "Internal Audit Agent",
    role: "Internal Audit",
    industry: "finance",
    system_prompt: `Fokus: internal audit, compliance audit, fraud investigation. Deliverables: Audit Program, Audit Checklist, Fraud Detection SOP, Audit Report Template.`,
    deliverables: ["Audit Program", "Audit Checklist", "Fraud Detection", "Audit Report"],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "riskManagementAgent",
    name: "Risk Management Agent",
    role: "Risk Manager",
    industry: "finance",
    system_prompt: `Fokus: financial risk, credit risk, market risk, operational risk. Deliverables: Risk Register, Risk Assessment, Credit Policy, Risk Monitoring.`,
    deliverables: ["Risk Register", "Risk Assessment", "Credit Policy", "Risk Monitoring"],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "complianceFinanceAgent",
    name: "Compliance Agent",
    role: "Compliance Manager",
    industry: "finance",
    system_prompt: `Fokus: regulatory compliance, AML, KYC, governance. Deliverables: SOP Compliance, AML/KYC Procedures, Regulatory Mapping, Compliance Checklist.`,
    deliverables: ["SOP Compliance", "AML/KYC", "Regulatory Mapping", "Compliance Checklist"],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "itSecurityFinanceAgent",
    name: "IT Security Agent",
    role: "IT Security",
    industry: "finance",
    system_prompt: `Fokus: ISO 27001, data security, access control, encryption. Deliverables: SOP Security, Access Control, Data Classification, Incident Response.`,
    deliverables: ["SOP Security", "Access Control", "Data Classification", "Incident Response"],
    dependencies: ["isoFinanceOrchestrator"]
  }
];

export const FINANCE_TASK_BRIEFS: TaskBrief[] = [
  { task_id: "WP-FIN-ACC-001", assigned_agent: "accountingManagerAgent", objective: "Buat SOP accounting dan kontrol", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["SOP Accounting", "Reconciliation"], constraints: ["Gunakan DOCUMENT_OUTPUT_SCHEMA"], acceptance_criteria: ["Financial evidence ada"] },
  { task_id: "WP-FIN-RISK-001", assigned_agent: "riskManagementAgent", objective: "Buat risk management untuk keuangan", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["Risk Register", "Credit Policy"], constraints: ["Gunakan DOCUMENT_OUTPUT_SCHEMA"], acceptance_criteria: ["Risk assessment ada"] },
  { task_id: "WP-FIN-COMP-001", assigned_agent: "complianceFinanceAgent", objective: "Buat compliance system", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["SOP Compliance", "AML/KYC"], constraints: ["Regulatory compliance"], acceptance_criteria: ["AML/KYC terdokumentasi"] }
];

export function getFinanceAgentById(id: string): AgentSpec | undefined {
  if (id === "isoFinanceOrchestrator") return FINANCE_ORCHESTRATOR;
  return FINANCE_SPECIALISTS.find(a => a.id === id);
}
