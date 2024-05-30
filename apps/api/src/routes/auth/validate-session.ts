import { CustomError } from "@blazar/helpers";
import Elysia, { error, t } from "elysia";
import { validateSession as validateSessionAction } from "@blazar/db";

export const validateSession = new Elysia().post(
  "/validate-session",
  async ({ body }) => {
    const { sessionId } = body;

    try {
      if (!sessionId) {
        throw new CustomError("Session ID is required", 409);
      }

      const { session, user } = await validateSessionAction(sessionId);

      if (!session) {
        throw new CustomError("Session not found", 409);
      }

      return { message: "Session validated successfully.", session, user };
    } catch (err) {
      if (err instanceof CustomError) {
        return error(err.status, err.message);
      }

      return error(500, (err as Error).message);
    }
  },
  {
    body: t.Object({
      sessionId: t.String(),
    }),
  }
);
