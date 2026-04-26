CREATE TABLE `certification_roadmap` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`client_name` text NOT NULL,
	`iso_standard` text NOT NULL,
	`current_stage` text DEFAULT 'gap_analysis',
	`target_certification_date` integer,
	`status` text DEFAULT 'in_progress',
	`notes` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `consulting_projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`client` text NOT NULL,
	`iso_standard` text NOT NULL,
	`description` text,
	`start_date` integer,
	`end_date` integer,
	`status` text DEFAULT 'planning',
	`progress` integer DEFAULT 0,
	`consultant` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `document_workflow` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`document_id` integer,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`iso_standard` text,
	`version` integer DEFAULT 1,
	`status` text DEFAULT 'draft',
	`workflow_stage` text DEFAULT 'draft',
	`reviewer` text,
	`approver` text,
	`content` text,
	`notes` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `gap_analysis` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`roadmap_id` integer,
	`clause` text NOT NULL,
	`requirement` text NOT NULL,
	`current_status` text DEFAULT 'not_applicable',
	`compliance_level` text DEFAULT '0',
	`action_needed` text,
	`priority` text DEFAULT 'medium',
	`status` text DEFAULT 'open',
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `project_milestones` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer,
	`name` text NOT NULL,
	`description` text,
	`target_date` integer,
	`status` text DEFAULT 'pending',
	`completed_at` integer,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `project_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer,
	`name` text NOT NULL,
	`description` text,
	`category` text,
	`status` text DEFAULT 'pending',
	`priority` text DEFAULT 'medium',
	`due_date` integer,
	`completed_at` integer,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `readiness_checklist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`roadmap_id` integer,
	`item` text NOT NULL,
	`category` text,
	`status` text DEFAULT 'pending',
	`notes` text,
	`completed_at` integer,
	`created_at` integer
);
