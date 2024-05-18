import { Lucia, TimeSpan } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { establishDatabaseHTTPConnection } from "../../utils/actions/connection";
import { sessionTable } from "../drizzle/schema/session";
import { userTable } from "../drizzle/schema/user";

const initializeLucia = async () => {
  const { db } = await establishDatabaseHTTPConnection();

  const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

  const lucia = new Lucia(adapter, {
    sessionCookie: {
      attributes: {
        secure: process.env.NODE_ENV === "production",
      },
    },
    sessionExpiresIn: new TimeSpan(2, "w"),
  });

  return lucia;
};

export const lucia = await initializeLucia();

declare module "lucia" {
  export interface Register {
    Lucia: typeof lucia;
    // DatabaseSessionAttributes: DatabaseSessionAttributes;
  }

  // interface DatabaseSessionAttributes {
  //   country: string;
  // }

  // interface Session {
  //   uuid: string;
  // }
}
