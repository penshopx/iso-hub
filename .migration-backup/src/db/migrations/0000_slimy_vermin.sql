CREATE TABLE `audit_findings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`audit_id` integer,
	`description` text NOT NULL,
	`category` text,
	`severity` text DEFAULT 'minor',
	`status` text DEFAULT 'open',
	`due_date` integer,
	`closed_at` integer,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `certificates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`participant_id` integer,
	`program_name` text NOT NULL,
	`participant_name` text NOT NULL,
	`issue_date` integer,
	`certificate_number` text,
	`status` text DEFAULT 'active'
);
--> statement-breakpoint
CREATE TABLE `certifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`standard` text NOT NULL,
	`certification_body` text,
	`certificate_number` text,
	`issue_date` integer,
	`expiry_date` integer,
	`status` text DEFAULT 'active',
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `corrective_actions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`finding_id` integer,
	`action` text NOT NULL,
	`responsible` text,
	`due_date` integer,
	`status` text DEFAULT 'pending',
	`completed_at` integer,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `environmental_aspects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`impact` text,
	`significance` text DEFAULT 'medium',
	`control` text,
	`status` text DEFAULT 'active',
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `environmental_monitoring` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`parameter` text NOT NULL,
	`value` real,
	`unit` text,
	`threshold` real,
	`location` text,
	`date` integer,
	`status` text DEFAULT 'normal'
);
--> statement-breakpoint
CREATE TABLE `external_audits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`certification_body` text NOT NULL,
	`scope` text,
	`date` integer,
	`type` text DEFAULT 'surveillance',
	`status` text DEFAULT 'scheduled',
	`result` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `generated_documents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`content` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `hazards` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`risk_level` text DEFAULT 'medium',
	`mitigation` text,
	`status` text DEFAULT 'active',
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `incidents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`severity` text DEFAULT 'minor',
	`location` text,
	`date` integer,
	`status` text DEFAULT 'open',
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `internal_audits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scope` text NOT NULL,
	`auditor` text,
	`date` integer,
	`status` text DEFAULT 'scheduled',
	`findings` integer DEFAULT 0,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `iso_documents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`category` text NOT NULL,
	`content` text,
	`status` text DEFAULT 'draft',
	`version` integer DEFAULT 1,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `participants` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`company` text,
	`phone` text,
	`training_id` integer,
	`status` text DEFAULT 'registered',
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `training_programs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`type` text,
	`date` integer,
	`location` text,
	`status` text DEFAULT 'scheduled',
	`created_at` integer
);
