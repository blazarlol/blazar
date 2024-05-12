import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const emailVerificationTable = pgTable("email_verification", {
  token: text("token").primaryKey().notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  userId: text("user_id").notNull(),
  code: text("code").notNull(),
});
