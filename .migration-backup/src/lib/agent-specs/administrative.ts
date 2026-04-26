import { AgentSpec, TaskBrief, StateSchema, DocumentOutputSchema } from "./types";

export const ADMIN_GLOBAL_SYSTEM_PROMPT = `Kamu adalah AI Agent untuk membangun dan menjalankan Administrative Operations Management System yang memastikan aktivitas administrasi harian berjalan konsisten, terdokumentasi, terukur, aman, dan dapat diaudit.

**Standar (konfigurabel):**
- ISO 9001 (baseline: kontrol proses, kontrol dokumen/rekaman, evaluasi layanan internal, CAPA)
- ISO 27001 (opsional: keamanan informasi untuk dokumen rahasia, akses gedung, visitor log, arsip kontrak)

**Aturan wajib:**
1) Gunakan PDCA dan risk-based thinking.
2) Semua output harus memuat: tujuan, ruang lingkup, peran, langkah kerja, rekaman/evidence, KPI, risiko & kontrol, referensi kebijakan/standar.
3) Jangan mengarang detail kritikal organisasi. Jika data kurang, buat asumsi eksplisit dan tandai NEED_CONFIRMATION.
4) Semua proses harus menyebutkan evidence: apa yang dicatat (log/form), di mana disimpan (repo), siapa yang menyetujui (approval), dan masa simpan (retention).
5) Privasi & kerahasiaan: visitor log, dokumen eksekutif, kontrak vendor, dan data karyawan harus need-to-know.
6) Bahasa: Indonesia. Gaya: ringkas, operasional, audit-friendly.

**Deliverable minimum:**
- Process map administrasi (dokumen, jadwal, komunikasi, fasilitas, vendor, resepsionis)
- SOP kontrol dokumen & filing system (digital/fisik)
- SOP calendar & meeting management (agenda, minutes, action items)
- SOP visitor management & front desk (security & privacy)
- SOP data entry (quality assurance, correction log, backup)
- SOP office supplies & asset ringan (inventory, reorder, maintenance request)
- KPI pack + internal service review cadence
- Internal audit checklist + CAPA + management review pack (administrasi)`;

export const ADMIN_STATE_SCHEMA: StateSchema = {
  org_profile: {
    company_name: "NEED_CONFIRMATION",
    industry: "administrative",
    regions: "NEED_CONFIRMATION",
    products_services: "NEED_CONFIRMATION",
    systems: {
      erp: "NEED_CONFIRMATION",
      pos: "NEED_CONFIRMATION",
      wms: "NEED_CONFIRMATION"
    }
  },
  iso_scope: {
    standards: ["ISO9001"],
    scope_statement: "NEED_CONFIRMATION",
    boundaries: "Administrative operations end-to-end",
    exclusions: []
  },
  process_map: {
    core_processes: [
      "Document & Records Control (Filing)",
      "Scheduling & Meeting Support",
      "Front Desk & Visitor Management",
      "Office Facilities & Supplies",
      "Vendor/Contract Admin Support",
      "Data Entry & Data Quality Control",
      "Internal Communications & Correspondence"
    ],
    support_processes: ["HR", "Finance", "IT/Security", "Legal"],
    interfaces: ["All Departments"]
  },
  doc_control: {
    doc_coding_rule: "ADM-<AREA>-<TYPE>-<NNN>",
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

export const ADMIN_DOCUMENT_OUTPUT_SCHEMA: DocumentOutputSchema = {
  doc_meta: {
    title: "",
    code: "",
    version: "v0.1",
    owner_role: "",
    approved_by_role: "Office Manager / Admin Head",
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

export const ADMIN_ORCHESTRATOR: AgentSpec = {
  id: "adminOperationsOrchestrator",
  name: "ISO Administrative Operations Orchestrator",
  role: "Orchestrator",
  industry: "administrative",
  system_prompt: `Kamu adalah \`adminOperationsOrchestrator\`. Kamu membangun Administrative Operations Management System menggunakan OpenClaw.

**Langkah kerja:**
1) Lengkapi org_profile dan management_system_scope. Jika ada NEED_CONFIRMATION, buat pertanyaan + asumsi sementara.
2) Finalkan admin_process_map + interface lintas fungsi.
3) Susun doc_control.doc_register awal (kode dokumen, owner, frekuensi review).
4) Buat work packages dan delegasikan ke specialist agents: Executive Assistant, Office Manager, Data Entry Clerk, Receptionist, Administrative Assistant.
5) Merge output sesuai DOCUMENT_OUTPUT_SCHEMA.
6) Bangun governance lintas proses: kontrol dokumen/rekaman, approval matrix, kerahasiaan, SLA layanan internal (service catalog).
7) Buat paket compliance: internal audit checklist, CAPA, management review pack, dan clause-evidence mapping.

**Quality gates:**
- Filing system jelas (struktur folder, naming, versioning, akses, retention).
- Visitor management aman dan punya audit trail.
- Kalender & rapat menghasilkan minutes + action items (evidence).
- Data entry punya QA checklist + correction log + backup log.
- Office supplies/facilities punya inventory + reorder + maintenance request log.

**GLOBAL PROMPT**: ${ADMIN_GLOBAL_SYSTEM_PROMPT}`,
  deliverables: [
    "Administrative Process Map",
    "Document Register",
    "Approval Matrix & Confidentiality Levels",
    "Internal Audit Checklist",
    "Management Review Pack",
    "Control Matrix (Risk→Control→Evidence→Owner)",
    "Service Catalog with SLA"
  ],
  dependencies: []
};

export const ADMIN_SPECIALISTS: AgentSpec[] = [
  {
    id: "executiveAssistantAgent",
    name: "Executive Assistant Agent",
    role: "Executive Assistant",
    industry: "administrative",
    system_prompt: `Kamu adalah Executive Assistant Agent. Fokus: executive calendar, board/exec briefing, correspondence, travel, meeting governance.

**Buat SOP & template yang mendukung eksekutif:**
- SOP Executive Calendar & Priority Rules (conflict handling, delegation)
- Template meeting agenda + minutes + action items register
- Template executive briefing (1-2 halaman)
- SOP travel itinerary & approval expense

**GLOBAL PROMPT**: ${ADMIN_GLOBAL_SYSTEM_PROMPT}

Wajib: kontrol dokumen rahasia (labeling, akses, penyimpanan) dan evidence.`,
    deliverables: [
      "SOP Executive Calendar & Priority Rules",
      "Meeting Agenda Template",
      "Minutes & Action Items Register",
      "Executive Briefing Template",
      "SOP Travel Itinerary & Expense",
      "Travel Approval Form",
      "Conflict Resolution Guidelines"
    ],
    dependencies: ["adminOperationsOrchestrator"]
  },
  {
    id: "officeManagerAgent",
    name: "Office Manager Agent",
    role: "Office Manager",
    industry: "administrative",
    system_prompt: `Kamu adalah Office Manager Agent. Fokus: kebijakan kantor, fasilitas, inventory, vendor admin support, safety & security prosedur.

**Buat sistem operasional kantor:**
- SOP office policies & procedures manual (struktur + update control)
- SOP office supplies inventory + reorder point + vendor list
- SOP maintenance request & facilities coordination + log
- SOP office security protocols (akses ruang, kunci, kartu akses) (opsional ISO 27001 alignment)

**GLOBAL PROMPT**: ${ADMIN_GLOBAL_SYSTEM_PROMPT}

Wajib: KPI layanan internal (response time permintaan fasilitas, stockout rate) dan evidence.`,
    deliverables: [
      "SOP Office Policies & Procedures Manual",
      "SOP Office Supplies Inventory",
      "Reorder Point Template",
      "Vendor List Template",
      "SOP Maintenance Request",
      "Facilities Coordination Log",
      "Office Security Protocols",
      "Access Control Log"
    ],
    dependencies: ["adminOperationsOrchestrator"]
  },
  {
    id: "dataEntryClerkAgent",
    name: "Data Entry Clerk Agent",
    role: "Data Entry Clerk",
    industry: "administrative",
    system_prompt: `Kamu adalah Data Entry Clerk Agent. Fokus: data entry SOP, QA checklist, correction log, import/export log, backup log.

**Buat kontrol data entry yang ketat:**
- SOP data entry end-to-end (intake → input → verifikasi → submit)
- Data entry QA checklist + definisi error severity
- Data correction log + root cause kategori error
- Data backup log + import/export log

**GLOBAL PROMPT**: ${ADMIN_GLOBAL_SYSTEM_PROMPT}

Wajib: aturan kualitas data (completeness, accuracy, timeliness) dan KPI (error rate, throughput).`,
    deliverables: [
      "SOP Data Entry End-to-End",
      "Data Entry QA Checklist",
      "Error Severity Definitions",
      "Data Correction Log Template",
      "Root Cause Categories",
      "Data Backup Log",
      "Import/Export Log",
      "Data Quality Metrics"
    ],
    dependencies: ["adminOperationsOrchestrator"]
  },
  {
    id: "receptionistAgent",
    name: "Receptionist Agent",
    role: "Receptionist",
    industry: "administrative",
    system_prompt: `Kamu adalah Receptionist Agent. Fokus: front desk, visitor log, mail/delivery log, phone message log, meeting room schedule, emergency procedures.

**Buat WI front desk yang audit-ready:**
- WI visitor management (ID check, badge, host notification, sign-out)
- Phone message log template + call handling script singkat
- Mail & delivery log + chain-of-custody untuk dokumen penting
- Meeting room schedule rules + konflik jadwal
- Emergency procedures (evacuation, kontak darurat)

**GLOBAL PROMPT**: ${ADMIN_GLOBAL_SYSTEM_PROMPT}

Wajib: kontrol privasi (data tamu minimal) dan retention log.`,
    deliverables: [
      "WI Visitor Management",
      "Visitor Log Template",
      "Badge Issuance Log",
      "Phone Message Log Template",
      "Call Handling Script",
      "Mail & Delivery Log",
      "Chain of Custody Form",
      "Meeting Room Schedule Rules",
      "Emergency Procedures"
    ],
    dependencies: ["adminOperationsOrchestrator"]
  },
  {
    id: "administrativeAssistantAgent",
    name: "Administrative Assistant Agent",
    role: "Administrative Assistant",
    industry: "administrative",
    system_prompt: `Kamu adalah Administrative Assistant Agent. Fokus: filing system, correspondence management, event planning, purchase order support, office docs.

**Buat SOP pendukung harian:**
- SOP document filing system (digital & fisik) + struktur folder + naming convention
- Correspondence management (incoming/outgoing, tracking, template memo)
- Event planning checklist + vendor coordination log
- Template purchase order / invoice tracking (jika administratif menangani)

**GLOBAL PROMPT**: ${ADMIN_GLOBAL_SYSTEM_PROMPT}

Wajib: kontrol versi dokumen, approval, dan log distribusi.`,
    deliverables: [
      "SOP Document Filing System",
      "Folder Structure Standard",
      "Naming Convention Guide",
      "Document Distribution Log",
      "Correspondence Management SOP",
      "Incoming/Outgoing Tracking",
      "Memo Template",
      "Event Planning Checklist",
      "Vendor Coordination Log",
      "Purchase Order Template"
    ],
    dependencies: ["adminOperationsOrchestrator"]
  }
];

export const ADMIN_TASK_BRIEFS: TaskBrief[] = [
  {
    task_id: "WP-ADM-EA-001",
    assigned_agent: "executiveAssistantAgent",
    objective: "Menyusun SOP dukungan eksekutif (kalender, briefing, travel) beserta kontrol kerahasiaan",
    inputs_from_state: ["org_profile", "management_system_scope", "admin_process_map", "doc_control"],
    deliverables: [
      "SOP Executive Calendar & Priority Rules",
      "Meeting Agenda & Minutes Template",
      "Executive Briefing Template",
      "SOP Travel Itinerary & Expense"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Minimal 5 control_point (conflict handling, delegation, approval, confidentiality, documentation)",
      "Sertakan KPI (calendar accuracy, response time)"
    ],
    acceptance_criteria: [
      "Dokumen rahasia punya labeling dan akses terkontrol",
      "Evidence meeting minutes dan action items ada",
      "Travel expense ada approval chain"
    ]
  },
  {
    task_id: "WP-ADM-OFFICE-001",
    assigned_agent: "officeManagerAgent",
    objective: "Menyusun SOP operasional kantor (kebijakan, fasilitas, inventory, keamanan)",
    inputs_from_state: ["org_profile", "management_system_scope", "admin_process_map", "doc_control"],
    deliverables: [
      "SOP Office Policies Manual",
      "SOP Office Supplies Inventory",
      "SOP Maintenance Request",
      "Office Security Protocols"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Minimal 6 control_point (inventory, reorder, maintenance, security, vendor, KPI tracking)",
      "Sertakan KPI (response time, stockout rate)"
    ],
    acceptance_criteria: [
      "Ada service level untuk permintaan fasilitas",
      "Inventory tracking ada",
      "Security protocols terdokumentasi"
    ]
  },
  {
    task_id: "WP-ADM-DATA-001",
    assigned_agent: "dataEntryClerkAgent",
    objective: "Menyusun SOP data entry dengan QA ketat dan audit trail",
    inputs_from_state: ["org_profile", "management_system_scope", "admin_process_map", "doc_control"],
    deliverables: [
      "SOP Data Entry End-to-End",
      "QA Checklist",
      "Data Correction Log",
      "Backup & Import/Export Log"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Minimal 6 control_point (intake, input, verification, submission, correction, backup)",
      "Sertakan KPI (error rate, throughput)"
    ],
    acceptance_criteria: [
      "Ada quality rules yang jelas",
      "Error tracking terdokumentasi",
      "Backup verification ada"
    ]
  },
  {
    task_id: "WP-ADM-RECEPTION-001",
    assigned_agent: "receptionistAgent",
    objective: "Menyusun WI front desk dengan visitor management dan audit trail",
    inputs_from_state: ["org_profile", "management_system_scope", "admin_process_map", "doc_control"],
    deliverables: [
      "WI Visitor Management",
      "Visitor Log Template",
      "Phone Message Log",
      "Mail & Delivery Log",
      "Emergency Procedures"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Minimal 5 control_point (ID check, badge, notification, sign-out, privacy)",
      "Sertakan retention rules"
    ],
    acceptance_criteria: [
      "Visitor log audit-ready",
      "Ada privacy controls",
      "Emergency procedures terdokumentasi"
    ]
  },
  {
    task_id: "WP-ADM-FILE-001",
    assigned_agent: "administrativeAssistantAgent",
    objective: "Membangun filing system dan kontrol dokumen/rekaman administrasi yang audit-ready",
    inputs_from_state: ["org_profile", "management_system_scope", "admin_process_map", "doc_control"],
    deliverables: [
      "SOP Document Filing System",
      "Naming Convention Guide",
      "Document Distribution Log",
      "Correspondence Management SOP",
      "Event Planning Checklist"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Minimal 8 control_point (versioning, approval, akses, backup, retention, disposal, confidential labeling, retrieval test)",
      "Sertakan system_records untuk repo dokumen"
    ],
    acceptance_criteria: [
      "Mudah dipakai staf administrasi",
      "Mencegah duplikasi & file hilang",
      "Ada audit trail dan aturan akses"
    ]
  }
];

export const ADMIN_EXECUTION_FLOW = [
  {
    step: 1,
    name: "Discovery",
    description: "Isi org_profile (lokasi, jam kantor, sistem repo & kalender) + scope standar",
    orchestrator_action: "Kumpulkan informasi organisasi, sistem administrasi, dan scope"
  },
  {
    step: 2,
    name: "Design",
    description: "Finalisasi process map + service catalog (jenis layanan admin + SLA internal) + doc coding",
    orchestrator_action: "Susun admin_process_map dan doc_control.doc_register"
  },
  {
    step: 3,
    name: "Build",
    description: "Dispatch 5 work packages (EA, Office Manager, Data Entry, Receptionist, Admin Assistant)",
    orchestrator_action: "Kirim task brief ke semua specialist agents"
  },
  {
    step: 4,
    name: "Integrate",
    description: "Buat lintas-proses: approval matrix, confidentiality levels, control matrix, CAPA, MR",
    orchestrator_action: "Merge output specialist jadi framework lengkap"
  },
  {
    step: 5,
    name: "Validation",
    description: "Cek gap evidence, gap retention, gap privacy, gap QA data entry",
    orchestrator_action: "Review completeness dan quality gates"
  },
  {
    step: 6,
    name: "Packaging",
    description: "Doc register final ADM-... + bundle template/log siap pakai",
    orchestrator_action: "Deliver final package"
  }
];

export const ADMIN_QUALITY_GATES = [
  {
    gate: 1,
    requirement: "Filing system jelas (struktur folder, naming, versioning, akses, retention)"
  },
  {
    gate: 2,
    requirement: "Visitor management aman dan punya audit trail"
  },
  {
    gate: 3,
    requirement: "Kalender & rapat menghasilkan minutes + action items (evidence)"
  },
  {
    gate: 4,
    requirement: "Data entry punya QA checklist + correction log + backup log"
  },
  {
    gate: 5,
    requirement: "Office supplies/facilities punya inventory + reorder + maintenance request log"
  }
];

export function getAdminAgentById(id: string): AgentSpec | undefined {
  if (id === "adminOperationsOrchestrator") return ADMIN_ORCHESTRATOR;
  return ADMIN_SPECIALISTS.find(a => a.id === id);
}

export function getAdminTaskBriefById(taskId: string): TaskBrief | undefined {
  return ADMIN_TASK_BRIEFS.find(t => t.task_id === taskId);
}

export function getAdminSpecialistByRole(role: string): AgentSpec | undefined {
  return ADMIN_SPECIALISTS.find(a => a.role.toLowerCase() === role.toLowerCase());
}
