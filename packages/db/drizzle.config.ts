import { Config, defineConfig } from "drizzle-kit";

import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export default defineConfig({
  schema: "./lib/drizzle/*",
  out: "./.drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    schema: "public",
  },
}) satisfies Config;
