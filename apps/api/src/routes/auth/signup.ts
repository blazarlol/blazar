import {
  createEmailVerification,
  createUser,
  establishDatabasePoolConnection,
} from "@blazar/db";
import {
  generateEmailVerificationCode,
  generatePasswordHash,
  generateToken,
  generateTokenHash,
} from "@blazar/helpers";
import Elysia, { t } from "elysia";
import { api } from "../..";

export const signUp = new Elysia().post(
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

      const response = await api.email["email-verification"].post({
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
);
