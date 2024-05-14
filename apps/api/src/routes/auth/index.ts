import {
  changeUserPasswordHash,
  createEmailVerification,
  createPasswordReset,
  createUser,
  getUserByEmail,
  getUserById,
  removeEmailVerification,
  validateEmailVerificationCode,
  validatePasswordResetToken,
  validateUser,
  verifyUserEmail,
} from "@blazar/drizzle";
import Elysia, { t } from "elysia";
import { establishDatabasePoolConnection } from "../../lib/drizzle";
import {
  generateEmailVerificationCode,
  generatePasswordHash,
  generateId,
  generateToken,
  generateTokenHash,
} from "../../utils/generation";
import {
  createSession,
  invalidateSession,
  validateSession,
} from "../../lib/lucia/session";
import { api } from "../..";
import { lucia } from "../../lib/lucia";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post(
    "/signin",
    async ({ body }) => {
      const { email, password } = body as { email: string; password: string };

      const { db, pool } = await establishDatabasePoolConnection();

      try {
        const user = await validateUser(db, { email, password });

        await createSession(user.id, "pl");

        pool.end();
        return { message: "user signed in successfully" };
      } catch (error) {
        pool.end();
        return { message: (error as Error).message };
      }
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .post(
    "/signup",
    async ({ body }) => {
      try {
        const { email, password } = body as { email: string; password: string };

        const { db, pool } = await establishDatabasePoolConnection();

        const passwordHash = await generatePasswordHash(password);

        const id = await crypto.randomUUID();

        await createUser(db, { id, email, passwordHash });

        const code = await generateEmailVerificationCode();
        // TODO: Hash the token with SHA-256
        const token = await generateToken();
        // TODO: Create a function to generate the expiresAt date
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await createEmailVerification(db, id, code, token, expiresAt);

        const response = await api.api.email["email-verification"].post({
          email,
          code,
          token,
        });

        if (response.error) {
          throw new Error(
            `Error sending verification email: ${await response.error.value}`
          );
        }

        pool.end();

        return { message: "user created successfully" };
      } catch (error) {
        return (error as Error).message;
      }
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .post(
    "/verify",
    async ({ body }) => {
      const { code, token } = body as { code: string; token: string };

      const { db, pool } = await establishDatabasePoolConnection();

      const emailVerification = await validateEmailVerificationCode(
        db,
        token,
        code
      );

      await verifyUserEmail(db, emailVerification.userId);

      await removeEmailVerification(db, emailVerification.userId);

      pool.end();

      return { message: "email verified successfully" };
    },
    {
      body: t.Object({
        code: t.String(),
        token: t.String(),
      }),
    }
  )
  .post(
    "/signout",
    async ({ body }) => {
      const { userId, sessionId } = body;

      const { db, pool } = await establishDatabasePoolConnection();

      try {
        await getUserById(db, userId);
        await invalidateSession(sessionId);

        pool.end();
      } catch (error) {
        pool.end();
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
  )
  .post(
    "/password-reset",
    async ({ body }) => {
      const { email } = body;

      try {
        const { db, pool } = await establishDatabasePoolConnection();

        const user = await getUserByEmail(db, email);

        const token = await generateToken();

        const tokenHash = await generateTokenHash(token);

        await createPasswordReset(db, user.id, tokenHash);

        api.api.email["password-reset"].post({
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
    "/password-reset/:token",
    async ({ body, params }) => {
      const { newPassword } = body;
      const { token } = params;

      try {
        const { db, pool } = await establishDatabasePoolConnection();

        const passwordReset = await validatePasswordResetToken(db, token);

        if (passwordReset) {
          const passwordHash = await generatePasswordHash(newPassword);

          await changeUserPasswordHash(db, passwordReset.userId, passwordHash);

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
