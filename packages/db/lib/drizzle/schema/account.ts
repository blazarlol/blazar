import { serial, timestamp } from "drizzle-orm/pg-core";
import { pgTable, text } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const accountTable = pgTable("account", {
  serial: serial("serial").notNull().unique().primaryKey(),
  id: text("id").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  username: text("username").unique().notNull(),
  avatarUrl: text("avatar_url")
    .notNull()
    .default("https://www.gravatar.com/avatar/"),
});
