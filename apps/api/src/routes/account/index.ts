import {
  checkIfAccountExists,
  createAccount,
  establishDatabasePoolConnection,
  getAccount,
} from "@blazar/db";
import { CustomError, generateId } from "@blazar/helpers";
import Elysia, { error, t } from "elysia";

export const accountRoutes = new Elysia({ prefix: "/account" })
  .post(
    "/",
    async ({ body }) => {
      const { userId, userName, avatarUrl } = body;

      try {
        const { db, pool } = await establishDatabasePoolConnection();

        if (!db || !pool) {
          throw new CustomError("Failed to establish a database connection");
        }

        const accountExists = await checkIfAccountExists(db, userId);

        if (accountExists) {
          pool.end();
          throw new CustomError("Account already exists", 409);
        }

        const id = await generateId();

        await createAccount(db, {
          id,
          userId,
          userName,
          avatarUrl,
        });

        pool.end();

        return {
          message: "Account created successfully.",
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
        userId: t.String(),
        userName: t.String(),
        avatarUrl: t.String(),
      }),
    }
  )
  .get(
    "/:userId",
    async ({ params }) => {
      const { userId } = params;

      try {
        const { db, pool } = await establishDatabasePoolConnection();

        if (!db || !pool) {
          throw new CustomError("Failed to establish a database connection");
        }

        const account = await getAccount(db, userId);

        pool.end();

        return {
          message: "Account retrieved successfully.",
          account,
        };
      } catch (err) {
        if (err instanceof CustomError) {
          return error(err.status, err.message);
        }

        return error(500, (err as Error).message);
      }
    },
    {
      params: t.Object({
        userId: t.String(),
      }),
    }
  );
