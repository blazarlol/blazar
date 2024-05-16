import { getXataClient } from "../xata";
import { drizzle as drizzleTCP } from "drizzle-orm/node-postgres";
import { drizzle as drizzleHTTP } from "drizzle-orm/xata-http";
import { Client, Pool } from "pg";

// TODO: Create a single function to handle the different types of database connections whilst keeping the error handling consistent
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
  try {
    const xata = getXataClient();

    const pool = new Pool({
      connectionString: xata.sql.connectionString,
      max: 20,
    });

    const db = drizzleTCP(pool);

    return { xata, pool, db };
  } catch (error) {
    return { message: (error as Error).message };
  }
};
