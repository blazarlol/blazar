import {
  createEmailVerification,
  createUser,
  validateEmailVerificationCode,
  validateUser,
  verifyUserEmail,
} from "@blazar/drizzle";
import Elysia, { t } from "elysia";
import { establishDatabasePoolConnection } from "../../lib/drizzle";
import {
  generateEmailVerificationCode,
  generateEmailVerificationToken,
  generatePasswordHash,
  generateUserId,
} from "../../utils/generation";
import { createSession } from "../../lib/lucia/session";
import { api } from "../..";

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

        const id = await generateUserId();
        const passwordHash = await generatePasswordHash(password);

        await createUser(db, { id, email, passwordHash });

        const code = await generateEmailVerificationCode();
        const token = await generateEmailVerificationToken();
        // TODO: Create a function to generate the expiresAt date
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await createEmailVerification(db, id, code, token, expiresAt);

        const response = await api.api.email.verification.post({
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

      pool.end();

      return { message: "email verified successfully" };
    },
    {
      body: t.Object({
        code: t.String(),
        token: t.String(),
      }),
    }
  );
