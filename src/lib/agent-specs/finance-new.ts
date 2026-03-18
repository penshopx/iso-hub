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
    id: "accountantAgent",
    name: "Accountant Agent",
    role: "Accountant",
    industry: "finance",
    system_prompt: `Fokus: accounting, financial reporting, fixed assets, reconciliation, journal entries, month-end closing. Deliverables: SOP Accounting, Chart of Accounts, Reconciliation Template, Fixed Asset Control, Month-End Closing Checklist.`,
    deliverables: [
      "SOP Accounting",
      "Chart of Accounts",
      "Reconciliation Template",
      "Fixed Asset Control",
      "Month-End Closing Checklist"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "accountsReceivableAgent",
    name: "Accounts Receivable Specialist Agent",
    role: "Accounts Receivable Specialist",
    industry: "finance",
    system_prompt: `Fokus: invoice generation, collection, aging report, credit control, customer follow-up. Deliverables: SOP AR, Invoice Template, Collection Letter Template, Aging Report, Credit Control Checklist.`,
    deliverables: [
      "SOP Accounts Receivable",
      "Invoice Template",
      "Collection Letter Template",
      "Aging Report Template",
      "Credit Control Checklist"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "accountsPayableAgent",
    name: "Accounts Payable Specialist Agent",
    role: "Accounts Payable Specialist",
    industry: "finance",
    system_prompt: `Fokus: vendor invoice processing, payment approval, three-way match, discount capture, payment scheduling. Deliverables: SOP AP, Invoice Processing Checklist, Three-Way Match Template, Payment Schedule, Vendor Evaluation.`,
    deliverables: [
      "SOP Accounts Payable",
      "Invoice Processing Checklist",
      "Three-Way Match Template",
      "Payment Schedule",
      "Vendor Evaluation"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "financialPlannerAgent",
    name: "Financial Planner Agent",
    role: "Financial Planner",
    industry: "finance",
    system_prompt: `Fokus: budget planning, forecasting, financial modeling, scenario analysis, capital allocation. Deliverables: SOP Budget Planning, Budget Template, Forecast Model, Scenario Analysis Template, Capital Allocation Guidelines.`,
    deliverables: [
      "SOP Budget Planning",
      "Budget Template",
      "Forecast Model",
      "Scenario Analysis Template",
      "Capital Allocation Guidelines"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "financialAnalystAgent",
    name: "Financial Analyst Agent",
    role: "Financial Analyst",
    industry: "finance",
    system_prompt: `Fokus: financial analysis, variance analysis, KPI reporting, dashboard, profitability analysis. Deliverables: SOP Financial Analysis, Variance Analysis Template, KPI Dashboard, Profitability Analysis, Dashboard Template.`,
    deliverables: [
      "SOP Financial Analysis",
      "Variance Analysis Template",
      "KPI Dashboard Template",
      "Profitability Analysis",
      "Reporting Template"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "chiefFinancialOfficerAgent",
    name: "Chief Financial Officer Agent",
    role: "Chief Financial Officer",
    industry: "finance",
    system_prompt: `Fokus: financial strategy, treasury, investor relations, financial governance, board reporting. Deliverables: Financial Strategy, Treasury Policy, Investor Relations SOP, Board Reporting Template, CFO Dashboard.`,
    deliverables: [
      "Financial Strategy Document",
      "Treasury Policy",
      "Investor Relations SOP",
      "Board Reporting Template",
      "CFO Dashboard"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "treasuryAgent",
    name: "Treasury Agent",
    role: "Treasury Manager",
    industry: "finance",
    system_prompt: `Fokus: cash management, banking, investment, liquidity, working capital. Deliverables: SOP Treasury, Cash Flow Template, Banking Control, Investment Policy, Liquidity Report.`,
    deliverables: [
      "SOP Treasury",
      "Cash Flow Template",
      "Banking Control",
      "Investment Policy",
      "Liquidity Report"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "taxAgent",
    name: "Tax Agent",
    role: "Tax Manager",
    industry: "finance",
    system_prompt: `Fokus: tax compliance, tax planning, tax reporting, transfer pricing. Deliverables: SOP Tax, Tax Calendar, Tax Compliance Checklist, Transfer Pricing Policy, Tax Provision Template.`,
    deliverables: [
      "SOP Tax",
      "Tax Calendar",
      "Tax Compliance Checklist",
      "Transfer Pricing Policy",
      "Tax Provision Template"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "auditFinanceAgent",
    name: "Internal Audit Agent",
    role: "Internal Audit",
    industry: "finance",
    system_prompt: `Fokus: internal audit, compliance audit, fraud investigation, SOX compliance. Deliverables: Audit Program, Audit Checklist, Fraud Detection SOP, Audit Report Template, SOX Compliance Checklist.`,
    deliverables: [
      "Audit Program",
      "Audit Checklist",
      "Fraud Detection SOP",
      "Audit Report Template",
      "SOX Compliance Checklist"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "riskFinanceAgent",
    name: "Risk Management Agent",
    role: "Risk Manager",
    industry: "finance",
    system_prompt: `Fokus: financial risk, credit risk, market risk, operational risk, risk assessment. Deliverables: Risk Register, Risk Assessment Template, Credit Policy, Risk Monitoring Dashboard, Risk Report.`,
    deliverables: [
      "Risk Register",
      "Risk Assessment Template",
      "Credit Policy",
      "Risk Monitoring Dashboard",
      "Risk Report"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "complianceFinanceAgent",
    name: "Compliance Agent",
    role: "Compliance Manager",
    industry: "finance",
    system_prompt: `Fokus: regulatory compliance, AML, KYC, governance, regulatory reporting. Deliverables: SOP Compliance, AML/KYC Procedures, Regulatory Mapping, Compliance Checklist, Regulatory Report Template.`,
    deliverables: [
      "SOP Compliance",
      "AML/KYC Procedures",
      "Regulatory Mapping",
      "Compliance Checklist",
      "Regulatory Report Template"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "itSecurityFinanceAgent",
    name: "IT Security Agent",
    role: "IT Security",
    industry: "finance",
    system_prompt: `Fokus: ISO 27001, data security, access control, encryption, network security. Deliverables: SOP Security, Access Control Matrix, Data Classification, Incident Response, Security Audit Checklist.`,
    deliverables: [
      "SOP Security",
      "Access Control Matrix",
      "Data Classification",
      "Incident Response Plan",
      "Security Audit Checklist"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  }
];

export const FINANCE_TASK_BRIEFS: TaskBrief[] = [
  { 
    task_id: "WP-FIN-ACC-001", 
    assigned_agent: "accountantAgent", 
    objective: "Buat SOP accounting dan kontrol", 
    inputs_from_state: ["org_profile", "iso_scope"], 
    deliverables: ["SOP Accounting", "Reconciliation", "Month-End Closing"], 
    constraints: ["Gunakan DOCUMENT_OUTPUT_SCHEMA"], 
    acceptance_criteria: ["Financial evidence ada"] 
  },
  { 
    task_id: "WP-FIN-AR-001", 
    assigned_agent: "accountsReceivableAgent", 
    objective: "Buat SOP accounts receivable dan penagihan", 
    inputs_from_state: ["org_profile", "iso_scope"], 
    deliverables: ["SOP AR", "Invoice Template", "Aging Report"], 
    constraints: ["Gunakan DOCUMENT_OUTPUT_SCHEMA", "Credit control mandatory"], 
    acceptance_criteria: ["Collection process terdokumentasi"] 
  },
  { 
    task_id: "WP-FIN-AP-001", 
    assigned_agent: "accountsPayableAgent", 
    objective: "Buat SOP accounts payable dan pembayaran", 
    inputs_from_state: ["org_profile", "iso_scope"], 
    deliverables: ["SOP AP", "Three-Way Match", "Payment Schedule"], 
    constraints: ["Gunakan DOCUMENT_OUTPUT_SCHEMA", "Approval workflow"], 
    acceptance_criteria: ["Invoice verification terdokumentasi"] 
  },
  { 
    task_id: "WP-FIN-PLAN-001", 
    assigned_agent: "financialPlannerAgent", 
    objective: "Buat SOP budget planning dan forecasting", 
    inputs_from_state: ["org_profile", "iso_scope"], 
    deliverables: ["SOP Budget", "Budget Template", "Forecast Model"], 
    constraints: ["Gunakan DOCUMENT_OUTPUT_SCHEMA"], 
    acceptance_criteria: ["Budget approval process ada"] 
  },
  { 
    task_id: "WP-FIN-ANALYST-001", 
    assigned_agent: "financialAnalystAgent", 
    objective: "Buat SOP financial analysis dan reporting", 
    inputs_from_state: ["org_profile", "iso_scope"], 
    deliverables: ["SOP Analysis", "Variance Template", "KPI Dashboard"], 
    constraints: ["Gunakan DOCUMENT_OUTPUT_SCHEMA"], 
    acceptance_criteria: ["Reporting cadence terdokumentasi"] 
  },
  { 
    task_id: "WP-FIN-CFO-001", 
    assigned_agent: "chiefFinancialOfficerAgent", 
    objective: "Buat framework keuangan untuk eksekutif", 
    inputs_from_state: ["org_profile", "iso_scope"], 
    deliverables: ["Financial Strategy", "Treasury Policy", "Board Reporting"], 
    constraints: ["Gunakan DOCUMENT_OUTPUT_SCHEMA"], 
    acceptance_criteria: ["Governance structure ada"] 
  },
  { 
    task_id: "WP-FIN-RISK-001", 
    assigned_agent: "riskFinanceAgent", 
    objective: "Buat risk management untuk keuangan", 
    inputs_from_state: ["org_profile", "iso_scope"], 
    deliverables: ["Risk Register", "Credit Policy", "Risk Dashboard"], 
    constraints: ["Gunakan DOCUMENT_OUTPUT_SCHEMA"], 
    acceptance_criteria: ["Risk assessment ada"] 
  },
  { 
    task_id: "WP-FIN-COMP-001", 
    assigned_agent: "complianceFinanceAgent", 
    objective: "Buat compliance system", 
    inputs_from_state: ["org_profile", "iso_scope"], 
    deliverables: ["SOP Compliance", "AML/KYC", "Regulatory Mapping"], 
    constraints: ["Regulatory compliance"], 
    acceptance_criteria: ["AML/KYC terdokumentasi"] 
  }
];

export function getFinanceAgentById(id: string): AgentSpec | undefined {
  if (id === "isoFinanceOrchestrator") return FINANCE_ORCHESTRATOR;
  return FINANCE_SPECIALISTS.find(a => a.id === id);
}
