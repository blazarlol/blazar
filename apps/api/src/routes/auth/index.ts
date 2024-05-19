import {
  changeUserPasswordHash,
  createEmailVerification,
  createPasswordReset,
  createSession,
  createUser,
  getUserByEmail,
  getUserById,
  invalidateSession,
  removeEmailVerification,
  validateEmailVerificationCode,
  validateEmailVerificationToken,
  validatePasswordResetToken,
  validateUser,
  verifyUserEmail,
  establishDatabasePoolConnection,
} from "@blazar/db";
import Elysia, { t } from "elysia";
import {
  generateEmailVerificationCode,
  generatePasswordHash,
  generateToken,
  generateTokenHash,
} from "@blazar/helpers";
import { api } from "../..";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post(
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
  )
  .post(
    "/signup",
    // TODO: ERROR HANDLING FOR LACK OF EMAIL OR PASSWORD AS A RESPONSE
    async ({ body }) => {
      try {
        const { email, password } = body as { email: string; password: string };

        const { db, pool } = await establishDatabasePoolConnection();

        if (!db || !pool) {
          return { message: "Failed to establish a database connection" };
        }

        const passwordHash = await generatePasswordHash(password);
        const id = await crypto.randomUUID();

        await createUser(db, { id, email, passwordHash });

        const code = await generateEmailVerificationCode();
        const token = await generateToken();
        const tokenHash = await generateTokenHash(token);

        // TODO: Create a function to generate the expiresAt date
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await createEmailVerification(db, id, code, tokenHash, expiresAt);

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
  )
  .post(
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
  )
  .post(
    "/password-reset",
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
