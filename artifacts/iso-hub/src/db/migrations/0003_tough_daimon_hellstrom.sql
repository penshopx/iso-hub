CREATE TABLE `activity_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`action` text NOT NULL,
	`entity` text,
	`entity_id` integer,
	`description` text,
	`ip_address` text,
	`user_agent` text,
	`metadata` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `api_keys` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`name` text NOT NULL,
	`key_hash` text NOT NULL,
	`prefix` text NOT NULL,
	`permissions` text,
	`rate_limit` integer DEFAULT 100,
	`expires_at` integer,
	`last_used` integer,
	`status` text DEFAULT 'active',
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `audit_programs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`year` integer NOT NULL,
	`type` text NOT NULL,
	`scope` text,
	`iso_standard` text,
	`status` text DEFAULT 'draft',
	`planned_audits` integer DEFAULT 0,
	`completed_audits` integer DEFAULT 0,
	`total_findings` integer DEFAULT 0,
	`open_findings` integer DEFAULT 0,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `audit_schedules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`program_id` integer,
	`code` text NOT NULL,
	`type` text NOT NULL,
	`scope` text NOT NULL,
	`department` text,
	`auditor_lead` text,
	`auditors` text,
	`audit_date` integer,
	`status` text DEFAULT 'scheduled',
	`findings` integer DEFAULT 0,
	`major_findings` integer DEFAULT 0,
	`minor_findings` integer DEFAULT 0,
	`observations` integer DEFAULT 0,
	`report_url` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `calibration_equipment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`manufacturer` text,
	`model` text,
	`serial_number` text,
	`location` text,
	`range` text,
	`accuracy` text,
	`calibration_frequency` text,
	`last_calibration` integer,
	`next_calibration` integer,
	`calibration_result` text,
	`certificate_number` text,
	`calibration_lab` text,
	`traceability` text,
	`status` text DEFAULT 'active',
	`notes` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `change_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`type` text NOT NULL,
	`scope` text,
	`impact` text DEFAULT 'low',
	`category` text,
	`status` text DEFAULT 'draft',
	`requestor_id` integer,
	`requestor_name` text,
	`requestor_dept` text,
	`reviewer_id` integer,
	`reviewer_name` text,
	`reviewer_notes` text,
	`approver_id` integer,
	`approver_name` text,
	`approval_notes` text,
	`approval_date` integer,
	`implementation_date` integer,
	`closed_date` integer,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `compliance_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`type` text NOT NULL,
	`iso_standard` text,
	`department` text,
	`event_date` integer NOT NULL,
	`reminder_days` integer DEFAULT 7,
	`recurrence` text,
	`status` text DEFAULT 'scheduled',
	`assignee_id` integer,
	`assignee_name` text,
	`notes` text,
	`completed_at` integer,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `kpi_data` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`kpi_id` integer NOT NULL,
	`period` text NOT NULL,
	`value` real,
	`notes` text,
	`recorded_by` integer,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `kpis` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`category` text NOT NULL,
	`unit` text,
	`target` real,
	`target_frequency` text DEFAULT 'monthly',
	`weight` real DEFAULT 1,
	`direction` text DEFAULT 'higher_better',
	`department` text,
	`owner` text,
	`formula` text,
	`data_source` text,
	`status` text DEFAULT 'active',
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`message` text,
	`type` text DEFAULT 'info',
	`is_read` integer DEFAULT 0,
	`link` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `opc_agent_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`agent_type` text NOT NULL,
	`total_tasks` integer DEFAULT 0,
	`success_tasks` integer DEFAULT 0,
	`failed_tasks` integer DEFAULT 0,
	`avg_execution_time` real DEFAULT 0,
	`last_run_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `opc_task_steps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`task_id` integer NOT NULL,
	`step_order` integer NOT NULL,
	`agent_type` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'pending',
	`input` text,
	`output` text,
	`error` text,
	`started_at` integer,
	`completed_at` integer,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `opc_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`agent_type` text NOT NULL,
	`status` text DEFAULT 'pending',
	`priority` text DEFAULT 'normal',
	`input` text,
	`output` text,
	`error` text,
	`execution_time` integer,
	`started_at` integer,
	`completed_at` integer,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `opc_tasks_code_unique` ON `opc_tasks` (`code`);--> statement-breakpoint
CREATE TABLE `organizations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`type` text,
	`industry` text,
	`address` text,
	`city` text,
	`country` text DEFAULT 'Indonesia',
	`phone` text,
	`email` text,
	`website` text,
	`logo` text,
	`status` text DEFAULT 'active',
	`plan` text DEFAULT 'free',
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `organizations_code_unique` ON `organizations` (`code`);--> statement-breakpoint
CREATE TABLE `risks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`category` text NOT NULL,
	`probability` integer DEFAULT 1,
	`impact` integer DEFAULT 1,
	`risk_level` text,
	`owner` text,
	`status` text DEFAULT 'open',
	`mitigation` text,
	`due_date` integer,
	`closed_at` integer,
	`created_by` integer,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `user_organizations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`organization_id` integer NOT NULL,
	`role` text DEFAULT 'member',
	`is_default` integer DEFAULT 0,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`name` text NOT NULL,
	`role` text DEFAULT 'user',
	`department` text,
	`avatar` text,
	`phone` text,
	`status` text DEFAULT 'active',
	`last_login` integer,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `vendors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`address` text,
	`city` text,
	`country` text DEFAULT 'Indonesia',
	`phone` text,
	`email` text,
	`website` text,
	`contact_person` text,
	`rating` real DEFAULT 0,
	`risk_category` text DEFAULT 'low',
	`status` text DEFAULT 'pending',
	`certifications` text,
	`last_audit` integer,
	`next_audit` integer,
	`annual_spend` real,
	`notes` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `webhooks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`url` text NOT NULL,
	`events` text NOT NULL,
	`secret` text,
	`is_active` integer DEFAULT 1,
	`last_triggered` integer,
	`failure_count` integer DEFAULT 0,
	`created_at` integer
);
