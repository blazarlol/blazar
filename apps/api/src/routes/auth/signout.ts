import {
  establishDatabasePoolConnection,
  getUserById,
  invalidateSession,
} from "@blazar/db";
import Elysia, { t } from "elysia";

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
    } catch (error) {
      return { message: (error as Error).message };
    }

    return { message: "user signed out successfully" };
  },
  {
    body: t.Object({
      userId: t.String(),
      sessionId: t.String(),
    }),
  }
);
