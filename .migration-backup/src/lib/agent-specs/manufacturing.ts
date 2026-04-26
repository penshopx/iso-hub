import { AgentSpec, TaskBrief } from "./types";

export const MANUFACTURING_STATE_SCHEMA = {
  org_profile: {
    company_name: "NEED_CONFIRMATION",
    industry: "manufacturing",
    manufacturing_type: "NEED_CONFIRMATION",
    facilities: "NEED_CONFIRMATION",
    production_lines: "NEED_CONFIRMATION",
    products: "NEED_CONFIRMATION",
    systems: {
      erp: "NEED_CONFIRMATION",
      mes: "NEED_CONFIRMATION",
      qms: "NEED_CONFIRMATION"
    }
  },
  iso_scope: {
    standards: ["ISO9001", "ISO14001", "ISO45001"],
    scope_statement: "NEED_CONFIRMATION",
    boundaries: "Manufacturing operations end-to-end",
    exclusions: []
  },
  process_map: {
    core_processes: ["Receiving", "Production", "QC", "Packaging", "Shipping"],
    support_processes: ["Maintenance", "Procurement", "HR"],
    outsourced_processes: []
  },
  doc_control: {
    doc_coding_rule: "MFG-<AREA>-<TYPE>-<NNN>",
    versioning_rule: "vMajor.Minor",
    retention_rule: "NEED_CONFIRMATION",
    doc_register: []
  },
  risk_register: [],
  kpi_register: [],
  outputs: { policies: [], sops: [], work_instructions: [], forms_logs_templates: [], audit_program: [], capa: [], management_review: [] },
  open_items: []
};

export const MANUFACTURING_ORCHESTRATOR: AgentSpec = {
  id: "isoManufacturingOrchestrator",
  name: "ISO Manufacturing Orchestrator",
  role: "Orchestrator",
  industry: "manufacturing",
  system_prompt: `Kamu adalah \`isoManufacturingOrchestrator\`. Pimpin pembangunan ISO Manufacturing Management System dengan fokus:
- ISO 9001 (Quality)
- ISO 14001 (Environment)  
- ISO 45001 (OHS)
- IATF 16949 (Automotive, jika applicable)

Tugas: Discovery → Design → Build → Validate → Package. Validasi: konsistensi, gap ISO, missing evidence, KPI.`,
  deliverables: ["Manufacturing Process Map", "Document Register", "ISO Clause-Evidence Matrix", "Internal Audit Program", "CAPA System"],
  dependencies: []
};

export const MANUFACTURING_SPECIALISTS: AgentSpec[] = [
  {
    id: "productionManagerAgent",
    name: "Production Manager Agent",
    role: "Production Manager",
    industry: "manufacturing",
    system_prompt: `Fokus: production planning, scheduling, production control, capacity management, OEE. Deliverables: SOP Production Planning, Production Schedule Template, OEE Tracking, Capacity Analysis.`,
    deliverables: ["SOP Production Planning", "Production Schedule", "OEE Tracking", "Capacity Analysis"],
    dependencies: ["isoManufacturingOrchestrator"]
  },
  {
    id: "qualityManagerAgent",
    name: "Quality Manager Agent",
    role: "Quality Manager",
    industry: "manufacturing",
    system_prompt: `Fokus: QC, QA, product release, defect tracking, SPC, root cause analysis. Deliverables: SOP QC, SPC Charts, Defect Tracking, Product Release Checklist.`,
    deliverables: ["SOP Quality Control", "SPC Charts", "Defect Tracking", "Product Release Checklist"],
    dependencies: ["isoManufacturingOrchestrator"]
  },
  {
    id: "maintenanceManagerAgent",
    name: "Maintenance Manager Agent",
    role: "Maintenance Manager",
    industry: "manufacturing",
    system_prompt: `Fokus: preventive maintenance, corrective maintenance, TPM, equipment calibration. Deliverables: SOP Maintenance, PM Schedule, Equipment History Card, Calibration Log.`,
    deliverables: ["SOP Maintenance", "PM Schedule", "Equipment History", "Calibration Log"],
    dependencies: ["isoManufacturingOrchestrator"]
  },
  {
    id: "processEngineerAgent",
    name: "Process Engineer Agent",
    role: "Process Engineer",
    industry: "manufacturing",
    system_prompt: `Fokus: process optimization, FMEA, control plan, work instructions, process capability. Deliverables: Process Flow, FMEA, Control Plan, Work Instructions.`,
    deliverables: ["Process Flow Diagram", "FMEA", "Control Plan", "Work Instructions"],
    dependencies: ["isoManufacturingOrchestrator"]
  },
  {
    id: "warehouseAgent",
    name: "Warehouse Agent",
    role: "Warehouse Manager",
    industry: "manufacturing",
    system_prompt: `Fokus: raw material handling, FG storage, inventory control, FIFO. Deliverables: SOP Warehouse, Inventory Control, Storage Guidelines, Shipping Control.`,
    deliverables: ["SOP Warehouse", "Inventory Control", "Storage Guidelines", "Shipping Control"],
    dependencies: ["isoManufacturingOrchestrator"]
  },
  {
    id: "procurementAgent",
    name: "Procurement Agent",
    role: "Procurement Manager",
    industry: "manufacturing",
    system_prompt: `Fokus: supplier evaluation, incoming QC, purchasing control. Deliverables: SOP Supplier Evaluation, Purchase Control, Incoming QC, Supplier Rating.`,
    deliverables: ["SOP Supplier Evaluation", "Purchase Control", "Incoming QC", "Supplier Rating"],
    dependencies: ["isoManufacturingOrchestrator"]
  },
  {
    id: "hseManagerAgent",
    name: "HSE Manager Agent",
    role: "HSE Manager",
    industry: "manufacturing",
    system_prompt: `Fokus: K3 (ISO 45001), Environment (ISO 14001), hazard identification, risk assessment, emergency response. Deliverables: SOP K3, Environmental Control, Hazard Register, Emergency Response.`,
    deliverables: ["SOP K3", "Environmental Control", "Hazard Register", "Emergency Response"],
    dependencies: ["isoManufacturingOrchestrator"]
  },
  {
    id: "isoComplianceAgent",
    name: "ISO Compliance Agent",
    role: "Compliance Manager",
    industry: "manufacturing",
    system_prompt: `Fokus: clause-evidence matrix, internal audit, CAPA, document control. Deliverables: Clause Matrix, Audit Program, CAPA System, Doc Control SOP.`,
    deliverables: ["Clause-Evidence Matrix", "Internal Audit Program", "CAPA System", "Doc Control SOP"],
    dependencies: ["isoManufacturingOrchestrator"]
  }
];

export const MANUFACTURING_TASK_BRIEFS: TaskBrief[] = [
  { task_id: "WP-PM-001", assigned_agent: "productionManagerAgent", objective: "Buat SOP dan kontrol produksi", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["SOP Production Planning", "OEE Tracking"], constraints: ["Gunakan DOCUMENT_OUTPUT_SCHEMA"], acceptance_criteria: ["OEE terukur", "Production evidence ada"] },
  { task_id: "WP-QM-001", assigned_agent: "qualityManagerAgent", objective: "Buat SOP QC dan sistem kualitas", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["SOP Quality Control", "SPC Charts"], constraints: ["Gunakan DOCUMENT_OUTPUT_SCHEMA"], acceptance_criteria: ["Defect tracking ada", "Product release terkontrol"] },
  { task_id: "WP-HSE-001", assigned_agent: "hseManagerAgent", objective: "Buat SOP K3 dan Lingkungan", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["SOP K3", "Hazard Register"], constraints: ["Gunakan DOCUMENT_OUTPUT_SCHEMA"], acceptance_criteria: ["Hazard assessment ada", "Emergency response terdokumentasi"] },
  { task_id: "WP-ISO-001", assigned_agent: "isoComplianceAgent", objective: "Buat paket compliance ISO", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["Clause Matrix", "Audit Program"], constraints: ["Semua output audit-ready"], acceptance_criteria: ["Semua klausul ISO ter-mapping"] }
];

export function getManufacturingAgentById(id: string): AgentSpec | undefined {
  if (id === "isoManufacturingOrchestrator") return MANUFACTURING_ORCHESTRATOR;
  return MANUFACTURING_SPECIALISTS.find(a => a.id === id);
}
