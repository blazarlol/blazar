import {
  changeUserPasswordHash,
  createPasswordReset,
  establishDatabasePoolConnection,
  getUserByEmail,
  validatePasswordResetToken,
} from "@blazar/db";
import {
  generatePasswordHash,
  generateToken,
  generateTokenHash,
} from "@blazar/helpers";
import Elysia, { t } from "elysia";
import { api } from "../..";

export const passwordReset = new Elysia().group("/password-reset", (group) => {
  return group
    .post(
      "/",
      async ({ body }) => {
        const { email } = body;

        try {
          const { db, pool } = await establishDatabasePoolConnection();

          if (!db || !pool) {
            return { message: "Failed to establish a database connection" };
          }

          const user = await getUserByEmail(db, email);

          const token = await generateToken();

          const tokenHash = await generateTokenHash(token);

          await createPasswordReset(db, user.id, tokenHash);

          api.email["password-reset"].post({
            email,
            token,
          });

          await pool.end();
          return { message: "password reset email sent" };
        } catch (error) {
          return { error: (error as Error).message };
        }
      },
      {
        body: t.Object({
          email: t.String(),
        }),
      }
    )
    .post(
      "/:token",
      async ({ body, params }) => {
        const { newPassword } = body;
        const { token } = params;

        try {
          const { db, pool } = await establishDatabasePoolConnection();

          if (!db || !pool) {
            return { message: "Failed to establish a database connection" };
          }

          const validToken = await validatePasswordResetToken(db, token);

          if (validToken) {
            const passwordHash = await generatePasswordHash(newPassword);

            await changeUserPasswordHash(db, validToken.userId, passwordHash);

            await pool.end();
            return { message: "password reset successfully" };
          }
        } catch (error) {
          return { error: (error as Error).message };
        }
      },
      {
        body: t.Object({
          newPassword: t.String(),
        }),
        params: t.Object({
          token: t.String(),
        }),
      }
    );
});
