import {
  createSession,
  establishDatabasePoolConnection,
  validateUser,
} from "@blazar/db";
import Elysia, { t } from "elysia";

export const signIn = new Elysia().post(
  "/signin",
  async ({ body }) => {
    const { email, password } = body as { email: string; password: string };

    try {
      const { db, pool } = await establishDatabasePoolConnection();

      if (!db || !pool) {
        return { message: "Failed to establish a database connection" };
      }

      const user = await validateUser(db, { email, password });

      const session = await createSession(user.id, "pl");

      pool.end();
      return {
        message: "user signed in successfully",
        sessionCookie: session.sessionCookie,
      };
    } catch (error) {
      return { message: (error as Error).message };
    }
  },
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  }
);
