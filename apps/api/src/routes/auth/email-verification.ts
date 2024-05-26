import {
  establishDatabasePoolConnection,
  removeEmailVerification,
  validateEmailVerificationCode,
  validateEmailVerificationToken,
  verifyUserEmail,
} from "@blazar/db";
import { CustomError } from "@blazar/helpers";
import Elysia, { error, t } from "elysia";

export const emailVerification = new Elysia({
  prefix: "email-verification",
}).post(
  "/:token",
  async ({ body, params }) => {
    const { code } = body;
    const { token } = params;

    try {
      const { db, pool } = await establishDatabasePoolConnection();

      if (!db || !pool) {
        throw new CustomError("Failed to establish a database connection");
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

        return { message: "Email verified successfully." };
      }
    } catch (err) {
      if (err instanceof CustomError) {
        return error(err.status, err.message);
      }

      return error(500, (err as Error).message);
    }
  },
  {
    body: t.Object({
      code: t.String(),
    }),
  }
);
