CREATE TABLE `clubs` (
	`id` varchar(20) PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL,
	`picture` varchar(255) NOT NULL);
--> statement-breakpoint
CREATE TABLE `player_sources` (
	`id` varchar(20) PRIMARY KEY NOT NULL,
	`source` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` varchar(20) PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL,
	`short_name` varchar(255) NOT NULL,
	`birth_date` timestamp NOT NULL,
	`picture` varchar(255) NOT NULL,
	`club_id` varchar(20) NOT NULL);
