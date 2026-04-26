import { AgentSpec, TaskBrief } from "./types";

export const EDUCATION_STATE_SCHEMA = {
  org_profile: {
    company_name: "NEED_CONFIRMATION",
    industry: "education",
    institution_type: "NEED_CONFIRMATION",
    levels: "NEED_CONFIRMATION",
    students: "NEED_CONFIRMATION",
    programs: "NEED_CONFIRMATION",
    systems: { sis: "NEED_CONFIRMATION", lms: "NEED_CONFIRMATION", erp: "NEED_CONFIRMATION" }
  },
  iso_scope: {
    standards: ["ISO9001", "ISO21001"],
    scope_statement: "NEED_CONFIRMATION",
    boundaries: "Educational services operations",
    exclusions: []
  },
  process_map: { core_processes: [], support_processes: [], outsourced_processes: [] },
  doc_control: { doc_coding_rule: "EDU-<AREA>-<TYPE>-<NNN>", versioning_rule: "vMajor.Minor", retention_rule: "NEED_CONFIRMATION", doc_register: [] },
  risk_register: [], kpi_register: [],
  outputs: { policies: [], sops: [], work_instructions: [], forms_logs_templates: [], audit_program: [], capa: [], management_review: [] },
  open_items: []
};

export const EDUCATION_ORCHESTRATOR: AgentSpec = {
  id: "isoEducationOrchestrator",
  name: "ISO Education Orchestrator",
  role: "Orchestrator",
  industry: "education",
  system_prompt: `Kamu adalah \`isoEducationOrchestrator\`. Pimpin pembangunan ISO Education Management System dengan fokus ISO 9001 dan ISO 21001 (educational organization). Prioritas: student satisfaction, learning outcomes, continuous improvement.`,
  deliverables: ["Education Process Map", "Document Register", "Academic Quality System", "Student Satisfaction System"],
  dependencies: []
};

export const EDUCATION_SPECIALISTS: AgentSpec[] = [
  {
    id: "academicDirectorAgent",
    name: "Academic Director Agent",
    role: "Academic Director",
    industry: "education",
    system_prompt: `Fokus: curriculum, teaching quality, academic standards, learning outcomes. Deliverables: Curriculum SOP, Teaching Standards, Learning Outcome Assessment, Academic Calendar.`,
    deliverables: ["Curriculum SOP", "Teaching Standards", "Learning Assessment", "Academic Calendar"],
    dependencies: ["isoEducationOrchestrator"]
  },
  {
    id: "studentAffairsAgent",
    name: "Student Affairs Agent",
    role: "Student Affairs Director",
    industry: "education",
    system_prompt: `Fokus: admissions, student services, student welfare, complaints. Deliverables: Admissions SOP, Student Services, Welfare Program, Complaint Handling.`,
    deliverables: ["Admissions SOP", "Student Services", "Welfare Program", "Complaint Handling"],
    dependencies: ["isoEducationOrchestrator"]
  },
  {
    id: "facultyAgent",
    name: "Faculty Agent",
    role: "Faculty Manager",
    industry: "education",
    system_prompt: `Fokus: faculty management, lecturer competency, professional development. Deliverables: Faculty SOP, Lecturer Development, Competency Matrix, Performance Evaluation.`,
    deliverables: ["Faculty SOP", "Lecturer Development", "Competency Matrix", "Performance Evaluation"],
    dependencies: ["isoEducationOrchestrator"]
  },
  {
    id: "qualityAssuranceAgent",
    name: "Quality Assurance Agent",
    role: "QA Manager",
    industry: "education",
    system_prompt: `Fokus: academic quality, internal audit, accreditation, KPI. Deliverables: QA SOP, Internal Audit, Accreditation Prep, Academic KPI Dashboard.`,
    deliverables: ["QA SOP", "Internal Audit", "Accreditation", "KPI Dashboard"],
    dependencies: ["isoEducationOrchestrator"]
  },
  {
    id: "researchAgent",
    name: "Research Agent",
    role: "Research Director",
    industry: "education",
    system_prompt: `Fokus: research management, research ethics, publication, intellectual property. Deliverables: Research SOP, Ethics Committee, Publication Policy, IP Management.`,
    deliverables: ["Research SOP", "Ethics Committee", "Publication Policy", "IP Management"],
    dependencies: ["isoEducationOrchestrator"]
  },
  {
    id: "facilityEducationAgent",
    name: "Facility Education Agent",
    role: "Facility Manager",
    industry: "education",
    system_prompt: `Fokus: campus facilities, lab safety, equipment, maintenance. Deliverables: Campus SOP, Lab Safety, Equipment Maintenance, Facility Scheduling.`,
    deliverables: ["Campus SOP", "Lab Safety", "Equipment Maintenance", "Facility Scheduling"],
    dependencies: ["isoEducationOrchestrator"]
  },
  {
    id: "administrativeAgent",
    name: "Administrative Agent",
    role: "Administration Manager",
    industry: "education",
    system_prompt: `Fokus: administration, records, documentation, compliance. Deliverables: Admin SOP, Records Management, Document Control, Compliance Checklist.`,
    deliverables: ["Admin SOP", "Records Management", "Document Control", "Compliance Checklist"],
    dependencies: ["isoEducationOrchestrator"]
  }
];

export const EDUCATION_TASK_BRIEFS: TaskBrief[] = [
  { task_id: "WP-EDU-ACAD-001", assigned_agent: "academicDirectorAgent", objective: "Buat academic quality system", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["Curriculum SOP", "Learning Assessment"], constraints: ["Learning outcomes priority"], acceptance_criteria: ["Teaching standards terdokumentasi"] },
  { task_id: "WP-EDU-QA-001", assigned_agent: "qualityAssuranceAgent", objective: "Buat QA system", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["QA SOP", "Accreditation"], constraints: ["Accreditation requirements"], acceptance_criteria: ["Internal audit ada"] },
  { task_id: "WP-EDU-STU-001", assigned_agent: "studentAffairsAgent", objective: "Buat student services system", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["Admissions SOP", "Complaint Handling"], constraints: ["Student satisfaction"], acceptance_criteria: ["Complaint tracking ada"] }
];

export function getEducationAgentById(id: string): AgentSpec | undefined {
  if (id === "isoEducationOrchestrator") return EDUCATION_ORCHESTRATOR;
  return EDUCATION_SPECIALISTS.find(a => a.id === id);
}
