CREATE TABLE `bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`service_id` integer,
	`facilitator_id` integer,
	`client_name` text NOT NULL,
	`client_email` text NOT NULL,
	`client_phone` text,
	`company` text,
	`date` integer,
	`status` text DEFAULT 'pending',
	`notes` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `facilitators` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`photo` text,
	`bio` text,
	`location` text,
	`iso_certifications` text,
	`expertise` text,
	`experience` integer,
	`rate` integer,
	`rating` real DEFAULT 0,
	`review_count` integer DEFAULT 0,
	`availability` text DEFAULT 'available',
	`status` text DEFAULT 'active',
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `knowledge_articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text,
	`content` text,
	`category` text NOT NULL,
	`iso_standard` text,
	`tags` text,
	`author` text,
	`view_count` integer DEFAULT 0,
	`status` text DEFAULT 'published',
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`facilitator_id` integer,
	`booking_id` integer,
	`rating` integer NOT NULL,
	`comment` text,
	`client_name` text,
	`status` text DEFAULT 'published',
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`facilitator_id` integer,
	`name` text NOT NULL,
	`description` text,
	`category` text NOT NULL,
	`iso_standard` text,
	`price` integer,
	`duration` text,
	`location` text,
	`is_online` integer DEFAULT 0,
	`status` text DEFAULT 'active',
	`created_at` integer
);
