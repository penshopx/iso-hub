import { pgTable, text, integer, real, serial, boolean, timestamp } from "drizzle-orm/pg-core";
export * from "./auth";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: text("role").default("user"),
  department: text("department"),
  avatar: text("avatar"),
  phone: text("phone"),
  status: text("status").default("active"),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const isoDocuments = pgTable("iso_documents", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  title: text("title").notNull(),
  type: text("type").notNull(),
  category: text("category").notNull(),
  isoStandard: text("iso_standard"),
  content: text("content"),
  status: text("status").default("draft"),
  version: integer("version").default(1),
  reviewer: text("reviewer"),
  approver: text("approver"),
  reviewDueDate: timestamp("review_due_date"),
  reviewedAt: timestamp("reviewed_at"),
  approvedAt: timestamp("approved_at"),
  distributedAt: timestamp("distributed_at"),
  changeSummary: text("change_summary"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const documentRevisions = pgTable("document_revisions", {
  id: serial("id").primaryKey(),
  documentId: integer("document_id").notNull().references(() => isoDocuments.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(),
  version: integer("version").notNull(),
  status: text("status").notNull(),
  changedBy: text("changed_by"),
  changeSummary: text("change_summary"),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const hazards = pgTable("hazards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  riskLevel: text("risk_level").default("medium"),
  mitigation: text("mitigation"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const incidents = pgTable("incidents", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  title: text("title").notNull(),
  description: text("description"),
  severity: text("severity").default("minor"),
  location: text("location"),
  date: timestamp("date"),
  status: text("status").default("open"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const trainingPrograms = pgTable("training_programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type"),
  date: timestamp("date"),
  location: text("location"),
  status: text("status").default("scheduled"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const internalAudits = pgTable("internal_audits", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  scope: text("scope").notNull(),
  auditor: text("auditor"),
  date: timestamp("date"),
  status: text("status").default("scheduled"),
  findings: integer("findings").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const auditFindings = pgTable("audit_findings", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  auditId: integer("audit_id"),
  description: text("description").notNull(),
  category: text("category"),
  standard: text("standard"),
  context: text("context"),
  severity: text("severity").default("minor"),
  status: text("status").default("open"),
  dueDate: timestamp("due_date"),
  closedAt: timestamp("closed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const correctiveActions = pgTable("corrective_actions", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  findingId: integer("finding_id"),
  sourceType: text("source_type"),
  sourceId: text("source_id"),
  action: text("action").notNull(),
  responsible: text("responsible"),
  dueDate: timestamp("due_date"),
  status: text("status").default("pending"),
  evidence: text("evidence"),
  effectivenessCheck: text("effectiveness_check"),
  effectivenessStatus: text("effectiveness_status").default("pending"),
  verifiedAt: timestamp("verified_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const externalAudits = pgTable("external_audits", {
  id: serial("id").primaryKey(),
  certificationBody: text("certification_body").notNull(),
  scope: text("scope"),
  date: timestamp("date"),
  type: text("type").default("surveillance"),
  status: text("status").default("scheduled"),
  result: text("result"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  standard: text("standard").notNull(),
  certificationBody: text("certification_body"),
  certificateNumber: text("certificate_number"),
  issueDate: timestamp("issue_date"),
  expiryDate: timestamp("expiry_date"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const generatedDocuments = pgTable("generated_documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const consultingProjects = pgTable("consulting_projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  client: text("client").notNull(),
  isoStandard: text("iso_standard").notNull(),
  description: text("description"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  status: text("status").default("active"),
  budget: real("budget"),
  progress: integer("progress").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const facilitators = pgTable("facilitators", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  expertise: text("expertise"),
  company: text("company"),
  location: text("location"),
  rating: real("rating").default(0),
  totalReviews: integer("total_reviews").default(0),
  status: text("status").default("active"),
  bio: text("bio"),
  certifications: text("certifications"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category"),
  price: real("price"),
  duration: text("duration"),
  facilitatorId: integer("facilitator_id"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id"),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email"),
  scheduledDate: timestamp("scheduled_date"),
  status: text("status").default("pending"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const knowledgeArticles = pgTable("knowledge_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  category: text("category"),
  isoStandard: text("iso_standard"),
  author: text("author"),
  status: text("status").default("published"),
  views: integer("views").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const risks = pgTable("risks", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  code: text("code"),
  name: text("name").notNull(),
  description: text("description"),
  context: text("context"),
  standard: text("standard"),
  category: text("category"),
  probability: integer("probability"),
  impact: integer("impact"),
  riskLevel: text("risk_level"),
  controls: text("controls"),
  owner: text("owner"),
  status: text("status").default("open"),
  mitigation: text("mitigation"),
  dueDate: timestamp("due_date"),
  residualProbability: integer("residual_probability"),
  residualImpact: integer("residual_impact"),
  residualRiskLevel: text("residual_risk_level"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const vendors = pgTable("vendors", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  code: text("code"),
  name: text("name").notNull(),
  category: text("category"),
  contactPerson: text("contact_person"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  status: text("status").default("active"),
  rating: real("rating"),
  certifications: text("certifications"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const opcTasks = pgTable("opc_tasks", {
  id: serial("id").primaryKey(),
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
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const documentWorkflow = pgTable("document_workflow", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type"),
  category: text("category"),
  status: text("status").default("draft"),
  version: integer("version").default(1),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const certificationRoadmap = pgTable("certification_roadmap", {
  id: serial("id").primaryKey(),
  standard: text("standard").notNull(),
  phase: text("phase"),
  description: text("description"),
  status: text("status").default("pending"),
  targetDate: timestamp("target_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const gapAnalysis = pgTable("gap_analysis", {
  id: serial("id").primaryKey(),
  standard: text("standard").notNull(),
  clause: text("clause"),
  requirement: text("requirement"),
  currentState: text("current_state"),
  gap: text("gap"),
  action: text("action"),
  status: text("status").default("open"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  action: text("action").notNull(),
  entity: text("entity"),
  entityId: integer("entity_id"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const kpis = pgTable("kpis", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  code: text("code").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  unit: text("unit"),
  target: real("target").notNull(),
  direction: text("direction").default("higher_better"),
  owner: text("owner"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const kpiMeasurements = pgTable("kpi_measurements", {
  id: serial("id").primaryKey(),
  kpiId: integer("kpi_id").notNull().references(() => kpis.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(),
  period: text("period").notNull(),
  actual: real("actual").notNull(),
  notes: text("notes"),
  recordedBy: text("recorded_by"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const managementReviews = pgTable("management_reviews", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  period: text("period"),
  status: text("status").default("planned"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type Risk = typeof risks.$inferSelect;
export type Vendor = typeof vendors.$inferSelect;
export type Facilitator = typeof facilitators.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type OpcTask = typeof opcTasks.$inferSelect;
