import { AgentSpec, TaskBrief } from "./types";

export const HEALTHCARE_STATE_SCHEMA = {
  org_profile: {
    company_name: "NEED_CONFIRMATION",
    industry: "healthcare",
    facility_type: "NEED_CONFIRMATION",
    beds: "NEED_CONFIRMATION",
    services: "NEED_CONFIRMATION",
    systems: { his: "NEED_CONFIRMATION", lis: "NEED_CONFIRMATION", emr: "NEED_CONFIRMATION" }
  },
  iso_scope: {
    standards: ["ISO9001", "ISO27001", "ISO45001"],
    scope_statement: "NEED_CONFIRMATION",
    boundaries: "Healthcare services operations",
    exclusions: []
  },
  process_map: { core_processes: [], support_processes: [], outsourced_processes: [] },
  doc_control: { doc_coding_rule: "HC-<AREA>-<TYPE>-<NNN>", versioning_rule: "vMajor.Minor", retention_rule: "NEED_CONFIRMATION", doc_register: [] },
  risk_register: [], kpi_register: [],
  outputs: { policies: [], sops: [], work_instructions: [], forms_logs_templates: [], audit_program: [], capa: [], management_review: [] },
  open_items: []
};

export const HEALTHCARE_ORCHESTRATOR: AgentSpec = {
  id: "isoHealthcareOrchestrator",
  name: "ISO Healthcare Orchestrator",
  role: "Orchestrator",
  industry: "healthcare",
  system_prompt: `Kamu adalah \`isoHealthcareOrchestrator\`. Pimpin pembangunan ISO Healthcare Management System dengan fokus patient safety, clinical governance, ISO 9001, ISO 27001 (data pasien), ISO 45001.`,
  deliverables: ["Healthcare Process Map", "Document Register", "Clinical Governance", "Patient Safety System"],
  dependencies: []
};

export const HEALTHCARE_SPECIALISTS: AgentSpec[] = [
  {
    id: "clinicalDirectorAgent",
    name: "Clinical Director Agent",
    role: "Clinical Director",
    industry: "healthcare",
    system_prompt: `Fokus: clinical governance, medical protocols, clinical audit, patient safety. Deliverables: Clinical Governance SOP, Medical Protocols, Clinical Audit Program, Patient Safety Checklist.`,
    deliverables: ["Clinical Governance", "Medical Protocols", "Clinical Audit", "Patient Safety"],
    dependencies: ["isoHealthcareOrchestrator"]
  },
  {
    id: "nursingDirectorAgent",
    name: "Nursing Director Agent",
    role: "Nursing Director",
    industry: "healthcare",
    system_prompt: `Fokus: nursing standards, nursing care plans, medication administration, infection control. Deliverables: Nursing Standards, Care Plans, Medication Admin SOP, Infection Control.`,
    deliverables: ["Nursing Standards", "Care Plans", "Medication SOP", "Infection Control"],
    dependencies: ["isoHealthcareOrchestrator"]
  },
  {
    id: "patientSafetyAgent",
    name: "Patient Safety Agent",
    role: "Patient Safety Officer",
    industry: "healthcare",
    system_prompt: `Fokus: incident reporting, adverse event analysis, near miss, patient identification. Deliverables: Incident Reporting SOP, RCA Template, Patient ID Checklist, Safety Dashboard.`,
    deliverables: ["Incident Reporting", "RCA Template", "Patient ID", "Safety Dashboard"],
    dependencies: ["isoHealthcareOrchestrator"]
  },
  {
    id: "medicalRecordsAgent",
    name: "Medical Records Agent",
    role: "Medical Records Manager",
    industry: "healthcare",
    system_prompt: `Fokus: medical records, confidentiality, data retention, disclosure. Deliverables: Medical Records SOP, Confidentiality Policy, Retention Schedule, Disclosure Log.`,
    deliverables: ["Medical Records SOP", "Confidentiality", "Retention", "Disclosure Log"],
    dependencies: ["isoHealthcareOrchestrator"]
  },
  {
    id: "pharmacyAgent",
    name: "Pharmacy Agent",
    role: "Pharmacy Manager",
    industry: "healthcare",
    system_prompt: `Fokus: pharmacy operations, medication management, drug storage, controlled drugs. Deliverables: Pharmacy SOP, Medication Management, Drug Storage Control, Controlled Drug Log.`,
    deliverables: ["Pharmacy SOP", "Medication Management", "Drug Storage", "Controlled Drug Log"],
    dependencies: ["isoHealthcareOrchestrator"]
  },
  {
    id: "laboratoryAgent",
    name: "Laboratory Agent",
    role: "Laboratory Manager",
    industry: "healthcare",
    system_prompt: `Fokus: lab quality, sample handling, result verification, external QC. Deliverables: Lab Quality SOP, Sample Handling, Result Verification, QC Program.`,
    deliverables: ["Lab Quality SOP", "Sample Handling", "Result Verification", "QC Program"],
    dependencies: ["isoHealthcareOrchestrator"]
  },
  {
    id: "facilityAgent",
    name: "Facility Agent",
    role: "Facility Manager",
    industry: "healthcare",
    system_prompt: `Fokus: facility management, safety, emergency response, equipment maintenance. Deliverables: Facility SOP, Safety Inspection, Emergency Response, Equipment Maintenance.`,
    deliverables: ["Facility SOP", "Safety Inspection", "Emergency Response", "Equipment Maintenance"],
    dependencies: ["isoHealthcareOrchestrator"]
  },
  {
    id: "complianceHealthcareAgent",
    name: "Compliance Healthcare Agent",
    role: "Compliance Officer",
    industry: "healthcare",
    system_prompt: `Fokus: regulatory compliance, accreditation, infection control, waste management. Deliverables: Compliance SOP, Accreditation Prep, Waste Management, License Tracking.`,
    deliverables: ["Compliance SOP", "Accreditation", "Waste Management", "License Tracking"],
    dependencies: ["isoHealthcareOrchestrator"]
  }
];

export const HEALTHCARE_TASK_BRIEFS: TaskBrief[] = [
  { task_id: "WP-HC-CLIN-001", assigned_agent: "clinicalDirectorAgent", objective: "Buat clinical governance system", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["Clinical Governance", "Medical Protocols"], constraints: ["Patient safety priority"], acceptance_criteria: ["Clinical audit ada"] },
  { task_id: "WP-HC-SAFE-001", assigned_agent: "patientSafetyAgent", objective: "Buat patient safety system", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["Incident Reporting", "RCA Template"], constraints: ["Gunakan DOCUMENT_OUTPUT_SCHEMA"], acceptance_criteria: ["Incident tracking ada"] },
  { task_id: "WP-HC-RECS-001", assigned_agent: "medicalRecordsAgent", objective: "Buat medical records control", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["Medical Records SOP", "Retention"], constraints: ["Confidentiality mandatory"], acceptance_criteria: ["Data retention sesuai regulasi"] }
];

export function getHealthcareAgentById(id: string): AgentSpec | undefined {
  if (id === "isoHealthcareOrchestrator") return HEALTHCARE_ORCHESTRATOR;
  return HEALTHCARE_SPECIALISTS.find(a => a.id === id);
}
