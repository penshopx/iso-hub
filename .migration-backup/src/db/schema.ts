import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: text("role").default("user"),
  department: text("department"),
  avatar: text("avatar"),
  phone: text("phone"),
  status: text("status").default("active"),
  lastLogin: integer("last_login", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const organizations = sqliteTable("organizations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  type: text("type"),
  industry: text("industry"),
  address: text("address"),
  city: text("city"),
  country: text("country").default("Indonesia"),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  logo: text("logo"),
  status: text("status").default("active"),
  plan: text("plan").default("free"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const userOrganizations = sqliteTable("user_organizations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  organizationId: integer("organization_id").notNull(),
  role: text("role").default("member"),
  isDefault: integer("is_default").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const isoDocuments = sqliteTable("iso_documents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  type: text("type").notNull(),
  category: text("category").notNull(),
  content: text("content"),
  status: text("status").default("draft"),
  version: integer("version").default(1),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const hazards = sqliteTable("hazards", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  riskLevel: text("risk_level").default("medium"),
  mitigation: text("mitigation"),
  status: text("status").default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const incidents = sqliteTable("incidents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  severity: text("severity").default("minor"),
  location: text("location"),
  date: integer("date", { mode: "timestamp" }),
  status: text("status").default("open"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const environmentalAspects = sqliteTable("environmental_aspects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  impact: text("impact"),
  significance: text("significance").default("medium"),
  control: text("control"),
  status: text("status").default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const environmentalMonitoring = sqliteTable("environmental_monitoring", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  parameter: text("parameter").notNull(),
  value: real("value"),
  unit: text("unit"),
  threshold: real("threshold"),
  location: text("location"),
  date: integer("date", { mode: "timestamp" }).$defaultFn(() => new Date()),
  status: text("status").default("normal"),
});

export const trainingPrograms = sqliteTable("training_programs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type"),
  date: integer("date", { mode: "timestamp" }),
  location: text("location"),
  status: text("status").default("scheduled"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const participants = sqliteTable("participants", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
  company: text("company"),
  phone: text("phone"),
  trainingId: integer("training_id"),
  status: text("status").default("registered"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const certificates = sqliteTable("certificates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  participantId: integer("participant_id"),
  programName: text("program_name").notNull(),
  participantName: text("participant_name").notNull(),
  issueDate: integer("issue_date", { mode: "timestamp" }).$defaultFn(() => new Date()),
  certificateNumber: text("certificate_number"),
  status: text("status").default("active"),
});

export const internalAudits = sqliteTable("internal_audits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  scope: text("scope").notNull(),
  auditor: text("auditor"),
  date: integer("date", { mode: "timestamp" }),
  status: text("status").default("scheduled"),
  findings: integer("findings").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const auditFindings = sqliteTable("audit_findings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  auditId: integer("audit_id"),
  description: text("description").notNull(),
  category: text("category"),
  severity: text("severity").default("minor"),
  status: text("status").default("open"),
  dueDate: integer("due_date", { mode: "timestamp" }),
  closedAt: integer("closed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const correctiveActions = sqliteTable("corrective_actions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  findingId: integer("finding_id"),
  action: text("action").notNull(),
  responsible: text("responsible"),
  dueDate: integer("due_date", { mode: "timestamp" }),
  status: text("status").default("pending"),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const externalAudits = sqliteTable("external_audits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  certificationBody: text("certification_body").notNull(),
  scope: text("scope"),
  date: integer("date", { mode: "timestamp" }),
  type: text("type").default("surveillance"),
  status: text("status").default("scheduled"),
  result: text("result"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const certifications = sqliteTable("certifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  standard: text("standard").notNull(),
  certificationBody: text("certification_body"),
  certificateNumber: text("certificate_number"),
  issueDate: integer("issue_date", { mode: "timestamp" }),
  expiryDate: integer("expiry_date", { mode: "timestamp" }),
  status: text("status").default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const generatedDocuments = sqliteTable("generated_documents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  type: text("type").notNull(),
  content: text("content"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const consultingProjects = sqliteTable("consulting_projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  client: text("client").notNull(),
  isoStandard: text("iso_standard").notNull(),
  description: text("description"),
  startDate: integer("start_date", { mode: "timestamp" }),
  endDate: integer("end_date", { mode: "timestamp" }),
  status: text("status").default("planning"),
  progress: integer("progress").default(0),
  consultant: text("consultant"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const projectTasks = sqliteTable("project_tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id"),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category"),
  status: text("status").default("pending"),
  priority: text("priority").default("medium"),
  dueDate: integer("due_date", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const projectMilestones = sqliteTable("project_milestones", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id"),
  name: text("name").notNull(),
  description: text("description"),
  targetDate: integer("target_date", { mode: "timestamp" }),
  status: text("status").default("pending"),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const documentWorkflow = sqliteTable("document_workflow", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  documentId: integer("document_id"),
  title: text("title").notNull(),
  type: text("type").notNull(),
  isoStandard: text("iso_standard"),
  version: integer("version").default(1),
  status: text("status").default("draft"),
  workflowStage: text("workflow_stage").default("draft"),
  reviewer: text("reviewer"),
  approver: text("approver"),
  content: text("content"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const certificationRoadmap = sqliteTable("certification_roadmap", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clientName: text("client_name").notNull(),
  isoStandard: text("iso_standard").notNull(),
  currentStage: text("current_stage").default("gap_analysis"),
  targetCertificationDate: integer("target_certification_date", { mode: "timestamp" }),
  status: text("status").default("in_progress"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const gapAnalysis = sqliteTable("gap_analysis", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roadmapId: integer("roadmap_id"),
  clause: text("clause").notNull(),
  requirement: text("requirement").notNull(),
  currentStatus: text("current_status").default("not_applicable"),
  complianceLevel: text("compliance_level").default("0"),
  actionNeeded: text("action_needed"),
  priority: text("priority").default("medium"),
  status: text("status").default("open"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const readinessChecklist = sqliteTable("readiness_checklist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roadmapId: integer("roadmap_id"),
  item: text("item").notNull(),
  category: text("category"),
  status: text("status").default("pending"),
  notes: text("notes"),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const facilitators = sqliteTable("facilitators", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  photo: text("photo"),
  bio: text("bio"),
  location: text("location"),
  isoCertifications: text("iso_certifications"),
  expertise: text("expertise"),
  experience: integer("experience"),
  rate: integer("rate"),
  rating: real("rating").default(0),
  reviewCount: integer("review_count").default(0),
  availability: text("availability").default("available"),
  status: text("status").default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const services = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  facilitatorId: integer("facilitator_id"),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  isoStandard: text("iso_standard"),
  price: integer("price"),
  duration: text("duration"),
  location: text("location"),
  isOnline: integer("is_online").default(0),
  status: text("status").default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  serviceId: integer("service_id"),
  facilitatorId: integer("facilitator_id"),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientPhone: text("client_phone"),
  company: text("company"),
  date: integer("date", { mode: "timestamp" }),
  status: text("status").default("pending"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const knowledgeArticles = sqliteTable("knowledge_articles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  category: text("category").notNull(),
  isoStandard: text("iso_standard"),
  tags: text("tags"),
  author: text("author"),
  viewCount: integer("view_count").default(0),
  status: text("status").default("published"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  facilitatorId: integer("facilitator_id"),
  bookingId: integer("booking_id"),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  clientName: text("client_name"),
  status: text("status").default("published"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Risk Management (ISO 31000)
export const risks = sqliteTable("risks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  probability: integer("probability").default(1),
  impact: integer("impact").default(1),
  riskLevel: text("risk_level"),
  owner: text("owner"),
  status: text("status").default("open"),
  mitigation: text("mitigation"),
  dueDate: integer("due_date", { mode: "timestamp" }),
  closedAt: integer("closed_at", { mode: "timestamp" }),
  createdBy: integer("created_by"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Vendor Management (ISO 28000)
export const vendors = sqliteTable("vendors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  address: text("address"),
  city: text("city"),
  country: text("country").default("Indonesia"),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  contactPerson: text("contact_person"),
  rating: real("rating").default(0),
  riskCategory: text("risk_category").default("low"),
  status: text("status").default("pending"),
  certifications: text("certifications"),
  lastAudit: integer("last_audit", { mode: "timestamp" }),
  nextAudit: integer("next_audit", { mode: "timestamp" }),
  annualSpend: real("annual_spend"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Calibration Equipment (ISO 10012)
export const calibrationEquipment = sqliteTable("calibration_equipment", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  manufacturer: text("manufacturer"),
  model: text("model"),
  serialNumber: text("serial_number"),
  location: text("location"),
  range: text("range"),
  accuracy: text("accuracy"),
  calibrationFrequency: text("calibration_frequency"),
  lastCalibration: integer("last_calibration", { mode: "timestamp" }),
  nextCalibration: integer("next_calibration", { mode: "timestamp" }),
  calibrationResult: text("calibration_result"),
  certificateNumber: text("certificate_number"),
  calibrationLab: text("calibration_lab"),
  traceability: text("traceability"),
  status: text("status").default("active"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Change Management
export const changeRequests = sqliteTable("change_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  scope: text("scope"),
  impact: text("impact").default("low"),
  category: text("category"),
  status: text("status").default("draft"),
  requestorId: integer("requestor_id"),
  requestorName: text("requestor_name"),
  requestorDept: text("requestor_dept"),
  reviewerId: integer("reviewer_id"),
  reviewerName: text("reviewer_name"),
  reviewerNotes: text("reviewer_notes"),
  approverId: integer("approver_id"),
  approverName: text("approver_name"),
  approvalNotes: text("approval_notes"),
  approvalDate: integer("approval_date", { mode: "timestamp" }),
  implementationDate: integer("implementation_date", { mode: "timestamp" }),
  closedDate: integer("closed_date", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// KPI Management
export const kpis = sqliteTable("kpis", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  unit: text("unit"),
  target: real("target"),
  targetFrequency: text("target_frequency").default("monthly"),
  weight: real("weight").default(1),
  direction: text("direction").default("higher_better"),
  department: text("department"),
  owner: text("owner"),
  formula: text("formula"),
  dataSource: text("data_source"),
  status: text("status").default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const kpiData = sqliteTable("kpi_data", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  kpiId: integer("kpi_id").notNull(),
  period: text("period").notNull(),
  value: real("value"),
  notes: text("notes"),
  recordedBy: integer("recorded_by"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Compliance Calendar
export const complianceEvents = sqliteTable("compliance_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  isoStandard: text("iso_standard"),
  department: text("department"),
  eventDate: integer("event_date", { mode: "timestamp" }).notNull(),
  reminderDays: integer("reminder_days").default(7),
  recurrence: text("recurrence"),
  status: text("status").default("scheduled"),
  assigneeId: integer("assignee_id"),
  assigneeName: text("assignee_name"),
  notes: text("notes"),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Audit Program
export const auditPrograms = sqliteTable("audit_programs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull(),
  name: text("name").notNull(),
  year: integer("year").notNull(),
  type: text("type").notNull(),
  scope: text("scope"),
  isoStandard: text("iso_standard"),
  status: text("status").default("draft"),
  plannedAudits: integer("planned_audits").default(0),
  completedAudits: integer("completed_audits").default(0),
  totalFindings: integer("total_findings").default(0),
  openFindings: integer("open_findings").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const auditSchedules = sqliteTable("audit_schedules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  programId: integer("program_id"),
  code: text("code").notNull(),
  type: text("type").notNull(),
  scope: text("scope").notNull(),
  department: text("department"),
  auditorLead: text("auditor_lead"),
  auditors: text("auditors"),
  auditDate: integer("audit_date", { mode: "timestamp" }),
  status: text("status").default("scheduled"),
  findings: integer("findings").default(0),
  majorFindings: integer("major_findings").default(0),
  minorFindings: integer("minor_findings").default(0),
  observations: integer("observations").default(0),
  reportUrl: text("report_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// API Keys for external integrations
export const apiKeys = sqliteTable("api_keys", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  keyHash: text("key_hash").notNull(),
  prefix: text("prefix").notNull(),
  permissions: text("permissions"),
  rateLimit: integer("rate_limit").default(100),
  expiresAt: integer("expires_at", { mode: "timestamp" }),
  lastUsed: integer("last_used", { mode: "timestamp" }),
  status: text("status").default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Webhooks
export const webhooks = sqliteTable("webhooks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  url: text("url").notNull(),
  events: text("events").notNull(),
  secret: text("secret"),
  isActive: integer("is_active").default(1),
  lastTriggered: integer("last_triggered", { mode: "timestamp" }),
  failureCount: integer("failure_count").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Activity Logs
export const activityLogs = sqliteTable("activity_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id"),
  action: text("action").notNull(),
  entity: text("entity"),
  entityId: integer("entity_id"),
  description: text("description"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  metadata: text("metadata"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Notifications
export const notifications = sqliteTable("notifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  message: text("message"),
  type: text("type").default("info"),
  isRead: integer("is_read").default(0),
  link: text("link"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// OPC CLAW - Task Management
export const opcTasks = sqliteTable("opc_tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  agentType: text("agent_type").notNull(),
  status: text("status").default("pending"),
  priority: text("priority").default("normal"),
  input: text("input"),
  output: text("output"),
  error: text("error"),
  executionTime: integer("execution_time"),
  startedAt: integer("started_at", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// OPC CLAW - Task Steps (for complex multi-agent tasks)
export const opcTaskSteps = sqliteTable("opc_task_steps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  taskId: integer("task_id").notNull(),
  stepOrder: integer("step_order").notNull(),
  agentType: text("agent_type").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").default("pending"),
  input: text("input"),
  output: text("output"),
  error: text("error"),
  startedAt: integer("started_at", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// OPC CLAW - Agent Statistics
export const opcAgentStats = sqliteTable("opc_agent_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  agentType: text("agent_type").notNull(),
  totalTasks: integer("total_tasks").default(0),
  successTasks: integer("success_tasks").default(0),
  failedTasks: integer("failed_tasks").default(0),
  avgExecutionTime: real("avg_execution_time").default(0),
  lastRunAt: integer("last_run_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Export type definitions for all tables
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Organization = typeof organizations.$inferSelect;
export type Risk = typeof risks.$inferSelect;
export type Vendor = typeof vendors.$inferSelect;
export type CalibrationEquipment = typeof calibrationEquipment.$inferSelect;
export type ChangeRequest = typeof changeRequests.$inferSelect;
export type Kpi = typeof kpis.$inferSelect;
export type KpiData = typeof kpiData.$inferSelect;
export type ComplianceEvent = typeof complianceEvents.$inferSelect;
export type AuditProgram = typeof auditPrograms.$inferSelect;
export type AuditSchedule = typeof auditSchedules.$inferSelect;
export type ApiKey = typeof apiKeys.$inferSelect;
export type Webhook = typeof webhooks.$inferSelect;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type OpcTask = typeof opcTasks.$inferSelect;
export type OpcTaskStep = typeof opcTaskSteps.$inferSelect;
export type OpcAgentStat = typeof opcAgentStats.$inferSelect;
