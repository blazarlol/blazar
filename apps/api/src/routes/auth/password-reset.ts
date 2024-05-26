import {
  changeUserPasswordHash,
  createPasswordReset,
  establishDatabasePoolConnection,
  getUserByEmail,
  validatePasswordResetToken,
} from "@blazar/db";
import {
  CustomError,
  generatePasswordHash,
  generateToken,
  generateTokenHash,
} from "@blazar/helpers";
import Elysia, { error, t } from "elysia";
import { api } from "../..";

export const passwordReset = new Elysia({ prefix: "/password-reset" })
  .post(
    "/",
    async ({ body }) => {
      const { email } = body;

      try {
        const { db, pool } = await establishDatabasePoolConnection();

        if (!db || !pool) {
          throw new CustomError("Failed to establish a database connection");
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
        return {
          message:
            "Password reset request created successfully. Please check your email for instructions on how to reset your password.",
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
          throw new CustomError("Failed to establish a database connection");
        }

        const validToken = await validatePasswordResetToken(db, token);

        if (validToken) {
          const passwordHash = await generatePasswordHash(newPassword);

          await changeUserPasswordHash(db, validToken.userId, passwordHash);

          await pool.end();
          return {
            message:
              "Password reset successfully. You can now log in with your new password. You will be redirected soon...",
          };
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
        newPassword: t.String(),
      }),
      params: t.Object({
        token: t.String(),
      }),
    }
  );
