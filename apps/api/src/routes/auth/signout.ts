import {
  establishDatabasePoolConnection,
  getUserById,
  invalidateSession,
} from "@blazar/db";
import { CustomError } from "@blazar/helpers";
import Elysia, { error, t } from "elysia";

export const signOut = new Elysia().post(
  "/signout",
  async ({ body }) => {
    const { userId, sessionId } = body;

    try {
      const { db, pool } = await establishDatabasePoolConnection();

      if (!db || !pool) {
        return { message: "Failed to establish a database connection" };
      }

      await getUserById(db, userId);
      await invalidateSession(sessionId);

      pool.end();

      return { message: "Signed out successfully." };
    } catch (err) {
      if (err instanceof CustomError) {
        return error(err.status, err.message);
      }

      return error(500, (err as Error).message);
    }
  },
  {
    body: t.Object({
      userId: t.String(),
      sessionId: t.String(),
    }),
  }
);
