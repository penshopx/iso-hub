import { AgentSpec, TaskBrief } from "./types";

export const CUSTOMER_SERVICE_STATE_SCHEMA = {
  org_profile: {
    company_name: "NEED_CONFIRMATION",
    industry: "customer_service",
    service_scope: "Customer Service + Call Center + Technical Support",
    customer_segments: "NEED_CONFIRMATION",
    service_hours: "NEED_CONFIRMATION",
    channels: ["phone", "email", "chat", "ticketing"],
    systems: {
      ticketing: "NEED_CONFIRMATION",
      crm: "NEED_CONFIRMATION",
      telephony: "NEED_CONFIRMATION",
      knowledge_base: "NEED_CONFIRMATION"
    },
    products_services: "NEED_CONFIRMATION"
  },
  iso_scope: {
    standards: ["ISO9001"],
    scope_statement: "NEED_CONFIRMATION",
    boundaries: "Customer contact to resolution and improvement loop",
    exclusions: []
  },
  service_model: {
    ticket_types: ["inquiry", "complaint", "incident", "request"],
    priority_levels: ["P1", "P2", "P3", "P4"],
    sla_targets: "NEED_CONFIRMATION",
    escalation_path: "NEED_CONFIRMATION"
  },
  doc_control: {
    doc_coding_rule: "CS-<AREA>-<TYPE>-<NNN>",
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
    qa_program: [],
    capa_problem_management: [],
    management_review: [],
    kb_playbooks: []
  },
  open_items: []
};

export const CUSTOMER_SERVICE_ORCHESTRATOR: AgentSpec = {
  id: "isoSupportOrchestrator",
  name: "ISO Support Orchestrator",
  role: "Orchestrator",
  industry: "customer_service",
  system_prompt: `Kamu adalah \`isoSupportOrchestrator\`. Kamu membangun sistem ISO untuk Customer Service + Call Center + Technical Support dengan OpenClaw.

**Langkah kerja:**
1) Lengkapi \`org_profile\`, \`iso_scope\` dan \`service_model\` (SLA, prioritas, jam layanan, jalur eskalasi). Jika ada \`NEED_CONFIRMATION\`, buat pertanyaan + asumsi sementara.
2) Buat process map "Contact-to-Resolution-to-Improvement": intake → triage → handle → escalate → resolve → closure → VOC → problem mgmt/CAPA → knowledge update.
3) Susun \`doc_control.doc_register\` awal (kode, owner, frekuensi review).
4) Delegasikan work package ke specialist: Team Lead, CS Rep, Call Center Agent, Technical Support Specialist.
5) Merge output sesuai \`DOCUMENT_OUTPUT_SCHEMA\`.
6) Buat paket compliance: internal audit checklist, QA monitoring program, CAPA/problem management, management review pack, dan clause–evidence mapping.
7) Validasi akhir: konsistensi definisi (SLA, FCR, MTTR), gap evidence, gap keamanan data, gap KB lifecycle.

**Quality gates wajib:**
- Ada definisi SLA dan prioritas P1–P4 + aturan eskalasi.
- Semua interaksi memiliki "record of interaction" (ticket/call log).
- Ada QA (monitoring call/chat/email) + coaching loop.
- Ada problem management untuk isu berulang + update knowledge base.`,
  deliverables: [
    "Support Process Map (Contact-to-Resolution)",
    "Document Register",
    "ISO Clause-Evidence Matrix",
    "Internal Audit Checklist",
    "QA Monitoring Program",
    "CAPA/Problem Management",
    "Management Review Pack"
  ],
  dependencies: []
};

export const CUSTOMER_SERVICE_SPECIALISTS: AgentSpec[] = [
  {
    id: "customerServiceTeamLeadAgent",
    name: "Customer Service Team Lead Agent",
    role: "Customer Service Team Lead",
    industry: "customer_service",
    system_prompt: `Kamu adalah \`customerServiceTeamLeadAgent\`. Fokus: kebijakan operasional, QA, coaching, workforce scheduling, eskalasi, review performa.

**Deliverable yang harus dibuat:**
1. SOP QA Monitoring (call/chat/email) + scoring rubric + calibration
2. SOP Eskalasi & Major Incident Communication (template status update)
3. Template Weekly Performance Review + Coaching Log + PIP
4. SOP Manajemen Jadwal (coverage, peak hour, adherence)

**Wajib:**
- KPI: SLA attainment, QA score, backlog aging
- Evidence di sistem
- Kontrol data pelanggan (ISO 27001 compliance jika applicable)`,
    deliverables: [
      "SOP QA Monitoring + Scoring Rubric",
      "SOP Eskalasi & Incident Communication",
      "Template Weekly Performance Review",
      "Coaching Log + PIP Template",
      "SOP Workforce Scheduling"
    ],
    dependencies: ["isoSupportOrchestrator"]
  },
  {
    id: "customerServiceRepAgent",
    name: "Customer Service Rep Agent",
    role: "Customer Service Representative",
    industry: "customer_service",
    system_prompt: `Kamu adalah \`customerServiceRepAgent\`. Fokus: SOP frontliner, complaint handling, refund/exchange policy script, issue resolution records.

**Deliverable yang harus dibuat:**
1. WI Penanganan Inquiry/Complaint: greeting, verifikasi, triage, resolusi, closure
2. Script Template (call/chat/email) + do/don't compliance
3. Template Complaint Log + Issue Resolution Record
4. SOP Refund/Exchange (jika relevan) + approval points

**Wajib:**
- Field minimum ticket terdefinisi
- Standar catatan komunikasi
- Kontrol janji ke pelanggan (hindari overpromise)`,
    deliverables: [
      "WI Penanganan Inquiry/Complaint",
      "Script Template (Call/Chat/Email)",
      "Template Complaint Log",
      "SOP Refund/Exchange"
    ],
    dependencies: ["isoSupportOrchestrator"]
  },
  {
    id: "callCenterAgentSpecialist",
    name: "Call Center Agent Specialist",
    role: "Call Center Agent",
    industry: "customer_service",
    system_prompt: `Kamu adalah \`callCenterAgentSpecialist\`. Fokus: telephony handling, call logging, escalation, compliance verifikasi identitas, wrap-up codes.

**Deliverable yang harus dibuat:**
1. WI Penerimaan Panggilan: verifikasi identitas, klasifikasi kebutuhan, prioritas, pembuatan ticket
2. Call Script Template + objection handling + empathy standard
3. Template Call Log Report + wrap-up code taxonomy
4. Checklist Kepatuhan: perekaman panggilan, consent, data privacy

**Wajib:**
- Definisi "first contact resolution" 
- Evidence minimal yang harus masuk ticketing/CRM`,
    deliverables: [
      "WI Penerimaan Panggilan",
      "Call Script Template",
      "Template Call Log Report",
      "Checklist Kepatuhan Panggilan"
    ],
    dependencies: ["isoSupportOrchestrator"]
  },
  {
    id: "technicalSupportSpecialistAgent",
    name: "Technical Support Specialist Agent",
    role: "Technical Support Specialist",
    industry: "customer_service",
    system_prompt: `Kamu adalah \`technicalSupportSpecialistAgent\`. Fokus: troubleshooting, incident handling, RCA, workaround, eskalasi ke engineering, KB updates.

**Deliverable yang harus dibuat:**
1. SOP Troubleshooting & Diagnostic Workflow (hypothesis → test → fix/workaround → verify)
2. SOP Incident Escalation ke Level 2/Engineering + criteria P1/P2
3. Template RCA (5-Why/Fishbone) + Post-Incident Review
4. SOP Knowledge Base Lifecycle: create/update/retire artikel + review period

**Wajib:**
- Evidence (logs, ticket updates)
- Kontrol perubahan solusi
- Linkage ke CAPA/problem management`,
    deliverables: [
      "SOP Troubleshooting & Diagnostic",
      "SOP Incident Escalation",
      "Template RCA + Post-Incident Review",
      "SOP Knowledge Base Lifecycle"
    ],
    dependencies: ["isoSupportOrchestrator"]
  }
];

export const CUSTOMER_SERVICE_TASK_BRIEFS: TaskBrief[] = [
  {
    task_id: "WP-QA-001",
    assigned_agent: "customerServiceTeamLeadAgent",
    objective: "Membangun program QA monitoring dan coaching loop untuk ISO support",
    inputs_from_state: ["org_profile", "iso_scope", "service_model", "doc_control"],
    deliverables: [
      "SOP QA Monitoring + scoring rubric",
      "Template Call/Chat/Email Monitoring Checklist",
      "Coaching Log + Weekly Performance Review Template",
      "Calibration Procedure"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Minimal 8 control_point (privacy, scripting, logging, SLA, escalation, resolution quality, knowledge usage, follow-up)",
      "Sertakan KPI dan definisi rumus"
    ],
    acceptance_criteria: [
      "Ada mekanisme sampling dan kalibrasi",
      "Ada linkage QA finding → coaching → re-check",
      "Evidence jelas (monitoring record, coaching record)"
    ]
  },
  {
    task_id: "WP-CSR-001",
    assigned_agent: "customerServiceRepAgent",
    objective: "Membuat SOP operasional harian CS Rep yang audit-ready",
    inputs_from_state: ["org_profile", "iso_scope", "service_model", "doc_control"],
    deliverables: [
      "WI Penanganan Inquiry/Complaint",
      "Script Template",
      "Template Complaint Log",
      "SOP Refund/Exchange"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Field minimum ticket terdefinisi",
      "Standar catatan komunikasi"
    ],
    acceptance_criteria: [
      "Ada kontrol overpromise",
      "Ada evidence di CRM/ticketing"
    ]
  },
  {
    task_id: "WP-CC-001",
    assigned_agent: "callCenterAgentSpecialist",
    objective: "Membuat WI call center yang audit-ready",
    inputs_from_state: ["org_profile", "iso_scope", "service_model", "doc_control"],
    deliverables: [
      "WI Penerimaan Panggilan",
      "Call Script Template",
      "Template Call Log Report",
      "Checklist Kepatuhan"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Verifikasi identitas mandatory",
      "Wrap-up code taxonomy"
    ],
    acceptance_criteria: [
      "First contact resolution terdefinisi",
      "Compliance evidence ada"
    ]
  },
  {
    task_id: "WP-TS-001",
    assigned_agent: "technicalSupportSpecialistAgent",
    objective: "Membuat SOP technical support yang audit-ready",
    inputs_from_state: ["org_profile", "iso_scope", "service_model", "doc_control"],
    deliverables: [
      "SOP Troubleshooting & Diagnostic",
      "SOP Incident Escalation",
      "Template RCA",
      "SOP Knowledge Base Lifecycle"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Evidence di ticketing/logs",
      "Linkage ke CAPA"
    ],
    acceptance_criteria: [
      "RCA methodology terdokumentasi",
      "KB lifecycle ada"
    ]
  }
];

export function getCustomerServiceAgentById(id: string): AgentSpec | undefined {
  if (id === "isoSupportOrchestrator") return CUSTOMER_SERVICE_ORCHESTRATOR;
  return CUSTOMER_SERVICE_SPECIALISTS.find(a => a.id === id);
}
