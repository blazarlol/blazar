import {
  establishDatabasePoolConnection,
  removeEmailVerification,
  validateEmailVerificationCode,
  validateEmailVerificationToken,
  verifyUserEmail,
} from "@blazar/db";
import Elysia, { t } from "elysia";

export const emailVerification = new Elysia().post(
  "/email-verification/:token",
  async ({ body, params }) => {
    const { code } = body;
    const { token } = params;

    try {
      const { db, pool } = await establishDatabasePoolConnection();

      if (!db || !pool) {
        return { message: "Failed to establish a database connection" };
      }

      const validToken = await validateEmailVerificationToken(db, token);

      if (validToken) {
        const emailVerification = await validateEmailVerificationCode(
          db,
          validToken.tokenHash,
          code
        );

        await verifyUserEmail(db, emailVerification.userId);
        await removeEmailVerification(db, emailVerification.userId);

        pool.end();

        return { message: "email verified successfully" };
      }
    } catch (error) {
      return { error: (error as Error).message };
    }
  },
  {
    body: t.Object({
      code: t.String(),
    }),
  }
);
