import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const sessionTable = pgTable("session", {
  serial: serial("serial").notNull().unique().primaryKey(),
  id: text("id").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
