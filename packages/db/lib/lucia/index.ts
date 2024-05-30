import {
  type DatabaseUserAttributes,
  type DatabaseSessionAttributes,
  Lucia,
  TimeSpan,
} from "lucia";
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
        secure: Bun.env.NODE_ENV === "production",
      },
    },
    sessionExpiresIn: new TimeSpan(2, "w"),
    getUserAttributes: (attributes) => {
      return {
        id: attributes.id,
        emailVerified: attributes.emailVerified,
        onboardingComplete: attributes.onboardingComplete,
      };
    },
    getSessionAttributes: (attributes) => {
      return {};
    },
  });

  return lucia;
};

export const lucia = await initializeLucia();

declare module "lucia" {
  export interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
  }

  interface DatabaseUserAttributes {
    id: string;
    emailVerified: boolean;
    onboardingComplete: boolean;
  }

  interface DatabaseSessionAttributes {}
}

export { type DatabaseUserAttributes, type DatabaseSessionAttributes };
