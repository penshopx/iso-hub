import { AgentSpec, TaskBrief } from "./types";

export const IT_STATE_SCHEMA = {
  org_profile: {
    company_name: "NEED_CONFIRMATION",
    industry: "it",
    it_services: "NEED_CONFIRMATION",
    employees: "NEED_CONFIRMATION",
    infrastructure: "NEED_CONFIRMATION",
    systems: { ticketing: "NEED_CONFIRMATION", monitoring: "NEED_CONFIRMATION", iam: "NEED_CONFIRMATION" }
  },
  iso_scope: {
    standards: ["ISO9001", "ISO27001", "ISO20000"],
    scope_statement: "NEED_CONFIRMATION",
    boundaries: "IT services and operations",
    exclusions: []
  },
  process_map: { core_processes: [], support_processes: [], outsourced_processes: [] },
  doc_control: { doc_coding_rule: "IT-<AREA>-<TYPE>-<NNN>", versioning_rule: "vMajor.Minor", retention_rule: "NEED_CONFIRMATION", doc_register: [] },
  risk_register: [], kpi_register: [],
  outputs: { policies: [], sops: [], work_instructions: [], forms_logs_templates: [], audit_program: [], capa: [], management_review: [] },
  open_items: []
};

export const IT_ORCHESTRATOR: AgentSpec = {
  id: "isoITOrchestrator",
  name: "ISO IT Orchestrator",
  role: "Orchestrator",
  industry: "it",
  system_prompt: `Kamu adalah \`isoITOrchestrator\`. Pimpin pembangunan ISO IT Management System dengan fokus ISO 9001, ISO 27001 (cybersecurity), ISO 20000 (IT service management).`,
  deliverables: ["IT Process Map", "Document Register", "ISO 27001 ISMS", "ITIL-aligned SOPs"],
  dependencies: []
};

export const IT_SPECIALISTS: AgentSpec[] = [
  {
    id: "securityManagerAgent",
    name: "Security Manager Agent",
    role: "Security Manager",
    industry: "it",
    system_prompt: `Fokus: ISO 27001, information security, access control, incident response. Deliverables: ISMS SOP, Access Control, Incident Response, Vulnerability Management.`,
    deliverables: ["ISMS SOP", "Access Control", "Incident Response", "Vulnerability Management"],
    dependencies: ["isoITOrchestrator"]
  },
  {
    id: "serviceDeskAgent",
    name: "Service Desk Agent",
    role: "Service Desk Manager",
    industry: "it",
    system_prompt: `Fokus: helpdesk, incident management, service request, SLA monitoring. Deliverables: Helpdesk SOP, Incident Management, Request Fulfillment, SLA Dashboard.`,
    deliverables: ["Helpdesk SOP", "Incident Management", "Request Fulfillment", "SLA Dashboard"],
    dependencies: ["isoITOrchestrator"]
  },
  {
    id: "networkAdminAgent",
    name: "Network Admin Agent",
    role: "Network Administrator",
    industry: "it",
    system_prompt: `Fokus: network operations, connectivity, firewall, monitoring. Deliverables: Network SOP, Firewall Control, Network Monitoring, Change Management.`,
    deliverables: ["Network SOP", "Firewall Control", "Monitoring", "Change Management"],
    dependencies: ["isoITOrchestrator"]
  },
  {
    id: "systemAdminAgent",
    name: "System Admin Agent",
    role: "System Administrator",
    industry: "it",
    system_prompt: `Fokus: server management, virtualization, backup, recovery. Deliverables: Server SOP, Backup Policy, Recovery Procedures, Patch Management.`,
    deliverables: ["Server SOP", "Backup Policy", "Recovery Procedures", "Patch Management"],
    dependencies: ["isoITOrchestrator"]
  },
  {
    id: "devOpsAgent",
    name: "DevOps Agent",
    role: "DevOps Manager",
    industry: "it",
    system_prompt: `Fokus: CI/CD, deployment, infrastructure as code, monitoring. Deliverables: CI/CD SOP, Deployment Process, IaC Guidelines, App Monitoring.`,
    deliverables: ["CI/CD SOP", "Deployment Process", "IaC Guidelines", "App Monitoring"],
    dependencies: ["isoITOrchestrator"]
  },
  {
    id: "dataManagerAgent",
    name: "Data Manager Agent",
    role: "Data Manager",
    industry: "it",
    system_prompt: `Fokus: data governance, data quality, backup, retention. Deliverables: Data Governance SOP, Data Quality, Backup Strategy, Retention Policy.`,
    deliverables: ["Data Governance", "Data Quality", "Backup Strategy", "Retention Policy"],
    dependencies: ["isoITOrchestrator"]
  },
  {
    id: "changeManagerAgent",
    name: "Change Manager Agent",
    role: "Change Manager",
    industry: "it",
    system_prompt: `Fokus: change management, CAB, release management, rollback. Deliverables: Change SOP, CAB Process, Release Management, Rollback Procedures.`,
    deliverables: ["Change SOP", "CAB Process", "Release Management", "Rollback Procedures"],
    dependencies: ["isoITOrchestrator"]
  },
  {
    id: "complianceItAgent",
    name: "Compliance IT Agent",
    role: "IT Compliance",
    industry: "it",
    system_prompt: `Fokus: audit, compliance, risk assessment, policy enforcement. Deliverables: Audit SOP, Compliance Checklist, Risk Assessment, Policy Enforcement.`,
    deliverables: ["Audit SOP", "Compliance Checklist", "Risk Assessment", "Policy Enforcement"],
    dependencies: ["isoITOrchestrator"]
  }
];

export const IT_TASK_BRIEFS: TaskBrief[] = [
  { task_id: "WP-IT-SEC-001", assigned_agent: "securityManagerAgent", objective: "Buat ISO 27001 ISMS", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["ISMS SOP", "Incident Response"], constraints: ["ISO 27001 mandatory"], acceptance_criteria: ["Security controls terdokumentasi"] },
  { task_id: "WP-IT-SD-001", assigned_agent: "serviceDeskAgent", objective: "Buat service desk system", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["Helpdesk SOP", "SLA Dashboard"], constraints: ["ITIL alignment"], acceptance_criteria: ["SLA monitoring ada"] },
  { task_id: "WP-IT-CHG-001", assigned_agent: "changeManagerAgent", objective: "Buat change management", inputs_from_state: ["org_profile", "iso_scope"], deliverables: ["Change SOP", "CAB Process"], constraints: ["Minimal downtime"], acceptance_criteria: ["Rollback procedures ada"] }
];

export function getITAgentById(id: string): AgentSpec | undefined {
  if (id === "isoITOrchestrator") return IT_ORCHESTRATOR;
  return IT_SPECIALISTS.find(a => a.id === id);
}
