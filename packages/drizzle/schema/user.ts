import { boolean, text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  email: text("email").unique().notNull(),
  emailVerified: boolean("email_verified").notNull().default(false),
  passwordHash: text("password_hash").notNull(),
});
