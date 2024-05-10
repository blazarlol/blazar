import { getXataClient } from "../xata";
import { drizzle as drizzleTCP } from "drizzle-orm/node-postgres";
import { drizzle as drizzleHTTP } from "drizzle-orm/xata-http";
import { Client, Pool } from "pg";

export const establishDatabaseHTTPConnection = async () => {
  const xata = getXataClient();
  const db = drizzleHTTP(xata);

  return { xata, db };
};

export const establishDatabaseTCPConnection = async () => {
  const xata = getXataClient();
  const client = new Client({ connectionString: xata.sql.connectionString });
  const db = drizzleTCP(client);

  return { xata, client, db };
};

export const establishDatabasePoolConnection = async () => {
  const xata = getXataClient();
  const pool = new Pool({
    connectionString: xata.sql.connectionString,
    max: 20,
  });

  const db = drizzleTCP(pool);

  return { xata, pool, db };
};
