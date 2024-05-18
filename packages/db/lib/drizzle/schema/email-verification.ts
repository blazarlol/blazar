import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const emailVerificationTable = pgTable("email_verification", {
  serial: serial("serial").notNull().unique().primaryKey(),
  id: text("id").notNull().unique(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  tokenHash: text("token_hash").notNull().unique(),
  code: text("code").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
});
