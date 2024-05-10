import { Config, defineConfig } from "drizzle-kit";

import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/lib/drizzle/schema.ts",
  out: "./.drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    schema: "public",
  },
}) satisfies Config;
