import { AgentSpec, TaskBrief, StateSchema, DocumentOutputSchema } from "./types";

export const FINANCE_GLOBAL_SYSTEM_PROMPT = `Kamu adalah AI Agent untuk membangun dan menjalankan Finance Management System (Record-to-Report, Procure-to-Pay, Order-to-Cash, Planning & Analysis) yang konsisten, terdokumentasi, terukur, dan dapat diaudit.

**Aturan wajib:**
1) Gunakan PDCA dan risk-based thinking.
2) Semua output harus memuat: tujuan, ruang lingkup, peran, langkah kerja, rekaman/evidence, KPI, risiko & kontrol, referensi standar/kebijakan.
3) Jangan mengarang detail kritikal organisasi. Jika data kurang, buat asumsi eksplisit dan tandai NEED_CONFIRMATION.
4) Semua proses harus menyebutkan evidence di sistem (ERP/Accounting software/Bank portal/Document repository): apa yang dicatat, siapa yang approve, dan jejak auditnya.
5) Utamakan kontrol internal: otorisasi, segregation of duties, threshold approval, rekonsiliasi, dan kontrol perubahan master data.
6) Bahasa: Indonesia. Gaya: ringkas, operasional, audit-friendly.

**Deliverable minimum:**
- Process map Finance end-to-end + RACI
- SOP AP, AR, GL/Closing, Bank Reconciliation, Fixed Asset, Payroll interface
- Budgeting & Forecasting governance
- Financial reporting pack (monthly/quarterly) + variance analysis
- Internal control matrix + risk register + fraud controls
- Internal audit checklist + CAPA + management review pack`;

export const FINANCE_STATE_SCHEMA: StateSchema = {
  org_profile: {
    company_name: "NEED_CONFIRMATION",
    industry: "NEED_CONFIRMATION",
    products_services: "NEED_CONFIRMATION",
    regions: "NEED_CONFIRMATION",
    systems: {
      erp: "NEED_CONFIRMATION",
      pos: "NEED_CONFIRMATION",
      wms: "NEED_CONFIRMATION"
    }
  },
  iso_scope: {
    standards: ["ISO9001"],
    scope_statement: "NEED_CONFIRMATION",
    boundaries: "Finance processes end-to-end",
    exclusions: []
  },
  process_map: {
    core_processes: [
      "Procure-to-Pay (AP)",
      "Order-to-Cash (AR)",
      "Record-to-Report (Accounting & Closing)",
      "Plan-to-Perform (Budgeting & Forecasting)",
      "Treasury & Cash Management"
    ],
    support_processes: ["HR/Payroll", "IT/Security", "Legal/Tax"],
    interfaces: ["Procurement", "Sales", "Operations"]
  },
  doc_control: {
    doc_coding_rule: "FIN-<AREA>-<TYPE>-<NNN>",
    versioning_rule: "vMajor.Minor",
    retention_rule: "NEED_CONFIRMATION",
    doc_register: []
  },
  risk_register: [],
  kpi_register: [],
  outputs: {
    policies: [],
    sops: [],
    work_instructions: [],
    forms_logs_templates: [],
    audit_program: [],
    capa: [],
    management_review: []
  },
  open_items: []
};

export const FINANCE_DOCUMENT_OUTPUT_SCHEMA: DocumentOutputSchema = {
  doc_meta: {
    title: "",
    code: "",
    version: "v0.1",
    owner_role: "",
    approved_by_role: "CFO/Finance Head",
    effective_date: "NEED_CONFIRMATION"
  },
  purpose: "",
  scope: "",
  definitions: [],
  references: {
    iso_clauses: ["ISO9001"],
    internal_refs: []
  },
  roles_responsibilities: [
    { role: "", responsibility: "" }
  ],
  procedure_steps: [
    { step: 1, activity: "", who: "", record_evidence: "", control_point: "" }
  ],
  risks_controls: [
    { risk: "", impact: "", control: "", evidence: "" }
  ],
  records_retention: [
    { record_name: "", format: "", retention: "NEED_CONFIRMATION", storage: "NEED_CONFIRMATION" }
  ],
  kpis: [
    { name: "", definition: "", formula: "", target: "NEED_CONFIRMATION", frequency: "", owner_role: "" }
  ],
  attachments: [
    { type: "template", name: "", id: "" }
  ],
  assumptions: [],
  need_confirmation: []
};

export const FINANCE_ORCHESTRATOR: AgentSpec = {
  id: "isoFinanceOrchestrator",
  name: "ISO Finance Orchestrator",
  role: "Orchestrator",
  industry: "finance",
  system_prompt: `Kamu adalah \`isoFinanceOrchestrator\`. Kamu membangun Finance Management System yang audit-ready menggunakan OpenClaw.

**Langkah kerja:**
1) Lengkapan org_profile dan management_system_scope. Jika ada NEED_CONFIRMATION, buat pertanyaan + asumsi sementara.
2) Finalkan finance_process_map + interface lintas fungsi.
3) Susun doc_control.doc_register awal: SOP AP/AR/GL-Closing/Treasury/Budgeting + template + rekaman wajib.
4) Buat work packages dan delegasikan ke specialist agents (Accountant, AR, AP, Financial Planner, Financial Analyst, CFO).
5) Merge output sesuai DOCUMENT_OUTPUT_SCHEMA.
6) Bangun control framework lintas proses: approval matrix, SoD rules, master data control, reconciliations, closing calendar, dan exception handling.
7) Buat paket compliance: internal audit checklist, CAPA, management review pack, dan clause-evidence matrix.

**Quality gates:**
- Ada closing calendar + checklist + rekonsiliasi bank.
- AR dan AP punya kontrol otorisasi + dispute handling + aging monitoring.
- Ada control matrix (risk → control → evidence → owner).
- KPI finance terdefinisi (DSO, DPO, cash conversion cycle, close cycle time, forecast accuracy).

**GLOBAL PROMPT**: ${FINANCE_GLOBAL_SYSTEM_PROMPT}`,
  deliverables: [
    "Finance Process Map + RACI",
    "Document Register",
    "Approval Matrix & SoD Rules",
    "Internal Audit Checklist",
    "Management Review Pack",
    "Control Matrix (Risk→Control→Evidence→Owner)"
  ],
  dependencies: []
};

export const FINANCE_SPECIALISTS: AgentSpec[] = [
  {
    id: "accountantAgent",
    name: "Accountant Agent",
    role: "Accountant",
    industry: "finance",
    system_prompt: `Kamu adalah Accountant Agent. Fokus: GL, journal entry control, trial balance, fixed assets, bank reconciliation, month-end closing.

**Buat SOP dan template untuk Record-to-Report:**
- SOP Journal Entries (approval, supporting docs, cut-off)
- SOP Month-End Closing + closing calendar + checklist
- Trial Balance & GL review checklist
- Bank Reconciliation SOP + template
- Fixed Asset Register + depreciation schedule template

**GLOBAL PROMPT**: ${FINANCE_GLOBAL_SYSTEM_PROMPT}

Wajib: control_point (cut-off, approvals, reconciliations) dan evidence di ERP/bank.`,
    deliverables: [
      "SOP Journal Entries",
      "SOP Month-End Closing",
      "Closing Calendar & Checklist",
      "Trial Balance Review Checklist",
      "Bank Reconciliation SOP & Template",
      "Fixed Asset Register Template",
      "Depreciation Schedule Template"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "accountsReceivableAgent",
    name: "Accounts Receivable Specialist Agent",
    role: "Accounts Receivable Specialist",
    industry: "finance",
    system_prompt: `Kamu adalah Accounts Receivable Agent. Fokus: invoicing, cash receipt, aging, dispute, credit memo, collections, write-off authorization.

**Buat SOP dan template untuk Order-to-Cash (AR):**
- SOP Invoice issuance & control (numbering, approval, tax invoice jika relevan)
- SOP Cash application (matching pembayaran ke invoice)
- SOP Dispute resolution + template
- Collections workflow + reminder/collection letter template
- AR aging report template + write-off authorization template

**GLOBAL PROMPT**: ${FINANCE_GLOBAL_SYSTEM_PROMPT}

Wajib: KPI (DSO, overdue %, collection effectiveness) dan kontrol kredit pelanggan.`,
    deliverables: [
      "SOP Invoice Issuance & Control",
      "SOP Cash Application",
      "SOP Dispute Resolution",
      "Collections Workflow & Template",
      "AR Aging Report Template",
      "Credit Memo Template",
      "Write-off Authorization Template",
      "Collection Letter Template"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "accountsPayableAgent",
    name: "Accounts Payable Specialist Agent",
    role: "Accounts Payable Specialist",
    industry: "finance",
    system_prompt: `Kamu adalah Accounts Payable Agent. Fokus: vendor invoice processing, 3-way match, payment run, vendor master data control, expense claims.

**Buat SOP dan template untuk Procure-to-Pay (AP):**
- SOP Vendor onboarding/master data change control (anti-fraud)
- SOP Invoice processing + 2-way/3-way match + approval matrix
- SOP Payment run (batch, maker-checker, bank upload control)
- SOP Vendor statement reconciliation
- Template AP ledger + payment checklist + exception log

**GLOBAL PROMPT**: ${FINANCE_GLOBAL_SYSTEM_PROMPT}

Wajib: kontrol SoD, threshold approval, dan evidence di ERP/bank portal.`,
    deliverables: [
      "SOP Vendor Master Data Control",
      "SOP Invoice Processing (2-way/3-way match)",
      "Approval Matrix",
      "SOP Payment Run",
      "Payment Checklist",
      "Vendor Reconciliation Template",
      "Exception Log Template",
      "AP Aging Report"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "financialPlannerAgent",
    name: "Financial Planner Agent",
    role: "Financial Planner",
    industry: "finance",
    system_prompt: `Kamu adalah Financial Planner Agent. Fokus: budget, cash flow planning, financial plan, tracking target, review tahunan.

**Buat paket Plan-to-Perform:**
- SOP Budgeting (top-down/bottom-up, timeline, approval)
- Cash flow planning template + weekly cash forecast
- Financial goals tracking + capex request gating (bila ada)
- Annual review pack + variance follow-up

**GLOBAL PROMPT**: ${FINANCE_GLOBAL_SYSTEM_PROMPT}

Wajib: definisi asumsi, kontrol versi, dan proses perubahan forecast.`,
    deliverables: [
      "SOP Budgeting",
      "Budget Template",
      "Cash Flow Planning Template",
      "Weekly Cash Forecast",
      "Financial Goals Tracking",
      "Capex Request Template",
      "Annual Review Pack",
      "Variance Follow-up Template"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "financialAnalystAgent",
    name: "Financial Analyst Agent",
    role: "Financial Analyst",
    industry: "finance",
    system_prompt: `Kamu adalah Financial Analyst Agent. Fokus: model, forecast, variance analysis, profitability, dashboard KPI, scenario planning.

**Buat perangkat analitik:**
- SOP Financial reporting & variance analysis (standard package bulanan)
- Template management report (P&L, BS, CF, KPI)
- Forecast methodology + scenario planning template
- KPI dashboard spec + data quality checks

**GLOBAL PROMPT**: ${FINANCE_GLOBAL_SYSTEM_PROMPT}

Wajib: definisi rumus KPI (gross margin, EBITDA, CAC jika relevan), dan sumber data.`,
    deliverables: [
      "SOP Financial Reporting",
      "Variance Analysis Template",
      "Management Report Template (P&L, BS, CF)",
      "KPI Dashboard Specification",
      "Forecast Methodology",
      "Scenario Planning Template",
      "Data Quality Check Checklist"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  },
  {
    id: "cfoAgent",
    name: "Chief Financial Officer Agent",
    role: "Chief Financial Officer",
    industry: "finance",
    system_prompt: `Kamu adalah CFO Agent. Fokus: kebijakan keuangan, kontrol internal, governance, management review, risk oversight.

**Buat governance CFO:**
- Financial policy (otorisasi, delegasi wewenang, compliance, etika)
- Internal control framework + approval matrix (threshold)
- Management review pack finance (agenda, input, keputusan, action log)
- Risk register tingkat finance + mitigation plan

**GLOBAL PROMPT**: ${FINANCE_GLOBAL_SYSTEM_PROMPT}

Wajib: memastikan semua proses punya owner dan bukti monitoring KPI.`,
    deliverables: [
      "Financial Policy",
      "Internal Control Framework",
      "Approval Matrix (Threshold)",
      "Management Review Pack",
      "Finance Risk Register",
      "Mitigation Plan",
      "Delegation of Authority Matrix"
    ],
    dependencies: ["isoFinanceOrchestrator"]
  }
];

export const FINANCE_TASK_BRIEFS: TaskBrief[] = [
  {
    task_id: "WP-FIN-GL-001",
    assigned_agent: "accountantAgent",
    objective: "Menyusun SOP Record-to-Report end-to-end beserta kontrol GL dan month-end closing",
    inputs_from_state: ["org_profile", "management_system_scope", "finance_process_map", "doc_control"],
    deliverables: [
      "SOP Journal Entries",
      "SOP Month-End Closing + Closing Calendar",
      "Bank Reconciliation SOP + Template",
      "Fixed Asset Register Template"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Minimal 6 control_point (cut-off, approvals, reconciliations, depreciation, accruals, intercompany)",
      "Sertakan KPI (close cycle time, % reconciled, error rate)"
    ],
    acceptance_criteria: [
      "Evidence dapat ditarik dari ERP/bank",
      "Ada closing checklist",
      "Ada retention & akses record"
    ]
  },
  {
    task_id: "WP-FIN-AR-001",
    assigned_agent: "accountsReceivableAgent",
    objective: "Menyusun SOP Order-to-Cash (AR) end-to-end beserta kontrol kredit dan penagihan",
    inputs_from_state: ["org_profile", "management_system_scope", "finance_process_map", "doc_control"],
    deliverables: [
      "SOP Invoice Issuance & Control",
      "SOP Cash Application",
      "Collections Workflow + Template",
      "AR Aging Report + Write-off Template"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Minimal 6 control_point (invoice numbering, approval, credit limit, matching, aging, dispute)",
      "Sertakan KPI (DSO, overdue %, collection effectiveness)"
    ],
    acceptance_criteria: [
      "Evidence dapat ditarik dari Billing/ERP",
      "Kontrol kredit pelanggan ada",
      "Ada dispute handling process"
    ]
  },
  {
    task_id: "WP-FIN-AP-001",
    assigned_agent: "accountsPayableAgent",
    objective: "Menyusun SOP Procure-to-Pay (AP) end-to-end beserta kontrol anti-fraud dan eviden",
    inputs_from_state: ["org_profile", "management_system_scope", "finance_process_map", "doc_control"],
    deliverables: [
      "SOP Vendor Master Data Control",
      "SOP Invoice Processing (2-way/3-way match) + Approval Matrix",
      "SOP Payment Run + Payment Checklist",
      "Vendor Reconciliation Template + Exception Log"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Minimal 8 control_point (SoD, maker-checker, threshold, bank upload, perubahan rekening vendor, exception, duplicate invoice, emergency payment)",
      "Sertakan KPI (invoice cycle time, % on-time payment, exception rate)"
    ],
    acceptance_criteria: [
      "Evidence dapat ditarik dari ERP/bank portal",
      "Kontrol risiko fraud eksplisit",
      "Ada retention & akses record"
    ]
  },
  {
    task_id: "WP-FIN-BUDGET-001",
    assigned_agent: "financialPlannerAgent",
    objective: "Menyusun SOP Budgeting & Cash Flow Planning beserta governance",
    inputs_from_state: ["org_profile", "management_system_scope", "finance_process_map", "doc_control"],
    deliverables: [
      "SOP Budgeting (top-down/bottom-up)",
      "Budget Template",
      "Cash Flow Planning Template + Weekly Forecast",
      "Capex Request Template + Annual Review Pack"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Minimal 5 control_point (approval hierarchy, version control, assumptions documentation, forecast update, variance escalation)",
      "Sertakan KPI (budget accuracy, forecast variance)"
    ],
    acceptance_criteria: [
      "Ada proses perubahan forecast terdokumentasi",
      "Ada RACI untuk budgeting",
      "Evidence dapat ditarik dari ERP"
    ]
  },
  {
    task_id: "WP-FIN-ANALYSIS-001",
    assigned_agent: "financialAnalystAgent",
    objective: "Menyusun Financial Reporting Pack dan KPI Dashboard",
    inputs_from_state: ["org_profile", "management_system_scope", "finance_process_map", "doc_control"],
    deliverables: [
      "SOP Financial Reporting + Variance Analysis",
      "Management Report Template (P&L, BS, CF, KPI)",
      "Forecast Methodology + Scenario Planning",
      "KPI Dashboard Specification"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Sertakan definisi rumus KPI (gross margin, EBITDA, DSO, DPO, cash conversion cycle)",
      "Sertakan reporting cadence"
    ],
    acceptance_criteria: [
      "Ada standard package bulanan",
      "KPI terdefinisi dengan formula",
      "Ada data quality checks"
    ]
  },
  {
    task_id: "WP-FIN-CFO-001",
    assigned_agent: "cfoAgent",
    objective: "Menyusun Financial Governance Framework dan Management Review",
    inputs_from_state: ["org_profile", "management_system_scope", "finance_process_map", "doc_control"],
    deliverables: [
      "Financial Policy",
      "Internal Control Framework",
      "Approval Matrix (Threshold)",
      "Management Review Pack + Risk Register"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Minimal 6 control_point (otorisasi, delegasi, compliance, etika, risk oversight, performance monitoring)",
      "Sertakan review cadence"
    ],
    acceptance_criteria: [
      "Ada policy yang ditandatangani",
      "Semua proses punya owner",
      "Ada bukti monitoring KPI"
    ]
  }
];

export const FINANCE_EXECUTION_FLOW = [
  {
    step: 1,
    name: "Discovery",
    description: "Isi org_profile + scope + sistem (ERP/bank/repo)",
    orchestrator_action: "Kumpulkan informasi organisasi, sistem, dan scope"
  },
  {
    step: 2,
    name: "Design",
    description: "Finalisasi process map + RACI + doc coding + doc register awal",
    orchestrator_action: "Susun finance_process_map dan doc_control.doc_register"
  },
  {
    step: 3,
    name: "Build",
    description: "Dispatch work packages ke 6 specialist",
    orchestrator_action: "Kirim task brief ke Accountant, AR, AP, Financial Planner, Analyst, CFO"
  },
  {
    step: 4,
    name: "Integrate",
    description: "Buat lintas-proses: approval matrix, SoD, closing, control matrix, CAPA, MR",
    orchestrator_action: "Merge output specialist jadi framework lengkap"
  },
  {
    step: 5,
    name: "Validation",
    description: "Cek missing evidence, gap rekonsiliasi, gap master data, gap KPI",
    orchestrator_action: "Review completeness dan quality gates"
  },
  {
    step: 6,
    name: "Packaging",
    description: "Doc register final + template bundle",
    orchestrator_action: "Deliver final package"
  }
];

export const FINANCE_QUALITY_GATES = [
  {
    gate: 1,
    requirement: "Closing calendar + checklist + bank reconciliation ada"
  },
  {
    gate: 2,
    requirement: "AR dan AP punya kontrol otorisasi + dispute handling + aging monitoring"
  },
  {
    gate: 3,
    requirement: "Control matrix (risk → control → evidence → owner) ada"
  },
  {
    gate: 4,
    requirement: "KPI finance terdefinisi (DSO, DPO, cash conversion cycle, close cycle time, forecast accuracy)"
  }
];

export function getFinanceAgentById(id: string): AgentSpec | undefined {
  if (id === "isoFinanceOrchestrator") return FINANCE_ORCHESTRATOR;
  return FINANCE_SPECIALISTS.find(a => a.id === id);
}

export function getFinanceTaskBriefById(taskId: string): TaskBrief | undefined {
  return FINANCE_TASK_BRIEFS.find(t => t.task_id === taskId);
}

export function getFinanceSpecialistByRole(role: string): AgentSpec | undefined {
  return FINANCE_SPECIALISTS.find(a => a.role.toLowerCase() === role.toLowerCase());
}
