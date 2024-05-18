import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { XataHttpDatabase } from "drizzle-orm/xata-http";

export type HTTPDatabase = XataHttpDatabase<Record<string, never>>;
export type NodePostgresDatabase = NodePgDatabase<Record<string, never>>;

export type Database = HTTPDatabase | NodePostgresDatabase;
