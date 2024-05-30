import {
  changeOnboardingStatus,
  establishDatabasePoolConnection,
  getUserOnboardingStatus,
} from "@blazar/db";
import { CustomError } from "@blazar/helpers";
import Elysia, { error, t } from "elysia";

export const userRoutes = new Elysia({ prefix: "/user" })
  .get(
    "/:userId/onboarding-complete",
    async ({ params }) => {
      const { userId } = params;

      try {
        const { db, pool } = await establishDatabasePoolConnection();

        if (!db || !pool) {
          throw new CustomError("Failed to establish a database connection");
        }

        const status = await getUserOnboardingStatus(db, userId);

        pool.end();

        return { status };
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
  )
  .put(
    "/:userId/onboarding-complete/true",
    async ({ params }) => {
      const { userId } = params;

      try {
        const { db, pool } = await establishDatabasePoolConnection();

        if (!db || !pool) {
          throw new CustomError("Failed to establish a database connection");
        }

        const status = await changeOnboardingStatus(db, userId, true);

        pool.end();

        return { status };
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
