import { timestamp } from "drizzle-orm/pg-core";
import { pgTable, text } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const accountTable = pgTable("account", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  username: text("username").unique().notNull(),
  avatarUrl: text("avatar_url")
    .notNull()
    .default("https://www.gravatar.com/avatar/"),
});
