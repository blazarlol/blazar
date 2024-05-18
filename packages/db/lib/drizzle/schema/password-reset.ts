import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const passwordResetTable = pgTable("password_reset", {
  serial: serial("serial").notNull().unique().primaryKey(),
  id: text("id").unique().notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  tokenHash: text("token_hash").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
});
