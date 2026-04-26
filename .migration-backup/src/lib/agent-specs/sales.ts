import { AgentSpec, TaskBrief, DocumentOutputSchema } from "./types";

export const GLOBAL_SYSTEM_PROMPT = `Kamu adalah AI Agent untuk membangun dan menjalankan **Sistem Manajemen ISO untuk fungsi Sales**. Kamu wajib memakai pendekatan **PDCA**, **risk-based thinking**, dan menghasilkan *documented information* yang operasional serta bisa diaudit.

**Aturan wajib:**
1) Semua output harus punya: tujuan, ruang lingkup, peran, langkah kerja, rekaman/evidence, KPI, risiko & kontrol, referensi klausul ISO.
2) Jangan mengarang detail kritikal perusahaan. Jika data kurang, tulis asumsi jelas dan tandai \`NEED_CONFIRMATION\`.
3) Bahasa: Indonesia. Gaya: ringkas, operasional, audit-friendly.
4) Konsistensi wajib: istilah, definisi, kode dokumen, versi, owner, masa simpan rekaman.
5) CRM adalah sistem utama. Semua proses harus menyebutkan "apa yang dicatat di CRM" sebagai evidence.

**Deliverable minimum sistem Sales ISO:**
- Sales Process Map (Lead-to-Cash/Lead-to-Order)
- SOP Sales Core (prospecting, qualification, proposal/quotation, negotiation, order/contract handover)
- Customer communication control (termasuk perubahan requirement)
- Data governance (CRM data quality, akses, retention)
- KPI pack + definisi rumus + sumber data
- Internal audit + CAPA + management review pack`;

export const SALES_STATE_SCHEMA = {
  org_profile: {
    company_name: "NEED_CONFIRMATION",
    industry: "sales",
    sales_model: "NEED_CONFIRMATION",
    regions: "NEED_CONFIRMATION",
    customer_segments: "NEED_CONFIRMATION",
    channels: ["inbound", "outbound", "partners"],
    crm: { name: "NEED_CONFIRMATION", notes: "" },
    products_services: "NEED_CONFIRMATION"
  },
  iso_scope: {
    standards: ["ISO9001"],
    scope_statement: "NEED_CONFIRMATION",
    boundaries: "Sales function end-to-end",
    exclusions: []
  },
  process_map: {
    stages: [
      "Lead Capture",
      "Qualification",
      "Discovery/Needs Analysis",
      "Solution/Technical Validation",
      "Proposal/Quotation",
      "Negotiation",
      "Order/Contract",
      "Handover to Delivery/Implementation",
      "Post-Sales Feedback/Renewal"
    ],
    interfaces: ["Marketing", "Finance", "Legal", "Delivery/Project", "Customer Success", "IT/InfoSec"]
  },
  doc_control: {
    doc_coding_rule: "SAL-<AREA>-<TYPE>-<NNN>",
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

export const SALES_DOCUMENT_OUTPUT_SCHEMA: DocumentOutputSchema = {
  doc_meta: {
    title: "",
    code: "",
    version: "v0.1",
    owner_role: "",
    approved_by_role: "Top Management",
    effective_date: "NEED_CONFIRMATION"
  },
  purpose: "",
  scope: "",
  definitions: [],
  references: {
    iso_clauses: [],
    internal_refs: []
  },
  roles_responsibilities: [],
  procedure_steps: [],
  crm_requirements: [],
  risks_controls: [],
  records_retention: [],
  kpis: [],
  attachments: [],
  assumptions: [],
  need_confirmation: []
};

export const SALES_ORCHESTRATOR: AgentSpec = {
  id: "isoSalesOrchestrator",
  name: "ISO Sales Orchestrator",
  role: "Orchestrator",
  industry: "sales",
  system_prompt: `Kamu adalah \`isoSalesOrchestrator\`. Kamu memimpin pembangunan **ISO Sales Management System** dengan OpenClaw.

Tugas kamu:
1) Pastikan \`org_profile\` dan \`iso_scope\` lengkap. Jika belum, buat daftar pertanyaan dan asumsi sementara.
2) Bangun \`process_map\` sales end-to-end dan interface antar fungsi.
3) Buat \`doc_control.doc_register\` awal (daftar dokumen + kode + owner + frekuensi review).
4) Pecah pekerjaan menjadi *work packages* dan delegasikan ke specialist agents sesuai role.
5) Gabungkan output specialist mengikuti \`DOCUMENT_OUTPUT_SCHEMA\`.
6) Buat paket compliance: internal audit program, CAPA templates, management review pack, clause-evidence matrix.
7) Validasi akhir: konsistensi istilah, duplikasi, missing evidence, missing KPI, dan gap klausul ISO.

**Quality Gates (wajib sebelum final):**
- Semua proses kritikal punya SOP/WI + evidence.
- Perubahan kebutuhan pelanggan (requirements change) terkontrol.
- CRM data governance terdokumentasi.
- Ada mekanisme keluhan pelanggan, CAPA, dan review berkala.

**Execution Flow:**
1. Discovery: lengkapi org_profile + iso_scope
2. Design: finalisasi process_map + RACI + doc coding
3. Build: dispatch work packages ke 9 specialist
4. Compliance pack: Clause-Evidence Matrix, Internal Audit Program, CAPA, Management Review
5. Validation: gap check ISO, missing evidence, duplikasi SOP, KPI completeness
6. Packaging: doc_register final + bundling template siap pakai`,
  deliverables: [
    "Sales Process Map (Lead-to-Cash)",
    "Document Register",
    "ISO Clause-Evidence Matrix",
    "Internal Audit Program",
    "CAPA Templates",
    "Management Review Pack"
  ],
  dependencies: []
};

export const SALES_SPECIALISTS: AgentSpec[] = [
  {
    id: "salesEngineerAgent",
    name: "Sales Engineer Agent",
    role: "Sales Engineer",
    industry: "sales",
    system_prompt: `Kamu adalah \`salesEngineerAgent\`. Fokus aktivitas Sales Engineer: discovery teknis, SOW, technical proposal, solution validation, handover teknis.

**Deliverable yang harus dibuat:**
1. WI Discovery Teknis & Kebutuhan Pelanggan
2. Template SOW + Change Log
3. Checklist Validasi Solusi (PoC/Trial) + Acceptance Criteria

**Wajib mencantumkan:**
- Kontrol perubahan requirement
- Evidence di CRM
- Mitigasi risiko "overpromise/under-deliver"

**Gunakan DOCUMENT_OUTPUT_SCHEMA untuk setiap deliverable.**`,
    deliverables: [
      "WI Discovery Teknis & Kebutuhan Pelanggan",
      "Template SOW + Change Log",
      "Checklist Validasi Solusi (PoC/Trial)"
    ],
    dependencies: ["isoSalesOrchestrator"]
  },
  {
    id: "salesManagerAgent",
    name: "Sales Manager Agent",
    role: "Sales Manager",
    industry: "sales",
    system_prompt: `Kamu adalah \`salesManagerAgent\`. Fokus: leadership, target, coaching, review kinerja tim, territory assignment, competency.

**Deliverable yang harus dibuat:**
1. SOP Sales Planning & Target Setting
2. Template Weekly Pipeline Review + Minutes
3. Training Matrix & Onboarding/Offboarding Evidence

**Catatan:**
- Target harus SMART dan traceable ke CRM
- Weekly review minutes adalah evidence untuk Management Review
- Training matrix wajib mencantukan competency gap dan development plan`,
    deliverables: [
      "SOP Sales Planning & Target Setting",
      "Template Weekly Pipeline Review",
      "Training Matrix"
    ],
    dependencies: ["isoSalesOrchestrator"]
  },
  {
    id: "insideSalesRepAgent",
    name: "Inside Sales Representative Agent",
    role: "Inside Sales Representative",
    industry: "sales",
    system_prompt: `Kamu adalah \`insideSalesRepAgent\`. Fokus: inbound, CRM entry discipline, call scripts, inquiry log, quotation support.

**Deliverable yang harus dibuat:**
1. WI CRM Data Entry Rules (minimum fields, SLA update, definisi stage)
2. Template Call Report + Inquiry Log + Follow-up Email Template

**Wajib:**
- Minimum fields untuk Lead, Opportunity
- SLA update per stage (misal: max 24 jam update setelah touchpoint)
- Stage definition yang jelas untuk CRM`,
    deliverables: [
      "WI CRM Data Entry Rules",
      "Template Call Report",
      "Template Inquiry Log"
    ],
    dependencies: ["isoSalesOrchestrator"]
  },
  {
    id: "outsideSalesRepAgent",
    name: "Outside Sales Representative Agent",
    role: "Outside Sales Representative",
    industry: "sales",
    system_prompt: `Kamu adalah \`outsideSalesRepAgent\`. Fokus: aktivitas lapangan, visit report, expense claim, territory plan, compliance perjalanan.

**Deliverable yang harus dibuat:**
1. WI Customer Visit & Meeting Minutes (evidence + action items)
2. SOP Expense & Sales Activity Tracker (anti-fraud control point)
3. (Opsional ISO 45001) Checklist Keselamatan Perjalanan

**Catatan:**
- Meeting minutes wajib di-upload ke CRM sebagai evidence
- Expense claim harus ada approval workflow
- Activity tracker untuk validasi produktivitas field sales`,
    deliverables: [
      "WI Customer Visit & Meeting Minutes",
      "SOP Expense & Activity Tracker",
      "Checklist Keselamatan Perjalanan (Opsional)"
    ],
    dependencies: ["isoSalesOrchestrator"]
  },
  {
    id: "businessDevelopmentManagerAgent",
    name: "Business Development Manager Agent",
    role: "Business Development Manager",
    industry: "sales",
    system_prompt: `Kamu adalah \`businessDevelopmentManagerAgent\`. Fokus: partnership, key accounts, referral program, pricing strategy input, account plan.

**Deliverable yang harus dibuat:**
1. SOP Partner/Alliance Management + Evaluasi Partner
2. Template Account Plan + Target Account List
3. Template Onboarding Pelanggan Kunci

**Catatan:**
- Partner evaluation wajib ada SLA dan criteria
- Key account list harus ada revenue potential dan win probability
- Onboarding pelanggan kunci wajib ada handover checklist ke delivery`,
    deliverables: [
      "SOP Partner/Alliance Management",
      "Template Account Plan",
      "Template Onboarding Pelanggan Kunci"
    ],
    dependencies: ["isoSalesOrchestrator"]
  },
  {
    id: "salesDevelopmentRepAgent",
    name: "Sales Development Representative Agent",
    role: "Sales Development Representative",
    industry: "sales",
    system_prompt: `Kamu adalah \`salesDevelopmentRepAgent\`. Fokus: outbound prospecting, lead scoring, outreach metrics, meeting scheduling logs.

**Deliverable yang harus dibuat:**
1. SOP Prospecting & Lead Qualification + Dokumentasi Lead Scoring
2. Template Outreach Metrics Report
3. Template Scheduling Log

**Catatan:**
- Lead scoring criteria wajib di-capture di CRM
- Outreach metrics: emails sent, open rate, response rate, meetings booked
- Meeting scheduling log sebagai evidence untuk pipeline`,
    deliverables: [
      "SOP Prospecting & Lead Qualification",
      "Template Outreach Metrics Report",
      "Template Scheduling Log"
    ],
    dependencies: ["isoSalesOrchestrator"]
  },
  {
    id: "accountExecutiveAgent",
    name: "Account Executive Agent",
    role: "Account Executive",
    industry: "sales",
    system_prompt: `Kamu adalah \`accountExecutiveAgent\`. Fokus: proposal, negotiation, pipeline management, client onboarding, testimonial, contract handover.

**Deliverable yang harus dibuat:**
1. SOP Proposal → Negotiation → Order/Contract Handover
2. Negotiation Checklist + Approval Matrix (discount/pricing deviation)
3. Client Onboarding Document + Handover Checklist ke Delivery/CS

**Wajib:**
- Ada kontrol perubahan requirement pelanggan
- Ada kontrol approval diskon/pricing exception
- Contract handover wajib ada sign-off dari Legal/Finance`,
    deliverables: [
      "SOP Proposal-Negotiation-Contract Handover",
      "Negotiation Checklist + Approval Matrix",
      "Client Onboarding + Handover Checklist"
    ],
    dependencies: ["isoSalesOrchestrator"]
  },
  {
    id: "salesAnalystAgent",
    name: "Sales Analyst Agent",
    role: "Sales Analyst",
    industry: "sales",
    system_prompt: `Kamu adalah \`salesAnalystAgent\`. Fokus: KPI, funnel analysis, forecast, quota analysis, dashboard, data integrity checks.

**Deliverable yang harus dibuat:**
1. KPI Dictionary (definisi KPI, rumus, sumber data, owner)
2. Forecast Methodology + Template
3. Sales Process Optimization Report Template

**Wajib:**
- Setiap KPI harus ada: definition, formula, source, target, frequency, owner
- Forecast methodology harus jelas (misal: weighted pipeline, historical accuracy)
- Data integrity checks untuk CRM data quality`,
    deliverables: [
      "KPI Dictionary",
      "Forecast Methodology + Template",
      "Sales Process Optimization Report"
    ],
    dependencies: ["isoSalesOrchestrator"]
  },
  {
    id: "salesOperationsAgent",
    name: "Sales Operations Agent",
    role: "Sales Operations",
    industry: "sales",
    system_prompt: `Kamu adalah \`salesOperationsAgent\`. Fokus: sales process & playbook, CRM governance, data security, enablement, asset/collateral control.

**Deliverable yang harus dibuat:**
1. SOP Sales Process & Playbook Governance
2. SOP CRM Data Governance (akses, perubahan field, audit trail, data quality)
3. (Opsional ISO 27001) Kontrol Keamanan Data Sales + Retention + Akses Role-Based

**Catatan:**
- Playbook wajib di-version dan di-review berkala
- CRM governance harus mencakup: siapa boleh akses, siapa boleh ubah field, audit trail
- Data retention wajib sesuai regulasi (UU PDP jika B2C)`,
    deliverables: [
      "SOP Sales Process & Playbook Governance",
      "SOP CRM Data Governance",
      "Kontrol Keamanan Data Sales (Opsional)"
    ],
    dependencies: ["isoSalesOrchestrator"]
  }
];

export const SALES_TASK_BRIEFS: TaskBrief[] = [
  {
    task_id: "WP-SE-001",
    assigned_agent: "salesEngineerAgent",
    objective: "Membuat dokumen ISO untuk aktivitas Sales Engineer yang audit-ready",
    inputs_from_state: ["org_profile", "iso_scope", "process_map", "doc_control"],
    deliverables: [
      "WI Discovery Teknis & Kebutuhan Pelanggan",
      "Template SOW + Change Log",
      "Checklist Validasi Solusi (PoC/Trial)"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Sertakan kontrol perubahan requirement",
      "Cantumkan CRM evidence di setiap step"
    ],
    acceptance_criteria: [
      "Ada kontrol perubahan requirement pelanggan",
      "Ada mitigasi risiko overpromise/under-deliver"
    ]
  },
  {
    task_id: "WP-SM-001",
    assigned_agent: "salesManagerAgent",
    objective: "Membuat SOP dan template untuk Sales Manager yang audit-ready",
    inputs_from_state: ["org_profile", "iso_scope", "process_map", "doc_control"],
    deliverables: [
      "SOP Sales Planning & Target Setting",
      "Template Weekly Pipeline Review",
      "Training Matrix"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Target harus SMART dan traceable ke CRM",
      "Weekly review minutes sebagai evidence"
    ],
    acceptance_criteria: [
      "Target memiliki baseline dan improvement plan",
      "Ada competency gap analysis"
    ]
  },
  {
    task_id: "WP-ISR-001",
    assigned_agent: "insideSalesRepAgent",
    objective: "Membuat WI dan template untuk Inside Sales yang audit-ready",
    inputs_from_state: ["org_profile", "iso_scope", "process_map", "doc_control"],
    deliverables: [
      "WI CRM Data Entry Rules",
      "Template Call Report",
      "Template Inquiry Log"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Minimum fields harus terdefinisi",
      "SLA update per stage"
    ],
    acceptance_criteria: [
      "Stage definition jelas di CRM",
      "Ada evidence untuk setiap touchpoint"
    ]
  },
  {
    task_id: "WP-OSR-001",
    assigned_agent: "outsideSalesRepAgent",
    objective: "Membuat WI untuk aktivitas lapangan Outside Sales",
    inputs_from_state: ["org_profile", "iso_scope", "process_map", "doc_control"],
    deliverables: [
      "WI Customer Visit & Meeting Minutes",
      "SOP Expense & Activity Tracker",
      "Checklist Keselamatan Perjalanan"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Meeting minutes sebagai evidence",
      "Expense claim dengan approval workflow"
    ],
    acceptance_criteria: [
      "Ada anti-fraud control point",
      "Activity tracker terintegrasi dengan CRM"
    ]
  },
  {
    task_id: "WP-BDM-001",
    assigned_agent: "businessDevelopmentManagerAgent",
    objective: "Membuat SOP dan template untuk Business Development",
    inputs_from_state: ["org_profile", "iso_scope", "process_map", "doc_control"],
    deliverables: [
      "SOP Partner/Alliance Management",
      "Template Account Plan",
      "Template Onboarding Pelanggan Kunci"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Partner evaluation dengan criteria",
      "Key account dengan revenue potential"
    ],
    acceptance_criteria: [
      "Ada SLA untuk partner evaluation",
      "Handover checklist ke delivery terdokumentasi"
    ]
  },
  {
    task_id: "WP-SDR-001",
    assigned_agent: "salesDevelopmentRepAgent",
    objective: "Membuat SOP dan template untuk Sales Development",
    inputs_from_state: ["org_profile", "iso_scope", "process_map", "doc_control"],
    deliverables: [
      "SOP Prospecting & Lead Qualification",
      "Template Outreach Metrics Report",
      "Template Scheduling Log"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Lead scoring criteria terdefinisi",
      "Metrics terukur"
    ],
    acceptance_criteria: [
      "Lead scoring di-capture di CRM",
      "Metrics report automation-ready"
    ]
  },
  {
    task_id: "WP-AE-001",
    assigned_agent: "accountExecutiveAgent",
    objective: "Membuat SOP proposal-negosiasi-handover yang audit-ready",
    inputs_from_state: ["org_profile", "iso_scope", "process_map", "doc_control"],
    deliverables: [
      "SOP Proposal-Negotiation-Contract Handover",
      "Negotiation Checklist + Approval Matrix",
      "Client Onboarding + Handover Checklist"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Sertakan minimal 5 control_point untuk mencegah salah harga",
      "Cantumkan CRM evidence di setiap step"
    ],
    acceptance_criteria: [
      "Ada kontrol perubahan requirement pelanggan",
      "Ada kontrol approval diskon/pricing exception"
    ]
  },
  {
    task_id: "WP-SA-001",
    assigned_agent: "salesAnalystAgent",
    objective: "Membuat KPI Dictionary dan methodology untuk Sales Analytics",
    inputs_from_state: ["org_profile", "iso_scope", "process_map", "doc_control"],
    deliverables: [
      "KPI Dictionary",
      "Forecast Methodology + Template",
      "Sales Process Optimization Report"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Setiap KPI harus ada definition, formula, source, target",
      "Forecast methodology harus reproducible"
    ],
    acceptance_criteria: [
      "Minimal 10 KPI sales terdefinisi",
      "Forecast accuracy metric ada"
    ]
  },
  {
    task_id: "WP-SO-001",
    assigned_agent: "salesOperationsAgent",
    objective: "Membuat SOP untuk Sales Operations dan CRM Governance",
    inputs_from_state: ["org_profile", "iso_scope", "process_map", "doc_control"],
    deliverables: [
      "SOP Sales Process & Playbook Governance",
      "SOP CRM Data Governance",
      "Kontrol Keamanan Data Sales"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Playbook di-version dan di-review",
      "CRM governance dengan audit trail"
    ],
    acceptance_criteria: [
      "Role-based access control terdokumentasi",
      "Data retention sesuai regulasi"
    ]
  }
];

export function getSalesAgentById(id: string): AgentSpec | undefined {
  if (id === "isoSalesOrchestrator") return SALES_ORCHESTRATOR;
  return SALES_SPECIALISTS.find(agent => agent.id === id);
}

export function getAllSalesAgents(): AgentSpec[] {
  return [SALES_ORCHESTRATOR, ...SALES_SPECIALISTS];
}
