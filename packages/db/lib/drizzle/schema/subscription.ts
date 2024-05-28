import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const subscriptionTable = pgTable("subscription", {
  id: text("id").notNull().unique(),
  serial: serial("serial").notNull().unique().primaryKey(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  }),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  // Null for free
  status: text("status").notNull(),
  billing: text("billing"),
  startDate: timestamp("start_date", { mode: "date", withTimezone: true }),
  endDate: timestamp("end_date", { mode: "date", withTimezone: true }),
  autoRenewal: boolean("auto_renewal"),
});
