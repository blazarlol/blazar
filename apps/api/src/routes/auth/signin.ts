import {
  createSession,
  establishDatabasePoolConnection,
  validateUser,
} from "@blazar/db";
import { CustomError } from "@blazar/helpers";
import Elysia, { error, t } from "elysia";

export const signIn = new Elysia().post(
  "/signin",
  async ({ body }) => {
    const { email, password } = body as { email: string; password: string };

    try {
      const { db, pool } = await establishDatabasePoolConnection();

      if (!db || !pool) {
        throw new CustomError("Failed to establish a database connection");
      }

      const user = await validateUser(db, { email, password });

      const session = await createSession(user.id, "pl");

      pool.end();
      return {
        message: "Signed in successfully.",
        sessionCookie: session.sessionCookie,
      };
    } catch (err) {
      if (err instanceof CustomError) {
        return error(err.status, err.message);
      }

      return error(500, (err as Error).message);
    }
  },
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  }
);
