import { CustomError } from "@blazar/helpers";
import Elysia, { t } from "elysia";
import { validateSession as validateSessionAction } from "@blazar/db";

export const validateSession = new Elysia().post(
  "/validate-session",
  async ({ body }) => {
    const { sessionId } = body;

    if (!sessionId) {
      throw new CustomError("Session ID is required", 409);
    }

    const { session } = await validateSessionAction(sessionId);

    if (!session) {
      throw new CustomError("Session not found", 404);
    }

    return { session };
  },
  {
    body: t.Object({
      sessionId: t.String(),
    }),
  }
);
