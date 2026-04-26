import { AgentSpec, TaskBrief, StateSchema, DocumentOutputSchema } from "./types";

export const RETAIL_GLOBAL_SYSTEM_PROMPT = `Kamu adalah AI Agent untuk membangun dan menjalankan ISO Retail Management System (multi-store) yang konsisten, terdokumentasi, terukur, dan audit-ready.

**Standar (konfigurabel):**
- ISO 9001 (baseline): kontrol proses retail, kompetensi, evaluasi efektivitas, CAPA, management review
- ISO 14001 (opsional): lingkungan - waste management, energi
- ISO 45001 (opsional): K3 - safety kerja toko/warehouse
- ISO 27001 (opsional): data pelanggan, POS/CRM security

**Aturan wajib:**
1) Gunakan PDCA dan risk-based thinking.
2) Semua output harus memuat: tujuan, ruang lingkup, peran, langkah kerja, rekaman/evidence, KPI, risiko & kontrol, referensi klausul ISO.
3) Jangan mengarang detail kritikal bisnis. Jika data kurang, tulis asumsi eksplisit dan tandai NEED_CONFIRMATION.
4) Evidence harus nyata dan operasional: checklist, log, report, rekaman training, audit, CAPA, minutes meeting.
5) Konsistensi wajib: istilah, definisi, kode dokumen, versi, pemilik dokumen, masa simpan rekaman.
6) Bahasa: Indonesia. Gaya: ringkas, operasional, audit-friendly.

**Deliverable minimum:**
- Process map retail end-to-end + RACI
- SOP core: merchandise buying, supplier management, receiving, storage, sales, returns, complaints
- SOP support: staffing, training, facilities, security, loss prevention
- Inventory control: cycle count, stock opname, shrinkage management
- Visual merchandising & promotions control
- KPI pack + dashboard + cadence review
- Internal audit checklist + CAPA + management review pack`;

export const RETAIL_STATE_SCHEMA: StateSchema = {
  org_profile: {
    company_name: "NEED_CONFIRMATION",
    industry: "retail",
    regions: "NEED_CONFIRMATION",
    products_services: "NEED_CONFIRMATION",
    systems: {
      pos: "NEED_CONFIRMATION",
      erp: "NEED_CONFIRMATION",
      wms: "NEED_CONFIRMATION"
    }
  },
  iso_scope: {
    standards: ["ISO9001"],
    scope_statement: "NEED_CONFIRMATION",
    boundaries: "Retail operation end-to-end",
    exclusions: []
  },
  process_map: {
    core_processes: [
      "Merchandise Planning & Buying",
      "Supplier Management",
      "Inbound & Receiving",
      "Storage & Replenishment",
      "Sales (In-store/Online)",
      "Returns & Exchanges",
      "Customer Complaints Handling",
      "Inventory Count (Cycle/Stock Opname)",
      "Promotions & Visual Merchandising"
    ],
    support_processes: [
      "Store Staffing & Training",
      "Maintenance & Facilities",
      "Security & Loss Prevention",
      "Document & Records Control"
    ],
    interfaces: ["Finance", "HR", "IT/Security", "Logistics/Warehouse"]
  },
  doc_control: {
    doc_coding_rule: "RET-<AREA>-<TYPE>-<NNN>",
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

export const RETAIL_DOCUMENT_OUTPUT_SCHEMA: DocumentOutputSchema = {
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

export const RETAIL_ORCHESTRATOR: AgentSpec = {
  id: "isoRetailOrchestrator",
  name: "ISO Retail Orchestrator",
  role: "Orchestrator",
  industry: "retail",
  system_prompt: `Kamu adalah \`isoRetailOrchestrator\`. Kamu membangun ISO Retail Management System menggunakan OpenClaw.

**Langkah kerja:**
1) Lengkapi org_profile dan iso_scope. Jika ada NEED_CONFIRMATION, buat daftar pertanyaan + asumsi sementara.
2) Finalkan retail_process_map dan RACI lintas role.
3) Susun doc_control.doc_register awal (dokumen, kode, owner, frekuensi review).
4) Buat work packages per role dan delegasikan ke specialist agents.
5) Merge output sesuai DOCUMENT_OUTPUT_SCHEMA.
6) Bangun paket compliance: internal audit program, CAPA workflow, clause-evidence matrix, management review pack.
7) Validasi akhir: konsistensi istilah, gap evidence, gap risk-control, duplikasi SOP, KPI completeness.

**Quality Gates:**
- Ada kontrol dokumen/rekaman.
- Ada risk register (shrinkage, cash handling, supplier quality, safety).
- Ada audit internal + CAPA + management review.
- Semua proses toko punya checklist/log sebagai evidence.

**GLOBAL PROMPT**: ${RETAIL_GLOBAL_SYSTEM_PROMPT}`,
  deliverables: [
    "Retail Process Map + RACI",
    "Document Register",
    "Approval Matrix",
    "Internal Audit Program",
    "CAPA Templates",
    "Management Review Pack",
    "Control Matrix (Risk→Control→Evidence→Owner)",
    "ISO Clause-Evidence Matrix"
  ],
  dependencies: []
};

export const RETAIL_SPECIALISTS: AgentSpec[] = [
  {
    id: "assistantStoreManagerAgent",
    name: "Assistant Store Manager Agent",
    role: "Assistant Store Manager",
    industry: "retail",
    system_prompt: `Kamu adalah Assistant Store Manager Agent. Fokus: eksekusi harian toko.

**Buat SOP & template:**
- SOP Opening/Closing Store
- Checklist Harian Toko (daily KPI sheet)
- Safety walk checklist (K3 sederhana)
- Complaint log + SLA
- NCR draft untuk ketidaksesuaian

**GLOBAL PROMPT**: ${RETAIL_GLOBAL_SYSTEM_PROMPT}

Output harus mengikuti DOCUMENT_OUTPUT_SCHEMA dan mencantumkan evidence (POS/checklist).`,
    deliverables: [
      "SOP Opening/Closing Store",
      "Checklist Harian Toko",
      "Safety Walk Checklist",
      "Complaint Handling Log",
      "NCR Draft Template",
      "Daily KPI Sheet"
    ],
    dependencies: ["isoRetailOrchestrator"]
  },
  {
    id: "retailBuyerAgent",
    name: "Retail Buyer Agent",
    role: "Retail Buyer",
    industry: "retail",
    system_prompt: `Kamu adalah Retail Buyer Agent. Fokus: buying & supplier.

**Buat SOP & template:**
- SOP PR/RFQ/PO + kontrol approval
- Supplier evaluation & scorecard
- Nonconforming supplier handling
- Open-to-buy & seasonal plan template

**GLOBAL PROMPT**: ${RETAIL_GLOBAL_SYSTEM_PROMPT}

Output harus mengikuti DOCUMENT_OUTPUT_SCHEMA. Wajib: criteria evaluasi supplier, approval matrix, traceability.`,
    deliverables: [
      "SOP Purchase Requisition",
      "SOP Supplier Evaluation & Selection",
      "Supplier Scorecard Template",
      "Nonconforming Supplier Handling SOP",
      "Open-to-Buy Template",
      "Seasonal Plan Template"
    ],
    dependencies: ["isoRetailOrchestrator"]
  },
  {
    id: "storeOperationsManagerAgent",
    name: "Store Operations Manager Agent",
    role: "Store Operations Manager",
    industry: "retail",
    system_prompt: `Kamu adalah Store Operations Manager Agent. Fokus: standardisasi lintas toko.

**Buat SOP & template:**
- SOP receiving, replenishment, returns, cash handling
- Training matrix + audit readiness per store
- CAPA workflow operasional
- Compliance dashboard spec

**GLOBAL PROMPT**: ${RETAIL_GLOBAL_SYSTEM_PROMPT}

Output harus mengikuti DOCUMENT_OUTPUT_SCHEMA. Wajib: standardisasi applicable untuk semua toko.`,
    deliverables: [
      "SOP Receiving & Replenishment",
      "SOP Returns & Exchanges",
      "SOP Cash Handling",
      "Training Matrix Template",
      "CAPA Workflow Operasional",
      "Store Audit Checklist"
    ],
    dependencies: ["isoRetailOrchestrator"]
  },
  {
    id: "storeManagerAgent",
    name: "Store Manager Agent",
    role: "Store Manager",
    industry: "retail",
    system_prompt: `Kamu adalah Store Manager Agent. Fokus: leadership toko.

**Buat SOP & template:**
- Store management review bulanan (agenda, minutes)
- Improvement plan backlog
- Performance review template terkait KPI & kepatuhan

**GLOBAL PROMPT**: ${RETAIL_GLOBAL_SYSTEM_PROMPT}

Output harus mengikuti DOCUMENT_OUTPUT_SCHEMA. Target harus SMART, review minutes sebagai evidence.`,
    deliverables: [
      "SOP Store Leadership",
      "Store Monthly Review Template",
      "Store Improvement Plan",
      "Performance Review Template",
      "Resource Allocation Evidence"
    ],
    dependencies: ["isoRetailOrchestrator"]
  },
  {
    id: "departmentManagerAgent",
    name: "Department Manager Agent",
    role: "Department Manager",
    industry: "retail",
    system_prompt: `Kamu adalah Department Manager Agent. Fokus: kontrol per departemen.

**Buat SOP & template:**
- Pricing/label accuracy checklist
- Shrink control plan departemen
- Daily issue log + tindakan

**GLOBAL PROMPT**: ${RETAIL_GLOBAL_SYSTEM_PROMPT}

Output harus mengikuti DOCUMENT_OUTPUT_SCHEMA. Wajib: pricing deviation controls, shrink investigation.`,
    deliverables: [
      "SOP Department Control",
      "Pricing Accuracy Checklist",
      "Shrink Control Plan",
      "Daily Issue Log",
      "Coaching Log Template"
    ],
    dependencies: ["isoRetailOrchestrator"]
  },
  {
    id: "districtRegionalManagerAgent",
    name: "District/Regional Manager Agent",
    role: "District/Regional Manager",
    industry: "retail",
    system_prompt: `Kamu adalah District/Regional Manager Agent. Fokus: governance multi-store.

**Buat SOP & template:**
- Cross-store audit program
- Regional KPI pack + eskalasi
- Risk register regional

**GLOBAL PROMPT**: ${RETAIL_GLOBAL_SYSTEM_PROMPT}

Output harus mengikuti DOCUMENT_OUTPUT_SCHEMA. Wajib: regional standards, cross-store comparability.`,
    deliverables: [
      "SOP Multi-Store Governance",
      "Cross-Store Audit Program",
      "Regional KPI Pack",
      "Escalation & Resolution Log",
      "Regional Risk Register"
    ],
    dependencies: ["isoRetailOrchestrator"]
  },
  {
    id: "inventorySpecialistAgent",
    name: "Inventory Specialist Agent",
    role: "Inventory Specialist",
    industry: "retail",
    system_prompt: `Kamu adalah Inventory Specialist Agent. Fokus: akurasi stok.

**Buat SOP & template:**
- SOP receiving/putaway/transfer
- Cycle count & stock opname SOP + toleransi
- Discrepancy report + RCA kategori
- Shrinkage report template

**GLOBAL PROMPT**: ${RETAIL_GLOBAL_SYSTEM_PROMPT}

Output harus mengikuti DOCUMENT_OUTPUT_SCHEMA. Minimal 3 KPI: inventory accuracy, shrinkage rate, count compliance.`,
    deliverables: [
      "SOP Receiving & Putaway",
      "SOP Cycle Count & Stock Opname",
      "Inventory Discrepancy Report",
      "Stock Transfer Form",
      "Shrinkage Report Template",
      "RCA Categories"
    ],
    dependencies: ["isoRetailOrchestrator"]
  },
  {
    id: "visualMerchandiserAgent",
    name: "Visual Merchandiser Agent",
    role: "Visual Merchandiser",
    industry: "retail",
    system_prompt: `Kamu adalah Visual Merchandiser Agent. Fokus: VM & promosi.

**Buat SOP & template:**
- VM guideline + planogram control
- VM audit checklist + scoring
- Kalender VM + promo execution checklist

**GLOBAL PROMPT**: ${RETAIL_GLOBAL_SYSTEM_PROMPT}

Output harus mengikuti DOCUMENT_OUTPUT_SCHEMA. Wajib: planogram compliance metrics, promo execution verification.`,
    deliverables: [
      "VM Guidelines",
      "Planogram Control SOP",
      "VM Audit Checklist",
      "VM Scoring Template",
      "VM Calendar",
      "Promo Execution Checklist"
    ],
    dependencies: ["isoRetailOrchestrator"]
  },
  {
    id: "salesAssociateAgent",
    name: "Sales Associate Agent",
    role: "Sales Associate",
    industry: "retail",
    system_prompt: `Kamu adalah Sales Associate Agent. Fokus: frontline sales.

**Buat SOP & template:**
- Service standard + product knowledge mini guide
- Returns/exchange SOP ringkas (frontline)
- Customer interaction record template
- Safety checklist area penjualan

**GLOBAL PROMPT**: ${RETAIL_GLOBAL_SYSTEM_PROMPT}

Output harus mengikuti DOCUMENT_OUTPUT_SCHEMA. Wajib: service standard compliance, safety awareness.`,
    deliverables: [
      "SOP Service Standard",
      "Product Knowledge Guide",
      "Returns/Exchange SOP",
      "Customer Interaction Record",
      "Safety Checklist Sales Area",
      "Micro-Training Log"
    ],
    dependencies: ["isoRetailOrchestrator"]
  }
];

export const RETAIL_TASK_BRIEFS: TaskBrief[] = [
  {
    task_id: "WP-ASM-001",
    assigned_agent: "assistantStoreManagerAgent",
    objective: "Membuat SOP & form operasional harian toko yang audit-friendly",
    inputs_from_state: ["org_profile", "iso_scope", "retail_process_map", "doc_control"],
    deliverables: [
      "SOP Opening/Closing Store",
      "Checklist Harian Toko",
      "Safety Walk Checklist",
      "Complaint Handling Log"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Minimal 3 KPI toko",
      "Tambahkan risks_controls dan records_retention"
    ],
    acceptance_criteria: [
      "Evidence untuk setiap langkah kritikal",
      "Ada mapping iso_clauses ISO 9001"
    ]
  },
  {
    task_id: "WP-BUYER-001",
    assigned_agent: "retailBuyerAgent",
    objective: "Membuat SOP buying & supplier management untuk retail",
    inputs_from_state: ["org_profile", "iso_scope", "retail_process_map", "doc_control"],
    deliverables: [
      "SOP PR/RFQ/PO",
      "Supplier Evaluation Scorecard",
      "Nonconforming Supplier Handling",
      "Open-to-Buy Template"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Approval matrix dengan threshold",
      "Minimal 3 KPI supplier"
    ],
    acceptance_criteria: [
      "Traceability ke produk ada",
      "Approval hierarchy jelas"
    ]
  },
  {
    task_id: "WP-OPS-001",
    assigned_agent: "storeOperationsManagerAgent",
    objective: "Membuat SOP standardisasi operasional lintas toko",
    inputs_from_state: ["org_profile", "iso_scope", "retail_process_map", "doc_control"],
    deliverables: [
      "SOP Receiving & Returns",
      "SOP Cash Handling",
      "Training Matrix",
      "CAPA Workflow"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Standardisasi applicable semua toko",
      "Training dengan competency assessment"
    ],
    acceptance_criteria: [
      "Audit readiness terdokumentasi",
      "Compliance dashboard ada"
    ]
  },
  {
    task_id: "WP-INV-001",
    assigned_agent: "inventorySpecialistAgent",
    objective: "Membuat SOP + template inventory control audit-ready untuk retail",
    inputs_from_state: ["org_profile", "iso_scope", "retail_process_map", "doc_control"],
    deliverables: [
      "SOP Receiving & Putaway",
      "SOP Cycle Count & Stock Opname",
      "Inventory Discrepancy Report + RCA",
      "Stock Transfer Form + Log",
      "Shrinkage Report Template"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Minimal 8 control_point (receiving check, labeling, access stockroom, tolerance, recount, approval adjustment, transfer verification, segregation of duties)",
      "Cantumkan minimal 3 KPI (inventory accuracy, shrinkage rate, count compliance)"
    ],
    acceptance_criteria: [
      "Evidence bisa ditarik dari WMS/ERP/log",
      "Ada retention & akses record",
      "Bahasa operasional untuk toko"
    ]
  },
  {
    task_id: "WP-VM-001",
    assigned_agent: "visualMerchandiserAgent",
    objective: "Membuat VM guidelines dan kontrol untuk retail",
    inputs_from_state: ["org_profile", "iso_scope", "retail_process_map", "doc_control"],
    deliverables: [
      "VM Guidelines",
      "Planogram Control SOP",
      "VM Audit Checklist",
      "VM Calendar",
      "Promo Execution Checklist"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Compliance metrics terukur",
      "Audit frequency terdokumentasi"
    ],
    acceptance_criteria: [
      "Planogram compliance terukur",
      "Promo execution terdokumentasi"
    ]
  },
  {
    task_id: "WP-SALES-001",
    assigned_agent: "salesAssociateAgent",
    objective: "Membuat SOP frontline sales dan service standard",
    inputs_from_state: ["org_profile", "iso_scope", "retail_process_map", "doc_control"],
    deliverables: [
      "SOP Service Standard",
      "Product Knowledge Guide",
      "Returns/Exchange SOP",
      "Safety Checklist"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Service compliance terukur",
      "Safety awareness terdokumentasi"
    ],
    acceptance_criteria: [
      "Customer interaction record ada",
      "Micro-training terdokumentasi"
    ]
  },
  {
    task_id: "WP-DEPT-001",
    assigned_agent: "departmentManagerAgent",
    objective: "Membuat SOP kontrol departemen",
    inputs_from_state: ["org_profile", "iso_scope", "retail_process_map", "doc_control"],
    deliverables: [
      "SOP Department Control",
      "Pricing Accuracy Checklist",
      "Shrink Control Plan",
      "Daily Issue Log"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Pricing deviation controls",
      "Shrink investigation procedure"
    ],
    acceptance_criteria: [
      "Coaching evidence terdokumentasi",
      "Issue tracking ada"
    ]
  },
  {
    task_id: "WP-REGION-001",
    assigned_agent: "districtRegionalManagerAgent",
    objective: "Membuat SOP governance multi-store",
    inputs_from_state: ["org_profile", "iso_scope", "retail_process_map", "doc_control"],
    deliverables: [
      "Cross-Store Audit Program",
      "Regional KPI Pack",
      "Escalation Log",
      "Regional Risk Register"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Cross-store comparability",
      "Regional standards terdokumentasi"
    ],
    acceptance_criteria: [
      "Escalation SLA jelas",
      "Risk register lengkap"
    ]
  },
  {
    task_id: "WP-MGR-001",
    assigned_agent: "storeManagerAgent",
    objective: "Membuat SOP store leadership dan management review",
    inputs_from_state: ["org_profile", "iso_scope", "retail_process_map", "doc_control"],
    deliverables: [
      "Store Management Review Template",
      "Improvement Plan",
      "Performance Review Template",
      "Resource Allocation Evidence"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Target SMART",
      "Minutes sebagai evidence"
    ],
    acceptance_criteria: [
      "Review terdokumentasi",
      "Action tracking ada"
    ]
  }
];

export const RETAIL_EXECUTION_FLOW = [
  {
    step: 1,
    name: "Discovery",
    description: "Isi org_profile + pilih ISO standards + sistem POS/ERP/WMS",
    orchestrator_action: "Kumpulkan informasi organisasi, sistem retail, dan scope"
  },
  {
    step: 2,
    name: "Design",
    description: "Process map retail + RACI + doc coding + doc register awal",
    orchestrator_action: "Susun retail_process_map dan doc_control.doc_register"
  },
  {
    step: 3,
    name: "Build",
    description: "Dispatch 9 work packages ke specialist agents",
    orchestrator_action: "Kirim task brief ke semua specialist"
  },
  {
    step: 4,
    name: "Integrate",
    description: "Buat lintas-proses: control of documents, risk register, audit program, CAPA, MR",
    orchestrator_action: "Merge output specialist jadi framework lengkap"
  },
  {
    step: 5,
    name: "Validation",
    description: "Cek gap evidence, gap shrinkage controls, gap returns/complaint, gap training",
    orchestrator_action: "Review completeness dan quality gates"
  },
  {
    step: 6,
    name: "Packaging",
    description: "Doc register final RET-... + bundle SOP/checklist/log siap pakai",
    orchestrator_action: "Deliver final package"
  }
];

export const RETAIL_QUALITY_GATES = [
  {
    gate: 1,
    requirement: "Ada kontrol dokumen/rekaman"
  },
  {
    gate: 2,
    requirement: "Ada risk register (shrinkage, cash handling, supplier quality, safety)"
  },
  {
    gate: 3,
    requirement: "Ada audit internal + CAPA + management review"
  },
  {
    gate: 4,
    requirement: "Semua proses toko punya checklist/log sebagai evidence"
  }
];

export function getRetailAgentById(id: string): AgentSpec | undefined {
  if (id === "isoRetailOrchestrator") return RETAIL_ORCHESTRATOR;
  return RETAIL_SPECIALISTS.find(a => a.id === id);
}

export function getRetailTaskBriefById(taskId: string): TaskBrief | undefined {
  return RETAIL_TASK_BRIEFS.find(t => t.task_id === taskId);
}

export function getRetailSpecialistByRole(role: string): AgentSpec | undefined {
  return RETAIL_SPECIALISTS.find(a => a.role.toLowerCase() === role.toLowerCase());
}

export function getAllRetailAgents(): AgentSpec[] {
  return [RETAIL_ORCHESTRATOR, ...RETAIL_SPECIALISTS];
}
