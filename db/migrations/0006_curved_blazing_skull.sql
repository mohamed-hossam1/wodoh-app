ALTER TABLE "clients" ALTER COLUMN "portal_token" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "portal_token" SET DEFAULT gen_random_uuid();