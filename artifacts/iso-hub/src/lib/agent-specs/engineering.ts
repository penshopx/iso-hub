import { AgentSpec, TaskBrief } from "./types";

export const ENGINEERING_STATE_SCHEMA = {
  org_profile: {
    company_name: "NEED_CONFIRMATION",
    industry: "engineering",
    engineering_domains: ["software", "civil", "mechanical", "electrical"],
    project_types: "NEED_CONFIRMATION",
    locations: "NEED_CONFIRMATION",
    tools_systems: {
      requirements: "NEED_CONFIRMATION",
      design_repo: "NEED_CONFIRMATION",
      issue_tracker: "NEED_CONFIRMATION",
      version_control: "NEED_CONFIRMATION",
      cad_bim: "NEED_CONFIRMATION",
      document_control: "NEED_CONFIRMATION"
    }
  },
  management_system_scope: {
    standards: ["ISO9001"],
    scope_statement: "NEED_CONFIRMATION",
    boundaries: "Engineering lifecycle end-to-end",
    exclusions: []
  },
  engineering_lifecycle: {
    stages: [
      "Requirements",
      "Concept Design",
      "Detailed Design",
      "Design Review",
      "Verification",
      "Validation",
      "Release/Construction/Deployment",
      "As-built/Release Notes",
      "Post-implementation Review & Improvement"
    ],
    interfaces: ["Procurement", "QA/QC", "HSE", "Operations/Maintenance", "IT/Security"]
  },
  doc_control: {
    doc_coding_rule: "ENG-<DOMAIN>-<TYPE>-<NNN>",
    versioning_rule: "vMajor.Minor",
    retention_rule: "NEED_CONFIRMATION",
    doc_register: []
  },
  risk_register: [],
  kpi_register: [],
  outputs: {
    policies: [],
    processes_sops: [],
    work_instructions: [],
    templates_forms: [],
    verification_validation_pack: [],
    change_management_pack: [],
    audit_capa_pack: [],
    management_review_pack: []
  },
  open_items: []
};

export const ENGINEERING_ORCHESTRATOR: AgentSpec = {
  id: "engineeringOrchestrator",
  name: "Engineering Orchestrator",
  role: "Orchestrator",
  industry: "engineering",
  system_prompt: `Kamu adalah \`engineeringOrchestrator\`. Kamu membangun Engineering Management System dengan OpenClaw.

**Langkah kerja:**
1) Lengkapi \`org_profile\` dan \`management_system_scope\` (standar, batasan, tools). Jika ada \`NEED_CONFIRMATION\`, buat pertanyaan + asumsi sementara.
2) Finalisasi \`engineering_lifecycle\` dan interface lintas fungsi.
3) Susun \`doc_control.doc_register\` awal: proses inti, WI per domain, template, dan rekaman wajib.
4) Delegasikan work package ke specialist agents: software, civil, mechanical, electrical.
5) Gabungkan output mengikuti \`DOCUMENT_OUTPUT_SCHEMA\`.
6) Buat paket sistem lintas domain: change control (ECR/ECO), design review governance, V&V master plan, CAPA, internal audit, management review.
7) Validasi akhir: konsistensi istilah, traceability lengkap, eviden ada, KPI terdefinisi.

**Quality gates:**
- Ada kontrol review/approval untuk desain.
- Ada bukti verifikasi dan validasi sesuai kriteria penerimaan.
- Ada kontrol perubahan dan baseline.
- Ada lessons learned dan CAPA untuk temuan.`,
  deliverables: [
    "Engineering Lifecycle Process Map",
    "Document Register",
    "Change Management Pack",
    "Design Review Governance",
    "V&V Master Plan",
    "CAPA & Lessons Learned",
    "Internal Audit Checklist",
    "Management Review Pack"
  ],
  dependencies: []
};

export const ENGINEERING_SPECIALISTS: AgentSpec[] = [
  {
    id: "softwareEngineerAgent",
    name: "Software Engineer Agent",
    role: "Software Engineer",
    industry: "engineering",
    system_prompt: `Fokus: requirements → design → test → release → incident/postmortem, security baseline.

**Deliverable:**
- SOP Software Requirements & Design Control (review + approval)
- Test Plan + Test Cases template + Release Notes template
- Deployment Plan + Incident Report + Postmortem template
- Security assessment checklist (opsional ISO 27001 alignment)

**Wajib:**
- Traceability requirement→ticket→code→test→release
- Kontrol perubahan (versioning)
- CI/CD integration points`,
    deliverables: [
      "SOP Requirements & Design Control",
      "Test Plan Template",
      "Test Cases Template",
      "Release Notes Template",
      "Deployment Plan",
      "Incident Report Template",
      "Postmortem Template",
      "Security Assessment Checklist"
    ],
    dependencies: ["engineeringOrchestrator"]
  },
  {
    id: "civilEngineerAgent",
    name: "Civil Engineer Agent",
    role: "Civil Engineer",
    industry: "engineering",
    system_prompt: `Fokus: desain sipil, konstruksi, QA/QC, inspeksi, HSE plan, change request, as-built.

**Deliverable:**
- Project plan + construction schedule template
- QA/QC plan + inspection & test plan (ITP) template
- Risk assessment + change request form
- As-built documentation checklist
- HSE plan (opsional ISO 45001 alignment)

**Wajib:**
- Kontrol gambar (drawing register), approval, revisi
- Evidence inspeksi
- Traceability ke desain`,
    deliverables: [
      "Project Plan Template",
      "Construction Schedule",
      "QA/QC Plan",
      "ITP Template",
      "Risk Assessment",
      "Change Request Form",
      "As-built Checklist",
      "HSE Plan"
    ],
    dependencies: ["engineeringOrchestrator"]
  },
  {
    id: "mechanicalEngineerAgent",
    name: "Mechanical Engineer Agent",
    role: "Mechanical Engineer",
    industry: "engineering",
    system_prompt: `Fokus: design verification/validation, failure analysis, test procedure, ECO, manufacturing plan.

**Deliverable:**
- Design risk assessment (FMEA-style atau risk log) + design review checklist
- Test procedures + validation report template
- Failure analysis report template
- Engineering Change Order (ECO) template
- Manufacturing process plan template (jika relevan)

**Wajib:**
- Kriteria penerimaan
- Bukti test
- Kontrol perubahan desain`,
    deliverables: [
      "Design Risk Assessment",
      "FMEA Template",
      "Design Review Checklist",
      "Test Procedures",
      "Validation Report Template",
      "Failure Analysis Report",
      "ECO Template",
      "Manufacturing Process Plan"
    ],
    dependencies: ["engineeringOrchestrator"]
  },
  {
    id: "electricalEngineerAgent",
    name: "Electrical Engineer Agent",
    role: "Electrical Engineer",
    industry: "engineering",
    system_prompt: `Fokus: design spec, wiring/circuit diagram control, BOM, test plan/report, regulatory compliance, vendor eval.

**Deliverable:**
- Electrical design specification template + diagram control checklist
- BOM template + vendor evaluation template
- Test plan + test report template
- Regulatory compliance documentation template
- Incident report template (jika ada kegagalan/unsafe event)

**Wajib:**
- Kontrol Revisi diagram, approval
- Evidence pengujian
- Traceability ke standar regulasi`,
    deliverables: [
      "Electrical Design Specification",
      "Diagram Control Checklist",
      "BOM Template",
      "Vendor Evaluation",
      "Test Plan",
      "Test Report Template",
      "Regulatory Compliance",
      "Incident Report"
    ],
    dependencies: ["engineeringOrchestrator"]
  }
];

export const ENGINEERING_TASK_BRIEFS: TaskBrief[] = [
  {
    task_id: "WP-ENG-SW-001",
    assigned_agent: "softwareEngineerAgent",
    objective: "Membangun paket SOP + template software engineering audit-ready",
    inputs_from_state: ["org_profile", "management_system_scope", "engineering_lifecycle", "doc_control"],
    deliverables: [
      "SOP Requirements & Design Control",
      "Test Plan Template",
      "Test Cases Template",
      "Release Notes Template",
      "Incident Report Template"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Wajib traceability requirement→code→test→release",
      "Minimal 6 control_point"
    ],
    acceptance_criteria: [
      "Acceptance criteria jelas",
      "Evidence dari tool (issue tracker, VCS, CI)",
      "Bahasa ringkas operasional"
    ]
  },
  {
    task_id: "WP-ENG-CIV-001",
    assigned_agent: "civilEngineerAgent",
    objective: "Membangun paket dokumentasi civil engineering audit-ready",
    inputs_from_state: ["org_profile", "management_system_scope", "engineering_lifecycle", "doc_control"],
    deliverables: [
      "Project Plan Template",
      "Construction Schedule",
      "QA/QC Plan",
      "ITP Template",
      "As-built Checklist"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Drawing register dan revisi control",
      "HSE compliance jika applicable"
    ],
    acceptance_criteria: [
      "Inspection evidence ada",
      "Traceability ke desain",
      "Change request process terdokumentasi"
    ]
  },
  {
    task_id: "WP-ENG-MECH-001",
    assigned_agent: "mechanicalEngineerAgent",
    objective: "Membangun paket dokumentasi mechanical engineering audit-ready",
    inputs_from_state: ["org_profile", "management_system_scope", "engineering_lifecycle", "doc_control"],
    deliverables: [
      "Design Risk Assessment",
      "FMEA Template",
      "Design Review Checklist",
      "Test Procedures",
      "Validation Report"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Kriteria penerimaan terdefinisi",
      "ECO process"
    ],
    acceptance_criteria: [
      "Bukti test terdokumentasi",
      "Failure analysis methodology ada",
      "Design change terkontrol"
    ]
  },
  {
    task_id: "WP-ENG-ELEC-001",
    assigned_agent: "electricalEngineerAgent",
    objective: "Membangun paket dokumentasi electrical engineering audit-ready",
    inputs_from_state: ["org_profile", "management_system_scope", "engineering_lifecycle", "doc_control"],
    deliverables: [
      "Electrical Design Specification",
      "Diagram Control Checklist",
      "BOM Template",
      "Vendor Evaluation",
      "Test Report"
    ],
    constraints: [
      "Gunakan DOCUMENT_OUTPUT_SCHEMA",
      "Diagram revision control",
      "Regulatory compliance"
    ],
    acceptance_criteria: [
      "Test evidence ada",
      "Vendor traceability",
      "Compliance documentation"
    ]
  }
];

export function getEngineeringAgentById(id: string): AgentSpec | undefined {
  if (id === "engineeringOrchestrator") return ENGINEERING_ORCHESTRATOR;
  return ENGINEERING_SPECIALISTS.find(a => a.id === id);
}
