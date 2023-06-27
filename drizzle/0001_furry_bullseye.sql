RENAME TABLE `account` TO `accounts`;--> statement-breakpoint
RENAME TABLE `session` TO `sessions`;--> statement-breakpoint
RENAME TABLE `user` TO `users`;--> statement-breakpoint
ALTER TABLE `verificationToken` MODIFY COLUMN `expires` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` MODIFY COLUMN `refresh_token` varchar(255);--> statement-breakpoint
ALTER TABLE `accounts` MODIFY COLUMN `access_token` varchar(255);--> statement-breakpoint
ALTER TABLE `accounts` MODIFY COLUMN `id_token` varchar(255);--> statement-breakpoint
ALTER TABLE `sessions` ADD PRIMARY KEY (`sessionToken`);--> statement-breakpoint
ALTER TABLE `sessions` MODIFY COLUMN `expires` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `emailVerified` timestamp;--> statement-breakpoint
ALTER TABLE `accounts` ADD `refresh_token_expires_in` int;--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `verificationToken` ADD PRIMARY KEY(`identifier`,`token`);--> statement-breakpoint
ALTER TABLE `accounts` ADD PRIMARY KEY(`provider`,`providerAccountId`);